// // // // import React from 'react';
// // // // import { motion } from 'framer-motion';

// // // // const AboutVision = () => {
// // // //     return (
// // // //         <div className="bg-white text-[#1d1d1f] font-sans selection:bg-blue-500">

// // // //             {/* SECTION 1: The Hook (Large Typography) */}
// // // //             <section className="min-h-[80vh] flex flex-col justify-center px-6 md:px-24 max-w-7xl mx-auto">
// // // //                 <motion.span
// // // //                     initial={{ opacity: 0, y: 20 }}
// // // //                     whileInView={{ opacity: 1, y: 0 }}
// // // //                     className="text-[#0066cc] font-semibold tracking-tight text-xl mb-4"
// // // //                 >
// // // //                     Our Vision
// // // //                 </motion.span>

// // // //                 <motion.h2
// // // //                     initial={{ opacity: 0 }}
// // // //                     whileInView={{ opacity: 1 }}
// // // //                     transition={{ duration: 1 }}
// // // //                     className="text-6xl md:text-[100px] font-bold tracking-tighter leading-[0.95] mb-20 text-black"
// // // //                 >
// // // //                     Redefining how brands <br />
// // // //                     <span className="text-[#86868b]">grow and compete.</span>
// // // //                 </motion.h2>

// // // //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
// // // //                     <p className="text-2xl md:text-3xl font-semibold leading-tight text-[#1d1d1f]">
// // // //                         Our vision is to redefine growth in an AI-driven digital ecosystem by delivering
// // // //                         <span className="text-[#0066cc]"> intelligent, performance-focused marketing solutions.</span>
// // // //                     </p>
// // // //                     <p className="text-xl md:text-2xl text-[#86868b] leading-relaxed">
// // // //                         We strive to lead the future of API-led and data-driven strategies that align
// // // //                         with evolving user intent and generative search engines.
// // // //                     </p>
// // // //                 </div>
// // // //             </section>

// // // //             {/* SECTION 2: The "Best in India" Statement (High Contrast) */}
// // // //             <section className="py-40 bg-[#f5f5f7]">
// // // //                 <div className="max-w-7xl mx-auto px-6 md:px-24">
// // // //                     <motion.div
// // // //                         initial={{ opacity: 0.2 }}
// // // //                         whileInView={{ opacity: 1 }}
// // // //                         transition={{ duration: 0.8 }}
// // // //                         className="border-l-2 border-[#0066cc] pl-10 md:pl-20"
// // // //                     >
// // // //                         <h3 className="text-4xl md:text-7xl font-bold tracking-tight mb-10 leading-tight text-black">
// // // //                             Our goal is to be recognized as the <br />
// // // //                             <span className="bg-clip-text text-transparent bg-gradient-to-r from-black via-[#424245] to-[#86868b]">
// // // //                                 best digital marketing agency in India.
// // // //                             </span>
// // // //                         </h3>
// // // //                         <p className="text-xl md:text-3xl text-[#86868b] max-w-4xl font-medium">
// // // //                             With a strong commitment to innovation, transparency, and ethical growth,
// // // //                             we focus on building future-ready brands that achieve long-term visibility.
// // // //                         </p>
// // // //                     </motion.div>
// // // //                 </div>
// // // //             </section>

// // // //             {/* SECTION 3: The "Future-Ready" Bento (Refined Grid) */}
// // // //             <section className="py-40 px-6 md:px-24 max-w-7xl mx-auto bg-white">
// // // //                 <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[600px]">

// // // //                     {/* Top Left: Tech Focus */}
// // // //                     <div className="md:col-span-7 bg-[#f5f5f7] rounded-[2.5rem] p-12 flex flex-col justify-between hover:bg-[#ebebed] transition-colors group">
// // // //                         <h4 className="text-3xl font-semibold tracking-tight text-black">Emerging Technologies</h4>
// // // //                         <p className="text-xl text-[#86868b] group-hover:text-[#424245] transition-colors">
// // // //                             Leading the way in API-led strategies and data-driven solutions for next-generation search engines.
// // // //                         </p>
// // // //                     </div>

// // // //                     {/* Top Right: Success Focus */}
// // // //                     <div className="md:col-span-5 bg-gradient-to-br from-[#0071e3] to-[#005bb7] rounded-[2.5rem] p-12 flex flex-col justify-end">
// // // //                         <h4 className="text-3xl font-bold tracking-tight text-white mb-2">Scalable Success</h4>
// // // //                         <p className="text-lg text-white/80">Credibility across global digital platforms.</p>
// // // //                     </div>

// // // //                     {/* Bottom Row: Ethics */}
// // // //                     <div className="md:col-span-12 bg-[#f5f5f7] rounded-[2.5rem] p-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
// // // //                         <div className="max-w-md">
// // // //                             <h4 className="text-3xl font-semibold tracking-tight mb-4 text-black">Ethical Growth</h4>
// // // //                             <p className="text-lg text-[#86868b]">
// // // //                                 A commitment to innovation and transparency ensures your brand’s success is built on a solid, trusted foundation.
// // // //                             </p>
// // // //                         </div>
// // // //                         <div className="text-6xl md:text-8xl font-black text-gray-200 select-none opacity-40">
// // // //                             VISION
// // // //                         </div>
// // // //                     </div>
// // // //                 </div>
// // // //             </section>

// // // //             {/* SECTION 4: Final Closing (Minimalist) */}
// // // //             <section className="py-40 flex items-center justify-center text-center px-6 bg-white">
// // // //                 <div className="max-w-3xl">
// // // //                     <p className="text-2xl md:text-4xl font-bold text-black mb-8">
// // // //                         Future-ready brands. <br />
// // // //                         Next-generation search.
// // // //                     </p>
// // // //                     <div className="h-20 w-px bg-gradient-to-b from-[#0066cc] to-transparent mx-auto" />
// // // //                 </div>
// // // //             </section>
// // // //         </div>
// // // //     );
// // // // };

// // // // export default AboutVision;

// // // import React from 'react';

// // // const AboutVision = () => {
// // //     return (
// // //         <div
// // //             style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif" }}
// // //             className="bg-white text-[#1d1d1f] overflow-x-hidden"
// // //         >
// // //             {/* HERO */}
// // //             <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 pt-24 pb-32">
// // //                 <p className="text-[17px] font-semibold text-[#0066cc] tracking-tight mb-5">Our Vision</p>
// // //                 <h1 className="text-[56px] sm:text-[72px] md:text-[96px] font-bold tracking-[-0.025em] leading-[1.0] text-black mb-8">
// // //                     Redefining how brands<br />
// // //                     <span className="text-[#86868b]">grow and compete.</span>
// // //                 </h1>
// // //                 <p className="text-[21px] md:text-[28px] font-semibold text-[#1d1d1f] max-w-3xl leading-[1.4]" style={{ letterSpacing: '-0.01em' }}>
// // //                     Intelligent, performance-focused marketing solutions built for{' '}
// // //                     <span className="text-[#0066cc]">an AI-driven digital ecosystem.</span>
// // //                 </p>
// // //             </section>

// // //             <div className="w-full border-t border-[#d2d2d7]" />

// // //             {/* BEST IN INDIA */}
// // //             <section className="py-40 px-6 bg-[#f5f5f7]">
// // //                 <div className="max-w-[980px] mx-auto">
// // //                     <p className="text-[17px] font-semibold text-[#0066cc] mb-5">Our Goal</p>
// // //                     <h2 className="text-[40px] md:text-[72px] font-bold tracking-[-0.025em] leading-[1.05] text-black mb-8">
// // //                         Recognized as the best digital<br className="hidden md:block" /> marketing agency in India.
// // //                     </h2>
// // //                     <p className="text-[21px] text-[#86868b] font-semibold max-w-2xl leading-[1.5]" style={{ letterSpacing: '-0.01em' }}>
// // //                         With a commitment to innovation, transparency, and ethical growth — we build future-ready brands that achieve long-term visibility.
// // //                     </p>
// // //                 </div>
// // //             </section>

// // //             <div className="w-full border-t border-[#d2d2d7]" />

// // //             {/* BENTO GRID */}
// // //             <section className="py-40 px-6 bg-white">
// // //                 <div className="max-w-[980px] mx-auto">
// // //                     <p className="text-[17px] font-semibold text-[#0066cc] mb-5">Pillars</p>
// // //                     <h2 className="text-[40px] md:text-[56px] font-bold tracking-[-0.025em] leading-[1.05] text-black mb-16">
// // //                         Future-ready by design.
// // //                     </h2>

// // //                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //                         {/* Card 1 */}
// // //                         <div className="bg-[#f5f5f7] rounded-[20px] p-10 flex flex-col justify-between min-h-[280px]">
// // //                             <h3 className="text-[28px] font-bold tracking-[-0.02em] text-black leading-tight">
// // //                                 Emerging Technologies
// // //                             </h3>
// // //                             <p className="text-[17px] text-[#86868b] leading-[1.6] mt-6">
// // //                                 Leading the way in API-led strategies and data-driven solutions for next-generation search engines and AI platforms.
// // //                             </p>
// // //                         </div>

// // //                         {/* Card 2 — blue */}
// // //                         <div className="bg-[#0071e3] rounded-[20px] p-10 flex flex-col justify-between min-h-[280px]">
// // //                             <h3 className="text-[28px] font-bold tracking-[-0.02em] text-white leading-tight">
// // //                                 Scalable Success
// // //                             </h3>
// // //                             <p className="text-[17px] text-white/80 leading-[1.6] mt-6">
// // //                                 Building credibility and compounding growth across global digital platforms.
// // //                             </p>
// // //                         </div>

// // //                         {/* Card 3 — full width */}
// // //                         <div className="md:col-span-2 bg-[#f5f5f7] rounded-[20px] p-10 flex flex-col md:flex-row md:items-end justify-between gap-8 min-h-[200px]">
// // //                             <div className="max-w-lg">
// // //                                 <h3 className="text-[28px] font-bold tracking-[-0.02em] text-black mb-4 leading-tight">Ethical Growth</h3>
// // //                                 <p className="text-[17px] text-[#86868b] leading-[1.6]">
// // //                                     Innovation and transparency ensure your brand's success is built on a solid, trusted foundation that lasts.
// // //                                 </p>
// // //                             </div>
// // //                             <span className="text-[80px] md:text-[100px] font-black text-[#d2d2d7] select-none leading-none">
// // //                                 VISION
// // //                             </span>
// // //                         </div>
// // //                     </div>
// // //                 </div>
// // //             </section>

// // //             <div className="w-full border-t border-[#d2d2d7]" />

// // //             {/* CLOSING */}
// // //             <section className="py-40 text-center px-6 bg-white">
// // //                 <p className="text-[32px] md:text-[48px] font-bold tracking-[-0.025em] text-black leading-[1.1]">
// // //                     Future-ready brands.<br />
// // //                     <span className="text-[#86868b]">Next-generation search.</span>
// // //                 </p>
// // //             </section>
// // //         </div>
// // //     );
// // // };

// // // export default AboutVision;

// // import React from 'react';
// // import { motion } from 'framer-motion';

// // const AboutVision = () => {
// //     return (
// //         <div className="bg-[#8D0F16] text-white overflow-x-hidden selection:bg-black selection:text-white">
// //             {/* HERO SECTION */}
// //             <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 sm:px-6 pt-16 pb-20 md:pt-24 md:pb-32">
// //                 <motion.p
// //                     initial={{ opacity: 0, y: 30 }}
// //                     whileInView={{ opacity: 1, y: 0 }}
// //                     transition={{ duration: 0.8, ease: "easeOut" }}
// //                     viewport={{ once: true }}
// //                     className="text-[14px] sm:text-[16px] font-bold text-white/80 tracking-[0.2em] uppercase mb-8 border-b-2 border-white/30 pb-2"
// //                 >
// //                     Our Vision
// //                 </motion.p>

// //                 <motion.h1
// //                     initial={{ opacity: 0, x: -50 }}
// //                     whileInView={{ opacity: 1, x: 0 }}
// //                     transition={{ duration: 1, ease: "easeOut" }}
// //                     viewport={{ once: true }}
// //                     className="text-[32px] sm:text-[48px] md:text-[72px] lg:text-[96px] font-black tracking-[-0.04em] leading-[0.9] text-white mb-8 md:mb-12"
// //                 >
// //                     Redefining how brands
// //                     <br />
// //                     <span className="text-black">grow and compete.</span>
// //                 </motion.h1>

// //                 <motion.div
// //                     initial={{ opacity: 0, y: 40 }}
// //                     whileInView={{ opacity: 1, y: 0 }}
// //                     transition={{ duration: 0.8, delay: 0.3 }}
// //                     viewport={{ once: true }}
// //                     className="max-w-4xl text-left md:text-center text-[16px] sm:text-[18px] md:text-[22px] font-medium text-white/90 leading-[1.6] space-y-6 sm:space-y-8"
// //                     style={{ letterSpacing: '-0.01em' }}
// //                 >
// //                     <p>
// //                         Our vision is to redefine how brands grow and compete in an
// //                         AI-driven digital ecosystem by delivering intelligent,
// //                         performance-focused marketing solutions.
// //                     </p>

// //                     <p>
// //                         We strive to lead the future of API-led and data-driven strategies
// //                         that align with evolving user intent, generative search engines,
// //                         and emerging technologies.
// //                     </p>

// //                     <p className="bg-white/10 p-5 sm:p-8 rounded-2xl sm:rounded-3xl backdrop-blur-md border border-white/20">
// //                         With a strong commitment to innovation, transparency, and ethical
// //                         growth, our goal is to be recognized as the best digital marketing
// //                         agency in India.
// //                     </p>

// //                     <p className="text-white/70 italic">
// //                         We focus on building future-ready brands that achieve long-term
// //                         visibility, credibility, and scalable success across
// //                         next-generation search and global digital platforms.
// //                     </p>
// //                 </motion.div>
// //             </section>

// //             <motion.section
// //                 initial={{ opacity: 0, scale: 0.9 }}
// //                 whileInView={{ opacity: 1, scale: 1 }}
// //                 transition={{ duration: 0.6 }}
// //                 viewport={{ once: true }}
// //                 className="pb-32 px-6 text-center"
// //             >
// //                 <button className="bg-white text-[#8D0F16] px-12 py-4 rounded-full text-[14px] sm:text-[16px] md:text-[18px] font-bold hover:bg-black hover:text-white transition-all transform hover:scale-110 shadow-2xl uppercase tracking-widest">
// //                     Our Team
// //                 </button>
// //             </motion.section>
// //         </div>
// //     );
// // };

// // export default AboutVision;

// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// const AboutVision = () => {
//     const [expanded, setExpanded] = useState(false);

//     return (
//         <div className="bg-[#8D0F16] text-white overflow-x-hidden selection:bg-black selection:text-white">
//             {/* HERO SECTION */}
//             <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 sm:px-6">
//                 <motion.p
//                     initial={{ opacity: 0, y: 30 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.8, ease: "easeOut" }}
//                     viewport={{ once: true }}
//                     className="text-[14px] sm:text-[16px] font-bold text-white/80 tracking-[0.2em] uppercase mb-8 border-b-2 border-white/30 pb-2"
//                 >
//                     Our Vision
//                 </motion.p>

//                 <motion.h1
//                     initial={{ opacity: 0, x: -50 }}
//                     whileInView={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 1, ease: "easeOut" }}
//                     viewport={{ once: true }}
//                     className="text-[32px] sm:text-[48px] md:text-[72px] lg:text-[96px] font-black tracking-[-0.04em] leading-[0.9] text-white mb-8 md:mb-12"
//                 >
//                     Redefining how brands
//                     <br />
//                     <span className="text-black">grow and compete.</span>
//                 </motion.h1>

//                 <motion.div
//                     initial={{ opacity: 0, y: 40 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.8, delay: 0.3 }}
//                     viewport={{ once: true }}
//                     className="max-w-4xl w-full text-left md:text-center text-[16px] sm:text-[18px] md:text-[22px] font-medium text-white/90 leading-[1.6]"
//                     style={{ letterSpacing: '-0.01em' }}
//                 >

//                     {/* ── DESKTOP: show all paragraphs normally ── */}
//                     <div className="hidden md:block space-y-8">
//                         <p>
//                             Our vision is to redefine how brands grow and compete in an
//                             AI-driven digital ecosystem by delivering intelligent,
//                             performance-focused marketing solutions.
//                         </p>
//                         <p>
//                             We strive to lead the future of API-led and data-driven strategies
//                             that align with evolving user intent, generative search engines,
//                             and emerging technologies.
//                         </p>
//                         <p className="bg-white/10 p-8 rounded-3xl backdrop-blur-md border border-white/20">
//                             With a strong commitment to innovation, transparency, and ethical
//                             growth, our goal is to be recognized as the best digital marketing
//                             agency in India.
//                         </p>
//                         <p className="text-white/70 italic">
//                             We focus on building future-ready brands that achieve long-term
//                             visibility, credibility, and scalable success across
//                             next-generation search and global digital platforms.
//                         </p>
//                     </div>

//                     {/* ── MOBILE: first paragraph always visible, rest behind Read More ── */}
//                     <div className="md:hidden space-y-5">
//                         {/* Always visible: first paragraph (≈3 lines) */}
//                         <p>
//                             Our vision is to redefine how brands grow and compete in an
//                             AI-driven digital ecosystem by delivering intelligent,
//                             performance-focused marketing solutions.
//                         </p>

//                         {/* Collapsed hidden content */}
//                         <AnimatePresence initial={false}>
//                             {expanded && (
//                                 <motion.div
//                                     key="extra"
//                                     initial={{ height: 0, opacity: 0 }}
//                                     animate={{ height: 'auto', opacity: 1 }}
//                                     exit={{ height: 0, opacity: 0 }}
//                                     transition={{ duration: 0.4, ease: 'easeInOut' }}
//                                     className="overflow-hidden space-y-5"
//                                 >
//                                     <p>
//                                         We strive to lead the future of API-led and data-driven strategies
//                                         that align with evolving user intent, generative search engines,
//                                         and emerging technologies.
//                                     </p>
//                                     <p className="bg-white/10 p-5 rounded-2xl backdrop-blur-md border border-white/20">
//                                         With a strong commitment to innovation, transparency, and ethical
//                                         growth, our goal is to be recognized as the best digital marketing
//                                         agency in India.
//                                     </p>
//                                     <p className="text-white/70 italic">
//                                         We focus on building future-ready brands that achieve long-term
//                                         visibility, credibility, and scalable success across
//                                         next-generation search and global digital platforms.
//                                     </p>
//                                 </motion.div>
//                             )}
//                         </AnimatePresence>

//                         {/* Read More / Read Less toggle */}
//                         <button
//                             onClick={() => setExpanded(!expanded)}
//                             className="flex items-center gap-2 text-[14px] font-black uppercase tracking-widest text-white/60 hover:text-white transition-colors mt-2"
//                         >
//                             <span>{expanded ? 'Read Less' : 'Read More'}</span>
//                             <motion.span
//                                 animate={{ rotate: expanded ? 180 : 0 }}
//                                 transition={{ duration: 0.3 }}
//                                 className="text-[18px] leading-none"
//                             >
//                                 ↓
//                             </motion.span>
//                         </button>
//                     </div>

//                 </motion.div>
//             </section>

//             <motion.section
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 whileInView={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.6 }}
//                 viewport={{ once: true }}
//                 className="pb-32 px-6 text-center"
//             >
//                 <button className="bg-white text-[#8D0F16] px-12 py-4 rounded-full text-[14px] sm:text-[16px] md:text-[18px] font-bold hover:bg-black hover:text-white transition-all transform hover:scale-110 shadow-2xl uppercase tracking-widest">
//                     Our Team
//                 </button>
//             </motion.section>
//         </div>
//     );
// };

// export default AboutVision;

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'lucide-react';

const AboutVision = () => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="bg-[#8D0F16] text-white overflow-x-hidden selection:bg-black selection:text-white">
            {/* HERO SECTION — reduced vertical padding, wider content */}
            <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 sm:px-6 py-12 md:py-14">

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="text-[14px] sm:text-[16px] font-bold text-white/80 tracking-[0.2em] uppercase mb-8 border-b-2 border-white/30 pb-2"
                >
                    Our Vision
                </motion.p>

                {/* Heading with top + bottom padding */}
                <motion.h1
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="text-[32px] sm:text-[48px] md:text-[72px] lg:text-[96px] font-black tracking-[-0.04em] leading-[0.9] text-white pt-4 pb-10 md:pt-6 md:pb-14"
                >
                    Redefining how brands
                    <br />
                    <span className="text-black">grow and compete.</span>
                </motion.h1>

                {/* Wider max-width: was max-w-4xl, now max-w-6xl */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="max-w-6xl w-full text-[16px] sm:text-[18px] md:text-[22px] font-medium text-white/90 leading-[1.6]"
                    style={{ letterSpacing: '-0.01em' }}
                >
                    {/* ── DESKTOP: show all paragraphs normally ── */}
                    <div className="hidden md:block space-y-8 text-center">
                        <p>
                            Our vision is to redefine how brands grow and compete in an
                            AI-driven digital ecosystem by delivering intelligent,
                            performance-focused marketing solutions. We strive to lead the future of API-led and data-driven strategies
                            that align with evolving user intent, generative search engines,
                            and emerging technologies.
                        </p>
                        <p className="bg-white/10 p-8 rounded-3xl backdrop-blur-md border border-white/20">
                            With a strong commitment to innovation, transparency, and ethical
                            growth, our goal is to be recognized as the best digital marketing
                            agency in India.
                        </p>
                        <p className="text-white/70 italic">
                            We focus on building future-ready brands that achieve long-term
                            visibility, credibility, and scalable success across
                            next-generation search and global digital platforms.
                        </p>
                    </div>

                    {/* ── MOBILE: first paragraph always visible, rest behind Read More ── */}
                    <div className="md:hidden space-y-5 text-left">
                        {/* Always visible */}
                        <p>
                            Our vision is to redefine how brands grow and compete in an
                            AI-driven digital ecosystem by delivering intelligent,
                            performance-focused marketing solutions.
                        </p>

                        {/* Collapsed hidden content */}
                        <AnimatePresence initial={false}>
                            {expanded && (
                                <motion.div
                                    key="extra"
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.45, ease: 'easeInOut' }}
                                    className="overflow-hidden space-y-5"
                                >
                                    <p>
                                        We strive to lead the future of API-led and data-driven strategies
                                        that align with evolving user intent, generative search engines,
                                        and emerging technologies.
                                    </p>
                                    <p className="bg-white/10 p-5 rounded-2xl backdrop-blur-md border border-white/20">
                                        With a strong commitment to innovation, transparency, and ethical
                                        growth, our goal is to be recognized as the best digital marketing
                                        agency in India.
                                    </p>
                                    <p className="text-white/70 italic">
                                        We focus on building future-ready brands that achieve long-term
                                        visibility, credibility, and scalable success across
                                        next-generation search and global digital platforms.
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Read More / Read Less toggle — CENTERED */}
                        <div className="flex justify-center pt-2 pb-4">
                            <button
                                onClick={() => setExpanded(!expanded)}
                                className="flex items-center gap-2 text-[14px] font-black uppercase tracking-widest text-white/60 hover:text-white transition-colors"
                            >
                                <span>{expanded ? 'Read Less' : 'Read More'}</span>
                                <motion.span
                                    animate={{ rotate: expanded ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="text-[18px] leading-none"
                                >
                                    ↓
                                </motion.span>
                            </button>
                        </div>
                    </div>

                </motion.div>
            </section>

            {/* CTA Button — centered with generous padding top + bottom */}
            <motion.section
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="pb-20 pt-4 px-6 text-center"
            >
                <Link href='/our-team'>
                    <button className="bg-white text-[#8D0F16] px-14 py-5 rounded-full text-[14px] sm:text-[16px] md:text-[18px] font-bold hover:bg-black hover:text-white transition-all transform hover:scale-110 shadow-2xl uppercase tracking-widest">
                        Our Team
                    </button>
                </Link>
            </motion.section>
        </div>
    );
};

export default AboutVision;