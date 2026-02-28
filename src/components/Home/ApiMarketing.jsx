

import React from "react";
import { motion } from "framer-motion";

// Utility function to optimize Cloudinary URLs
const getOptimizedCloudinaryUrl = (url, width = 1280) => {
  if (!url || !url.includes('cloudinary.com')) return url;
  if (url.includes('/video/upload/')) {
    return url.replace('/video/upload/', `/video/upload/f_auto,q_auto,w_${width},c_scale/`);
  }
  return url;
};

const ApiMarketingHero = () => {
  return (
    <section className="relative w-full h-[90vh] overflow-hidden bg-white">
      <video
        src={getOptimizedCloudinaryUrl("https://res.cloudinary.com/dtwcgfmar/video/upload/v1772009036/947a1c7e-d4ff-466e-a771-9a87f86c0d12_hpm2lu.mp4", 1280)}
        autoPlay
        loop
        muted
        playsInline
        title="SocialBureau API-driven marketing background"
        className="
      absolute inset-0
      w-full h-full
     object-center
      scale-125
      origin-center
    "
      />
      <div className="absolute inset-0 bg-black/10"></div>
    </section>
  );
};

export default ApiMarketingHero;