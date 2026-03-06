import React, { useEffect, useMemo, useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { usersAPI } from "../../services/userServices";
import { useQuery } from "@tanstack/react-query";

export default function TeamLayout() {
  // start centerIndex at 0; we'll clamp it when users arrive
  const [centerIndex, setCenterIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: usersAPI,
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  // users may be returned directly or wrapped (e.g., axios -> response.data)
  const users = useMemo(() => {
    if (!data) return [];
    return data?.data ?? data ?? [];
  }, [data]);

  // When users change, ensure centerIndex is within bounds (and default to middle-ish if possible)
  useEffect(() => {
    if (!users || users.length === 0) {
      setCenterIndex(0);
      return;
    }
    // If centerIndex is out of range, clamp it to a valid index.
    setCenterIndex((prev) => {
      if (prev < 0) return 0;
      if (prev > users.length - 1) return users.length - 1;
      return prev;
    });
  }, [users]);

  // Autoplay: advance only when not paused and when there's more than one user
  useEffect(() => {
    if (isPaused) return;
    if (!users || users.length <= 1) return;

    const interval = setInterval(() => {
      setCenterIndex((idx) => (idx === users.length - 1 ? 0 : idx + 1));
    }, 2000);

    return () => clearInterval(interval);
  }, [isPaused, users]);

  const handlePrev = () => {
    if (!users || users.length === 0) return;
    setCenterIndex((idx) => (idx === 0 ? users.length - 1 : idx - 1));
  };
  const handleNext = () => {
    if (!users || users.length === 0) return;
    setCenterIndex((idx) => (idx === users.length - 1 ? 0 : idx + 1));
  };

  // Compute a circular minimal signed offset for item at index `i` relative to centerIndex.
  // For display we limit visible offsets to [-2, -1, 0, 1, 2]; anything outside is considered hidden.
  const getDisplayOffset = (i) => {
    const n = users.length;
    if (n === 0) return Infinity;
    // raw difference
    let diff = i - centerIndex;
    // normalize to range -(n-1)..(n-1)
    if (diff > 0 && Math.abs(diff) > n / 2) diff -= n;
    if (diff < 0 && Math.abs(diff) > n / 2) diff += n;
    // clamp to [-2,2] for display; return a sentinel (null) if outside
    if (diff > 2 || diff < -2) return null;
    return diff;
  };

  if (!users || users.length === 0) {
    return (
      <div className="w-screen h-[500px] flex items-center justify-center bg-black/90 text-white">
        Loading team...
      </div>
    );
  }

  return (
    <div
      className="relative flex items-center w-screen h-[500px] overflow-hidden bg-black/90 px-0 md:px-10 md:pl-20"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Left Arrow */}
      <button
        className="absolute left-2 md:left-6 z-30 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition disabled:opacity-40"
        onClick={handlePrev}
        aria-label="Previous"
        style={{ top: "50%", transform: "translateY(-50%)" }}
        disabled={users.length <= 1}
      >
        <FaChevronLeft size={28} className="text-black" />
      </button>
      {/* Right Arrow */}
      <button
        className="absolute right-2 md:right-6 z-30 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition disabled:opacity-40"
        onClick={handleNext}
        aria-label="Next"
        style={{ top: "50%", transform: "translateY(-50%)" }}
        disabled={users.length <= 1}
      >
        <FaChevronRight size={28} className="text-black" />
      </button>

      <div className="flex flex-1 justify-center items-center h-full relative">
        {users?.map((rawProfile, idx) => {
          // Normalize shape: API may provide different fields; use fallbacks
          const profile = {
            id: rawProfile.id ?? rawProfile._id ?? rawProfile.name,
            name: rawProfile.name ?? rawProfile.fullName ?? "Unnamed",
            role: rawProfile.role ?? rawProfile.title ?? "",
            idCard: rawProfile.idCard ?? rawProfile.cardImage ?? "",
            coverImage: rawProfile.coverImage ?? rawProfile.cover ?? "",
            dp: rawProfile.dp ?? "",
            tools: rawProfile.tools ?? rawProfile.tech ?? [],
            rating: rawProfile.rating ?? rawProfile.stars ?? "-",
            exp: rawProfile.exp ?? "-",
            rate: rawProfile.rate ?? "-",
          };
          const offset = getDisplayOffset(idx);

          // Center card
          if (offset === 0) {
            return (
              <div
                key={profile.id}
                className="relative group w-[90vw] max-w-[320px] md:w-80 md:max-w-[384px] h-[420px] z-20 mx-auto scale-105 hover:scale-110 transition-transform duration-300 rounded-xl shadow-2xl"
                style={{ boxShadow: "0 6px 48px 8px #0007" }}
                // center card hover pauses via parent, but keep handlers for extra safety
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                {/* Use idCard if available, otherwise fallback to photo */}
                <img
                  src={profile.idCard}
                  alt={profile.name}
                  className="w-[75%] h-full object-cover rounded-xl mx-auto"
                />
                <div className="absolute inset-0 bg-white/95 backdrop-blur-md opacity-0 translate-y-10 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 rounded-2xl flex flex-col">
                  <div
                    className="h-30 w-full bg-cover bg-center rounded-t-2xl"
                    style={{ backgroundImage: `url(${profile.coverImage})` }}
                  ></div>
                  <div className="flex flex-col items-center text-center p-4 flex-grow">
                    <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center -mt-10 mb-3 border-4 border-white shadow-md">
                      <img
                        src={profile.dp}
                        alt={profile.name}
                        className="w-16 h-16 rounded-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <h3 className="font-semibold text-gray-900 text-lg">{profile.name}</h3>
                    <p className="text-sm text-gray-500 mb-4">{profile.role}</p>
                    <div className="flex items-center justify-center gap-3 mb-4">
                      {profile.tools?.slice(0, 7).map((tool) => (
                        <img
                          key={tool.toolName}
                          src={ tool.icon}
                          alt={tool.toolName}
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      ))}
                    </div>
                    <div className="flex justify-between w-full border-t pt-3 text-sm text-gray-600">
                      <div className="flex flex-col items-center w-1/3">
                        <div className="flex items-center gap-1">
                          <FaStar className="text-yellow-400" />
                          <span className="font-semibold">{profile.rating}</span>
                        </div>
                        <p className="text-xs">rating</p>
                      </div>
                      <div className="flex flex-col items-center w-1/3">
                        <span className="font-semibold">{profile.exp}</span>
                        <p className="text-xs">Experience</p>
                      </div>
                      <div className="flex flex-col items-center w-1/3">
                        <span className="font-semibold">${profile.rate}</span>
                        <p className="text-xs">rate</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 pt-0">
                    <button className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-900 transition">
                      {/* <Link to={`/${encodeURIComponent(profile.name)}`}> */}
                      Get in touch
                      {/* </Link> */}
                    </button>
                  </div>
                </div>
              </div>
            );
          }

          // Hidden (offset null) -> don't render anything
          if (offset === null || typeof offset === "undefined") return null;

          // Side cards (offset -2, -1, 1, 2)
          let angle = 0,
            scale = 0.8,
            zIdx = 8,
            opacity = 0.6,
            translateY = "0px",
            blur = "blur-sm";
          if (offset === -1) {
            angle = -12;
            scale = 0.92;
            zIdx = 15;
            opacity = 0.84;
            translateY = "-20px";
            blur = "";
          } else if (offset === 1) {
            angle = 12;
            scale = 0.92;
            zIdx = 15;
            opacity = 0.84;
            translateY = "-20px";
            blur = "";
          } else if (offset === -2) {
            angle = -18;
            scale = 0.78;
            zIdx = 8;
            opacity = 0.5;
            translateY = "24px";
            blur = "blur-sm";
          } else if (offset === 2) {
            angle = 18;
            scale = 0.78;
            zIdx = 8;
            opacity = 0.5;
            translateY = "24px";
            blur = "blur-sm";
          }

          // position calculation
          const leftCalc = `calc(50% + ${offset * 220}px - 180px)`;

          return (
            <div
              key={profile.id}
              role="button"
              tabIndex={0}
              onClick={() => setCenterIndex(idx)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setCenterIndex(idx);
              }}
              style={{
                left: leftCalc,
                transform: `rotateY(${angle}deg) scale(${scale}) translateY(${translateY})`,
                zIndex: zIdx,
                opacity,
                width: "300px",
                height: "380px",
                cursor: "pointer",
              }}
              className={`absolute transition-transform duration-500 rounded-xl shadow-xl overflow-hidden ${blur} hidden md:block`}
              aria-label={`Show ${profile.name}`}
            >
              <img
                src={profile.idCard }
                alt={profile.name}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
