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
import { getUser } from "./lib/progress.jsx";
import { UserProfileModal } from "./components/UserProfile.jsx";

export default function App() {
  const [theme, setTheme] = useState(() => getStoredTheme());
  const [streak, setStreak] = useState(0);
  const [showProfileModal, setShowProfileModal] = useState(false);

  useEffect(() => {
    setStreak(updateStreak());
    // Show profile modal if user hasn't set name
    const user = getUser();
    if (!user.name) {
      setShowProfileModal(true);
    }
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    setStoredTheme(next);
  }

  const tokens = theme === "dark" ? DARK_TOKENS : LIGHT_TOKENS;

  return (
    <ThemeContext.Provider value={tokens}>
      <div className="min-h-screen w-full" style={{ background: tokens.bg, fontFamily: FONT_BODY }}>
        <Outlet context={{ theme, onToggleTheme: toggleTheme, streak }} />
        {showProfileModal && (
          <UserProfileModal onClose={() => setShowProfileModal(false)} />
        )}
      </div>
    </ThemeContext.Provider>
  );
}