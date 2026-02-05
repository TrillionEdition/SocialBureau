import React from 'react';

export const GrainOverlay = () => {
  return (
    <>
      {/* Animated Film Grain */}
      <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.03] mix-blend-overlay">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <filter id="noiseFilter">
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="0.65" 
              numOctaves="3" 
              stitchTiles="stitch" 
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>
      
      {/* Vignette */}
      <div 
        className="pointer-events-none fixed inset-0 z-40"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(5,5,5,0.4) 70%, rgba(5,5,5,0.8) 100%)'
        }}
      />
    </>
  );
};
