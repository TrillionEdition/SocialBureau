import React, { useState, useEffect, useRef } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Sparkles, Navigation2, ArrowRight, Volume2, VolumeX } from "lucide-react";
// RelizaFace Component: Displays Reliza's face using an image.
export function RelizaFace({ expression, size = "md" }) {
  const dimensions = size === "sm" ? "w-10 h-10" : size === "lg" ? "w-20 h-20" : "w-12 h-12";
  
  return (
    <div className={`${dimensions} shrink-0 bg-slate-950 rounded-full border border-slate-800 flex items-center justify-center overflow-hidden relative select-none`}>
      <img
        src="https://img.magnific.com/free-vector/friendly-robot-floating-space_1308-161934.jpg?semt=ais_test_b&w=740&q=80"
        className="w-full h-full object-cover"
        alt="Reliza"
        onError={(e) => {
          // If the incomplete URL fails to load, fall back to a cute default robot avatar
          e.target.src = "https://cdn-icons-png.flaticon.com/512/4712/4712035.png";
        }}
      />
    </div>
  );
}

// RelizaFace3D Component: Simple wrapper rendering the image avatar in place of the 3D canvas.
export function RelizaFace3D({ expression, isSpeaking, isScrolled = false, size = "md" }) {
  const dimensions = size === "sm" ? "w-10 h-10" : size === "lg" ? "w-20 h-20 sm:w-14 sm:h-14" : "w-12 h-12";

  return (
    <div className={`${dimensions} shrink-0 bg-slate-950 rounded-full overflow-hidden relative select-none flex items-center justify-center`}>
      <img
        src="https://img.magnific.com/free-vector/friendly-robot-floating-space_1308-161934.jpg?semt=ais_test_b&w=740&q=80"
        className="w-auto h-full"
        alt="Reliza"
        onError={(e) => {
          // If the incomplete URL fails to load, fall back to a cute default robot avatar
          e.target.src = "https://cdn-icons-png.flaticon.com/512/4712/4712035.png";
        }}
      />
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
        className="w-20 h-20 sm:w-15 sm:h-15 rounded-full bg-slate-950 flex items-center justify-center shadow-2xl hover:shadow-[0_0_20px_rgba(255,0,0,0.3)] transition-all cursor-pointer overflow-hidden z-20 relative"
      >
        <RelizaFace3D expression={expression} isSpeaking={isSpeaking} isScrolled={isScrolled} size="lg" />
      </motion.button>
    </motion.div>
  );
}
