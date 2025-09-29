import React from "react";
import { useNavigate } from "react-router-dom";

export default function ClientDetails() {
  const images = [
    { url: "https://www.newstamil.tv/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmain-logo.ae4ceeb6.png&w=640&q=75", shadowColor: "drop-shadow-[0_0_15px_rgba(253,224,71,0.5)]" },
    { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Reporter_TV_2023.jpg/250px-Reporter_TV_2023.jpg", shadowColor: "drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]" },
    { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Big_TV_Logo.jpg/1200px-Big_TV_Logo.jpg", shadowColor: "drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]" },
    { url: "https://emaraj.com/wp-content/uploads/2024/04/EMARAJ-LOGO-2048x834.png", shadowColor: "drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" },
    { url: "https://suntipstea.online/wp-content/uploads/2024/11/suntip-logo-white-673633bc349a1-scaled-e1731606777757.webp", shadowColor: "drop-shadow-[0_0_15px_rgba(139,92,246,0.5)]" },
    { url: "https://images.assettype.com/newsmalayalam/2025-05-19/i4ujhv8n/main-logo.webp", shadowColor: "drop-shadow-[0_0_15px_rgba(139,92,246,0.5)]" },
    { url: "https://kochamminis.com/cdn/shop/files/logo.png?v=1740811705", shadowColor: "drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]" },
    { url: "https://urvasionline.com/cdn/shop/files/00001.png?v=1720943076&width=375", shadowColor: "drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]" },
    { url: "https://theblackcoffee.org/cdn/shop/files/TBC_LOGO_2025.png?v=1740024498&width=135", shadowColor: "drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]" },
    { url: "https://trendyroys.com/cdn/shop/files/logo_663312d9-b61f-4bd1-a606-a27d397562e6.png?v=1748240249&width=75", shadowColor: "drop-shadow-[0_0_15px_rgba(139,92,246,0.5)]" },
    { url: "https://img-cdn.publive.online/fit-in/580x326/filters:format(webp)/newsfirstlive-kannada/media/agency_attachments/2025/07/28/2025-07-28t072019657z-newsfirst_banner_logo-2025-07-28-12-50-19.png", shadowColor: "drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]" },
  ];

  return (
    <div className="bg-black py-10 overflow-hidden">
      <h2 className="text-4xl font-bold text-white text-center mb-10" style={{ fontFamily: "Playfair Display, serif" }}>Our Clients</h2>

      {/* Row 1 - scroll left */}
      <div className="overflow-hidden relative group mb-10">
        <div
          className="flex space-x-10 animate-scroll-left"
          style={{ animationPlayState: "running" }}
          onMouseEnter={(e) => e.currentTarget.style.animationPlayState = 'paused'}
          onMouseLeave={(e) => e.currentTarget.style.animationPlayState = 'running'}
        >
          {[...images, ...images].map((img, i) => (
            <img
              key={`row1-${i}`}
              src={img.url}
              alt={`Client ${i}`}
              className={`h-12 md:h-20 w-auto object-contain ${img.shadowColor} opacity-90 hover:opacity-100 transition`}
              loading="lazy"
            />
          ))}
        </div>
      </div>

    </div>
  );
}
