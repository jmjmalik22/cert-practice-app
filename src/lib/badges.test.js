// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from "vitest";
import {
  SHIELD_TIERS,
  getShieldTierForScore,
  getTierForScore,
  recordShieldResult,
  getShieldResult,
  getEarnedBadges,
} from "./badges.js";
import { shuffle } from "./theme.jsx";

function makePool(size) {
  return Array.from({ length: size }, (_, i) => ({ id: `q${i + 1}` }));
}

beforeEach(() => {
  localStorage.clear();
});

describe("getShieldTierForScore", () => {
  it("awards tiers at 70 / 80 / 90", () => {
    expect(getShieldTierForScore(69)).toBeNull();
    expect(getShieldTierForScore(70).id).toBe("proven");
    expect(getShieldTierForScore(79).id).toBe("proven");
    expect(getShieldTierForScore(80).id).toBe("mastery");
    expect(getShieldTierForScore(89).id).toBe("mastery");
    expect(getShieldTierForScore(90).id).toBe("elite");
    expect(getShieldTierForScore(100).id).toBe("elite");
  });

  it("uses lower thresholds than the cumulative-practice badge", () => {
    expect(getShieldTierForScore(70).id).toBe("proven");
    expect(getTierForScore(70)).toBeNull();
  });

  it("keeps tiers ordered from highest to lowest", () => {
    const thresholds = SHIELD_TIERS.map((t) => t.minPercentage);
    expect(thresholds).toEqual([...thresholds].sort((a, b) => b - a));
  });
});

describe("recordShieldResult", () => {
  it("stores the earned tier for the exam", () => {
    recordShieldResult("DP-700", 84);
    expect(getShieldResult("DP-700")).toMatchObject({ score: 84, tier: "mastery" });
  });

  it("keeps the best sitting so a weaker retake cannot downgrade a shield", () => {
    recordShieldResult("DP-700", 92);
    recordShieldResult("DP-700", 71);

    expect(getShieldResult("DP-700")).toMatchObject({ score: 92, tier: "elite" });
  });

  it("records a sub-70 sitting without awarding a tier", () => {
    expect(recordShieldResult("DP-700", 55)).toBeNull();
    expect(getShieldResult("DP-700").tier).toBeNull();
  });
});

// The Shield exam draws its question set with shuffle(pool).slice(0, count) —
// a plain, fresh random draw every attempt. Repeats across attempts are
// expected (banks aren't much bigger than the 50-question draw); what matters
// is that the draw and the on-screen order are actually randomized each time,
// not stuck repeating the same sequence.
describe("shuffle (Shield question draw)", () => {
  it("does not always return the input order", () => {
    const pool = makePool(50);
    const outcomes = Array.from({ length: 20 }, () => shuffle(pool).map((q) => q.id).join(","));
    const original = pool.map((q) => q.id).join(",");

    expect(outcomes.some((order) => order !== original)).toBe(true);
  });

  it("produces different draws across repeated calls", () => {
    const pool = makePool(72);
    const draws = Array.from({ length: 10 }, () => shuffle(pool).slice(0, 50).map((q) => q.id).join(","));

    expect(new Set(draws).size).toBeGreaterThan(1);
  });

  it("keeps every question from the pool, just reordered", () => {
    const pool = makePool(72);
    const order = shuffle(pool);

    expect(order).toHaveLength(pool.length);
    expect(order.map((q) => q.id).sort()).toEqual(pool.map((q) => q.id).sort());
  });
});

describe("getEarnedBadges", () => {
  it("surfaces a badge earned purely from the Shield exam", () => {
    recordShieldResult("DP-700", 84);

    const badges = getEarnedBadges();
    expect(badges).toHaveLength(1);
    expect(badges[0]).toMatchObject({ examCode: "DP-700", tier: "mastery", source: "shield" });
  });

  it("awards nothing for a failed Shield sitting", () => {
    recordShieldResult("DP-700", 55);
    expect(getEarnedBadges()).toHaveLength(0);
  });

  it("keeps one badge per exam", () => {
    recordShieldResult("DP-700", 95);
    recordShieldResult("DP-600", 72);

    const badges = getEarnedBadges();
    expect(badges).toHaveLength(2);
    expect(badges.map((b) => b.examCode).sort()).toEqual(["DP-600", "DP-700"]);
  });
});
