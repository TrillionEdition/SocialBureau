import React, { useEffect } from "react";
import { useState } from "react";
import { FaStar, FaWordpress, FaFigma } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import profiles from "../data/profiles";
import { Link } from "react-router-dom";
export default function TeamLayout() {
  const [centerIndex, setCenterIndex] = useState(2);
  const [isPaused, setIsPaused] = useState(false);
  
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      handleNext();
    }, 2000);
    return () => clearInterval(interval);
  }, [centerIndex, isPaused]);

  const handlePrev = () => {
    setCenterIndex((idx) => (idx === 0 ? profiles.length - 1 : idx - 1));
  };
  const handleNext = () => {
    setCenterIndex((idx) => (idx === profiles.length - 1 ? 0 : idx + 1));
  };

  const getDisplayProfiles = () => {
    const shown = [];
    for (let offset = -2; offset <= 2; offset++) {
      let idx = (centerIndex + offset + profiles.length) % profiles.length;
      shown.push({ ...profiles[idx], offset });
    }
    return shown;
  };
  return (
    <div className="relative flex items-center w-screen h-[500px] overflow-hidden bg-black/90 px-0 md:px-10 md:pl-20">
  {/* Left Arrow */}
  <button
    className="absolute left-2 md:left-6 z-30 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition disabled:opacity-40"
    onClick={handlePrev}
    aria-label="Previous"
    style={{ top: "50%", transform: "translateY(-50%)" }}
  >
    <FaChevronLeft size={28} className="text-black" />
  </button>
  {/* Right Arrow */}
  <button
    className="absolute right-2 md:right-6 z-30 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition disabled:opacity-40"
    onClick={handleNext}
    aria-label="Next"
    style={{ top: "50%", transform: "translateY(-50%)" }}
  >
    <FaChevronRight size={28} className="text-black" />
  </button>

      <div className="flex flex-1 justify-center items-center h-full relative">
        {getDisplayProfiles().map((profile, idx) => {
          if (profile.offset === 0) {
            return (
              <div
                key={profile.name}
                className="relative group w-[90vw] max-w-[320px] md:w-80 md:max-w-[384px] h-[420px] z-20 mx-auto scale-105 hover:scale-110 transition-transform duration-300 rounded-xl shadow-2xl"
                style={{ boxShadow: "0 6px 48px 8px #0007" }}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <img
                  src={profile.photo}
                  alt={profile.name}
                  className="w-[75%] h-full object-cover rounded-xl mx-auto"
                />
                <div className="absolute inset-0 bg-white/95 backdrop-blur-md opacity-0 translate-y-10 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 rounded-2xl flex flex-col">
                  <div
                    className="h-30 w-full bg-cover bg-center rounded-t-2xl"
                    style={{ backgroundImage: `url(${profile.img})` }}
                  ></div>
                  <div className="flex flex-col items-center text-center p-4 flex-grow">
                    <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center -mt-10 mb-3 border-4 border-white shadow-md">
                      <img
                        src={profile.user}
                        alt={profile.name}
                        className="w-16 h-16 rounded-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {profile.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">{profile.role}</p>
                    <div className="flex items-center justify-center gap-3 mb-4">
                      {profile.tools?.slice(0, 7).map((tool) => (
                        <img
                          key={tool.name}
                          src={tool.img}
                          alt={tool.name}
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
                        <span className="font-semibold">{profile.rate}</span>
                        <p className="text-xs">rate</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 pt-0">
                    {/* <button className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-900 transition"><Link to={`/${encodeURIComponent(profile.name)}`}>Get in touch</Link>
                    </button> */}
                  </div>
                </div>
              </div>
            );
          }
          // Side cards: hide on mobile, show on desktop
          let angle = 0, scale = 0.8, zIdx = 8, opacity = 0.6, translateY = "0px", blur = "blur-sm";
          if (profile.offset === -1) {
            angle = -12;
            scale = 0.92;
            zIdx = 15;
            opacity = 0.84;
            translateY = "-20px";
            blur = "";
          } else if (profile.offset === 1) {
            angle = 12;
            scale = 0.92;
            zIdx = 15;
            opacity = 0.84;
            translateY = "-20px";
            blur = "";
          } else if (profile.offset === -2) {
            angle = -18;
            scale = 0.78;
            zIdx = 8;
            opacity = 0.50;
            translateY = "24px";
            blur = "blur-sm";
          } else if (profile.offset === 2) {
            angle = 18;
            scale = 0.78;
            zIdx = 8;
            opacity = 0.50;
            translateY = "24px";
            blur = "blur-sm";
          }

          return (
            <div
              key={profile.name}
              style={{
                left: `calc(50% + ${profile.offset * 220}px - 180px)`,
                transform: `rotateY(${angle}deg) scale(${scale}) translateY(${translateY})`,
                zIndex: zIdx,
                opacity,
                width: "300px",
                height: "380px",
                pointerEvents: "none"
              }}
              className={`absolute transition-transform duration-500 rounded-xl shadow-xl overflow-hidden ${blur} hidden md:block`}
            >
              <img
                src={profile.photo}
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