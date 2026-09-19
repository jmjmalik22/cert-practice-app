import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { SSG_ROUTES } from "./src/lib/examCatalog.js";

export default defineConfig({
  plugins: [react()],
  ssgOptions: {
    includedRoutes: () => SSG_ROUTES,
  },
  test: {
    // Claude Code leaves isolated agent worktrees under .claude/worktrees/;
    // without this, vitest's default recursive glob picks up their nested
    // copies of every test file too.
    exclude: ["**/node_modules/**", "**/.claude/**", "**/dist/**"],
  },
});
