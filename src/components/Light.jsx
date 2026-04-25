import { useEffect, useState } from "react";

export default function SocialBureauIntro() {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setAnimate(true), 500);
        return () => clearTimeout(t);
    }, []);

    return (
        <div className="relative h-screen w-full overflow-hidden bg-black">

            {/* Background */}
            <img
                src="https://res.cloudinary.com/dtwcgfmar/image/upload/v1777125297/ChatGPT_Image_Apr_25_2026_07_24_37_PM_zvoonx.png"
                alt="background"
                className="absolute inset-0 w-full h-full object-cover z-0"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20 md:bg-black/30 z-10" />

            {/* Content */}
            <div
                className="relative z-20 flex items-center justify-center h-full px-4 text-center"
                style={{ perspective: "1200px" }}
            >
                {/* ✅ APPLY ANIMATION HERE */}
                <div
                    className="flex flex-col items-center leading-tight text-white font-bold tracking-widest transition-all duration-[2800ms] ease-out text-xl sm:text-3xl md:text-5xl lg:text-6xl"
                    style={{
                        transform: animate
                            ? "translateZ(0px) translateY(0px) scale(1)"
                            : "translateZ(-1000px) translateY(200px) scale(0.2)",
                        opacity: animate ? 1 : 0,
                    }}
                >
                    <span>Welcome to</span>

                    <span
                        style={{ fontFamily: "MyFont, sans-serif" }}
                        className="mt-2 md:mt-4 text-2xl sm:text-4xl md:text-6xl"
                    >
                        Social<span className="text-[#ff0000]">B</span>ureau
                    </span>
                </div>
            </div>
        </div>
    );
}
