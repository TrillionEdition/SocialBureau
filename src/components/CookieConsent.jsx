import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";
import {
  Cookie,
  X,
  Check,
  ShieldCheck,
  Settings,
  Info,
  InfoIcon,
} from "lucide-react";

export default function CookieConsent({ forceShow = false }) {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-150, 0, 150], [-25, 0, 25]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  const approveOpacity = useTransform(x, [50, 150], [0, 1]);
  const declineOpacity = useTransform(x, [-150, -50], [1, 0]);
  const bgColor = useTransform(
    x,
    [-150, 0, 150],
    ["rgba(239, 68, 68, 0.2)", "rgba(0, 0, 0, 0.8)", "rgba(34, 197, 94, 0.2)"],
  );

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      if (forceShow) {
        setShowBanner(true);
      }
    } else {
      const savedPreferences = JSON.parse(consent);
      setPreferences(savedPreferences);
      enableScripts(savedPreferences);
    }
  }, [forceShow]);

  const enableScripts = (prefs) => {
    if (prefs.analytics && !window.gtag) {
      const script = document.createElement("script");
      script.src = "https://www.googletagmanager.com/gtag/js?id=G-F705XF08KB";
      script.async = true;
      document.head.appendChild(script);
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      window.gtag = gtag;
      gtag("js", new Date());
      gtag("config", "G-F705XF08KB");
    }

    if (prefs.marketing && !window.fbq) {
      !(function (f, b, e, v, n, t, s) {
        if (f.fbq) return;
        n = f.fbq = function () {
          n.callMethod
            ? n.callMethod.apply(n, arguments)
            : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = "2.0";
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(
        window,
        document,
        "script",
        "https://connect.facebook.net/en_US/fbevents.js",
      );
      window.fbq("init", "808365388791255");
      window.fbq("track", "PageView");
    }
  };

  const handleDragEnd = (event, info) => {
    if (info.offset.x > 150) {
      handleAcceptAll();
    } else if (info.offset.x < -150) {
      handleDeclineAll();
    }
  };

  const handleAcceptAll = () => {
    const allPreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    savePreferences(allPreferences);
  };

  const handleDeclineAll = () => {
    const minimalPreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    savePreferences(minimalPreferences);
  };

  const savePreferences = (prefs) => {
    localStorage.setItem("cookieConsent", JSON.stringify(prefs));
    enableScripts(prefs);
    setShowBanner(false);
    setShowSettings(false);
  };

  const handlePreferenceChange = (category) => {
    if (category === "necessary") return;
    setPreferences((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  const Toggle = ({ enabled, onChange, disabled }) => (
    <button
      onClick={onChange}
      disabled={disabled}
      className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors ${
        enabled ? "bg-red-600" : "bg-gray-700"
      } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <motion.span
        animate={{ x: enabled ? 22 : 2 }}
        className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
      />
    </button>
  );

  return (
    <AnimatePresence>
      {showBanner && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-6 overflow-hidden"
          >
            {!showSettings ? (
              <div className="relative w-full max-w-sm">
                {/* Swipe Indicators */}
                <motion.div
                  style={{ opacity: approveOpacity }}
                  className="absolute -right-16 top-1/2 -translate-y-1/2 bg-green-500/20 border border-green-500 text-green-500 px-4 py-2 rounded-xl font-bold rotate-12 z-10 pointer-events-none"
                >
                  AGREE
                </motion.div>
                <motion.div
                  style={{ opacity: declineOpacity }}
                  className="absolute -left-16 top-1/2 -translate-y-1/2 bg-red-500/20 border border-red-500 text-red-500 px-4 py-2 rounded-xl font-bold -rotate-12 z-10 pointer-events-none"
                >
                  DECLINE
                </motion.div>

                {/* The Card */}
                <motion.div
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  style={{ x, rotate, opacity }}
                  onDragEnd={handleDragEnd}
                  whileDrag={{ scale: 1.05 }}
                  className="bg-black/90 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 shadow-2xl cursor-grab active:cursor-grabbing text-center relative overflow-hidden"
                >
                  {/* Background Aura */}
                  <motion.div
                    style={{ backgroundColor: bgColor }}
                    className="absolute inset-0 transition-colors duration-300 pointer-events-none"
                  />

                  <div className="relative z-10">
                    <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-900 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-lg rotate-3 group-hover:rotate-0 transition-transform">
                      <Cookie className="w-10 h-10 text-white" />
                    </div>

                    <h3 className="text-2xl font-extrabold text-white mb-3 tracking-tight">
                      Cookie Match?
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-8">
                      We use cookies to make your experience special. Swipe
                      right to accept all, or left to decline.
                    </p>

                    <div className="flex flex-col gap-4">
                      <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-bold text-gray-500 border-t border-white/5 pt-6">
                        <span>← Swipe left to decline</span>
                        <span>Swipe right to agree →</span>
                      </div>

                      <button
                        onClick={() => setShowSettings(true)}
                        className="flex items-center justify-center gap-2 text-xs text-gray-400 hover:text-white transition-colors py-2"
                      >
                        <Settings className="w-3 h-3" />
                        Custom Settings
                      </button>
                    </div>
                  </div>

                  {/* Visual Drag Hint */}
                  <motion.div
                    animate={{ x: [0, 10, -10, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      ease: "easeInOut",
                    }}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                    <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                    <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                  </motion.div>
                </motion.div>

                <p className="text-center text-white/30 text-[10px] mt-6">
                  Learn more in our{" "}
                  <Link
                    to="/privacy-policy"
                    className="underline hover:text-white"
                  >
                    Privacy Policy
                  </Link>
                </p>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md bg-zinc-900 border border-white/10 rounded-3xl p-8 shadow-2xl"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-red-500" />
                    Privacy Settings
                  </h3>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="p-2 hover:bg-white/5 rounded-full text-gray-400"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4 mb-8">
                  {[
                    {
                      id: "necessary",
                      label: "Strictly Necessary",
                      desc: "Required for the site to work correctly.",
                      locked: true,
                    },
                    {
                      id: "analytics",
                      label: "Analytics",
                      desc: "Helps us understand how you use the site.",
                    },
                    {
                      id: "marketing",
                      label: "Marketing",
                      desc: "Used for personalized advertisements.",
                    },
                  ].map((pref) => (
                    <div
                      key={pref.id}
                      className="bg-white/5 p-4 rounded-2xl flex items-center justify-between group"
                    >
                      <div className="flex-1">
                        <h4 className="text-white font-semibold text-sm">
                          {pref.label}
                        </h4>
                        <p className="text-gray-500 text-xs">{pref.desc}</p>
                      </div>
                      <Toggle
                        enabled={preferences[pref.id]}
                        onChange={() => handlePreferenceChange(pref.id)}
                        disabled={pref.locked}
                      />
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowSettings(false)}
                    className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => {
                      savePreferences(preferences);
                    }}
                    className="flex-2 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-red-900/20"
                  >
                    Save Preferences
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
