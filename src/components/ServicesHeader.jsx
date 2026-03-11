import React, { forwardRef } from "react";
import { motion } from "framer-motion";

const ServicesHeader = forwardRef(function ServicesHeader({ onArrowClick }, ref) {
  return (
    <>
    <section
      ref={ref}
      className="flex flex-col justify-center items-center text-center pt-10 pb-8 px-10 bg-black h-[100vh]"
    >
      <h1 style={{ fontFamily: "Playfair Display, serif" }} className="text-4xl xs:text-3xl sm:text-4xl md:text-6xl font-black leading-tight mb-4 text-white">
        The   {" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#ff0000]">World’s First API</span> + Platform Prompting Marketing Ecosystem
      </h1>
      <div className="flex items-center justify-center mb-2 py-2">
        <span className="block w-10 sm:w-25 h-0.5 bg-[#ff0000] mr-2 sm:mr-3" />
      </div>
      <p className="max-w-4xl text-base xs:text-lg sm:text-xl text-neutral-300 font-medium ">
        Connecting brands, data, and platforms across every continent powered by API technology and platform intelligence.
      </p>
      <br />
      <br />
      <div className="relative w-full">
        <div className="flex justify-center">
    <motion.img
      src="/assets/arrow.webp"
      alt="Scroll Down"
      className="w-8 h-8 my-10 cursor-pointer"
      animate={{
        y: [0, 10, 0],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      onClick={onArrowClick}
      tabIndex={0}
      style={{ outline: "none" }}
      onKeyPress={e => {
        if (e.key === "Enter" || e.key === " ") {
          onArrowClick();
        }
      }}
    />
  </div>
</div>
    </section>
        <section className="px-6 text-center">
        <div className="max-w-[80vw] mx-auto">
          
          <p className="text-xl md:text-2xl font-light text-gray-300 mb-12">
<a style={{ fontFamily: "MyFont, sans-serif" }} href='https://socialbureau.in'>
              Social<span className="text-[#ff0000]">B</span>ureau
            </a>, a project by <a href="https://trillionedition.com"
  target="_blank"
  rel="noopener noreferrer"
  className="font-semibold cursor-pointer">TrillionEdition LLP</a>, is not just a marketing agency, it’s a global marketing infrastructure.
We integrate APIs, AI, and data intelligence to manage ads, automation, analytics, and audience growth across every major digital platform worldwide.

          </p>
        </div>
      </section>
</>
  );
});

export default ServicesHeader;
