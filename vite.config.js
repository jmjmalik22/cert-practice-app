import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const SLUGS = ["dp-700", "dp-600", "az-900", "dp-900"];

export default defineConfig({
  plugins: [react()],
  ssgOptions: {
    includedRoutes: () => ["/", ...SLUGS.map((s) => `/${s}`)],
  },
});
