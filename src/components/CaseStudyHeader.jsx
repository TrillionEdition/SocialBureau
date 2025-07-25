import React from "react";

export default function CaseStudyHeader() {
  return (
    <section className="bg-black flex flex-col md:flex-row items-center justify-center text-center md:text-left py-50 px-10 h-[100vh]">
      <div className="flex-2">
        <h5
          className="text-[#ff0000] uppercase tracking-widest mb-4 text-md font-semibold"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Case Studies
        </h5>
        <h2
          className="text-white text-7xl md:text-8xl font-bold mb-6"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Proof, Not Promises
        </h2>
        <p
          className="text-neutral-300 text-base md:text-xl max-w-2xl mx-auto md:mx-0"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          We partner with niche brands who expect more than impressions. Explore how we've engineered real growth.
        </p>
      </div>
      <div className="flex-1 mt-10 md:mt-0 md:ml-12 flex justify-center">
        {/* Replace the src below with your actual image path or URL */}
        <img
          src="/assets/3d.webp"
          alt="Case Study illustration"
          className="w-full rounded-lg shadow-lg"
        />
      </div>
    </section>
  );
}