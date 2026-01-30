// // import React, { useState, useEffect } from 'react';
// // import { FaCookie } from 'react-icons/fa';
// // import { Link } from 'react-router-dom';

// // export default function CookieConsent() {
// //   const [showBanner, setShowBanner] = useState(false);
// //   const [showSettings, setShowSettings] = useState(false);
// //   const [preferences, setPreferences] = useState({
// //     necessary: true, // Always true, can't be disabled
// //     analytics: false,
// //     marketing: false,
// //   });

// //   useEffect(() => {
// //     // Check if user has already made a choice
// //     const consent = localStorage.getItem('cookieConsent');
// //     if (!consent) {
// //       // Show banner after a brief delay for better UX
// //       setTimeout(() => setShowBanner(true), 1000);
// //     } else {
// //       // Load existing preferences and enable scripts
// //       const savedPreferences = JSON.parse(consent);
// //       setPreferences(savedPreferences);
// //       enableScripts(savedPreferences);
// //     }
// //   }, []);

// //   const enableScripts = (prefs) => {
// //     // Enable Google Analytics if analytics cookies accepted
// //     if (prefs.analytics && !window.gtag) {
// //       const script = document.createElement('script');
// //       script.src = 'https://www.googletagmanager.com/gtag/js?id=G-F705XF08KB';
// //       script.async = true;
// //       document.head.appendChild(script);

// //       window.dataLayer = window.dataLayer || [];
// //       function gtag() { window.dataLayer.push(arguments); }
// //       window.gtag = gtag;
// //       gtag('js', new Date());
// //       gtag('config', 'G-F705XF08KB');
// //     }

// //     // Enable Facebook Pixel if marketing cookies accepted
// //     if (prefs.marketing && !window.fbq) {
// //       !function(f,b,e,v,n,t,s) {
// //         if(f.fbq)return;n=f.fbq=function(){n.callMethod?
// //         n.callMethod.apply(n,arguments):n.queue.push(arguments)};
// //         if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
// //         n.queue=[];t=b.createElement(e);t.async=!0;
// //         t.src=v;s=b.getElementsByTagName(e)[0];
// //         s.parentNode.insertBefore(t,s)
// //       }(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
// //       window.fbq('init', '808365388791255');
// //       window.fbq('track', 'PageView');
// //     }
// //   };

// //   const handleAcceptAll = () => {
// //     const allPreferences = {
// //       necessary: true,
// //       analytics: true,
// //       marketing: true,
// //     };
// //     savePreferences(allPreferences);
// //   };

// //   const handleDeclineAll = () => {
// //     const minimalPreferences = {
// //       necessary: true,
// //       analytics: false,
// //       marketing: false,
// //     };
// //     savePreferences(minimalPreferences);
// //   };

// //   const handleSavePreferences = () => {
// //     savePreferences(preferences);
// //   };

// //   const savePreferences = (prefs) => {
// //     localStorage.setItem('cookieConsent', JSON.stringify(prefs));
// //     enableScripts(prefs);
// //     setShowBanner(false);
// //     setShowSettings(false);
// //   };

// //   const handlePreferenceChange = (category) => {
// //     if (category === 'necessary') return; // Can't disable necessary cookies
// //     setPreferences(prev => ({
// //       ...prev,
// //       [category]: !prev[category]
// //     }));
// //   };

// //   if (!showBanner) return null;

// //   return (
// //     <>
// //       <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40" onClick={() => !showSettings && setShowBanner(false)} />

// //       <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
// //         <div className="max-w-6xl mx-auto bg-gradient-to-br from-black via-gray-900 to-red-950 border border-red-900/50 rounded-2xl shadow-2xl overflow-hidden">
// //           {!showSettings ? (
// //             // Main Banner
// //             <div className="p-6 md:p-8">
// //               <div className="flex items-start gap-4">
// //                 <div className="flex-1">
// //                   <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
// //                     We Value Your Privacy
// //                   </h3>
// //                   <p className="text-gray-300 text-sm md:text-base mb-4">
// //                     SocialBureau uses cookies to enhance your browsing experience, analyze site traffic,
// //                     and deliver personalized content. By clicking "Accept All", you consent to our use of cookies.
// //                   </p>
// //                   <p className="text-gray-400 text-xs mb-4">
// //                     You can customize your preferences or learn more in our{' '}
// //                     <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-red-400 underline">
// //                       Privacy Policy
// //                     </Link>.
// //                   </p>

// //                   <div className="flex flex-wrap gap-3">
// //                     <button
// //                       onClick={handleAcceptAll}
// //                       className="px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-lg transition-all shadow-lg"
// //                     >
// //                       Accept All
// //                     </button>
// //                     <button
// //                       onClick={handleDeclineAll}
// //                       className="px-6 py-2.5 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-all"
// //                     >
// //                       Decline All
// //                     </button>
// //                     <button
// //                       onClick={() => setShowSettings(true)}
// //                       className="px-6 py-2.5 bg-transparent border border-gray-600 hover:border-red-600 text-gray-300 hover:text-white font-semibold rounded-lg transition-all"
// //                     >
// //                       Customize
// //                     </button>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           ) : (
// //             // Settings Panel
// //             <div className="p-6 md:p-8">
// //               <h3 className="text-2xl font-bold text-white mb-4">Cookie Preferences</h3>
// //               <p className="text-gray-300 text-sm mb-6">
// //                 Choose which types of cookies you want to allow. You can change these settings at any time.
// //               </p>

// //               <div className="space-y-4 mb-6">
// //                 {/* Necessary Cookies */}
// //                 <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800">
// //                   <div className="flex items-center justify-between mb-2">
// //                     <div className="flex items-center gap-3">
// //                       <h4 className="text-lg font-semibold text-white">Strictly Necessary</h4>
// //                     </div>
// //                     <div className="px-3 py-1 bg-gray-700 rounded-full text-xs text-gray-300">
// //                       Always Active
// //                     </div>
// //                   </div>
// //                   <p className="text-sm text-gray-400 ml-11">
// //                     Essential cookies for the website to function properly. These cannot be disabled.
// //                   </p>
// //                 </div>

// //                 {/* Analytics Cookies */}
// //                 <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800">
// //                   <div className="flex items-center justify-between mb-2">
// //                     <div className="flex items-center gap-3">
// //                       <h4 className="text-lg font-semibold text-white">Analytics & Performance</h4>
// //                     </div>
// //                     <label className="relative inline-flex items-center cursor-pointer">
// //                       <input
// //                         type="checkbox"
// //                         checked={preferences.analytics}
// //                         onChange={() => handlePreferenceChange('analytics')}
// //                         className="sr-only peer"
// //                       />
// //                       <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-red-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
// //                     </label>
// //                   </div>
// //                   <p className="text-sm text-gray-400 ml-11">
// //                     Help us understand how visitors use our website (Google Analytics).
// //                   </p>
// //                 </div>

// //                 {/* Marketing Cookies */}
// //                 <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800">
// //                   <div className="flex items-center justify-between mb-2">
// //                     <div className="flex items-center gap-3">
// //                       <h4 className="text-lg font-semibold text-white">Marketing & Advertising</h4>
// //                     </div>
// //                     <label className="relative inline-flex items-center cursor-pointer">
// //                       <input
// //                         type="checkbox"
// //                         checked={preferences.marketing}
// //                         onChange={() => handlePreferenceChange('marketing')}
// //                         className="sr-only peer"
// //                       />
// //                       <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-red-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
// //                     </label>
// //                   </div>
// //                   <p className="text-sm text-gray-400 ml-11">
// //                     Used to deliver personalized ads and track campaign performance (Facebook Pixel).
// //                   </p>
// //                 </div>
// //               </div>

// //               <div className="flex flex-wrap gap-3">
// //                 <button
// //                   onClick={handleSavePreferences}
// //                   className="px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-lg transition-all shadow-lg"
// //                 >
// //                   Save Preferences
// //                 </button>
// //                 <button
// //                   onClick={() => setShowSettings(false)}
// //                   className="px-6 py-2.5 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-all"
// //                 >
// //                   Back
// //                 </button>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </>
// //   );
// // }

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

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
// import { Phone, PhoneOff, Cookie, ShieldCheck, Settings, X, MessageSquare, Info } from 'lucide-react';

// export default function CookieConsent() {
//   const [showBanner, setShowBanner] = useState(false);
//   const [showSettings, setShowSettings] = useState(false);
//   const [preferences, setPreferences] = useState({
//     necessary: true,
//     analytics: false,
//     marketing: false,
//   });

//   // Slider motion values
//   const sliderX = useMotionValue(0);
//   const sliderWidth = 240; // Total width of the slider track
//   const handleWidth = 60;
//   const maxDrag = sliderX;

//   // Transform values for visual feedback
//   const sliderOpacity = useTransform(sliderX, [0, sliderWidth - handleWidth], [1, 0]);
//   const acceptColor = useTransform(sliderX, [0, sliderWidth - handleWidth], ['rgba(34, 197, 94, 0.4)', 'rgba(34, 197, 94, 1)']);

//   useEffect(() => {
//     const consent = localStorage.getItem('cookieConsent');
//     if (!consent) {
//       setTimeout(() => setShowBanner(true), 1500);
//     } else {
//       const savedPreferences = JSON.parse(consent);
//       setPreferences(savedPreferences);
//       enableScripts(savedPreferences);
//     }
//   }, []);

//   const enableScripts = (prefs) => {
//     if (prefs.analytics && !window.gtag) {
//       const script = document.createElement('script');
//       script.src = 'https://www.googletagmanager.com/gtag/js?id=G-F705XF08KB';
//       script.async = true;
//       document.head.appendChild(script);
//       window.dataLayer = window.dataLayer || [];
//       function gtag() { window.dataLayer.push(arguments); }
//       window.gtag = gtag;
//       gtag('js', new Date());
//       gtag('config', 'G-F705XF08KB');
//     }

//     if (prefs.marketing && !window.fbq) {
//       !function (f, b, e, v, n, t, s) {
//         if (f.fbq) return; n = f.fbq = function () {
//           n.callMethod ?
//             n.callMethod.apply(n, arguments) : n.queue.push(arguments)
//         };
//         if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
//         n.queue = []; t = b.createElement(e); t.async = !0;
//         t.src = v; s = b.getElementsByTagName(e)[0];
//         s.parentNode.insertBefore(t, s)
//       }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
//       window.fbq('init', '808365388791255');
//       window.fbq('track', 'PageView');
//     }
//   };

//   const handleAcceptAll = () => {
//     const allPreferences = { necessary: true, analytics: true, marketing: true };
//     savePreferences(allPreferences);
//   };

//   const handleDeclineAll = () => {
//     const minimalPreferences = { necessary: true, analytics: false, marketing: false };
//     savePreferences(minimalPreferences);
//   };

//   const savePreferences = (prefs) => {
//     localStorage.setItem('cookieConsent', JSON.stringify(prefs));
//     enableScripts(prefs);
//     setShowBanner(false);
//     setShowSettings(false);
//   };

//   const handlePreferenceChange = (category) => {
//     if (category === 'necessary') return;
//     setPreferences(prev => ({ ...prev, [category]: !prev[category] }));
//   };

//   const Toggle = ({ enabled, onChange, disabled }) => (
//     <button
//       onClick={onChange}
//       disabled={disabled}
//       className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${enabled ? 'bg-green-500' : 'bg-zinc-700'
//         } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
//     >
//       <motion.span
//         animate={{ x: enabled ? 22 : 2 }}
//         className="inline-block h-5 w-5 transform rounded-full bg-white transition-transform"
//       />
//     </button>
//   );

//   return (
//     <AnimatePresence>
//       {showBanner && (
//         <>
//           {/* Incoming Call Overlay */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[999] flex items-center justify-center p-6 overflow-hidden select-none"
//           >
//             {/* Background Animated Gradient / Pulse */}
//             <div className="absolute inset-0 overflow-hidden pointer-events-none">
//               <motion.div
//                 animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
//                 transition={{ duration: 4, repeat: Infinity }}
//                 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full aspect-square bg-gradient-to-tr from-green-500/20 to-transparent rounded-full blur-[120px]"
//               />
//             </div>

//             <div className="relative w-full max-w-sm flex flex-col items-center">
//               {!showSettings ? (
//                 <>
//                   {/* Top Status */}
//                   <motion.p
//                     initial={{ y: -20, opacity: 0 }}
//                     animate={{ y: 0, opacity: 1 }}
//                     className="text-green-500 text-sm font-bold tracking-[0.2em] mb-2 uppercase"
//                   >
//                     Incoming Privacy Request
//                   </motion.p>

//                   {/* Caller ID Section */}
//                   <motion.div
//                     initial={{ scale: 0.8, opacity: 0 }}
//                     animate={{ scale: 1, opacity: 1 }}
//                     className="relative mb-8"
//                   >
//                     <motion.div
//                       animate={{ scale: [1, 1.05, 1] }}
//                       transition={{ duration: 2, repeat: Infinity }}
//                       className="w-32 h-32 bg-zinc-800 rounded-full flex items-center justify-center shadow-2xl relative overflow-hidden"
//                     >
//                       <Cookie className="w-16 h-16 text-white" />
//                       {/* Gradient Ring */}
//                       <div className="absolute inset-0 border-[3px] border-green-500/30 rounded-full" />
//                     </motion.div>
//                   </motion.div>

//                   <h1 className="text-3xl font-light text-white mb-1 tracking-tight">Bureau Privacy</h1>
//                   <p className="text-zinc-500 mb-20">United States</p>

//                   {/* Actions Grid (iOS Style) */}
//                   <div className="grid grid-cols-2 gap-16 mb-24 w-full">
//                     <div className="flex flex-col items-center gap-3 group cursor-pointer" onClick={() => setShowSettings(true)}>
//                       <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center group-hover:bg-zinc-700 transition-colors">
//                         <Settings className="w-5 h-5 text-zinc-300" />
//                       </div>
//                       <span className="text-[10px] text-zinc-500 font-medium uppercase tracking-[0.1em]">Remind Me</span>
//                     </div>
//                     <Link to="/privacy-policy" className="flex flex-col items-center gap-3 group">
//                       <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center group-hover:bg-zinc-700 transition-colors">
//                         <MessageSquare className="w-5 h-5 text-zinc-300" />
//                       </div>
//                       <span className="text-[10px] text-zinc-500 font-medium uppercase tracking-[0.1em]">Message</span>
//                     </Link>
//                   </div>

//                   {/* Call Controls */}
//                   <div className="flex flex-col items-center gap-12 w-full">
//                     <div className="flex justify-between w-full px-12">
//                       {/* Decline Button */}
//                       <div className="flex flex-col items-center gap-3">
//                         <motion.button
//                           whileHover={{ scale: 1.1 }}
//                           whileTap={{ scale: 0.9 }}
//                           onClick={handleDeclineAll}
//                           className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-lg shadow-red-950/40"
//                         >
//                           <PhoneOff className="w-8 h-8 text-white fill-current" />
//                         </motion.button>
//                         <span className="text-xs text-white font-medium">Decline</span>
//                       </div>

//                       {/* Accept Button (The Swipe Trigger) */}
//                       <div className="flex flex-col items-center gap-3 relative">
//                         {/* Pulse effect under Green Button */}
//                         <div className="absolute top-0 left-0 w-20 h-20 bg-green-500 rounded-full animate-ping opacity-20" />

//                         <motion.button
//                           whileHover={{ scale: 1.1 }}
//                           whileTap={{ scale: 0.9 }}
//                           onClick={handleAcceptAll}
//                           className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-950/40 relative z-10"
//                         >
//                           <Phone className="w-8 h-8 text-white fill-current animate-wiggle" />
//                         </motion.button>
//                         <span className="text-xs text-white font-medium">Accept</span>
//                       </div>
//                     </div>

//                     {/* iOS Slide to Answer (Modern Alternate) */}
//                     <div className="relative w-72 h-20 bg-zinc-900/50 backdrop-blur rounded-full border border-white/5 p-2 overflow-hidden">
//                       <motion.div
//                         style={{ opacity: sliderOpacity }}
//                         className="absolute inset-0 flex items-center justify-center pointer-events-none"
//                       >
//                         <p className="text-zinc-500 text-sm font-medium animate-pulse ml-8">Slide to accept all</p>
//                       </motion.div>

//                       <motion.div
//                         drag="x"
//                         dragConstraints={{ left: 0, right: sliderWidth - handleWidth }}
//                         dragElastic={0}
//                         dragMomentum={false}
//                         onDragEnd={(e, info) => {
//                           if (info.offset.x > 180) {
//                             handleAcceptAll();
//                           } else {
//                             sliderX.set(0);
//                           }
//                         }}
//                         style={{ x: sliderX }}
//                         className="relative z-10 w-16 h-16 bg-white rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing shadow-xl"
//                       >
//                         <Phone className="w-6 h-6 text-green-600" />
//                       </motion.div>
//                     </div>
//                   </div>
//                 </>
//               ) : (
//                 <motion.div
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   className="w-full bg-zinc-900/80 border border-white/10 rounded-[2.5rem] p-8"
//                 >
//                   <div className="flex justify-between items-center mb-8">
//                     <div>
//                       <h3 className="text-2xl font-bold text-white tracking-tight">Choice Bureau</h3>
//                       <p className="text-zinc-500 text-sm">Configure your privacy level</p>
//                     </div>
//                     <button onClick={() => setShowSettings(false)} className="p-3 bg-zinc-800 rounded-full text-zinc-400">
//                       <X className="w-5 h-5" />
//                     </button>
//                   </div>

//                   <div className="space-y-4 mb-10">
//                     {[
//                       { id: 'necessary', label: 'Mandatory', desc: 'Required system services' },
//                       { id: 'analytics', label: 'Performance', desc: 'Quality of service metrics' },
//                       { id: 'marketing', label: 'Recommendations', desc: 'Personalized user experience' }
//                     ].map((pref) => (
//                       <div key={pref.id} className="bg-white/5 p-5 rounded-3xl flex items-center justify-between border border-white/5">
//                         <div className="flex-1">
//                           <h4 className="text-white font-semibold flex items-center gap-2">
//                             {pref.label}
//                             {pref.id === 'necessary' && <ShieldCheck className="w-3 h-3 text-green-500" />}
//                           </h4>
//                           <p className="text-zinc-500 text-xs mt-0.5">{pref.desc}</p>
//                         </div>
//                         <Toggle
//                           enabled={preferences[pref.id]}
//                           onChange={() => handlePreferenceChange(pref.id)}
//                           disabled={pref.id === 'necessary'}
//                         />
//                       </div>
//                     ))}
//                   </div>

//                   <button
//                     onClick={() => savePreferences(preferences)}
//                     className="w-full py-5 bg-green-500 text-black font-extrabold rounded-3xl transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-green-950/20"
//                   >
//                     Save & Proceed
//                   </button>
//                 </motion.div>
//               )}
//             </div>
//           </motion.div>

//           <style dangerouslySetInnerHTML={{
//             __html: `
//             @keyframes wiggle {
//               0%, 100% { transform: rotate(-10deg); }
//               50% { transform: rotate(10deg); }
//             }
//             .animate-wiggle {
//               animation: wiggle 0.5s ease-in-out infinite;
//             }
//           `}} />
//         </>
//       )}
//     </AnimatePresence>
//   );
// }
