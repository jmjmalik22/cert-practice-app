import { Head as Helmet } from "vite-react-ssg";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, BookOpen, Database, FileCode2, Layers, Sparkles } from "lucide-react";
import { useTheme, FONT_DISPLAY, FONT_MONO } from "../../lib/theme.jsx";
import { Footer } from "../../components/Shared.jsx";

const ROWS = [
  ["Spark pool", "Compute cluster that runs the driver and executor processes", "Choose capacity and autoscale settings for workload size"],
  ["DataFrame", "Distributed tabular structure for loading and transforming data", "Use select, filter, groupBy, and write operations"],
  ["Temporary view", "Session-scoped SQL name created from a DataFrame", "Useful for combining Python or PySpark with Spark SQL"],
  ["Delta table", "Persistent table format with transactions and version history", "Use for reliable Lakehouse tables and time travel"],
];

export function SparkDeltaFoundations() {
  const TOKENS = useTheme();

  return (
    <div className="min-h-full flex flex-col">
      <Helmet>
        <title>Spark Notebooks and Delta | DP-700 & DP-600 | FabricPrep</title>
        <link rel="canonical" href="https://fabricprep.com/study-guides/shared/spark-notebooks-delta" />
        <meta name="description" content="Learn Spark pools, DataFrames, Spark SQL, partitioning, and Delta tables for Microsoft Fabric DP-700 and DP-600." />
      </Helmet>
      <main className="flex-1 px-6 sm:px-10 py-8 max-w-3xl mx-auto w-full">
        <Link to="/study-guides/shared" className="flex items-center gap-1 text-xs mb-6" style={{ color: TOKENS.inkMuted }}>
          <ArrowLeft size={14} /> In-Depth Fabric Learning Path
        </Link>
        <div className="text-xs uppercase mb-3 px-3 py-1 rounded-full inline-block" style={{ color: TOKENS.azure, letterSpacing: "0.14em", border: `1px solid ${TOKENS.azure}40`, fontFamily: FONT_MONO }}>
          Topic 02 · DP-700 · DP-600
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
          Spark Notebooks and Delta Tables
        </h1>
        <p className="mt-3 text-sm" style={{ color: TOKENS.inkMuted }}>
          Build from Spark compute and DataFrames to persistent, queryable Delta tables in a Fabric Lakehouse.
        </p>

        <div className="grid sm:grid-cols-3 gap-3 mt-8">
          {[
            [Sparkles, "Compute", "Spark pools run distributed work."],
            [FileCode2, "Transform", "DataFrames and Spark SQL shape data."],
            [Layers, "Persist", "Delta tables provide reliable storage."],
          ].map(([Icon, title, body]) => (
            <div key={title} className="rounded-xl p-4" style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}>
              <Icon size={19} color={TOKENS.azure} className="mb-3" />
              <h2 className="text-sm font-semibold" style={{ color: TOKENS.ink }}>{title}</h2>
              <p className="text-xs mt-1" style={{ color: TOKENS.inkMuted }}>{body}</p>
            </div>
          ))}
        </div>

        <section className="mt-8" aria-labelledby="spark-model-heading">
          <h2 id="spark-model-heading" className="text-lg font-semibold mb-3" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>The Spark-to-Delta mental model</h2>
          <p className="text-sm" style={{ color: TOKENS.inkMuted }}>
            A Spark notebook uses distributed compute to read and transform data. A DataFrame represents the data while it is being processed. When the result must be reused by other Fabric workloads, write it as a persistent Delta table rather than leaving it as a session-only view.
          </p>
        </section>

        <div className="overflow-x-auto rounded-xl mt-6" style={{ border: `1px solid ${TOKENS.panelBorder}` }}>
          <table className="w-full min-w-[680px] text-sm text-left" style={{ background: TOKENS.panel }}>
            <caption className="sr-only">Spark and Delta concepts in Fabric</caption>
            <thead>
              <tr style={{ background: `${TOKENS.azure}12`, color: TOKENS.ink }}>
                <th scope="col" className="px-4 py-3">Concept</th>
                <th scope="col" className="px-4 py-3">What it is</th>
                <th scope="col" className="px-4 py-3">Exam decision</th>
              </tr>
            </thead>
            <tbody style={{ color: TOKENS.inkMuted }}>
              {ROWS.map(([concept, meaning, decision]) => (
                <tr key={concept} style={{ borderTop: `1px solid ${TOKENS.panelBorder}` }}>
                  <th scope="row" className="px-4 py-3 font-medium" style={{ color: TOKENS.ink }}>{concept}</th>
                  <td className="px-4 py-3">{meaning}</td>
                  <td className="px-4 py-3">{decision}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-xl p-5 mt-6" style={{ background: `${TOKENS.amber}12`, border: `1px solid ${TOKENS.amber}40` }}>
          <h2 className="text-base font-semibold mb-2" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>Exam checklist</h2>
          <ul className="text-sm space-y-2" style={{ color: TOKENS.inkMuted }}>
            <li>• Use explicit schemas when stable types matter more than automatic inference.</li>
            <li>• Partition by columns that are commonly filtered, while avoiding excessive small partitions.</li>
            <li>• Use temporary views for session-only SQL and Delta tables for persistent Lakehouse data.</li>
            <li>• Remember that Parquet is a file format, while Delta adds transaction and table-version management.</li>
          </ul>
        </div>

        <div className="flex items-center justify-between gap-3 mt-8 pt-6" style={{ borderTop: `1px solid ${TOKENS.panelBorder}` }}>
          <Link to="/study-guides/shared/dataflows-pipelines" className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm" style={{ border: `1px solid ${TOKENS.panelBorder}`, color: TOKENS.ink }}>
            <ArrowLeft size={14} /> Previous topic
          </Link>
          <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm" style={{ background: TOKENS.panelBorder, color: TOKENS.inkMuted }}>
            Next topic: Eventhouse and KQL coming soon <ArrowRight size={14} />
          </span>
        </div>
      </main>
      <Footer />
    </div>
  );
}
