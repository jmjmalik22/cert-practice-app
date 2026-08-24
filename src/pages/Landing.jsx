import { Head as Helmet } from "vite-react-ssg";
import { Link, useOutletContext } from "react-router-dom";
import { RotateCcw, Clock, Bookmark, Flag } from "lucide-react";
import { useTheme, FONT_DISPLAY, FONT_MONO, getAttempted } from "../lib/theme.jsx";
import { QUESTION_BANK, EXAM_META } from "../lib/questionBank.jsx";
import { Header, Footer, MedallionMotif } from "../components/Shared.jsx";

export function Landing() {
  const { theme, onToggleTheme, streak } = useOutletContext();
  const TOKENS = useTheme();
  const totalQuestions = Object.values(QUESTION_BANK).reduce((sum, d) => sum + d.questions.length, 0);
  const examCount = Object.keys(QUESTION_BANK).length;

  const features = [
    { icon: RotateCcw, title: "Untimed practice", body: "Work through questions at your own pace, with instant explanations and domain filters." },
    { icon: Clock, title: "Timed mock exams", body: "Sit a scored, timed exam that mirrors the real format before exam day." },
    { icon: Bookmark, title: "Bookmark questions", body: "Flag anything tricky and come back to it later." },
    { icon: Flag, title: "Sourced from Microsoft Learn", body: "Questions are grounded in official Microsoft documentation, not guesswork." },
  ];

  return (
    <div className="min-h-full flex flex-col">
      <Helmet>
        <title>DP-700 & DP-600 Practice Exams | FabricPrep</title>
        <meta
          name="description"
          content={`${totalQuestions} free practice questions across ${examCount} Microsoft certifications — DP-700, DP-600, AZ-900, and DP-900 — sourced from official Microsoft Learn docs.`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fabricprep.com/" />
        <meta property="og:title" content="DP-700 & DP-600 Practice Exams | FabricPrep" />
        <meta
          property="og:description"
          content={`${totalQuestions} free practice questions across ${examCount} Microsoft certifications, sourced from official Microsoft Learn docs.`}
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "FabricPrep",
            url: "https://fabricprep.com/",
            description: "Free Microsoft certification practice exams for DP-700, DP-600, AZ-900, and DP-900.",
          })}
        </script>
      </Helmet>

      <Header theme={theme} onToggleTheme={onToggleTheme} streak={streak} />

      <div className="px-6 sm:px-10 py-14 text-center flex flex-col items-center">
        <div
          className="text-xs uppercase mb-4 px-3 py-1 rounded-full inline-block"
          style={{ color: TOKENS.azure, letterSpacing: "0.18em", border: `1px solid ${TOKENS.azure}40`, fontFamily: FONT_MONO }}
        >
          Bronze → Silver → Gold
        </div>
        <MedallionMotif />
        <h1 className="text-3xl sm:text-4xl font-semibold mt-2 max-w-xl" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
          Pass your Microsoft certification exam with confidence.
        </h1>
        <p className="mt-3 text-sm max-w-md" style={{ color: TOKENS.inkMuted }}>
          {totalQuestions} realistic practice questions and timed mock exams across {examCount} Microsoft certifications.
        </p>
      </div>

      <div className="px-6 sm:px-10 pb-14 max-w-3xl mx-auto w-full">
        <h2 className="text-xs uppercase mb-3" style={{ color: TOKENS.inkMuted, letterSpacing: "0.14em", fontFamily: FONT_MONO }}>
          Choose an exam
        </h2>
        <div className="flex flex-col gap-3 mb-14">
          {Object.entries(QUESTION_BANK).map(([code, data]) => {
            const meta = EXAM_META[code];
            const attempted = getAttempted(code).length;
            const total = data.questions.length;
            const pct = total ? Math.min(100, Math.round((attempted / total) * 100)) : 0;
            return (
              <Link
                key={code}
                to={`/${meta.slug}`}
                className="rounded-xl p-4 transition-transform hover:-translate-y-0.5"
                style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}`, display: "block" }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-sm" style={{ color: TOKENS.ink, fontFamily: FONT_MONO }}>{code}</span>
                    <span className="text-xs ml-2" style={{ color: TOKENS.inkMuted }}>{data.label}</span>
                  </div>
                  <span className="text-xs" style={{ color: TOKENS.inkMuted, fontFamily: FONT_MONO }}>{attempted}/{total}</span>
                </div>
                <div className="mt-2 rounded-full overflow-hidden" style={{ height: 4, background: TOKENS.panelBorder }}>
                  <div style={{ width: `${pct}%`, height: "100%", background: TOKENS.azure }} />
                </div>
              </Link>
            );
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14">
          {features.map((f) => (
            <div key={f.title} className="rounded-2xl p-5" style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}>
              <f.icon size={18} color={TOKENS.azure} />
              <div className="font-semibold text-sm mt-3" style={{ color: TOKENS.ink }}>{f.title}</div>
              <p className="text-xs mt-1" style={{ color: TOKENS.inkMuted }}>{f.body}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row gap-5 items-start" style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}>
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0"
            style={{ background: `${TOKENS.azure}22`, color: TOKENS.azure, fontFamily: FONT_MONO }}
          >
            JM
          </div>
          <div>
            <div className="text-xs uppercase mb-2" style={{ color: TOKENS.inkMuted, letterSpacing: "0.12em", fontFamily: FONT_MONO }}>
              Meet the founder
            </div>
            <h2 className="text-lg font-semibold" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
              Hi, I'm Jitendra Singh Malik.
            </h2>
            <p className="text-sm mt-2" style={{ color: TOKENS.inkMuted }}>
              I'm a data engineer and database architect working in a fully Microsoft-embedded stack — SQL Server,
              Power BI, Azure, and Microsoft Fabric. I built FabricPrep to give you the realistic, exam-style
              practice I wish I'd had while preparing for my own certifications.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
