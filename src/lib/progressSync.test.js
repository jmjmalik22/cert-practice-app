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
  setActiveSyncUid,
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
  userScopeId,
} from "./storageScope.js";
import { getProgress, recordAttempt, saveExamResult, getExamResults } from "./progress.jsx";
import { getAttempted, getBookmarks, toggleBookmarkStorage } from "./theme.jsx";

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
