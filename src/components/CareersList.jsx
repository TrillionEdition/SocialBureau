// // import React, { useEffect, useState } from "react";
// // import { Link } from "react-router-dom";
// // import { jobService } from "../../services/jobService";

// // export default function CareersPost() {
// //   const [jobs, setJobs] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null)

// //   useEffect(() => {
// //     setLoading(true);
// //     jobService
// //       .getJobs()
// //       .then((data) => {
// //         setJobs(data);
// //         setLoading(false);
// //       })
// //       .catch((err) => {
// //         console.error(err);
// //         setError("Failed to load careers. Please try again later.");
// //         setLoading(false);
// //       });
// //   }, []);

// //   if (loading) {
// //     return (
// //       <div className="text-center text-white py-20">
// //         <p className="text-xl">Loading careers...</p>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="text-center text-red-500 py-20">
// //         <p className="text-xl">{error}</p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <section className="text-white py-20 px-6 md:px-24 mx-auto">
// //       <h2 className="text-5xl font-bold mb-6 text-center" id="careers">Careers</h2>
// //       <p className="text-xl text-gray-300 font-light text-center mb-16">
// //         Designed for professionals of distinction
// //       </p>

// //       {/* GRID */}
// //       {jobs.length === 0 ? (
// //         <p className="text-center text-gray-400">No open positions at the moment.</p>
// //       ) : (
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
// //           {jobs.map((job) => (
// //             <div
// //               key={job.slug}
// //               className="
// //               relative bg-black rounded-2xl p-8
// //               border border-gray-800
// //               hover:border-red-600
// //               transition-all duration-300
// //               min-h-[220px]
// //               flex flex-col justify-between
// //             "
// //             >
// //               {/* ICON */}
// //               {job.icon && (
// //                 <i
// //                   className={`${job.icon}
// //                 absolute top-6 right-6
// //                 text-red-600 text-xl`}
// //                 />
// //               )}

// //               {/* TITLE */}
// //               <h3 className="text-2xl font-semibold mb-4">
// //                 {job.title}
// //               </h3>

// //               {/* DESCRIPTION */}
// //               <p className="text-gray-300 text-sm leading-relaxed mb-8 max-w-[90%]">
// //                 {job.description}
// //               </p>

// //               {/* FOOTER */}
// //               <div className="flex items-center justify-between mt-auto">
// //                 <span className="text-sm text-gray-400">
// //                   {job.department}
// //                 </span>

// //                 <Link
// //                   to={`/careers/${job.slug}`}
// //                   className="
// //                   bg-red-600 text-white
// //                   px-6 py-2 rounded-full
// //                   text-sm font-medium
// //                   hover:bg-red-700
// //                   transition
// //                 "
// //                 >
// //                   View Details
// //                 </Link>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </section>
// //   );
// // }


// import React, { useEffect, useState, useMemo } from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { jobService } from "../../services/jobService";

// export default function CareersPost() {
//   const [jobs, setJobs] = useState([]);
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     jobService.getJobs().then(setJobs);
//   }, []);

//   const filteredJobs = useMemo(() => {
//     return jobs.filter((job) =>
//       job.title.toLowerCase().includes(search.toLowerCase())
//     );
//   }, [search, jobs]);

//   return (
//     <section className="py-32 bg-[#fafafa] text-[#1a1a1a]">
//       <div className="max-w-5xl mx-auto px-6">

//         {/* Header & Search */}
//         <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
//           <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-5xl font-medium">
//             Open Roles
//           </h2>
//           <input
//             type="text"
//             placeholder="Filter roles..."
//             onChange={(e) => setSearch(e.target.value)}
//             className="bg-transparent border-b border-gray-300 py-2 outline-none focus:border-red-600 w-full md:w-64 text-sm uppercase tracking-widest placeholder:text-gray-400"
//           />
//         </div>

//         {/* The Reveal List */}
//         <div className="space-y-4">
//           {filteredJobs.map((job, index) => (
//             <motion.div
//               key={job.slug}
//               initial={{ opacity: 0, x: 100 }} // Starts off-screen to the right
//               whileInView={{ opacity: 1, x: 0 }} // Slides to original position
//               viewport={{ once: true, amount: 0.3 }} // Triggers once
//               transition={{
//                 duration: 0.8,
//                 delay: index * 0.1, // Staggered entry for a "swag" flow
//                 ease: [0.22, 1, 0.36, 1]
//               }}
//             >
//               <Link
//                 to={`/careers/${job.slug}`}
//                 className="group block bg-white p-10 border rounded-lg border-gray-100 hover:border-red-600 transition-all duration-500 shadow-sm hover:shadow-xl"
//               >
//                 <div className="flex justify-between items-center">
//                   <div>
//                     <span className="text-[10px] uppercase tracking-[0.3em] text-red-600 mb-2 block">
//                       {job.department}
//                     </span>
//                     <h3 className="text-3xl font-medium font-serif">{job.title}</h3>
//                   </div>
//                   <span className="text-[11px] uppercase tracking-[0.2em] font-bold border border-gray-200 px-6 py-3 group-hover:bg-[#1a1a1a] group-hover:text-white transition-all">
//                     View Role
//                   </span>
//                 </div>
//               </Link>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }


import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { jobService } from "../../services/jobService";

export default function CareersPost() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    jobService.getJobs().then(setJobs);
  }, []);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) =>
      job.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, jobs]);

  return (
    <section className="py-24 bg-[#fafafa] text-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header & Search - More compact */}
        <div className="flex flex-col md:flex-row justify-between items-baseline gap-8 mb-12 border-b border-gray-100 pb-8">
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-5xl font-medium mb-2">
              Open Roles
            </h2>
            <p className="text-gray-400 text-xs uppercase tracking-widest">Select a path to architect the future</p>
          </div>
          <input
            type="text"
            placeholder="Search departments..."
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border-b border-gray-300 py-2 outline-none focus:border-red-600 w-full md:w-80 text-xs uppercase tracking-[0.2em] placeholder:text-gray-300 transition-colors"
          />
        </div>

        {/* Grid Layout: Displays more cards in a single viewport */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredJobs.map((job, index) => (
            <motion.div
              key={job.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: index * 0.05, // Faster stagger for grid feel
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <Link
                to={`/careers/${job.slug}`}
                className="group relative block bg-white h-full p-8 border border-gray-100 hover:border-red-500 transition-all duration-700 overflow-hidden"
              >
                {/* Background Accent on Hover */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-red-50 opacity-[0.03] -mr-12 -mt-12 rounded-full group-hover:scale-[10] transition-transform duration-1000" />

                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-red-600 px-3 py-1 border border-red-50 bg-red-50/30">
                        {job.department}
                      </span>
                      <span className="text-gray-200 group-hover:text-red-600 transition-colors duration-500">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </div>

                    <h3 className="text-2xl font-medium font-serif leading-tight group-hover:text-red-700 transition-colors">
                      {job.title}
                    </h3>
                  </div>

                  <div className="mt-12 flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-widest text-gray-400">Full Time / Kochi</span>
                    <span className="text-[9px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500 text-red-600">
                      Explore Role
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredJobs.length === 0 && (
          <div className="py-20 text-center border border-dashed border-gray-200">
            <p className="text-gray-400 font-serif italic text-xl">No roles found matching your search.</p>
          </div>
        )}
      </div>
    </section>
  );
}