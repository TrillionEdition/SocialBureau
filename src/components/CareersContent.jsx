import React from 'react';
import { motion } from 'framer-motion';

const values = [
  { number: "01", title: "Excellence", text: "Uncompromising commitment to precision and craft in everything we do.", img: "https://i.pinimg.com/736x/88/8b/1e/888b1e6daf32e195211fb9ba0ffb1d4a.jpg" },
  { number: "02", title: "Integrity", text: "Principled leadership that values transparency above all else.", img: "https://i.pinimg.com/736x/fe/88/eb/fe88eb2f42a767606d2a43afd15c673f.jpg" },
  { number: "03", title: "Innovation", text: "Architecting solutions that define the industries of tomorrow.", img: "https://i.pinimg.com/736x/01/7f/8b/017f8bf140ea81a96e4ac8c1eb86ceff.jpg" },
  { number: "04", title: "Artistry", text: "Blending data-driven strategy with creative visual mastery.", img: "https://i.pinimg.com/736x/7c/42/f0/7c42f05a8ce4a51442b360c9c428fafa.jpg" },
];

export default function CareersContent() {
  return (
    <section className="py-32 px-6 bg-[#fafafa] text-[#1a1a1a]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-24">
          <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-5xl md:text-7xl font-medium tracking-tight mb-6">
            Principles of <span className="italic">Distinction</span>
          </h2>
          <div className="h-[1px] w-20 bg-red-600"></div>
        </div>

        {/* 4-Column Grid */}
        <div className="grid md:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <motion.div 
              key={i} 
              className="relative h-[500px] overflow-hidden group cursor-pointer"
              whileHover={{ flexGrow: 1.2 }}
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-gray-800 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${v.img})` }}
              />
              
              {/* Dark Overlay that appears on hover */}
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Static Content */}
              <div className="absolute bottom-10 left-8 z-10 text-white">
                <div className="text-[10px] uppercase tracking-[0.4em] mb-4 text-white/60">{v.number}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl font-medium">
                  {v.title}
                </h3>
              </div>

              {/* Hover Text Reveal */}
              <div className="absolute inset-0 flex items-center justify-center p-8 opacity-0 group-hover:opacity-900 bg-black/50 transition-all duration-500 transform translate-y-10 group-hover:translate-y-0">
                <p className="text-white text-lg font-light leading-relaxed border-t border-white/20 pt-6">
                  {v.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
