import { useState } from "react";
import { sendFeedbackEmail } from "../utils/emailService";

const FeedbackPage = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    if (rating === 0 || feedback.trim() === "" || isSending) return;

    setErrorMessage("");
    setIsSending(true);

    try {
      await sendFeedbackEmail({ rating, feedback });
      setSubmitted(true);
    } catch (error) {
      const message =
        error?.message || "Could not send feedback right now. Please try again.";
      setErrorMessage(message);
    } finally {
      setIsSending(false);
    }
  };

  if (submitted) {
    return <CenterMessage text="Feedback received 😌 You made my day ❤️" />;
  }

  return (
    <div className="min-h-screen bg-[#0f0f14] relative flex flex-col items-center justify-center px-4 text-white overflow-hidden">
      {/* Glow */}
      <div className="absolute w-[300px] h-[300px] bg-purple-600/20 blur-3xl top-10 left-10"></div>
      <div className="absolute w-[300px] h-[300px] bg-pink-600/20 blur-3xl bottom-10 right-10"></div>

      <div className="z-10 text-center max-w-md w-full">
        <h1 className="text-3xl font-semibold mb-3">Feedback Time 💌</h1>

        <p className="text-gray-400 mb-6">Please rate after you’ve eaten 😌</p>

        {/* ⭐ Stars */}
        <div className="flex justify-center gap-2 mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              className={`text-3xl cursor-pointer transition ${
                (hover || rating) >= star ? "text-yellow-400" : "text-gray-600"
              }`}
            >
              ★
            </span>
          ))}
        </div>

        {/* 📝 Textarea */}
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Tell me honestly… how was it? 😏"
          className="w-full h-28 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl text-white outline-none mb-6"
        />

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={isSending}
          className="w-full bg-white/10 border border-white/20 py-3 rounded-full hover:bg-white/20 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSending ? "Sending..." : "Send Feedback ❤️"}
        </button>
        {errorMessage && (
          <p className="text-pink-300 text-sm mt-3">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

const CenterMessage = ({ text }) => (
  <div className="min-h-screen flex items-center justify-center bg-[#0f0f14] text-white text-center px-4">
    <p className="text-xl">{text}</p>
  </div>
);

export default FeedbackPage;
