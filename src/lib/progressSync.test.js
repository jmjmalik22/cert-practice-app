import { describe, it, expect } from "vitest";
import { mergeExamProgress, mergeProgressData, mergeExamResults } from "./progressSync.js";

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
