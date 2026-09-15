import { Head as Helmet } from "vite-react-ssg";
import { SITE_ORIGIN } from "../lib/examCatalog.js";

/**
 * The title / canonical / description / Open Graph set every indexable page
 * needs, in one place.
 *
 * Pages used to hand-roll this, and the easy half (title, canonical,
 * description) was always remembered while the og:* half was not — which is
 * how the site ended up with 60+ pages that had perfectly good titles and no
 * social card at all, sharing as bare URLs on LinkedIn.
 *
 * Deliberately NOT here: og:image, og:site_name and og:locale. Those are
 * identical on every route, so they live once in index.html rather than being
 * re-emitted per page.
 *
 * @param path Relative to the origin, no leading slash — "about",
 *   "study-guides/shared". Pass "" for the homepage.
 * @param type og:type; "article" for study-guide content, "website" otherwise.
 * @param children Extra <Helmet> children, e.g. JSON-LD <script> blocks.
 */
export function PageSeo({ title, description, path, type = "website", children }) {
  const url = `${SITE_ORIGIN}/${path}`;
  return (
    <Helmet>
      <title>{title}</title>
      <link rel="canonical" href={url} />
      <meta name="description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {children}
    </Helmet>
  );
}
