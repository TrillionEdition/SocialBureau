import React, { useEffect, useState } from 'react';
import AdSense from './AdSense';

function readMarketingConsent() {
  try {
    const stored = localStorage.getItem('cookieConsent');
    if (!stored) return false;
    const consent = JSON.parse(stored);
    return !!consent?.marketing;
  } catch (e) {
    console.debug('AdsContainer: error reading consent', e);
    return false;
  }
}

export default function AdsContainer() {
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const update = () => {
      const m = readMarketingConsent();
      console.debug('AdsContainer: marketing consent', m);
      setMarketing(m);
    };

    update();

    window.addEventListener('cookieConsentChanged', update);
    window.addEventListener('storage', update);

    return () => {
      window.removeEventListener('cookieConsentChanged', update);
      window.removeEventListener('storage', update);
    };
  }, []);

  if (!marketing) {
    console.debug('AdsContainer: ads disabled due to consent');
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 flex flex-col gap-6 items-center">
      {/* Reserve reasonable heights to reduce CLS */}
      <div style={{ width: '100%', minHeight: 120 }}>
        <AdSense adSlot="4259346182" adFormat="fluid" adLayoutKey="-f9+60+3n-de+ap" style={{ display: 'block', width: '100%', minHeight: 120 }} />
      </div>

      <div style={{ width: '100%', minHeight: 120 }}>
        <AdSense adSlot="4058030624" adFormat="autorelaxed" style={{ display: 'block', width: '100%', minHeight: 120 }} />
      </div>
    </div>
  );
}
