import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import MetaTags from '../components/MetaTags';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import servicesData from '../data/services';
import { Link } from 'react-router-dom';
import HomeMouse from '../components/HomeMouse';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

// Interactive Background Component
const InteractiveBackground = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const wavesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const gridRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Initialize grid points
    const initGrid = () => {
      gridRef.current = [];
      const spacing = 80;
      for (let x = 0; x < canvas.width + spacing; x += spacing) {
        for (let y = 0; y < canvas.height + spacing; y += spacing) {
          gridRef.current.push({
            originalX: x,
            originalY: y,
            x: x,
            y: y,
            offset: Math.random() * Math.PI * 2,
            amplitude: Math.random() * 20 + 10
          });
        }
      }
    };
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initGrid();
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize waves
    const initWaves = () => {
      wavesRef.current = [];
      for (let i = 0; i < 5; i++) {
        wavesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: 0,
          maxRadius: Math.random() * 200 + 100,
          speed: Math.random() * 2 + 1,
          opacity: Math.random() * 0.3 + 0.1,
          frequency: Math.random() * 0.02 + 0.01,
          phase: Math.random() * Math.PI * 2
        });
      }
    };

    initWaves();
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      
      // Create ripple effect at mouse position
      
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      // Clear canvas with dark gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#000000');
      gradient.addColorStop(0.3, '#1a0000');
      gradient.addColorStop(0.7, '#0d0000');
      gradient.addColorStop(1, '#000000');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const time = Date.now() * 0.001;

      // Animate and draw grid with distortion
      ctx.strokeStyle = 'rgba(139, 0, 0, 0.1)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      
      gridRef.current.forEach(point => {
        // Apply wave distortion
        let distortionX = 0;
        let distortionY = 0;
        
        wavesRef.current.forEach(wave => {
          const dx = point.originalX - wave.x;
          const dy = point.originalY - wave.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < wave.radius) {
            const influence = (wave.radius - distance) / wave.radius;
            const waveStrength = Math.sin(distance * wave.frequency - time * 2) * influence * wave.opacity * 30;
            distortionX += (dx / distance) * waveStrength;
            distortionY += (dy / distance) * waveStrength;
          }
        });

        // Mouse influence
        const mouseDx = mouseRef.current.x - point.originalX;
        const mouseDy = mouseRef.current.y - point.originalY;
        const mouseDistance = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);
        
        if (mouseDistance < 150) {
          const mouseInfluence = (150 - mouseDistance) / 150;
          distortionX += mouseDx * mouseInfluence * 0.1;
          distortionY += mouseDy * mouseInfluence * 0.1;
        }

        point.x = point.originalX + distortionX + Math.sin(time + point.offset) * 5;
        point.y = point.originalY + distortionY + Math.cos(time * 1.1 + point.offset) * 5;
      });

      // Draw grid lines
      const spacing = 80;
      for (let i = 0; i < gridRef.current.length; i++) {
        const point = gridRef.current[i];
        const gridX = Math.floor(point.originalX / spacing);
        const gridY = Math.floor(point.originalY / spacing);
        
        // Horizontal lines
        const rightNeighbor = gridRef.current.find(p => 
          Math.floor(p.originalX / spacing) === gridX + 1 && 
          Math.floor(p.originalY / spacing) === gridY
        );
        if (rightNeighbor) {
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(rightNeighbor.x, rightNeighbor.y);
        }
        
        // Vertical lines
        const bottomNeighbor = gridRef.current.find(p => 
          Math.floor(p.originalX / spacing) === gridX && 
          Math.floor(p.originalY / spacing) === gridY + 1
        );
        if (bottomNeighbor) {
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(bottomNeighbor.x, bottomNeighbor.y);
        }
      }
      ctx.stroke();

      
      // Add floating hexagons
      for (let i = 0; i < 4; i++) {
        const x = canvas.width * (0.2 + i * 0.2) + Math.sin(time * 0.5 + i) * 50;
        const y = canvas.height * 0.3 + Math.cos(time * 0.3 + i * 0.7) * 100;
        const size = 25 + Math.sin(time * 0.4 + i) * 8;
        
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(time * 0.2 + i);
        
        // Draw hexagon
        ctx.beginPath();
        for (let j = 0; j < 6; j++) {
          const angle = (j * Math.PI) / 3;
          const px = Math.cos(angle) * size;
          const py = Math.sin(angle) * size;
          if (j === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.strokeStyle = `rgba(139, 0, 0, 0.15)`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();
      }

      // Add scanning lines effect
      const scanY = (time * 100) % (canvas.height + 200) - 100;
      const gradient2 = ctx.createLinearGradient(0, scanY - 50, 0, scanY + 50);
      gradient2.addColorStop(0, 'rgba(255, 0, 0, 0)');
      gradient2.addColorStop(0.5, 'rgba(255, 0, 0, 0.1)');
      gradient2.addColorStop(1, 'rgba(255, 0, 0, 0)');
      ctx.fillStyle = gradient2;
      ctx.fillRect(0, scanY - 50, canvas.width, 100);

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
};

const Service1 = () => {
  const { serviceTitle } = useParams();
  const decodedTitle = decodeURIComponent(serviceTitle);
  const data = servicesData[decodedTitle];

  if (!data) {
    return (
      <div className="relative min-h-screen">
        <InteractiveBackground />
        <div className="relative z-10 text-white min-h-screen flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
          <p className="text-lg text-gray-400">Please check the URL or select a valid service.</p>
        </div>
      </div>
    );
  }

  const { meta, hero, problems, deliveries, whyItWorks, cta } = data;
  const serviceTitles = Object.keys(servicesData);
  const currentIndex = serviceTitles.indexOf(decodedTitle);

  const prevService = currentIndex > 0 ? serviceTitles[currentIndex - 1] : null;
  const nextService = currentIndex < serviceTitles.length - 1 ? serviceTitles[currentIndex + 1] : null;

  return (
    <div className="relative min-h-screen">
      <InteractiveBackground />
      {/* <HomeMouse/> */}
      <div className="relative z-10">
        <Navbar />
        <MetaTags title={meta.title} description={meta.description} />

        {/* Hero Section */}
        <div className="flex flex-col justify-center items-center text-center py-20 px-10">
          <h1 style={{ fontFamily: "Playfair Display, serif" }} className="text-4xl md:text-6xl font-black text-white mb-4 lg:px-70 lg:pt-20">
            {hero.headline.split(hero.highlight).map((part, i, arr) => (
              <React.Fragment key={i}>
                {part}
                {i < arr.length - 1 && (
                  <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#ff0000]">{hero.highlight}</span>
                )}
              </React.Fragment>
            ))}
          </h1>
          <div className="flex items-center justify-center mb-2 py-2">
            <span className="block w-10 h-0.5 bg-[#ff0000]" />
          </div>
          <p className="max-w-4xl text-base sm:text-xl text-neutral-300 font-medium">{hero.subtext}</p>
        </div>

        {/* Problems Section */}
        <section className="text-white py-20 px-6 backdrop-blur-sm bg-black/20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
            {problems.title} <span className="text-[#ff0000]">{problems.highlight}</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto text-center">
            {problems.items.map((problem, idx) => (
              <div key={idx} className="border border-zinc-700/50 backdrop-blur-sm bg-black/30 rounded-xl p-6 hover:shadow-lg hover:scale-[1.03] transition-all duration-300 ease-in-out hover:border-[#ff0000]">
                <div className="flex justify-center items-center mb-4 text-[#ff0000] text-3xl">
                  {problem.icon}
                </div>
                <h3 className="text-lg font-semibold">{problem.title}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Deliveries Section */}
        <section className="text-white py-20 px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
            {deliveries.title} <span className="text-[#ff0000]">{deliveries.highlight}</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {deliveries.items.map((item, idx) => (
              <div key={idx} className="group flex items-start gap-4 hover:bg-black/60 backdrop-blur-sm bg-black/20 backdrop-blur-sm p-4 transition-all duration-300 rounded-lg hover:shadow-lg">
                <div className="bg-[#ff0000] p-2 rounded-md group-hover:scale-110 transition-transform">{item.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold mb-1 group-hover:text-[#ff0000]">{item.title}</h3>
                  <p className="text-md text-gray-400 group-hover:text-gray-300">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why It Works */}
        <section className="text-white py-16 px-6 text-center backdrop-blur-sm bg-black/20">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {whyItWorks.title} <span className="text-[#ff0000]">{whyItWorks.highlight}</span>
          </h2>
          <p className="text-xl lg:text-2xl font-light text-gray-300 max-w-2xl mx-auto">{whyItWorks.subtext}</p>
        </section>

        {/* CTA */}
        <div className="flex flex-col md:flex-row items-center justify-between py-20 md:py-10 rounded-lg px-10 md:px-12 lg:px-40 gap-4 mt-4 backdrop-blur-sm bg-black/30">
          <h2 className="text-xl md:text-2xl font-semibold text-white text-center md:text-left">{cta.headline}</h2>
          <button onClick={() => window.open(cta.link, "_blank")} className="bg-[#ff0000] text-white px-4 py-2 rounded-md hover:bg-[#cc0000] hover:scale-105 transition-all duration-200 flex items-center">
            <img src="/assets/phone.webp" alt="phone" className="h-5 md:h-6 mr-2" />
            <span>{cta.button}</span>
          </button>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center py-10 px-6 max-w-6xl mx-auto text-white">
          {prevService ? (
            <Link
              to={`/services/${encodeURIComponent(prevService)}`}
              className="text-[#ff0000] border-3 border-[#ff0000]/30 hover:scale-110 hover:border-[#ff0000] transition-all duration-200 px-5 py-3 rounded-md text-sm md:text-base backdrop-blur-sm bg-black/20"
            >
              <FaArrowLeft className="text-sm text-[#ff0000]" />
            </Link>
          ) : <div />}

          {nextService ? (
            <Link
              to={`/services/${encodeURIComponent(nextService)}`}
              className="hover:scale-110 transition-all duration-200 px-5 py-3 rounded-md text-sm md:text-base text-[#ff0000] border-3 border-[#ff0000]/30 hover:border-[#ff0000] backdrop-blur-sm bg-black/20"
            >
              <FaArrowRight className="text-sm text-[#ff0000]" />
            </Link>
          ) : <div />}
        </div>

        <Footer/>
      </div>
    </div>
  );
};

export default Service1;