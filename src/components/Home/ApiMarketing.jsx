import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ApiMarketing = () => {
    const navigate = useNavigate();

    return (
        <section className="bg-white flex items-center py-12 md:py-24">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">

                {/* TEXT */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-black mb-6 tracking-tighter leading-[1.1]">
                        World’s First
                        <br />
                        <span className="bg-gradient-to-r from-black via-black/70 to-black/40 bg-clip-text text-transparent">
                            API-Driven
                        </span>
                        <br />
                        Marketing Agency
                    </h1>

                    <p className="text-base sm:text-lg md:text-xl text-black/60 max-w-md mb-8">
                        Automate, Integrate, and Scale Your Marketing powered by real-time
                        data, AI, and performance APIs.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={() => navigate("/services")}
                            className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-full font-bold text-xs uppercase tracking-[0.2em]"
                        >
                            Get Started
                        </button>
                    </div>
                </motion.div>

                {/* IMAGE */}
                <motion.div
                    className="flex justify-center md:justify-end"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    <img
                        src="https://i.pinimg.com/736x/07/08/33/070833bad9343eb0d263cf18f74c99eb.jpg"
                        alt=""
                        className="w-full max-w-md md:max-w-full object-contain rounded-2xl"
                    />
                </motion.div>

            </div>
        </section>
    );
};

export default ApiMarketing;
