// @vitest-environment jsdom
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, it, expect, beforeEach } from "vitest";
import {
  BADGE_TIERS,
  SHIELD_TIERS,
  TIER_IDS,
  BADGE_SOURCES,
  tierFloor,
  isValidBadgeClaim,
  getShieldTierForScore,
  getTierForScore,
  recordShieldResult,
  getShieldResult,
  getEarnedBadges,
} from "./badges.js";
import { EXAM_CODES } from "./examCatalog.js";
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

// isValidBadgeClaim is the client-side twin of the `wellFormed()` check in
// firestore.rules. It is a consistency check, not proof the score was earned —
// see the KNOWN LIMIT note at the top of badges.js.
describe("isValidBadgeClaim", () => {
  const validShield = { examCode: "DP-700", tier: "mastery", score: 84, source: "shield" };
  const validPractice = { examCode: "DP-700", tier: "mastery", score: 91, source: "practice" };

  it("accepts a badge whose score clears its claimed tier", () => {
    expect(isValidBadgeClaim(validShield)).toBe(true);
    expect(isValidBadgeClaim(validPractice)).toBe(true);
  });

  it("rejects a tier the score does not actually earn", () => {
    expect(isValidBadgeClaim({ ...validShield, tier: "elite" })).toBe(false);
    // 84 earns mastery on a Shield sitting but not on cumulative practice.
    expect(isValidBadgeClaim({ ...validShield, source: "practice" })).toBe(false);
  });

  it("rejects an unknown exam code", () => {
    expect(isValidBadgeClaim({ ...validShield, examCode: "XX-999" })).toBe(false);
    expect(isValidBadgeClaim({ ...validShield, examCode: "AZ-305" })).toBe(false); // coming soon, no bank
  });

  it("rejects an invented tier or source", () => {
    expect(isValidBadgeClaim({ ...validShield, tier: "legendary" })).toBe(false);
    expect(isValidBadgeClaim({ ...validShield, source: "import" })).toBe(false);
  });

  it("rejects out-of-range or non-numeric scores", () => {
    expect(isValidBadgeClaim({ ...validShield, tier: "elite", score: 1000 })).toBe(false);
    expect(isValidBadgeClaim({ ...validShield, score: -5 })).toBe(false);
    expect(isValidBadgeClaim({ ...validShield, score: "100" })).toBe(false);
    expect(isValidBadgeClaim({ ...validShield, score: NaN })).toBe(false);
  });

  it("rejects junk", () => {
    expect(isValidBadgeClaim(null)).toBe(false);
    expect(isValidBadgeClaim({})).toBe(false);
  });

  it("accepts every badge getEarnedBadges can actually produce", () => {
    recordShieldResult("DP-700", 70);
    recordShieldResult("DP-600", 88);
    recordShieldResult("AZ-900", 100);

    const badges = getEarnedBadges();
    expect(badges).toHaveLength(3);
    badges.forEach((badge) => expect(isValidBadgeClaim(badge)).toBe(true));
  });

  it("accepts exactly the score at each tier floor and rejects one below", () => {
    TIER_IDS.forEach((tier) => {
      BADGE_SOURCES.forEach((source) => {
        const floor = tierFloor(source, tier);
        expect(isValidBadgeClaim({ examCode: "DP-700", tier, source, score: floor })).toBe(true);
        expect(isValidBadgeClaim({ examCode: "DP-700", tier, source, score: floor - 1 })).toBe(false);
      });
    });
  });
});

// firestore.rules hard-codes the exam codes and tier thresholds, because the
// rules language can't import them. These tests fail if the two drift — e.g.
// when a new exam is added to the catalog but not to the rule, which would
// silently block badge issuance for that exam.
describe("firestore.rules badge constraints stay in sync with badges.js", () => {
  const rules = readFileSync(resolve(process.cwd(), "firestore.rules"), "utf8");

  function ruleFunctionBody(name) {
    const start = rules.indexOf(`function ${name}(`);
    expect(start, `firestore.rules is missing function ${name}()`).toBeGreaterThan(-1);
    return rules.slice(start, rules.indexOf("\n      }", start));
  }

  it("lists exactly the catalog's exam codes as writable badge exams", () => {
    const body = ruleFunctionBody("knownExamCodes");
    const codesInRule = [...body.matchAll(/'([A-Z]{2}-\d{3})'/g)].map((m) => m[1]);

    expect([...codesInRule].sort()).toEqual([...EXAM_CODES].sort());
  });

  it("uses the same tier thresholds as BADGE_TIERS and SHIELD_TIERS", () => {
    const body = ruleFunctionBody("tierFloor");
    const thresholdsInRule = [...body.matchAll(/tier == '(\w+)' \? (\d+)/g)];

    // Shield branch comes first in the rule, then the practice branch.
    const shieldInRule = thresholdsInRule.slice(0, 2);
    const practiceInRule = thresholdsInRule.slice(2, 4);

    // Each branch spells out elite and mastery, with proven as the fallback.
    const expected = (tiers) => tiers.filter((t) => t.id !== "proven").map((t) => [t.id, String(t.minPercentage)]);

    expect(shieldInRule.map((m) => [m[1], m[2]])).toEqual(expected(SHIELD_TIERS));
    expect(practiceInRule.map((m) => [m[1], m[2]])).toEqual(expected(BADGE_TIERS));

    // The `proven` fallback values (the trailing number in each branch).
    const fallbacks = [...body.matchAll(/: (\d+)\)/g)].map((m) => Number(m[1]));
    expect(fallbacks).toEqual([
      SHIELD_TIERS.find((t) => t.id === "proven").minPercentage,
      BADGE_TIERS.find((t) => t.id === "proven").minPercentage,
    ]);
  });

  it("knows every tier id, and ranks them in order", () => {
    const body = ruleFunctionBody("tierRank");
    TIER_IDS.forEach((tier) => expect(body).toContain(`tier == '${tier}'`));

    const ranks = [...body.matchAll(/tier == '(\w+)' \? (\d)/g)].map((m) => [m[1], Number(m[2])]);
    expect(ranks).toEqual([["elite", 3], ["mastery", 2], ["proven", 1]]);
  });

  it("keeps the badge write rules locked down", () => {
    expect(rules).toContain("allow delete: if false;");
    // No downgrade of a tier already on record.
    expect(rules).toContain("tierRank(request.resource.data.tier) >= tierRank(resource.data.tier)");
    // The issue date shown on /verify is server-set, not client-chosen.
    expect(rules).toContain("data.issuedAt == request.time");
    // Score is bounded and must clear its own tier.
    expect(rules).toContain("data.score >= tierFloor(data.source, data.tier)");
    expect(rules).toContain("data.score <= 100");
    // Badge writes must never justify themselves from the client-writable
    // users/{uid} document — that would be validation theatre, not a trust
    // boundary. See the KNOWN LIMIT note in badges.js.
    expect(rules).not.toContain("get(/databases/$(database)/documents/users/");
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
