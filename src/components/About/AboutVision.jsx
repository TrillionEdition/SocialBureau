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

