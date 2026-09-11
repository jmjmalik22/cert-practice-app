// Achievement badge logic: award tiers from cumulative practice-mode
// accuracy, and mint a public, verifiable badge record in Firestore for
// signed-in users.
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
import { safeGet, safeSet } from "./theme.jsx";
import { getPracticeMastery } from "./progress.jsx";
import { EXAM_CODES } from "./examCatalog.js";

const BADGES_KEY = "fp_badges";

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

export function getTierForScore(percentage) {
  return BADGE_TIERS.find((tier) => percentage >= tier.minPercentage) || null;
}

// One badge per exam, based on cumulative practice-mode accuracy (not mock
// exams) once at least MIN_PRACTICE_QUESTIONS_FOR_BADGE distinct questions
// have been practiced.
export function getEarnedBadges() {
  return EXAM_CODES.map((examCode) => {
    const { attempted, percentage } = getPracticeMastery(examCode);
    if (attempted < MIN_PRACTICE_QUESTIONS_FOR_BADGE) return null;

    const tier = getTierForScore(percentage);
    if (!tier) return null;

    return {
      examCode,
      tier: tier.id,
      tierLabel: tier.label,
      score: percentage,
    };
  }).filter(Boolean);
}

export function badgeDocId(uid, examCode) {
  return `${uid}_${examCode}`;
}

function getBadgeCache() {
  return safeGet(BADGES_KEY, {});
}

function saveBadgeCacheEntry(examCode, entry) {
  const cache = getBadgeCache();
  cache[examCode] = entry;
  safeSet(BADGES_KEY, cache);
}

// Mint (or upgrade) a public verification record for every badge the user
// has earned but hasn't yet minted at this tier. Safe to call repeatedly.
export async function syncBadgesToCloud(uid) {
  if (!uid) return;

  const cache = getBadgeCache();

  for (const badge of getEarnedBadges()) {
    const cached = cache[badge.examCode];
    if (cached && cached.uid === uid && cached.tier === badge.tier) continue;

    const badgeId = badgeDocId(uid, badge.examCode);
    try {
      await setDoc(
        doc(db, "badges", badgeId),
        {
          uid,
          examCode: badge.examCode,
          tier: badge.tier,
          score: badge.score,
          issuedAt: serverTimestamp(),
        },
        { merge: true }
      );
      saveBadgeCacheEntry(badge.examCode, { uid, tier: badge.tier, badgeId });
    } catch (error) {
      console.error("Failed to sync badge:", error);
    }
  }
}
