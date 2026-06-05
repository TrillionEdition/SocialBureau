import { useEffect, useState } from "react";

const steps = [
  "Analyzing Business Model",
  "Building Team Structure",
  "Generating KPIs",
  "Creating Workflows",
  "Preparing 90-Day Roadmap",
];

export default function GeneratingScreen() {
  const [current, setCurrent] =
    useState(0);

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      index++;

      if (index < steps.length) {
        setCurrent(index);
      }
    }, 2500);

    return () =>
      clearInterval(interval);
  }, []);

  return (
    <div className="
      min-h-screen
      bg-[#0A0A0A]
      flex
      flex-col
      justify-center
      items-center
      text-center
      px-6
    ">
      <div className="
        w-[60px]
        h-[60px]
        rounded-[14px]
        bg-[#E8192C]
        flex
        items-center
        justify-center
        text-white
        font-black
        text-2xl
        animate-pulse
      ">
        SB
      </div>

      <h1 className="
        mt-8
        text-[clamp(40px,5vw,60px)]
        font-black
      ">
        GENERATING
      </h1>

      <p className="
        mt-3
        text-[#A8A49C]
      ">
        Building your custom blueprint
      </p>

      <div className="
        mt-10
        w-full
        max-w-[500px]
        space-y-3
      ">
        {steps.map((step, index) => (
          <div
            key={step}
            className={`
              p-4
              rounded-[10px]
              border
              flex
              items-center
              gap-3

              ${
                index <= current
                  ? "bg-[rgba(232,25,44,.12)] border-[#E8192C]"
                  : "bg-[#111110] border-[rgba(255,255,255,.07)]"
              }
            `}
          >
            <div>
              {index <= current
                ? "✓"
                : "○"}
            </div>

            {step}
          </div>
        ))}
      </div>

      <div className="
        mt-10
        w-[300px]
        h-[3px]
        bg-[#2A2825]
        rounded-full
        overflow-hidden
      ">
        <div
          className="
            h-full
            bg-[#E8192C]
            animate-[grow_14s_linear_forwards]
          "
        />
      </div>
    </div>
  );
}