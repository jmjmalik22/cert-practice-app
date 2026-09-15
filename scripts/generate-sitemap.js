// Generates sitemap.xml and robots.txt after the SSG build.
// Keep the sitemap limited to canonical, indexable routes.
import { execFileSync } from "child_process";
import { existsSync, writeFileSync } from "fs";
import {
  SITEMAP_ROUTES,
  SITE_ORIGIN,
  SLUG_TO_EXAM,
  STUDY_GUIDE_TOPIC_IDS_BY_EXAM,
} from "../src/lib/examCatalog.js";

// <lastmod> is the only sitemap field Google actually acts on — it tells the
// crawler a page is worth re-fetching. To make it truthful rather than "the
// day we last deployed", each route resolves to the source file(s) that own
// its *content*, and lastmod is the date those files were last committed.
//
// Deliberately excluded: shared chrome (Header/Footer/theme). A footer tweak
// is not a content change, and marking all 63 pages stale every time one
// lands is exactly the noise that makes crawlers start ignoring lastmod.

const PAGES = "src/pages";
const STATIC_SOURCES = {
  "/": [`${PAGES}/Landing.jsx`],
  "/about": [`${PAGES}/About.jsx`],
  "/pricing": [`${PAGES}/Pricing.jsx`],
  "/study-guides": [`${PAGES}/StudyGuides.jsx`],
  "/study-guides/shared": [`${PAGES}/study-guides/SharedStudyGuides.jsx`],
};

// Shared, exam-agnostic foundation guides: one hand-written component each.
const SHARED_GUIDE_COMPONENTS = {
  "dataflows-pipelines": "IngestionFoundations",
  "spark-notebooks-delta": "SparkDeltaFoundations",
  "eventhouse-kql": "EventhouseFoundations",
  "warehouse-dimensional-modeling": "WarehouseFoundations",
  "monitoring-optimization": "MonitoringFoundations",
  "security-governance": "SecurityFoundations",
  "lifecycle-orchestration": "LifecycleFoundations",
};

// "DP-700" -> "dp700", matching src/lib/{questionBank,studyTopics}/ filenames.
const bankFile = (examCode) => examCode.toLowerCase().replace(/-/g, "");

function sourcesForRoute(routePath) {
  if (STATIC_SOURCES[routePath]) return STATIC_SOURCES[routePath];

  const segments = routePath.split("/").filter(Boolean);

  if (segments[0] === "study-guides" && segments[1] === "shared") {
    const component = SHARED_GUIDE_COMPONENTS[segments[2]];
    if (!component) {
      throw new Error(
        `No source mapping for shared study guide "${routePath}". ` +
          `Add it to SHARED_GUIDE_COMPONENTS in scripts/generate-sitemap.js.`
      );
    }
    return [`${PAGES}/study-guides/${component}.jsx`];
  }

  if (segments[0] === "study-guides") {
    const examCode = SLUG_TO_EXAM[segments[1]];
    if (!examCode) throw new Error(`Unknown exam slug in route "${routePath}".`);
    const topics = `src/lib/studyTopics/${bankFile(examCode)}.js`;

    // A per-domain topic page: its prose lives in the exam's topics module.
    if (segments[2]) return [`${PAGES}/study-guides/TopicStudyGuide.jsx`, topics];

    // The exam's study guide landing page.
    const sources = [`${PAGES}/StudyGuideDetail.jsx`];
    if (STUDY_GUIDE_TOPIC_IDS_BY_EXAM[examCode]) sources.push(topics);
    return sources;
  }

  // Bare "/<slug>" is an exam practice page, driven by its question bank.
  const examCode = SLUG_TO_EXAM[segments[0]];
  if (!examCode) throw new Error(`Unknown exam slug in route "${routePath}".`);
  return [`${PAGES}/ExamPage.jsx`, `src/lib/questionBank/${bankFile(examCode)}.js`];
}

function git(args) {
  return execFileSync("git", args, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
}

// A shallow clone (the default on several deploy platforms) only has one
// commit, so every file would report the same date — silently turning
// per-page lastmod back into "the deploy date". Better to emit no lastmod at
// all than to lie to the crawler about which pages changed.
let gitAvailable = true;
try {
  if (git(["rev-parse", "--is-shallow-repository"]) === "true") {
    gitAvailable = false;
    console.warn(
      "[sitemap] Shallow git clone detected — omitting <lastmod>. " +
        "Set the deploy's fetch depth to 0 for accurate per-page dates."
    );
  }
} catch {
  gitAvailable = false;
  console.warn("[sitemap] git unavailable — omitting <lastmod>.");
}

function lastModified(routePath) {
  if (!gitAvailable) return null;
  const files = sourcesForRoute(routePath).filter((f) => existsSync(f));
  if (!files.length) return null;
  try {
    // -1 over several paths = the most recent commit touching any of them.
    return git(["log", "-1", "--format=%cI", "--", ...files]) || null;
  } catch {
    return null;
  }
}

const entries = SITEMAP_ROUTES.map((r) => {
  const lastmod = lastModified(r.path);
  return `  <url>
    <loc>${SITE_ORIGIN}${r.path}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ""}
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`;
});

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join("\n")}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_ORIGIN}/sitemap.xml
`;

writeFileSync("dist/sitemap.xml", sitemap);
writeFileSync("dist/robots.txt", robots);

const dated = entries.filter((e) => e.includes("<lastmod>")).length;
console.log(
  `Generated sitemap.xml and robots.txt for ${SITEMAP_ROUTES.length} routes ` +
    `(${dated} with lastmod).`
);
