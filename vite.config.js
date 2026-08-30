import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { SSG_ROUTES } from "./src/lib/examCatalog.js";

export default defineConfig({
  plugins: [react()],
  ssgOptions: {
    includedRoutes: () => SSG_ROUTES,
  },
});
