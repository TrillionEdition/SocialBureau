// // // // // import React from "react";
// // // // // import { useNavigate } from "react-router-dom";

// // // // // const WebSection = () => {
// // // // //     const navigate = useNavigate();

// // // // //     return (
// // // // //         <section className="relative w-full h-[80vh] min-h-[600px] overflow-hidden bg-[#000000] font-['Inter',sans-serif]">

// // // // //             <video
// // // // //                 className="absolute inset-0 w-full h-full object-cover opacity-80"
// // // // //                 autoPlay
// // // // //                 loop
// // // // //                 muted
// // // // //                 playsInline
// // // // //             >
// // // // //                 <source
// // // // //                     src="https://res.cloudinary.com/dtwcgfmar/video/upload/v1771577680/From_KlickPin_CF_Pin_by_Craig_Gittins_on_Websites___Web_development_design_Web_ui_design_Web_graphic_design_qg3k8t.webm"
// // // // //                     type="video/webm"
// // // // //                 />
// // // // //             </video>
// // // // //             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent md:bg-gradient-to-r" />

// // // // //             <div className="relative h-full max-w-[1200px] mx-auto px-6 flex items-center">
// // // // //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">

// // // // //                     {/* Left Column usually stays clear for the "subject" of the image */}
// // // // //                     <div className="hidden md:block" />

// // // // //                     {/* Right Side - Refined Typography */}
// // // // //                     <div className="flex justify-center md:justify-end">
// // // // //                         <div className="text-white text-center md:text-left max-w-lg">
// // // // //                             <span className="block text-[12px] md:text-[14px] font-semibold tracking-wider uppercase mb-3 text-[#f5f5f7] opacity-80">
// // // // //                                 Web Development
// // // // //                             </span>

// // // // //                             <h1 className="text-[40px] md:text-[56px] font-semibold leading-[1.1] tracking-tight mb-5">
// // // // //                                 High-Performance <br className="hidden lg:block" /> Websites
// // // // //                             </h1>

// // // // //                             <p className="text-[19px] md:text-[21px] text-[#86868b] font-medium leading-snug mb-10 max-w-md">
// // // // //                                 Engineered for speed, scalability, and seamless user experience.
// // // // //                             </p>

// // // // //                             <div className="flex flex-col sm:flex-row gap-5 justify-center md:justify-start items-center">
// // // // //                                 <button
// // // // //                                     onClick={() => navigate("/services")}
// // // // //                                     className="px-7 py-3 bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-full font-medium transition-all"
// // // // //                                 >
// // // // //                                     Learn more
// // // // //                                 </button>

// // // // //                                 <button
// // // // //                                     onClick={() => navigate("/contact")}
// // // // //                                     className="group text-[#2997ff] hover:underline text-[19px] flex items-center gap-1"
// // // // //                                 >
// // // // //                                     Get a quote
// // // // //                                     <span className="text-sm transition-transform group-hover:translate-x-1">→</span>
// // // // //                                 </button>
// // // // //                             </div>
// // // // //                         </div>
// // // // //                     </div>
// // // // //                 </div>
// // // // //             </div>
// // // // // <p className="visually-hidden">
// // // // //     We design and develop high-performance websites optimized for speed, scalability,
// // // // //     and conversion using modern frameworks, clean code architecture, and performance-first
// // // // //     development practices. Our web development solutions focus on Core Web Vitals,
// // // // //     mobile-first design, SEO-friendly structure, and seamless user experience to ensure
// // // // //     fast load times, secure infrastructure, and long-term scalability across devices
// // // // //     and platforms.
// // // // // </p>
// // // // //         </section>
// // // // //     );
// // // // // };

// // // // // export default WebSection;


// // // // import React from "react";
// // // // import { useNavigate } from "react-router-dom";

// // // // const WebSection = () => {
// // // //     const navigate = useNavigate();

// // // //     return (
// // // //         <section className="w-full h-[80vh] min-h-[600px] font-['Inter',_sans-serif]">
// // // //             <div className="grid grid-cols-1 md:grid-cols-2 h-full">

// // // //                 {/* LEFT SIDE – VIDEO */}
// // // //                 <div className="relative w-full h-full overflow-hidden">
// // // //                     <video
// // // //                         className="w-full h-full object-cover"
// // // //                         autoPlay
// // // //                         loop
// // // //                         muted
// // // //                         playsInline
// // // //                     >
// // // //                         <source
// // // //                             src="https://res.cloudinary.com/dtwcgfmar/video/upload/v1771577680/From_KlickPin_CF_Pin_by_Craig_Gittins_on_Websites___Web_development_design_Web_ui_design_Web_graphic_design_qg3k8t.webm"
// // // //                             type="video/webm"
// // // //                         />
// // // //                     </video>

// // // //                     {/* Optional subtle overlay */}
// // // //                     <div className="absolute inset-0 bg-black/20" />
// // // //                 </div>

// // // //                 {/* RIGHT SIDE – TEXT WITH GREEN BG */}
// // // //                 <div className="flex items-center justify-center bg-[#6A0C12] px-8">
// // // //                     <div className="text-white max-w-lg">
// // // //                         <span className="block text-[13px] font-semibold tracking-wider uppercase mb-3 opacity-80">
// // // //                             Web Development
// // // //                         </span>

// // // //                         <h1 className="text-[40px] md:text-[56px] font-semibold leading-[1.1] mb-5">
// // // //                             High-Performance <br className="hidden lg:block" />
// // // //                             Websites
// // // //                         </h1>

// // // //                         <p className="text-[19px] md:text-[21px] text-white/80 font-medium mb-10">
// // // //                             Engineered for speed, scalability, and seamless user experience.
// // // //                         </p>

// // // //                         <div className="flex flex-col sm:flex-row gap-5">
// // // //                             <button
// // // //                                 onClick={() => navigate("/services")}
// // // //                                 className="px-7 py-3 bg-white text-[#0f3d2e] rounded-full font-medium hover:bg-gray-100 transition"
// // // //                             >
// // // //                                 Learn more
// // // //                             </button>

// // // //                             <button
// // // //                                 onClick={() => navigate("/contact")}
// // // //                                 className="group text-white text-[19px] flex items-center gap-1 hover:underline"
// // // //                             >
// // // //                                 Get a quote
// // // //                                 <span className="text-sm transition-transform group-hover:translate-x-1">
// // // //                                     →
// // // //                                 </span>
// // // //                             </button>
// // // //                         </div>
// // // //                     </div>
// // // //                 </div>

// // // //             </div>
// // // // <p className="visually-hidden">
// // // //     We design and develop high-performance websites optimized for speed, scalability,
// // // //     and conversion using modern frameworks, clean code architecture, and performance-first
// // // //     development practices. Our web development solutions focus on Core Web Vitals,
// // // //     mobile-first design, SEO-friendly structure, and seamless user experience to ensure
// // // //     fast load times, secure infrastructure, and long-term scalability across devices
// // // //     and platforms.
// // // // </p>
// // // //         </section>
// // // //     );
// // // // };

// // // // export default WebSection;

// // // import React from "react";
// // // import { useNavigate } from "react-router-dom";

// // // const WebSection = () => {
// // //     const navigate = useNavigate();

// // //     return (
// // //         <section className="w-full bg-[#950610] py-20 font-['Inter']">
// // //             <div className="max-w-[1200px] mx-auto px-6">
// // //                 <div className="flex flex-col md:flex-row items-center gap-10">

// // //                     {/* LEFT – SMALL SQUARE VIDEO */}
// // //                     <div className="relative w-[280px] aspect-square overflow-hidden rounded-xl shadow-md">
// // //                         <video
// // //                             className="w-full h-full object-cover"
// // //                             autoPlay
// // //                             loop
// // //                             muted
// // //                             playsInline
// // //                         >
// // //                             <source
// // //                                 src="https://res.cloudinary.com/dtwcgfmar/video/upload/v1771577680/From_KlickPin_CF_Pin_by_Craig_Gittins_on_Websites___Web_development_design_Web_ui_design_Web_graphic_design_qg3k8t.webm"
// // //                                 type="video/webm"
// // //                             />
// // //                         </video>
// // //                     </div>

// // //                     {/* RIGHT – TEXT */}
// // //                     <div className="text-white max-w-xl">
// // //                         <span className="block text-[12px] font-semibold tracking-wider uppercase mb-3 opacity-80">
// // //                             Web Development
// // //                         </span>

// // //                         <h2 className="text-[30px] md:text-[36px] font-semibold leading-tight mb-4">
// // //                             High-Performance Websites
// // //                         </h2>

// // //                         <p className="text-[17px] text-white/80 mb-6">
// // //                             We build fast, scalable websites with modern architecture,
// // //                             performance-first design, and seamless user experience.
// // //                         </p>

// // //                         <div className="flex gap-5">
// // //                             <button
// // //                                 onClick={() => navigate("/services")}
// // //                                 className="px-6 py-2.5 bg-white text-[#0f3d2e] rounded-full font-medium hover:bg-gray-100 transition"
// // //                             >
// // //                                 Learn more
// // //                             </button>

// // //                             <button
// // //                                 onClick={() => navigate("/contact")}
// // //                                 className="text-white font-medium hover:underline"
// // //                             >
// // //                                 Get a quote →
// // //                             </button>
// // //                         </div>
// // //                     </div>

// // //                 </div>
// // //             </div>
// // //             <p className="visually-hidden">
// // //                 We design and develop high-performance websites optimized for speed, scalability,
// // //                 and conversion using modern frameworks, clean code architecture, and performance-first
// // //                 development practices. Our web development solutions focus on Core Web Vitals,
// // //                 mobile-first design, SEO-friendly structure, and seamless user experience to ensure
// // //                 fast load times, secure infrastructure, and long-term scalability across devices
// // //                 and platforms.
// // //             </p>
// // //         </section>
// // //     );
// // // };

// // // export default WebSection;


// // import React from "react";
// // import { useNavigate } from "react-router-dom";

// // const WebSection = () => {
// //     const navigate = useNavigate();

// //     return (
// //         <section className="w-full bg-[#920F17] py-24 md:py-32 font-['-apple-system',_BlinkMacSystemFont,_'Segoe_UI',_Roboto,_'Helvetica_Neue',_Arial,_sans-serif]">
// //             <div className="max-w-[1080px] mx-auto px-6">
// //                 <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20">

// //                     {/* LEFT – VIDEO WITH GLASSMORPHISM EFFECT */}
// //                     <div className="relative w-[300px] md:w-[340px] aspect-square overflow-hidden rounded-[2.5rem] shadow-2xl bg-[#161617]">
// //                         <video
// //                             className="w-full h-full object-cover scale-105"
// //                             autoPlay
// //                             loop
// //                             muted
// //                             playsInline
// //                         >
// //                             <source
// //                                 src="https://res.cloudinary.com/dtwcgfmar/video/upload/v1771577680/From_KlickPin_CF_Pin_by_Craig_Gittins_on_Websites___Web_development_design_Web_ui_design_Web_graphic_design_qg3k8t.webm"
// //                                 type="video/webm"
// //                             />
// //                         </video>
// //                     </div>

// //                     {/* RIGHT – TEXT */}
// //                     <div className="text-center md:text-left text-[#f5f5f7] max-w-lg">
// //                         <span className="block text-[14px] font-semibold tracking-tight text-[#86868b] mb-2">
// //                             Web Development
// //                         </span>

// //                         <h2 className="text-[40px] md:text-[48px] font-semibold tracking-tight leading-[1.1] mb-5 text-white">
// //                             High-Performance <br /> Websites.
// //                         </h2>

// //                         <p className="text-[19px] md:text-[21px] text-[#86868b] leading-relaxed mb-8 font-medium">
// //                             We build fast, scalable websites with modern architecture
// //                             and performance-first design.
// //                         </p>

// //                         <div className="flex flex-col sm:flex-row items-center gap-6 justify-center md:justify-start">
// //                             <button
// //                                 onClick={() => navigate("/services")}
// //                                 className="px-7 py-3 bg-[#0071e3] text-white rounded-full font-medium hover:bg-[#0077ed] transition-all duration-300 ease-in-out text-[17px]"
// //                             >
// //                                 Learn more
// //                             </button>

// //                             <button
// //                                 onClick={() => navigate("/contact")}
// //                                 className="text-[#0066cc] text-[17px] font-medium flex items-center group hover:underline"
// //                             >
// //                                 Get a quote
// //                                 <span className="ml-1 transition-transform group-hover:translate-x-1">
// //                                     &gt;
// //                                 </span>
// //                             </button>
// //                         </div>
// //                     </div>

// //                 </div>
// //             </div>

// //             {/* SEO Content hidden from view but accessible to screen readers */}
// //             <p className="sr-only">
// //                 We design and develop high-performance websites optimized for speed, scalability,
// //                 and conversion using modern frameworks. Our web development solutions focus on
// //                 Core Web Vitals and mobile-first design.
// //             </p>
// //         </section>
// //     );
// // };

// // export default WebSection;


// import React from "react";
// import { useNavigate } from "react-router-dom";

// const WebSection = () => {
//     const navigate = useNavigate();

//     return (
//         <section className="w-full bg-[#920F17] py-24 md:py-40 font-['-apple-system',_BlinkMacSystemFont,_'Segoe_UI',_Roboto,_'Helvetica_Neue',_Arial,_sans-serif]">
//             {/* Increased max-width and padding to match the image's expansive feel */}
//             <div className="max-w-[1250px] mx-auto px-8 md:px-16">

//                 {/* justify-between creates that large gap between the video/image and the text */}
//                 <div className="flex flex-col md:flex-row items-center justify-between gap-16">

//                     {/* LEFT – VIDEO / VISUAL ELEMENT */}
//                     {/* Increased width to md:w-[45%] to match image proportions */}
//                     <div className="relative w-full md:w-[45%] aspect-square md:aspect-video lg:aspect-square overflow-hidden rounded-[2rem] shadow-2xl">
//                         <video
//                             className="w-full h-full object-cover"
//                             autoPlay
//                             loop
//                             muted
//                             playsInline
//                         >
//                             <source
//                                 src="https://res.cloudinary.com/dtwcgfmar/video/upload/v1771577680/From_KlickPin_CF_Pin_by_Craig_Gittins_on_Websites___Web_development_design_Web_ui_design_Web_graphic_design_qg3k8t.webm"
//                                 type="video/webm"
//                             />
//                         </video>
//                     </div>

//                     {/* RIGHT – TEXT */}
//                     {/* text-right on desktop to match the image layout */}
//                     <div className="text-center md:text-right text-white max-w-xl">
//                         <span className="block text-[13px] font-bold tracking-[0.2em] uppercase mb-4 opacity-90">
//                             Web Development
//                         </span>

//                         <h2 className="text-[44px] md:text-[64px] font-bold tracking-tight leading-[1.1] mb-6">
//                             High-Performance <br /> Websites
//                         </h2>

//                         <p className="text-[18px] md:text-[20px] text-white/90 leading-relaxed mb-10 font-light max-w-md md:ml-auto">
//                             Engineered for speed, scalability, and seamless user experience —
//                             built with modern frameworks and clean architecture.
//                         </p>

//                         {/* Button colors updated to match the image: Solid White and Ghost Red */}
//                         <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-end">
//                             <button
//                                 onClick={() => navigate("/services")}
//                                 className="px-8 py-3 bg-white text-[#920F17] rounded-full font-medium hover:bg-gray-100 transition-all text-[16px] min-w-[160px]"
//                             >
//                                 Learn more
//                             </button>

//                             <button
//                                 onClick={() => navigate("/contact")}
//                                 className="px-8 py-3 border border-white/40 bg-white/5 text-white rounded-full font-medium hover:bg-white/10 transition-all text-[16px] min-w-[160px]"
//                             >
//                                 Get a quote
//                             </button>
//                         </div>
//                     </div>

//                 </div>
//             </div>

//             <p className="sr-only">
//                 We design and develop high-performance websites optimized for speed, scalability,
//                 and conversion.
//             </p>
//         </section>
//     );
// };

// export default WebSection;
import React from "react";
import { useNavigate } from "react-router-dom";

const WebSection = () => {
    const navigate = useNavigate();

    return (
        /* Reduced padding from py-40 to py-16/py-24 to match standard Apple section heights */
        <section className="w-full bg-[#920F17] py-16 md:py-24 font-['-apple-system',_BlinkMacSystemFont,_'Segoe_UI',_Roboto,_'Helvetica_Neue',_Arial,_sans-serif] overflow-hidden">
            <div className="max-w-[1250px] mx-auto px-6 md:px-16">

                <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16">

                    {/* LEFT – VIDEO / VISUAL ELEMENT */}
                    <div className="relative w-full md:w-[48%] aspect-[4/3] md:aspect-square overflow-hidden rounded-[1.5rem] md:rounded-[2rem] shadow-2xl">
                        <video
                            className="w-full h-full object-cover"
                            autoPlay
                            loop
                            muted
                            playsInline
                        >
                            <source
                                src="https://res.cloudinary.com/dtwcgfmar/video/upload/v1771577680/From_KlickPin_CF_Pin_by_Craig_Gittins_on_Websites___Web_development_design_Web_ui_design_Web_graphic_design_qg3k8t.webm"
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
                                onClick={() => navigate("/web-development")}
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