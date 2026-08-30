import { ViteReactSSG } from "vite-react-ssg";
import App from "./App.jsx";
import { Landing } from "./pages/Landing.jsx";
import { ExamPage } from "./pages/ExamPage.jsx";
import { Dashboard } from "./pages/Dashboard.jsx";
import { StudyGuides } from "./pages/StudyGuides.jsx";
import { StudyGuideDetail } from "./pages/StudyGuideDetail.jsx";
import { DP700StudyGuide } from "./pages/study-guides/DP700StudyGuide.jsx";
import { Login } from "./pages/Login.jsx";
import { AuthProvider } from "./lib/authContext.jsx";
import { ROUTE_PATHS } from "./lib/examCatalog.js";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import "./index.css";

// Wrap the App with AuthProvider
function AppWithAuth() {
  return (
    <AuthProvider>
      <App />
      <Analytics />
      <SpeedInsights />
    </AuthProvider>
  );
}

const routes = [
  {
    path: "/",
    element: <AppWithAuth />,
    children: [
      { index: true, element: <Landing /> },
      { path: ROUTE_PATHS.dashboard, element: <Dashboard /> },
      { path: ROUTE_PATHS.login, element: <Login /> },
      { path: ROUTE_PATHS.studyGuides, element: <StudyGuides /> },
      { path: ROUTE_PATHS.dp700StudyGuideTopic, element: <DP700StudyGuide /> },
      { path: ROUTE_PATHS.studyGuideDetail, element: <StudyGuideDetail /> },
      { path: ROUTE_PATHS.exam, element: <ExamPage /> },
    ],
  },
];

export const createRoot = ViteReactSSG({ routes, basename: "/" });
