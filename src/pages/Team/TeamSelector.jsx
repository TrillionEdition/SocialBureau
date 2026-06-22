import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/utils/authUtils";
import { Link } from "react-router-dom";
import { BASE_URL } from "@/utils/urls";

export const TeamSelector = () => {
  const { isEmployee } = useAuth();
  const [selectedId, setSelectedId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await fetch(`${apiUrl}/team-v2`);
        const data = await response.json();
        if (data.success && data.data.length > 0) {
          setMembers(data.data);
        } else {
          // Fallback if no members in DB yet or empty
          const { TEAM_MEMBERS } = await import("./constants");
          setMembers(TEAM_MEMBERS);
        }
      } catch (error) {
        console.error("Team fetch error:", error);
        const { TEAM_MEMBERS } = await import("./constants");
        setMembers(TEAM_MEMBERS);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const orderedEmails = [
    // "ui.socialbureau@gmail.com", // Emil
    "webasst.socialbureau@outlook.com", // Hasna
    "webjr.socialbureau@gmail.com", // Reshma
    "web@socialbureau.in", // Elizebath
    "ceo@socialbureau.in", // Sham
    "director@socialbureau.in", // Alen
    "admin@socialbureau.in", // Hajira
    "asst.hr.socialbureau@gmail.com", // Rachel
    "finance@socialbureau.in", // Keerthana
    // "pmo.socialbureau@gmail.com" // Athira
  ];

  const orderedMembers = [];
  orderedEmails.forEach(email => {
    const found = members.find(m => m.email === email || (m.user && m.user.email === email));
    if (found) orderedMembers.push(found);
  });

  // If some are missing from ordered list (new members like Alen), append them at the end
  const otherMembers = members.filter(m => !orderedMembers.find(om => String(om._id) === String(m._id)));
  const finalMembers = [...orderedMembers, ...otherMembers].filter(m => {
    const email = m.email || (m.user && m.user.email);
    const id = m.id || m._id;
    return email !== "ui.socialbureau@gmail.com" && email !== "pmo.socialbureau@gmail.com" && id !== "emil" && id !== "athira";
  });

  // Auto-rotation logic for mobile
  useEffect(() => {
    if (isMobile && finalMembers.length > 0) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % finalMembers.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isMobile, finalMembers.length]);

  // Sync selectedId with activeIndex on mobile
  useEffect(() => {
    if (isMobile && finalMembers[activeIndex]) {
      setSelectedId(finalMembers[activeIndex].id || finalMembers[activeIndex]._id);
    }
  }, [activeIndex, isMobile, finalMembers]);

  const handleCardClick = (id, index) => {
    if (isMobile) {
      setActiveIndex(index);
    } else {
      setSelectedId(selectedId === id ? null : id);
    }
  };

  return (
    <section className={`px-6 relative overflow-hidden ${isMobile ? "h-screen flex items-center" : "py-12"}`}>
      <div className="max-w-7xl mx-auto">
        <div className={`flex items-center justify-center gap-4 ${isMobile ? "absolute top-12 left-6 right-6 z-30" : "mb-6"}`}>
          <div className="h-[1px] flex-1 bg-white/10" />
          <h2 className="text-[12px] font-bold tracking-[0.4em] text-white/40 uppercase font-roboto text-center">
            {isMobile ? "Select a Team Member" : "Select a Team Member"}
          </h2>
          <div className="h-[1px] flex-1 bg-white/10" />
        </div>

        {isEmployee && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-4"
          >
            <Link 
              to="/team/dashboard"
              className="px-6 py-2 bg-brand-pink/10 border border-brand-pink/30 hover:bg-brand-pink hover:text-white transition-all rounded-full text-[10px] font-black tracking-widest text-brand-pink flex items-center gap-2 group"
            >
              <div className="w-1.5 h-1.5 bg-brand-pink rounded-full group-hover:bg-white animate-pulse" />
              TEAM DASHBOARD
            </Link>
          </motion.div>
        )}

        <div className={`flex justify-center items-center relative ${isMobile ? "h-[650px]" : "h-[500px] mt-12"}`}>
          {finalMembers.map((member, index) => {
            const total = finalMembers.length;
            const centerIndex = isMobile ? activeIndex : (total - 1) / 2;
            const diff = index - centerIndex;
            const isSelected = selectedId === (member.id || member._id);
            
            // Mobile Carousel Logic
            const mAngle = diff * 15;
            const mX = diff * 60;
            const mScale = 1 - Math.abs(diff) * 0.15;
            const mZIndex = total - Math.abs(diff);

            // Desktop Fan Logic
            const dAngle = diff * 10;
            const dX = isSelected ? 0 : diff * 100;
            const dY = isSelected ? -120 : Math.pow(Math.abs(diff), 1.5) * 15;
            const dZIndex = isSelected ? 200 : Math.round(total - Math.abs(diff));

            return (
              <motion.div
                key={member.id || member._id}
                initial={{ opacity: 0, scale: 0.8, y: 100 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: index * 0.05, 
                  duration: 0.8,
                  type: "spring",
                  stiffness: 260,
                  damping: 20
                }}
                onClick={() => handleCardClick(member.id || member._id, index)}
                whileHover={(!isMobile && selectedId === null) ? { 
                  y: dY - 20,
                  scale: 1.05,
                  zIndex: 250,
                  filter: "blur(0px) brightness(1.2)",
                  transition: { duration: 0.3 }
                } : {}}
                animate={{
                  y: isMobile ? (isSelected ? -80 : 20) : dY,
                  scale: isMobile ? (isSelected ? 2.3 : mScale) : (isSelected ? 1.5 : 1),
                  rotate: isMobile ? mAngle : (isSelected ? 0 : dAngle),
                  zIndex: isMobile ? mZIndex : dZIndex,
                  x: isMobile ? mX : dX,
                  opacity: isMobile && Math.abs(diff) > 2 ? 0 : 1,
                  filter: selectedId && !isSelected ? "blur(6px) brightness(0.5)" : "blur(0px) brightness(1)"
                }}
                className="absolute w-[180px] md:w-[220px] aspect-[3/4] rounded-2xl p-1 bg-white/5 border border-white/10 overflow-hidden cursor-pointer backdrop-blur-md"
                style={{
                  transformOrigin: isMobile ? "center center" : "bottom center",
                  boxShadow: isSelected 
                    ? `0 50px 100px -20px ${member.bgColor}44, 0 30px 60px -30px rgba(0,0,0,0.8)` 
                    : `0 20px 50px rgba(0,0,0,0.5)`
                }}
              >
                <div 
                  className="w-full h-full rounded-xl overflow-hidden relative"
                  style={{ backgroundColor: member.bgColor }}
                >
                  <img
                    src={member.cardImage || member.image}
                    alt={member.name}
                    className={`w-full h-full object-cover transition-all duration-700 ${isSelected ? "scale-110" : "scale-100"}`}
                  />
                  
                  {/* Card Glow Border */}
                  <div className="absolute inset-0 border border-white/10 rounded-xl pointer-events-none z-20" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
