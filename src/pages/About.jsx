import { Head as Helmet } from "vite-react-ssg";
import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, BookOpen, CheckCircle2, Clock3, Database, ExternalLink, FileText, Layers3, Mail, ShieldCheck, Smartphone } from "lucide-react";
import { useTheme, FONT_DISPLAY, FONT_MONO } from "../lib/theme.jsx";
import { EXAM_CODES, EXAM_META } from "../lib/examCatalog.js";
import { Footer } from "../components/Shared.jsx";

const FEATURES = [
  { icon: FileText, title: "Practice with purpose", body: "Use focused question sets built around the knowledge areas you are expected to apply on Microsoft certification exams." },
  { icon: CheckCircle2, title: "Turn mistakes into notes", body: "Each answer is followed by a practical explanation so an incorrect response becomes a useful study moment." },
  { icon: Clock3, title: "Rehearse your pacing", body: "Switch from relaxed learning to timed sessions when you want to practise making decisions under exam conditions." },
  { icon: Layers3, title: "Follow the exam domains", body: "Move through the major subject areas instead of relying on a random collection of disconnected questions." },
  { icon: Smartphone, title: "Keep your momentum", body: "A responsive layout makes it easy to complete a short session from a laptop, tablet, or phone." },
  { icon: ShieldCheck, title: "Designed for responsible prep", body: "FabricPrep focuses on learning the skills and concepts rather than reproducing confidential exam material." },
];

const EXAMS = [
  ["DP-700", "Fabric Data Engineer Associate"],
  ["DP-600", "Fabric Analytics Engineer Associate"],
  ["AZ-900", "Azure Fundamentals"],
  ["AZ-104", "Azure Administrator Associate"],
  ["AI-901", "Azure AI Fundamentals"],
  ["DP-900", "Azure Data Fundamentals"],
  ["DP-800", "SQL AI Developer Associate"],
  ["PL-300", "Power BI Data Analyst Associate"],
];

export function About() {
  const TOKENS = useTheme();
  const questionCount = EXAM_CODES.reduce((sum, code) => sum + EXAM_META[code].questionCount, 0);

  return (
    <div className="min-h-full flex flex-col">
      <Helmet>
        <title>About FabricPrep | Microsoft Certification Practice</title>
        <link rel="canonical" href="https://fabricprep.com/about" />
        <meta name="description" content="Learn how FabricPrep helps you prepare for Microsoft Fabric, Azure, Power BI, and data certification exams with realistic practice questions and study guides." />
      </Helmet>

      <main className="flex-1">
        <section
          className="px-6 sm:px-10 pt-16 pb-20 text-center relative overflow-hidden"
          style={{ background: `radial-gradient(circle at 50% -25%, ${TOKENS.azure}20 0%, transparent 48%), linear-gradient(180deg, ${TOKENS.bgDeep}70, transparent)` }}
        >
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full opacity-10 pointer-events-none" style={{ background: TOKENS.azure, filter: "blur(90px)" }} />
          <p className="text-xs uppercase tracking-widest mb-5 relative z-10" style={{ color: TOKENS.azure, fontFamily: FONT_MONO }}>The idea behind FabricPrep</p>
          <h1 className="text-4xl sm:text-5xl font-bold max-w-3xl mx-auto relative z-10" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
            A clearer way to prepare for your next Microsoft certification.
          </h1>
          <p className="text-base sm:text-lg max-w-2xl mx-auto mt-5 relative z-10" style={{ color: TOKENS.inkMuted }}>
            FabricPrep is a focused practice space for people learning Microsoft Fabric, Azure, Power BI, and data technologies. It helps you replace passive reading with deliberate practice.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-8 relative z-10">
            <Link to="/" className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium" style={{ background: TOKENS.azure, color: TOKENS.bgDeep }}>
              Start Fabric Prep practice <ArrowRight size={16} />
            </Link>
            <Link to="/study-guides" className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium" style={{ border: `1px solid ${TOKENS.panelBorder}`, color: TOKENS.ink, background: `${TOKENS.panel}80` }}>
              Browse study guides
            </Link>
          </div>
        </section>

        <section className="px-6 sm:px-10 max-w-4xl mx-auto w-full pb-20">
          <div className="rounded-2xl p-7 sm:p-10" style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}>
            <p className="text-xs uppercase tracking-widest mb-3" style={{ color: TOKENS.azure, fontFamily: FONT_MONO }}>Why it exists</p>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>Less scrolling. More useful practice.</h2>
            <p className="text-sm sm:text-base leading-7" style={{ color: TOKENS.inkMuted }}>
              Certification study can become difficult to organise: documentation is spread across many pages, while generic question banks often give little context. FabricPrep brings short practice sessions, explanations, and progress signals into one place.
            </p>
            <p className="text-sm sm:text-base leading-7 mt-4" style={{ color: TOKENS.inkMuted }}>
              The aim is not to predict the exact questions you will see. It is to help you build durable understanding, notice the topics that need attention, and arrive at the exam with a more reliable study routine.
            </p>
          </div>
        </section>

        <section className="px-6 sm:px-10 max-w-5xl mx-auto w-full pb-20">
          <div className="text-center mb-8">
            <p className="text-xs uppercase tracking-widest mb-3" style={{ color: TOKENS.azure, fontFamily: FONT_MONO }}>Platform features</p>
            <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>Everything you need to prepare.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-2xl p-6" style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: `${TOKENS.azure}15` }}><Icon size={20} color={TOKENS.azure} /></div>
                <h3 className="font-bold mb-2" style={{ color: TOKENS.ink }}>{title}</h3>
                <p className="text-sm leading-6" style={{ color: TOKENS.inkMuted }}>{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 sm:px-10 max-w-5xl mx-auto w-full pb-20">
          <div className="rounded-2xl p-7 sm:p-10 flex flex-col sm:flex-row gap-8 items-start" style={{ background: `linear-gradient(135deg, ${TOKENS.panel}, ${TOKENS.azure}10)`, border: `1px solid ${TOKENS.azure}40` }}>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: `${TOKENS.azure}18`, color: TOKENS.azure }}><Database size={28} /></div>
            <div>
                <p className="text-xs uppercase tracking-widest mb-3" style={{ color: TOKENS.azure, fontFamily: FONT_MONO }}>What you can do here</p>
                <h2 className="text-2xl font-bold mb-3" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>Build a study rhythm that works for you.</h2>
                <p className="text-sm leading-6 mb-5" style={{ color: TOKENS.inkMuted }}>Choose an exam, practise a manageable set, review the reasoning, and return later to measure what has improved. The current library contains {questionCount}+ questions across {EXAM_CODES.length} exam tracks.</p>
              <div className="flex flex-wrap gap-3">
                <div className="rounded-xl px-4 py-3" style={{ background: `${TOKENS.bg}80`, border: `1px solid ${TOKENS.panelBorder}` }}><div className="text-xl font-bold" style={{ color: TOKENS.azure }}>{questionCount}+</div><div className="text-xs" style={{ color: TOKENS.inkMuted }}>Practice questions</div></div>
                <div className="rounded-xl px-4 py-3" style={{ background: `${TOKENS.bg}80`, border: `1px solid ${TOKENS.panelBorder}` }}><div className="text-xl font-bold" style={{ color: TOKENS.green }}>{EXAM_CODES.length}</div><div className="text-xs" style={{ color: TOKENS.inkMuted }}>Exam tracks</div></div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 sm:px-10 max-w-4xl mx-auto w-full pb-20">
          <div className="text-center mb-8"><p className="text-xs uppercase tracking-widest mb-3" style={{ color: TOKENS.azure, fontFamily: FONT_MONO }}>Current library</p><h2 className="text-2xl sm:text-3xl font-bold" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>Choose the track that matches your goal.</h2></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {EXAMS.map(([code, label]) => <Link key={code} to={`/${code.toLowerCase()}`} className="flex items-center gap-4 rounded-xl px-4 py-4 transition-transform hover:-translate-y-0.5" style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}><span className="text-xs font-semibold px-2 py-1 rounded-md" style={{ color: TOKENS.azure, background: `${TOKENS.azure}15`, fontFamily: FONT_MONO }}>{code}</span><span className="text-sm" style={{ color: TOKENS.ink }}>{label}</span><ArrowRight size={15} className="ml-auto" color={TOKENS.inkMuted} /></Link>)}
          </div>
        </section>

        <section className="px-6 sm:px-10 max-w-4xl mx-auto w-full pb-20">
          <div className="text-center rounded-2xl p-8 sm:p-12" style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}>
            <BarChart3 size={30} color={TOKENS.azure} className="mx-auto mb-4" />
            <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>Start with one useful session.</h2>
            <p className="text-sm max-w-xl mx-auto mb-6" style={{ color: TOKENS.inkMuted }}>You do not need a perfect study plan to begin. Pick an exam, answer a few questions, and use what you learn to decide what to study next.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium" style={{ background: TOKENS.azure, color: TOKENS.bgDeep }}>Start Fabric Prep practice <ArrowRight size={15} /></Link>
              <a href="mailto:support@fabricprep.com" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium" style={{ border: `1px solid ${TOKENS.panelBorder}`, color: TOKENS.ink }}><Mail size={15} /> Contact us</a>
              <a href="https://www.linkedin.com/in/jitendra123/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium" style={{ border: `1px solid ${TOKENS.panelBorder}`, color: TOKENS.inkMuted }}><ExternalLink size={15} /> LinkedIn</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
