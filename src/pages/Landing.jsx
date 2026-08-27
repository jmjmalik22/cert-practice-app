import { Head as Helmet } from "vite-react-ssg";
import { Link, useOutletContext } from "react-router-dom";
import { RotateCcw, Clock, Bookmark, Flag } from "lucide-react";
import { useTheme, FONT_DISPLAY, FONT_MONO, getAttempted } from "../lib/theme.jsx";
import { getExamStats } from "../lib/progress.jsx";
import { QUESTION_BANK, EXAM_META } from "../lib/questionBank.jsx";
import { Footer, MedallionMotif } from "../components/Shared.jsx";

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
        <title>Fabric Certification & Azure Certification Practice | FabricPrep</title>
        <link rel="canonical" href="https://fabricprep.com/" />
        <meta
          name="description"
          content={`${totalQuestions}+ free certification prep practice questions for DP-700, DP-600, AZ-900, DP-900. Fabric prep and Azure prep with realistic mock exams sourced from official Microsoft Learn docs.`}
        />
        <meta name="keywords" content="fabric certification, microsoft fabric certification, fabric certification exam, fabric prep, fabricprep, dp 700 prep, dp 600 prep, dp 900 prep, az 900 prep, certification prep, microsoft fabric practice exam, dp-700 practice questions, dp-600 practice exam, az-900 practice test, dp-900 practice questions, microsoft certification, azure certification, fabric data engineer, fabric analytics engineer, data engineer prep, analytics engineer prep, fabric study guide, azure study guide" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fabricprep.com/" />
        <meta property="og:title" content="Microsoft Fabric & Azure Certification Practice Questions | FabricPrep" />
        <meta
          property="og:description"
          content={`${totalQuestions}+ free practice questions across ${examCount} Microsoft certifications, sourced from official Microsoft Learn docs.`}
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "FabricPrep - Fabric Prep",
            url: "https://fabricprep.com/",
            description: "Free Fabric prep and Microsoft certification practice exams for DP-700, DP-600, AZ-900, DP-900, and Azure certifications.",
            alternateName: ["Fabric Prep", "fabric prep", "FabricPrep"],
          })}
        </script>
      </Helmet>

      <div className="px-6 sm:px-10 pt-16 pb-20 text-center flex flex-col items-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full" style={{ background: TOKENS.azure, filter: "blur(80px)" }} />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full" style={{ background: TOKENS.green, filter: "blur(60px)" }} />
        </div>
        
        <div
          className="text-xs uppercase mb-6 px-4 py-2 rounded-full inline-block relative z-10"
          style={{ 
            color: TOKENS.azure, 
            letterSpacing: "0.18em", 
            border: `1px solid ${TOKENS.azure}40`, 
            fontFamily: FONT_MONO,
            background: `${TOKENS.azure}0A`,
            backdropFilter: "blur(8px)"
          }}
        >
          Bronze → Silver → Gold
        </div>
        <MedallionMotif />
        <h1 className="text-4xl sm:text-5xl font-bold mt-4 max-w-2xl relative z-10" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
          Pass your Microsoft certification exam with <span style={{ color: TOKENS.azure }}>confidence</span>.
        </h1>
        <p className="mt-4 text-base max-w-lg relative z-10" style={{ color: TOKENS.inkMuted }}>
          {totalQuestions}+ realistic practice questions for Fabric certification and Azure certification exams. Free DP-700, DP-600, AZ-900, DP-900 prep with timed mock exams.
        </p>
        <div className="mt-6 flex items-center gap-2 text-xs relative z-10">
          <div className="flex items-center gap-1 px-3 py-1 rounded-full" style={{ background: `${TOKENS.green}15`, color: TOKENS.green }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: TOKENS.green }} /> Free forever
          </div>
          <div className="flex items-center gap-1 px-3 py-1 rounded-full" style={{ background: `${TOKENS.amber}15`, color: TOKENS.amber }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: TOKENS.amber }} /> No sign-up required
          </div>
        </div>

        <div
          className="mt-10 w-full max-w-md text-left rounded-2xl p-5 relative z-10"
          style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium" style={{ color: TOKENS.azure, fontFamily: FONT_MONO }}>DP-700 · sample question</span>
            <span className="text-xs" style={{ color: TOKENS.inkMuted }}>1 of 52</span>
          </div>
          <div className="text-sm mb-4" style={{ color: TOKENS.ink }}>
            Which file format is the default storage format for tables in a Fabric Lakehouse?
          </div>
          <div className="flex flex-col gap-2">
            {[
              { label: "CSV", correct: false },
              { label: "Parquet", correct: false },
              { label: "Delta", correct: true },
              { label: "Avro", correct: false },
            ].map((opt) => (
              <div
                key={opt.label}
                className="text-xs px-3 py-2 rounded-lg"
                style={{
                  background: opt.correct ? `${TOKENS.green}15` : TOKENS.bg,
                  border: `1px solid ${opt.correct ? TOKENS.green : TOKENS.panelBorder}`,
                  color: opt.correct ? TOKENS.green : TOKENS.inkMuted,
                }}
              >
                {opt.label}{opt.correct && " ✓"}
              </div>
            ))}
          </div>
          <p className="text-xs mt-3" style={{ color: TOKENS.inkMuted }}>
            Fabric Lakehouse tables are stored as Delta tables, giving you ACID transactions and time travel.
          </p>
        </div>
      </div>

      <div className="px-6 sm:px-10 pb-14 max-w-3xl mx-auto w-full">
        <h2 className="text-xs uppercase mb-3" style={{ color: TOKENS.inkMuted, letterSpacing: "0.14em", fontFamily: FONT_MONO }}>
          Choose an exam
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14">
          {Object.entries(QUESTION_BANK).map(([code, data]) => {
            const meta = EXAM_META[code];
            const attempted = getAttempted(code).length;
            const total = data.questions.length;
            const pct = total ? Math.min(100, Math.round((attempted / total) * 100)) : 0;
            const stats = getExamStats(code, total);
            const hasAttempts = stats.totalAttempts > 0;
            return (
              <Link
                key={code}
                to={`/${meta.slug}`}
                className="rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group"
                style={{ 
                  background: TOKENS.panel, 
                  border: `1px solid ${TOKENS.panelBorder}`,
                  display: "block",
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm"
                      style={{ 
                        background: `${TOKENS.azure}15`, 
                        color: TOKENS.azure,
                        fontFamily: FONT_MONO
                      }}
                    >
                      {code.split('-')[1]}
                    </div>
                    <div>
                      <div className="font-bold text-base" style={{ color: TOKENS.ink }}>{code}</div>
                      <div className="text-xs mt-0.5" style={{ color: TOKENS.inkMuted }}>{data.label}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-medium" style={{ color: TOKENS.inkMuted, fontFamily: FONT_MONO }}>
                      {attempted}/{total}
                    </div>
                    <div className="text-xs mt-1" style={{ color: hasAttempts ? TOKENS.green : TOKENS.inkMuted }}>
                      {hasAttempts ? `${stats.accuracy}% accuracy` : "Not started"}
                    </div>
                  </div>
                </div>
                
                <div className="relative rounded-full overflow-hidden mt-3" style={{ height: 6, background: TOKENS.panelBorder }}>
                  <div 
                    className="absolute top-0 left-0 h-full rounded-full transition-all duration-500 ease-out"
                    style={{ 
                      width: `${pct}%`, 
                      background: `linear-gradient(90deg, ${TOKENS.azure} 0%, ${TOKENS.green} 100%)`,
                      boxShadow: `0 0 12px ${TOKENS.azure}40`
                    }} 
                  />
                </div>
                
                <div className="mt-4 flex justify-end">
                  <span 
                    className="text-xs font-medium px-3 py-1.5 rounded-full transition-all duration-300 group-hover:scale-105"
                    style={{ 
                      background: `${TOKENS.azure}15`, 
                      color: TOKENS.azure,
                      border: `1px solid ${TOKENS.azure}30`
                    }}
                  >
                    Start practicing →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {features.map((f) => (
            <div 
              key={f.title} 
              className="rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group"
              style={{ 
                background: TOKENS.panel, 
                border: `1px solid ${TOKENS.panelBorder}`,
                position: "relative",
                overflow: "hidden"
              }}
            >
              <div 
                className="absolute top-0 right-0 w-16 h-16 opacity-10 group-hover:opacity-20 transition-opacity duration-300"
                style={{ 
                  background: `radial-gradient(circle at top right, ${TOKENS.azure}, transparent 70%)`,
                }}
              />
              
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `${TOKENS.azure}15` }}>
                  <f.icon size={20} color={TOKENS.azure} />
                </div>
                <div className="font-bold text-base mb-2" style={{ color: TOKENS.ink }}>{f.title}</div>
                <p className="text-sm" style={{ color: TOKENS.inkMuted }}>{f.body}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-xs uppercase mb-3 text-center" style={{ color: TOKENS.inkMuted, letterSpacing: "0.14em", fontFamily: FONT_MONO }}>
          Why not just a PDF dump
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
          <div className="rounded-2xl p-6" style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}>
            <div className="text-xs font-medium mb-3" style={{ color: TOKENS.inkMuted }}>Random brain dumps</div>
            <ul className="flex flex-col gap-2.5">
              {[
                "Copy-pasted questions, no idea if they're current",
                "Wrong answers with no explanation to learn from",
                "No domain breakdown — you can't tell where you're weak",
                "No timer, so exam-day pacing is a surprise",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2 text-sm" style={{ color: TOKENS.inkMuted }}>
                  <span style={{ color: TOKENS.red, flexShrink: 0 }}>✗</span> {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl p-6" style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.azure}` }}>
            <div className="text-xs font-medium mb-3" style={{ color: TOKENS.azure }}>FabricPrep</div>
            <ul className="flex flex-col gap-2.5">
              {[
                "Every question sourced from official Microsoft Learn docs",
                "A written explanation for every answer, right or wrong",
                "Filter by exam domain to target your weak spots",
                "Timed mock exams that mirror real exam-day pacing",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2 text-sm" style={{ color: TOKENS.ink }}>
                  <span style={{ color: TOKENS.green, flexShrink: 0 }}>✓</span> {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div 
          className="rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row gap-6 items-start relative overflow-hidden mb-16"
          style={{ 
            background: TOKENS.panel, 
            border: `1px solid ${TOKENS.panelBorder}`,
          }}
        >
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full" style={{ background: TOKENS.azure, filter: "blur(60px)" }} />
            <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full" style={{ background: TOKENS.green, filter: "blur(40px)" }} />
          </div>
          
          <div className="relative z-10 flex-shrink-0">
            <div className="relative">
              <img
                src="/CoverPic_Face.jpg"
                alt="Jitendra Singh Malik"
                className="w-40 h-40 rounded-full object-cover"
                style={{ 
                  border: `3px solid ${TOKENS.azure}`,
                  boxShadow: `0 8px 24px ${TOKENS.azure}40`
                }}
              />
              <div 
                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs"
                style={{ 
                  background: TOKENS.green, 
                  color: "#04101F",
                  border: `2px solid ${TOKENS.panel}`
                }}
              >
                ✓
              </div>
            </div>
          </div>
          
          <div className="relative z-10 flex-1">
            <div className="text-xs uppercase mb-3 inline-block px-3 py-1 rounded-full" style={{ 
              background: `${TOKENS.azure}15`, 
              color: TOKENS.azure, 
              letterSpacing: "0.12em", 
              fontFamily: FONT_MONO 
            }}>
              Meet the founder
            </div>
            <h2 className="text-2xl font-bold mb-3" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
              Hi, I'm Jitendra Singh Malik.
            </h2>
            <p className="text-base mb-4" style={{ color: TOKENS.inkMuted }}>
              I'm a data engineer and database architect working in a fully Microsoft-embedded stack — SQL Server,
              Power BI, Azure, and Microsoft Fabric. I built FabricPrep to give you the realistic, exam-style
              practice I wish I'd had while preparing for my own certifications.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="text-xs px-3 py-1.5 rounded-full" style={{ background: `${TOKENS.azure}15`, color: TOKENS.azure }}>
                Microsoft Certified
              </span>
              <span className="text-xs px-3 py-1.5 rounded-full" style={{ background: `${TOKENS.green}15`, color: TOKENS.green }}>
                Data Engineer
              </span>
              <span className="text-xs px-3 py-1.5 rounded-full" style={{ background: `${TOKENS.amber}15`, color: TOKENS.amber }}>
                Fabric Expert
              </span>
            </div>
            <a
              href="https://www.linkedin.com/in/jitendra123/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-5 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              style={{ background: `${TOKENS.azure}20`, color: TOKENS.azure, border: `1px solid ${TOKENS.azure}40`, textDecoration: "none" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
