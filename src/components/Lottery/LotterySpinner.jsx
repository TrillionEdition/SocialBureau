import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "@/utils/urls";

const wheelItems = [
    { label: "₹0", color: "#ef4444" },     // red-500
    { label: "₹10", color: "#eab308" },   // yellow-500
    { label: "₹0", color: "#f97316" },    // orange-500
    { label: "₹25", color: "#14b8a6" },    // teal-500
    { label: "₹0", color: "#8b5cf6" },     // violet-500
    { label: "₹8", color: "#22c55e" },     // green-500
    { label: "₹2", color: "#ec4899" },   // pink-500
    { label: "₹30", color: "#06b6d4" },   // cyan-500
];

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
            // Let axios set the Content-Type (including boundary) for multipart/form-data
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
        <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden relative">

            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-500/20 blur-[120px] rounded-full pointer-events-none" />

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-600 mb-8 sm:mb-12 drop-shadow-[0_2px_10px_rgba(250,204,21,0.4)] z-10 text-center tracking-wide">
                TEST YOUR LUCK
            </h1>

            {/* WHEEL CONTAINER */}
            <div className="relative flex items-center justify-center z-10 mb-8 max-w-full px-4">

                {/* POINTER */}
                <div className="absolute -top-6 sm:-top-8 left-1/2 -translate-x-1/2 z-30 drop-shadow-[0_6px_6px_rgba(0,0,0,0.6)]">
                    <svg className="w-10 h-12 sm:w-[50px] sm:h-[60px]" viewBox="0 0 50 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M25 60 L0 18 Q0 0 18 0 L32 0 Q50 0 50 18 Z" fill="url(#pointerGrad)" />
                        <defs>
                            <linearGradient id="pointerGrad" x1="0" y1="0" x2="50" y2="60" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#FACC15" />
                                <stop offset="1" stopColor="#B45309" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>

                {/* WHEEL BORDER */}
                <div className="relative w-[280px] h-[280px] min-[360px]:w-[320px] min-[360px]:h-[320px] sm:w-[360px] sm:h-[360px] md:w-[420px] md:h-[420px] rounded-full p-1.5 sm:p-2 bg-gradient-to-br from-gray-700 to-gray-900 shadow-[0_0_50px_rgba(0,0,0,0.5)] ring-4 ring-yellow-500/50 transition-all duration-300">

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
                                        className="pt-4 min-[360px]:pt-6 md:pt-8 text-white font-extrabold text-lg min-[360px]:text-xl sm:text-2xl md:text-3xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] select-none"
                                    >
                                        {item.label}
                                    </span>
                                </div>
                            );
                        })}

                        <div className="absolute inset-0 rounded-full shadow-[inset_0_0_30px_rgba(0,0,0,0.6)] pointer-events-none" />
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-black/20 to-transparent pointer-events-none" />
                    </div>

                    {/* CENTER CIRCLE */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-12 h-12 min-[360px]:w-16 min-[360px]:h-16 md:w-20 md:h-20 rounded-full bg-gray-800 shadow-[0_0_20px_rgba(0,0,0,0.6)] border-4 border-yellow-500 flex items-center justify-center transition-all duration-300">
                            <div className="w-6 h-6 min-[360px]:w-8 min-[360px]:h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-600 shadow-inner transition-all duration-300"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* BUTTON & COOLDOWN (Winner text moved to Modal) */}
            <div className="min-h-[80px] flex flex-col items-center justify-start z-10 w-full text-center space-y-4">
                <button
                    onClick={spinWheel}
                    disabled={spinning || cooldown > 0}
                    className="
                        relative overflow-hidden group px-8 py-3 sm:px-12 sm:py-4 rounded-full bg-gradient-to-b from-yellow-400 to-yellow-600 
                        hover:from-yellow-300 hover:to-yellow-500 active:scale-95 transition-all duration-200
                        text-yellow-950 font-black text-lg sm:text-xl md:text-2xl shadow-[0_0_20px_rgba(234,179,8,0.4)]
                        disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
                        border-b-4 border-yellow-700 active:border-b-0 active:translate-y-1
                    "
                >
                    <span className="relative z-10 uppercase tracking-widest">
                        {spinning ? "Spinning..." : cooldown > 0 ? `Wait ${Math.floor(cooldown / 60)}:${String(cooldown % 60).padStart(2, '0')}` : "Spin Now"}
                    </span>
                    {!spinning && cooldown === 0 && (
                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-[shimmer_1.5s_infinite] z-0" />
                    )}
                </button>
            </div>

            {/* WINNING MODAL */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 transition-opacity duration-300">
                    <div className="bg-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-yellow-500/30 text-center relative overflow-hidden">
                        
                        {/* Background glow in modal */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-yellow-500/20 blur-[50px] rounded-full pointer-events-none" />
                        
                        {winner === "₹0" ? (
                            <div className="relative z-10">
                                <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-500 mb-4 drop-shadow-md">
                                    Better luck next time!
                                </h2>
                                <p className="text-gray-400 mb-8">You didn't win anything this time. Wait for the cooldown and try again!</p>
                                <button 
                                    onClick={() => setShowModal(false)}
                                    className="px-8 py-3 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-full transition-colors w-full"
                                >
                                    Close
                                </button>
                            </div>
                        ) : (
                            <div className="relative z-10">
                                {submitted ? (
                                    <div className="py-6">
                                        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(34,197,94,0.5)]">
                                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <h2 className="text-3xl font-extrabold text-white mb-2">Claim Submitted!</h2>
                                        <p className="text-gray-300 mb-8">We will process your reward of <span className="text-yellow-400 font-bold">{winner}</span> shortly.</p>
                                        <button 
                                            onClick={() => setShowModal(false)}
                                            className="px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-yellow-950 font-bold rounded-full transition-colors w-full"
                                        >
                                            Awesome!
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500 mb-2 drop-shadow-md animate-bounce">
                                            🎉 You Won {winner}!
                                        </h2>
                                        <p className="text-gray-300 mb-6 text-sm">Claim your reward by providing your payment details below.</p>
                                        
                                        <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
                                            <div>
                                                <label className="block text-gray-400 text-sm font-semibold mb-1">Full Name</label>
                                                <input 
                                                    type="text"
                                                    required
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    placeholder="Enter your name"
                                                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-colors"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-gray-400 text-sm font-semibold mb-1">Mobile Number (GPay/PhonePe)</label>
                                                <input 
                                                    type="tel"
                                                    value={mobile}
                                                    onChange={(e) => setMobile(e.target.value)}
                                                    placeholder="Enter 10-digit number"
                                                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-colors"
                                                />
                                            </div>
                                            
                                            <div className="text-center text-gray-500 text-sm font-bold relative">
                                                <span className="bg-slate-800 px-2 relative z-10">OR</span>
                                                <div className="absolute inset-0 flex items-center justify-center z-0">
                                                    <div className="w-full border-t border-slate-700"></div>
                                                </div>
                                            </div>
                                            
                                            <div>
                                                <label className="block text-gray-400 text-sm font-semibold mb-1">Upload QR Code</label>
                                                <input 
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => setQrFile(e.target.files[0])}
                                                    className="w-full bg-slate-900 border border-slate-700 text-gray-400 rounded-lg px-4 py-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-500 file:text-yellow-950 hover:file:bg-yellow-400 transition-colors"
                                                />
                                            </div>

                                            <button 
                                                type="submit"
                                                disabled={submitting || !name || (!mobile && !qrFile)}
                                                className="w-full mt-4 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-bold rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(34,197,94,0.4)]"
                                            >
                                                {submitting ? "Submitting..." : "Claim Reward"}
                                            </button>
                                        </form>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Added custom keyframes for shimmer */}
            <style>{`
                @keyframes shimmer {
                    100% { transform: translateX(100%); }
                }
            `}</style>
        </div>
    );
}