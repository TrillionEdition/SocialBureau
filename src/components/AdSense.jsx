import React, { useEffect, useRef, useState } from "react";

export default function AdSense({
  adClient = "ca-pub-8793649344824940",
  adSlot,
  adFormat = "auto",
  fullWidthResponsive = true,
  style = { display: "block" },
  className = "",
}) {
  const adRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const checkConsent = () => {
      try {
        const stored = localStorage.getItem("cookieConsent");

        if (!stored) {
          setEnabled(false);
          return;
        }

        const consent = JSON.parse(stored);
        setEnabled(!!consent?.marketing);
      } catch (err) {
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

    try {
      if (window.adsbygoogle && adRef.current) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error("AdSense Error:", err);
    }
  }, [enabled]);

  if (!enabled) return null;

  return (
    <ins
      ref={adRef}
      className={`adsbygoogle ${className}`}
      style={style}
      data-ad-client={adClient}
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive={
        fullWidthResponsive ? "true" : "false"
      }
    />
  );
}