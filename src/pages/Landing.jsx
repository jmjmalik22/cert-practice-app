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
        <title>Microsoft Fabric & Azure Certification Practice Questions | FabricPrep</title>
        <meta
          name="description"
          content={`${totalQuestions}+ free practice questions across ${examCount} Microsoft certifications — DP-700, DP-600, AZ-900, DP-900, and more — sourced from official Microsoft Learn docs.`}
        />
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
            name: "FabricPrep",
            url: "https://fabricprep.com/",
            description: "Free Microsoft certification practice exams for DP-700, DP-600, AZ-900, DP-900, and Azure certifications.",
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
          {totalQuestions}+ realistic practice questions and timed mock exams across {examCount} Microsoft certifications.
        </p>
        <div className="mt-6 flex items-center gap-2 text-xs relative z-10">
          <div className="flex items-center gap-1 px-3 py-1 rounded-full" style={{ background: `${TOKENS.green}15`, color: TOKENS.green }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: TOKENS.green }} /> Free forever
          </div>
          <div className="flex items-center gap-1 px-3 py-1 rounded-full" style={{ background: `${TOKENS.amber}15`, color: TOKENS.amber }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: TOKENS.amber }} /> No sign-up required
          </div>
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
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold"
                style={{ 
                  background: `linear-gradient(135deg, ${TOKENS.azure}, ${TOKENS.green})`, 
                  color: "#04101F",
                  fontFamily: FONT_DISPLAY,
                  boxShadow: `0 8px 24px ${TOKENS.azure}40`
                }}
              >
                JM
              </div>
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
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
