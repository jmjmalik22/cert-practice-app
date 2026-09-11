import { FONT_DISPLAY, FONT_MONO } from "../lib/theme.jsx";

// Fixed per-tier palette. A badge is a shareable credential — it should look
// the same regardless of the viewer's site theme, so this is intentionally
// independent of the app's light/dark theme tokens.
const TIER_STYLES = {
  proven: {
    bgFrom: "#F4FBF8",
    bgTo: "#E1F3EA",
    borderFrom: "#7BE0BE",
    borderTo: "#0B6E52",
    wordmarkPrimary: "#123B33",
    wordmarkAccent: "#0F9D74",
    tagline: "#4B7268",
    tierLabel: "#0B6E52",
    examCode: "#123B33",
    examLabel: "#3E7566",
    pillFrom: "#1FAE82",
    pillTo: "#0B6E52",
    pillText: "#FFFFFF",
    skillsLabel: "#4B7268",
    accent: "#0F9D74",
    icon: "bars",
  },
  mastery: {
    bgFrom: "#16264A",
    bgTo: "#0A1730",
    borderFrom: "#CBDDF7",
    borderTo: "#3F6BB0",
    wordmarkPrimary: "#FFFFFF",
    wordmarkAccent: "#5B9BFF",
    tagline: "#9FB4D9",
    tierLabel: "#F3F7FF",
    examCode: "#FFFFFF",
    examLabel: "#B9C6E6",
    pillFrom: "#4C8DFF",
    pillTo: "#1D4ED8",
    pillText: "#FFFFFF",
    skillsLabel: "#9FB4D9",
    accent: "#5B9BFF",
    icon: "book",
  },
  elite: {
    bgFrom: "#1C1A16",
    bgTo: "#000000",
    borderFrom: "#FCE8A8",
    borderTo: "#B8860B",
    wordmarkPrimary: "#FFFFFF",
    wordmarkAccent: "#F0C24B",
    tagline: "#C9B067",
    tierLabel: "#F0C24B",
    examCode: "#FFFFFF",
    examLabel: "#D8C48A",
    pillFrom: "#F5D061",
    pillTo: "#C9942B",
    pillText: "#3A2600",
    skillsLabel: "#C9B067",
    accent: "#F0C24B",
    icon: "star",
  },
};

function TierIcon({ icon, accent, x = 170, y = 358 }) {
  if (icon === "bars") {
    return (
      <g transform={`translate(${x - 22}, ${y - 14})`}>
        <rect x="0" y="16" width="10" height="12" rx="2" fill={accent} opacity="0.9" />
        <rect x="16" y="8" width="10" height="20" rx="2" fill={accent} />
        <rect x="32" y="0" width="10" height="28" rx="2" fill={accent} opacity="0.9" />
      </g>
    );
  }
  if (icon === "book") {
    return (
      <g transform={`translate(${x - 20}, ${y - 14})`} fill="none" stroke={accent} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 4C15 1 6 0 1 2v22c5-2 14-1 19 2z" />
        <path d="M20 4c5-3 14-4 19-2v22c-5-2-14-1-19 2z" />
      </g>
    );
  }
  // star
  return (
    <g transform={`translate(${x - 170}, ${y - 358})`}>
      <path
        d="M170 344 L175.5 358.5 L191 359.5 L179 369.5 L183 385 L170 376 L157 385 L161 369.5 L149 359.5 L164.5 358.5 Z"
        fill={accent}
      />
    </g>
  );
}

function Laurel({ side, accent, yOffset = 0 }) {
  const cx = side === "left" ? 62 : 278;
  const sign = side === "left" ? 1 : -1;
  const leaves = Array.from({ length: 6 }, (_, i) => {
    const cy = 254 + yOffset + i * 14;
    const lx = cx + sign * (8 + i * 3);
    const rot = sign * (26 + i * 5);
    return (
      <ellipse
        key={i}
        cx={lx}
        cy={cy}
        rx="9"
        ry="4.5"
        fill={accent}
        opacity={0.45 + i * 0.09}
        transform={`rotate(${rot} ${lx} ${cy})`}
      />
    );
  });

  return (
    <g>
      <path
        d={`M ${cx} ${250 + yOffset} Q ${cx + sign * 16} ${298 + yOffset} ${cx} ${340 + yOffset}`}
        stroke={accent}
        strokeWidth="2"
        fill="none"
        opacity="0.85"
      />
      {leaves}
    </g>
  );
}

// SVG text doesn't wrap on its own — greedily pack words into lines no wider
// than maxChars (an estimate for this monospace font/size), capped at 2
// lines so a very long label truncates gracefully rather than growing forever.
function wrapLabel(text, maxChars = 27) {
  const words = (text || "").split(" ").filter(Boolean);
  const lines = [];
  let current = "";

  words.forEach((word) => {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  });
  if (current) lines.push(current);

  if (lines.length > 2) {
    return [lines[0], `${lines[1]}…`];
  }
  return lines;
}

// Live, data-driven shield: colors/artwork come from `tier`, everything else
// (exam, score) is rendered as text so the same component serves every exam.
export function BadgeShield({ tier, examCode, examLabel, score, size = 220 }) {
  const style = TIER_STYLES[tier] || TIER_STYLES.proven;
  const bodyId = `bs-body-${tier}`;
  const borderId = `bs-border-${tier}`;
  const pillId = `bs-pill-${tier}`;
  const labelLines = wrapLabel(examLabel);
  const extra = (labelLines.length - 1) * 13;

  return (
    <svg
      viewBox="0 0 340 420"
      width={size}
      height={(size * 420) / 340}
      role="img"
      aria-label={`FabricPrep ${tier} badge — ${examCode} skills assessment, ${score}%+`}
    >
      <defs>
        <linearGradient id={bodyId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={style.bgFrom} />
          <stop offset="100%" stopColor={style.bgTo} />
        </linearGradient>
        <linearGradient id={borderId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={style.borderFrom} />
          <stop offset="100%" stopColor={style.borderTo} />
        </linearGradient>
        <linearGradient id={pillId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={style.pillFrom} />
          <stop offset="100%" stopColor={style.pillTo} />
        </linearGradient>
      </defs>

      <path
        d="M170 16 L300 60 V190 C300 300 240 370 170 404 C100 370 40 300 40 190 V60 Z"
        fill={`url(#${bodyId})`}
        stroke={`url(#${borderId})`}
        strokeWidth="5"
      />
      <path
        d="M170 28 L288 66 V190 C288 292 233 356 170 388 C107 356 52 292 52 190 V66 Z"
        fill="none"
        stroke={style.borderFrom}
        strokeOpacity="0.35"
        strokeWidth="1"
      />

      <text x="170" y="96" textAnchor="middle" fontSize="27" fontWeight="700" fontFamily={FONT_DISPLAY} letterSpacing="-0.01em">
        <tspan fill={style.wordmarkPrimary}>Fabric</tspan>
        <tspan fill={style.wordmarkAccent}>Prep</tspan>
      </text>
      <text x="170" y="115" textAnchor="middle" fontSize="9.5" letterSpacing="0.22em" fontFamily={FONT_MONO} fill={style.tagline}>
        LEARN · PRACTICE · SUCCEED
      </text>
      <line x1="105" y1="128" x2="235" y2="128" stroke={style.accent} strokeOpacity="0.4" strokeWidth="1" />

      <text x="170" y="196" textAnchor="middle" fontSize="42" fontWeight="800" letterSpacing="0.01em" fontFamily={FONT_DISPLAY} fill={style.tierLabel}>
        {tier?.toUpperCase()}
      </text>

      <text x="170" y="224" textAnchor="middle" fontSize="21" fontWeight="700" fontFamily={FONT_DISPLAY} fill={style.examCode}>
        {examCode}
      </text>
      <text x="170" y="242" textAnchor="middle" fontSize="11.5" fontFamily={FONT_MONO} fill={style.examLabel}>
        {labelLines.map((line, i) => (
          <tspan key={line} x="170" dy={i === 0 ? 0 : 13}>
            {line}
          </tspan>
        ))}
      </text>

      {tier === "elite" && <Laurel side="left" accent={style.accent} yOffset={extra} />}
      {tier === "elite" && <Laurel side="right" accent={style.accent} yOffset={extra} />}

      <rect x="95" y={263 + extra} width="150" height="38" rx="19" fill={`url(#${pillId})`} />
      <text x="170" y={288 + extra} textAnchor="middle" fontSize="19" fontWeight="800" fontFamily={FONT_DISPLAY} fill={style.pillText}>
        {score}%+
      </text>

      <text x="170" y={317 + extra} textAnchor="middle" fontSize="10.5" letterSpacing="0.24em" fontFamily={FONT_MONO} fill={style.skillsLabel}>
        SKILLS ASSESSMENT
      </text>
      <text x="170" y={332 + extra} textAnchor="middle" fontSize="7.5" letterSpacing="0.16em" fontFamily={FONT_MONO} fill={style.skillsLabel} opacity="0.75">
        ISSUED BY FABRICPREP.COM
      </text>

      <TierIcon icon={style.icon} accent={style.accent} y={368 + extra} />
    </svg>
  );
}
