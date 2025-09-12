import React, { useEffect, useRef, useState } from "react";

export function CyberBackground({
  src = "/assets/logo.webp",
  alt = "glowy",
  bgVideo = "/assets/bg.mp4",
}) {
  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const cursorRef = useRef(null);
  const videoRef = useRef(null);

  const [pos, setPos] = useState({ x: -1000, y: -1000 });
  const [isHovering, setIsHovering] = useState(false);
  const [visibleOpacity, setVisibleOpacity] = useState(0.06);
  const [videoOpacity, setVideoOpacity] = useState(0);

  // smooth cursor movement
  useEffect(() => {
    let raf = null;
    const follow = () => {
      if (!cursorRef.current) return;
      const cx = parseFloat(cursorRef.current.dataset.tx || pos.x);
      const cy = parseFloat(cursorRef.current.dataset.ty || pos.y);

      const lerp = (a, b, t) => a + (b - a) * t;
      const curX = parseFloat(cursorRef.current.style.left || cx) || 0;
      const curY = parseFloat(cursorRef.current.style.top || cy) || 0;

      const nx = lerp(curX, pos.x - 12, 0.2);
      const ny = lerp(curY, pos.y - 12, 0.2);

      cursorRef.current.style.left = nx + "px";
      cursorRef.current.style.top = ny + "px";
      cursorRef.current.dataset.tx = pos.x;
      cursorRef.current.dataset.ty = pos.y;
      raf = requestAnimationFrame(follow);
    };
    raf = requestAnimationFrame(follow);
    return () => cancelAnimationFrame(raf);
  }, [pos]);

  // mouse/touch handlers
  useEffect(() => {
    const cont = containerRef.current;
    if (!cont) return;

    const onMove = (e) => {
      const x = e.clientX ?? (e.touches && e.touches[0].clientX) ?? pos.x;
      const y = e.clientY ?? (e.touches && e.touches[0].clientY) ?? pos.y;
      setPos({ x, y });

      if (!imgRef.current) return;
      const r = imgRef.current.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const reach = Math.max(120, Math.min(window.innerWidth, 260));
      const pct = 1 - Math.min(dist / reach, 1);

      const minOpacity = 0.06;
      const maxOpacity = 1;
      const o = minOpacity + (maxOpacity - minOpacity) * pct;
      setVisibleOpacity(Number(o.toFixed(3)));

      // background video reveal
      const bgPct = Math.min(1, pct * 1.2);
      setVideoOpacity(bgPct);

      setIsHovering(dist < reach * 0.9);

      // play video if visible
      if (videoRef.current) {
        if (bgPct > 0.05 && videoRef.current.paused) {
          videoRef.current.play().catch(() => {});
        }
      }
    };

    const onLeave = () => {
      setPos({ x: -1000, y: -1000 });
      setVisibleOpacity(0.06);
      setVideoOpacity(0);
      setIsHovering(false);

      if (videoRef.current) {
        videoRef.current.pause();
      }
    };

    cont.addEventListener("mousemove", onMove);
    cont.addEventListener("touchmove", onMove, { passive: true });
    cont.addEventListener("mouseleave", onLeave);
    cont.addEventListener("touchend", onLeave);

    return () => {
      cont.removeEventListener("mousemove", onMove);
      cont.removeEventListener("touchmove", onMove);
      cont.removeEventListener("mouseleave", onLeave);
      cont.removeEventListener("touchend", onLeave);
    };
  }, [pos]);

  // hide native cursor
  useEffect(() => {
    const mq = window.matchMedia("(pointer:fine)");
    const cont = containerRef.current;
    if (!cont) return;
    cont.style.cursor = mq.matches ? "none" : "auto";
  }, []);

  return (
    <div
  ref={containerRef}
  className="h-screen w-full bg-black flex items-center justify-center relative overflow-hidden"
>

      {/* Background video */}
      <video
        ref={videoRef}
        src={bgVideo}
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ opacity: videoOpacity, transition: "opacity 0.3s ease-out" }}
      />

      {/* Center image */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className="max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl transition-opacity duration-200 ease-out pointer-events-none select-none relative z-10"
        style={{ opacity: visibleOpacity }}
      />

      {/* Glow cursor */}
      <div
        ref={cursorRef}
        aria-hidden
        className="hidden md:block pointer-events-none fixed rounded-full z-[9999]"
        style={{
          left: -1000,
          top: -1000,
          width: 0,
          height: 0,
          boxShadow: isHovering
            ? "0 0 120px 50px rgba(255,0,0,0.45), 0 0 200px 100px rgba(255,0,0,0.2)"
            : "0 0 60px 20px rgba(255,0,0,0.2)",
          transition: "box-shadow .2s ease",
        }}
      />

      {/* Mobile tap button
      <button
        onTouchStart={(e) => {
          const t = e.touches && e.touches[0];
          if (!t) return;
          setPos({ x: t.clientX, y: t.clientY });
          setVisibleOpacity(1);
          setVideoOpacity(1);
          setIsHovering(true);
          if (videoRef.current) videoRef.current.play().catch(() => {});
        }}
        onTouchEnd={() => {
          setTimeout(() => {
            setVisibleOpacity(0.06);
            setVideoOpacity(0);
            setIsHovering(false);
            if (videoRef.current) videoRef.current.pause();
          }, 700);
        }}
        className="md:hidden absolute bottom-6 left-1/2 -translate-x-1/2 bg-transparent border px-3 py-2 rounded-full text-sm text-red-300"
      >
        
      </button> */}
    </div>
  );
}
