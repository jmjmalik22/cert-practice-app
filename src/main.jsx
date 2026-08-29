import { ViteReactSSG } from "vite-react-ssg";
import App from "./App.jsx";
import { Landing } from "./pages/Landing.jsx";
import { ExamPage } from "./pages/ExamPage.jsx";
import { Dashboard } from "./pages/Dashboard.jsx";
import { StudyGuides } from "./pages/StudyGuides.jsx";
import { StudyGuideDetail } from "./pages/StudyGuideDetail.jsx";
import { DP700StudyGuide } from "./pages/study-guides/DP700StudyGuide.jsx";
import { Login } from "./pages/Login.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";
import { AuthProvider } from "./lib/authContext.jsx";
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
      { path: "dashboard", element: <Dashboard /> },
      { path: "login", element: <Login /> },
      { path: "study-guides", element: <StudyGuides /> },
      { path: "study-guides/:examSlug", element: <StudyGuideDetail /> },
      { path: "study-guides/dp-700/:topicId", element: <DP700StudyGuide /> },
      { path: ":examSlug", element: <ExamPage /> },
    ],
  },
];

export const createRoot = ViteReactSSG({ routes, basename: "/" });
