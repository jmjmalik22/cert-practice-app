import { useState, useEffect } from "react";
import { useParams, Link, useOutletContext, useSearchParams } from "react-router-dom";
import { Head as Helmet } from "vite-react-ssg";
import { RotateCcw, Clock, ChevronLeft, BookOpen, Lock, Shield } from "lucide-react";
import { useTheme, FONT_DISPLAY, FONT_MONO, getAttempted } from "../lib/theme.jsx";
import { MOCK_CONFIG, SHIELD_CONFIG, STUDY_GUIDE_EXAMS, isShieldAvailable, buildBreadcrumbSchema, getProductIcon } from "../lib/examCatalog.js";
import { QUESTION_BANK, EXAM_META, SLUG_TO_EXAM } from "../lib/questionBank/index.js";
import { Footer, MedallionMotif } from "../components/Shared.jsx";
import { Practice } from "../components/Practice.jsx";
import { MockExam } from "../components/MockExam.jsx";
import { ShieldExam } from "../components/ShieldExam.jsx";
import { NotFound } from "./NotFound.jsx";

function buildFaqs(code, meta, total, shieldAvailable) {
  return [
    { q: `How many questions are in the ${code} practice bank?`, a: `There are currently ${total} practice questions for ${code}, covering every domain in the official Microsoft exam skills outline.` },
    {
      q: `Is FabricPrep's ${code} practice free?`,
      a: shieldAvailable
        ? `Yes — all questions and exams are free. A free account is required for untimed practice, bookmarks, saved progress, and the Shield exam; the mock exam remains available without signing in.`
        : `Yes — all questions and exams are free. A free account is required for untimed practice, bookmarks, and saved progress; the mock exam remains available without signing in.`,
    },
    { q: `Where do the ${code} questions come from?`, a: `Questions are written from official Microsoft Learn documentation and the published exam skills outline for ${code}, not guesswork.` },
    {
      q: shieldAvailable
        ? `What's the difference between Practice, Mock and Shield exams?`
        : `What's the difference between Practice and Mock exams?`,
      a: shieldAvailable
        ? `Practice mode is untimed with instant explanations and domain filters, so you can study one topic at a time. The mock exam is a quick, untimed ${MOCK_CONFIG.totalQuestions}-question check with no feedback until you submit. The Shield exam is a timed ${SHIELD_CONFIG.totalQuestions}-question scored sitting — score ${SHIELD_CONFIG.passPercentage}% or more and you earn a shareable, verifiable shield.`
        : `Practice mode is untimed with instant explanations and domain filters, so you can study one topic at a time. The mock exam is a quick, untimed ${MOCK_CONFIG.totalQuestions}-question check with no feedback until you submit. ${code}'s bank isn't yet large enough to offer a full scored Shield sitting — that unlocks once it reaches ${SHIELD_CONFIG.totalQuestions} questions.`,
    },
    { q: `How hard is the ${code} exam?`, a: `Difficulty depends on your hands-on experience with the technology. Working through the full question bank in both modes is a good way to find your weak spots before exam day.` },
  ];
}

export function ExamPage() {
  const { examSlug } = useParams();
  const { isAuthenticated } = useOutletContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const TOKENS = useTheme();
  const [mode, setMode] = useState(null); // null | "practice" | "mock" | "shield"

  const code = SLUG_TO_EXAM[examSlug];
  const practiceDomain = searchParams.get("domain");
  const autoPractice = searchParams.get("mode") === "practice";
  const reviewWrongAnswers = searchParams.get("review") === "wrong";

  useEffect(() => {
    if (code && (autoPractice || reviewWrongAnswers) && isAuthenticated) {
      setMode("practice");
    }
  }, [code, autoPractice, reviewWrongAnswers, isAuthenticated]);

  // An unrecognized slug (typo, stale link, removed exam) should read as a
  // real 404, not silently redirect to the homepage as if nothing were wrong.
  if (!code) return <NotFound />;

  const data = QUESTION_BANK[code];
  const meta = EXAM_META[code];
  const total = data.questions.length;
  const attempted = getAttempted(code).length;
  const pct = total ? Math.min(100, Math.round((attempted / total) * 100)) : 0;
  const shieldAvailable = isShieldAvailable(code);
  const productIcon = getProductIcon(code);
  const faqs = buildFaqs(code, meta, total, shieldAvailable);

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
  if (mode === "mock") {
    return (
      <MockExam
        exam={code}
        onExit={() => setMode(null)}
        isAuthenticated={isAuthenticated}
        onStartPractice={() => setMode("practice")}
      />
    );
  }
  if (mode === "shield") return <ShieldExam exam={code} onExit={() => setMode(null)} />;

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

      {/* The exam header sits on the same tinted wash as the landing hero, so
          clicking through from the homepage is not a change of language. */}
      <div style={{ background: TOKENS.heroWash }}>
        <div className="px-6 pt-8 pb-11 max-w-3xl mx-auto w-full">
          <Link to="/" className="inline-flex items-center gap-1 text-xs mb-7" style={{ color: TOKENS.inkMuted }}>
            <ChevronLeft size={14} /> All exams
          </Link>

          <div className="text-center flex flex-col items-center">
            {productIcon ? (
              <img src={productIcon.src} alt="" width={44} height={44} className="mb-4" aria-hidden="true" />
            ) : (
              shieldAvailable && <MedallionMotif opacity={0.5} />
            )}
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
              {code} — {meta.title}
            </h1>
            <p className="mt-4 text-base max-w-lg" style={{ color: TOKENS.inkMuted }}>
              {shieldAvailable
                ? `${total} free practice questions, sourced from official Microsoft Learn documentation. Practice untimed, try a quick mock, or sit the scored Shield exam to earn a badge.`
                : `${total} free practice questions, sourced from official Microsoft Learn documentation. Practice untimed or try a quick mock.`}
            </p>
          </div>

          <div className="rounded-2xl p-5 mt-8" style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}>
            <div className="flex justify-between text-xs mb-2" style={{ color: TOKENS.inkMuted }}>
              <span>Your progress</span>
              <span style={{ fontFamily: FONT_MONO }}>{attempted}/{total} attempted</span>
            </div>
            <div className="rounded-full overflow-hidden" style={{ height: 5, background: TOKENS.panelBorder }}>
              <div style={{ width: `${pct}%`, height: "100%", background: TOKENS.azure }} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 px-6 pt-10 pb-8 max-w-3xl mx-auto w-full">

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          {/* Practice Mode - Locked for guests */}
          {isAuthenticated ? (
            <button
              onClick={() => setMode("practice")}
              className="rounded-2xl p-4 text-left transition-transform hover:-translate-y-0.5"
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
              className="rounded-2xl p-4 text-left block"
              style={{ background: `${TOKENS.panel}80`, border: `1px solid ${TOKENS.panelBorder}` }}
            >
              <div className="flex items-center gap-2 mb-1">
                <RotateCcw size={16} color={TOKENS.inkMuted} />
                <span className="font-semibold text-sm" style={{ color: TOKENS.inkMuted }}>Practice mode</span>
              </div>
              <p className="text-xs" style={{ color: TOKENS.inkMuted }}>Untimed, with domain filters and bookmarks.</p>
              {/* The lock sits in the card's own flow. It used to be a
                  centred overlay, which landed on top of the title. */}
              <span
                className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full mt-3"
                style={{ color: TOKENS.inkMuted, background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}
              >
                <Lock size={12} /> Sign in to unlock
              </span>
            </Link>
          )}

          {/* Mock Exam - Always available */}
          <button
            onClick={() => setMode("mock")}
            className="rounded-2xl p-4 text-left transition-transform hover:-translate-y-0.5"
            style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}
          >
            <div className="flex items-center gap-2 mb-1">
              <Clock size={16} color={TOKENS.amber} />
              <span className="font-semibold text-sm" style={{ color: TOKENS.ink }}>Mock exam</span>
            </div>
            <p className="text-xs" style={{ color: TOKENS.inkMuted }}>
              {MOCK_CONFIG.totalQuestions} questions, untimed. A quick check.
            </p>
          </button>
        </div>

        {/* Shield Exam - Scored sitting that mints a badge */}
        {shieldAvailable && (
          <div className="mb-4">
            {isAuthenticated ? (
              <button
                onClick={() => setMode("shield")}
                className="w-full rounded-2xl p-4 text-left transition-transform hover:-translate-y-0.5"
                style={{ background: `${TOKENS.amber}10`, border: `1px solid ${TOKENS.amber}40` }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Shield size={16} color={TOKENS.amber} />
                  <span className="font-semibold text-sm" style={{ color: TOKENS.ink }}>Shield exam</span>
                </div>
                <p className="text-xs" style={{ color: TOKENS.inkMuted }}>
                  {SHIELD_CONFIG.totalQuestions} questions, {SHIELD_CONFIG.timeMinutes} min. Score{" "}
                  {SHIELD_CONFIG.passPercentage}%+ to earn a shareable shield — 80%+ and 90%+ unlock higher tiers.
                </p>
              </button>
            ) : (
              <Link
                to="/login"
                className="block w-full rounded-2xl p-4 text-left"
                style={{ background: `${TOKENS.panel}80`, border: `1px solid ${TOKENS.panelBorder}` }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Shield size={16} color={TOKENS.inkMuted} />
                  <span className="font-semibold text-sm" style={{ color: TOKENS.inkMuted }}>Shield exam</span>
                </div>
                <p className="text-xs" style={{ color: TOKENS.inkMuted }}>
                  {SHIELD_CONFIG.totalQuestions} scored questions. Earn a shareable shield.
                </p>
                <span
                  className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full mt-3"
                  style={{ color: TOKENS.inkMuted, background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}
                >
                  <Lock size={12} /> Sign in to unlock
                </span>
              </Link>
            )}
          </div>
        )}

        {/* Study Guide Link - Public */}
        {STUDY_GUIDE_EXAMS.has(code) && (
          <Link
            to={`/study-guides/${meta.slug}`}
            className="flex items-center justify-center gap-2 rounded-2xl p-3 mb-10 text-sm font-medium transition-transform hover:-translate-y-0.5"
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
            <details key={f.q} className="rounded-2xl p-4" style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}>
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
