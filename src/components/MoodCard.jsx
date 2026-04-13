import React from "react";

const MoodCard = ({ emoji, label, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center 
      hover:scale-105 hover:bg-white/10 transition-all duration-300 shadow-lg"
    >
      <div className="text-4xl mb-3">{emoji}</div>
      <div className="text-white text-lg font-medium tracking-wide">
        {label}
      </div>
    </div>
  );
};

export default MoodCard;
