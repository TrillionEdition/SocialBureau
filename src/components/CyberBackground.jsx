import React, { useEffect, useState } from "react";

export function CyberBackground() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-black">
      <h1
        className="
          text-[20vw] font-extrabold text-white 
          relative
          drop-shadow-[0_0_15px_rgba(255,0,128,0.8)]
          after:content-[''] after:absolute after:inset-0 after:rounded-lg
          after:blur-[60px] after:bg-gradient-to-r after:from-pink-500 after:to-purple-500 after:-z-10
        "
      >
        New year
      </h1>
    </div>
  );
}
