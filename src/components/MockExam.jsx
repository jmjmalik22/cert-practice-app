import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Clock, CheckCircle2, XCircle, ArrowRight, Flag, ChevronLeft, Lock } from "lucide-react";
import { useTheme, FONT_DISPLAY, FONT_MONO, markAttempted, shuffle } from "../lib/theme.jsx";
import { useAuth } from "../lib/authContext.jsx";
import { GUEST_MOCK_CONFIG, getMockConfig } from "../lib/examCatalog.js";
import { QUESTION_BANK } from "../lib/questionBank/index.js";
import { saveExamResult, recordAttempt } from "../lib/progress.jsx";
import { Chip } from "./Shared.jsx";
import { TopBar, QuestionCard } from "./QuestionUI.jsx";

export function MockExam({ exam, onExit }) {
  const TOKENS = useTheme();
  const { isAuthenticated } = useAuth();
  const pool = QUESTION_BANK[exam].questions;
  const fullConfig = getMockConfig(exam);
  const config = isAuthenticated ? fullConfig : GUEST_MOCK_CONFIG;
  const totalSeconds = config.timeMinutes * 60;
  
  const [order] = useState(() => shuffle(pool).slice(0, Math.min(config.totalQuestions, pool.length)));
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const [finished, setFinished] = useState(false);
  const [showSetup, setShowSetup] = useState(true);
  const timerRef = useRef(null);
  const answersRef = useRef(answers);
  const secondsLeftRef = useRef(secondsLeft);
  const finishedRef = useRef(false);

  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

  useEffect(() => {
    secondsLeftRef.current = secondsLeft;
  }, [secondsLeft]);

  function finishExam(remainingSeconds = secondsLeftRef.current) {
    if (finishedRef.current) return;
    finishedRef.current = true;

    const currentAnswers = answersRef.current;
    const correctCount = order.filter((qq) => currentAnswers[qq.id] === qq.correct).length;
    const incorrectCount = order.length - correctCount;
    const percentage = Math.round((correctCount / order.length) * 100);
    const timeSpent = totalSeconds - remainingSeconds;

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
      timeSpent,
    });

    setFinished(true);
  }

  useEffect(() => {
    if (finished || showSetup) return undefined;
    timerRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(timerRef.current);
          finishExam(0);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [finished, showSetup]);

  const q = order[idx];
  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");

  function choose(optId) {
    setAnswers((a) => ({ ...a, [q.id]: optId }));
  }

  function goto(i) {
    setIdx(Math.max(0, Math.min(order.length - 1, i)));
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

        <div className="flex justify-center mt-8">
          <button onClick={onExit} className="px-5 py-2.5 rounded-full font-medium text-sm" style={{ background: TOKENS.azure, color: TOKENS.bgDeep }}>
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
          right={<Chip tone="amber">{exam} · Practice Exam</Chip>}
        />

        <div className="mt-8">
          <h1 className="text-2xl sm:text-3xl font-semibold mb-4" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
            {exam} Practice Exam
          </h1>
          <p className="text-sm mb-8" style={{ color: TOKENS.inkMuted }}>
            The full timed experience. No feedback until you submit your answers, just like the real exam.
          </p>

          {/* Trial banner for guests */}
          {!isAuthenticated && (
            <div 
              className="rounded-xl p-4 mb-6"
              style={{ background: `${TOKENS.amber}15`, border: `1px solid ${TOKENS.amber}40` }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Lock size={16} color={TOKENS.amber} />
                <span className="text-sm font-medium" style={{ color: TOKENS.amber }}>Free Trial</span>
              </div>
              <p className="text-xs mb-3" style={{ color: TOKENS.inkMuted }}>
                You&apos;re trying the demo with 5 questions. Sign in to unlock the full {fullConfig.totalQuestions}-question exam.
              </p>
              <Link 
                to="/login"
                className="text-xs font-medium"
                style={{ color: TOKENS.azure }}
              >
                Sign in for full access →
              </Link>
            </div>
          )}

          <h2 className="text-sm font-semibold mb-4" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
            Exam setup
          </h2>
          <div className="rounded-xl p-4 mb-8" style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}>
            <div className="text-sm mb-4" style={{ color: TOKENS.ink }}>
              {config.totalQuestions} questions {config.caseStudyQuestions > 0 && `(${config.caseStudyQuestions} case study + ${config.standaloneQuestions} standalone)`} · {config.timeMinutes} min
            </div>
            <div className="space-y-3">
              {config.caseStudyQuestions > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-sm" style={{ color: TOKENS.inkMuted }}>Case study questions</span>
                  <span className="text-sm font-medium" style={{ color: TOKENS.azure }}>{config.caseStudyQuestions}</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: TOKENS.inkMuted }}>Standalone questions</span>
                <span className="text-sm font-medium" style={{ color: TOKENS.azure }}>{config.standaloneQuestions}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: TOKENS.inkMuted }}>Time limit</span>
                <span className="text-sm font-medium" style={{ color: TOKENS.azure }}>{config.timeMinutes} min</span>
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
            {config.caseStudyQuestions > 0 && (
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${TOKENS.azure}20` }}>
                  <span style={{ color: TOKENS.azure, fontSize: '0.75rem' }}>3</span>
                </div>
                <div>
                  <div className="text-sm font-medium" style={{ color: TOKENS.ink }}>The case study comes first</div>
                  <div className="text-xs" style={{ color: TOKENS.inkMuted }}>Once you leave the case study section you cannot return to it, exactly as in the real exam.</div>
                </div>
              </div>
            )}
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${TOKENS.azure}20` }}>
                <span style={{ color: TOKENS.azure, fontSize: '0.75rem' }}>{config.caseStudyQuestions > 0 ? '4' : '3'}</span>
              </div>
              <div>
                <div className="text-sm font-medium" style={{ color: TOKENS.ink }}>Auto-submit at time-up</div>
                <div className="text-xs" style={{ color: TOKENS.inkMuted }}>When the timer reaches zero the exam submits automatically and you land on your results.</div>
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
          <button onClick={onExit} className="flex items-center gap-1 text-sm" style={{ color: TOKENS.inkMuted }}>
            <ChevronLeft size={16} /> Exit
          </button>
        }
        right={
          <div className="flex items-center gap-2">
            <Clock size={14} color={secondsLeft < 30 ? TOKENS.red : TOKENS.amber} />
            <span className="text-sm font-mono" style={{ color: secondsLeft < 30 ? TOKENS.red : TOKENS.ink }}>{mm}:{ss}</span>
          </div>
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
            onClick={() => finishExam()}
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

