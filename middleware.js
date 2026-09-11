import { next } from "@vercel/edge";

// Only intervene on badge verification links — everywhere else falls
// straight through to the normal static/SPA response.
export const config = {
  matcher: ["/verify/:badgeId"],
};

const CRAWLER_USER_AGENT = /linkedinbot|facebookexternalhit|twitterbot|slackbot|discordbot|telegrambot|whatsapp|pinterest|redditbot|embedly|quora link preview|vkshare|skypeuripreview|w3c_validator|opengraph/i;

const FIRESTORE_PROJECT_ID = "fabricprep-65092";
const FALLBACK_OG_IMAGE = "https://fabricprep.com/og-image.png";

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]
  ));
}

function renderMetaPage({ title, description, url, image = FALLBACK_OG_IMAGE }) {
  const safeTitle = escapeHtml(title);
  const safeDescription = escapeHtml(description);
  const safeUrl = escapeHtml(url);
  const safeImage = escapeHtml(image);

  return `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<title>${safeTitle}</title>
<meta name="description" content="${safeDescription}" />
<meta property="og:type" content="website" />
<meta property="og:title" content="${safeTitle}" />
<meta property="og:description" content="${safeDescription}" />
<meta property="og:image" content="${safeImage}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:url" content="${safeUrl}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${safeTitle}" />
<meta name="twitter:description" content="${safeDescription}" />
<meta name="twitter:image" content="${safeImage}" />
</head>
<body></body>
</html>`;
}

function metaResponse(fields) {
  return new Response(renderMetaPage(fields), {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

export default async function middleware(request) {
  const userAgent = request.headers.get("user-agent") || "";
  if (!CRAWLER_USER_AGENT.test(userAgent)) {
    return next();
  }

  const url = new URL(request.url);
  const badgeId = url.pathname.split("/").filter(Boolean).pop();

  try {
    const firestoreRes = await fetch(
      `https://firestore.googleapis.com/v1/projects/${FIRESTORE_PROJECT_ID}/databases/(default)/documents/badges/${badgeId}`
    );

    if (!firestoreRes.ok) {
      return metaResponse({
        title: "Badge not found | FabricPrep",
        description: "This verification link doesn't match any FabricPrep badge on record.",
        url: url.toString(),
      });
    }

    const doc = await firestoreRes.json();
    const examCode = doc.fields?.examCode?.stringValue || "";
    const tier = doc.fields?.tier?.stringValue || "";
    const score = doc.fields?.score?.integerValue ?? doc.fields?.score?.doubleValue ?? "";

    return metaResponse({
      title: `FabricPrep ${tier.toUpperCase()} Badge — ${examCode}`,
      description: `Awarded for achieving ${score}%+ on the FabricPrep ${examCode} Skills Assessment. Issued by FabricPrep — an independent learning platform; not a Microsoft certification.`,
      url: url.toString(),
      // A static, pre-rendered file (one per tier x exam, see
      // scripts/generate-badge-images.mjs) rather than a function — a
      // dynamic per-score image kept failing to deploy (see git history),
      // and a plain static file has no runtime to break.
      image: `${url.origin}/badge-images/${tier}-${examCode}.png`,
    });
  } catch {
    // Firestore lookup failed for some other reason — fall through to the
    // normal SPA response rather than serve a broken crawler page.
    return next();
  }
}
