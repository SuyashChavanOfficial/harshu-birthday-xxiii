import { useState } from "react";
import { getRandomMessage } from "../helpers/ageMessages";
import { useNavigate } from "react-router-dom";
import { advanceToPath } from "../utils/progress";

const AgePage = () => {
  const [age, setAge] = useState(18);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const increase = () => {
    navigator.vibrate?.(30);
    setAge((prev) => prev + 1);
    setError("");
  };

  const decrease = () => {
    if (age > 1) {
      navigator.vibrate?.(30);
      setAge((prev) => prev - 1);
      setError("");
    }
  };

  const handleContinue = () => {
    navigator.vibrate?.(50);

    if (age !== 23) {
      setError(getRandomMessage());
      return;
    }

    localStorage.setItem("age", String(age));
    advanceToPath("/harry-potter-game");
    navigate("/harry-potter-game", { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#0f0f14] relative flex flex-col items-center justify-center px-4 overflow-hidden text-white">
      {/* Glow Background */}
      <div className="absolute w-[300px] h-[300px] bg-purple-600/20 rounded-full blur-3xl top-10 left-10"></div>
      <div className="absolute w-[300px] h-[300px] bg-pink-600/20 rounded-full blur-3xl bottom-10 right-10"></div>

      {/* Content */}
      <h1 className="text-2xl md:text-3xl font-semibold mb-3 text-center tracking-wide">
        How old are you today? 🎂
      </h1>

      <p className="text-gray-400 mb-8 text-center">Be honest… I’ll know 😏</p>

      {/* Counter */}
      <div className="flex items-center gap-6 mb-6">
        <button
          onClick={decrease}
          className="bg-white/5 border border-white/10 backdrop-blur-xl px-5 py-3 rounded-xl text-2xl hover:bg-white/10 transition"
        >
          −
        </button>

        <div className="text-5xl font-semibold w-20 text-center tracking-wide">
          {age}
        </div>

        <button
          onClick={increase}
          className="bg-white/5 border border-white/10 backdrop-blur-xl px-5 py-3 rounded-xl text-2xl hover:bg-white/10 transition"
        >
          +
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-sm text-pink-300 mb-4 text-center animate-pulse">
          {error}
        </p>
      )}

      {/* Continue Button */}
      <button
        onClick={handleContinue}
        className="mt-4 bg-white/10 border border-white/20 backdrop-blur-xl text-white font-medium px-8 py-3 rounded-full shadow-lg hover:bg-white/20 active:scale-95 transition-all"
      >
        Continue ❤️
      </button>
    </div>
  );
};

export default AgePage;
