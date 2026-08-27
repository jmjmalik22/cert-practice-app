// Generates sitemap.xml and robots.txt after the SSG build.
// Updated: 2026-08-25 with SEO improvements (lastmod, priority, changefreq)
// Slugs are duplicated here (rather than imported) since this script runs
// under plain Node, not Vite, and can't load .jsx source directly.
import { writeFileSync } from "fs";

const HOSTNAME = "https://fabricprep.com";
const SLUGS = ["dp-700", "dp-600", "az-900", "dp-900"];

// Define routes with metadata for better SEO
const routes = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/dashboard", priority: "0.8", changefreq: "weekly" },
  { path: "/study-guides", priority: "0.9", changefreq: "weekly" },
  ...SLUGS.map((s) => ({ path: `/${s}`, priority: "0.9", changefreq: "weekly" })),
  ...SLUGS.map((s) => ({ path: `/study-guides/${s}`, priority: "0.8", changefreq: "monthly" })),
  // DP-700 detailed topic pages
  { path: "/study-guides/dp-700/ingestion", priority: "0.7", changefreq: "monthly" },
  { path: "/study-guides/dp-700/monitoring", priority: "0.7", changefreq: "monthly" },
  { path: "/study-guides/dp-700/security", priority: "0.7", changefreq: "monthly" },
];

const today = new Date().toISOString().split("T")[0];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((r) => `  <url>
    <loc>${HOSTNAME}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`).join("\n")}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${HOSTNAME}/sitemap.xml
`;

writeFileSync("dist/sitemap.xml", sitemap);
writeFileSync("dist/robots.txt", robots);
console.log(`Generated sitemap.xml and robots.txt for ${routes.length} routes.`);
