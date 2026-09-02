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
    <div className="rounded-2xl p-6" style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}>
      <div className="flex items-start justify-between gap-3 mb-5">
        <div className="text-base font-medium" style={{ color: TOKENS.ink }}>{q.question}</div>
        {onToggleBookmark && (
          <button onClick={onToggleBookmark} aria-label="Bookmark question" className="flex-shrink-0" style={{ background: "transparent", border: "none", cursor: "pointer", padding: 0 }}>
            <Bookmark size={18} color={bookmarked ? TOKENS.amber : TOKENS.inkMuted} fill={bookmarked ? TOKENS.amber : "none"} />
          </button>
        )}
      </div>
      <div className="space-y-2.5">
        {displayOptions.map((opt) => {
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
          return (
            <button
              key={opt.id}
              onClick={() => onChoose(opt.id)}
              className="w-full text-left px-4 py-3 rounded-xl text-sm flex items-center justify-between transition-colors"
              style={{ border: `1px solid ${border}`, background: bg, color: TOKENS.ink }}
            >
              <span>{opt.text}</span>
              {revealed && isCorrectOpt && <CheckCircle2 size={16} color={TOKENS.green} />}
              {revealed && isSelected && !isCorrectOpt && <XCircle size={16} color={TOKENS.red} />}
            </button>
          );
        })}
      </div>
      {revealed && (
        <div className="mt-4 text-xs leading-relaxed p-3 rounded-lg" style={{ color: TOKENS.ink, background: TOKENS.bgDeep }}>
          {q.explanation}
        </div>
      )}
    </div>
  );
}

