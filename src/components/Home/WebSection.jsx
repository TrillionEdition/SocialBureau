import React from "react";
import { useNavigate } from "react-router-dom";

const WebSection = () => {
    const navigate = useNavigate();

    return (
        <section
            className="
                relative w-full h-full overflow-hidden
                bg-gradient-to-br from-[#7F1B1B] to-[#D82E31]
                bg-[url('https://res.cloudinary.com/dtwcgfmar/image/upload/v1771218490/Untitled_design_34_1_oqfhd2.webp')]
                bg-cover bg-center
            "
        >
            <div className="absolute inset-0 bg-black/20 md:bg-transparent" />

            <div className="relative h-full max-w-7xl mx-auto px-6 flex items-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">

                    {/* EMPTY LEFT COLUMN */}
                    <div className="hidden md:block" />

                    {/* RIGHT SIDE - TEXT */}
                    <div className="flex justify-center md:justify-end">
                        <div className="text-white text-center md:text-right max-w-xl">
                            <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-4 opacity-90">
                                Web Development
                            </p>

                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                                High-Performance Websites
                            </h1>

                            <p className="text-base sm:text-lg text-white/80 mb-8 leading-relaxed">
                                Engineered for speed, scalability, and seamless user experience —
                                built with modern frameworks and clean architecture.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-end">
                                <button
                                    onClick={() => navigate("/services")}
                                    className="px-6 py-3 bg-white text-[#D82E31] rounded-full"
                                >
                                    Learn more
                                </button>

                                <button
                                    onClick={() => navigate("/contact")}
                                    className="px-6 py-3 border border-white text-white rounded-full hover:bg-white hover:text-[#D82E31]"
                                >
                                    Get a quote
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default WebSection;
