import React, { useEffect, useRef } from "react";

const AboutCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  const mouse = useRef({ x: 0, y: 0 });
  const followerPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Hide default cursor on body
    document.body.classList.add("cursor-none");

    const moveCursor = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    let animId;
    const animateFollower = () => {
      const { x, y } = followerPos.current;
      const dx = mouse.current.x - x;
      const dy = mouse.current.y - y;

      followerPos.current.x += dx * 0.15;
      followerPos.current.y += dy * 0.15;

      if (followerRef.current) {
        followerRef.current.style.left = `${followerPos.current.x}px`;
        followerRef.current.style.top = `${followerPos.current.y}px`;
      }
      animId = requestAnimationFrame(animateFollower);
    };

    window.addEventListener("mousemove", moveCursor);
    animId = requestAnimationFrame(animateFollower);

    followerPos.current = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };

    // Media query to disable the cursor on mobile devices
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const handleMediaQueryChange = (e) => {
      if (e.matches) {
        // Mobile view, remove custom cursor
        document.body.classList.remove("cursor-none");
        if (cursorRef.current) cursorRef.current.style.display = "none";
        if (followerRef.current) followerRef.current.style.display = "none";
      } else {
        // Desktop view, add custom cursor
        document.body.classList.add("cursor-none");
        if (cursorRef.current) cursorRef.current.style.display = "block";
        if (followerRef.current) followerRef.current.style.display = "block";
      }
    };

    // Initial check and add listener
    handleMediaQueryChange(mediaQuery);
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      cancelAnimationFrame(animId);
      document.body.classList.remove("cursor-none");
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        style={{
          pointerEvents: "none",
          zIndex: 9999,
          position: "fixed",
          width: 20,
          height: 20,
          background: "#ff0000",
          borderRadius: "50%",
          transition: "transform 0.1s ease, background 0.2s",
          boxShadow: "0 0 20px #ff0000",
          left: 0,
          top: 0,
          transform: "translate(-50%, -50%) scale(1)",
        }}
        className="pointer-events-none"
      />
      <div
        ref={followerRef}
        className="pointer-events-none"
        style={{
          pointerEvents: "none",
          zIndex: 9998,
          position: "fixed",
          width: 40,
          height: 40,
          borderRadius: "50%",
          opacity: 0.3,
          filter: "blur(15px)",
          transition: "transform 0.1s ease, background 0.2s",
          left: 0,
          top: 0,
          transform: "translate(-50%, -50%)",
        }}
      />
    </>
  );
};

export default AboutCursor;