import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Github, ArrowRight } from 'lucide-react';

const TeamCard = ({ name, role, image, socials }) => (
  <Link
    to={`/employee/${name?.toLowerCase().replace(/\s+/g, '-')}`}
    className="group relative flex flex-col border border-white/10 rounded-[20px] overflow-hidden bg-[#111111] transition-all duration-500 hover:border-red-600/30"
  >
    <div className="relative aspect-[3/5] overflow-hidden">
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
      />

      {/* OVERLAY AT BOTTOM */}
      <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black via-black/80 to-transparent translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
        <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-1">{name}</h3>
        <p className="text-gray-400 text-[10px] font-medium tracking-wider mb-3">{role}</p>

        {/* SOCIALS IN A ROW */}
        <div className="flex gap-4">
          <button className="text-white/40 hover:text-white transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
          </button>
          <button className="text-white/40 hover:text-white transition-colors">
            <Linkedin size={16} />
          </button>
          <button className="text-white/40 hover:text-white transition-colors">
            <Twitter size={16} />
          </button>
        </div>
      </div>
    </div>
  </Link>
);

const TeamGrid = ({ teamData, isLoading }) => {
  const scrollRef = React.useRef(null);
  const [scrollProgress, setScrollProgress] = React.useState(0);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
      setScrollProgress(progress);
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  // FALLBACK DATA
  const fallbackMembers = [
    {
      name: "Rachel Susan",
      role: "HR",
      image: "https://res.cloudinary.com/dtwcgfmar/image/upload/v1770037177/images/af8xbvarrsehbzcxjylq.jpg",
      socials: { linkedin: "#", twitter: "#", instagram: "#" }
    },
    {
      name: "Hasna",
      role: "Asst Web Developer",
      image: "https://res.cloudinary.com/dtwcgfmar/image/upload/v1764580735/images/p6piwfsx26mqv3vd6eoz.png",
      socials: { linkedin: "#", twitter: "#", instagram: "#" }
    },
    {
      name: "Hajira K",
      role: "Administration & CMO",
      image: "https://res.cloudinary.com/dtwcgfmar/image/upload/v1768816875/SB_ID_Card_Hajira_lrmfvk.png",
      socials: { linkedin: "#", twitter: "#", instagram: "#" }
    },
    {
      name: "Elizebath",
      role: "Senior Web Developer",
      image: "https://res.cloudinary.com/dtwcgfmar/image/upload/v1762493913/team5_zlamx7.webp",
      socials: { linkedin: "#", twitter: "#", instagram: "#" }
    },
    {
      name: "Reshma Vijayan",
      role: "Web Developer",
      image: "https://res.cloudinary.com/dtwcgfmar/image/upload/v1770036743/images/w4eogtldwfqtsoxl94tl.jpg",
      socials: { linkedin: "#", twitter: "#", instagram: "#" }
    }
  ];

  // PROCESS DYNAMIC DATA
  const members = React.useMemo(() => {
    if (!teamData) return fallbackMembers;

    // If teamData is an object of departments { 'Dept': members[] }
    if (typeof teamData === 'object' && !Array.isArray(teamData)) {
      return Object.values(teamData).flat();
    }

    return Array.isArray(teamData) ? teamData : fallbackMembers;
  }, [teamData]);

  if (isLoading) {
    return (
      <section className="bg-black py-24 px-6 md:px-16 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-red-600/30 border-t-red-600 rounded-full animate-spin" />
      </section>
    );
  }

  return (
    <section className="bg-black py-24 px-6 md:px-16 overflow-hidden">
      <div className="max-w-[1440px] mx-auto">

        <div className="grid lg:grid-cols-[450px_1fr] gap-16 items-start">

          {/* LEFT CONTENT */}
          <div className="sticky top-24">
            <div className="flex items-center gap-3 text-red-600 font-bold uppercase tracking-widest text-sm mb-6">
              <span className="w-12 h-px bg-red-600"></span>
              OUR TEAM
              <span>→</span>
            </div>

            <h2 className="text-white text-[48px] lg:text-[64px] font-bold leading-[1.1] mb-8">
              The Minds Behind<br />
              Our <span className="text-[#FF1E1E]">Digital Success</span>
            </h2>

            <p className="text-gray-400 text-lg max-w-md leading-relaxed mb-10">
              A passionate team of designers, developers and strategists committed to building digital experiences that make an impact
            </p>

            <button className="flex items-center gap-3 text-white border border-red-600/30 hover:border-red-600 px-8 py-4 rounded-full transition-all group w-fit">
              <span className="font-bold uppercase tracking-widest text-sm">Meet The Team</span>
              <ArrowRight size={20} className="text-red-600 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* RIGHT SCROLLER */}
          <div className="relative lg:pt-48">
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex gap-8 overflow-x-auto pb-12 no-scrollbar cursor-grab active:cursor-grabbing scroll-smooth"
            >
              {members.map((member, index) => (
                <div key={index} className="min-w-[280px] lg:min-w-[calc((100%-60px)/3)] w-[85vw] lg:w-auto">
                  <TeamCard {...member} />
                </div>
              ))}
            </div>


            {/* SCROLL BUTTONS ON THE RIGHT */}
            <div className="absolute -bottom-14 right-0 flex gap-4">
              <button
                onClick={() => scroll('left')}
                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-red-600 transition-all"
              >
                <ArrowRight size={20} className="rotate-180" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="w-12 h-12 rounded-full bg-[#FF1E1E] flex items-center justify-center text-white shadow-lg hover:scale-110 transition-all"
              >
                <ArrowRight size={20} />
              </button>
            </div>

            {/* GRADIENT MASK */}
            <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-black to-transparent pointer-events-none" />
          </div>

        </div>

      </div>
    </section>
  );
};

export default TeamGrid;
