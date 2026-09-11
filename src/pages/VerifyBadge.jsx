import { useEffect, useState } from "react";
import { Head as Helmet } from "vite-react-ssg";
import { Link, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { ArrowRight, ShieldAlert } from "lucide-react";
import { useTheme, FONT_DISPLAY, FONT_MONO } from "../lib/theme.jsx";
import { db } from "../lib/firebase";
import { EXAM_META } from "../lib/examCatalog.js";
import { BADGE_TIERS } from "../lib/badges.js";
import { BadgeShield } from "../components/BadgeShield.jsx";
import { Footer } from "../components/Shared.jsx";

export function VerifyBadge() {
  const TOKENS = useTheme();
  const { badgeId } = useParams();
  const [state, setState] = useState({ status: "loading", badge: null });

  useEffect(() => {
    let cancelled = false;
    setState({ status: "loading", badge: null });

    getDoc(doc(db, "badges", badgeId))
      .then((snap) => {
        if (cancelled) return;
        if (!snap.exists()) {
          setState({ status: "not-found", badge: null });
          return;
        }
        setState({ status: "found", badge: snap.data() });
      })
      .catch(() => {
        if (!cancelled) setState({ status: "not-found", badge: null });
      });

    return () => {
      cancelled = true;
    };
  }, [badgeId]);

  const tierInfo = state.badge ? BADGE_TIERS.find((t) => t.id === state.badge.tier) : null;
  const examMeta = state.badge ? EXAM_META[state.badge.examCode] : null;
  const issuedDate = state.badge?.issuedAt?.toDate ? state.badge.issuedAt.toDate() : null;

  return (
    <div className="min-h-full flex flex-col">
      <Helmet>
        <title>Verify a FabricPrep Badge</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <main className="flex-1 flex items-center justify-center px-6 py-16">
        {state.status === "loading" && (
          <p style={{ color: TOKENS.inkMuted, fontFamily: FONT_MONO }}>Verifying badge…</p>
        )}

        {state.status === "not-found" && (
          <div className="text-center max-w-md">
            <ShieldAlert size={36} className="mx-auto mb-4" color={TOKENS.inkMuted} />
            <h1 className="text-xl font-bold mb-2" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
              Badge not found
            </h1>
            <p className="text-sm mb-6" style={{ color: TOKENS.inkMuted }}>
              This verification link doesn&apos;t match any FabricPrep badge on record.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium"
              style={{ background: TOKENS.azure, color: TOKENS.bgDeep }}
            >
              Go to FabricPrep <ArrowRight size={15} />
            </Link>
          </div>
        )}

        {state.status === "found" && tierInfo && examMeta && (
          <div className="text-center max-w-md">
            <div className="flex justify-center mb-6">
              <BadgeShield
                tier={tierInfo.id}
                examCode={state.badge.examCode}
                examLabel={examMeta.label}
                score={state.badge.score}
                size={240}
              />
            </div>
            <p className="text-xs uppercase tracking-widest mb-2" style={{ color: TOKENS.azure, fontFamily: FONT_MONO }}>
              Issued by FabricPrep
            </p>
            <h1 className="text-lg font-bold mb-2" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
              Awarded for achieving {state.badge.score}%+ on the FabricPrep {state.badge.examCode} Skills Assessment
              {issuedDate ? ` on ${issuedDate.toLocaleDateString()}` : ""}.
            </h1>
            <p className="text-xs leading-5 mt-4" style={{ color: TOKENS.inkMuted }}>
              FabricPrep is an independent learning platform. This achievement is not a Microsoft certification and
              does not indicate Microsoft affiliation, sponsorship, endorsement, or approval.
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
