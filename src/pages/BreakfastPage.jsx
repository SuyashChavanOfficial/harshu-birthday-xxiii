import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { breakfastItems } from "../helpers/breakfastItems";
import { sendBreakfastEmail } from "../utils/emailService";
import { advanceToPath } from "../utils/progress";

const getISTHour = () => {
  const now = new Date();
  return new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
  ).getHours();
};

const BreakfastPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [status, setStatus] = useState("open"); // before | open | closed
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  useEffect(() => {
    const hour = getISTHour();

    if (hour < 8) setStatus("before");
    else if (hour >= 8 && hour < 12) setStatus("open");
    else setStatus("closed");
  }, []);

  const toggleItem = (item) => {
    if (status !== "open") return;

    setCart((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );
  };

  const handleConfirm = async () => {
    if (cart.length === 0 || isSending) return;

    setErrorMessage("");
    setInfoMessage("Sending your breakfast order...");
    setIsSending(true);

    try {
      await sendBreakfastEmail(cart);
      localStorage.setItem("breakfast_confirmed", "true");
      advanceToPath("/feedback");
      setInfoMessage("Order sent successfully. Redirecting...");
      setTimeout(() => {
        navigate("/feedback", { replace: true });
      }, 800);
    } catch (error) {
      console.error("Breakfast email send failed:", error);
      const message =
        error?.message || "Could not send the order right now. Please try again.";
      setInfoMessage("");
      setErrorMessage(message);
    } finally {
      setIsSending(false);
    }
  };

  // UI states
  if (status === "before") {
    return <CenterMessage text="Too early 😴 Come back at 8 AM ❤️" />;
  }

  if (status === "closed") {
    return (
      <CenterMessage text="You missed breakfast 😏 But I still owe you one ❤️" />
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f14] text-white p-4">
      {/* Glow */}
      <div className="absolute w-[300px] h-[300px] bg-purple-600/20 blur-3xl top-10 left-10"></div>
      <div className="absolute w-[300px] h-[300px] bg-pink-600/20 blur-3xl bottom-10 right-10"></div>

      <h1 className="text-2xl text-center mb-2">Choose Your Breakfast 🍽️</h1>

      <p className="text-gray-400 text-center mb-6">
        I’ll make it just how you like 😌
      </p>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        {breakfastItems.map((item) => (
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

const CenterMessage = ({ text }) => (
  <div className="min-h-screen flex items-center justify-center bg-[#0f0f14] text-white text-center px-4">
    <p className="text-xl">{text}</p>
  </div>
);

export default BreakfastPage;
