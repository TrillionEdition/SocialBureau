import React, { Suspense } from "react";
export default function Background() {
  return (
    <>
      <div className="absolute w-[500px] h-[500px] bg-blue-400/30 rounded-full blur-3xl animate-move1"></div>
      <div className="absolute w-[600px] h-[600px] bg-purple-400/30 rounded-full blur-3xl animate-move2"></div>
    </>
  );
}
