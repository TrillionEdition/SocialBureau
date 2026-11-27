import { BUDDY_SETTINGS } from "./BuddyConfig.js";

const PREFIX = "bureauBuddy:";
const PRIORITY = ["exit", "welcome", "idle", "scroll"];
const FORM_TAGS = new Set(["INPUT", "TEXTAREA", "SELECT"]);

export function getScrollDepth() {
  const root = document.documentElement;
  const height = Math.max(root.scrollHeight, document.body?.scrollHeight || 0);
  const scrollable = height - window.innerHeight;
  const top = window.scrollY || window.pageYOffset || root.scrollTop || 0;
  return { scrollable, percentage: scrollable > 0 ? (top / scrollable) * 100 : 0 };
}

function formInteraction() {
  const element = document.activeElement;
  return Boolean(element && (FORM_TAGS.has(element.tagName) || element.isContentEditable));
}

function read(type, key) {
  try {
    return window[type].getItem(PREFIX + key);
  } catch (error) {
    console.warn(`Bureau Buddy could not read ${type} ${key}:`, error);
    return null;
  }
}

function write(type, key, value) {
  try {
    window[type].setItem(PREFIX + key, String(value));
  } catch (error) {
    console.warn(`Bureau Buddy could not save ${type} ${key}:`, error);
  }
}

export class BuddyTriggerManager {
  constructor(show, settings = BUDDY_SETTINGS) {
    this.show = show;
    this.settings = settings;
    this.busy = false;
    this.pending = new Set();
    this.flags = new Set(["idle", "scroll", "exit"].filter((key) => read("sessionStorage", key)));
    this.welcomePending = !read("localStorage", "visited") && !read("localStorage", "dismissed");
    this.lastPrompt = Number(read("sessionStorage", "lastPrompt")) || 0;
    this.count = Number(read("sessionStorage", "count")) || 0;
    this.started = false;
    this.manual = false;
    this.lastType = null;
    this.lastExitCheck = 0;
    this.lastY = null;
    this.logged = new Set();
  }

  // Enable with localStorage "bureauBuddy:debug" = "1" or window.BUREAU_BUDDY_DEBUG = true.
  get debug() {
    return this.settings.debug || window.BUREAU_BUDDY_DEBUG === true || read("localStorage", "debug") === "1";
  }

  log(message, details, key) {
    if (!this.debug) return;
    if (key) {
      if (this.logged.has(key)) return;
      this.logged.add(key);
    }
    console.debug(`[BureauBuddy] ${message}`, details);
  }

  start() {
    if (this.started) return;
    this.started = true;
    this.mobile = window.matchMedia("(pointer: coarse)").matches;
    this.activity = () => this.resetIdle();
    this.scroll = () => {
      this.resetIdle();
      const { scrollable, percentage } = getScrollDepth();
      if (scrollable > 0 && percentage >= 50) this.request("scroll", { scrollPercentage: percentage });
    };
    this.move = (event) => {
      const previous = this.lastY;
      this.lastY = event.clientY;
      if (!this.mobile && previous !== null && event.clientY < previous && event.clientY <= this.settings.exitThreshold) {
        this.exitIntent(event, "mousemove");
      }
    };
    this.exit = (event) => {
      if (!this.mobile && !event.relatedTarget && event.clientY <= this.settings.exitThreshold) {
        this.exitIntent(event, "mouseout");
      }
    };
    this.result = (event) => {
      if (this.busy && (event.detail === "success" || event.detail === "error")) this.show(event.detail);
    };
    for (const event of ["mousemove", "click", "keydown", "touchstart", "touchmove"]) {
      window.addEventListener(event, this.activity, { passive: true });
    }
    window.addEventListener("scroll", this.scroll, { passive: true });
    window.addEventListener("mousemove", this.move, { passive: true });
    document.addEventListener("mouseout", this.exit);
    window.addEventListener("bureau-buddy:form-result", this.result);
    if (this.welcomePending) {
      this.welcomeTimer = window.setTimeout(() => this.request("welcome"), this.settings.welcomeDelay);
    }
    this.resetIdle();
  }

  stop() {
    if (!this.started) return;
    this.started = false;
    for (const event of ["mousemove", "click", "keydown", "touchstart", "touchmove"]) {
      window.removeEventListener(event, this.activity);
    }
    window.removeEventListener("scroll", this.scroll);
    window.removeEventListener("mousemove", this.move);
    document.removeEventListener("mouseout", this.exit);
    window.removeEventListener("bureau-buddy:form-result", this.result);
    for (const timer of ["welcomeTimer", "idleTimer", "mobileTimer", "queueTimer", "cooldownTimer"]) {
      window.clearTimeout(this[timer]);
    }
    this.pending.clear();
  }

  resetIdle() {
    window.clearTimeout(this.idleTimer);
    window.clearTimeout(this.mobileTimer);
    this.pending.delete("idle");
    if (this.mobile) this.pending.delete("exit");
    this.idleTimer = window.setTimeout(() => this.request("idle"), this.settings.idleDelay);
    if (this.mobile) {
      this.mobileTimer = window.setTimeout(() => this.request("exit"), this.settings.mobileExitDelay);
    }
  }

  exitIntent(event, source) {
    const now = Date.now();
    if (now - this.lastExitCheck < this.settings.exitDebounce) return;
    this.lastExitCheck = now;
    this.request("exit", { source, clientY: event.clientY });
  }

  blockReason(type) {
    const cooling = this.lastPrompt && Date.now() - this.lastPrompt < this.settings.cooldown;
    if (!this.started) return "Trigger disabled";
    if (this.flags.has(type)) return "Already triggered";
    if (type === "welcome" && !this.welcomePending) return "Already triggered";
    if (this.count >= this.settings.maxAutomaticPerSession) return "Session limit reached";
    if (this.busy) return "Popup already open";
    if (type === "exit" && formInteraction()) return "Form interaction detected";
    if (type === "exit" && cooling) return this.lastType === "welcome" ? "Welcome message recently displayed" : "Cooldown active";
    return null;
  }

  request(type, details = {}) {
    const reason = this.blockReason(type);
    if (type === "scroll" || type === "exit") {
      this.log(`${type === "scroll" ? "Scroll" : "Exit intent"} detected:`, {
        ...details,
        alreadyTriggered: this.flags.has(type),
        popupOpen: this.busy,
        triggerEligible: !reason,
        blockedBy: reason,
      }, `${type}:${reason}`);
    }
    // A scroll that happens while an automatic popup is open is re-checked once it is dismissed.
    if (type === "scroll" && reason === "Popup already open" && !this.manual) {
      this.pending.add(type);
      return;
    }
    if (reason) return;
    this.pending.add(type);
    window.clearTimeout(this.queueTimer);
    this.queueTimer = window.setTimeout(() => this.flush(), 0);
  }

  flush() {
    if (!this.started || this.busy || !this.pending.size) return;
    const remaining = this.lastPrompt ? this.settings.cooldown - (Date.now() - this.lastPrompt) : 0;
    if (remaining > 0) {
      window.clearTimeout(this.cooldownTimer);
      this.cooldownTimer = window.setTimeout(() => this.flush(), remaining);
      return;
    }
    const type = PRIORITY.find((candidate) =>
      this.pending.has(candidate) && (candidate === "exit" || candidate === "welcome" || !this.welcomePending),
    );
    if (!type) return;
    if (type === "scroll") {
      const { scrollable, percentage } = getScrollDepth();
      if (scrollable <= 0 || percentage < 50) {
        this.pending.delete(type);
        return;
      }
    }
    this.pending.clear();
    this.busy = true;
    this.manual = false;
    this.lastType = type;
    this.lastPrompt = Date.now();
    this.count += 1;
    if (type === "welcome") {
      this.welcomePending = false;
      write("localStorage", "visited", "1");
    } else {
      this.flags.add(type);
      write("sessionStorage", type, "1");
    }
    write("sessionStorage", "lastPrompt", this.lastPrompt);
    write("sessionStorage", "count", this.count);
    this.show(type);
  }

  open() {
    this.busy = true;
    this.manual = true;
    this.pending.clear();
    this.welcomePending = false;
    write("localStorage", "visited", "1");
    this.show("menu");
  }

  dismiss() {
    this.busy = false;
    this.manual = false;
    this.welcomePending = false;
    this.lastPrompt = Date.now();
    write("localStorage", "visited", "1");
    write("localStorage", "dismissed", "1");
    write("sessionStorage", "lastPrompt", this.lastPrompt);
    if (this.started) {
      this.resetIdle();
      if (this.pending.size) this.flush();
    }
  }
}

export function notifyBuddyFormResult(result) {
  window.dispatchEvent(new CustomEvent("bureau-buddy:form-result", { detail: result }));
}
