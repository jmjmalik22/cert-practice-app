// Achievement badge logic: award tiers from mock exam scores, and mint a
// public, verifiable badge record in Firestore for signed-in users.
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
import { safeGet, safeSet } from "./theme.jsx";
import { getExamResults } from "./progress.jsx";

const BADGES_KEY = "fp_badges";

export const BADGE_TIERS = [
  { id: "elite", label: "ELITE", minPercentage: 95 },
  { id: "mastery", label: "MASTERY", minPercentage: 90 },
  { id: "proven", label: "PROVEN", minPercentage: 80 },
];

export function getTierForScore(percentage) {
  return BADGE_TIERS.find((tier) => percentage >= tier.minPercentage) || null;
}

// Best-scoring badge per exam, for every exam that has reached a tier.
export function getEarnedBadges() {
  const bestByExam = {};

  getExamResults().forEach((result) => {
    const current = bestByExam[result.examCode];
    if (!current || result.percentage > current.percentage) {
      bestByExam[result.examCode] = result;
    }
  });

  return Object.entries(bestByExam)
    .map(([examCode, result]) => {
      const tier = getTierForScore(result.percentage);
      if (!tier) return null;
      return {
        examCode,
        tier: tier.id,
        tierLabel: tier.label,
        score: result.percentage,
      };
    })
    .filter(Boolean);
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
