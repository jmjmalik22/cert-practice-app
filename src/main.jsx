import { ViteReactSSG } from "vite-react-ssg";
import App from "./App.jsx";
import { Landing } from "./pages/Landing.jsx";
import { About } from "./pages/About.jsx";
import { AuthProvider } from "./lib/authContext.jsx";
import { ErrorBoundary } from "./components/ErrorBoundary.jsx";
import { ROUTE_PATHS } from "./lib/examCatalog.js";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import "./index.css";

// Wrap the App with AuthProvider
function AppWithAuth() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <App />
        <Analytics />
        <SpeedInsights />
      </AuthProvider>
    </ErrorBoundary>
  );
}

const routes = [
  {
    path: "/",
    element: <AppWithAuth />,
    children: [
      { index: true, element: <Landing /> },
      { path: "about", element: <About /> },
      {
        path: ROUTE_PATHS.dashboard,
        lazy: async () => {
          const { Dashboard } = await import("./pages/Dashboard.jsx");
          return { Component: Dashboard };
        },
      },
      {
        path: ROUTE_PATHS.login,
        lazy: async () => {
          const { Login } = await import("./pages/Login.jsx");
          return { Component: Login };
        },
      },
      {
        path: ROUTE_PATHS.studyGuides,
        lazy: async () => {
          const { StudyGuides } = await import("./pages/StudyGuides.jsx");
          return { Component: StudyGuides };
        },
      },
      {
        path: ROUTE_PATHS.dp700StudyGuideTopic,
        lazy: async () => {
          const { DP700StudyGuide } = await import("./pages/study-guides/DP700StudyGuide.jsx");
          return { Component: DP700StudyGuide };
        },
      },
      {
        path: "study-guides/shared/dataflows-pipelines",
        lazy: async () => {
          const { IngestionFoundations } = await import("./pages/study-guides/IngestionFoundations.jsx");
          return { Component: IngestionFoundations };
        },
      },
      {
        path: "study-guides/shared",
        lazy: async () => {
          const { SharedStudyGuides } = await import("./pages/study-guides/SharedStudyGuides.jsx");
          return { Component: SharedStudyGuides };
        },
      },
      {
        path: "study-guides/shared/spark-notebooks-delta",
        lazy: async () => {
          const { SparkDeltaFoundations } = await import("./pages/study-guides/SparkDeltaFoundations.jsx");
          return { Component: SparkDeltaFoundations };
        },
      },
      {
        path: "study-guides/shared/eventhouse-kql",
        lazy: async () => {
          const { EventhouseFoundations } = await import("./pages/study-guides/EventhouseFoundations.jsx");
          return { Component: EventhouseFoundations };
        },
      },
      {
        path: "study-guides/shared/warehouse-dimensional-modeling",
        lazy: async () => {
          const { WarehouseFoundations } = await import("./pages/study-guides/WarehouseFoundations.jsx");
          return { Component: WarehouseFoundations };
        },
      },
      {
        path: "study-guides/shared/monitoring-optimization",
        lazy: async () => {
          const { MonitoringFoundations } = await import("./pages/study-guides/MonitoringFoundations.jsx");
          return { Component: MonitoringFoundations };
        },
      },
      {
        path: "study-guides/shared/security-governance",
        lazy: async () => {
          const { SecurityFoundations } = await import("./pages/study-guides/SecurityFoundations.jsx");
          return { Component: SecurityFoundations };
        },
      },
      {
        path: "study-guides/shared/lifecycle-orchestration",
        lazy: async () => {
          const { LifecycleFoundations } = await import("./pages/study-guides/LifecycleFoundations.jsx");
          return { Component: LifecycleFoundations };
        },
      },
      {
        path: ROUTE_PATHS.studyGuideDetail,
        lazy: async () => {
          const { StudyGuideDetail } = await import("./pages/StudyGuideDetail.jsx");
          return { Component: StudyGuideDetail };
        },
      },
      {
        path: ROUTE_PATHS.exam,
        lazy: async () => {
          const { ExamPage } = await import("./pages/ExamPage.jsx");
          return { Component: ExamPage };
        },
      },
      {
        path: "*",
        lazy: async () => {
          const { NotFound } = await import("./pages/NotFound.jsx");
          return { Component: NotFound };
        },
      },
    ],
  },
];

export const createRoot = ViteReactSSG({ routes, basename: "/" });
