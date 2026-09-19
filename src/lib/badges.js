// Achievement badge logic: award tiers from cumulative practice-mode
// accuracy, and mint a public, verifiable badge record in Firestore for
// signed-in users.
//
// KNOWN LIMIT — badges are self-asserted, not independently verified.
// Scores are computed here, in the browser, from data the user controls
// (localStorage, and `users/{uid}` in Firestore, which is client-writable).
// firestore.rules enforces that a minted badge is internally consistent —
// real exam code, real tier, a score that actually clears that tier, a
// server-set issue date, no downgrade — but a determined user with devtools
// can still write a self-consistent badge they didn't earn, and the /verify
// page will show it. Closing that gap needs a server-side writer (a Cloud
// Function that scores attempts and is the only principal allowed to write
// both `users/{uid}` progress and `badges/*`); there is no Functions setup in
// this repo today. Don't add checks here or in the rules that read
// client-written data and call the result "verification".
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
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

export const TIER_RANK = Object.freeze({ proven: 1, mastery: 2, elite: 3 });

export const TIER_IDS = Object.freeze(["proven", "mastery", "elite"]);

export const BADGE_SOURCES = Object.freeze(["practice", "shield"]);

// Lowest score that genuinely earns `tierId` from `source`.
export function tierFloor(source, tierId) {
  const tiers = source === "shield" ? SHIELD_TIERS : BADGE_TIERS;
  return tiers.find((tier) => tier.id === tierId)?.minPercentage ?? null;
}

// The exact shape a public badge document is allowed to claim. This mirrors
// the `wellFormed()` check in firestore.rules one-for-one: a badge that fails
// here would be rejected by the server, and a badge the server would reject
// must fail here. Keep the two in step — badges.test.js asserts they agree.
//
// This is a consistency check, NOT a trust boundary. It stops a badge doc from
// claiming a tier its own score doesn't support; it cannot establish that the
// score itself was honestly earned, because every input it reads (local
// storage here, `users/{uid}` in Firestore) is under the user's control.
export function isValidBadgeClaim(claim) {
  if (!claim || typeof claim !== "object") return false;
  if (!EXAM_CODES.includes(claim.examCode)) return false;
  if (!BADGE_SOURCES.includes(claim.source)) return false;
  if (!TIER_IDS.includes(claim.tier)) return false;
  if (typeof claim.score !== "number" || !Number.isFinite(claim.score)) return false;
  if (claim.score < 0 || claim.score > 100) return false;

  const floor = tierFloor(claim.source, claim.tier);
  return floor !== null && claim.score >= floor;
}

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

// True when this badge is already covered by what we've minted for `uid`:
// either the identical tier+source, or a strictly higher tier (a badge is
// never taken back, so nothing needs writing).
function alreadyCoveredByCache(cached, badge, uid) {
  if (!cached || cached.uid !== uid) return false;
  if (TIER_RANK[cached.tier] > TIER_RANK[badge.tier]) return true;
  return cached.tier === badge.tier && cached.source === badge.source;
}

// Mint (or upgrade) a public verification record for every badge the user
// has earned but hasn't yet minted at this tier. Safe to call repeatedly.
//
// The mint cache is read/written through `uid`'s own storage scope
// explicitly (not the ambient active scope): this loop awaits between
// iterations, and if the signed-in identity changes mid-flight the
// remaining writes must not land in a different identity's scope.
export async function syncBadgesToCloud(uid) {
  if (!uid) return;

  const scopeId = userScopeId(uid);
  const cache = getBadgeCache(scopeId);

  for (const badge of getEarnedBadges()) {
    // Never send a write the security rules would reject: it would fail on
    // every sync forever and the local cache would never settle.
    if (!isValidBadgeClaim(badge)) {
      console.error("Refusing to mint an inconsistent badge claim:", badge);
      continue;
    }

    if (alreadyCoveredByCache(cache[badge.examCode], badge, uid)) continue;

    const badgeId = badgeDocId(uid, badge.examCode);
    const badgeRef = doc(db, "badges", badgeId);

    try {
      // Practice accuracy can fall (a wrong retry of an old question lowers
      // it), so the locally-earned tier can legitimately drop below one
      // already on record. The rules reject a downgrade, so don't attempt
      // one — record the minted tier locally instead and stop retrying.
      const existing = await getDoc(badgeRef);
      const minted = existing.exists() ? existing.data() : null;

      if (minted && TIER_RANK[minted.tier] > TIER_RANK[badge.tier]) {
        saveBadgeCacheEntry(
          badge.examCode,
          { uid, tier: minted.tier, source: minted.source ?? badge.source, badgeId },
          scopeId
        );
        continue;
      }

      await setDoc(
        badgeRef,
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
