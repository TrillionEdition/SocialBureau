import { test, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { BuddyTriggerManager } from "./BuddyTriggerManager.js";
import { BUDDY_ACTIONS, BUDDY_ASSETS, BUDDY_MESSAGES, BUDDY_SETTINGS } from "./BuddyConfig.js";
import { access } from "node:fs/promises";
import { fileURLToPath } from "node:url";

function memoryStorage() {
  const data = new Map();
  return {
    getItem: (key) => data.get(key) ?? null,
    setItem: (key, value) => data.set(key, value),
  };
}

function eventTarget() {
  const listeners = new Map();
  return {
    addEventListener(type, fn) {
      if (!listeners.has(type)) listeners.set(type, new Set());
      listeners.get(type).add(fn);
    },
    removeEventListener(type, fn) { listeners.get(type)?.delete(fn); },
    emit(type, event = {}) { for (const fn of listeners.get(type) || []) fn(event); },
    count() { return [...listeners.values()].reduce((sum, items) => sum + items.size, 0); },
  };
}

let now, timers, nextTimer, originalNow;
function advance(ms) {
  const end = now + ms;
  while (true) {
    const due = [...timers.entries()].filter(([, timer]) => timer.time <= end)
      .sort((a, b) => a[1].time - b[1].time || a[0] - b[0])[0];
    if (!due) break;
    timers.delete(due[0]);
    now = due[1].time;
    due[1].fn();
  }
  now = end;
}

beforeEach(() => {
  now = 1000000;
  timers = new Map();
  nextTimer = 0;
  originalNow = Date.now;
  Date.now = () => now;
  globalThis.window = {
    ...eventTarget(),
    localStorage: memoryStorage(),
    sessionStorage: memoryStorage(),
    matchMedia: () => ({ matches: false }),
    innerHeight: 500,
    scrollY: 0,
    setTimeout: (fn, delay) => { const id = ++nextTimer; timers.set(id, { fn, time: now + delay }); return id; },
    clearTimeout: (id) => timers.delete(id),
  };
  globalThis.document = { ...eventTarget(), documentElement: { scrollHeight: 1500 } };
});

afterEach(() => {
  Date.now = originalNow;
  delete globalThis.window;
  delete globalThis.document;
});

test("first visit welcomes once, manual interaction cancels welcome, dismissal cools down", () => {
  const shown = [];
  const manager = new BuddyTriggerManager((message) => shown.push(message));
  manager.start();
  advance(3999);
  assert.deepEqual(shown, []);
  advance(1);
  assert.deepEqual(shown, ["welcome"]);
  manager.dismiss();
  advance(39999);
  assert.deepEqual(shown, ["welcome"]);
  advance(1);
  assert.deepEqual(shown, ["welcome", "idle"]);
  manager.dismiss();
  manager.stop();
  const returning = new BuddyTriggerManager((message) => shown.push(message));
  returning.start();
  advance(4000);
  assert.deepEqual(shown, ["welcome", "idle"]);
  returning.stop();

  window.localStorage = memoryStorage();
  window.sessionStorage = memoryStorage();
  const manual = new BuddyTriggerManager((message) => shown.push(message));
  manual.start();
  manual.open();
  manual.dismiss();
  advance(4000);
  assert.equal(shown.at(-1), "menu");
  manual.stop();
});

test("activity resets idle; scrolling triggers only at 50% and once per session", () => {
  window.localStorage.setItem("bureauBuddy:visited", "1");
  const shown = [];
  const manager = new BuddyTriggerManager((message) => shown.push(message));
  manager.start();
  advance(30000);
  window.emit("mousemove");
  advance(39999);
  assert.deepEqual(shown, []);
  advance(1);
  assert.deepEqual(shown, ["idle"]);
  manager.dismiss();
  window.scrollY = 499;
  window.emit("scroll");
  advance(90000);
  assert.deepEqual(shown, ["idle"]);
  window.scrollY = 500;
  window.emit("scroll");
  advance(0);
  assert.deepEqual(shown, ["idle", "scroll"]);
  manager.dismiss();
  manager.stop();
  const next = new BuddyTriggerManager((message) => shown.push(message));
  next.start();
  advance(90000);
  window.emit("scroll");
  advance(0);
  assert.deepEqual(shown, ["idle", "scroll"]);
  next.stop();
});

test("simultaneous events honor exit priority and manual open wins pending triggers", () => {
  window.localStorage.setItem("bureauBuddy:visited", "1");
  const shown = [];
  const manager = new BuddyTriggerManager((message) => shown.push(message));
  manager.start();
  window.scrollY = 500;
  window.emit("scroll");
  document.emit("mouseout", { clientY: 0, relatedTarget: null });
  advance(0);
  assert.deepEqual(shown, ["exit"]);
  manager.dismiss();
  advance(90000);
  window.emit("scroll");
  manager.open();
  advance(0);
  assert.equal(shown.at(-1), "menu");
  manager.dismiss();
  document.emit("mouseout", { clientY: 0, relatedTarget: null });
  advance(90000);
  assert.equal(shown.filter((item) => item === "exit").length, 1);
  manager.stop();
});

test("exit wins over welcome and dismissal prevents delayed automatic reopening", () => {
  const shown = [];
  const manager = new BuddyTriggerManager((message) => shown.push(message));
  manager.start();
  document.emit("mouseout", { clientY: 0, relatedTarget: null });
  advance(0);
  assert.deepEqual(shown, ["exit"]);
  manager.dismiss();
  advance(4000);
  assert.deepEqual(shown, ["exit"]);
  manager.stop();
});

test("a deferred scroll is discarded if the page is no longer half scrolled", () => {
  window.localStorage.setItem("bureauBuddy:visited", "1");
  const shown = [];
  const manager = new BuddyTriggerManager((message) => shown.push(message));
  manager.start();
  manager.open();
  manager.dismiss();
  window.scrollY = 500;
  window.emit("scroll");
  advance(0);
  window.scrollY = 0;
  advance(89999);
  window.emit("mousemove");
  advance(1);
  assert.equal(shown.includes("scroll"), false);
  manager.stop();
});

test("scroll depth is measured from the document and survives popups, cooldown and the old session cap", () => {
  window.localStorage.setItem("bureauBuddy:visited", "1");
  document.body = { scrollHeight: 3000 };
  const shown = [];
  const manager = new BuddyTriggerManager((message) => shown.push(message));
  manager.start();
  window.scrollY = 1249;
  window.emit("scroll");
  advance(0);
  assert.deepEqual(shown, []);
  advance(40000);
  assert.deepEqual(shown, ["idle"]);
  window.scrollY = 1250;
  window.emit("scroll");
  advance(0);
  assert.deepEqual(shown, ["idle"]);
  manager.dismiss();
  advance(30000);
  assert.deepEqual(shown, ["idle", "scroll"]);
  manager.dismiss();
  window.emit("scroll");
  advance(90000);
  assert.deepEqual(shown, ["idle", "scroll"]);
  manager.stop();
});

test("exit intent fires from upward mouse movement near the top, once, outside forms and cooldowns", () => {
  window.localStorage.setItem("bureauBuddy:visited", "1");
  const shown = [];
  const manager = new BuddyTriggerManager((message) => shown.push(message));
  manager.start();
  window.emit("mousemove", { clientY: 300 });
  window.emit("mousemove", { clientY: 21 });
  advance(0);
  assert.deepEqual(shown, []);
  document.activeElement = { tagName: "INPUT" };
  window.emit("mousemove", { clientY: 5 });
  advance(0);
  assert.deepEqual(shown, []);
  delete document.activeElement;
  advance(1000);
  window.emit("mousemove", { clientY: 15 });
  window.emit("mousemove", { clientY: 10 });
  advance(0);
  assert.deepEqual(shown, ["exit"]);
  manager.dismiss();
  advance(2000);
  window.emit("mousemove", { clientY: 5 });
  advance(0);
  assert.deepEqual(shown, ["exit"]);
  manager.stop();
});

test("exit intent is blocked right after the welcome message", () => {
  const shown = [];
  const manager = new BuddyTriggerManager((message) => shown.push(message));
  manager.start();
  advance(4000);
  manager.dismiss();
  window.emit("mousemove", { clientY: 100 });
  window.emit("mousemove", { clientY: 8 });
  advance(0);
  assert.deepEqual(shown, ["welcome"]);
  manager.stop();
});

test("mobile ignores mouse exit and uses prolonged inactivity, with session cap", () => {
  window.localStorage.setItem("bureauBuddy:visited", "1");
  window.matchMedia = () => ({ matches: true });
  const shown = [];
  const manager = new BuddyTriggerManager((message) => shown.push(message));
  manager.start();
  document.emit("mouseout", { clientY: 0, relatedTarget: null });
  advance(0);
  assert.deepEqual(shown, []);
  advance(40000);
  assert.deepEqual(shown, ["idle"]);
  manager.dismiss();
  advance(120000);
  assert.deepEqual(shown, ["idle", "exit"]);
  manager.dismiss();
  advance(90000);
  window.scrollY = 500;
  window.emit("scroll");
  advance(0);
  assert.deepEqual(shown, ["idle", "exit", "scroll"]);
  manager.stop();
});

test("start and stop clean listeners and timers, storage failures remain usable", () => {
  Object.defineProperty(window, "localStorage", { get() { throw new Error("blocked"); } });
  Object.defineProperty(window, "sessionStorage", { get() { throw new Error("blocked"); } });
  const warn = console.warn;
  console.warn = () => {};
  try {
    const shown = [];
    const manager = new BuddyTriggerManager((message) => shown.push(message));
    manager.start();
    const count = window.count();
    manager.start();
    assert.equal(window.count(), count);
    manager.open();
    manager.dismiss();
    manager.stop();
    assert.equal(window.count(), 0);
    assert.equal(document.count(), 0);
    assert.equal(timers.size, 0);
    assert.deepEqual(shown, ["menu"]);
  } finally {
    console.warn = warn;
  }
});

test("mapped assets exist and every prompt has usable global actions", async () => {
  for (const asset of Object.values(BUDDY_ASSETS)) {
    await access(fileURLToPath(new URL(`../../../public${asset}`, import.meta.url)));
  }
  for (const message of Object.values(BUDDY_MESSAGES)) {
    assert.ok(BUDDY_ASSETS[message.pose]);
    assert.equal(message.actions.length, 3);
    for (const action of message.actions) assert.ok(BUDDY_ACTIONS[action]?.href || BUDDY_ACTIONS[action]?.to);
  }
  assert.equal(BUDDY_SETTINGS.welcomeDelay, 4000);
});
