import React, { useRef, useEffect, useState } from "react";

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
    description: "India's first AR VR XR - powered Malayalam News Channel",
    link: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
  },
];

export default function ClientTestimonials() {
  const [items, setItems] = useState(videosList);
  const containerRef = useRef(null);
  const offsetRef = useRef(0);
  const animRef = useRef(null);
  const pausedRef = useRef(false);

  // Desktop animation loop
  useEffect(() => {
    const step = () => {
      if (!pausedRef.current) {
        offsetRef.current -= 1; // speed
        const container = containerRef.current;
        if (container) {
          container.style.transform = `translateX(${offsetRef.current}px)`;
          const first = container.children[0];
          if (first && first.getBoundingClientRect().right < 0) {
            offsetRef.current += first.offsetWidth + 24;
            setItems((prev) => [...prev.slice(1), prev[0]]);
          }
        }
      }
      animRef.current = requestAnimationFrame(step);
    };
    animRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <section className="w-full py-12">
      {/* Desktop Carousel */}
      <div className="hidden md:block">
        <h2 className="text-xl font-bold mb-6 pl-5 text-white">Testimonials</h2>
        <div
          className="flex gap-6 will-change-transform overflow-hidden px-5"
          ref={containerRef}
          onMouseEnter={() => (pausedRef.current = true)}
          onMouseLeave={() => (pausedRef.current = false)}
        >
          {items.map((video) => (
            <DesktopCard key={video.id} video={video} />
          ))}
        </div>
      </div>

      {/* Mobile List */}
      <div className="md:hidden px-4">
        <h2 className="text-xl font-bold mb-4 text-white">Testimonials</h2>
        {videosList.map((video) => (
          <MobileCard key={video.id} video={video} />
        ))}
      </div>
    </section>
  );
}

// Desktop Card
function DesktopCard({ video }) {
  return (
    <a
      href={video.link}
      target="_blank"
      rel="noopener noreferrer"
      className="relative flex-shrink-0 w-[320px] h-[180px] rounded-lg overflow-hidden shadow-lg group"
    >
      <img
        src={video.thumbnail}
        alt={video.title}
        className="w-full h-full object-cover"
      />
      {/* Overlay on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <img src={video.logo} alt={video.title} className="h-8"/>
          <h3 className="text-white font-semibold text-sm truncate">{video.title}</h3>
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-red-600 hover:bg-red-700">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white" width="14" height="14">
              <polygon points="6,4 16,10 6,16" />
            </svg>
          </button>
        </div>
        <p className="text-gray-300 text-xs mt-2 line-clamp-2">{video.description}</p>
      </div>
    </a>
  );
}

// Mobile Card
function MobileCard({ video }) {
  return (
    <a
      href={video.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full bg-black/80 rounded-xl p-4 mb-4 shadow-lg"
    >
      <div className="flex items-center gap-3 mb-2">
        <img src={video.logo} alt={video.title} className="h-12 w-12 object-contain"/>
        <h3 className="text-white font-semibold text-lg">{video.title}</h3>
      </div>
      <p className="text-gray-300 text-sm">{video.description}</p>
    </a>
  );
}
