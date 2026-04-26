import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";

const GlobalCursor = () => {
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Ultra-refined spring physics for that "Apple-like" smoothness
  const springConfig = { stiffness: 800, damping: 40, mass: 0.2 };
  const ringSpringConfig = { stiffness: 400, damping: 30, mass: 0.5 };

  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);
  
  const ringX = useSpring(mouseX, ringSpringConfig);
  const ringY = useSpring(mouseY, ringSpringConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isVisible) setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isClickable = 
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.getAttribute("role") === "button";
      
      setIsPointer(isClickable);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-[999999]">
      <style>{`
        @media (min-width: 1024px) {
          *, a, button, [role="button"] {
            cursor: none !important;
          }
        }
      `}</style>

      <AnimatePresence>
        {isVisible && (
          <>
            {/* Trailing Ring - Uses mix-blend-mode for premium look */}
            <motion.div
              className="fixed top-0 left-0 rounded-full border border-[#E8001A] z-[99] mix-blend-difference"
              animate={{ 
                width: isPointer ? 80 : 40,
                height: isPointer ? 80 : 40,
                scale: isClicked ? 0.8 : 1,
                opacity: 1,
                backgroundColor: isPointer ? "rgba(232, 0, 26, 0.1)" : "rgba(232, 0, 26, 0)",
                borderWidth: isPointer ? "1px" : "2px",
              }}
              style={{
                x: ringX,
                y: ringY,
                translateX: "-50%",
                translateY: "-50%",
              }}
            />

            {/* Main Dot */}
            <motion.div
              className="fixed top-0 left-0 w-2.5 h-2.5 bg-white rounded-full z-[100] mix-blend-difference"
              animate={{ 
                scale: isPointer ? 0 : 1, 
                opacity: isVisible ? 1 : 0 
              }}
              style={{
                x: cursorX,
                y: cursorY,
                translateX: "-50%",
                translateY: "-50%",
              }}
            />

            {/* Secondary Glow (Red Brand Color) */}
            <motion.div
              className="fixed top-0 left-0 w-4 h-4 bg-[#E8001A] rounded-full z-[101] opacity-40 blur-[2px]"
              animate={{ 
                scale: isPointer ? 1.5 : 1,
                opacity: isClicked ? 0.8 : 0.4
              }}
              style={{
                x: cursorX,
                y: cursorY,
                translateX: "-50%",
                translateY: "-50%",
              }}
            />

            {/* Click Ripple Effect */}
            <AnimatePresence>
              {isClicked && (
                <motion.div
                  className="fixed top-0 left-0 w-2 h-2 border-2 border-white rounded-full z-[102] mix-blend-difference"
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ scale: 15, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: "-50%",
                    translateY: "-50%",
                  }}
                />
              )}
            </AnimatePresence>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GlobalCursor;

