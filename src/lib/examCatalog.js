export const SITE_ORIGIN = "https://fabricprep.com";

export const EXAM_CATALOG = {
  "DP-700": {
    slug: "dp-700",
    title: "Microsoft Fabric DP-700 Practice Exam",
    metaTitle: "DP-700 Practice Exams | FabricPrep",
    metaDescription:
      "Free DP-700 practice questions for the Microsoft Fabric Data Engineer Associate exam, sourced from official Microsoft Learn docs. Timed mock exams included.",
    studyGuide: true,
    mock: {
      caseStudyQuestions: 8,
      standaloneQuestions: 42,
      totalQuestions: 50,
      timeMinutes: 100,
    },
    practice: {
      caseStudyCount: 8,
      timeLimit: "Untimed",
    },
  },
  "DP-600": {
    slug: "dp-600",
    title: "Microsoft Fabric DP-600 Practice Exam",
    metaTitle: "DP-600 Practice Exams | FabricPrep",
    metaDescription:
      "Free DP-600 practice questions for the Microsoft Fabric Analytics Engineer Associate exam, sourced from official Microsoft Learn docs. Timed mock exams included.",
    studyGuide: true,
    mock: {
      caseStudyQuestions: 8,
      standaloneQuestions: 42,
      totalQuestions: 50,
      timeMinutes: 100,
    },
    practice: {
      caseStudyCount: 8,
      timeLimit: "Untimed",
    },
  },
  "AZ-900": {
    slug: "az-900",
    title: "Microsoft Azure AZ-900 Practice Exam",
    metaTitle: "AZ-900 Practice Exams | FabricPrep",
    metaDescription:
      "Free AZ-900 practice questions for the Microsoft Azure Fundamentals exam, sourced from official Microsoft Learn docs. Timed mock exams included.",
    studyGuide: true,
    mock: {
      caseStudyQuestions: 0,
      standaloneQuestions: 32,
      totalQuestions: 32,
      timeMinutes: 45,
    },
    practice: {
      caseStudyCount: 0,
      timeLimit: "Untimed",
    },
  },
  "DP-900": {
    slug: "dp-900",
    title: "Microsoft Azure DP-900 Practice Exam",
    metaTitle: "DP-900 Practice Exams | FabricPrep",
    metaDescription:
      "Free DP-900 practice questions for the Microsoft Azure Data Fundamentals exam, sourced from official Microsoft Learn docs. Timed mock exams included.",
    studyGuide: true,
    mock: {
      caseStudyQuestions: 0,
      standaloneQuestions: 32,
      totalQuestions: 32,
      timeMinutes: 45,
    },
    practice: {
      caseStudyCount: 0,
      timeLimit: "Untimed",
    },
  },
  "AZ-104": {
    slug: "az-104",
    title: "Microsoft Azure AZ-104 Practice Exam",
    metaTitle: "AZ-104 Practice Exams | FabricPrep",
    metaDescription:
      "Free AZ-104 practice questions for the Microsoft Azure Administrator Associate exam, sourced from official Microsoft Learn docs. Timed mock exams included.",
    studyGuide: true,
    mock: {
      caseStudyQuestions: 0,
      standaloneQuestions: 40,
      totalQuestions: 40,
      timeMinutes: 60,
    },
    practice: {
      caseStudyCount: 0,
      timeLimit: "Untimed",
    },
  },
  "AI-901": {
    slug: "ai-901",
    title: "Microsoft Azure AI-901 Practice Exam",
    metaTitle: "AI-901 Practice Exams | FabricPrep",
    metaDescription:
      "Free AI-901 practice questions for the Microsoft Azure AI Fundamentals exam, sourced from official Microsoft Learn docs. Timed mock exams included.",
    studyGuide: true,
    mock: {
      caseStudyQuestions: 0,
      standaloneQuestions: 32,
      totalQuestions: 32,
      timeMinutes: 45,
    },
    practice: {
      caseStudyCount: 0,
      timeLimit: "Untimed",
    },
  },
  "PL-300": {
    slug: "pl-300",
    title: "Microsoft Power BI PL-300 Practice Exam",
    metaTitle: "PL-300 Practice Exams | FabricPrep",
    metaDescription:
      "Free PL-300 practice questions for the Microsoft Power BI Data Analyst Associate exam, sourced from official Microsoft Learn docs. Timed mock exams included.",
    studyGuide: true,
    mock: {
      caseStudyQuestions: 0,
      standaloneQuestions: 40,
      totalQuestions: 40,
      timeMinutes: 60,
    },
    practice: {
      caseStudyCount: 0,
      timeLimit: "Untimed",
    },
  },
  "DP-800": {
    slug: "dp-800",
    title: "Microsoft Certified: SQL AI Developer Associate (DP-800)",
    metaTitle: "DP-800 Practice Exams | FabricPrep",
    metaDescription:
      "Free DP-800 practice questions for the Microsoft SQL AI Developer Associate certification, based on the official Developing AI-Enabled Database Solutions study guide.",
    studyGuide: true,
    mock: {
      caseStudyQuestions: 0,
      standaloneQuestions: 30,
      totalQuestions: 30,
      timeMinutes: 60,
    },
    practice: {
      caseStudyCount: 0,
      timeLimit: "Untimed",
    },
  },
};

export const EXAM_CODES = Object.freeze(Object.keys(EXAM_CATALOG));

export const EXAM_META = Object.freeze(
  Object.fromEntries(
    Object.entries(EXAM_CATALOG).map(([code, { studyGuide, mock, practice, ...meta }]) => [code, meta])
  )
);

export const SLUG_TO_EXAM = Object.freeze(
  Object.fromEntries(Object.entries(EXAM_META).map(([code, meta]) => [meta.slug, code]))
);

export const STUDY_GUIDE_EXAM_CODES = Object.freeze(
  EXAM_CODES.filter((code) => EXAM_CATALOG[code].studyGuide)
);

export const STUDY_GUIDE_EXAMS = new Set(STUDY_GUIDE_EXAM_CODES);

export const GUEST_MOCK_CONFIG = Object.freeze({
  caseStudyQuestions: 0,
  standaloneQuestions: 5,
  totalQuestions: 5,
  timeMinutes: 5,
});

export function getMockConfig(examCode) {
  return EXAM_CATALOG[examCode]?.mock ?? GUEST_MOCK_CONFIG;
}

export function getPracticeConfig(examCode) {
  return EXAM_CATALOG[examCode]?.practice ?? { caseStudyCount: 0, timeLimit: "Untimed" };
}

export const DP700_TOPIC_IDS = Object.freeze([
  "ingestion",
  "fabric-foundations",
  "spark-notebooks",
  "lakehouse-delta",
  "warehouse",
  "real-time-intelligence",
  "monitoring",
  "cicd-lifecycle",
  "security",
  "scenario-guide",
]);

export const ROUTE_PATHS = Object.freeze({
  dashboard: "dashboard",
  login: "login",
  studyGuides: "study-guides",
  dp700StudyGuideTopic: "study-guides/dp-700/:topicId",
  studyGuideDetail: "study-guides/:examSlug",
  exam: ":examSlug",
});

export const SSG_ROUTES = Object.freeze([
  "/",
  "/study-guides",
  "/study-guides/shared",
  "/study-guides/shared/dataflows-pipelines",
  "/study-guides/shared/spark-notebooks-delta",
  "/study-guides/shared/eventhouse-kql",
    "/study-guides/shared/warehouse-dimensional-modeling",
    "/study-guides/shared/monitoring-optimization",
    "/study-guides/shared/security-governance",
    "/study-guides/shared/lifecycle-orchestration",
  ...EXAM_CODES.map((code) => `/${EXAM_META[code].slug}`),
  ...STUDY_GUIDE_EXAM_CODES.map((code) => `/study-guides/${EXAM_META[code].slug}`),
  ...DP700_TOPIC_IDS.map((topicId) => `/study-guides/dp-700/${topicId}`),
]);

export const SITEMAP_ROUTES = Object.freeze([
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/study-guides", priority: "0.9", changefreq: "weekly" },
  { path: "/study-guides/shared", priority: "0.8", changefreq: "monthly" },
  { path: "/study-guides/shared/dataflows-pipelines", priority: "0.8", changefreq: "monthly" },
  { path: "/study-guides/shared/spark-notebooks-delta", priority: "0.8", changefreq: "monthly" },
  { path: "/study-guides/shared/eventhouse-kql", priority: "0.8", changefreq: "monthly" },
    { path: "/study-guides/shared/warehouse-dimensional-modeling", priority: "0.8", changefreq: "monthly" },
    { path: "/study-guides/shared/monitoring-optimization", priority: "0.8", changefreq: "monthly" },
    { path: "/study-guides/shared/security-governance", priority: "0.8", changefreq: "monthly" },
    { path: "/study-guides/shared/lifecycle-orchestration", priority: "0.8", changefreq: "monthly" },
  ...EXAM_CODES.map((code) => ({
    path: `/${EXAM_META[code].slug}`,
    priority: "0.9",
    changefreq: "weekly",
  })),
  ...STUDY_GUIDE_EXAM_CODES.map((code) => ({
    path: `/study-guides/${EXAM_META[code].slug}`,
    priority: "0.8",
    changefreq: "monthly",
  })),
  ...DP700_TOPIC_IDS.map((topicId) => ({
    path: `/study-guides/dp-700/${topicId}`,
    priority: "0.7",
    changefreq: "monthly",
  })),
]);

// Builds a schema.org BreadcrumbList JSON-LD object from an ordered list of
// { name, path } crumbs. `path` is relative to SITE_ORIGIN (e.g. "study-guides");
// omit `path` on the final/current crumb if it shouldn't link anywhere.
export function buildBreadcrumbSchema(crumbs) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      ...(crumb.path !== undefined ? { item: `${SITE_ORIGIN}/${crumb.path}` } : {}),
    })),
  };
}
