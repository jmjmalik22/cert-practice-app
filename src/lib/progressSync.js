import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
import { safeGet, safeSet } from "./theme.jsx";

const PROGRESS_KEY = "fp_progress";
const EXAM_RESULTS_KEY = "fp_exam_results";
const SYNC_META_KEY = "fp_sync_meta";

let activeSyncUid = null;
let pushTimer = null;

export function setActiveSyncUid(uid) {
  activeSyncUid = uid || null;
}

export function getActiveSyncUid() {
  return activeSyncUid;
}

function emptyExamProgress() {
  return { attempts: [], correct: 0, total: 0, bookmarked: [] };
}

function getLocalSnapshot() {
  return {
    progress: safeGet(PROGRESS_KEY, {}),
    examResults: safeGet(EXAM_RESULTS_KEY, []),
  };
}

function hasProgressData({ progress, examResults }) {
  const hasExamData = Object.values(progress || {}).some(
    (exam) => (exam.attempts?.length || 0) > 0 || (exam.bookmarked?.length || 0) > 0
  );
  return hasExamData || (examResults?.length || 0) > 0;
}

function syncDerivedLocalKeys(progress) {
  const allBookmarks = [];

  Object.entries(progress || {}).forEach(([examCode, exam]) => {
    const attempted = [...new Set((exam.attempts || []).map((a) => a.questionId))];
    safeSet(`fp_attempted_${examCode}`, attempted);

    (exam.bookmarked || []).forEach((qid) => {
      allBookmarks.push(`${examCode}:${qid}`);
    });
  });

  safeSet("fp_bookmarks", allBookmarks);
}

function applyLocalSnapshot({ progress, examResults }) {
  safeSet(PROGRESS_KEY, progress || {});
  safeSet(EXAM_RESULTS_KEY, examResults || []);
  syncDerivedLocalKeys(progress || {});
}

function mergeExamProgress(localExam, remoteExam) {
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

  return {
    attempts,
    correct,
    total: attempts.length,
    bookmarked,
    lastUpdated: [local.lastUpdated, remote.lastUpdated]
      .filter(Boolean)
      .sort()
      .at(-1),
  };
}

function mergeProgressData(localProgress, remoteProgress) {
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

function mergeExamResults(localResults, remoteResults) {
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

  safeSet(SYNC_META_KEY, { lastSyncedAt: new Date().toISOString(), uid });
}

export async function pullAndMergeProgress(uid) {
  if (!uid) return getLocalSnapshot();

  const localSnapshot = getLocalSnapshot();
  const remoteRef = doc(db, "users", uid);
  const remoteSnap = await getDoc(remoteRef);

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

  applyLocalSnapshot(mergedSnapshot);
  await writeRemoteSnapshot(uid, mergedSnapshot);

  return mergedSnapshot;
}

export async function pushProgress(uid = activeSyncUid) {
  if (!uid) return;

  const snapshot = getLocalSnapshot();
  await writeRemoteSnapshot(uid, snapshot);
}

export function scheduleCloudSync(uid = activeSyncUid) {
  if (!uid) return;

  clearTimeout(pushTimer);
  pushTimer = setTimeout(() => {
    pushProgress(uid).catch((error) => {
      console.error("Failed to sync progress to cloud:", error);
    });
  }, 2000);
}

export function notifyProgressChanged() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("fp-progress-changed"));
}
