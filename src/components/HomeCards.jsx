import React, { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const cards = [
  { title: "Full-Funnel Performance Marketing", color: "#ff0000", textColor: "#fff" },
  { title: "API-Driven Growth Loops", color: "#fff", textColor: "#111" },
  { title: "Vertical-Specific Strategy", color: "#ff0000", textColor: "#fff" },
  { title: "Advanced CRO & Lifecycle Systems", color: "#fff", textColor: "#111" },
  { title: "Lifecycle Automation", color: "#fff", textColor: "#111" },
];

export default function GridScrollCards() {
  const [hoveredIndex, setHoveredIndex] = useState(null);


  return (
    <div className="scroll-root bg-black min-h-screen flex items-center justify-center px-4 py-10">
      <style>{`
        .grid-layout {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-areas:
    "card0 . card1 . card2"
    ". card3 . card4 .";
  align-items: center;
  justify-items: center;
}

        @media (max-width: 800px) {
          .grid-layout {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
          }

          .center-text {
            order: -1;
            padding: 2rem;
          }
        }
          @keyframes rotate-center {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.animate-rotate-center {
  animation: rotate-center 8s linear infinite;
  transform-origin: center;
}

      `}</style>

      <div className="grid-layout">
  <FloatingCard card={cards[0]} index={0} delay={0}
    gridArea="card0"
    isHovered={hoveredIndex === 0}
    dimOthers={hoveredIndex !== null && hoveredIndex !== 0}
    onHover={() => setHoveredIndex(0)}
    onLeave={() => setHoveredIndex(null)} />

  <FloatingCard card={cards[1]} index={1} delay={0.2}
    gridArea="card1"
    isHovered={hoveredIndex === 1}
    dimOthers={hoveredIndex !== null && hoveredIndex !== 1}
    onHover={() => setHoveredIndex(1)}
    onLeave={() => setHoveredIndex(null)} />

  <FloatingCard card={cards[2]} index={2} delay={0.4}
    gridArea="card2"
    isHovered={hoveredIndex === 2}
    dimOthers={hoveredIndex !== null && hoveredIndex !== 2}
    onHover={() => setHoveredIndex(2)}
    onLeave={() => setHoveredIndex(null)} />

  <FloatingCard card={cards[3]} index={3} delay={0.6}
    gridArea="card3"
    isHovered={hoveredIndex === 3}
    dimOthers={hoveredIndex !== null && hoveredIndex !== 3}
    onHover={() => setHoveredIndex(3)}
    onLeave={() => setHoveredIndex(null)} />

  <FloatingCard card={cards[4]} index={4} delay={0.8}
    gridArea="card4"
    isHovered={hoveredIndex === 4}
    dimOthers={hoveredIndex !== null && hoveredIndex !== 4}
    onHover={() => setHoveredIndex(4)}
    onLeave={() => setHoveredIndex(null)} />
</div>

    </div>
  );
}

function FloatingCard({
  card,
  delay = 0,
  index,
  gridArea,
  isHovered,
  dimOthers,
  onHover,
  onLeave,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };
  handleResize();
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);
  const commonStyles = {
    // border: `2px solid ${card.color}`,
    color: isMobile ? card.textColor : isHovered ? card.textColor :"white",
    padding: "2rem",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    filter: dimOthers ? "blur(2px) brightness(60%)" : "none",
    transform: isHovered ? "scale(1.2)" : "scale(1)",
    zIndex: isHovered ? 10 : 1,
    cursor: "pointer",
    transition: "all 0.3s ease-in-out",
    background: isMobile ? card.color : isHovered ? card.color : "transparent",
  };

  const variants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay,
        ease: "easeOut",
      },
    },
  };

  return (
    <div
  ref={ref}
  onMouseEnter={onHover}
  onMouseLeave={onLeave}
  style={{ gridArea, position: "relative" }}
  className="relative flex items-center justify-center text-xl lg:text-2xl h-[18vw] w-[80vw] sm:w-[60vw] lg:max-w-[18vw] rounded-full"
>

  {/* Card content */}
  <motion.div
    className="w-full h-full rounded-full flex items-center justify-center"
    style={commonStyles}
    variants={variants}
    initial="hidden"
    animate={inView ? "visible" : "hidden"}
  >
    <svg
  className="absolute w-full h-full animate-rotate-center"
  viewBox="0 0 100 100"
  xmlns="http://www.w3.org/2000/svg"
>
  <circle
    cx="50"
    cy="50"
    r="45"
    fill="none"
    stroke={card.color}
    strokeWidth="1"
    strokeLinecap="round"
    strokeDasharray="80,10" // 2 segments and gaps
  />
</svg>

    {card.title}
  </motion.div>
</div>
 
  );
}
