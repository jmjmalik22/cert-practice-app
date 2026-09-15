// Generates public/og-image.png — the social preview card every page points
// at via og:image in index.html. Run with `npm run generate:og`.
//
// This replaces the manual "screenshot og-image-template.html at 1200x630"
// process, which was too easy to get wrong: that template carries a
// `@media (max-width: 1300px) { transform: scale(0.5) }` rule for on-screen
// viewing, so a screenshot taken in a window narrower than 1300px silently
// captures a half-size card. That is how the committed image ended up 446x228
// — well under the 1200x630 LinkedIn/X/Facebook want — which downgraded the
// preview on every page of the site.
//
// Same rendering pipeline as scripts/generate-badge-images.mjs: build an SVG,
// rasterise it with resvg at an exact size. Fonts are the site's own
// (Space Grotesk display, Inter body) rather than the template's Segoe UI, so
// the card matches the real header wordmark and the badge images.
import { writeFileSync, readFileSync, rmSync } from "fs";
import { fileURLToPath } from "url";
import { Resvg } from "@resvg/resvg-js";
import { EXAM_CODES, EXAM_META } from "../src/lib/examCatalog.js";

// Counted from the catalog rather than hardcoded. og-image-template.html says
// "1000+ Practice Questions"; the bank actually holds 824, and a social card
// is the worst place to overstate a number. This also keeps the claim true as
// questions are added, instead of drifting the other way.
const QUESTION_COUNT = EXAM_CODES.reduce((sum, code) => sum + EXAM_META[code].questionCount, 0);

const WIDTH = 1200;
const HEIGHT = 630;
const OUT = "public/og-image.png";

// Duplicated from scripts/generate-badge-images.mjs rather than shared, to
// avoid touching a working generator whose 27 committed PNGs would need
// re-verifying. Worth extracting if a third script ever needs it.
//
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

function buildSvg() {
  const avatar = readFileSync("public/CoverPic_Face.jpg").toString("base64");

  // Brand row: [FP tile] gap [FabricPrep wordmark], centred as one unit.
  const ICON = 96;
  const GAP = 24;
  const BRAND_SIZE = 76;
  // resvg exposes no text metrics, so the wordmark's width is estimated to
  // centre the row. 0.522em/glyph is calibrated against the rendered PNG for
  // "FabricPrep" in Space Grotesk Bold specifically — re-measure if the
  // wordmark, font or size ever changes, or the row drifts off centre.
  const wordWidth = 10 * 0.522 * BRAND_SIZE - 9 * 2;
  const rowWidth = ICON + GAP + wordWidth;
  const rowX = (WIDTH - rowWidth) / 2;
  const rowCenterY = 236;

  // Author pill, bottom-right.
  const PHOTO = 72;
  const pillH = PHOTO + 28;
  const pillW = 24 + PHOTO + 18 + 218 + 26;
  const pillX = WIDTH - 56 - pillW;
  const pillY = HEIGHT - 44 - pillH;
  const photoX = pillX + 24;
  const photoY = pillY + (pillH - PHOTO) / 2;

  return `<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1e3a5f" />
      <stop offset="50%" stop-color="#0d2137" />
      <stop offset="100%" stop-color="#1a1a2e" />
    </linearGradient>
    <radialGradient id="glow-blue">
      <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.28" />
      <stop offset="70%" stop-color="#3b82f6" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="glow-green">
      <stop offset="0%" stop-color="#10b981" stop-opacity="0.16" />
      <stop offset="70%" stop-color="#10b981" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="tile" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#3b82f6" />
      <stop offset="100%" stop-color="#1d4ed8" />
    </linearGradient>
    <linearGradient id="wordmark" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#94a3b8" />
    </linearGradient>
    <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#ffffff" stroke-opacity="0.03" stroke-width="1" />
    </pattern>
    <clipPath id="avatar-clip">
      <circle cx="${photoX + PHOTO / 2}" cy="${photoY + PHOTO / 2}" r="${PHOTO / 2}" />
    </clipPath>
  </defs>

  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)" />
  <circle cx="${WIDTH - 90}" cy="20" r="420" fill="url(#glow-blue)" />
  <circle cx="90" cy="${HEIGHT + 20}" r="330" fill="url(#glow-green)" />
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#grid)" />

  <rect x="${rowX}" y="${rowCenterY - ICON / 2}" width="${ICON}" height="${ICON}" rx="24" fill="url(#tile)" />
  <text x="${rowX + ICON / 2}" y="${rowCenterY}" font-family="Space Grotesk" font-size="44" font-weight="700"
        fill="#ffffff" text-anchor="middle" dominant-baseline="central">FP</text>

  <text x="${rowX + ICON + GAP}" y="${rowCenterY}" font-family="Space Grotesk" font-size="${BRAND_SIZE}"
        font-weight="700" fill="url(#wordmark)" letter-spacing="-2" dominant-baseline="central">FabricPrep</text>

  <text x="${WIDTH / 2}" y="368" font-family="Inter" font-size="34" font-weight="500" fill="#cbd5e1"
        text-anchor="middle">Master Microsoft Fabric &amp; Azure Certifications</text>
  <text x="${WIDTH / 2}" y="418" font-family="Inter" font-size="34" font-weight="500" fill="#cbd5e1"
        text-anchor="middle">with ${QUESTION_COUNT}+ free practice questions</text>

  <rect x="${pillX}" y="${pillY}" width="${pillW}" height="${pillH}" rx="${pillH / 2}"
        fill="#ffffff" fill-opacity="0.06" stroke="#ffffff" stroke-opacity="0.12" stroke-width="1" />
  <image x="${photoX}" y="${photoY}" width="${PHOTO}" height="${PHOTO}"
         href="data:image/jpeg;base64,${avatar}" clip-path="url(#avatar-clip)"
         preserveAspectRatio="xMidYMid slice" />
  <circle cx="${photoX + PHOTO / 2}" cy="${photoY + PHOTO / 2}" r="${PHOTO / 2}"
          fill="none" stroke="#3b82f6" stroke-opacity="0.55" stroke-width="3" />
  <text x="${photoX + PHOTO + 18}" y="${pillY + pillH / 2}" font-family="Inter" font-size="21"
        font-weight="600" fill="#e2e8f0" dominant-baseline="central">by Jitendra Singh Malik</text>
</svg>`;
}

async function main() {
  const displayFont = new URL("./.og-space-grotesk-bold.ttf", import.meta.url);
  const bodyFont = new URL("./.og-inter-medium.ttf", import.meta.url);
  await downloadGoogleFontTtf("Space Grotesk", 700, displayFont);
  await downloadGoogleFontTtf("Inter", 600, bodyFont);

  try {
    const png = new Resvg(buildSvg(), {
      fitTo: { mode: "width", value: WIDTH },
      font: {
        loadSystemFonts: false,
        fontFiles: [fileURLToPath(displayFont), fileURLToPath(bodyFont)],
        defaultFontFamily: "Inter",
      },
    })
      .render()
      .asPng();
    writeFileSync(OUT, png);
    console.log(`Generated ${OUT} (${WIDTH}x${HEIGHT}, ${(png.length / 1024).toFixed(0)}KB)`);
  } finally {
    rmSync(displayFont, { force: true });
    rmSync(bodyFont, { force: true });
  }
}

main();
