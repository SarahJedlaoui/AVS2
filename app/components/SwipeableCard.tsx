// SwipeableCard.tsx
"use client";
import { motion, useAnimation } from "framer-motion";
import { useState } from "react";

const cardVariants = {
  initial: { x: 0, opacity: 1 },
  swipeLeft: { x: -300, opacity: 0 },
  swipeRight: { x: 300, opacity: 0 },
};

const SwipeableCard = () => {
  const controls = useAnimation();
  const [currentCard, setCurrentCard] = useState(0);
  const options = [
    {
      title: "Diagnosis Information",
      description: "Your recent tests show elevated cholesterol levels. Regular monitoring is advised.",
      icon: "ℹ️",
    },
    {
      title: "Appointments",
      description: "Your next checkup is scheduled for May 5th. Please confirm attendance.",
      icon: "📅",
    },
    {
      title: "Medication Updates",
      description: "Your prescription for medication has been updated. Check the details in your profile.",
      icon: "💊",
    },
    {
      title: "Symptoms to Watch",
      description: "Please monitor any unusual symptoms and update us as needed.",
      icon: "⚠️",
    },
    {
      title: "Next Steps",
      description: "Schedule a follow-up appointment as discussed with your doctor.",
      icon: "🔄",
    },
  ];

  const swipeCard = async (direction: "left" | "right") => {
    await controls.start(direction === "left" ? "swipeLeft" : "swipeRight");
    setCurrentCard((prev) => (prev + 1) % options.length);
    controls.start("initial");
  };

  return (
    <motion.div className="flex flex-col items-center mt-10">
      {/* Progress Bar */}
      <div className="w-[90%] max-w-md mb-4">
        <div className="text-sm font-semibold text-gray-700">Building Your Report</div>
        <div className="text-sm text-gray-500">
          {`${currentCard + 1} of ${options.length} sections included`}
        </div>
        <div className="bg-gray-200 h-2 rounded-full mt-2">
          <div
            className="bg-blue-500 h-2 rounded-full"
            style={{ width: `${((currentCard + 1) / options.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Card */}
      <motion.div
        className="bg-white rounded-[30px] shadow-xl p-8 w-[90%] max-w-md text-center relative"
        initial="initial"
        animate={controls}
        variants={cardVariants}
        style={{
          borderRadius: "30px", // Soft, large rounded corners
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)", // Soft shadow
        }}
      >
        <div className="flex flex-col items-center gap-4">
          {/* Info icon */}
          <span className="text-4xl">{options[currentCard].icon}</span>
          <h2 className="text-xl font-semibold mb-2">{options[currentCard].title}</h2>
          <p className="text-gray-600">{options[currentCard].description}</p>
        </div>

        {/* Accept/Reject buttons */}
        <div className="flex gap-8 mt-6 justify-center">
          <button
            onClick={() => swipeCard("left")}
            className="bg-red-100 text-red-500 w-12 h-12 rounded-full flex items-center justify-center shadow-md"
          >
            ❌
          </button>
          <button
            onClick={() => swipeCard("right")}
            className="bg-green-100 text-green-500 w-12 h-12 rounded-full flex items-center justify-center shadow-md"
          >
            ✔️
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SwipeableCard;
