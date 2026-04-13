import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MoodPage from "./pages/MoodPage";
import AgePage from "./pages/AgePage";
import HeartGame from "./pages/HeartGame";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MoodPage />} />
        <Route path="/age" element={<AgePage />} />
        <Route path="/game" element={<HeartGame />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
