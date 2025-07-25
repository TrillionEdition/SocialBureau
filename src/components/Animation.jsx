import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "/assets/9.webp",
  "/assets/12.webp",
  "/assets/18.webp",
  "/assets/3.webp",
  "/assets/13.webp",
  "/assets/25.webp",
  "/assets/8.webp",
  "/assets/14.webp",
  "/assets/24.webp",
  "/assets/4.webp",
  "/assets/10.webp",
  "/assets/19.webp",
  "/assets/6.webp",
  "/assets/17.webp",
  "/assets/23.webp",
  "/assets/7.webp",
  "/assets/16.webp",
  "/assets/20.webp",
  "/assets/2.webp",
  "/assets/11.webp",
  "/assets/21.webp",
  "/assets/5.webp",
  "/assets/13.webp",
  "/assets/22.webp",
];

const Animation = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 700); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[30vh] lg:h-screen items-center justify-center flex text-center">
      <AnimatePresence>
        <motion.img
          key={images[current]}
          src={images[current]}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4 }}
          className="w-[90vw] lg:h-full object-cover absolute text-center "
        />
      </AnimatePresence>
    </div>
  );
};

export default Animation;
