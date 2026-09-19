// Persists an in-progress Practice/Mock/Shield session so a refresh, crash,
// or accidental navigation doesn't lose it.
//
// Each mode (practice/mock/shield) gets its own account-scoped base key (via
// storageScope.js's scopedGet/scopedSet/scopedRemove — never the unscoped
// safeGet/safeSet from theme.jsx, see storageScope.js's own docs for why).
// Within that key, sessions are stored keyed by exam code, so a single
// account can have at most one resumable in-progress session per exam per
// mode.
//
// Only question IDs are ever stored in `orderIds` — never full question
// objects. The question content itself lives in the static question bank
// bundled with the app, not in user data, so it is looked up again on
// resume. That keeps the persisted payload small and immune to going stale
// if question text/options change between the session being saved and it
// being resumed.
//
// This is a brand-new set of keys (nothing here ever shipped unscoped), so
// per storageScope.js's own instructions it needs no entry in its
// LEGACY_BASE_KEYS migration list.

import { scopedGet, scopedSet, scopedRemove } from "./storageScope.js";

export const SESSION_MODE = {
  PRACTICE: "practice",
  MOCK: "mock",
  SHIELD: "shield",
};

const BASE_KEY_BY_MODE = {
  [SESSION_MODE.PRACTICE]: "fp_session_practice",
  [SESSION_MODE.MOCK]: "fp_session_mock",
  [SESSION_MODE.SHIELD]: "fp_session_shield",
};

function baseKeyForMode(mode) {
  const baseKey = BASE_KEY_BY_MODE[mode];
  if (!baseKey) throw new Error(`Unknown session mode: ${mode}`);
  return baseKey;
}

/** The persisted session for `sessionKey` under `mode`, or null if none. */
export function loadPersistedSession(mode, sessionKey) {
  const sessions = scopedGet(baseKeyForMode(mode), {});
  return sessions?.[sessionKey] ?? null;
}

/**
 * Save/replace the persisted session for `sessionKey` under `mode`. `session`
 * is a plain JSON-serializable object — its shape is owned by the caller
 * (Practice/MockExam/ShieldExam each persist different fields).
 */
export function savePersistedSession(mode, sessionKey, session) {
  const baseKey = baseKeyForMode(mode);
  const sessions = scopedGet(baseKey, {});
  scopedSet(baseKey, { ...sessions, [sessionKey]: { ...session, savedAt: Date.now() } });
}

/** Remove the persisted session for `sessionKey` under `mode`, if any. */
export function clearPersistedSession(mode, sessionKey) {
  const baseKey = baseKeyForMode(mode);
  const sessions = scopedGet(baseKey, {});
  if (!(sessionKey in sessions)) return;
  const rest = { ...sessions };
  delete rest[sessionKey];
  if (Object.keys(rest).length === 0) {
    scopedRemove(baseKey);
  } else {
    scopedSet(baseKey, rest);
  }
}

// --- Shield's wall-clock deadline -------------------------------------------
//
// A Shield sitting's remaining time must always be derived from an absolute
// end timestamp, never from a plain countdown that resets on remount —
// otherwise refreshing the page would grant extra time. Store the deadline
// once, at the moment a sitting starts, and recompute remaining time from it
// on every tick/render.

/** Absolute end timestamp (ms since epoch) for a sitting starting now. */
export function createDeadline(durationSeconds, now = Date.now()) {
  return now + durationSeconds * 1000;
}

/** Whole seconds remaining until `deadline`. Never negative. */
export function computeRemainingSeconds(deadline, now = Date.now()) {
  return Math.max(0, Math.round((deadline - now) / 1000));
}

/** True once `deadline` has passed — the sitting's time is up. */
export function isSessionExpired(deadline, now = Date.now()) {
  return now >= deadline;
}
