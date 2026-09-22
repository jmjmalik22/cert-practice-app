// Generates dist/app-shell.html after the SSG build — a neutral fallback for
// routes with no pre-rendered file: /verify/:badgeId (badges are minted at
// runtime, so no build-time HTML can exist for a given id) and any
// genuinely-unmatched path the catch-all rewrite hits.
//
// vercel.json previously pointed those rewrites at /index.html, which is the
// Home page's own pre-rendered markup (hero, exam grid, testimonials). The
// client router then had to hydrate a totally different component (VerifyBadge,
// a study-guide topic page, ...) on top of Home's DOM, which is a real content
// mismatch — React logs hydration errors (#418/#423/#425) and has to discard
// the mismatched tree and re-render from scratch, causing a visible flash of
// the wrong page before the correct one appears.
//
// app-shell.html is index.html with the pre-rendered #root content stripped
// back to empty, so the client bundle does a normal first client render for
// these routes instead of a mismatched hydration — no wrong content, no
// console errors, no flash of the Home page.
import { readFileSync, writeFileSync } from "fs";

const distIndexPath = "dist/index.html";
const distShellPath = "dist/app-shell.html";

const html = readFileSync(distIndexPath, "utf8");

const rootStart = html.indexOf('<div id="root"');
const rootOpenEnd = html.indexOf(">", rootStart) + 1;
const hydrationScriptIdx = html.indexOf("<script>window.__staticRouterHydrationData");
if (rootStart === -1 || hydrationScriptIdx === -1) {
  throw new Error(
    "generate-app-shell: could not find expected #root / hydration-data markers in dist/index.html — vite-react-ssg's output shape may have changed."
  );
}
const closeDivIdx = html.lastIndexOf("</div>", hydrationScriptIdx);

const shellHtml =
  html.slice(0, rootOpenEnd) +
  html
    .slice(closeDivIdx)
    .replace(/<script>window\.__staticRouterHydrationData[^<]*<\/script>/, "");

writeFileSync(distShellPath, shellHtml);
console.log(`Generated ${distShellPath} (${shellHtml.length} bytes, was ${html.length} bytes as index.html)`);
