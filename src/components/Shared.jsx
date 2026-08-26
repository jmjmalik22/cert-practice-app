import { Link } from "react-router-dom";
import { LayoutDashboard, Home, BookOpen } from "lucide-react";
import { useTheme, FONT_DISPLAY, FONT_MONO } from "../lib/theme.jsx";
import { UserBadge } from "./UserProfile.jsx";

export function Chip({ children, tone = "azure" }) {
  const TOKENS = useTheme();
  const colors = { azure: TOKENS.azure, amber: TOKENS.amber, green: TOKENS.green, red: TOKENS.red };
  return (
    <span
      className="text-xs font-medium px-2 py-1 rounded-full"
      style={{ color: colors[tone], background: `${colors[tone]}1A`, border: `1px solid ${colors[tone]}40`, fontFamily: FONT_MONO }}
    >
      {children}
    </span>
  );
}

// Medallion pipeline motif — bronze/silver/gold layers, the same
// architecture the study guide teaches, rendered as line art.
export function MedallionMotif({ opacity = 1 }) {
  const TOKENS = useTheme();
  const nodes = [
    { x: 60, cy: "Bronze", color: "#C58A5A" },
    { x: 260, cy: "Silver", color: "#B9C2D0" },
    { x: 460, cy: "Gold", color: "#E8B84B" },
  ];
  return (
    <svg viewBox="0 0 520 140" width="100%" style={{ maxWidth: 520, opacity }}>
      <line x1="60" y1="70" x2="460" y2="70" stroke={TOKENS.panelBorder} strokeWidth="1.5" strokeDasharray="4 6" />
      {nodes.map((n, i) => (
        <g key={n.cy}>
          <circle cx={n.x} cy="70" r="26" fill={TOKENS.bg} stroke={n.color} strokeWidth="1.5" />
          <circle cx={n.x} cy="70" r="5" fill={n.color} />
          <text x={n.x} y="112" textAnchor="middle" fontSize="12" fill={TOKENS.inkMuted} fontFamily={FONT_MONO} letterSpacing="0.05em">
            {n.cy.toUpperCase()}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function Header({ theme, onToggleTheme, streak, onLogoClick }) {
  const TOKENS = useTheme();
  return (
    <div className="flex items-center justify-between px-6 sm:px-10 py-5">
      <button
        onClick={onLogoClick}
        className="flex items-center gap-2.5"
        style={{ background: "transparent", border: "none", cursor: onLogoClick ? "pointer" : "default", padding: 0 }}
        disabled={!onLogoClick}
      >
        <div
          className="w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold"
          style={{ background: `linear-gradient(135deg, ${TOKENS.azure}, ${TOKENS.azureDeep})`, color: TOKENS.bgDeep, fontFamily: FONT_MONO }}
        >
          FP
        </div>
        <span className="text-sm font-semibold" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
          FabricPrep
        </span>
      </button>
      <div className="flex items-center gap-2.5">
        <Link
          to="/"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
          style={{ color: TOKENS.ink, background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}
        >
          <Home size={14} />
          Home
        </Link>
        <Link
          to="/study-guides"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
          style={{ color: TOKENS.ink, background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}
        >
          <BookOpen size={14} />
          Study Guides
        </Link>
        <Link
          to="/dashboard"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
          style={{ color: TOKENS.ink, background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}
        >
          <LayoutDashboard size={14} />
          Dashboard
        </Link>
        <UserBadge />
        {streak > 0 && (
          <div
            className="hidden sm:flex items-center gap-1 rounded-full px-2.5 py-1"
            style={{ background: `${TOKENS.amber}1A`, border: `1px solid ${TOKENS.amber}40` }}
          >
            <span className="text-xs" style={{ color: TOKENS.amber, fontFamily: FONT_MONO }}>
              {streak} day{streak === 1 ? "" : "s"} streak
            </span>
          </div>
        )}
        <button
          onClick={onToggleTheme}
          aria-label="Toggle theme"
          className="relative"
          style={{ width: 34, height: 20, borderRadius: 999, background: TOKENS.panelBorder, border: `1px solid ${TOKENS.panelBorder}`, cursor: "pointer", padding: 0 }}
        >
          <span
            style={{
              position: "absolute",
              top: 2,
              left: theme === "dark" ? 2 : 16,
              width: 14,
              height: 14,
              borderRadius: "50%",
              background: TOKENS.azure,
              transition: "left .15s",
            }}
          />
        </button>
        <span className="text-xs hidden sm:block" style={{ color: TOKENS.inkMuted, fontFamily: FONT_MONO }}>
          by Jitendra Singh Malik
        </span>
      </div>
    </div>
  );
}

export function Footer() {
  const TOKENS = useTheme();
  return (
    <div className="text-center py-8 px-6">
      <p className="text-xs" style={{ color: TOKENS.inkMuted }}>
        Built by <span style={{ color: TOKENS.azure }}>Jitendra Singh Malik</span>
      </p>
      <p className="text-xs mt-1" style={{ color: TOKENS.inkMuted, opacity: 0.6 }}>
        Not affiliated with or endorsed by Microsoft.
      </p>
    </div>
  );
}

