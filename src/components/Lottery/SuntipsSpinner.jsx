import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "@/utils/urls";

const wheelItems = [
  { label: "Green Tea", image: "/assets/suntips-spin/suntips_green_tea.png", color: "#1e3f20" },    // Forest Green
  { label: "Lemon Tea", image: "/assets/suntips-spin/suntips_lemon_tea.png", color: "#a68d15" },    // Warm Gold/Yellow
  { label: "Next Time", image: null, color: "#2d1a12" },                                            // Dark Warm Brown
  { label: "Black Tea", image: "/assets/suntips-spin/suntips_black_tea.png", color: "#361b1b" },    // Dark Mahogany
  { label: "Next Time", image: null, color: "#2d1a12" },                                            // Dark Warm Brown
  { label: "Ginger Tea", image: "/assets/suntips-spin/suntips_ginger_tea.png", color: "#6b4329" },   // Spicy Ginger
  { label: "Masala Chai", image: "/assets/suntips-spin/suntips_masala_chai.png", color: "#854521" },  // Warm Terracotta
  { label: "Next Time", image: null, color: "#2d1a12" },                                            // Dark Warm Brown
];

const LeafConfettiGenerator = () => {
  const leaves = Array.from({ length: 40 }).map((_, idx) => {
    const left = (idx * 2.71) % 100;
    const delay = (idx * 0.15) % 8;
    const duration = 6.0 + (idx * 0.12) % 4.0;
    const rotationSpeed = 2 + (idx % 3);
    const size = 12 + (idx % 16); // 12px to 28px
    
    // Different green shades representing tea leaves
    const greenShades = [
      "#4ade80", // Light Green
      "#22c55e", // Green
      "#15803d", // Dark Green
      "#166534", // Deep Forest
      "#86efac", // Pale Green
    ];
    const color = greenShades[idx % greenShades.length];

    const style = {
      left: `${left}%`,
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
      position: 'absolute',
      top: '-40px',
      zIndex: 0,
      width: `${size}px`,
      height: `${size * 0.6}px`,
      backgroundColor: color,
      borderRadius: "0 100% 0 100%", // Simple leaf shape
      transform: `rotate(${idx * 15}deg)`,
      boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
    };

    return { style, rotationSpeed };
  });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {leaves.map(({ style }, idx) => (
        <div
          key={idx}
          className="animate-[leafFall_infinite_linear]"
          style={{
            ...style,
            animationName: 'leafFall',
          }}
        />
      ))}
      <style>{`
        @keyframes leafFall {
          0% {
            transform: translateY(-50px) rotate(0deg) translateX(0px);
            opacity: 1;
          }
          50% {
            transform: translateY(50vh) rotate(180deg) translateX(30px);
            opacity: 0.9;
          }
          100% {
            transform: translateY(105vh) rotate(360deg) translateX(-30px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default function SuntipsSpinner() {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [winnerIndex, setWinnerIndex] = useState(-1);
  const [cooldown, setCooldown] = useState(0);
  
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
      prize: `Suntips ${wheelItems[winnerIndex].label}`,
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

  return (
    <div className="h-screen w-full flex flex-col items-center justify-between py-4 px-4 overflow-hidden relative" style={{ backgroundColor: '#03120c' }}>

      {/* Ambient Tea Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-green-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[350px] h-[350px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 blur-[140px] rounded-full pointer-events-none" />

      {/* Falling Tea Leaves Background */}
      <LeafConfettiGenerator />

      {/* TOP CONTAINER (Header & Title) */}
      <div className="w-full flex flex-col items-center z-10 text-center">
        {/* Celebration Badge Header */}
        <div className="mb-1">
          <span className="px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500/20 to-amber-500/20 border border-emerald-500/30 text-emerald-300 font-extrabold text-[9px] sm:text-[10px] tracking-widest uppercase animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.1)] flex items-center gap-1.5">
            <span className="inline-block text-amber-400">🌿</span> Suntips Premium Tea Celebration <span className="inline-block text-amber-400">🌿</span>
          </span>
        </div>

        <h1 className="text-xl min-[360px]:text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-amber-300 to-yellow-400 mb-0.5 drop-shadow-[0_2px_8px_rgba(52,211,153,0.25)] tracking-wide font-sans">
          Suntips Tea Spin Wheel
        </h1>

        <p className="text-slate-350 text-[9px] min-[360px]:text-[10px] sm:text-xs max-w-sm font-medium leading-normal px-2">
          Spin the premium wheel to win a full flavor box of Suntips Tea!
        </p>
      </div>

      {/* WHEEL CONTAINER */}
      <div className="relative flex items-center justify-center z-10 my-2 max-w-full px-2">

        {/* POINTER */}
        <div className="absolute -top-4 sm:-top-5 left-1/2 -translate-x-1/2 z-30 drop-shadow-[0_3px_6px_rgba(0,0,0,0.6)]">
          <svg className="w-6 h-8 sm:w-8 sm:h-10" viewBox="0 0 50 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25 60 L0 18 Q0 0 18 0 L32 0 Q50 0 50 18 Z" fill="url(#pointerGrad)" />
            <defs>
              <linearGradient id="pointerGrad" x1="0" y1="0" x2="50" y2="60" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F59E0B" />
                <stop offset="1" stopColor="#B45309" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* WHEEL BORDER */}
        <div className="relative w-[190px] h-[190px] min-[340px]:w-[220px] min-[340px]:h-[220px] min-[400px]:w-[250px] min-[400px]:h-[250px] sm:w-[290px] sm:h-[290px] md:w-[330px] md:h-[330px] rounded-full p-2 bg-gradient-to-br from-yellow-300 via-emerald-600 to-yellow-600 shadow-[0_0_30px_rgba(245,158,11,0.2),_inset_0_1.5px_4px_rgba(255,255,255,0.4)] border-2 border-emerald-300/30 transition-all duration-300">

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
                  className="absolute inset-0 flex flex-col items-center justify-start pt-2 min-[340px]:pt-3 sm:pt-4 md:pt-5"
                  style={{ transform: `rotate(${angle}deg)` }}
                >
                  {item.image ? (
                    <>
                      <img
                        src={item.image}
                        alt={item.label}
                        className="w-6 h-6 min-[340px]:w-8 min-[340px]:h-8 sm:w-11 sm:h-11 md:w-14 md:h-14 object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)] select-none hover:scale-105 transition-transform"
                        draggable="false"
                      />
                      <span
                        className="mt-0.5 text-white font-black text-[6px] min-[340px]:text-[7px] sm:text-[9px] md:text-[10px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] select-none max-w-[35px] min-[340px]:max-w-[45px] sm:max-w-[55px] text-center leading-none uppercase tracking-tighter"
                      >
                        {item.label}
                      </span>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-2 min-[340px]:pt-3 sm:pt-4">
                      <span className="text-amber-400 font-extrabold text-[8px] min-[340px]:text-[10px] sm:text-[14px] md:text-[16px] mb-0.5 animate-pulse">
                        🍂
                      </span>
                      <span
                        className="text-white/80 font-black text-[5px] min-[340px]:text-[6px] sm:text-[8px] md:text-[9px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] select-none text-center uppercase tracking-widest max-w-[35px] min-[340px]:max-w-[45px]"
                      >
                        {item.label}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}

            <div className="absolute inset-0 rounded-full shadow-[inset_0_0_20px_rgba(0,0,0,0.7)] pointer-events-none" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-black/20 to-transparent pointer-events-none" />
          </div>

          {/* CENTER EMBLEM */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            <div className="w-8 h-8 min-[340px]:w-10 min-[340px]:h-10 min-[400px]:w-12 min-[400px]:h-12 md:w-16 md:h-16 rounded-full bg-slate-900 shadow-[0_0_15px_rgba(0,0,0,0.8)] border-2 border-amber-400 flex flex-col items-center justify-center transition-all duration-300">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-amber-400 to-yellow-400 font-extrabold text-[6px] min-[340px]:text-[7px] md:text-[9px] uppercase tracking-widest leading-none">
                SUNTIPS
              </span>
              <span className="text-amber-400 font-black text-[4px] min-[340px]:text-[5px] md:text-[7px] uppercase tracking-wider mt-0.5">
                TEA
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* BUTTON & COOLDOWN */}
      <div className="min-h-[50px] flex flex-col items-center justify-start z-10 w-full text-center my-1">
        <button
          onClick={spinWheel}
          disabled={spinning || cooldown > 0 || alreadyClaimed}
          className="
            relative overflow-hidden group px-8 py-2.5 sm:px-10 sm:py-3.5 rounded-full bg-gradient-to-b from-amber-300 via-yellow-400 to-amber-600 
            hover:from-amber-200 hover:via-yellow-300 hover:to-amber-500 active:scale-95 transition-all duration-200
            text-slate-950 font-black text-xs sm:text-sm md:text-base shadow-[0_0_15px_rgba(212,175,55,0.25),_0_4px_8px_rgba(0,0,0,0.3)]
            disabled:from-slate-700 disabled:to-slate-800 disabled:text-slate-500 disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100 disabled:shadow-none
            border-b-4 border-amber-700 active:border-b-0 active:translate-y-0.5 z-10
          "
        >
          <span className="relative z-10 uppercase tracking-widest flex items-center justify-center gap-1.5">
            {alreadyClaimed ? (
              <>
                🍃 Prize Claimed 🍃
              </>
            ) : spinning ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-3.5 w-3.5 text-slate-955" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Steeping...
              </>
            ) : cooldown > 0 ? (
              `Next Spin: ${Math.floor(cooldown / 60)}:${String(cooldown % 60).padStart(2, '0')}`
            ) : (
              <>
                🍃 Spin & Win Tea 🍃
              </>
            )}
          </span>
          {!spinning && cooldown === 0 && !alreadyClaimed && (
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent group-hover:animate-[shimmer_1.5s_infinite] z-0" />
          )}
        </button>
      </div>

      {/* WINNING CLAIM MODAL (TEA CERTIFICATE STYLE) */}
      {showModal && currentWinner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-955/85 backdrop-blur-md p-3 sm:p-4 overflow-y-auto" style={{ backgroundColor: 'rgba(3, 18, 12, 0.85)' }}>
          <div className="bg-slate-900 rounded-2xl p-5 sm:p-7 md:p-9 max-w-md w-full max-h-[92vh] sm:max-h-[95vh] overflow-y-auto shadow-[0_0_50px_rgba(16,185,129,0.25)] border border-emerald-500/40 text-center relative overflow-x-hidden scrollbar-thin">
            
            {/* Top decorative gold ribbon */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-400 via-amber-400 to-yellow-500" />
            
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
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-emerald-500/10 blur-[60px] rounded-full pointer-events-none" />
            
            <div className="relative z-10">
              {!currentWinner.image ? (
                <div className="py-4 sm:py-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 border-2 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)] animate-pulse">
                    <span className="text-amber-400 text-3xl">🍂</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white mb-2 tracking-tight">Better Luck Next Time!</h2>
                  <p className="text-slate-300 text-xs sm:text-sm mb-6 sm:mb-8 max-w-xs mx-auto leading-relaxed">
                    The tea leaves have spoken, but today wasn't your lucky match. Don't worry, you can try again after the cooldown!
                  </p>
                  <button 
                    onClick={() => setShowModal(false)}
                    className="px-6 py-2.5 sm:px-8 sm:py-3.5 bg-gradient-to-br from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-extrabold rounded-full transition-all duration-200 w-full shadow-[0_4px_15px_rgba(245,158,11,0.3)] text-xs sm:text-sm uppercase tracking-wider cursor-pointer"
                  >
                    Try Again Later
                  </button>
                </div>
              ) : submitted ? (
                <div className="py-4 sm:py-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-[0_0_25px_rgba(16,185,129,0.5)] border-2 border-emerald-400">
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white mb-2 tracking-tight">Delivery Claim Submitted!</h2>
                  <p className="text-slate-300 text-xs sm:text-sm mb-6 sm:mb-8 max-w-xs mx-auto">
                    Your shipment request for <span className="text-emerald-400 font-extrabold text-base sm:text-lg">Suntips {currentWinner.label}</span> has been securely processed. We will prepare your tea pack for shipping!
                  </p>
                  <button 
                    onClick={() => setShowModal(false)}
                    className="px-6 py-2.5 sm:px-8 sm:py-3.5 bg-gradient-to-r from-emerald-400 to-emerald-600 hover:from-emerald-300 hover:to-emerald-500 text-slate-955 font-extrabold rounded-full transition-all duration-200 w-full shadow-[0_4px_15px_rgba(16,185,129,0.3)] text-xs sm:text-sm uppercase tracking-wider"
                  >
                    Happy Brewing!
                  </button>
                </div>
              ) : (
                <>
                  <div className="relative inline-block mb-3">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-extrabold text-[10px] sm:text-xs tracking-wider uppercase inline-block animate-pulse">
                      ✨ Tea Pack Winner ✨
                    </span>
                    <div className="absolute -top-1 -right-2 text-yellow-400 animate-bounce">★</div>
                  </div>

                  {/* Render the specific tea pack won */}
                  <div className="w-24 h-24 sm:w-28 sm:h-28 bg-slate-955/40 rounded-xl flex items-center justify-center mx-auto mb-3 border border-emerald-500/20 shadow-inner">
                    <img 
                      src={currentWinner.image}
                      alt={currentWinner.label}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-contain drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]"
                    />
                  </div>
                  
                  <h2 className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-amber-300 to-yellow-400 mb-1 drop-shadow-md">
                    Won {currentWinner.label}!
                  </h2>
                  <p className="text-slate-300 mb-4 sm:mb-6 text-[10px] sm:text-xs max-w-xs mx-auto">
                    Congratulations! Enter your details below to receive your premium box of Suntips Tea.
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
                        className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-xl px-3 py-2 sm:px-4 sm:py-3 placeholder-slate-700 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all duration-200 text-xs sm:text-sm font-medium"
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
                        className="w-full bg-slate-955 border border-slate-800 text-slate-100 rounded-xl px-3 py-2 sm:px-4 sm:py-3 placeholder-slate-700 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all duration-200 text-xs sm:text-sm font-medium"
                      />
                    </div>

                    <button 
                      type="submit"
                      disabled={submitting || !name || !mobile}
                      className="w-full mt-3 sm:mt-5 px-6 py-2.5 sm:px-8 sm:py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-extrabold rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_15px_rgba(16,185,129,0.3)] text-sm sm:text-base tracking-wide uppercase"
                    >
                      {submitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting Claim...
                        </span>
                      ) : "Claim Premium Tea Pack"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SPONSORS SECTION */}
      <div className="relative z-10 w-full max-w-3xl border-t border-emerald-500/10 pt-3 pb-1 text-center px-4 mt-2 mb-1">
        <h3 className="text-emerald-400/45 uppercase tracking-[0.25em] text-[8px] sm:text-[9px] font-black mb-3">
          Campaign Partners & Sponsors
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-14 opacity-75">
          <div className="flex flex-col items-center group">
            <img 
              src="https://suntips.in/wp-content/uploads/2023/10/Sun-Tips-Logo.png" 
              alt="Sun Tips" 
              className="h-6 sm:h-9 object-contain grayscale opacity-65 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
            />
            <span className="text-[7px] sm:text-[8px] text-slate-500 font-bold uppercase tracking-wider mt-1 group-hover:text-slate-350 transition-colors">Title Sponsor</span>
          </div>

          <div className="flex flex-col items-center group">
            <img 
              src="https://newstamil.tv/wp-content/uploads/2022/09/News-Tamil-Logo-01-1.png" 
              alt="News Tamil 24x7" 
              className="h-6 sm:h-9 object-contain grayscale opacity-65 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
            />
            <span className="text-[7px] sm:text-[8px] text-slate-500 font-bold uppercase tracking-wider mt-1 group-hover:text-slate-350 transition-colors">Media Partner</span>
          </div>

          <div className="flex flex-col items-center group">
            <img 
              src="https://bigtvtelugu.com/wp-content/uploads/2022/06/Big-TV-Logo.png" 
              alt="Big TV" 
              className="h-6 sm:h-9 object-contain grayscale opacity-65 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
            />
            <span className="text-[7px] sm:text-[8px] text-slate-500 font-bold uppercase tracking-wider mt-1 group-hover:text-slate-350 transition-colors">Broadcasting Partner</span>
          </div>

          <div className="flex flex-col items-center group">
            {/* Social Bureau Logo */}
            <div className="flex items-center gap-2 grayscale opacity-65 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 min-h-[24px] sm:min-h-[36px] items-center justify-center">
              <span className="text-white font-black text-xs sm:text-sm tracking-tighter uppercase">Social Bureau</span>
            </div>
            <span className="text-[7px] sm:text-[8px] text-slate-500 font-bold uppercase tracking-wider mt-0.5 group-hover:text-slate-350 transition-colors">Branding Partner</span>
          </div>
        </div>
      </div>

      {/* Shimmer and other utility keyframes */}
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
