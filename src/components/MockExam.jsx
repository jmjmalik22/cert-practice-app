import { useState, useEffect, useRef } from "react";
import { Clock, CheckCircle2, XCircle, ArrowRight, Flag, ChevronLeft } from "lucide-react";
import { useTheme, FONT_MONO, MOCK_LENGTH, MOCK_SECONDS, markAttempted, shuffle } from "../lib/theme.jsx";
import { QUESTION_BANK } from "../lib/questionBank.jsx";
import { saveExamResult, recordAttempt } from "../lib/progress.jsx";
import { Chip } from "./Shared.jsx";
import { TopBar, QuestionCard } from "./QuestionUI.jsx";

export function MockExam({ exam, onExit }) {
  const TOKENS = useTheme();
  const pool = QUESTION_BANK[exam].questions;
  const [order] = useState(() => shuffle(pool).slice(0, Math.min(MOCK_LENGTH, pool.length)));
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [secondsLeft, setSecondsLeft] = useState(MOCK_SECONDS);
  const [finished, setFinished] = useState(false);
  const timerRef = useRef(null);

  function finishExam() {
    const correctCount = order.filter((qq) => answers[qq.id] === qq.correct).length;
    const incorrectCount = order.length - correctCount;
    const percentage = Math.round((correctCount / order.length) * 100);
    const timeSpent = MOCK_SECONDS - secondsLeft;

    // Save each question attempt (mark as mock exam)
    order.forEach((qq) => {
      const isCorrect = answers[qq.id] === qq.correct;
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
    if (finished) return;
    timerRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(timerRef.current);
          finishExam();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [finished]);

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
            style={{ background: answers[qq.id] ? TOKENS.azure : i === idx ? TOKENS.panelBorder : "#1B2740" }}
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

