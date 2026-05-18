import { useState } from "react";
import { Play, X } from "lucide-react";
import { motion } from "framer-motion";

const VideoCard = ({ videoId, title, index }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative aspect-video bg-[#120c1d] rounded-3xl overflow-hidden border border-white/5 hover:border-white/20 transition-all shadow-2xl"
    >
      {!isPlaying ? (
        <div className="relative w-full h-full cursor-pointer" onClick={() => setIsPlaying(true)}>
          {/* Thumbnail */}
          <img 
            src={thumbnail} 
            alt={title}
            className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-all duration-700 group-hover:scale-110"
          />
          
          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-[#ff3358] flex items-center justify-center shadow-2xl shadow-[#ff3358]/40 group-hover:scale-110 transition-transform duration-500">
              <Play className="w-6 h-6 text-white fill-current ml-1" />
            </div>
          </div>

          {/* Title Overlay */}
          <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
            <span className="text-[10px] font-bold tracking-[0.3em] text-white/40 uppercase mb-2 block">
              EPISODE {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="text-xl font-black text-white tracking-tight uppercase font-roboto">
              {title}
            </h3>
          </div>
        </div>
      ) : (
        <div className="relative w-full h-full bg-black">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0"
          />
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setIsPlaying(false);
            }}
            className="absolute top-4 right-4 z-50 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-[#ff3358] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </motion.div>
  );
};

export const Podcast = () => {
  const videos = [
    { id: "3hZzTfz8-pg", title: "Strategic Performance Marketing" },
    { id: "e1eckOb9v38", title: "Creative Branding & Identity" },
    { id: "g2PxbqjgmXE", title: "The Future of Web Development" }
  ];

  return (
    <section className="pt-20 pb-12 px-6 relative overflow-hidden bg-[#0a0510]">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#ff3358]/5 blur-[150px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 blur-[150px] -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4"
          >
            <span className="text-[12px] font-bold tracking-[0.2em] text-white/30 uppercase">
              BUREAU VOICES
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl lg:text-7xl scale-y-[1.4] font-black tracking-tighter uppercase font-roboto leading-none flex flex-wrap gap-x-4"
          >
            <span className="text-white">TEAM</span>
            <span className="text-[#ff3358]">PODCAST</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {videos.map((video, idx) => (
            <VideoCard 
              key={video.id} 
              videoId={video.id} 
              title={video.title} 
              index={idx} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};
