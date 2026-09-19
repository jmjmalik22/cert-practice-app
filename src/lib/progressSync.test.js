// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi } from "vitest";

// Fake Firestore: an in-memory document store plus a gate that lets a test
// change the signed-in identity while a `getDoc` is still in flight.
const firestore = vi.hoisted(() => ({
  remote: new Map(),
  duringGetDoc: null,
  setDocCalls: [],
}));

vi.mock("./firebase", () => ({ db: {} }));

vi.mock("firebase/firestore", () => ({
  doc: (_db, collection, id) => ({ path: `${collection}/${id}` }),
  getDoc: async (ref) => {
    if (firestore.duringGetDoc) await firestore.duringGetDoc();
    const data = firestore.remote.get(ref.path);
    return { exists: () => data !== undefined, data: () => data };
  },
  setDoc: async (ref, value) => {
    firestore.setDocCalls.push({ path: ref.path, value });
    firestore.remote.set(ref.path, { ...(firestore.remote.get(ref.path) || {}), ...value });
  },
  serverTimestamp: () => "server-timestamp",
}));

import {
  mergeExamProgress,
  mergeProgressData,
  mergeExamResults,
  pullAndMergeProgress,
  pushProgress,
  scheduleCloudSync,
  setActiveSyncUid,
  EXAM_RESULTS_KEY,
  PROGRESS_KEY,
  SYNC_META_KEY,
} from "./progressSync.js";
import {
  GUEST_SCOPE_ID,
  captureScopeToken,
  getActiveScopeId,
  isScopeTokenCurrent,
  listScopedBaseKeys,
  migrateLegacyStorage,
  resetStorageScopeForTests,
  scopedGet,
  scopedKey,
  scopedSet,
  userScopeId,
} from "./storageScope.js";
import { getProgress, recordAttempt, saveExamResult, getExamResults } from "./progress.jsx";
import { getAttempted, getBookmarks, toggleBookmarkStorage } from "./theme.jsx";

// --- helpers for the concurrency tests -------------------------------------

const SCOPE_A = () => userScopeId("userA");

/** Attempt ids recorded for `examCode` in `uid`'s local scope, sorted. */
function localAttemptIds(uid, examCode = "DP-700") {
  const exam = scopedGet(PROGRESS_KEY, {}, userScopeId(uid))[examCode];
  return (exam?.attempts || []).map((a) => a.questionId).sort();
}

/** Attempt ids for `examCode` in the fake Firestore document, sorted. */
function remoteAttemptIds(uid, examCode = "DP-700") {
  const exam = firestore.remote.get(`users/${uid}`)?.progress?.[examCode];
  return (exam?.attempts || []).map((a) => a.questionId).sort();
}

function attempt(questionId, day = 1) {
  return {
    questionId,
    isCorrect: true,
    timestamp: `2026-01-${String(day).padStart(2, "0")}T00:00:00.000Z`,
  };
}

/** A whole-exam progress blob as one device's localStorage would hold it. */
function deviceProgress(questionId, day) {
  return {
    "DP-700": { attempts: [attempt(questionId, day)], correct: 1, total: 1, bookmarked: [] },
  };
}

beforeEach(() => {
  localStorage.clear();
  resetStorageScopeForTests();
  firestore.remote.clear();
  firestore.duringGetDoc = null;
  firestore.setDocCalls = [];
});

describe("mergeExamProgress", () => {
  it("unions attempts from local and remote without duplicating shared ones", () => {
    const local = {
      attempts: [{ questionId: "q1", timestamp: "2026-01-01T00:00:00.000Z", isCorrect: true }],
      bookmarked: ["q1"],
    };
    const remote = {
      attempts: [
        { questionId: "q1", timestamp: "2026-01-01T00:00:00.000Z", isCorrect: true },
        { questionId: "q2", timestamp: "2026-01-02T00:00:00.000Z", isCorrect: false },
      ],
      bookmarked: ["q2"],
    };

    const merged = mergeExamProgress(local, remote);

    expect(merged.attempts).toHaveLength(2);
    expect(merged.total).toBe(2);
    expect(merged.correct).toBe(1);
    expect(merged.bookmarked.sort()).toEqual(["q1", "q2"]);
  });

  it("orders attempts chronologically regardless of input order", () => {
    const local = {
      attempts: [{ questionId: "q2", timestamp: "2026-01-02T00:00:00.000Z", isCorrect: false }],
    };
    const remote = {
      attempts: [{ questionId: "q1", timestamp: "2026-01-01T00:00:00.000Z", isCorrect: true }],
    };

    const merged = mergeExamProgress(local, remote);

    expect(merged.attempts.map((a) => a.questionId)).toEqual(["q1", "q2"]);
  });

  it("treats missing local/remote exam data as empty", () => {
    const merged = mergeExamProgress(undefined, undefined);
    expect(merged).toEqual({ attempts: [], correct: 0, total: 0, bookmarked: [], lastUpdated: undefined });
  });
});

describe("mergeProgressData", () => {
  it("merges per-exam progress across the union of exam codes", () => {
    const local = { "AZ-900": { attempts: [{ questionId: "a", timestamp: "t1", isCorrect: true }] } };
    const remote = { "DP-900": { attempts: [{ questionId: "b", timestamp: "t2", isCorrect: false }] } };

    const merged = mergeProgressData(local, remote);

    expect(Object.keys(merged).sort()).toEqual(["AZ-900", "DP-900"]);
    expect(merged["AZ-900"].total).toBe(1);
    expect(merged["DP-900"].total).toBe(1);
  });
});

describe("mergeExamResults", () => {
  it("deduplicates identical results and sorts by timestamp", () => {
    const local = [{ examCode: "AZ-900", timestamp: "2026-01-02T00:00:00.000Z", score: 8, total: 10 }];
    const remote = [
      { examCode: "AZ-900", timestamp: "2026-01-02T00:00:00.000Z", score: 8, total: 10 },
      { examCode: "AZ-900", timestamp: "2026-01-01T00:00:00.000Z", score: 5, total: 10 },
    ];

    const merged = mergeExamResults(local, remote);

    expect(merged).toHaveLength(2);
    expect(merged[0].timestamp).toBe("2026-01-01T00:00:00.000Z");
    expect(merged[1].timestamp).toBe("2026-01-02T00:00:00.000Z");
  });
});

// ---------------------------------------------------------------------------
// Account-scoped storage: the shipped bug was that all of the keys below lived
// in one shared pool, so user B signing in on user A's browser absorbed A's
// history into B's Firestore document.
// ---------------------------------------------------------------------------

describe("per-identity isolation", () => {
  it("keeps two signed-in accounts' progress completely separate", () => {
    setActiveSyncUid("userA");
    recordAttempt("DP-700", "q1", true);
    toggleBookmarkStorage("DP-700:q1");
    saveExamResult("DP-700", { score: 8, total: 10, percentage: 80 });

    setActiveSyncUid("userB");

    expect(getProgress()).toEqual({});
    expect(getAttempted("DP-700")).toEqual([]);
    expect(getBookmarks()).toEqual([]);
    expect(getExamResults()).toEqual([]);

    // ...and A's own data is still intact when A comes back.
    setActiveSyncUid("userA");
    expect(Object.keys(getProgress())).toEqual(["DP-700"]);
    expect(getAttempted("DP-700")).toEqual(["q1"]);
    expect(getBookmarks()).toEqual(["DP-700:q1"]);
    expect(getExamResults()).toHaveLength(1);
  });

  it("does not leak A's data to B across a logout in between", () => {
    setActiveSyncUid("userA");
    recordAttempt("DP-600", "q9", false);

    setActiveSyncUid(null); // logout
    expect(getActiveScopeId()).toBe(GUEST_SCOPE_ID);
    expect(getProgress()).toEqual({});

    setActiveSyncUid("userB");
    expect(getProgress()).toEqual({});
  });

  it("writes each identity under its own localStorage key", () => {
    setActiveSyncUid("userA");
    recordAttempt("AZ-900", "q1", true);
    setActiveSyncUid("userB");
    recordAttempt("AZ-900", "q2", true);

    expect(localStorage.getItem(PROGRESS_KEY)).toBeNull();
    expect(localStorage.getItem(scopedKey(PROGRESS_KEY, userScopeId("userA")))).toBeTruthy();
    expect(localStorage.getItem(scopedKey(PROGRESS_KEY, userScopeId("userB")))).toBeTruthy();
  });
});

describe("guest-progress claim on first sign-in", () => {
  it("folds guest practice into the account that signs in first", () => {
    recordAttempt("DP-700", "q1", true);
    toggleBookmarkStorage("DP-700:q1");
    expect(getActiveScopeId()).toBe(GUEST_SCOPE_ID);

    setActiveSyncUid("userA");

    expect(Object.keys(getProgress())).toEqual(["DP-700"]);
    expect(getBookmarks()).toEqual(["DP-700:q1"]);
    // Guest pool is emptied — that is what makes the claim one-shot.
    expect(listScopedBaseKeys(GUEST_SCOPE_ID)).toEqual([]);
  });

  it("never folds a previous account's data into the next one", () => {
    setActiveSyncUid("userA");
    recordAttempt("DP-700", "q1", true);

    setActiveSyncUid(null);
    setActiveSyncUid("userB");

    expect(getProgress()).toEqual({});
    expect(getBookmarks()).toEqual([]);
  });

  it("gives claimed guest data to only the first account, not the second", () => {
    recordAttempt("DP-700", "q1", true);

    setActiveSyncUid("userA");
    expect(Object.keys(getProgress())).toEqual(["DP-700"]);

    setActiveSyncUid(null);
    setActiveSyncUid("userB");
    expect(getProgress()).toEqual({});
  });

  it("merges guest progress into an account that already has its own", () => {
    setActiveSyncUid("userA");
    recordAttempt("DP-700", "existing", true);

    setActiveSyncUid(null);
    recordAttempt("DP-700", "as-guest", false);

    setActiveSyncUid("userA");

    const attempts = getProgress()["DP-700"].attempts.map((a) => a.questionId);
    expect(attempts.sort()).toEqual(["as-guest", "existing"]);
  });

  it("does not carry the guest scope's sync bookkeeping into the account", () => {
    recordAttempt("DP-700", "q1", true);
    localStorage.setItem(
      scopedKey(SYNC_META_KEY, GUEST_SCOPE_ID),
      JSON.stringify({ lastSyncedAt: "2026-01-01T00:00:00.000Z", uid: "someoneElse" })
    );

    setActiveSyncUid("userA");

    expect(scopedGet(SYNC_META_KEY, null, userScopeId("userA"))).toBeNull();
  });
});

describe("legacy (pre-scoping) data migration", () => {
  function seedLegacyProgress() {
    localStorage.setItem(
      "fp_progress",
      JSON.stringify({
        "DP-700": {
          attempts: [{ questionId: "legacy", timestamp: "2026-01-01T00:00:00.000Z", isCorrect: true }],
          correct: 1,
          total: 1,
          bookmarked: ["legacy"],
        },
      })
    );
    localStorage.setItem("fp_attempted_DP-700", JSON.stringify(["legacy"]));
    localStorage.setItem("fp_bookmarks", JSON.stringify(["DP-700:legacy"]));
  }

  it("hands legacy data straight to the uid that last synced it", () => {
    seedLegacyProgress();
    localStorage.setItem(
      "fp_sync_meta",
      JSON.stringify({ lastSyncedAt: "2026-01-02T00:00:00.000Z", uid: "userA" })
    );

    // A different account signs in first — it must inherit nothing.
    setActiveSyncUid("userB");
    expect(getProgress()).toEqual({});
    expect(getAttempted("DP-700")).toEqual([]);

    setActiveSyncUid(null);
    setActiveSyncUid("userA");
    expect(Object.keys(getProgress())).toEqual(["DP-700"]);
    expect(getAttempted("DP-700")).toEqual(["legacy"]);
  });

  it("routes unattributable legacy data through the one-shot guest claim", () => {
    seedLegacyProgress(); // no fp_sync_meta -> never synced to any account

    expect(migrateLegacyStorage().targetScopeId).toBe(GUEST_SCOPE_ID);

    setActiveSyncUid("userA");
    expect(Object.keys(getProgress())).toEqual(["DP-700"]);

    setActiveSyncUid(null);
    setActiveSyncUid("userB");
    expect(getProgress()).toEqual({});
  });

  it("removes the legacy unscoped keys and does not run twice", () => {
    seedLegacyProgress();

    const first = migrateLegacyStorage();
    expect(first.movedKeys.sort()).toEqual(["fp_attempted_DP-700", "fp_bookmarks", "fp_progress"]);
    expect(localStorage.getItem("fp_progress")).toBeNull();
    expect(localStorage.getItem("fp_bookmarks")).toBeNull();

    // A later guest session writes new data; a second migration pass must not
    // touch it (and there is nothing left to move anyway).
    expect(migrateLegacyStorage()).toBeNull();
  });

  it("leaves device-level settings unscoped", () => {
    localStorage.setItem("fp_theme", "dark");
    localStorage.setItem("fp_cookie_consent", "declined");

    migrateLegacyStorage();

    expect(localStorage.getItem("fp_theme")).toBe("dark");
    expect(localStorage.getItem("fp_cookie_consent")).toBe("declined");
  });

  it("never clobbers data already present in the destination scope", () => {
    localStorage.setItem(
      scopedKey("fp_progress", userScopeId("userA")),
      JSON.stringify({ "DP-700": { attempts: [], correct: 0, total: 0, bookmarked: ["kept"] } })
    );
    seedLegacyProgress();
    localStorage.setItem("fp_sync_meta", JSON.stringify({ uid: "userA" }));

    migrateLegacyStorage();

    expect(scopedGet("fp_progress", {}, userScopeId("userA"))["DP-700"].bookmarked).toEqual(["kept"]);
  });
});

describe("scope tokens", () => {
  it("invalidates a token whenever the identity changes", () => {
    setActiveSyncUid("userA");
    const token = captureScopeToken();
    expect(isScopeTokenCurrent(token)).toBe(true);

    setActiveSyncUid(null);
    expect(isScopeTokenCurrent(token)).toBe(false);

    // Returning to the same identity does not revive a stale token.
    setActiveSyncUid("userA");
    expect(isScopeTokenCurrent(token)).toBe(false);
  });

  it("does not invalidate a token when the identity is re-set to itself", () => {
    setActiveSyncUid("userA");
    const token = captureScopeToken();
    setActiveSyncUid("userA");
    expect(isScopeTokenCurrent(token)).toBe(true);
  });
});

describe("pullAndMergeProgress identity safety", () => {
  it("merges remote into the signing-in account's own scope", async () => {
    firestore.remote.set("users/userA", {
      progress: {
        "DP-700": {
          attempts: [{ questionId: "remote", timestamp: "2026-01-01T00:00:00.000Z", isCorrect: true }],
        },
      },
      examResults: [],
    });

    setActiveSyncUid("userA");
    recordAttempt("DP-700", "local", true);
    await pullAndMergeProgress("userA");

    const attempts = scopedGet("fp_progress", {}, userScopeId("userA"))["DP-700"].attempts;
    expect(attempts.map((a) => a.questionId).sort()).toEqual(["local", "remote"]);
    // Nothing landed in the guest pool or the unscoped legacy key.
    expect(localStorage.getItem("fp_progress")).toBeNull();
    expect(scopedGet("fp_progress", null, GUEST_SCOPE_ID)).toBeNull();
  });

  it("refuses to run for an identity that is no longer signed in", async () => {
    setActiveSyncUid("userA");
    recordAttempt("DP-700", "q1", true);
    setActiveSyncUid("userB");

    const result = await pullAndMergeProgress("userA");

    expect(result.stale).toBe(true);
    expect(firestore.setDocCalls).toHaveLength(0);
    expect(getProgress()).toEqual({}); // userB's scope untouched
  });

  it("does not persist a pull whose identity changed while it was in flight", async () => {
    firestore.remote.set("users/userA", {
      progress: {
        "DP-700": {
          attempts: [{ questionId: "a-secret", timestamp: "2026-01-01T00:00:00.000Z", isCorrect: true }],
        },
      },
      examResults: [{ examCode: "DP-700", timestamp: "2026-01-01T00:00:00.000Z", score: 9, total: 10 }],
    });

    setActiveSyncUid("userA");

    // User A logs out and user B signs in while the getDoc is still pending.
    firestore.duringGetDoc = async () => {
      setActiveSyncUid(null);
      setActiveSyncUid("userB");
    };

    const result = await pullAndMergeProgress("userA");

    expect(result.stale).toBe(true);
    expect(firestore.setDocCalls).toHaveLength(0);

    // Nothing written under the new identity, the guest scope, or unscoped.
    expect(scopedGet("fp_progress", null, userScopeId("userB"))).toBeNull();
    expect(scopedGet("fp_progress", null, GUEST_SCOPE_ID)).toBeNull();
    expect(localStorage.getItem("fp_progress")).toBeNull();
    // ...and A's own scope was not rewritten either.
    expect(scopedGet("fp_progress", null, userScopeId("userA"))).toBeNull();
  });

  it("does not create a remote document for a logged-out identity mid-flight", async () => {
    setActiveSyncUid("userA");
    recordAttempt("DP-700", "q1", true);

    firestore.duringGetDoc = async () => setActiveSyncUid(null);

    const result = await pullAndMergeProgress("userA");

    expect(result.stale).toBe(true);
    expect(firestore.setDocCalls).toHaveLength(0);
    expect(firestore.remote.has("users/userA")).toBe(false);
  });
});

describe("pushProgress identity safety", () => {
  it("pushes the account's own scoped snapshot", async () => {
    setActiveSyncUid("userA");
    recordAttempt("DP-700", "q1", true);

    await pushProgress("userA");

    expect(firestore.setDocCalls).toHaveLength(1);
    expect(Object.keys(firestore.remote.get("users/userA").progress)).toEqual(["DP-700"]);
    expect(scopedGet(SYNC_META_KEY, null, userScopeId("userA")).uid).toBe("userA");
  });

  it("skips a push once the identity has changed", async () => {
    setActiveSyncUid("userA");
    recordAttempt("DP-700", "q1", true);
    setActiveSyncUid("userB");

    await pushProgress("userA");

    expect(firestore.setDocCalls).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// Lost-update bugs. Both of these are about a write that happens *while* a
// sync is mid-flight, and both were silent data loss before the fix:
//
//   1. `pullAndMergeProgress` captured the local snapshot BEFORE `await
//      getDoc(...)`, then unconditionally overwrote local storage with a merge
//      computed from that stale copy. Any answer recorded during the network
//      round-trip was erased. This runs on every login and every tab
//      visibilitychange, so the window is hit routinely.
//
//   2. `pushProgress` did a blind `setDoc` of the local arrays. `{merge:true}`
//      merges fields, not array *contents*, so with two devices on one account
//      the last push to land replaced the other device's array wholesale.
// ---------------------------------------------------------------------------

describe("pullAndMergeProgress does not lose writes made during the getDoc await", () => {
  it("keeps an answer recorded while the remote read was in flight", async () => {
    firestore.remote.set("users/userA", {
      progress: { "DP-700": { attempts: [attempt("remote", 1)] } },
      examResults: [],
    });

    setActiveSyncUid("userA");
    recordAttempt("DP-700", "before-pull", true);

    // The user answers a question while the network read is still pending.
    firestore.duringGetDoc = async () => {
      recordAttempt("DP-700", "during-pull", true);
    };

    const merged = await pullAndMergeProgress("userA");

    // Present locally, in the returned snapshot, and in what was written back.
    expect(localAttemptIds("userA")).toEqual(["before-pull", "during-pull", "remote"]);
    expect(merged.progress["DP-700"].attempts.map((a) => a.questionId).sort()).toEqual([
      "before-pull",
      "during-pull",
      "remote",
    ]);
    expect(remoteAttemptIds("userA")).toEqual(["before-pull", "during-pull", "remote"]);
  });

  it("keeps a mock-exam result saved while the remote read was in flight", async () => {
    firestore.remote.set("users/userA", { progress: {}, examResults: [] });

    setActiveSyncUid("userA");
    firestore.duringGetDoc = async () => {
      saveExamResult("DP-700", { score: 7, total: 10, percentage: 70 });
    };

    await pullAndMergeProgress("userA");

    expect(getExamResults()).toHaveLength(1);
    expect(firestore.remote.get("users/userA").examResults).toHaveLength(1);
  });

  it("keeps a bookmark toggled on while the remote read was in flight", async () => {
    firestore.remote.set("users/userA", {
      progress: { "DP-700": { attempts: [attempt("remote", 1)], bookmarked: [] } },
      examResults: [],
    });

    setActiveSyncUid("userA");
    firestore.duringGetDoc = async () => {
      const progress = scopedGet(PROGRESS_KEY, {}, SCOPE_A());
      progress["DP-700"] = progress["DP-700"] || { attempts: [], correct: 0, total: 0, bookmarked: [] };
      progress["DP-700"].bookmarked = ["fresh-bookmark"];
      scopedSet(PROGRESS_KEY, progress, SCOPE_A());
    };

    await pullAndMergeProgress("userA");

    expect(scopedGet(PROGRESS_KEY, {}, SCOPE_A())["DP-700"].bookmarked).toEqual(["fresh-bookmark"]);
  });

  it("does not let two overlapping pulls clobber each other", async () => {
    // Real scenario: the login pull and a visibilitychange pull overlapping.
    firestore.remote.set("users/userA", {
      progress: { "DP-700": { attempts: [attempt("remote", 1)] } },
      examResults: [],
    });

    setActiveSyncUid("userA");
    recordAttempt("DP-700", "local", true);

    // Each pull's read window sees a different answer recorded.
    let gateCalls = 0;
    firestore.duringGetDoc = async () => {
      gateCalls += 1;
      recordAttempt("DP-700", `during-${gateCalls}`, true);
    };

    await Promise.all([pullAndMergeProgress("userA"), pullAndMergeProgress("userA")]);

    expect(gateCalls).toBe(2);
    expect(localAttemptIds("userA")).toEqual(["during-1", "during-2", "local", "remote"]);
    expect(remoteAttemptIds("userA")).toEqual(["during-1", "during-2", "local", "remote"]);
  });
});

describe("pushProgress merges instead of overwriting", () => {
  it("folds in remote data this device has never seen", async () => {
    // Another device already pushed; its answer exists only in the cloud.
    firestore.remote.set("users/userA", {
      progress: { "DP-700": { attempts: [attempt("from-device-b", 2)] } },
      examResults: [],
    });

    setActiveSyncUid("userA");
    recordAttempt("DP-700", "from-device-a", true);

    await pushProgress("userA");

    expect(remoteAttemptIds("userA")).toEqual(["from-device-a", "from-device-b"]);
    // This device converges on exactly the state a pull would have produced.
    expect(localAttemptIds("userA")).toEqual(["from-device-a", "from-device-b"]);
  });

  it("does not let the second device's push erase the first device's", async () => {
    setActiveSyncUid("userA");

    // Device A pushes its own local state.
    scopedSet(PROGRESS_KEY, deviceProgress("a", 1), SCOPE_A());
    await pushProgress("userA");

    // Device B is a different browser, so it starts from its own local state
    // with no knowledge of A's answer. Model that by replacing this scope's
    // contents wholesale, then pushing.
    scopedSet(PROGRESS_KEY, deviceProgress("b", 2), SCOPE_A());
    scopedSet(EXAM_RESULTS_KEY, [], SCOPE_A());
    await pushProgress("userA");

    expect(remoteAttemptIds("userA")).toEqual(["a", "b"]);
    expect(localAttemptIds("userA")).toEqual(["a", "b"]);
  });

  it("preserves another device's write that lands during this push's read", async () => {
    setActiveSyncUid("userA");
    recordAttempt("DP-700", "device-a", true);

    // Device B's push reaches the server while device A's getDoc is in flight.
    firestore.duringGetDoc = async () => {
      firestore.duringGetDoc = null;
      firestore.remote.set("users/userA", {
        progress: { "DP-700": { attempts: [attempt("device-b", 2)] } },
        examResults: [],
      });
    };

    await pushProgress("userA");

    expect(remoteAttemptIds("userA")).toEqual(["device-a", "device-b"]);
    expect(localAttemptIds("userA")).toEqual(["device-a", "device-b"]);
  });

  it("merges exam results from both devices rather than replacing the array", async () => {
    firestore.remote.set("users/userA", {
      progress: {},
      examResults: [
        { examCode: "DP-700", timestamp: "2026-01-01T00:00:00.000Z", score: 5, total: 10 },
      ],
    });

    setActiveSyncUid("userA");
    saveExamResult("DP-700", { score: 9, total: 10, percentage: 90 });

    await pushProgress("userA");

    expect(firestore.remote.get("users/userA").examResults).toHaveLength(2);
    expect(getExamResults()).toHaveLength(2);
  });

  it("still creates the remote document when this device has nothing yet", async () => {
    setActiveSyncUid("userA");

    await pushProgress("userA");

    expect(firestore.remote.has("users/userA")).toBe(true);
  });

  it("does not lose an answer recorded during the push's own read window", async () => {
    firestore.remote.set("users/userA", { progress: {}, examResults: [] });

    setActiveSyncUid("userA");
    recordAttempt("DP-700", "before-push", true);
    firestore.duringGetDoc = async () => {
      recordAttempt("DP-700", "during-push", true);
    };

    await pushProgress("userA");

    expect(localAttemptIds("userA")).toEqual(["before-push", "during-push"]);
    expect(remoteAttemptIds("userA")).toEqual(["before-push", "during-push"]);
  });
});

// ---------------------------------------------------------------------------
// Verification of the existing scope-token guards. `pushProgress` now has an
// `await getDoc(...)` window it did not have before, so it needs the same
// mid-flight re-check `pullAndMergeProgress` already had.
// ---------------------------------------------------------------------------

describe("identity guards hold across an account switch mid-flight", () => {
  it("does not persist a push whose identity changed while it was in flight", async () => {
    firestore.remote.set("users/userA", {
      progress: { "DP-700": { attempts: [attempt("a-secret", 1)] } },
      examResults: [],
    });

    setActiveSyncUid("userA");
    recordAttempt("DP-700", "a-local", true);

    // A logs out and B signs in while the push's read is still pending.
    firestore.duringGetDoc = async () => {
      setActiveSyncUid(null);
      setActiveSyncUid("userB");
    };

    const result = await pushProgress("userA");

    expect(result.stale).toBe(true);
    expect(firestore.setDocCalls).toHaveLength(0);

    // Nothing written under the new identity, the guest scope, or unscoped.
    expect(scopedGet(PROGRESS_KEY, null, userScopeId("userB"))).toBeNull();
    expect(scopedGet(PROGRESS_KEY, null, GUEST_SCOPE_ID)).toBeNull();
    expect(localStorage.getItem(PROGRESS_KEY)).toBeNull();
    // A's remote document was not rewritten, so A's own data is untouched.
    expect(remoteAttemptIds("userA")).toEqual(["a-secret"]);
    // ...and A's local scope still holds only what A actually recorded.
    expect(localAttemptIds("userA")).toEqual(["a-local"]);
  });

  it("does not merge a previous account's remote data into the new account", async () => {
    firestore.remote.set("users/userA", {
      progress: { "DP-700": { attempts: [attempt("a-secret", 1)] } },
      examResults: [],
    });

    setActiveSyncUid("userA");
    firestore.duringGetDoc = async () => setActiveSyncUid("userB");

    await pullAndMergeProgress("userA");

    // userB is signed in now; nothing of A's may be visible to them.
    expect(getProgress()).toEqual({});
    expect(getBookmarks()).toEqual([]);
    expect(firestore.remote.has("users/userB")).toBe(false);
  });

  it("does not push a previous identity's data after a switch during the debounce", async () => {
    vi.useFakeTimers();
    try {
      setActiveSyncUid("userA");
      recordAttempt("DP-700", "a-secret", true);
      scheduleCloudSync("userA");

      setActiveSyncUid("userB"); // switch inside the 2s debounce window

      await vi.advanceTimersByTimeAsync(5000);

      expect(firestore.setDocCalls).toHaveLength(0);
      expect(firestore.remote.has("users/userA")).toBe(false);
      expect(firestore.remote.has("users/userB")).toBe(false);
    } finally {
      vi.useRealTimers();
    }
  });

  it("does push once the debounce elapses with the identity unchanged", async () => {
    // Positive control: proves the test above is observing a real guard and
    // not merely a debounce that never fires.
    vi.useFakeTimers();
    try {
      setActiveSyncUid("userA");
      recordAttempt("DP-700", "q1", true);
      scheduleCloudSync("userA");

      expect(firestore.setDocCalls).toHaveLength(0);
      await vi.advanceTimersByTimeAsync(2000);

      expect(firestore.setDocCalls).toHaveLength(1);
      expect(remoteAttemptIds("userA")).toEqual(["q1"]);
    } finally {
      vi.useRealTimers();
    }
  });

  it("does not push for an identity that was never the active one", async () => {
    setActiveSyncUid("userB");
    scheduleCloudSync("userA");

    vi.useFakeTimers();
    try {
      await vi.advanceTimersByTimeAsync(5000);
    } finally {
      vi.useRealTimers();
    }

    expect(firestore.remote.has("users/userA")).toBe(false);
  });
});
