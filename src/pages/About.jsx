import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import WhoWeAre from '../components/About/AboutSB'
import AboutCoreValues from '../components/About/AboutCoreValues'
import { AboutCompany } from '../components/About/AboutCompany'
import AboutMission from '../components/About/AboutTagline'
import AboutVision from '../components/About/AboutVision'
import AboutFooter from '../components/About/AboutFooter'
import Seo from '../components/Seo'
import TreasureHuntDiamond from '../components/TreasureHuntDiamond'

const sections = [
  { id: "who-we-are", component: WhoWeAre, direction: "up" },
  { id: "mission", component: AboutMission, direction: "left" },
  { id: "vision", component: AboutVision, direction: "right" },
  { id: "company", component: AboutCompany, direction: "up" },
  { id: "core-values", component: AboutCoreValues, direction: "left" },
  { id: "footer", component: AboutFooter, direction: "right" },
];

const getInitial = (direction, isMobile) => {
  // On mobile, use simpler fade+slide only — no rotate/scale
  // This removes GPU load during scroll, eliminating lag
  if (isMobile) {
    switch (direction) {
      case "left":
        return { opacity: 0, x: -30 };
      case "right":
        return { opacity: 0, x: 30 };
      case "up":
      default:
        return { opacity: 0, y: 40 };
    }
  }

  // Desktop: full cinematic animation
  const slideX = 200;
  const slideY = 150;
  switch (direction) {
    case "left":
      return { opacity: 0, x: -slideX, rotate: 1, scale: 0.93 };
    case "right":
      return { opacity: 0, x: slideX, rotate: -1, scale: 0.93 };
    case "up":
    default:
      return { opacity: 0, y: slideY, scale: 0.95 };
  }
};

const getAnimate = { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 };

export const About = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Lenis smooth scroll — initialised here so it covers the entire About page
  useEffect(() => {
    let lenis;
    let raf;

    const initLenis = async () => {
      try {
        const LenisModule = await import("lenis");
        const Lenis = LenisModule.default || LenisModule;

        lenis = new Lenis({
          duration: 1.2, // scroll easing duration (seconds)
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo ease
          orientation: "vertical",
          gestureOrientation: "vertical",
          smoothWheel: true, // smooth on desktop mousewheel
          smoothTouch: true, // smooth on mobile touch — KEY for no lag
          touchMultiplier: 1.5, // natural-feeling touch speed
          infinite: false,
        });

        const loop = (time) => {
          lenis.raf(time);
          raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
      } catch (e) {
        // Lenis not installed — fall back to native smooth scroll
        document.documentElement.style.scrollBehavior = "smooth";
      }
    };

    initLenis();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (lenis) lenis.destroy();
    };
  }, []);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", overflowX: "clip" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,400;0,14..32,500;0,14..32,600;0,14..32,700;0,14..32,800;0,14..32,900;1,14..32,400;1,14..32,500&display=swap');

        *, *::before, *::after {
          -webkit-tap-highlight-color: transparent;
          font-family: 'Inter', sans-serif !important;
        }

        html, body {
          font-family: 'Inter', sans-serif;
          overscroll-behavior-y: none;
        }

        .about-card:first-child { border-radius: 0; margin-top: 0; }
        .about-card:first-child .card-inner {
          border-top-left-radius: 0;
          border-top-right-radius: 0;
          box-shadow: none !important;
        }

        /* GPU-composited layers for mobile — prevents layout recalc during scroll */
        @media (max-width: 767px) {
          .about-card {
            contain: layout style;
            transform: translateZ(0);
            -webkit-transform: translateZ(0);
          }
          .card-inner {
            transform: translateZ(0);
            -webkit-transform: translateZ(0);
          }
        }
      `}</style>
      <Seo
        title="About Us | API-First Digital Marketing Agency"
        description="Discover our API-first digital marketing agency built on data, innovation, and measurable growth to help modern brands scale sustainably."
        keywords="api marketing agency, marketing automation api, digital marketing agency india, performance marketing company, niche marketing services, content marketing experts, adtech automation, api-based advertising, ai marketing agency, socialbureau, trillionedition llp, data-driven marketing company, PERFORMANCE MARKETING AGENCY IN KOCHI, API MARKETING AGENCY IN KOCHI, NICHE MARKETING AGENCY, ADTECH AGENCY IN KOCHI, CONTENT MARKETING AGENCY IN KOCHI, "
        canonicalUrl="https://www.socialbureau.in/about"
        url="https://www.socialbureau.in/about"
      />

      {sections.map((section, index) => {
        const Component = section.component;
        const isFirst = index === 0;

        return (
          <motion.div
            key={section.id}
            initial={
              isFirst ? { opacity: 1 } : getInitial(section.direction, isMobile)
            }
            whileInView={getAnimate}
            viewport={{ once: true, amount: 0.03 }}
            transition={{
              duration: isMobile ? 0.5 : 1,
              ease: isMobile ? [0.25, 0.1, 0.25, 1] : [0.16, 1, 0.3, 1],
            }}
            className="about-card"
            style={{
              position: "relative",
              zIndex: index + 1,
              marginTop: isFirst ? 0 : isMobile ? "-1.5rem" : "-3rem",
            }}
          >
            <div
              className={`card-inner ${isFirst ? "" : "overflow-hidden"}`}
              style={{
                borderTopLeftRadius: isFirst
                  ? 0
                  : isMobile
                    ? "1.5rem"
                    : "2.5rem",
                borderTopRightRadius: isFirst
                  ? 0
                  : isMobile
                    ? "1.5rem"
                    : "2.5rem",
                boxShadow: isFirst
                  ? "none"
                  : isMobile
                    ? "0 -15px 40px -8px rgba(0,0,0,0.3), 0 -3px 12px -3px rgba(0,0,0,0.15)"
                    : "0 -30px 80px -10px rgba(0,0,0,0.35), 0 -5px 20px -5px rgba(0,0,0,0.2)",
              }}
            >
              <Component />
            </div>
          </motion.div>
        );
      })}
      <TreasureHuntDiamond 
        stepRequired={1} 
        clueText="Heroes rarely work alone. Find the minds that make the magic happen." 
      />
    </div>
  );
};

