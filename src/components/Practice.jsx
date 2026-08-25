import { useState, useEffect, useMemo } from "react";
import { ChevronLeft, ArrowRight } from "lucide-react";
import { useTheme, FONT_MONO, getBookmarks, toggleBookmarkStorage, markAttempted, shuffle } from "../lib/theme.jsx";
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

  function next() {
    setSelected(null);
    setRevealed(false);
    setIdx((i) => i + 1);
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
              color: domainFilter === d ? "#04101F" : TOKENS.inkMuted,
              background: domainFilter === d ? TOKENS.azure : "transparent",
              border: `1px solid ${domainFilter === d ? TOKENS.azure : TOKENS.panelBorder}`,
            }}
          >
            {d}
          </button>
        ))}
      </div>

      {!q ? (
        <div className="mt-8 text-sm text-center" style={{ color: TOKENS.inkMuted }}>
          No questions in this domain.
        </div>
      ) : (
        <>
          <div className="mt-5 mb-3 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-xs" style={{ color: TOKENS.inkMuted }}>{q.domain}</span>
            <span className="text-xs" style={{ color: TOKENS.inkMuted, fontFamily: FONT_MONO }}>
              Score: {score.correct}/{score.seen}
            </span>
          </div>

          <QuestionCard q={q} selected={selected} revealed={revealed} onChoose={choose} bookmarked={bookmarks.has(bmKey)} onToggleBookmark={toggleBm} />

          {revealed && (
            <div className="flex justify-end mt-5">
              <button
                onClick={next}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm"
                style={{ background: TOKENS.azure, color: "#04101F" }}
              >
                Next question <ArrowRight size={16} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

