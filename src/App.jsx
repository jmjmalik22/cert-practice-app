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
import { Header } from "./components/Shared.jsx";

export default function App() {
  const [theme, setTheme] = useState(() => getStoredTheme());
  const [streak, setStreak] = useState(0);
  const [showProfileModal, setShowProfileModal] = useState(false);

  useEffect(() => {
    setStreak(updateStreak());
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
      <div className="min-h-screen w-full flex flex-col" style={{ background: tokens.bg, fontFamily: FONT_BODY }}>
        <Header theme={theme} onToggleTheme={toggleTheme} streak={streak} />
        <div className="flex-1 flex flex-col min-w-0">
          <Outlet context={{ theme, onToggleTheme: toggleTheme, streak }} />
        </div>
        {showProfileModal && (
          <UserProfileModal onClose={() => setShowProfileModal(false)} />
        )}
      </div>
    </ThemeContext.Provider>
  );
}
