import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
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
import { getUser } from "./lib/progress.jsx";
import { UserProfileModal } from "./components/UserProfile.jsx";
import { Header } from "./components/Shared.jsx";

export default function App() {
  const [hasMounted, setHasMounted] = useState(false);
  const [theme, setTheme] = useState(() => getStoredTheme());
  const [streak, setStreak] = useState(0);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const { user, logout, isAuthenticated, isEmailVerified, loading: authLoading } = useAuth();

  useEffect(() => {
    setHasMounted(true);
    setStreak(updateStreak());
    const localUser = getUser();
    if (!localUser.name && !user) {
      setShowProfileModal(true);
    }
  }, [user]);

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
        {showProfileModal && !user && (
          <UserProfileModal onClose={() => setShowProfileModal(false)} />
        )}
      </div>
    </ThemeContext.Provider>
  );
}
