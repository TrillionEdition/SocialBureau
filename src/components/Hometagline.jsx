import React, { useState, useEffect } from "react";

const lines = ["Lean team.", "High brain power.", "Zero waste."];

const Hometagline = () => {
  const [step, setStep] = useState(0);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    let intervalId = null;
    let localStep = 0;

    const runCycle = () => {
      intervalId = setInterval(() => {
        if (localStep < lines.length) {
          setStep(localStep);
          setShowAll(false);
          localStep += 1;
        } else {
          setShowAll(true);
          localStep = 0;
        }
      }, 2200);
    };

    runCycle();
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      tabIndex={0}
      className="relative z-10 flex bg-black select-none items-center text-center justify-center py-20"
    >
      <div className="flex flex-col md:flex-row gap-3 text-center ">
        {showAll
          ? lines.map((line) => (
              <span
                key={line}
                className={`text-2xl font-semibold ${
                  line === "High brain power." ? "text-white" : "text-[#ff0000]"
                }`}
              >
                {line}
              </span>
            ))
          : lines.map((line, idx) => (
              <span
                key={line}
                className={`text-2xl font-semibold transition-opacity duration-1000 ${
                  step === idx ? "opacity-100" : "opacity-30"
                } ${line === "High brain power." ? "text-white" : "text-[#ff0000]"}`}
              >
                {line}
              </span>
            ))}
      </div>
    </div>
  );
};

export default Hometagline;
