import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Sparkles,
  Trophy,
  Award,
  Users,
  Wallet,
  TrendingUp,
  ShieldCheck,
  BadgeCheck,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  X,
  Volume2,
  VolumeX,
  ShieldAlert,
  Hourglass,
  Landmark,
  HelpCircle,
  CheckCircle2,
  Star,
} from "lucide-react";

// WebGL shaders for the flowing red background
const vertexShaderSource = `
  attribute vec2 a_position;
  varying vec2 v_texCoord;
  void main() {
    v_texCoord = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const fragmentShaderSource = `
  precision highp float;
  uniform float u_time;
  uniform vec2 u_resolution;
  varying vec2 v_texCoord;

  void main() {
    vec2 uv = v_texCoord;
    float time = u_time * 0.15;
    
    // Flowing burgundy, crimson and deep red shader waves
    vec3 color1 = vec3(0.08, 0.005, 0.005); // Deep burgundy/black
    vec3 color2 = vec3(0.22, 0.01, 0.015);  // Rich dark crimson
    vec3 color3 = vec3(0.42, 0.03, 0.03);   // Bright ruby red highlights
    
    float noise = sin(uv.x * 4.0 + time) * cos(uv.y * 3.0 - time);
    noise += sin(uv.y * 5.0 + time * 1.2) * 0.5;
    
    vec3 finalColor = mix(color1, color2, clamp(noise + 0.5, 0.0, 1.0));
    finalColor = mix(finalColor, color3, clamp(sin(time + length(uv - 0.5) * 6.0), 0.0, 1.0) * 0.35);
    
    // Ambient red glowing focal points
    float glow = 0.02 / length(uv - vec2(0.8, 0.2) - vec2(sin(time), cos(time)) * 0.25);
    finalColor += vec3(0.85, 0.1, 0.1) * glow;
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

const SpinningResults = () => {
  const canvasRef = useRef(null);
  const [livePayouts, setLivePayouts] = useState(1250000);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPrize, setFilterPrize] = useState("ALL");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedReceiptWinner, setSelectedReceiptWinner] = useState(null);
  const scrollContainerRef = useRef(null);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);

  // Testimonials state and Write Review form states
  const [testimonials, setTestimonials] = useState([
    {
      text: "It was so simple and real! Got my reward in seconds. Absolutely thrilled!",
      initials: "RS",
      name: "Reshma Vijayan",
      rating: 5,
    },
    {
      text: "Transparent, fast and trustworthy platform. Best winning experience online.",
      initials: "SK",
      name: "Samsraj R",
      rating: 5,
    },
    {
      text: "This is the best spin challenge I've ever participated in! Highly recommend.",
      initials: "AV",
      name: "Vishnu Vijayan",
      rating: 5,
    },
    {
      text: "I received my payment without any delay. Support team is very helpful.",
      initials: "PM",
      name: "Sajitha Rejanan",
      rating: 5,
    },
  ]);

  // Auto-scroll loop effect for verified winners carousel
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let animationId;
    const scrollSpeed = 0.8; // pixels per frame

    const scrollLoop = () => {
      if (!isCarouselHovered) {
        container.scrollLeft += scrollSpeed;
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(scrollLoop);
    };

    animationId = requestAnimationFrame(scrollLoop);
    return () => cancelAnimationFrame(animationId);
  }, [isCarouselHovered]);

  // Wheel States
  const [isSpinning, setIsSpinning] = useState(false);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [showPrizeModal, setShowPrizeModal] = useState(false);
  const [wonPrize, setWonPrize] = useState(null);

  // Parallax Tilt State for Hero Wheel
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // WebGL Background initialization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) return;

    let animationId;
    let width = (canvas.width = canvas.clientWidth || 800);
    let height = (canvas.height = canvas.clientHeight || 600);

    const resizeObserver = new ResizeObserver(() => {
      if (!canvas) return;
      width = canvas.width = canvas.clientWidth;
      height = canvas.height = canvas.clientHeight;
      gl.viewport(0, 0, width, height);
    });
    resizeObserver.observe(canvas);

    const compileShader = (source, type) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compiler error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const program = gl.createProgram();
    const vs = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
    const fs = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);
    if (!vs || !fs) return;

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );

    const pos = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, "u_time");
    const uRes = gl.getUniformLocation(program, "u_resolution");

    const render = (time) => {
      gl.viewport(0, 0, width, height);
      gl.uniform1f(uTime, time * 0.001);
      gl.uniform2f(uRes, width, height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationId = requestAnimationFrame(render);
    };

    render(0);

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
    };
  }, []);

  // Live total payout increment simulation
  useEffect(() => {
    const timer = setInterval(() => {
      const increment = Math.floor(Math.random() * 500) + 100;
      setLivePayouts((prev) => prev + increment);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Parallax cursor listener
  const handleMouseMove = (e) => {
    // Parallax mouse variables
    const grid = document.getElementById("interactive-grid-overlay");
    if (grid) {
      grid.style.setProperty("--mouse-x", `${e.clientX}px`);
      grid.style.setProperty("--mouse-y", `${e.clientY}px`);
    }

    // Interactive wheel tilt
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const xTilt = (clientY / innerHeight - 0.5) * 15;
    const yTilt = (clientX / innerWidth - 0.5) * -15;
    setTilt({ x: xTilt, y: yTilt });
  };

  // Synthetic Audio Tick generator (Web Audio API)
  const playTickSound = () => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.06);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } catch (err) {
      // AudioContext blocked
    }
  };

  // Sound generator for Winning Ceremony
  const playWinnerFanfare = () => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const now = ctx.currentTime;

      const playTone = (freq, start, duration) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.1, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + duration);
      };

      playTone(261.63, now, 0.15); // C4
      playTone(329.63, now + 0.15, 0.15); // E4
      playTone(392.0, now + 0.3, 0.15); // G4
      playTone(523.25, now + 0.45, 0.4); // C5
    } catch (err) {
      // ignore
    }
  };

  // Interactive Spin triggering
  const handleSpinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    // Spin 8 to 12 full turns + a random angle
    const targetDeg = Math.floor(Math.random() * 360);
    const addedTurns = (Math.floor(Math.random() * 4) + 8) * 360;
    const finalRotation = wheelRotation + addedTurns + targetDeg;

    setWheelRotation(finalRotation);

    // Audio ticking animation loops
    let lastTickTime = 0;
    let ticks = 0;
    const totalDuration = 6000;
    const startTime = performance.now();

    const tickLoop = (now) => {
      const elapsed = now - startTime;
      if (elapsed >= totalDuration) return;

      // Logarithmic spacing of tick sounds to mimic decelerating rotation
      const progress = elapsed / totalDuration;
      const speed = Math.pow(1 - progress, 2);
      const interval = 50 + (1 - speed) * 350; // tick intervals from 50ms up to 400ms

      if (now - lastTickTime >= interval) {
        playTickSound();
        lastTickTime = now;
      }
      requestAnimationFrame(tickLoop);
    };

    requestAnimationFrame(tickLoop);

    // Stop wheel and reward user
    setTimeout(() => {
      setIsSpinning(false);

      // Determine what segment the wheel landed on
      // Wheel sections mapping
      const prizes = [
        "₹20,000 Payout",
        "₹5,000 Payout",
        "₹15,000 Payout",
        "₹1,000 Payout",
        "₹10,000 Payout",
        "₹2,500 Payout",
        "₹8,000 Payout",
        "₹500 Payout",
      ];

      const normalizedAngle = (360 - (finalRotation % 360)) % 360;
      const prizeIdx = Math.floor(normalizedAngle / (360 / prizes.length));
      const prizeWon = prizes[prizeIdx];

      setWonPrize(prizeWon);
      setShowPrizeModal(true);
      playWinnerFanfare();

      // Explode Confetti
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#dc2626", "#facc15", "#ffffff", "#f87171"],
      });
    }, totalDuration);
  };

  // Real GPay Winners Database
  const winnersData = [
    {
      id: "6370285914",
      name: "Prafulla malik",
      prize: 1066,
      receiptUrl:
        "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/Spinning%20Wheel/SpinningwheelGpay/PrafullaMalik.jpg",
      status: "Verified",
    },
    {
      id: "ATHUL-A",
      name: "Athul A",
      prize: 1056,
      receiptUrl:
        "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/Spinning%20Wheel/SpinningwheelGpay/AthulA.jpg",
      status: "Verified",
    },
    {
      id: "7356299848",
      name: "Reshma Vijayan",
      prize: 1028,
      receiptUrl:
        "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/Spinning%20Wheel/SpinningwheelGpay/ReshmaVijayan.jpg",
      status: "Verified",
    },
    {
      id: "8117830982",
      name: "Jeeban behera",
      prize: 822,
      receiptUrl:
        "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/Spinning%20Wheel/SpinningwheelGpay/JeebanBehera.jpg",
      status: "Verified",
    },
    {
      id: "6238520988",
      name: "Basilbaby",
      prize: 790,
      receiptUrl:
        "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/Spinning%20Wheel/SpinningwheelGpay/BasilBaby.jpg",
      status: "Verified",
    },
    {
      id: "9895447155",
      name: "Nikhil Biju",
      prize: 705,
      receiptUrl:
        "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/Spinning%20Wheel/SpinningwheelGpay/NikhilBiju.jpg",
      status: "Verified",
    },
    {
      id: "9400220068",
      name: "Samsrajr",
      prize: 645,
      receiptUrl:
        "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/Spinning%20Wheel/SpinningwheelGpay/Samsrajr.jpg",
      status: "Verified",
    },
    {
      id: "6300752951",
      name: "B panl",
      prize: 522,
      receiptUrl:
        "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/Spinning%20Wheel/SpinningwheelGpay/BhagabatPanl.jpg",
      status: "Verified",
    },
    {
      id: "NIKHIL-B",
      name: "Nikhil Biju",
      prize: 490,
      receiptUrl: "",
      status: "Pending",
    },
    {
      id: "9063153408",
      name: "Sudarsan Behera",
      prize: 438,
      receiptUrl:
        "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/Spinning%20Wheel/SpinningwheelGpay/SundarsanBahers.jpg",
      status: "Verified",
    },
    {
      id: "9645007245",
      name: "Emil Joy",
      prize: 377,
      receiptUrl:
        "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/Spinning%20Wheel/SpinningwheelGpay/EmilJoy.jpg",
      status: "Verified",
    },
    {
      id: "6371055418",
      name: "Sagar mallik",
      prize: 365,
      receiptUrl:
        "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/Spinning%20Wheel/SpinningwheelGpay/SagarMalik.jpg",
      status: "Verified",
    },
    {
      id: "9446867713",
      name: "Joy issac",
      prize: 347,
      receiptUrl: "",
      status: "Pending",
    },
    {
      id: "8018784947",
      name: "Saroj kumar behera",
      prize: 281,
      receiptUrl: "",
      status: "Pending",
    },
    {
      id: "9995971912",
      name: "Adil sayed",
      prize: 265,
      receiptUrl:
        "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/Spinning%20Wheel/SpinningwheelGpay/AdilSayed.jpg",
      status: "Verified",
    },
    {
      id: "8594084565",
      name: "Ameen",
      prize: 247,
      receiptUrl:
        "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/Spinning%20Wheel/SpinningwheelGpay/Ameen.jpg",
      status: "Verified",
    },
    {
      id: "9947403787",
      name: "Deepa Paul",
      prize: 218,
      receiptUrl: "",
      status: "Pending",
    },
    {
      id: "8301923717",
      name: "Aaziya Husain",
      prize: 149,
      receiptUrl:
        "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/Spinning%20Wheel/SpinningwheelGpay/AaziyaHusain.jpg",
      status: "Verified",
    },
    {
      id: "7077591450",
      name: "rabin kumar barik",
      prize: 143,
      receiptUrl:
        "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/Spinning%20Wheel/SpinningwheelGpay/RabinKumarBarik.jpg",
      status: "Verified",
    },
    {
      id: "9961271470",
      name: "Vyshakh",
      prize: 122,
      receiptUrl:
        "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/Spinning%20Wheel/SpinningwheelGpay/Vyshakh.jpg",
      status: "Verified",
    },
    {
      id: "6305541916",
      name: "Bapu naik",
      prize: 121,
      receiptUrl:
        "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/Spinning%20Wheel/SpinningwheelGpay/BapuNaik.jpg",
      status: "Verified",
    },
    {
      id: "8138996895",
      name: "Keerthana C K",
      prize: 118,
      receiptUrl: "",
      status: "Pending",
    },
    {
      id: "9633710071",
      name: "Vishnu Vijayan",
      prize: 93,
      receiptUrl:
        "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/Spinning%20Wheel/SpinningwheelGpay/VishnuVijayan.jpg",
      status: "Verified",
    },
    {
      id: "9061849932",
      name: "Elizebath",
      prize: 85,
      receiptUrl: "",
      status: "Pending",
    },
    {
      id: "8547570680",
      name: "Adwaith R",
      prize: 80,
      receiptUrl:
        "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/Spinning%20Wheel/SpinningwheelGpay/Adwaith.jpg",
      status: "Verified",
    },
    {
      id: "8089155576",
      name: "rachel",
      prize: 65,
      receiptUrl: "",
      status: "Pending",
    },
    {
      id: "8129264976",
      name: "Haaaaj",
      prize: 57,
      receiptUrl: "",
      status: "Pending",
    },
    {
      id: "9048714872",
      name: "Rimshad M",
      prize: 55,
      receiptUrl: "",
      status: "Pending",
    },
    {
      id: "9207800422",
      name: "Allan K S",
      prize: 55,
      receiptUrl:
        "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/Spinning%20Wheel/SpinningwheelGpay/Allanks.jpg",
      status: "Verified",
    },
    {
      id: "9744591968",
      name: "Sajitha",
      prize: 38,
      receiptUrl:
        "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/Spinning%20Wheel/SpinningwheelGpay/SajithaRejanan.jpg",
      status: "Verified",
    },
    {
      id: "8921792162",
      name: "Athira Rajesh",
      prize: 33,
      receiptUrl: "",
      status: "Pending",
    },
    {
      id: "6238429564",
      name: "Salu Kumar",
      prize: 30,
      receiptUrl: "",
      status: "Pending",
    },
    {
      id: "8086035807",
      name: "Nikhil",
      prize: 30,
      receiptUrl:
        "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/Spinning%20Wheel/SpinningwheelGpay/NikhilDas.jpg",
      status: "Verified",
    },
    {
      id: "8848501595",
      name: "Mini krishna",
      prize: 30,
      receiptUrl: "",
      status: "Pending",
    },
    {
      id: "9781116047",
      name: "Harry",
      prize: 30,
      receiptUrl: "",
      status: "Pending",
    },
    {
      id: "9947739498",
      name: "sahas mujeeb",
      prize: 30,
      receiptUrl: "",
      status: "Pending",
    },
    {
      id: "9995599265",
      name: "Sona",
      prize: 30,
      receiptUrl: "",
      status: "Pending",
    },
    {
      id: "9895447115",
      name: "Nikhil Biju",
      prize: 30,
      receiptUrl: "",
      status: "Pending",
    },
    {
      id: "7684922456",
      name: "Sanjay sethi",
      prize: 28,
      receiptUrl:
        "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/Spinning%20Wheel/SpinningwheelGpay/SanjaySethi.jpg",
      status: "Verified",
    },
    {
      id: "6239389580",
      name: "Deepak Soni",
      prize: 25,
      receiptUrl: "",
      status: "Pending",
    },
    {
      id: "7306056806",
      name: "Aswathi Rajesh",
      prize: 25,
      receiptUrl: "",
      status: "Pending",
    },
    {
      id: "8590028128",
      name: "Sooraj s",
      prize: 25,
      receiptUrl: "",
      status: "Pending",
    },
    {
      id: "8848896040",
      name: "Aju",
      prize: 25,
      receiptUrl: "",
      status: "Pending",
    },
    {
      id: "8973378050",
      name: "Srinivasan",
      prize: 25,
      receiptUrl: "",
      status: "Pending",
    },
    {
      id: "9827344137",
      name: "Ranjit Malik",
      prize: 25,
      receiptUrl: "",
      status: "Pending",
    },
    {
      id: "9995846628",
      name: "Binoy",
      prize: 25,
      receiptUrl: "",
      status: "Pending",
    },
    {
      id: "7034646246",
      name: "Thasneem",
      prize: 20,
      receiptUrl: "",
      status: "Pending",
    },
    {
      id: "8921199491",
      name: "Banisha",
      prize: 12,
      receiptUrl: "",
      status: "Pending",
    },
    {
      id: "7075666958",
      name: "Nikhil kontham",
      prize: 10,
      receiptUrl: "",
      status: "Pending",
    },
    {
      id: "8019551422",
      name: "Padmalochan Das",
      prize: 10,
      receiptUrl: "",
      status: "Pending",
    },
    {
      id: "7025504957",
      name: "Taijo John",
      prize: 8,
      receiptUrl: "",
      status: "Pending",
    },
    {
      id: "7982709321",
      name: "Kartik soni",
      prize: 8,
      receiptUrl: "",
      status: "Pending",
    },
    {
      id: "8304073839",
      name: "Sneha",
      prize: 8,
      receiptUrl: "",
      status: "Pending",
    },
    {
      id: "8921031842",
      name: "Anumol Abraham",
      prize: 8,
      receiptUrl: "",
      status: "Pending",
    },
    {
      id: "918848110043",
      name: "Rohithkrishna R",
      prize: 8,
      receiptUrl: "",
      status: "Pending",
    },
    {
      id: "918921360547",
      name: "Haridas",
      prize: 8,
      receiptUrl: "",
      status: "Pending",
    },
    {
      id: "7907705994",
      name: "Krishnendhu",
      prize: 2,
      receiptUrl: "",
      status: "Pending",
    },
    {
      id: "8590028120",
      name: "Sooraj",
      prize: 2,
      receiptUrl: "",
      status: "Pending",
    },
    {
      id: "9995962350",
      name: "Renymol Roy",
      prize: 2,
      receiptUrl: "",
      status: "Pending",
    },
  ];

  // Filter only verified winners for the marquee
  const verifiedWinners = winnersData.filter((w) => w.receiptUrl);

  // Calculate dynamic stats for Hero section from table data
  const totalWinnersCount = winnersData.length;
  const totalPrizeMoneySum = winnersData.reduce((acc, w) => acc + w.prize, 0);
  const totalVerifiedCount = winnersData.filter((w) => w.receiptUrl).length;
  const successPercentage = totalWinnersCount > 0 
    ? ((totalVerifiedCount / totalWinnersCount) * 100).toFixed(1) 
    : "0.0";
  const totalParticipantsCount = 58247 + (winnersData.length - 59) * 45;

  // Calculate average rating dynamically
  const averageRating = (
    testimonials.reduce((acc, curr) => acc + (curr.rating || 0), 0) /
    testimonials.length
  ).toFixed(1);

  // Filtering / Search Logic
  const filteredWinners = winnersData.filter((winner) => {
    const matchesSearch =
      winner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      winner.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPrize =
      filterPrize === "ALL" ||
      (filterPrize === "HIGH" && winner.prize >= 500) ||
      (filterPrize === "MID" && winner.prize >= 100 && winner.prize < 500) ||
      (filterPrize === "LOW" && winner.prize < 100);

    return matchesSearch && matchesPrize;
  });

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredWinners.length / itemsPerPage);
  const currentWinners = filteredWinners.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div
      className="min-h-screen bg-[#060101] text-zinc-100 relative overflow-x-hidden selection:bg-red-500 selection:text-white"
      onMouseMove={handleMouseMove}
    >
      {/* Interactive webgl backdrop */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-45"
      />

      {/* Grid masking overlay */}
      <div
        id="interactive-grid-overlay"
        className="fixed inset-0 pointer-events-none z-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(to right, #dc2626 1px, transparent 1px), linear-gradient(to bottom, #dc2626 1px, transparent 1px)",
          backgroundSize: "45px 45px",
        }}
      />
      <style>{`
        #interactive-grid-overlay {
          mask-image: radial-gradient(circle 350px at var(--mouse-x, 50%) var(--mouse-y, 50%), black, transparent);
          -webkit-mask-image: radial-gradient(circle 350px at var(--mouse-x, 50%) var(--mouse-y, 50%), black, transparent);
          transition: mask-image 0.1s ease, -webkit-mask-image 0.1s ease;
        }
        .glass-panel {
          background: rgba(30, 8, 8, 0.45);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(239, 68, 68, 0.15);
        }
        .red-glow-primary {
          box-shadow: 0 0 35px rgba(220, 38, 38, 0.2);
        }
        .red-glow-secondary {
          box-shadow: 0 0 35px rgba(234, 179, 8, 0.15);
        }
        .text-gradient {
          background: linear-gradient(135deg, #f87171 10%, #dc2626 50%, #facc15 90%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        @keyframes float-oscillation {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .animate-shimmer {
          background-size: 200% auto;
          animation: shimmer 4s linear infinite;
        }
      `}</style>

      {/* Main Container */}
      <main className="pt-20 relative z-10 max-w-7xl mx-auto px-0">
        {/* Hero Section */}
        <section
          id="wheel"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-16 md:py-24 px-4 sm:px-6 lg:px-0"
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-6"
          >
         
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none text-white">
              Real Winners.
              <br />
              <span className="text-gradient animate-shimmer drop-shadow-[0_10px_20px_rgba(220,38,38,0.25)] inline-block">
                Real Cash Rewards.
              </span>
            </h1>

            <p className="text-zinc-400 text-sm md:text-base max-w-lg leading-relaxed">
              Thousands spun, and hundreds won verified monetary rewards.
              Experience our high-stakes luxury Spin & Win portal. Every payout
              is fully transparent and bank-secured.
            </p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="glass-panel p-5 rounded-2xl red-glow-primary hover:border-red-500/20 transition-all duration-300">
                <div className="flex items-center gap-2 mb-1 text-red-400">
                  <Users size={16} />
                  <span className="text-[9px] font-bold uppercase tracking-wider opacity-85">
                    Total Spins
                  </span>
                </div>
                <div className="text-2xl font-black text-white">
                  {totalParticipantsCount.toLocaleString()}
                </div>
                <div className="text-emerald-500 text-[10px] flex items-center gap-0.5 mt-1 font-semibold">
                  <TrendingUp size={12} /> +24.5% This Week
                </div>
              </div>

              <div className="glass-panel p-5 rounded-2xl red-glow-secondary hover:border-yellow-500/20 transition-all duration-300">
                <div className="flex items-center gap-2 mb-1 text-yellow-500">
                  <Award size={16} />
                  <span className="text-[9px] font-bold uppercase tracking-wider opacity-85">
                    Total Winners
                  </span>
                </div>
                <div className="text-2xl font-black text-white">
                  {totalWinnersCount.toLocaleString()}
                </div>
                <div className="text-emerald-500 text-[10px] flex items-center gap-0.5 mt-1 font-semibold">
                  <TrendingUp size={12} /> +18.7%
                </div>
              </div>

              <div className="glass-panel p-5 rounded-2xl red-glow-primary hover:border-red-500/20 transition-all duration-300">
                <div className="flex items-center gap-2 mb-1 text-red-400">
                  <Wallet size={16} />
                  <span className="text-[9px] font-bold uppercase tracking-wider opacity-85">
                    Prize Distributed
                  </span>
                </div>
                <div className="text-2xl font-black text-white">
                  ₹{totalPrizeMoneySum.toLocaleString()}
                </div>
                <div className="text-emerald-500 text-[10px] flex items-center gap-0.5 mt-1 font-semibold">
                  <BadgeCheck size={12} /> 100% Paid
                </div>
              </div>

              <div className="glass-panel p-5 rounded-2xl red-glow-secondary hover:border-yellow-500/20 transition-all duration-300">
                <div className="flex items-center gap-2 mb-1 text-yellow-500">
                  <ShieldCheck size={16} />
                  <span className="text-[9px] font-bold uppercase tracking-wider opacity-85">
                    Payout Success Rate
                  </span>
                </div>
                <div className="text-2xl font-black text-white">{successPercentage}%</div>
                <div className="text-emerald-500 text-[10px] flex items-center gap-0.5 mt-1 font-semibold uppercase">
                  Excellent
                </div>
              </div>
            </div>
          </motion.div>

          {/* Interactive Spin Wheel Card with 3D Parallax & Auto Spin */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 flex justify-center items-center"
          >
            <div className="animate-[float-oscillation_6s_ease-in-out_infinite] w-full max-w-xl flex justify-center">
              <div
                style={{
                  transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                  transformStyle: "preserve-3d",
                }}
                className="relative w-full flex flex-col items-center justify-center transition-all duration-200"
              >
               

                {/* Spin Wheel Visuals */}
                <div className="relative w-80 h-80 sm:w-[24rem] sm:h-[24rem] md:w-[28rem] md:h-[28rem] lg:w-[30rem] lg:h-[30rem] xl:w-[32rem] xl:h-[32rem] flex items-center justify-center">
                  {/* Background lighting & glows */}
                  <div className="absolute inset-0 bg-red-600/20 rounded-full blur-[100px] animate-pulse" />
                  <div className="absolute inset-0 bg-yellow-500/10 rounded-full blur-[60px] animate-pulse delay-700" />
                  <div className="absolute -inset-4 bg-gradient-to-tr from-red-600/30 to-yellow-500/30 rounded-full blur-2xl opacity-50 animate-pulse" />

                  
                  {/* Spinning Wheel */}
                  <div
                    className="w-full h-full rounded-full relative z-10 select-none shadow-[0_0_50px_rgba(220,38,38,0.25)] border-[6px] border-red-950/60 overflow-hidden"
                  >
                    <img
                      alt="Luxury Spin Wheel"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDM0UYg--rRGzCVuI-ApeeY3SboHH-vl7APct0YYIVZCLnzvE4JxIhvEjCZEVoQoGKzErd5wXxdgUfKN-ENbeGoPrLal43N1j8yEIoXQZQ6ak0FX6upHVs9fZV52Dey2HFGir5u4CISvns4ZLfkJt7udmTQPtflHUw4h-zR0Ez1IbgR6cDf-Qw5uiVFgGalC4sBn-bzRE4NifR2q0a5m3o9nklUfrBvo8F8vHMrLnGusN4WIa8LfkACknlmk_L85cEqqCHJ13mn7q7A"
                      className="w-full h-full object-cover filter brightness-95 contrast-105"
                    />

                    {/* Glowing center cap */}
                    <div className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-gradient-to-tr from-yellow-500 to-red-600 z-20 shadow-[0_0_20px_rgba(220,38,38,0.6)] border-2 border-white/20 flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full bg-black/40 animate-ping" />
                    </div>
                  </div>

                  {/* Spark ping sparks */}
                  <div className="absolute inset-0 pointer-events-none z-20">
                    <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-500 rounded-full animate-ping opacity-40"></div>
                    <div className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 bg-red-500 rounded-full animate-ping opacity-60 delay-300"></div>
                    <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-yellow-400 rounded-full animate-ping opacity-50 delay-700"></div>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        </section>

        {/* Recent Big Winners section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="py-16 space-y-8 px-4 sm:px-6 lg:px-0"
        >
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-2xl font-black tracking-tight text-white uppercase flex items-center gap-2">
                <Trophy className="text-red-500" /> Recent Big Winners
              </h2>
              <p className="text-zinc-400 text-xs mt-1">
                Real receipts and payout confirmations from our verified
                winners.
              </p>
            </div>
          </div>

          <div
            ref={scrollContainerRef}
            onMouseEnter={() => setIsCarouselHovered(true)}
            onMouseLeave={() => setIsCarouselHovered(false)}
            className="flex gap-6 overflow-x-auto py-4 scrollbar-none select-none"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {[...verifiedWinners, ...verifiedWinners].map((winner, idx) => (
              <motion.div
                key={`${winner.id}-${idx}`}
                whileHover={{ y: -6, scale: 1.02 }}
                onClick={() => setSelectedReceiptWinner(winner)}
                className="flex-shrink-0 w-80 glass-panel p-6 rounded-3xl space-y-4 cursor-pointer relative overflow-hidden red-glow-primary group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-red-600/10 border border-red-500/20 text-red-500 flex items-center justify-center font-bold text-xs">
                      {winner.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                        .substring(0, 2)}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">
                        {winner.name}
                      </h4>
                      <p className="text-[10px] text-zinc-400">
                        Phone ID: {winner.id}
                      </p>
                    </div>
                  </div>
                  <div className="bg-emerald-500/10 text-emerald-400 text-[9px] px-2.5 py-1 rounded-full font-bold flex items-center gap-1 border border-emerald-500/20">
                    <BadgeCheck size={12} /> VERIFIED
                  </div>
                </div>

                <div className="flex justify-between items-end pt-2">
                  <div>
                    <div className="text-2xl font-black text-red-500">
                      ₹{winner.prize.toLocaleString()}
                    </div>
                    <p className="text-[10px] text-zinc-400 mt-0.5">
                      Fortune Spin Payout
                    </p>
                  </div>
                  <span className="text-[9px] uppercase tracking-wider text-red-400 font-bold border-b border-red-500/30 pb-0.5 group-hover:text-white transition-all">
                    View Receipt &rarr;
                  </span>
                </div>
              </motion.div>
            ))}{" "}
          </div>
        </motion.section>

        {/* Transparency section */}
        <motion.section
          id="transparency"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="py-16 bg-red-950/5 border border-red-950/20 rounded-3xl p-8 md:p-12 relative overflow-hidden mx-4 sm:mx-6 lg:mx-0"
        >
          <div className="absolute inset-0 bg-red-600/[0.02] -z-10" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4 space-y-4">
              <h3 className="text-2xl font-black tracking-tight text-white uppercase flex items-center gap-2">
                <ShieldCheck className="text-red-500" /> Trust & Fairness
              </h3>
              <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">
                We safeguard every spin through anti-fraud mechanics and audit
                logs. Your participation is protected by high-standard platform
                security.
              </p>

              <div className="glass-panel p-4 rounded-xl border border-red-500/10">
                <p className="text-[9px] text-red-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />{" "}
                  Real-time Audit
                </p>
                <div className="flex justify-between items-end mt-2">
                  <div>
                    <p className="text-xs font-bold text-white">
                      Anil T. (Jaipur)
                    </p>
                    <p className="text-[9px] text-zinc-400">
                      Transaction code verified
                    </p>
                  </div>
                  <div className="text-sm font-black text-red-500">₹2,000</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="glass-panel p-6 rounded-2xl flex gap-4 items-start border border-red-500/10">
                <div className="bg-red-500/10 p-2.5 rounded-xl text-red-500 flex-shrink-0 border border-red-500/20">
                  <BadgeCheck size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm mb-1">
                    100% Verified Accounts
                  </h4>
                  <p className="text-xs text-zinc-400 leading-normal">
                    Each winner undergoes automated identity validation before
                    payout release to block duplicate signups.
                  </p>
                </div>
              </div>

              <div className="glass-panel p-6 rounded-2xl flex gap-4 items-start border border-red-500/10">
                <div className="bg-red-500/10 p-2.5 rounded-xl text-red-500 flex-shrink-0 border border-red-500/20">
                  <Landmark size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm mb-1">
                    Direct Bank Transfers
                  </h4>
                  <p className="text-xs text-zinc-400 leading-normal">
                    Payouts clear instantly via secured API integrations into
                    verified GPay target accounts.
                  </p>
                </div>
              </div>

              <div className="glass-panel p-6 rounded-2xl flex gap-4 items-start border border-red-500/10">
                <div className="bg-red-500/10 p-2.5 rounded-xl text-red-500 flex-shrink-0 border border-red-500/20">
                  <Hourglass size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm mb-1">
                    Sub-Second Processing
                  </h4>
                  <p className="text-xs text-zinc-400 leading-normal">
                    Payout batches dispatch automatically. Most transfers
                    resolve within minutes of winning.
                  </p>
                </div>
              </div>

              <div className="glass-panel p-6 rounded-2xl flex gap-4 items-start border border-red-500/10">
                <div className="bg-red-500/10 p-2.5 rounded-xl text-red-500 flex-shrink-0 border border-red-500/20">
                  <ShieldAlert size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm mb-1">
                    Anti-Cheat Protocols
                  </h4>
                  <p className="text-xs text-zinc-400 leading-normal">
                    Our system monitors mouse paths and spin rates to block
                    bots, ensuring fair play for all users.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* All Winners Table */}
        <motion.section
          id="winners"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="py-16 space-y-8 px-4 sm:px-6 lg:px-0"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-black tracking-tight text-white uppercase flex items-center gap-2">
                <Users className="text-red-500" /> Complete Winners Ledger
              </h2>
              <p className="text-zinc-400 text-xs mt-1">
                Transparency log containing details of rewards distributed to
                date.
              </p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by name, city, state..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="bg-red-950/20 border border-red-950/30 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-red-500 text-white w-full md:w-60 transition-all placeholder:text-zinc-600"
                />
              </div>

              <div className="flex items-center bg-red-950/20 border border-red-950/30 rounded-xl p-1 gap-1">
                <button
                  onClick={() => {
                    setFilterPrize("ALL");
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${filterPrize === "ALL" ? "bg-red-600 text-white" : "text-zinc-400 hover:text-white"}`}
                >
                  All
                </button>
                <button
                  onClick={() => {
                    setFilterPrize("HIGH");
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${filterPrize === "HIGH" ? "bg-red-600 text-white" : "text-zinc-400 hover:text-white"}`}
                >
                  ≥ ₹500
                </button>
                <button
                  onClick={() => {
                    setFilterPrize("MID");
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${filterPrize === "MID" ? "bg-red-600 text-white" : "text-zinc-400 hover:text-white"}`}
                >
                  ₹100 - ₹500
                </button>
                <button
                  onClick={() => {
                    setFilterPrize("LOW");
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${filterPrize === "LOW" ? "bg-red-600 text-white" : "text-zinc-400 hover:text-white"}`}
                >
                  &lt; ₹100
                </button>
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto glass-panel rounded-2xl border border-red-500/10">
            <table className="w-full text-left border-collapse min-w-[700px] text-xs">
              <thead>
                <tr className="border-b border-red-950/50 bg-[#0e0303]/60 text-zinc-400 uppercase tracking-wider font-bold">
                  <th className="px-6 py-4 font-mono text-[10px]">
                    User ID / Phone
                  </th>
                  <th className="px-6 py-4 font-mono text-[10px]">Recipient</th>
                  <th className="px-6 py-4 font-mono text-[10px]">Prize</th>
                  <th className="px-6 py-4 font-mono text-[10px]">
                    Verification
                  </th>
                  <th className="px-6 py-4 font-mono text-[10px] text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-red-950/20">
                <AnimatePresence mode="popLayout">
                  {currentWinners.map((winner) => (
                    <motion.tr
                      key={winner.id + "-" + winner.prize}
                      layout
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      onClick={() => setSelectedReceiptWinner(winner)}
                      className="hover:bg-red-950/15 border-b border-red-950/10 transition-colors cursor-pointer group"
                    >
                      <td className="px-6 py-4 font-mono text-red-400 font-bold">
                        {winner.id}
                      </td>
                      <td className="px-6 py-4 font-bold text-white">
                        {winner.name}
                      </td>
                      <td className="px-6 py-4 font-black text-white">
                        ₹{winner.prize.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`${winner.receiptUrl ? "text-emerald-500" : "text-amber-500"} flex items-center gap-1 font-bold text-[10px]`}
                        >
                          {winner.receiptUrl ? (
                            <BadgeCheck size={14} />
                          ) : (
                            <Hourglass size={14} />
                          )}
                          {winner.receiptUrl
                            ? "System Verified"
                            : "Verification Pending"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`font-bold uppercase text-[9px] px-2.5 py-1.5 rounded-md transition-all ${
                            winner.receiptUrl
                              ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-black"
                              : "bg-amber-500/10 border border-amber-500/20 text-amber-400 group-hover:bg-amber-500 group-hover:text-black"
                          }`}
                        >
                          {winner.receiptUrl ? "View Receipt" : "Audit Pending"}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                  {currentWinners.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="text-center py-8 text-zinc-500"
                      >
                        No transactions match the search filters.
                      </td>
                    </tr>
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-2">
              <p className="text-xs text-zinc-400">
                Showing page {currentPage} of {totalPages} (
                {filteredWinners.length} total winners)
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-xl bg-red-950/20 border border-red-500/10 hover:bg-red-500/10 transition-all text-zinc-300 disabled:opacity-30 disabled:hover:bg-transparent"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-xl bg-red-950/20 border border-red-500/10 hover:bg-red-500/10 transition-all text-zinc-300 disabled:opacity-30 disabled:hover:bg-transparent"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </motion.section>

        {/* Testimonials */}
        <motion.section
          id="testimonials"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="py-16 space-y-12 px-4 sm:px-6 lg:px-0"
        >
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-black tracking-tight text-white uppercase">
              Winner Testimonials ❤️
            </h2>
            <p className="text-zinc-400 text-xs md:text-sm max-w-xl mx-auto">
              Read review comments verified by our community detailing instant
              payout confirmations.
            </p>
          </div>

          {/* Reviews Rating Summary Widget Banner */}
          <div className="bg-[#1e0808]/40 border border-red-500/10 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-center gap-6 my-6 max-w-md mx-auto backdrop-blur-md">
            <div className="flex items-center gap-4">
              <span className="text-4xl sm:text-5xl font-black text-white">
                {averageRating}
              </span>
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      className={`w-4 h-4 ${
                        idx < Math.round(Number(averageRating))
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-white/10"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">
                  {testimonials.length} Total{" "}
                  {testimonials.length === 1 ? "Review" : "Reviews"}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((card, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="glass-panel p-6 rounded-3xl flex flex-col justify-between min-h-[14rem] border border-red-500/10 hover:border-red-500/35 transition-all cursor-default"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, sIdx) => (
                      <Star
                        key={sIdx}
                        className={`w-3 h-3 ${
                          sIdx < card.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-white/10"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold uppercase text-[8px] px-1.5 py-0.5 rounded">
                    Verified
                  </span>
                </div>

                <p className="text-zinc-300 text-xs italic leading-relaxed flex-grow text-left">
                  "{card.text}"
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-red-950/20 mt-2">
                  <div className="w-9 h-9 rounded-full bg-red-600/15 border border-red-500/20 text-red-400 flex items-center justify-center font-bold text-xs">
                    {card.initials}
                  </div>
                  <div className="text-left">
                    <h5 className="font-bold text-white text-xs">
                      {card.name}
                    </h5>
                    <p className="text-[9px] text-zinc-400">Verified Winner</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>

      {/* Winning Reward Ceremony Dialog Modal */}
      <AnimatePresence>
        {showPrizeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-md p-8 rounded-3xl glass-panel text-center relative overflow-hidden shadow-[0_0_50px_rgba(220,38,38,0.4)] border border-red-500/30"
            >
              {/* Confetti element placement */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-red-600/10 to-transparent rounded-full blur-3xl -mr-24 -mt-24" />

              <button
                onClick={() => setShowPrizeModal(false)}
                className="absolute right-4 top-4 text-zinc-400 hover:text-white p-1 rounded-full bg-white/5 border border-white/5 transition-all"
              >
                <X size={16} />
              </button>

              <div className="w-20 h-20 bg-yellow-500/10 border border-yellow-500/25 rounded-full flex items-center justify-center mx-auto mb-6 text-yellow-500 drop-shadow-[0_0_15px_rgba(234,179,8,0.3)]">
                <Trophy size={42} className="animate-pulse" />
              </div>

              <h3 className="text-2xl font-black text-white tracking-tight leading-none uppercase">
                Mock Reward Released!
              </h3>

              <div className="text-4xl font-mono font-black text-yellow-400 my-6 drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]">
                {wonPrize}
              </div>

              <p className="text-zinc-400 text-xs leading-relaxed mb-6">
                Verification checks succeeded. A mock payout transfer for{" "}
                <span className="text-white font-bold">{wonPrize}</span> has
                been processed automatically.
              </p>

              <button
                onClick={() => setShowPrizeModal(false)}
                className="w-full bg-white hover:bg-zinc-200 text-black font-black uppercase text-xs tracking-wider py-3.5 rounded-xl transition-all"
              >
                Claim Payout
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* GPay Receipt Pop-up Modal */}
      <AnimatePresence>
        {selectedReceiptWinner && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-md p-6 rounded-3xl glass-panel text-center relative overflow-hidden shadow-[0_0_50px_rgba(220,38,38,0.4)] border border-red-500/30"
            >
              <button
                onClick={() => setSelectedReceiptWinner(null)}
                className="absolute right-4 top-4 text-zinc-400 hover:text-white p-1 rounded-full bg-white/5 border border-white/5 transition-all animate-bounce"
              >
                <X size={16} />
              </button>

              <div className="flex items-center gap-3 justify-center mb-4 pt-2">
                <div className="w-10 h-10 rounded-full bg-red-600/10 border border-red-500/20 text-red-500 flex items-center justify-center font-bold text-sm">
                  {selectedReceiptWinner.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .substring(0, 2)}
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-white text-sm">
                    {selectedReceiptWinner.name}
                  </h4>
                  <p className="text-[10px] text-zinc-400">
                    Phone ID: {selectedReceiptWinner.id}
                  </p>
                </div>
              </div>

              <div className="bg-black/35 rounded-2xl p-4 mb-4 border border-red-950/30">
                <div className="text-[10px] uppercase tracking-wider text-zinc-400 mb-1">
                  Mock Payout Distributed
                </div>
                <div className="text-3xl font-mono font-black text-red-500">
                  ₹{selectedReceiptWinner.prize.toLocaleString()}
                </div>
              </div>

              {selectedReceiptWinner.receiptUrl ? (
                <div className="bg-black/45 rounded-2xl p-3 border border-red-950/40 overflow-hidden relative group max-h-[350px] flex items-center justify-center">
                  <img
                    alt={`GPay receipt for ${selectedReceiptWinner.name}`}
                    src={selectedReceiptWinner.receiptUrl}
                    className="max-h-[300px] w-auto rounded-xl object-contain shadow-2xl transition-all duration-300"
                  />
                </div>
              ) : (
                <div className="bg-black/45 rounded-2xl p-8 border border-red-950/40 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center mx-auto animate-pulse">
                    <Hourglass size={24} />
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-sm">
                      Verification In Progress
                    </h5>
                    <p className="text-zinc-400 text-[10px] leading-relaxed mt-2">
                      Compliance batch audit is currently processing this
                      transaction. Receipts are securely uploaded to the
                      verification ledger within 24-48 hours.
                    </p>
                  </div>
                </div>
              )}

              <button
                onClick={() => setSelectedReceiptWinner(null)}
                className="w-full mt-5 bg-gradient-to-r from-red-600 to-yellow-500 hover:from-red-500 hover:to-yellow-400 text-black font-black uppercase text-xs tracking-wider py-3.5 rounded-xl transition-all"
              >
                Close Receipt
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SpinningResults;
