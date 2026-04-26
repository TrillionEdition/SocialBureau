import React from 'react';

const Letter = ({ data, time, mouse }) => {
  // Current angle based on initial angle and rotation speed
  const angle = data.initialAngle + time * data.rotationSpeed;
  
  // Oscillating radius
  const currentRadius = 
    150 + 
    data.radiusOffset + 
    Math.sin(time * data.oscillationSpeed + data.phase) * data.oscillationAmplitude;

  // Polar to Cartesian conversion
  const xBase = Math.cos(angle) * currentRadius;
  const yBase = Math.sin(angle) * currentRadius;

  // Mouse Interaction
  const dx = xBase - (mouse.x - window.innerWidth / 2);
  const dy = yBase - (mouse.y - window.innerHeight / 2);
  const distance = Math.sqrt(dx * dx + dy * dy);
  const maxDist = 200;
  
  let x = xBase;
  let y = yBase;
  let scale = 1;
  let blur = 0;

  if (distance < maxDist) {
    const force = (maxDist - distance) / maxDist;
    x += dx * force * 0.5;
    y += dy * force * 0.5;
    scale = 1 + force * 0.5;
    blur = force * 2;
  }

  // Individual character rotation
  const charRotation = angle * (180 / Math.PI) + 90;

  return (
    <div
      className="absolute text-red-600 font-bold pointer-events-none select-none transition-opacity duration-500"
      style={{
        transform: `translate(${x}px, ${y}px) rotate(${charRotation}deg) scale(${scale})`,
        left: '50%',
        top: '50%',
        fontSize: '14px',
        opacity: 0.8 - blur * 0.2,
        filter: `blur(${blur}px)`,
      }}
    >
      {data.char}
    </div>
  );
};

export default Letter;

