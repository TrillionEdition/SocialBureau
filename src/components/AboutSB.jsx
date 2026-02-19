import React, { useEffect, useRef } from "react";

function randBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const AboutSB = () => {
  const heroText =
    "At SocialBureau, we don't just build marketing campaigns, we architect high-performance ecosystems. Operating under the strategic umbrella of Trillion Edition, we fuse analytical muscle with cultural nuance to drive real outcomes for niche, high-growth brands.";

  const words = heroText.match(/[\w''-]+|[.,—]/g);
  const refs = useRef([]);

  useEffect(() => {
    refs.current.forEach((span, i) => {
      if (span) {
        const x = randBetween(-100, 100);
        const y = randBetween(-60, 60);
        span.style.transform = `translate(${x}px, ${y}px) scale(0.8)`;
        span.style.opacity = 0;

        setTimeout(() => {
          span.style.transition =
            "transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.7s ease-out";
          span.style.transform = "translate(0, 0) scale(1)";
          span.style.opacity = 1;
        }, 200 + i * 30);
      }
    });
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden flex items-center justify-center">
      <style>{`
        @keyframes pulse-bg {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.1);
          }
        }

        .about-bg-animate {
          animation: pulse-bg 8s ease-in-out infinite;
        }

        .accent-line-gradient {
          background: linear-gradient(90deg, transparent, #ff0000, transparent);
        }

        .word-span {
          display: inline-block;
          opacity: 0;
          will-change: transform, opacity;
        }

        .about-heading-style {
          font-size: clamp(2rem, 6vw, 4rem);
          font-weight: 900;
          letter-spacing: -0.02em;
          line-height: 1.1;
          text-transform: uppercase;
        }

        .about-description-style {
          font-size: clamp(1rem, 2.5vw, 1.25rem);
          line-height: 1.6;
          letter-spacing: 0.3px;
          font-weight: 400;
        }

        @media (max-width: 768px) {
          .about-heading-style {
            font-size: 2rem;
          }

          .about-description-style {
            font-size: 1rem;
          }
        }

        @media (max-width: 480px) {
          .about-heading-style {
            font-size: 1.5rem;
          }

          .about-description-style {
            font-size: 0.95rem;
            line-height: 1.4;
            letter-spacing: 0.2px;
          }
        }
      `}</style>

      {/* Animated background */}
      <div className="absolute inset-0 z-0 about-bg-animate">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/5 via-transparent to-black pointer-events-none" />
      </div>

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px accent-line-gradient opacity-50 z-10" />

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px accent-line-gradient opacity-50 z-10" />

      {/* Content */}
      <div className="relative z-20 w-full h-full flex items-center justify-center p-5 sm:p-10">
        <div className="text-center max-w-4xl w-full">
          <h1 className="about-heading-style text-white mb-8 md:mb-12">
            Results-Driven
            <br />
            <span className="text-red-500 relative inline-block">
              Digital Marketing
            </span>
          </h1>

          <p className="about-description-style text-white">
            {words.map((word, idx) => {
              const isSocialBureau = word === "SocialBureau";
              return (
                <span
                  key={idx}
                  ref={(el) => (refs.current[idx] = el)}
                  className="word-span"
                  style={{
                    whiteSpace: word.match(/[.,—]/) ? "normal" : "pre",
                    marginRight: word.match(/[.,—]/) ? 0 : 4,
                  }}
                >
                  {isSocialBureau ? (
                    <span className="font-bold">
                      Social<span className="text-red-500">B</span>ureau
                    </span>
                  ) : (
                    word
                  )}
                  {word.match(/[.,—]/) ? "\u00A0" : " "}
                </span>
              );
            })}
          </p>
        </div>
      </div>
    </div>
  );
};