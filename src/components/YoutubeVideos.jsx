// // import React, { useEffect, useState } from "react";

// // const fetchChannelVideos = async () => {
// //   const url = `https://www.googleapis.com/youtube/v3/search?key=${
// //     import.meta.env.VITE_YOUTUBE_API_KEY
// //   }&channelId=${
// //     import.meta.env.VITE_CHANNEL_ID
// //   }&part=snippet,id&order=date&maxResults=6`;
// //   const response = await fetch(url);
// //   const data = await response.json();
// //   return data.items.filter((item) => item.id.kind === "youtube#video");
// // };

// // export default function LatestVideos() {
// //   const [videos, setVideos] = useState([]);
// //   const [isMobile, setIsMobile] = useState(false);

// //   useEffect(() => {
// //     fetchChannelVideos().then(setVideos);

// //     // Detect screen size
// //     const handleResize = () => setIsMobile(window.innerWidth < 640);
// //     handleResize(); // run once
// //     window.addEventListener("resize", handleResize);

// //     return () => window.removeEventListener("resize", handleResize);
// //   }, []);

// //   if (videos.length === 0) return null;

// //   const [latest, ...others] = videos;

// //   // If mobile, show only 4 more (total 5 videos)
// //   const visibleOthers = isMobile ? others.slice(0, 5) : others;

// //   return (
// //     <div className="container mx-auto p-4 text-white max-w-[80vw]">      
// // <div className="flex items-center justify-between my-6">
// //   <h2 className="text-xl font-bold">Latest Videos</h2>
// //   <a
// //     href={`https://www.youtube.com/channel/${import.meta.env.VITE_CHANNEL_ID}?sub_confirmation=1`}
// //     target="_blank"
// //     rel="noopener noreferrer"
// //     className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-md transition duration-300"
// //   >
// //     Subscribe
// //   </a>
// // </div>

// //       {/* Fullscreen latest video
// //       <div className="mb-6 w-full">
// //         <a
// //           href={`https://www.youtube.com/watch?v=${latest.id.videoId}`}
// //           target="_blank"
// //           rel="noopener noreferrer"
// //           className="block aspect-video w-full"
// //         >
// //           <img
// //             src={latest.snippet.thumbnails.high.url}
// //             alt={latest.snippet.title}
// //             className="w-full h-full object-cover rounded-lg"
// //           />
// //         </a>
// //         <h3 className="text-lg font-semibold mt-2">{latest.snippet.title}</h3>
// //       </div> */}

// //       {/* Portrait next videos */}
// //       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
// //         {visibleOthers.map((video) => (
// //           <div
// //             key={video.id.videoId}
// //             className="rounded-lg shadow overflow-hidden flex flex-col"
// //           >
// //             <a
// //               href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
// //               target="_blank"
// //               rel="noopener noreferrer"
// //               className="block aspect-[9/16]" // Portrait ratio
// //             >
// //               <img
// //                 src={video.snippet.thumbnails.high.url}
// //                 alt={video.snippet.title}
// //                 className="w-full h-full object-cover"
// //               />
// //             </a>
// //             <div className="p-2">
// //               <h3 className="text-sm font-semibold line-clamp-2">
// //                 {video.snippet.title}
// //               </h3>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //       <div className="flex justify-center my-6">
// //   <a
// //     href={`https://www.youtube.com/channel/${import.meta.env.VITE_CHANNEL_ID}?sub_confirmation=1`}
// //     target="_blank"
// //     rel="noopener noreferrer"
// //     className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-md transition duration-300"
// //   >
// //     Subscribe
// //   </a>
// // </div>

// //     </div>
// //   );
// // }

// import React, { useEffect, useState } from "react";

// const fetchChannelVideos = async () => {
//   const url = `https://www.googleapis.com/youtube/v3/search?key=${
//     import.meta.env.VITE_YOUTUBE_API_KEY
//   }&channelId=${
//     import.meta.env.VITE_CHANNEL_ID
//   }&part=snippet,id&order=date&maxResults=6`;
//   const response = await fetch(url);
//   const data = await response.json();
//   return data.items.filter((item) => item.id.kind === "youtube#video");
// };

// export default function LatestVideos() {
//   const [videos, setVideos] = useState([]);
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     fetchChannelVideos().then(setVideos);

//     // Detect screen size
//     const handleResize = () => setIsMobile(window.innerWidth < 640);
//     handleResize(); // run once
//     window.addEventListener("resize", handleResize);

//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   if (videos.length === 0) return null;

//   // If mobile, show only 4 videos total
//   const visibleVideos = isMobile ? videos.slice(0, 4) : videos;

//   return (
//     <div className="container mx-auto p-4 text-white max-w-[80vw]">      
//       <div className="flex items-center justify-between my-6">
//         <h2 className="text-xl font-bold">Latest Videos</h2>
//         <a
//           href={`https://www.youtube.com/channel/${import.meta.env.VITE_CHANNEL_ID}?sub_confirmation=1`}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-md transition duration-300"
//         >
//           Subscribe
//         </a>
//       </div>

//       {/* All videos in grid - same size */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4">
//         {visibleVideos.map((video) => (
//           <div
//             key={video.id.videoId}
//             className="rounded-lg shadow overflow-hidden flex flex-col"
//           >
//             <a
//               href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="block aspect-[19/7]"
//             >
//               <img
//                 src={video.snippet.thumbnails.high.url}
//                 alt={video.snippet.title}
//                 className="w-full h-full object-cover"
//               />
//             </a>
//             <div className="p-2">
//               <h3 className="text-sm font-semibold line-clamp-3">
//                 {video.snippet.title}
//               </h3>
//             </div>
//           </div>
//         ))}
//       </div>
// {/* 
//       <div className="flex justify-center my-6">
//         <a
//           href={`https://www.youtube.com/channel/${import.meta.env.VITE_CHANNEL_ID}?sub_confirmation=1`}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-md transition duration-300"
//         >
//           Subscribe
//         </a>
//       </div> */}
//     </div>
//   );
// }


import React, { useRef, useState, useEffect } from 'react';

// Main Featured Content (Static or can be fetched)
const mainMovies = [
  { id: 1, title: "Monarch", img: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=1200", tag: "Thriller", desc: "A secret agent embarks on her most dangerous mission." },
  { id: 2, title: "Tehran", img: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=1200", tag: "Action", desc: "An undercover mission in the heart of Iran." },
  { id: 3, title: "F1", img: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=1200", tag: "Sports", desc: "The race for the championship begins." },
  { id: 4, title: "Social", img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200", tag: "Tech", desc: "Redefining the digital landscape." },
];

const fetchChannelVideos = async () => {
  try {
    const url = `https://www.googleapis.com/youtube/v3/search?key=${import.meta.env.VITE_YOUTUBE_API_KEY
      }&channelId=${import.meta.env.VITE_CHANNEL_ID
      }&part=snippet,id&order=date&maxResults=10`;

    const response = await fetch(url);
    const data = await response.json();
    if (data.items) {
      return data.items.filter((item) => item.id.kind === "youtube#video");
    }
    return [];
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    return [];
  }
};

const AppleSection = () => {
  const mainScrollRef = useRef(null);
  const subScrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchChannelVideos().then(setVideos);
  }, []);

  const handleScroll = (index) => {
    setActiveIndex(index);
    if (mainScrollRef.current) {
      const mainScrollWidth = mainScrollRef.current.scrollWidth / mainMovies.length;
      mainScrollRef.current.scrollTo({
        left: index * mainScrollWidth,
        behavior: 'smooth'
      });
    }
  };

  const hideScrollbarClass = "[ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden";

  return (
    <div className="bg-white py-16 overflow-hidden select-none">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <h2 className="text-5xl font-bold text-gray-900 mb-10 tracking-tight">Endless entertainment.</h2>
      </div>

      {/* Main Large Carousel (The "Apple TV+" style slider) */}
      <div
        ref={mainScrollRef}
        className={`flex gap-5 px-[5%] md:px-[10%] overflow-x-auto snap-x snap-mandatory scroll-smooth ${hideScrollbarClass}`}
      >
        {mainMovies.map((movie) => (
          <div key={movie.id} className="flex-none w-[85vw] md:w-[75vw] snap-center relative aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl">
            <img src={movie.img} className="absolute inset-0 w-full h-full object-cover" alt={movie.title} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-10 text-white">
              <div className="flex items-center gap-4">
                <button className="bg-white text-black px-8 py-3 rounded-full font-bold text-sm hover:scale-105 transition-transform">Stream now</button>
                <p className="text-lg font-medium tracking-wide">
                  <span className="font-extrabold">{movie.tag}</span> • {movie.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* YouTube Section Header (Integrated from LatestVideos) */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mt-20 flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-black">Latest from YouTube</h3>
          <p className="text-gray-500 text-sm">Our most recent updates and stories.</p>
        </div>
        <a
          href={`https://www.youtube.com/channel/${import.meta.env.VITE_CHANNEL_ID}?sub_confirmation=1`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full shadow-lg transition-all active:scale-95 text-sm"
        >
          Subscribe
        </a>
      </div>

      {/* Small Bottom Row (Dynamic YouTube Videos) */}
      <div
        ref={subScrollRef}
        className={`mt-8 flex gap-5 px-[5%] md:px-[10%] overflow-x-auto scroll-smooth ${hideScrollbarClass}`}
      >
        {videos.length > 0 ? (
          <>
            {videos.map((video) => (
              <div key={video.id.videoId} className="flex-none w-[320px] group cursor-pointer">
                <a
                  href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="relative aspect-video rounded-2xl overflow-hidden shadow-md bg-gray-100 mb-3">
                    <img
                      src={video.snippet.thumbnails.high.url}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      alt={video.snippet.title}
                    />
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
                  </div>
                  <h4 className="text-sm font-bold text-gray-900 line-clamp-2 leading-snug group-hover:underline">
                    {video.snippet.title}
                  </h4>
                  <p className="text-xs text-gray-400 mt-1 font-medium">Watch on YouTube</p>
                </a>
              </div>
            ))}

            {/* Final Subscribe Card */}
            <div className="flex-none w-[320px] aspect-video relative rounded-2xl overflow-hidden group bg-gray-900 flex items-center justify-center p-6 text-center">
              <a
                href={`https://www.youtube.com/channel/${import.meta.env.VITE_CHANNEL_ID}?sub_confirmation=1`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-3 text-white"
              >
                <div className="p-4 bg-white/10 rounded-full group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 fill-red-600" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold">More Videos</h3>
                  <p className="text-xs opacity-70 mt-1">Visit Channel</p>
                </div>
              </a>
            </div>
          </>
        ) : (
          // Loading State
          [1, 2, 3, 4].map((i) => (
            <div key={i} className="flex-none w-[320px] aspect-video animate-pulse bg-gray-100 rounded-2xl"></div>
          ))
        )}
      </div>

      {/* Navigation Dots for Main Carousel */}
      <div className="flex justify-center items-center gap-3 mt-12">
        {mainMovies.map((_, index) => (
          <button
            key={index}
            onClick={() => handleScroll(index)}
            className={`h-2 rounded-full transition-all duration-500 ease-in-out ${activeIndex === index ? "w-12 bg-gray-900" : "w-2 bg-gray-300 hover:bg-gray-400"
              }`}
            aria-label={`Go to section ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default AppleSection;