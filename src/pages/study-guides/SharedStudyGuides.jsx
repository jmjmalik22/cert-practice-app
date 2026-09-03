import { Head as Helmet } from "vite-react-ssg";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Database, Layers, Radio, Sparkles, Warehouse, Activity, Shield, ListChecks } from "lucide-react";
import { useTheme, FONT_DISPLAY } from "../../lib/theme.jsx";
import { Footer } from "../../components/Shared.jsx";

const LEARNING_PATH = [
  {
    number: "01",
    examArea: "Platform orientation",
    title: "Fabric and OneLake foundations",
    summary: "Start with the Fabric mental model: one SaaS analytics platform, OneLake as the shared data foundation, and workload items such as Lakehouse, Warehouse, Eventhouse, and semantic models.",
    learn: ["OneLake stores data once in open Delta-Parquet formats for Spark, SQL, Power BI, and real-time workloads.", "Workspaces organize collaboration, permissions, lineage, Git integration, and managed compute.", "Shortcuts link external or cross-workspace data without copying it into Fabric."],
    checkpoint: "You can separate the roles of a workspace, OneLake, Lakehouse, Warehouse, Eventhouse, and semantic model.",
    path: null,
    icon: Layers,
  },
  {
    number: "02",
    examArea: "Ingest and transform data",
    title: "Ingest data with Dataflows Gen2 and pipelines",
    summary: "Build the ingestion foundation from Dataflows Gen2, Power Query Online, pipelines, Copy Data, parameters, schedules, and metadata-driven processing.",
    learn: ["Dataflows Gen2 follow the Connect, Transform, Land workflow for visual ETL.", "The interface centers on the ribbon, queries pane, diagram view, data preview, and query settings.", "Pipelines orchestrate Copy Data, notebooks, stored procedures, metadata checks, parameters, and triggers."],
    checkpoint: "You can choose Dataflow, Copy Data, notebook, or pipeline from a scenario instead of memorizing one default tool.",
    path: "/study-guides/shared/dataflows-pipelines",
    icon: Database,
  },
  {
    number: "03",
    examArea: "Transform with PySpark and SQL",
    title: "Use Spark notebooks for engineering work",
    summary: "Learn how Spark pools, runtimes, environments, DataFrames, Spark SQL, and notebook visualizations support repeatable lakehouse transformations.",
    learn: ["Spark pools use a driver and executors to distribute large-scale processing.", "Explicit schemas are more reliable than inference for repeatable production loads.", "Temporary views support session SQL; managed tables persist data in the catalog."],
    checkpoint: "You can translate SQL ideas into Spark concepts such as where, groupBy, overwrite, partitionBy, temp views, and managed tables.",
    path: "/study-guides/shared/spark-notebooks-delta",
    icon: Sparkles,
  },
  {
    number: "04",
    examArea: "Streaming and real-time analytics",
    title: "Build real-time solutions with Eventhouse and KQL",
    summary: "Cover Eventstreams, direct ingestion, Eventhouse, KQL databases, querysets, materialized views, stored functions, dashboards, and Activator.",
    learn: ["Eventstreams transform and route data before storage; direct ingestion lands high-volume data quickly.", "KQL performs best when you filter by time early, project needed columns, and keep joins efficient.", "Dashboards visualize current state; Activator follows Connect, Monitor, Act when a condition should trigger action."],
    checkpoint: "You can choose Eventstream, Eventhouse, KQL, dashboard, or Activator from a real-time scenario.",
    path: "/study-guides/shared/eventhouse-kql",
    icon: Radio,
  },
  {
    number: "05",
    examArea: "Warehouse and dimensional modeling",
    title: "Implement a Fabric Data Warehouse",
    summary: "Study warehouse storage on OneLake, full transactional T-SQL, SQL analytics endpoint differences, fact and dimension design, keys, star schemas, and slowly changing dimensions.",
    learn: ["A Warehouse supports read-write T-SQL; a Lakehouse SQL analytics endpoint is read-only for lakehouse tables.", "Fact tables store measurements; dimensions provide descriptive context and surrogate-key lookups.", "Star schemas reduce reporting joins; slowly changing dimensions preserve the right amount of history."],
    checkpoint: "You can decide when a Warehouse is a better fit than a Lakehouse SQL endpoint or notebook-driven table.",
    path: "/study-guides/shared/warehouse-dimensional-modeling",
    icon: Warehouse,
  },
  {
    number: "06",
    examArea: "Monitor and optimize analytics",
    title: "Monitor, troubleshoot, and optimize",
    summary: "Tie the study guide back to run IDs, pipeline monitoring, Dataflow and notebook errors, Eventhouse and Eventstream issues, shortcut failures, and performance tuning.",
    learn: ["Use run details and status to diagnose failed pipelines, Dataflows, notebooks, Eventstreams, and warehouse queries.", "Optimize Lakehouse tables, Spark jobs, pipelines, warehouses, Eventstreams, Eventhouses, and query patterns.", "Configure alerts when failures or changing operational conditions require action."],
    checkpoint: "You can describe a troubleshooting sequence before jumping straight to a tool-specific fix.",
    path: "/study-guides/shared/monitoring-optimization",
    icon: Activity,
  },
  {
    number: "07",
    examArea: "Implement and manage analytics",
    title: "Secure, govern, and manage lifecycle",
    summary: "Finish with workspace settings, lifecycle management, Git, deployment pipelines, Fabric REST APIs, workspace and item permissions, row/column/object/file controls, masking, labels, endorsement, audit logs, and OneLake security.",
    learn: ["Use workspace roles and item permissions for collaboration boundaries.", "Use row-level, column-level, object-level, and file-level controls for finer-grained data access.", "Use Git integration and deployment pipelines to separate development, testing, and production."],
    checkpoint: "You can choose the narrowest security or lifecycle control that satisfies the scenario.",
    path: "/study-guides/shared/security-governance",
    icon: Shield,
  },
  {
    number: "08",
    examArea: "Exam-wide revision",
    title: "Final scenario drill",
    summary: "Close the loop with component selection, comparison tables, and final checklists for the concepts most likely to be confused in scenario questions.",
    learn: ["Compare Dataflow, pipeline, Copy Data, notebook, KQL, Lakehouse, Warehouse, Eventhouse, and Activator.", "Practice choosing full, incremental, streaming, dimensional, and medallion loading patterns.", "Review the high-value distinctions before switching into timed DP-700 practice questions."],
    checkpoint: "You can read a requirement and identify the Fabric component, loading pattern, and security boundary it implies.",
    path: "/study-guides/shared/lifecycle-orchestration",
    icon: ListChecks,
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
          In-Depth DP-700 Learning Path
        </h1>
        <p className="mt-3 text-sm" style={{ color: TOKENS.inkMuted }}>
          Work through these topics in order to move from Fabric foundations to ingestion, Spark, Delta, real-time analytics, warehousing, operations, and exam scenario practice.
        </p>

        <div className="mt-8 space-y-4">
          {LEARNING_PATH.map(({ number, examArea, title, summary, learn, checkpoint, path, icon: Icon }) => (
            <article key={title} className="rounded-2xl p-5 sm:p-6 transition-transform hover:-translate-y-0.5" style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}>
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center gap-2 flex-shrink-0">
                  <span className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: TOKENS.azure, color: TOKENS.bgDeep }}>{number}</span>
                  <Icon size={18} color={TOKENS.azure} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-medium mb-1" style={{ color: TOKENS.azure }}>{examArea}</div>
                  <h2 className="text-base sm:text-lg font-semibold" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>{title}</h2>
                  <p className="text-sm mt-2 leading-relaxed" style={{ color: TOKENS.inkMuted }}>{summary}</p>
                </div>
              </div>
              <ul className="grid gap-2 sm:grid-cols-3 mt-5">
                {learn.map((item) => <li key={item} className="flex items-start gap-2 text-xs leading-relaxed" style={{ color: TOKENS.inkMuted }}><CheckCircle2 size={14} color={TOKENS.azure} className="flex-shrink-0 mt-0.5" /><span>{item}</span></li>)}
              </ul>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mt-5 pt-4" style={{ borderTop: `1px solid ${TOKENS.panelBorder}` }}>
                <p className="text-xs leading-relaxed" style={{ color: TOKENS.inkMuted }}><span className="font-semibold" style={{ color: TOKENS.ink }}>Checkpoint:</span> {checkpoint}</p>
                {path && (
                  <Link to={path} className="inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-medium flex-shrink-0" style={{ background: `${TOKENS.azure}14`, color: TOKENS.azure, border: `1px solid ${TOKENS.azure}35` }}>
                    Open topic <ArrowRight size={14} />
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
