import { useState, useEffect } from "react";
import { Head as Helmet } from "vite-react-ssg";
import { Link, useOutletContext } from "react-router-dom";
import { ArrowRight, BookOpen, Clock, FileText, Check, BarChart3, Users } from "lucide-react";
import { useTheme, FONT_DISPLAY, FONT_MONO, FONT_SCRIPT, getAttempted } from "../lib/theme.jsx";
import { getExamStats } from "../lib/progress.jsx";
import {
  COMING_SOON_EXAMS,
  EXAM_CODES,
  EXAM_META,
  EXAM_CATEGORIES,
  CATEGORY_ORDER,
  getProductIcon,
} from "../lib/examCatalog.js";
import { Footer } from "../components/Shared.jsx";
import { BadgeShield } from "../components/BadgeShield.jsx";
import { NewsletterSignup } from "../components/NewsletterSignup.jsx";
import { getEarnedBadges } from "../lib/badges.js";

const TIER_RANK = { elite: 0, mastery: 1, proven: 2 };

// Handwritten marginalia (the "Small steps, big opportunities" notes in the
// design). Purely decorative, so it is hidden from assistive tech, and it only
// appears once the viewport is wide enough to hold it in the margin rather
// than on top of the content. Nothing on the page is said only in script.
function ScriptAccent({ children, className = "", underlineWidth = 92, show = "hidden 2xl:block", style = {} }) {
  const TOKENS = useTheme();
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none select-none absolute ${show} ${className}`}
      style={{ fontFamily: FONT_SCRIPT, color: TOKENS.script, fontSize: 19, lineHeight: 1.3, ...style }}
    >
      {children}
      <svg width={underlineWidth} height="10" viewBox="0 0 92 10" fill="none" className="block mt-1">
        <path d="M2 6.5C18 2.5 44 1.5 90 4.5" stroke={TOKENS.script} strokeWidth="1.6" strokeLinecap="round" opacity=".8" />
      </svg>
    </span>
  );
}

// Nudges a returning visitor toward a badge they have already earned
// (computed from local exam results, so it works before/without sign-in) so
// they notice it is ready to view and share.
function EarnedBadgeBanner() {
  const TOKENS = useTheme();
  const [badge, setBadge] = useState(null);

  useEffect(() => {
    const earned = getEarnedBadges();
    if (earned.length === 0) return;
    const best = [...earned].sort((a, b) => TIER_RANK[a.tier] - TIER_RANK[b.tier])[0];
    setBadge(best);
  }, []);

  if (!badge) return null;
  const examMeta = EXAM_META[badge.examCode];

  return (
    <div className="px-6 sm:px-10 max-w-6xl mx-auto w-full mb-14">
      <Link
        to="/dashboard"
        className="flex items-center gap-4 rounded-2xl p-4 transition-transform hover:-translate-y-0.5"
        style={{
          background: `linear-gradient(135deg, ${TOKENS.panel}, ${TOKENS.azure}12)`,
          border: `1px solid ${TOKENS.azure}40`,
        }}
      >
        <BadgeShield tier={badge.tier} examCode={badge.examCode} examLabel={examMeta?.label} score={badge.score} size={64} />
        <div className="flex-1">
          <p className="text-xs uppercase tracking-widest mb-1" style={{ color: TOKENS.azure, fontFamily: FONT_MONO }}>
            Badge earned
          </p>
          <p className="text-sm font-semibold" style={{ color: TOKENS.ink }}>
            Your {badge.tierLabel} shield for {badge.examCode} is ready to share.
          </p>
        </div>
        <ArrowRight size={18} style={{ color: TOKENS.azure }} className="flex-shrink-0" />
      </Link>
    </div>
  );
}

// Auto-rotating testimonial slider: one quote visible at a time, advances on
// a timer, pauses on hover, and respects prefers-reduced-motion.
function TestimonialCarousel({ testimonials }) {
  const TOKENS = useTheme();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = testimonials.length;

  useEffect(() => {
    if (paused) return undefined;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, 5000);
    return () => clearInterval(timer);
  }, [paused, count]);

  return (
    <div className="mb-4" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="overflow-hidden rounded-2xl" style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}>
        <div className="flex transition-transform duration-700 ease-out" style={{ transform: `translateX(-${index * 100}%)` }}>
          {testimonials.map((t) => (
            <div key={t.name} className="w-full flex-shrink-0 p-6 sm:p-8 flex flex-col items-center text-center">
              <p className="text-base sm:text-lg mb-5 max-w-lg" style={{ color: TOKENS.ink }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0"
                  style={{ background: `${TOKENS[t.color]}20`, color: TOKENS[t.color], fontFamily: FONT_MONO }}
                >
                  {t.initials}
                </div>
                <div className="text-left">
                  <div className="text-xs font-medium" style={{ color: TOKENS.ink }}>{t.name}</div>
                  <div className="text-xs" style={{ color: TOKENS.inkMuted }}>{t.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 mt-4">
        {testimonials.map((t, i) => (
          <button
            key={t.name}
            aria-label={`Show testimonial from ${t.name}`}
            onClick={() => setIndex(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === index ? 18 : 6,
              height: 6,
              background: i === index ? TOKENS.azure : TOKENS.panelBorder,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// The product shot in the hero: one real question, answered, with the
// explanation a learner actually gets. Shows the product instead of
// describing it.
function SampleQuestionCard() {
  const TOKENS = useTheme();
  const options = [
    { letter: "A", label: "CSV", correct: false },
    { letter: "B", label: "Parquet", correct: false },
    { letter: "C", label: "Delta", correct: true },
    { letter: "D", label: "Avro", correct: false },
  ];

  return (
    <div
      className="text-left rounded-2xl p-5 sm:p-6 w-full"
      style={{
        background: TOKENS.panel,
        border: `1px solid ${TOKENS.panelBorder}`,
        boxShadow: `0 24px 60px ${TOKENS.ink}14`,
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-medium" style={{ color: TOKENS.ink, fontFamily: FONT_MONO }}>
          DP-700 &middot; Sample question
        </span>
        <span className="text-xs" style={{ color: TOKENS.inkMuted, fontFamily: FONT_MONO }}>
          Sample
        </span>
      </div>

      <p className="text-sm sm:text-base mb-5" style={{ color: TOKENS.ink }}>
        Which file format is the default storage format for tables in a Fabric Lakehouse?
      </p>

      <div className="flex flex-col gap-2">
        {options.map((opt) => (
          <div
            key={opt.letter}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
            style={{
              background: opt.correct ? `${TOKENS.green}12` : TOKENS.panel,
              border: `1px solid ${opt.correct ? TOKENS.green : TOKENS.panelBorder}`,
            }}
          >
            <span
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0"
              style={{
                background: opt.correct ? TOKENS.green : `${TOKENS.inkMuted}14`,
                color: opt.correct ? TOKENS.panel : TOKENS.inkMuted,
                fontFamily: FONT_MONO,
              }}
            >
              {opt.letter}
            </span>
            <span className="text-sm flex-1" style={{ color: opt.correct ? TOKENS.ink : TOKENS.inkMuted }}>
              {opt.label}
            </span>
            {opt.correct && (
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: TOKENS.green, color: TOKENS.panel }}
              >
                <Check size={12} strokeWidth={3} />
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-xl p-4" style={{ background: `${TOKENS.green}0E`, border: `1px solid ${TOKENS.green}33` }}>
        <div className="flex items-center gap-2 mb-1.5">
          <span
            className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: TOKENS.green, color: TOKENS.panel }}
          >
            <Check size={10} strokeWidth={3} />
          </span>
          <span className="text-sm font-semibold" style={{ color: TOKENS.green }}>Correct!</span>
        </div>
        <p className="text-xs leading-relaxed" style={{ color: TOKENS.inkMuted }}>
          Fabric Lakehouse tables are stored as Delta tables, giving you ACID transactions and time travel.
        </p>
        <Link to="/dp-700" className="inline-flex items-center gap-1 text-xs font-medium mt-2" style={{ color: TOKENS.azure }}>
          Learn more <ArrowRight size={12} />
        </Link>
      </div>
    </div>
  );
}

// One exam in the "Pick your exam" grid. Progress only appears once there is
// some: a first-time visitor sees the clean card from the design, a returning
// learner keeps the "where was I" signal the old grid gave them.
function ExamCard({ code }) {
  const TOKENS = useTheme();
  const meta = EXAM_META[code];
  const icon = getProductIcon(code);
  const attempted = getAttempted(code).length;
  const total = meta.questionCount;
  const pct = total ? Math.min(100, Math.round((attempted / total) * 100)) : 0;
  const stats = getExamStats(code, total);
  const hasAttempts = stats.totalAttempts > 0;

  return (
    <Link
      to={`/${meta.slug}`}
      className="rounded-2xl p-5 flex flex-col transition-all duration-300 hover:-translate-y-1 group"
      style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}
    >
      {icon ? (
        <img src={icon.src} alt="" width={34} height={34} className="mb-4" aria-hidden="true" />
      ) : (
        <div
          className="w-[34px] h-[34px] rounded-lg mb-4 flex items-center justify-center text-xs font-bold"
          style={{ background: `${TOKENS.azure}15`, color: TOKENS.azure, fontFamily: FONT_MONO }}
          aria-hidden="true"
        >
          {code.split("-")[1]}
        </div>
      )}

      <div className="font-bold text-base" style={{ color: TOKENS.ink }}>{code}</div>
      <div className="text-xs mt-1 mb-4 flex-1" style={{ color: TOKENS.inkMuted }}>{meta.label}</div>

      {hasAttempts && (
        <div className="mb-3">
          <div className="relative rounded-full overflow-hidden" style={{ height: 4, background: TOKENS.panelBorder }}>
            <div
              className="absolute top-0 left-0 h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${TOKENS.azure}, ${TOKENS.green})` }}
            />
          </div>
          <div className="text-xs mt-1.5" style={{ color: TOKENS.inkMuted, fontFamily: FONT_MONO }}>
            {attempted}/{total} &middot; {stats.accuracy}% accuracy
          </div>
        </div>
      )}

      <span
        className="inline-flex items-center gap-1.5 text-sm font-medium transition-transform duration-300 group-hover:translate-x-0.5"
        style={{ color: TOKENS.azure }}
      >
        {hasAttempts ? "Continue" : "Start"} <ArrowRight size={14} />
      </span>
    </Link>
  );
}

export function Landing() {
  const { isAuthenticated } = useOutletContext();
  const TOKENS = useTheme();
  const totalQuestions = EXAM_CODES.reduce((sum, code) => sum + EXAM_META[code].questionCount, 0);
  const examCount = EXAM_CODES.length;
  const examCodeList = `${EXAM_CODES.slice(0, -1).join(", ")}, and ${EXAM_CODES[EXAM_CODES.length - 1]}`;

  const [categoryFilter, setCategoryFilter] = useState("All");
  const filterOptions = ["All", ...CATEGORY_ORDER];
  const visibleExamCodes =
    categoryFilter === "All" ? EXAM_CODES : EXAM_CODES.filter((code) => EXAM_CATEGORIES[code] === categoryFilter);

  // The three things the product actually does, as the design frames them.
  const pillars = [
    { icon: FileText, tone: "azure", title: "Practice", body: "Tackle realistic questions with clear explanations." },
    { icon: Clock, tone: "green", title: "Mock Exam", body: "Simulate the real exam experience with timed tests." },
    { icon: BookOpen, tone: "violet", title: "Study Guides", body: "Review key concepts from Microsoft Learn, all in one place." },
  ];

  // Real comments from FabricPrep's LinkedIn launch post, lightly trimmed for length.
  const testimonials = [
    {
      initials: "EO",
      name: "Eghosa Osayame",
      title: "Azure & Fabric Data Engineer, 8x Microsoft Certified",
      quote: "I really wish I had this while I was preparing for my AZ-104 and DP-900. I'm sure fabricprep.com will be super helpful to lots of people.",
      color: "azure",
    },
    {
      initials: "SR",
      name: "Soumadip Roy",
      title: "Data & Analytics Consultant, 21+ Yrs IT Leader",
      quote: "This is awesome, giving back to the data community.",
      color: "green",
    },
    {
      initials: "IL",
      name: "Imraan Thabang Leeuw",
      title: "Aspiring Data Engineer, Azure Data Certified",
      quote: "Thank you very much. I will definitely use this for my DP-700 prep!",
      color: "amber",
    },
    {
      initials: "AB",
      name: "Anirban Bhattacharjee",
      title: "Lead BI Data Engineer",
      quote: "Good one — will share with others as well!",
      color: "azure",
    },
    {
      initials: "ZC",
      name: "Zach C.",
      title: "Data Engineer, Snowflake · dbt · Azure",
      quote: "If you had a “buy me a coffee” button I'd do it. Very cool.",
      color: "green",
    },
    {
      initials: "AY",
      name: "Abdelhak Yahiaoui",
      title: "Budget & Control Sr. Analyst",
      quote: "Thank you so much! Hope the number of questions will increase in the future.",
      color: "amber",
    },
  ];

  return (
    <div className="min-h-full flex flex-col">
      <Helmet>
        <title>Fabric Certification & Azure Certification Practice | FabricPrep</title>
        <link rel="canonical" href="https://fabricprep.com/" />
        <meta
          name="description"
          content={`${totalQuestions}+ free FabricPrep certification practice questions for ${examCodeList}. Prepare for Microsoft Fabric and Azure exams with a scored Shield exam sourced from official Microsoft Learn documentation.`}
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
            name: "FabricPrep",
            url: "https://fabricprep.com/",
            description: `Free FabricPrep practice exams for Microsoft certifications including ${examCodeList}.`,
            alternateName: ["FabricPrep", "fabricprep"],
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SiteNavigationElement",
            name: ["FabricPrep Home", "Microsoft Fabric Study Guides", "About FabricPrep"],
            url: [
              "https://fabricprep.com/",
              "https://fabricprep.com/study-guides",
              "https://fabricprep.com/about",
            ],
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "FabricPrep",
            alternateName: ["fabricprep"],
            url: "https://fabricprep.com/",
            logo: "https://fabricprep.com/icon-512.png",
            description: "Free Microsoft certification practice platform for Fabric and Azure exams, built and maintained by Jitendra Singh Malik.",
            founder: { "@type": "Person", name: "Jitendra Singh Malik" },
            sameAs: ["https://www.linkedin.com/in/jitendra123/"],
          })}
        </script>
      </Helmet>

      {/* ---------- Hero: copy left, product shot right ---------- */}
      <div
        className="relative overflow-hidden"
        style={{ background: `linear-gradient(180deg, ${TOKENS.heroWash} 0%, ${TOKENS.panel} 100%)` }}
      >
        {/* Anchored to the full-width hero, not the centred column, so the
            script sits in the page margin beside the card the way the design
            has it — which only fits from 2xl up. */}
        <ScriptAccent className="right-8 top-32 text-right" underlineWidth={78} style={{ maxWidth: 130 }}>
          Small steps,
          <br />
          big opportunities
        </ScriptAccent>
        <ScriptAccent className="right-10 bottom-24 text-right" underlineWidth={86} style={{ maxWidth: 130 }}>
          Build your next
          <br />
          achievement.
        </ScriptAccent>

        <div className="px-6 sm:px-10 pt-12 pb-14 max-w-6xl mx-auto w-full relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-10 items-center">
            <div>
              {/* The shield tiers, as the design has them. A plain line of
                  text with an aria-label, so it cannot be mistaken for
                  breadcrumb navigation by a screen reader. */}
              <p
                className="flex items-center gap-2.5 mb-5 text-base"
                style={{ color: TOKENS.inkMuted }}
                aria-label="Shield tiers you can earn: Bronze, then Silver, then Gold"
              >
                <span>Bronze</span>
                <ArrowRight size={15} aria-hidden="true" />
                <span>Silver</span>
                <ArrowRight size={15} aria-hidden="true" />
                <span>Gold</span>
              </p>

              <h1
                className="text-4xl sm:text-[2.7rem] lg:text-[2.95rem] font-bold leading-[1.07] tracking-tight"
                style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}
              >
                Pass your Microsoft certification exam with confidence.
              </h1>

              <p className="mt-5 text-base sm:text-lg max-w-lg" style={{ color: TOKENS.inkMuted }}>
                Realistic practice questions, clear explanations, and timed mock exams — built from Microsoft Learn.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#choose-exam"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-transform hover:-translate-y-0.5"
                  style={{ background: TOKENS.azure, color: TOKENS.panel }}
                >
                  Start Practicing Free <ArrowRight size={16} />
                </a>
                <Link
                  to="/study-guides"
                  className="inline-flex items-center gap-2 text-sm font-semibold"
                  style={{ color: TOKENS.azure }}
                >
                  Browse Study Guides <ArrowRight size={16} />
                </Link>
              </div>

              <div className="mt-9 flex flex-wrap gap-3">
                {/* "Free in beta" gets a filled tick the way the design has
                    it; the other two carry a plain outline icon. */}
                <div
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium"
                  style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}`, color: TOKENS.ink }}
                >
                  <span
                    className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: TOKENS.green, color: TOKENS.panel }}
                  >
                    <Check size={10} strokeWidth={3} />
                  </span>
                  Free in beta
                </div>
                {[
                  { icon: BarChart3, tone: TOKENS.azure, label: `${totalQuestions}+ questions` },
                  { icon: Users, tone: TOKENS.azure, label: `${examCount} exams` },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium"
                    style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}`, color: TOKENS.ink }}
                  >
                    <stat.icon size={15} style={{ color: stat.tone }} />
                    {stat.label}
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:pl-4">
              <SampleQuestionCard />
            </div>
          </div>
        </div>
      </div>

      <EarnedBadgeBanner />

      {/* ---------- Pick your exam (white) ---------- */}
      <div style={{ background: TOKENS.panel }}>
      <div id="choose-exam" className="px-6 sm:px-10 pt-14 pb-16 max-w-6xl mx-auto w-full">
        <p className="text-xs uppercase mb-3" style={{ color: TOKENS.inkMuted, letterSpacing: "0.16em", fontFamily: FONT_MONO }}>
          Microsoft certification practice
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
          Pick your exam
        </h2>
        <p className="mt-3 mb-7 text-base max-w-xl" style={{ color: TOKENS.inkMuted }}>
          Choose an exam below to start practicing with realistic questions and explanations.
        </p>

        <div className="flex flex-wrap gap-2 mb-7" role="group" aria-label="Filter exams by category">
          {filterOptions.map((option) => {
            const active = option === categoryFilter;
            return (
              <button
                key={option}
                type="button"
                onClick={() => setCategoryFilter(option)}
                aria-pressed={active}
                className="text-xs font-medium px-3.5 py-2 rounded-full transition-colors"
                style={{
                  background: active ? TOKENS.azure : TOKENS.panel,
                  color: active ? TOKENS.panel : TOKENS.inkMuted,
                  border: `1px solid ${active ? TOKENS.azure : TOKENS.panelBorder}`,
                }}
              >
                {option}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {visibleExamCodes.map((code) => (
            <ExamCard key={code} code={code} />
          ))}
        </div>
      </div>
      </div>

      {/* ---------- What the product does: a full-width tinted band. The
           band itself is what separates this from the white exam grid, so it
           needs no card border of its own. ---------- */}
      <div style={{ background: TOKENS.bg }}>
        <div className="px-6 sm:px-10 py-12 max-w-6xl mx-auto w-full grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6">
          {pillars.map((p, i) => (
            <div
              key={p.title}
              className={`flex flex-col sm:flex-row gap-4 ${i === 0 ? "" : "sm:pl-6 sm:border-l"}`}
              style={i === 0 ? {} : { borderColor: TOKENS.panelBorder }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${TOKENS[p.tone]}15` }}
              >
                <p.icon size={20} style={{ color: TOKENS[p.tone] }} />
              </div>
              <div>
                <div className="font-bold text-lg mb-1" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
                  {p.title}
                </div>
                <p className="text-sm" style={{ color: TOKENS.inkMuted }}>{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- Everything below the band sits back on white ---------- */}
      <div style={{ background: TOKENS.panel }}>
      <div className="px-6 sm:px-10 pt-16 pb-14 max-w-6xl mx-auto w-full">

        {/* ---------- Mid-page call to action ---------- */}
        <div
          className="relative overflow-hidden rounded-2xl px-6 sm:px-10 py-12 mb-16 text-center"
          style={{ background: TOKENS.ctaBand }}
        >
          {/* These sit inside the band, clear of the centred copy, so they
              can appear a breakpoint earlier than the hero pair. */}
          <ScriptAccent show="hidden lg:block" className="left-8 top-1/2 -translate-y-1/2 text-left" underlineWidth={70} style={{ maxWidth: 110 }}>
            Learn. Practice.
            <br />
            Pass. Grow.
          </ScriptAccent>
          <ScriptAccent show="hidden lg:block" className="right-8 top-1/2 -translate-y-1/2 text-right" underlineWidth={80} style={{ maxWidth: 125 }}>
            Same knowledge,
            <br />
            a brighter you.
          </ScriptAccent>

          <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
            Ready to test yourself?
          </h2>
          <p className="mt-3 text-sm sm:text-base max-w-lg mx-auto" style={{ color: TOKENS.inkMuted }}>
            {totalQuestions}+ questions across {examCount} Microsoft certifications — free while FabricPrep is in beta,
            no card required.
          </p>
          <Link
            to={isAuthenticated ? "/dashboard" : "/login"}
            className="mt-7 inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm transition-transform hover:-translate-y-0.5"
            style={{ background: TOKENS.azure, color: TOKENS.panel }}
          >
            {isAuthenticated ? "Go to your dashboard" : "Start Free"} <ArrowRight size={16} />
          </Link>
        </div>

        {/* ---------- Coming soon ---------- */}
        <h2 className="text-xs uppercase mb-3" style={{ color: TOKENS.inkMuted, letterSpacing: "0.14em", fontFamily: FONT_MONO }}>
          More exams coming soon
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16" aria-label="Exams coming soon">
          {COMING_SOON_EXAMS.map(({ code, label }) => (
            <div
              key={code}
              aria-disabled="true"
              className="rounded-2xl p-5"
              style={{ background: `${TOKENS.panel}90`, border: `1px dashed ${TOKENS.panelBorder}` }}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="font-bold text-base" style={{ color: TOKENS.inkMuted }}>{code}</div>
                  <div className="text-xs mt-0.5" style={{ color: TOKENS.inkMuted }}>{label}</div>
                </div>
                <span
                  className="text-xs font-medium px-3 py-1.5 rounded-full flex-shrink-0"
                  style={{ background: `${TOKENS.amber}15`, color: TOKENS.amber, border: `1px solid ${TOKENS.amber}35` }}
                >
                  Coming soon
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ---------- Why not a brain dump ---------- */}
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
                "A scored Shield exam that mirrors real exam-day pacing",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2 text-sm" style={{ color: TOKENS.ink }}>
                  <span style={{ color: TOKENS.green, flexShrink: 0 }}>✓</span> {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ---------- Testimonials ---------- */}
        <h2 className="text-xs uppercase mb-3 text-center" style={{ color: TOKENS.inkMuted, letterSpacing: "0.14em", fontFamily: FONT_MONO }}>
          What people are saying
        </h2>
        <TestimonialCarousel testimonials={testimonials} />
        <p className="text-xs text-center mt-4 mb-16" style={{ color: TOKENS.inkMuted }}>
          Real comments from FabricPrep&apos;s{" "}
          <a href="https://www.linkedin.com/in/jitendra123/" target="_blank" rel="noopener noreferrer" style={{ color: TOKENS.azure }}>
            LinkedIn launch post
          </a>.
        </p>

        {/* ---------- Founder ---------- */}
        <div
          className="rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row gap-6 items-start mb-16"
          style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}
        >
          <div className="flex-shrink-0">
            <div className="relative">
              <img
                src="/CoverPic_Face.jpg"
                alt="Jitendra Singh Malik"
                className="w-40 h-40 rounded-2xl object-cover"
                style={{ border: `3px solid ${TOKENS.azure}` }}
              />
              <div
                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs"
                style={{ background: TOKENS.green, color: TOKENS.panel, border: `2px solid ${TOKENS.panel}` }}
              >
                ✓
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div
              className="text-xs uppercase mb-3 inline-block px-3 py-1 rounded-full"
              style={{ background: `${TOKENS.azure}15`, color: TOKENS.azure, letterSpacing: "0.12em", fontFamily: FONT_MONO }}
            >
              Meet the founder
            </div>
            <h2 className="text-2xl font-bold mb-3" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
              Hi, I&apos;m Jitendra Singh Malik.
            </h2>
            <p className="text-base mb-4" style={{ color: TOKENS.inkMuted }}>
              I&apos;m a data engineer and database architect working in a fully Microsoft-embedded stack — SQL Server,
              Power BI, Azure, and Microsoft Fabric. I built FabricPrep to give you the realistic, exam-style
              practice I wish I&apos;d had while preparing for my own certifications.
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

        <NewsletterSignup />
      </div>
      </div>

      <Footer />
    </div>
  );
}
