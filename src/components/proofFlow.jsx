import React from "react";

export default function ProofFlow() {
  return (
    <section className="bg-black relative overflow-hidden overflow-x-hidden
      py-24 sm:py-32 lg:py-40 w-full">

      {/* Background Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="
          w-full h-full
          max-w-5xl max-h-[30rem]
          bg-gradient-to-r from-orange-600 via-purple-700 to-blue-600
          opacity-70 blur-3xl
        " />
      </div>

      {/* Flow */}
      <div className="
        relative z-10
        flex flex-col lg:flex-row
        flex-wrap lg:flex-nowrap
        items-center justify-center
        gap-4 sm:gap-6 lg:gap-10
        max-w-7xl mx-auto px-4
      ">

        {/* HOLDER */}
        <ClickableNode
          label="Holder"
          color="orange"
          href="/holder"
        >
          <svg className="w-10 h-10 lg:w-12 lg:h-12 text-black/80" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        </ClickableNode>

        <Arrow text="Generate proof" from="orange-500" to="purple-600" />

        {/* PROOF */}
        <ClickableNode
          label="Proof"
          color="purple"
          dashed
          href="/proof"
        />

        <Arrow text="Verified Proof" from="purple-600" to="blue-500" />

        {/* APPLICATIONS */}
        <ClickableNode
          label="Applications"
          color="blue"
          grid
          href="/applications"
        />

      </div>

      <style jsx>{`
        .glow-orange { box-shadow: 0 0 60px rgba(251,146,60,0.8); }
        .glow-purple { box-shadow: 0 0 60px rgba(147,51,234,0.9); }
        .glow-blue { box-shadow: 0 0 60px rgba(59,130,246,0.9); }
      `}</style>
    </section>
  );
}

/* ---------------- CLICKABLE NODE ---------------- */

function ClickableNode({
  label,
  color,
  dashed,
  grid,
  href,
  children,
}) {
  return (
    <a
      href={href}
      className="
        group flex flex-col items-center gap-3
        cursor-pointer
        focus-visible:outline-none
      "
    >
      <div
        className={`
          relative
          w-44 h-44 sm:w-52 sm:h-52 lg:w-64 lg:h-64
          rounded-full
          bg-gray-900
          flex items-center justify-center
          transition-transform duration-300
          group-hover:scale-105
          active:scale-95
          focus-visible:ring-4 focus-visible:ring-${color}-500/40
          ${dashed ? "border-4 border-dashed border-purple-500" : "border border-gray-800"}
          glow-${color}
        `}
      >
        {grid ? (
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="w-9 h-9 bg-gray-700 rounded-full" />
            ))}
          </div>
        ) : (
          <div className="
            w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28
            rounded-full bg-gradient-to-b from-white to-gray-400
            flex items-center justify-center
          ">
            {children}
          </div>
        )}
      </div>

      <span className="
        px-5 py-2
        rounded-full
        text-base sm:text-lg
        text-white
        bg-black/70
        border border-white/10
        transition-colors
        group-hover:bg-white/10
      ">
        {label}
      </span>
    </a>
  );
}

/* ---------------- ARROW ---------------- */

function Arrow({ text, from, to }) {
  return (
    <div className="flex flex-col items-center select-none">
      <div className="relative">
        <div className={`w-28 sm:w-40 lg:w-56 h-1 bg-gradient-to-r from-${from} to-${to}`} />
        <div className="
          absolute top-1/2 left-1/2
          -translate-x-1/2 -translate-y-1/2
          whitespace-nowrap
          bg-gray-900 text-white
          px-4 py-2 rounded-md
          text-sm sm:text-base
          shadow
        ">
          {text}
        </div>
      </div>
    </div>
  );
}
