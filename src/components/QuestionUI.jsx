import { Bookmark, CheckCircle2, XCircle } from "lucide-react";
import { useTheme } from "../lib/theme.jsx";

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
        {q.options.map((opt) => {
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
        <div className="mt-4 text-xs leading-relaxed p-3 rounded-lg" style={{ color: TOKENS.inkMuted, background: "#0E1626" }}>
          {q.explanation}
        </div>
      )}
    </div>
  );
}

