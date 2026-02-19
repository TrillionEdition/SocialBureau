// import { useState } from "react";

// export default function Hero() {
//     const [burst, setBurst] = useState(false);
//     const [hearts, setHearts] = useState([]);

//     const handleBurst = () => {
//         setBurst(true);

//         const rain = Array.from({ length: 70 }).map((_, i) => ({
//             id: i + Date.now(),
//             left: Math.random() * 100,
//             size: Math.random() * 24 + 12,
//             duration: Math.random() * 3 + 2,
//             delay: Math.random(),
//         }));

//         setHearts(rain);

//         setTimeout(() => {
//             setBurst(false);
//             setHearts([]);
//         }, 5000);
//     };

//     return (
//         <section className="relative flex items-center justify-center h-screen overflow-hidden bg-gradient-to-br from-pink-100 to-red-200 cursor-default">

//             {/* CSS Animations */}
//             <style>{`
//                 @keyframes pulseHeart {
//                     0%, 100% { transform: scale(1); }
//                     50% { transform: scale(1.05); }
//                 }
//                 @keyframes burstHeart {
//                     0% { transform: scale(1); opacity: 1; }
//                     100% { transform: scale(4); opacity: 0; }
//                 }
//                 @keyframes heartRain {
//                     0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
//                     100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
//                 }
//                 @keyframes hintPulse {
//                     0%, 100% { opacity: 0.4; transform: translateY(0); }
//                     50% { opacity: 1; transform: translateY(-5px); }
//                 }
//             `}</style>

//             <div className="relative flex items-center justify-center z-20">
//                 {!burst && (
//                     <div className="relative flex items-center justify-center">

//                         {/* TEXT HINT AT THE TOP */}
//                         <p
//                             className="absolute -top-2 md:-top-2 text-[12px] md:text-[14px] tracking-[0.4em] font-black text-red-600 whitespace-nowrap pointer-events-none"
//                             style={{ animation: "hintPulse 2s ease-in-out infinite" }}
//                         >
//                             Click the Heart
//                         </p>

//                         {/* INVISIBLE CLICK ZONE - Explicitly setting cursor-pointer */}
//                         <button
//                             onClick={handleBurst}
//                             className="absolute inset-0 w-full h-full z-30 cursor-pointer rounded-full bg-transparent outline-none focus:outline-none"
//                             aria-label="Heart trigger"
//                         />

//                         {/* BIG HEART - Added select-none to prevent text-cursor glitch */}
//                         <span
//                             className="text-[350px] md:text-[500px] leading-none select-none drop-shadow-2xl pointer-events-none"
//                             style={{ animation: "pulseHeart 2s ease-in-out infinite" }}
//                         >
//                             ❤️
//                         </span>

//                         {/* LOGO */}
//                         <div className="absolute top-[42%] flex items-center justify-center pointer-events-none">
//                             <div className="w-40 h-24 md:w-40 md:h-40 flex items-center justify-center overflow-hidden">
//                                 <img
//                                     src="/assets/logo.webp"
//                                     alt="logo"
//                                     className="w-[85%] h-auto object-contain drop-shadow-100"
//                                 />
//                             </div>
//                         </div>

//                     </div>
//                 )}

//                 {/* BURST EFFECT */}
//                 {burst && (
//                     <span
//                         className="absolute text-[350px] md:text-[500px] pointer-events-none select-none"
//                         style={{ animation: "burstHeart 0.8s ease-out forwards" }}
//                     >
//                         ❤️
//                     </span>
//                 )}
//             </div>

//             {/* HEART RAIN */}
//             {hearts.map((heart) => (
//                 <span
//                     key={heart.id}
//                     className="absolute top-[-10%] pointer-events-none select-none"
//                     style={{
//                         left: `${heart.left}%`,
//                         fontSize: `${heart.size}px`,
//                         animation: `heartRain ${heart.duration}s linear ${heart.delay}s forwards`,
//                     }}
//                 >
//                     ❤️
//                 </span>
//             ))}
//         </section>
//     );
// }


import { useEffect, useState } from "react";

export default function ImageCarousel() {
    const images = [
        "/assets/yard.png",
        "/assets/home/Hero1.png",
        "/assets/home/businessperformance.png",
    ];

    const [active, setActive] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActive((prev) => (prev + 1) % images.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <section className="relative w-full h-screen overflow-hidden">
            {images.map((img, index) => (
                <img
                    key={index}
                    src={img}
                    alt={`Slide ${index + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${active === index ? "opacity-100" : "opacity-0"
                        }`}
                />
            ))}
        </section>
    );
}
