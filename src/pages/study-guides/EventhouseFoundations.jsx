import { Head as Helmet } from "vite-react-ssg";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Activity, Database, Gauge, Radio } from "lucide-react";
import { useTheme, FONT_DISPLAY, FONT_MONO } from "../../lib/theme.jsx";
import { Footer } from "../../components/Shared.jsx";

const TOPICS = [
  {
    icon: Radio,
    title: "Eventstreams: route data as it arrives",
    body: "Use Eventstreams to capture events from sources such as Event Hubs, IoT Hub, Kafka, or Fabric events. Filter, project, aggregate, join, and window events before sending them to an Eventhouse, Lakehouse, Activator, or another destination.",
    decision: "Choose Eventstreams when data needs transformation or routing while it is in motion.",
  },
  {
    icon: Database,
    title: "Eventhouse and KQL databases",
    body: "An Eventhouse contains KQL databases designed for append-heavy, time-series and operational workloads. Data is queried with Kusto Query Language (KQL), and the same data can feed dashboards, Power BI, and automated actions.",
    decision: "Choose an Eventhouse for high-volume event data that is queried by time, entity, or operational state.",
  },
  {
    icon: Gauge,
    title: "Write efficient KQL",
    body: "Apply restrictive where filters early, especially time filters. Use project to return only the columns needed, put the smaller input on the left side of a join, and use limit while exploring large results.",
    decision: "Reduce the amount of data scanned before expensive joins, projections, or aggregations.",
  },
  {
    icon: Activity,
    title: "Dashboards and Activator",
    body: "Real-Time Dashboards display refreshed KQL query results. Activator follows a Connect, Monitor, Act pattern: it watches properties of real-world objects and triggers actions when a rule condition is met.",
    decision: "Use Activator when a condition should cause an action, not merely appear in a report.",
  },
];

export function EventhouseFoundations() {
  const TOKENS = useTheme();

  return (
    <div className="min-h-full flex flex-col">
      <Helmet>
        <title>Eventhouse and KQL | DP-700 & DP-600 | FabricPrep</title>
        <link rel="canonical" href="https://fabricprep.com/study-guides/shared/eventhouse-kql" />
        <meta name="description" content="Study Eventstreams, Eventhouse, KQL optimization, Real-Time Dashboards, and Activator for Microsoft Fabric DP-700 and DP-600." />
      </Helmet>

      <main className="flex-1 px-6 sm:px-10 py-8 max-w-3xl mx-auto w-full">
        <Link to="/study-guides/shared" className="flex items-center gap-1 text-xs mb-6" style={{ color: TOKENS.inkMuted }}>
          <ArrowLeft size={14} /> In-Depth Fabric Learning Path
        </Link>
        <div className="text-xs uppercase mb-3 px-3 py-1 rounded-full inline-block" style={{ color: TOKENS.azure, letterSpacing: "0.14em", border: `1px solid ${TOKENS.azure}40`, fontFamily: FONT_MONO }}>
          Topic 03 · DP-700 · DP-600
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
          Eventhouse, KQL, and Real-Time Intelligence
        </h1>
        <p className="mt-3 text-sm" style={{ color: TOKENS.inkMuted }}>
          Learn how Fabric receives streaming events, stores them for fast operational analysis, and turns conditions in live data into actions.
        </p>

        <div className="rounded-xl p-5 mt-8" style={{ background: `${TOKENS.azure}12`, border: `1px solid ${TOKENS.azure}35` }}>
          <h2 className="text-base font-semibold mb-2" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>The real-time mental model</h2>
          <p className="text-sm" style={{ color: TOKENS.inkMuted }}>
            Eventstreams move and shape events, Eventhouse stores them, KQL queries them, dashboards show the current state, and Activator responds when a rule is satisfied.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mt-6">
          {TOPICS.map(({ icon: Icon, title, body, decision }) => (
            <article key={title} className="rounded-xl p-5" style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}>
              <Icon size={20} color={TOKENS.azure} className="mb-4" />
              <h2 className="text-base font-semibold mb-2" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>{title}</h2>
              <p className="text-sm mb-4" style={{ color: TOKENS.inkMuted }}>{body}</p>
              <p className="text-xs" style={{ color: TOKENS.azure }}>{decision}</p>
            </article>
          ))}
        </div>

        <section className="mt-8" aria-labelledby="real-time-comparison-heading">
          <h2 id="real-time-comparison-heading" className="text-lg font-semibold mb-3" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>Which component should you choose?</h2>
          <div className="overflow-x-auto rounded-xl" style={{ border: `1px solid ${TOKENS.panelBorder}` }}>
            <table className="w-full min-w-[650px] text-sm text-left" style={{ background: TOKENS.panel }}>
              <caption className="sr-only">Comparison of Fabric real-time intelligence components</caption>
              <thead><tr style={{ background: `${TOKENS.azure}12`, color: TOKENS.ink }}><th scope="col" className="px-4 py-3">Requirement</th><th scope="col" className="px-4 py-3">Best fit</th></tr></thead>
              <tbody style={{ color: TOKENS.inkMuted }}>
                {[
                  ["Transform or route events before storage", "Eventstream"],
                  ["Store and query high-volume time-series data", "Eventhouse with a KQL database"],
                  ["Create reusable query logic", "Stored KQL function"],
                  ["Precompute recurring aggregations", "Materialized view"],
                  ["Trigger a notification or workflow from a condition", "Activator"],
                ].map(([requirement, fit]) => <tr key={requirement} style={{ borderTop: `1px solid ${TOKENS.panelBorder}` }}><th scope="row" className="px-4 py-3 font-medium" style={{ color: TOKENS.ink }}>{requirement}</th><td className="px-4 py-3">{fit}</td></tr>)}
              </tbody>
            </table>
          </div>
        </section>

        <div className="rounded-xl p-5 mt-6" style={{ background: `${TOKENS.amber}12`, border: `1px solid ${TOKENS.amber}40` }}>
          <h2 className="text-base font-semibold mb-2" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>Exam checklist</h2>
          <ul className="text-sm space-y-2" style={{ color: TOKENS.inkMuted }}>
            <li>• Filter by time early and project only needed columns to reduce query cost.</li>
            <li>• Use a materialized view for a recurring aggregation over a large, changing dataset.</li>
            <li>• Use a stored function when the same KQL logic must be reused or parameterized.</li>
            <li>• Use a window in Eventstream or KQL when the business rule depends on a time interval.</li>
          </ul>
        </div>

        <div className="flex items-center justify-between gap-3 mt-8 pt-6" style={{ borderTop: `1px solid ${TOKENS.panelBorder}` }}>
          <Link to="/study-guides/shared/spark-notebooks-delta" className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm" style={{ border: `1px solid ${TOKENS.panelBorder}`, color: TOKENS.ink }}><ArrowLeft size={14} /> Previous topic</Link>
          <Link to="/study-guides/shared/warehouse-dimensional-modeling" className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm" style={{ background: TOKENS.azure, color: TOKENS.bgDeep }}>Next topic <ArrowRight size={14} /></Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
