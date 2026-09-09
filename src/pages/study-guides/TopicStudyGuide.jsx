import { Head as Helmet } from "vite-react-ssg";
import { Link, Navigate, useParams } from "react-router-dom";
import { ChevronLeft, BookOpen } from "lucide-react";
import { useTheme, FONT_DISPLAY, FONT_MONO } from "../../lib/theme.jsx";
import { EXAM_META, SLUG_TO_EXAM, buildBreadcrumbSchema } from "../../lib/examCatalog.js";
import { getStudyTopics } from "../../lib/studyTopics/index.js";
import { Footer } from "../../components/Shared.jsx";

// Parses the lightweight markdown-ish format used in study topic content:
// "**heading**" lines, "- item" bullet lines, and plain paragraph text.
// Line-based (not blank-line-block-based) so a heading followed directly by
// its bullet list — the norm in this content — still renders as separate
// elements instead of collapsing into one run-on paragraph.
function parseStudyContent(content) {
  const blocks = [];
  let paraLines = [];
  let listItems = null;

  function flushParagraph() {
    if (paraLines.length) {
      blocks.push({ type: "p", text: paraLines.join(" ") });
      paraLines = [];
    }
  }
  function flushList() {
    if (listItems) {
      blocks.push({ type: "ul", items: listItems });
      listItems = null;
    }
  }

  content.split("\n").forEach((rawLine) => {
    const line = rawLine.trim();
    if (!line) {
      flushParagraph();
      flushList();
      return;
    }
    if (line.startsWith("**") && line.endsWith("**") && line.length > 4) {
      flushParagraph();
      flushList();
      blocks.push({ type: "h3", text: line.replace(/\*\*/g, "") });
      return;
    }
    if (line.startsWith("- ")) {
      flushParagraph();
      if (!listItems) listItems = [];
      listItems.push(line.slice(2).replace(/\*\*/g, ""));
      return;
    }
    flushList();
    paraLines.push(line);
  });
  flushParagraph();
  flushList();

  return blocks;
}

export function TopicStudyGuide() {
  const { examSlug, topicId } = useParams();
  const TOKENS = useTheme();

  const code = SLUG_TO_EXAM[examSlug];
  const topics = code ? getStudyTopics(code) : null;

  if (!code || !topics) {
    return <Navigate to="/study-guides" replace />;
  }

  const topic = topics.find((t) => t.id === topicId);
  if (!topic) {
    return <Navigate to={`/study-guides/${examSlug}`} replace />;
  }

  const meta = EXAM_META[code];
  const Icon = topic.icon;

  return (
    <div className="min-h-full flex flex-col">
      <Helmet>
        <title>{topic.title} | {code} Study Guide | FabricPrep</title>
        <link rel="canonical" href={`https://fabricprep.com/study-guides/${examSlug}/${topicId}`} />
        <meta
          name="description"
          content={`Study guide for ${topic.title} - ${code} ${meta.label} exam. Covers ${topic.weight} of the exam.`}
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: `${topic.title} — ${code} Study Guide`,
            about: `${code}: ${meta.label}`,
            description: `Study guide for ${topic.title} - ${code} ${meta.label} exam. Covers ${topic.weight} of the exam.`,
            author: { "@type": "Person", name: "Jitendra Singh Malik" },
            publisher: { "@type": "Organization", name: "FabricPrep" },
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(
            buildBreadcrumbSchema([
              { name: "Home", path: "" },
              { name: "Study Guides", path: "study-guides" },
              { name: `${code} Study Guide`, path: `study-guides/${examSlug}` },
              { name: topic.title },
            ])
          )}
        </script>
      </Helmet>

      <main className="flex-1 px-6 sm:px-10 py-8 max-w-3xl mx-auto w-full">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs mb-6" style={{ color: TOKENS.inkMuted }}>
          <Link to="/study-guides" style={{ color: TOKENS.inkMuted }}>Study Guides</Link>
          <span>/</span>
          <Link to={`/study-guides/${examSlug}`} style={{ color: TOKENS.inkMuted }}>{code}</Link>
          <span>/</span>
          <span style={{ color: TOKENS.ink }}>{topic.title}</span>
        </div>

        {/* Header */}
        <div className="flex items-start gap-4 mb-8">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: `${TOKENS.azure}20` }}
          >
            <Icon size={24} color={TOKENS.azure} />
          </div>
          <div>
            <div
              className="text-xs uppercase mb-1 px-2 py-0.5 rounded-full inline-block"
              style={{ color: TOKENS.azure, letterSpacing: "0.1em", border: `1px solid ${TOKENS.azure}40`, fontFamily: FONT_MONO }}
            >
              {topic.weight}{topic.weight.includes("%") ? " of exam" : ""}
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
              {topic.title}
            </h1>
            <p className="mt-1 text-sm" style={{ color: TOKENS.inkMuted }}>
              {topic.description}
            </p>
          </div>
        </div>

        {/* Topic Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {topics.map((t) => {
            const TopicIcon = t.icon;
            const isActive = t.id === topicId;
            return (
              <Link
                key={t.id}
                to={`/study-guides/${examSlug}/${t.id}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-colors"
                style={{
                  background: isActive ? TOKENS.azure : TOKENS.panel,
                  color: isActive ? TOKENS.bg : TOKENS.ink,
                  border: `1px solid ${isActive ? TOKENS.azure : TOKENS.panelBorder}`,
                }}
              >
                <TopicIcon size={14} />
                {t.title}
              </Link>
            );
          })}
        </div>

        {/* Content Sections */}
        <div className="flex flex-col gap-6">
          {topic.sections.map((section) => (
            <div
              key={section.title}
              className="rounded-xl p-5 sm:p-6"
              style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}
            >
              <h2 className="text-lg font-semibold mb-3" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
                {section.title}
              </h2>
              <div className="prose prose-sm max-w-none" style={{ color: TOKENS.inkMuted }}>
                {parseStudyContent(section.content).map((block, i) => {
                  if (block.type === "h3") {
                    return (
                      <h3 key={i} className="text-sm font-semibold mt-4 mb-2" style={{ color: TOKENS.ink }}>
                        {block.text}
                      </h3>
                    );
                  }
                  if (block.type === "ul") {
                    return (
                      <ul key={i} className="list-disc list-inside space-y-1 my-2">
                        {block.items.map((item, j) => (
                          <li key={j}>{item}</li>
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <p key={i} className="mb-3 leading-relaxed">
                      {block.text}
                    </p>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Footer */}
        <div className="flex items-center justify-between mt-8 pt-6" style={{ borderTop: `1px solid ${TOKENS.panelBorder}` }}>
          <Link
            to={`/study-guides/${examSlug}`}
            className="flex items-center gap-1 text-sm"
            style={{ color: TOKENS.inkMuted }}
          >
            <ChevronLeft size={16} />
            Back to {code} Overview
          </Link>
          <Link
            to={`/${meta.slug}`}
            className="flex items-center gap-1 text-sm px-4 py-2 rounded-lg"
            style={{ background: TOKENS.azure, color: TOKENS.bg }}
          >
            <BookOpen size={16} />
            Practice Questions
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
