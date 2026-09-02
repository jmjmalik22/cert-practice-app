import { Head as Helmet } from "vite-react-ssg";
import { Link } from "react-router-dom";
import { BookOpen, ChevronRight, Database, Radio, Sparkles } from "lucide-react";
import { useTheme, FONT_DISPLAY } from "../../lib/theme.jsx";
import { Footer } from "../../components/Shared.jsx";

const TOPICS = [
  {
    number: "01",
    title: "Dataflows, Pipelines, and Ingestion Choices",
    description: "Compare Dataflows Gen2, pipelines, and Copy Data for DP-700 and DP-600 scenarios.",
    path: "/study-guides/shared/dataflows-pipelines",
    icon: Database,
    available: true,
  },
  {
    number: "02",
    title: "Spark Notebooks and Delta",
    description: "Spark pools, DataFrames, schemas, partitioning, Spark SQL, and Delta tables.",
    icon: Sparkles,
    available: false,
  },
  {
    number: "03",
    title: "Eventhouse and KQL",
    description: "Real-time ingestion, KQL query patterns, materialized views, and stored functions.",
    icon: Radio,
    available: false,
  },
];

export function SharedStudyGuides() {
  const TOKENS = useTheme();

  return (
    <div className="min-h-full flex flex-col">
      <Helmet>
        <title>Shared Fabric Study Guides | DP-700 & DP-600 | FabricPrep</title>
        <link rel="canonical" href="https://fabricprep.com/study-guides/shared" />
        <meta name="description" content="Shared Microsoft Fabric study topics for DP-700 and DP-600, organized as a guided learning sequence." />
      </Helmet>

      <main className="flex-1 px-6 sm:px-10 py-8 max-w-3xl mx-auto w-full">
        <Link to="/study-guides" className="text-xs" style={{ color: TOKENS.inkMuted }}>
          ← All study guides
        </Link>
        <h1 className="text-2xl sm:text-3xl font-semibold mt-6" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
          Shared Fabric foundations
        </h1>
        <p className="mt-3 text-sm" style={{ color: TOKENS.inkMuted }}>
          Work through these common topics once, then apply them while preparing for DP-700 and DP-600.
        </p>

        <nav aria-label="Shared study topics" className="mt-8 space-y-3">
          {TOPICS.map(({ number, title, description, path, icon: Icon, available }) => {
            const content = (
              <div className="flex items-start gap-4 rounded-xl p-5" style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}`, opacity: available ? 1 : 0.7 }}>
                <span className="text-xs font-semibold pt-1" style={{ color: TOKENS.azure }}>{number}</span>
                <Icon size={20} color={TOKENS.azure} className="mt-0.5 flex-shrink-0" />
                <span className="flex-1">
                  <span className="block text-sm font-semibold" style={{ color: TOKENS.ink }}>{title}</span>
                  <span className="block text-xs mt-1" style={{ color: TOKENS.inkMuted }}>{description}</span>
                  {!available && <span className="block text-xs mt-3" style={{ color: TOKENS.amber }}>Coming next</span>}
                </span>
                {available && <ChevronRight size={16} color={TOKENS.inkMuted} className="mt-1" />}
              </div>
            );
            return available ? <Link key={title} to={path}>{content}</Link> : <div key={title}>{content}</div>;
          })}
        </nav>
      </main>
      <Footer />
    </div>
  );
}
