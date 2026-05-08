import React from 'react';
import { ArrowRight, Phone, Mail, MapPin, Send } from 'lucide-react';

export const WorkSection = () => {
  const scrollRef = React.useRef(null);
  const projects = [
    { title: "Project Alpha", category: "Web Design", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" },
    { title: "Project Beta", category: "Development", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800" },
    { title: "Project Gamma", category: "UI/UX", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800" },
    { title: "Project Delta", category: "Branding", image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800" },
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-black py-24 px-6 md:px-16 overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid lg:grid-cols-[450px_1fr] gap-16 items-start">
          <div className="sticky top-24">
            <div className="flex items-center gap-3 text-red-600 font-bold uppercase tracking-widest text-sm mb-6">
              <span className="w-12 h-px bg-red-600"></span>
              OUR WORK
              <span>→</span>
            </div>
            <h2 className="text-white text-[48px] lg:text-[64px] font-bold leading-[1.1] mb-8">
              Work That Speaks<br />
              Our <span className="text-[#FF1E1E]">Creativity</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-md leading-relaxed mb-10">
              Explore some of our recent projects that showcase our creativity, technical expertise and passion for design
            </p>
            <button className="flex items-center gap-3 text-white border border-red-600/30 hover:border-red-600 px-8 py-4 rounded-full transition-all group w-fit">
              <span className="font-bold uppercase tracking-widest text-sm">Explore All Projects</span>
              <ArrowRight size={20} className="text-red-600 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="relative">
            <div ref={scrollRef} className="flex gap-8 overflow-x-auto pb-12 no-scrollbar scroll-smooth">
              {projects.map((project, index) => (
                <div key={index} className="min-w-[350px] group">
                  <div className="bg-[#1A1A1A] rounded-[24px] overflow-hidden aspect-[4/5] flex flex-col">
                    <div className="flex-1 overflow-hidden">
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="p-8 bg-white/95 flex flex-col gap-2">
                      <span className="text-xs text-gray-400 uppercase font-bold tracking-widest">{project.category}</span>
                      <h3 className="text-xl font-bold text-black">{project.title}</h3>
                      <div className="flex items-center gap-2 text-[#FF1E1E] font-bold text-sm mt-4 cursor-pointer hover:gap-3 transition-all">
                        VIEW PROJECT <ArrowRight size={16} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute -bottom-4 right-0">
              <button onClick={() => scroll('right')} className="w-14 h-14 rounded-full bg-[#FF1E1E] flex items-center justify-center text-white shadow-xl hover:scale-110 transition-all">
                <ArrowRight size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const ContactCTA = () => (
  <section className="bg-black py-8 px-6 md:px-16 overflow-hidden">
    <div className="max-w-[1440px] mx-auto bg-[#080808] rounded-3xl border border-white/5 overflow-hidden flex flex-col lg:flex-row shadow-2xl relative">

      {/* SIGNATURE GRADIENT TRIANGLE BACKGROUND */}
      <div className="absolute top-0 left-0 w-full lg:w-1/2 h-full -z-0 pointer-events-none overflow-hidden">
        <div
          className="w-full h-full"
          style={{
            clipPath: 'polygon(0 0, 100% 50%, 0 100%)',
            background: 'linear-gradient(90deg, #991212 5%, #000000 100%)',
            opacity: 1
          }}
        />
      </div>

      {/* TESTIMONIAL / LEFT ASIDE */}
      <div className="lg:w-[35%] p-6 lg:p-10 flex flex-col justify-between relative z-10 min-h-[280px]">
        <div className="pt-10 space-y-8">
          <div>
            <span className="text-4xl text-white/20 font-serif leading-none">“</span>
            <p className="text-white text-base font-medium leading-relaxed -mt-1 italic max-w-[240px]">
              SocialBureau understood our vision and turned it into a stunning digital experience that truly represents our brand!
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src="https://shamsk.vercel.app/assets/img/hero/me.png" alt="Sham SK" className="w-12 h-12 rounded-full border-2 border-white/20 p-0.5" />
              <div>
                <h4 className="text-white text-base font-bold">Sham SK</h4>
                <p className="text-gray-400 text-xs">CEO, Managing Director</p>
              </div>
            </div>

            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#FF1E1E]" />
              <div className="w-2 h-2 rounded-full bg-white/10" />
              <div className="w-2 h-2 rounded-full bg-white/10" />
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT & FORM */}
      <div className="lg:w-[65%] p-6 lg:p-10 flex flex-col xl:flex-row gap-8 items-start lg:items-center relative z-10">

        <div className="flex-1 space-y-6 w-full">
          <div className="space-y-3">
            <h2 className="text-white text-[28px] lg:text-[36px] font-bold leading-[1.1]">
              Have a Project in Mind?<br />
              Let's Create <span className="text-[#FF1E1E]">Together!</span>
            </h2>
            <p className="text-gray-400 text-base">We're just one message away!</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-[#FF1E1E] group-hover:bg-[#FF1E1E] group-hover:text-white transition-all">
                <Phone size={16} />
              </div>
              <span className="text-white text-sm font-medium">+91 8714962665</span>
            </div>
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-[#FF1E1E] group-hover:bg-[#FF1E1E] group-hover:text-white transition-all">
                <Mail size={16} />
              </div>
              <span className="text-white text-sm font-medium">info@socialbureau.in</span>
            </div>
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-[#FF1E1E] group-hover:bg-[#FF1E1E] group-hover:text-white transition-all">
                <MapPin size={16} />
              </div>
              <span className="text-white text-sm font-medium">Kochi, Kerala, India</span>
            </div>
          </div>
        </div>

        {/* FORM CARD */}
        <div className="w-full lg:w-[380px] bg-[#B3B3B3]/10 backdrop-blur-2xl border border-white/5 rounded-3xl p-6 lg:p-8 space-y-5 shadow-2xl">
          <h3 className="text-white text-xl font-bold">Get a Free Quote</h3>

          <form className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" placeholder="Your Name" className="w-full bg-transparent border-b border-white/10 py-2 text-white focus:border-[#FF1E1E] outline-none transition-all placeholder:text-gray-600 text-sm" />
              <input type="email" placeholder="Your Email" className="w-full bg-transparent border-b border-white/10 py-2 text-white focus:border-[#FF1E1E] outline-none transition-all placeholder:text-gray-600 text-sm" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" placeholder="Your Ph No" className="w-full bg-transparent border-b border-white/10 py-2 text-white focus:border-[#FF1E1E] outline-none transition-all placeholder:text-gray-600 text-sm" />
              <div className="relative">
                <select className="w-full bg-transparent border-b border-white/10 py-2 text-white focus:border-[#FF1E1E] outline-none transition-all appearance-none cursor-pointer text-gray-600 text-sm">
                  <option>Project Type</option>
                  <option>Web Design</option>
                  <option>Development</option>
                  <option>API Solutions</option>
                </select>
                <div className="absolute right-0 bottom-3 pointer-events-none text-gray-600 text-[10px]">▼</div>
              </div>
            </div>

            <textarea placeholder="Tell us about your project" rows={3} className="w-full bg-white/5 rounded-xl p-3 text-white focus:border-[#FF1E1E] border border-white/5 outline-none transition-all placeholder:text-gray-600 resize-none text-sm" />

            <button type="submit" className="w-full bg-[#FF1E1E] py-3 rounded-xl text-white text-base font-bold flex items-center justify-center gap-2 hover:bg-red-700 transition-all shadow-lg shadow-red-600/20 group">
              Send Message <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </form>
        </div>

      </div>
    </div>
  </section>
);

export const TrustedBy = () => {
  const logos = [
    { name: "News Tamil 24x7", url: "https://newstamil.tv/wp-content/uploads/2022/09/News-Tamil-Logo-01-1.png" },
    { name: "Sun Tips", url: "https://suntips.in/wp-content/uploads/2023/10/Sun-Tips-Logo.png" },
    { name: "Big TV", url: "https://bigtvtelugu.com/wp-content/uploads/2022/06/Big-TV-Logo.png" }
  ];

  return (
    <section className="bg-black py-24 px-6 md:px-16 border-t border-white/5">
      <div className="max-w-[1440px] mx-auto">
        <h2 className="text-white text-[32px] lg:text-[42px] font-bold mb-16 max-w-sm leading-tight">
          Trusted by<br />
          Leading News<br />
          Networks
        </h2>

        <div className="flex flex-wrap items-center justify-between gap-12 lg:gap-24 opacity-60">
          {logos.map((logo, index) => (
            <div key={index} className="flex-1 min-w-[200px] flex items-center justify-center group">
              <img
                src={logo.url}
                alt={logo.name}
                className="h-16 lg:h-20 object-contain grayscale group-hover:grayscale-0 transition-all duration-500 opacity-50 group-hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
