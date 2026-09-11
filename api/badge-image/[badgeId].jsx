import { ImageResponse } from "@vercel/og";

// Renders a 1200x630 LinkedIn/Open Graph preview image for one specific
// badge (tier + exam + score), so every certification/tier combination gets
// its own accurate picture instead of a generic site banner.
export const config = { runtime: "edge" };

const FIRESTORE_PROJECT_ID = "fabricprep-65092";

const TIER_STYLES = {
  proven: {
    bgFrom: "#F4FBF8",
    bgTo: "#E1F3EA",
    accent: "#0F9D74",
    accentDeep: "#0B6E52",
    ink: "#123B33",
    inkMuted: "#4B7268",
    pillText: "#FFFFFF",
    label: "PROVEN",
  },
  mastery: {
    bgFrom: "#16264A",
    bgTo: "#0A1730",
    accent: "#5B9BFF",
    accentDeep: "#1D4ED8",
    ink: "#FFFFFF",
    inkMuted: "#9FB4D9",
    pillText: "#FFFFFF",
    label: "MASTERY",
  },
  elite: {
    bgFrom: "#1C1A16",
    bgTo: "#000000",
    accent: "#F0C24B",
    accentDeep: "#C9942B",
    ink: "#FFFFFF",
    inkMuted: "#C9B067",
    pillText: "#3A2600",
    label: "ELITE",
  },
};

// Kept in sync with EXAM_CATALOG's `label` field in src/lib/examCatalog.js —
// duplicated here since that module isn't safe to import into an Edge
// Function bundle (keeps this function's dependency graph self-contained).
const EXAM_LABELS = {
  "DP-700": "Fabric Data Engineer Associate",
  "DP-600": "Fabric Analytics Engineer Associate",
  "AZ-900": "Azure Fundamentals",
  "DP-900": "Azure Data Fundamentals",
  "AZ-104": "Azure Administrator Associate",
  "AI-901": "Azure AI Fundamentals (Foundry)",
  "PL-300": "Power BI Data Analyst Associate",
  "DP-800": "Developing AI-Enabled Database Solutions",
  "SC-900": "Security, Compliance, and Identity Fundamentals",
};

async function loadGoogleFont(family, weight) {
  const cssUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}&display=swap`;
  const css = await (await fetch(cssUrl)).text();
  const match = css.match(/src: url\(([^)]+)\)/);
  if (!match) return null;
  const fontRes = await fetch(match[1]);
  return fontRes.arrayBuffer();
}

async function loadFonts() {
  const [displayBold, monoRegular] = await Promise.all([
    loadGoogleFont("Space Grotesk", 700),
    loadGoogleFont("JetBrains Mono", 400),
  ]);

  const fonts = [];
  if (displayBold) fonts.push({ name: "Space Grotesk", data: displayBold, weight: 700, style: "normal" });
  if (monoRegular) fonts.push({ name: "JetBrains Mono", data: monoRegular, weight: 400, style: "normal" });
  return fonts;
}

async function fetchBadge(badgeId) {
  const res = await fetch(
    `https://firestore.googleapis.com/v1/projects/${FIRESTORE_PROJECT_ID}/databases/(default)/documents/badges/${badgeId}`
  );
  if (!res.ok) return null;

  const doc = await res.json();
  return {
    examCode: doc.fields?.examCode?.stringValue || "",
    tier: doc.fields?.tier?.stringValue || "proven",
    score: doc.fields?.score?.integerValue ?? doc.fields?.score?.doubleValue ?? "",
  };
}

export default async function handler(request) {
  const url = new URL(request.url);
  const badgeId = url.pathname.split("/").filter(Boolean).pop();

  const [badge, fonts] = await Promise.all([fetchBadge(badgeId).catch(() => null), loadFonts().catch(() => [])]);

  const style = TIER_STYLES[badge?.tier] || TIER_STYLES.proven;
  const examCode = badge?.examCode || "FabricPrep";
  const examLabel = EXAM_LABELS[badge?.examCode] || "Skills Assessment";
  const score = badge?.score ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: `linear-gradient(135deg, ${style.bgFrom}, ${style.bgTo})`,
          fontFamily: "Space Grotesk",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 340,
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 230,
              height: 270,
              background: `linear-gradient(160deg, ${style.accent}, ${style.accentDeep})`,
              clipPath: "polygon(50% 0%, 100% 18%, 100% 55%, 74% 92%, 50% 100%, 26% 92%, 0% 55%, 0% 18%)",
            }}
          >
            <span style={{ fontSize: 96, fontWeight: 700, color: style.bgTo }}>FP</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 64px 0 12px",
            flex: 1,
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", marginBottom: 8 }}>
            <span style={{ fontSize: 32, fontWeight: 700, color: style.ink }}>Fabric</span>
            <span style={{ fontSize: 32, fontWeight: 700, color: style.accent }}>Prep</span>
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "JetBrains Mono",
              fontSize: 15,
              letterSpacing: 4,
              color: style.inkMuted,
              marginBottom: 22,
            }}
          >
            LEARN · PRACTICE · SUCCEED
          </div>
          <div style={{ display: "flex", fontSize: 64, fontWeight: 700, color: style.accent, marginBottom: 6 }}>
            {style.label}
          </div>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 700, color: style.ink }}>{examCode}</div>
          <div
            style={{
              display: "flex",
              fontFamily: "JetBrains Mono",
              fontSize: 18,
              color: style.inkMuted,
              marginBottom: 22,
            }}
          >
            {examLabel}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px 30px",
              borderRadius: 999,
              background: `linear-gradient(90deg, ${style.accent}, ${style.accentDeep})`,
              color: style.pillText,
              fontSize: 26,
              fontWeight: 700,
              marginBottom: 18,
            }}
          >
            {score}%+
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "JetBrains Mono",
              fontSize: 14,
              letterSpacing: 3,
              color: style.inkMuted,
            }}
          >
            SKILLS ASSESSMENT · ISSUED BY FABRICPREP.COM
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts,
    }
  );
}
