import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
import {
  captureScopeToken,
  getActiveScopeId,
  getActiveScopeUid,
  isScopeTokenCurrent,
  registerClaimMerge,
  scopedGet,
  scopedSet,
  setActiveScope,
  userScopeId,
} from "./storageScope.js";

export const PROGRESS_KEY = "fp_progress";
export const EXAM_RESULTS_KEY = "fp_exam_results";
export const SYNC_META_KEY = "fp_sync_meta";
export const BOOKMARKS_KEY = "fp_bookmarks";
export const ATTEMPTED_KEY_PREFIX = "fp_attempted_";

let activeSyncUid = null;
let pushTimer = null;

function unionArrays(guestValue, accountValue) {
  return [...new Set([...(guestValue || []), ...(accountValue || [])])];
}

// How guest progress folds into an account the first time someone signs in.
// Registered here (rather than inside storageScope.js) so the merge rules live
// next to the merge implementations they reuse.
registerClaimMerge(PROGRESS_KEY, (guestValue, accountValue) =>
  mergeProgressData(guestValue, accountValue)
);
registerClaimMerge(EXAM_RESULTS_KEY, (guestValue, accountValue) =>
  mergeExamResults(guestValue, accountValue)
);
registerClaimMerge(BOOKMARKS_KEY, unionArrays);
registerClaimMerge({ prefix: ATTEMPTED_KEY_PREFIX }, unionArrays);
// Sync bookkeeping records which uid last synced a pool. Carrying it across a
// claim would mis-attribute the claiming account's data to the old uid (and
// mislead storageScope's legacy-owner detection), so it is always dropped.
registerClaimMerge(SYNC_META_KEY, () => undefined);

/**
 * Point both cloud sync and all scoped local storage at `uid` (or at the guest
 * scope when `uid` is falsy). This is the single entry point the app should
 * use on sign-in / sign-out / auth restore.
 */
export function setActiveSyncUid(uid) {
  activeSyncUid = uid || null;
  return setActiveScope(activeSyncUid);
}

export function getActiveSyncUid() {
  return activeSyncUid;
}

function emptyExamProgress() {
  return { attempts: [], correct: 0, total: 0, bookmarked: [] };
}

function getLocalSnapshot(scopeId = getActiveScopeId()) {
  return {
    progress: scopedGet(PROGRESS_KEY, {}, scopeId),
    examResults: scopedGet(EXAM_RESULTS_KEY, [], scopeId),
  };
}

function hasProgressData({ progress, examResults }) {
  const hasExamData = Object.values(progress || {}).some(
    (exam) => (exam.attempts?.length || 0) > 0 || (exam.bookmarked?.length || 0) > 0
  );
  return hasExamData || (examResults?.length || 0) > 0;
}

function syncDerivedLocalKeys(progress, scopeId = getActiveScopeId()) {
  const allBookmarks = [];

  Object.entries(progress || {}).forEach(([examCode, exam]) => {
    const attempted = [...new Set((exam.attempts || []).map((a) => a.questionId))];
    scopedSet(`${ATTEMPTED_KEY_PREFIX}${examCode}`, attempted, scopeId);

    (exam.bookmarked || []).forEach((qid) => {
      allBookmarks.push(`${examCode}:${qid}`);
    });
  });

  scopedSet(BOOKMARKS_KEY, allBookmarks, scopeId);
}

function applyLocalSnapshot({ progress, examResults }, scopeId = getActiveScopeId()) {
  scopedSet(PROGRESS_KEY, progress || {}, scopeId);
  scopedSet(EXAM_RESULTS_KEY, examResults || [], scopeId);
  syncDerivedLocalKeys(progress || {}, scopeId);
}

export function mergeExamProgress(localExam, remoteExam) {
  const local = localExam || emptyExamProgress();
  const remote = remoteExam || emptyExamProgress();

  const attemptsByKey = new Map();
  [...(local.attempts || []), ...(remote.attempts || [])].forEach((attempt) => {
    attemptsByKey.set(`${attempt.questionId}:${attempt.timestamp}`, attempt);
  });

  const attempts = Array.from(attemptsByKey.values()).sort(
    (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
  );
  const bookmarked = [...new Set([...(local.bookmarked || []), ...(remote.bookmarked || [])])];
  const correct = attempts.filter((attempt) => attempt.isCorrect).length;
  const lastUpdated = [local.lastUpdated, remote.lastUpdated].filter(Boolean).sort().at(-1);

  return {
    attempts,
    correct,
    total: attempts.length,
    bookmarked,
    // Firestore's setDoc rejects explicit `undefined` fields — omit entirely
    // when neither side has recorded a lastUpdated timestamp yet.
    ...(lastUpdated ? { lastUpdated } : {}),
  };
}

export function mergeProgressData(localProgress, remoteProgress) {
  const merged = {};
  const examCodes = new Set([
    ...Object.keys(localProgress || {}),
    ...Object.keys(remoteProgress || {}),
  ]);

  examCodes.forEach((examCode) => {
    merged[examCode] = mergeExamProgress(localProgress?.[examCode], remoteProgress?.[examCode]);
  });

  return merged;
}

export function mergeExamResults(localResults, remoteResults) {
  const resultsByKey = new Map();

  [...(localResults || []), ...(remoteResults || [])].forEach((result) => {
    resultsByKey.set(
      `${result.examCode}:${result.timestamp}:${result.score}:${result.total}`,
      result
    );
  });

  return Array.from(resultsByKey.values()).sort(
    (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
  );
}

function mergeSnapshots(localSnapshot, remoteSnapshot) {
  return {
    progress: mergeProgressData(localSnapshot.progress, remoteSnapshot.progress),
    examResults: mergeExamResults(localSnapshot.examResults, remoteSnapshot.examResults),
  };
}

async function writeRemoteSnapshot(uid, snapshot) {
  await setDoc(
    doc(db, "users", uid),
    {
      progress: snapshot.progress,
      examResults: snapshot.examResults,
      updatedAt: serverTimestamp(),
      clientUpdatedAt: new Date().toISOString(),
    },
    { merge: true }
  );

  scopedSet(SYNC_META_KEY, { lastSyncedAt: new Date().toISOString(), uid }, userScopeId(uid));
}

/**
 * The one read-merge-write path shared by `pullAndMergeProgress` and
 * `pushProgress`. Both directions are the *same* operation — reconcile this
 * device's local scope with the remote document — so they share one
 * implementation rather than two subtly different ones.
 *
 * WHY THE LOCAL SNAPSHOT IS READ *AFTER* THE AWAIT
 * ------------------------------------------------
 * The previous code captured the local snapshot before `await getDoc(...)`.
 * A `getDoc` is a real network round-trip, and the app writes to local storage
 * throughout it: answering a question calls `recordAttempt` / `toggleBookmark`
 * in progress.jsx, which write straight to the scoped keys. Anything written
 * during that window was invisible to the pre-await copy, so the subsequent
 * `applyLocalSnapshot(merged)` overwrote it — the user's answer vanished.
 * Since this runs on every login and every tab `visibilitychange`, the window
 * is routinely hit in practice.
 *
 * The fix is to re-read local state immediately before computing what to
 * persist. The merge helpers are pure and dedupe by `questionId:timestamp`, so
 * re-merging against fresher state is cheap and can only ever *add* rows.
 *
 * WHY THE READ/MERGE/APPLY BLOCK MUST STAY SYNCHRONOUS
 * ---------------------------------------------------
 * The re-read, the merge, and `applyLocalSnapshot` below contain no `await`.
 * On JavaScript's single thread that makes the three of them atomic with
 * respect to every other task: no local write, and no *other* in-flight sync,
 * can interleave between reading local state and writing the merged result
 * back. That is what stops two overlapping calls (the login pull and a
 * visibility-change pull, or a pull and a debounced push) from clobbering one
 * another — whichever enters the block second sees the first one's merged
 * output as its local input and folds it straight back in.
 *
 * Do not introduce an `await` inside that block.
 *
 * IDENTITY SAFETY
 * ---------------
 *  - every local read and write targets `userScopeId(uid)` explicitly, never
 *    "whatever scope happens to be active";
 *  - it refuses to start if `uid` is not the active identity;
 *  - it re-checks the scope token after the `await getDoc(...)`, so a call
 *    started before a logout / account switch persists nothing once it
 *    resolves. Those calls resolve to a snapshot flagged `stale: true`.
 *
 * @param {string} uid
 * @param {{ createRemoteWhenEmpty?: boolean }} options
 *   `createRemoteWhenEmpty` writes the remote document even when this device
 *   has nothing worth saving. A push says yes (it was triggered by a real
 *   local change); a pull says no, so merely visiting the app never creates an
 *   empty document.
 */
async function reconcileWithRemote(uid, { createRemoteWhenEmpty = false } = {}) {
  const scopeId = userScopeId(uid);

  // Someone else is signed in — this call belongs to a superseded identity.
  if (getActiveScopeUid() !== uid) {
    return { ...getLocalSnapshot(scopeId), stale: true };
  }

  const scopeToken = captureScopeToken();
  const remoteRef = doc(db, "users", uid);
  const remoteSnap = await getDoc(remoteRef);

  // The signed-in identity changed while the read was in flight. Persisting
  // now would leak this identity's data into whoever is signed in instead.
  if (!isScopeTokenCurrent(scopeToken)) {
    return { ...getLocalSnapshot(scopeId), stale: true };
  }

  const remoteSnapshot = remoteSnap.exists()
    ? {
        progress: remoteSnap.data().progress || {},
        examResults: remoteSnap.data().examResults || [],
      }
    : null;

  // --- atomic section: no `await` from here until applyLocalSnapshot returns.
  const localSnapshot = getLocalSnapshot(scopeId);
  const mergedSnapshot = remoteSnapshot
    ? mergeSnapshots(localSnapshot, remoteSnapshot)
    : localSnapshot;

  // Nothing to apply when the remote document does not exist yet: the merged
  // result is the local snapshot, byte for byte.
  if (remoteSnapshot) applyLocalSnapshot(mergedSnapshot, scopeId);
  // --- end atomic section

  if (remoteSnapshot || createRemoteWhenEmpty || hasProgressData(mergedSnapshot)) {
    await writeRemoteSnapshot(uid, mergedSnapshot);
  }

  return mergedSnapshot;
}

/**
 * Merge `uid`'s Firestore progress with the copy held in `uid`'s own local
 * storage scope, then write the result back to both. See
 * `reconcileWithRemote` for the concurrency and identity guarantees.
 */
export async function pullAndMergeProgress(uid) {
  if (!uid) return getLocalSnapshot();
  return reconcileWithRemote(uid);
}

/**
 * Publish this device's local progress to Firestore.
 *
 * This used to be a blind `setDoc` of the local arrays. `progress` and
 * `examResults` are stored as whole arrays, and Firestore's `{ merge: true }`
 * merges at the *field* level — it does not merge *inside* an array — so with
 * two tabs or two devices signed into the same account, whichever push landed
 * last replaced the other's array outright and silently dropped whatever that
 * other writer had contributed.
 *
 * So a push is now a merge-then-write: read the current remote document, merge
 * it with the current local snapshot, write the merged result, and apply that
 * same merged result back to local storage so this device converges on exactly
 * the state a pull would have produced.
 *
 * Cost: one extra `getDoc` per push. That is not per keystroke or per answer —
 * `scheduleCloudSync` below debounces pushes to one per 2s quiet period, and
 * it is the only caller in the app (progressSyncProvider's `fp-progress-changed`
 * handler), so a burst of answers still costs a single read plus a single
 * write.
 *
 * Deliberately does *not* call `notifyProgressChanged()`: that event is what
 * triggers `scheduleCloudSync` in the first place, so firing it here would
 * make every push schedule another push forever.
 */
export async function pushProgress(uid = activeSyncUid) {
  if (!uid) return undefined;
  return reconcileWithRemote(uid, { createRemoteWhenEmpty: true });
}

export function scheduleCloudSync(uid = activeSyncUid) {
  if (!uid) return;

  const scopeToken = captureScopeToken();

  clearTimeout(pushTimer);
  pushTimer = setTimeout(() => {
    // Identity may have changed during the debounce window.
    if (!isScopeTokenCurrent(scopeToken)) return;

    pushProgress(uid).catch((error) => {
      console.error("Failed to sync progress to cloud:", error);
    });
  }, 2000);
}

export function notifyProgressChanged() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("fp-progress-changed"));
}
