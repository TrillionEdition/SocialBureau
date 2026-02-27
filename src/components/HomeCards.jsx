import React, { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const cards = [
  { title: "Full-Funnel Performance Marketing", color: "#ff0000", textColor: "#fff" },
  { title: "API-Driven Growth Loops", color: "#fff", textColor: "#111" },
  { title: "Vertical-Specific Strategy", color: "#ff0000", textColor: "#fff" },
  { title: "Advanced CRO & Lifecycle Systems", color: "#fff", textColor: "#111" },
  { title: "Lifecycle Automation", color: "#fff", textColor: "#111" },
];

export default function GridScrollCards() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
const navigate=useNavigate();

  return (
<div className="grid-layout w-full flex flex-wrap justify-center gap-6 sm:gap-10 p-5 py-10">
      <style>{`
      @media (max-width: 768px) {
  svg circle {
    stroke-width: 0.7;
  }
}

        .grid-layout {
          display: grid;
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
        <Link to={`Full-Funnel Performance Marketing`}>
  <FloatingCard card={cards[0]} index={0} delay={0}
    gridArea="card0"
    isHovered={hoveredIndex === 0}
    dimOthers={hoveredIndex !== null && hoveredIndex !== 0}
    onHover={() => setHoveredIndex(0)}
    onLeave={() => setHoveredIndex(null)} /></Link>

  <FloatingCard card={cards[1]} index={1} delay={0.2}
    gridArea="card1"
    isHovered={hoveredIndex === 1}
    dimOthers={hoveredIndex !== null && hoveredIndex !== 1}
    onHover={() => setHoveredIndex(1)}
    onClick={() => navigate(`API-Driven%20Growth%20%26%20Automated%20Distribution`)}
    onLeave={() => setHoveredIndex(null)} />

  <FloatingCard card={cards[2]} index={2} delay={0.4}
    gridArea="card2"
    isHovered={hoveredIndex === 2}
    dimOthers={hoveredIndex !== null && hoveredIndex !== 2}
    onHover={() => setHoveredIndex(2)}
    onClick={() => navigate(`Niche%20Market%20Penetration%20Strategy`)}
    onLeave={() => setHoveredIndex(null)} />

  <FloatingCard card={cards[3]} index={3} delay={0.6}
    gridArea="card3"
    isHovered={hoveredIndex === 3}
    dimOthers={hoveredIndex !== null && hoveredIndex !== 3}
    onClick={() => navigate(`Conversion%20Rate%20Optimization%20%26%20Landing%20Systems`)}
    onHover={() => setHoveredIndex(3)}
    onLeave={() => setHoveredIndex(null)} />

  <FloatingCard card={cards[4]} index={4} delay={0.8}
    gridArea="card4"
    isHovered={hoveredIndex === 4}
    onClick={() => navigate(`Lifecycle%20%26%20Email%20Automation%20Strategy`)}
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
  onClick
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const commonStyles = {
    color: isHovered && !isMobile ? card.textColor : "white",
    padding: "2rem",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    filter: !isMobile && dimOthers ? "blur(2px) brightness(60%)" : "none",
    transform: !isMobile && isHovered ? "scale(1.2)" : "scale(1)",
    zIndex: isHovered ? 10 : 1,
    cursor: "pointer",
    transition: "all 0.3s ease-in-out",
    border: isMobile ? "2px solid red" : "2px solid black",
    background: !isMobile && isHovered ? card.color : "transparent",
  };

  const variants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, delay, ease: "easeOut" },
    },
  };

  return (
    <div
      ref={ref}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      style={{ gridArea, position: "relative" }}
      className="relative flex items-center justify-center text-xl lg:text-2xl w-[70vw] md:w-full max-w-[100vw] aspect-square rounded-full"
    >
      <motion.div
        className="md:w-full h-full rounded-full flex items-center justify-center"
        style={commonStyles}
        variants={variants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {!isMobile && (
          <svg
            className="absolute h-full md:h-[18vw] animate-rotate-center md:w-[18vw]"
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
              strokeDasharray="80,10"
            />
          </svg>
        )}
        {card.title}
      </motion.div>
    </div>
  );
}
