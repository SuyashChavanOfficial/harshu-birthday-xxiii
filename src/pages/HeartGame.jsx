import { useEffect, useState, useRef } from "react";

const HeartGame = () => {
  const [hearts, setHearts] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false); // ✅ for sound unlock

  const intervalRef = useRef(null);
  const audioUnlockedRef = useRef(false);

  const popSoundRef = useRef(new Audio("/sounds/pop.mp3"));
  const failSoundRef = useRef(new Audio("/sounds/fail.mp3"));

  // preload
  useEffect(() => {
    popSoundRef.current.preload = "auto";
    failSoundRef.current.preload = "auto";
    popSoundRef.current.load();
    failSoundRef.current.load();
  }, []);

  const unlockAudio = () => {
    if (audioUnlockedRef.current) return;

    audioUnlockedRef.current = true;
    [popSoundRef.current, failSoundRef.current].forEach((audio) => {
      audio.muted = true;
      const p = audio.play();
      if (p?.then) {
        p.then(() => {
          audio.pause();
          audio.currentTime = 0;
          audio.muted = false;
        }).catch(() => {
          audio.muted = false;
        });
      } else {
        audio.muted = false;
      }
    });
  };

  const safePlay = (audioRef) => {
    try {
      audioRef.current.currentTime = 0;
      const playPromise = audioRef.current.play();
      if (playPromise?.catch) {
        playPromise.catch(() => {});
      }
    } catch {
      // Ignore autoplay/runtime audio errors so game state still updates.
    }
  };

  function startGame() {
    clearInterval(intervalRef.current); // ✅ fix reset bug

    setHearts([]);
    setScore(0);
    setGameOver(false);

    intervalRef.current = setInterval(() => {
      const id = Date.now();

      const isBad = Math.random() < 0.25;

      const newHeart = {
        id,
        left: Math.random() * 90,
        isBad,
      };

      setHearts((prev) => [...prev, newHeart]);

      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== id));
      }, 5000); // slightly slower fall
    }, 1200); // ✅ slower spawn
  }

  // clear interval on unmount
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const handleClick = (heart) => {
    unlockAudio();

    if (gameOver) return;

    navigator.vibrate?.(30);
    setHearts((prev) => prev.filter((h) => h.id !== heart.id));

    if (heart.isBad) {
      safePlay(failSoundRef);

      navigator.vibrate?.([100, 50, 100]);

      setGameOver(true);
      clearInterval(intervalRef.current);
      setHearts([]);
      setScore(0);

      setTimeout(() => {
        startGame();
      }, 900);

      return;
    }

    safePlay(popSoundRef);

    // ✅ FIX: correct state update
    setScore((prev) => {
      const newScore = prev + 1;

      if (newScore === 23) {
        navigator.vibrate?.([50, 50, 200]);
        clearInterval(intervalRef.current);

        setTimeout(() => {
          alert("You caught all my love ❤️");
        }, 200);
      }

      return newScore;
    });
  };

  return (
    <div
      className="min-h-screen bg-[#0f0f14] relative overflow-hidden text-white flex flex-col items-center pt-10"
      onPointerDown={() => {
        unlockAudio();
        if (!started) {
          setStarted(true);
          startGame();
        }
      }}
    >
      {/* Glow */}
      <div className="pointer-events-none absolute w-[300px] h-[300px] bg-purple-600/20 rounded-full blur-3xl top-10 left-10"></div>
      <div className="pointer-events-none absolute w-[300px] h-[300px] bg-pink-600/20 rounded-full blur-3xl bottom-10 right-10"></div>

      {/* Score */}
      <div className="text-center mb-6 z-10">
        <h1 className="text-xl text-gray-400">Catch My Love ❤️</h1>
        <p className="text-4xl font-semibold mt-2">{score} / 23</p>
      </div>

      {/* Game Area */}
      <div className="relative w-full h-[70vh] z-20">
        {hearts.map((heart) => (
          <button
            key={heart.id}
            type="button"
            onClick={(e) => {
              e.stopPropagation(); // ✅ prevent triggering parent click
              handleClick(heart);
            }}
            className="absolute -top-12 text-3xl cursor-pointer select-none animate-fall active:scale-125 transition-transform bg-transparent border-0 p-0 leading-none"
            style={{ left: `${heart.left}%` }}
            aria-label={heart.isBad ? "Broken heart" : "Heart"}
          >
            {heart.isBad ? "💔" : "❤️"}
          </button>
        ))}
      </div>

      {/* Start Hint */}
      {!started && (
        <p className="text-gray-500 text-sm mt-4 animate-pulse">
          Tap anywhere to start ❤️
        </p>
      )}

      {started && (
        <p className="text-gray-500 text-sm mt-4">
          Don’t touch the broken ones 😏
        </p>
      )}
    </div>
  );
};

export default HeartGame;
