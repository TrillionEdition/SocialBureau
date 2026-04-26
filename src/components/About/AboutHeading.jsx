import React from "react";

export const AboutHeading = () => {
  return (
    <div>
      <h1
        className="font-bold text-center py-8 mt-8 text-3xl sm:text-3xl md:text-4xl lg:text-6xl"
        style={{
          fontFamily: "Playfair Display, serif",
          color: "#fff",
          lineHeight: "5rem"
        }}
      >
        Born to <span className="text-[#ff0000]">SCALE</span><br /> the <span className="text-[#ff0000] bg-clip-text bg-gradient-to-t from-[#ff0000]">UNSCALABLE</span>
      </h1>
    </div>
  );
};

