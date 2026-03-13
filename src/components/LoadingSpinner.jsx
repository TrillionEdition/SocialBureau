import React from "react";

const LoadingSpinner = () => {
  const letters = [
    { char: "S", delay: 0 },
    { char: "o", delay: 0.1 },
    { char: "c", delay: 0.2 },
    { char: "i", delay: 0.3 },
    { char: "a", delay: 0.4 },
    { char: "l", delay: 0.5 },
    { char: "B", delay: 0.6, color: "#ff0000" },
    { char: "u", delay: 0.7 },
    { char: "r", delay: 0.8 },
    { char: "e", delay: 0.9 },
    { char: "a", delay: 1.0 },
    { char: "u", delay: 1.1 },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-black flex-col">
      {/* Logo Text - Sequential Letter Animation */}
      <div
        className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide text-white flex items-center"
        style={{ fontFamily: "MyFont, sans-serif" }}
      >
        {letters.map((letterObj, index) => (
          <span
            key={index}
            className="inline-block"
            style={{
              color: letterObj.color || "white",
              animation: `fadeInSlide 0.5s ease-out forwards`,
              animationDelay: `${letterObj.delay}s`,
            }}
          >
            {letterObj.char}
          </span>
        ))}
      </div>

      {/* Loading dots */}
      <div className="mt-6 flex space-x-2">
        <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
        <div
          className="w-2 h-2 bg-white rounded-full animate-bounce"
          style={{ animationDelay: "0.15s" }}
        ></div>
        <div
          className="w-2 h-2 bg-white rounded-full animate-bounce"
          style={{ animationDelay: "0.3s" }}
        ></div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes fadeInSlide {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce {
          0%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-6px);
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
