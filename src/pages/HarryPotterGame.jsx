import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { hpQuestions } from "../helpers/hpQuestions";

const TOTAL_QUESTIONS = 10;

const getRandomQuestions = () => {
  return [...hpQuestions]
    .sort(() => 0.5 - Math.random())
    .slice(0, TOTAL_QUESTIONS);
};

const HarryPotterGame = () => {
  const navigate = useNavigate();

  const [started, setStarted] = useState(false);
  const [questions] = useState(getRandomQuestions());
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);

  // ✅ stable audio
  const correctSound = useRef(new Audio("/sounds/pop.mp3"));
  const wrongSound = useRef(new Audio("/sounds/fail.mp3"));

  const handleAnswer = (option) => {
    if (showResult) return;

    const currentQ = questions[current];
    setSelected(option);
    setShowResult(true);

    if (option === currentQ.answer) {
      correctSound.current.currentTime = 0;
      correctSound.current.play();
      setScore((prev) => prev + 1);
    } else {
      wrongSound.current.currentTime = 0;
      wrongSound.current.play();
    }

    // ⏳ wait before next question
    setTimeout(() => {
      if (current + 1 < TOTAL_QUESTIONS) {
        setCurrent((prev) => prev + 1);
        setSelected(null);
        setShowResult(false);
      } else {
        handleFinish();
      }
    }, 1000);
  };

  const handleFinish = () => {
    const percentage = (score / TOTAL_QUESTIONS) * 100;

    if (percentage >= 50) {
      navigator.vibrate?.(50);
      alert("You passed! Mischief Managed 🪄");
      navigate("/breakfast");
    } else {
      alert("You need more magic 😏 Try again!");
      window.location.reload();
    }
  };

  const q = questions[current];

  // 🧠 helper for button color
  const getOptionStyle = (option) => {
    if (!showResult) return "bg-white/5 border-white/10 hover:bg-white/10";

    if (option === q.answer) {
      return "bg-green-500/20 border-green-400";
    }

    if (option === selected) {
      return "bg-red-500/20 border-red-400";
    }

    return "bg-white/5 border-white/10 opacity-50";
  };

  return (
    <div className="min-h-screen bg-[#0f0f14] relative flex flex-col items-center justify-center px-4 text-white">
      {/* Glow */}
      <div className="absolute w-[300px] h-[300px] bg-purple-600/20 rounded-full blur-3xl top-10 left-10"></div>
      <div className="absolute w-[300px] h-[300px] bg-pink-600/20 rounded-full blur-3xl bottom-10 right-10"></div>

      {/* RULES SCREEN */}
      {!started && (
        <div className="max-w-md text-center z-10">
          <h1 className="text-2xl font-semibold mb-4">
            Harry Potter Challenge 🪄
          </h1>

          <div className="text-gray-400 mb-6 space-y-2">
            <p>• 10 questions</p>
            <p>• Need at least 50% to pass</p>
            <p>• Choose wisely… magic matters 😏</p>
          </div>

          <button
            onClick={() => setStarted(true)}
            className="bg-white/10 border border-white/20 px-6 py-3 rounded-full hover:bg-white/20 transition"
          >
            Start Game ✨
          </button>
        </div>
      )}

      {/* GAME */}
      {started && (
        <div className="max-w-md w-full text-center z-10">
          {/* Progress + Score */}
          <div className="flex justify-between text-sm text-gray-400 mb-4">
            <span>
              Q {current + 1} / {TOTAL_QUESTIONS}
            </span>
            <span>Score: {score}</span>
          </div>

          <h1 className="text-xl font-semibold mb-8">{q.question}</h1>

          <div className="grid gap-4">
            {q.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className={`border backdrop-blur-xl p-4 rounded-xl transition ${getOptionStyle(
                  option,
                )}`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HarryPotterGame;
