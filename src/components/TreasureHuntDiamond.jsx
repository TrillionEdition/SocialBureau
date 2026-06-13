// src/components/TreasureHuntDiamond.jsx
import React, { useState, useEffect, useRef } from "react";
import { getTreasureHuntStep, setTreasureHuntStep } from "../utils/treasureHunt";
import HintCard from "../pages/TreasureHunt/HintCard";
import TreasureHuntSound from "@/utils/treasureHuntSound";
import "./TreasureHuntDiamond.css";

const TOTAL_FRAMES = 120;
const SKIP_FACTOR = 4; // Load every 4th frame (31 frames total) to be highly performance/network friendly

export const TreasureHuntDiamond = ({ stepRequired, clueText }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setCurrentStep(getTreasureHuntStep());

    const handleUpdate = () => {
      setCurrentStep(getTreasureHuntStep());
    };
    window.addEventListener("treasure_hunt_update", handleUpdate);
    return () => window.removeEventListener("treasure_hunt_update", handleUpdate);
  }, []);

  // Preload frames for the themed card animation
  useEffect(() => {
    if (currentStep !== stepRequired) return;

    let active = true;
    const images = [];
    let loadedCount = 0;

    const framesToLoad = [];
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      if (i === 1 || i === TOTAL_FRAMES || (i - 1) % SKIP_FACTOR === 0) {
        framesToLoad.push(i);
      }
    }
    const totalToLoad = framesToLoad.length;

    const loadImage = (index) => {
      return new Promise((resolve) => {
        const img = new Image();
        const paddedIndex = String(index).padStart(3, "0");
        img.src = `/assets/TreasureHunt/frame-${paddedIndex}.webp`;
        img.onload = () => {
          if (!active) return resolve(false);
          images[index - 1] = img;
          loadedCount++;
          if (loadedCount === totalToLoad) {
            imagesRef.current = images;
            setIsLoaded(true);
          }
          resolve(true);
        };
        img.onerror = () => {
          resolve(false);
        };
      });
    };

    const preloadAll = async () => {
      const promises = [];
      for (const frameIndex of framesToLoad) {
        promises.push(loadImage(frameIndex));
      }
      await Promise.all(promises);
    };

    preloadAll();

    return () => {
      active = false;
    };
  }, [currentStep, stepRequired]);

  // Helper to draw a frame onto the canvas with chroma-keying
  const drawFrame = (index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let img = imagesRef.current[index];
    if (!img) {
      for (let k = index - 1; k >= 0; k--) {
        if (imagesRef.current[k]) {
          img = imagesRef.current[k];
          break;
        }
      }
    }
    if (!img) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    }

    const imgWidth = img.width || 200;
    const imgHeight = img.height || 200;

    // Center and contain the image
    const ratio = Math.min(rect.width / imgWidth, rect.height / imgHeight);
    const newWidth = imgWidth * ratio;
    const newHeight = imgHeight * ratio;
    const x = (rect.width - newWidth) / 2;
    const y = (rect.height - newHeight) / 2;

    ctx.clearRect(0, 0, rect.width, rect.height);
    ctx.drawImage(img, x, y, newWidth, newHeight);
  };

  // Play animation loop
  useEffect(() => {
    if (!isLoaded || imagesRef.current.length === 0) return;

    let frame = 0;
    let animId;
    let lastTime = performance.now();
    const fps = 24; // Smooth loop at 24fps
    const interval = 1000 / fps;

    const play = (currentTime) => {
      const delta = currentTime - lastTime;

      if (delta >= interval) {
        lastTime = currentTime - (delta % interval);
        drawFrame(frame);
        frame = (frame + SKIP_FACTOR) % TOTAL_FRAMES;
      }

      animId = requestAnimationFrame(play);
    };

    animId = requestAnimationFrame(play);

    const handleResize = () => drawFrame(frame);
    window.addEventListener("resize", handleResize);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [isLoaded]);

  const shouldShowDiamond = currentStep === stepRequired;

  if (!shouldShowDiamond && !isPopupOpen) {
    return null;
  }

  const handleClick = () => {
    TreasureHuntSound.playOpenHint();
    setIsPopupOpen(true);
    // Advance the progress step in localStorage
    setTreasureHuntStep(stepRequired + 1);
  };

  return (
    <>
      {shouldShowDiamond && (
        <div className="treasure-diamond-wrapper" onClick={handleClick}>
          <div className="treasure-diamond-container">
            <canvas ref={canvasRef} className="treasure-diamond-canvas" />
            <div className="treasure-diamond-text-overlay">
              <span className="treasure-diamond-label">Hint</span>
              <span className="treasure-diamond-number">{stepRequired + 1}</span>
            </div>
          </div>
          <div className="treasure-diamond-aura" />
        </div>
      )}

      {isPopupOpen && (
        <HintCard
          clueText={clueText}
          hintNumber={stepRequired + 1}
          onClose={() => { TreasureHuntSound.playClick(); setIsPopupOpen(false); }}
        />
      )}
    </>
  );
};

export default TreasureHuntDiamond;
