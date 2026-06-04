import { useState, useEffect } from "react";

export function CountdownTimer({ targetDate }) {
  const getTarget = () => {
    if (targetDate) return new Date(targetDate);
    const t = new Date();
    t.setDate(t.getDate() + 1);
    t.setHours(18, 0, 0, 0);
    return t;
  };

  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = getTarget();

    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      setTimeLeft({
        hours: Math.floor(diff / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <div className="flex flex-col items-center justify-center">
      <span
        className="font-black uppercase tracking-widest whitespace-nowrap text-[#ff2222]"
        style={{ fontSize: "clamp(6px, 1.4vw, 13px)" }}
      >
        Goes Live In
      </span>
      <div className="flex items-end" style={{ gap: "clamp(1px, 0.4vw, 5px)" }}>
        {[
          { value: timeLeft.hours, label: "HRS" },
          { value: timeLeft.minutes, label: "MIN" },
          { value: timeLeft.seconds, label: "SEC" },
        ].map(({ value, label }, i) => (
          <div key={label} className="flex items-end" style={{ gap: "clamp(1px, 0.4vw, 5px)" }}>
            {i > 0 && (
              <span
                className="text-[#ff2222] font-black leading-none"
                style={{ fontSize: "clamp(10px, 2.2vw, 26px)", paddingBottom: "4px" }}
              >
                :
              </span>
            )}
            <div className="flex flex-col items-center">
              <span
                className="font-black text-white leading-none"
                style={{ fontSize: "clamp(12px, 2.6vw, 28px)" }}
              >
                {pad(value)}
              </span>
              <span
                className="text-gray-400 uppercase tracking-widest"
                style={{ fontSize: "clamp(4px, 0.75vw, 8px)" }}
              >
                {label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}