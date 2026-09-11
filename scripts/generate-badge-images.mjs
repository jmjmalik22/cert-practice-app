// One-off generator for the static per-badge social-preview images
// (public/badge-images/<tier>-<examCode>.png), one per tier x exam
// combination. Run manually with `npm run generate:badges` whenever
// BadgeShield's artwork or the exam catalog changes; the output is
// committed to git and served as a plain static file, so there's no
// runtime function involved.
//
// Renders the real BadgeShield component (src/components/BadgeShield.jsx)
// via esbuild + ReactDOMServer, so the shared image is pixel-for-pixel the
// same artwork users see on the Dashboard — not a lookalike redrawn by hand.
import { writeFileSync, mkdirSync, rmSync } from "fs";
import { fileURLToPath } from "url";
import * as esbuild from "esbuild";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Resvg } from "@resvg/resvg-js";
import { EXAM_CODES, EXAM_META } from "../src/lib/examCatalog.js";

// resvg only parses raw sfnt (ttf/otf), not woff/woff2/eot. Google Fonts'
// CSS API serves woff2 to modern browsers and eot to old IE — old Android
// browsers (no woff support) are the ones that get a plain .ttf.
const LEGACY_USER_AGENT = "Mozilla/5.0 (Linux; U; Android 2.3.3)";

async function downloadGoogleFontTtf(family, weight, outPath) {
  const cssUrl = `https://fonts.googleapis.com/css?family=${encodeURIComponent(family)}:${weight}`;
  const css = await (await fetch(cssUrl, { headers: { "User-Agent": LEGACY_USER_AGENT } })).text();
  const match = css.match(/url\(([^)]+)\)/);
  if (!match) throw new Error(`Could not resolve a font file URL for ${family} ${weight}`);
  const fontBuffer = await (await fetch(match[1])).arrayBuffer();
  writeFileSync(outPath, Buffer.from(fontBuffer));
}

const h = React.createElement;

// Kept in sync with BADGE_TIERS in src/lib/badges.js — duplicated here
// since that module imports the Firebase client SDK (via ./firebase),
// which uses extensionless imports Node's plain ESM loader can't resolve
// outside of Vite's bundler.
const BADGE_TIERS = [
  { id: "elite", label: "ELITE", minPercentage: 95, canvasFrom: "#1C1A16", canvasTo: "#000000" },
  { id: "mastery", label: "MASTERY", minPercentage: 90, canvasFrom: "#16264A", canvasTo: "#0A1730" },
  { id: "proven", label: "PROVEN", minPercentage: 80, canvasFrom: "#F4FBF8", canvasTo: "#E1F3EA" },
];

const CANVAS_WIDTH = 1200;
const CANVAS_HEIGHT = 630;
const SHIELD_SIZE = 480; // width in px; BadgeShield's own aspect ratio (340:420) sets the height

async function loadBadgeShield() {
  const result = await esbuild.build({
    entryPoints: ["src/components/BadgeShield.jsx"],
    bundle: true,
    write: false,
    format: "esm",
    platform: "node",
    jsx: "automatic",
    external: ["react", "react-dom"],
  });
  const outFile = new URL("./.badge-shield.generated.mjs", import.meta.url);
  writeFileSync(outFile, result.outputFiles[0].text);
  try {
    return (await import(outFile.href)).BadgeShield;
  } finally {
    rmSync(outFile);
  }
}

function renderCard({ BadgeShield, tier, examCode, examLabel }) {
  const shieldHeight = (SHIELD_SIZE * 420) / 340;
  const shieldMarkup = renderToStaticMarkup(
    h(BadgeShield, { tier: tier.id, examCode, examLabel, score: tier.minPercentage, size: SHIELD_SIZE })
  );
  // Reposition the shield's own self-contained <svg ...> as a nested SVG
  // element, centered on the OG canvas — its internal viewBox/artwork is
  // untouched, only x/y placement changes.
  const x = (CANVAS_WIDTH - SHIELD_SIZE) / 2;
  const y = (CANVAS_HEIGHT - shieldHeight) / 2;
  const nestedShield = shieldMarkup.replace("<svg ", `<svg x="${x}" y="${y}" `);

  const svg = `<svg width="${CANVAS_WIDTH}" height="${CANVAS_HEIGHT}" viewBox="0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="canvas-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${tier.canvasFrom}" />
      <stop offset="100%" stop-color="${tier.canvasTo}" />
    </linearGradient>
  </defs>
  <rect width="${CANVAS_WIDTH}" height="${CANVAS_HEIGHT}" fill="url(#canvas-bg)" />
  ${nestedShield}
</svg>`;

  // BadgeShield's font-family values are quoted CSS lists (e.g.
  // "'Space Grotesk', sans-serif") for browser use; resvg's attribute
  // parser doesn't strip the quotes, so it fails to match the loaded font
  // and silently renders no text at all. Strip them — nothing else in
  // this generated SVG uses single quotes.
  return svg.replace(/'/g, "");
}

async function main() {
  const BadgeShield = await loadBadgeShield();
  mkdirSync("public/badge-images", { recursive: true });

  const displayFontPath = new URL("./.space-grotesk-bold.ttf", import.meta.url);
  const monoFontPath = new URL("./.jetbrains-mono-regular.ttf", import.meta.url);
  await downloadGoogleFontTtf("Space Grotesk", 700, displayFontPath);
  await downloadGoogleFontTtf("JetBrains Mono", 400, monoFontPath);

  try {
    for (const examCode of EXAM_CODES) {
      const examLabel = EXAM_META[examCode].label;
      for (const tier of BADGE_TIERS) {
        const svg = renderCard({ BadgeShield, tier, examCode, examLabel });
        const png = new Resvg(svg, {
          fitTo: { mode: "width", value: CANVAS_WIDTH },
          font: {
            loadSystemFonts: false,
            fontFiles: [fileURLToPath(displayFontPath), fileURLToPath(monoFontPath)],
            defaultFontFamily: "Space Grotesk",
          },
        })
          .render()
          .asPng();
        const outPath = `public/badge-images/${tier.id}-${examCode}.png`;
        writeFileSync(outPath, png);
        console.log(`Generated ${outPath}`);
      }
    }
  } finally {
    rmSync(displayFontPath, { force: true });
    rmSync(monoFontPath, { force: true });
  }
}

main();
