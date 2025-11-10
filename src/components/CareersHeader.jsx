import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function CareersHeader() {
  return (
    <div className=" text-white font-inter">
      
      <section className="py-30 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 style={{ fontFamily: "Playfair Display, serif" }} className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
            Build the Future of <span className="text-[#ff0000]">API Marketing</span>
          </h2>
          <p className="text-xl md:text-2xl font-light text-gray-300 mb-12">
            Join the World’s First API Marketing Agency<br/> Be Part of the Next Marketing Revolution
          </p>
          <a
            href="#positions"
            className="inline-block border border-white rounded-full px-12 py-4 text-lg font-medium hover:bg-[#ff0000] hover:border-[#ff0000] transition"
          >
            Explore Opportunities
          </a>
        </div>
      </section>
      <section className="py-30 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          
          <p className="text-xl md:text-2xl font-light text-gray-300 mb-12">
            At <span style={{ fontFamily: "MyFont, sans-serif" }}>
              Social<span className="text-[#ff0000]">B</span>ureau
            </span> (A Project by <a href="https://trillionedition.com"
  target="_blank"
  rel="noopener noreferrer"
  className="font-semibold cursor-pointer">TrillionEdition LLP</a>), we’re building the next generation of marketing powered by APIs, performance, data, and creativity.

 In the next 6 months, we’re expanding our team with 25+ new opportunities across creative, strategy, and technology departments.

 If you’re passionate about redefining how digital marketing works, this is your place to grow.
          </p>
        </div>
      </section>
    </div>
  );
}
