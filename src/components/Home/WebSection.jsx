// import React from "react";
// import { useNavigate } from "react-router-dom";

// const WebSection = () => {
//     const navigate = useNavigate();

//     return (
//         <section className="relative w-full bg-neutral-50 overflow-hidden">
//             <div className="max-w-7xl mx-auto px-6 pt-24 pb-48 text-center">

//                 {/* EYEBROW */}
//                 <p className="text-xs font-semibold tracking-[0.3em] uppercase text-black mb-4">
//                     Web Development
//                 </p>

//                 {/* TITLE */}
//                 <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-3">
//                     High-Performance Websites
//                 </h1>

//                 {/* SUBTITLE */}
//                 <p className="text-sm sm:text-base text-black/60 max-w-xl mx-auto mb-6">
//                     Engineered for speed, scalability, and seamless user experience —
//                     built with modern frameworks and clean architecture.
//                 </p>

//                 {/* CTA */}
//                 <div className="flex justify-center gap-4">
//                     <button
//                         onClick={() => navigate("/services")}
//                         className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-full"
//                     >
//                         Learn more
//                     </button>

//                     <button
//                         onClick={() => navigate("/contact")}
//                         className="px-6 py-2 border border-black/20 text-black text-sm font-medium rounded-full hover:bg-black hover:text-white transition"
//                     >
//                         Get a quote
//                     </button>
//                 </div>
//             </div>

//             {/* PRODUCT IMAGE */}
//             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full flex justify-center">
//                 <img
//                     src="/assets/home/web.jpg"
//                     alt="Web development preview"
//                     className="w-full max-w-4xl object-contain"
//                 />
//             </div>
//         </section>
//     );
// };

// export default WebSection;



import React from "react";
import { useNavigate } from "react-router-dom";

const WebSection = () => {
    const navigate = useNavigate();

    return (
        <section className="relative w-full bg-neutral-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* LEFT SIDE - IMAGE */}
                    <div className="flex justify-center order-2 lg:order-1">
                        <img
                            src="https://i.pinimg.com/1200x/92/66/ae/9266aed44e5dfe7171ecb35622a63e34.jpg"
                            alt="Web development preview"
                            className="w-full max-w-md lg:max-w-full h-auto object-cover rounded-lg shadow-lg"
                        />
                    </div>

                    {/* RIGHT SIDE - TEXT */}
                    <div className="text-left lg:text-left order-1 lg:order-2">
                        {/* EYEBROW */}
                        <p className="text-xs font-semibold tracking-[0.3em] uppercase text-black mb-4">
                            Web Development
                        </p>

                        {/* TITLE */}
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6">
                            High-Performance Websites
                        </h1>

                        {/* SUBTITLE */}
                        <p className="text-sm sm:text-base text-black/60 mb-8 leading-relaxed">
                            Engineered for speed, scalability, and seamless user experience —
                            built with modern frameworks and clean architecture.
                        </p>

                        {/* CTA */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={() => navigate("/services")}
                                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-full transition-colors"
                            >
                                Learn more
                            </button>

                            <button
                                onClick={() => navigate("/contact")}
                                className="px-6 py-3 border border-black/20 text-black text-sm font-medium rounded-full hover:bg-black hover:text-white transition-colors"
                            >
                                Get a quote
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WebSection;