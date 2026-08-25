import { ViteReactSSG } from "vite-react-ssg";
import App from "./App.jsx";
import { Landing } from "./pages/Landing.jsx";
import { ExamPage } from "./pages/ExamPage.jsx";
import { Dashboard } from "./pages/Dashboard.jsx";
import { StudyGuides } from "./pages/StudyGuides.jsx";
import { Analytics } from "@vercel/analytics/react";
import "./index.css";

const routes = [
  {
    path: "/",
    element: (
      <>
        <App />
        <Analytics />
      </>
    ),
    children: [
      { index: true, element: <Landing /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "study-guides", element: <StudyGuides /> },
      { path: ":examSlug", element: <ExamPage /> },
    ],
  },
];

export const createRoot = ViteReactSSG({ routes, basename: "/" });
