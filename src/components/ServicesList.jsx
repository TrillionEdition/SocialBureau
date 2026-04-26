import React, { forwardRef, useEffect, useRef, useState } from "react";

const icons = [
  <i className="fas fa-chart-line text-[#ff0000] text-2xl"></i>,
  <i className="fas fa-sitemap text-[#ff0000] text-2xl"></i>,
  <i className="fas fa-bullseye text-[#ff0000] text-2xl"></i>,
  <i className="fas fa-comments text-[#ff0000] text-2xl"></i>,
  <i className="fas fa-globe text-[#ff0000] text-2xl"></i>,
  <i className="fas fa-cogs text-[#ff0000] text-2xl"></i>,
  <i className="fas fa-crosshairs text-[#ff0000] text-2xl"></i>,
  <i className="fas fa-users text-[#ff0000] text-2xl"></i>,
  <i className="fas fa-envelope text-[#ff0000] text-2xl"></i>,
  <i className="fas fa-rocket text-[#ff0000] text-2xl"></i>,
];

const cards = [
  {
    title: 'API-Driven-Growth-Automated-Distribution',
    content: 'Eliminate friction. Merge engineering + marketing for compounding growth loops.',
    },
  {
    title: 'Full-Funnel-Performance-Marketing',
    content: 'Click costs don\'t matter if they don\'t convert. We deploy vertical-informed models and 14-day sprint cycles tied to LTV, not vanity ROAS.',
    },
  {
    title: 'Funnel-Architecture-Growth-Pathways',
    content: 'Stop leaking revenue. We map awareness to LTV with customized, P&L-aligned blueprints.',
    },
  {
    title: 'Conversion-Rate-Optimization-Landing-Systems',
    content: 'Built with psychology, tested with micro-experiments. Bounce less. Convert more.',
    },
  {
    title: 'Messaging-Positioning-for-Niche-Brands',
    content: 'Generic messaging kills growth. We uncover category-specific codes using ethnographic and linguistic analysis.',
    },
  {
    title: 'Web-Development',
    content: 'From MVPs to scalable platforms, we design, develop, and deploy web apps that are fast, secure, and user-centric.',
    },
  {
    title: 'Niche-Market-Penetration-Strategy',
    content: 'We speak fluent healthtech, crypto, fintech, and more. Penetrate with precision.',
    },
  {
    title: 'Influencer-UGC-Growth-Engines',
    content: 'No vanity metrics. Just creator content built for performance and attribution.',
    },
  {
    title: 'Lifecycle-Email-Automation-Strategy',
    content: 'Trigger behavior-based flows that drive revenue, measured on 30-day impact.',
    },
  {
    title: 'Software-GTM-Growth-Architecture',
    content: 'PLG meets sales-assist in a system that converts trials and grows MRR.',
     }
];

function useOnScreen(ref, rootMargin = "0px") {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { rootMargin }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return isIntersecting;
}

const ServicesList = forwardRef(function ServicesList(_, ref) {
  const gridRef = useRef();
  const isVisible = useOnScreen(gridRef, "-50px");

  return (
    <section
      ref={ref}
      className="min-h-screen bg-black flex items-center justify-center"
    >
      <div
        ref={gridRef}
        className={`max-w-7xl w-full px-2 sm:px-4 slide-up${isVisible ? " visible" : ""}`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {cards.map((card, idx) => (
            <div className="p-5 py-10" tabIndex={0} key={card.title}>
              <div className="flip-inner">
                <div className="flip-front flex flex-col gap-4 p-6 sm:p-8 shadow-lg">
                  <a href={`/services/${encodeURIComponent(card.title)}`}>
                  <div className="flex items-center justify-between">                    
                    {icons[idx]}
                    <span className="text-neutral-400">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </span>
                  </div>
                  <div>
                    <h3 className="mt-2 text-base sm:text-lg font-bold text-white">
                       {card.title.replace(/-/g, " ")}
                    </h3>
                    <p className="mt-2 text-neutral-300 text-sm sm:text-base">
                       {card.content}
                    </p>
                  </div>
                  </a>
                </div>
                
              </div>
            </div>
          ))}
        </div>
      </div>      
    </section>
  );
});

export default ServicesList;

