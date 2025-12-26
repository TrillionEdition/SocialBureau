import React from "react";

export default function ProofFlow() {
  return (
    <section className="bg-black relative overflow-hidden overflow-x-hidden py-24 sm:py-32 lg:py-40 w-full">
      {/* Background Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-full h-full max-w-5xl max-h-[30rem] bg-gradient-to-r from-orange-600 via-purple-700 to-blue-600 opacity-70 blur-3xl"/>
      </div>

      {/* Flow */}
      <div className="relative z-10 flex flex-col lg:flex-row flex-wrap lg:flex-nowrap items-center justify-center gap-4 sm:gap-6 lg:gap-10 max-w-7xl mx-auto px-4">
        {/* HOLDER */}
        <ClickableNode 
          label="Register" 
          color="orange" 
          glowColor="orange" 
          href="/user-register"
        >
          <svg className="w-10 h-10 lg:w-12 lg:h-12 text-black/80" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
          </svg>
        </ClickableNode>

        <Arrow text="Registered" fromColor="orange" toColor="purple" fromShade="500" toShade="600"/>

        {/* PROOF */}
        <ClickableNode 
          label="Verification" 
          color="purple" 
          glowColor="purple"
          dashed={true}
          grid={false}
          href="/proof"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-12 h-12 text-black/80"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <circle cx="12" cy="8" r="3" />
            <path d="M5 20c0-3.5 3.5-6 7-6s7 2.5 7 6" />
            <circle
              cx="12"
              cy="12"
              r="9"
              strokeDasharray="4 4"
              opacity="0.6"
            />
          </svg>
        </ClickableNode>

        <Arrow text="Verified" fromColor="purple" toColor="blue" fromShade="600" toShade="500"/>
        
        <ClickableNode 
          label="Finish" 
          color="blue" 
          glowColor="blue"
          href="/finalstep"
        >
          <img
            src="/applications-proof.png"   // Make sure this file exists in your public folder
            alt="Applications"
            className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 object-contain"
            onError={(e) => {
              // Fallback if image doesn't load
              e.target.style.display = 'none';
              const fallback = document.createElement('div');
              fallback.className = 'w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full bg-gray-300 flex items-center justify-center';
              fallback.textContent = '📋';
              e.target.parentNode.appendChild(fallback);
            }}
          />
        </ClickableNode>
      </div>
    </section>
  );
}

/* ---------------- CLICKABLE NODE ---------------- */
function ClickableNode({label, color, glowColor, dashed, grid, href, children}) {
  // Map color to specific Tailwind classes
  const glowClasses = {
    orange: "shadow-[0_0_60px_rgba(251,146,60,0.8)]",
    purple: "shadow-[0_0_60px_rgba(147,51,234,0.9)]",
    blue: "shadow-[0_0_60px_rgba(59,130,246,0.9)]"
  };

  const ringClasses = {
    orange: "focus-visible:ring-orange-500/40",
    purple: "focus-visible:ring-purple-500/40",
    blue: "focus-visible:ring-blue-500/40"
  };

  return (
    <a 
      href={href} 
      className="group flex flex-col items-center gap-3 cursor-pointer focus-visible:outline-none"
    >
      <div className={`
        relative w-44 h-44 sm:w-52 sm:h-52 lg:w-64 lg:h-64 rounded-full 
        bg-gray-900 flex items-center justify-center 
        transition-transform duration-300 
        group-hover:scale-105 active:scale-95 
        ${ringClasses[glowColor] || ringClasses.orange}
        ${dashed ? "border-4 border-dashed border-purple-500" : "border border-gray-800"}
        ${glowClasses[glowColor] || glowClasses.orange}
      `}>
        {grid ? (
          <div className="grid grid-cols-3 gap-2">
            {Array.from({length: 9}).map((_, i) => (
              <div key={i} className="w-9 h-9 bg-gray-700 rounded-full"/>
            ))}
          </div>
        ) : (
          <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full bg-gradient-to-b from-white to-gray-400 flex items-center justify-center">
            {children}
          </div>
        )}
      </div>
      <span className="px-5 py-2 rounded-full text-base sm:text-lg text-white bg-black/70 border border-white/10 transition-colors group-hover:bg-white/10">
        {label}
      </span>
    </a>
  );
}

/* ---------------- ARROW ---------------- */
function Arrow({text, fromColor, toColor, fromShade = "500", toShade = "500"}) {
  // Map colors to specific gradient classes
  const gradientClasses = {
    "orange-purple": "bg-gradient-to-r from-orange-500 to-purple-600",
    "purple-blue": "bg-gradient-to-r from-purple-600 to-blue-500",
    "orange-blue": "bg-gradient-to-r from-orange-500 to-blue-500",
  };

  // Create a key for the gradient
  const gradientKey = `${fromColor}-${toColor}`;
  
  return (
    <div className="flex flex-col items-center select-none">
      <div className="relative">
        <div className={`w-28 sm:w-40 lg:w-56 h-1 ${gradientClasses[gradientKey] || gradientClasses["orange-purple"]}`}/>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap bg-gray-900 text-white px-4 py-2 rounded-md text-sm sm:text-base shadow">
          {text}
        </div>
      </div>
    </div>
  );
}