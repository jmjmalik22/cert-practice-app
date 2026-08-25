import { useState } from "react";
import { Head as Helmet } from "vite-react-ssg";
import { Link, useOutletContext } from "react-router-dom";
import { BookOpen, Download, ChevronRight, ExternalLink } from "lucide-react";
import { useTheme, FONT_DISPLAY } from "../lib/theme.jsx";
import { Footer } from "../components/Shared.jsx";
import { EXAM_META } from "../lib/questionBank.jsx";

const STUDY_RESOURCES = [
  {
    examCode: "DP-700",
    title: "DP-700 Study Guide",
    description: "Complete study guide for Microsoft Fabric Data Engineer Associate certification.",
    pages: [
      { title: "Exam Overview", slug: "overview" },
      { title: "Lakehouse Architecture", slug: "lakehouse" },
      { title: "Data Pipelines", slug: "pipelines" },
      { title: "Spark & Notebooks", slug: "spark" },
      { title: "Security & Governance", slug: "security" },
    ],
    hasPDF: true,
  },
  {
    examCode: "DP-600",
    title: "DP-600 Study Guide",
    description: "Study guide for Microsoft Fabric Analytics Engineer Associate certification.",
    pages: [
      { title: "Exam Overview", slug: "overview" },
      { title: "Semantic Models", slug: "semantic-models" },
      { title: "DAX Fundamentals", slug: "dax" },
      { title: "Dataflows", slug: "dataflows" },
    ],
    hasPDF: false,
  },
  {
    examCode: "AZ-900",
    title: "AZ-900 Study Guide",
    description: "Microsoft Azure Fundamentals certification study guide.",
    pages: [
      { title: "Cloud Concepts", slug: "cloud-concepts" },
      { title: "Azure Architecture", slug: "architecture" },
      { title: "Compute & Networking", slug: "compute" },
      { title: "Storage & Databases", slug: "storage" },
    ],
    hasPDF: false,
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
      className="rounded-xl p-5"
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
        {resource.hasPDF && (
          <a
            href={`/study-guides/${resource.examCode.toLowerCase()}.pdf`}
            download
            className="flex items-center gap-1 text-xs px-2 py-1 rounded-full"
            style={{ background: `${TOKENS.green}1A`, color: TOKENS.green }}
          >
            <Download size={12} />
            PDF
          </a>
        )}
      </div>

      <h3 className="font-semibold mb-1" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
        {resource.title}
      </h3>
      <p className="text-xs mb-4" style={{ color: TOKENS.inkMuted }}>
        {resource.description}
      </p>

      <div className="space-y-1">
        {resource.pages.slice(0, 3).map((page) => (
          <Link
            key={page.slug}
            to={`/study-guides/${resource.examCode.toLowerCase()}/${page.slug}`}
            className="flex items-center justify-between py-2 px-3 rounded-lg text-sm transition-colors"
            style={{ background: TOKENS.bg, color: TOKENS.ink }}
          >
            <span>{page.title}</span>
            <ChevronRight size={14} style={{ color: TOKENS.inkMuted }} />
          </Link>
        ))}
        {resource.pages.length > 3 && (
          <Link
            to={`/study-guides/${resource.examCode.toLowerCase()}`}
            className="flex items-center justify-center py-2 text-xs"
            style={{ color: TOKENS.azure }}
          >
            +{resource.pages.length - 3} more topics
          </Link>
        )}
      </div>
    </div>
  );
}

export function StudyGuides() {
  const { theme, onToggleTheme, streak } = useOutletContext();
  const TOKENS = useTheme();

  return (
    <div className="min-h-full flex flex-col">
      <Helmet>
        <title>Study Guides | FabricPrep</title>
        <meta name="description" content="Free study guides and resources for Microsoft Fabric and Azure certifications." />
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {STUDY_RESOURCES.map((resource) => (
            <ResourceCard key={resource.examCode} resource={resource} />
          ))}
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
