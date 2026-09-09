import { Head as Helmet } from "vite-react-ssg";
import { useTheme, FONT_DISPLAY, FONT_MONO } from "../lib/theme.jsx";
import { Footer } from "../components/Shared.jsx";

const SECTIONS = [
  {
    title: "1. What we collect",
    body: "Account details you provide (name, email), your practice activity (answers, scores, bookmarks, streaks) so we can show your progress, and basic technical data (device, browser, pages visited) used for analytics and reliability.",
  },
  {
    title: "2. How we use it",
    body: "We use this information to run the service — authenticating you, syncing your progress across devices, improving question quality, and understanding which features are useful.",
  },
  {
    title: "3. Where it's stored",
    body: "Account data and progress are stored with our authentication and database provider (Firebase). Some preferences, such as theme and locally-tracked streaks, are stored only in your browser's local storage and never leave your device.",
  },
  {
    title: "4. Cookies and local storage",
    body: "We use local storage for preferences (theme, cookie consent, in-progress practice state) and privacy-friendly analytics to understand aggregate usage. We do not sell your data or use it for third-party advertising.",
  },
  {
    title: "5. Sharing",
    body: "We do not sell personal data. We share it only with service providers who help us run FabricPrep (such as hosting and authentication providers), under obligations to protect it, or when required by law.",
  },
  {
    title: "6. Your choices",
    body: "You can review or delete your account data by contacting us, manage cookie preferences from the footer at any time, and use most of the site's study tools without creating an account.",
  },
  {
    title: "7. Children's privacy",
    body: "FabricPrep is not directed at children under 13, and we do not knowingly collect personal information from them.",
  },
  {
    title: "8. Changes to this policy",
    body: "We may update this policy as the product evolves. Material changes will be reflected by updating the date below.",
  },
  {
    title: "9. Contact",
    body: "Questions about this policy or your data can be sent to support@fabricprep.com.",
  },
];

export function PrivacyPolicy() {
  const TOKENS = useTheme();

  return (
    <div className="min-h-full flex flex-col">
      <Helmet>
        <title>Privacy Policy | FabricPrep</title>
        <link rel="canonical" href="https://fabricprep.com/privacy" />
        <meta name="robots" content="noindex" />
        <meta name="description" content="How FabricPrep collects, uses, and protects your data." />
      </Helmet>

      <main className="flex-1 px-6 sm:px-10 py-16 max-w-3xl mx-auto w-full">
        <p className="text-xs uppercase tracking-widest mb-3" style={{ color: TOKENS.azure, fontFamily: FONT_MONO }}>Legal</p>
        <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>Privacy Policy</h1>
        <p className="text-sm mb-10" style={{ color: TOKENS.inkMuted }}>Last updated September 9, 2026</p>

        <div className="space-y-8">
          {SECTIONS.map(({ title, body }) => (
            <section key={title}>
              <h2 className="text-lg font-semibold mb-2" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>{title}</h2>
              <p className="text-sm leading-7" style={{ color: TOKENS.inkMuted }}>{body}</p>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
