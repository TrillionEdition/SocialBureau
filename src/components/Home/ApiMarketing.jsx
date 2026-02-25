

import React from "react";
import { motion } from "framer-motion";

const ApiMarketingHero = () => {
    return (
<section className="relative w-screen h-[90vh] overflow-hidden bg-[#ECECEE]">
  <video
    src="https://res.cloudinary.com/dtwcgfmar/video/upload/v1772009036/947a1c7e-d4ff-466e-a771-9a87f86c0d12_hpm2lu.mp4"
    autoPlay
    loop
    muted
    playsInline
    className="
      absolute inset-0
      w-full h-full
     object-center
      scale-125
      origin-center
    "
  />
</section>
    );
};

export default ApiMarketingHero;