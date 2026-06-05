import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { TEAM_MEMBERS } from "./constants";

export const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [members, setMembers] = useState(TEAM_MEMBERS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/team-v2`);
        const data = await response.json();

        if (data.success && data.data.length > 0) {
          // Keep the established order but allow new members at the end
          const apiMembers = data.data;

          // Define the preferred order by email
          const order = [
            "ceo@socialbureau.in",
            "director@socialbureau.in",
            "admin@socialbureau.in",
            "web@socialbureau.in",
            "webjr.socialbureau@gmail.com",
            "asst.hr.socialbureau@gmail.com",
            "webasst.socialbureau@outlook.com",
            "finance@socialbureau.in",
            "pmo.socialbureau@gmail.com",
            "ui.socialbureau@gmail.com"
          ];

          const ordered = [];
          order.forEach(email => {
            const found = apiMembers.find(m => m.email === email || (m.user && m.user.email === email));
            if (found) ordered.push(found);
          });

          // 2. Add any new members who aren't in the explicit order list
          const others = apiMembers.filter(m => !ordered.find(om => String(om._id) === String(m._id)));

          setMembers([...ordered, ...others]);
        }
      } catch (error) {
        console.error("Hero fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const featuredMembers = members;

  useEffect(() => {
    if (featuredMembers.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredMembers.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [currentIndex, featuredMembers.length]);

  if (loading && members.length === 0) {
    return (
      <div className="h-screen bg-black flex items-center justify-center">
        <Loader2 className="animate-spin text-brand-pink" size={40} />
      </div>
    );
  }

  const current = featuredMembers[currentIndex];
  if (!current) return null;

  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <section className="relative h-screen flex flex-col justify-end overflow-hidden bg-black">
      {/* Background Image Layer */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id || current._id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />

          <img
            src={current.image}
            alt={current.name}
            className="w-full h-full object-cover object-center lg:object-[60%_center] opacity-`120`"
          />

          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 w-[50vw] h-[50vw] opacity-20 blur-[150px] rounded-full pointer-events-none"
            style={{ backgroundColor: current.bgColor || '#ff3358' }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Main Content Overlay */}
      <div className="relative z-20 px-6 pb-20 pt-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id || current._id}
            initial="initial"
            animate="animate"
            exit="exit"
            className="max-w-lg"
          >
            <motion.div variants={textVariants} transition={{ delay: 0.1 }} className="flex items-center gap-2 mb-10">
              <div className="h-[1px] w-8 bg-white/20" />
              <span className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase">
                {Array.isArray(current.category) ? current.category.join(' . ') : (current.category || 'TEAM')} . {current.role}
              </span>
            </motion.div>

            <div className="flex items-end gap-3 mb-2">
              <motion.h1
                variants={textVariants}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter uppercase leading-none text-white font-roboto scale-y-[1.4] origin-bottom"
              >
                {current.name.split(' ')[0]}
              </motion.h1>
              {((current.user?.isClickUpVerified ||
                current.email === "ceo@socialbureau.in" ||
                current.user?.email === "ceo@socialbureau.in" ||
                current.email === "web@socialbureau.in" ||
                current.user?.email === "web@socialbureau.in" ||
                current.email === "admin@socialbureau.in" ||
                current.user?.email === "admin@socialbureau.in" ||
                current.slug === "shamsk" ||
                current.slug === "elizebath" ||
                current.slug === "hajira") &&
                current.email !== "webjr.socialbureau@gmail.com" &&
                current.user?.email !== "webjr.socialbureau@gmail.com" &&
                current.email !== "pmo.socialbureau@gmail.com" &&
                current.user?.email !== "pmo.socialbureau@gmail.com" &&
                current.slug !== "reshma-vijayan" &&
                current.slug !== "athira-rajesh"
              ) && (
                <motion.div
                  variants={textVariants}
                  transition={{ delay: 0.2 }}
                  className="mb-1.5 md:mb-3"
                >
                  <ClickUpVerifiedBadge />
                </motion.div>
              )}
            </div>

            <motion.div variants={textVariants} transition={{ delay: 0.25 }} className="mb-6">
              <span className="text-sm lg:text-base font-medium text-white/40 block mb-2">{current.role}</span>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center text-[12px] font-bold gap-2">
                  <span
                    className="bg-clip-text text-transparent"
                    style={{ backgroundImage: 'linear-gradient(to right, #E600FF 0%, #A335AF 29%)' }}
                  >
                    98%
                  </span>
                  <span className="text-white/60">Match</span>
                </div>
                {/* <span className="text-[12px] font-medium text-white/20 uppercase tracking-wider">Since 2019</span> */}
                {current.tags && current.tags[0] && (
                  <span className="px-3 py-0.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-white/40">
                    {current.tags[0]}
                  </span>
                )}
              </div>
            </motion.div>

            <motion.p variants={textVariants} transition={{ delay: 0.3 }} className="text-xs md:text-sm lg:text-base text-white/50 mb-8 leading-relaxed font-inter max-w-2xl">
              {current.description || (
                current.id === 'sham-sk' || current.email === 'ceo@socialbureau.in'
                  ? "Architect of the Attract-Pull-Influence framework powering 18+ global brands. Transforming API Marketing into a powerhouse of growth."
                  : current.id === 'hajira' || current.email === 'admin@socialbureau.in'
                    ? "Spearheading administrative excellence and strategic marketing initiatives to drive SocialBureau's global footprint."
                    : current.id === 'elizebath' || current.email === 'web@socialbureau.in'
                      ? "Experienced in driving projects from concept to execution with precision and creativity."
                      : current.id === 'reshma' || current.email === 'webjr.socialbureau@gmail.com'
                        ? "Crafting high-performance web experiences with modern design, seamless functionality, and user-focused innovation."
                        : current.id === 'hasna' || current.email === 'webasst.socialbureau@outlook.com'
                          ? "Assistant developer focused on building scalable, efficient, and user-centric web solutions."
                          : current.id === 'rachel' || current.email === 'asst.hr.socialbureau@gmail.com'
                            ? "Turning talent into impact by orchestrating talent acquisition and cultural excellence to build the world-class team behind SocialBureau."
                            : current.id === 'keerthana' || current.email === 'finance@socialbureau.in'
                              ? "Managing financial integrity and strategic accounting to ensure the long-term fiscal health of our global operations."
                              : current.id === 'athira' || current.email === 'pmo.socialbureau@gmail.com'
                                ? "Driving growth through performance marketing, paid ads, and lead generation. Focused on ROI, conversions, and scalable brand growth."
                                : current.id === 'emil' || current.email === 'ui.socialbureau@gmail.com'
                                  ? "Designing intuitive digital interfaces and user journeys that bridge the gap between technology and human experience."
                                  : `Professional leader at SocialBureau, specializing in ${current.role} and driving innovation through strategic excellence.`
              )}
            </motion.p>

            <motion.div variants={textVariants} transition={{ delay: 0.4 }} className="flex flex-wrap gap-3">
              {current.hideProfileLink ? (
                <>
                  <button className="flex items-center gap-2 bg-white/10 text-white px-6 py-3 rounded-full text-[11px] font-black tracking-widest transition-all" disabled>
                    <Play className="w-3 h-3" />
                    PROFILE HIDDEN
                  </button>
                  <button className="bg-white/10 backdrop-blur-md border border-white/10 text-white/40 px-6 py-3 rounded-full text-[11px] font-black tracking-widest cursor-not-allowed" disabled>
                    MORE INFO
                  </button>
                </>
              ) : (
                <>
                  <Link to={`/team/${(current.id === 'sham-sk' || current.slug === 'sham-sk' || current.email === 'ceo@socialbureau.in') ? 'shamsk' : (current.slug || current.id)}`} className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full text-[11px] font-black tracking-widest hover:scale-105 active:scale-95 transition-all">
                    <Play className="w-3 h-3 fill-current" />
                    VIEW FULL PROFILE
                  </Link>
                  <Link
                    to={`/team/${(current.id === 'sham-sk' || current.slug === 'sham-sk' || current.email === 'ceo@socialbureau.in') ? 'shamsk' : (current.slug || current.id)}`}
                    state={{ openChat: true }}
                    className="bg-white/10 backdrop-blur-md border border-white/10 text-white px-6 py-3 rounded-full text-[11px] font-black tracking-widest hover:bg-white/20 transition-all no-underline flex items-center justify-center"
                  >
                    MORE INFO
                  </Link>
                </>
              )}
            </motion.div>

            <div className="flex flex-wrap gap-2 mt-10">
              {current.tags && current.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-white/5 border border-white/5 rounded-full text-[9px] font-bold tracking-widest text-white/20 hover:text-white hover:border-white transition-all cursor-default">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ClickUp Verified Power User Rosette Badge - Bottom Right */}
      {((current.user?.isClickUpVerified ||
        current.email === "ceo@socialbureau.in" ||
        current.user?.email === "ceo@socialbureau.in" ||
        current.email === "web@socialbureau.in" ||
        current.user?.email === "web@socialbureau.in" ||
        current.email === "admin@socialbureau.in" ||
        current.user?.email === "admin@socialbureau.in" ||
        current.slug === "shamsk" ||
        current.slug === "elizebath" ||
        current.slug === "hajira") &&
        current.email !== "webjr.socialbureau@gmail.com" &&
        current.user?.email !== "webjr.socialbureau@gmail.com" &&
        current.email !== "pmo.socialbureau@gmail.com" &&
        current.user?.email !== "pmo.socialbureau@gmail.com" &&
        current.slug !== "reshma-vijayan" &&
        current.slug !== "athira-rajesh"
      ) && (
        <div className="absolute top-28 bottom-auto right-4 md:top-auto md:bottom-32 md:right-12 z-20">
          <ClickUpPowerUserRosette />
        </div>
      )}

      {/* Navigation Controls */}
      <div className="absolute bottom-12 right-12 flex items-center gap-4 z-20">
        <button
          onClick={() => setCurrentIndex((prev) => (prev - 1 + featuredMembers.length) % featuredMembers.length)}
          className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all active:scale-90"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex gap-2">
          {featuredMembers.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${currentIndex === idx ? "w-8" : "w-2 bg-white/20"}`}
              style={currentIndex === idx ? { backgroundImage: 'linear-gradient(to right, #E600FF 0%, #A335AF 29%)' } : {}}
            />
          ))}
        </div>
        <button
          onClick={() => setCurrentIndex((prev) => (prev + 1) % featuredMembers.length)}
          className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all active:scale-90"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
};

function ClickUpVerifiedBadge({ className = "" }) {
  return (
    <div className={`inline-block relative ${className}`} style={{ zIndex: 50 }}>
      {/* Verified Badge Icon (ClickUp Blue Scalloped Verified Badge) */}
      <div className="cursor-pointer hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center">
        <svg viewBox="0 0 24 24" className="w-7 h-7 text-[#3b82f6] fill-current filter drop-shadow-[0_0_12px_rgba(59,130,246,0.4)]">
          <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.99-3.818-3.99-.485 0-.946.1-1.362.277C14.773 2.52 13.46 1.7 12 1.7s-2.773.82-3.41 2.087C8.174 3.61 7.713 3.51 7.228 3.51 5.12 3.51 3.41 5.29 3.41 7.5c0 .495.084.965.238 1.4-1.273.65-2.148 2.02-2.148 3.6 0 1.58.875 2.95 2.148 3.6-.154.435-.238.905-.238 1.4 0 2.21 1.71 3.99 3.818 3.99.485 0 .946-.1 1.362-.277.637 1.267 1.95 2.087 3.39 2.087s2.773-.82 3.41-2.087c.416.177.877.277 1.362.277 2.108 0 3.818-1.78 3.818-3.99 0-.495-.084-.965-.238-1.4 1.273-.65 2.148-2.02 2.148-3.6z" />
          <path d="M9.7 16.22l-4.55-4.55 1.42-1.41 3.13 3.12 7.6-7.59 1.42 1.42-9.02 9.01z" fill="white" />
        </svg>
      </div>
    </div>
  );
}

function ClickUpPowerUserRosette() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.08, rotate: 5 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className="flex flex-col items-center select-none cursor-pointer group"
    >
      <div className="relative w-18 h-18 md:w-28 md:h-28 flex items-center justify-center mb-1 md:mb-2">
        {/* Ambient Purple Glow */}
        <div className="absolute inset-2 bg-purple-500/20 blur-xl rounded-full group-hover:bg-purple-500/40 transition-colors duration-500" />
        
        <img 
          src="https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/TeamPage/clickup_verified.png" 
          alt="Verified ClickUp Power User"
          className="w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(168,85,247,0.4)] relative z-10"
        />
      </div>

    </motion.div>
  );
}
