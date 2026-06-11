import React, { useEffect, useRef, useState } from "react";

export default function AdSense({
  adClient = "ca-pub-8793649344824940",
  adSlot,
  adFormat = "auto",
  fullWidthResponsive = true,
  adLayoutKey,
  style = { display: "block" },
  className = "",
}) {
  const adRef = useRef(null);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const checkConsent = () => {
      try {
        const stored = localStorage.getItem("cookieConsent");

        if (!stored) {
          setEnabled(false);
          return;
        }

        const consent = JSON.parse(stored);
        const marketing = !!consent?.marketing;
        console.debug('AdSense: marketing consent', marketing);
        setEnabled(marketing);
      } catch (err) {
        console.debug('AdSense: error reading consent', err);
        setEnabled(false);
      }
    };

    checkConsent();

    window.addEventListener("cookieConsentChanged", checkConsent);
    window.addEventListener("storage", checkConsent);

    return () => {
      window.removeEventListener("cookieConsentChanged", checkConsent);
      window.removeEventListener("storage", checkConsent);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    if (typeof window === 'undefined') return;

    const el = adRef.current;
    if (!el) return;

    try {
      // Track initialized slots globally to avoid double-init (React Strict Mode)
      if (!window.__adsInitializedSlots) window.__adsInitializedSlots = new Set();
      const slotKey = `${adClient}:${adSlot}`;

      if (window.__adsInitializedSlots.has(slotKey)) {
        console.debug(`AdSense: slot ${adSlot} already initialized`);
        return;
      }

      if (window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        window.__adsInitializedSlots.add(slotKey);
        console.debug(`AdSense: initialized slot ${adSlot}`);
      } else {
        console.debug('AdSense: window.adsbygoogle not found');
      }
    } catch (err) {
      console.error("AdSense Error:", err);
    }
  }, [enabled]);


  return (
    <ins
      ref={adRef}
      className={`adsbygoogle ${className}`}
      style={style}
      data-ad-client={adClient}
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive={fullWidthResponsive ? "true" : "false"}
      {...(adLayoutKey ? { 'data-ad-layout-key': adLayoutKey } : {})}
      aria-hidden="true"
    ></ins>
  );
}