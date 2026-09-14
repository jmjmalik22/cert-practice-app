import { useRouteError } from "react-router-dom";

// Catches errors thrown by a route's lazy loader/component (react-router's
// data-router errors bypass React's own componentDidCatch, so the plain
// ErrorBoundary component never sees these — this is the router-level
// equivalent, wired up as the root route's errorElement).
export function RouteErrorBoundary() {
  const error = useRouteError();
  const message = error?.message || String(error || "");
  const isChunkLoadError = /dynamically imported module|failed to fetch|loading chunk/i.test(message);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-2xl font-semibold">Something went wrong</h1>
      <p className="max-w-md text-sm opacity-75">
        {isChunkLoadError
          ? "FabricPrep was updated since you opened this page. Reload to get the latest version."
          : "FabricPrep could not display this page. Try reloading, or return to the home page."}
      </p>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="rounded-full px-4 py-2 text-sm font-medium"
          style={{ background: "#3FA7FF", color: "#07101C" }}
        >
          Reload page
        </button>
        <a href="/" className="rounded-full border px-4 py-2 text-sm font-medium">
          Go home
        </a>
      </div>
    </main>
  );
}
