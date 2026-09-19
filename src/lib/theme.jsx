import { useContext, createContext } from "react";
import {
  scopedGet,
  scopedGetString,
  scopedSet,
  scopedSetString,
} from "./storageScope.js";

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
  violet: "#9B7BFF",
  heroWash: "#0E1729",
  ctaBand: "#132039",
  script: "#6F82A6",
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
  violet: "#6D4AE0",
  heroWash: "#F1F6FE",
  ctaBand: "#E7EFFD",
  script: "#8194B4",
};

export const ThemeContext = createContext(DARK_TOKENS);
export function useTheme() {
  return useContext(ThemeContext);
}

// --- localStorage-backed helpers ---
//
// `safeGet`/`safeSet` are DEVICE-level and UNSCOPED: the key you pass is the
// key that is written. Do NOT use them for anything that belongs to a
// particular account (progress, bookmarks, badges, results) — that data must
// go through `scopedGet`/`scopedSet` in ./storageScope.js so two accounts
// sharing a browser can never read each other's data. These remain for
// genuinely per-device settings such as the theme and cookie consent.
export function safeGet(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
}
export function safeSet(key, value) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore storage failures (private browsing, quota, etc.)
  }
}

export function getStoredTheme() {
  if (typeof window === "undefined") return "light";
  try {
    return localStorage.getItem("fp_theme") || "light";
  } catch {
    return "light";
  }
}
export function setStoredTheme(t) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("fp_theme", t);
  } catch {
    // ignore
  }
}

// Visit streak is per-account activity, so it lives in the active storage
// scope rather than the shared device pool. Stored as raw strings (not JSON)
// to match how it shipped.
export function updateStreak() {
  const today = new Date().toISOString().slice(0, 10);
  if (typeof window === "undefined") return 0;

  const last = scopedGetString("fp_last_visit", "");
  const streakValue = parseInt(scopedGetString("fp_streak", "0"), 10) || 0;

  if (last === today) return streakValue;

  const y = new Date();
  y.setDate(y.getDate() - 1);
  const yesterday = y.toISOString().slice(0, 10);
  const streak = last === yesterday ? streakValue + 1 : 1;

  scopedSetString("fp_last_visit", today);
  scopedSetString("fp_streak", streak);
  return streak;
}

export function getAttempted(examCode) {
  return scopedGet(`fp_attempted_${examCode}`, []);
}
export function markAttempted(examCode, qid) {
  const arr = getAttempted(examCode);
  if (!arr.includes(qid)) {
    arr.push(qid);
    scopedSet(`fp_attempted_${examCode}`, arr);
  }
}

// Fired whenever the stored consent value changes, so anything gated on it
// (analytics) can react immediately instead of waiting for a page reload.
export const COOKIE_CONSENT_EVENT = "fp:cookie-consent-changed";

export function getCookieConsent() {
  if (typeof window === "undefined") return "";
  try {
    return localStorage.getItem("fp_cookie_consent") || "";
  } catch {
    return "";
  }
}
export function setCookieConsent(value) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("fp_cookie_consent", value);
  } catch {
    // ignore
  }
  window.dispatchEvent(new Event(COOKIE_CONSENT_EVENT));
}

// `fp_bookmarks` is a derived, flat `"examCode:questionId"` cache used for
// fast local UI lookups (e.g. "bookmarked only" filters). It is NOT the
// source of truth for sync: progressSync's `syncDerivedLocalKeys` fully
// recomputes it from the merged `progress.<examCode>.bookmarked` field after
// every successful pull/push that has a remote document to merge against, so
// whatever a stale entry here might say gets overwritten with the
// tombstone-resolved result on the very next sync. That's why this plain
// toggle (unlike `progress.jsx`'s `toggleBookmark`) doesn't need its own
// add/remove timestamps — it would just be redundant bookkeeping that the
// next sync throws away. The one path that does NOT recompute it immediately
// is the one-shot guest-to-account claim on first sign-in (storageScope.js's
// `registerClaimMerge(BOOKMARKS_KEY, unionArrays)`), but that is safe too: a
// signed-out guest's own local writes here are always self-consistent (no
// remote copy is ever merged into guest storage), and claiming into a
// brand-new account (no remote doc yet) has no prior account data to
// conflict with. Any account that has synced before already gets this key
// overwritten by the pull that runs immediately after sign-in.
export function getBookmarks() {
  return scopedGet("fp_bookmarks", []);
}
export function toggleBookmarkStorage(key) {
  const arr = getBookmarks();
  const idx = arr.indexOf(key);
  if (idx >= 0) arr.splice(idx, 1);
  else arr.push(key);
  scopedSet("fp_bookmarks", arr);
  return arr;
}

export const FONT_DISPLAY = "'Space Grotesk', sans-serif";
export const FONT_BODY = "'Inter', sans-serif";
export const FONT_MONO = "'JetBrains Mono', monospace";
// Handwritten accent used sparingly on the landing page ("Small steps, big
// opportunities"). Decorative only — never the sole carrier of meaning.
export const FONT_SCRIPT = "'Caveat', cursive";

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

