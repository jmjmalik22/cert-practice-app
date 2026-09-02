import { Component } from "react";

export class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="text-2xl font-semibold">Something went wrong</h1>
        <p className="max-w-md text-sm opacity-75">
          FabricPrep could not display this page. Try reloading, or return to the home page.
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
}