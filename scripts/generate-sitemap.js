// Generates sitemap.xml and robots.txt after the SSG build.
// Slugs are duplicated here (rather than imported) since this script runs
// under plain Node, not Vite, and can't load .jsx source directly.
import { writeFileSync } from "fs";

const HOSTNAME = "https://fabricprep.com";
const SLUGS = ["dp-700", "dp-600", "az-900", "dp-900", "az-104", "ai-900"];
const routes = ["/", "/dashboard", "/study-guides", ...SLUGS.map((s) => `/${s}`)];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((r) => `  <url><loc>${HOSTNAME}${r}</loc></url>`).join("\n")}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${HOSTNAME}/sitemap.xml
`;

writeFileSync("dist/sitemap.xml", sitemap);
writeFileSync("dist/robots.txt", robots);
console.log(`Generated sitemap.xml and robots.txt for ${routes.length} routes.`);
