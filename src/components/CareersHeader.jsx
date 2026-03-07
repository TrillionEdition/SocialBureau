// // import React from "react";
// // import "@fortawesome/fontawesome-free/css/all.min.css";

// // export default function CareersHeader() {
// //   return (
// //     <div className=" text-white font-inter">

// //       <section className="py-30 pt-40 px-6 text-center">
// //         <div className="max-w-[80vw] mx-auto">
// //           <h2 style={{ fontFamily: "Playfair Display, serif" }} className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
// //             Build the Future of <span className="text-[#ff0000]">API Marketing</span>
// //           </h2>
// //           <p className="text-xl md:text-2xl font-light text-gray-300 mb-12">
// //             Join the World’s First API Marketing Agency<br /> Be Part of the Next Marketing Revolution
// //           </p>
// //           <a
// //             href="#careers"
// //             className="inline-block border border-white rounded-full px-12 py-4 text-lg font-medium hover:bg-[#ff0000] hover:border-[#ff0000] transition"
// //           >
// //             Explore Opportunities
// //           </a>
// //         </div>
// //       </section>
// //       <section className="py-30 px-6 text-center">
// //         <div className="max-w-[80vw] mx-auto">

// //           <p className="text-xl md:text-2xl font-light text-gray-300 mb-12">
// //             At <a style={{ fontFamily: "MyFont, sans-serif" }} href='https://socialbureau.in'>
// //               Social<span className="text-[#ff0000]">B</span>ureau
// //             </a> (A Project by <a href="https://trillionedition.com"
// //               target="_blank"
// //               rel="noopener noreferrer"
// //               className="font-semibold cursor-pointer">TrillionEdition LLP</a>), we’re building the next generation of marketing powered by APIs, performance, data, and creativity.

// //             In the next 6 months, we’re expanding our team with 25+ new opportunities across creative, strategy, and technology departments.

// //             If you’re passionate about redefining how digital marketing works, this is your place to grow.
// //           </p>
// //         </div>
// //       </section>
// //     </div>
// //   );
// // }


// import React from "react";

// export default function CareersHeader() {
//   return (
//     <div className="bg-[#fafafa] text-[#1a1a1a] font-sans selection:bg-red-200">
      
//       {/* HERO SECTION - Spacious and Centered */}
//       <section className="py-32 px-6 text-center">
//         <div className="max-w-4xl mx-auto">
//           <span className="uppercase tracking-[0.4em] text-[10px] text-gray-500 mb-6 block">
//             Join the Bureau
//           </span>
//           <h2 
//             style={{ fontFamily: "'Playfair Display', serif" }} 
//             className="text-5xl md:text-8xl font-medium mb-12 leading-[0.9] tracking-tight"
//           >
//             Build the Future of <br />
//             <span className="italic text-red-600">API Marketing</span>
//           </h2>
//           <p className="text-lg md:text-xl font-light text-gray-600 mb-16 max-w-xl mx-auto leading-relaxed">
//             Join the World’s First API Marketing Agency. Be part of the next evolution where data meets creative mastery.
//           </p>
//           <a
//             href="#careers"
//             className="inline-block border border-[#1a1a1a] px-12 py-5 text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-[#1a1a1a] hover:text-white transition-all duration-500"
//           >
//             Explore Opportunities
//           </a>
//         </div>
//       </section>

//       {/* MISSION SECTION - Editorial Style */}
//       <section className="py-32 px-6 border-t border-gray-200">
//         <div className="max-w-3xl mx-auto text-left">
//           <p className="text-2xl md:text-3xl font-light leading-relaxed text-gray-800">
//             At <a href='https://socialbureau.in' className="font-serif italic border-b border-gray-400">SocialBureau</a>, 
//             a project by <span className="font-medium">TrillionEdition LLP</span>, we are architecting the intersection 
//             of performance and artistry. 
//             <br /><br />
//             We are currently seeking 25+ visionaries to join our departments of strategy, technology, and design.
//           </p>
//         </div>
//       </section>
//     </div>
//   );
// }


import React from "react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }
};

export default function CareersHeader() {
  return (
    <div className="bg-[#fafafa] text-[#1a1a1a] font-sans selection:bg-red-200 overflow-hidden">
      
      {/* HERO SECTION */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ margin: "-20% 0px -20% 0px" }}
        className="py-32 px-6 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <motion.span variants={itemVariants} className="uppercase tracking-[0.4em] text-[10px] text-gray-500 mb-6 block">
            Join the Bureau
          </motion.span>
          <h2 
            style={{ fontFamily: "'Playfair Display', serif" }} 
            className="text-5xl md:text-8xl font-medium mb-12 leading-[0.9] tracking-tight"
          >
            <motion.span variants={itemVariants} className="block">Build the Future of</motion.span>
            <motion.span variants={itemVariants} className="italic text-red-600 block mt-4">API Marketing</motion.span>
          </h2>
          <motion.p variants={itemVariants} className="text-lg md:text-xl font-light text-gray-600 mb-16 max-w-xl mx-auto leading-relaxed">
            Join the World’s First API Marketing Agency. Be part of the next evolution where data meets creative mastery.
          </motion.p>
          <motion.div variants={itemVariants}>
            <a
              href="#careers"
              className="inline-block border border-[#1a1a1a] px-12 py-5 text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-[#1a1a1a] hover:text-white transition-all duration-500"
            >
              Explore Opportunities
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* MISSION SECTION - Slide in from Right */}
      <motion.section 
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ margin: "-30% 0px -30% 0px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="py-32 px-6 border-t border-gray-200"
      >
        <div className="max-w-3xl mx-auto text-left">
          <p className="text-2xl md:text-3xl font-light leading-relaxed text-gray-800">
            At <a href='https://socialbureau.in' className="font-serif italic border-b border-gray-400">SocialBureau</a>, 
            a project by <span className="font-medium">TrillionEdition LLP</span>, we are architecting the intersection 
            of performance and artistry. 
            <br /><br />
            We are currently seeking 25+ visionaries to join our departments of strategy, technology, and design.
          </p>
        </div>
      </motion.section>
    </div>
  );
}