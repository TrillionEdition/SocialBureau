// import React from "react";

// export default function AboutFooter() {
//   return (
//     <section className="max-w-xl mx-auto py-20 px-6 pb-50">
//       <h1 className="text-3xl sm:text-4xl font-bold mb-4">
//         Let’s Build a System That Wins.
//       </h1>
//       <p className="mb-8 text-base sm:text-lg">
//         Join us in creating a winning marketing ecosystem tailored to your unique business needs.
//       </p>
//       <div className="flex flex-col sm:flex-row gap-4">
//         <a
//           href="/our-team"
//           className="hover:bg-black hover:text-white border hover:border-white font-medium px-6 py-3 rounded-sm transition-colors bg-[#ff0000] text-black border-black"
//         >
//           Meet the Team
//         </a>
//         <a
//           href="tel:+918714952665"
//           className="bg-white text-black font-medium px-6 py-3 rounded-sm border border-gray-300 transition-colors hover:bg-[#ff0000] hover:border-[#ff0000]"
//         >
//           Schedule a Discovery Call
//         </a>
//       </div>
//     </section>
//   );
// }


import React, { useEffect, useRef } from "react";

export default function AboutFooter() {
  const contentRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
          }
        });
      },
      { threshold: 0.2 }
    );

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-black text-white py-24 md:py-40 px-4 md:px-8 border-t border-red-950 border-opacity-30 relative overflow-hidden">
      <style>{`
        .accent-line-gradient {
          background: linear-gradient(90deg, transparent, #ff0000, transparent);
        }

        .footer-content {
          opacity: 0;
          transform: translateY(40px);
          transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .footer-content.fade-in {
          opacity: 1;
          transform: translateY(0);
        }

        .footer-bg-accent {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at 50% 50%,
            rgba(255, 0, 0, 0.05) 0%,
            transparent 70%
          );
          pointer-events: none;
        }

        .cta-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 1rem 2.5rem;
          font-size: 0.95rem;
          font-weight: 700;
          letter-spacing: 0.5px;
          border-radius: 0.375rem;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          cursor: pointer;
          border: 2px solid;
          text-transform: uppercase;
          position: relative;
          overflow: hidden;
          white-space: nowrap;
        }

        .cta-button::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #ff0000;
          transform: translateX(-100%);
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          z-index: -1;
        }

        .cta-primary {
          background: #ff0000;
          color: #000000;
          border-color: #ff0000;
        }

        .cta-primary::before {
          background: #ff5555;
        }

        .cta-primary:hover {
          color: #ffffff;
          border-color: #ffffff;
          transform: translateY(-3px);
          box-shadow: 0 16px 32px rgba(255, 0, 0, 0.35);
        }

        .cta-secondary {
          background: transparent;
          color: #ffffff;
          border-color: rgba(255, 255, 255, 0.4);
        }

        .cta-secondary::before {
          background: #ff0000;
          transform: translateX(0);
          z-index: 0;
        }

        .cta-secondary span {
          position: relative;
          z-index: 1;
          transition: color 0.3s ease;
        }

        .cta-secondary:hover {
          border-color: #ff0000;
          transform: translateY(-3px);
          box-shadow: 0 16px 32px rgba(255, 0, 0, 0.25);
        }

        .cta-secondary:hover span {
          color: #000000;
        }

        @media (max-width: 768px) {
          .cta-button {
            width: 100%;
            padding: 0.875rem 2rem;
            font-size: 0.9rem;
          }
        }

        @media (max-width: 480px) {
          .cta-button {
            padding: 0.75rem 1.5rem;
            font-size: 0.85rem;
          }
        }
      `}</style>

      {/* Background accent */}
      <div className="footer-bg-accent" />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px accent-line-gradient opacity-50" />

      <div className="max-w-3xl mx-auto relative z-10">
        <div className="footer-content text-center" ref={contentRef}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 md:mb-8 uppercase tracking-tight leading-tight">
            Ready to Transform
            <br />
            <span className="text-red-500">Your Brand?</span>
          </h2>

          <p className="text-base md:text-lg text-gray-300 mb-10 md:mb-12 leading-relaxed max-w-2xl mx-auto">
            Let's partner to create a winning marketing ecosystem tailored to
            your unique business needs. We're ready to drive results.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/our-team" className="cta-button cta-primary">
              Meet the Team
            </a>
            <a href="tel:+918714952665" className="cta-button cta-secondary">
              <span>Schedule a Discovery Call</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

