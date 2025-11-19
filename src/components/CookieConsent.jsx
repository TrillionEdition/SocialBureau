import React, { useState, useEffect } from 'react';
import { FaCookie } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true, can't be disabled
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Show banner after a brief delay for better UX
      setTimeout(() => setShowBanner(true), 1000);
    } else {
      // Load existing preferences and enable scripts
      const savedPreferences = JSON.parse(consent);
      setPreferences(savedPreferences);
      enableScripts(savedPreferences);
    }
  }, []);

  const enableScripts = (prefs) => {
    // Enable Google Analytics if analytics cookies accepted
    if (prefs.analytics && !window.gtag) {
      const script = document.createElement('script');
      script.src = 'https://www.googletagmanager.com/gtag/js?id=G-F705XF08KB';
      script.async = true;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      function gtag() { window.dataLayer.push(arguments); }
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', 'G-F705XF08KB');
    }

    // Enable Facebook Pixel if marketing cookies accepted
    if (prefs.marketing && !window.fbq) {
      !function(f,b,e,v,n,t,s) {
        if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)
      }(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
      window.fbq('init', '808365388791255');
      window.fbq('track', 'PageView');
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

  const handleSavePreferences = () => {
    savePreferences(preferences);
  };

  const savePreferences = (prefs) => {
    localStorage.setItem('cookieConsent', JSON.stringify(prefs));
    enableScripts(prefs);
    setShowBanner(false);
    setShowSettings(false);
  };

  const handlePreferenceChange = (category) => {
    if (category === 'necessary') return; // Can't disable necessary cookies
    setPreferences(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  if (!showBanner) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40" onClick={() => !showSettings && setShowBanner(false)} />
      
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-black via-gray-900 to-red-950 border border-red-900/50 rounded-2xl shadow-2xl overflow-hidden">
          {!showSettings ? (
            // Main Banner
            <div className="p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                    We Value Your Privacy
                  </h3>
                  <p className="text-gray-300 text-sm md:text-base mb-4">
                    SocialBureau uses cookies to enhance your browsing experience, analyze site traffic, 
                    and deliver personalized content. By clicking "Accept All", you consent to our use of cookies.
                  </p>
                  <p className="text-gray-400 text-xs mb-4">
                    You can customize your preferences or learn more in our{' '}
                    <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-red-400 underline">
                      Privacy Policy
                    </Link>.
                  </p>
                  
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={handleAcceptAll}
                      className="px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-lg transition-all shadow-lg"
                    >
                      Accept All
                    </button>
                    <button
                      onClick={handleDeclineAll}
                      className="px-6 py-2.5 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-all"
                    >
                      Decline All
                    </button>
                    <button
                      onClick={() => setShowSettings(true)}
                      className="px-6 py-2.5 bg-transparent border border-gray-600 hover:border-red-600 text-gray-300 hover:text-white font-semibold rounded-lg transition-all"
                    >
                      Customize
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Settings Panel
            <div className="p-6 md:p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Cookie Preferences</h3>
              <p className="text-gray-300 text-sm mb-6">
                Choose which types of cookies you want to allow. You can change these settings at any time.
              </p>

              <div className="space-y-4 mb-6">
                {/* Necessary Cookies */}
                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <h4 className="text-lg font-semibold text-white">Strictly Necessary</h4>
                    </div>
                    <div className="px-3 py-1 bg-gray-700 rounded-full text-xs text-gray-300">
                      Always Active
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 ml-11">
                    Essential cookies for the website to function properly. These cannot be disabled.
                  </p>
                </div>

                {/* Analytics Cookies */}
                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <h4 className="text-lg font-semibold text-white">Analytics & Performance</h4>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.analytics}
                        onChange={() => handlePreferenceChange('analytics')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-red-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                    </label>
                  </div>
                  <p className="text-sm text-gray-400 ml-11">
                    Help us understand how visitors use our website (Google Analytics).
                  </p>
                </div>

                {/* Marketing Cookies */}
                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <h4 className="text-lg font-semibold text-white">Marketing & Advertising</h4>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.marketing}
                        onChange={() => handlePreferenceChange('marketing')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-red-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                    </label>
                  </div>
                  <p className="text-sm text-gray-400 ml-11">
                    Used to deliver personalized ads and track campaign performance (Facebook Pixel).
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleSavePreferences}
                  className="px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-lg transition-all shadow-lg"
                >
                  Save Preferences
                </button>
                <button
                  onClick={() => setShowSettings(false)}
                  className="px-6 py-2.5 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-all"
                >
                  Back
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
