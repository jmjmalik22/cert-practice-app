import { Head as Helmet } from "vite-react-ssg";
import { Link } from "react-router-dom";
import { BookOpen, ChevronLeft, Database, GitBranch, Layers, Workflow } from "lucide-react";
import { useTheme, FONT_DISPLAY, FONT_MONO } from "../../lib/theme.jsx";
import { Footer } from "../../components/Shared.jsx";

const TOPICS = [
  {
    icon: Workflow,
    title: "Dataflows Gen2",
    body: "Use Power Query Online to connect, clean, transform, and land data in supported Fabric destinations.",
    examNote: "DP-700: understand when low-code transformation and reusable ETL logic are appropriate.",
  },
  {
    icon: GitBranch,
    title: "Pipelines",
    body: "Use pipelines to orchestrate activities, schedule runs, pass parameters, and monitor ingestion workflows.",
    examNote: "DP-700 and DP-600: distinguish transformation work from orchestration and sequencing.",
  },
  {
    icon: Database,
    title: "Copy Data",
    body: "Use Copy Data when the primary requirement is moving data as-is between a source and destination.",
    examNote: "DP-700: compare Copy Data with Dataflows Gen2 and notebooks based on transformation needs.",
  },
  {
    icon: Layers,
    title: "Choosing the right tool",
    body: "Dataflows transform data, pipelines coordinate work, and notebooks or SQL handle code-heavy transformations.",
    examNote: "Both exams test architecture decisions, not just definitions.",
  },
];

export function IngestionFoundations() {
  const TOKENS = useTheme();

  return (
    <div className="min-h-full flex flex-col">
      <Helmet>
        <title>Dataflows and Pipelines | DP-700 & DP-600 | FabricPrep</title>
        <link rel="canonical" href="https://fabricprep.com/study-guides/shared/dataflows-pipelines" />
        <meta
          name="description"
          content="Study Dataflows Gen2, Fabric pipelines, Copy Data, and ingestion tool selection for DP-700 and DP-600."
        />
      </Helmet>

      <main className="flex-1 px-6 sm:px-10 py-8 max-w-3xl mx-auto w-full">
        <Link to="/study-guides" className="flex items-center gap-1 text-xs mb-6" style={{ color: TOKENS.inkMuted }}>
          <ChevronLeft size={14} /> All study guides
        </Link>

        <div
          className="text-xs uppercase mb-3 px-3 py-1 rounded-full inline-block"
          style={{ color: TOKENS.azure, letterSpacing: "0.14em", border: `1px solid ${TOKENS.azure}40`, fontFamily: FONT_MONO }}
        >
          DP-700 · DP-600 shared topic
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
          Dataflows, Pipelines, and Ingestion Choices
        </h1>
        <p className="mt-3 text-sm" style={{ color: TOKENS.inkMuted }}>
          A practical guide to choosing between low-code transformations, orchestration, and direct data movement in Microsoft Fabric.
        </p>

        <div className="rounded-xl p-5 mt-8" style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}>
          <div className="flex items-center gap-2 mb-3">
            <BookOpen size={18} color={TOKENS.azure} />
            <h2 className="text-base font-semibold" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
              The core distinction
            </h2>
          </div>
          <p className="text-sm" style={{ color: TOKENS.inkMuted }}>
            Think of a Dataflow Gen2 as the worker that transforms data and a pipeline as the manager that coordinates the whole process. Copy Data is the direct transport option when the data should move with little or no transformation.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mt-6">
          {TOPICS.map(({ icon: Icon, title, body, examNote }) => (
            <article key={title} className="rounded-xl p-5" style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}>
              <Icon size={20} color={TOKENS.azure} className="mb-4" />
              <h2 className="text-base font-semibold mb-2" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>{title}</h2>
              <p className="text-sm mb-4" style={{ color: TOKENS.inkMuted }}>{body}</p>
              <p className="text-xs" style={{ color: TOKENS.azure }}>{examNote}</p>
            </article>
          ))}
        </div>

        <section className="mt-8" aria-labelledby="tool-comparison-heading">
          <h2 id="tool-comparison-heading" className="text-lg font-semibold mb-3" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
            Dataflows Gen2 versus pipelines
          </h2>
          <div className="overflow-x-auto rounded-xl" style={{ border: `1px solid ${TOKENS.panelBorder}` }}>
            <table className="w-full min-w-[640px] text-sm text-left" style={{ background: TOKENS.panel }}>
              <caption className="sr-only">Comparison of Dataflows Gen2 and Fabric pipelines</caption>
              <thead>
                <tr style={{ background: `${TOKENS.azure}12`, color: TOKENS.ink }}>
                  <th scope="col" className="px-4 py-3 font-semibold">Capability</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Dataflows Gen2</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Data pipeline</th>
                </tr>
              </thead>
              <tbody style={{ color: TOKENS.inkMuted }}>
                {[
                  ["Primary role", "Transform and clean data", "Orchestrate and schedule work"],
                  ["Interface", "Power Query Online", "Pipeline canvas"],
                  ["Typical logic", "Joins, filters, pivots, and shaping", "Dependencies, loops, parameters, and triggers"],
                  ["Good fit", "Reusable low-code ETL", "Multi-step ingestion workflows"],
                ].map(([capability, dataflow, pipeline]) => (
                  <tr key={capability} style={{ borderTop: `1px solid ${TOKENS.panelBorder}` }}>
                    <th scope="row" className="px-4 py-3 font-medium" style={{ color: TOKENS.ink }}>{capability}</th>
                    <td className="px-4 py-3">{dataflow}</td>
                    <td className="px-4 py-3">{pipeline}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-8" aria-labelledby="decision-table-heading">
          <h2 id="decision-table-heading" className="text-lg font-semibold mb-3" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
            Copy Data versus Dataflows Gen2
          </h2>
          <div className="overflow-x-auto rounded-xl" style={{ border: `1px solid ${TOKENS.panelBorder}` }}>
            <table className="w-full min-w-[600px] text-sm text-left" style={{ background: TOKENS.panel }}>
              <caption className="sr-only">When to choose Copy Data or Dataflows Gen2</caption>
              <thead>
                <tr style={{ background: `${TOKENS.green}12`, color: TOKENS.ink }}>
                  <th scope="col" className="px-4 py-3 font-semibold">Choose Copy Data when…</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Choose Dataflows Gen2 when…</th>
                </tr>
              </thead>
              <tbody style={{ color: TOKENS.inkMuted }}>
                {[
                  ["The source data should move as-is.", "The data needs cleaning or filtering during ingestion."],
                  ["Transformation will happen later in a notebook or SQL activity.", "You want a visual Power Query workflow."],
                  ["A high-throughput direct movement is the priority.", "You need reusable transformations across destinations."],
                ].map(([copyData, dataflow]) => (
                  <tr key={copyData} style={{ borderTop: `1px solid ${TOKENS.panelBorder}` }}>
                    <td className="px-4 py-3">{copyData}</td>
                    <td className="px-4 py-3">{dataflow}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="rounded-xl p-5 mt-6" style={{ background: `${TOKENS.amber}12`, border: `1px solid ${TOKENS.amber}40` }}>
          <h2 className="text-base font-semibold mb-2" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>Exam decision checklist</h2>
          <ul className="text-sm space-y-2" style={{ color: TOKENS.inkMuted }}>
            <li>• Choose Dataflows Gen2 when visual, reusable transformations are the main requirement.</li>
            <li>• Choose a pipeline when scheduling, dependencies, loops, parameters, or monitoring are central.</li>
            <li>• Choose Copy Data when moving data as-is is more important than transforming it during ingestion.</li>
            <li>• Choose a notebook or SQL activity when the transformation requires code or advanced logic.</li>
          </ul>
        </div>

        <div className="flex flex-wrap gap-3 mt-8">
          <Link to="/dp-700" className="rounded-full px-4 py-2 text-sm font-medium" style={{ background: TOKENS.azure, color: TOKENS.bgDeep }}>
            Practice DP-700
          </Link>
          <Link to="/dp-600" className="rounded-full px-4 py-2 text-sm font-medium" style={{ border: `1px solid ${TOKENS.panelBorder}`, color: TOKENS.ink }}>
            Practice DP-600
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
