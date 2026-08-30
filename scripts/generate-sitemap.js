// Generates sitemap.xml and robots.txt after the SSG build.
// Updated: 2026-08-25 with SEO improvements (lastmod, priority, changefreq)
import { writeFileSync } from "fs";
import { SITEMAP_ROUTES, SITE_ORIGIN } from "../src/lib/examCatalog.js";

const today = new Date().toISOString().split("T")[0];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${SITEMAP_ROUTES.map((r) => `  <url>
    <loc>${SITE_ORIGIN}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`).join("\n")}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_ORIGIN}/sitemap.xml
`;

writeFileSync("dist/sitemap.xml", sitemap);
writeFileSync("dist/robots.txt", robots);
console.log(`Generated sitemap.xml and robots.txt for ${SITEMAP_ROUTES.length} routes.`);
