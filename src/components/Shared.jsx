import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, LayoutDashboard, BookOpen } from "lucide-react";
import { useState } from "react";
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

const NAV_ITEMS = [
  { to: "/", label: "Home", icon: Home },
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/study-guides", label: "Study Guides", icon: BookOpen },
];

export function Header({ theme, onToggleTheme, streak }) {
  const TOKENS = useTheme();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div style={{ borderBottom: `1px solid ${TOKENS.panelBorder}` }}>
      <div className="flex items-center justify-between px-4 sm:px-8 py-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2" style={{ textDecoration: "none" }}>
            <div
              className="w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold flex-shrink-0"
              style={{ background: `linear-gradient(135deg, ${TOKENS.azure}, ${TOKENS.azureDeep})`, color: "#04101F", fontFamily: FONT_MONO }}
            >
              FP
            </div>
            <span className="text-sm font-semibold" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
              FabricPrep
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const active = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors"
                  style={{ color: active ? TOKENS.ink : TOKENS.inkMuted, background: active ? `${TOKENS.azure}1A` : "transparent", textDecoration: "none" }}
                >
                  <item.icon size={15} color={active ? TOKENS.azure : TOKENS.inkMuted} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-3">
          {streak > 0 && (
            <div
              className="flex items-center gap-1 rounded-full px-2.5 py-1"
              style={{ background: `${TOKENS.amber}1A`, border: `1px solid ${TOKENS.amber}40` }}
            >
              <span className="text-xs" style={{ color: TOKENS.amber, fontFamily: FONT_MONO }}>
                {streak} day{streak === 1 ? "" : "s"} streak
              </span>
            </div>
          )}
          <UserBadge />
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
        </div>

        <button
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          className="md:hidden"
          style={{ background: "transparent", border: "none", color: TOKENS.ink, cursor: "pointer", padding: 0 }}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3">
          <nav className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const active = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm"
                  style={{ color: active ? TOKENS.ink : TOKENS.inkMuted, background: active ? `${TOKENS.azure}1A` : "transparent", textDecoration: "none" }}
                >
                  <item.icon size={15} color={active ? TOKENS.azure : TOKENS.inkMuted} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center justify-between px-3">
            <div className="flex items-center gap-2">
              <UserBadge />
              {streak > 0 && (
                <span className="text-xs" style={{ color: TOKENS.amber, fontFamily: FONT_MONO }}>
                  {streak} day{streak === 1 ? "" : "s"} streak
                </span>
              )}
            </div>
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
          </div>
        </div>
      )}
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

