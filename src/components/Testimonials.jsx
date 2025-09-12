import React, { useEffect, useRef, useState } from "react";

const fetchChannelVideos = async () => {
  const url = `https://www.googleapis.com/youtube/v3/search?key=${
    import.meta.env.VITE_YOUTUBE_API_KEY
  }&channelId=${
    import.meta.env.VITE_CHANNEL_ID
  }&part=snippet,id&order=date&maxResults=10`;
  const response = await fetch(url);
  const data = await response.json();
  return data.items.filter((item) => item.id.kind === "youtube#video");
};

export default function Testimonials() {
  const [videos, setVideos] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    fetchChannelVideos().then(setVideos);
  }, []);

  const scrollToIndex = (index) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const child = container.children[index];
    if (child) {
      child.scrollIntoView({ behavior: "smooth", inline: "start" });
      setActiveIndex(index);
    }
  };

  const handleArrow = (direction) => {
    let nextIndex = activeIndex + (direction === "right" ? 1 : -1);
    if (nextIndex < 0) nextIndex = 0;
    if (nextIndex >= videos.length) nextIndex = videos.length - 1;
    scrollToIndex(nextIndex);
  };

  if (videos.length === 0) return null;

  return (
    <section className="w-full bg-black text-white py-8 relative overflow-hidden">
      <h2 className="text-xl font-bold mb-4 px-4">Latest Videos</h2>

      {/* Scroll Arrows */}
      <button
        onClick={() => handleArrow("left")}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white text-black p-2 rounded-full"
      >
        &#8592;
      </button>
      <button
        onClick={() => handleArrow("right")}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white text-black p-2 rounded-full"
      >
        &#8594;
      </button>

      <div
        ref={scrollRef}
        className="flex gap-4 px-4 overflow-x-hidden overflow-y-hidden snap-x snap-mandatory"
      >
        {videos.map((video, index) => (
          <div
            key={video.id.videoId}
            className="snap-start flex-shrink-0 transition-all duration-500"
            style={{
              width: index === activeIndex ? "500px" : "250px",
              height: "300px",
            }}
          >
            <a
              href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full h-full rounded-lg overflow-hidden"
            >
              <img
                src={video.snippet.thumbnails.high.url}
                alt={video.snippet.title}
                className="w-full h-full object-cover"
              />
            </a>
            <h3 className="text-sm font-semibold mt-2 line-clamp-2">
              {video.snippet.title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}
