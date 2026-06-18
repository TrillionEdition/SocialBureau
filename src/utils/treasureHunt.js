// src/utils/treasureHunt.js

export const CLUES = [
  {
    index: 1,
    title: "Hint 1",
    clueText: "Before the treasure, understand the treasure hunters, discover where it began.",
    targetPage: "/about"
  },
  {
    index: 2,
    title: "Hint 2",
    clueText: "Every success has a team behind it. Meet ours.",
    targetPage: "/team"
  },
  {
    index: 3,
    title: "Hint 3",
    clueText: "Head to our Partnership page. Seek the partner whose name begins with the letters 'R' and ends with 'T' to uncover the next hint." ,
    targetPage: "/partnership/Ranjit"
  },
  {
    index: 4,
    title: "Hint 4",
    clueText:  "The next piece of the puzzle may be hiding among our latest thoughts.",
    targetPage: "/blog"
  },
  {
    index: 5,
    title: "Hint 5",
    clueText: "Every digital treasure needs a gateway. Explore our API solutions to continue.",
    targetPage: "/api-marketing-agency-in-kochi"
  },
  {
    index: 6,
    title: "Hint 6",
    clueText: "Need a helping hand? Your next clue is waiting there.",
    targetPage: "/contact"
  },
  {
    index: 7,
    title: "Hint 7",
    clueText: "Great content tells great stories. One of them holds your next clue." ,
    targetPage: "/content-marketing-agency-in-kochi"
  },
  {
    index: 8,
    title: "Hint 8",
    clueText: "Not all treasures are discovered—some are developed.",
    targetPage: "/web-development-agency-in-kochi"
  }
];

export const getTreasureHuntStep = () => {
  return parseInt(localStorage.getItem('treasure_hunt_step') || '0', 10);
};

export const setTreasureHuntStep = (step) => {
  localStorage.setItem('treasure_hunt_step', step.toString());
  if (step > CLUES.length) {
    // Lock in the final completion time!
    const startTime = getTreasureHuntStartTime();
    if (startTime) {
      const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
      const h = Math.floor(elapsedSeconds / 3600);
      const m = Math.floor((elapsedSeconds % 3600) / 60);
      const s = elapsedSeconds % 60;
      const pad = (n) => String(n).padStart(2, "0");
      const formatted = h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
      localStorage.setItem('treasure_hunt_final_time', formatted);
    }
  }
  window.dispatchEvent(new Event('treasure_hunt_update'));
};

export const startTreasureHunt = () => {
  localStorage.setItem('treasure_hunt_step', '1');
  window.dispatchEvent(new Event('treasure_hunt_update'));
};

// --- Timer Utilities ---

export const startTreasureHuntTimer = () => {
  // Only start a new timer if one isn't already running
  if (!localStorage.getItem('treasure_hunt_start_time')) {
    localStorage.setItem('treasure_hunt_start_time', Date.now().toString());
    localStorage.setItem('treasure_hunt_last_active_time', Date.now().toString());
    window.dispatchEvent(new Event('treasure_hunt_update'));
  }
};

export const getTreasureHuntStartTime = () => {
  const stored = localStorage.getItem('treasure_hunt_start_time');
  return stored ? parseInt(stored, 10) : null;
};

export const resetTreasureHunt = () => {
  localStorage.removeItem('treasure_hunt_step');
  localStorage.removeItem('treasure_hunt_start_time');
  localStorage.removeItem('treasure_hunt_final_time');
  localStorage.removeItem('treasure_hunt_claimed');
  localStorage.removeItem('treasure_hunt_last_active_time');
  window.dispatchEvent(new Event('treasure_hunt_update'));
};

export const updateTreasureHuntActivity = () => {
  localStorage.setItem('treasure_hunt_last_active_time', Date.now().toString());
};

export const checkTreasureHuntInactivity = () => {
  const startTime = getTreasureHuntStartTime();
  if (!startTime) return false;

  const lastActiveStr = localStorage.getItem('treasure_hunt_last_active_time');
  const lastActive = lastActiveStr ? parseInt(lastActiveStr, 10) : startTime;

  // 1 hour = 3600000 ms
  const INACTIVITY_LIMIT = 3600000;
  if (Date.now() - lastActive > INACTIVITY_LIMIT) {
    resetTreasureHunt();
    return true;
  }
  return false;
};


