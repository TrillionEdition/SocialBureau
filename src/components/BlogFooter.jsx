import React from 'react'
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
};
export const BlogFooter = () => {
  return (
    <div>
        
      <motion.div
  className="max-w-6xl mx-auto px-6 my-20"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.3 }}
>
  <motion.h3
    variants={fadeUp}
    className="text-3xl md:text-4xl font-semibold mb-10 text-white text-center"
  >
    What We Publish
  </motion.h3>

  {/* 🔥 2-COLUMN GRID */}
  <motion.div
    variants={stagger}
    className="grid md:grid-cols-2 gap-8 text-gray-200"
  >
    {[
      {
        title: "Platform Updates & Algorithm Insights",
        desc: (
          <>
            Stay informed about new tools, ad systems, and performance features on{" "}
            <a href="https://www.facebook.com/business" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 ">Meta</a>,{" "}
            <a href="https://ads.google.com" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:text-red-300 ">Google</a>,{" "}
            <a href="https://www.tiktok.com/business" target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:text-pink-300 ">TikTok</a>,{" "}
            <a href="https://www.redditinc.com/advertising" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 ">Reddit</a>,{" "}
            <a href="https://forbusiness.snapchat.com" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300 ">Snapchat</a>, and{" "}
            <a href="https://www.taboola.com" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 ">Taboola</a>.
          </>
        ),
        },
      {
        title: "Marketing Research & Case Studies",
        desc: "Deep-dives into real client campaigns showing how API-based marketing and niche targeting change outcomes.",
        },
      {
        title: "Freelancer & Agency Growth Guides",
        desc: "Actionable tutorials to help freelancers and agencies scale using automation, performance tools & creative workflows.",
        },
      {
        title: "AI & Automation Tools for Marketers",
        desc: "Discover the latest marketing AI assistants, prompt frameworks, and API connections that make workflows smarter.",
        }
    ].map((item, i) => (
      <motion.div
        key={i}
        variants={fadeUp}
        whileHover={{
          scale: 1.05,
          y: -8,
          transition: { duration: 0.3 }
        }}
        className={`bg-gradient-to-br from-red-500/10 via-purple-500/10 to-blue-500/10 border border-white/20 p-8 rounded-3xl shadow-2xl cursor-pointer transition-all relative overflow-hidden group`}
      >
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/0 via-red-600/10 to-red-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <h4 className="text-2xl font-bold text-white mb-4 relative z-10">
          {item.title}
        </h4>
        <p className="text-lg leading-relaxed text-gray-200 relative z-10">{item.desc}</p>
        
        {/* Decorative corner element */}
        <motion.div 
          className="absolute -bottom-4 -right-4 w-24 h-24 bg-red-500/20 rounded-full blur-2xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </motion.div>
    ))}
  </motion.div>
</motion.div>



      {/* ===== WHY WE BUILT THIS HUB ===== */}
      <motion.div
        className="max-w-6xl mx-auto px-6 mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h3
          variants={fadeUp}
          className="text-3xl md:text-4xl font-semibold mb-8 text-white text-center"
        >
          Why We Built This Hub
        </motion.h3>

        <motion.div
          variants={fadeUp}
          whileHover={{ scale: 1.02, y: -5 }}
          className="bg-gradient-to-br from-red-500/10 via-purple-500/10 to-blue-500/10 border border-red-500/30 p-10 rounded-3xl shadow-2xl transition-all relative overflow-hidden"
        >
          
          
          <p className="text-2xl text-white font-semibold mb-6 leading-relaxed text-center relative z-10">
            At{" "}
            <a style={{ fontFamily: "MyFont, sans-serif" }} href='https://socialbureau.in'>
              Social<span className="text-[#ff0000]">B</span>ureau
            </a>, we believe in growing the entire marketing ecosystem.
          </p>

          <p className="text-lg text-gray-200 mb-6 leading-relaxed relative z-10 font-medium">
            By publishing high-quality insights, we help:
          </p>

          <ul className="space-y-5 text-lg text-gray-200 mb-6 relative z-10">
            {[
              { text: "Agencies learn new platform trends early."},
              { text: "Freelancers stay competitive and skilled." },
              { text: "Businesses make data-driven marketing decisions."}
            ].map((point, i) => (
              <motion.li
                key={i}
                variants={fadeUp}
                whileHover={{ x: 10, scale: 1.05 }}
                className="flex items-start gap-4 cursor-pointer bg-white/5 p-4 rounded-xl border border-white/10"
              >
               
                <span className="text-lg">{point.text}</span>
              </motion.li>
            ))}
          </ul>

          
        </motion.div>
      </motion.div>
<motion.p
            className="text-2xl font-bold text-center pb-10 relative z-10 mx-6"
            whileHover={{ scale: 1.08 }}
            animate={{ opacity: [0.9, 1, 0.9] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-white">Our goal: </span>
            <span className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent font-extrabold">
              "To make knowledge the most powerful marketing tool."
            </span>
          </motion.p>

      {/* ===== GET INVOLVED ===== */}
      <motion.div
        className="max-w-6xl mx-auto px-6 mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h3
          variants={fadeUp}
          className="text-3xl md:text-4xl font-bold mb-10 text-white text-center"
        >
          Get Involved
        </motion.h3>

        <motion.div
          variants={stagger}
          className="grid md:grid-cols-3 gap-8"
        >
          {[
            {
              title: "Contribute",
              desc: "Write or share your own articles with our editorial team.",
              icon: "📢",
              gradient: "from-yellow-500/20 to-orange-500/20",
              glow: "rgba(255, 165, 0, 0.5)"
            },
            {
              title: "Subscribe",
              desc: "Get weekly updates about new tools, APIs, and breakthroughs.",
              icon: "📬",
              gradient: "from-green-500/20 to-emerald-500/20",
              glow: "rgba(16, 185, 129, 0.5)"
            },
            {
              title: "Join the Community",
              desc: "Discuss insights on our upcoming Reddit-style board.",
              icon: "💬",
              gradient: "from-pink-500/20 to-red-500/20",
              glow: "rgba(239, 68, 68, 0.5)"
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{
                scale: 1.1,
                rotate: 2,
                boxShadow: `0 0 40px ${item.glow}`,
              }}
              className={`bg-gradient-to-br ${item.gradient} border-2 border-white/20 p-8 rounded-3xl text-center shadow-2xl cursor-pointer transition-all relative overflow-hidden group`}
            >
              {/* Glowing orb */}
              <motion.div
                className="absolute -top-10 -right-10 w-32 h-32 bg-white/20 rounded-full"
                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              <motion.div
                className="text-6xl mb-4"
                whileHover={{ scale: 1.3}}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {item.icon}
              </motion.div>
              <h4 className="text-2xl font-bold text-white mb-3 relative z-10">{item.title}</h4>
              <p className="text-gray-200 text-lg relative z-10">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

