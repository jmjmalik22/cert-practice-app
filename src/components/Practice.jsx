import { useState, useEffect, useMemo, useRef } from "react";
import { ChevronLeft, ArrowRight, Clock, Flag, CheckCircle2 } from "lucide-react";
import { useTheme, FONT_DISPLAY, FONT_MONO, getBookmarks, toggleBookmarkStorage, markAttempted, shuffle } from "../lib/theme.jsx";
import { getPracticeConfig } from "../lib/examCatalog.js";
import { QUESTION_BANK } from "../lib/questionBank/index.js";
import { recordAttempt, toggleBookmark } from "../lib/progress.jsx";
import { Chip } from "./Shared.jsx";
import { TopBar, QuestionCard } from "./QuestionUI.jsx";

export function Practice({ exam, onExit }) {
  const TOKENS = useTheme();
  const pool = QUESTION_BANK[exam].questions;
  const domains = useMemo(() => ["All", ...Array.from(new Set(pool.map((q) => q.domain)))], [pool]);
  const practiceConfig = getPracticeConfig(exam);
  const config = {
    ...practiceConfig,
    totalQuestions: pool.length,
    domains: domains.length - 1,
  };
  const [domainFilter, setDomainFilter] = useState("All");
  const [showSetup, setShowSetup] = useState(true);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [flaggedQuestions, setFlaggedQuestions] = useState(new Set());
  const [answers, setAnswers] = useState({});
  const timerRef = useRef(null);
  const filteredPool = useMemo(
    () => (domainFilter === "All" ? pool : pool.filter((q) => q.domain === domainFilter)),
    [pool, domainFilter]
  );
  const [order, setOrder] = useState(() => shuffle(filteredPool).slice(0, config.totalQuestions));
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState({ correct: 0, seen: 0 });
  const [bookmarks, setBookmarks] = useState(() => new Set(getBookmarks()));
  const [showResults, setShowResults] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);
  const [reviewIdx, setReviewIdx] = useState(0);

  useEffect(() => {
    setOrder(shuffle(filteredPool).slice(0, config.totalQuestions));
    setIdx(0);
    setSelected(null);
    setRevealed(false);
  }, [filteredPool, config.totalQuestions]);

  // Start timer when entering practice mode
  useEffect(() => {
    if (!showSetup && !showResults) {
      timerRef.current = setInterval(() => {
        setElapsedSeconds((s) => s + 1);
      }, 1000);
      return () => clearInterval(timerRef.current);
    }
    return () => {};
  }, [showSetup, showResults]);

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
    setOrder(shuffle(filteredPool).slice(0, config.totalQuestions));
  }

  function toggleBm() {
    const arr = toggleBookmarkStorage(bmKey);
    setBookmarks(new Set(arr));
    // Also record in progress tracking
    toggleBookmark(exam, q.id);
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
          <h1 className="text-2xl sm:text-3xl font-semibold mb-4" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
            {exam} Practice Mode
          </h1>
          <p className="text-sm mb-8" style={{ color: TOKENS.inkMuted }}>
            Study at your own pace with instant feedback and detailed explanations. Perfect for learning and reviewing concepts.
          </p>

          <h2 className="text-sm font-semibold mb-4" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
            Practice setup
          </h2>
          <div className="rounded-xl p-4 mb-8" style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}>
            <div className="text-sm mb-4" style={{ color: TOKENS.ink }}>
              {config.totalQuestions} questions · {config.timeLimit} · Domain filters available
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: TOKENS.inkMuted }}>Total questions</span>
                <span className="text-sm font-medium" style={{ color: TOKENS.azure }}>{config.totalQuestions}</span>
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

          <button
            onClick={() => setShowSetup(false)}
            className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full font-medium text-sm"
            style={{ background: TOKENS.azure, color: TOKENS.bgDeep }}
          >
            Start Practice <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  const answeredCount = Object.keys(answers).length;
  const currentQuestionType = idx < (config.caseStudyCount || 0) ? "CASE STUDY" : "STANDALONE";
  const caseStudyCount = config.caseStudyCount || 0;

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
          {caseStudyCount > 0 ? `${caseStudyCount} case study · ` : ""}{config.totalQuestions} questions · Untimed
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
          Filter by domain ({domainFilter})
        </summary>
        <div className="flex flex-wrap gap-2 mt-2">
          {domains.map((d) => (
            <button
              key={d}
              onClick={() => setDomainFilter(d)}
              className="text-xs rounded-full px-3 py-1.5 flex-shrink-0 whitespace-nowrap transition-colors"
              style={{
                color: domainFilter === d ? TOKENS.bgDeep : TOKENS.inkMuted,
                background: domainFilter === d ? TOKENS.azure : "transparent",
                border: `1px solid ${domainFilter === d ? TOKENS.azure : TOKENS.panelBorder}`,
              }}
            >
              {d}
            </button>
          ))}
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
                    <span className="flex items-center gap-1 text-xs" style={{ color: TOKENS.green }}>
                      <CheckCircle2 size={14} /> Correct
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs" style={{ color: TOKENS.red }}>
                      Incorrect
                    </span>
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
              QUESTION {(idx % order.length) + 1} OF {order.length} · {currentQuestionType}
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
                  <span className="flex items-center gap-1 text-xs" style={{ color: TOKENS.green }}>
                    <CheckCircle2 size={14} /> Correct
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-xs" style={{ color: TOKENS.red }}>
                    Incorrect
                  </span>
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

