import { AZ_104 } from "./az104.js";
import { AZ_900 } from "./az900.js";
import { AI_901 } from "./ai901.js";
import { DP_600 } from "./dp600.js";
import { DP_700 } from "./dp700.js";
import { DP_900 } from "./dp900.js";
import { PL_300 } from "./pl300.js";
import { DP_800 } from "./dp800.js";
import { EXAM_CODES, EXAM_META, SLUG_TO_EXAM } from "../examCatalog.js";

export const QUESTION_BANK = {
  "DP-700": DP_700,
  "DP-600": DP_600,
  "AZ-900": AZ_900,
  "DP-900": DP_900,
  "AZ-104": AZ_104,
  "AI-901": AI_901,
  "PL-300": PL_300,
  "DP-800": DP_800,
};

export { EXAM_CODES, EXAM_META, SLUG_TO_EXAM };
