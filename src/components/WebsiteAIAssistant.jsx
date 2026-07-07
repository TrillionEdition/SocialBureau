import React, { useState, useEffect, useRef } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Sparkles, Navigation2, ArrowRight, Volume2, VolumeX } from "lucide-react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// RelizaFace Component: Draws Reliza's face dynamically using vector inline SVGs.
// Supports custom expressions (idle, greeting, thinking, helpful).
// Reliza is dressed in a black shirt, black pants, and a black blazer with sleek contrasts.
export function RelizaFace({ expression, size = "md" }) {
  const dimensions = size === "sm" ? "w-10 h-10" : size === "lg" ? "w-20 h-20" : "w-12 h-12";
  
  return (
    <div className={`${dimensions} shrink-0 bg-slate-950 rounded-full border border-slate-800 flex items-center justify-center overflow-hidden shadow-inner relative select-none`}>
      {/* Glow pulse behind Reliza */}
      <div className="absolute inset-0 bg-blue-500/5 animate-pulse" />
      
      <svg viewBox="0 0 100 100" className="w-full h-full select-none pointer-events-none">
        {/* Antennas */}
        <path d="M 50,16 L 50,4" stroke="#3b82f6" strokeWidth="3.5" strokeLinecap="round" className={expression === "thinking" ? "animate-bounce" : ""} />
        <circle cx="50" cy="4" r="3.5" fill={expression === "thinking" ? "#f59e0b" : expression === "helpful" ? "#10b981" : "#3b82f6"} />

        {/* Neck */}
        <rect x="46" y="52" width="8" height="12" rx="2" fill="#475569" />

        {/* Torso & Suit (Dressed in: Black Blazer, Black Shirt, Black Pants/Belt area) */}
        {/* Torso Base / Blazer */}
        <path d="M 20,70 L 80,70 L 85,100 L 15,100 Z" fill="#111827" />
        
        {/* Black Shirt V-neck collar */}
        <path d="M 40,65 L 50,82 L 60,65 Z" fill="#030712" />
        
        {/* Sleek charcoal tie */}
        <path d="M 48,80 L 52,80 L 53,100 L 47,100 Z" fill="#1f2937" stroke="#374151" strokeWidth="0.5" />
        
        {/* Blazer Lapels */}
        <path d="M 20,70 C 25,64 35,64 42,75 L 48,92 L 15,100 Z" fill="#0b0f19" stroke="#1f2937" strokeWidth="1" />
        <path d="M 80,70 C 75,64 65,64 58,75 L 52,92 L 85,100 Z" fill="#0b0f19" stroke="#1f2937" strokeWidth="1" />

        {/* Pants seam/waistline boundary */}
        <line x1="15" y1="96" x2="85" y2="96" stroke="#030712" strokeWidth="3" />

        {/* Head Shell */}
        <rect x="22" y="14" width="56" height="42" rx="16" fill="#1e293b" stroke="#334155" strokeWidth="2.5" />

        {/* Screen/Faceplate */}
        <rect x="29" y="21" width="42" height="28" rx="8" fill="#0b0f19" stroke="#1e293b" strokeWidth="1.5" />

        {/* Eyes */}
        {expression === "greeting" && (
          <>
            <path d="M 36,36 Q 41,30 46,36" fill="none" stroke="#10b981" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M 54,36 Q 59,30 64,36" fill="none" stroke="#10b981" strokeWidth="3.5" strokeLinecap="round" />
          </>
        )}
        
        {expression === "idle" && (
          <>
            <circle cx="41" cy="34" r="3.5" fill="#3b82f6" className="animate-[pulse_1.5s_infinite]" />
            <circle cx="59" cy="34" r="3.5" fill="#3b82f6" className="animate-[pulse_1.5s_infinite]" />
          </>
        )}

        {expression === "thinking" && (
          <>
            <line x1="36" y1="34" x2="45" y2="34" stroke="#f59e0b" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="55" y1="34" x2="64" y2="34" stroke="#f59e0b" strokeWidth="3.5" strokeLinecap="round" />
          </>
        )}

        {expression === "helpful" && (
          <>
            <circle cx="41" cy="32" r="3.5" fill="#10b981" />
            <circle cx="59" cy="32" r="3.5" fill="#10b981" />
            <circle cx="34" cy="38" r="2" fill="#f43f5e" opacity="0.6" />
            <circle cx="66" cy="38" r="2" fill="#f43f5e" opacity="0.6" />
          </>
        )}

        {/* Mouth */}
        {expression === "greeting" && (
          <path d="M 46,42 Q 50,47 54,42" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" />
        )}
        {expression === "idle" && (
          <line x1="46" y1="42" x2="54" y2="42" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" />
        )}
        {expression === "thinking" && (
          <path d="M 46,41 Q 50,40 54,41" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
        )}
        {expression === "helpful" && (
          <path d="M 45,40 Q 50,47 55,40" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" />
        )}
      </svg>
    </div>
  );
}

// HumanHead3D: 3D Human model utilizing standard shapes with realistic facial features.
function HumanHead3D({ expression, isSpeaking, isScrolled }) {
  const headGroupRef = useRef();
  const leftEyeGroupRef = useRef();
  const rightEyeGroupRef = useRef();
  const leftPupilRef = useRef();
  const rightPupilRef = useRef();
  const mouthRef = useRef();

  // Store raw mouse screen coords
  const rawMouse = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  // Track whether user is idle (no mouse movement for 2 seconds)
  const isIdle = useRef(false);
  const lastMouseMoveTime = useRef(Date.now());

  // Listen for mouse movement — store raw clientX/Y and reset idle timer
  useEffect(() => {
    const handleMouseMove = (event) => {
      rawMouse.current = { x: event.clientX, y: event.clientY };
      lastMouseMoveTime.current = Date.now();
      isIdle.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime();

    // Check if mouse has been still for 2 seconds
    isIdle.current = (Date.now() - lastMouseMoveTime.current) > 2000;

    // Compute Reliza widget center in screen pixels based on its CSS position
    const isMobile = window.innerWidth < 640;
    const btnSize = isMobile ? 80 : 96;
    const rightGap = isMobile ? 16 : 24;

    const widgetCenterX = window.innerWidth - rightGap - btnSize / 2;
    const widgetCenterY = isScrolled
      ? (isMobile ? 80 : 96) + btnSize / 2
      : window.innerHeight - rightGap - btnSize / 2;

    // Direction from widget center to mouse cursor, normalised roughly -1..1
    const dx = (rawMouse.current.x - widgetCenterX) / (window.innerWidth  * 0.5);
    const dy = (rawMouse.current.y - widgetCenterY) / (window.innerHeight * 0.5);

    // 1. Head always faces straight forward — only breathing float, no rotation
    if (headGroupRef.current) {
      headGroupRef.current.rotation.y = THREE.MathUtils.lerp(headGroupRef.current.rotation.y, 0, 0.08);
      headGroupRef.current.rotation.x = THREE.MathUtils.lerp(headGroupRef.current.rotation.x, 0, 0.08);
      headGroupRef.current.position.y = 0.4 + Math.sin(elapsedTime * 1.8) * 0.03;
    }

    // 2. Pupil tracking — follows mouse relative to widget position
    if (leftPupilRef.current && rightPupilRef.current) {
      const targetPupilX = (isSpeaking || isIdle.current) ? 0 : dx * 0.015;
      const targetPupilY = (isSpeaking || isIdle.current) ? 0 : -dy * 0.012;

      leftPupilRef.current.position.x  = THREE.MathUtils.lerp(leftPupilRef.current.position.x,  targetPupilX, 0.1);
      leftPupilRef.current.position.y  = THREE.MathUtils.lerp(leftPupilRef.current.position.y,  targetPupilY, 0.1);
      rightPupilRef.current.position.x = THREE.MathUtils.lerp(rightPupilRef.current.position.x, targetPupilX, 0.1);
      rightPupilRef.current.position.y = THREE.MathUtils.lerp(rightPupilRef.current.position.y, targetPupilY, 0.1);
    }

    // 3. Eye blinking cycle
    const blinkCycle = elapsedTime % 5.2;
    if (leftEyeGroupRef.current && rightEyeGroupRef.current) {
      if (blinkCycle > 4.95) {
        leftEyeGroupRef.current.scale.y = THREE.MathUtils.lerp(leftEyeGroupRef.current.scale.y, 0.02, 0.5);
        rightEyeGroupRef.current.scale.y = THREE.MathUtils.lerp(rightEyeGroupRef.current.scale.y, 0.02, 0.5);
      } else {
        leftEyeGroupRef.current.scale.y = THREE.MathUtils.lerp(leftEyeGroupRef.current.scale.y, 1.0, 0.15);
        rightEyeGroupRef.current.scale.y = THREE.MathUtils.lerp(rightEyeGroupRef.current.scale.y, 1.0, 0.15);
      }
    }

    // 4. Mouth animation:
    //    - Speaking  → speech wave
    //    - Idle 2s+  → gentle wide smile
    //    - Normal    → neutral closed
    if (mouthRef.current) {
      if (isSpeaking) {
        mouthRef.current.scale.y = 1.0 + Math.sin(elapsedTime * 28) * 1.2;
        mouthRef.current.scale.x = 1.0 + Math.cos(elapsedTime * 14) * 0.2;
      } else if (isIdle.current) {
        mouthRef.current.scale.x = THREE.MathUtils.lerp(mouthRef.current.scale.x, 2.2, 0.06);
        mouthRef.current.scale.y = THREE.MathUtils.lerp(mouthRef.current.scale.y, 0.9, 0.06);
      } else {
        mouthRef.current.scale.y = THREE.MathUtils.lerp(mouthRef.current.scale.y, 0.25, 0.12);
        mouthRef.current.scale.x = THREE.MathUtils.lerp(mouthRef.current.scale.x, 1.0, 0.12);
      }
    }
  });

  return (
    <group>
      {/* 1. HEAD GROUP (Tilts, rotates, and floats independently) */}
      <group ref={headGroupRef} position={[0, 0.4, 0]}>
        {/* Head Shell (Face) */}
        <mesh>
          <sphereGeometry args={[0.32, 32, 32]} scale={[1, 1.15, 1]} />
          <meshStandardMaterial color="#fdeb8a" roughness={0.4} metalness={0.1} />
        </mesh>

        {/* Bob Hair shape (Back & Top) */}
        <mesh position={[0, 0.08, -0.05]}>
          <sphereGeometry args={[0.34, 32, 32]} scale={[1.04, 1.1, 1.02]} />
          <meshStandardMaterial color="#1b1c22" roughness={0.8} />
        </mesh>
        
        {/* Hair Bangs */}
        <mesh position={[-0.14, 0.22, 0.2]} rotation={[0.2, 0.4, -0.2]}>
          <boxGeometry args={[0.22, 0.1, 0.1]} />
          <meshStandardMaterial color="#1b1c22" roughness={0.8} />
        </mesh>
        <mesh position={[0.14, 0.22, 0.2]} rotation={[0.2, -0.4, 0.2]}>
          <boxGeometry args={[0.22, 0.1, 0.1]} />
          <meshStandardMaterial color="#1b1c22" roughness={0.8} />
        </mesh>

        {/* Blush Cheeks */}
        <mesh position={[-0.2, -0.06, 0.24]}>
          <sphereGeometry args={[0.035, 16, 16]} scale={[1, 0.6, 0.2]} />
          <meshBasicMaterial color="#fda4af" opacity={0.6} transparent />
        </mesh>
        <mesh position={[0.2, -0.06, 0.24]}>
          <sphereGeometry args={[0.035, 16, 16]} scale={[1, 0.6, 0.2]} />
          <meshBasicMaterial color="#fda4af" opacity={0.6} transparent />
        </mesh>

        {/* Eyes Group (Left) */}
        <group ref={leftEyeGroupRef} position={[-0.14, 0.06, 0.28]}>
          <mesh>
            <sphereGeometry args={[0.045, 16, 16]} scale={[1.1, 1, 0.5]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <mesh ref={leftPupilRef} position={[0, 0, 0.025]}>
            <sphereGeometry args={[0.024, 16, 16]} scale={[1, 1, 0.5]} />
            <meshBasicMaterial color="#111827" />
          </mesh>
        </group>

        {/* Eyes Group (Right) */}
        <group ref={rightEyeGroupRef} position={[0.14, 0.06, 0.28]}>
          <mesh>
            <sphereGeometry args={[0.045, 16, 16]} scale={[1.1, 1, 0.5]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <mesh ref={rightPupilRef} position={[0, 0, 0.025]}>
            <sphereGeometry args={[0.024, 16, 16]} scale={[1, 1, 0.5]} />
            <meshBasicMaterial color="#111827" />
          </mesh>
        </group>

        {/* Nose */}
        <mesh position={[0, -0.02, 0.32]}>
          <sphereGeometry args={[0.022, 16, 16]} scale={[1, 1.4, 0.8]} />
          <meshStandardMaterial color="#fcd34d" roughness={0.4} />
        </mesh>

        {/* Eyebrows */}
        <mesh position={[-0.14, 0.16, 0.27]} rotation={[0, 0, 0.05]}>
          <boxGeometry args={[0.09, 0.012, 0.02]} />
          <meshBasicMaterial color="#27272a" />
        </mesh>
        <mesh position={[0.14, 0.16, 0.27]} rotation={[0, 0, -0.05]}>
          <boxGeometry args={[0.09, 0.012, 0.02]} />
          <meshBasicMaterial color="#27272a" />
        </mesh>

        {/* Mouth */}
        <mesh ref={mouthRef} position={[0, -0.12, 0.3]}>
          <sphereGeometry args={[0.045, 16, 16]} scale={[1, 0.25, 0.2]} />
          <meshBasicMaterial color="#be123c" />
        </mesh>
      </group>

      {/* 2. BASE BODY (Stationary) */}
      {/* Neck */}
      <mesh position={[0, -0.02, -0.04]}>
        <cylinderGeometry args={[0.07, 0.08, 0.15, 16]} />
        <meshStandardMaterial color="#fcd34d" roughness={0.5} />
      </mesh>

      {/* Corporate Blazer Torso (Black) */}
      <mesh position={[0, -0.38, -0.08]}>
        <boxGeometry args={[0.9, 0.6, 0.38]} />
        <meshStandardMaterial color="#111827" roughness={0.7} metalness={0.1} />
      </mesh>
      
      {/* Blazer Sleeves / Arms */}
      {/* Left Arm */}
      <mesh position={[-0.52, -0.4, -0.08]} rotation={[0, 0, 0.1]}>
        <cylinderGeometry args={[0.08, 0.07, 0.5, 16]} />
        <meshStandardMaterial color="#111827" roughness={0.7} />
      </mesh>
      {/* Right Arm */}
      <mesh position={[0.52, -0.4, -0.08]} rotation={[0, 0, -0.1]}>
        <cylinderGeometry args={[0.08, 0.07, 0.5, 16]} />
        <meshStandardMaterial color="#111827" roughness={0.7} />
      </mesh>

      {/* Hands */}
      <mesh position={[-0.56, -0.68, -0.04]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#fcd34d" roughness={0.5} />
      </mesh>
      <mesh position={[0.56, -0.68, -0.04]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#fcd34d" roughness={0.5} />
      </mesh>

      {/* Black V-neck Shirt inside */}
      <mesh position={[0, -0.22, 0.12]}>
        <boxGeometry args={[0.22, 0.22, 0.02]} />
        <meshStandardMaterial color="#030712" roughness={0.9} />
      </mesh>
      
      {/* V-neck skin collar extension */}
      <mesh position={[0, -0.12, 0.11]}>
        <boxGeometry args={[0.15, 0.15, 0.02]} />
        <meshStandardMaterial color="#fcd34d" roughness={0.5} />
      </mesh>

      {/* Corporate Black Pants / Hips & Legs */}
      {/* Hips connector */}
      <mesh position={[0, -0.72, -0.08]}>
        <boxGeometry args={[0.8, 0.12, 0.36]} />
        <meshStandardMaterial color="#030712" roughness={0.8} />
      </mesh>
      
      {/* Left leg (black trousers) */}
      <mesh position={[-0.18, -1.05, -0.08]}>
        <cylinderGeometry args={[0.08, 0.08, 0.6, 12]} />
        <meshStandardMaterial color="#030712" roughness={0.8} />
      </mesh>
      
      {/* Right leg (black trousers) */}
      <mesh position={[0.18, -1.05, -0.08]}>
        <cylinderGeometry args={[0.08, 0.08, 0.6, 12]} />
        <meshStandardMaterial color="#030712" roughness={0.8} />
      </mesh>

      {/* Shoes (Sleek black shoes) */}
      <mesh position={[-0.18, -1.37, -0.02]}>
        <boxGeometry args={[0.12, 0.08, 0.18]} />
        <meshStandardMaterial color="#000000" roughness={0.2} metalness={0.9} />
      </mesh>
      <mesh position={[0.18, -1.37, -0.02]}>
        <boxGeometry args={[0.12, 0.08, 0.18]} />
        <meshStandardMaterial color="#000000" roughness={0.2} metalness={0.9} />
      </mesh>
    </group>
  );
}

// RelizaFace3D: Standard wrapper mapping size configurations to canvas sizing parameters.
export function RelizaFace3D({ expression, isSpeaking, isScrolled = false, size = "md" }) {
  const dimensions = size === "sm" ? "w-10 h-10" : size === "lg" ? "w-20 h-20 sm:w-24 sm:h-24" : "w-12 h-12";

  return (
    <div className={`${dimensions} shrink-0 bg-slate-950 rounded-full border border-slate-800 overflow-hidden relative select-none flex items-center justify-center`}>
      <Canvas
        camera={{ position: [0, -0.3, 2.3], fov: 48 }}
        style={{ width: "100%", height: "100%" }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[1.5, 2.5, 1.5]} intensity={2.0} />
        <pointLight position={[-1.5, -1.0, 1.0]} intensity={0.6} />
        <HumanHead3D expression={expression} isSpeaking={isSpeaking} isScrolled={isScrolled} />
      </Canvas>
    </div>
  );
}

export default function WebsiteAIAssistant() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname.toLowerCase();

  // Hide AI Assistant on specific routes
  const hideOnRoutes = [
    "/admin",
    "/team/admin",
    "/team/dashboard",
    "/partners/dashboard",
    "/partners/manage",
    "/client-portal",
    "/client-dashboard",
    "/client-login",
    "/data-intake",
    "/cm-dashboard"
  ];

  const actualPartnerSlugs = [
    "ranjit",
    "sivaprasad",
    "partner1",
    "partner-1",
    "johnsamuel",
    "shailesh-sivan",
    "alen-jacob",
    "cheriyan",
    "sakilan"
  ];

  const isPartnerPage = actualPartnerSlugs.some(slug =>
    path.startsWith(`/partnership/${slug.toLowerCase()}`) || path.startsWith(`/partnership/`)
  );

  const shouldHide = hideOnRoutes.some(route => path.startsWith(route)) || isPartnerPage;

  // Component States
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [expression, setExpression] = useState("idle");
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Text-To-Speech (TTS) Voice Engine
  const speakText = (text) => {
    if (isMuted) return;

    // Terminate active speech cycles
    window.speechSynthesis?.cancel();

    // Sanitize string to clean up special icons or emojis
    const cleanText = text
      .replace(/[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]/g, "")
      .replace(/🏠|🎓|🛠|📅|💼|📝|🤝|🌐/g, "")
      .trim();

    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);

    // Look for a high-quality English female voice preference
    if (window.speechSynthesis) {
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(v => 
        (v.name.includes("Google") || v.name.includes("Female") || v.name.includes("Zira")) && v.lang.startsWith("en")
      ) || voices.find(v => v.lang.startsWith("en"));
      if (preferredVoice) utterance.voice = preferredVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis?.speak(utterance);
  };

  // Speak bot messages dynamically when they get appended to message state
  useEffect(() => {
    if (messages.length > 0 && isOpen) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg.sender === "bot") {
        speakText(lastMsg.text);
      }
    }
  }, [messages, isOpen, isMuted]);

  // Clean up any remaining SpeechSynthesis instances on component state changes
  useEffect(() => {
    if (!isOpen) {
      window.speechSynthesis?.cancel();
      setIsSpeaking(false);
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  // Scroll detection to shift assistant to the top-right corner dynamically
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Floating Prompt Bubbles
  const [showPrompt, setShowPrompt] = useState(false);
  const [promptText, setPromptText] = useState("");
  const [hasGreeted, setHasGreeted] = useState(false);
  const [hasTriggeredIdle, setHasTriggeredIdle] = useState(false);

  const messagesEndRef = useRef(null);
  const promptTimeoutRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setShowPrompt(false); // Close minimized prompt bubble when panel opens
    }
  }, [messages, isOpen]);

  // Initial Greeting (Triggered after 3 seconds)
  useEffect(() => {
    if (shouldHide) return;

    const timer = setTimeout(() => {
      if (!hasGreeted && !isOpen) {
        setExpression("greeting");
        setPromptText("Hi there! I'm Reliza. Need a hand?");
        setShowPrompt(true);
        setHasGreeted(true);

        // Prepopulate the chat conversation with the 9 specific guide paths
        setMessages([
          {
            id: "init",
            sender: "bot",
            text: "Hi there! I'm Reliza, your digital helper. Here are some key areas on our website you can explore. Select any option to learn more:",
            options: [
              { label: "🎓 Student Portfolio", value: "student portfolio" },
              { label: "🛠 Utility Tools", value: "utility tools" },
              { label: "📅 Book Sessions", value: "book sessions" },
              { label: "👥 Team Page", value: "team page" },
              { label: "📊 Website Audit Report", value: "website audit report" },
              { label: "💼 Services We Provide", value: "services we provide" },
              { label: "✍️ Write a Blog", value: "write a blog" },
              { label: "🤝 Partnership Programs", value: "partnership programs" },
              { label: "🚀 API Marketing", value: "api marketing" }
            ]
          }
        ]);

        // Hide floating prompt after 7 seconds
        promptTimeoutRef.current = setTimeout(() => {
          setShowPrompt(false);
          setExpression("idle");
        }, 7000);
      }
    }, 3000);

    return () => {
      clearTimeout(timer);
      if (promptTimeoutRef.current) clearTimeout(promptTimeoutRef.current);
    };
  }, [shouldHide, hasGreeted, isOpen]);

  // Idle Inactivity Detector (Triggered after 20 seconds of no events)
  useEffect(() => {
    if (shouldHide) return;

    let idleTimer;

    const resetIdleTimer = () => {
      clearTimeout(idleTimer);

      // Only trigger if panel is closed, and hasn't already triggered in this session
      if (!isOpen && !hasTriggeredIdle) {
        idleTimer = setTimeout(() => {
          setExpression("thinking");
          setPromptText("Psst... need help finding anything? Let me show you around! 🌟");
          setShowPrompt(true);
          setHasTriggeredIdle(true);
          
          // Nudge in chat logs too
          setMessages(prev => [
            ...prev,
            {
              id: `idle-${Date.now()}`,
              sender: "bot",
              text: "Still here? I'm Reliza, your AI guide. Let me know if you would like to explore our solutions, book a session, or view our active partnerships!",
              options: [
                { label: "💼 Services We Provide", value: "services we provide" },
                { label: "📅 Book Sessions", value: "book sessions" },
                { label: "🤝 Partnership Programs", value: "partnership programs" }
              ]
            }
          ]);

          setTimeout(() => {
            setExpression("idle");
          }, 2000);

          // Hide floating prompt after 7 seconds
          promptTimeoutRef.current = setTimeout(() => {
            setShowPrompt(false);
          }, 7000);

        }, 20000); // 20 seconds idle Nudge
      }
    };

    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];
    events.forEach(evt => window.addEventListener(evt, resetIdleTimer));

    resetIdleTimer();

    return () => {
      clearTimeout(idleTimer);
      events.forEach(evt => window.removeEventListener(evt, resetIdleTimer));
    };
  }, [shouldHide, isOpen, hasTriggeredIdle]);

  if (shouldHide) return null;

  // Handles standard questions / button clicks
  const handleKeywordResponse = (query) => {
    const q = query.toLowerCase().trim();
    let responseText = "";
    let linkPath = "";
    let linkLabel = "";
    let nextOptions = [];

    // Trigger typing state
    setIsTyping(true);
    setExpression("thinking");

    setTimeout(() => {
      setIsTyping(false);

      if (q === "student portfolio") {
        setExpression("helpful");
        responseText = "Explore the amazing portfolios and projects created by our student partners! Click below to view them.";
        linkPath = "/partners/students";
        linkLabel = "View Student Showcase";
        nextOptions = [{ label: "🏠 Back to Main Menu", value: "main menu" }];
      } else if (q === "utility tools") {
        setExpression("helpful");
        responseText = "We have an extensive suite of free utility tools! Check out our Solutions Hub for PDF converters, image editors, content generators, and our advanced AI Studio.";
        linkPath = "/solutions";
        linkLabel = "Go to Solutions Hub";
        nextOptions = [{ label: "🏠 Back to Main Menu", value: "main menu" }];
      } else if (q === "book sessions") {
        setExpression("helpful");
        responseText = "You can book a 1-on-1 strategic consultation with our team. Head over to our booking page, choose the 'Book Session' tab, and lock in your preferred slot!";
        linkPath = "/contact#meeting";
        linkLabel = "Book a Session Now";
        nextOptions = [{ label: "🏠 Back to Main Menu", value: "main menu" }];
      } else if (q === "team page") {
        setExpression("helpful");
        responseText = "Meet the developers, designers, and marketers behind SocialBureau! Explore their profiles, read client reviews, and connect.";
        linkPath = "/team";
        linkLabel = "Meet the Team";
        nextOptions = [{ label: "🏠 Back to Main Menu", value: "main menu" }];
      } else if (q === "website audit report") {
        setExpression("helpful");
        responseText = "Access our website audit reports to track performance, SEO status, and optimization recommendations.";
        linkPath = "/audit-reports";
        linkLabel = "View Audit Reports";
        nextOptions = [{ label: "🏠 Back to Main Menu", value: "main menu" }];
      } else if (q === "services we provide") {
        setExpression("helpful");
        responseText = "Here is a list of the premium digital services we offer to help grow your business. Select any service to explore further:";
        nextOptions = [
          { label: "Social Media Marketing", value: "smm service" },
          { label: "Web Development", value: "webdev service" },
          { label: "SEO & Paid Ads", value: "seo service" },
          { label: "Performance Marketing", value: "performance service" },
          { label: "API Marketing", value: "api marketing" },
          { label: "Niche Marketing", value: "niche service" },
          { label: "AdTech Integration", value: "adtech service" },
          { label: "Content Marketing", value: "content service" },
          { label: "🏠 Back to Main Menu", value: "main menu" }
        ];
      } else if (q === "write a blog") {
        setExpression("helpful");
        responseText = "Share your insights and write for the SocialBureau community! Submit your blog post through our submission portal.";
        linkPath = "/blog/submit";
        linkLabel = "Submit a Blog Post";
        nextOptions = [{ label: "🏠 Back to Main Menu", value: "main menu" }];
      } else if (q === "partnership programs") {
        setExpression("helpful");
        responseText = "Join our network! Learn about our student and influencer partnership opportunities, manage your portfolio, or register.";
        linkPath = "/partners";
        linkLabel = "Explore Partnerships";
        nextOptions = [{ label: "🏠 Back to Main Menu", value: "main menu" }];
      } else if (q === "api marketing") {
        setExpression("helpful");
        responseText = "Grow your platform with next-gen API marketing strategies. Learn how we optimize and position developer APIs in the market.";
        linkPath = "/api-marketing-agency-in-kochi";
        linkLabel = "API Marketing Service";
        nextOptions = [
          { label: "💼 View Services List", value: "services we provide" },
          { label: "🏠 Back to Main Menu", value: "main menu" }
        ];
      }
      
      // Services breakdown matching
      else if (q === "smm service") {
        setExpression("helpful");
        responseText = "Social Media Marketing: Growth, organic outreach, and brand positioning.";
        linkPath = "/performance-marketing-agency-in-kochi";
        linkLabel = "Learn More";
        nextOptions = [
          { label: "💼 View Services List", value: "services we provide" },
          { label: "🏠 Back to Main Menu", value: "main menu" }
        ];
      } else if (q === "webdev service") {
        setExpression("helpful");
        responseText = "Web Development: Next-gen frontends, portals, and robust architectures.";
        linkPath = "/web-development-agency-in-kochi";
        linkLabel = "Learn More";
        nextOptions = [
          { label: "💼 View Services List", value: "services we provide" },
          { label: "🏠 Back to Main Menu", value: "main menu" }
        ];
      } else if (q === "seo service") {
        setExpression("helpful");
        responseText = "SEO & Paid Ads: Traffic acquisition, search visibility, and scaling KPIs.";
        linkPath = "/performance-marketing-agency-in-kochi";
        linkLabel = "Learn More";
        nextOptions = [
          { label: "💼 View Services List", value: "services we provide" },
          { label: "🏠 Back to Main Menu", value: "main menu" }
        ];
      } else if (q === "performance service") {
        setExpression("helpful");
        responseText = "Performance Marketing: Paid ads, funnel conversion optimization, and ROI tracking.";
        linkPath = "/performance-marketing-agency-in-kochi";
        linkLabel = "Learn More";
        nextOptions = [
          { label: "💼 View Services List", value: "services we provide" },
          { label: "🏠 Back to Main Menu", value: "main menu" }
        ];
      } else if (q === "niche service") {
        setExpression("helpful");
        responseText = "Niche Marketing: Bespoke marketing for unique audiences and customized sectors.";
        linkPath = "/niche-marketing-agency-in-kochi";
        linkLabel = "Learn More";
        nextOptions = [
          { label: "💼 View Services List", value: "services we provide" },
          { label: "🏠 Back to Main Menu", value: "main menu" }
        ];
      } else if (q === "adtech service") {
        setExpression("helpful");
        responseText = "AdTech Integration: Implementing analytics, tracking pixels, and server-side tagging.";
        linkPath = "/adTech-marketing-agency-in-kochi";
        linkLabel = "Learn More";
        nextOptions = [
          { label: "💼 View Services List", value: "services we provide" },
          { label: "🏠 Back to Main Menu", value: "main menu" }
        ];
      } else if (q === "content service") {
        setExpression("helpful");
        responseText = "Content Marketing: Storytelling, blog campaigns, copywriting, and search engine optimization.";
        linkPath = "/content-marketing-agency-in-kochi";
        linkLabel = "Learn More";
        nextOptions = [
          { label: "💼 View Services List", value: "services we provide" },
          { label: "🏠 Back to Main Menu", value: "main menu" }
        ];
      } else if (q === "main menu") {
        setExpression("greeting");
        responseText = "Here is our main menu. Select an option to explore:";
        nextOptions = [
          { label: "🎓 Student Portfolio", value: "student portfolio" },
          { label: "🛠 Utility Tools", value: "utility tools" },
          { label: "📅 Book Sessions", value: "book sessions" },
          { label: "👥 Team Page", value: "team page" },
          { label: "📊 Website Audit Report", value: "website audit report" },
          { label: "💼 Services We Provide", value: "services we provide" },
          { label: "✍️ Write a Blog", value: "write a blog" },
          { label: "🤝 Partnership Programs", value: "partnership programs" },
          { label: "🚀 API Marketing", value: "api marketing" }
        ];
      }
      
      // general keyword matching (for typed inputs)
      else if (q.includes("student") || q.includes("portfolio")) {
        setExpression("helpful");
        responseText = "Explore student portfolios and showcases created in our partnership network.";
        linkPath = "/partners/students";
        linkLabel = "View Student Showcase";
      } else if (q.includes("tool") || q.includes("solution") || q.includes("pdf") || q.includes("image") || q.includes("studio")) {
        setExpression("helpful");
        responseText = "Check out our Solutions Hub for PDF converters, image editors, content generators, and our advanced AI Studio.";
        linkPath = "/solutions";
        linkLabel = "Go to Solutions Hub";
      } else if (q.includes("meet") || q.includes("schedule") || q.includes("book") || q.includes("session") || q.includes("call") || q.includes("consult")) {
        setExpression("helpful");
        responseText = "You can book a 1-on-1 strategic consultation with our team. Head over to our booking page, choose the 'Book Session' tab, and lock in your slot!";
        linkPath = "/contact#meeting";
        linkLabel = "Book a Session Now";
      } else if (q.includes("job") || q.includes("career") || q.includes("apply") || q.includes("hiring")) {
        setExpression("helpful");
        responseText = "Visit our Careers portal to view open job vacancies and submit your application online!";
        linkPath = "/careers";
        linkLabel = "Explore Careers";
      } else if (q.includes("team") || q.includes("staff") || q.includes("employee") || q.includes("roster")) {
        setExpression("helpful");
        responseText = "Meet the developers, designers, and marketers behind SocialBureau! Explore their profiles, read client reviews, and connect.";
        linkPath = "/team";
        linkLabel = "Meet the Team";
      } else if (q.includes("contact") || q.includes("email") || q.includes("reach") || q.includes("phone")) {
        setExpression("helpful");
        responseText = "You can reach us through our main Contact page or write to us at team@socialbureau.in.";
        linkPath = "/contact";
        linkLabel = "Go to Contact Page";
      } else if (q.includes("socialbureau") || q.includes("what is") || q.includes("about") || q.includes("company")) {
        setExpression("greeting");
        responseText = "SocialBureau is a premium digital scaling and growth agency. We specialize in custom web development, organic brand marketing, automation pipelines, and API integrations.";
        linkPath = "/about";
        linkLabel = "Learn About Us";
      } else if (q.includes("audit") || q.includes("report")) {
        setExpression("helpful");
        responseText = "Access our website audit reports to track performance, SEO status, and optimization recommendations.";
        linkPath = "/audit-reports";
        linkLabel = "View Audit Reports";
      } else if (q.includes("blog") || q.includes("write")) {
        setExpression("helpful");
        responseText = "Share your insights and write for the SocialBureau community! Submit your blog post through our submission portal.";
        linkPath = "/blog/submit";
        linkLabel = "Submit a Blog Post";
      } else if (q.includes("partner")) {
        setExpression("helpful");
        responseText = "Join our network! Learn about our student and influencer partnership opportunities, manage your portfolio, or register.";
        linkPath = "/partners";
        linkLabel = "Explore Partnerships";
      } else {
        setExpression("idle");
        responseText = "I'm still learning! You can ask about 'explore tools', 'careers', 'schedule a meeting', or select one of the guide shortcuts below.";
        nextOptions = [
          { label: "🎓 Student Portfolio", value: "student portfolio" },
          { label: "🛠 Utility Tools", value: "utility tools" },
          { label: "📅 Book Sessions", value: "book sessions" },
          { label: "💼 Services We Provide", value: "services we provide" }
        ];
      }

      setMessages(prev => [
        ...prev,
        {
          id: Date.now(),
          sender: "bot",
          text: responseText,
          link: linkPath ? { path: linkPath, label: linkLabel } : null,
          options: nextOptions
        }
      ]);
    }, 1000);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue;
    setMessages(prev => [
      ...prev,
      { id: `user-${Date.now()}`, sender: "user", text: userText }
    ]);
    setInputValue("");
    handleKeywordResponse(userText);
  };

  const handleOptionClick = (value) => {
    setMessages(prev => [
      ...prev,
      { id: `user-opt-${Date.now()}`, sender: "user", text: value }
    ]);
    handleKeywordResponse(value);
  };

  return (
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      className={`fixed right-4 sm:right-6 z-[9999] font-sans ${isScrolled ? "top-20 sm:top-24" : "bottom-4 sm:bottom-6"}`}
    >
      
      {/* FLOATING PROMPT BUBBLE (Greeting & Idle Nudges) */}
      <AnimatePresence>
        {showPrompt && !isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: isScrolled ? -10 : 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: isScrolled ? -10 : 10 }}
            className={`absolute right-2 w-[calc(100vw-48px)] sm:w-64 bg-white/95 text-slate-800 border border-slate-200/80 p-3 rounded-2xl shadow-xl flex items-start gap-2.5 z-10 select-none cursor-pointer hover:bg-white transition-all ${
              isScrolled ? "top-22 sm:top-26" : "bottom-22 sm:bottom-26"
            }`}
            onClick={() => setIsOpen(true)}
          >
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-[11px] font-semibold leading-relaxed tracking-wide">
                {promptText}
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowPrompt(false);
              }}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CHAT WINDOW */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: isScrolled ? -50 : 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: isScrolled ? -50 : 50, scale: 0.95 }}
            className={`absolute right-0 w-[calc(100vw-32px)] sm:w-[380px] h-[70vh] sm:h-[500px] max-h-[500px] bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] flex flex-col overflow-hidden text-white ${
              isScrolled ? "top-22 sm:top-26" : "bottom-22 sm:bottom-26"
            }`}
          >
            {/* Header */}
            <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <RelizaFace3D expression={expression} isSpeaking={isSpeaking} isScrolled={isScrolled} size="sm" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white">Reliza</h4>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[9px] text-gray-500 font-semibold tracking-wider uppercase">AI Assistant</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {/* Voice over mute toggle */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMuted(!isMuted);
                    if (!isMuted) {
                      window.speechSynthesis?.cancel();
                      setIsSpeaking(false);
                    }
                  }}
                  className="p-1.5 rounded-full border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
                  title={isMuted ? "Unmute Voice" : "Mute Voice"}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    setExpression("idle");
                    window.speechSynthesis?.cancel();
                    setIsSpeaking(false);
                  }}
                  className="p-1.5 rounded-full border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div data-lenis-prevent="true" className="flex-1 overflow-y-auto p-4 space-y-4 select-none">
              {messages.map((msg) => {
                const isBot = msg.sender === "bot";
                return (
                  <div key={msg.id} className={`flex gap-2.5 ${isBot ? "justify-start" : "justify-end"}`}>
                    {isBot && <RelizaFace expression={expression} size="sm" />}
                    <div className="flex flex-col gap-1.5 max-w-[75%]">
                      <div className={`p-3 rounded-2xl text-xs font-medium leading-relaxed ${
                        isBot 
                          ? "bg-slate-800/80 border border-slate-700/50 text-slate-100 rounded-tl-sm" 
                          : "bg-[#ff0000] text-white rounded-tr-sm"
                      }`}>
                        {msg.text}
                      </div>

                      {/* Embed link route helper */}
                      {msg.link && (
                        <div className="mt-1">
                          <Link
                             to={msg.link.path}
                            onClick={() => setIsOpen(false)}
                            className="inline-flex items-center gap-1.5 text-[10px] font-bold text-amber-400 hover:text-amber-300 uppercase tracking-widest no-underline select-none"
                          >
                            {msg.link.label} <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      )}

                      {/* Suggestions list inside message */}
                      {msg.options && msg.options.length > 0 && (
                        <div className="flex flex-col gap-1.5 mt-2">
                          {msg.options.map((opt, i) => (
                            <button
                              key={i}
                              onClick={() => handleOptionClick(opt.value)}
                              className="text-left bg-slate-950/60 hover:bg-slate-950 border border-slate-800/80 hover:border-slate-700/60 p-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider text-slate-300 hover:text-white transition-all cursor-pointer flex items-center justify-between"
                            >
                              {opt.label}
                              <Navigation2 className="w-3 h-3 rotate-90 text-[#ff0000]" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex gap-2.5 justify-start">
                  <RelizaFace expression="thinking" size="sm" />
                  <div className="bg-slate-800/80 border border-slate-700/50 p-3 rounded-2xl rounded-tl-sm flex items-center gap-1 select-none">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-3 bg-slate-950/50 border-t border-slate-800/80 flex items-center gap-2 select-none">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask Reliza a question..."
                className="flex-1 bg-slate-900 border border-slate-800 hover:border-slate-700/80 focus:border-slate-600 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none transition-all placeholder:text-slate-600"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="p-2 bg-[#ff0000] hover:bg-[#e02447] disabled:opacity-40 disabled:cursor-not-allowed rounded-xl text-white transition-all cursor-pointer shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOAT TRIGGER BUTTON */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-slate-950 border-2 border-[#ff0000] flex items-center justify-center shadow-2xl hover:shadow-[0_0_20px_rgba(255,0,0,0.3)] transition-all cursor-pointer overflow-hidden z-20 relative"
      >
        <RelizaFace3D expression={expression} isSpeaking={isSpeaking} isScrolled={isScrolled} size="lg" />
      </motion.button>
    </motion.div>
  );
}
