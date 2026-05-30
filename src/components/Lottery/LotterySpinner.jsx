import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "@/utils/urls";

// Curated luxury color palette representing 1st Anniversary theme
const wheelItems = [
    { label: "₹0", color: "#1e293b" },    // Slate 800 - elegant dark steel
    { label: "₹10", color: "#d4af37" },   // Royal Metallic Gold
    { label: "₹0", color: "#334155" },    // Slate 700 - charcoal dark platinum
    { label: "₹25", color: "#0d9488" },   // Deep Emerald Teal
    { label: "₹0", color: "#451a03" },    // Deep Warm Bronze
    { label: "₹8", color: "#f59e0b" },    // Champagne Gold
    { label: "₹2", color: "#b76e79" },    // Rose Gold
    { label: "₹30", color: "#1d4ed8" },   // Vibrant Royal Sapphire
];

const ConfettiGenerator = () => {
    const colors = [
        "#34d399", // Neon Mint Green
        "#ec4899", // Bright Pink
        "#06b6d4", // Electric Cyan
        "#facc15", // Golden Yellow
        "#f97316", // Vibrant Orange
        "#a855f7", // Deep Purple
        "#3b82f6", // Royal Blue
        "#f43f5e"  // Coral Red
    ];
    
    const pieces = Array.from({ length: 75 }).map((_, idx) => {
        const left = (idx * 1.37) % 100;
        const delay = (idx * 0.09) % 6;
        const duration = 4.0 + (idx * 0.08) % 3.0;
        const color = colors[idx % colors.length];
        
        // 60% slender diagonal line ribbons, 20% circular dots, 20% rotated square diamonds
        const typeSelector = idx % 5;
        
        let style = {
            left: `${left}%`,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`,
            backgroundColor: color,
            position: 'absolute',
            top: '-40px',
            zIndex: 0,
        };
        
        if (typeSelector < 3) {
            // Slender diagonal line ribbons
            const width = 3 + (idx % 2); // 3px or 4px
            const height = 18 + (idx % 12); // 18px to 30px
            const rotation = (idx % 2 === 0) ? 25 + (idx % 20) : -25 - (idx % 20); // slanting angles like the screenshot
            style.width = `${width}px`;
            style.height = `${height}px`;
            style.transform = `rotate(${rotation}deg)`;
            style.borderRadius = "1px";
        } else if (typeSelector === 3) {
            // Circular dots
            const diameter = 6 + (idx % 4); // 6px to 9px
            style.width = `${diameter}px`;
            style.height = `${diameter}px`;
            style.borderRadius = "50%";
        } else {
            // Rotated small squares/diamonds
            const edge = 7 + (idx % 5); // 7px to 11px
            style.width = `${edge}px`;
            style.height = `${edge}px`;
            style.transform = `rotate(45deg)`;
        }
        
        return style;
    });

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {pieces.map((style, idx) => (
                <div
                    key={idx}
                    className="animate-[confettiFall_infinite_linear]"
                    style={style}
                />
            ))}
        </div>
    );
};

export default function SpinWheel() {
    const [rotation, setRotation] = useState(0);
    const [spinning, setSpinning] = useState(false);
    const [winner, setWinner] = useState("");
    const [cooldown, setCooldown] = useState(0);
    
    // Modal states
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [qrFile, setQrFile] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const lastSpin = localStorage.getItem("lastSpinTime");
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
        if (spinning || cooldown > 0) return;
        setSpinning(true);
        setWinner("");
        setSubmitted(false);
        setName("");
        setMobile("");
        setQrFile(null);
        setCooldown(300);
        localStorage.setItem("lastSpinTime", Date.now().toString());

        const segmentAngle = 360 / wheelItems.length;
        const winningIndex = Math.floor(Math.random() * wheelItems.length);

        const maxOffset = (segmentAngle / 2) - 5;
        const randomOffset = (Math.random() * 2 * maxOffset) - maxOffset;

        const targetAngle = -(winningIndex * segmentAngle) + randomOffset;
        const normalizedTarget = ((targetAngle % 360) + 360) % 360;
        const currentMod = ((rotation % 360) + 360) % 360;

        let extraRotation = normalizedTarget - currentMod;
        if (extraRotation <= 0) {
            extraRotation += 360;
        }

        const finalRotation = rotation + extraRotation + 360 * 5;

        setRotation(finalRotation);

        setTimeout(() => {
            setSpinning(false);
            setWinner(wheelItems[winningIndex].label);
            setShowModal(true);
        }, 5000); 
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!name || (!mobile && !qrFile)) return;
        setSubmitting(true);

        const formData = new FormData();
        formData.append("name", name);
        formData.append("amount", winner);
        if (mobile) formData.append("gpayNumber", mobile);
        if (qrFile) {
            formData.append("qrCode", qrFile);
        }

        try {
            const resp = await axios.post(`${BASE_URL}/lottery/claim`, formData);
            if (resp && resp.status === 201) {
                setSubmitted(true);
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

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center py-4 px-2 min-[360px]:px-4 overflow-y-auto overflow-x-hidden relative" style={{ backgroundColor: '#0b0f19' }}>

            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[450px] h-[450px] bg-blue-500/10 blur-[140px] rounded-full pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-yellow-500/10 blur-[150px] rounded-full pointer-events-none" />

            {/* Decorative Floating Sparkles & Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute w-2 h-2 bg-yellow-400 rounded-full opacity-60 animate-[floatUp_8s_infinite] left-[10%] [animation-delay:0s]" />
                <div className="absolute w-3 h-3 bg-amber-300 rounded-full opacity-40 animate-[floatUp_12s_infinite] left-[25%] [animation-delay:2s]" />
                <div className="absolute w-2 h-2 bg-yellow-200 rounded-full opacity-70 animate-[floatUp_10s_infinite] left-[45%] [animation-delay:4s]" />
                <div className="absolute w-4 h-4 bg-yellow-500 rounded-full opacity-30 animate-[floatUp_15s_infinite] left-[60%] [animation-delay:1s]" />
                <div className="absolute w-2 h-2 bg-amber-400 rounded-full opacity-60 animate-[floatUp_9s_infinite] left-[75%] [animation-delay:6s]" />
                <div className="absolute w-3 h-3 bg-yellow-300 rounded-full opacity-50 animate-[floatUp_11s_infinite] left-[90%] [animation-delay:3s]" />
                
                {/* Custom Sparkle Stars */}
                <div className="absolute text-yellow-400/40 text-lg animate-[floatUp_14s_infinite] left-[15%] [animation-delay:5s]">✦</div>
                <div className="absolute text-amber-300/30 text-xl animate-[floatUp_10s_infinite] left-[35%] [animation-delay:7s]">★</div>
                <div className="absolute text-yellow-200/50 text-sm animate-[floatUp_13s_infinite] left-[55%] [animation-delay:2s]">✦</div>
                <div className="absolute text-amber-400/40 text-lg animate-[floatUp_12s_infinite] left-[80%] [animation-delay:8s]">★</div>
            </div>

            {/* Celebration Badge Header */}
            <div className="relative z-10 mb-1.5 sm:mb-2.5 flex items-center justify-center">
                <span className="px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/30 text-amber-300 font-extrabold text-[10px] sm:text-xs tracking-widest uppercase animate-pulse shadow-[0_0_15px_rgba(245,158,11,0.15)] flex items-center gap-1.5">
                    <span className="inline-block text-amber-400">✨</span> 1st Anniversary Celebration <span className="inline-block text-amber-400">✨</span>
                </span>
            </div>

            <h1 className="text-2xl min-[360px]:text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 mb-1 sm:mb-2 drop-shadow-[0_2px_10px_rgba(250,204,21,0.3)] z-10 text-center tracking-wide font-sans">
                Social Bureau Spinner
            </h1>

            <p className="text-slate-300 text-[10px] min-[360px]:text-xs sm:text-sm max-w-md text-center z-10 mb-4 sm:mb-6 md:mb-8 font-medium leading-relaxed px-4">
                Thank you for being part of our 1st-year journey of branding excellence! Spin our special anniversary wheel to win exclusive rewards.
            </p>

            {/* WHEEL CONTAINER */}
            <div className="relative flex items-center justify-center z-10 mb-4 sm:mb-6 md:mb-8 max-w-full px-4">

                {/* POINTER */}
                <div className="absolute -top-5 sm:-top-7 left-1/2 -translate-x-1/2 z-30 drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]">
                    <svg className="w-8 h-10 sm:w-10 sm:h-12" viewBox="0 0 50 60" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                <div className="relative w-[230px] h-[230px] min-[340px]:w-[260px] min-[340px]:h-[260px] min-[400px]:w-[290px] min-[400px]:h-[290px] sm:w-[340px] sm:h-[340px] md:w-[380px] md:h-[380px] rounded-full p-2 bg-gradient-to-br from-yellow-300 via-amber-500 to-yellow-600 shadow-[0_0_40px_rgba(212,175,55,0.3),_inset_0_2px_5px_rgba(255,255,255,0.4)] border-2 border-amber-300/30 transition-all duration-300">

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
                                    className="absolute inset-0 flex items-start justify-center"
                                    style={{ transform: `rotate(${angle}deg)` }}
                                >
                                    <span
                                        className="pt-2 min-[340px]:pt-3 sm:pt-4 md:pt-6 text-white font-extrabold text-xs min-[340px]:text-sm sm:text-lg md:text-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] select-none"
                                    >
                                        {item.label}
                                    </span>
                                </div>
                            );
                        })}

                        <div className="absolute inset-0 rounded-full shadow-[inset_0_0_20px_rgba(0,0,0,0.7)] pointer-events-none" />
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-black/20 to-transparent pointer-events-none" />
                    </div>

                    {/* ANNIVERSARY CENTER CIRCLE / EMBLEM */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                        <div className="w-10 h-10 min-[340px]:w-12 min-[340px]:h-12 min-[400px]:w-14 min-[400px]:h-14 md:w-18 md:h-18 rounded-full bg-slate-900 shadow-[0_0_20px_rgba(0,0,0,0.8)] border-2 border-amber-400 flex flex-col items-center justify-center transition-all duration-300">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 font-extrabold text-[8px] min-[340px]:text-[10px] md:text-xs tracking-wide">
                                1st
                            </span>
                            <span className="text-amber-400 font-black text-[6px] min-[340px]:text-[8px] md:text-[10px] uppercase tracking-tighter">
                                YEAR
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* BUTTON & COOLDOWN */}
            <div className="min-h-[60px] flex flex-col items-center justify-start z-10 w-full text-center mt-2">
                <button
                    onClick={spinWheel}
                    disabled={spinning || cooldown > 0}
                    className="
                        relative overflow-hidden group px-8 py-3 sm:px-12 sm:py-4 rounded-full bg-gradient-to-b from-amber-300 via-yellow-400 to-amber-600 
                        hover:from-amber-200 hover:via-yellow-300 hover:to-amber-500 active:scale-95 transition-all duration-200
                        text-slate-950 font-black text-sm sm:text-base md:text-lg shadow-[0_0_20px_rgba(212,175,55,0.3),_0_6px_12px_rgba(0,0,0,0.3)]
                        disabled:from-slate-700 disabled:to-slate-800 disabled:text-slate-500 disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100 disabled:shadow-none
                        border-b-4 border-amber-700 active:border-b-0 active:translate-y-1 z-10
                    "
                >
                    <span className="relative z-10 uppercase tracking-widest flex items-center justify-center gap-2">
                        {spinning ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-slate-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Celebrating...
                            </>
                        ) : cooldown > 0 ? (
                            `Cooldown: ${Math.floor(cooldown / 60)}:${String(cooldown % 60).padStart(2, '0')}`
                        ) : (
                            <>
                                🎁 Spin & Win 🎁
                            </>
                        )}
                    </span>
                    {!spinning && cooldown === 0 && (
                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent group-hover:animate-[shimmer_1.5s_infinite] z-0" />
                    )}
                </button>
            </div>

            {/* WINNING MODAL (ANNIVERSARY CERTIFICATE STYLE) */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-955/85 backdrop-blur-md p-2 sm:p-4 overflow-y-auto" style={{ backgroundColor: 'rgba(11, 15, 25, 0.85)' }}>
                    {winner !== "₹0" && <ConfettiGenerator />}
                    <div className="bg-slate-900 rounded-2xl p-4 sm:p-6 md:p-8 max-w-md w-full max-h-[92vh] sm:max-h-[95vh] overflow-y-auto shadow-[0_0_50px_rgba(212,175,55,0.25)] border border-amber-500/40 text-center relative overflow-x-hidden scrollbar-thin">
                        
                        {/* Top decorative gold ribbon */}
                        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-300 via-yellow-500 to-amber-600" />
                        
                        {/* Background glow in modal */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-500/10 blur-[60px] rounded-full pointer-events-none" />
                        
                        {winner === "₹0" ? (
                            <div className="relative z-10 py-2">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-3 border border-slate-700">
                                    <span className="text-2xl sm:text-3xl">🤝</span>
                                </div>
                                <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-400 font-bold text-[10px] sm:text-xs tracking-wider uppercase mb-2 inline-block">
                                    Anniversary Special
                                </span>
                                <h2 className="text-xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-400 mb-2 drop-shadow-md">
                                    Better luck next spin!
                                </h2>
                                <p className="text-slate-400 text-[11px] sm:text-sm mb-5 leading-relaxed">
                                    Thank you for celebrating with us! Although you didn't hit a cash reward this time, the anniversary campaign allows unlimited spins every 5 minutes. Try again soon!
                                </p>
                                <button 
                                    onClick={() => setShowModal(false)}
                                    className="px-6 py-2.5 bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 text-slate-200 font-bold rounded-full transition-all duration-205 w-full shadow-lg border border-slate-700 text-xs sm:text-sm"
                                >
                                    Thank you!
                                </button>
                            </div>
                        ) : (
                            <div className="relative z-10">
                                {submitted ? (
                                    <div className="py-4 sm:py-6">
                                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-[0_0_25px_rgba(16,185,129,0.5)] border-2 border-emerald-400">
                                            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <h2 className="text-2xl sm:text-3xl font-black text-white mb-2 tracking-tight">Claim Submitted!</h2>
                                        <p className="text-slate-300 text-xs sm:text-sm mb-6 sm:mb-8 max-w-xs mx-auto">
                                            Your anniversary claim for <span className="text-amber-400 font-extrabold text-base sm:text-lg">{winner}</span> has been securely received. Our admin team will process this shortly!
                                        </p>
                                        <button 
                                            onClick={() => setShowModal(false)}
                                            className="px-6 py-2.5 sm:px-8 sm:py-3.5 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-extrabold rounded-full transition-all duration-200 w-full shadow-[0_4px_15px_rgba(212,175,55,0.3)] text-xs sm:text-sm"
                                        >
                                            Keep Celebrating!
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <div className="relative inline-block mb-2">
                                            <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-extrabold text-[10px] sm:text-xs tracking-wider uppercase inline-block animate-pulse">
                                                ✨ Anniversary Winner ✨
                                            </span>
                                            <div className="absolute -top-1 -right-2 text-yellow-400 animate-bounce">★</div>
                                        </div>
                                        
                                        <h2 className="text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 mb-1 drop-shadow-md">
                                            Won {winner}!
                                        </h2>
                                        <p className="text-slate-300 mb-4 sm:mb-6 text-[10px] sm:text-xs max-w-xs mx-auto">
                                            Congratulations! To receive your 1st Anniversary prize, enter your payout details below.
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
                                                    className="w-full bg-slate-955 border border-slate-800 text-slate-100 rounded-xl px-3 py-2 sm:px-4 sm:py-3 placeholder-slate-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all duration-200 text-xs sm:text-sm font-medium"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-slate-400 text-[10px] sm:text-xs font-bold mb-1 uppercase tracking-wider">Mobile Number (GPay/PhonePe)</label>
                                                <input 
                                                    type="tel"
                                                    value={mobile}
                                                    onChange={(e) => setMobile(e.target.value)}
                                                    placeholder="Enter 10-digit number"
                                                    className="w-full bg-slate-955 border border-slate-800 text-slate-100 rounded-xl px-3 py-2 sm:px-4 sm:py-3 placeholder-slate-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all duration-200 text-xs sm:text-sm font-medium"
                                                />
                                            </div>
                                            
                                            <div className="text-center text-slate-500 text-[10px] font-black relative py-1">
                                                <span className="bg-slate-900 px-3 relative z-10 tracking-widest text-[9px]">OR UPLOAD QR</span>
                                                <div className="absolute inset-0 flex items-center justify-center z-0">
                                                    <div className="w-full border-t border-slate-800/80"></div>
                                                </div>
                                            </div>
                                            
                                            <div>
                                                <label className="block text-slate-400 text-[10px] sm:text-xs font-bold mb-1 uppercase tracking-wider">Upload UPI QR Code</label>
                                                <input 
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => setQrFile(e.target.files[0])}
                                                    className="w-full bg-slate-955 border border-slate-800 text-slate-400 rounded-xl px-3 py-1.5 sm:px-4 sm:py-2 file:mr-2 sm:file:mr-4 file:py-1 file:px-3 sm:file:py-1.5 sm:file:px-4 file:rounded-full file:border-0 file:text-[10px] sm:file:text-xs file:font-black file:bg-amber-400 file:text-slate-950 hover:file:bg-amber-300 transition-all duration-200 cursor-pointer text-xs"
                                                />
                                            </div>

                                            <button 
                                                type="submit"
                                                disabled={submitting || !name || (!mobile && !qrFile)}
                                                className="w-full mt-3 sm:mt-5 px-6 py-2.5 sm:px-8 sm:py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-extrabold rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_15px_rgba(16,185,129,0.3)] text-sm sm:text-base tracking-wide"
                                            >
                                                {submitting ? (
                                                    <span className="flex items-center justify-center gap-2">
                                                        <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        Submitting...
                                                    </span>
                                                ) : "Claim Anniversary Reward"}
                                            </button>
                                        </form>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Custom Keyframes for Shimmer and Festive Floating Particles */}
            <style>{`
                @keyframes shimmer {
                    100% { transform: translateX(100%); }
                }
                @keyframes floatUp {
                    0% {
                        transform: translateY(105vh) translateX(0) rotate(0deg);
                        opacity: 0;
                    }
                    10% {
                        opacity: 0.75;
                    }
                    90% {
                        opacity: 0.75;
                    }
                    100% {
                        transform: translateY(-10vh) translateX(60px) rotate(360deg);
                        opacity: 0;
                    }
                }
                @keyframes confettiFall {
                    0% {
                        transform: translateY(-50px) rotate(0deg) translateX(0px);
                        opacity: 1;
                    }
                    50% {
                        transform: translateY(50vh) rotate(360deg) translateX(25px);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(105vh) rotate(720deg) translateX(-25px);
                        opacity: 0;
                    }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}</style>
        </div>
    );
}