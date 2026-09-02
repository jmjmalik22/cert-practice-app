import { Head as Helmet } from "vite-react-ssg";
import { Link } from "react-router-dom";
import { BookOpen, ChevronRight, ExternalLink } from "lucide-react";
import { useTheme, FONT_DISPLAY } from "../lib/theme.jsx";
import { Footer } from "../components/Shared.jsx";
import { EXAM_META } from "../lib/questionBank/index.js";
import { buildBreadcrumbSchema, SITE_ORIGIN } from "../lib/examCatalog.js";

const STUDY_RESOURCES = [
  {
    examCode: "DP-700",
    title: "DP-700: Microsoft Fabric Data Engineer Associate",
    description: "A step-by-step study path for the Microsoft Fabric Data Engineer Associate certification.",
  },
  {
    examCode: "DP-600",
    title: "DP-600: Fabric Analytics Engineer Associate",
    description: "A step-by-step study path for the Microsoft Fabric Analytics Engineer Associate certification.",
  },
  {
    examCode: "AZ-900",
    title: "AZ-900: Azure Fundamentals",
    description: "A step-by-step study path for the Microsoft Azure Fundamentals certification.",
  },
  {
    examCode: "DP-900",
    title: "DP-900: Azure Data Fundamentals",
    description: "A step-by-step study path for the Microsoft Azure Data Fundamentals certification.",
  },
  {
    examCode: "AZ-104",
    title: "AZ-104: Azure Administrator Associate",
    description: "A step-by-step study path for the Microsoft Azure Administrator Associate certification.",
  },
  {
    examCode: "AI-901",
    title: "AI-901: Azure AI Fundamentals",
    description: "A step-by-step study path for the Microsoft Azure AI Fundamentals (Foundry) certification.",
  },
  {
    examCode: "PL-300",
    title: "PL-300: Power BI Data Analyst Associate",
    description: "A step-by-step study path for the Microsoft Power BI Data Analyst Associate certification.",
  },
  {
    examCode: "DP-800",
    title: "DP-800: Developing AI-Enabled Database Solutions",
    description: "A step-by-step study path for the Microsoft DP-800 AI-enabled database solutions certification.",
  },
];

const EXTERNAL_RESOURCES = [
  {
    title: "Microsoft Learn",
    url: "https://learn.microsoft.com",
    description: "Official Microsoft documentation and learning paths",
    icon: ExternalLink,
  },
  {
    title: "Fabric Documentation",
    url: "https://learn.microsoft.com/fabric",
    description: "Complete Microsoft Fabric documentation",
    icon: ExternalLink,
  },
];

function ResourceCard({ resource }) {
  const TOKENS = useTheme();
  const meta = EXAM_META[resource.examCode];

  return (
    <div
      className="rounded-xl p-5 flex flex-col h-full"
      style={{
        background: TOKENS.panel,
        border: `1px solid ${TOKENS.panelBorder}`,
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ background: `${TOKENS.azure}1A` }}
        >
          <BookOpen size={20} style={{ color: TOKENS.azure }} />
        </div>
      </div>

      <h3 className="font-semibold mb-1" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
        {resource.title}
      </h3>
      <p className="text-xs mb-4 flex-grow" style={{ color: TOKENS.inkMuted }}>
        {resource.description}
      </p>

      <Link
        to={`/study-guides/${meta.slug}`}
        className="flex items-center justify-between py-2.5 px-3 rounded-lg text-sm transition-colors mt-auto"
        style={{ background: TOKENS.bg, color: TOKENS.ink, textDecoration: "none" }}
      >
        <span>Read the study guide</span>
        <ChevronRight size={14} style={{ color: TOKENS.inkMuted }} />
      </Link>
    </div>
  );
}

export function StudyGuides() {
  const TOKENS = useTheme();

  return (
    <div className="min-h-full flex flex-col">
      <Helmet>
        <title>Study Guides | FabricPrep</title>
        <link rel="canonical" href="https://fabricprep.com/study-guides" />
        <meta name="description" content="Free study guides and resources for Microsoft Fabric and Azure certifications." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Study Guides",
            description: "Free study guides and resources for Microsoft Fabric and Azure certifications.",
            hasPart: STUDY_RESOURCES.map((r) => ({
              "@type": "Article",
              headline: r.title,
              description: r.description,
              url: `${SITE_ORIGIN}/study-guides/${EXAM_META[r.examCode].slug}`,
            })),
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(
            buildBreadcrumbSchema([
              { name: "Home", path: "" },
              { name: "Study Guides" },
            ])
          )}
        </script>
      </Helmet>

      <main className="flex-1 px-6 sm:px-10 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
            Study Guides
          </h1>
          <p style={{ color: TOKENS.inkMuted }}>
            Comprehensive study materials for Microsoft certifications. Read online or download PDFs.
          </p>
        </div>

        {/* Study Guides Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10 items-stretch">
          {STUDY_RESOURCES.map((resource) => (
            <ResourceCard key={resource.examCode} resource={resource} />
          ))}
        </div>

        <div className="rounded-xl p-5 mb-10" style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}>
          <h2 className="text-lg font-semibold mb-2" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
            Shared Fabric foundations
          </h2>
          <p className="text-sm mb-4" style={{ color: TOKENS.inkMuted }}>
            Dataflows Gen2, pipelines, and Copy Data are useful across both DP-700 and DP-600 preparation.
          </p>
          <Link
            to="/study-guides/shared"
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm"
            style={{ background: TOKENS.bg, color: TOKENS.ink, border: `1px solid ${TOKENS.panelBorder}` }}
          >
            Browse shared topics <ChevronRight size={14} />
          </Link>
        </div>

        {/* External Resources */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
            Official Resources
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {EXTERNAL_RESOURCES.map((resource) => (
              <a
                key={resource.title}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-4 rounded-xl transition-colors"
                style={{
                  background: TOKENS.panel,
                  border: `1px solid ${TOKENS.panelBorder}`,
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: `${TOKENS.amber}1A` }}
                >
                  <resource.icon size={20} style={{ color: TOKENS.amber }} />
                </div>
                <div>
                  <h3 className="font-medium mb-1" style={{ color: TOKENS.ink }}>
                    {resource.title}
                  </h3>
                  <p className="text-xs" style={{ color: TOKENS.inkMuted }}>
                    {resource.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* How to Use */}
        <div
          className="rounded-xl p-5"
          style={{
            background: TOKENS.panel,
            border: `1px solid ${TOKENS.panelBorder}`,
          }}
        >
          <h2 className="text-lg font-semibold mb-3" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
            How to Use These Guides
          </h2>
          <div className="grid sm:grid-cols-3 gap-4 text-sm">
            <div className="flex items-start gap-2">
              <span
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                style={{ background: TOKENS.azure, color: "#fff" }}
              >
                1
              </span>
              <span style={{ color: TOKENS.inkMuted }}>
                Read through each topic to understand the concepts
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                style={{ background: TOKENS.azure, color: "#fff" }}
              >
                2
              </span>
              <span style={{ color: TOKENS.inkMuted }}>
                Practice with questions to test your knowledge
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                style={{ background: TOKENS.azure, color: "#fff" }}
              >
                3
              </span>
              <span style={{ color: TOKENS.inkMuted }}>
                Take mock exams to assess your readiness
              </span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
