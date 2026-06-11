// src/utils/treasureHunt.js

export const CLUES = [
  {
    index: 1,
    title: "Hint 1",
    clueText: "Behind every strategy stands a story. Meet the people behind the bureau.",
    targetPage: "/about"
  },
  {
    index: 2,
    title: "Hint 2",
    clueText: "Heroes rarely work alone. Find the minds that make the magic happen.",
    targetPage: "/team"
  },
  {
    index: 3,
    title: "Hint 3",
    clueText: "Today's explorers may become tomorrow's crew.",
    targetPage: "/careers"
  },
  {
    index: 4,
    title: "Hint 4",
    clueText: "Wisdom leaves footprints. Explore where ideas are shared with the world.",
    targetPage: "/blog"
  },
  {
    index: 5,
    title: "Hint 5",
    clueText: "Apps talk to each other using APIs—Application Programming Interfaces. Follow the trail to the service that markets these powerful connections.",
    targetPage: "/api-marketing-agency-in-kochi"
  },
  {
    index: 6,
    title: "Hint 6",
    clueText: "Clicks are exciting, but results matter more. Explore where campaigns focus on performance.",
    targetPage: "/performance-marketing-agency-in-kochi"
  },
  {
    index: 7,
    title: "Hint 7",
    clueText: "People remember great stories. Find the place where content takes the spotlight.",
    targetPage: "/content-marketing-agency-in-kochi"
  },
  {
    index: 8,
    title: "Hint 8",
    clueText: "Need a place where code meets creativity? Search the page where creativity are developed.",
    targetPage: "/web-development-agency-in-kochi"
  }
];

export const getTreasureHuntStep = () => {
  return parseInt(localStorage.getItem('treasure_hunt_step') || '0', 10);
};

export const setTreasureHuntStep = (step) => {
  localStorage.setItem('treasure_hunt_step', step.toString());
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
  window.dispatchEvent(new Event('treasure_hunt_update'));
};

