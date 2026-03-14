import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getOptimizedCloudinaryUrl } from "../../../utils/cloudinary";

const RotatingStackedImages = ({ images }) => {
  const [index, setIndex] = useState(0);
  const [rotating, setRotating] = useState(false);

  useEffect(() => {
    if (!images || images.length === 0) return;
    const interval = setInterval(() => {
      setRotating(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % images.length);
        setRotating(false);
      }, 600);
    }, 3000);
    return () => clearInterval(interval);
  }, [images]);

  const leftImg = images[index % images.length];
  const frontImg = images[(index + 1) % images.length];
  const rightImg = images[(index + 2) % images.length];

  return (
    <div className="relative w-full max-w-[260px] sm:max-w-[320px] h-[220px] sm:h-[280px] mx-auto flex items-end justify-center">
      {/* LEFT IMAGE (Behind) */}
      <div
        className="absolute overflow-hidden rounded-2xl shadow-lg border border-white/10"
        style={{
          width: "75%",
          aspectRatio: "1/1",
          zIndex: 10,
          left: "55%",
          transform: rotating
            ? "rotate(-20deg) scale(0.8) translateX(-20px)"
            : "rotate(-12deg) scale(0.9) translateX(0px)",
          opacity: rotating ? 0.4 : 0.7,
          transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <img
          src={getOptimizedCloudinaryUrl(leftImg, 600)}
          alt="Partnership and collaboration background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* RIGHT IMAGE (Behind) */}
      <div
        className="absolute overflow-hidden rounded-2xl shadow-lg border border-white/10"
        style={{
          width: "75%",
          aspectRatio: "1/1",
          zIndex: 10,
          right: "55%",
          transform: rotating
            ? "rotate(20deg) scale(0.8) translateX(20px)"
            : "rotate(12deg) scale(0.9) translateX(0px)",
          opacity: rotating ? 0.4 : 0.7,
          transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <img
          src={getOptimizedCloudinaryUrl(rightImg, 600)}
          alt="SocialBureau team collaboration"
          className="w-full h-full object-cover"
        />
      </div>

      {/* FRONT IMAGE (The Clear One) */}
      <div
        className="absolute overflow-hidden rounded-2xl shadow-2xl border border-white/20"
        style={{
          width: "79%",
          aspectRatio: "1/1",
          zIndex: 30,
          transform: rotating
            ? "scale(1.1) translateY(-10px)"
            : "scale(1) translateY(0px)",
          opacity: 1,
          transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <img
          src={getOptimizedCloudinaryUrl(frontImg, 600)}
          alt="Active partner success stories"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

const CombinedServicesGrid = () => {
  const items = [
    {
      title: "AdTech Marketing",
      subtitle: "Engineered for rankings",
      image:
        "https://res.cloudinary.com/dtwcgfmar/image/upload/v1772875813/brian_okelley-removebg-preview-removebg-preview_iquzso.png",
      bg: "bg-gradient-to-br from-[#450a0a] via-[#7f1d1d] to-[#450a0a]",
      text: "text-white",
      link: "/adTech-marketing-agency-in-kochi",
      isFullScreenVideo: true,
      hoverContext: {
        expert: "Brian O’Kelley",
        fact: "Invented programmatic advertising/ad exchanges.",
      },
    },

    {
      title: "Content Marketing",
      subtitle: "Built for scalable growth",
      image:
        "https://res.cloudinary.com/dtwcgfmar/image/upload/v1772875699/Gemini_Generated_Image_9k6s229k6s229k6s__1_-removebg-preview_kjqfmu.png",
      bg: "bg-gradient-to-br from-[#09090b] via-[#18181b] to-[#09090b]",
      text: "text-white",
      link: "/content-marketing-agency-in-kochi",
      hoverContext: {
        expert: "Joe Pulizzi",
        fact: "Pioneer behind the content marketing revolution.",
      },
    },
    {
      title: "Niche Marketing",
      subtitle: "Precision over assumptions",
      // NOTE: Consider uploading this image to Cloudinary for better performance
      image:
        "https://res.cloudinary.com/dtwcgfmar/image/upload/v1772876064/Gemini_Generated_Image_gg9jiygg9jiygg9j-removebg-preview_mla06t.png",
      bg: "bg-gradient-to-br from-[#0c0a09] via-[#1c1917] to-[#0c0a09]",
      text: "text-white",
      link: "/niche-marketing-agency-in-kochi",
      hoverContext: {
        expert: "Wendell R. Smith",
        fact: "Pioneered market segmentation theory.",
      },
      imageClass: "max-h-[440px] md:max-h-[340px] transition-all",
    },
    {
      title: "Performance Marketing",
      subtitle: "Marketing, fully automated",
      image:
        "https://res.cloudinary.com/dtwcgfmar/image/upload/v1772874479/philip-kotler-1024x684-removebg-preview_xugxed.png",
      bg: "bg-gradient-to-br from-[#450a0a] via-[#7f1d1d] to-[#450a0a]",
      text: "text-white",
      link: "/performance-marketing-agency-in-kochi",
      hoverContext: {
        expert: "Philip Kotler",
        fact: "Shifted marketing to a measurable, customer-centric science.",
      },
      imageClass: "max-h-[440px] md:max-h-[340px] transition-all",
    },
    {
      title: "Our Team",
      subtitle: "People behind the product",
      image:
        "https://res.cloudinary.com/dtwcgfmar/image/upload/v1772021150/image-gen_33__converted_jzbrvu.webp",
      bg: "bg-[#000000]",
      text: "text-white",
      link: "/our-team",
    },
    {
      title: "Partnerships",
      subtitle: "Grow stronger, together",
      images: [
        "https://res.cloudinary.com/dtwcgfmar/image/upload/v1769159675/dp3_jscnpp.jpg",
        // NOTE: Move this large local image to Cloudinary to solve LCP issues
        "/assets/sivaprasad/Siva Prasad.webp",
        "https://res.cloudinary.com/dtwcgfmar/image/upload/v1771997817/2_1_1_wzl8fc.jpg",
      ],
      bg: "bg-[#ffffffff]",
      text: "text-[#1D1D1F]",
      link: "/partners",
      isRotatingStack: true,
    },
  ];

  return (
    <section className="w-full bg-gradient-to-b from-[#f8fdff] to-white">

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-0 border-y border-slate-100">
        {items.map((item, index) => (
          <Link
            key={`${item.title}-${index}`}
            to={item.link}
            className={`relative flex flex-col h-[500px] sm:h-[600px] lg:h-[640px] ${item.bg} ${item.text} overflow-hidden group cursor-pointer`}
          >
            {/* FULLSCREEN VIDEO BACKGROUND */}
            {item.isFullScreenVideo && item.video ? (
              <>
                {/* Video Background - Full Screen */}
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  <video
                    src={getOptimizedCloudinaryUrl(item.video, 1280)}
                    autoPlay
                    muted
                    loop
                    playsInline
                    title={`${item.title} background video`}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/40 z-10"></div>

                {/* TEXT CONTENT - Same position as other items */}
                <div className="relative z-20 text-center flex flex-col items-center px-6 pt-12 md:pt-16">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white mb-2 drop-shadow-lg">
                    {item.title}
                  </h2>
                  <p className="text-lg text-white/90 mb-6 drop-shadow-md">
                    {item.subtitle}
                  </p>
                  <span className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-neutral-100 transition-all duration-300 shadow-lg">
                    Learn more
                  </span>
                </div>

                {/* GRAPHIC AREA - Empty since video is full background */}
                <div className="relative flex-1 w-full"></div>
              </>
            ) : (
              <>
                {/* 1. TEXT ON TOP */}
                <div className="relative z-50 text-center flex flex-col items-center px-6 pt-12 md:pt-16">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-2">
                    {item.title}
                  </h2>
                  <p className="text-lg opacity-80 mb-6">{item.subtitle}</p>
                  <span className="bg-white text-black px-8 py-2.5 rounded-full text-sm font-semibold hover:bg-neutral-100 transition-all duration-300 shadow-lg">
                    Learn more
                  </span>
                </div>

                <div className="relative flex-1 w-full flex items-end justify-center overflow-hidden pb-0 px-4 md:px-8">
                  <div className={`w-full h-full ${item.imageClass || 'max-h-[340px]'} flex items-end justify-center transition-transform duration-700 group-hover:scale-105`}>
                    {item.isRotatingStack ? (
                      <RotatingStackedImages images={item.images} />
                    ) : item.video ? (
                      <video
                        src={getOptimizedCloudinaryUrl(item.video, 800)}
                        autoPlay
                        muted
                        loop
                        playsInline
                        title={`${item.title} preview video`}
                        className="w-full h-full object-contain object-bottom mx-auto drop-shadow-2xl"
                      />
                    ) : (
                      item.image && (
                        <div className="relative w-full h-full flex items-end justify-center">
                          <img
                            src={getOptimizedCloudinaryUrl(item.image, 800)}
                            alt={`${item.title} - ${item.subtitle}`}
                            className="w-full h-full object-contain object-bottom mx-auto"
                          />
                          {/* Hover Overlay Context */}
                          {item.hoverContext && (
                            <div className="hidden md:flex absolute inset-x-0 bottom-6 mx-auto w-[75%] h-fit bg-transparent backdrop-blur-xl border border-white/20 rounded-2xl p-4 opacity-0 md:group-hover:opacity-100 transition-all duration-500 translate-y-4 md:group-hover:translate-y-0 flex-col justify-center items-center text-center z-30 shadow-2xl">                            <h3 className="text-lg font-bold text-white mb-1 italic">
                              {item.hoverContext.expert}
                            </h3>
                              <p className="text-xs text-white/80 leading-relaxed font-medium">
                                {item.hoverContext.fact}
                              </p>
                            </div>
                          )}
                        </div>
                      )
                    )}
                  </div>
                </div>
              </>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CombinedServicesGrid;
