import React from "react";
import { FaCalendarAlt } from "react-icons/fa";

export default function CaseStudyFooter() {
  return (
    <section className="bg-black text-center py-30 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-white text-4xl sm:text-5xl font-bold mb-6 relative inline-block">
          Let's Build the Next Case Study
        </h2>
        <p className="text-neutral-300 text-lg mb-10">
          Ready to engineer measurable growth for your brand? Let's discuss
          how we can replicate these results for you.
        </p>
        <button name="request" className="bg-[#ff0000] hover:bg-[#ff0000] transition-colors text-white font-semibold text-base py-3 px-6 rounded-full inline-flex items-center gap-2">
          <FaCalendarAlt />
          Request a Strategy Session
        </button>
      </div>
    </section>
  );
}
