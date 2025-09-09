import React, { useEffect, useState } from 'react';

const fetchChannelVideos = async () => {
  const url = `https://www.googleapis.com/youtube/v3/search?key=${import.meta.env.VITE_YOUTUBE_API_KEY}&channelId=${import.meta.env.VITE_CHANNEL_ID}&part=snippet,id&order=date&maxResults=6`;
  const response = await fetch(url);
  const data = await response.json();
  return data.items.filter(item => item.id.kind === 'youtube#video');
};

export default function LatestVideos() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchChannelVideos().then(setVideos);
  }, []);

  return (
    <div className="container mx-auto p-4 text-white">
      <h2 className="text-xl font-bold mb-4">Latest Videos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map(video => (
          <div
            key={video.id.videoId}
            className="bg-white rounded-lg shadow aspect-video overflow-hidden flex flex-col"
          >
            <a
              href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={video.snippet.thumbnails.high.url}
                alt={video.snippet.title}
                className="w-full h-60 object-cover"
              />
            </a>
              <h3 className="text-sm font-semibold">{video.snippet.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
