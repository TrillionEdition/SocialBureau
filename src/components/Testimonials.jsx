import React, { useRef, useEffect, useState } from "react";

const videosList = [
  {
    id: "1",
    thumbnail: "https://img.youtube.com/vi/ysz5S6PUM-U/hqdefault.jpg",
    title: "Hajira M",
    description: "Administration",
    link: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
  },
  {
    id: "2",
    thumbnail: "https://img.youtube.com/vi/jNQXAC9IVRw/hqdefault.jpg",
    title: "Anjay Ramesh",
    description: "Content & Copy Writer",
    link: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
  },
  {
    id: "3",
    thumbnail: "https://img.youtube.com/vi/aqz-KE-bpKQ/hqdefault.jpg",
    title: "Elizebath Thomas",
    description: "Web Developer",
    link: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
  },
  {
    id: "4",
    thumbnail: "https://img.youtube.com/vi/ysz5S6PUM-U/hqdefault.jpg",
    title: "Afnas N",
    description: "Videographer",
    link: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
  },
  {
    id: "5",
    thumbnail: "https://img.youtube.com/vi/jNQXAC9IVRw/hqdefault.jpg",
    title: "Haridas PM",
    description: "Editor",
    link: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
  },
  {
    id: "6",
    thumbnail: "https://img.youtube.com/vi/aqz-KE-bpKQ/hqdefault.jpg",
    title: "Rimshad M",
    description: "Graphics Designer",
    link: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
  },
];

export default function Testimonials() {
  const [items, setItems] = useState(videosList);
  const containerRef = useRef(null);
  const offsetRef = useRef(0);
  const animRef = useRef(null);
  const pausedRef = useRef(false);

  // Start animation loop
  useEffect(() => {
    const step = () => {
      if (!pausedRef.current) {
        offsetRef.current -= 1; // speed (px/frame)
        const container = containerRef.current;
        if (container) {
          container.style.transform = `translateX(${offsetRef.current}px)`;
          const first = container.children[0];
          if (first && first.getBoundingClientRect().right < 0) {
            // Move first to end
            offsetRef.current += first.offsetWidth + 24; // 24 = gap-6
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
    <section className="w-full bg-black py-12 overflow-hidden">
      <h2 className="text-xl font-bold mb-6 text-left pl-5 text-white">
        Testimonials
      </h2>
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
    </section>
  );
}

function VideoCard({ video }) {
  return (
    <div className="relative flex-shrink-0 w-[320px] h-[180px] rounded-lg overflow-hidden shadow-lg group">
      <a
        href={video.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full h-full"
      >
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover"
        />
        {/* Overlay bottom-half */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-semibold text-sm truncate">
              {video.title}
            </h3>
            <button name="play" className="w-8 h-8 flex items-center justify-center rounded-full bg-red-600 hover:bg-red-700">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="white"
    width="14"
    height="14"
  >
    <polygon points="6,4 16,10 6,16" />
  </svg>
</button>

          </div>
          <p className="text-gray-300 text-xs mt-2 line-clamp-2">
            {video.description}
          </p>
        </div>
      </a>
    </div>
  );
}
