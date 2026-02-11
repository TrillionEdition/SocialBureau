import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ApiMarketing = () => {
    const navigate = useNavigate();

    return (
        <section className="min-h-screen bg-white flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 gap-8 items-center">

                {/* TEXT */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-2xl sm:text-4xl md:text-7xl font-black text-black mb-4 tracking-tighter leading-[1]">
                        World’s First
                        <br />
                        <span className="bg-gradient-to-r from-black via-black/70 to-black/40 bg-clip-text text-transparent">
                            API-Driven
                        </span>
                        <br />
                        Marketing Agency
                    </h1>

                    <p className="text-xs sm:text-base md:text-lg text-black/60 max-w-md mb-6">
                        Automate, Integrate, and Scale Your Marketing powered by real-time
                        data, AI, and performance APIs.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
                        <button
                            onClick={() => navigate("/services")}
                            className="px-6 sm:px-10 py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-[10px] sm:text-xs uppercase tracking-[0.2em]"
                        >
                            Get Started
                        </button>

                        <button
                            onClick={() => navigate("/services")}
                            className="px-6 sm:px-10 py-3 sm:py-4 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-full font-bold text-[10px] sm:text-xs uppercase tracking-[0.2em]"
                        >
                            Explore Solutions
                        </button>
                    </div>
                </motion.div>

                {/* IMAGE */}
                <motion.div
                    className="flex justify-end"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    <img
                        src="/assets/ShamSK.webp"
                        alt=""
                        className="w-full max-w-[140px] sm:max-w-xs md:max-w-md object-contain rounded-3xl"
                    />
                </motion.div>

            </div>
        </section>
    );
};

export default ApiMarketing;
