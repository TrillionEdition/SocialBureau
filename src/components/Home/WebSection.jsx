import React from "react";
import { useNavigate } from "react-router-dom";
import { getOptimizedCloudinaryUrl } from "../../../utils/cloudinary";

const WebSection = () => {
    const navigate = useNavigate();

    return (
        /* Reduced padding from py-40 to py-16/py-24 to match standard Apple section heights */
        <section className="w-full bg-[#920F17] py-16 md:py-24 font-['-apple-system',_BlinkMacSystemFont,_'Segoe_UI',_Roboto,_'Helvetica_Neue',_Arial,_sans-serif] overflow-hidden">
            <div className="max-w-[1250px] mx-auto px-6 md:px-16">

                <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16">

                    <div className="relative w-full md:w-[48%] aspect-[4/3] md:aspect-square overflow-hidden rounded-[1.5rem] md:rounded-[2rem] shadow-2xl">
                        <video
                            className="w-full h-full object-cover"
                            autoPlay
                            loop
                            muted
                            playsInline
                            title="Web development and design process"
                        >
                            <source
                                src={getOptimizedCloudinaryUrl("https://res.cloudinary.com/dtwcgfmar/video/upload/v1771577680/From_KlickPin_CF_Pin_by_Craig_Gittins_on_Websites___Web_development_design_Web_ui_design_Web_graphic_design_qg3k8t.webm", 1280)}
                                type="video/webm"
                            />
                        </video>
                    </div>

                    {/* RIGHT – TEXT */}
                    <div className="text-center md:text-right text-white w-full md:max-w-xl">
                        <span className="block text-[12px] md:text-[13px] font-bold tracking-[0.2em] uppercase mb-3 opacity-90">
                            Web Development
                        </span>

                        {/* Used whitespace-nowrap and smaller base text size (text-[28px]) 
                           to ensure "High-Performance" never breaks on mobile.
                        */}
                        <h2 className="text-[28px] sm:text-[36px] md:text-[56px] lg:text-[64px] font-bold tracking-tight leading-[1.1] mb-6">
                            <span className="whitespace-nowrap">High-Performance</span> <br className="hidden md:block" /> Websites
                        </h2>

                        <p className="text-[16px] md:text-[19px] text-white/90 leading-relaxed mb-8 font-light max-w-md md:ml-auto">
                            Engineered for speed, scalability, and seamless user experience
                            built with modern frameworks and clean architecture.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-end">
                            <button
                                onClick={() => navigate("/web-development-agency-in-kochi")}
                                className="px-8 py-2.5 bg-white text-[#920F17] rounded-full font-medium hover:bg-gray-100 transition-all text-[15px] md:text-[16px] w-full sm:w-auto min-w-[150px]"
                            >
                                Learn more
                            </button>

                        </div>
                    </div>

                </div>
            </div>

            <p className="sr-only">
                We design and develop high-performance websites optimized for speed and scalability.
            </p>
        </section>
    );
};

export default WebSection;
