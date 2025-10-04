import React, { useRef, useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const videosList = [
  {
    id: "1",
    thumbnail: "https://suntipstea.online/wp-content/uploads/2024/11/suntip-logo-white-673633bc349a1-scaled-e1731606777757.webp",
    title: "Suntips",
    logo:"https://suntipstea.online/wp-content/uploads/2024/11/suntip-logo-white-673633bc349a1-scaled-e1731606777757.webp",
    description: "Heritage teas, pure flavour, trusted since 1948.",
    link: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
  },
  {
    id: "2",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Reporter_TV_2023.jpg/250px-Reporter_TV_2023.jpg",
    title: "Reporter",
    logo:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Reporter_TV_2023.jpg/250px-Reporter_TV_2023.jpg",
    description: "Kerala’s 24-hour Malayalam news channel leader.",
    link: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
  },
  {
    id: "5",
    thumbnail: "https://www.newstamil.tv/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmain-logo.ae4ceeb6.png&w=640&q=75",
    title: "News Tamil",
    logo:"https://www.newstamil.tv/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmain-logo.ae4ceeb6.png&w=640&q=75",
    description: "Tamil-language news channel based in Chennai.",
    link: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
  },
  {
    id: "3",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Big_TV_Logo.jpg/1200px-Big_TV_Logo.jpg",
    title: "Big TV",
    logo:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Big_TV_Logo.jpg/1200px-Big_TV_Logo.jpg",
    description: "Technology first 24/7 LIVE Telugu satellite news channel",
    link: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
  },
  {
    id: "4",
    thumbnail: "https://emaraj.com/wp-content/uploads/2024/04/EMARAJ-LOGO-2048x834.png",
    title: "Emaraj",
    logo:"https://emaraj.com/wp-content/uploads/2024/04/EMARAJ-LOGO-2048x834.png",
    description: "Innovative global leader in diverse industries.",
    link: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
  },
  {
    id: "6",
    thumbnail: "https://kochamminis.com/cdn/shop/files/logo.png?v=1740811705",
    title: "Kochamminis",
    logo:"https://kochamminis.com/cdn/shop/files/logo.png?v=1740811705",
    description: "Premium masala powders and Indian spices online",
    link: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
  },
  {
    id: "7",
    thumbnail: "https://images.assettype.com/newsmalayalam/2025-05-19/i4ujhv8n/main-logo.webp",
    title: "News Malayalam",
    logo:"https://images.assettype.com/newsmalayalam/2025-05-19/i4ujhv8n/main-logo.webp",
    description: "India's first AR VR XR powered Malayalam News Channel",
    link: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
  },
];

// Mobile-friendly card
function MobileCard({ video }) {
  return (
    <a
      href={video.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-black/80 rounded-xl p-4 shadow-lg"
    >
      <div className="flex items-center gap-3 mb-2">
        <img src={video.logo} alt={video.title} className="h-12 w-12 object-contain" />
        <h3 className="text-white font-semibold text-lg">{video.title}</h3>
      </div>
      <p className="text-gray-300 text-sm">{video.description}</p>
    </a>
  );
}

// Desktop horizontal scroll card
function VideoCard({ video }) {
  return (
    <div className="relative flex-shrink-0 w-[320px] h-[180px] rounded-lg overflow-hidden shadow-lg group">
      <a href={video.link} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
        <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-black/90 opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <img src={video.logo} alt={video.title} className="h-8"/>
            <h3 className="text-white font-semibold text-sm truncate">{video.title}</h3>
            <button name="play" className="w-8 h-8 flex items-center justify-center rounded-full bg-red-600 hover:bg-red-700">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white" width="14" height="14">
                <polygon points="6,4 16,10 6,16" />
              </svg>
            </button>
          </div>
          <p className="text-gray-300 text-xs mt-2 line-clamp-2">{video.description}</p>
        </div>
      </a>
    </div>
  );
}

// Main component
export default function ClientTestimonials() {
  const [items, setItems] = useState(videosList);
  const containerRef = useRef(null);
  const offsetRef = useRef(0);
  const animRef = useRef(null);
  const pausedRef = useRef(false);
  const [isMobile, setIsMobile] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 4; // show 4 cards at a time on mobile

  // Detect mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Desktop horizontal scroll animation
  useEffect(() => {
    if (isMobile) return; // skip animation on mobile

    const step = () => {
      if (!pausedRef.current) {
        offsetRef.current -= 1; // speed (px/frame)
        const container = containerRef.current;
        if (container) {
          container.style.transform = `translateX(${offsetRef.current}px)`;
          const first = container.children[0];
          if (first && first.getBoundingClientRect().right < 0) {
            offsetRef.current += first.offsetWidth + 24; // gap
            setItems((prev) => [...prev.slice(1), prev[0]]);
          }
        }
      }
      animRef.current = requestAnimationFrame(step);
    };

    animRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animRef.current);
  }, [isMobile]);

  // Mobile next/prev handlers
  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - visibleCount, 0));
  };

  const handleNext = () => {
    setStartIndex((prev) => Math.min(prev + visibleCount, items.length - visibleCount));
  };

  return (
    <section className="w-full bg-black py-12 overflow-hidden">
      <h2 className="text-xl font-bold mb-6 text-left pl-5 text-white">Testimonials</h2>

      {isMobile ? (
        // Mobile: horizontal 4-card carousel with next/prev
        <div className="px-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {items.slice(startIndex, startIndex + visibleCount).map((video) => (
              <MobileCard key={video.id} video={video} />
            ))}
          </div>
          <div className="flex justify-center gap-4 mb-4">
            <button
              onClick={handlePrev}
              disabled={startIndex === 0}
              className="px-3 py-1 rounded bg-[#3f0000] text-white disabled:opacity-40"
            >
              <FaArrowLeft/>
            </button>
            <button
              onClick={handleNext}
              disabled={startIndex + visibleCount >= items.length}
              className="px-3 py-1 rounded bg-[#3f0000] text-white disabled:opacity-40"
            >
              <FaArrowRight/>
            </button>
          </div>
        </div>
      ) : (
        // Desktop: horizontal scroll
        <div
          className="flex gap-6 will-change-transform"
          ref={containerRef}
          onMouseEnter={() => (pausedRef.current = true)}
          onMouseLeave={() => (pausedRef.current = false)}
        >
          {items.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </section>
  );
}
