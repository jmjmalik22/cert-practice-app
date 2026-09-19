// Account-scoped browser storage.
//
// WHY THIS EXISTS
// ---------------
// Every piece of progress data used to live in a single, shared localStorage
// pool (`fp_progress`, `fp_exam_results`, `fp_bookmarks`, `fp_attempted_*`,
// `fp_badges`, `fp_shield_results`, ...). Nothing in those key names said
// *whose* data it was, so on a shared browser:
//
//   user A practices -> A logs out (localStorage untouched) -> user B signs in
//   -> the login-time pull read A's leftover data, merged it into B's Firestore
//      document, and B's account permanently inherited A's history.
//
// This module makes "whose data is this?" part of the key itself. Two
// identities can never read or write each other's values, including across a
// logout -> different-login transition in the same tab.
//
// KEY NAMING
// ----------
//   <baseKey>::guest        signed-out / anonymous practice
//   <baseKey>::uid:<uid>    a specific signed-in Firebase account
//
// e.g. `fp_progress::uid:abc123`, `fp_attempted_DP-700::guest`.
// The `::` separator never appears in a legacy key, which is what lets the
// one-time migration below tell old data from new.
//
// Device-level settings (`fp_theme`, `fp_cookie_consent`) are deliberately
// NOT scoped — they belong to the browser, not to an account.
//
// FOR OTHER AGENTS / FEATURES
// ---------------------------
// Never call `safeGet`/`safeSet` from theme.jsx for per-account data. Use
// `scopedGet` / `scopedSet` / `scopedRemove` here. If you add a new
// per-account key, also add it to `LEGACY_BASE_KEYS` only if it already
// shipped unscoped; new keys need no migration entry.
//
// For async work that can outlive an identity change (anything with an
// `await` between reading and writing), capture `captureScopeToken()` before
// the await and bail out if `isScopeTokenCurrent(token)` is false afterwards.

const SCOPE_SEPARATOR = "::";

/** Scope id used whenever nobody is signed in. */
export const GUEST_SCOPE_ID = "guest";

/** Unscoped marker recording that the one-time legacy migration has run. */
const MIGRATION_MARKER_KEY = "fp_storage_scope_version";
const MIGRATION_VERSION = "1";

/** Written by progressSync as `{ lastSyncedAt, uid }` — see `legacyOwnerScopeId`. */
const LEGACY_SYNC_META_KEY = "fp_sync_meta";

// Keys that shipped unscoped and therefore may hold real production data.
const LEGACY_BASE_KEYS = [
  "fp_progress",
  "fp_exam_results",
  LEGACY_SYNC_META_KEY,
  "fp_bookmarks",
  "fp_badges",
  "fp_shield_results",
  "fp_user",
  "fp_streak",
  "fp_last_visit",
];

// Legacy keys with a dynamic suffix (one per exam code).
const LEGACY_BASE_KEY_PREFIXES = ["fp_attempted_"];

let activeScopeId = GUEST_SCOPE_ID;
let scopeGeneration = 0;
let legacyMigrationChecked = false;

const claimMergeByKey = new Map();
const claimMergeByPrefix = [];

// --- raw storage primitives (no JSON, no scoping) ---------------------------
// Kept local so this module has no import cycle with theme.jsx.

function storage() {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function readRaw(key) {
  const store = storage();
  if (!store) return null;
  try {
    return store.getItem(key);
  } catch {
    return null;
  }
}

function writeRaw(key, value) {
  const store = storage();
  if (!store) return;
  try {
    store.setItem(key, value);
  } catch {
    // ignore storage failures (private browsing, quota, etc.)
  }
}

function removeRaw(key) {
  const store = storage();
  if (!store) return;
  try {
    store.removeItem(key);
  } catch {
    // ignore
  }
}

function allStorageKeys() {
  const store = storage();
  if (!store) return [];
  try {
    const keys = [];
    for (let i = 0; i < store.length; i += 1) {
      const key = store.key(i);
      if (key !== null) keys.push(key);
    }
    return keys;
  } catch {
    return [];
  }
}

function parseJson(raw, fallback) {
  if (raw === null || raw === undefined || raw === "") return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

// --- scope identity ---------------------------------------------------------

/** The scope id for a signed-in account. */
export function userScopeId(uid) {
  return `uid:${uid}`;
}

/** `"guest"` or `"uid:<uid>"` — whose data reads/writes currently target. */
export function getActiveScopeId() {
  return activeScopeId;
}

/** The signed-in uid owning the active scope, or `null` when guest. */
export function getActiveScopeUid() {
  return activeScopeId.startsWith("uid:") ? activeScopeId.slice(4) : null;
}

export function isGuestScope() {
  return activeScopeId === GUEST_SCOPE_ID;
}

/**
 * Point all scoped storage at `uid` (or at the guest scope when `uid` is
 * falsy). Runs the one-time legacy migration, and — only when moving *out of*
 * the guest scope — folds any guest progress into the account that just
 * signed in (see `claimGuestScope`).
 *
 * Call this on sign-in, on sign-out, and on auth-state restore. It is
 * idempotent: re-setting the same scope changes nothing and does not bump the
 * scope token.
 *
 * @returns {{ scopeId: string, changed: boolean, claim: object|null }}
 */
export function setActiveScope(uid) {
  ensureLegacyMigration();

  const nextScopeId = uid ? userScopeId(uid) : GUEST_SCOPE_ID;
  if (nextScopeId === activeScopeId) {
    return { scopeId: activeScopeId, changed: false, claim: null };
  }

  const previousScopeId = activeScopeId;
  activeScopeId = nextScopeId;
  scopeGeneration += 1;

  // Guest -> sign-in is the one transition where folding local data into an
  // account is correct. A -> B (even via a guest hop) never folds A's data,
  // because A's data lives under `uid:A`, not under `guest`.
  const claim = uid && previousScopeId === GUEST_SCOPE_ID ? claimGuestScope(uid) : null;

  return { scopeId: activeScopeId, changed: true, claim };
}

// --- stale-async guard ------------------------------------------------------

/**
 * Opaque token for "the identity that is active right now". Capture it before
 * an `await` and check it afterwards so an in-flight operation started under a
 * previous identity can never persist its result under the current one.
 */
export function captureScopeToken() {
  return `${scopeGeneration}:${activeScopeId}`;
}

/** True when `token` still describes the active identity. */
export function isScopeTokenCurrent(token) {
  return token === captureScopeToken();
}

/** Run `fn` only if the identity has not changed since `token` was captured. */
export function runIfScopeCurrent(token, fn) {
  if (!isScopeTokenCurrent(token)) return undefined;
  return fn();
}

// --- scoped accessors -------------------------------------------------------

/** Full localStorage key for `baseKey` within `scopeId`. */
export function scopedKey(baseKey, scopeId = activeScopeId) {
  return `${baseKey}${SCOPE_SEPARATOR}${scopeId}`;
}

/** JSON read from the given scope (defaults to the active one). */
export function scopedGet(baseKey, fallback, scopeId = activeScopeId) {
  ensureLegacyMigration();
  return parseJson(readRaw(scopedKey(baseKey, scopeId)), fallback);
}

/** JSON write into the given scope (defaults to the active one). */
export function scopedSet(baseKey, value, scopeId = activeScopeId) {
  ensureLegacyMigration();
  writeRaw(scopedKey(baseKey, scopeId), JSON.stringify(value));
}

export function scopedRemove(baseKey, scopeId = activeScopeId) {
  removeRaw(scopedKey(baseKey, scopeId));
}

/** Raw-string variants, for values that were never JSON (streak, dates). */
export function scopedGetString(baseKey, fallback = "", scopeId = activeScopeId) {
  ensureLegacyMigration();
  const raw = readRaw(scopedKey(baseKey, scopeId));
  return raw === null ? fallback : raw;
}

export function scopedSetString(baseKey, value, scopeId = activeScopeId) {
  ensureLegacyMigration();
  writeRaw(scopedKey(baseKey, scopeId), String(value));
}

/** Every base key currently stored in `scopeId`. */
export function listScopedBaseKeys(scopeId = activeScopeId) {
  const suffix = SCOPE_SEPARATOR + scopeId;
  return allStorageKeys()
    .filter((key) => key.endsWith(suffix))
    .map((key) => key.slice(0, -suffix.length));
}

/** Drop every value stored under `scopeId`. */
export function clearScope(scopeId = activeScopeId) {
  const suffix = SCOPE_SEPARATOR + scopeId;
  allStorageKeys()
    .filter((key) => key.endsWith(suffix))
    .forEach(removeRaw);
}

// --- guest-claim merge registry --------------------------------------------

/**
 * Declare how a key's guest value should be combined with the signing-in
 * account's existing value when guest progress is claimed.
 *
 * @param {string|{prefix: string}} match exact base key, or a `{ prefix }` for
 *   dynamic families such as `fp_attempted_<examCode>`.
 * @param {(guestValue: any, accountValue: any) => any} merge return the value
 *   to store; return `undefined` to drop the guest value entirely (used for
 *   caches that are meaningless under a different identity).
 *
 * Keys with no registered merge use a safe default: move the guest value only
 * if the account has nothing stored for that key, otherwise keep the
 * account's value. Either way the guest copy is always deleted.
 */
export function registerClaimMerge(match, merge) {
  if (typeof match === "string") claimMergeByKey.set(match, merge);
  else if (match?.prefix) claimMergeByPrefix.push({ prefix: match.prefix, merge });
}

function findClaimMerge(baseKey) {
  if (claimMergeByKey.has(baseKey)) return claimMergeByKey.get(baseKey);
  return claimMergeByPrefix.find((entry) => baseKey.startsWith(entry.prefix))?.merge;
}

/**
 * Fold everything stored in the guest scope into `uid`'s scope, then empty the
 * guest scope.
 *
 * Emptying is the load-bearing part: it is what guarantees a *second* account
 * signing in on the same browser inherits nothing. The claim is one-shot by
 * construction rather than by a flag that could get out of sync.
 */
export function claimGuestScope(uid) {
  const targetScopeId = uid ? userScopeId(uid) : null;
  if (!targetScopeId) return { targetScopeId: null, claimedKeys: [] };

  const suffix = SCOPE_SEPARATOR + GUEST_SCOPE_ID;
  const claimedKeys = [];

  allStorageKeys()
    .filter((key) => key.endsWith(suffix))
    .forEach((guestKey) => {
      const baseKey = guestKey.slice(0, -suffix.length);
      const guestRaw = readRaw(guestKey);
      removeRaw(guestKey);
      if (guestRaw === null) return;

      const destination = scopedKey(baseKey, targetScopeId);
      const merge = findClaimMerge(baseKey);

      if (merge) {
        const merged = merge(parseJson(guestRaw, undefined), parseJson(readRaw(destination), undefined));
        if (merged === undefined) return;
        writeRaw(destination, JSON.stringify(merged));
      } else if (readRaw(destination) === null) {
        writeRaw(destination, guestRaw);
      } else {
        return;
      }

      claimedKeys.push(baseKey);
    });

  return { targetScopeId, claimedKeys };
}

// --- one-time legacy migration ---------------------------------------------

function isLegacyBaseKey(key) {
  if (key.includes(SCOPE_SEPARATOR)) return false;
  if (LEGACY_BASE_KEYS.includes(key)) return true;
  return LEGACY_BASE_KEY_PREFIXES.some((prefix) => key.startsWith(prefix));
}

/**
 * Decide who the pre-scoping localStorage pool belonged to.
 *
 * `fp_sync_meta` was written by `writeRemoteSnapshot` with the uid of the
 * account that last synced this browser, so when it is present the legacy pool
 * is *provably* that account's and we can hand it straight to them. Nobody
 * else can ever claim it. Without it, the data was never associated with any
 * account (pure guest usage), so it goes to the guest scope where the normal
 * one-shot guest claim gives it to whichever account signs in first.
 */
function legacyOwnerScopeId() {
  const uid = parseJson(readRaw(LEGACY_SYNC_META_KEY), null)?.uid;
  return uid ? userScopeId(uid) : GUEST_SCOPE_ID;
}

/**
 * Move pre-scoping data out of the shared pool exactly once per browser.
 * Idempotent; safe to call from any accessor.
 *
 * @returns {{ targetScopeId: string|null, movedKeys: string[] }|null} null when
 *   there was nothing to do (already migrated, or no storage available).
 */
export function migrateLegacyStorage() {
  if (!storage()) return null;
  if (readRaw(MIGRATION_MARKER_KEY) === MIGRATION_VERSION) return null;

  const targetScopeId = legacyOwnerScopeId();
  const movedKeys = [];

  allStorageKeys()
    .filter(isLegacyBaseKey)
    .forEach((legacyKey) => {
      const raw = readRaw(legacyKey);
      removeRaw(legacyKey);
      if (raw === null) return;

      const destination = scopedKey(legacyKey, targetScopeId);
      // Never clobber data that already exists in the destination scope.
      if (readRaw(destination) === null) writeRaw(destination, raw);
      movedKeys.push(legacyKey);
    });

  writeRaw(MIGRATION_MARKER_KEY, MIGRATION_VERSION);
  return { targetScopeId, movedKeys };
}

function ensureLegacyMigration() {
  if (legacyMigrationChecked) return;
  legacyMigrationChecked = true;
  migrateLegacyStorage();
}

/** Test-only: forget the in-memory scope/migration state. */
export function resetStorageScopeForTests() {
  activeScopeId = GUEST_SCOPE_ID;
  scopeGeneration = 0;
  legacyMigrationChecked = false;
}
