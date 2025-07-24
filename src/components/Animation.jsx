import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
    "/assets/4.png",
  "/assets/13.png",
  "/assets/22.png",
  "/assets/7.png",
  "/assets/16.png",
  "/assets/25.png",
  "/assets/2.png",
  "/assets/11.png",
  "/assets/20.png",
  "/assets/5.png",
  "/assets/14.png",
  "/assets/23.png",
  "/assets/8.png",
  "/assets/17.png",
  "/assets/18.png",
  "/assets/3.png",
  "/assets/12.png",
  "/assets/21.png",
  "/assets/6.png",
  "/assets/15.png",
  "/assets/24.png",
  "/assets/9.png",
  "/assets/10.png",
  "/assets/19.png",
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
