import React, { useState, useEffect, useRef } from "react";
import Footer from "../components/Footer";
import { div } from "framer-motion/client";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function VoiceAsst() {
  const [isActive, setIsActive] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [highlightedText, setHighlightedText] = useState("");
  const [conversationStep, setConversationStep] = useState("initial");
  const [suggestions, setSuggestions] = useState([]);
  const speechRef = useRef(null);
useEffect(() => {
  const handleVoicesChanged = () => {
    speechSynthesis.getVoices(); // Load voices
  };
  speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);
  speechSynthesis.getVoices(); // Trigger early loading
  return () => {
    speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
  };
}, []);
const voicesRef = useRef([]);

useEffect(() => {
  const loadVoices = () => {
    voicesRef.current = speechSynthesis.getVoices();
  };
  speechSynthesis.addEventListener('voiceschanged', loadVoices);
  loadVoices();
  return () => speechSynthesis.removeEventListener('voiceschanged', loadVoices);
}, []);

  // New states for audio visualization
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const sourceRef = useRef(null);
  const animationFrameRef = useRef(null);
  const [isVoiceActive, setIsVoiceActive] = useState(false); // To control line animation

  const messages = {
    greeting: "Welcome back visionary. Let’s build empires.",
    whatCanIDo: "Hi, I am Socci. What would you like to discover today? I can help you learn about our company, explore career opportunities, understand our services, or connect you with our team.",
    aboutUs: "We are a dynamic company driven by innovation and excellence, committed to delivering exceptional results and pushing the boundaries of what's possible.",
    joinTeam: "We'd love for you to join our exceptional team. We're always looking for passionate talent who share our vision for innovation and excellence.",
    services: "Our comprehensive services are designed to deliver exceptional results for our clients, combining cutting-edge technology with personalized solutions.",
    contact: "You can contact us anytime through multiple channels. We're here to help and respond promptly to all inquiries.",
    goodbye: "Thanks for visiting and engaging with us!"
  };

  const suggestionButtons = {
    initial: [
      { text: "Our Services", action: "services", icon: "fas fa-cogs" },
      { text: "Join Our Team", action: "joinTeam", icon: "fas fa-users" },
      { text: "About Our Company", action: "aboutUs", icon: "fas fa-building" },
      { text: "Contact Us", action: "contact", icon: "fas fa-phone" }
    ],
    followUp: [
      { text: "Tell me more", action: "more", icon: "fas fa-lightbulb" },
      { text: "How do I apply?", action: "apply", icon: "fas fa-file-alt" },
      { text: "What's next?", action: "next", icon: "fas fa-arrow-right" },
      { text: "That's all", action: "goodbye", icon: "fas fa-hand-wave" }
    ]
  };

  const startAssistant = () => {
    setIsActive(true);
    setCurrentMessage(messages.greeting);
    speak(messages.greeting, () => {
      setTimeout(() => {
        setCurrentMessage(messages.whatCanIDo);
        speak(messages.whatCanIDo, () => {
          setSuggestions(suggestionButtons.initial);
          setConversationStep("initial");
        });
      }, 1000);
    });
    startAudioVisualization(); // Start audio visualization when assistant starts
  };

  const stopAssistant = () => {
    speechSynthesis.cancel();
    resetAssistant();
    stopAudioVisualization(); // Stop audio visualization when assistant stops
  };

  const resetAssistant = () => {
    setIsActive(false);
    setCurrentMessage("");
    setHighlightedText("");
    setSuggestions([]);
    setConversationStep("initial");
  };

  const speak = (text, callback) => {
  if (!("speechSynthesis" in window)) return;
  speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.85;
  utterance.pitch = 1.1;
  utterance.volume = 0.9;

  const voices = voicesRef.current;

  const preferredVoice = voices.find(v =>
    (v.name.includes("Samantha") ||
      v.name.includes("Karen") ||
      v.name.includes("Zira")) &&
    v.lang === "en-US"
  );
  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }

  utterance.onstart = () => {
    setIsVoiceActive(true);
  };

  utterance.onboundary = event => {
    if (event.name === "word") {
      const spoken = text.substring(0, event.charIndex);
      setHighlightedText(spoken);
    }
  };

  utterance.onend = () => {
    setHighlightedText("");
    setIsVoiceActive(false);
    if (callback) callback();
  };

  speechSynthesis.speak(utterance);
  speechRef.current = utterance;
};

const navigate=useNavigate();
  const handleSuggestionClick = action => {
    setSuggestions([]);
    let response = "";
    let nextStep = "followUp";

    switch (action) {
      case "aboutUs":
        response = messages.aboutUs;
        break;
      case "joinTeam":
        response = messages.joinTeam;
        break;
      case "services":
        response = messages.services;
        break;
      case "contact":
        response = messages.contact;
        navigate("/contact"); 
        break;

      case "more":
        response = "Our company has achieved remarkable milestones through innovation, building solutions that transform industries and empower businesses worldwide.";
        break;
      case "apply":
        response = "Visit our careers page to explore opportunities, or send us your resume directly. We review all applications and respond within 48 hours.";
        break;
      case "next":
        response = "Feel free to explore our website further, check out our portfolio, or reach out to us for personalized assistance.";
        break;
      case "goodbye":
        response = messages.goodbye;
        nextStep = "end";
        break;
      default:
        response = "I'm here to help with anything you need!";
    }

    setCurrentMessage(response);
    speak(response, () => {
      if (nextStep === "end") {
        setTimeout(() => resetAssistant(), 2000);
      } else {
        setSuggestions(suggestionButtons[nextStep]);
        setConversationStep(nextStep);
      }
    });
  };


  // --- Inline CSS Definition ---
  const inlineStyles = `
    .audio-line-container {
        width: 100%;
        height: 100px; /* Adjust as needed */
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
    }

    .audio-line {
        position: absolute;
        height: 5px; /* Thickness of the line */
        background: white; /* Default color, will be overridden */
        transition: transform 0.05s ease-out, width 0.05s ease-out; /* Smooth transition for movement */
    }

    /* Specific colors */
    .audio-line.red {
        background: #ff0000;
    }

    .audio-line.white {
        background: #ffffff;
    }

    .audio-line.black {
        background: #000000;
    }

    /* Animation for active voice */
    @keyframes voice-wave {
        0% { transform: scaleY(1); }
        50% { transform: scaleY(1.5); } /* Slightly larger when active */
        100% { transform: scaleY(1); }
    }

    .audio-line.active {
        animation: voice-wave 0.3s infinite alternate; /* Adjust speed as needed */
    }

    /* When no voice, ensure straight line */
    .audio-line.straight {
        transform: scaleY(1);
        animation: none;
    }

    /* You might have other existing styles here */
    .gradient-bg {
      background: linear-gradient(135deg,rgb(56, 0, 0),rgb(148, 0, 0),rgb(156, 0, 0));
    }

    .particle {
      position: absolute;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      animation: float 10s infinite ease-in-out;
      width: 10px;
      height: 10px;
      opacity: 0.7;
    }

    .particle:nth-child(2) {
      width: 15px;
      height: 15px;
      animation-duration: 12s;
      left: 20%;
    }
    .particle:nth-child(3) {
      width: 8px;
      height: 8px;
      animation-duration: 8s;
      left: 30%;
    }
    .particle:nth-child(4) {
      width: 12px;
      height: 12px;
      animation-duration: 14s;
      left: 45%;
    }
    .particle:nth-child(5) {
      width: 18px;
      height: 18px;
      animation-duration: 11s;
      left: 60%;
    }
    .particle:nth-child(6) {
      width: 7px;
      height: 7px;
      animation-duration: 9s;
      left: 75%;
    }
    .particle:nth-child(7) {
      width: 13px;
      height: 13px;
      animation-duration: 13s;
      left: 85%;
    }
    .particle:nth-child(8) {
      width: 9px;
      height: 9px;
      animation-duration: 10s;
      left: 5%;
    }
    .particle:nth-child(9) {
      width: 16px;
      height: 16px;
      animation-duration: 15s;
      left: 95%;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0) translateX(0); }
      25% { transform: translateY(-20px) translateX(10px); }
      50% { transform: translateY(20px) translateX(-10px); }
      75% { transform: translateY(-10px) translateX(5px); }
    }

    .wave-animation {
      position: absolute;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.1);
      animation: wave 2s infinite ease-out;
    }

    .pulse-ring {
      position: absolute;
      width: 120px;
      height: 120px;
      border-radius: 50%;
      border: 3px solid rgba(255, 0, 0, 0.5);
      animation: pulse 1.5s infinite cubic-bezier(0.66, 0, 0.34, 1);
    }

    @keyframes wave {
      0% { transform: scale(0.5); opacity: 0.5; }
      100% { transform: scale(1.5); opacity: 0; }
    }

    @keyframes pulse {
      0% { transform: scale(0.8); opacity: 1; }
      100% { transform: scale(1.2); opacity: 0; }
    }

    .avatar-glow {
      box-shadow: 0 0 20px rgba(255, 0, 0, 0.7), 0 0 40px rgba(255, 0, 0, 0.5), 0 0 60px rgba(255, 0, 0, 0.3);
    }

    .message-container {
      background: rgba(0, 0, 0, 0.4);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .suggestion-btn {
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(5px);
      border: 1px solid rgba(255, 255, 255, 0.3);
      transition: background 0.3s ease;
      animation: fadeIn 0.5s forwards;
      opacity: 0;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;

  return (
    <div>
      {/* Inject the styles into the head of the document */}
      <style>{inlineStyles}</style>

      <div className="gradient-bg min-h-screen text-white overflow-hidden relative flex flex-col items-center justify-center px-4">
        {/* Floating Particles */}
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{ left: `${10 + i * 10}%`, animationDelay: `${i * 2}s` }}
          />
        ))}

        {/* Header */}
        <div className="absolute top-6 left-6">
          <h1 className="text-2xl font-bold">Voice Assistant</h1>
          <p className="text-sm opacity-80">Powered by TrillionEdition</p>
        </div>

        {/* Close */}
        <button name="close"
          onClick={() => navigate('/')}
          className="absolute top-6 right-6 text-3xl hover:text-black"
        >
          <i className="fas fa-times"></i>
        </button>

        {/* Audio Line Visualization (Replaces Robot Icon) */}
        <div className="flex flex-col items-center space-y-8 relative">
          <div className="wave-animation"></div> {/* Keep your existing wave/pulse animations if desired */}
          <div className="pulse-ring"></div>


          {/* Message */}
          {currentMessage && (
            <div className="mt-40 message-container rounded-2xl p-8 max-w-4xl w-full text-center shadow-2xl">
              <div className="text-xl lg:text-2xl leading-relaxed font-thin" style={{ fontFamily: "Inter, sans-serif" }}>
                {highlightedText ? (
                  <>
                    <span>{highlightedText}</span>
                    <span></span>
                  </>
                ) : (
                  currentMessage
                )}
              </div>

            </div>
          )}


          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 w-full max-w-2xl">
              {suggestions.map((btn, i) => (
                <button name="suggestion"
                  key={btn.action}
                  className="suggestion-btn hover:bg-[#ff0000] px-6 py-4 rounded-xl font-semibold flex items-center space-x-3 w-full text-left"
                  style={{ animationDelay: `${i * 0.1}s` }}
                  onClick={() => handleSuggestionClick(btn.action)}
                >
                  <i className={btn.icon + " text-xl"}></i>
                  <span>{btn.text}</span>
                </button>
              ))}
              <button name="chat"
                onClick={() => {
                  window.open(
                    "https://wa.me/918921840486?text=Hello, I would like to learn more.",
                    "_blank"
                  );
                }}
                className="suggestion-btn hover:bg-[#ff0000] px-6 py-4 rounded-xl font-semibold flex items-center space-x-3 w-full text-left"
              >
                <i className="fab fa-whatsapp text-xl"></i>
                <span>Chat with us on WhatsApp</span>
              </button>

            </div>
          )}


          {/* Controls */}
          <div className="flex space-x-4 mt-8">
            {!isActive ? (
              <button name="assistant"
                onClick={startAssistant}
                className="suggestion-btn hover:bg-[#ff0000] px-6 py-3 rounded-xl font-semibold flex items-center space-x-2"
              >
                <i className="fas fa-play"></i>
                <span>Start Assistant</span>
              </button>
            ) : (
              <button name="stop"
                onClick={stopAssistant}
                className="hover:bg-[#ff0000] suggestion-btn px-6 py-3 rounded-xl mb-20 font-semibold flex items-center space-x-2"
              >
                <i className="fas fa-stop"></i>
                <span>Stop</span>
              </button>
            )}
          </div>
        </div>


      </div>
      <Navbar/>
      <div className="mb-0 ">
        <Footer />
      </div>
    </div>
  );
}