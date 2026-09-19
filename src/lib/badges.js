// Achievement badge logic: award tiers from cumulative practice-mode
// accuracy, and mint a public, verifiable badge record in Firestore for
// signed-in users.
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
import { registerClaimMerge, scopedGet, scopedSet, userScopeId } from "./storageScope.js";
import { getPracticeMastery } from "./progress.jsx";
import { EXAM_CODES } from "./examCatalog.js";

// Per-account keys — read/written through the scoped storage helpers so a
// second account on the same browser can never inherit these. See
// src/lib/storageScope.js.
export const BADGES_KEY = "fp_badges";
export const SHIELD_RESULTS_KEY = "fp_shield_results";

// When guest progress is claimed by an account signing in for the first time:
//
//  - `fp_badges` is only a cache of which badge documents have already been
//    minted for a given uid. It means nothing under a different identity, so
//    drop it; syncBadgesToCloud re-mints from scratch (it is idempotent).
//  - `fp_shield_results` keeps the best sitting per exam, mirroring
//    recordShieldResult, so a claim can never downgrade an existing shield.
registerClaimMerge(BADGES_KEY, () => undefined);
registerClaimMerge(SHIELD_RESULTS_KEY, (guestResults, accountResults) => {
  const merged = { ...(accountResults || {}) };
  Object.entries(guestResults || {}).forEach(([examCode, result]) => {
    const existing = merged[examCode];
    if (!existing || (result?.score ?? 0) > existing.score) merged[examCode] = result;
  });
  return merged;
});

// Minimum distinct practice questions an exam needs before it's eligible
// for a badge at all — keeps a badge from being earned off a handful of
// lucky answers. Mock exam attempts don't count toward badges: someone
// could otherwise game a short mock rather than actually practicing.
export const MIN_PRACTICE_QUESTIONS_FOR_BADGE = 51;

export const BADGE_TIERS = [
  { id: "elite", label: "ELITE", minPercentage: 95 },
  { id: "mastery", label: "MASTERY", minPercentage: 90 },
  { id: "proven", label: "PROVEN", minPercentage: 80 },
];

// The Shield exam is a single scored sitting rather than cumulative practice,
// so it reaches the same tiers at lower thresholds.
export const SHIELD_TIERS = [
  { id: "elite", label: "ELITE", minPercentage: 90 },
  { id: "mastery", label: "MASTERY", minPercentage: 80 },
  { id: "proven", label: "PROVEN", minPercentage: 70 },
];

const TIER_RANK = { proven: 1, mastery: 2, elite: 3 };

export function getTierForScore(percentage) {
  return BADGE_TIERS.find((tier) => percentage >= tier.minPercentage) || null;
}

export function getShieldTierForScore(percentage) {
  return SHIELD_TIERS.find((tier) => percentage >= tier.minPercentage) || null;
}

export function getShieldResults() {
  return scopedGet(SHIELD_RESULTS_KEY, {});
}

export function getShieldResult(examCode) {
  return getShieldResults()[examCode] || null;
}

// Keeps only the best Shield sitting per exam, so a weaker retake can never
// downgrade a shield the user has already earned.
export function recordShieldResult(examCode, percentage) {
  const tier = getShieldTierForScore(percentage);
  const results = getShieldResults();
  const previous = results[examCode];

  if (!previous || percentage > previous.score) {
    results[examCode] = {
      score: percentage,
      tier: tier?.id ?? null,
      earnedAt: new Date().toISOString(),
    };
    scopedSet(SHIELD_RESULTS_KEY, results);
  }

  return tier;
}

function practiceBadgeFor(examCode) {
  const { attempted, percentage } = getPracticeMastery(examCode);
  if (attempted < MIN_PRACTICE_QUESTIONS_FOR_BADGE) return null;

  const tier = getTierForScore(percentage);
  if (!tier) return null;

  return { examCode, tier: tier.id, tierLabel: tier.label, score: percentage, source: "practice" };
}

function shieldBadgeFor(examCode) {
  const result = getShieldResult(examCode);
  if (!result?.tier) return null;

  const tier = SHIELD_TIERS.find((t) => t.id === result.tier);
  if (!tier) return null;

  return { examCode, tier: tier.id, tierLabel: tier.label, score: result.score, source: "shield" };
}

// One badge per exam. Both the Shield exam and cumulative practice accuracy
// can earn one, so when a user has both we keep the stronger tier — and
// prefer the Shield on a tie, since a scored sitting is the harder credential.
export function getEarnedBadges() {
  return EXAM_CODES.map((examCode) => {
    const practice = practiceBadgeFor(examCode);
    const shield = shieldBadgeFor(examCode);

    if (!practice) return shield;
    if (!shield) return practice;

    return TIER_RANK[shield.tier] >= TIER_RANK[practice.tier] ? shield : practice;
  }).filter(Boolean);
}

export function badgeDocId(uid, examCode) {
  return `${uid}_${examCode}`;
}

function getBadgeCache(scopeId) {
  return scopedGet(BADGES_KEY, {}, scopeId);
}

function saveBadgeCacheEntry(examCode, entry, scopeId) {
  const cache = getBadgeCache(scopeId);
  cache[examCode] = entry;
  scopedSet(BADGES_KEY, cache, scopeId);
}

// Mint (or upgrade) a public verification record for every badge the user
// has earned but hasn't yet minted at this tier. Safe to call repeatedly.
//
// The mint cache is written into `uid`'s own storage scope explicitly: this
// loop awaits between iterations, and if the signed-in identity changes
// mid-flight the remaining writes must not land in the new identity's scope.
export async function syncBadgesToCloud(uid) {
  if (!uid) return;

  const scopeId = userScopeId(uid);
  const cache = getBadgeCache(scopeId);

  for (const badge of getEarnedBadges()) {
    const cached = cache[badge.examCode];
    if (cached && cached.uid === uid && cached.tier === badge.tier && cached.source === badge.source) continue;

    const badgeId = badgeDocId(uid, badge.examCode);
    try {
      await setDoc(
        doc(db, "badges", badgeId),
        {
          uid,
          examCode: badge.examCode,
          tier: badge.tier,
          score: badge.score,
          source: badge.source,
          issuedAt: serverTimestamp(),
        },
        { merge: true }
      );
      saveBadgeCacheEntry(
        badge.examCode,
        { uid, tier: badge.tier, source: badge.source, badgeId },
        scopeId
      );
    } catch (error) {
      console.error("Failed to sync badge:", error);
    }
  }
}
