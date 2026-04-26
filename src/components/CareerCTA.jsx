import React from "react";
import { motion } from "framer-motion";

/* ---------- Animation Config ---------- */

const luxuryEase = [0.22, 1, 0.36, 1];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: luxuryEase }
  }
};

/* ---------- Policy Data ---------- */

const policyData = [
  {
    title: "Transparency",
    desc: "Open feedback loops and clear, measurable growth pathways.",
    img: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80"
  },
  {
    title: "Equal Opportunity",
    desc: "A meritocratic culture that celebrates diverse perspectives.",
    img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80"
  },
  {
    title: "Confidentiality",
    desc: "Maintaining the highest standards of ethics and data integrity.",
    img: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80"
  },
  {
    title: "Performance",
    desc: "Advancement anchored in impact, skill, and creative output.",
    img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80"
  },
  {
    title: "Creative Freedom",
    desc: "Empowering every team member to pitch and lead initiatives.",
    img: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80"
  }
];

/* ---------- Section Wrapper ---------- */

const Section = ({ title, desc, children }) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="grid md:grid-cols-12 gap-12 py-32 border-b border-gray-100"
    >
      {/* Left Text */}
      <div className="md:col-span-4 sticky top-32 self-start">
        <h3
          style={{ fontFamily: "Playfair Display" }}
          className="text-4xl font-medium text-[#1a1a1a] mb-6"
        >
          {title}
        </h3>

        <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
          {desc}
        </p>
      </div>

      {/* Right Content */}
      <div className="md:col-span-8">{children}</div>
    </motion.div>
  );
};

/* ---------- Main Component ---------- */

export const CareerCTA = () => {
  return (
    <div className="bg-[#fafafa] text-[#1a1a1a] px-6 md:px-24 overflow-hidden">

      {/* ================= Joining Guidelines ================= */}
      <section className="py-32 border-b border-gray-100">
        <div className="max-w-7xl mx-auto">

          {/* Header Section */}
          <div className="mb-16">
            <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-5xl font-medium text-[#1a1a1a] mb-4">
              Joining Guidelines
            </h3>
            <p className="text-gray-400 font-light text-sm tracking-wide">
              Understand the step-by-step process to join SocialBureau.
            </p>
          </div>

          {/* PARALLEL LAYOUT: Image (5 cols) & Cards (7 cols) */}
          <div className="grid md:grid-cols-12 gap-8 items-stretch">

            {/* 1. Left Image Column */}
            <motion.div
              className="md:col-span-5 relative overflow-hidden rounded-3xl bg-gray-100 group shadow-lg"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: luxuryEase }}
            >
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070"
                className="w-full h-full object-cover rounded-3xl"
                alt="Team collaboration"
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
            </motion.div>

            {/* 2. Right Cards Column (2x2 Grid) */}
            <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Application Process", text: "Submit your CV and portfolio to hr.socialbureau@gmail.com." },
                { title: "Interview Stages", text: "Screening, Departmental Interview, Assignment, and Final HR round." },
                { title: "Work Culture", text: "Collaborative, innovation-first environment with access to cutting-edge tools." },
                { title: "Hybrid Opportunities", text: "Flexibility provided based on project requirements and seniority." }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: luxuryEase }}
                  whileHover={{ y: -5 }}
                  className="group relative bg-white border border-gray-100 p-8 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:shadow-xl"
                >
                  <div className="relative z-10">
                    <span className="text-red-600/10 text-6xl font-serif italic absolute -top-4 -right-2">
                      0{i + 1}
                    </span>
                    <h4 style={{ fontFamily: "Playfair Display, serif" }} className="text-xl font-medium mb-4 pr-8">
                      {item.title}
                    </h4>
                    <p className="text-gray-500 text-md leading-relaxed font-light">
                      {item.text}
                    </p>
                  </div>
                  {/* Red accent line */}
                  <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-red-600 group-hover:w-full transition-all duration-700 ease-in-out" />
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>


      {/* ============ Company Policy =================  */}
      <section className="py-26">

        <div className="mb-20">
          <h3
            style={{ fontFamily: "Playfair Display" }}
            className="text-5xl font-medium mb-6"
          >
            Company Policy
          </h3>

          <p className="text-gray-400 uppercase tracking-[0.4em] text-[10px]">
            Our values, ethics and expectations
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          className="grid md:grid-cols-3 gap-4"
        >
          {policyData.map((item, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="group relative p-12 aspect-[4/5] border border-gray-100"
            >

              <div className="absolute inset-0 opacity-50 group-hover:opacity-30 transition duration-700">
                <img
                  src={item.img}
                  className="w-[500px] h-[500px] object-cover"
                  alt=""
                />
              </div>

              <div className="relative z-10">
                <span className="text-[10px] uppercase tracking-[0.3em] text-red-600 font-bold block mb-6">
                  Policy 0{i + 1}
                </span>

                <h4
                  style={{ fontFamily: "Playfair Display" }}
                  className="text-2xl mb-10"
                >
                  {item.title}
                </h4>
                <p className="text-gray-800 text-md leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="left-0 h-[3px] w-0 bg-red-600 group-hover:w-full transition-all duration-700" />

            </motion.div>
          ))}
        </motion.div>

      </section>

      {/* ================= CTA ================= */}

      <section className="py-48 text-center relative">

        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
          <span className="text-[20vw] font-serif italic">
            SocialBureau
          </span>
        </div>

        <div className="relative z-10">

          <h2
            style={{ fontFamily: "Playfair Display" }}
            className="text-6xl md:text-7xl mb-16"
          >
            Ready to define <br />
            <span className="text-red-600 italic">the future?</span>
          </h2>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://www.linkedin.com/company/socialbureau-in"
            className="inline-block border border-black px-16 py-6 text-[11px] tracking-[0.5em] uppercase font-bold hover:bg-black hover:text-white transition"
          >
            Submit Application
          </motion.a>

        </div>

      </section>

    </div>
  );
};

