import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function HomeServices() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const hubRef = useRef(null);
  const navigate = useNavigate();

  const badges = [
    {
      icon: "fas fa-sitemap",
      text: "API Marketing",
      color: "purple",
      description:
        "Integrate your ad platforms and automate campaign delivery through advanced APIs.",
      particleColor: "#a855f7",
      path: "/api-marketing",
    },
    {
      icon: "fas fa-bullseye",
      text: "Niche Marketing",
      color: "amber",
      description:
        "Hyper-targeted campaigns tailored for specific industries and audiences.",
      particleColor: "#f59e0b",
      path: "/services/Content-Niche-Marketing",
    },
    {
      icon: "fas fa-comments",
      text: "Content Marketing",
      color: "indigo",
      description:
        "Data-backed storytelling that increases brand awareness and engagement.",
      particleColor: "#6366f1",
      path: "/services/Content-Niche-Marketing",
    },
    {
      icon: "fas fa-globe",
      text: "AdTech Integration",
      color: "rose",
      description:
        "Seamless connection between social, analytics, and CRM platforms.",
      particleColor: "#ec4899",
      path: "/services/MarTech",
    },
    {
      icon: "fas fa-chart-line",
      text: "Performance Marketing",
      color: "teal",
      description:
        "ROI-driven strategies to boost leads, sales, and visibility.",
      particleColor: "#14b8a6",
      path: "/services/Performance-Marketing",
    },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particles = [];

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
      }
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Background particles
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.4,
      });
    }

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background Particles
      ctx.fillStyle = "white";
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.globalAlpha = p.opacity * 0.15;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Connections - ONLY ON DESKTOP
      const isDesktop = window.innerWidth >= 1024;

      if (isDesktop && hubRef.current && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const hubRect = hubRef.current.getBoundingClientRect();

        const hubX = hubRect.left - containerRect.left + hubRect.width / 2;
        const hubY = hubRect.top - containerRect.top + hubRect.height / 2;

        badges.forEach((badge, idx) => {
          const card = cardsRef.current[idx];
          if (!card) return;

          const cardRect = card.getBoundingClientRect();
          const startX = cardRect.right - containerRect.left;
          const startY = cardRect.top - containerRect.top + cardRect.height / 2;

          const isHovered = hoveredIndex === idx;
          const isAnythingHovered = hoveredIndex !== null;

          if (isAnythingHovered && !isHovered) return;

          const cx1 = startX + (hubX - startX) * 0.5;
          const cy1 = startY;
          const cx2 = startX + (hubX - startX) * 0.5;
          const cy2 = hubY;

          const gradient = ctx.createLinearGradient(startX, startY, hubX, hubY);
          gradient.addColorStop(0, badge.particleColor);
          gradient.addColorStop(1, "rgba(0,0,0,0)");

          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.bezierCurveTo(cx1, cy1, cx2, cy2, hubX, hubY);

          ctx.strokeStyle = gradient;
          ctx.lineCap = "round";

          if (isHovered) {
            ctx.lineWidth = 3;
            ctx.globalAlpha = 1;
            ctx.shadowColor = badge.particleColor;
            ctx.shadowBlur = 20;
          } else {
            ctx.lineWidth = 1;
            ctx.globalAlpha = 0.3;
            ctx.shadowBlur = 0;
          }
          ctx.stroke();
          ctx.shadowBlur = 0;

          // Flowing particle
          if (isHovered || !isAnythingHovered) {
            const time = Date.now() / 1500;
            const t = (time + idx * 0.2) % 1;

            const mt = 1 - t;
            const mt2 = mt * mt;
            const mt3 = mt2 * mt;
            const t2 = t * t;
            const t3 = t2 * t;

            const px =
              mt3 * startX + 3 * mt2 * t * cx1 + 3 * mt * t2 * cx2 + t3 * hubX;
            const py =
              mt3 * startY + 3 * mt2 * t * cy1 + 3 * mt * t2 * cy2 + t3 * hubY;

            ctx.beginPath();
            ctx.arc(px, py, isHovered ? 4 : 2, 0, Math.PI * 2);
            ctx.fillStyle = badge.particleColor;
            ctx.globalAlpha = isHovered ? 1 : 0.6;
            ctx.fill();

            if (isHovered) {
              ctx.shadowBlur = 10;
              ctx.shadowColor = badge.particleColor;
              ctx.fill();
              ctx.shadowBlur = 0;
            }
          }
        });
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [hoveredIndex]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-[90vh] bg-black overflow-hidden flex items-center py-10 lg:py-20"
    >
      <style>{`
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&display=swap');
        
        .service-container {
            font-family: 'Outfit', sans-serif;
        }
        .hub-ring {
           position: absolute;
           border-radius: 50%;
           border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .service-pill {
            transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
        }
      `}</style>

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      <div className="w-full relative z-10 service-container">
        {/* FULL-WIDTH HEADING — TRUE CENTER */}
        <div className="w-full flex justify-center mb-16 px-6 lg:px-16">
          <div className="text-center max-w-4xl">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none italic mb-8">
              <span
                className="text-transparent mr-4"
                style={{ WebkitTextStroke: "1px rgba(255,255,255,0.8)" }}
              >
                CORE
              </span>
              <span className="text-red-600">SERVICES</span>
            </h2>

            <p className="text-gray-400 text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto">
              Connect your brand to advanced data ecosystems and automated
              growth engines.
            </p>
          </div>
        </div>

        {/* MAIN CONTENT - Services List + Hub */}
        <div className="container mx-auto px-6 lg:px-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">
            {/* Services List */}
            <div className="w-full lg:w-3/5 flex flex-col gap-6">
              <div className="flex flex-col gap-5 max-w-md mx-auto lg:mx-0">
                {badges.map((badge, idx) => {
                  const isHovered = hoveredIndex === idx;
                  const isDimmed = hoveredIndex !== null && !isHovered;

                  return (
                    <div
                      key={idx}
                      ref={(el) => (cardsRef.current[idx] = el)}
                      onMouseEnter={() => setHoveredIndex(idx)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      onClick={() => navigate(badge.path)}
                      className={`
                          service-pill relative flex items-center gap-5 p-3 pr-10 rounded-full cursor-pointer
                          border border-white/10 backdrop-blur-xl group
                          ${isHovered ? "translate-x-6 lg:translate-x-10 scale-105" : "translate-x-0 scale-100"}
                          ${isDimmed ? "opacity-30 grayscale-[0.8]" : "opacity-100 grayscale-0"}
                      `}
                      style={{
                        background: isHovered
                          ? `linear-gradient(90deg, ${badge.particleColor} 0%, ${badge.particleColor}cc 100%)`
                          : `linear-gradient(90deg, rgba(255,255,255,0.06) 0%, ${badge.particleColor}77 30%, ${badge.particleColor}22 100%)`,
                        boxShadow: isHovered
                          ? `0 20px 50px -10px ${badge.particleColor}aa`
                          : `0 8px 30px -12px ${badge.particleColor}33`,
                      }}
                    >
                      {/* Icon Wrapper */}
                      <div
                        className={`
                              w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center text-xl lg:text-2xl
                              bg-white/10 text-white transition-all duration-700
                              ${isHovered ? "bg-white text-black rotate-[360deg]" : ""}
                          `}
                      >
                        <i className={badge.icon}></i>
                      </div>

                      {/* Text */}
                      <div className="flex flex-col">
                        <span
                          className={`
                                  text-xl lg:text-2xl font-bold tracking-wide transition-colors duration-300
                                  ${isHovered ? "text-white" : "text-gray-200"}
                              `}
                        >
                          {badge.text}
                        </span>
                      </div>

                      {/* Arrow Right */}
                      <div
                        className={`
                              ml-auto transition-all duration-500
                              ${isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}
                          `}
                      >
                        <i className="fas fa-arrow-right text-white"></i>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Hub Visualization */}
            <div className="hidden lg:flex w-full lg:w-2/5 items-center justify-center lg:justify-end">
              <div
                ref={hubRef}
                className="relative w-80 h-80 flex items-center justify-center"
              >
                {/* Spinning Decorative Rings */}
                <div className="hub-ring w-[600px] h-[600px] animate-[spin_40s_linear_infinite] opacity-5 border-blue-500/40"></div>
                <div className="hub-ring w-[500px] h-[500px] animate-[spin_30s_linear_infinite_reverse] opacity-10 border-purple-500/40"></div>
                <div className="hub-ring w-[400px] h-[400px] animate-[spin_20s_linear_infinite] opacity-20 border-pink-500/40"></div>

                {/* Central Core Sphere */}
                <div
                  className={`
                  w-48 h-48 rounded-full bg-[#030303] border border-white/10 z-10 
                  flex flex-col items-center justify-center relative overflow-hidden backdrop-blur-3xl
                  transition-all duration-700
                  ${hoveredIndex !== null ? "shadow-[0_0_100px_rgba(255,255,255,0.15)]" : "shadow-[0_0_50px_rgba(59,130,246,0.1)]"}
                `}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10 opacity-50"></div>

                  <div
                    className={`
                    absolute inset-0 bg-white/5 transition-opacity duration-1000
                    ${hoveredIndex !== null ? "opacity-100" : "opacity-0"}
                  `}
                  ></div>

                  <i
                    className={`
                      fas fa-atom text-5xl text-white/80 relative z-10 mb-3 transition-all duration-1000
                      ${hoveredIndex !== null ? "rotate-[360deg] scale-125" : ""}
                  `}
                  ></i>
                  <div className="flex flex-col items-center relative z-10 leading-none">
                    <span className="text-[10px] font-black tracking-[0.4em] text-white/30 uppercase">
                      our core services
                    </span>
                    <span className="text-[8px] font-bold tracking-[0.2em] text-blue-500/60 mt-2 uppercase"></span>
                  </div>

                  {/* Core Glow */}
                  <div
                    className={`
                      absolute inset-0 rounded-full transition-all duration-700
                      ${hoveredIndex !== null ? "bg-white/10 blur-2xl scale-110 opacity-100" : "opacity-0 scale-50"}
                  `}
                  ></div>
                </div>

                {/* Orbiting Elements */}
                <div className="absolute inset-0 animate-[spin_12s_linear_infinite]">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_20px_#3b82f6]"></div>
                </div>
                <div className="absolute inset-0 animate-[spin_18s_linear_infinite_reverse]">
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_15px_#a855f7]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
