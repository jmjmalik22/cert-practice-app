import { GUEST_MOCK_CONFIG, SITEMAP_ROUTES, SSG_ROUTES, SITE_ORIGIN, STUDY_GUIDE_EXAM_CODES, getMockConfig } from "../src/lib/examCatalog.js";
import { EXAM_CODES, EXAM_META, QUESTION_BANK, SLUG_TO_EXAM } from "../src/lib/questionBank/index.js";

const errors = [];

function assert(condition, message) {
  if (!condition) errors.push(message);
}

function sorted(values) {
  return [...values].sort();
}

const bankCodes = Object.keys(QUESTION_BANK);
assert(
  JSON.stringify(sorted(bankCodes)) === JSON.stringify(sorted(EXAM_CODES)),
  `QUESTION_BANK exams do not match EXAM_CODES. Bank=${bankCodes.join(", ")} Catalog=${EXAM_CODES.join(", ")}`
);

const globalQuestionIds = new Map();

for (const code of EXAM_CODES) {
  const exam = QUESTION_BANK[code];
  const meta = EXAM_META[code];

  assert(exam, `${code} is missing from QUESTION_BANK`);
  assert(meta, `${code} is missing from EXAM_META`);
  if (!exam || !meta) continue;

  assert(typeof exam.label === "string" && exam.label.length > 0, `${code} is missing a label`);
  assert(Array.isArray(exam.questions) && exam.questions.length > 0, `${code} has no questions`);
  assert(typeof meta.slug === "string" && meta.slug.length > 0, `${code} is missing a slug`);
  assert(SLUG_TO_EXAM[meta.slug] === code, `${code} slug does not resolve back through SLUG_TO_EXAM`);

  const mock = getMockConfig(code);
  assert(mock.totalQuestions <= exam.questions.length, `${code} mock exam asks for more questions than exist`);
  assert(
    mock.caseStudyQuestions + mock.standaloneQuestions === mock.totalQuestions,
    `${code} mock exam sections do not add up to totalQuestions`
  );

  for (const question of exam.questions) {
    assert(question.id, `${code} has a question without an id`);
    if (!question.id) continue;

    if (globalQuestionIds.has(question.id)) {
      errors.push(`${question.id} is duplicated in ${globalQuestionIds.get(question.id)} and ${code}`);
    }
    globalQuestionIds.set(question.id, code);

    assert(typeof question.domain === "string" && question.domain.length > 0, `${code}/${question.id} is missing domain`);
    assert(typeof question.question === "string" && question.question.length > 0, `${code}/${question.id} is missing question text`);
    assert(Array.isArray(question.options) && question.options.length >= 2, `${code}/${question.id} needs at least two options`);
    assert(typeof question.correct === "string" && question.correct.length > 0, `${code}/${question.id} is missing correct answer id`);
    assert(typeof question.explanation === "string" && question.explanation.length > 0, `${code}/${question.id} is missing explanation`);

    if (Array.isArray(question.options)) {
      const optionIds = question.options.map((option) => option.id);
      assert(new Set(optionIds).size === optionIds.length, `${code}/${question.id} has duplicate option ids`);
      assert(optionIds.includes(question.correct), `${code}/${question.id} correct answer does not match an option id`);

      for (const option of question.options) {
        assert(typeof option.text === "string" && option.text.length > 0, `${code}/${question.id}/${option.id} is missing option text`);
      }
    }
  }
}

assert(SITE_ORIGIN.startsWith("https://"), "SITE_ORIGIN must be an HTTPS URL");
assert(GUEST_MOCK_CONFIG.totalQuestions === 5, "Guest mock exam should stay at 5 questions");
assert(GUEST_MOCK_CONFIG.timeMinutes === 5, "Guest mock exam should stay at 5 minutes");

const expectedStaticRoutes = new Set([
  "/",
  "/study-guides",
  "/study-guides/shared",
  "/study-guides/shared/dataflows-pipelines",
  ...EXAM_CODES.map((code) => `/${EXAM_META[code].slug}`),
  ...STUDY_GUIDE_EXAM_CODES.map((code) => `/study-guides/${EXAM_META[code].slug}`),
  "/study-guides/dp-700/ingestion",
  "/study-guides/dp-700/monitoring",
  "/study-guides/dp-700/security",
]);

for (const route of expectedStaticRoutes) {
  assert(SSG_ROUTES.includes(route), `SSG_ROUTES is missing ${route}`);
  assert(SITEMAP_ROUTES.some((item) => item.path === route), `SITEMAP_ROUTES is missing ${route}`);
}

assert(new Set(SSG_ROUTES).size === SSG_ROUTES.length, "SSG_ROUTES contains duplicates");
assert(new Set(SITEMAP_ROUTES.map((item) => item.path)).size === SITEMAP_ROUTES.length, "SITEMAP_ROUTES contains duplicates");

if (errors.length > 0) {
  console.error(`Question bank validation failed with ${errors.length} issue(s):`);
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(`Validated ${EXAM_CODES.length} exams and ${globalQuestionIds.size} questions.`);
