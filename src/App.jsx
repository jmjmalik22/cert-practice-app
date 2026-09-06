import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import {
  ThemeContext,
  DARK_TOKENS,
  LIGHT_TOKENS,
  FONT_BODY,
  getStoredTheme,
  setStoredTheme,
  updateStreak,
} from "./lib/theme.jsx";
import { useAuth } from "./lib/authContext.jsx";
import { Header } from "./components/Shared.jsx";

function ScrollToTop() {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, search, hash]);

  return null;
}

export default function App() {
  const [hasMounted, setHasMounted] = useState(false);
  // Use the same initial theme during SSG and browser hydration. Read the
  // user's saved preference after mounting to avoid a mismatched color render
  // when /login or another route is loaded directly.
  const [theme, setTheme] = useState("light");
  const [streak, setStreak] = useState(0);
  const { user, logout, isAuthenticated, isEmailVerified, loading: authLoading } = useAuth();

  useEffect(() => {
    setHasMounted(true);
    setTheme(getStoredTheme());
    setStreak(updateStreak());
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    setStoredTheme(next);
  }

  const tokens = theme === "dark" ? DARK_TOKENS : LIGHT_TOKENS;

  if (hasMounted && authLoading) {
    return (
      <ThemeContext.Provider value={tokens}>
        <div className="min-h-screen flex items-center justify-center" style={{ background: tokens.bg, color: tokens.ink }}>
          <span className="text-sm" role="status" aria-live="polite">Loading FabricPrep...</span>
        </div>
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={tokens}>
      <div className="min-h-screen w-full flex flex-col" style={{ background: tokens.bg, fontFamily: FONT_BODY }}>
        <ScrollToTop />
        <Header 
          theme={theme} 
          onToggleTheme={toggleTheme} 
          streak={streak} 
          user={user}
          onLogout={logout}
          isAuthenticated={isAuthenticated}
        />
        <div className="flex-1 flex flex-col min-w-0">
          <Outlet context={{ theme, onToggleTheme: toggleTheme, streak, user, isAuthenticated, isEmailVerified }} />
        </div>
      </div>
    </ThemeContext.Provider>
  );
}
