import React, { useEffect, useState } from "react";

const animatedText = " but always on purpose";

export const AboutTagline = () => {
  const [displayed, setDisplayed] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let timeoutId;
    let interval;
    if (index < animatedText.length) {
      interval = setInterval(() => {
        setDisplayed(animatedText.slice(0, index + 1));
        setIndex(index + 1);
      }, 80);
    } else {
      timeoutId = setTimeout(() => {
        setDisplayed("");
        setIndex(0);
      }, 800);
    }
    return () => {
      clearInterval(interval);
      clearTimeout(timeoutId);
    };
  }, [index]);

  return (
    <div
      style={{
        width: "100%",
        margin: "0 auto",
        padding: "3vw",
        borderRadius: 16,
        boxShadow: "0 4px 32px rgba(0,0,0,0.07)",
        textAlign:"center",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <p className="about-text">
        We obsess over one thing:{" "}
        <span className="highlight">RESULTS</span>.
        <br className="about-break" />
        Whether it’s cutting CAC,
        unlocking new audiences, or compounding LTV—we move fast,{" "}
        <span
          className="animated-text"
        >
          {displayed}
          <span className="cursor">&nbsp;</span>
        </span>
      </p>

      <style>
        {`
        @keyframes blink {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        .about-text {
          font-size: 15px;
          line-height: 1.6;
          color: #fff;
          margin: 0;
          max-width: 100%;
        }
        .highlight {
          color: #ff0000;
          font-weight: 500;
        }
        .animated-text {
          display: inline-block;
          min-height: 1em;
          font-family: monospace;
          font-weight: 600;
          letter-spacing: 1px;
          color: #ff0000;
          margin-left: 4px;
        }
        .cursor {
          display: inline-block;
          width: 1ch;
          background: #ff0000;
          opacity: 0.4;
          margin-left: 2px;
          animation: blink 1s steps(1) infinite;
        }
        /* Medium screens */
        @media (min-width: 600px) {
          .about-text {
            font-size: 22px;
            max-width: 80%;
            margin: 0 auto;
          }
        }
        /* Large screens */
        @media (min-width: 1000px) {
          .about-text {
            font-size: 25px;
            max-width: 80%;
          }
        }
        /* Small screens */
        @media (max-width: 400px) {
        padding-left:50px;
        padding-right:50px;
          .about-text {
            font-size: 20px;
          }
        }
        `}
      </style>
    </div>
  );
};
