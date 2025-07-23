import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "/assets/2.png",
  "/assets/3.png",
  "/assets/4.png",
  "/assets/5.png",
  "/assets/6.png",
//   "/assets/7.png",
  "/assets/8.png",
  "/assets/9.png",
  "/assets/10.png",
  "/assets/11.png",
  "/assets/12.png",
  "/assets/13.png",
  "/assets/14.png",
//   "/assets/15.png",
  "/assets/16.png",
  "/assets/17.png",
  "/assets/18.png",
  "/assets/19.png",
  "/assets/20.png",
  "/assets/21.png",
  "/assets/22.png",
//   "/assets/23.png",
  "/assets/24.png",
  "/assets/25.png",
];

const Animation = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 700); // 0.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden">
      <AnimatePresence>
        <motion.img
          key={images[current]}
          src={images[current]}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4 }}
          className="w-full h-full object-cover absolute top-0 left-0"
        />
      </AnimatePresence>
    </div>
  );
};

export default Animation;
