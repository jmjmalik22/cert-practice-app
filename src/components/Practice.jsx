import { useState, useEffect, useMemo, useRef } from "react";
import { ChevronLeft, ArrowRight, Clock, Flag, CheckCircle2, XCircle, ShieldCheck } from "lucide-react";
import { useTheme, FONT_DISPLAY, FONT_MONO, getBookmarks, toggleBookmarkStorage, markAttempted, getAttempted, shuffle } from "../lib/theme.jsx";
import { getPracticeConfig, getProductIcon } from "../lib/examCatalog.js";
import { QUESTION_BANK } from "../lib/questionBank/index.js";
import { recordAttempt, toggleBookmark } from "../lib/progress.jsx";
import { getWrongQuestionIds } from "../lib/progress.jsx";
import {
  SESSION_MODE,
  loadPersistedSession,
  savePersistedSession,
  clearPersistedSession,
} from "../lib/sessionPersistence.js";
import { Chip, SessionResumePrompt } from "./Shared.jsx";
import { TopBar, QuestionCard } from "./QuestionUI.jsx";

function FilterToggle({ label, hint, checked, onChange }) {
  const TOKENS = useTheme();
  return (
    <label className="flex items-start gap-3 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5"
        style={{ accentColor: TOKENS.azure }}
      />
      <span>
        <span className="block text-sm" style={{ color: TOKENS.ink }}>{label}</span>
        <span className="block text-xs" style={{ color: TOKENS.inkMuted }}>{hint}</span>
      </span>
    </label>
  );
}

export function Practice({ exam, onExit, initialDomain = null, reviewWrongAnswers = false }) {
  const TOKENS = useTheme();
  const productIcon = getProductIcon(exam);
  const allQuestions = QUESTION_BANK[exam].questions;
  // Review-wrong-answers sessions draw from a different pool than a normal
  // practice run, so they get their own persistence key and never offer to
  // resume/overwrite each other.
  const sessionExamKey = reviewWrongAnswers ? `${exam}:review` : exam;
  const questionsById = useMemo(() => new Map(allQuestions.map((qq) => [qq.id, qq])), [allQuestions]);
  const wrongQuestionIds = useMemo(() => new Set(getWrongQuestionIds(exam)), [exam]);
  const pool = useMemo(
    () => reviewWrongAnswers
      ? allQuestions.filter((question) => wrongQuestionIds.has(question.id))
      : allQuestions,
    [allQuestions, reviewWrongAnswers, wrongQuestionIds]
  );
  const domains = useMemo(() => Array.from(new Set(pool.map((q) => q.domain))), [pool]);
  const practiceConfig = getPracticeConfig(exam);
  const config = {
    ...practiceConfig,
    totalQuestions: pool.length,
    domains: domains.length,
  };
  // An empty set means "every domain" — the same thing the old "All" chip did,
  // but it keeps the selection additive as the user taps domains on and off.
  const deepLinkedDomain = initialDomain && domains.includes(initialDomain) ? initialDomain : null;
  const [selectedDomains, setSelectedDomains] = useState(
    () => new Set(deepLinkedDomain ? [deepLinkedDomain] : [])
  );
  const [selectedQuestionCount, setSelectedQuestionCount] = useState(pool.length);
  const [bookmarkedOnly, setBookmarkedOnly] = useState(false);
  const [unseenOnly, setUnseenOnly] = useState(false);
  const [showSetup, setShowSetup] = useState(reviewWrongAnswers || !deepLinkedDomain);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [flaggedQuestions, setFlaggedQuestions] = useState(new Set());
  const [answers, setAnswers] = useState({});
  const timerRef = useRef(null);
  const bookmarkKeys = useMemo(() => new Set(getBookmarks()), []);
  const seenQuestionIds = useMemo(() => new Set(getAttempted(exam)), [exam]);
  const filteredPool = useMemo(
    () =>
      pool.filter((q) => {
        if (selectedDomains.size > 0 && !selectedDomains.has(q.domain)) return false;
        if (bookmarkedOnly && !bookmarkKeys.has(`${exam}:${q.id}`)) return false;
        if (unseenOnly && seenQuestionIds.has(q.id)) return false;
        return true;
      }),
    [pool, selectedDomains, bookmarkedOnly, unseenOnly, bookmarkKeys, seenQuestionIds, exam]
  );
  const questionCount = Math.min(selectedQuestionCount, filteredPool.length);

  function toggleDomain(domain) {
    setSelectedDomains((prev) => {
      const next = new Set(prev);
      if (next.has(domain)) next.delete(domain);
      else next.add(domain);
      return next;
    });
  }
  const questionCountOptions = useMemo(
    () => [...new Set([10, 20, 30, 50, filteredPool.length].filter((count) => count > 0 && count <= filteredPool.length))],
    [filteredPool.length]
  );
  const [order, setOrder] = useState(() => shuffle(filteredPool).slice(0, questionCount));
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState({ correct: 0, seen: 0 });
  const [bookmarks, setBookmarks] = useState(() => new Set(getBookmarks()));
  const [showResults, setShowResults] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);
  const [reviewIdx, setReviewIdx] = useState(0);
  // A persisted session found for this exam+mode on mount, awaiting the
  // learner's resume-or-discard choice. Null once that choice has been made
  // (or there was nothing to resume).
  const [resumePrompt, setResumePrompt] = useState(null);

  useEffect(() => {
    setSelectedQuestionCount((count) => Math.min(count, filteredPool.length));
    setOrder(shuffle(filteredPool).slice(0, questionCount));
    setIdx(0);
    setSelected(null);
    setRevealed(false);
    // The pool itself just changed (a domain/bookmark/unseen filter was
    // toggled), so answers/score/flags from the previous pool no longer
    // describe this session — carrying them forward let a stale answer
    // count toward a session with a different, smaller set of questions
    // and inflated the final score/accuracy shown on the results screen.
    setAnswers({});
    setScore({ correct: 0, seen: 0 });
    setFlaggedQuestions(new Set());
  }, [filteredPool, questionCount]);

  // Check once, on mount, for a persisted session for this exam+mode. Runs
  // before the learner can interact with anything, so a resume choice (if
  // any) always takes precedence over the setup screen or a deep-linked
  // domain that would otherwise start a fresh session immediately.
  useEffect(() => {
    setResumePrompt(loadPersistedSession(SESSION_MODE.PRACTICE, sessionExamKey));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Autosave the in-progress session (question order, position, answers,
  // flags, elapsed time) so a refresh/crash/accidental nav can recover it.
  // Only once a real session exists — never the setup screen's transient
  // filter selections.
  useEffect(() => {
    if (showSetup || showResults || resumePrompt || order.length === 0) return;
    savePersistedSession(SESSION_MODE.PRACTICE, sessionExamKey, {
      orderIds: order.map((qq) => qq.id),
      idx,
      answers,
      flaggedQuestionIds: Array.from(flaggedQuestions),
      elapsedSeconds,
    });
  }, [showSetup, showResults, resumePrompt, sessionExamKey, order, idx, answers, flaggedQuestions, elapsedSeconds]);

  function handleResumeSession() {
    const persisted = resumePrompt;
    const restoredOrder = (persisted.orderIds || [])
      .map((id) => questionsById.get(id))
      .filter(Boolean);
    if (restoredOrder.length === 0) {
      // Nothing left to resume (e.g. the question bank changed under it).
      handleDiscardSession();
      return;
    }
    const restoredAnswers = persisted.answers || {};
    const restoredIdx = Math.min(persisted.idx || 0, restoredOrder.length - 1);
    // The resumed question itself may already have an answer recorded (a
    // crash/refresh landing between "choose" and "next" saves both), so
    // reflect that as already revealed rather than presenting it blank and
    // risking a second, double-counted answer.
    const currentQuestion = restoredOrder[restoredIdx];
    const currentAnswer = currentQuestion ? restoredAnswers[currentQuestion.id] : undefined;
    // Recompute score from the restored answers rather than resetting it —
    // `score` otherwise only grows via `choose()` and would silently
    // undercount everything answered before the refresh/crash.
    const restoredSeen = restoredOrder.filter((qq) => restoredAnswers[qq.id] !== undefined).length;
    const restoredCorrect = restoredOrder.filter((qq) => restoredAnswers[qq.id] === qq.correct).length;

    setOrder(restoredOrder);
    setIdx(restoredIdx);
    setAnswers(restoredAnswers);
    setFlaggedQuestions(new Set(persisted.flaggedQuestionIds || []));
    setElapsedSeconds(persisted.elapsedSeconds || 0);
    setScore({ correct: restoredCorrect, seen: restoredSeen });
    setSelected(currentAnswer ?? null);
    setRevealed(currentAnswer !== undefined);
    setShowSetup(false);
    setResumePrompt(null);
  }

  function handleDiscardSession() {
    clearPersistedSession(SESSION_MODE.PRACTICE, sessionExamKey);
    setResumePrompt(null);
  }

  // Start timer when entering practice mode
  useEffect(() => {
    if (!showSetup && !showResults && !resumePrompt) {
      timerRef.current = setInterval(() => {
        setElapsedSeconds((s) => s + 1);
      }, 1000);
      return () => clearInterval(timerRef.current);
    }
    return () => {};
  }, [showSetup, showResults, resumePrompt]);

  // Clear timer when component unmounts
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const q = order[idx % order.length];
  const bmKey = q ? `${exam}:${q.id}` : "";

  function choose(optId) {
    if (revealed || !q) return;
    setSelected(optId);
    setRevealed(true);
    const isCorrect = optId === q.correct;
    setScore((s) => ({ correct: s.correct + (isCorrect ? 1 : 0), seen: s.seen + 1 }));
    setAnswers((prev) => ({ ...prev, [q.id]: optId }));
    markAttempted(exam, q.id);
    // Record in progress tracking
    recordAttempt(exam, q.id, isCorrect);
  }

  function formatTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    if (hours > 0) {
      return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  function toggleFlag(questionId) {
    setFlaggedQuestions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  }

  function next() {
    const nextIndex = idx + 1;
    // Check if we've completed all questions
    if (nextIndex >= order.length) {
      // Session finished normally — nothing left to resume next time.
      clearPersistedSession(SESSION_MODE.PRACTICE, sessionExamKey);
      setShowResults(true);
    } else {
      setSelected(null);
      setRevealed(false);
      setIdx(nextIndex);
    }
  }

  function restart() {
    setShowResults(false);
    setReviewMode(false);
    setReviewIdx(0);
    setSelected(null);
    setRevealed(false);
    setIdx(0);
    setScore({ correct: 0, seen: 0 });
    setElapsedSeconds(0);
    setFlaggedQuestions(new Set());
    setAnswers({});
    setOrder(shuffle(filteredPool).slice(0, questionCount));
  }

  function toggleBm() {
    const arr = toggleBookmarkStorage(bmKey);
    setBookmarks(new Set(arr));
    // Also record in progress tracking
    toggleBookmark(exam, q.id);
  }

  if (resumePrompt) {
    const answeredCountResume = Object.keys(resumePrompt.answers || {}).length;
    const totalResume = resumePrompt.orderIds?.length || 0;
    return (
      <div className="min-h-full flex flex-col px-6 py-8 max-w-2xl mx-auto w-full">
        <TopBar
          left={
            <button onClick={onExit} className="flex items-center gap-1 text-sm" style={{ color: TOKENS.inkMuted }}>
              <ChevronLeft size={16} /> Back to exam hub
            </button>
          }
          right={<Chip tone="azure">{exam} · Practice</Chip>}
        />
        <SessionResumePrompt
          examLabel={reviewWrongAnswers ? `${exam} wrong-answers review` : `${exam} practice session`}
          detail={`${answeredCountResume} of ${totalResume} answered · ${formatTime(resumePrompt.elapsedSeconds || 0)} elapsed`}
          onResume={handleResumeSession}
          onDiscard={handleDiscardSession}
        />
      </div>
    );
  }

  if (showSetup) {
    return (
      <div className="min-h-full flex flex-col px-6 py-8 max-w-2xl mx-auto w-full">
        <TopBar
          left={
            <button onClick={onExit} className="flex items-center gap-1 text-sm" style={{ color: TOKENS.inkMuted }}>
              <ChevronLeft size={16} /> Back to exam hub
            </button>
          }
          right={<Chip tone="azure">{exam} · Practice</Chip>}
        />

        <div className="mt-8">
          <div
            className="inline-flex items-center gap-1.5 text-xs uppercase mb-3 px-3 py-1 rounded-full"
            style={{ color: TOKENS.azure, letterSpacing: "0.1em", border: `1px solid ${TOKENS.azure}40`, fontFamily: FONT_MONO }}
          >
            <ShieldCheck size={13} /> Certification prep
          </div>
          <div className="flex items-center gap-3 mb-4">
            {productIcon && (
              <img src={productIcon.src} alt={productIcon.alt} width={32} height={32} className="flex-shrink-0" />
            )}
            <h1 className="text-2xl sm:text-3xl font-semibold" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
              {reviewWrongAnswers ? `${exam} Wrong Answers` : `${exam} Practice Mode`}
            </h1>
          </div>
          <p className="text-sm mb-8" style={{ color: TOKENS.inkMuted }}>
            {reviewWrongAnswers
              ? "Review the questions you most recently answered incorrectly and strengthen the concepts behind them."
              : "Study at your own pace with instant feedback and detailed explanations. Perfect for learning and reviewing concepts."}
          </p>

          <h2 className="text-sm font-semibold mb-4" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
            What to expect
          </h2>
          <div className="space-y-4 mb-8">
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${TOKENS.azure}20` }}>
                <span style={{ color: TOKENS.azure, fontSize: '0.75rem' }}>1</span>
              </div>
              <div>
                <div className="text-sm font-medium" style={{ color: TOKENS.ink }}>Instant feedback</div>
                <div className="text-xs" style={{ color: TOKENS.inkMuted }}>See if your answer is correct immediately with detailed explanations.</div>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${TOKENS.azure}20` }}>
                <span style={{ color: TOKENS.azure, fontSize: '0.75rem' }}>2</span>
              </div>
              <div>
                <div className="text-sm font-medium" style={{ color: TOKENS.ink }}>Filter by domain</div>
                <div className="text-xs" style={{ color: TOKENS.inkMuted }}>Focus on specific topics or study all domains together.</div>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${TOKENS.azure}20` }}>
                <span style={{ color: TOKENS.azure, fontSize: '0.75rem' }}>3</span>
              </div>
              <div>
                <div className="text-sm font-medium" style={{ color: TOKENS.ink }}>Bookmark questions</div>
                <div className="text-xs" style={{ color: TOKENS.inkMuted }}>Save questions to review later from your dashboard.</div>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${TOKENS.azure}20` }}>
                <span style={{ color: TOKENS.azure, fontSize: '0.75rem' }}>4</span>
              </div>
              <div>
                <div className="text-sm font-medium" style={{ color: TOKENS.ink }}>Track your progress</div>
                <div className="text-xs" style={{ color: TOKENS.inkMuted }}>Your score and progress are saved as you go through questions.</div>
              </div>
            </div>
          </div>

          <h2 className="text-sm font-semibold mb-4" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
            Practice setup
          </h2>
          <div className="rounded-xl p-4 mb-8" style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}>
            <div className="text-sm mb-4" style={{ color: TOKENS.ink }}>
              {questionCount} questions selected · {config.timeLimit} · Domain filters available
            </div>
            {reviewWrongAnswers && config.totalQuestions === 0 && (
              <div className="mb-4 rounded-lg p-3 text-sm" style={{ background: `${TOKENS.green}15`, color: TOKENS.green }}>
                No wrong answers to review for this exam yet.
              </div>
            )}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: TOKENS.inkMuted }}>Available questions</span>
                <span className="text-sm font-medium" style={{ color: TOKENS.azure }}>{filteredPool.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: TOKENS.inkMuted }}>Domains</span>
                <span className="text-sm font-medium" style={{ color: TOKENS.azure }}>{config.domains} areas</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: TOKENS.inkMuted }}>Time limit</span>
                <span className="text-sm font-medium" style={{ color: TOKENS.azure }}>{config.timeLimit}</span>
              </div>
            </div>
          </div>

          {!reviewWrongAnswers && questionCountOptions.length > 0 && (
            <div className="rounded-xl p-4 mb-8" style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}>
              <div className="text-sm font-medium mb-1" style={{ color: TOKENS.ink }}>How many questions?</div>
              <div className="text-xs mb-3" style={{ color: TOKENS.inkMuted }}>
                Choose the number of questions you want to practice in this session.
              </div>
              <div className="flex flex-wrap gap-2">
                {questionCountOptions.map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setSelectedQuestionCount(count)}
                    className="text-sm rounded-full px-4 py-2 transition-colors"
                    style={{
                      color: selectedQuestionCount === count ? TOKENS.bgDeep : TOKENS.inkMuted,
                      background: selectedQuestionCount === count ? TOKENS.azure : "transparent",
                      border: `1px solid ${selectedQuestionCount === count ? TOKENS.azure : TOKENS.panelBorder}`,
                    }}
                  >
                    {count === filteredPool.length ? `All (${count})` : count}
                  </button>
                ))}
              </div>
            </div>
          )}

          {!reviewWrongAnswers && (
            <>
              <h2 className="text-sm font-semibold mb-4" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
                Focus areas
              </h2>
              <div className="rounded-xl p-4 mb-8" style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}>
                <div className="text-xs mb-3" style={{ color: TOKENS.inkMuted }}>
                  Pick any combination of domains, or leave them all off to study every topic together.
                </div>
                <div className="flex flex-wrap gap-2">
                  {domains.map((d) => {
                    const active = selectedDomains.has(d);
                    return (
                      <button
                        key={d}
                        type="button"
                        onClick={() => toggleDomain(d)}
                        className="text-xs rounded-full px-3 py-1.5 flex-shrink-0 whitespace-nowrap transition-colors"
                        style={{
                          color: active ? TOKENS.bgDeep : TOKENS.inkMuted,
                          background: active ? TOKENS.azure : "transparent",
                          border: `1px solid ${active ? TOKENS.azure : TOKENS.panelBorder}`,
                        }}
                      >
                        {d}
                      </button>
                    );
                  })}
                </div>
                {selectedDomains.size > 0 && (
                  <button
                    type="button"
                    onClick={() => setSelectedDomains(new Set())}
                    className="text-xs mt-3"
                    style={{ color: TOKENS.azure }}
                  >
                    Clear selection ({selectedDomains.size} selected)
                  </button>
                )}
              </div>

              <h2 className="text-sm font-semibold mb-4" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
                Narrow it down
              </h2>
              <div className="rounded-xl p-4 mb-8 space-y-3" style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}>
                <FilterToggle
                  label="Bookmarked only"
                  hint="Just the questions you saved for later."
                  checked={bookmarkedOnly}
                  onChange={setBookmarkedOnly}
                />
                <FilterToggle
                  label="Unseen only"
                  hint="Skip questions you've already answered before."
                  checked={unseenOnly}
                  onChange={setUnseenOnly}
                />
              </div>
            </>
          )}

          <button
            onClick={() => setShowSetup(false)}
            disabled={filteredPool.length === 0}
            className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full font-medium text-sm"
            style={{ background: TOKENS.azure, color: TOKENS.bgDeep, opacity: filteredPool.length === 0 ? 0.5 : 1 }}
          >
            {filteredPool.length === 0
              ? "No questions match these filters"
              : reviewWrongAnswers
              ? "Start Review"
              : `Start Practice (${questionCount})`}{" "}
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  const answeredCount = Object.keys(answers).length;

  return (
    <div className="min-h-full flex flex-col px-6 py-8 max-w-2xl mx-auto w-full">
      {/* Exam Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <button onClick={onExit} className="flex items-center gap-1 text-sm" style={{ color: TOKENS.inkMuted }}>
            <ChevronLeft size={16} /> Back
          </button>
          <span className="text-xs font-medium" style={{ color: TOKENS.inkMuted }}>{exam} PRACTICE</span>
        </div>
        <h1 className="text-lg font-semibold" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
          {order.length} questions · Untimed
        </h1>
      </div>

      {/* Timer and Progress */}
      <div className="rounded-xl p-4 mb-6" style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Clock size={16} color={TOKENS.inkMuted} />
            <span className="text-sm font-mono" style={{ color: TOKENS.ink }}>{formatTime(elapsedSeconds)}</span>
          </div>
          <span className="text-xs" style={{ color: TOKENS.inkMuted }}>
            {answeredCount} of {order.length} answered
          </span>
        </div>
        {/* Progress bar */}
        <div className="flex gap-1">
          {order.map((qq, i) => (
            <div
              key={qq.id}
              className="h-1.5 flex-1 rounded-full"
              style={{
                background: answers[qq.id]
                  ? TOKENS.azure
                  : flaggedQuestions.has(qq.id)
                  ? TOKENS.amber
                  : i === idx
                  ? TOKENS.inkMuted
                  : TOKENS.panelBorder,
              }}
            />
          ))}
        </div>
      </div>

      {/* Domain Filter - Collapsible */}
      <details className="mb-4">
        <summary className="text-xs cursor-pointer" style={{ color: TOKENS.inkMuted }}>
          Filter by domain ({selectedDomains.size === 0 ? "All" : `${selectedDomains.size} selected`})
        </summary>
        <div className="flex flex-wrap gap-2 mt-2">
          {domains.map((d) => {
            const active = selectedDomains.has(d);
            return (
              <button
                key={d}
                onClick={() => toggleDomain(d)}
                className="text-xs rounded-full px-3 py-1.5 flex-shrink-0 whitespace-nowrap transition-colors"
                style={{
                  color: active ? TOKENS.bgDeep : TOKENS.inkMuted,
                  background: active ? TOKENS.azure : "transparent",
                  border: `1px solid ${active ? TOKENS.azure : TOKENS.panelBorder}`,
                }}
              >
                {d}
              </button>
            );
          })}
        </div>
      </details>

      {reviewMode ? (
        <div className="mt-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setReviewMode(false)}
              className="flex items-center gap-1 text-sm"
              style={{ color: TOKENS.inkMuted }}
            >
              <ChevronLeft size={16} /> Back to results
            </button>
            <span className="text-xs" style={{ color: TOKENS.inkMuted }}>
              Reviewing {reviewIdx + 1} of {order.length}
            </span>
          </div>

          <div className="flex gap-1 mb-4">
            {order.map((qq, i) => {
              const isCorrect = answers[qq.id] === qq.correct;
              return (
                <button
                  key={qq.id}
                  onClick={() => setReviewIdx(i)}
                  className="h-2 flex-1 rounded-full transition-colors"
                  style={{
                    background: i === reviewIdx
                      ? TOKENS.azure
                      : isCorrect
                      ? TOKENS.green
                      : TOKENS.red,
                  }}
                />
              );
            })}
          </div>

          {(() => {
            const rq = order[reviewIdx];
            const userAnswer = answers[rq.id];
            const isCorrect = userAnswer === rq.correct;
            return (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-1 rounded-full" style={{ background: `${TOKENS.azure}15`, color: TOKENS.azure }}>
                    {rq.domain}
                  </span>
                  {isCorrect ? (
                    <Chip tone="green">
                      <span className="flex items-center gap-1"><CheckCircle2 size={14} /> Correct</span>
                    </Chip>
                  ) : (
                    <Chip tone="red">
                      <span className="flex items-center gap-1"><XCircle size={14} /> Incorrect</span>
                    </Chip>
                  )}
                </div>

                <h3 className="text-sm font-medium" style={{ color: TOKENS.ink }}>
                  Q{reviewIdx + 1}. {rq.question}
                </h3>

                <div className="space-y-2">
                  {rq.options.map((opt) => {
                    const isSelected = userAnswer === opt.id;
                    const isCorrectAnswer = rq.correct === opt.id;
                    return (
                      <div
                        key={opt.id}
                        className="p-3 rounded-lg text-sm"
                        style={{
                          background: isCorrectAnswer
                            ? `${TOKENS.green}20`
                            : isSelected
                            ? `${TOKENS.red}20`
                            : TOKENS.panel,
                          border: `1px solid ${isCorrectAnswer ? TOKENS.green : isSelected ? TOKENS.red : TOKENS.panelBorder}`,
                          color: isCorrectAnswer || isSelected ? TOKENS.ink : TOKENS.inkMuted,
                        }}
                      >
                        <span className="font-medium">{opt.id.toUpperCase()}.</span> {opt.text}
                        {isCorrectAnswer && <span className="ml-2" style={{ color: TOKENS.green }}>✓ Correct</span>}
                        {isSelected && !isCorrectAnswer && <span className="ml-2" style={{ color: TOKENS.red }}>✗ Your answer</span>}
                      </div>
                    );
                  })}
                </div>

                <div className="p-4 rounded-lg" style={{ background: `${TOKENS.azure}10`, border: `1px solid ${TOKENS.panelBorder}` }}>
                  <div className="text-xs font-medium mb-1" style={{ color: TOKENS.azure }}>Explanation</div>
                  <div className="text-sm" style={{ color: TOKENS.inkMuted }}>{rq.explanation}</div>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    onClick={() => setReviewIdx(Math.max(0, reviewIdx - 1))}
                    disabled={reviewIdx === 0}
                    className="px-4 py-2 rounded-full text-sm font-medium disabled:opacity-30"
                    style={{ border: `1px solid ${TOKENS.panelBorder}`, color: TOKENS.ink }}
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setReviewIdx(Math.min(order.length - 1, reviewIdx + 1))}
                    disabled={reviewIdx === order.length - 1}
                    className="px-4 py-2 rounded-full text-sm font-medium disabled:opacity-30"
                    style={{ background: TOKENS.azure, color: TOKENS.bgDeep }}
                  >
                    Next
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      ) : showResults ? (
        <div className="mt-8 flex flex-col items-center text-center">
          <div className="text-5xl mb-4">
            {score.correct === score.seen ? "🎉" : score.correct >= score.seen * 0.7 ? "👍" : "💪"}
          </div>
          <h2 className="text-xl font-semibold mb-2" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
            Practice Complete!
          </h2>
          <p className="text-sm mb-6" style={{ color: TOKENS.inkMuted }}>
            You&apos;ve answered all {order.length} questions in {formatTime(elapsedSeconds)}
          </p>

          <div className="grid grid-cols-3 gap-4 mb-6 w-full max-w-sm">
            <div className="rounded-xl p-4" style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}>
              <div className="text-2xl font-bold" style={{ color: TOKENS.azure }}>{score.correct}</div>
              <div className="text-xs" style={{ color: TOKENS.inkMuted }}>Correct</div>
            </div>
            <div className="rounded-xl p-4" style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}>
              <div className="text-2xl font-bold" style={{ color: TOKENS.amber }}>{score.seen - score.correct}</div>
              <div className="text-xs" style={{ color: TOKENS.inkMuted }}>Incorrect</div>
            </div>
            <div className="rounded-xl p-4" style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}>
              <div className="text-2xl font-bold" style={{ color: TOKENS.green }}>
                {score.seen > 0 ? Math.round((score.correct / score.seen) * 100) : 0}%
              </div>
              <div className="text-xs" style={{ color: TOKENS.inkMuted }}>Accuracy</div>
            </div>
          </div>

          {/* Question summary */}
          <div className="w-full max-w-sm mb-6">
            <div className="text-xs font-medium mb-2" style={{ color: TOKENS.inkMuted }}>Question Summary</div>
            <div className="flex flex-wrap gap-1">
              {order.map((qq, i) => {
                const isCorrect = answers[qq.id] === qq.correct;
                return (
                  <button
                    key={qq.id}
                    onClick={() => {
                      setReviewIdx(i);
                      setReviewMode(true);
                    }}
                    className="w-8 h-8 rounded-lg text-xs font-medium transition-transform hover:scale-110"
                    style={{
                      background: isCorrect ? `${TOKENS.green}30` : `${TOKENS.red}30`,
                      color: isCorrect ? TOKENS.green : TOKENS.red,
                      border: `1px solid ${isCorrect ? TOKENS.green : TOKENS.red}`,
                    }}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setReviewMode(true)}
              className="px-5 py-2.5 rounded-full font-medium text-sm"
              style={{ background: TOKENS.amber, color: TOKENS.bgDeep }}
            >
              Review Answers
            </button>
            <button
              onClick={restart}
              className="px-5 py-2.5 rounded-full font-medium text-sm"
              style={{ background: TOKENS.azure, color: TOKENS.bgDeep }}
            >
              Practice Again
            </button>
            <button
              onClick={onExit}
              className="px-5 py-2.5 rounded-full font-medium text-sm"
              style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}`, color: TOKENS.ink }}
            >
              Exit
            </button>
          </div>
        </div>
      ) : !q ? (
        <div className="mt-8 text-sm text-center" style={{ color: TOKENS.inkMuted }}>
          No questions in this domain.
        </div>
      ) : (
        <>
          {/* Question Header */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-medium tracking-wide" style={{ color: TOKENS.inkMuted }}>
              QUESTION {(idx % order.length) + 1} OF {order.length}
            </span>
            <button
              onClick={() => toggleFlag(q.id)}
              className="flex items-center gap-1 text-xs px-2 py-1 rounded-full transition-colors"
              style={{
                color: flaggedQuestions.has(q.id) ? TOKENS.amber : TOKENS.inkMuted,
                background: flaggedQuestions.has(q.id) ? `${TOKENS.amber}20` : "transparent",
                border: `1px solid ${flaggedQuestions.has(q.id) ? TOKENS.amber : TOKENS.panelBorder}`,
              }}
            >
              <Flag size={12} /> {flaggedQuestions.has(q.id) ? "Flagged" : "Flag"}
            </button>
          </div>

          {/* Domain tag */}
          <div className="mb-3">
            <span className="text-xs px-2 py-1 rounded-full" style={{ background: `${TOKENS.azure}15`, color: TOKENS.azure }}>
              {q.domain}
            </span>
          </div>

          <QuestionCard q={q} selected={selected} revealed={revealed} onChoose={choose} bookmarked={bookmarks.has(bmKey)} onToggleBookmark={toggleBm} />

          {/* Navigation */}
          {revealed && (
            <div className="flex items-center justify-between mt-5">
              <div className="flex items-center gap-2">
                {selected === q.correct ? (
                  <Chip tone="green">
                    <span className="flex items-center gap-1"><CheckCircle2 size={14} /> Correct</span>
                  </Chip>
                ) : (
                  <Chip tone="red">
                    <span className="flex items-center gap-1"><XCircle size={14} /> Incorrect</span>
                  </Chip>
                )}
              </div>
              <button
                onClick={next}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm"
                style={{ background: TOKENS.azure, color: TOKENS.bgDeep }}
              >
                {idx + 1 >= order.length ? "Finish exam" : "Next question"} <ArrowRight size={16} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

