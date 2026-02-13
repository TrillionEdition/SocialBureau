// import React from "react";
// import { useNavigate } from "react-router-dom";

// const CareerSection = () => {
//     const navigate = useNavigate();

//     return (
//         <section className="relative w-full bg-neutral-50 overflow-hidden">
//             <div className="max-w-7xl mx-auto px-6 pt-24 pb-48 text-center">

//                 {/* EYEBROW */}
//                 <p className="text-xs font-semibold tracking-[0.3em] uppercase text-black mb-4">
//                     Careers
//                 </p>

//                 {/* TITLE */}
//                 <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-3">
//                     Build Your Future With Us
//                 </h1>

//                 {/* SUBTITLE */}
//                 <p className="text-sm sm:text-base text-black/60 max-w-xl mx-auto mb-6">
//                     Join a team that values clarity, craftsmanship, and impact.
//                     Work on meaningful products alongside people who care about doing things right.
//                 </p>

//                 {/* CTA */}
//                 <div className="flex justify-center gap-4">
//                     <button
//                         onClick={() => navigate("/careers")}
//                         className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-full"
//                     >
//                         View Open Roles
//                     </button>

//                     <button
//                         onClick={() => navigate("/careers")}
//                         className="px-6 py-2 border border-black/20 text-black text-sm font-medium rounded-full hover:bg-black hover:text-white transition"
//                     >
//                         Why Work With Us
//                     </button>
//                 </div>
//             </div>

//             {/* IMAGE */}
//             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full flex justify-center">
//                 <img
//                     src="/assets/home/career.jpg"
//                     alt="Careers at our company"
//                     className="w-full max-w-4xl object-contain"
//                 />
//             </div>
//         </section>
//     );
// };

// export default CareerSection;



import React from "react";
import { useNavigate } from "react-router-dom";

const CareerSection = () => {
    const navigate = useNavigate();

    return (
        <section className="relative w-full bg-neutral-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* LEFT SIDE - TEXT */}
                    <div className="text-left lg:text-left">
                        {/* EYEBROW */}
                        <p className="text-xs font-semibold tracking-[0.3em] uppercase text-black mb-4">
                            Careers
                        </p>

                        {/* TITLE */}
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6">
                            Build Your Future With Us
                        </h1>

                        {/* SUBTITLE */}
                        <p className="text-sm sm:text-base text-black/60 mb-8 leading-relaxed">
                            Join a team that values clarity, craftsmanship, and impact.
                            Work on meaningful products alongside people who care about doing things right.
                        </p>

                        {/* CTA */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={() => navigate("/careers")}
                                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-full transition-colors"
                            >
                                View Open Roles
                            </button>

                            <button
                                onClick={() => navigate("/careers")}
                                className="px-6 py-3 border border-black/20 text-black text-sm font-medium rounded-full hover:bg-black hover:text-white transition-colors"
                            >
                                Why Work With Us
                            </button>
                        </div>
                    </div>

                    {/* RIGHT SIDE - IMAGE */}
                    <div className="flex justify-center">
                        <img
                            src="/assets/home/career.jpg"
                            alt="Careers at our company"
                            className="w-full max-w-md lg:max-w-full h-auto object-cover rounded-lg shadow-lg"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CareerSection;