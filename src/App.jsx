import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import MoodPage from "./pages/MoodPage";
import AgePage from "./pages/AgePage";
import HarryPotterGame from "./pages/HarryPotterGame";
import LunchPage from "./pages/LunchPage";
import FeedbackPage from "./pages/FeedbackPage";
import { useEffect } from "react";
import { getLatestPath } from "./utils/progress";

function normalizePath(pathname) {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

function ProgressGuard() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const latestPath = getLatestPath();
    const currentPath = normalizePath(location.pathname);

    if (currentPath !== latestPath) {
      navigate(latestPath, { replace: true });
    }
  }, [location.pathname, navigate]);

  return null;
}

function LatestRedirect() {
  return <Navigate to={getLatestPath()} replace />;
}

function App() {
  return (
    <BrowserRouter>
      <ProgressGuard />
      <Routes>
        <Route path="/" element={<MoodPage />} />
        <Route path="/age" element={<AgePage />} />
        <Route path="/harry-potter-game" element={<HarryPotterGame />} />
        <Route path="/lunch" element={<LunchPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="*" element={<LatestRedirect />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
