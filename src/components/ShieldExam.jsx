import { useState, useEffect, useRef } from "react";
import { Clock, CheckCircle2, XCircle, ArrowRight, Flag, ChevronLeft, Shield } from "lucide-react";
import { useTheme, FONT_DISPLAY, FONT_MONO, markAttempted, shuffle } from "../lib/theme.jsx";
import { SHIELD_CONFIG } from "../lib/examCatalog.js";
import { QUESTION_BANK, EXAM_META } from "../lib/questionBank/index.js";
import { saveExamResult, recordAttempt } from "../lib/progress.jsx";
import { SHIELD_TIERS, recordShieldResult } from "../lib/badges.js";
import { useExamExitGuard, EXAM_EXIT_WARNING } from "../lib/examGuard.js";
import { Chip } from "./Shared.jsx";
import { BadgeShield } from "./BadgeShield.jsx";
import { TopBar, QuestionCard } from "./QuestionUI.jsx";

export function ShieldExam({ exam, onExit }) {
  const TOKENS = useTheme();
  const pool = QUESTION_BANK[exam].questions;
  const totalSeconds = SHIELD_CONFIG.timeMinutes * 60;

  const [order] = useState(() => shuffle(pool).slice(0, SHIELD_CONFIG.totalQuestions));
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const [finished, setFinished] = useState(false);
  const [showSetup, setShowSetup] = useState(true);
  const [awardedTier, setAwardedTier] = useState(null);
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

  // Only guard the active question screen — nothing is at stake yet on the
  // setup screen, and the sitting is already saved once results are shown.
  useExamExitGuard(!showSetup && !finished);

  function finishExam(remainingSeconds = secondsLeftRef.current) {
    if (finishedRef.current) return;
    finishedRef.current = true;

    const currentAnswers = answersRef.current;
    const correctCount = order.filter((qq) => currentAnswers[qq.id] === qq.correct).length;
    const percentage = Math.round((correctCount / order.length) * 100);

    // Shield sittings are scored assessments, not study — record the attempts
    // as mock-exam attempts so they can't inflate practice-mode mastery.
    order.forEach((qq) => {
      markAttempted(exam, qq.id);
      recordAttempt(exam, qq.id, currentAnswers[qq.id] === qq.correct, 0, true);
    });

    saveExamResult(exam, {
      score: correctCount,
      total: order.length,
      percentage,
      correct: correctCount,
      incorrect: order.length - correctCount,
      timeSpent: totalSeconds - remainingSeconds,
    });

    setAwardedTier(recordShieldResult(exam, percentage));
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

  if (finished) {
    const correctCount = order.filter((qq) => answers[qq.id] === qq.correct).length;
    const percentage = Math.round((correctCount / order.length) * 100);
    const toNextTier = SHIELD_TIERS.slice()
      .reverse()
      .find((tier) => percentage < tier.minPercentage);

    return (
      <div className="min-h-full px-6 py-8 max-w-2xl mx-auto w-full">
        <TopBar
          left={<span className="text-sm font-medium" style={{ color: TOKENS.ink }}>Results</span>}
          right={<Chip tone="amber">{exam} · Shield exam</Chip>}
        />

        <div
          className="mt-8 rounded-2xl p-6 flex flex-col items-center text-center"
          style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}
        >
          {awardedTier ? (
            <>
              <BadgeShield
                tier={awardedTier.id}
                examCode={exam}
                examLabel={EXAM_META[exam]?.label}
                score={awardedTier.minPercentage}
                size={180}
              />
              <div className="text-lg font-semibold mt-4" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
                {awardedTier.label} shield earned
              </div>
            </>
          ) : (
            <>
              <Shield size={48} color={TOKENS.inkMuted} />
              <div className="text-lg font-semibold mt-4" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
                No shield this time
              </div>
              <div className="text-sm mt-1" style={{ color: TOKENS.inkMuted }}>
                You need {SHIELD_CONFIG.passPercentage}% to earn a shield. Review the answers below and sit it again.
              </div>
            </>
          )}

          <div className="text-4xl font-semibold mt-5" style={{ color: TOKENS.ink, fontFamily: FONT_MONO }}>
            {correctCount}/{order.length}
          </div>
          <div className="text-sm mt-1" style={{ color: TOKENS.inkMuted }}>{percentage}% correct</div>

          {toNextTier && (
            <div className="text-xs mt-3" style={{ color: TOKENS.inkMuted }}>
              {toNextTier.minPercentage}% earns the {toNextTier.label} shield.
            </div>
          )}
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
            Back to exam hub
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
          right={<Chip tone="amber">{exam} · Shield exam</Chip>}
        />

        <div className="mt-8">
          <h1 className="text-2xl sm:text-3xl font-semibold mb-4" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
            {exam} Shield Exam
          </h1>
          <p className="text-sm mb-8" style={{ color: TOKENS.inkMuted }}>
            A full {SHIELD_CONFIG.totalQuestions}-question scored sitting. Score {SHIELD_CONFIG.passPercentage}% or
            higher and you earn a shareable, verifiable shield for {exam}.
          </p>

          <h2 className="text-sm font-semibold mb-4" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
            Shield tiers
          </h2>
          <div className="rounded-xl p-4 mb-8" style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}>
            <div className="space-y-3">
              {SHIELD_TIERS.slice().reverse().map((tier) => (
                <div key={tier.id} className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm" style={{ color: TOKENS.inkMuted }}>
                    <Shield size={14} color={TOKENS.amber} /> {tier.label}
                  </span>
                  <span className="text-sm font-medium" style={{ color: TOKENS.azure }}>{tier.minPercentage}%+</span>
                </div>
              ))}
            </div>
          </div>

          <h2 className="text-sm font-semibold mb-4" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
            Exam setup
          </h2>
          <div className="rounded-xl p-4 mb-8" style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: TOKENS.inkMuted }}>Questions</span>
                <span className="text-sm font-medium" style={{ color: TOKENS.azure }}>{SHIELD_CONFIG.totalQuestions}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: TOKENS.inkMuted }}>Time limit</span>
                <span className="text-sm font-medium" style={{ color: TOKENS.azure }}>{SHIELD_CONFIG.timeMinutes} min</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: TOKENS.inkMuted }}>Pass mark</span>
                <span className="text-sm font-medium" style={{ color: TOKENS.azure }}>{SHIELD_CONFIG.passPercentage}%</span>
              </div>
            </div>
          </div>

          <h2 className="text-sm font-semibold mb-4" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
            What to expect
          </h2>
          <div className="space-y-4 mb-8">
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${TOKENS.azure}20` }}>
                <span style={{ color: TOKENS.azure, fontSize: "0.75rem" }}>1</span>
              </div>
              <div>
                <div className="text-sm font-medium" style={{ color: TOKENS.ink }}>No feedback during the exam</div>
                <div className="text-xs" style={{ color: TOKENS.inkMuted }}>Your score, the answers and explanations all appear only after you submit.</div>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${TOKENS.azure}20` }}>
                <span style={{ color: TOKENS.azure, fontSize: "0.75rem" }}>2</span>
              </div>
              <div>
                <div className="text-sm font-medium" style={{ color: TOKENS.ink }}>Auto-submit at time-up</div>
                <div className="text-xs" style={{ color: TOKENS.inkMuted }}>When the timer reaches zero the exam submits automatically and you land on your results.</div>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${TOKENS.azure}20` }}>
                <span style={{ color: TOKENS.azure, fontSize: "0.75rem" }}>3</span>
              </div>
              <div>
                <div className="text-sm font-medium" style={{ color: TOKENS.ink }}>Retake as often as you like</div>
                <div className="text-xs" style={{ color: TOKENS.inkMuted }}>Only your best sitting counts, so a weaker retake can never downgrade a shield you already hold.</div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowSetup(false)}
            className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full font-medium text-sm"
            style={{ background: TOKENS.azure, color: TOKENS.bgDeep }}
          >
            Start Shield Exam <ArrowRight size={16} />
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
          <div className="flex items-center gap-2">
            <Clock size={14} color={secondsLeft < 300 ? TOKENS.red : TOKENS.amber} />
            <span className="text-sm font-mono" style={{ color: secondsLeft < 300 ? TOKENS.red : TOKENS.ink }}>{mm}:{ss}</span>
          </div>
        }
      />

      <div className="mt-6 mb-3 flex items-center justify-between">
        <span className="text-xs" style={{ color: TOKENS.inkMuted }}>Question {idx + 1} of {order.length}</span>
        <span className="text-xs" style={{ color: TOKENS.inkMuted }}>{Object.keys(answers).length} answered</span>
      </div>

      <div className="flex gap-0.5 mb-5">
        {order.map((qq, i) => (
          <div
            key={qq.id}
            className="h-1.5 flex-1 rounded-full"
            style={{
              background: answers[qq.id] ? TOKENS.azure : i === idx ? TOKENS.inkMuted : TOKENS.panelBorder,
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
