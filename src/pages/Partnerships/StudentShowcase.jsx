import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '@/utils/urls';
import { ArrowRight, Search, Users, GraduationCap, ExternalLink, Sparkles, Globe, Zap, MousePointer2 } from 'lucide-react';

const StudentShowcase = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const { scrollY } = useScroll();
  const heroScale = useTransform(scrollY, [0, 800], [1, 0.85]);
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const heroSkew = useTransform(scrollY, [0, 800], [0, 5]);
  const gridY = useTransform(scrollY, [0, 800], [200, 0]);
  const bgY = useTransform(scrollY, [0, 1000], [0, 400]);
  const headingLeftX = useTransform(scrollY, [600, 1500], [0, -200]);
  const headingRightX = useTransform(scrollY, [600, 1500], [0, 200]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const allRes = await fetch(`${BASE_URL}/partners?category=student&isFree=true`);
        const allData = await allRes.json();
        if (allData.success) {
          setStudents(allData.data);
        }
      } catch (err) {
        console.error("Failed to fetch students:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.subtitle?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const splitTextVariants = {
    hidden: { y: "100%", skewY: 10, filter: "blur(10px)", opacity: 0 },
    visible: (i) => ({
      y: 0,
      skewY: 0,
      filter: "blur(0px)",
      opacity: 1,
      transition: {
        duration: 1.5,
        delay: i * 0.1,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#050505] text-white overflow-hidden selection:bg-[#E8001A] selection:text-white">
      {/* --- EXTRAORDINARY UI ELEMENTS --- */}
      
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none z-[1] opacity-[0.03] mix-blend-overlay " />
      
      {/* Cinematic Background Image */}
      <motion.div 
        style={{ y: bgY }}
        className="absolute inset-0 z-0 opacity-20 grayscale scale-110 pointer-events-none"
      >
        <img 
          src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop" 
          className="w-full h-full object-cover"
          alt="Atmospheric Background"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
      </motion.div>

      {/* Dynamic Mesh Glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div 
          animate={{ 
            x: mousePosition.x * 0.1,
            y: mousePosition.y * 0.1,
          }}
          className="absolute top-1/4 left-1/4 w-[50%] h-[50%] bg-[#E8001A]/10 rounded-full blur-[180px] mix-blend-screen"
        />
      </div>

      {/* --- HERO SECTION --- */}
      <motion.section 
        style={{ scale: heroScale, opacity: heroOpacity, skewY: heroSkew }}
        className="relative min-h-[90vh] md:h-screen flex flex-col justify-center px-6 md:px-24 pt-20 pb-12 z-10"
      >
        <div className="flex items-center gap-4 mb-8">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 40 }}
            transition={{ duration: 1, ease: "circOut" }}
            className="h-[2px] bg-[#E8001A]"
          />
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-[9px] font-black uppercase tracking-[0.4em] text-white/50"
          >
            Digital Portfolio Gallery
          </motion.span>
        </div>
        
        <div className="relative mb-12">
          <h1 className="text-[clamp(2.5rem,10vw,12rem)] font-black leading-[0.85] tracking-[-0.04em]">
            <div className="overflow-hidden">
              <motion.span 
                custom={0}
                variants={splitTextVariants}
                initial="hidden"
                animate="visible"
                className="block"
              >
                STUDENT
              </motion.span>
            </div>
            <div className="overflow-hidden">
              <motion.span 
                custom={1}
                variants={splitTextVariants}
                initial="hidden"
                animate="visible"
                className="block italic outline-text-white"
              >
                SHOWCASE
              </motion.span>
            </div>
          </h1>
        </div>

        <div className="max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <p className="text-xl md:text-4xl font-light leading-snug text-white/80 italic mb-12">
              Discover <span className="text-white font-bold not-italic underline decoration-[#E8001A] decoration-2 underline-offset-8">exceptional portfolios</span> from our global community of future leaders.
            </p>
            
            <div className="flex items-center gap-10">
              <div className="flex flex-col">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#E8001A] mb-2">Total Pioneers</span>
                <span className="text-3xl font-black tabular-nums">{students.length.toString().padStart(2, '0')}</span>
              </div>
              <div className="w-[1px] h-10 bg-white/10" />
              <div className="flex flex-col">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30 mb-2">Status</span>
                <span className="text-3xl font-black italic text-white/60">Live</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Call to Action */}
        <motion.div 
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-12 right-12 flex items-center gap-6 group cursor-pointer"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <div className="text-right">
            <div className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-1 group-hover:text-white transition-colors">Begin Exploration</div>
            <div className="text-[8px] font-bold text-white/20 uppercase tracking-[0.4em]">Scroll to reveal</div>
          </div>
          <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#E8001A] group-hover:border-[#E8001A] transition-all duration-500">
            <ArrowRight className="rotate-90 group-hover:scale-110 transition-transform" size={20} />
          </div>
        </motion.div>
      </motion.section>

      {/* --- REFINED PORTFOLIO GRID --- */}
      <motion.section 
        style={{ y: gridY }}
        className="relative px-6 md:px-12 py-40 max-w-[1800px] mx-auto z-10 bg-white text-black rounded-[60px] md:rounded-[100px] shadow-[0_-50px_150px_rgba(0,0,0,0.5)]"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 md:mb-40 gap-12 md:gap-24 relative px-6 md:px-20">
          {/* Background Decorative Layer - Scaled for mobile */}
          <div className="absolute inset-0 pointer-events-none -z-10 opacity-5 overflow-hidden">
            <motion.div 
              style={{ x: useTransform(scrollY, [600, 2000], [0, -500]) }}
              className="text-[10rem] md:text-[20rem] font-black uppercase whitespace-nowrap outline-text-black"
            >
              GENESIS ARCHIVE GENESIS ARCHIVE
            </motion.div>
          </div>

          <div className="relative w-full md:w-3/4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-black text-white text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] mb-8 md:mb-12 shadow-2xl"
            >
              <div className="relative w-2 h-2">
                <motion.div
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-[#E8001A] rounded-full"
                />
                <div className="absolute inset-0 bg-[#E8001A] rounded-full" />
              </div>
              Live Repository
            </motion.div>

            <div className="space-y-2 md:space-y-6">
              <div className="overflow-hidden py-8 md:py-12 px-6 md:px-20 -mx-6 md:-mx-20 -my-8 md:-my-12 relative">
                {/* Stroke Layer - Responsive Size */}
                <motion.span 
                  style={{ x: useTransform(scrollY, [600, 2000], [50, -150]) }}
                  className="absolute left-0 top-1/2 -translate-y-1/2 text-7xl md:text-[15rem] font-black uppercase outline-text-black opacity-10 pointer-events-none whitespace-nowrap"
                >
                  THE ELITE
                </motion.span>
                <motion.h2 
                  style={{ 
                    x: headingLeftX,
                    rotateX: (mousePosition.y - window.innerHeight/2) * 0.005,
                    rotateY: (mousePosition.x - window.innerWidth/2) * 0.005,
                  }}
                  initial={{ y: "100%", skewY: 5 }}
                  whileInView={{ y: 0, skewY: 0 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="relative text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black tracking-[-0.04em] leading-[0.9] uppercase"
                >
                  THE ELITE
                </motion.h2>
              </div>
              <div className="overflow-hidden py-8 md:py-12 px-6 md:px-20 -mx-6 md:-mx-20 -my-8 md:-my-12 relative">
                {/* Stroke Layer - Responsive Size */}
                <motion.span 
                  style={{ x: useTransform(scrollY, [600, 2000], [-50, 150]) }}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-7xl md:text-[15rem] font-black uppercase outline-text-black opacity-10 pointer-events-none whitespace-nowrap"
                >
                  ARCHIVE
                </motion.span>
                <motion.h2 
                  style={{ 
                    x: headingRightX,
                    rotateX: (mousePosition.y - window.innerHeight/2) * -0.005,
                    rotateY: (mousePosition.x - window.innerWidth/2) * -0.005,
                  }}
                  initial={{ y: "100%", skewY: -5 }}
                  whileInView={{ y: 0, skewY: 0 }}
                  transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="relative text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black tracking-[-0.04em] leading-[0.9] uppercase italic text-[#E8001A]"
                >
                  ARCHIVE
                </motion.h2>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/4 space-y-8 md:space-y-12">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative"
            >
              <div className="w-8 h-[1px] bg-[#E8001A] mb-6 md:mb-8" />
              <p className="text-lg md:text-2xl text-black/40 font-light italic leading-relaxed">
                Each pioneer represented here has engineered a <span className="text-black font-bold not-italic">digital environment</span> that transcends traditional boundaries.
              </p>
            </motion.div>
 
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="relative group w-full"
            >
              <div className="absolute -inset-4 bg-[#E8001A]/5 rounded-[32px] md:rounded-[40px] blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
              <div className="relative bg-black/[0.03] border border-black/5 rounded-[32px] md:rounded-[40px] p-1.5 md:p-2 transition-all group-hover:bg-white group-hover:border-[#E8001A]/20 group-hover:shadow-[0_40px_100px_rgba(232,0,26,0.15)]">
                <Search className="absolute left-6 md:left-8 top-1/2 -translate-y-1/2 text-[#E8001A] group-focus-within:rotate-90 transition-transform duration-500" size={20} />
                <input 
                  type="text"
                  placeholder="FIND A PORTFOLIO..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-transparent py-6 md:py-8 pl-16 md:pl-20 pr-8 md:pr-10 text-[10px] md:text-[11px] font-black tracking-[0.3em] md:tracking-[0.4em] uppercase outline-none"
                />
              </div>
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-x-12 md:gap-y-24">
          {filteredStudents.map((student, index) => {
            return (
              <StudentCard 
                key={student._id} 
                student={student} 
                index={index}
                navigate={navigate}
              />
            );
          })}
        </div>

        {filteredStudents.length === 0 && !loading && (
          <div className="text-center py-40">
            <h2 className="text-4xl font-black text-black/10 uppercase tracking-tighter">No Pioneers Found</h2>
          </div>
        )}
      </motion.section>

      {/* --- FOOTER EXPERIENCE --- */}
      <section className="relative py-60 px-6 z-10 bg-black text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="inline-block mb-12"
          >
            <div className="w-24 h-24 bg-[#E8001A] rounded-full flex items-center justify-center mx-auto mb-10 shadow-[0_0_50px_rgba(232,0,26,0.4)]">
              <Zap size={40} className="text-white" fill="white" />
            </div>
          </motion.div>
          
          <h2 className="text-5xl md:text-9xl font-black tracking-[calc(-0.04em)] mb-16 leading-[0.85] uppercase italic">
            Ready to join <br/>
            <span className="text-[#E8001A]">the genesis?</span>
          </h2>
          
          <button 
            onClick={() => {
              const token = localStorage.getItem('partnerToken') || localStorage.getItem('token');
              const user = JSON.parse(localStorage.getItem('user') || '{}');
              
              if (token && (user.role === 'admin' || localStorage.getItem('partnerToken'))) {
                navigate('/partners/dashboard');
              } else {
                navigate('/partners/login?redirect=/partners/create-portfolio');
              }
            }}
            className="group relative px-10 md:px-16 py-6 md:py-8 bg-white text-black rounded-full font-black text-base md:text-lg uppercase tracking-[0.2em] overflow-hidden transition-all shadow-2xl"
          >
            {/* Primary Text */}
            <span className="relative z-10 block group-hover:opacity-0 group-hover:-translate-y-4 transition-all duration-500">
              CREATE YOUR LEGACY
            </span>

            {/* Hover State Background */}
            <div className="absolute inset-0 bg-[#E8001A] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />

            {/* Hover Text */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
              <span className="text-white flex items-center gap-3">
                START NOW <ArrowRight size={20} />
              </span>
            </div>
          </button>
        </div>
      </section>

      <style jsx>{`
        .outline-text-white {
          -webkit-text-stroke: 3px white;
          -webkit-text-fill-color: transparent;
        }
        @media (max-width: 768px) {
          .outline-text-white {
            -webkit-text-stroke: 1px white;
          }
        }
      `}</style>
    </div>
  );
};

// --- SUB-COMPONENT: StudentCard ---
const StudentCard = ({ student, index, navigate }) => {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ 
        opacity: 0, 
        y: 100, 
        rotateX: 15, 
        skewY: 5,
        scale: 0.9
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        rotateX: 0, 
        skewY: 0,
        scale: 1
      }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 1.2, 
        delay: (index % 3) * 0.15,
        ease: [0.16, 1, 0.3, 1]
      }}
      className="group cursor-pointer"
      style={{ perspective: '2000px' }}
      onClick={() => navigate(`/partnership/${student.param}`)}
    >
      <motion.div
        animate={{ 
          rotateX: rotate.x, 
          rotateY: rotate.y,
          scale: rotate.x !== 0 ? 1.02 : 1
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 25 }}
        className="relative"
      >
        {/* Ambient Glow */}
        <div className="absolute -inset-4 bg-[#E8001A]/10 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[40px]" />
        
        <div className="relative overflow-hidden rounded-[40px] bg-black border border-white/5 shadow-[0_40px_100px_rgba(0,0,0,0.2)] h-[450px] md:h-[600px]">
          {/* Lens Focus Image Effect */}
          <motion.img 
            initial={{ scale: 1.2, filter: 'blur(10px)' }}
            whileInView={{ scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src={student.image} 
            alt={student.name}
            className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
          />
          
          {/* Dynamic Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-700" />
          
          {/* Content Floating on Z-Axis */}
          <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
            <motion.div 
              style={{ translateZ: 50 }}
              className="translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-[0.16,1,0.3,1]"
            >
              <div className="flex items-center gap-4 mb-6">
                <motion.span 
                  initial={{ width: 0 }}
                  whileInView={{ width: 40 }}
                  className="h-[1px] bg-[#E8001A]" 
                />
                <span className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Pioneer Archive</span>
              </div>
              
              <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4 leading-none uppercase italic">
                {student.name}
              </h3>
              
              <p className="text-white/50 text-sm md:text-base font-light italic mb-10 line-clamp-3 leading-relaxed max-w-xs">
                {student.subtitle || "A digital environment engineered for peak performance and professional transcendence."}
              </p>
              
              <div className="flex items-center gap-6">
                <div className="px-10 py-5 bg-white text-black rounded-full font-black text-xs uppercase tracking-widest flex items-center gap-3 group/btn hover:bg-[#E8001A] hover:text-white transition-all shadow-xl">
                  ENTER PAGE <ArrowRight size={18} className="group-hover/btn:translate-x-2 transition-transform" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Corner Coordinate Detail */}
          <div className="absolute top-10 right-10 opacity-30 group-hover:opacity-100 transition-opacity">
            <div className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em] border-r-2 border-[#E8001A] pr-4">
              SEC_0{(index + 1)}
            </div>
          </div>
        </div>

        {/* External Label */}
        <div className="mt-10 flex items-end justify-between group-hover:opacity-0 transition-opacity duration-500 px-6">
          <div>
            <div className="text-[10px] font-black uppercase tracking-widest text-[#E8001A] mb-3 italic">Prototype / 001</div>
            <h4 className="text-3xl font-black tracking-tight uppercase italic">{student.name}</h4>
          </div>
          <div className="text-[11px] font-black text-black/10 uppercase tracking-[0.6em]">PNR-{(index + 1).toString().padStart(3, '0')}</div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default StudentShowcase;
