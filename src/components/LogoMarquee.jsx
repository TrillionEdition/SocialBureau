import React from "react";

const LOGOS = [
  {
    name: "Google Ads",
    src: "https://img.magnific.com/premium-vector/google-ads-logo_578229-305.jpg?semt=ais_hybrid&w=740&q=80",
  },
  {
    name: "Meta Business Manager",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCMFlza9NA2s203TxFcCrJt8IRhoLYEE40jLZscWX49dpbl0S1bJr8f47N&s=10",
  },
  {
    name: "JioHotstar Agency",
    src: "https://th-i.thgim.com/public/entertainment/movies/7baemw/article69218131.ece/alternates/FREE_1200/JioHotstar%20Brand%20Horizontal.JPEG",
  },
  {
    name: "DV360",
    src: "https://developers.google.com/static/ads/images/logo_display_video_360_192px.svg",
  },
  {
    name: "LinkedIn Ads",
    src: "https://www.paubox.com/hubfs/Imported_Blog_Media/LinkedIn-Ads-logo-3.jpg",
  },
  {
    name: "YouTube Ads",
    src: "https://static.vecteezy.com/system/resources/previews/075/653/889/non_2x/youtube-ads-logo-icon-free-png.png",
  },
  {
    name: "Amazon Ads",
    src: "https://m.media-amazon.com/images/G/01/AdProductsWebsite/images/logos/OG_image_Squid_Ink.png",
  },
  {
    name: "X Ads",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPmB-gHnCvK62Swwz4DgLntxGyviFakj311tR77uPRPlSo8QQtzsSbBKaO&s=10",
  },
  {
    name: "Snapchat Ads",
    src: "https://images.ctfassets.net/inb32lme5009/7bkohgfO4vjHwS8AGNpb0S/fa32477e3880f95625b6a3403d37dc95/Snapchat_Ghost_OG-Image.jpg",
  },
];

export default function LogoMarquee() {
  const items = [...LOGOS, ...LOGOS];

  return (
    <div className="relative w-full overflow-hidden bg-white py-3">
      <style>{`
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee-scroll 20s linear infinite;
        }
      `}</style>

      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent" />

      <div className="marquee-track flex w-max items-center gap-12">
        {items.map((logo, i) => (
          <div
            key={i}
            className="flex h-14 shrink-0 items-center justify-center rounded-xl p-3"
          >
            <img
              src={logo.src}
              alt={logo.name}
              className="max-h-full max-w-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
}