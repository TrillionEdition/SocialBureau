import React from "react";

export default function BlogHeader() {
  return (
    <section className="text-center py-30 px-4 bg-black">
      <div className="flex justify-center items-center mb-3">
        <div className="w-20 h-px bg-[#ff0000] mr-2"></div>
      </div>
      <h2 className="text-3xl md:text-8xl font-bold leading-tight text-white" style={{ fontFamily: "Playfair Display, serif" }}>
        Performance Insights
        <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-t from-[#ff0000]">
          Without the Fluff
        </span>
      </h2>
      <p className="mt-4 text-gray-400 text-base md:text-2xl">
        Sharp, actionable content from the frontlines of vertical-specific growth.
      </p>
    </section>
  );
}
