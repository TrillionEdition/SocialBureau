// src/components/TreasureHuntTimer.jsx
import React, { useState, useEffect, useRef } from "react";
import { getTreasureHuntStep, getTreasureHuntStartTime, resetTreasureHunt, CLUES } from "../utils/treasureHunt";
import { toast } from "react-toastify";
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
      
      // Try to read locked final time
      const lockedTime = localStorage.getItem('treasure_hunt_final_time');
      if (lockedTime) {
        // Since elapsed state is displayed as formatted time, we can parse it or store raw seconds.
        // But since we want it as seconds for formatTime, let's convert the MM:SS or HH:MM:SS back to seconds!
        const parts = lockedTime.split(":").map(Number);
        let seconds = 0;
        if (parts.length === 3) {
          seconds = parts[0] * 3600 + parts[1] * 60 + parts[2];
        } else if (parts.length === 2) {
          seconds = parts[0] * 60 + parts[1];
        }
        setElapsed(seconds);
      } else {
        const secondsElapsed = Math.floor((Date.now() - startTime) / 1000);
        setElapsed(secondsElapsed);
      }

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // Hunt is in progress
    const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
    if (elapsedSeconds >= 1800) {
      resetTreasureHunt();
      toast.warning("Treasure Hunt reset: 30-minute time limit exceeded.", {
        toastId: "treasure_hunt_timeout_reset"
      });
      return;
    }

    setIsActive(true);
    setIsComplete(false);
    setElapsed(elapsedSeconds);

    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        const st = getTreasureHuntStartTime();
        if (st) {
          const el = Math.floor((Date.now() - st) / 1000);
          if (el >= 1800) {
            resetTreasureHunt();
            toast.warning("Treasure Hunt reset: 30-minute time limit exceeded.", {
              toastId: "treasure_hunt_timeout_reset"
            });
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
          } else {
            setElapsed(el);
          }
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

  const isClaimed = localStorage.getItem('treasure_hunt_claimed') === 'true';

  // Don't render if hunt hasn't started or claimed
  if (isClaimed || (!isActive && !isComplete)) return null;
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
