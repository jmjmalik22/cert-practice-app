import { DP700_TOPICS } from "./dp700.js";
import { AZ104_TOPICS } from "./az104.js";

// Registry of exam -> in-depth, per-domain study guide topics.
// Adding a new exam here (plus its topic IDs in examCatalog.js) is
// enough to get topic pages, sitemap entries, and study-guide links for it.
export const STUDY_TOPICS_BY_EXAM = {
  "DP-700": DP700_TOPICS,
  "AZ-104": AZ104_TOPICS,
};

export function getStudyTopics(examCode) {
  return STUDY_TOPICS_BY_EXAM[examCode] || null;
}
