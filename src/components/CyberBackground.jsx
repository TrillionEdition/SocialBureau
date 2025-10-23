import React, { Suspense } from "react";
import { useNavigate } from "react-router-dom";

const BackgroundGlows = React.lazy(() => import("./Background"));

export function CyberBackground() {
  const navigate = useNavigate();
  const isMobile = window.innerWidth < 768; // md breakpoint

  return (
    <div
      className={`relative flex items-center justify-center min-h-screen max-h-screen overflow-hidden
        ${isMobile ? "bg-gradient-to-b from-black via-gray-900 to-black" : "bg-black"}
      `}
    >
      {/* Only show animated glows on desktop */}
      {!isMobile && (
        <Suspense fallback={null}>
          <BackgroundGlows />
        </Suspense>
      )}

      {/* Center Content */}
      <div className="relative z-10 text-center px-4 md:px-40 sm:px-30">
        <h1
          className="text-3xl sm:text-5xl md:text-6xl font-bold 
             bg-gradient-to-r from-gray-300/20 via-white to-gray-300/20 
             bg-clip-text text-transparent
             tracking-tight"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Integrated API Solutions to Help Accelerate Your Growth
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
          From custom integrations to enterprise-level advanced API services, we
          build relationships that will help your business stay smarter and
          faster.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            name="services"
            onClick={() => navigate("/services")}
            className="relative overflow-hidden px-6 py-3 rounded-full bg-black text-white font-medium shadow-lg hover:shadow-xl transition scan-button"
          >
            View Our Services
          </button>
          <button
            name="chat"
            onClick={() => {
              window.open(
                "https://wa.me/918921840486?text=Hello, I would like to learn more.",
                "_blank"
              );
            }}
            className="px-6 py-3 rounded-full border border-gray-500 text-gray-300 hover:bg-gray-500/40 transition"
          >
            Book an Appointment Today!
          </button>
        </div>
      </div>
    </div>
  );
}
