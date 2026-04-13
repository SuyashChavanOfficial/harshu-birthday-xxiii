import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MoodPage from "./pages/MoodPage";
import AgePage from "./pages/AgePage";
import HarryPotterGame from "./pages/HarryPotterGame";
import BreakfastPage from "./pages/BreakfastPage";
import FeedbackPage from "./pages/FeedbackPage";

function App() {
  return (
    <BrowserRouter>
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
