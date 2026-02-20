// // // import React from "react";
// // // import { motion } from "framer-motion";
// // // import { useNavigate } from "react-router-dom";

// // // const ApiMarketing = () => {
// // //     const navigate = useNavigate();

// // //     return (
// // //         <section className="bg-white flex items-center py-12 md:py-24">
// // //             <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">

// // //                 {/* TEXT */}
// // //                 <motion.div
// // //                     initial={{ opacity: 0, y: 20 }}
// // //                     animate={{ opacity: 1, y: 0 }}
// // //                     transition={{ duration: 0.6 }}
// // //                 >
// // //                     <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-black mb-6 tracking-tighter leading-[1.1]">
// // //                         World’s First
// // //                         <br />
// // //                         <span className="bg-gradient-to-r from-black via-black/70 to-black/40 bg-clip-text text-transparent">
// // //                             API-Driven
// // //                         </span>
// // //                         <br />
// // //                         Marketing Agency
// // //                     </h1>

// // //                     <p className="text-base sm:text-lg md:text-xl text-black/60 max-w-md mb-8">
// // //                         Automate, Integrate, and Scale Your Marketing powered by real-time
// // //                         data, AI, and performance APIs.
// // //                     </p>

// // //                     <div className="flex flex-col sm:flex-row gap-4">
// // //                         <button
// // //                             onClick={() => navigate("/services")}
// // //                             className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-full font-bold text-xs uppercase tracking-[0.2em]"
// // //                         >
// // //                             Get Started
// // //                         </button>
// // //                     </div>
// // //                 </motion.div>

// // //                 {/* IMAGE */}
// // //                 {/* <motion.div
// // //                     className="flex justify-center md:justify-end"
// // //                     initial={{ opacity: 0, scale: 0.95 }}
// // //                     animate={{ opacity: 1, scale: 1 }}
// // //                     transition={{ duration: 0.6 }}
// // //                 >
// // //                     <img
// // //                         src="/assets/home/sham3.png"
// // //                         alt=""
// // //                         className="w-full max-w-md md:max-w-full object-contain rounded-2xl"
// // //                     /> */}
// // //                 {/* </motion.div> */}

// // //             </div>
// // //         </section >
// // //     );
// // // };

// // // export default ApiMarketing;

// // import React from "react";
// // import { motion } from "framer-motion";
// // import { useNavigate } from "react-router-dom";

// // const ApiMarketing = () => {
// //     const navigate = useNavigate();

// //     return (
// //         <section className="bg-[#FFFFFF] flex items-center min-h-[90vh] overflow-hidden">
// //             <div className="max-w-[1200px] mx-auto px-6 w-full text-center">

// //                 {/* HERO TEXT */}
// //                 <motion.div
// //                     initial={{ opacity: 0, y: 30 }}
// //                     whileInView={{ opacity: 1, y: 0 }}
// //                     viewport={{ once: true }}
// //                     transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
// //                 >
// //                     <h1 className="text-[48px] sm:text-[64px] md:text-[88px] font-semibold text-[#1d1d1f] mb-4 tracking-[-0.03em] leading-[1.05]">
// //                         World’s First
// //                         <br />
// //                         <span className="text-[#1d1d1f]/90">
// //                             API-Driven
// //                         </span>
// //                         <br />
// //                         Marketing Agency
// //                     </h1>

// //                     <p className="text-[19px] sm:text-[21px] md:text-[24px] text-[#86868b] max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
// //                         Automate, Integrate, and Scale Your Marketing powered by <br className="hidden md:block" /> real-time data, AI, and performance APIs.
// //                     </p>

// //                     {/* APPLE STYLE BUTTONS */}
// //                     <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
// //                         <button
// //                             onClick={() => navigate("/services")}
// //                             className="px-8 py-3 bg-[#e30000] hover:bg-[#ff0000] text-white rounded-full font-semibold text-[17px] transition-all duration-300"
// //                         >
// //                             Get Started
// //                         </button>

// //                         <button
// //                             onClick={() => navigate("/learn-more")}
// //                             className="text-[#0066cc] hover:underline text-[19px] font-medium flex items-center group"
// //                         >
// //                             Learn more
// //                             <span className="ml-1 transition-transform group-hover:translate-x-1">›</span>
// //                         </button>
// //                     </div>
// //                 </motion.div>

// //                 {/* PRODUCT IMAGE / MOCKUP AREA */}
// //                 <motion.div
// //                     className="mt-16 flex justify-center"
// //                     initial={{ opacity: 0, y: 40 }}
// //                     whileInView={{ opacity: 1, y: 0 }}
// //                     viewport={{ once: true }}
// //                     transition={{ duration: 1, delay: 0.2 }}
// //                 >
// //                     <img
// //                         src="/assets/home/sham3.png"
// //                         alt="API Dashboard"
// //                         className="w-full max-w-[900px] h-auto object-contain"
// //                     />
// //                 </motion.div>

// //             </div>
// //         </section>
// //     );
// // };

// // export default ApiMarketing;

// import React from "react";
// import { motion } from "framer-motion";

// const ApiMarketing = () => {
//     return (
//         /* BACKGROUND: Apple uses #f5f5f7 (Athens Gray) for sections to make product cards/text pop */
//         /* If your image is pure white, use #ffffff; if it has that soft grey look, use #f5f5f7 */
//         <section className="bg-[#f5f5f7] flex items-center min-h-screen py-20 px-6">
//             <div className="max-w-[1000px] mx-auto w-full text-center">

//                 {/* HEADLINE: Precise 80px, #1d1d1f (Shark Black), Semibold */}
//                 <motion.h1
//                     initial={{ opacity: 0, y: 20 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.8 }}
//                     className="text-[48px] sm:text-[64px] md:text-[80px] font-semibold text-[#1d1d1f] tracking-[-0.02em] leading-[1.05] mb-5"
//                 >
//                     World’s First <br />
//                     <span className="text-[#1d1d1f]">API-Driven</span> <br />
//                     Marketing Agency
//                 </motion.h1>

//                 {/* SUBHEAD: #86868b (Secondary Gray), 24px size */}
//                 <motion.p
//                     initial={{ opacity: 0, y: 20 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.8, delay: 0.1 }}
//                     className="text-[19px] md:text-[24px] text-[#86868b] max-w-[700px] mx-auto mb-10 leading-relaxed font-normal"
//                 >
//                     Automate, Integrate, and Scale Your Marketing powered by <br className="hidden md:block" /> real-time data, AI, and performance APIs.
//                 </motion.p>

//                 {/* BUTTONS: Apple Red #e30000 and Link Blue #0066cc */}
//                 <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.8, delay: 0.2 }}
//                     className="flex flex-col sm:flex-row items-center justify-center gap-6"
//                 >
//                     <button className="px-7 py-3 bg-[#e30000] hover:bg-[#ff0000] text-white rounded-full text-[17px] font-medium transition-all">
//                         Get Started
//                     </button>

//                     <button className="text-[#0066cc] text-[21px] font-normal hover:underline flex items-center group">
//                         Learn more
//                         <span className="ml-1 transition-transform group-hover:translate-x-1">›</span>
//                     </button>
//                 </motion.div>

//                 {/* IMAGE AREA: Centered and wide */}
//                 <motion.div
//                     initial={{ opacity: 0, y: 40 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 1, delay: 0.3 }}
//                     className="mt-16 w-full flex justify-center"
//                 >
//                     <img
//                         src="/assets/home/sham3.png"
//                         alt="API"
//                         className="w-full max-w-[850px] rounded-3xl"
//                     />
//                 </motion.div>
//             </div>
//         </section>
//     );
// };

// export default ApiMarketing;

import React from "react";
import { motion } from "framer-motion";

const ApiMarketing = () => {
    return (
        /* The background here is pure white to match your screenshot */
        <section className="bg-white flex flex-col items-center pt-24 pb-16 px-6">
            <div className="max-w-[980px] mx-auto w-full text-center flex flex-col items-center">

                {/* HEADLINE: Precise 80px, #1d1d1f, Semibold */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                    className="text-[48px] sm:text-[64px] md:text-[80px] font-semibold text-[#1d1d1f] tracking-[-0.02em] leading-[1.05] mb-4"
                >
                    World’s First <br />
                    <span className="text-[#1d1d1f]">API-Driven</span> <br />
                    Marketing Agency
                </motion.h1>

                {/* SUBHEAD: #86868b, 24px, Normal weight */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-[19px] md:text-[24px] text-[#86868b] max-w-[640px] mb-10 leading-[1.4] font-normal tracking-tight"
                >
                    Automate, Integrate, and Scale Your Marketing powered by real-time data, AI, and performance APIs.
                </motion.p>

                {/* BUTTONS: Apple Red #e30000 and Blue Link */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-16"
                >
                    <button className="px-[22px] py-[11px] bg-[#e30000] hover:bg-[#ff0000] text-white rounded-full text-[17px] font-medium transition-all">
                        Get Started
                    </button>

                    <button className="text-[#0066cc] text-[21px] font-normal hover:underline flex items-center group">
                        Learn more
                        <span className="ml-1 text-[24px] transition-transform group-hover:translate-x-1">›</span>
                    </button>
                </motion.div>

                {/* COMPACT IMAGE: Sized small to match the reference */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="w-full flex justify-center"
                >
                    <img
                        src="/assets/home/sham3.png"
                        alt="API Overview"
                        /* max-w-md (448px) ensures the image stays small like the reference */
                        className="w-full max-w-md h-auto object-contain drop-shadow-sm"
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default ApiMarketing;