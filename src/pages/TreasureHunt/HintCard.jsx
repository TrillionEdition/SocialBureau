import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X, Sparkles, Hourglass } from "lucide-react";
import axios from "axios";
import { BASE_URL } from "@/utils/urls";
import { getTreasureHuntStartTime } from "../../utils/treasureHunt";
import TreasureHuntSound from "@/utils/treasureHuntSound";
import "./HintCard.css";

const TOTAL_FRAMES = 158;

export const HintCard = ({ onClose, clueText = "Explore the uncharted waters and search where partnerships are formed. Perhaps Ranjit's territory holds the key.", hintNumber, hintTitle }) => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showClue, setShowClue] = useState(false);

  // Claim Form States
  const [showClaimForm, setShowClaimForm] = useState(false);
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [qrFile, setQrFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [totalTimeStr, setTotalTimeStr] = useState("");

  useEffect(() => {
    if (hintTitle === "Success!" || hintNumber === 9) {
      // Prioritize the locked final time
      const lockedTime = localStorage.getItem('treasure_hunt_final_time');
      if (lockedTime) {
        setTotalTimeStr(lockedTime);
        return;
      }

      // Fallback: calculate live elapsed time
      const startTime = getTreasureHuntStartTime();
      if (startTime) {
        const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
        const h = Math.floor(elapsedSeconds / 3600);
        const m = Math.floor((elapsedSeconds % 3600) / 60);
        const s = elapsedSeconds % 60;
        const pad = (n) => String(n).padStart(2, "0");
        const formatted = h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
        setTotalTimeStr(formatted);
      } else {
        setTotalTimeStr("00:00");
      }
    }
  }, [hintTitle, hintNumber]);

  useEffect(() => {
    if (showClue) {
      if (hintTitle === "Success!" || hintNumber === 9) {
        TreasureHuntSound.playWinningSound(true); // Loop victory music
      } else {
        // Placeholder: Add another sound from the sounds folder later
      }
    }
  }, [showClue, hintTitle, hintNumber]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!name || !mobileNumber) return;
    setSubmitting(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("mobileNumber", mobileNumber);
    formData.append("totalTime", totalTimeStr);
    if (qrFile) {
      formData.append("qrCode", qrFile);
    }

    try {
      const resp = await axios.post(`${BASE_URL}/lottery/claim`, formData);
      if (resp && resp.status === 201) {
        setSubmitted(true);
        localStorage.setItem('treasure_hunt_claimed', 'true');
        localStorage.setItem('treasure_hunt_play_winning_sound', 'true');
        window.dispatchEvent(new Event('treasure_hunt_update')); // notify other listeners to hide icons/timer
        setTimeout(() => {
          setShowClaimForm(false);
          onClose();
          navigate("/leaderboard");
        }, 2500);
      } else {
        alert("Failed to submit details.");
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to submit details.");
    } finally {
      setSubmitting(false);
    }
  };

  // 1. Preload WebP frame sequence (optimized by skipping frames to reduce requests/memory)
  useEffect(() => {
    let active = true;
    const images = [];
    let loadedCount = 0;

    const SKIP_FACTOR = 3; // Load every 3rd frame (e.g. 1, 4, 7, ... 157, 158)
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
        img.src = `/assets/HintCard/ezgif-frame-${paddedIndex}.webp`;
        img.onload = () => {
          if (!active) return resolve(false);
          images[index - 1] = img;
          loadedCount++;
          setLoadingProgress(Math.round((loadedCount / totalToLoad) * 100));
          resolve(true);
        };
        img.onerror = () => {
          console.warn(`Failed to load frame ${index}`);
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
      if (active) {
        imagesRef.current = images;
        setIsLoaded(true);
      }
    };

    preloadAll();

    return () => {
      active = false;
    };
  }, []);

  // Helper to draw a frame onto the canvas
  const drawFrame = (index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Nearest loaded frame fallback search
    let img = imagesRef.current[index];
    if (!img) {
      for (let k = index - 1; k >= 0; k--) {
        if (imagesRef.current[k]) {
          img = imagesRef.current[k];
          break;
        }
      }
    }
    if (!img) {
      for (let k = index + 1; k < TOTAL_FRAMES; k++) {
        if (imagesRef.current[k]) {
          img = imagesRef.current[k];
          break;
        }
      }
    }

    if (!img) return;

    // Handle resolution / retina screens
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    }

    const imgWidth = img.width || 600;
    const imgHeight = img.height || 600;

    // Center and contain the image inside the canvas
    const ratio = Math.min(rect.width / imgWidth, rect.height / imgHeight);
    const newWidth = imgWidth * ratio;
    const newHeight = imgHeight * ratio;
    const x = (rect.width - newWidth) / 2;
    const y = (rect.height - newHeight) / 2;

    ctx.clearRect(0, 0, rect.width, rect.height);
    ctx.drawImage(img, x, y, newWidth, newHeight);

    // Chroma keying filter to remove the grey-and-white checkerboard background
    try {
      const sx = Math.round(x * dpr);
      const sy = Math.round(y * dpr);
      const sw = Math.round(newWidth * dpr);
      const sh = Math.round(newHeight * dpr);

      const imgData = ctx.getImageData(sx, sy, sw, sh);
      const data = imgData.data;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Checkerboard is purely white (255), light grey (around 204), and black/dark cells (around 0)
        // Verify it is grayscale (R, G, and B are very close)
        const isGrayscale = Math.abs(r - g) < 10 && Math.abs(g - b) < 10;
        const isWhite = r > 230 && g > 230 && b > 230;
        const isGray = r >= 160 && r <= 228;

        if (isGrayscale && (isWhite || isGray)) {
          data[i + 3] = 0; // Make pixel transparent
        }
      }

      ctx.putImageData(imgData, sx, sy);
    } catch (err) {
      console.warn("Chroma keying failed:", err);
    }
  };

  // 2. Playback animation loop
  useEffect(() => {
    if (!isLoaded || imagesRef.current.length === 0) return;

    let frame = 0;
    let animId;
    let lastTime = performance.now();
    const fps = 30; // Target 30 frames per second
    const interval = 1000 / fps;

    const play = (currentTime) => {
      const delta = currentTime - lastTime;

      if (delta >= interval) {
        lastTime = currentTime - (delta % interval);
        drawFrame(frame);

        if (frame < TOTAL_FRAMES - 1) {
          frame = Math.min(TOTAL_FRAMES - 1, frame + 3);
        } else {
          // Animation finished! Keep the final frame drawn and show clue text.
          setShowClue(true);
          return;
        }
      }

      animId = requestAnimationFrame(play);
    };

    animId = requestAnimationFrame(play);

    // Redraw on window resize
    const handleResize = () => drawFrame(frame);
    window.addEventListener("resize", handleResize);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [isLoaded]);

  return (
    <div className="hint-modal-overlay">
      {(hintTitle === "Success!" || hintNumber === 9) && showClue && <GoldCoinsCanvas />}
      <div className="hint-modal-container">
        {/* Close Button */}
        <button className="hint-modal-close" onClick={() => { TreasureHuntSound.playClick(); onClose(); }} aria-label="Close Hint">
          <X size={24} />
        </button>

        {/* Loader Screen while loading WebP frames */}
        {!isLoaded && (
          <div className="hint-card-loader-container">
            <Hourglass className="hint-loader-hourglass" size={48} />
          </div>
        )}

        {/* Canvas & Text Overlay */}
        <div 
          className="hint-canvas-wrapper" 
          style={{ opacity: isLoaded ? 1 : 0, transition: "opacity 0.5s ease" }}
        >
          <canvas ref={canvasRef} />

          {/* Clue text overlays on top of the card at the end of the video */}
          <AnimatePresence>
            {showClue && (
              <motion.div
                className={`hint-text-overlay ${(hintTitle === "Success!" || hintNumber === 9) ? "success-overlay" : ""}`}
                initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="hint-content">
                  <h3 className="hint-clue-heading">
                    {hintTitle || (hintNumber === 9 ? "Success!" : `Hint ${hintNumber}`)}
                  </h3>
                  <p className="hint-clue-description">{clueText}</p>
                  {(hintTitle === "Success!" || hintNumber === 9) && (
                    <button 
                      className="ancient-claim-btn"
                      onClick={() => {
                        TreasureHuntSound.playClick();
                        setShowClaimForm(true);
                      }}
                    >
                      Claim Reward
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {showClaimForm && (
        <div className="claim-form-overlay" onClick={() => setShowClaimForm(false)}>
          <div 
            className="claim-form-container" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top decorative gold ribbon */}
            <div className="claim-gold-ribbon" />
            
            <button className="claim-close-btn" onClick={() => { TreasureHuntSound.playClick(); setShowClaimForm(false); }}>
              <X size={20} />
            </button>

            {submitted ? (
              <div className="claim-success-view">
                <div className="claim-success-icon-wrapper">
                  <svg className="claim-success-svg" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="claim-success-title">Details Submitted!</h2>
                <p className="claim-success-desc">
                  Your Treasure Hunt completion details have been securely recorded. Our admin team will verify your time of <strong>{totalTimeStr}</strong> and process the reward!
                </p>
                <button 
                  onClick={() => {
                    setShowClaimForm(false);
                    onClose();
                  }}
                  className="claim-btn-primary"
                >
                  Close
                </button>
              </div>
            ) : (
              <div className="claim-inputs-view">
                <div className="claim-badge-container">
                  <span className="claim-badge-text">
                    🏆 Hunt Completed! 🏆
                  </span>
                </div>
                
                <h2 className="claim-form-title">
                  Claim Your Reward
                </h2>
                <p className="claim-form-subtitle">
                  Enter your details below to record your achievement in our leaderboard.
                </p>
                
                <form onSubmit={handleFormSubmit} className="claim-form-fields">
                  <div className="claim-field">
                    <label className="claim-label">Full Name</label>
                    <input 
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      className="claim-input"
                    />
                  </div>

                  <div className="claim-field">
                    <label className="claim-label">Mobile Number</label>
                    <input 
                      type="tel"
                      required
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      placeholder="Enter your mobile number"
                      className="claim-input"
                    />
                  </div>

                  <div className="claim-field">
                    <label className="claim-label">Total Time Taken</label>
                    <input 
                      type="text"
                      readOnly
                      value={totalTimeStr}
                      className="claim-input claim-input-readonly"
                    />
                  </div>
                  
                  <div className="claim-divider">
                    <span className="claim-divider-text">OR UPLOAD QR</span>
                  </div>
                  
                  <div className="claim-field">
                    <label className="claim-label">Upload UPI QR Code (Optional)</label>
                    <input 
                      type="file"
                      accept="image/*"
                      onChange={(e) => setQrFile(e.target.files[0])}
                      className="claim-file-input"
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={submitting || !name || !mobileNumber}
                    className="claim-submit-btn"
                  >
                    {submitting ? "Submitting..." : "Submit Claims"}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const GoldCoinsCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (canvas) {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      }
    };
    window.addEventListener("resize", handleResize);

    // Mouse tracking state
    const mouse = {
      x: -1000,
      y: -1000,
      vx: 0,
      vy: 0,
      lastX: 0,
      lastY: 0
    };

    const handleMouseMove = (e) => {
      const mx = e.clientX;
      const my = e.clientY;
      mouse.vx = mx - mouse.lastX;
      mouse.vy = my - mouse.lastY;
      mouse.x = mx;
      mouse.y = my;
      mouse.lastX = mx;
      mouse.lastY = my;
    };

    const handleMouseDown = (e) => {
      TreasureHuntSound.playClick();
      const mx = e.clientX;
      const my = e.clientY;
      // Spawn 15-20 particles bursting in different directions
      const burstCount = Math.floor(Math.random() * 6) + 15;
      for (let i = 0; i < burstCount; i++) {
        particles.push({
          x: mx,
          y: my,
          vx: (Math.random() - 0.5) * 14,
          vy: (Math.random() - 0.7) * 14 - 3,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: Math.random() * 0.2 + 0.05,
          radius: Math.random() * 4 + 5,
          depth: Math.random() * 0.4 + 0.6,
          isBurst: true,
          opacity: 1,
          decay: 0.97,
          gravity: 0.25
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);

    const particleCount = 100;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * -height - 20,
        vy: Math.random() * 3 + 2,
        vx: Math.random() * 2 - 1,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: Math.random() * 0.08 + 0.03,
        radius: Math.random() * 5 + 6,
        depth: Math.random() * 0.5 + 0.5,
        isBurst: false,
        opacity: 1
      });
    }

    const drawCoin = (p) => {
      const scaleX = Math.abs(Math.sin(p.rotation));
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.scale(scaleX, 1);
      ctx.rotate(p.rotation / 5);

      ctx.globalAlpha = p.opacity || 1;

      const grad = ctx.createLinearGradient(-p.radius, -p.radius, p.radius, p.radius);
      grad.addColorStop(0, "#FFE57F");
      grad.addColorStop(0.3, "#FFD54F");
      grad.addColorStop(0.7, "#FFB300");
      grad.addColorStop(1, "#FF8F00");

      ctx.beginPath();
      ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(0, 0, p.radius * 0.75, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
      ctx.strokeStyle = "#B8860B";
      ctx.lineWidth = 1.2;
      ctx.stroke();

      ctx.restore();
    };

    const update = () => {
      ctx.clearRect(0, 0, width, height);

      // Decelerate mouse velocity
      mouse.vx *= 0.9;
      mouse.vy *= 0.9;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        if (p.isBurst) {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += p.gravity;
          p.vx *= p.decay;
          p.vy *= p.decay;
          p.rotation += p.rotationSpeed;
          p.opacity -= 0.015; // Fade out slowly

          if (p.opacity <= 0 || p.y > height + 20 || p.x < -20 || p.x > width + 20) {
            particles.splice(i, 1);
            continue;
          }
        } else {
          p.y += p.vy * p.depth;
          p.x += p.vx * p.depth;
          p.rotation += p.rotationSpeed;

          // Mouse interaction (wind / repulsion force)
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 180) {
            const force = (180 - dist) / 180;
            // Push away + wind velocity vector force
            p.x += (dx / dist) * force * 7 + mouse.vx * 0.35;
            p.y += (dy / dist) * force * 7 + mouse.vy * 0.35;
          }

          if (p.y > height + 20) {
            p.y = -20;
            p.x = Math.random() * width;
            p.vy = Math.random() * 3 + 2;
            p.vx = Math.random() * 2 - 1;
          }
        }
      }

      const sorted = [...particles].sort((a, b) => a.depth - b.depth);
      sorted.forEach(drawCoin);

      animId = requestAnimationFrame(update);
    };

    update();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  );
};

export default HintCard;
