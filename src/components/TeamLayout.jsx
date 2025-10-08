import React, { useEffect } from "react";
import { useState } from "react";
import { FaStar, FaWordpress, FaFigma } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
const profiles = [
  
  {
    name: "Anjay Ramesh",
    role: "Content & Copy Writer",
    tools:[
      { name: "wordpress", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330" },
      { name: "figma", img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97" }
    ],
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    photo:"assets/team4.webp",
    user:"assets/anjay.webp",
    rating: "4.6",
    duration: "7 Days",
    rate: "$50/hr",
  },
  
  {
    name: "Sherin",
    role: "COO & HR",
    img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
    photo:"assets/team3.webp",
    tools:[
      { name: "zoho", img: "https://www.softwaredekho.in/_next/image?url=https%3A%2F%2Fsoftwaredekho.s3.ap-south-1.amazonaws.com%2Fpublic-assets%2F1c46627d832b8c12dd366f695c04aabe.jpg&w=3840&q=75" },
    ],
    user:"assets/sherin.webp",
    rating: "4.8",
    duration: "12 Days",
    rate: "$55/hr",
  },
  {
    name: "Elizebath Thomas",
    role: "Web Developer",
    img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce",
    tools:[
      { name: "react", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/862px-React-icon.svg.png" },
      { name: "node", img: "https://cdn-icons-png.flaticon.com/512/919/919825.png" },
      { name: "mongodb", img: "https://toppng.com/uploads/preview/mongodb-logo-11609369386lqoc6r2ga9.png" },
      { name: "clickup", img: "https://clickup.com/images/for-se-page/clickup.png" },
      { name: "python", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1200px-Python-logo-notext.svg.png" },
      { name: "wordpress", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiQqvP9mSAN_KNxZlbvD9VT-yl4Vf_PuT6Cw&s" },
      { name: "shopify", img: "https://cdn3.iconfinder.com/data/icons/social-media-2068/64/_shopping-512.png" },
    ],
    photo:"assets/team5.webp",
    user:"assets/elizebath.webp",
    rating: "4.2",
    duration: "5 Days",
    rate: "$35/hr",
  },
  {
    name: "Aneek",
    role: "Performance Marketer",
    img: "https://images.unsplash.com/photo-1503264116251-35a269479413",
    photo:"assets/team6.webp",
    user:"assets/aneek.webp",
    rating: "4.5",
    duration: "10 Days",
    rate: "$45/hr",
  },
  {
    name: "Afnas",
    role: "Cinematographer",
    img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
    photo:"assets/team7.webp",
    user:"assets/afnas.webp",
    rating: "4.8",
    duration: "12 Days",
    rate: "$55/hr",
  },
  {
    name: "Hajira",
    role: "Administration Head",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    photo:"assets/team8.webp",
    user:"assets/hajira.webp",
    rating: "4.6",
    duration: "7 Days",
    rate: "$50/hr",
  },
];

export default function TeamLayout() {
  const [centerIndex, setCenterIndex] = useState(2); // Default to the middle card
  const [isPaused, setIsPaused] = useState(false);   // <-- NEW

  // AUTOSCROLL: scrolls to next card every 2 seconds, unless paused
  useEffect(() => {
    if (isPaused) return; // <-- NEW
    const interval = setInterval(() => {
      handleNext();
    }, 2000);
    return () => clearInterval(interval);
  }, [centerIndex, isPaused]); // <-- include isPaused

  const handlePrev = () => {
    setCenterIndex((idx) => (idx === 0 ? profiles.length - 1 : idx - 1));
  };
  const handleNext = () => {
    setCenterIndex((idx) => (idx === profiles.length - 1 ? 0 : idx + 1));
  };

  // Cards to display (center + 2 on each side)
  const getDisplayProfiles = () => {
    const shown = [];
    for (let offset = -2; offset <= 2; offset++) {
      let idx = (centerIndex + offset + profiles.length) % profiles.length;
      shown.push({ ...profiles[idx], offset });
    }
    return shown;
  };

  return (
    <div className="relative flex items-center w-full h-[500px] overflow-hidden bg-black/90 px-0 md:px-10">
      
      {/* Cards */}
      <div className="flex flex-1 justify-center items-center h-full">
        {getDisplayProfiles().map((profile, idx) => {
          if (profile.offset === 0) {
            return (
              <div
                key={profile.name}
                className="relative group w-80 md:w-96 h-[420px] z-20 mx-[-40px] scale-105 hover:scale-110 transition-transform duration-300 rounded-xl shadow-2xl"
                style={{ boxShadow: "0 6px 48px 8px #0007" }}
                onMouseEnter={() => setIsPaused(true)}    // <-- NEW
                onMouseLeave={() => setIsPaused(false)}   // <-- NEW
              >
                {/* Main Image */}
                <img
                  src={profile.photo}
                  alt={profile.name}
                  className="w-full h-full object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-white/95 backdrop-blur-md opacity-0 translate-y-10 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 rounded-2xl flex flex-col">
                  {/* Top 1/3 Image Background */}
                  <div
                    className="h-32 w-full bg-cover bg-center rounded-t-2xl"
                    style={{ backgroundImage: `url(${profile.img})` }}
                  ></div>
                  {/* Profile Info */}
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
                    {/* Tools */}
                    <div className="flex items-center justify-center gap-3 mb-4">
                      {profile.tools?.map((tool) => (
                        <img
                          key={tool.name}
                          src={tool.img}
                          alt={tool.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ))}
                    </div>
                    {/* Stats */}
                    <div className="flex justify-between w-full border-t pt-3 text-sm text-gray-600">
                      <div className="flex flex-col items-center w-1/3">
                        <div className="flex items-center gap-1">
                          <FaStar className="text-yellow-400" />
                          <span className="font-semibold">{profile.rating}</span>
                        </div>
                        <p className="text-xs">rating</p>
                      </div>
                      <div className="flex flex-col items-center w-1/3">
                        <span className="font-semibold">{profile.duration}</span>
                        <p className="text-xs">duration</p>
                      </div>
                      <div className="flex flex-col items-center w-1/3">
                        <span className="font-semibold">{profile.rate}</span>
                        <p className="text-xs">rate</p>
                      </div>
                    </div>
                  </div>
                  {/* Button */}
                  <div className="p-4 pt-0">
                    <button className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-900 transition">
                      Get in touch
                    </button>
                  </div>
                </div>
              </div>
            );
          }
          // Side cards styling (angled, faded)
          // For adjacent (2nd) cards
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
  className={`absolute transition-transform duration-500 rounded-xl shadow-xl overflow-hidden ${blur}`}
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
