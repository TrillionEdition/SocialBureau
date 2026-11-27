import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, X } from "lucide-react";
import { BUDDY_ACTIONS, BUDDY_ASSETS, BUDDY_MESSAGES } from "./BuddyConfig";
import { BuddyTriggerManager } from "./BuddyTriggerManager";
import "./bureauBuddy.css";

function BuddyImage({ pose }) {
  const [attempt, setAttempt] = useState(0);
  const primary = BUDDY_ASSETS[pose] || BUDDY_ASSETS.default;
  const src = attempt === 0 ? primary : BUDDY_ASSETS.default;

  if (attempt === 2) return <MessageCircle className="bureau-buddy__fallback" aria-hidden="true" />;
  return (
    <img
      className="bureau-buddy__image"
      src={src}
      alt=""
      width="248"
      height="223"
      onError={() => {
        console.warn(`Bureau Buddy image is unavailable: ${src}`);
        setAttempt(attempt === 0 && primary !== BUDDY_ASSETS.default ? 1 : 2);
      }}
    />
  );
}

function BuddyActions({ actions, onAction }) {
  return (
    <div className="bureau-buddy__actions">
      {actions.map((action) => {
        const { label, to, href } = BUDDY_ACTIONS[action];
        return href ? (
          <a key={action} href={href} target="_blank" rel="noopener noreferrer" onClick={onAction}>{label}</a>
        ) : (
          <Link key={action} to={to} onClick={onAction}>{label}</Link>
        );
      })}
    </div>
  );
}

export default function BureauBuddy() {
  const [view, setView] = useState(null);
  const [manager] = useState(() => new BuddyTriggerManager(setView));

  useEffect(() => {
    manager.start();
    return () => manager.stop();
  }, [manager]);

  const dismiss = () => {
    manager.dismiss();
    setView(null);
  };
  const message = BUDDY_MESSAGES[view || "menu"];
  const pose = view ? message.pose : "default";
  return (
    <aside className={`bureau-buddy ${view ? "bureau-buddy--open" : ""}`} aria-label="Bureau Buddy">
      {view && (
        <div className="bureau-buddy__bubble" id="bureau-buddy-panel" aria-live="polite">
          <button type="button" className="bureau-buddy__close" onClick={dismiss} aria-label="Dismiss Bureau Buddy message"><X size={17} /></button>
          <span className="bureau-buddy__eyebrow">Bureau Buddy</span>
          <p>{message.text}</p>
          <BuddyActions actions={message.actions} onAction={dismiss} />
        </div>
      )}
      <button
        type="button"
        className="bureau-buddy__launcher"
        aria-label={view ? "Minimize Bureau Buddy" : "Open Bureau Buddy"}
        aria-expanded={Boolean(view)}
        aria-controls={view ? "bureau-buddy-panel" : undefined}
        onClick={() => view ? dismiss() : manager.open()}
      >
        <BuddyImage key={pose} pose={pose} />
      </button>
    </aside>
  );
}
