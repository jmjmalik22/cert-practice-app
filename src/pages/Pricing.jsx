import { Head as Helmet } from "vite-react-ssg";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useTheme, FONT_DISPLAY, FONT_MONO } from "../lib/theme.jsx";
import { Footer } from "../components/Shared.jsx";

const INCLUDED = [
  "Practice questions across every exam track",
  "Explanations for every answer",
  "Timed mock exam mode",
  "Progress tracking and streaks synced across devices",
  "Study guides for every supported exam",
];

export function Pricing() {
  const TOKENS = useTheme();

  return (
    <div className="min-h-full flex flex-col">
      <Helmet>
        <title>Pricing | FabricPrep</title>
        <link rel="canonical" href="https://fabricprep.com/pricing" />
        <meta name="description" content="FabricPrep is free to use while in beta. See what's included." />
      </Helmet>

      <main className="flex-1 px-6 sm:px-10 py-16 max-w-2xl mx-auto w-full text-center">
        <p className="text-xs uppercase tracking-widest mb-3" style={{ color: TOKENS.azure, fontFamily: FONT_MONO }}>Pricing</p>
        <h1 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
          Free while FabricPrep is in beta.
        </h1>
        <p className="text-sm sm:text-base mb-10" style={{ color: TOKENS.inkMuted }}>
          There&apos;s no paid plan yet — every exam track, study guide, and progress feature is available at no cost. If that changes, current users will hear about it first.
        </p>

        <div className="rounded-2xl p-7 sm:p-10 text-left" style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}>
          <h2 className="text-xl font-semibold mb-5" style={{ color: TOKENS.ink }}>What&apos;s included</h2>
          <ul className="space-y-3 mb-8">
            {INCLUDED.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm" style={{ color: TOKENS.inkMuted }}>
                <CheckCircle2 size={18} color={TOKENS.green} className="flex-shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
          <Link to="/" className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium" style={{ background: TOKENS.azure, color: TOKENS.bgDeep }}>
            Start practicing <ArrowRight size={16} />
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
