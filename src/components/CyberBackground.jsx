import React from "react";
import { useNavigate } from "react-router-dom";

export function CyberBackground() {
  const navigate=useNavigate();
  return (
    <div className="relative flex items-center justify-center min-h-screen max-h-screen bg-black overflow-hidden">
      {/* Animated Glow 1 (Blue) */}
      <div className="absolute w-[500px] h-[500px] bg-blue-400/30 rounded-full blur-3xl animate-move1"></div>

      {/* Animated Glow 2 (Purple) */}
      <div className="absolute w-[600px] h-[600px] bg-purple-400/30 rounded-full blur-3xl animate-move2"></div>

      {/* Center Content */}
      <div className="relative z-10 text-center px-4 md:px-40 sm:px-30">
        <h3
          className="text-3xl sm:text-5xl md:text-6xl font-bold 
             bg-gradient-to-r from-gray-330 via-gray-200 to-gray-350 
             bg-clip-text text-transparent
             drop-shadow-[0_2px_10px_rgba(255,255,255,0.1)]
             tracking-tight"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Integrated API Solutions to Help Accelerate Your Growth 
        </h3>

        <p className="mt-6 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
          From custom integrations to enterprise-level advanced API services, we build relationships that will help your business stay smarter and faster. 
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={() => navigate('/services')} className="relative overflow-hidden px-6 py-3 rounded-full bg-black text-white font-medium shadow-lg hover:shadow-xl transition scan-button">
            View Our Services
          </button>
          <button
              onClick={() => {
                window.open(
                  "https://wa.me/918921840486?text=Hello, I would like to learn more.",
                  "_blank"
                );
              }}
              className="px-6 py-3 rounded-full border border-gray-500 text-gray-300 hover:bg-gray-500/40 transition">
            Book an Appointment Today!
          </button>
        </div>
      </div>
<style>{`
  .scan-button::before,
  .scan-button::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #000000ff, transparent);
  }

  /* Top line: left → right, glow to the right */
  .scan-button::before {
    top: 0;
    left: -100%;
    animation: scan-top 2s linear infinite;
    box-shadow: 2px 0 8px #ffffffff, 4px 0 15px #ffffffff, 6px 0 20px #ffffffff;
  }

  /* Bottom line: right → left, glow to the left */
  .scan-button::after {
    bottom: 0;
    left: 100%;
    animation: scan-bottom 2s linear infinite;
    box-shadow: -2px 0 8px #ffffffff, -4px 0 15px #ffffffff, -6px 0 20px #ffffffff;
  }

  @keyframes scan-top {
    0% { left: -100%; }
    100% { left: 100%; }
  }

  @keyframes scan-bottom {
    0% { left: 100%; }
    100% { left: -100%; }
  }
`}</style>

    </div>
  );
}
