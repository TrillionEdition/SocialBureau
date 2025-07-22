import React from "react";

export default function ContactSection() {
  return (
    <section className="bg-black text-white py-16 px-4 md:px-12 flex flex-col lg:flex-row gap-8 pb-20">
      {/* Left side */}
      <div className="flex-1 flex flex-col gap-6">
        {/* Headline */}
        <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
          Let's Build What Your <br />
          <span className="text-[#ff0000]">Market's Been Waiting For</span>
        </h2>

        {/* Form */}
        <form action="https://formsubmit.co/info@socialbureau.in" method="POST" className="bg-[#110d0d] p-6 rounded-lg shadow-lg space-y-4" >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div className="relative">
              <input
                type="text"
                id="name"
                name="name"
                required
                className="peer w-full bg-neutral-800 p-3 pt-6 rounded placeholder-transparent focus:outline-none"
              />
              <label
                htmlFor="name"
                className="absolute left-3 top-3 text-gray-400 text-base transition-all
                peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#ff0000] peer-focus:bg-neutral-800 peer-focus:rounded-lg peer-valid:rounded-lg
                peer-valid:-top-2 peer-valid:text-xs peer-valid:text-[#ff0000] peer-valid:bg-neutral-800 px-1"
              >
                Name
              </label>
            </div>

            {/* Company */}
            <div className="relative">
              <input
                type="text"
                id="company"
                name="company"
                required
                className="peer w-full bg-neutral-800 p-3 pt-6 rounded placeholder-transparent focus:outline-none"
              />
              <label
                htmlFor="company"
                className="absolute left-3 top-3 text-gray-400 text-base transition-all
                peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#ff0000] peer-focus:bg-neutral-800 peer-focus:rounded-lg peer-valid:rounded-lg
                peer-valid:-top-2 peer-valid:text-xs peer-valid:text-[#ff0000] peer-valid:bg-neutral-800 px-1"
              >
                Company
              </label>
            </div>

            {/* Role */}
            <div className="relative">
              <input
                type="text"
                id="role"
                name="role"
                required
                className="peer w-full bg-neutral-800 p-3 pt-6 rounded placeholder-transparent focus:outline-none"
              />
              <label
                htmlFor="role"
                className="absolute left-3 top-3 text-gray-400 text-base transition-all
                peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#ff0000] peer-focus:bg-neutral-800 peer-focus:rounded-lg peer-valid:rounded-lg
                peer-valid:-top-2 peer-valid:text-xs peer-valid:text-[#ff0000] peer-valid:bg-neutral-800 px-1"
              >
                Role
              </label>
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                required
                className="peer w-full bg-neutral-800 p-3 pt-6 rounded placeholder-transparent focus:outline-none"
              />
              <label
                htmlFor="email"
                className="absolute left-3 top-3 text-gray-400 text-base transition-all
                peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#ff0000] peer-focus:bg-neutral-800 peer-focus:rounded-lg peer-valid:rounded-lg
                peer-valid:-top-2 peer-valid:text-xs peer-valid:text-[#ff0000] peer-valid:bg-neutral-800 px-1"
              >
                Email
              </label>
            </div>
          </div>

          {/* Website */}
          <div className="relative">
            <input
              type="text"
              id="website"
              name="website"
              required
              className="peer w-full bg-neutral-800 p-3 pt-6 rounded placeholder-transparent focus:outline-none"
            />
            <label
              htmlFor="website"
              className="absolute left-3 top-3 text-gray-400 text-base transition-all
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#ff0000] peer-focus:bg-neutral-800 peer-focus:rounded-lg peer-valid:rounded-lg
              peer-valid:-top-2 peer-valid:text-xs peer-valid:text-[#ff0000] peer-valid:bg-neutral-800 px-1"
            >
              Website
            </label>
          </div>

          {/* Message */}
          <div className="relative">
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              className="peer w-full bg-neutral-800 p-3 pt-6 rounded placeholder-transparent focus:outline-none resize-none"
            ></textarea>
            <label
              htmlFor="message"
              className="absolute left-3 top-3 text-gray-400 text-base transition-all
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#ff0000] peer-focus:bg-neutral-800 peer-focus:rounded-lg peer-valid:rounded-lg
              peer-valid:-top-2 peer-valid:text-xs peer-valid:text-[#ff0000] peer-valid:bg-neutral-800 px-1"
            >
              What challenge are you solving?
            </label>
          </div>
          <button type="submit"
  href="mailto:admin@socialbureau.in?subject=Inquiry&body=I would like to learn more."
  className="border border-white hover:border-[#ff0000] text-white hover:bg-[#ff0000] transition font-medium py-3 px-5 rounded-md flex items-center justify-center gap-2"
>
  <i className="fas fa-envelope"></i>
  Drop Us a Line
</button>
<div className="flex flex-col md:flex-row bg-black py-10 rounded-lg px-6 md:px-12 justify-center md:justify-between items-center text-center md:text-left mt-4 space-y-4 md:space-y-0">
  <p className="text-lg md:text-xl font-semibold text-white">
    Talk to a Growth Architect
  </p>
  <button
    onClick={() => {
      window.open(
        "https://wa.me/916238422887?text=Hello, I would like to learn more.",
        "_blank"
      );
    }}
    className="bg-[#ff0000] text-white px-4 py-2 rounded-md hover:scale-105 flex items-center justify-center w-full md:w-auto max-w-xs"
  >
    <i className="fas fa-calendar-alt p-2"></i>
    <span>Book a Call</span>
  </button>
</div>

          
        </form>
      </div>

      {/* Right side */}
      <div className="flex-1 flex items-center">
        <div className="bg-gradient-to-br from-black to-[#3f0000] p-6 rounded-lg shadow-lg w-full text-center flex flex-col justify-between">
          <div className="flex flex-col items-center">
            <div className="bg-gradient-to-br from-black to-[#3f0000] w-10 h-10 flex items-center justify-center rounded-full mb-4">
              <i className="fas fa-rocket text-[#ff0000]"></i>
            </div>
            <p className="text-lg mb-6">
              "Whether you're stuck in an acquisition plateau or scaling to your
              next revenue ceiling, let's talk."
            </p>
            <div className="flex justify-center gap-8 mb-4">
              <div>
                <p className="text-[#ff0000] text-xl font-semibold">50+</p>
                <p className="uppercase text-xs tracking-wide text-gray-400">
                  Growth Projects
                </p>
              </div>
              <div>
                <p className="text-[#ff0000] text-xl font-semibold">$2M+</p>
                <p className="uppercase text-xs tracking-wide text-gray-400">
                  Revenue Generated
                </p>
              </div>
            </div>
            <div className="border-t border-neutral-700 w-full mt-4 pt-4 flex justify-center gap-4 text-gray-400">
              <a 
                href="https://www.linkedin.com/company/socialbureau-in" 
                className="inline-flex items-center justify-center w-10 h-10 rounded-full text-white hover:bg-[#ff0000] hover:scale-105 transition"
              >
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="https://twitter.com" className="inline-flex items-center justify-center w-10 h-10 rounded-full text-white hover:bg-[#ff0000] hover:scale-105 transition">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="mailto:info@socialbureau.in" className="inline-flex items-center justify-center w-10 h-10 rounded-full text-white hover:bg-[#ff0000] hover:scale-105 transition">
                <i className="fas fa-envelope"></i>
              </a>
              <a href="https://www.facebook.com/share/15yzVd5Qcw" className="inline-flex items-center justify-center w-10 h-10 rounded-full text-white hover:bg-[#ff0000] hover:scale-105 transition">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://www.instagram.com/socialbureau.in?igsh=NW4yd2lldzRpNXdj" className="inline-flex items-center justify-center w-10 h-10 rounded-full text-white hover:bg-[#ff0000] hover:scale-105 transition">
                <i className="fab fa-instagram"></i>
              </a>

            </div><br/>
            <p className="text-sm text-center text-gray-400">
         © 2024 SocialBureau. All rights reserved.
      </p>
          </div>
        </div>
      </div>
    </section>
  );
}
