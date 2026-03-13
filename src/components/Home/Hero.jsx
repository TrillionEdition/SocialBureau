import { motion } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";

const TextReveal = ({ text, className, delay = 0 }) => {
  const words = text.split(" ");
  return (
    <div className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <div key={i} className="overflow-hidden">
          <motion.span
            initial={{ y: "105%" }}
            animate={{ y: 0 }}
            transition={{
              duration: 1,
              delay: delay + i * 0.05,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="inline-block mr-[0.2em] pr-[0.1em] whitespace-nowrap"
          >
            {word}
          </motion.span>
        </div>
      ))}
    </div>
  );
};

const Hero = () => {
  const containerRef = useRef(null);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#FFFFFF] selection:bg-[#000000] selection:text-white overflow-hidden">
      <div className="noise" />

      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden bg-[#F8F8F8]">
        <div className="flex flex-col lg:flex-row h-full w-full">
          
          {/* Image Section */}
          <div className="hidden lg:block relative lg:h-full lg:w-[45%] lg:order-2 overflow-hidden">
            <motion.div 
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="h-full w-full"
            >
              <img 
                src="https://res.cloudinary.com/dtwcgfmar/image/upload/v1773048754/Adobe_Express_-_file_1_s8y5h5.webp" 
                alt="API Driven Marketing" 
                className="h-full w-full object-cover object-top lg:object-[center_20%]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/5 lg:hidden" />
            </motion.div>
          </div>

          {/* Text Section */}
          <div className="relative flex min-h-screen flex-col items-center justify-center px-4 pb-12 z-10 lg:h-full lg:w-[55%] lg:items-start lg:px-24 lg:py-0 lg:order-1">
            
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-2xl lg:max-w-none"
            >
              <div className="w-full">
                <h1 className="font-display text-[10vw] font-bold leading-[1.1] tracking-[-0.04em] text-[#0A0A0A] sm:text-[8vw] md:text-[7vw] lg:text-[5.5vw] text-center lg:text-left">
                  <TextReveal text="World's First" delay={0.2} className="flex flex-wrap justify-center lg:justify-start" />
                  <div className="flex flex-wrap items-center justify-center lg:justify-start">
                    <TextReveal text="API-" delay={0.4} />
                    <motion.span 
                      initial={{ opacity: 0, rotate: -5 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      transition={{ delay: 0.8, duration: 1 }}
                      className="text-neutral-600 italic font-serif text-[9vw] sm:text-[7vw] md:text-[6vw] lg:text-[5vw]"
                    >
                      Driven
                    </motion.span>
                  </div>
                  <TextReveal text="Marketing Agency" delay={0.7} className="flex flex-wrap justify-center lg:justify-start" />
                </h1>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="mt-8 lg:mt-10"
                >
                  <p className="max-w-xl text-base font-medium leading-relaxed text-neutral-600 md:text-lg lg:text-xl text-center lg:text-left mx-auto lg:mx-0">
                    Automate, Integrate, and Scale Your Marketing powered by real-time data, AI, and performance APIs.
                  </p>
                  
                  <div className="mt-10 lg:mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-8">
                    <Link to="/api-marketing-agency-in-kochi">
                      <motion.button 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.2, duration: 0.5 }}
                        whileHover={{ scale: 1.05, backgroundColor: "#111" }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative flex h-14 lg:h-16 items-center justify-center overflow-hidden rounded-full bg-[#000000] px-10 lg:px-14 text-[11px] font-bold tracking-[0.3em] text-white uppercase transition-all shadow-2xl shadow-black/20"
                      >
                        <span className="relative z-10">Get Started</span>
                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
