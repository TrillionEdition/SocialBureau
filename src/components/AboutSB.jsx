import React, { useEffect, useRef } from "react";
import { AboutHeading } from "./AboutHeading";

function randBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const AboutSB = () => {
  const text =
  "At SocialBureau, we don’t just build marketing campaigns, we architect high-performance ecosystems. Operating under the strategic umbrella of Trillion Edition, we fuse analytical muscle with cultural nuance to drive real outcomes for niche, high-growth brands.";

  const words = text.match(/[\w’'-]+|[.,—]/g);

  const refs = useRef([]);

  useEffect(() => {
    refs.current.forEach((span, i) => {
      if (span) {
        const x = randBetween(-150, 150);
        const y = randBetween(-80, 80);
        span.style.transform = `translate(${x}px, ${y}px) scale(0.7)`;
        span.style.opacity = 0;

        setTimeout(() => {
          span.style.transition =
            "transform 0.8s cubic-bezier(.5,1.6,.3,1), opacity 0.8s";
          span.style.transform = "translate(0, 0) scale(1)";
          span.style.opacity = 1;
        }, 400 + i * 40);
      }
    });
  }, []);

  return (
    <div
  style={{
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    width: "100vw",
    overflow: "hidden",
    color: "#fff",
    zIndex: 3,
  }}
>

      {/* Background Pattern Layer */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          backgroundImage:
            "radial-gradient(circle at 75% 0%, rgba(56, 5, 5, 0.7) 0%, transparent 50%)",
        }}
      />

      {/* Floating Circles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="float-circle" style={circleStyle("#ff0000", 20, "10%", "10%", 0.3)} />
        <div className="float-circle" style={circleStyle("#ff0000", 16, "25%", "80%", 0.3, "1s")} />
        <div className="float-circle" style={circleStyle("#ff0000", 24, "80%", "25%", 0.3, "2s")} />
        <div className="float-circle" style={circleStyle("#ff0000", 12, "90%", "90%", 0.3, "0.5s")} />
      </div>

      {/* Spinning Shapes */}
      <div
        className="spin-shape"
        style={spinStyle("#ff0000", 50, 6, "33%", "20%", 0.2)}
      />
      <div
        className="spin-shape"
        style={spinStyle("#ff0000", 24, 2, "67%", "67%", 0.15, "2s")}
      />


      {/* Foreground Content */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <AboutHeading />
        <style>{`
          .aboutsb-responsive-p {
            font-size: 25px;
            border-radius: 1.5rem;
            margin: 0 auto;
            padding: 3vw;
            width: 70vw;
            color: #fff;
            z-index: 3;
            text-align: center;
            line-height: 1.4;
            backdrop-filter: blur(16px) saturate(160%);
            -webkit-backdrop-filter: blur(16px) saturate(160%);
            box-shadow: 0 6px 32px 0 rgba(40,0,0,0.12);
          }
          .float-circle {
            position: absolute;
            border-radius: 9999px;
            animation: float 3s ease-in-out infinite;
          }
          .spin-shape {
            position: absolute;
            border-style: solid;
            animation: spin-slow 8s linear infinite;
          }
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @media (max-width: 900px) {
            .aboutsb-responsive-p {
              padding: 40px 16px;
              font-size: 1.28rem;
              width: 70vw;
            }
          }
          @media (max-width: 600px) {
  .aboutsb-responsive-p {
    font-size: 1.3rem;
    padding: 16px;
    word-break: break-word;
    width: 90vw;
    margin-top: 0;
    box-sizing: initial;
  }
}

@media (max-width: 400px) {
  .aboutsb-responsive-p {
    font-size: 20px;
    width: 90vw;
    margin-top: 0;
    box-sizing: initial;
  }
}

        `}</style>
        <p className="aboutsb-responsive-p text-center hover:scale-110 transition-transform duration-300">
          {words.map((word, idx) => {
  const isSocialBureau = word === "SocialBureau";
  return (
    <span
      key={idx}
      ref={(el) => (refs.current[idx] = el)}
      style={{
        display: "inline-block",
        whiteSpace: word.match(/[.,—]/) ? "normal" : "pre",
        marginRight: word.match(/[.,—]/) ? 0 : 6,
        marginLeft: word.match(/[.,—]/) ? 0 : 0,
        opacity: 0,
        transform: "none",
      }}
    >
      {isSocialBureau ? (
        <span style={{ fontFamily: "MyFont, sans-serif" }}>
          Social<span className="text-[#ff0000]">B</span>ureau
        </span>
      ) : (
        word
      )}
      {word.match(/[.,—]/) ? "\u00A0" : " "}
    </span>
  );
})}

        </p>
      </div>
    </div>
  );
};

// Helper to style floating circles
function circleStyle(color, size, top, left, opacity, delay = "0s") {
  return {
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor: color,
    top: top,
    left: left,
    opacity: opacity,
    animationDelay: delay,
  };
}

// Helper to style spinning shapes
function spinStyle(color, size, border, top, left, opacity, delay = "0s") {
  return {
    width: `${size}px`,
    height: `${size}px`,
    borderWidth: `${border}px`,
    borderColor: color,
    top: top,
    left: left,
    opacity: opacity,
    animationDelay: delay,
  };
}
