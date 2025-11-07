import React, { useEffect, useState } from "react";

const fetchChannelVideos = async () => {
  const url = `https://www.googleapis.com/youtube/v3/search?key=${
    import.meta.env.VITE_YOUTUBE_API_KEY
  }&channelId=${
    import.meta.env.VITE_CHANNEL_ID
  }&part=snippet,id&order=date&maxResults=6`;
  const response = await fetch(url);
  const data = await response.json();
  return data.items.filter((item) => item.id.kind === "youtube#video");
};

export default function LatestVideos() {
  const [videos, setVideos] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    fetchChannelVideos().then(setVideos);

    // Detect screen size
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize(); // run once
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (videos.length === 0) return null;

  const [latest, ...others] = videos;

  // If mobile, show only 4 more (total 5 videos)
  const visibleOthers = isMobile ? others.slice(0, 4) : others;

  return (
    <div className="container mx-auto p-4 text-white max-w-5xl">      
<div className="flex items-center justify-between my-6">
  <h2 className="text-xl font-bold">Latest Videos</h2>
  <a
    href={`https://www.youtube.com/channel/${import.meta.env.VITE_CHANNEL_ID}?sub_confirmation=1`}
    target="_blank"
    rel="noopener noreferrer"
    className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-md transition duration-300"
  >
    Subscribe
  </a>
</div>

      {/* Fullscreen latest video */}
      <div className="mb-6 w-full">
        <a
          href={`https://www.youtube.com/watch?v=${latest.id.videoId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block aspect-video w-full"
        >
          <img
            src={latest.snippet.thumbnails.high.url}
            alt={latest.snippet.title}
            className="w-full h-full object-cover rounded-lg"
          />
        </a>
        <h3 className="text-lg font-semibold mt-2">{latest.snippet.title}</h3>
      </div>

      {/* Portrait next videos */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {visibleOthers.map((video) => (
          <div
            key={video.id.videoId}
            className="rounded-lg shadow overflow-hidden flex flex-col"
          >
            <a
              href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block aspect-[9/16]" // Portrait ratio
            >
              <img
                src={video.snippet.thumbnails.high.url}
                alt={video.snippet.title}
                className="w-full h-full object-cover"
              />
            </a>
            <div className="p-2">
              <h3 className="text-sm font-semibold line-clamp-2">
                {video.snippet.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center my-6">
  <a
    href={`https://www.youtube.com/channel/${import.meta.env.VITE_CHANNEL_ID}?sub_confirmation=1`}
    target="_blank"
    rel="noopener noreferrer"
    className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-md transition duration-300"
  >
    Subscribe
  </a>
</div>

    </div>
  );
}
