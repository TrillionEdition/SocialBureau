import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ApiMarketing from "../components/Home/ApiMarketing";
import ServicesGrid from "../components/Home/ServicesGrid";
import WebSection from "../components/Home/WebSection";
import CareerSection from "../components/Home/CareerSection";
import PartnershipTeamGrid, { PartnershipSection, TeamSection } from "../components/Home/PartnershipNTeam";
import TestimonialsSection from "../components/Home/TestimonialsSection";
import FAQSection from "../components/Home/FAQSection";
import AppleSection from "../components/Home/EntertainmentGrid";
import { Googlereview } from "../components/Googlereview";

const SectionWrapper = ({ children, index, total, scrollYProgress }) => {
  const start = index / total;
  const end = (index + 1) / total;

  const scale = useTransform(scrollYProgress, [start, end], [1, 0.98]);

  return (
    <div className="sticky top-0 h-screen w-full overflow-hidden">
      <motion.div
        style={{
          scale,
          zIndex: total - index
        }}
        className="relative w-full h-full bg-white origin-top"
      >
        {children}
      </motion.div>
    </div>
  );
};

export const Home = () => {
  const container = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Sections before the sticky stack
  const beforeSections = [
    { component: <ApiMarketing /> },
    { component: <ServicesGrid /> },
  ];

  // Sticky Stack Sections (Only stack things that are truly full-screen)
  const stackedSections = [
    { component: <WebSection /> },
    { component: <CareerSection /> },
  ];

  // Logic for Partnership and Team based on screen size
  const laptopStack = [
    { component: <PartnershipTeamGrid /> }
  ];

  // Normal scroll sections after the stack
  const afterSections = [
    { component: <TestimonialsSection /> },
    { component: <Googlereview /> },
    { component: <FAQSection /> },
  ];

  // On Mobile, we move Partnership and Team to the "after" section so they scroll normally 
  // and don't create "blank" screen gaps from h-screen stacking.
  const finalAfterSections = isMobile
    ? [{ component: <PartnershipSection /> }, { component: <TeamSection /> }, ...afterSections]
    : afterSections;

  const finalStackedSections = isMobile
    ? stackedSections
    : [...stackedSections, ...laptopStack];

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <>
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <main className="relative bg-white">
        {/* Sections Before Stack */}
        {beforeSections.map((section, i) => (
          <div key={`before-${i}`} className="relative w-full">
            {section.component}
          </div>
        ))}

        {/* Sticky Stacked Group */}
        <div
          ref={container}
          style={{ height: `${finalStackedSections.length * 100}vh` }}
          className="relative w-full"
        >
          {finalStackedSections.map((section, i) => (
            <SectionWrapper
              key={`stacked-${i}`}
              index={i}
              total={finalStackedSections.length}
              scrollYProgress={scrollYProgress}
            >
              {section.component}
            </SectionWrapper>
          ))}
        </div>

        {/* Normal Scrolling Sections */}
        {finalAfterSections.map((section, i) => (
          <div key={`after-${i}`} className="relative w-full overflow-hidden">
            {section.component}
          </div>
        ))}
      </main>
    </>
  );
};