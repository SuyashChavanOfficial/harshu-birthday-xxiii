import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import MoodPage from "./pages/MoodPage";
import AgePage from "./pages/AgePage";
import HarryPotterGame from "./pages/HarryPotterGame";
import LunchPage from "./pages/LunchPage";
import FeedbackPage from "./pages/FeedbackPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MoodPage />} />
        <Route path="/age" element={<AgePage />} />
        <Route path="/harry-potter-game" element={<HarryPotterGame />} />
        <Route path="/lunch" element={<LunchPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
