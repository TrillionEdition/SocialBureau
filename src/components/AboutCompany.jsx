import React, { useEffect, useRef } from "react";

export const AboutCompany = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  const sections = [
    {
      title: "Who We Are",
      content:
        "Social Bureau is a results-driven digital marketing and branding agency dedicated to helping businesses build strong, credible, and future-ready brands. We partner with organizations to create strategic marketing solutions that enhance visibility, strengthen brand presence, and drive sustainable growth.",
      icon: "01",
    },
    {
      title: "Our Approach",
      content:
        "With a balanced approach that combines insight, creativity, and performance, we deliver end-to-end digital solutions including brand strategy, content development, social media management, and digital marketing. Every initiative is guided by clear objectives, audience understanding, and measurable outcomes.",
      icon: "02",
    },
    {
      title: "Our Philosophy",
      content:
        "At Social Bureau, we believe effective marketing is built on clarity, consistency, and trust. Our team works closely with clients to ensure their brand message is communicated with precision, professionalism, and impact across all digital platforms.",
      icon: "03",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("content-visible");
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
    <section
      ref={sectionRef}
      className="relative w-full bg-black text-white overflow-hidden"
    >
      <style>{`
        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes counter {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .accent-line-gradient {
          background: linear-gradient(90deg, transparent, #ff0000, transparent);
        }

        .section-container {
          opacity: 0;
        }

        .section-container.content-visible {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .content-block {
          opacity: 0;
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .section-container.content-visible .content-block:nth-child(1) {
          animation-delay: 0.2s;
        }

        .section-container.content-visible .content-block:nth-child(2) {
          animation-delay: 0.4s;
        }

        .section-container.content-visible .content-block:nth-child(3) {
          animation-delay: 0.6s;
        }

        .icon-number {
          font-size: clamp(2rem, 8vw, 4rem);
          font-weight: 900;
          background: linear-gradient(135deg, #ff0000, rgba(255, 0, 0, 0.5));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
        }

        .divider-line {
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 0, 0, 0.5),
            transparent
          );
        }

        .content-text {
          font-size: clamp(0.95rem, 1.5vw, 1.1rem);
          line-height: 1.8;
          letter-spacing: 0.2px;
        }

        .section-title {
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: 900;
          letter-spacing: -0.01em;
          text-transform: uppercase;
          position: relative;
          display: inline-block;
        }

        .section-title::after {
          content: "";
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 0;
          height: 3px;
          background: #ff0000;
          transition: width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .section-container.content-visible .section-title::after {
          width: 100%;
        }

        @media (max-width: 768px) {
          .content-text {
            font-size: 0.95rem;
            line-height: 1.7;
          }

          .section-title {
            font-size: 1.5rem;
          }

          .icon-number {
            font-size: 2.5rem;
          }
        }

        @media (max-width: 480px) {
          .content-text {
            font-size: 0.9rem;
            line-height: 1.6;
            letter-spacing: 0.15px;
          }

          .section-title {
            font-size: 1.2rem;
          }

          .icon-number {
            font-size: 2rem;
          }
        }
      `}</style>

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px accent-line-gradient opacity-50 z-10" />

      {/* Content */}
      <div
        ref={contentRef}
        className="section-container relative z-20 max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-32"
      >
        <div className="space-y-20 md:space-y-32">
          {sections.map((section, idx) => (
            <div key={idx} className="content-block">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
                {/* Icon/Number */}
                <div className="md:col-span-2 flex items-start justify-start md:justify-center">
                  <div className="icon-number">{section.icon}</div>
                </div>

                {/* Content */}
                <div className="md:col-span-10 space-y-4">
                  <h2 className="section-title">{section.title}</h2>
                  <p className="content-text text-gray-300 leading-relaxed">
                    {section.content}
                  </p>
                  <div className="divider-line w-12 h-px mt-6" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px accent-line-gradient opacity-50 z-10" />
    </section>
  );
};