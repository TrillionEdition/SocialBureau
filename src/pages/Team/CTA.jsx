import { motion } from "framer-motion";

export const CTA = () => {
  return (
    <section className="py-8 px-6 mb-12">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto"
      >
        <div className="relative bg-[#120c24] rounded-[48px] p-12 lg:p-20 lg:py-24 overflow-hidden border border-white/5">
          {/* Background Text Overlay with subtle movement */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 0.03, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute top-1/2 right-[0%] -translate-y-1/2 pointer-events-none select-none z-0 hidden lg:block"
          >
            <h2 className="text-[10vw] font-black tracking-[-0.05em] text-white leading-none scale-y-[1.7] origin-center">
              BUREAU
            </h2>
          </motion.div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
            <div className="max-w-xl text-left">
              <motion.h2 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl lg:text-7xl font-black tracking-tighter uppercase leading-[0.9] mb-8 font-roboto scale-y-[1.4] text-white"
              >
                BUILD WITH <br /> THE <span className="text-[#ff3358]">BEST</span>
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-white/40 text-sm md:text-base font-medium leading-relaxed font-inter max-w-md"
              >
                We hire for skill, obsession, and fire. If you're ready to redefine what's possible in digital marketing — let's talk.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: 0.6,
                type: "spring",
                stiffness: 100 
              }}
            >
              <motion.button 
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 30px 60px rgba(255,51,88,0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-[#ff3358] to-[#ff5c7a] text-white px-14 py-6 rounded-3xl text-sm font-black tracking-[0.2em] transition-all shadow-[0_20px_50px_rgba(255,51,88,0.3)] whitespace-nowrap uppercase"
              >
                APPLY TO JOIN
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
