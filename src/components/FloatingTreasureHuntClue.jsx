// src/components/FloatingTreasureHuntClue.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Sparkles, Scroll, HelpCircle, Volume2, VolumeX } from "lucide-react";
import { CLUES, getTreasureHuntStep } from "../utils/treasureHunt";
import HintCard from "../pages/TreasureHunt/HintCard";
import TreasureHuntSound from "@/utils/treasureHuntSound";
import "./FloatingTreasureHuntClue.css";

export const FloatingTreasureHuntClue = () => {
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(0);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [processedSrc, setProcessedSrc] = useState(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(TreasureHuntSound.getIsAudioPlaying());

  useEffect(() => {
    // Read initial step
    setCurrentStep(getTreasureHuntStep());

    // Listen for state machine updates
    const handleUpdate = () => {
      setCurrentStep(getTreasureHuntStep());
    };
    window.addEventListener("treasure_hunt_update", handleUpdate);

    // Sync audio state
    const handleAudioChange = (e) => {
      setIsAudioPlaying(e.detail);
    };
    window.addEventListener("treasure_hunt_audio_change", handleAudioChange);

    return () => {
      window.removeEventListener("treasure_hunt_update", handleUpdate);
      window.removeEventListener("treasure_hunt_audio_change", handleAudioChange);
    };
  }, []);

  // Track route changes globally to control background music state
  useEffect(() => {
    const step = getTreasureHuntStep();
    const isClaimed = localStorage.getItem('treasure_hunt_claimed') === 'true';
    const isGameActive = step > 0 && !isClaimed;
    const isTreasureHuntPage = location.pathname === "/treasure-hunt";

    if (isTreasureHuntPage || isGameActive) {
      TreasureHuntSound.syncBackgroundMusicState();
    } else {
      TreasureHuntSound.pauseBackgroundMusic();
    }
  }, [location.pathname, currentStep]);

  useEffect(() => {
    const img = new Image();
    img.src = "/assets/HintCard/ezgif-frame-001.webp";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        setProcessedSrc(img.src);
        return;
      }
      ctx.drawImage(img, 0, 0);
      try {
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const isGrayscale = Math.abs(r - g) < 10 && Math.abs(g - b) < 10;
          const isWhite = r > 230 && g > 230 && b > 230;
          const isGray = r >= 160 && r <= 228;
          const isBlack = r < 50 && g < 50 && b < 50;
          if (isGrayscale && (isWhite || isGray || isBlack)) {
            data[i + 3] = 0; // Transparent
          }
        }
        ctx.putImageData(imgData, 0, 0);
        setProcessedSrc(canvas.toDataURL("image/png"));
      } catch (e) {
        setProcessedSrc(img.src);
      }
    };
  }, []);

  // Don't show if the hunt hasn't started or they already claimed the reward
  const isClaimed = localStorage.getItem('treasure_hunt_claimed') === 'true';
  if (currentStep === 0 || isClaimed) {
    return null;
  }

  // Handle final completion state
  if (currentStep > CLUES.length) {
    return (
      <>
        {/* Floating Audio Toggle Button */}
        <button 
          className={`floating-audio-btn ${isAudioPlaying ? "active" : ""}`}
          onClick={(e) => { e.stopPropagation(); TreasureHuntSound.toggleBackgroundMusic(); }}
          aria-label={isAudioPlaying ? "Mute Background Music" : "Unmute Background Music"}
          title={isAudioPlaying ? "Mute Game Music" : "Play Game Music"}
        >
          {isAudioPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>

        <div className="floating-clue-bubble completed animate-bounce-slow" onClick={() => { TreasureHuntSound.playOpenHint(); setIsOverlayOpen(true); }}>
          <Sparkles size={20} className="glow-icon text-gold" />
          <span className="floating-clue-label">HUNT COMPLETED!</span>
        </div>
        
        {isOverlayOpen && (
          <HintCard
            clueText="Congratulations! You have completed the grand Treasure Hunt! The real treasure is the knowledge and connections you have made today."
            hintTitle="Success!"
            onClose={() => { TreasureHuntSound.playClick(); setIsOverlayOpen(false); }}
          />
        )}
      </>
    );
  }

  const activeClue = CLUES[currentStep - 1];

  return (
    <>
      {/* Floating Audio Toggle Button */}
      <button 
        className={`floating-audio-btn ${isAudioPlaying ? "active" : ""}`}
        onClick={(e) => { e.stopPropagation(); TreasureHuntSound.toggleBackgroundMusic(); }}
        aria-label={isAudioPlaying ? "Mute Background Music" : "Unmute Background Music"}
        title={isAudioPlaying ? "Mute Game Music" : "Play Game Music"}
      >
        {isAudioPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
      </button>

      {/* Floating Scroll Icon */}
      <div 
        className="floating-clue-bubble" 
        onClick={() => { TreasureHuntSound.playOpenHint(); setIsOverlayOpen(true); }}
        title="View Active Hint"
      >
        <div className="floating-clue-icon-wrapper">
          <img 
            src={processedSrc || "/assets/HintCard/ezgif-frame-001.webp"} 
            className="floating-scroll-icon-img" 
            alt="Closed Clue Card" 
          />
          <span className="floating-badge">{currentStep}</span>
        </div>
        <div className="floating-clue-info">
          <span className="floating-clue-title">ACTIVE HINT</span>
          <span className="floating-clue-subtitle">Click to Open</span>
        </div>
        <div className="floating-pulse-glow" />
      </div>

      {/* Unrolled Hint Card Overlay */}
      {isOverlayOpen && (
        <HintCard
          clueText={activeClue.clueText}
          hintNumber={currentStep}
          onClose={() => { TreasureHuntSound.playClick(); setIsOverlayOpen(false); }}
        />
      )}
    </>
  );
};

export default FloatingTreasureHuntClue;
