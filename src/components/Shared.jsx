import { Link } from "react-router-dom";
import { LayoutDashboard, Home, BookOpen, Info, Menu, X, Lock, Heart, Linkedin } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme, FONT_DISPLAY, FONT_MONO, getCookieConsent, setCookieConsent } from "../lib/theme.jsx";
import { UserBadge } from "./UserProfile.jsx";

export const COOKIE_SETTINGS_EVENT = "fp:open-cookie-settings";

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

export function SponsorButton({ compact = false }) {
  const TOKENS = useTheme();
  return (
    <a
      href="https://github.com/sponsors/jmjmalik22"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Support Fabric Prep on GitHub"
      title="Support Fabric Prep on GitHub"
      className={
        compact
          ? "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors"
          : "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
      }
      style={{
        color: TOKENS.red,
        background: `${TOKENS.red}1A`,
        border: `1px solid ${TOKENS.red}40`,
      }}
    >
      <Heart size={compact ? 18 : 14} fill={TOKENS.red} />
      Support
    </a>
  );
}

export function Header({ theme, onToggleTheme, streak, onLogoClick, user, onLogout, isAuthenticated }) {
  const TOKENS = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [pendingRoute, setPendingRoute] = useState(null);
  const hasFullAccess = isAuthenticated ?? !!user;

  const navItems = [
    { to: "/", label: "Home", icon: Home, public: true },
    { to: "/study-guides", label: "Study Guides", icon: BookOpen, public: true },
    { to: "/about", label: "About", icon: Info, public: true },
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, public: false },
  ];

  function handleNavClick(item, e) {
    if (!item.public && !hasFullAccess) {
      e.preventDefault();
      setPendingRoute(item.to);
      setShowLoginPrompt(true);
    }
  }

  return (
    <>
      <nav aria-label="Primary navigation" className="sr-only">
        {navItems.filter((item) => item.public).map((item) => (
          <Link key={item.to} to={item.to}>{item.label}</Link>
        ))}
      </nav>
      <div className="relative flex items-center justify-between px-4 sm:px-6 lg:px-10 py-4 sm:py-5">
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
            Fabric Prep
          </span>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-2.5 flex-wrap justify-end">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isLocked = !item.public && !hasFullAccess;
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={(e) => handleNavClick(item, e)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap"
                style={{
                  color: TOKENS.ink,
                  background: TOKENS.panel,
                  border: `1px solid ${TOKENS.panelBorder}`,
                  opacity: isLocked ? 0.6 : 1,
                }}
              >
                <Icon size={14} />
                {item.label}
                {isLocked && <Lock size={10} />}
              </Link>
            );
          })}
          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-xs" style={{ color: TOKENS.inkMuted }}>
                {user.displayName || user.email}
              </span>
              <button
                onClick={onLogout}
                className="text-xs px-2 py-1 rounded-lg"
                style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}`, color: TOKENS.inkMuted }}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="text-xs px-3 py-1.5 rounded-lg font-medium"
              style={{ background: TOKENS.azure, color: TOKENS.bgDeep }}
            >
              Sign In
            </Link>
          )}
          {streak > 0 && (
            <div
              className="flex items-center gap-1 rounded-full px-2.5 py-1 whitespace-nowrap"
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
            className="relative ml-1"
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
          <SponsorButton />
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden items-center gap-2">
          {user ? (
            <span className="text-xs" style={{ color: TOKENS.inkMuted }}>
              {user.displayName || user.email}
            </span>
          ) : (
            <Link
              to="/login"
              className="text-xs px-2 py-1 rounded-lg"
              style={{ background: TOKENS.azure, color: TOKENS.bgDeep }}
            >
              Sign In
            </Link>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            className="p-2 rounded-lg"
            style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}
          >
            {mobileMenuOpen ? <X size={18} color={TOKENS.ink} /> : <Menu size={18} color={TOKENS.ink} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="lg:hidden px-4 pb-4"
          style={{ borderBottom: `1px solid ${TOKENS.panelBorder}` }}
        >
          <div className="flex flex-col gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isLocked = !item.public && !hasFullAccess;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={(e) => {
                    handleNavClick(item, e);
                    if (!isLocked) setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors"
                  style={{ 
                    color: TOKENS.ink, 
                    background: TOKENS.panel, 
                    border: `1px solid ${TOKENS.panelBorder}`,
                    opacity: isLocked ? 0.6 : 1,
                  }}
                >
                  <Icon size={18} color={TOKENS.azure} />
                  {item.label}
                  {isLocked && <Lock size={14} />}
                </Link>
              );
            })}
            <SponsorButton compact />
            {streak > 0 && (
              <div
                className="flex items-center gap-2 px-4 py-3 rounded-full"
                style={{ background: `${TOKENS.amber}1A`, border: `1px solid ${TOKENS.amber}40` }}
              >
                <span className="text-sm" style={{ color: TOKENS.amber, fontFamily: FONT_MONO }}>
                  {streak} day{streak === 1 ? "" : "s"} streak
                </span>
              </div>
            )}
            {user && (
              <button
                onClick={() => {
                  onLogout();
                  setMobileMenuOpen(false);
                }}
                className="px-4 py-3 rounded-lg text-sm text-left"
                style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}`, color: TOKENS.inkMuted }}
              >
                Log out
              </button>
            )}
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-xs" style={{ color: TOKENS.inkMuted }}>Theme</span>
              <button
                onClick={onToggleTheme}
                aria-label="Toggle theme"
                className="relative"
                style={{ width: 44, height: 24, borderRadius: 999, background: TOKENS.panelBorder, border: `1px solid ${TOKENS.panelBorder}`, cursor: "pointer", padding: 0 }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: 3,
                    left: theme === "dark" ? 3 : 23,
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    background: TOKENS.azure,
                    transition: "left .15s",
                  }}
                />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Login Prompt Modal */}
      {showLoginPrompt && (
        <div 
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ background: `${TOKENS.bg}80` }}
          onClick={() => setShowLoginPrompt(false)}
        >
          <div 
            className="rounded-2xl p-6 max-w-sm w-full mx-4"
            style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 mb-4">
              <Lock size={20} color={TOKENS.amber} />
              <h3 className="text-lg font-semibold" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
                Sign In Required
              </h3>
            </div>
            <p className="text-sm mb-6" style={{ color: TOKENS.inkMuted }}>
              Please sign in to access Dashboard. Create a free account to track your progress across all devices.
            </p>
            <div className="flex gap-3">
              <Link
                to="/login"
                className="flex-1 py-2.5 rounded-full text-sm font-medium text-center"
                style={{ background: TOKENS.azure, color: TOKENS.bgDeep }}
                onClick={() => setShowLoginPrompt(false)}
              >
                Sign In
              </Link>
              <button
                onClick={() => setShowLoginPrompt(false)}
                className="flex-1 py-2.5 rounded-full text-sm font-medium"
                style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}`, color: TOKENS.ink }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const FOOTER_COLUMNS = [
  {
    heading: "Product",
    links: [
      { label: "Exam Practice", to: "/" },
      { label: "Study Guides", to: "/study-guides" },
      { label: "Pricing", to: "/pricing" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Terms of Service", to: "/terms" },
      { label: "Privacy Policy", to: "/privacy" },
    ],
  },
  {
    heading: "Get Started",
    links: [
      { label: "Sign up", to: "/login?mode=signup" },
      { label: "Log in", to: "/login" },
    ],
  },
];

export function Footer() {
  const TOKENS = useTheme();
  const year = new Date().getFullYear();

  function openCookieSettings() {
    window.dispatchEvent(new Event(COOKIE_SETTINGS_EVENT));
  }

  return (
    <footer className="py-12 px-6" style={{ borderTop: `1px solid ${TOKENS.panelBorder}` }}>
      <div className="max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-left mb-10">
          <div className="col-span-2 sm:col-span-1">
            <p className="font-bold mb-2" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>FabricPrep</p>
            <p className="text-xs leading-6" style={{ color: TOKENS.inkMuted }}>
              Realistic practice for Microsoft certification exams. Prepare with confidence.
            </p>
          </div>
          {FOOTER_COLUMNS.map(({ heading, links }) => (
            <div key={heading}>
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: TOKENS.inkMuted, fontFamily: FONT_MONO }}>
                {heading}
              </p>
              <ul className="space-y-2">
                {links.map(({ label, to }) => (
                  <li key={label}>
                    <Link to={to} className="text-xs" style={{ color: TOKENS.ink }}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-center sm:text-left"
          style={{ borderTop: `1px solid ${TOKENS.panelBorder}` }}
        >
          <div>
            <p className="text-xs" style={{ color: TOKENS.inkMuted }}>
              © {year} FabricPrep. All rights reserved.
            </p>
            <p className="text-xs mt-1" style={{ color: TOKENS.inkMuted, opacity: 0.6 }}>
              Not affiliated with or endorsed by Microsoft.
            </p>
            <p className="text-xs mt-1" style={{ color: TOKENS.inkMuted, opacity: 0.6 }}>
              Built by <span style={{ color: TOKENS.azure }}>Jitendra Singh Malik</span>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={openCookieSettings}
              className="text-xs underline-offset-2 hover:underline"
              style={{ color: TOKENS.inkMuted }}
            >
              Cookie Settings
            </button>
            <a
              href="https://www.linkedin.com/in/jitendra123/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="FabricPrep on LinkedIn"
              style={{ color: TOKENS.inkMuted }}
            >
              <Linkedin size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function CookieConsent() {
  const TOKENS = useTheme();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!getCookieConsent()) setVisible(true);
    function handleOpen() {
      setVisible(true);
    }
    window.addEventListener(COOKIE_SETTINGS_EVENT, handleOpen);
    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, handleOpen);
  }, []);

  function choose(value) {
    setCookieConsent(value);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie settings"
      className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-5"
      style={{ background: TOKENS.panel, borderTop: `1px solid ${TOKENS.panelBorder}` }}
    >
      <div className="max-w-5xl mx-auto w-full flex flex-col sm:flex-row items-center gap-4">
        <p className="text-xs flex-1 text-center sm:text-left" style={{ color: TOKENS.inkMuted }}>
          FabricPrep uses local storage to remember your theme, progress, and preferences on this device. We don&apos;t use it for third-party advertising.{" "}
          <Link to="/privacy" className="underline" style={{ color: TOKENS.ink }}>Privacy Policy</Link>
        </p>
        <div className="flex gap-2 flex-shrink-0">
          <button
            type="button"
            onClick={() => choose("declined")}
            className="px-4 py-2 rounded-full text-xs font-medium"
            style={{ border: `1px solid ${TOKENS.panelBorder}`, color: TOKENS.ink }}
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => choose("accepted")}
            className="px-4 py-2 rounded-full text-xs font-medium"
            style={{ background: TOKENS.azure, color: TOKENS.bgDeep }}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

