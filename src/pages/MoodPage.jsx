import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MoodCard from "../components/MoodCard";

const moods = [
  { label: "Chill", emoji: "😌", value: "chill" },
  { label: "Party", emoji: "🎉", value: "party" },
  { label: "Romantic", emoji: "❤️", value: "romantic" },
  { label: "Chaos", emoji: "😈", value: "chaos" },
];

const MoodPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("mood")) {
      navigate("/age", { replace: true });
    }
  }, [navigate]);

  const handleSelect = (mood) => {
    navigator.vibrate?.(50);
    localStorage.setItem("mood", mood);
    navigate("/age", { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#0f0f14] relative flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Subtle Glow Background */}
      <div className="absolute w-[300px] h-[300px] bg-purple-600/20 rounded-full blur-3xl top-10 left-10"></div>
      <div className="absolute w-[300px] h-[300px] bg-pink-600/20 rounded-full blur-3xl bottom-10 right-10"></div>

      {/* Content */}
      <h1 className="text-white text-2xl md:text-3xl font-semibold mb-2 text-center tracking-wide">
        Choose Your Mood ✨
      </h1>

      <p className="text-gray-400 text-center mb-10">
        Let’s make today feel just right
      </p>

      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        {moods.map((mood) => (
          <MoodCard
            key={mood.value}
            emoji={mood.emoji}
            label={mood.label}
            onClick={() => handleSelect(mood.value)}
          />
        ))}
      </div>
    </div>
  );
};

export default MoodPage;
