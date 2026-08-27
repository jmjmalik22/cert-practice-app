import { Head as Helmet } from "vite-react-ssg";
import { useParams, Link, Navigate, useOutletContext } from "react-router-dom";
import { ChevronLeft, ExternalLink, CheckCircle2, Database, Activity, Shield } from "lucide-react";
import { useTheme, FONT_DISPLAY, FONT_MONO } from "../lib/theme.jsx";
import { EXAM_META, SLUG_TO_EXAM, QUESTION_BANK } from "../lib/questionBank.jsx";
import { Footer } from "../components/Shared.jsx";

// Content grounded in Microsoft's official study guides (learn.microsoft.com/credentials/certifications/resources/study-guides).
// Kept generic where a resource type applies to any exam, exam-specific where it doesn't.
const GUIDES = {
  "DP-700": {
    prereq: "No strict prerequisites, but the exam assumes hands-on exposure to Microsoft Fabric — navigating the UI, working with workspaces and permissions, and understanding OneLake. If you're new to Fabric, Microsoft's DP-900 (Azure Data Fundamentals) now covers Fabric basics and is a good on-ramp first.",
    background: [
      "Microsoft Fabric fundamentals — Lakehouse, Warehouse, Eventhouse, and how workloads fit together",
      "Batch ingestion patterns and file formats like Parquet and Delta",
      "Basic SQL (joins, aggregations) and awareness of Spark/PySpark",
      "Power BI awareness — semantic models, Import vs DirectQuery vs Direct Lake",
    ],
    officialGuideUrl: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/dp-700",
    examPageUrl: "https://learn.microsoft.com/en-us/credentials/certifications/exams/dp-700",
    docsUrl: "https://learn.microsoft.com/en-us/fabric/data-engineering/data-engineering-overview",
  },
  "DP-600": {
    prereq: "No strict prerequisites, but the exam assumes practical experience building semantic models and reports. Comfort with Power BI, DAX basics, and Microsoft Fabric's analytics workloads will make this much easier.",
    background: [
      "Star schema modeling — facts, dimensions, and relationships",
      "DAX fundamentals — measures, calculated columns, filter context",
      "Power BI semantic models and storage modes (Import, DirectQuery, Direct Lake)",
      "Basic T-SQL and KQL for querying prepared data",
    ],
    officialGuideUrl: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/dp-600",
    examPageUrl: "https://learn.microsoft.com/en-us/credentials/certifications/exams/dp-600",
    docsUrl: "https://learn.microsoft.com/en-us/fabric/get-started/microsoft-fabric-overview",
  },
  "AZ-900": {
    prereq: "None — AZ-900 is designed as an entry point with no assumed technical background. Basic familiarity with computing concepts (networking, storage, applications) helps but isn't required.",
    background: [
      "General cloud computing concepts — IaaS, PaaS, SaaS",
      "Basic understanding of what a cloud provider does versus on-premises infrastructure",
      "No coding or hands-on Azure experience required",
    ],
    officialGuideUrl: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-900",
    examPageUrl: "https://learn.microsoft.com/en-us/credentials/certifications/exams/az-900",
    docsUrl: "https://learn.microsoft.com/en-us/azure/",
  },
  "DP-900": {
    prereq: "None — DP-900 is an entry-level exam. General familiarity with core data concepts (what a database is, structured vs unstructured data) is helpful but not assumed.",
    background: [
      "Core data concepts — structured, semi-structured, and unstructured data",
      "Relational vs non-relational database basics",
      "General awareness of analytics workloads (batch vs streaming)",
    ],
    officialGuideUrl: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/dp-900",
    examPageUrl: "https://learn.microsoft.com/en-us/credentials/certifications/exams/dp-900",
    docsUrl: "https://learn.microsoft.com/en-us/azure/",
  },
};

function buildSteps(code, meta, guide) {
  return [
    {
      title: "Review the official study guide",
      body: "Open Microsoft's official skills-measured breakdown and use it as your checklist — it's updated whenever the exam changes.",
      link: { url: guide.officialGuideUrl, label: "Official DP study guide" },
    },
    {
      title: "Schedule your exam",
      body: "Pick a date through the official Microsoft certification page and plan your study time backwards from it. Give yourself 2–4 weeks if you already use the tech weekly, 4–8 weeks if you're newer to it.",
      link: { url: guide.examPageUrl, label: "Exam & scheduling page" },
    },
    {
      title: "Go through the official learning path",
      body: "Complete Microsoft's free, self-paced modules for this exam. Take notes on anything you can't explain simply — that's what to revisit.",
      link: { url: guide.docsUrl, label: "Official documentation" },
    },
    {
      title: "Get hands-on practice",
      body: `${code} rewards recognizing real scenarios and trade-offs, not memorization. Spin up a free-tier environment and actually try the concepts — ingestion, transformations, security settings — rather than just reading about them.`,
    },
    {
      title: "Benchmark your knowledge",
      body: `Use FabricPrep's ${code} practice questions to find weak spots, and take a timed mock exam to build comfort with exam-day pacing.`,
      internalLink: `/${meta.slug}`,
    },
    {
      title: "Take the exam",
      body: "The day before: review only your weak topics, don't cram new material. On exam day: read each question carefully, eliminate wrong answers first, and watch for wording that implies a constraint (least privilege, cost, performance).",
    },
  ];
}

export function StudyGuideDetail() {
  const { examSlug } = useParams();
  const { theme, onToggleTheme, streak } = useOutletContext();
  const TOKENS = useTheme();

  const code = SLUG_TO_EXAM[examSlug];
  if (!code) return <Navigate to="/study-guides" replace />;

  const meta = EXAM_META[code];
  const guide = GUIDES[code];
  const total = QUESTION_BANK[code].questions.length;
  const steps = buildSteps(code, meta, guide);

  return (
    <div className="min-h-full flex flex-col">
      <Helmet>
        <title>{code} Study Guide | FabricPrep</title>
        <meta
          name="description"
          content={`A step-by-step study path for the ${code} exam — prerequisites, official resources, and a study plan, plus free practice questions.`}
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: `${code} Study Guide`,
            about: meta.title,
            author: { "@type": "Person", name: "Jitendra Singh Malik" },
            publisher: { "@type": "Organization", name: "FabricPrep" },
          })}
        </script>
      </Helmet>

      <main className="flex-1 px-6 sm:px-10 py-8 max-w-2xl mx-auto w-full">
        <Link to="/study-guides" className="flex items-center gap-1 text-xs mb-6" style={{ color: TOKENS.inkMuted }}>
          <ChevronLeft size={14} /> All study guides
        </Link>

        <div
          className="text-xs uppercase mb-3 px-3 py-1 rounded-full inline-block"
          style={{ color: TOKENS.azure, letterSpacing: "0.14em", border: `1px solid ${TOKENS.azure}40`, fontFamily: FONT_MONO }}
        >
          {code}
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
          {code} Study Guide
        </h1>
        <p className="mt-2 text-sm" style={{ color: TOKENS.inkMuted }}>
          A study path for {meta.title} — what to know before you start, and the order worth doing things in.
        </p>

        {/* DP-700 Detailed Topics Section - Moved above Prerequisites */}
        {code === "DP-700" && (
          <>
            <h2 className="text-sm font-semibold mt-8 mb-3" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
              DP-700: Microsoft Fabric Data Engineer Associate
            </h2>
            <p className="text-xs mb-4" style={{ color: TOKENS.inkMuted }}>
              Dive deep into each exam objective with comprehensive study materials.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <Link
                to="/study-guides/dp-700/ingestion"
                className="rounded-xl p-4 transition-colors hover:opacity-90"
                style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${TOKENS.azure}20` }}>
                    <Database size={20} color={TOKENS.azure} />
                  </div>
                  <div>
                    <div className="text-xs font-medium mb-0.5" style={{ color: TOKENS.azure }}>40-45%</div>
                    <div className="text-sm font-medium" style={{ color: TOKENS.ink }}>Ingest and Transform Data</div>
                    <div className="text-xs mt-1" style={{ color: TOKENS.inkMuted }}>Copy jobs, pipelines, shortcuts, transformations</div>
                  </div>
                </div>
              </Link>

              <Link
                to="/study-guides/dp-700/monitoring"
                className="rounded-xl p-4 transition-colors hover:opacity-90"
                style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${TOKENS.azure}20` }}>
                    <Activity size={20} color={TOKENS.azure} />
                  </div>
                  <div>
                    <div className="text-xs font-medium mb-0.5" style={{ color: TOKENS.azure }}>30-35%</div>
                    <div className="text-sm font-medium" style={{ color: TOKENS.ink }}>Monitor and Maintain Data</div>
                    <div className="text-xs mt-1" style={{ color: TOKENS.inkMuted }}>Pipeline monitoring, optimization, data quality</div>
                  </div>
                </div>
              </Link>

              <Link
                to="/study-guides/dp-700/security"
                className="rounded-xl p-4 transition-colors hover:opacity-90 sm:col-span-2"
                style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${TOKENS.azure}20` }}>
                    <Shield size={20} color={TOKENS.azure} />
                  </div>
                  <div>
                    <div className="text-xs font-medium mb-0.5" style={{ color: TOKENS.azure }}>25-30%</div>
                    <div className="text-sm font-medium" style={{ color: TOKENS.ink }}>Secure Data</div>
                    <div className="text-xs mt-1" style={{ color: TOKENS.inkMuted }}>Access control, data protection, compliance and auditing</div>
                  </div>
                </div>
              </Link>
            </div>

            {/* PDF Cheatsheet Download */}
            <a
              href="/DP_700_Guide.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 mt-5 p-4 rounded-xl transition-colors hover:opacity-90"
              style={{ background: `${TOKENS.amber}15`, border: `1px solid ${TOKENS.amber}40` }}
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${TOKENS.amber}25` }}>
                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={TOKENS.amber} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <path d="M12 18v-6"/>
                  <path d="m9 15 3 3 3-3"/>
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium" style={{ color: TOKENS.ink }}>Download PDF Cheatsheet</div>
                <div className="text-xs" style={{ color: TOKENS.inkMuted }}>Complete DP-700 study guide in PDF format</div>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={TOKENS.amber} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
            </a>
          </>
        )}

        {/* DP-600 Static Exam Topics */}
        {code === "DP-600" && (
          <>
            <h2 className="text-sm font-semibold mt-8 mb-3" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
              DP-600: Fabric Analytics Engineer Associate
            </h2>
            <p className="text-xs mb-4" style={{ color: TOKENS.inkMuted }}>
              Key areas covered in the DP-600 exam.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div
                className="rounded-xl p-4"
                style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${TOKENS.azure}20` }}>
                    <span style={{ color: TOKENS.azure, fontSize: '1.25rem' }}>📊</span>
                  </div>
                  <div>
                    <div className="text-xs font-medium mb-0.5" style={{ color: TOKENS.azure }}>35-40%</div>
                    <div className="text-sm font-medium" style={{ color: TOKENS.ink }}>Plan, Implement, and Manage a Power BI Environment</div>
                    <div className="text-xs mt-1" style={{ color: TOKENS.inkMuted }}>Tenant settings, workspaces, deployment pipelines, governance</div>
                  </div>
                </div>
              </div>

              <div
                className="rounded-xl p-4"
                style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${TOKENS.azure}20` }}>
                    <span style={{ color: TOKENS.azure, fontSize: '1.25rem' }}>🔄</span>
                  </div>
                  <div>
                    <div className="text-xs font-medium mb-0.5" style={{ color: TOKENS.azure }}>30-35%</div>
                    <div className="text-sm font-medium" style={{ color: TOKENS.ink }}>Model and Visualize Data</div>
                    <div className="text-xs mt-1" style={{ color: TOKENS.inkMuted }}>Semantic models, DAX, relationships, storage modes</div>
                  </div>
                </div>
              </div>

              <div
                className="rounded-xl p-4"
                style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${TOKENS.azure}20` }}>
                    <span style={{ color: TOKENS.azure, fontSize: '1.25rem' }}>📈</span>
                  </div>
                  <div>
                    <div className="text-xs font-medium mb-0.5" style={{ color: TOKENS.azure }}>25-30%</div>
                    <div className="text-sm font-medium" style={{ color: TOKENS.ink }}>Implement and Manage Data Analytics</div>
                    <div className="text-xs mt-1" style={{ color: TOKENS.inkMuted }}>Paginated reports, scorecards, metrics, dataflows, datamarts</div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* AZ-900 Static Exam Topics */}
        {code === "AZ-900" && (
          <>
            <h2 className="text-sm font-semibold mt-8 mb-3" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
              AZ-900: Azure Fundamentals
            </h2>
            <p className="text-xs mb-4" style={{ color: TOKENS.inkMuted }}>
              Key areas covered in the AZ-900 exam.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div
                className="rounded-xl p-4"
                style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${TOKENS.azure}20` }}>
                    <span style={{ color: TOKENS.azure, fontSize: '1.25rem' }}>☁️</span>
                  </div>
                  <div>
                    <div className="text-xs font-medium mb-0.5" style={{ color: TOKENS.azure }}>25-30%</div>
                    <div className="text-sm font-medium" style={{ color: TOKENS.ink }}>Describe Cloud Concepts</div>
                    <div className="text-xs mt-1" style={{ color: TOKENS.inkMuted }}>Cloud computing, shared responsibility, models (IaaS, PaaS, SaaS)</div>
                  </div>
                </div>
              </div>

              <div
                className="rounded-xl p-4"
                style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${TOKENS.azure}20` }}>
                    <span style={{ color: TOKENS.azure, fontSize: '1.25rem' }}>🏛️</span>
                  </div>
                  <div>
                    <div className="text-xs font-medium mb-0.5" style={{ color: TOKENS.azure }}>35-40%</div>
                    <div className="text-sm font-medium" style={{ color: TOKENS.ink }}>Describe Azure Architecture and Services</div>
                    <div className="text-xs mt-1" style={{ color: TOKENS.inkMuted }}>Regions, availability zones, resource groups, core services (compute, storage, networking)</div>
                  </div>
                </div>
              </div>

              <div
                className="rounded-xl p-4"
                style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${TOKENS.azure}20` }}>
                    <span style={{ color: TOKENS.azure, fontSize: '1.25rem' }}>🔒</span>
                  </div>
                  <div>
                    <div className="text-xs font-medium mb-0.5" style={{ color: TOKENS.azure }}>30-35%</div>
                    <div className="text-sm font-medium" style={{ color: TOKENS.ink }}>Describe Azure Management and Governance</div>
                    <div className="text-xs mt-1" style={{ color: TOKENS.inkMuted }}>Cost management, RBAC, resource locks, tags, policies, monitoring</div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* DP-900 Static Exam Topics */}
        {code === "DP-900" && (
          <>
            <h2 className="text-sm font-semibold mt-8 mb-3" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
              DP-900: Azure Data Fundamentals
            </h2>
            <p className="text-xs mb-4" style={{ color: TOKENS.inkMuted }}>
              Key areas covered in the DP-900 exam.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div
                className="rounded-xl p-4"
                style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${TOKENS.azure}20` }}>
                    <span style={{ color: TOKENS.azure, fontSize: '1.25rem' }}>🗄️</span>
                  </div>
                  <div>
                    <div className="text-xs font-medium mb-0.5" style={{ color: TOKENS.azure }}>25-30%</div>
                    <div className="text-sm font-medium" style={{ color: TOKENS.ink }}>Describe Core Data Concepts</div>
                    <div className="text-xs mt-1" style={{ color: TOKENS.inkMuted }}>Data types (structured, semi-structured, unstructured), data roles, data analytics</div>
                  </div>
                </div>
              </div>

              <div
                className="rounded-xl p-4"
                style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${TOKENS.azure}20` }}>
                    <span style={{ color: TOKENS.azure, fontSize: '1.25rem' }}>📋</span>
                  </div>
                  <div>
                    <div className="text-xs font-medium mb-0.5" style={{ color: TOKENS.azure }}>35-40%</div>
                    <div className="text-sm font-medium" style={{ color: TOKENS.ink }}>Identify Considerations for Relational Data</div>
                    <div className="text-xs mt-1" style={{ color: TOKENS.inkMuted }}>Relational concepts, Azure SQL, PostgreSQL, MySQL, SQL Managed Instance</div>
                  </div>
                </div>
              </div>

              <div
                className="rounded-xl p-4"
                style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${TOKENS.azure}20` }}>
                    <span style={{ color: TOKENS.azure, fontSize: '1.25rem' }}>📊</span>
                  </div>
                  <div>
                    <div className="text-xs font-medium mb-0.5" style={{ color: TOKENS.azure }}>25-30%</div>
                    <div className="text-sm font-medium" style={{ color: TOKENS.ink }}>Describe Considerations for Non-Relational Data</div>
                    <div className="text-xs mt-1" style={{ color: TOKENS.inkMuted }}>Azure Cosmos DB, storage accounts, data lake, file storage</div>
                  </div>
                </div>
              </div>

              <div
                className="rounded-xl p-4"
                style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${TOKENS.azure}20` }}>
                    <span style={{ color: TOKENS.azure, fontSize: '1.25rem' }}>🔍</span>
                  </div>
                  <div>
                    <div className="text-xs font-medium mb-0.5" style={{ color: TOKENS.azure }}>10-15%</div>
                    <div className="text-sm font-medium" style={{ color: TOKENS.ink }}>Describe Analytics Workloads</div>
                    <div className="text-xs mt-1" style={{ color: TOKENS.inkMuted }}>Modern data warehousing, data ingestion, processing, visualization</div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        <h2 className="text-sm font-semibold mt-10 mb-2" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
          Prerequisites
        </h2>
        <p className="text-sm" style={{ color: TOKENS.inkMuted }}>{guide.prereq}</p>

        <h2 className="text-sm font-semibold mt-6 mb-2" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
          Recommended background
        </h2>
        <ul className="flex flex-col gap-1.5">
          {guide.background.map((b) => (
            <li key={b} className="flex items-start gap-2 text-sm" style={{ color: TOKENS.inkMuted }}>
              <CheckCircle2 size={15} color={TOKENS.azure} className="flex-shrink-0 mt-0.5" />
              {b}
            </li>
          ))}
        </ul>

        <h2 className="text-sm font-semibold mt-8 mb-3" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
          Step-by-step study plan
        </h2>
        <div className="flex flex-col gap-3">
          {steps.map((s, i) => (
            <div key={s.title} className="rounded-xl p-4" style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}>
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{ background: TOKENS.azure, color: TOKENS.bgDeep, fontFamily: FONT_MONO }}
                >
                  {i + 1}
                </span>
                <span className="text-sm font-medium" style={{ color: TOKENS.ink }}>{s.title}</span>
              </div>
              <p className="text-xs ml-7" style={{ color: TOKENS.inkMuted }}>{s.body}</p>
              {s.link && (
                <a
                  href={s.link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-7 mt-2 inline-flex items-center gap-1 text-xs"
                  style={{ color: TOKENS.azure }}
                >
                  {s.link.label} <ExternalLink size={11} />
                </a>
              )}
              {s.internalLink && (
                <Link to={s.internalLink} className="ml-7 mt-2 inline-flex items-center gap-1 text-xs" style={{ color: TOKENS.azure }}>
                  Practice {code} now — {total} free questions <ChevronLeft size={11} style={{ transform: "rotate(180deg)" }} />
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="rounded-xl p-5 mt-8 text-center" style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}>
          <div className="text-sm font-medium mb-1" style={{ color: TOKENS.ink }}>Ready to test yourself?</div>
          <p className="text-xs mb-3" style={{ color: TOKENS.inkMuted }}>
            {total} realistic {code} practice questions with instant feedback and detailed explanations.
          </p>
          <Link
            to={`/${meta.slug}`}
            className="inline-block px-5 py-2.5 rounded-full font-medium text-sm"
            style={{ background: TOKENS.azure, color: TOKENS.bgDeep, textDecoration: "none" }}
          >
            Practice {code} now
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
