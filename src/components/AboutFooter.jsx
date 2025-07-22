import React from "react";

export default function AboutFooter() {
  return (
    <section className="max-w-xl mx-auto py-20 px-6 pb-50">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4">
        Let’s Build a System That Wins.
      </h1>
      <p className="mb-8 text-base sm:text-lg">
        Join us in creating a winning marketing ecosystem tailored to your unique business needs.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <a
          href="tel:+916238422887"
          className="hover:bg-black hover:text-white border hover:border-white font-medium px-6 py-3 rounded-sm transition-colors bg-[#ff0000] text-black border-black"
        >
          Meet the Team
        </a>
        <a
          href="tel:+916238422887"
          className="bg-white text-black font-medium px-6 py-3 rounded-sm border border-gray-300 transition-colors hover:bg-[#ff0000] hover:border-[#ff0000]"
        >
          Schedule a Discovery Call
        </a>
      </div>
    </section>
  );
}
