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
        const res = await fetch(`${BASE_URL}/team-v2`);
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

  const staticInternSlugs = ["emil-joy", "athira-rajesh"];

  const normalize = (v) => String(v || "").toLowerCase().trim();
  const staticInternSet = new Set(staticInternSlugs.map(s => normalize(s)));

  const isIntern = (m) => {
    if (!m) return false;
    if (m.isInternship || m.user?.isInternship) return true;
    const slug = normalize(m.slug || m.name || m.email || m._id);
    return staticInternSet.has(slug);
  };

  // Exclude interns from the main filtered list so they won't appear in category filters
  const nonInternMembers = members.filter(m => !isIntern(m));

  const internshipMembers = members.filter(m => isIntern(m));

  // Map categories to interns that should appear within that filtered view
  const categoryInternMap = {
    CREATIVE: new Set([normalize("emil-joy")]),
    STRATEGY: new Set([normalize("athira-rajesh")]),
    PERFORMANCE: new Set([normalize("athira-rajesh")])
  };

  const baseFiltered = filter === "ALL"
    ? nonInternMembers
    : nonInternMembers.filter(m => Array.isArray(m.category) ? m.category.includes(filter) : m.category === filter);

  // When filtering by a category, optionally include specific interns (by slug/name/email)
  let internsToInclude = [];
  if (filter !== "ALL") {
    const wanted = categoryInternMap[filter];
    if (wanted) {
      internsToInclude = internshipMembers.filter(m => wanted.has(normalize(m.slug || m.name || m.email || m._id)));
    }
  }

  // Merge baseFiltered + internsToInclude while keeping uniqueness
  const seen = new Set();
  const filteredMembers = [...baseFiltered, ...internsToInclude].filter(m => {
    const id = String(m._id || m.id || m.email || m.slug || "");
    if (seen.has(id)) return false;
    seen.add(id);
    return true;
  });

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
              className={`px-2 md:px-5 py-1.5 rounded-full text-[7px] md:text-[8px] font-black tracking-[0.1em] md:tracking-[0.2em] transition-all duration-500 border whitespace-nowrap overflow-hidden text-ellipsis ${filter === cat
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

                {member.hideProfileLink ? (
                  <div className="flex flex-col flex-1 h-full">
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
                      <h3 className="text-2xl font-black text-white mb-1 tracking-tight font-roboto flex items-center gap-2">
                        <span>{member.name}</span>
                        {((member.user?.isClickUpVerified ||
                          member.email === "ceo@socialbureau.in" ||
                          member.user?.email === "ceo@socialbureau.in" ||
                          member.email === "web@socialbureau.in" ||
                          member.user?.email === "web@socialbureau.in" ||
                          member.email === "admin@socialbureau.in" ||
                          member.user?.email === "admin@socialbureau.in" ||
                          member.slug === "shamsk" ||
                          member.slug === "elizebath" ||
                          member.slug === "hajira") &&
                          member.email !== "webjr.socialbureau@gmail.com" &&
                          member.user?.email !== "webjr.socialbureau@gmail.com" &&
                          member.email !== "pmo.socialbureau@gmail.com" &&
                          member.user?.email !== "pmo.socialbureau@gmail.com" &&
                          member.slug !== "reshma-vijayan" &&
                          member.slug !== "athira-rajesh"
                        ) && (
                          <ClickUpVerifiedBadge className="scale-[0.9] origin-left" />
                        )}
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
                  </div>
                ) : (
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
                      <h3 className="text-2xl font-black text-white mb-1 tracking-tight font-roboto flex items-center gap-2">
                        <span>{member.name}</span>
                        {((member.user?.isClickUpVerified ||
                          member.email === "ceo@socialbureau.in" ||
                          member.user?.email === "ceo@socialbureau.in" ||
                          member.email === "web@socialbureau.in" ||
                          member.user?.email === "web@socialbureau.in" ||
                          member.email === "admin@socialbureau.in" ||
                          member.user?.email === "admin@socialbureau.in" ||
                          member.slug === "shamsk" ||
                          member.slug === "elizebath" ||
                          member.slug === "hajira") &&
                          member.email !== "webjr.socialbureau@gmail.com" &&
                          member.user?.email !== "webjr.socialbureau@gmail.com" &&
                          member.email !== "pmo.socialbureau@gmail.com" &&
                          member.user?.email !== "pmo.socialbureau@gmail.com" &&
                          member.slug !== "reshma-vijayan" &&
                          member.slug !== "athira-rajesh"
                        ) && (
                          <ClickUpVerifiedBadge className="scale-[0.9] origin-left" />
                        )}
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
                )}

                {/* Social Links (outside the main link to be independently clickable) */}
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

      {/* Internship Section - rendered at bottom (only when showing ALL) */}
      {internshipMembers.length > 0 && filter === "ALL" && (
        <div className="max-w-7xl mx-auto relative z-10 mt-12">
          <div className="mb-8">
            <div className="mb-4 text-center">
                <span className="font-roboto inline-block text-[20px] font-bold tracking-[0.28em] text-purple-300 uppercase px-3 py-1 rounded-full bg-gradient-to-r from-purple-900/10 to-transparent border border-purple-700/10">
                  INTERNSHIP
                </span>
                
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              <AnimatePresence mode="popLayout">
                {internshipMembers.map((member, index) => (
                  <motion.div
                    layout
                    key={member.id || member._id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: (index % 3) * 0.05 }}
                    className="group relative bg-[#120c1d] rounded-[40px] overflow-hidden border border-white/5 hover:border-white/20 transition-colors flex flex-col h-full will-change-transform shadow-2xl"
                  >
                    <div className="relative aspect-square overflow-hidden bg-gray-900">
                      <img src={member.image1 || member.image} alt={member.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-6 pb-4 flex flex-col flex-1">
                      <h3 className="text-2xl font-black text-white mb-1 tracking-tight font-roboto">{member.name}</h3>
                      <p className="text-[11px] font-bold text-white/40 tracking-[0.2em] uppercase mb-4">{member.role}</p>
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {(member.tags || []).slice(0,3).map(tag => (
                          <span key={tag} className="px-3 py-1 bg-white/5 rounded-full text-[9px] font-bold text-white/30">{tag}</span>
                        ))}
                      </div>
                    </div>
                    <div className="p-6 pt-4 border-t border-white/5 flex gap-4">
                      <a href={member.socials?.linkedin} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all"><Linkedin className="w-3.5 h-3.5" /></a>
                      <a href={member.socials?.instagram} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all"><Instagram className="w-3.5 h-3.5" /></a>
                      <a href={member.socials?.twitter} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all"><Twitter className="w-3.5 h-3.5" /></a>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      )}
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
