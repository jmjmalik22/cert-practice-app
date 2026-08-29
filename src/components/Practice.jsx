import { useState, useEffect, useMemo } from "react";
import { ChevronLeft, ArrowRight } from "lucide-react";
import { useTheme, FONT_DISPLAY, FONT_MONO, getBookmarks, toggleBookmarkStorage, markAttempted, shuffle } from "../lib/theme.jsx";
import { QUESTION_BANK } from "../lib/questionBank.jsx";
import { recordAttempt, toggleBookmark, getBookmarks as getProgressBookmarks } from "../lib/progress.jsx";
import { Chip } from "./Shared.jsx";
import { TopBar, QuestionCard } from "./QuestionUI.jsx";

export function Practice({ exam, onExit }) {
  const TOKENS = useTheme();
  const pool = QUESTION_BANK[exam].questions;
  const domains = useMemo(() => ["All", ...Array.from(new Set(pool.map((q) => q.domain)))], [pool]);
  const [domainFilter, setDomainFilter] = useState("All");
  const filteredPool = useMemo(
    () => (domainFilter === "All" ? pool : pool.filter((q) => q.domain === domainFilter)),
    [pool, domainFilter]
  );
  const [order, setOrder] = useState(() => shuffle(filteredPool));
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState({ correct: 0, seen: 0 });
  const [bookmarks, setBookmarks] = useState(() => new Set(getBookmarks()));

  useEffect(() => {
    setOrder(shuffle(filteredPool));
    setIdx(0);
    setSelected(null);
    setRevealed(false);
  }, [filteredPool]);

  const q = order[idx % order.length];
  const bmKey = q ? `${exam}:${q.id}` : "";

  function choose(optId) {
    if (revealed || !q) return;
    setSelected(optId);
    setRevealed(true);
    const isCorrect = optId === q.correct;
    setScore((s) => ({ correct: s.correct + (isCorrect ? 1 : 0), seen: s.seen + 1 }));
    markAttempted(exam, q.id);
    // Record in progress tracking
    recordAttempt(exam, q.id, isCorrect);
  }

  const [showResults, setShowResults] = useState(false);

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
    setSelected(null);
    setRevealed(false);
    setIdx(0);
    setScore({ correct: 0, seen: 0 });
    setOrder(shuffle(filteredPool));
  }

  function toggleBm() {
    const arr = toggleBookmarkStorage(bmKey);
    setBookmarks(new Set(arr));
    // Also record in progress tracking
    toggleBookmark(exam, q.id);
  }

  return (
    <div className="min-h-full flex flex-col px-6 py-8 max-w-2xl mx-auto w-full">
      <TopBar
        left={
          <button onClick={onExit} className="flex items-center gap-1 text-sm" style={{ color: TOKENS.inkMuted }}>
            <ChevronLeft size={16} /> Exit
          </button>
        }
        right={<Chip tone="azure">{exam} · Practice</Chip>}
      />

      <div className="flex flex-wrap gap-2 mt-5">
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

      {showResults ? (
        <div className="mt-8 flex flex-col items-center text-center">
          <div className="text-5xl mb-4">
            {score.correct === score.seen ? "🎉" : score.correct >= score.seen * 0.7 ? "👍" : "💪"}
          </div>
          <h2 className="text-xl font-semibold mb-2" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
            Practice Complete!
          </h2>
          <p className="text-sm mb-6" style={{ color: TOKENS.inkMuted }}>
            You&apos;ve answered all {order.length} questions
          </p>

          <div className="grid grid-cols-3 gap-4 mb-8 w-full max-w-sm">
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

          <div className="flex gap-3">
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
          <div className="mt-5 mb-3 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-xs" style={{ color: TOKENS.inkMuted }}>{q.domain}</span>
            <div className="flex items-center gap-3">
              <span className="text-xs" style={{ color: TOKENS.inkMuted, fontFamily: FONT_MONO }}>
                Question {(idx % order.length) + 1} of {order.length}
              </span>
              <span className="text-xs" style={{ color: TOKENS.inkMuted, fontFamily: FONT_MONO }}>
                Score: {score.correct}/{score.seen}
              </span>
            </div>
          </div>

          <QuestionCard q={q} selected={selected} revealed={revealed} onChoose={choose} bookmarked={bookmarks.has(bmKey)} onToggleBookmark={toggleBm} />

          {revealed && (
            <div className="flex justify-end mt-5">
              <button
                onClick={next}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm"
                style={{ background: TOKENS.azure, color: TOKENS.bgDeep }}
              >
                {idx + 1 >= order.length ? "View Results" : "Next question"} <ArrowRight size={16} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

