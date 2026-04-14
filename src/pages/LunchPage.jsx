import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { lunchItems } from "../helpers/lunchItems";
import { sendLunchEmail } from "../utils/emailService";

const LunchPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  useEffect(() => {
    const mood = localStorage.getItem("mood");
    const age = localStorage.getItem("age");
    const hpPassed = localStorage.getItem("hp_passed");
    const lunchConfirmed = localStorage.getItem("lunch_confirmed");

    if (!mood) {
      navigate("/", { replace: true });
      return;
    }

    if (age !== "23") {
      navigate("/age", { replace: true });
      return;
    }

    if (hpPassed !== "true") {
      navigate("/harry-potter-game", { replace: true });
      return;
    }

    if (lunchConfirmed === "true") {
      navigate("/feedback", { replace: true });
    }
  }, [navigate]);

  const toggleItem = (item) => {
    setCart((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );
  };

  const handleConfirm = async () => {
    if (cart.length === 0 || isSending) return;

    setErrorMessage("");
    setInfoMessage("Sending your lunch order...");
    setIsSending(true);

    try {
      await sendLunchEmail(cart);
      localStorage.setItem("lunch_confirmed", "true");
      setInfoMessage("Order sent successfully. Redirecting...");
      setTimeout(() => {
        navigate("/feedback", { replace: true });
      }, 800);
    } catch (error) {
      console.error("Lunch email send failed:", error);
      const message =
        error?.message || "Could not send the order right now. Please try again.";
      setInfoMessage("");
      setErrorMessage(message);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f14] text-white p-4">
      {/* Glow */}
      <div className="absolute w-[300px] h-[300px] bg-purple-600/20 blur-3xl top-10 left-10"></div>
      <div className="absolute w-[300px] h-[300px] bg-pink-600/20 blur-3xl bottom-10 right-10"></div>

      <h1 className="text-2xl text-center mb-2">Choose Your Lunch Thali 🍽️</h1>

      <p className="text-gray-400 text-center mb-6">
        Pick your Indian lunch favorites and I’ll take care of the rest 😌
      </p>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        {lunchItems.map((item) => (
          <div
            key={item.name}
            onClick={() => toggleItem(item.name)}
            className={`p-4 rounded-xl text-center cursor-pointer border backdrop-blur-xl transition
            ${
              cart.includes(item.name)
                ? "bg-pink-500/20 border-pink-400"
                : "bg-white/5 border-white/10"
            }`}
          >
            <div className="text-2xl">{item.emoji}</div>
            <div className="mt-2">{item.name}</div>
          </div>
        ))}
      </div>

      {/* Cart */}
      <div className="mt-6 text-center">
        <p className="text-gray-400 mb-2">Selected: {cart.length}</p>
        {infoMessage && <p className="text-emerald-300 mb-3 text-sm">{infoMessage}</p>}
        {errorMessage && <p className="text-pink-300 mb-3 text-sm">{errorMessage}</p>}

        <button
          onClick={handleConfirm}
          disabled={cart.length === 0 || isSending}
          className="bg-white/10 border border-white/20 px-6 py-2 rounded-full hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSending ? "Sending..." : "Confirm ❤️"}
        </button>
      </div>
    </div>
  );
};

export default LunchPage;
