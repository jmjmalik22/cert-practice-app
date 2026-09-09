import { Head as Helmet } from "vite-react-ssg";
import { useTheme, FONT_DISPLAY, FONT_MONO } from "../lib/theme.jsx";
import { Footer } from "../components/Shared.jsx";

const SECTIONS = [
  {
    title: "1. Acceptance of terms",
    body: "By accessing or using FabricPrep, you agree to these Terms of Service. If you do not agree, please do not use the site.",
  },
  {
    title: "2. What FabricPrep is",
    body: "FabricPrep is an independent study and practice tool for Microsoft certification exams. It is not affiliated with, endorsed by, or sponsored by Microsoft. Practice questions are original and written to reflect exam objectives — they are not reproductions of real exam content.",
  },
  {
    title: "3. Accounts",
    body: "You may need an account to track progress across devices. You are responsible for keeping your login credentials secure and for all activity under your account.",
  },
  {
    title: "4. Acceptable use",
    body: "You agree not to misuse the service — including attempting to scrape or resell question content, interfere with the site's operation, or use it in a way that violates any applicable law.",
  },
  {
    title: "5. No exam guarantee",
    body: "Practice questions and study guides are provided to support your preparation. FabricPrep does not guarantee a passing score on any certification exam.",
  },
  {
    title: "6. Service changes",
    body: "Features, pricing, and content may change over time as the product evolves. We will do our best to communicate material changes.",
  },
  {
    title: "7. Termination",
    body: "We may suspend or terminate access for accounts that violate these terms. You may stop using the service and close your account at any time.",
  },
  {
    title: "8. Disclaimer and liability",
    body: "The service is provided “as is” without warranties of any kind. To the fullest extent permitted by law, FabricPrep is not liable for indirect or consequential damages arising from your use of the site.",
  },
  {
    title: "9. Contact",
    body: "Questions about these terms can be sent to support@fabricprep.com.",
  },
];

export function TermsOfService() {
  const TOKENS = useTheme();

  return (
    <div className="min-h-full flex flex-col">
      <Helmet>
        <title>Terms of Service | FabricPrep</title>
        <link rel="canonical" href="https://fabricprep.com/terms" />
        <meta name="robots" content="noindex" />
        <meta name="description" content="The terms of service for using FabricPrep's Microsoft certification practice platform." />
      </Helmet>

      <main className="flex-1 px-6 sm:px-10 py-16 max-w-3xl mx-auto w-full">
        <p className="text-xs uppercase tracking-widest mb-3" style={{ color: TOKENS.azure, fontFamily: FONT_MONO }}>Legal</p>
        <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>Terms of Service</h1>
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
