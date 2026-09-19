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
 * Merge `uid`'s Firestore progress with the copy held in `uid`'s *own* local
 * storage scope, then write the result back to both.
 *
 * Identity safety:
 *  - all local reads and writes target `userScopeId(uid)` explicitly, never
 *    "whatever scope happens to be active";
 *  - it refuses to run at all if `uid` is not the active identity;
 *  - after the `await getDoc(...)` it re-checks the scope token, so a pull
 *    started before a logout / account switch never persists anything once it
 *    resolves. Those calls resolve to a snapshot flagged `stale: true`.
 */
export async function pullAndMergeProgress(uid) {
  if (!uid) return getLocalSnapshot();

  const scopeId = userScopeId(uid);

  // Someone else is signed in — this call belongs to a superseded identity.
  if (getActiveScopeUid() !== uid) {
    return { ...getLocalSnapshot(scopeId), stale: true };
  }

  const scopeToken = captureScopeToken();
  const localSnapshot = getLocalSnapshot(scopeId);
  const remoteRef = doc(db, "users", uid);
  const remoteSnap = await getDoc(remoteRef);

  // The signed-in identity changed while the read was in flight. Persisting
  // now would leak this identity's data into whoever is signed in instead.
  if (!isScopeTokenCurrent(scopeToken)) {
    return { ...localSnapshot, stale: true };
  }

  if (!remoteSnap.exists()) {
    if (hasProgressData(localSnapshot)) {
      await writeRemoteSnapshot(uid, localSnapshot);
    }
    return localSnapshot;
  }

  const remoteSnapshot = {
    progress: remoteSnap.data().progress || {},
    examResults: remoteSnap.data().examResults || [],
  };
  const mergedSnapshot = mergeSnapshots(localSnapshot, remoteSnapshot);

  applyLocalSnapshot(mergedSnapshot, scopeId);
  await writeRemoteSnapshot(uid, mergedSnapshot);

  return mergedSnapshot;
}

export async function pushProgress(uid = activeSyncUid) {
  if (!uid) return;
  // Never push a superseded identity's local data.
  if (getActiveScopeUid() !== uid) return;

  const snapshot = getLocalSnapshot(userScopeId(uid));
  await writeRemoteSnapshot(uid, snapshot);
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
