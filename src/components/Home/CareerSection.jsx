import React from "react";
import { Link, useNavigate } from "react-router-dom";
import GridScan from "./Hyperspeed";

const CareerSection = () => {
    const navigate = useNavigate();

    return (
        <section className="relative w-full h-[85vh] min-h-[600px] overflow-hidden bg-black">
            {/* GRIDSCAN BACKGROUND */}
            <div className="absolute inset-0 w-full h-full z-0">
                <GridScan
                    sensitivity={0.8}
                    lineThickness={1.5}
                    linesColor="#450a0a"
                    gridScale={0.12}
                    scanColor="#ff0000"
                    scanOpacity={0.5}
                    enablePost={true}
                    bloomIntensity={0.8}
                    chromaticAberration={0.003}
                    noiseIntensity={0.02}
                    scanOnClick={true}
                    scanDuration={1.5}
                    scanDelay={1.0}
                />
            </div>

            {/* APPLE-STYLE OVERLAY - Using pointer-events-none so mouse reaches the GridScan */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/60 pointer-events-none z-1" />

            {/* CONTENT */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 pointer-events-none">

                {/* EYEBROW */}
                <span className="text-white text-sm sm:text-base font-semibold tracking-tight mb-3">
                    Careers
                </span>

                {/* MAIN TITLE - Tight letter spacing, bold impact */}
                <h2 className="text-white text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
                    Build your future <br className="hidden sm:block" /> with us.
                </h2>

                {/* SUBTITLE - Subtle grey for hierarchy */}
                <p className="text-[#A1A1A6] text-lg sm:text-xl lg:text-2xl font-medium max-w-2xl mx-auto mb-10">
                    Join a team that values craftsmanship and impact. <br className="hidden md:block" />
                    Work on products that matter.
                </p>

                {/* CTAs - Apple standard "Blue Button" and "Chevron Link" */}
                <div className="flex flex-col sm:flex-row items-center gap-6 pointer-events-auto">
                    <button
                        onClick={() => navigate("/careers")}
                        className="bg-[#751111] hover:bg-[#ce1a38] text-white px-8 py-3 rounded-full text-lg font-normal transition-all duration-300 cursor-pointer"
                    >
                        View Open Roles
                    </button>
                </div>
            </div>

            <p className="visually-hidden">Join a forward-thinking digital marketing and technology company focused on innovation,
                performance, and long-term growth. We’re hiring talented professionals across web
                development, SEO, performance marketing, AI-powered marketing solutions, and digital
                strategy who want to build meaningful careers and work on impactful projects. Our culture
                emphasizes collaboration, continuous learning, transparent communication, and delivering
                measurable results for clients worldwide</p>
        </section>
    );
};

export default CareerSection;
