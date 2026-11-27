export const BUDDY_ASSETS = {
  default: "/assets/bureau-buddy/buddy_introduce.png",
  wave: "/assets/bureau-buddy/buddy_wave.png",
  thinking: "/assets/bureau-buddy/buddy_thinking.png",
  guide: "/assets/bureau-buddy/buddy_introduce.png",
  positive: "/assets/bureau-buddy/buddy_thumbs_up.png",
  celebrate: "/assets/bureau-buddy/buddy_celebrate.png",
};

export const BUDDY_SETTINGS = {
  welcomeDelay: 4000,
  idleDelay: 40000,
  mobileExitDelay: 120000,
  cooldown: 30000,
  maxAutomaticPerSession: 4,
  exitThreshold: 20,
  exitDebounce: 1000,
};

const QUICK_ACTIONS = ["services", "booking", "chat"];
export const BUDDY_MESSAGES = {
  welcome: { text: "Hi 👋 Welcome to SocialBureau!", pose: "wave", actions: QUICK_ACTIONS },
  idle: { text: "Need help? I'm here! 😊", pose: "thinking", actions: QUICK_ACTIONS },
  scroll: { text: "Want to explore how we can grow your business?", pose: "guide", actions: QUICK_ACTIONS },
  exit: { text: "Let's grow your business together! 🚀", pose: "guide", actions: ["talk", "booking", "chat"] },
  success: { text: "Awesome! We've received your enquiry! 🎉", pose: "celebrate", actions: QUICK_ACTIONS },
  error: { text: "Oops! Something went wrong. Let's try again.", pose: "thinking", actions: QUICK_ACTIONS },
  menu: { text: "Hi! How can I help you today?", pose: "wave", actions: QUICK_ACTIONS },
};

export const BUDDY_ACTIONS = {
  services: { label: "Explore Our Services", to: "/#services" },
  booking: { label: "Book a Call", to: "/contact" },
  chat: { label: "Chat with Us", href: "https://api.whatsapp.com/send/?phone=918714952665&text=Hello%2C+I+would+like+to+learn+more." },
  talk: { label: "Talk to Us", to: "/contact" },
};
