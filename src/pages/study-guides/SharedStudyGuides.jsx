import { Head as Helmet } from "vite-react-ssg";
import { Link } from "react-router-dom";
import { ChevronRight, Database, Radio, Sparkles, Warehouse, Activity, Shield, GitBranch } from "lucide-react";
import { useTheme, FONT_DISPLAY } from "../../lib/theme.jsx";
import { Footer } from "../../components/Shared.jsx";

const TOPICS = [
  {
    number: "01",
    title: "Ingest and Transform Data",
    description: "Batch and streaming ingestion, Dataflows Gen2, pipelines, shortcuts, Spark, SQL, and KQL transformations.",
    path: "/study-guides/shared/dataflows-pipelines",
    icon: Database,
    available: true,
  },
  {
    number: "02",
    title: "Lakehouse, Spark, and Delta",
    description: "Spark pools, DataFrames, schemas, partitioning, Spark SQL, Delta tables, and medallion architecture.",
    path: "/study-guides/shared/spark-notebooks-delta",
    icon: Sparkles,
    available: true,
  },
  {
    number: "03",
    title: "Streaming Data and Real-Time Intelligence",
    description: "Eventstreams, Eventhouse, KQL query patterns, materialized views, stored functions, and Activator.",
    path: "/study-guides/shared/eventhouse-kql",
    icon: Radio,
    available: true,
  },
  {
    number: "04",
    title: "Warehouse and Dimensional Modelling",
    description: "Warehouse T-SQL, star schemas, loading strategies, analytical functions, and slowly changing dimensions.",
    path: "/study-guides/shared/warehouse-dimensional-modeling",
    icon: Warehouse,
    available: true,
  },
  {
    number: "05",
    title: "Monitor and Optimize an Analytics Solution",
    description: "Monitor Fabric items, resolve ingestion and transformation errors, and optimize Lakehouse, Spark, SQL, and real-time workloads.",
    path: "/study-guides/shared/monitoring-optimization",
    icon: Activity,
    available: true,
  },
  {
    number: "06",
    title: "Manage Security and Governance",
    description: "Workspace and item access, row, column, object, and file controls, masking, labels, OneLake security, and auditing.",
    path: "/study-guides/shared/security-governance",
    icon: Shield,
    available: true,
  },
  {
    number: "07",
    title: "Manage and Implement an Analytics Solution",
    description: "Workspace settings, Git, database projects, deployment pipelines, orchestration, security, governance, and exam scenarios.",
    path: "/study-guides/shared/lifecycle-orchestration",
    icon: GitBranch,
    available: true,
  },
];

export function SharedStudyGuides() {
  const TOKENS = useTheme();

  return (
    <div className="min-h-full flex flex-col">
      <Helmet>
        <title>In-Depth Fabric Learning Path | DP-700 & DP-600 | FabricPrep</title>
        <link rel="canonical" href="https://fabricprep.com/study-guides/shared" />
        <meta name="description" content="A step-by-step Microsoft Fabric learning path for DP-700 and DP-600, covering ingestion, Spark, Delta, Eventhouse, and KQL." />
      </Helmet>

      <main className="flex-1 px-6 sm:px-10 py-8 max-w-3xl mx-auto w-full">
        <Link to="/study-guides" className="text-xs" style={{ color: TOKENS.inkMuted }}>
          ← All study guides
        </Link>
        <h1 className="text-2xl sm:text-3xl font-semibold mt-6" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
          In-Depth Fabric Learning Path
        </h1>
        <p className="mt-3 text-sm" style={{ color: TOKENS.inkMuted }}>
          Follow the topics in order to build your Microsoft Fabric knowledge from ingestion fundamentals to advanced real-time analytics for DP-700 and DP-600.
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
