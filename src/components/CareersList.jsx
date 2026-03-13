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