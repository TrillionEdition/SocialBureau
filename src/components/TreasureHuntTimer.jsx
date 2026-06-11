// src/components/TreasureHuntTimer.jsx
import React, { useState, useEffect, useRef } from "react";
import { getTreasureHuntStep, getTreasureHuntStartTime, CLUES } from "../utils/treasureHunt";
import "./TreasureHuntTimer.css";

const formatTime = (totalSeconds) => {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, "0");
  if (h > 0) return `${pad(h)}:${pad(m)}:${pad(s)}`;
  return `${pad(m)}:${pad(s)}`;
};

export const TreasureHuntTimer = () => {
  const [elapsed, setElapsed] = useState(null); // null = not yet ticking
  const [isActive, setIsActive] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef(null);

  const syncState = () => {
    const step = getTreasureHuntStep();
    const startTime = getTreasureHuntStartTime();

    // Hunt hasn't started yet
    if (!startTime || step === 0) {
      setIsActive(false);
      setIsComplete(false);
      setElapsed(null);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // Hunt is complete
    if (step > CLUES.length) {
      setIsComplete(true);
      setIsActive(false);
      // Freeze timer at completion time
      const secondsElapsed = Math.floor((Date.now() - startTime) / 1000);
      setElapsed(secondsElapsed);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // Hunt is in progress
    setIsActive(true);
    setIsComplete(false);
    setElapsed(Math.floor((Date.now() - startTime) / 1000));

    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        const st = getTreasureHuntStartTime();
        if (st) {
          setElapsed(Math.floor((Date.now() - st) / 1000));
        }
      }, 1000);
    }
  };

  useEffect(() => {
    syncState();

    const handleUpdate = () => syncState();
    window.addEventListener("treasure_hunt_update", handleUpdate);
    return () => {
      window.removeEventListener("treasure_hunt_update", handleUpdate);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Don't render if hunt hasn't started
  if (!isActive && !isComplete) return null;
  if (elapsed === null) return null;

  return (
    <div className={`treasure-hunt-timer ${isComplete ? "timer-complete" : ""}`}>
      <div className="timer-icon">
        {isComplete ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        )}
      </div>
      <div className="timer-content">
        <span className="timer-label">{isComplete ? "COMPLETED IN" : "HUNT TIME"}</span>
        <span className="timer-value">{formatTime(elapsed)}</span>
      </div>
      {!isComplete && <div className="timer-pulse" />}
    </div>
  );
};

export default TreasureHuntTimer;
