import { useMemo } from "react";
import { Bookmark, CheckCircle2, XCircle } from "lucide-react";
import { useTheme, shuffle } from "../lib/theme.jsx";

export function TopBar({ left, right }) {
  return (
    <div className="flex items-center justify-between">
      <div>{left}</div>
      <div>{right}</div>
    </div>
  );
}

export function QuestionCard({ q, selected, revealed, onChoose, bookmarked, onToggleBookmark }) {
  const TOKENS = useTheme();
  // Question banks were authored with the correct option consistently placed
  // first (or otherwise unevenly distributed), which let users pattern-match
  // "the correct answer is always A" instead of learning the material.
  // Shuffle the *display* order per question (stable across re-renders via
  // useMemo keyed on q.id), while opt.id / q.correct keep working exactly
  // as before since each option carries its own id with it.
  const displayOptions = useMemo(() => shuffle(q.options), [q.id]);
  return (
    <div className="rounded-2xl p-5 sm:p-8" style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}>
      <div className="flex items-start justify-between gap-3 mb-7">
        <div className="text-lg sm:text-xl leading-relaxed font-medium min-w-0 break-words" style={{ color: TOKENS.ink }}>{q.question}</div>
        {onToggleBookmark && (
          <button onClick={onToggleBookmark} aria-label={bookmarked ? "Remove bookmark" : "Bookmark question"} aria-pressed={bookmarked} className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: TOKENS.bg, border: `1px solid ${TOKENS.panelBorder}`, cursor: "pointer" }}>
            <Bookmark size={18} color={bookmarked ? TOKENS.amber : TOKENS.inkMuted} fill={bookmarked ? TOKENS.amber : "none"} />
          </button>
        )}
      </div>
      <div className="space-y-3" role="radiogroup" aria-label="Answer options">
        {displayOptions.map((opt, index) => {
          const isSelected = selected === opt.id;
          const isCorrectOpt = opt.id === q.correct;
          let border = TOKENS.panelBorder;
          let bg = "transparent";
          if (revealed) {
            if (isCorrectOpt) { border = TOKENS.green; bg = `${TOKENS.green}14`; }
            else if (isSelected) { border = TOKENS.red; bg = `${TOKENS.red}14`; }
          } else if (isSelected) {
            border = TOKENS.azure; bg = `${TOKENS.azure}14`;
          }
          const statusLabel = revealed
            ? isCorrectOpt
              ? " — correct answer"
              : isSelected
              ? " — your answer, incorrect"
              : ""
            : "";
          return (
            <button
              key={opt.id}
              role="radio"
              aria-checked={isSelected}
              onClick={() => onChoose(opt.id)}
              className="w-full text-left p-4 rounded-xl text-base leading-relaxed flex items-center gap-3 sm:gap-4 transition-colors"
              style={{ border: `1px solid ${border}`, background: bg, color: TOKENS.ink }}
            >
              <span aria-hidden="true" className="w-8 h-8 shrink-0 rounded-lg flex items-center justify-center text-xs font-semibold" style={{ background: isSelected ? TOKENS.azure : TOKENS.bg, color: isSelected ? TOKENS.bgDeep : TOKENS.inkMuted }}>
                {String.fromCharCode(65 + index)}
              </span>
              <span className="flex-1 min-w-0 break-words">
                {opt.text}
                {statusLabel && <span className="sr-only">{statusLabel}</span>}
              </span>
              {revealed && isCorrectOpt && <CheckCircle2 className="shrink-0" size={20} color={TOKENS.green} />}
              {revealed && isSelected && !isCorrectOpt && <XCircle className="shrink-0" size={20} color={TOKENS.red} />}
            </button>
          );
        })}
      </div>
      {revealed && (
        <div className="mt-6 text-base leading-relaxed p-5 rounded-xl" style={{ color: TOKENS.ink, background: TOKENS.bg }} aria-live="polite">
          <p className="font-semibold mb-2">Explanation</p>
          {q.explanation}
        </div>
      )}
    </div>
  );
}

