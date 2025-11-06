import React, { useState } from "react";

export default function HomeServices() {
  const styles = {
    teal: { gradient: 'from-teal-900 to-teal-500', inner: 'from-black to-teal-700' },
    purple: { gradient: 'from-purple-900 to-purple-500', inner: 'from-black to-purple-700' },
    amber: { gradient: 'from-amber-900 to-amber-500', inner: 'from-black to-amber-700' },
    indigo: { gradient: 'from-indigo-900 to-indigo-500', inner: 'from-black to-indigo-700' },
    rose: { gradient: 'from-rose-900 to-rose-500', inner: 'from-black to-rose-700' },
  };
  const textColors = {
    teal: 'text-teal-200',
    purple: 'text-purple-200',
    amber: 'text-amber-200',
    indigo: 'text-indigo-200',
    rose: 'text-rose-200'
  };
const badges = [
  {
    icon: "fas fa-sitemap",
    text: "API Marketing",
    color: "purple",
    description: "Integrate your ad platforms and automate campaign delivery through advanced APIs."
  },
  
  {
    icon: "fas fa-bullseye",
    text: "Niche Marketing",
    color: "amber",
    description: "Hyper-targeted campaigns tailored for specific industries and audiences."
  },
  {
    icon: "fas fa-comments",
    text: "Content Marketing",
    color: "indigo",
    description: "Data-backed storytelling that increases brand awareness and engagement."
  },
  {
    icon: "fas fa-globe",
    text: "AdTech Integration",
    color: "rose",
    description: "Seamless connection between social, analytics, and CRM platforms."
  },
  {
    icon: "fas fa-chart-line",
    text: "Performance Marketing",
    color: "teal",
    description: "ROI-driven strategies to boost leads, sales, and visibility."
  },
];
const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
   <>
      <div className="my-10 md:h-[70vh] bg-black flex flex-col md:flex-row items-center md:items-start justify-center p-4 sm:p-6 md:p-8">
  <div className="px-6 lg:px-40 text-white text-center items-center">
          <p className="text-xl sm:text-xl md:text-2xl lg:text-2xl leading-relaxed text-center items-center">
            At &nbsp;
            <span style={{ fontFamily: "MyFont, sans-serif" }}>
              Social<span className="text-[#ff0000]">B</span>ureau
            </span>
            &nbsp; our core services include:
            <br /><br />
          </p>
        </div>

        <div className="md:w-full max-w-6xl">
         <div className="md:w-1/2 max-w-lg flex flex-col gap-4">
  {badges.map((badge, idx) => {
    const c = styles[badge.color];

    return (
      <div
        key={idx}
        className="
          group relative
          p-[2px] rounded-full bg-black
          transition-transform duration-300 hover:scale-105
          w-full          /* ✅ ALWAYS full width in desktop */
        "
      >
        <button
          onClick={() => handleToggle(idx)}
          className={`
            bg-gradient-to-r ${c.inner}
            rounded-full px-6 py-3
            flex items-center justify-start gap-2
            transition-all duration-300
            w-full               /* ✅ full width badge */
          `}
        >
          <span className={`text-xl ${badge.icon} ${textColors[badge.color]}`} />
          <span className={`font-medium ${textColors[badge.color]}`}>
            {badge.text}
          </span>
        </button>

        <div
          className={`
            overflow-hidden transition-all duration-300
            pt-2 px-4 text-gray-300 text-sm

            sm:group-hover:max-h-40 sm:group-hover:opacity-100
            ${openIndex === idx ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}
          `}
        >
          {badge.description}
        </div>
      </div>
    );
  })}
</div>

        </div>
      </div>
    </>
  );
}