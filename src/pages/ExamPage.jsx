import { useState, useEffect } from "react";
import { useParams, Link, Navigate, useOutletContext, useSearchParams } from "react-router-dom";
import { Head as Helmet } from "vite-react-ssg";
import { RotateCcw, Clock, ChevronLeft, BookOpen, Lock } from "lucide-react";
import { useTheme, FONT_DISPLAY, FONT_MONO, getAttempted } from "../lib/theme.jsx";
import { GUEST_MOCK_CONFIG, STUDY_GUIDE_EXAMS, getMockConfig, buildBreadcrumbSchema } from "../lib/examCatalog.js";
import { QUESTION_BANK, EXAM_META, SLUG_TO_EXAM } from "../lib/questionBank/index.js";
import { Footer, MedallionMotif } from "../components/Shared.jsx";
import { Practice } from "../components/Practice.jsx";
import { MockExam } from "../components/MockExam.jsx";

function buildFaqs(code, meta, total) {
  return [
    { q: `How many questions are in the ${code} practice bank?`, a: `There are currently ${total} practice questions for ${code}, covering every domain in the official Microsoft exam skills outline.` },
    { q: `Is FabricPrep's ${code} practice free?`, a: `Yes — all questions and mock exams are free. A free account is required for untimed practice, bookmarks, and saved progress; mock exams remain available without signing in.` },
    { q: `Where do the ${code} questions come from?`, a: `Questions are written from official Microsoft Learn documentation and the published exam skills outline for ${code}, not guesswork.` },
    { q: `What's the difference between Practice mode and Mock exam mode?`, a: `Practice mode is untimed with instant explanations and domain filters, so you can study one topic at a time. Mock exam mode is a timed, scored simulation of exam-day conditions.` },
    { q: `How hard is the ${code} exam?`, a: `Difficulty depends on your hands-on experience with the technology. Working through the full question bank in both modes is a good way to find your weak spots before exam day.` },
  ];
}

export function ExamPage() {
  const { examSlug } = useParams();
  const { isAuthenticated } = useOutletContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const TOKENS = useTheme();
  const [mode, setMode] = useState(null); // null | "practice" | "mock"

  const code = SLUG_TO_EXAM[examSlug];
  const practiceDomain = searchParams.get("domain");
  const autoPractice = searchParams.get("mode") === "practice";
  const reviewWrongAnswers = searchParams.get("review") === "wrong";

  useEffect(() => {
    if (code && (autoPractice || reviewWrongAnswers) && isAuthenticated) {
      setMode("practice");
    }
  }, [code, autoPractice, reviewWrongAnswers, isAuthenticated]);

  if (!code) return <Navigate to="/" replace />;

  const data = QUESTION_BANK[code];
  const meta = EXAM_META[code];
  const total = data.questions.length;
  const attempted = getAttempted(code).length;
  const pct = total ? Math.min(100, Math.round((attempted / total) * 100)) : 0;
  const faqs = buildFaqs(code, meta, total);
  const mockConfig = isAuthenticated ? getMockConfig(code) : GUEST_MOCK_CONFIG;

  function clearPracticeParams() {
    setSearchParams({}, { replace: true });
  }

  function exitPractice() {
    setMode(null);
    clearPracticeParams();
  }

  if (mode === "practice") {
    return (
      <Practice
        exam={code}
        onExit={exitPractice}
        initialDomain={practiceDomain}
        reviewWrongAnswers={reviewWrongAnswers}
      />
    );
  }
  if (mode === "mock") return <MockExam exam={code} onExit={() => setMode(null)} />;

  return (
    <div className="min-h-full flex flex-col">
      <Helmet>
        <title>{meta.metaTitle}</title>
        <link rel="canonical" href={`https://fabricprep.com/${meta.slug}`} />
        <meta name="description" content={meta.metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://fabricprep.com/${meta.slug}`} />
        <meta property="og:title" content={meta.metaTitle} />
        <meta property="og:description" content={meta.metaDescription} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            name: meta.title,
            description: meta.metaDescription,
            provider: { "@type": "Organization", name: "FabricPrep", sameAs: "https://fabricprep.com/" },
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(
            buildBreadcrumbSchema([
              { name: "Home", path: "" },
              { name: code },
            ])
          )}
        </script>
      </Helmet>

      <div className="flex-1 px-6 py-8 max-w-2xl mx-auto w-full">
        <Link to="/" className="flex items-center gap-1 text-xs mb-6" style={{ color: TOKENS.inkMuted }}>
          <ChevronLeft size={14} /> All exams
        </Link>

        <div className="text-center mb-8 flex flex-col items-center">
          <div
            className="text-xs uppercase mb-4 px-3 py-1 rounded-full inline-block"
            style={{ color: TOKENS.azure, letterSpacing: "0.14em", border: `1px solid ${TOKENS.azure}40`, fontFamily: FONT_MONO }}
          >
            {code}
          </div>
          <MedallionMotif opacity={0.5} />
          <h1 className="text-2xl sm:text-3xl font-semibold mt-2" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
            {meta.title}
          </h1>
          <p className="mt-3 text-sm max-w-md" style={{ color: TOKENS.inkMuted }}>
            {total} free practice questions for the {data.label} certification, sourced from official Microsoft
            Learn documentation. Practice untimed or sit a scored mock exam.
          </p>
        </div>

        <div className="rounded-xl p-4 mb-6" style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}>
          <div className="flex justify-between text-xs mb-2" style={{ color: TOKENS.inkMuted }}>
            <span>Your progress</span>
            <span style={{ fontFamily: FONT_MONO }}>{attempted}/{total} attempted</span>
          </div>
          <div className="rounded-full overflow-hidden" style={{ height: 5, background: TOKENS.panelBorder }}>
            <div style={{ width: `${pct}%`, height: "100%", background: TOKENS.azure }} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          {/* Practice Mode - Locked for guests */}
          {isAuthenticated ? (
            <button
              onClick={() => setMode("practice")}
              className="rounded-xl p-4 text-left transition-transform hover:-translate-y-0.5"
              style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}
            >
              <div className="flex items-center gap-2 mb-1">
                <RotateCcw size={16} color={TOKENS.azure} />
                <span className="font-semibold text-sm" style={{ color: TOKENS.ink }}>Practice mode</span>
              </div>
              <p className="text-xs" style={{ color: TOKENS.inkMuted }}>Untimed, with domain filters and bookmarks.</p>
            </button>
          ) : (
            <Link
              to="/login"
              className="rounded-xl p-4 text-left relative overflow-hidden"
              style={{ background: `${TOKENS.panel}80`, border: `1px solid ${TOKENS.panelBorder}` }}
            >
              <div className="absolute inset-0 flex items-center justify-center" style={{ background: `${TOKENS.bg}60` }}>
                <div className="flex items-center gap-1 text-xs" style={{ color: TOKENS.inkMuted }}>
                  <Lock size={12} /> Sign in to unlock
                </div>
              </div>
              <div className="flex items-center gap-2 mb-1 opacity-40">
                <RotateCcw size={16} color={TOKENS.inkMuted} />
                <span className="font-semibold text-sm" style={{ color: TOKENS.inkMuted }}>Practice mode</span>
              </div>
              <p className="text-xs opacity-40" style={{ color: TOKENS.inkMuted }}>Untimed, with domain filters and bookmarks.</p>
            </Link>
          )}

          {/* Mock Exam - Always available */}
          <button
            onClick={() => setMode("mock")}
            className="rounded-xl p-4 text-left transition-transform hover:-translate-y-0.5"
            style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}
          >
            <div className="flex items-center gap-2 mb-1">
              <Clock size={16} color={TOKENS.amber} />
              <span className="font-semibold text-sm" style={{ color: TOKENS.ink }}>Mock exam</span>
            </div>
            <p className="text-xs" style={{ color: TOKENS.inkMuted }}>
              {mockConfig.totalQuestions} questions, {mockConfig.timeMinutes}-min timer.
            </p>
          </button>
        </div>

        {/* Study Guide Link - Public */}
        {STUDY_GUIDE_EXAMS.has(code) && (
          <Link
            to={`/study-guides/${meta.slug}`}
            className="flex items-center justify-center gap-2 rounded-xl p-3 mb-10 text-sm font-medium transition-transform hover:-translate-y-0.5"
            style={{ background: `${TOKENS.green}15`, border: `1px solid ${TOKENS.green}40`, color: TOKENS.green }}
          >
            <BookOpen size={16} />
            <span>Study Guide</span>
            <span style={{ color: TOKENS.inkMuted }}>— Comprehensive exam preparation materials</span>
          </Link>
        )}

        <h2 className="text-sm font-semibold mb-3" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
          Frequently asked questions
        </h2>
        <div className="flex flex-col gap-2">
          {faqs.map((f) => (
            <details key={f.q} className="rounded-xl p-4" style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}>
              <summary className="text-sm font-medium cursor-pointer" style={{ color: TOKENS.ink }}>{f.q}</summary>
              <p className="text-xs mt-2" style={{ color: TOKENS.inkMuted }}>{f.a}</p>
            </details>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
