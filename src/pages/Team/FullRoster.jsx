import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Linkedin, Instagram, Twitter, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { BASE_URL } from "@/utils/urls";

export const FullRoster = () => {
  const [filter, setFilter] = useState("ALL");
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const res = await fetch(`${apiUrl}/team-v2`);
        const data = await res.json();
        if (data.success && data.data.length > 0) {
          const apiMembers = data.data;
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

          const others = apiMembers.filter(m => !ordered.find(om => String(om._id) === String(m._id)));
          setMembers([...ordered, ...others]);
        } else {
          const { TEAM_MEMBERS } = await import("./constants");
          setMembers(TEAM_MEMBERS);
        }
      } catch (err) {
        console.error("Fetch failed, using static data", err);
        const { TEAM_MEMBERS } = await import("./constants");
        setMembers(TEAM_MEMBERS);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  const categories = ["ALL", "LEADERSHIP", "TECHNOLOGY", "OPERATIONS", "STRATEGY", "CREATIVE", "PERFORMANCE", "FINANCE", "CONTENT"];

  const filteredMembers = filter === "ALL" 
    ? members 
    : members.filter(m => Array.isArray(m.category) ? m.category.includes(filter) : m.category === filter);

  if (loading && members.length === 0) {
      return (
          <div className="py-20 flex justify-center">
              <Loader2 className="animate-spin text-brand-pink" size={40} />
          </div>
      );
  }

  return (
    <section className="relative pt-12 md:pt-20 pb-20 px-6 bg-[#0a0510] overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.1)_0%,transparent_50%)]" />
      <div className="absolute left-1/2 top-0 h-full w-[1px] border-l border-dashed border-blue-500/30 -translate-x-1/2 z-0 hidden lg:block" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <span className="text-[10px] font-bold tracking-[0.6em] text-white/30 uppercase mb-2 block">
              THE FULL ROSTER
            </span>
            <h2 className="text-6xl md:text-8xl lg:text-[140px] font-black mb-6 tracking-[-0.05em] uppercase font-roboto text-white leading-none">
              TEAM
            </h2>
            <p className="max-w-2xl mx-auto text-white/40 leading-relaxed font-medium font-inter text-xs md:text-sm tracking-wide">
              A diverse group of passionate professionals, each bringing unique skills <br className="hidden md:block" />
              and experiences to drive innovation in every project we undertake.
            </p>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-3 md:flex md:flex-wrap md:justify-center gap-2 md:gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-2 md:px-5 py-1.5 rounded-full text-[7px] md:text-[8px] font-black tracking-[0.1em] md:tracking-[0.2em] transition-all duration-500 border whitespace-nowrap overflow-hidden text-ellipsis ${
                filter === cat 
                  ? "bg-[#ff3358]/10 border-[#ff3358] text-[#ff3358] shadow-[0_0_30px_rgba(255,51,88,0.2)]" 
                  : "bg-white/5 border-white/5 text-white/30 hover:text-white/60 hover:border-white/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredMembers.map((member, index) => (
              <motion.div
                layout
                key={member.id || member._id}
                initial={{ opacity: 0, y: 50, scale: 0.9, rotateX: 10 }}
                whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ 
                  y: -15, 
                  rotateY: 5,
                  rotateX: -5,
                  transition: { duration: 0.4, ease: "easeOut" } 
                }}
                transition={{ 
                  duration: 0.8, 
                  delay: (index % 3) * 0.1,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="group relative bg-[#120c1d] rounded-[40px] overflow-hidden border border-white/5 hover:border-white/20 transition-colors flex flex-col h-full will-change-transform shadow-2xl"
                style={{ 
                  backfaceVisibility: "hidden", 
                  transformStyle: "preserve-3d",
                  perspective: "1000px"
                }}
              >
                {/* Glow Effect on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0">
                  <div 
                    className="absolute -inset-24 blur-[100px] opacity-20"
                    style={{ backgroundColor: member.bgColor || '#ff3358' }}
                  />
                </div>

                  <Link to={`/team/${(member.id === 'sham-sk' || member.slug === 'sham-sk' || member.email === 'ceo@socialbureau.in') ? 'shamsk' : (member.slug || member.id)}`} className="flex flex-col flex-1 h-full">
                    {/* Image Section */}
                    <div className="relative aspect-square overflow-hidden bg-gray-900">
                      {/* Person Image */}
                      <img
                        src={member.image1 || member.image}
                        alt={member.name}
                        className="relative z-10 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>

                    {/* Info Section */}
                    <div className="p-8 pb-0 flex flex-col flex-1">
                      <h3 className="text-2xl font-black text-white mb-1 tracking-tight font-roboto">
                        {member.name}
                      </h3>
                      <p className="text-[11px] font-bold text-white/40 tracking-[0.2em] uppercase mb-6">
                        {member.role}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-8 mt-auto relative z-20">
                        {(member.tags || []).slice(0, 3).map((tag, tIdx) => (
                          <motion.span 
                            key={tag} 
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + (tIdx * 0.1) }}
                            className="px-3 py-1 bg-white/5 rounded-full text-[9px] font-bold text-white/30 tracking-widest group-hover:text-white/60 group-hover:bg-white/10 transition-colors"
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </Link>
                <div className="p-8 pt-6 border-t border-white/5 flex gap-4 relative z-30">
                  <a href={member.socials?.linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white hover:bg-white/5 transition-all">
                    <Linkedin className="w-3.5 h-3.5" />
                  </a>
                  <a href={member.socials?.instagram} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white hover:bg-white/5 transition-all">
                    <Instagram className="w-3.5 h-3.5" />
                  </a>
                  <a href={member.socials?.twitter} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white hover:bg-white/5 transition-all">
                    <Twitter className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
