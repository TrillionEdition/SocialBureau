import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

// Helper function to calculate time left
const TARGET_DATE = "2027-05-29T00:00:00";

function calculateTimeLeft() {
  const difference = +new Date(TARGET_DATE) - +new Date();
  let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }
  return timeLeft;
}

// ==========================================
// 1. DYNAMIC GOLD GLITTER FLUID CANVAS
// ==========================================
const NUMERAL_1_POINTS = [
  // Top beak
  { x: 0.44, y: 0.28 }, { x: 0.47, y: 0.25 }, { x: 0.50, y: 0.22 },
  // Stem
  { x: 0.50, y: 0.26 }, { x: 0.50, y: 0.32 }, { x: 0.50, y: 0.38 },
  { x: 0.50, y: 0.44 }, { x: 0.50, y: 0.50 }, { x: 0.50, y: 0.56 },
  { x: 0.50, y: 0.62 }, { x: 0.50, y: 0.68 }, { x: 0.50, y: 0.74 },
  // Foot
  { x: 0.44, y: 0.77 }, { x: 0.50, y: 0.77 }, { x: 0.56, y: 0.77 }
];

export const ParticleCanvas = React.forwardRef((_, ref) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  
  const mouseRef = useRef({
    x: 0,
    y: 0,
    lastX: 0,
    lastY: 0,
    active: false,
    timer: 0,
  });

  const [dimensions, setDimensions] = useState({ width: 1200, height: 850 });

  React.useImperativeHandle(ref, () => ({
    triggerCelebration: () => {
      // Trigger a massive golden stardust explosion from the center of the numeral 1
      const cx = dimensions.width / 2;
      const cy = dimensions.height * 0.45;
      spawnGlitterGlow(cx, cy, 140);
    }
  }));

  // Spawn majestic gold glitters
  const spawnGlitterGlow = (x, y, count, isMouseTrail = false) => {
    const goldColors = [
      "rgba(255, 215, 0, 1)",      // Bright premium gold
      "rgba(245, 232, 193, 1)",    // Platinum light golden shint
      "rgba(236, 210, 146, 0.9)",  // Warm champagne gold
      "rgba(225, 183, 97, 1)",     // Deep metallic gold
      "rgba(183, 123, 39, 0.95)",  // Luxurious bronze gold
      "rgba(255, 255, 255, 1)",    // Brilliant white highlight stars
    ];

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      // Mouse trail is tighter, explosion scatters wide
      const speed = isMouseTrail 
        ? 0.3 + Math.random() * 2.2 
        : 1.0 + Math.random() * 6.5;

      const size = Math.random() < 0.15 
        ? 1.8 + Math.random() * 2.2 // larger glow stars
        : 0.5 + Math.random() * 1.3; // dense micro gold particles

      const r = Math.random();
      const type = r < 0.1 
        ? "starburst" 
        : r < 0.4 
        ? "sparkle" 
        : "dust";

      particlesRef.current.push({
        x: x + (Math.random() - 0.5) * 8,
        y: y + (Math.random() - 0.5) * 8,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - (isMouseTrail ? 0.3 : 0.8), // drift upward
        size,
        alpha: 0.7 + Math.random() * 0.3,
        color: goldColors[Math.floor(Math.random() * goldColors.length)],
        life: 0,
        maxLife: isMouseTrail 
          ? 35 + Math.random() * 30 
          : 60 + Math.random() * 70,
        angle: Math.random() * Math.PI * 2,
        speed,
        spinRate: (Math.random() - 0.5) * 0.1,
        twinkleSpeed: 0.05 + Math.random() * 0.15,
        verticalDrift: -0.15 - Math.random() * 0.4,
        horizontalWavy: (Math.random() - 0.5) * 0.3,
      });
    }
  };

  // Setup fluid resize listener
  useEffect(() => {
    if (!containerRef.current) return;

    const ro = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const { width, height } = entries[0].contentRect;
      setDimensions({ width, height });
    });

    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // Update canvas size in DOM
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
  }, [dimensions]);

  // Pointer move handler to emit rich golden dust stream globally everywhere on screen!
  useEffect(() => {
    const handlePointerMove = (e) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      
      // Calculate coordinates relative to the canvas
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Calculate speed
      const m = mouseRef.current;
      const speedX = x - m.x;
      const speedY = y - m.y;
      const speed = Math.sqrt(speedX * speedX + speedY * speedY);

      m.x = x;
      m.y = y;
      m.active = true;

      // Emit continuous golden dust of the numeral 1 anniversary style
      // Spawns higher counts when moving fast, creating glorious brush strokes
      const spawnCount = speed > 10 ? 6 : speed > 2 ? 3 : 1;
      spawnGlitterGlow(x, y, spawnCount, true);
    };

    const handlePointerLeave = () => {
      mouseRef.current.active = false;
    };

    // Listen on window globally to ensure there are absolutely no dead-zones anywhere in the 100vh iframe
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave, { passive: true });
    document.addEventListener("pointerleave", handlePointerLeave, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      document.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [dimensions]);

  // Infinite physics & high-fidelity rendering loop
  useEffect(() => {
    let animId;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;

    const update = () => {
      frame++;
      // Clean display background
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Auto emit gold embers from the metallic "1" path coordinates
      // This ensures constant brilliant activity matching the shared asset look!
      if (frame % 3 === 0) {
        const point = NUMERAL_1_POINTS[Math.floor(Math.random() * NUMERAL_1_POINTS.length)];
        const targetX = point.x * dimensions.width;
        const targetY = point.y * dimensions.height;
        
        // Emit luxurious rising gold flakes
        const goldColors = ["#ffd700", "#ecd292", "#e1b761", "#b77b27", "#ffffff"];
        particlesRef.current.push({
          x: targetX + (Math.random() - 0.5) * 15,
          y: targetY + (Math.random() - 0.5) * 15,
          vx: (Math.random() - 0.5) * 1.5,
          vy: -0.2 - Math.random() * 0.8, // gentle rise
          size: 0.5 + Math.random() * 1.8,
          alpha: 0.6 + Math.random() * 0.4,
          color: goldColors[Math.floor(Math.random() * goldColors.length)],
          life: 0,
          maxLife: 80 + Math.random() * 80,
          angle: Math.random() * Math.PI * 2,
          speed: 0.5,
          spinRate: (Math.random() - 0.5) * 0.05,
          twinkleSpeed: 0.04 + Math.random() * 0.08,
          verticalDrift: -0.2 - Math.random() * 0.3,
          horizontalWavy: (Math.random() - 0.5) * 0.4,
          type: Math.random() < 0.2 ? "sparkle" : "dust",
        });
      }

      // If mouse is active on the screen but stationary, still spawn delicate ambient golden threads!
      if (mouseRef.current.active && frame % 2 === 0) {
        spawnGlitterGlow(mouseRef.current.x, mouseRef.current.y, 2, true);
      }

      // Smoothly interpolate mouse trail shadow to draw glowing aura backplate
      const m = mouseRef.current;
      m.lastX += (m.x - m.lastX) * 0.12;
      m.lastY += (m.y - m.lastY) * 0.12;

      if (m.active) {
        const grad = ctx.createRadialGradient(m.lastX, m.lastY, 0, m.lastX, m.lastY, 180);
        grad.addColorStop(0, "rgba(212, 154, 55, 0.14)"); // deep rich gold glow
        grad.addColorStop(0.5, "rgba(115, 69, 27, 0.04)");
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(m.lastX, m.lastY, 180, 0, Math.PI * 2);
        ctx.fill();
      }

      // Canvas text drawing block removed to let the background image's numeral "1" stand out naturally.

      // RENDER PARTICLES with "Screen" blend mode to produce gorgeous bright overlaps like the image
      ctx.save();
      ctx.globalCompositeOperation = "screen";

      particlesRef.current = particlesRef.current.filter((p) => {
        p.life++;

        // Add physical drift and wave vector updates
        p.vx += p.horizontalWavy;
        p.vy += p.verticalDrift * 0.05; // float upwards smoothly

        p.x += p.vx;
        p.y += p.vy;

        // Friction to slowly damp outer velocity
        p.vx *= 0.96;
        p.vy *= 0.96;

        const ageRatio = p.life / p.maxLife;
        p.alpha = (1 - ageRatio) * (0.5 + Math.sin(frame * p.twinkleSpeed) * 0.5); // beautiful twinkling effect

        if (ageRatio >= 1 || p.alpha <= 0) return false;

        // Draw particle
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;

        // Custom Starburst Flare: Draw real bright crossing flares for a glossy premium feel
        if (p.type === "starburst" && p.size > 1.2) {
          ctx.shadowBlur = p.size * 10;
          ctx.shadowColor = p.color;
          ctx.beginPath();
          
          // Outer star flare lines
          const len = p.size * 10 * (1 - ageRatio * 0.4);
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 1;
          
          ctx.moveTo(p.x - len, p.y);
          ctx.lineTo(p.x + len, p.y);
          ctx.moveTo(p.x, p.y - len);
          ctx.lineTo(p.x, p.y + len);
          ctx.stroke();

          // Central core sphere
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 1.8, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === "sparkle") {
          // Sharp glistening diamond/4-point star sparkles as seen in the uploaded reference!
          const s = p.size * 3.5;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y - s);
          ctx.lineTo(p.x + s * 0.28, p.y - s * 0.28);
          ctx.lineTo(p.x + s, p.y);
          ctx.lineTo(p.x + s * 0.28, p.y + s * 0.28);
          ctx.lineTo(p.x, p.y + s);
          ctx.lineTo(p.x - s * 0.28, p.y + s * 0.28);
          ctx.lineTo(p.x - s, p.y);
          ctx.lineTo(p.x - s * 0.28, p.y - s * 0.28);
          ctx.closePath();
          ctx.fill();
        } else {
          // Beautiful round floating dust ember
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
        return true;
      });

      ctx.restore();

      // Call next frame
      animId = requestAnimationFrame(update);
    };

    update();
    return () => cancelAnimationFrame(animId);
  }, [dimensions]);

  return (
    <div
      id="main-gold-glitter-container"
      ref={containerRef}
      className="absolute inset-0 z-10 overflow-hidden pointer-events-none bg-transparent"
    >
      <canvas
        id="golden-glitter-fluid-canvas"
        ref={canvasRef}
        className="block w-full h-full pointer-events-none"
      />
    </div>
  );
});

ParticleCanvas.displayName = "ParticleCanvas";

// ==========================================
// 2. THE PREMIUM TIMER CLOCK
// ==========================================
// ==========================================
// 2. THE GLOWING NEON NIXIE TUBE SECTIONS
// ==========================================

// Single Nixie Tube capsule component
function NixieTube({ digit }) {
  return (
    // Outer Recessed Casing: Represents the dark metallic rounded bezel enclosing the glass tube.
    // Styled to scale fluids from ultra-small devices (25px width) up to desktops (60px width)
    <div className="relative w-[25px] min-[375px]:w-[32px] sm:w-[44px] md:w-[52px] lg:w-[60px] h-[52px] min-[375px]:h-[68px] sm:h-[94px] md:h-[110px] lg:h-[128px] rounded-full p-[1.5px] min-[375px]:p-[2.5px] sm:p-[3.5px] md:p-1 bg-gradient-to-b from-[#1b212f] via-[#0f131c] to-[#080a0f] border border-[#2a354c]/50 shadow-[0_8px_18px_rgba(0,0,0,0.95),inset_0_1px_2px_rgba(255,255,255,0.06),inset_0_-1px_2px_rgba(0,0,0,0.85)] flex items-center justify-center select-none pointer-events-none">
      
      {/* Inner Glass Envelope: The high-fidelity glossy vacuum tube itself */}
      <div className="relative w-full h-full rounded-full bg-gradient-to-b from-[#0d1018] via-[#05060a] to-[#010204] overflow-hidden flex items-center justify-center shadow-[inset_0_2px_6px_rgba(0,0,0,0.95)]">
        
        {/* A. Golden neon gas background glow (Pulsing warm discharge glow) */}
        <div 
          className="absolute w-[80%] h-[60%] top-[20%] left-[10%] rounded-full pointer-events-none mix-blend-screen animate-pulse"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(212,154,55,0.24) 0%, rgba(212,154,55,0) 75%)"
          }}
        />
        
        {/* B. Steampunk anode grid wire mesh overlay (Detailed mesh drawn over filaments) */}
        <div className="absolute inset-y-1.5 inset-x-1 sm:inset-y-2 sm:inset-x-1.5 bg-[radial-gradient(rgba(212,154,55,0.045)_1.2px,transparent_1.2px)] bg-[size:3.5px_3.5px] sm:bg-[size:4.5px_4.5px] opacity-80 rounded-xl pointer-events-none z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:2px_2px] sm:bg-[size:2.5px_2.5px] opacity-60 pointer-events-none z-10" />

        {/* C. Glass highlight reflection on left (Bevel effect) */}
        <div className="absolute top-[6%] left-[6%] w-[1.2px] sm:w-[2px] md:w-[2.5px] h-[88%] rounded-full bg-gradient-to-b from-white/25 via-white/8 to-transparent blur-[0.2px] pointer-events-none z-20" />
        
        {/* D. Glass reflection on right */}
        <div className="absolute top-[6%] right-[6%] w-[0.5px] sm:w-[0.8px] md:w-[1.2px] h-[88%] rounded-full bg-gradient-to-b from-white/12 via-white/4 to-transparent blur-[0.1px] pointer-events-none z-20" />

        {/* E. Top glass curved glare */}
        <div className="absolute top-[4%] left-[20%] right-[20%] h-[6%] rounded-full bg-gradient-to-b from-white/15 to-transparent blur-[0.3px] pointer-events-none z-20" />

        {/* F. Inactive background digits shadow filament silhouettes (A layered 3D stack of unlit filaments!) */}
        <span className="absolute text-[18px] min-[375px]:text-[24px] sm:text-[32px] md:text-[42px] lg:text-[54px] font-black text-[#553216]/[0.05] select-none pointer-events-none font-mono" style={{ fontVariantNumeric: 'tabular-nums' }}>
          8
        </span>
        <span className="absolute text-[18px] min-[375px]:text-[24px] sm:text-[32px] md:text-[42px] lg:text-[54px] font-black text-[#73451b]/[0.035] select-none pointer-events-none font-mono translate-x-[0.5px] translate-y-[0.5px]" style={{ fontVariantNumeric: 'tabular-nums' }}>
          0
        </span>
        <span className="absolute text-[18px] min-[375px]:text-[24px] sm:text-[32px] md:text-[42px] lg:text-[54px] font-black text-[#381e0d]/[0.025] select-none pointer-events-none font-mono -translate-x-[0.5px] -translate-y-[0.5px]" style={{ fontVariantNumeric: 'tabular-nums' }}>
          5
        </span>

        {/* G. Neon Glowing Digit Filaments */}
        <AnimatePresence mode="popLayout">
          <motion.span
            key={digit}
            initial={{ opacity: 0, scale: 0.85, filter: "blur(4px)" }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              filter: "blur(0px)",
              textShadow: "0 0 2px #fff, 0 0 6px #ffd700, 0 0 12px #d49a37, 0 0 22px #b77b27, 0 0 38px rgba(212,154,55,0.85)"
            }}
            exit={{ opacity: 0, scale: 1.15, filter: "blur(3.5px)" }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
            className="absolute text-[18px] min-[375px]:text-[24px] sm:text-[32px] md:text-[42px] lg:text-[54px] font-bold text-gold-100 select-none z-5"
            style={{ fontFamily: '"Space Mono", monospace', fontVariantNumeric: 'tabular-nums' }}
          >
            {digit}
          </motion.span>
        </AnimatePresence>

      </div>
    </div>
  );
}

// Neon Colon dots separator tube
function NixieColon() {
  return (
    <div className="flex flex-col gap-2 min-[375px]:gap-3 sm:gap-4 md:gap-5 justify-center items-center px-0.5 sm:px-1 md:px-2 h-full select-none pointer-events-none">
      {/* Top neon dot */}
      <div 
        className="w-0.5 h-0.5 min-[375px]:w-1 min-[375px]:h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 rounded-full bg-gold-100 animate-pulse" 
        style={{
          boxShadow: "0 0 2px #fff, 0 0 6px #ffd700, 0 0 12px #d49a37, 0 0 16px rgba(212,154,55,0.8)"
        }}
      />
      {/* Bottom neon dot */}
      <div 
        className="w-0.5 h-0.5 min-[375px]:w-1 min-[375px]:h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 rounded-full bg-gold-100 animate-pulse" 
        style={{
          boxShadow: "0 0 2px #fff, 0 0 6px #ffd700, 0 0 12px #d49a37, 0 0 16px rgba(212,154,55,0.8)"
        }}
      />
    </div>
  );
}

// Countdown Clock layout container
function CountdownClock({ timeLeft }) {
  const formatNum = (num) => {
    return num.toString().padStart(2, "0");
  };

  const timeBlocks = [
    { label: "DAYS", value: timeLeft.days, desc: "Sun orbits" },
    { label: "HOURS", value: timeLeft.hours, desc: "Hourglass" },
    { label: "MINUTES", value: timeLeft.minutes, desc: "Precision gears" },
    { label: "SECONDS", value: timeLeft.seconds, desc: "Heartbeats" },
  ];

  return (
    <div id="countdown-clock-wrapper" className="flex flex-col items-center justify-center w-full select-none pointer-events-none">
      
      {/* Container for Nixie elements, without the surrounding rectangular box plate */}
      {/* Flex row is strictly nowrap to prevent splitting the clock on narrow mobile viewports */}
      <div className="relative flex flex-col items-center z-20 pointer-events-auto w-full">
        
        {/* B. CAPSULES DISPLAY ROW */}
        <div className="flex flex-row flex-nowrap items-center justify-center gap-x-[2px] min-[375px]:gap-x-1 sm:gap-x-2 md:gap-x-4 w-full">
          {timeBlocks.map((block, idx) => {
            const digitsstr = formatNum(block.value);
            
            return (
              <React.Fragment key={block.label}>
                {/* Group block containing tubes & its label */}
                <div className="flex flex-col items-center gap-1.5 sm:gap-3">
                  
                  {/* Nixie Tubes row */}
                  <div className="flex gap-[2px] min-[375px]:gap-1 sm:gap-1.5 md:gap-2">
                    {digitsstr.split("").map((digit, dIdx) => (
                      <NixieTube key={dIdx} digit={digit} />
                    ))}
                  </div>
                  
                  {/* Label under tube group */}
                  <div className="flex flex-col items-center">
                    <span className="text-[6.5px] min-[375px]:text-[8px] sm:text-[10px] md:text-xs font-display tracking-[0.15em] min-[375px]:tracking-[0.25em] text-orange-400 font-bold uppercase">
                      {block.label}
                    </span>
                    <span className="text-[5.5px] min-[375px]:text-[6.5px] sm:text-[8px] md:text-[9px] font-mono uppercase tracking-wider text-stone-500 mt-0.5">
                      {block.desc}
                    </span>
                  </div>

                </div>
                
                {/* Add neon colon separator between groups */}
                {idx < timeBlocks.length - 1 && <NixieColon />}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      
    </div>
  );
}

// ==========================================
// 3. THE REVENUE CARD COMPONENT
// ==========================================

// Premium Glassmorphic Revenue Card (placed at the top with premium hovering and always-on attention seeking animations)
function RevenueCard({ type }) {
  const isLeft = type === "left";
  
  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        borderColor: "rgba(212, 154, 55, 0.15)" 
      }}
      animate={{ 
        opacity: 1, 
        y: [0, -8, 0],
        boxShadow: [
          "0 15px 35px rgba(0,0,0,0.75), 0 0 8px rgba(212,154,55,0.04)",
          "0 15px 35px rgba(0,0,0,0.75), 0 0 22px rgba(212,154,55,0.24)",
          "0 15px 35px rgba(0,0,0,0.75), 0 0 8px rgba(212,154,55,0.04)"
        ]
      }}
      whileHover={{
        scale: 1.05,
        borderColor: "rgba(255, 215, 0, 0.52)",
        boxShadow: "0 25px 55px rgba(0, 0, 0, 0.95), 0 0 32px rgba(255, 215, 0, 0.38)",
      }}
      whileTap={{
        scale: 1.05,
        borderColor: "rgba(255, 215, 0, 0.52)",
        boxShadow: "0 25px 55px rgba(0, 0, 0, 0.95), 0 0 32px rgba(255, 215, 0, 0.38)",
      }}
      transition={{ 
        opacity: { duration: 0.8, delay: 0.2 },
        y: {
          duration: isLeft ? 4.5 : 5.2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: isLeft ? 0.2 : 0.7
        },
        boxShadow: {
          duration: isLeft ? 4.5 : 5.2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: isLeft ? 0.2 : 0.7
        },
        borderColor: { duration: 0.3 },
        scale: { type: "spring", stiffness: 300, damping: 18 }
      }}
      className="relative w-[120px] sm:w-[185px] md:w-[210px] lg:w-[235px] h-[105px] sm:h-[155px] md:h-[175px] lg:h-[195px] rounded-[16px] sm:rounded-[24px] lg:rounded-[28px] p-2 sm:p-4 lg:p-5 bg-[#07090e]/82 backdrop-blur-md border shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)] flex flex-col items-center justify-between group transition-all duration-500 z-20 select-none pointer-events-auto overflow-hidden cursor-pointer"
    >
      {/* 0. Volumetric Diagonal Gold Sheen Sweep (Always-On Attention Seeker) */}
      <div className="absolute inset-0 rounded-[20px] sm:rounded-[24px] lg:rounded-[28px] overflow-hidden pointer-events-none z-0">
        <motion.div 
          animate={{
            x: ["-180%", "180%"]
          }}
          transition={{
            duration: 4.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: isLeft ? 1.0 : 3.2
          }}
          className="absolute inset-0 w-[45%] h-full bg-gradient-to-r from-transparent via-gold-400/12 to-transparent -skew-x-25 pointer-events-none"
        />
      </div>

      {/* Top Decorative Arc Glow */}
      <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-gold-400/35 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500 z-10" />
      
      {/* 1. Circular Icon Header */}
      <div className="w-6 h-6 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full border border-gold-500/20 bg-stone-900/40 flex items-center justify-center text-gold-400 shadow-[0_0_10px_rgba(212,154,55,0.15)] group-hover:shadow-[0_0_15px_rgba(212,154,55,0.3)] group-active:shadow-[0_0_15px_rgba(212,154,55,0.3)] transition-all duration-500 mt-0.5 sm:mt-1 z-10">
        {isLeft ? (
          // Trophy Cup Icon
          <svg className="w-3 h-3 sm:w-4.5 sm:h-4.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 9H4.5a2.5 2.5 0 010-5H6M18 9h1.5a2.5 2.5 0 000-5H18M4 22h16M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34M12 2a7 7 0 00-7 7c0 2.5 1.5 3.5 3.5 4.5h7c2-1 3.5-2 3.5-4.5a7 7 0 00-7-7z" />
          </svg>
        ) : (
          // Target BullsEye Icon
          <svg className="w-3 h-3 sm:w-4.5 sm:h-4.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="2" />
          </svg>
        )}
      </div>

      {/* 2. Main Large Value */}
      <div className="flex flex-col items-center w-full z-10">
        <span className="font-display font-black tracking-tight leading-none text-center bg-gradient-to-b from-[#f5e8c1] via-[#ecd292] to-[#b77b27] bg-clip-text text-transparent text-base sm:text-2xl md:text-3xl lg:text-[34px] mt-0.5 sm:mt-2 transition-all duration-300 group-hover:scale-[1.02] group-active:scale-[1.02]">
          {isLeft ? "₹ 5CR" : "₹ 15CR"}
        </span>
        
        {/* 3. Subtitle centered within gold leaf brackets style */}
        <div className="flex items-center gap-1 mt-0.5 sm:mt-1">
          <span className="text-gold-500/40 text-[5px] sm:text-[7px] lg:text-[9px] group-hover:text-gold-400 group-active:text-gold-400 transition-colors duration-300">◀</span>
          <span className="font-display font-black tracking-[0.18em] sm:tracking-[0.25em] text-[#d49a37] group-hover:text-gold-300 group-active:text-gold-300 transition-colors duration-300 uppercase text-[7px] sm:text-[9px] lg:text-[10px]">
            {isLeft ? "ACHIEVED" : "TARGET"}
          </span>
          <span className="text-gold-500/40 text-[5px] sm:text-[7px] lg:text-[9px] group-hover:text-gold-400 group-active:text-gold-400 transition-colors duration-300">▶</span>
        </div>
      </div>

      {/* 4. Description Footer */}
      <span className="font-sans tracking-wide text-stone-400 group-hover:text-white group-active:text-white transition-colors duration-300 text-center text-[6.5px] sm:text-[9.5px] lg:text-[10.5px] mb-0.5 sm:mb-1 z-10">
        {isLeft ? "Year 1 Revenue Milestone" : "Year 2 Revenue Vision"}
      </span>

      {/* 5. Gold dots at the bottom */}
      <div className="flex items-center gap-1 mb-0.5 z-10">
        <span className={`w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full ${isLeft ? "bg-gold-400 shadow-[0_0_4px_#ffd700]" : "bg-stone-800"}`} />
        <span className="w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-stone-800" />
        <span className={`w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full ${!isLeft ? "bg-gold-400 shadow-[0_0_4px_#ffd700]" : "bg-stone-800"}`} />
      </div>
    </motion.div>
  );
}

// ==========================================
// 4. MAIN EXPORT COMPONENT
// ==========================================
export default function AnniversaryCountdown() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  // Update timer every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-stone-100 font-sans grain selection:bg-gold-500/30 selection:text-gold-200 flex flex-col border-b border-gold-950/50">
      
      {/* A. RESPONSIVE BACKGROUND ANNIVERSARY BILLBOARD */}
      {/* Desktop Anniversary Banner */}
      <img 
        src="https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/dsokccmeyfhevpqhougx.webp" 
        alt="1st Anniversary Desktop" 
        className="hidden md:block absolute inset-0 w-full h-full object-cover object-[center_32%] z-0 opacity-95 select-none pointer-events-none"
      />
      {/* Mobile Anniversary Banner */}
      <img 
        src="https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/archive%20(8)/qw8gno2bo4vlo0cfxewq.jpg" 
        alt="1st Anniversary Mobile" 
        className="block md:hidden absolute inset-0 w-full h-full object-cover object-[center_20%] z-0 opacity-95 select-none pointer-events-none"
      />

      {/* Luxury Cinematic Shadow Gradient Masking to maximize text visibility */}
      <div className="absolute inset-0 bg-black/25 md:bg-black/55 z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/40 md:from-black/90 md:via-black/40 md:to-black/60 z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/5 to-black/30 md:via-black/15 md:to-black/52 z-0 pointer-events-none" />

      {/* B. LIQUID GOLD GLITTER FLUID CANVAS BACKGROUND */}
      <ParticleCanvas />

      {/* C+E. DESKTOP ONLY: Badge at top + Cards below it */}
      <div className="hidden md:block shrink-0">
        {/* Badge */}
        <div className="relative z-20 w-full flex justify-center pt-4 lg:pt-5">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 rounded-full bg-gold-950/40 border border-gold-500/30 shadow-[0_0_15px_rgba(212,154,55,0.15)] pointer-events-auto"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
            <span className="text-[10px] md:text-xs font-mono tracking-[0.18em] text-gold-300 font-semibold uppercase">
              COUNTDOWN TO SECOND ANNIVERSARY
            </span>
          </motion.div>
        </div>
        {/* Revenue Cards */}
        <div className="relative z-20 w-full flex flex-row items-center justify-between gap-4 max-w-7xl mx-auto px-8 md:px-12 pt-5">
          <RevenueCard type="left" />
          <RevenueCard type="right" />
        </div>
      </div>

      {/* Flexible spacer — pushes all bottom content to the very bottom */}
      <div className="flex-1 min-h-0" />

      {/* BOTTOM GROUP: anchored at the bottom edge on all screens */}
      <div className="relative z-20 w-full flex flex-col items-center shrink-0 pb-20 sm:pb-10 md:pb-12 px-4">

        {/* MOBILE ONLY: Badge + Cards sit just above the quote */}
        <div className="md:hidden w-full flex flex-col items-center mb-5">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 mb-4 rounded-full bg-gold-950/40 border border-gold-500/30 shadow-[0_0_15px_rgba(212,154,55,0.15)] pointer-events-auto"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
            <span className="text-[9px] font-mono tracking-[0.18em] text-gold-300 font-semibold uppercase">
              COUNTDOWN TO SECOND ANNIVERSARY
            </span>
          </motion.div>
          {/* Revenue Cards */}
          <div className="w-full flex flex-row items-center justify-between gap-3 px-2">
            <RevenueCard type="left" />
            <RevenueCard type="right" />
          </div>
        </div>

        {/* Poetic italic narrative description */}
        <p className="text-[10px] sm:text-xs lg:text-[14px] font-sans text-stone-200/95 italic tracking-wide max-w-lg mx-auto leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] text-center mt-1">
          " One year of passion. <span className="bg-gradient-to-b from-[#fbf6e7] via-[#ecd292] to-[#d49a37] bg-clip-text text-transparent font-black">One year of purpose.</span> The journey continues. "
        </p>

        {/* CTA Buttons */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mt-4 sm:mt-5 mb-3 sm:mb-4">
          <Link to="/team">
            <button className="relative px-5 py-2.5 sm:px-8 sm:py-3 overflow-hidden border border-gold-500/35 hover:border-gold-400 active:border-gold-400 text-gold-300 hover:text-stone-950 active:text-stone-950 font-black tracking-[0.2em] text-[9px] sm:text-[10.5px] uppercase rounded-full shadow-[0_4px_15px_rgba(212,154,55,0.08)] hover:shadow-[0_6px_25px_rgba(212,154,55,0.32)] hover:scale-[1.04] active:scale-[0.97] transition-all duration-300 flex items-center gap-2 bg-stone-950/45 backdrop-blur-sm cursor-pointer group/btn">
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#b77b27] via-[#e1b761] to-[#b77b27] opacity-0 group-hover/btn:opacity-100 group-active/btn:opacity-100 transition-opacity duration-300 z-0" />
              <span className="relative z-10">Meet The Team</span>
              <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 relative z-10 stroke-current stroke-[2.5] group-hover/btn:stroke-stone-950 group-active/btn:stroke-stone-950 transition-colors duration-300" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.109A9.342 9.342 0 0112.25 19c-2.454 0-4.708-.941-6.4-2.49M12.25 19C11.168 19 10.125 18.7 9.25 18.163m0 0a9.383 9.383 0 01-2.625.372 9.337 9.337 0 01-4.121-.952 4.125 4.125 0 017.533-2.493M9.25 18.163A9.342 9.342 0 0111.75 16C14.204 16 16.458 16.941 18.15 18.49M12 12a3 3 0 100-6 3 3 0 000 6zm6.5-1.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM5.5 10.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </button>
          </Link>
        </div>

        {/* Decorative Splitter with Center Gold Sparkle */}
        <div className="flex items-center justify-center gap-3 w-[60%] max-w-[280px] mx-auto mb-5 sm:mb-6">
          <div className="h-[1px] bg-gradient-to-r from-transparent to-gold-500/40 flex-grow" />
          <span className="text-gold-400 text-[10px] sm:text-xs font-bold drop-shadow-[0_0_8px_rgba(212,154,55,0.7)] animate-pulse">✦</span>
          <div className="h-[1px] bg-gradient-to-l from-transparent to-gold-500/40 flex-grow" />
        </div>

        {/* D. TIMER CLOCK — directly below the divider, no gap */}
        <CountdownClock timeLeft={timeLeft} />

      </div>
    </div>
  );
}
