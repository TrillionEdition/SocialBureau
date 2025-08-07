import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function CareersHeader() {
  return (
    <div className=" text-white font-inter">
      
      <section className="py-30 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 style={{ fontFamily: "Playfair Display, serif" }} className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
            Be  <span className="text-[#ff0000]">Inspired</span>
          </h1>
          <p className="text-xl md:text-2xl font-light text-gray-300 mb-12">
            Join a premium team of exceptional talent with incredible opportunity
          </p>
          <a
            href="#positions"
            className="inline-block border border-white rounded-full px-12 py-4 text-lg font-medium hover:bg-[#ff0000] hover:border-[#ff0000] transition"
          >
            Explore Opportunities
          </a>
        </div>
      </section>

    </div>
  );
}
