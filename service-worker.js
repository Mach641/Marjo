const CACHE_NAME = "voyage-majorque-v1-4-34-d1-canonical-flow";
const APP_SHELL = [
  "./assets/notebook/v1-4-32/Kalam-Regular.ttf",
  "./assets/challenge-1/v1-4-30/d1-vincennes-portrait-decor.png",
  "./assets/challenge-1/v1-4-30/d1-vincennes-portrait-characters.png",
  "./assets/opening/v1-4-17/tape-rose.png",
  "./assets/opening/v1-4-17/tape-blue.png",
  "./assets/challenge-1/v1-4-28/d1-01-parc-de-vincennes.webp",
  "./d1-portrait-gallery.js?v=1.4.30",
  "./assets/challenge-1/v1-4-27/parc-de-vincennes.png",
  "./gameplay-header.js?v=1.4.23",
  "./assets/gameplay/v1-4-23/divider-terracotta.png",
  "./assets/notebook/v1-4-21/cta-terracotta.png",
  "./assets/notebook/v1-4-21/polaroid-back.png",
  "./challenge-intro.js?v=1.4.19",
  "./assets/challenge-intros/v1-4-19/button-terracotta.png",
  "./assets/challenge-intros/v1-4-19/footer-balloon.png",
  "./assets/challenge-intros/v1-4-19/footer-coast.png",
  "./assets/challenge-intros/v1-4-19/footer-path.png",
  "./assets/opening/v1-4-18/01_background_papier.png",
  "./assets/opening/v1-4-18/02_arc_en_ciel.png",
  "./assets/opening/v1-4-18/03_fleur_bas_gauche.png",
  "./assets/opening/v1-4-18/04_branche_feuille.png",
  "./assets/opening/v1-4-18/05_carnet_ferme.png",
  "./assets/opening/v1-4-18/06_coeur.png",
  "./assets/opening/v1-4-18/07_chemin_pointille.png",
  "./assets/opening/v1-4-18/08_papier_cta.png",
  "./assets/opening/v1-4-18/09_scotch_rose.png",
  "./assets/opening/v1-4-18/10_scotch_bleu.png",
  "./assets/opening/v1-4-17/OoohBaby-Regular.ttf",
  "./assets/challenge-7/v1-4-16/apple-snake.png",
  "./challenge-six.js?v=1.4.23",
  "./assets/challenge-6/v1-4-15/wizards.png",
  "./assets/challenge-5/v1-4-14/camper.png",
  "./assets/challenge-5/v1-4-14/map.png",
  "./",
  "./index.html",
  "./manifest.webmanifest?v=1.4.8",
  "./manifest-debug.webmanifest?v=1.4.8",
  "./styles.css?v=1.4.33",
  "./script.js?v=1.4.34",
  "./config.js?v=1.4.34",
  "./challenge-one.js?v=1.4.23",
  "./family-game.js?v=1.4.23",
  "./gallery-soundtrack.js?v=1.2.1",
  "./gallery-viewer.js?v=1.3.2",
  "./road-trip.js?v=1.4.23",
  "./time-travel.js?v=1.3.2",
  "./assets/img/Lenny_1.png",
  "./assets/icons/icon-192-v1.png",
  "./assets/icons/icon-512-v1.png",
  "./assets/icons/apple-touch-icon-v1.png",
  "./assets/challenge-8/v1-4-10/guitar.png",
  "./assets/challenge-8/v1-4-26/music-notes.png",
  "./assets/challenge-2/v1-4-12/couple-profile-notebook.png",
  "./assets/challenge-3/v1-4-13/baby-polaroids.png",
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
