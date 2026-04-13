import { BrowserRouter, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import MoodPage from "./pages/MoodPage";
import AgePage from "./pages/AgePage";
import HarryPotterGame from "./pages/HarryPotterGame";
import BreakfastPage from "./pages/BreakfastPage";
import FeedbackPage from "./pages/FeedbackPage";
import { useEffect } from "react";
import { getLatestPath } from "./utils/progress";

function ProgressGuard() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const latestPath = getLatestPath();
    if (location.pathname !== latestPath) {
      navigate(latestPath, { replace: true });
    }
  }, [location.pathname, navigate]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ProgressGuard />
      <Routes>
        <Route path="/" element={<MoodPage />} />
        <Route path="/age" element={<AgePage />} />
        <Route path="/harry-potter-game" element={<HarryPotterGame />} />
        <Route path="/breakfast" element={<BreakfastPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
