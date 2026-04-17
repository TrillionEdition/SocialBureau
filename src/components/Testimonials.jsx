import React, { useRef, useEffect, useState } from "react";

const videosList = [
  {
    id: "1",
    thumbnail: "https://res.cloudinary.com/dtwcgfmar/image/upload/v1762161989/SB_Testimonail_Hajira_st7208.jpg",
    title: "Hajira M",
    description: "Administration",
    link: "https://youtu.be/9KBzUyHXiR4?si=9P9qNnXb2i6n1aJG",
  },
  {
    id: "2",
    thumbnail: "https://res.cloudinary.com/dtwcgfmar/image/upload/v1761907046/SB_Testimonial_YouTube_Thumbanil_Anjay_g9vebt.png",
    title: "Anjay Ramesh",
    description: "Content & Copy Writer",
    link: "https://youtu.be/D0G2NYgGpLY?si=5-r1F2JvljJp9pl8",
  },
  {
    id: "3",
    thumbnail: "https://res.cloudinary.com/dtwcgfmar/image/upload/v1761906713/SB_Testimonial_YouTube_Thumbanil_Elizebath_loehcz.png",
    title: "Elizebath Thomas",
    description: "Web Developer",
    link: "https://youtu.be/gNebMaTqoQg?si=7uUvk1H389lKdBdJ",
  },
  // {
  //   id: "4",
  //   thumbnail: "https://img.youtube.com/vi/ysz5S6PUM-U/hqdefault.jpg",
  //   title: "Afnas N",
  //   description: "Videographer",
  //   link: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
  // },
  // {
  //   id: "5",
  //   thumbnail: "https://img.youtube.com/vi/jNQXAC9IVRw/hqdefault.jpg",
  //   title: "Haridas PM",
  //   description: "Editor",
  //   link: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
  // },
  {
    id: "6",
    thumbnail: "https://res.cloudinary.com/dtwcgfmar/image/upload/v1762162088/SB_Testimonail_Rimshad_vxakgn.jpg",
    title: "Rimshad M",
    description: "Graphics Designer",
    link: "https://youtu.be/eBJnlmTuuIk?si=CYTR9TTw6uxhnniB",
  },
  {
    id: "7",
    thumbnail: "https://res.cloudinary.com/dtwcgfmar/image/upload/v1765429124/Aneek_oertfd.png",
    title: "Aneek",
    description: "Performance Marketer",
    link: "https://youtu.be/-FZtOCgZP2Y?si=v0_zYYa9NDJPF1Zk",
  },
];

export default function Testimonials({ className = "" }) {
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
    <section className={`w-full bg-black py-16 md:py-24 overflow-hidden flex flex-col ${className}`}>
      <div className="px-4 sm:px-14 w-full mb-10">
        <h2 className="text-3xl md:text-5xl font-bebas tracking-tight text-white uppercase">
          Voices of the<br />Algorithm
        </h2>
        <div className="h-1 w-20 bg-[#C8102E] mt-4"></div>
      </div>
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
