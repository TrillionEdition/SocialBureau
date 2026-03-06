import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Seo from '../components/Seo';
import SchemaMarkup from '../components/SchemaMarkup';
import { generateServiceSchema } from '../utils/schema';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import servicesData from '../data/services';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

// Interactive Background Component
const InteractiveBackground = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const wavesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const gridRef = useRef([]);
  const [isMobile, setIsMobile] = React.useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768); // adjust breakpoint
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return; // skip animation on mobile

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let resizeRafId = null;

    const initGrid = () => {
      gridRef.current = [];
      const spacing = 80;
      for (let x = 0; x < canvas.width + spacing; x += spacing) {
        for (let y = 0; y < canvas.height + spacing; y += spacing) {
          gridRef.current.push({
            originalX: x,
            originalY: y,
            x: x,
            y: y,
            offset: Math.random() * Math.PI * 2,
            amplitude: Math.random() * 20 + 10
          });
        }
      }
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initGrid();
    };

    resizeCanvas();
    
    const handleCanvasResize = () => {
      if (resizeRafId) return;
      resizeRafId = requestAnimationFrame(() => {
        resizeCanvas();
        resizeRafId = null;
      });
    };
    
    window.addEventListener('resize', handleCanvasResize);

    const initWaves = () => {
      wavesRef.current = [];
      for (let i = 0; i < 5; i++) {
        wavesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: 0,
          maxRadius: Math.random() * 200 + 100,
          speed: Math.random() * 2 + 1,
          opacity: Math.random() * 0.3 + 0.1,
          frequency: Math.random() * 0.02 + 0.01,
          phase: Math.random() * Math.PI * 2
        });
      }
    };

    initWaves();

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#000000');
      gradient.addColorStop(0.3, '#1a0000');
      gradient.addColorStop(0.7, '#0d0000');
      gradient.addColorStop(1, '#000000');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // ... rest of your canvas animation code ...

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleCanvasResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (resizeRafId) cancelAnimationFrame(resizeRafId);
    };
  }, [isMobile]);

  // Render static gradient on mobile
  if (isMobile) {
    return (
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, #000000 0%, #1a0000 30%, #0d0000 70%, #000000 100%)'
        }}
      />
    );
  }

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
};


const Service1 = () => {
  const { serviceTitle } = useParams();
  const decodedTitle = decodeURIComponent(serviceTitle);
  const data = servicesData[decodedTitle];

  if (!data) {
    return (
      <div className="relative min-h-screen">
        <InteractiveBackground />
        <div className="relative z-10 text-white min-h-screen flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
          <p className="text-lg text-gray-400">Please check the URL or select a valid service.</p>
        </div>
      </div>
    );
  }

  const { meta, hero, problems, deliveries, whyItWorks, cta } = data;
  const serviceTitles = Object.keys(servicesData);
  const currentIndex = serviceTitles.indexOf(decodedTitle);

  const prevService = currentIndex > 0 ? serviceTitles[currentIndex - 1] : null;
  const nextService = currentIndex < serviceTitles.length - 1 ? serviceTitles[currentIndex + 1] : null;

  return (
    <div className="relative min-h-screen">
      <InteractiveBackground />
      {/* <HomeMouse/> */}
      <div className="relative z-10">
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "100vh" }}
          transition={{ duration: 1.5 }}
          className="fixed left-1/2 top-0 w-[1px] bg-red-500/10"
        ></motion.div>
        <Seo title={meta.title} description={meta.description} image={meta?.image || '/assets/socialbureau.png'} url={`https://www.socialbureau.in/services/${encodeURIComponent(decodedTitle)}` } canonicalUrl={`https://www.socialbureau.in/services/${encodeURIComponent(decodedTitle)}`} />
        <SchemaMarkup data={generateServiceSchema({ title: data.title, meta }, [
          { name: 'Home', url: 'https://socialbureau.in' },
          { name: 'Services', url: '#' },
          { name: data.title, url: `https://socialbureau.in/services/${encodeURIComponent(decodedTitle)}` }
        ])} />

        {/* HERO SECTION — PREMIUM, INTERACTIVE, ANIMATED */}
        <header className="relative min-h-[70vh] md:min-h-[90vh] flex items-center overflow-hidden">

          {/* Background Gradient (AI Style) */}
          <motion.div
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-gradient-to-br from-[#0d0000] via-[#1a0000] to-black"
            style={{ filter: "blur(40px)" }}
          />

          {/* Floating Red Particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full bg-red-500/40"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.4, 0],
                  y: ["100%", "-20%"],
                  x: i % 2 === 0 ? ["0%", "20%"] : ["0%", "-20%"],
                }}
                transition={{
                  duration: 8 + i,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
                style={{ left: `${Math.random() * 100}%` }}
              ></motion.div>
            ))}
          </div>

          {/* Background Image / Illustration */}
          <motion.img
            src="https://i.pinimg.com/736x/9c/c9/8a/9cc98a51fece3a2d58be714649283bd8.jpg"
            alt="AI Illustration"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 0.25, y: 0 }}
            transition={{ duration: 1 }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] md:w-[60%] object-contain pointer-events-none"
          />

          {/* Frosted Glass Center Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-5xl mx-auto text-center px-8 py-10 rounded-3xl"
            style={{
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(22px)",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 0 35px rgba(255,0,0,0.25)",
            }}
          >
            <h1
              style={{ fontFamily: "Playfair Display, serif" }}
              className="text-4xl md:text-6xl font-black text-white leading-tight mb-4"
            >
              {hero.headline.split(hero.highlight).map((part, i, arr) => (
                <React.Fragment key={i}>
                  {part}
                  {i < arr.length - 1 && (
                    <span className="text-transparent bg-clip-text bg-gradient-to-b from-red-500 to-red-700 animate-pulse">
                      {hero.highlight}
                    </span>
                  )}
                </React.Fragment>
              ))}
            </h1>

            {/* Animated Separator */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 70 }}
              transition={{ duration: 0.6 }}
              className="h-1 bg-red-500 mx-auto rounded-full mb-6"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="max-w-3xl mx-auto text-base md:text-xl text-neutral-300"
            >
              {hero.subtext}
            </motion.p>
          </motion.div>
        </header>

        {/* Problems Section */}
        <section className="relative text-white py-20 px-6 backdrop-blur-sm bg-black/20">
          
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
            {problems.title} <span className="text-[#ff0000]">{problems.highlight}</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto text-center">
            {problems.items.map((problem, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05, rotate: -1 }}
                transition={{ duration: 0.3 }}
                className="border border-zinc-700/50 bg-black/40 backdrop-blur-lg rounded-xl p-6 hover:border-red-600/50 shadow-lg hover:shadow-red-500/20 transition-all"
              >
                <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="text-red-500 text-4xl mb-3">
                  {problem.icon}
                </motion.div>
                <h3 className="text-lg font-semibold">{problem.title}</h3>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Deliveries Section */}
        <section className="relative text-white py-20 px-6">
          <div className="absolute inset-0 -z-10 opacity-20">
            <motion.img
              src="https://i.pinimg.com/736x/80/db/ed/80dbed77700c602352393c71b285a9ae.jpg"
              animate={{ scale: [1, 1.1, 1], rotate: [0, 3, -3, 0] }}
              transition={{ duration: 10, repeat: Infinity }}
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
            {deliveries.title} <span className="text-[#ff0000]">{deliveries.highlight}</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {deliveries.items.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="group flex items-start gap-4 bg-black/30 backdrop-blur-lg border border-zinc-700/40 p-5 rounded-xl hover:border-red-600 shadow-lg hover:shadow-red-600/10 transition-all"
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="bg-red-600 p-2 rounded-md text-white"
                >
                  {item.icon}
                </motion.div>
                <div>
                  <h3 className="font-semibold text-lg group-hover:text-red-600 transition">{item.title}</h3>
                  <p className="text-gray-400 group-hover:text-gray-300">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Why It Works */}
        <section className="text-white py-16 px-6 text-center backdrop-blur-sm bg-black/20">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {whyItWorks.title} <span className="text-[#ff0000]">{whyItWorks.highlight}</span>
          </h2>
          <p className="text-xl lg:text-2xl font-light text-gray-300 max-w-2xl mx-auto">{whyItWorks.subtext}</p>
        </section>

        {/* CTA */}
        <div className="flex flex-col md:flex-row items-center justify-between py-20 md:py-10 rounded-lg px-10 md:px-12 lg:px-40 gap-4 mt-4 backdrop-blur-sm bg-black/30">
          <h2 className="text-xl md:text-2xl font-semibold text-white text-center md:text-left">{cta.headline}</h2>
          <button name='phone' onClick={() => window.open(cta.link, "_blank")} className="bg-[#ff0000] text-white px-4 py-2 rounded-md hover:bg-[#cc0000] hover:scale-105 transition-all duration-200 flex items-center">
            <img src="/assets/phone.webp" alt="phone" className="h-5 md:h-6 mr-2" />
            <span>{cta.button}</span>
          </button>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center py-10 px-6 max-w-6xl mx-auto text-white">
          {prevService ? (
            <Link
              to={`/services/${encodeURIComponent(prevService)}`}
              className="text-[#ff0000] border-3 border-[#ff0000]/30 hover:scale-110 hover:border-[#ff0000] transition-all duration-200 px-5 py-3 rounded-md text-sm md:text-base backdrop-blur-sm bg-black/20"
            >
              <FaArrowLeft className="text-sm text-[#ff0000]" />
            </Link>
          ) : <div />}

          {nextService ? (
            <Link
              to={`/services/${encodeURIComponent(nextService)}`}
              className="hover:scale-110 transition-all duration-200 px-5 py-3 rounded-md text-sm md:text-base text-[#ff0000] border-3 border-[#ff0000]/30 hover:border-[#ff0000] backdrop-blur-sm bg-black/20"
            >
              <FaArrowRight className="text-sm text-[#ff0000]" />
            </Link>
          ) : <div />}
        </div>

         
      </div>
    </div>
  );
};

export default Service1;