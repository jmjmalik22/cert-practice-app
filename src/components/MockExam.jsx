import { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, XCircle, ArrowRight, Flag, ChevronLeft, RotateCcw } from "lucide-react";
import { useTheme, FONT_DISPLAY, FONT_MONO, markAttempted, shuffle } from "../lib/theme.jsx";
import { MOCK_CONFIG } from "../lib/examCatalog.js";
import { QUESTION_BANK } from "../lib/questionBank/index.js";
import { saveExamResult, recordAttempt } from "../lib/progress.jsx";
import { useExamExitGuard, EXAM_EXIT_WARNING } from "../lib/examGuard.js";
import {
  SESSION_MODE,
  loadPersistedSession,
  savePersistedSession,
  clearPersistedSession,
} from "../lib/sessionPersistence.js";
import { Chip, SessionResumePrompt } from "./Shared.jsx";
import { TopBar, QuestionCard } from "./QuestionUI.jsx";

export function MockExam({ exam, onExit, isAuthenticated, onStartPractice }) {
  const TOKENS = useTheme();
  const pool = QUESTION_BANK[exam].questions;
  const totalQuestions = Math.min(MOCK_CONFIG.totalQuestions, pool.length);
  const questionsById = useMemo(() => new Map(pool.map((qq) => [qq.id, qq])), [pool]);

  const [order, setOrder] = useState(() => shuffle(pool).slice(0, totalQuestions));
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showSetup, setShowSetup] = useState(true);
  // A persisted session found for this exam on mount, awaiting the learner's
  // resume-or-discard choice.
  const [resumePrompt, setResumePrompt] = useState(null);
  const timerRef = useRef(null);
  const answersRef = useRef(answers);
  const elapsedRef = useRef(0);
  const finishedRef = useRef(false);

  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

  useEffect(() => {
    elapsedRef.current = elapsedSeconds;
  }, [elapsedSeconds]);

  // Only guard the active question screen — nothing is at stake yet on the
  // setup screen, and the attempt is already saved once results are shown.
  useExamExitGuard(!showSetup && !finished);

  // Check once, on mount, for a persisted session for this exam. Since
  // `showSetup` starts true and nothing here flips it, this always takes
  // precedence over the setup screen.
  useEffect(() => {
    setResumePrompt(loadPersistedSession(SESSION_MODE.MOCK, exam));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Autosave the in-progress sitting (question order, position, answers,
  // elapsed time) so a refresh/crash/accidental nav can recover it.
  useEffect(() => {
    if (showSetup || finished || resumePrompt) return;
    savePersistedSession(SESSION_MODE.MOCK, exam, {
      orderIds: order.map((qq) => qq.id),
      idx,
      answers,
      elapsedSeconds,
    });
  }, [showSetup, finished, resumePrompt, exam, order, idx, answers, elapsedSeconds]);

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
    setOrder(restoredOrder);
    setIdx(Math.min(persisted.idx || 0, restoredOrder.length - 1));
    setAnswers(persisted.answers || {});
    setElapsedSeconds(persisted.elapsedSeconds || 0);
    elapsedRef.current = persisted.elapsedSeconds || 0;
    setShowSetup(false);
    setResumePrompt(null);
  }

  function handleDiscardSession() {
    clearPersistedSession(SESSION_MODE.MOCK, exam);
    setResumePrompt(null);
  }

  function finishExam() {
    if (finishedRef.current) return;
    finishedRef.current = true;

    const currentAnswers = answersRef.current;
    const correctCount = order.filter((qq) => currentAnswers[qq.id] === qq.correct).length;
    const incorrectCount = order.length - correctCount;
    const percentage = Math.round((correctCount / order.length) * 100);

    // Save each question attempt (mark as mock exam)
    order.forEach((qq) => {
      const isCorrect = currentAnswers[qq.id] === qq.correct;
      markAttempted(exam, qq.id);
      recordAttempt(exam, qq.id, isCorrect, 0, true); // true = isMockExam
    });

    // Save exam result
    saveExamResult(exam, {
      score: correctCount,
      total: order.length,
      percentage,
      correct: correctCount,
      incorrect: incorrectCount,
      timeSpent: elapsedRef.current,
      mode: "mock",
    });

    // Session finished normally — nothing left to resume next time.
    clearPersistedSession(SESSION_MODE.MOCK, exam);
    setFinished(true);
  }

  // Untimed — the clock counts up for reference only and never ends the exam.
  useEffect(() => {
    if (finished || showSetup || resumePrompt) return undefined;
    timerRef.current = setInterval(() => setElapsedSeconds((s) => s + 1), 1000);
    return () => clearInterval(timerRef.current);
  }, [finished, showSetup, resumePrompt]);

  const q = order[idx];
  const mm = String(Math.floor(elapsedSeconds / 60)).padStart(2, "0");
  const ss = String(elapsedSeconds % 60).padStart(2, "0");

  function choose(optId) {
    setAnswers((a) => ({ ...a, [q.id]: optId }));
  }

  function goto(i) {
    setIdx(Math.max(0, Math.min(order.length - 1, i)));
  }

  function handleExit() {
    if (window.confirm(EXAM_EXIT_WARNING)) onExit();
  }

  function handleSubmitClick() {
    const unanswered = order.length - Object.keys(answers).length;
    if (unanswered > 0) {
      const noun = unanswered === 1 ? "question" : "questions";
      if (!window.confirm(`You have ${unanswered} unanswered ${noun}. Submit anyway?`)) return;
    }
    finishExam();
  }

  function restart() {
    setOrder(shuffle(pool).slice(0, totalQuestions));
    setAnswers({});
    setIdx(0);
    setElapsedSeconds(0);
    elapsedRef.current = 0;
    finishedRef.current = false;
    setFinished(false);
    setShowSetup(false);
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
          right={<Chip tone="amber">{exam} · Mock exam</Chip>}
        />
        <SessionResumePrompt
          examLabel={`${exam} mock exam`}
          detail={`${answeredCountResume} of ${totalResume} answered`}
          onResume={handleResumeSession}
          onDiscard={handleDiscardSession}
        />
      </div>
    );
  }

  if (finished) {
    const correctCount = order.filter((qq) => answers[qq.id] === qq.correct).length;
    return (
      <div className="min-h-full px-6 py-8 max-w-2xl mx-auto w-full">
        <TopBar left={<span className="text-sm font-medium" style={{ color: TOKENS.ink }}>Results</span>} right={<Chip tone="amber">{exam} · Mock exam</Chip>} />

        <div className="mt-8 rounded-2xl p-6 text-center" style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}>
          <div className="text-5xl font-semibold" style={{ color: TOKENS.ink, fontFamily: FONT_MONO }}>
            {correctCount}/{order.length}
          </div>
          <div className="text-sm mt-2" style={{ color: TOKENS.inkMuted }}>
            {Math.round((correctCount / order.length) * 100)}% correct
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {order.map((qq, i) => {
            const given = answers[qq.id];
            const isCorrect = given === qq.correct;
            return (
              <div key={qq.id} className="rounded-xl p-4" style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}>
                <div className="flex items-start gap-2">
                  {isCorrect ? <CheckCircle2 size={18} color={TOKENS.green} /> : <XCircle size={18} color={TOKENS.red} />}
                  <div>
                    <div className="text-sm font-medium" style={{ color: TOKENS.ink }}>
                      Q{i + 1}. {qq.question}
                    </div>
                    <div className="text-xs mt-2" style={{ color: TOKENS.inkMuted }}>
                      {given ? (
                        <>Your answer: <span style={{ color: isCorrect ? TOKENS.green : TOKENS.red }}>{qq.options.find((o) => o.id === given)?.text}</span></>
                      ) : (
                        <span style={{ color: TOKENS.amber }}>Not answered</span>
                      )}
                    </div>
                    {!isCorrect && (
                      <div className="text-xs mt-1" style={{ color: TOKENS.green }}>
                        Correct: {qq.options.find((o) => o.id === qq.correct)?.text}
                      </div>
                    )}
                    <div className="text-xs mt-2" style={{ color: TOKENS.inkMuted }}>{qq.explanation}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 rounded-2xl p-5 text-center" style={{ background: `${TOKENS.azure}0D`, border: `1px solid ${TOKENS.azure}35` }}>
          {isAuthenticated ? (
            <>
              <div className="text-sm font-medium mb-3" style={{ color: TOKENS.ink }}>
                That&apos;s just {order.length} of the {pool.length} {exam} questions available.
              </div>
              <button
                onClick={onStartPractice}
                className="px-5 py-2.5 rounded-full font-medium text-sm"
                style={{ background: TOKENS.azure, color: TOKENS.bgDeep }}
              >
                Practice all {pool.length} questions
              </button>
            </>
          ) : (
            <>
              <div className="text-sm font-medium mb-3" style={{ color: TOKENS.ink }}>
                Create a free account to unlock all {pool.length} {exam} questions, save your progress, and sit
                the scored Shield exam.
              </div>
              <Link
                to="/login?mode=signup"
                className="inline-block px-5 py-2.5 rounded-full font-medium text-sm"
                style={{ background: TOKENS.azure, color: TOKENS.bgDeep }}
              >
                Create free account
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center justify-center gap-4 mt-5">
          <button
            onClick={restart}
            className="flex items-center gap-1.5 text-sm font-medium"
            style={{ color: TOKENS.ink }}
          >
            <RotateCcw size={14} /> Retake mock exam
          </button>
          <button onClick={onExit} className="text-sm" style={{ color: TOKENS.inkMuted }}>
            Back to home
          </button>
        </div>
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
          right={<Chip tone="amber">{exam} · Mock exam</Chip>}
        />

        <div className="mt-8">
          <h1 className="text-2xl sm:text-3xl font-semibold mb-4" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
            {exam} Mock Exam
          </h1>
          <p className="text-sm mb-8" style={{ color: TOKENS.inkMuted }}>
            A quick, untimed five-question check. No feedback until you submit, just like the real exam.
          </p>

          <h2 className="text-sm font-semibold mb-4" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
            Exam setup
          </h2>
          <div className="rounded-xl p-4 mb-8" style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: TOKENS.inkMuted }}>Questions</span>
                <span className="text-sm font-medium" style={{ color: TOKENS.azure }}>{order.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: TOKENS.inkMuted }}>Time limit</span>
                <span className="text-sm font-medium" style={{ color: TOKENS.azure }}>Untimed</span>
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
                <div className="text-sm font-medium" style={{ color: TOKENS.ink }}>No feedback during the exam</div>
                <div className="text-xs" style={{ color: TOKENS.inkMuted }}>Results, explanations and your score appear only on the summary after you finish.</div>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${TOKENS.azure}20` }}>
                <span style={{ color: TOKENS.azure, fontSize: '0.75rem' }}>2</span>
              </div>
              <div>
                <div className="text-sm font-medium" style={{ color: TOKENS.ink }}>Move freely and change answers</div>
                <div className="text-xs" style={{ color: TOKENS.inkMuted }}>Navigate between questions at any time. Answers stay editable until final submission.</div>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${TOKENS.azure}20` }}>
                <span style={{ color: TOKENS.azure, fontSize: '0.75rem' }}>3</span>
              </div>
              <div>
                <div className="text-sm font-medium" style={{ color: TOKENS.ink }}>Take as long as you need</div>
                <div className="text-xs" style={{ color: TOKENS.inkMuted }}>There is no time limit — the clock only tracks how long you spent. Submit when you&apos;re ready.</div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowSetup(false)}
            className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full font-medium text-sm"
            style={{ background: TOKENS.azure, color: TOKENS.bgDeep }}
          >
            Start Exam <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full flex flex-col px-6 py-8 max-w-2xl mx-auto w-full">
      <TopBar
        left={
          <button onClick={handleExit} className="flex items-center gap-1 text-sm" style={{ color: TOKENS.inkMuted }}>
            <ChevronLeft size={16} /> Exit
          </button>
        }
        right={
          <span className="text-sm font-mono" style={{ color: TOKENS.inkMuted }}>{mm}:{ss}</span>
        }
      />

      <div className="mt-6 mb-3 flex items-center justify-between">
        <span className="text-xs" style={{ color: TOKENS.inkMuted }}>Question {idx + 1} of {order.length}</span>
        <span className="text-xs" style={{ color: TOKENS.inkMuted }}>{Object.keys(answers).length} answered</span>
      </div>

      <div className="flex gap-1 mb-5">
        {order.map((qq, i) => (
          <div
            key={qq.id}
            className="h-1.5 flex-1 rounded-full"
            style={{
              background: answers[qq.id]
                ? TOKENS.azure
                : i === idx
                ? TOKENS.inkMuted
                : TOKENS.panelBorder,
            }}
          />
        ))}
      </div>

      <QuestionCard q={q} selected={answers[q.id] || null} revealed={false} onChoose={choose} />

      <div className="flex items-center justify-between mt-5">
        <button
          onClick={() => goto(idx - 1)}
          disabled={idx === 0}
          className="px-4 py-2 rounded-full text-sm font-medium disabled:opacity-30"
          style={{ border: `1px solid ${TOKENS.panelBorder}`, color: TOKENS.ink }}
        >
          Back
        </button>
        {idx === order.length - 1 ? (
          <button
            onClick={handleSubmitClick}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm"
            style={{ background: TOKENS.green, color: TOKENS.bgDeep }}
          >
            <Flag size={16} /> Submit exam
          </button>
        ) : (
          <button
            onClick={() => goto(idx + 1)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm"
            style={{ background: TOKENS.azure, color: TOKENS.bgDeep }}
          >
            Next <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

