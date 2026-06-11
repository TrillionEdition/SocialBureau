import React from 'react';
import AdSense from './AdSense';

export default function AdsContainer() {
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
