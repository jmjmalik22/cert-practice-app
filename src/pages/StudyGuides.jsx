import { Link } from "react-router-dom";
import { BookOpen, ChevronRight, ExternalLink } from "lucide-react";
import { useTheme, FONT_DISPLAY, FONT_MONO } from "../lib/theme.jsx";
import { Footer } from "../components/Shared.jsx";
import { COMING_SOON_EXAMS, EXAM_META, STUDY_GUIDE_EXAM_CODES } from "../lib/examCatalog.js";
import { buildBreadcrumbSchema, SITE_ORIGIN } from "../lib/examCatalog.js";
import { PageSeo } from "../components/PageSeo.jsx";

// Derived from STUDY_GUIDE_EXAM_CODES (driven by `studyGuide: true` in examCatalog.js)
// instead of a hand-maintained list, so a new exam's guide shows up here the moment
// its flag flips — no separate list to remember to update.
const STUDY_RESOURCES = STUDY_GUIDE_EXAM_CODES.map((code) => ({
  examCode: code,
  title: `${code}: ${EXAM_META[code].label}`,
  description: `A step-by-step study path for the Microsoft ${EXAM_META[code].label} certification.`,
}));

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
  const displayTitle = resource.title.replace(/^[A-Z]{2,3}-\d{3}:\s*/, "");

  return (
    <Link
      to={`/study-guides/${meta.slug}`}
      className="rounded-2xl p-4 flex flex-col h-full transition-colors hover:opacity-90"
      style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}`, textDecoration: "none" }}
    >
      <div className="flex items-center gap-2 mb-2">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: `${TOKENS.azure}1A` }}
        >
          <BookOpen size={16} style={{ color: TOKENS.azure }} />
        </div>
        <span className="text-xs font-semibold" style={{ color: TOKENS.azure, fontFamily: FONT_MONO }}>
          {resource.examCode}
        </span>
      </div>

      <h3 className="text-sm font-semibold mb-1" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
        {displayTitle}
      </h3>
      <p className="text-xs mb-3 flex-grow" style={{ color: TOKENS.inkMuted }}>
        {resource.description}
      </p>

      <span className="flex items-center gap-1 text-xs font-medium mt-auto" style={{ color: TOKENS.azure }}>
        Read the study guide <ChevronRight size={12} />
      </span>
    </Link>
  );
}

export function StudyGuides() {
  const TOKENS = useTheme();

  return (
    <div className="min-h-full flex flex-col">
      <PageSeo title="Study Guides | FabricPrep" description="Free study guides and resources for Microsoft Fabric and Azure certifications." path="study-guides">
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
      </PageSeo>

      {/* Header on the landing hero's tinted wash, with the eyebrow +
          display heading pairing the rest of the site now uses. */}
      <div style={{ background: TOKENS.heroWash }}>
        <div className="px-6 sm:px-10 pt-10 pb-11 max-w-6xl mx-auto w-full">
          <p className="text-xs uppercase mb-3" style={{ color: TOKENS.inkMuted, letterSpacing: "0.16em", fontFamily: FONT_MONO }}>
            Free to read online
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
            Study Guides
          </h1>
          <p className="mt-3 text-base max-w-xl" style={{ color: TOKENS.inkMuted }}>
            Comprehensive study materials for Microsoft certifications, free to read online.
          </p>
        </div>
      </div>

      <main className="flex-1 px-6 sm:px-10 pt-10 pb-8 max-w-6xl mx-auto w-full">
        {/* Study Guides Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10 items-stretch">
          {STUDY_RESOURCES.map((resource) => (
            <ResourceCard key={resource.examCode} resource={resource} />
          ))}
        </div>

        <h2 className="text-xs uppercase mb-3" style={{ color: TOKENS.inkMuted, letterSpacing: "0.14em" }}>
          More study guides coming soon
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10" aria-label="Study guides coming soon">
          {COMING_SOON_EXAMS.map(({ code, label }) => (
            <div
              key={code}
              aria-disabled="true"
              className="rounded-2xl p-5 opacity-75"
              style={{ background: `${TOKENS.panel}90`, border: `1px dashed ${TOKENS.panelBorder}` }}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: `${TOKENS.inkMuted}15` }}
                >
                  <BookOpen size={20} style={{ color: TOKENS.inkMuted }} />
                </div>
                <span
                  className="text-xs font-medium px-2.5 py-1 rounded-full"
                  style={{ background: `${TOKENS.amber}15`, color: TOKENS.amber, border: `1px solid ${TOKENS.amber}35` }}
                >
                  Coming soon
                </span>
              </div>
              <h3 className="font-semibold mb-1" style={{ color: TOKENS.inkMuted, fontFamily: FONT_DISPLAY }}>
                {code}: {label}
              </h3>
              <p className="text-xs" style={{ color: TOKENS.inkMuted }}>
                This study guide is being prepared and will be available soon.
              </p>
            </div>
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
                className="flex items-start gap-3 p-4 rounded-2xl transition-colors"
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
          className="rounded-2xl p-5"
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
                Sit the Shield exam to assess your readiness
              </span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
