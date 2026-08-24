import { useContext, createContext } from "react";

export const DARK_TOKENS = {
  bg: "#0B1220",
  bgDeep: "#070C16",
  panel: "#121C2F",
  panelBorder: "#213050",
  ink: "#EAF0FB",
  inkMuted: "#8FA0C2",
  azure: "#3FA7FF",
  azureDeep: "#1E6FCC",
  amber: "#F0A93A",
  green: "#3ED9A0",
  red: "#FF6B7A",
};

export const LIGHT_TOKENS = {
  bg: "#F4F6FB",
  bgDeep: "#E9EDF6",
  panel: "#FFFFFF",
  panelBorder: "#DCE3F0",
  ink: "#101828",
  inkMuted: "#5B677E",
  azure: "#1E6FCC",
  azureDeep: "#3FA7FF",
  amber: "#B97314",
  green: "#0F7A54",
  red: "#C13040",
};

export const ThemeContext = createContext(DARK_TOKENS);
export function useTheme() {
  return useContext(ThemeContext);
}

// --- localStorage-backed helpers (session/device only, no backend) ---
export function safeGet(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
}
export function safeSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore storage failures (private browsing, quota, etc.)
  }
}

export function getStoredTheme() {
  try {
    return localStorage.getItem("fp_theme") || "dark";
  } catch {
    return "dark";
  }
}
export function setStoredTheme(t) {
  try {
    localStorage.setItem("fp_theme", t);
  } catch {
    // ignore
  }
}

export function updateStreak() {
  const today = new Date().toISOString().slice(0, 10);
  let last = "";
  let streak = 0;
  try {
    last = localStorage.getItem("fp_last_visit") || "";
    streak = parseInt(localStorage.getItem("fp_streak") || "0", 10) || 0;
  } catch {
    return 0;
  }
  if (last === today) return streak;
  const y = new Date();
  y.setDate(y.getDate() - 1);
  const yesterday = y.toISOString().slice(0, 10);
  streak = last === yesterday ? streak + 1 : 1;
  try {
    localStorage.setItem("fp_last_visit", today);
    localStorage.setItem("fp_streak", String(streak));
  } catch {
    // ignore
  }
  return streak;
}

export function getAttempted(examCode) {
  return safeGet(`fp_attempted_${examCode}`, []);
}
export function markAttempted(examCode, qid) {
  const arr = getAttempted(examCode);
  if (!arr.includes(qid)) {
    arr.push(qid);
    safeSet(`fp_attempted_${examCode}`, arr);
  }
}

export function getBookmarks() {
  return safeGet("fp_bookmarks", []);
}
export function toggleBookmarkStorage(key) {
  const arr = getBookmarks();
  const idx = arr.indexOf(key);
  if (idx >= 0) arr.splice(idx, 1);
  else arr.push(key);
  safeSet("fp_bookmarks", arr);
  return arr;
}

export const FONT_DISPLAY = "'Space Grotesk', sans-serif";
export const FONT_BODY = "'Inter', sans-serif";
export const FONT_MONO = "'JetBrains Mono', monospace";

export const MOCK_LENGTH = 5;
export const MOCK_SECONDS = 5 * 60;

export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

