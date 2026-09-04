const CACHE_NAME = "voyage-majorque-v1-4-10-blind-test-layout";
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest?v=1.4.8",
  "./manifest-debug.webmanifest?v=1.4.8",
  "./styles.css?v=1.4.10",
  "./script.js?v=1.4.10",
  "./config.js?v=1.4.10",
  "./challenge-one.js?v=1.4.8",
  "./family-game.js",
  "./gallery-soundtrack.js?v=1.2.1",
  "./gallery-viewer.js?v=1.3.2",
  "./road-trip.js",
  "./time-travel.js?v=1.3.2",
  "./assets/img/Lenny_1.png",
  "./assets/icons/icon-192-v1.png",
  "./assets/icons/icon-512-v1.png",
  "./assets/icons/apple-touch-icon-v1.png",
  "./assets/challenge-8/v1-4-10/guitar.png",
  "./assets/challenge-8/v1-4-10/music-note.png",
  "./assets/challenge-1/v1-4-6/intro-door.png",
  "./assets/challenge-1/v1-4-5/closed-door-1.png",
  "./assets/challenge-1/v1-4-5/closed-door-2.png",
  "./assets/challenge-1/v1-4-5/closed-door-3.png",
  "./assets/challenge-1/v1-4-5/closed-door-4.png",
  "./assets/challenge-1/v1-4-5/closed-door-5.png",
  "./assets/challenge-1/v1-4-5/closed-door-6.png",
  "./assets/challenge-1/v1-4-5/open-door-1.png",
  "./assets/challenge-1/v1-4-5/open-door-2.png",
  "./assets/challenge-1/v1-4-5/open-door-3.png",
  "./assets/challenge-1/v1-4-5/open-door-4.png",
  "./assets/challenge-1/v1-4-5/open-door-5.png",
  "./assets/challenge-1/v1-4-5/open-door-6.png",
  "./assets/challenge-1/v1-4-5/rule-1-level-3.png",
  "./assets/challenge-1/v1-4-6/rule-1-level-1.png",
  "./assets/challenge-1/v1-4-6/rule-1-level-2.png",
  "./assets/challenge-1/v1-4-6/rule-1-level-3.png",
  "./assets/challenge-1/v1-4-7/rule-2-level-1.png",
  "./assets/challenge-1/v1-4-7/rule-2-level-2.png",
  "./assets/challenge-1/v1-4-7/rule-2-level-3.png",
  "./assets/challenge-1/v1-4-7/rule-2-level-4.png",
  "./assets/challenge-1/v1-4-8/rule-3-level-1.png",
  "./assets/challenge-1/v1-4-8/rule-3-level-2.png",
  "./assets/challenge-1/v1-4-8/rule-3-level-3.png",
  "./assets/challenge-1/v1-4-8/rule-3-level-4.png",
  "./assets/challenge-1/v1-4-8/rule-4-level-1.png",
  "./assets/challenge-1/v1-4-8/rule-4-level-2.png",
  "./assets/challenge-1/v1-4-8/rule-4-level-3.png",
  "./assets/challenge-1/v1-4-8/rule-4-level-4.png",
  "./assets/challenge-1/v1-4-8/rule-5-level-1.png",
  "./assets/challenge-1/v1-4-8/rule-5-level-2.png",
  "./assets/challenge-1/v1-4-8/rule-5-level-3.png",
  "./assets/challenge-1/v1-4-8/rule-5-level-4.png",
  "./assets/challenge-1/v1-4-8/rule-6-level-1.png",
  "./assets/challenge-1/v1-4-8/rule-6-level-2.png",
  "./assets/challenge-1/v1-4-8/rule-6-level-3.png",
  "./assets/challenge-1/v1-4-8/rule-6-level-4.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))).then(() => self.clients.claim()));
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put("./index.html", copy));
        return response;
      }).catch(() => caches.match("./index.html")),
    );
    return;
  }
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request).then((response) => {
      const copy = response.clone();
      caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
      return response;
    }).catch(() => caches.match("./index.html"))),
  );
});
