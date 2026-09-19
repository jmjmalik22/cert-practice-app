// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from "vitest";
import {
  SESSION_MODE,
  loadPersistedSession,
  savePersistedSession,
  clearPersistedSession,
  createDeadline,
  computeRemainingSeconds,
  isSessionExpired,
} from "./sessionPersistence.js";
import { resetStorageScopeForTests, setActiveScope, scopedGet } from "./storageScope.js";

beforeEach(() => {
  localStorage.clear();
  resetStorageScopeForTests();
});

describe("loadPersistedSession / savePersistedSession / clearPersistedSession", () => {
  it("returns null when nothing has been saved for that exam+mode", () => {
    expect(loadPersistedSession(SESSION_MODE.PRACTICE, "DP-700")).toBeNull();
  });

  it("round-trips a saved session", () => {
    const session = { orderIds: ["q1", "q2"], idx: 1, answers: { q1: "a" } };
    savePersistedSession(SESSION_MODE.PRACTICE, "DP-700", session);

    const loaded = loadPersistedSession(SESSION_MODE.PRACTICE, "DP-700");
    expect(loaded).toMatchObject(session);
    expect(loaded.savedAt).toEqual(expect.any(Number));
  });

  it("keeps sessions for different exams under the same mode independent", () => {
    savePersistedSession(SESSION_MODE.PRACTICE, "DP-700", { idx: 1 });
    savePersistedSession(SESSION_MODE.PRACTICE, "AI-900", { idx: 2 });

    expect(loadPersistedSession(SESSION_MODE.PRACTICE, "DP-700").idx).toBe(1);
    expect(loadPersistedSession(SESSION_MODE.PRACTICE, "AI-900").idx).toBe(2);

    clearPersistedSession(SESSION_MODE.PRACTICE, "DP-700");
    expect(loadPersistedSession(SESSION_MODE.PRACTICE, "DP-700")).toBeNull();
    expect(loadPersistedSession(SESSION_MODE.PRACTICE, "AI-900").idx).toBe(2);
  });

  it("keeps sessions for different modes independent even for the same exam", () => {
    savePersistedSession(SESSION_MODE.PRACTICE, "DP-700", { idx: 1 });
    savePersistedSession(SESSION_MODE.SHIELD, "DP-700", { idx: 9 });

    expect(loadPersistedSession(SESSION_MODE.PRACTICE, "DP-700").idx).toBe(1);
    expect(loadPersistedSession(SESSION_MODE.SHIELD, "DP-700").idx).toBe(9);
  });

  it("clearing a session that was never saved is a no-op", () => {
    expect(() => clearPersistedSession(SESSION_MODE.MOCK, "DP-700")).not.toThrow();
    expect(loadPersistedSession(SESSION_MODE.MOCK, "DP-700")).toBeNull();
  });

  it("removes the underlying storage key entirely once the last session for a mode is cleared", () => {
    savePersistedSession(SESSION_MODE.MOCK, "DP-700", { idx: 1 });
    clearPersistedSession(SESSION_MODE.MOCK, "DP-700");

    expect(scopedGet("fp_session_mock", null)).toBeNull();
  });

  it("scopes sessions to the active account, matching every other per-account key", () => {
    setActiveScope("user-a");
    savePersistedSession(SESSION_MODE.SHIELD, "DP-700", { idx: 1 });

    setActiveScope("user-b");
    expect(loadPersistedSession(SESSION_MODE.SHIELD, "DP-700")).toBeNull();

    setActiveScope("user-a");
    expect(loadPersistedSession(SESSION_MODE.SHIELD, "DP-700").idx).toBe(1);
  });
});

describe("createDeadline / computeRemainingSeconds / isSessionExpired", () => {
  it("computes a deadline offset from `now` by the given duration", () => {
    expect(createDeadline(600, 1_000)).toBe(601_000);
  });

  it("computes remaining seconds from an absolute deadline", () => {
    const deadline = createDeadline(600, 0);
    expect(computeRemainingSeconds(deadline, 0)).toBe(600);
    expect(computeRemainingSeconds(deadline, 400_000)).toBe(200);
  });

  it("never returns negative remaining seconds once the deadline has passed", () => {
    const deadline = createDeadline(600, 0);
    expect(computeRemainingSeconds(deadline, 900_000)).toBe(0);
  });

  it("is unaffected by when it is called relative to session start — a refresh can't grant extra time", () => {
    // The whole point of a wall-clock deadline: computing "remaining" at two
    // different wall-clock times for the same deadline reflects real elapsed
    // time, not time since the calling code last ran.
    const deadline = createDeadline(600, 0);
    const remainingRightAway = computeRemainingSeconds(deadline, 1_000);
    const remainingAfterASimulatedRefresh = computeRemainingSeconds(deadline, 300_000);
    expect(remainingAfterASimulatedRefresh).toBeLessThan(remainingRightAway);
    expect(remainingAfterASimulatedRefresh).toBe(300);
  });

  it("treats a deadline in the past as expired", () => {
    expect(isSessionExpired(1_000, 1_000)).toBe(true);
    expect(isSessionExpired(1_000, 2_000)).toBe(true);
    expect(isSessionExpired(2_000, 1_000)).toBe(false);
  });
});
