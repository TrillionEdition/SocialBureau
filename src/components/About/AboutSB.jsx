import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WhoWeAre = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="bg-white py-16 px-4 sm:px-6 md:py-32 lg:py-48 text-[#1d1d1f] relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#8D0F16]/5 blur-[150px] -z-10 rounded-full" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-32 items-stretch">

          {/* ── LEFT: Sticky Image (desktop only) ── */}
          <div className="hidden lg:block relative">
            <div className="sticky top-32">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <div className="relative group aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-[#f5f5f7] border border-gray-100 shadow-xl transition-all duration-700 hover:border-[#8D0F16]/50">
                  <img src="https://res.cloudinary.com/dtwcgfmar/image/upload/v1771840422/sham-alen_ied4s5.webp" alt="sham-allen" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#8D0F16]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r-4 border-b-4 border-[#8D0F16] rounded-br-3xl -z-10" />
              </motion.div>
            </div>
          </div>

          {/* ── RIGHT: Content ── */}
          <div className="flex flex-col space-y-10 lg:space-y-16">

            {/* Mobile-only image */}
            <div className="lg:hidden aspect-[4/5] overflow-hidden rounded-[2rem] bg-[#f5f5f7] border border-gray-100 shadow-xl">
              <img src="assets/home/sham-alen.JPG" alt="sham-allen" className="w-full h-full object-cover" />
            </div>

            {/* Block 1 — always visible on all screens */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <p className="text-[#8D0F16] font-bold text-[14px] sm:text-[16px] tracking-[0.2em] uppercase">
                API MARKETING AGENCY
              </p>
              <h2 className="text-[24px] sm:text-[32px] md:text-[48px] font-black tracking-[-0.03em] leading-[1.05] text-black">
                Social Bureau is a <span className="text-[#8D0F16]">results-driven</span> digital and API marketing agency
                focused on building credible, scalable, and future-ready brands.
              </h2>
              <p className="text-[16px] sm:text-[18px] md:text-[22px] text-gray-500 leading-[1.6] font-medium max-w-2xl">
                We work as a strategic growth partner for businesses, helping them
                increase visibility, strengthen brand authority, and achieve
                sustainable, data-backed growth across digital ecosystems.
              </p>
            </motion.div>

            {/* ── DESKTOP: Block 2 + 3 always shown ── */}
            <div className="hidden lg:flex flex-col space-y-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="p-10 rounded-[2.5rem] bg-[#f5f5f7] border border-gray-100 space-y-6 hover:border-[#8D0F16]/30 transition-all shadow-md"
              >
                <p className="text-[18px] md:text-[22px] text-gray-800 leading-[1.6]">
                  With over <span className="text-[#8D0F16] font-bold">2+ years</span> of hands-on online marketing experience, our
                  team brings deep expertise in <a href='https://www.socialbureau.in/api-marketing' target='_blank' title="Learn more about API Marketing on Wikipedia">API marketing</a>, <a href='https://en.wikipedia.org/wiki/Niche_marketing' target='_blank' title="Learn more about Niche Marketing on Wikipedia">niche marketing</a>,
                  content marketing, AdTech integration, and performance marketing.
                </p>
                <p className="text-[18px] md:text-[22px] text-gray-500 leading-[1.6] italic border-l-4 border-[#8D0F16] pl-6">
                  "We don't rely on one-size-fits-all tactics—instead, every strategy
                  is engineered around business objectives, audience intent, and
                  measurable outcomes."
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
                className="space-y-6 border-t border-gray-100 pt-12"
              >
                <p className="text-[15px] md:text-[18px] text-gray-600 leading-[1.6] font-medium">
                  Our strength lies in <span className="text-black font-bold">specialization</span>. Each marketing strategy is
                  led by an industry expert with proven experience in their domain,
                  ensuring precision execution and consistent performance.
                </p>
                <p className="text-[15px] md:text-[18px] text-gray-600 leading-[1.6] font-medium">
                  By combining advanced technology, strategic insights, and
                  user-centric thinking, we help brands stay competitive in
                  evolving search environments, including AI-driven discovery and
                  generative search platforms.
                </p>
              </motion.div>
            </div>

            {/* ── MOBILE: Block 2 + 3 behind Read More ── */}
            <div className="lg:hidden space-y-4">
              <AnimatePresence initial={false}>
                {expanded && (
                  <motion.div
                    key="mobile-extra"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="overflow-hidden space-y-6"
                  >
                    {/* Block 2 */}
                    <div className="p-6 rounded-[2rem] bg-[#f5f5f7] border border-gray-100 space-y-4 shadow-md">
                      <p className="text-[15px] text-gray-800 leading-[1.6]">
                        With over <span className="text-[#8D0F16] font-bold">2+ years</span> of hands-on online marketing experience, our
                        team brings deep expertise in API marketing, niche marketing,
                        content marketing, AdTech integration, and performance marketing.
                      </p>
                      <p className="text-[15px] text-gray-500 leading-[1.6] italic border-l-4 border-[#8D0F16] pl-4">
                        "We don't rely on one-size-fits-all tactics—instead, every strategy
                        is engineered around business objectives, audience intent, and
                        measurable outcomes."
                      </p>
                    </div>

                    {/* Block 3 */}
                    <div className="space-y-4 border-t border-gray-100 pt-5">
                      <p className="text-[14px] text-gray-600 leading-[1.6] font-medium">
                        Our strength lies in <span className="text-black font-bold">specialization</span>. Each marketing strategy is
                        led by an industry expert with proven experience in their domain,
                        ensuring precision execution and consistent performance.
                      </p>
                      <p className="text-[14px] text-gray-600 leading-[1.6] font-medium">
                        By combining advanced technology, strategic insights, and
                        user-centric thinking, we help brands stay competitive in
                        evolving search environments, including AI-driven discovery and
                        generative search platforms.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Toggle button — CENTERED on mobile */}
              <div className="flex justify-center pt-1">
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="flex items-center gap-2 text-[14px] font-black uppercase tracking-widest text-gray-400 hover:text-[#8D0F16] transition-colors"
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

            {/* CTA — CENTERED on mobile, left-aligned on desktop */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="pt-4 pb-8 flex lg:block justify-center"
            >
              <button className="bg-[#8D0F16] text-white px-10 py-4 rounded-full text-[14px] sm:text-[16px] md:text-[18px] font-bold hover:bg-[#6c0b11] transition-all hover:scale-105 shadow-[0_0_20px_rgba(141,15,22,0.3)] uppercase tracking-widest">
                Connect us
              </button>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;