import { ArrowRight, MoveRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Clients() {
  const images = [
    // { url: "https://www.newstamil.tv/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmain-logo.ae4ceeb6.png&w=640&q=75", bg: "#ffffff" },
    { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Reporter_TV_2023.jpg/250px-Reporter_TV_2023.jpg", bg: "#ffffff" },
    { url: "https://emaraj.com/wp-content/uploads/2024/04/EMARAJ-LOGO-2048x834.png", bg: "#ffffff" },
    { url: "data:image/jpeg;base64,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", bg: "#ffffff" },
    { url: "https://kochamminis.com/cdn/shop/files/logo.png?v=1740811705", bg: "#ffffff" },
  ];

  const bubbles = [
    // sizes: { sm, md, lg } in px
    { id: 1, value: "30+", label: "Social media handled", sizes: { sm: 180, md: 240, lg: 270 }, top: 25, left: 22 },
    { id: 2, value: "327K+", label: "Viewership", sizes: { sm: 220, md: 350, lg: 380 }, top: 35, left: 57 },
    { id: 3, value: "30+", label: "On going projects", sizes: { sm: 140, md: 200, lg: 220 }, top: 60, left: 35 },
    { id: 4, value: "5M+", label: "Organic Followers Created", sizes: { sm: 170, md: 180, lg: 220 }, top: 55, left: 80 },
    { id: 5, value: "10+", label: "Trusted Clients", sizes: { sm: 110, md: 140, lg: 160 }, top: 14, left: 78 },
  ];

  function useBreakpoint() {
    const getBp = (w) => {
      if (w < 640) return "sm"; // mobile
      if (w < 1024) return "md"; // tablet
      return "lg"; // desktop and up
    };

    const [bp, setBp] = useState(getBp(typeof window !== "undefined" ? window.innerWidth : 1200));

    useEffect(() => {
      function onResize() {
        setBp(getBp(window.innerWidth));
      }
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }, []);

    return bp;
  }
  const bp = useBreakpoint();
  const navigate = useNavigate();

  return (
    <div className="bg-black">
      {/* Bubbles section (Stats) */}
      <div className="w-full md:h-[70vh] sm:h-[60vh] bg-black relative overflow-hidden px-6 sm:px-8 md:px-10 lg:px-12">
        {bubbles.map((b) => {
          const size = b.sizes[bp] ?? b.sizes.lg;
          // fonts relative to bubble size
          const bigFont = Math.round(size * 0.28); // big number size
          const smallFont = Math.round(size * 0.085); // label size

          return (
            <div
              key={b.id}
              className="absolute rounded-full border border-gray-300/40 flex flex-col items-center justify-center text-white select-none transition-transform hover:scale-105 duration-500 ease-out"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                top: `${b.top}%`,
                left: `${b.left}%`,
                transform: "translate(-50%, -50%)",
                backgroundColor: "transparent",
              }}
            >
              <div
                className="font-extrabold leading-none text-white drop-shadow-md"
                style={{ fontSize: `${bigFont}px`, lineHeight: 1 }}
              >
                {b.value}
              </div>
              <div
                className="mt-2 text-center text-gray-200 font-medium"
                style={{ fontSize: `${smallFont}px`, lineHeight: 1.1 }}
              >
                {b.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Clients Section - Cute & VISIBLE */}
      <div className="bg-black pb-24 pt-10 px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-2" style={{ fontFamily: "Playfair Display, serif" }}>
            Our Top Clients
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-lg mx-auto">
            Growing together with amazing brands
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Grid Layout - Cute Bubbles with Visibility */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {images.map((image, index) => (
              <div
                key={index}
                className="group relative"
              >
                {/* Cute Circular Container - Clean White Background */}
                <div
                  className="
                        w-28 h-28 md:w-36 md:h-36 
                        bg-white
                        rounded-full 
                        flex items-center justify-center 
                        p-6
                        transition-all duration-300 
                        transform hover:scale-110 hover:-translate-y-2
                        cursor-pointer
                        shadow-lg shadow-white/5
                        hover:shadow-xl hover:shadow-blue-500/30
                      "
                >
                  <img
                    src={image.url}
                    alt={`Client ${index + 1}`}
                    className="
                          w-full h-full object-contain 
                          transition-all duration-300
                          opacity-100
                        "
                    loading="lazy"
                  />
                </div>

                {/* Bouncing Dot Decoration */}
                <div className="
                      absolute -bottom-4 left-1/2 -translate-x-1/2 
                      w-1.5 h-1.5 rounded-full bg-blue-500 
                      opacity-0 group-hover:opacity-100 
                      transition-all duration-300 delay-100
                      group-hover:animate-bounce
                   "></div>
              </div>
            ))}
          </div>

          {/* 'View More' - Simple & Cute */}
          <div className="mt-20 text-center">
            <button
              onClick={() => navigate('/contact')}
              className="
                   inline-flex items-center gap-2
                   px-8 py-3 rounded-full 
                   bg-white/5 border border-white/20
                   text-white text-sm font-medium
                   hover:bg-white hover:text-black
                   transition-all duration-300
                   hover:scale-105
                "
            >
              <span>Start a project</span>
              <MoveRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
