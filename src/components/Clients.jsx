import React from "react";
import { useNavigate } from "react-router-dom";

export default function Clients() {
  const images = [
    { url: "https://www.newstamil.tv/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmain-logo.ae4ceeb6.png&w=640&q=75", shadowColor: "drop-shadow-[0_0_15px_rgba(253,224,71,0.5)]" },
    { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Reporter_TV_2023.jpg/250px-Reporter_TV_2023.jpg", shadowColor: "drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]" },
    { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Big_TV_Logo.jpg/1200px-Big_TV_Logo.jpg", shadowColor: "drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" },
    { url: "https://emaraj.com/wp-content/uploads/2024/04/EMARAJ-LOGO-2048x834.png", shadowColor: "drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" },
    { url: "https://suntipstea.online/wp-content/uploads/2024/11/suntip-logo-white-673633bc349a1-scaled-e1731606777757.webp", shadowColor: "drop-shadow-[0_0_15px_rgba(139,92,246,0.5)]" },
    { url: "https://kochamminis.com/cdn/shop/files/logo.png?v=1740811705", shadowColor: "drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]" },
  ];

  const navigate=useNavigate();
  return (
    <div>
        <h2 className="font-playfair text-4xl md:text-4xl font-bold mb-6 text-white text-center" style={{ fontFamily: "Playfair Display, serif" }}>Our Clients</h2>      
    <div className="flex items-center justify-center bg-black md:p-4 md:py-10 sm:p-8 sm:py-50" onClick={()=>navigate('/clients')}>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {images.map((image, index) => (
          <div
            key={index}
            className={`relative cursor-pointer w-full h-28 sm:h-32 flex items-center justify-center transition-transform duration-300 hover:scale-105 hover:rotate-1 ${image.shadowColor}`}
          >
            <img
              src={image.url}
              alt={`Client ${index + 1}`}
              className="md:max-h-15 sm:h-20 w-20 object-contain transition-opacity duration-300 opacity-90 hover:opacity-100"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
