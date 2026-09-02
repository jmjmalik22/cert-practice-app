import fs from "fs";
import path from "path";
import vm from "vm";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputFile = process.argv[2]
  ? path.resolve(process.cwd(), process.argv[2])
  : path.join(__dirname, "../questionBank.jsx");
const outputDir = __dirname;

const examFiles = {
  "DP-700": { fileName: "dp700.js", varName: "DP_700" },
  "DP-600": { fileName: "dp600.js", varName: "DP_600" },
  "AZ-900": { fileName: "az900.js", varName: "AZ_900" },
  "DP-900": { fileName: "dp900.js", varName: "DP_900" },
  "AZ-104": { fileName: "az104.js", varName: "AZ_104" },
  "AI-901": { fileName: "ai901.js", varName: "AI_901" },
  "PL-300": { fileName: "pl300.js", varName: "PL_300" },
  "DP-800": { fileName: "dp800.js", varName: "DP_800" },
};

function readLegacyQuestionBank(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const runnable = content.replace(/\bexport const\b/g, "const");
  const context = {};

  vm.runInNewContext(
    `${runnable}\nresult = { QUESTION_BANK };`,
    context,
    { filename: filePath }
  );

  return context.result.QUESTION_BANK;
}

console.log(`Reading question bank from ${inputFile}...`);
const questionBank = readLegacyQuestionBank(inputFile);

for (const [code, { fileName, varName }] of Object.entries(examFiles)) {
  const data = questionBank[code];
  if (!data) {
    throw new Error(`Missing ${code} in ${inputFile}`);
  }

  const fileContent = `export const ${varName} = ${JSON.stringify(data, null, 2)};\n`;
  fs.writeFileSync(path.join(outputDir, fileName), fileContent, "utf8");
  console.log(`Created ${fileName}`);
}

console.log("Done.");
