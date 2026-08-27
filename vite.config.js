import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const SLUGS = ["dp-700", "dp-600", "az-900", "dp-900"];
const DP700_TOPICS = ["ingestion", "monitoring", "security"];

export default defineConfig({
  plugins: [react()],
  ssgOptions: {
    includedRoutes: () => [
      "/",
      "/study-guides",
      ...SLUGS.map((s) => `/${s}`),
      ...SLUGS.map((s) => `/study-guides/${s}`),
      ...DP700_TOPICS.map((t) => `/study-guides/dp-700/${t}`),
    ],
  },
});
