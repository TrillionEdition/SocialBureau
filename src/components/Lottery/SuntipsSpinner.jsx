import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BASE_URL } from "@/utils/urls";
import { Link } from "react-router-dom";

const wheelItems = [
  { label: "Dubai Kunafa Cube 🍫 75%", emoji: null, image: "/assets/chocochi_Spinner/Dubai Kunafa Cube.webp", color: "#2d160f" },
  { label: "Cafe Latte ☕️ 50%", emoji: null, image: "/assets/chocochi_Spinner/cafe_latte.webp", color: "#42251a" },
  { label: "Try Again", emoji: "✨", image: null, color: "#150a06", isTryAgain: true },
  { label: "Cappuccino ☕️ 50%", emoji: null, image: "/assets/chocochi_Spinner/cappuccino.webp", color: "#543325" },
  { label: "Try Again", emoji: "✨", image: null, color: "#150a06", isTryAgain: true },
  { label: "Chocopayasam 🍮 50%", emoji: null, image: "/assets/chocochi_Spinner/chocopayasam.webp", color: "#784222" },
  { label: "Hot Chocolate ☕️ 25%", emoji: null, image: "/assets/chocochi_Spinner/HotChocolate.webp", color: "#361b10" },
  { label: "Chocolate Lollipop 🍭 50%", emoji: null, image: "/assets/chocochi_Spinner/chocolate Lolipop.webp", color: "#613a25" },
];

const GoldFlakeConfettiGenerator = () => {
  const flakes = Array.from({ length: 40 }).map((_, idx) => {
    const left = (idx * 2.71) % 100;
    const delay = (idx * 0.15) % 8;
    const duration = 5.0 + (idx * 0.12) % 4.0;
    const size = 6 + (idx % 12); // 6px to 18px
    
    // Luxury gold and chocolate-related shades
    const goldShades = [
      "#f3e5ab", // Soft Cream Gold
      "#f59e0b", // Warm Amber Gold
      "#c5a059", // Chocochi Brand Gold
      "#d4af37", // Bright Metallic Gold
      "#fcd34d", // Glowing Yellow-Gold
    ];
    const color = goldShades[idx % goldShades.length];

    const style = {
      left: `${left}%`,
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
      position: 'absolute',
      top: '-20px',
      zIndex: 0,
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: color,
      borderRadius: idx % 2 === 0 ? "50%" : "2px", // Circles and diamond sparkles
      transform: `rotate(${idx * 45}deg)`,
      boxShadow: `0 0 8px ${color}`,
      opacity: 0.8,
    };

    return { style };
  });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {flakes.map(({ style }, idx) => (
        <div
          key={idx}
          className="animate-[flakeFall_infinite_linear]"
          style={{
            ...style,
            animationName: 'flakeFall',
          }}
        />
      ))}
      <style>{`
        @keyframes flakeFall {
          0% {
            transform: translateY(-20px) rotate(0deg) translateX(0px);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(105vh) rotate(720deg) translateX(40px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

const TransparentImage = ({ src, alt, className }) => {
  const [dataUrl, setDataUrl] = useState(src);

  useEffect(() => {
    if (!src) return;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      try {
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;
        const width = canvas.width;
        const height = canvas.height;
        const visited = new Uint8Array(width * height);
        const queue = [];

        const isBgPixel = (x, y) => {
          const idx = (y * width + x) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const maxVal = Math.max(r, g, b);
          const minVal = Math.min(r, g, b);
          const isGrayscale = (maxVal - minVal) < 25;
          // Matches white, off-white, and light grey shadows
          return (r > 185 && g > 185 && b > 185 && isGrayscale) || (r > 240 && g > 240 && b > 240);
        };

        const pushIfBg = (x, y) => {
          if (x >= 0 && x < width && y >= 0 && y < height) {
            const idx = y * width + x;
            if (!visited[idx] && isBgPixel(x, y)) {
              visited[idx] = 1;
              queue.push((y << 16) | x);
              const dataIdx = idx * 4;
              data[dataIdx + 3] = 0; // Set alpha to 0 (make transparent)
            }
          }
        };

        // Initialize queue with border pixels
        for (let x = 0; x < width; x++) {
          pushIfBg(x, 0);
          pushIfBg(x, height - 1);
        }
        for (let y = 0; y < height; y++) {
          pushIfBg(0, y);
          pushIfBg(width - 1, y);
        }

        let head = 0;
        while (head < queue.length) {
          const curr = queue[head++];
          const cx = curr & 0xffff;
          const cy = curr >> 16;

          pushIfBg(cx - 1, cy);
          pushIfBg(cx + 1, cy);
          pushIfBg(cx, cy - 1);
          pushIfBg(cx, cy + 1);
        }

        ctx.putImageData(imgData, 0, 0);
        setDataUrl(canvas.toDataURL("image/png"));
      } catch (e) {
        console.error("Transparent canvas conversion failed:", e);
        setDataUrl(src);
      }
    };
  }, [src]);

  return <img src={dataUrl} alt={alt} className={className} />;
};

export default function SuntipsSpinner() {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [winnerIndex, setWinnerIndex] = useState(-1);
  const [cooldown, setCooldown] = useState(0);
  const [outOfStock, setOutOfStock] = useState(false);
  const stockPollRef = useRef(null);
  
  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [alreadyClaimed, setAlreadyClaimed] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("suntips_spin_claimed") === "true") {
      setAlreadyClaimed(true);
    }
    const lastSpin = localStorage.getItem("lastSuntipsSpinTime");
    if (lastSpin) {
      const passed = Math.floor((Date.now() - parseInt(lastSpin, 10)) / 1000);
      if (passed < 300) {
        setCooldown(300 - passed);
      }
    }

    // Poll stock status every 3 seconds for real-time update
    const pollStock = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/suntips/settings`);
        setOutOfStock(res.data?.outOfStock ?? false);
      } catch (e) {
        // Silently fail — don't block the page on network issues
      }
    };
    pollStock(); // Initial check immediately
    stockPollRef.current = setInterval(pollStock, 3000);
    return () => clearInterval(stockPollRef.current);
  }, []);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [cooldown]);

  const spinWheel = () => {
    if (spinning || cooldown > 0 || alreadyClaimed) return;
    setSpinning(true);
    setWinnerIndex(-1);
    setSubmitted(false);
    setName("");
    setMobile("");
    setCooldown(300);
    localStorage.setItem("lastSuntipsSpinTime", Date.now().toString());

    const segmentAngle = 360 / wheelItems.length;
    const winningIdx = Math.floor(Math.random() * wheelItems.length);

    // Aim to land exactly in the middle of the winning index segment, adding slight offset for realism
    const maxOffset = (segmentAngle / 2) - 5;
    const randomOffset = (Math.random() * 2 * maxOffset) - maxOffset;

    const targetAngle = -(winningIdx * segmentAngle) + randomOffset;
    const normalizedTarget = ((targetAngle % 360) + 360) % 360;
    const currentMod = ((rotation % 360) + 360) % 360;

    let extraRotation = normalizedTarget - currentMod;
    if (extraRotation <= 0) {
      extraRotation += 360;
    }

    const finalRotation = rotation + extraRotation + 360 * 6; // Spin 6 full rounds

    setRotation(finalRotation);

    setTimeout(() => {
      setSpinning(false);
      setWinnerIndex(winningIdx);
      setShowModal(true);
    }, 5000); 
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!name || !mobile || winnerIndex === -1) return;
    setSubmitting(true);

    const claimData = {
      name,
      mobileNumber: mobile,
      prize: `Chocochi ${wheelItems[winnerIndex].label}`,
    };

    try {
      const resp = await axios.post(`${BASE_URL}/suntips/claim`, claimData);
      if (resp && resp.status === 201) {
        setSubmitted(true);
        localStorage.setItem("suntips_spin_claimed", "true");
        setAlreadyClaimed(true);
      } else {
        console.error("Unexpected response from server:", resp);
        alert("Failed to submit claim. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting details", error.response || error.message || error);
      const serverMsg = error?.response?.data?.message;
      alert(serverMsg || "Failed to submit claim. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const segmentAngle = 360 / wheelItems.length;
  const gradientStops = wheelItems.map((item, index) => {
    return `${item.color} ${index * segmentAngle}deg ${(index + 1) * segmentAngle}deg`;
  }).join(', ');

  const currentWinner = winnerIndex !== -1 ? wheelItems[winnerIndex] : null;

  // ── OUT-OF-STOCK OVERLAY ────────────────────────────────────────────────────
  if (outOfStock) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center overflow-y-auto py-8 relative" style={{ backgroundColor: '#020716' }}>
        {/* Ambient glows */}
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-red-900/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-[350px] h-[350px] bg-[#c5a059]/8 blur-[130px] rounded-full pointer-events-none" />
        <GoldFlakeConfettiGenerator />
        <div className="z-10 flex flex-col items-center text-center px-6 max-w-md">
          {/* Logo */}
          <Link 
            to="/chocochi-form"
            className="mb-6 w-[100px] sm:w-[120px] drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)] cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300 block group relative"
            title="Go to Registration Portal"
          >
            <div className="absolute inset-0 rounded-lg bg-amber-500/10 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300 pointer-events-none" />
            <img
              src="https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/Brand%20Logo%20(1)-1.png"
              alt="Chocochi Logo"
              className="w-full h-auto rounded-lg border border-[#c5a059]/20 relative z-10"
            />
          </Link>
          {/* Icon */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-red-500/10 border-2 border-red-500/30 flex items-center justify-center mb-5 shadow-[0_0_30px_rgba(239,68,68,0.15)] animate-pulse">
            <span className="text-4xl sm:text-5xl select-none">🍫</span>
          </div>
          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#f3e5ab] via-[#c5a059] to-[#8a6132] mb-3 tracking-wide leading-tight">
            Products are out of stock
          </h1>
          {/* Divider */}
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#c5a059] to-transparent mb-4 rounded-full" />
          {/* Subtitle */}
          <p className="text-slate-400 text-sm sm:text-base font-medium leading-relaxed">
            Our handcrafted Chocochi chocolates are currently unavailable. Please check back soon — we&apos;re restocking with even more delicious surprises! 🎁
          </p>
          {/* Badge */}
          <div className="mt-6 px-4 py-2 rounded-full bg-[#c5a059]/10 border border-[#c5a059]/25 text-[#f3e5ab] text-xs font-bold tracking-widest uppercase">
            ✨ Coming Back Soon ✨
          </div>
        </div>
        <style>{`
          @keyframes shimmer {
            100% { transform: translateX(100%); }
          }
        `}</style>
      </div>
    );
  }
  // ────────────────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start gap-4 sm:gap-8 py-6 sm:py-10 px-4 overflow-y-auto relative" style={{ backgroundColor: '#020716' }}>

      {/* Ambient Chocolate Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[350px] h-[350px] bg-[#c5a059]/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#0c1f45]/20 blur-[140px] rounded-full pointer-events-none" />

      {/* Falling Gold Flakes Background */}
      <GoldFlakeConfettiGenerator />

      {/* TOP CONTAINER (Header & Title) */}
      <div className="w-full flex flex-col items-center z-10 text-center">
        {/* Brand Logo */}
        <Link
          to="/chocochi-form"
          className="mb-2 max-w-[85px] sm:max-w-[110px] md:max-w-[130px] drop-shadow-[0_4px_12px_rgba(0,0,0,0.55)] cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300 block group relative"
          title="Go to Registration Portal"
        >
          <div className="absolute inset-0 rounded-lg bg-amber-500/10 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300 pointer-events-none" />
          <img 
            src="https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/Brand%20Logo%20(1)-1.png"
            alt="Chocochi Logo"
            className="w-full h-auto rounded-lg border border-[#c5a059]/20 relative z-10"
          />
        </Link>

        {/* Badge Header */}
        <div className="mb-1 sm:mb-1.5">
          <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#8a6132]/35 to-[#c5a059]/30 border border-[#c5a059]/30 text-[#f3e5ab] font-extrabold text-[9px] sm:text-[10px] tracking-widest uppercase animate-pulse shadow-[0_0_12px_rgba(197,160,89,0.15)] flex items-center gap-1.5">
            <span className="inline-block text-[#c5a059]">✨</span> Premium Chocolate Spin <span className="inline-block text-[#c5a059]">✨</span>
          </span>
        </div>

        <h1 className="text-xl min-[360px]:text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#f3e5ab] via-[#c5a059] to-[#8a6132] mb-0.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] tracking-wide font-sans">
          Chocochi Luxury Wheel
        </h1>

        <p className="text-slate-300 text-[9px] min-[360px]:text-[10px] sm:text-xs max-w-sm font-medium leading-normal px-2">
          Spin the wheel to win a box of exquisite, handcrafted chocolate truffles!
        </p>
      </div>

      {/* WHEEL CONTAINER */}
      <div className="relative flex items-center justify-center z-10 my-2 sm:my-4 max-w-full px-2">

        {/* POINTER */}
        <div className="absolute -top-4 sm:-top-5 left-1/2 -translate-x-1/2 z-30 drop-shadow-[0_3px_6px_rgba(0,0,0,0.6)]">
          <svg className="w-6 h-8 sm:w-8 sm:h-10" viewBox="0 0 50 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25 60 L0 18 Q0 0 18 0 L32 0 Q50 0 50 18 Z" fill="url(#pointerGrad)" />
            <defs>
              <linearGradient id="pointerGrad" x1="0" y1="0" x2="50" y2="60" gradientUnits="userSpaceOnUse">
                <stop stopColor="#c5a059" />
                <stop offset="1" stopColor="#8a6132" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* WHEEL BORDER */}
        <div className="relative w-[240px] h-[240px] min-[340px]:w-[270px] min-[340px]:h-[270px] min-[400px]:w-[300px] min-[400px]:h-[300px] sm:w-[350px] sm:h-[350px] md:w-[410px] md:h-[410px] lg:w-[460px] lg:h-[460px] rounded-full p-2 bg-gradient-to-br from-[#f3e5ab] via-[#c5a059] to-[#8a6132] shadow-[0_0_40px_rgba(197,160,89,0.35),_inset_0_1.5px_4px_rgba(255,255,255,0.4)] border-2 border-[#c5a059]/30 transition-all duration-300">

          {/* SPINNING WHEEL */}
          <div
            className="w-full h-full rounded-full overflow-hidden relative shadow-inner"
            style={{
              background: `conic-gradient(from ${-segmentAngle / 2}deg, ${gradientStops})`,
              transform: `rotate(${rotation}deg)`,
              transition: spinning
                ? "transform 5s cubic-bezier(0.15, 0.9, 0.2, 1)"
                : "none",
            }}
          >
            {wheelItems.map((item, index) => {
              const angle = index * segmentAngle;
              return (
                <div
                  key={index}
                  className="absolute inset-0 flex flex-col items-center justify-start pt-2.5 min-[340px]:pt-4 sm:pt-5 md:pt-7 lg:pt-8"
                  style={{ transform: `rotate(${angle}deg)` }}
                >
                  <div className="flex flex-col items-center justify-center pt-1 min-[340px]:pt-1.5 sm:pt-2">
                    <span
                      className="text-white font-black text-[6px] min-[340px]:text-[7.5px] sm:text-[9.5px] md:text-[11.5px] lg:text-[13px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] select-none text-center leading-tight uppercase tracking-tighter max-w-[42px] min-[340px]:max-w-[52px] sm:max-w-[70px] md:max-w-[85px] lg:max-w-[100px] mb-1"
                    >
                      {item.label}
                    </span>
                    {item.image ? (
                      <div className="w-8 h-8 min-[340px]:w-10 min-[340px]:h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 flex items-center justify-center p-0.5">
                        <TransparentImage 
                          src={item.image}
                          alt={item.label}
                          className="w-full h-full object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)] select-none hover:scale-105 transition-transform"
                        />
                      </div>
                    ) : (
                      <span className="text-lg min-[340px]:text-xl sm:text-3xl md:text-4xl lg:text-[2.75rem] select-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
                        {item.emoji}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}

            <div className="absolute inset-0 rounded-full shadow-[inset_0_0_20px_rgba(0,0,0,0.7)] pointer-events-none" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-black/20 to-transparent pointer-events-none" />
          </div>

          {/* CENTER EMBLEM */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            <div className="w-11 h-11 min-[340px]:w-13 min-[340px]:h-13 min-[400px]:w-15 min-[400px]:h-15 sm:w-[70px] sm:h-[70px] md:w-[84px] md:h-[84px] lg:w-[96px] lg:h-[96px] rounded-full bg-[#020a1c] shadow-[0_0_15px_rgba(0,0,0,0.8)] border-2 border-[#c5a059] flex items-center justify-center p-0.5 transition-all duration-300 overflow-hidden">
              <img 
                src="https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/Brand%20Logo%20(1)-1.png"
                alt="Chocochi Logo"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* BUTTON & COOLDOWN */}
      <div className="min-h-[60px] flex flex-col items-center justify-start z-10 w-full text-center my-2 sm:my-4 pb-6">
        <button
          onClick={spinWheel}
          disabled={spinning || cooldown > 0 || alreadyClaimed}
          className="
            relative overflow-hidden group px-8 py-2.5 sm:px-10 sm:py-3.5 rounded-full bg-gradient-to-b from-[#f3e5ab] via-[#c5a059] to-[#8a6132] 
            hover:from-[#fcf4d9] hover:via-[#d4b574] hover:to-[#9e713d] active:scale-95 transition-all duration-200
            text-slate-950 font-black text-xs sm:text-sm md:text-base shadow-[0_0_15px_rgba(197,160,89,0.35),_0_4px_8px_rgba(0,0,0,0.4)]
            disabled:from-slate-700 disabled:to-slate-800 disabled:text-slate-500 disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100 disabled:shadow-none
            border-b-4 border-[#6e4b21] active:border-b-0 active:translate-y-0.5 z-10
          "
        >
          <span className="relative z-10 uppercase tracking-widest flex items-center justify-center gap-1.5">
            {alreadyClaimed ? (
              <>
                🍫 Gift Claimed 🍫
              </>
            ) : spinning ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-3.5 w-3.5 text-slate-955" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Mixing Chocolates...
              </>
            ) : cooldown > 0 ? (
              `Next Spin: ${Math.floor(cooldown / 60)}:${String(cooldown % 60).padStart(2, '0')}`
            ) : (
              <>
                ✨ Spin & Win Chocolates ✨
              </>
            )}
          </span>
          {!spinning && cooldown === 0 && !alreadyClaimed && (
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent group-hover:animate-[shimmer_1.5s_infinite] z-0" />
          )}
        </button>
      </div>

      {/* FOOTER PARTNERSHIP BRANDING */}
      <div className="z-10 w-full flex flex-col min-[480px]:flex-row items-center justify-center gap-4 min-[480px]:gap-6 mt-4 sm:mt-6 pb-8 text-slate-400 text-xs sm:text-sm">
        <a 
          href="https://www.socialbureau.in/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
        >
          <span className="opacity-60 text-[11px] sm:text-xs tracking-wider uppercase font-bold">Powered by</span>
          <img src="/assets/logo.webp" alt="Social Bureau" className="h-6 sm:h-7 object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />
        </a>
        <div className="hidden min-[480px]:block w-px h-5 bg-white/10" />
        <a 
          href="https://suntipstea.online/"  //rrrrrrr
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
        >
          <span className="opacity-60 text-[11px] sm:text-[12px] tracking-wider uppercase font-bold">Event Partner</span>
          <img src="/assets/suntips-spin/suntips_logo_white.png" alt="Suntips" className="h-12 sm:h-14 object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />
        </a>
      </div>

      {/* WINNING CLAIM MODAL (CHOCOCHI STYLE) */}
      {showModal && currentWinner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-955/85 backdrop-blur-md p-3 sm:p-4 overflow-y-auto" style={{ backgroundColor: 'rgba(2, 7, 22, 0.85)' }}>
          <div className="bg-[#051129] rounded-2xl p-5 sm:p-7 md:p-9 max-w-md w-full max-h-[92vh] sm:max-h-[95vh] overflow-y-auto shadow-[0_0_50px_rgba(197,160,89,0.2)] border border-[#c5a059]/40 text-center relative overflow-x-hidden scrollbar-thin">
            
            {/* Top decorative gold ribbon */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#8a6132] via-[#d4af37] to-[#f3e5ab]" />
            
            {/* Close Button */}
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-slate-450 hover:text-white transition-colors cursor-pointer z-20"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Background glow in modal */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#c5a059]/10 blur-[60px] rounded-full pointer-events-none" />
            
            <div className="relative z-10">
              {currentWinner.isTryAgain ? (
                <div className="py-4 sm:py-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#c5a059]/10 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 border-2 border-[#c5a059] shadow-[0_0_15px_rgba(197,160,89,0.2)] animate-pulse">
                    <span className="text-[#c5a059] text-3xl">✨</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white mb-2 tracking-tight">Better Luck Next Time!</h2>
                  <p className="text-slate-300 text-xs sm:text-sm mb-6 sm:mb-8 max-w-xs mx-auto leading-relaxed font-medium">
                    The chocolate recipe wasn't complete this spin. Don't worry, you can try again after the cooldown!
                  </p>
                  <button 
                    onClick={() => setShowModal(false)}
                    className="px-6 py-2.5 sm:px-8 sm:py-3.5 bg-gradient-to-br from-[#c5a059] to-[#8a6132] hover:from-[#d4b574] hover:to-[#9e713d] text-slate-950 font-extrabold rounded-full transition-all duration-200 w-full shadow-[0_4px_15px_rgba(197,160,89,0.3)] text-xs sm:text-sm uppercase tracking-wider cursor-pointer border-none"
                  >
                    Try Again Later
                  </button>
                </div>
              ) : submitted ? (
                <div className="py-4 sm:py-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#c5a059] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-[0_0_25px_rgba(197,160,89,0.5)] border-2 border-[#f3e5ab]">
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[#051129]" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white mb-2 tracking-tight">Coupon Claim Submitted!</h2>
                  <p className="text-slate-300 text-xs sm:text-sm mb-6 sm:mb-8 max-w-xs mx-auto font-medium">
                    Your discount coupon for <span className="text-[#c5a059] font-extrabold text-base sm:text-lg">Chocochi {currentWinner.label}</span> has been securely processed. We will send your discount coupon details to your mobile number!
                  </p>
                  <button 
                    onClick={() => setShowModal(false)}
                    className="px-6 py-2.5 sm:px-8 sm:py-3.5 bg-gradient-to-r from-[#c5a059] to-[#8a6132] hover:from-[#d4b574] hover:to-[#9e713d] text-slate-950 font-extrabold rounded-full transition-all duration-200 w-full shadow-[0_4px_15px_rgba(197,160,89,0.3)] text-xs sm:text-sm uppercase tracking-wider border-none"
                  >
                    Happy Tasting!
                  </button>
                </div>
              ) : (
                <>
                  <div className="relative inline-block mb-3">
                    <span className="px-3 py-1 rounded-full bg-[#c5a059]/10 border border-[#c5a059]/30 text-[#c5a059] font-extrabold text-[10px] sm:text-xs tracking-wider uppercase inline-block animate-pulse">
                      ✨ Chocochi Winner ✨
                    </span>
                    <div className="absolute -top-1 -right-2 text-yellow-400 animate-bounce">★</div>
                  </div>

                  {/* Render the specific chocolate won */}
                  <div className="w-24 h-24 sm:w-28 sm:h-28 bg-[#020a1c] rounded-xl flex items-center justify-center mx-auto mb-3 border border-[#c5a059]/20 shadow-inner">
                    {currentWinner.image ? (
                      <TransparentImage 
                        src={currentWinner.image}
                        alt={currentWinner.label}
                        className="w-20 h-20 sm:w-24 sm:h-24 object-contain drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]"
                      />
                    ) : (
                      <span className="text-5xl drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] select-none">
                        {currentWinner.emoji}
                      </span>
                    )}
                  </div>
                  
                  <h2 className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#f3e5ab] via-[#c5a059] to-[#8a6132] mb-1 drop-shadow-md">
                    Won {currentWinner.label}!
                  </h2>
                  <p className="text-slate-350 mb-4 sm:mb-6 text-[10px] sm:text-xs max-w-xs mx-auto leading-relaxed">
                    Congratulations! Enter your details below to claim your discount coupon.
                  </p>
                  
                  <form onSubmit={handleFormSubmit} className="space-y-3 sm:space-y-4 text-left">
                    <div>
                      <label className="block text-slate-400 text-[10px] sm:text-xs font-bold mb-1 uppercase tracking-wider">Full Name</label>
                      <input 
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full bg-[#020a1c] border border-slate-800 text-slate-100 rounded-xl px-3 py-2 sm:px-4 sm:py-3 placeholder-slate-750 focus:outline-none focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059] transition-all duration-200 text-xs sm:text-sm font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 text-[10px] sm:text-xs font-bold mb-1 uppercase tracking-wider">Mobile Number</label>
                      <input 
                        type="tel"
                        required
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        placeholder="Enter 10-digit mobile number"
                        className="w-full bg-[#020a1c] border border-slate-800 text-slate-100 rounded-xl px-3 py-2 sm:px-4 sm:py-3 placeholder-slate-750 focus:outline-none focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059] transition-all duration-200 text-xs sm:text-sm font-medium"
                      />
                    </div>

                    <button 
                      type="submit"
                      disabled={submitting || !name || !mobile}
                      className="w-full mt-3 sm:mt-5 px-6 py-2.5 sm:px-8 sm:py-3.5 bg-gradient-to-r from-[#c5a059] to-[#8a6132] hover:from-[#d4b574] hover:to-[#9e713d] text-slate-950 font-extrabold rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_15px_rgba(197,160,89,0.3)] text-sm sm:text-base tracking-wide uppercase border-none cursor-pointer"
                    >
                      {submitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-slate-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting Claim...
                        </span>
                      ) : "Claim Discount Coupon"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Shimmer and other utility keyframes */}
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
