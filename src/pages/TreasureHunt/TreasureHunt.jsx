import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Volume2, VolumeX, Hourglass } from "lucide-react";
import { resetTreasureHunt, startTreasureHunt, startTreasureHuntTimer, CLUES } from "../../utils/treasureHunt";
import TreasureHuntSound from "@/utils/treasureHuntSound";
import HintCard from "./HintCard";
import "./TreasureHunt.css";

const TOTAL_FRAMES = 240;
const PRELOAD_COUNT = 15;

const CHAPTERS = [
  {
    index: 0,
    number: "Prologue",
    title: "The Hunt Begins",
    text: "Welcome to the Treasure Hunt. Hidden throughout our website are clues waiting to be uncovered. Scroll down and begin your journey through innovation, strategy, and discovery.",
    align: "pos-top-left",
    wide: false
  },
  {
    index: 1,
    number: "Chapter I",
    title: "The First Clue",
    text: "Every great discovery starts with curiosity. Explore our digital landscape carefully, because the smallest detail could reveal the next step toward the hidden treasure.",
    align: "pos-bottom-right",
    wide: false
  },
  {
    index: 2,
    number: "Chapter II",
    title: "Decode the Hints",
    text: "Strategic thinking is the key to success. As you navigate through our platform, connect the clues, solve the puzzles, and uncover the stories hidden within our work.",
    align: "pos-top-left",
    wide: false
  },
  {
    index: 3,
    number: "Chapter III",
    title: "The Journey Deepens",
    text: "The path ahead rewards persistence. Dive deeper into our services, partnerships, and innovations to discover the pieces that bring the bigger picture together.",
    align: "pos-bottom-right",
    wide: false
  },
  {
    index: 4,
    number: "Chapter IV",
    title: "Unlock the Treasure",
    text: "You are closer than ever. Follow the final clues, trust your instincts, and prepare to reveal the reward that awaits those who embrace exploration and creativity.",
    align: "pos-top-left",
    wide: false
  },
  {
    index: 5,
    number: "Epilogue",
    title: "Treasure Discovered",
    text: "Congratulations! The real treasure lies in the connections you've made, the ideas you've uncovered, and the opportunities you've explored throughout this journey. Your adventure has only just begun.",
    align: "pos-center",
    wide: true
  }
];

const BTN_TOTAL_FRAMES = 120;

export const TreasureHunt = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const scrollRef = useRef({ target: 0, current: 0 });
  const rafIdRef = useRef(null);
  const imagesRef = useRef([]);
  const sectionRefs = useRef([]);
  const scrollProgressBarRef = useRef(null);
  const scrollDirectionRef = useRef("down");
  const lastScrollYRef = useRef(0);

  // Button animation refs
  const btnCanvasRef = useRef(null);
  const btnImagesRef = useRef([]);
  const btnFrameRef = useRef(0);
  const btnRafRef = useRef(null);
  const btnAudioRef = useRef(null);
  const btnAnimDoneRef = useRef(false);
  const btnLoadedRef = useRef(false);

  const [loadingProgress, setLoadingProgress] = useState(0);
  const [cacheProgress, setCacheProgress] = useState(0);
  const [isInitialLoaded, setIsInitialLoaded] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const [activeDot, setActiveDot] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(true);
  const [showHintCard, setShowHintCard] = useState(false);
  const [btnAnimPlayed, setBtnAnimPlayed] = useState(false);
  const [preloaderOpen, setPreloaderOpen] = useState(true);

  useEffect(() => {
    resetTreasureHunt();
    // Force background music to be unmuted and active on every page mount/visit
    localStorage.removeItem("treasure_hunt_music_muted");
    TreasureHuntSound.setIsAudioPlaying(true);
    TreasureHuntSound.syncBackgroundMusicState();
  }, []);

  useEffect(() => {
    const handleAudioChange = (e) => {
      setIsAudioPlaying(e.detail);
    };
    window.addEventListener("treasure_hunt_audio_change", handleAudioChange);
    return () => {
      window.removeEventListener("treasure_hunt_audio_change", handleAudioChange);
    };
  }, []);

  // Lock html and body scroll when the cinematic preloader screen is active, and force reset scroll to top
  useEffect(() => {
    if (preloaderOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      window.scrollTo(0, 0);
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [preloaderOpen]);

  // Play sound when Chapters activate
  useEffect(() => {
    // Only play transition sounds when scrolling down (forward)
    if (scrollDirectionRef.current === "up") return;

    if (activeChapter === 1) {
      TreasureHuntSound.playHintOpenSequence();
    } else if (activeChapter === 3) {
      TreasureHuntSound.playFile("/assets/Sounds/coinDrops.mp3", 0.6);
    } else if (activeChapter === 5 && !btnAnimPlayed) {
      // Trigger the Start Hunt button animation + audio
      playBtnAnimation();
      setBtnAnimPlayed(true);
    }
  }, [activeChapter]);

  // Reset button animation state when leaving Chapter 5
  useEffect(() => {
    if (activeChapter !== 5) {
      setBtnAnimPlayed(false);
      
      if (btnRafRef.current) {
        cancelAnimationFrame(btnRafRef.current);
        btnRafRef.current = null;
      }
      if (btnAudioRef.current) {
        btnAudioRef.current.pause();
        btnAudioRef.current = null;
      }
    }

    return () => {
      // Clean up on component unmount
      if (btnRafRef.current) {
        cancelAnimationFrame(btnRafRef.current);
      }
      if (btnAudioRef.current) {
        btnAudioRef.current.pause();
      }
    };
  }, [activeChapter]);

  // Preload all 120 button frames in background (once)
  useEffect(() => {
    if (btnLoadedRef.current) return;
    btnLoadedRef.current = true;
    const imgs = [];
    let loaded = 0;
    for (let i = 1; i <= BTN_TOTAL_FRAMES; i++) {
      const img = new Image();
      const idx = String(i).padStart(3, '0');
      img.src = `/assets/StartHuntButtonFrames/btn-frame-${idx}.webp`;
      img.onload = () => {
        imgs[i - 1] = img;
        loaded++;
      };
      img.onerror = () => { loaded++; };
      imgs[i - 1] = img; // store reference immediately
    }
    btnImagesRef.current = imgs;
  }, []);

  // Draw a single button frame onto the btn canvas
  const drawBtnFrame = useCallback((frameIdx) => {
    const canvas = btnCanvasRef.current;
    if (!canvas) return;
    const img = btnImagesRef.current[frameIdx];
    if (!img || !img.complete || img.naturalWidth === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    const ratio = Math.max(w / img.naturalWidth, h / img.naturalHeight);
    const dw = img.naturalWidth * ratio;
    const dh = img.naturalHeight * ratio;
    const dx = (w - dw) / 2;
    const dy = (h - dh) / 2;
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(img, dx, dy, dw, dh);
  }, []);

  // Animate button frames at ~24fps
  const playBtnAnimation = useCallback(() => {
    if (btnRafRef.current) cancelAnimationFrame(btnRafRef.current);
    btnFrameRef.current = 0;
    btnAnimDoneRef.current = false;

    // Play audio
    try {
      if (btnAudioRef.current) {
        btnAudioRef.current.pause();
        btnAudioRef.current.currentTime = 0;
      }
      const audio = new Audio('/assets/Sounds/StartHuntButton_audio.mp3');
      audio.volume = 0.75;
      btnAudioRef.current = audio;
      TreasureHuntSound.duckBackgroundMusic(audio);
      audio.play().catch(e => console.warn('StartHuntButton audio blocked:', e));
    } catch (e) {
      console.warn('Failed to play start hunt audio:', e);
    }

    const FPS = 24;
    const frameDuration = 1000 / FPS;
    let lastTime = null;

    const step = (ts) => {
      if (!lastTime) lastTime = ts;
      const elapsed = ts - lastTime;
      if (elapsed >= frameDuration) {
        lastTime = ts - (elapsed % frameDuration);
        drawBtnFrame(btnFrameRef.current);
        if (btnFrameRef.current < BTN_TOTAL_FRAMES - 1) {
          btnFrameRef.current++;
        } else {
          // Hold last frame, stop animating
          btnAnimDoneRef.current = true;
          return;
        }
      }
      btnRafRef.current = requestAnimationFrame(step);
    };
    btnRafRef.current = requestAnimationFrame(step);
  }, [drawBtnFrame]);

  // Handle Start Hunt button click
  const handleStartHuntClick = useCallback(() => {
    TreasureHuntSound.playOpenHint();
    startTreasureHunt();
    startTreasureHuntTimer();
    setShowHintCard(true);
  }, []);

  const handleHintCardClose = useCallback(() => {
    setShowHintCard(false);
    navigate('/');
  }, [navigate]);

  // Progressive Preloading
  useEffect(() => {
    let active = true;
    const images = [];
    let loadedInitialCount = 0;
    let loadedTotalCount = 0;

    const loadImage = (index) => {
      return new Promise((resolve) => {
        const img = new Image();
        const paddedIndex = String(index).padStart(3, '0');
        // WebP frames inside public/assets/TreasureHunt
        img.src = `/assets/TreasureHunt/frame-${paddedIndex}.webp`;
        img.onload = () => {
          if (!active) return resolve(false);
          images[index - 1] = img;
          loadedTotalCount++;
          setCacheProgress(Math.round((loadedTotalCount / TOTAL_FRAMES) * 100));
          resolve(true);
        };
        img.onerror = () => {
          console.warn(`Failed to load frame ${index}`);
          resolve(false);
        };
      });
    };

    // Preload critical first batch (frames 1 to 15) to make page interactive
    const preloadPromises = [];
    for (let i = 1; i <= PRELOAD_COUNT; i++) {
      preloadPromises.push(
        loadImage(i).then((success) => {
          if (success) {
            loadedInitialCount++;
            setLoadingProgress(Math.round((loadedInitialCount / PRELOAD_COUNT) * 100));
          }
        })
      );
    }

    Promise.all(preloadPromises).then(() => {
      if (!active) return;
      setIsInitialLoaded(true);
      imagesRef.current = images;

      // Progressively load remaining frames (16 to 120) in background in small chunks
      const loadRemaining = async () => {
        const chunkSize = 5;
        for (let i = PRELOAD_COUNT + 1; i <= TOTAL_FRAMES; i += chunkSize) {
          if (!active) break;
          const chunkPromises = [];
          for (let j = 0; j < chunkSize && (i + j) <= TOTAL_FRAMES; j++) {
            chunkPromises.push(loadImage(i + j));
          }
          await Promise.all(chunkPromises);
        }
      };
      loadRemaining();
    });

    return () => {
      active = false;
    };
  }, []);

  // Frame Drawer Helper (with nearest loaded fallback)
  const drawFrame = (index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fallback: search backwards first for loaded frames, then forwards
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

    if (img) {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Handle Retina / high-DPI screens
      const dpr = window.devicePixelRatio || 1;
      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
      }

      // Cinematic "Cover" aspect ratio drawing
      const imgWidth = img.width || 1280;
      const imgHeight = img.height || 720;
      const ratio = Math.max(width / imgWidth, height / imgHeight);
      const newWidth = imgWidth * ratio;
      const newHeight = imgHeight * ratio;
      const x = (width - newWidth) / 2;
      const y = (height - newHeight) / 2;

      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(img, x, y, newWidth, newHeight);
    }
  };

  // Scroll Tracking & RAF Rendering Loop
  useEffect(() => {
    if (!isInitialLoaded) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      
      if (scrollTop > lastScrollYRef.current) {
        scrollDirectionRef.current = "down";
      } else if (scrollTop < lastScrollYRef.current) {
        scrollDirectionRef.current = "up";
      }
      lastScrollYRef.current = scrollTop;

      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const maxScroll = docHeight - winHeight;
      const pct = maxScroll > 0 ? scrollTop / maxScroll : 0;
      scrollRef.current.target = pct;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    const tick = () => {
      const s = scrollRef.current;
      const diff = s.target - s.current;

      // Apple-like smooth scroll interpolation (lerp)
      s.current += diff * 0.08;

      if (Math.abs(s.target - s.current) < 0.0001) {
        s.current = s.target;
      }

      // Map scroll progress (0 to 1) to frame index (0 to 119)
      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.floor(s.current * TOTAL_FRAMES))
      );

      // Render frame
      drawFrame(frameIndex);

      // Direct DOM update of the HUD progress bar (prevents React re-renders)
      if (scrollProgressBarRef.current) {
        scrollProgressBarRef.current.style.width = `${s.current * 100}%`;
      }

      // Map progress to active chapter with visibility gaps (appearing and vanishing)
      let chapterIndex = null;
      if (s.current >= 0.0 && s.current <= 0.10) {
        chapterIndex = 0;
      } else if (s.current >= 0.18 && s.current <= 0.28) {
        chapterIndex = 1;
      } else if (s.current >= 0.36 && s.current <= 0.46) {
        chapterIndex = 2;
      } else if (s.current >= 0.54 && s.current <= 0.64) {
        chapterIndex = 3;
      } else if (s.current >= 0.72 && s.current <= 0.82) {
        chapterIndex = 4;
      } else if (s.current >= 0.90 && s.current <= 1.00) {
        chapterIndex = 5;
      }

      // Sidebar active dot tracking (closest chapter)
      let dotIndex = 0;
      if (s.current < 0.14) {
        dotIndex = 0;
      } else if (s.current < 0.32) {
        dotIndex = 1;
      } else if (s.current < 0.50) {
        dotIndex = 2;
      } else if (s.current < 0.68) {
        dotIndex = 3;
      } else if (s.current < 0.86) {
        dotIndex = 4;
      } else {
        dotIndex = 5;
      }

      setActiveChapter((prev) => (prev !== chapterIndex ? chapterIndex : prev));
      setActiveDot((prev) => (prev !== dotIndex ? dotIndex : prev));

      rafIdRef.current = requestAnimationFrame(tick);
    };

    rafIdRef.current = requestAnimationFrame(tick);

    // Initial Resize to fit Canvas correctly
    const handleResize = () => drawFrame(Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.floor(scrollRef.current.current * TOTAL_FRAMES))));
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [isInitialLoaded]);

  // Toggle background audio playback
  const toggleAudio = (e) => {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
    TreasureHuntSound.toggleBackgroundMusic();
  };

  const scrollToChapter = (index) => {
    TreasureHuntSound.playClick();
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;
    const maxScroll = docHeight - winHeight;
    
    // Target percentages for navigation (centers of visible scroll ranges)
    const pctMap = [0.05, 0.23, 0.41, 0.59, 0.77, 0.95];
    const targetPct = pctMap[index];
    
    window.scrollTo({
      top: targetPct * maxScroll,
      behavior: "smooth"
    });
  };

  return (
    <div className="treasure-hunt-container">
      {/* 1. Cinematic Preloader Screen */}
      <div className={`cinematic-loader ${!preloaderOpen ? "fade-out" : ""}`}>
        <div className="loader-logo">SocialBureau Treasure</div>
        
        {!isInitialLoaded ? (
          <>
            <div className="loader-hourglass-container">
              <Hourglass className="loader-hourglass" size={54} />
              <div className="loader-percentage">{loadingProgress}%</div>
            </div>
          </>
        ) : (
          <div className="ancient-button-container">
            <button 
              className="ancient-button"
              onClick={() => {
                // Direct user click gesture instantly overrides the browser autoplay block
                TreasureHuntSound.setMuted(false);
                const music = TreasureHuntSound.initBackgroundMusic();
                music.play().catch(e => console.warn("Play on enter gesture failed:", e));
                TreasureHuntSound.setIsAudioPlaying(true);
                setPreloaderOpen(false);
              }}
            >
              <div className="ancient-button-inner">
                <span className="ancient-runes-left">◈</span>
                <span className="ancient-text">ENTER EXPERIENCE</span>
                <span className="ancient-runes-right">◈</span>
              </div>
              <div className="ancient-shine" />
            </button>
          </div>
        )}
      </div>

      {/* 2. Background Canvas & Vignette */}
      <div className="canvas-wrapper">
        <canvas ref={canvasRef} />
      </div>

      {/* Cinematic Spotlight Overlay for Start Hunt Button */}
      <AnimatePresence>
        {activeChapter === 5 && (
          <motion.div
            className="btn-anim-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      {/* 3. Global HUD Elements */}
      <div className="scroll-progress-container">
        <div ref={scrollProgressBarRef} className="scroll-progress-bar" />
      </div>

      <header className="hud-layer top-hud">
        <Link to="/" className="logo-hud">
          SOCIAL BUREAU
        </Link>
        <div className="controls-hud">
          <button 
            className={`hud-btn ${isAudioPlaying ? "active" : ""}`}
            onClick={toggleAudio}
            aria-label={isAudioPlaying ? "Mute Background Audio" : "Unmute Background Audio"}
          >
            {isAudioPlaying ? (
              <>
                <Volume2 size={16} />
                <span>SOUND ON</span>
              </>
            ) : (
              <>
                <VolumeX size={16} />
                <span>SOUND OFF</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Chapter Sidebar Dots Navigation */}
      <nav className="story-nav">
        {CHAPTERS.map((ch, idx) => (
          <div
            key={ch.index}
            className={`story-nav-item ${activeDot === idx ? "active" : ""}`}
            onClick={() => scrollToChapter(idx)}
          >
            <div className="story-nav-dot" />
          </div>
        ))}
      </nav>

      {/* 4. Story Scroll Track (purely acts as spacing) */}
      <main className="scroll-container" style={{ height: "1300vh" }}>
        {/* Spacing track to drive the scroll-driven animations */}
      </main>

      {/* 5. Fixed Narrative Overlay Wrapper (handles fixed positioning and transitions) */}
      <div className="fixed-narrative-wrapper">
        <AnimatePresence mode="wait">
          {activeChapter !== null && (
            <motion.div
              key={activeChapter}
              className={`fixed-narrative-container ${CHAPTERS[activeChapter].align}`}
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -30, filter: "blur(8px)" }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            >
              <div className={`narrative-card ${activeChapter === 5 ? "ancient-btn-card" : ""}`}>
                {activeChapter === 5 ? (
                  <div
                    className="start-hunt-btn-canvas-wrapper"
                    onClick={handleStartHuntClick}
                    role="button"
                    aria-label="Start the Treasure Hunt"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && handleStartHuntClick()}
                  >
                    <canvas
                      ref={btnCanvasRef}
                      className="start-hunt-btn-canvas"
                      width={600}
                      height={300}
                    />
                    {!btnAnimPlayed && (
                      <div className="start-hunt-btn-placeholder">
                        <span className="ancient-runes-left">◈</span>
                        <span className="ancient-text">START HUNT</span>
                        <span className="ancient-runes-right">◈</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <span className="chapter-number">{CHAPTERS[activeChapter].number}</span>
                    <h2 className="chapter-title">{CHAPTERS[activeChapter].title}</h2>
                    <p className="chapter-text">{CHAPTERS[activeChapter].text}</p>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scroll prompt displayed only at prologue */}
        <AnimatePresence>
          {activeChapter === 0 && (
            <motion.div
              className="hero-scroll-indicator"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="mouse-icon">
                <div className="mouse-wheel" />
              </div>
              <span className="scroll-text">Scroll to Begin</span>
              <div className="scroll-arrow" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Hint 1 Card Modal - uses the real HintCard (scroll/parchment design) */}
      {showHintCard && (
        <HintCard
          clueText={CLUES[0].clueText}
          hintNumber={1}
          hintTitle="Hint 1"
          onClose={handleHintCardClose}
        />
      )}
    </div>
  );
};

export default TreasureHunt;
