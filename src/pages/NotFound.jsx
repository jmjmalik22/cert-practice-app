import { Link } from "react-router-dom";
import { Head as Helmet } from "vite-react-ssg";
import { useTheme, FONT_DISPLAY } from "../lib/theme.jsx";
import { Footer } from "../components/Shared.jsx";

export function NotFound() {
  const TOKENS = useTheme();

  return (
    <div className="min-h-full flex flex-col">
      <Helmet>
        <title>Page not found | FabricPrep</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-16">
        <p className="text-xs uppercase tracking-widest mb-3" style={{ color: TOKENS.azure }}>404</p>
        <h1 className="text-3xl font-semibold mb-3" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
          Page not found
        </h1>
        <p className="text-sm max-w-md mb-6" style={{ color: TOKENS.inkMuted }}>
          The page you requested does not exist or may have moved.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/" className="rounded-full px-4 py-2 text-sm font-medium" style={{ background: TOKENS.azure, color: TOKENS.bgDeep }}>
            Go home
          </Link>
          <Link to="/study-guides" className="rounded-full px-4 py-2 text-sm font-medium" style={{ border: `1px solid ${TOKENS.panelBorder}`, color: TOKENS.ink }}>
            Study guides
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}