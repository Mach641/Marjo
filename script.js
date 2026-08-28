import { APP_VERSION, CONFIG, STEPS } from "./config.js?v=1.3.2";
import { renderFamilyGame } from "./family-game.js";
import { createGallerySoundtrack } from "./gallery-soundtrack.js?v=1.2.1";
import { openGalleryViewer } from "./gallery-viewer.js?v=1.3.2";
import { renderRoadTrip } from "./road-trip.js";
import { playTimeTravel } from "./time-travel.js?v=1.3.2";

const app = document.querySelector("#app");
const header = document.querySelector(".site-header");
const progressBar = document.querySelector("#progressBar");
const progressLabel = document.querySelector("#progressLabel");
const illustrationCount = document.querySelector("#illustrationCount");
const debugPanel = document.querySelector("#debugPanel");
const debugMode = new URLSearchParams(location.search).get("debug") === "1";
let cleanupCurrentScreen = null;
let rendering = false;
let activeSoundtrack = null;

const defaultState = () => ({
  version: CONFIG.stateVersion,
  started: false,
  currentStep: "welcome",
  completedChallenges: {},
  galleryViewed: {},
  illustrations: {},
  answers: {},
  geoRiddleSolved: false,
  geoValidated: false,
  awaitingFlightReopen: false,
  orderAnnounced: false,
  lettersFound: false,
  finalUnlocked: false,
  majorcaMomentSeen: false,
});

function loadState() {
  try {
    const stored = JSON.parse(localStorage.getItem(CONFIG.storageKey));
    return stored?.version === CONFIG.stateVersion ? { ...defaultState(), ...stored } : defaultState();
  } catch { return defaultState(); }
}

let state = loadState();
// Le debug manipule une copie en mémoire : seul le reset explicite touche au state de production.
const saveState = () => {
  if (!debugMode) localStorage.setItem(CONFIG.storageKey, JSON.stringify(state));
};
const stepIndex = (id) => STEPS.findIndex((step) => step.id === id);
const currentStepIndex = () => Math.max(0, stepIndex(state.currentStep));

function navigate(id, { advance = false, replace = false } = {}) {
  if (stepIndex(id) < 0) id = state.currentStep;
  if (advance && stepIndex(id) > currentStepIndex()) {
    state.currentStep = id;
    saveState();
  }
  if (!debugMode && stepIndex(id) > currentStepIndex()) id = state.currentStep;
  const hash = `#${id}`;
  if (replace) history.replaceState(null, "", hash);
  else if (location.hash !== hash) location.hash = id;
  else render(id);
  if (replace) render(id);
}

function updateChrome(id) {
  const index = Math.max(0, stepIndex(id));
  header.hidden = id === "welcome";
  progressLabel.textContent = "Le carnet";
  progressBar.style.width = `${Math.round((index / (STEPS.length - 1)) * 100)}%`;
  illustrationCount.hidden = true;
}

const rainbowGuide = (message) => `<div class="guide"><span class="guide__rainbow" aria-hidden="true">⌒</span><p>${message}</p></div>`;
const page = (title, body, options = {}) => `<section class="paper-card screen ${options.className || ""}">${options.kicker ? `<p class="kicker">${options.kicker}</p>` : ""}<h1>${title}</h1>${options.guide ? rainbowGuide(options.guide) : ""}${body}</section>`;
const button = (label, action, className = "primary-button") => `<button class="${className}" type="button" data-action="${action}">${label}</button>`;
function bindAction(action, handler, once = true) {
  const node = app.querySelector(`[data-action="${action}"]`);
  node?.addEventListener("click", handler, { once });
  return node;
}

function completeChallenge(id, resolutionStep) {
  state.completedChallenges[id] = true;
  saveState();
  navigate(resolutionStep, { advance: true });
}

function renderChoiceSequence({ chapterId, title, items, enforceCorrect = false, revealCorrect = false, onDone, decorate }) {
  let index = Math.min(state.answers[`chapter-${chapterId}`]?.length || 0, items.length - 1);
  const answers = [...(state.answers[`chapter-${chapterId}`] || [])];
  const draw = () => {
    const item = items[index];
    app.innerHTML = page(title, `<div class="question-meta">${index + 1} / ${items.length}</div>${decorate?.(item, index) || ""}<h2>${item.prompt || "À toi de choisir."}</h2><div class="choice-list">${item.options.map((choice, choiceIndex) => `<button class="choice" type="button" data-choice="${choiceIndex}">${choice}</button>`).join("")}</div><p class="feedback" role="status"></p>`);
    const play = app.querySelector("[data-play]");
    play?.addEventListener("click", () => { play.textContent = "Lecture simulée… ♫"; });
    app.querySelectorAll("[data-choice]").forEach((choice) => choice.addEventListener("click", () => {
      const selected = Number(choice.dataset.choice);
      const correct = typeof item.answer === "number" ? selected === item.answer : item.options[selected] === item.answer;
      const feedback = app.querySelector(".feedback");
      if (enforceCorrect && !correct && !revealCorrect) {
        feedback.textContent = "Pas tout à fait. Essaie encore.";
        return;
      }
      app.querySelectorAll("[data-choice]").forEach((node) => { node.disabled = true; });
      if (revealCorrect) feedback.textContent = `${item.answer}. ${correct ? "Bien vu." : "L’arc-en-ciel avait semé le doute."}`;
      answers[index] = item.options[selected];
      state.answers[`chapter-${chapterId}`] = answers;
      saveState();
      index += 1;
      setTimeout(() => index >= items.length ? onDone() : draw(), revealCorrect ? 700 : 250);
    }));
  };
  draw();
}

function renderResolution(title, text, cta, next, options = {}) {
  app.innerHTML = page(title, `<p>${text}</p>${button(cta, "continue")}`, options);
  bindAction("continue", () => navigate(next, { advance: true }));
}

function stopActiveSoundtrack() {
  activeSoundtrack?.stop();
  activeSoundtrack = null;
}

async function beginGallerySoundtrack(chapterId) {
  const config = CONFIG.chapters[chapterId]?.soundtrack;
  if (!config?.enabled || !config.src) return;
  stopActiveSoundtrack();
  const soundtrack = createGallerySoundtrack(config);
  activeSoundtrack = soundtrack;
  if (!await soundtrack.start()) {
    soundtrack.stop();
    if (activeSoundtrack === soundtrack) activeSoundtrack = null;
  }
}

function renderGalleryResolution(chapterId, title, text, cta, next, options = {}) {
  const soundtrack = CONFIG.chapters[chapterId]?.soundtrack;
  if (!soundtrack?.enabled || !soundtrack.src) return renderResolution(title, text, cta, next, options);
  app.innerHTML = page(title, `<p>${text}</p>${button("Continuer en musique", "continue")}`, options);
  bindAction("continue", async () => {
    await beginGallerySoundtrack(chapterId);
    navigate(next, { advance: true });
  });
}

function renderGalleryInvitation(travelStep) {
  app.innerHTML = `<section class="paper-card screen orientation-screen"><p class="orientation-invite">Tourne-moi.</p>${button("Ouvrir quand même", "continue", "quiet-button")}</section>`;

  const landscape = matchMedia("(orientation: landscape)");
  let travelling = false;
  const removeOrientationListeners = () => {
    landscape.removeEventListener?.("change", handleOrientation);
    window.removeEventListener("orientationchange", handleOrientation);
    window.removeEventListener("resize", handleOrientation);
  };
  const startTravel = () => {
    if (travelling) return;
    travelling = true;
    removeOrientationListeners();
    navigate(travelStep, { advance: true });
  };
  function handleOrientation() {
    if (landscape.matches || innerWidth > innerHeight) startTravel();
  }

  landscape.addEventListener?.("change", handleOrientation);
  window.addEventListener("orientationchange", handleOrientation);
  window.addEventListener("resize", handleOrientation);
  cleanupCurrentScreen = removeOrientationListeners;
  bindAction("continue", startTravel);
  handleOrientation();
}

function openChapterGallery(chapterId, nextStep) {
  const chapter = CONFIG.chapters[chapterId];
  const namedGallery = chapterId === 1 || chapterId === 5;
  const accessibleLabel = namedGallery ? `Images — ${chapter.title}` : "Fenêtre sur votre histoire";
  cleanupCurrentScreen = openGalleryViewer({
    accessibleLabel,
    images: chapter.gallery,
    reveal: true,
    soundtrack: activeSoundtrack,
    placeholderLabel: namedGallery ? `PLACEHOLDER — ${chapter.title.toUpperCase()}` : "PLACEHOLDER — IMAGE À REMPLACER",
    onClose: () => {
      cleanupCurrentScreen = null;
      stopActiveSoundtrack();
      state.galleryViewed[chapterId] = true;
      saveState();
      navigate(nextStep, { advance: true });
    },
  });
}

function renderHandoff(chapterId, nextStep, message = "Vincent a quelque chose à te remettre.") {
  app.innerHTML = `<section class="paper-card screen">${rainbowGuide("Il en reste une.")}<p>${message}</p>${button("Je l’ai", "have-it")}</section>`;
  bindAction("have-it", () => {
    state.illustrations[chapterId] = true;
    saveState();
    navigate(nextStep, { advance: true });
  });
}

function renderTravel(direction, intensity, next) {
  cleanupCurrentScreen = playTimeTravel(app, { direction, intensity, visualDirections: CONFIG.timeTravel.visualDirections, debug: debugMode }, () => {
    cleanupCurrentScreen = null;
    navigate(next, { advance: true });
  });
}

function renderTravelGallery(chapterId, direction, intensity, nextStep) {
  cleanupCurrentScreen = playTimeTravel(app, { direction, intensity, visualDirections: CONFIG.timeTravel.visualDirections, debug: debugMode }, () => {
    cleanupCurrentScreen = null;
    openChapterGallery(chapterId, nextStep);
  });
}

function todayKey() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}
const dayIsOpen = (date) => debugMode || todayKey() >= date;

function renderDayLock(kind) {
  const friday = kind === "thursday";
  const unlockDate = friday ? CONFIG.schedule.fridayUnlockDate : CONFIG.schedule.saturdayUnlockDate;
  const next = friday ? "travel-past-large" : "saturday-intro";
  if (dayIsOpen(unlockDate)) {
    if (friday) return navigate(next, { advance: true });
    app.innerHTML = page("Bonjour, samedi", `<p>Le carnet est prêt à reprendre la route.</p>${button("Ouvrir le carnet", "continue")}`, { guide: "Les pages ont attendu." });
    return bindAction("continue", () => navigate(next, { advance: true }));
  }
  app.innerHTML = page("Referme-moi pour ce soir", `<p>${friday ? "Je crois qu’on est allés assez loin pour ce soir. Reviens me voir demain matin." : "C’est tout pour aujourd’hui. Profite un peu du vrai voyage. On reprend demain."}</p><p class="notice"><strong>Ta progression est sauvegardée.</strong><br>Tu peux fermer le carnet sans crainte.</p>`, { guide: "Même un carnet doit laisser respirer les histoires." });
}

function normalize(value) { return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, ""); }
function haversineKm(aLat, aLon, bLat, bLon) {
  const rad = (value) => value * Math.PI / 180;
  const dLat = rad(bLat - aLat); const dLon = rad(bLon - aLon);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(rad(aLat)) * Math.cos(rad(bLat)) * Math.sin(dLon / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function renderGeo() {
  if (!state.geoRiddleSolved) {
    app.innerHTML = page("Où allons-nous ?", `<blockquote>« Le père du prince n’est pas un roi. »</blockquote><label class="field-label" for="destination">Ta réponse</label><input id="destination" class="text-input" autocomplete="off" />${button("Vérifier", "solve")}<p class="feedback" role="status"></p>`, { guide: "Un nom se cache peut-être en pleine lumière." });
    return bindAction("solve", () => {
      const accepted = new Set(["saintexupery", "aeroportsaintexupery", "lyonsaintexupery", "aeroportlyonsaintexupery"]);
      if (!accepted.has(normalize(app.querySelector("#destination").value))) return void (app.querySelector(".feedback").textContent = "Ce n’est pas encore le bon départ.");
      state.geoRiddleSolved = true;
      saveState();
      app.innerHTML = page("Exact.", `<p>Encore faut-il y être…</p>${button("Continuer", "continue")}`);
      bindAction("continue", renderGeo);
    }, false);
  }
  if (state.geoValidated) return navigate("departure", { advance: true });
  app.innerHTML = `<section class="paper-card screen">${button(debugMode ? "Valider la position (test)" : "Vérifier ma position", "locate")}<div class="feedback" role="status"></div></section>`;
  bindAction("locate", () => {
    if (debugMode) { state.geoValidated = true; saveState(); return navigate("departure", { advance: true }); }
    const feedback = app.querySelector(".feedback");
    if (!navigator.geolocation) return void (feedback.textContent = "La géolocalisation n’est pas disponible.");
    feedback.textContent = "Je cherche ta position…";
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const distance = haversineKm(coords.latitude, coords.longitude, CONFIG.geo.latitude, CONFIG.geo.longitude);
      if (distance <= CONFIG.geo.radiusKm) { state.geoValidated = true; saveState(); navigate("departure", { advance: true }); }
      else feedback.innerHTML = rainbowGuide("Tu sais où aller. Je t’attends là-bas.");
    }, (error) => { feedback.textContent = error.code === 1 ? "Localisation refusée. Tu pourras réessayer ici." : "Position indisponible. Réessaie dans un instant."; }, { enableHighAccuracy: true, timeout: 15000, maximumAge: 60000 });
  }, false);
}

function renderAnalysis() {
  let index = 0;
  app.innerHTML = page("Un instant…", `<div class="analysis-lines" aria-live="polite"></div>`);
  const target = app.querySelector(".analysis-lines");
  const interval = setInterval(() => {
    target.insertAdjacentHTML("beforeend", `<p>${CONFIG.text.analysis[index]}</p>`);
    index += 1;
    if (index >= CONFIG.text.analysis.length) {
      clearInterval(interval);
      setTimeout(() => navigate("resolution-2", { advance: true }), debugMode ? 250 : 700);
    }
  }, debugMode ? 120 : 700);
  cleanupCurrentScreen = () => clearInterval(interval);
}

function renderMajorca() {
  app.innerHTML = page("Le présent vous attendait exactement ici.", `${button("Je l’ai", "have-it")}`, { className: "majorca-screen" });
  bindAction("have-it", () => { state.illustrations[4] = true; saveState(); navigate("order", { advance: true }); });
}

function renderSaturdayEvening() {
  if (state.majorcaMomentSeen) return navigate("majorca", { advance: true, replace: true });
  state.majorcaMomentSeen = true;
  if (stepIndex("majorca") > currentStepIndex()) state.currentStep = "majorca";
  saveState();
  history.replaceState(null, "", "#majorca");
  app.innerHTML = page("Samedi soir", `<p><strong>Marche jusqu’au banc.</strong></p>`, { guide: "Pour une fois, ne cherche pas le futur. Il suffit de regarder devant toi.", className: "majorca-screen" });
}

const renderers = {
  welcome: () => { app.innerHTML = page("Un voyage à ouvrir", `<p class="lead">Quelques souvenirs et un petit arc-en-ciel qui prétend connaître le chemin.</p>${button("Ouvrir le carnet", "open")}`, { className: "welcome-screen" }); bindAction("open", () => { state.started = true; saveState(); navigate("prologue", { advance: true }); }); },
  prologue: () => { app.innerHTML = page("Avant de partir", `${CONFIG.text.prologue.map((line) => `<p>${line}</p>`).join("")}${button("Tourner la page", "continue")}`, { guide: "Bonjour Marjolaine." }); bindAction("continue", () => navigate("challenge-1", { advance: true })); },
  "challenge-1": () => state.completedChallenges[1] ? navigate("resolution-1", { advance: true }) : renderChoiceSequence({ chapterId: 1, title: CONFIG.chapters[1].publicChallengeTitle, items: CONFIG.chapters[1].questions, enforceCorrect: true, onDone: () => completeChallenge(1, "resolution-1") }),
  "resolution-1": () => renderGalleryResolution(1, "Tu t’en souviens.", "Alors laisse-moi te montrer ce que tu n’avais jamais vu.", "Découvrir le souvenir", "gallery-1"),
  "gallery-1": () => renderGalleryInvitation("travel-past-medium-1"),
  "travel-past-medium-1": () => renderTravelGallery(1, "past", "medium", "handoff-1"),
  "handoff-1": () => renderHandoff(1, "challenge-8"),
  "challenge-8": () => state.completedChallenges[8] ? navigate("resolution-8", { advance: true }) : renderChoiceSequence({ chapterId: 8, title: "Blind test guitare", items: CONFIG.chapters[8].tracks, enforceCorrect: true, decorate: (track, index) => `<div class="audio-placeholder"><span>♫</span><button class="secondary-button" type="button" data-play>Écouter la piste ${index + 1}</button><small>Piste ${index + 1}</small></div>`, onDone: () => completeChallenge(8, "resolution-8") }),
  "resolution-8": () => renderGalleryResolution(8, "Celle-là, garde-la quelque part.", "Certaines chansons savent attendre longtemps.", "Continuer", "gallery-8"),
  "gallery-8": () => renderGalleryInvitation("travel-future-large"),
  "travel-future-large": () => renderTravelGallery(8, "future", "large", "handoff-8"),
  "handoff-8": () => renderHandoff(8, "thursday-lock"),
  "thursday-lock": () => renderDayLock("thursday"),
  "travel-past-large": () => renderTravel("past", "large", "friday-returned"),
  "friday-returned": () => { app.innerHTML = `<section class="paper-card screen">${rainbowGuide("Bon. Revenons à aujourd’hui.")}${button("Continuer", "continue")}</section>`; bindAction("continue", () => navigate("geo", { advance: true })); },
  geo: renderGeo,
  departure: () => {
    if (state.awaitingFlightReopen) {
      app.innerHTML = page("À bientôt là-haut.", `<p>Le carnet t’attendra.</p>${button("Rouvrir le carnet", "reopen-book")}`);
      return bindAction("reopen-book", () => { state.awaitingFlightReopen = false; saveState(); navigate("flight", { advance: true }); });
    }
    app.innerHTML = page("Le départ", `<p>Tu es au bon endroit… prête à voyager ?</p>${rainbowGuide("On se retrouve là-haut.")}${button("Refermer le carnet", "close-book")}`);
    bindAction("close-book", () => { state.awaitingFlightReopen = true; saveState(); renderers.departure(); });
  },
  flight: () => { app.innerHTML = page("Quelque part au-dessus des nuages", `<div class="plane" aria-hidden="true">✈</div>${button("Poursuivre le voyage", "continue")}`, { guide: "Tu vois ? Même les nuages ont des pages." }); bindAction("continue", () => navigate("challenge-2", { advance: true })); },
  "challenge-2": () => state.completedChallenges[2] ? navigate("analysis-2", { advance: true }) : renderChoiceSequence({ chapterId: 2, title: "Notre profil de couple", items: CONFIG.chapters[2].questions, onDone: () => completeChallenge(2, "analysis-2") }),
  "analysis-2": renderAnalysis,
  "resolution-2": () => renderGalleryResolution(2, "Diagnostic", CONFIG.text.diagnostic, "Continuer", "gallery-2"),
  "gallery-2": () => renderGalleryInvitation("travel-past-medium"),
  "travel-past-medium": () => renderTravelGallery(2, "past", "medium", "handoff-2"),
  "handoff-2": () => renderHandoff(2, "challenge-3"),
  "challenge-3": () => { if (state.completedChallenges[3]) return navigate("resolution-3", { advance: true }); const items = CONFIG.chapters[3].babyPhotos.map((photo) => ({ ...photo, prompt: "Lenny ou Milan ?", options: ["Lenny", "Milan"] })); renderChoiceSequence({ chapterId: 3, title: "Qui est qui ?", items, revealCorrect: true, decorate: (photo) => photo.src ? `<img class="baby-photo" src="${photo.src}" alt="${photo.alt}" />` : `<div class="baby-photo baby-photo--placeholder">${photo.alt}</div>`, onDone: () => completeChallenge(3, "resolution-3") }); },
  "resolution-3": () => renderGalleryResolution(3, "Bon…", "Tu reconnais quand même tes enfants.", "Continuer", "gallery-3"),
  "gallery-3": () => renderGalleryInvitation("travel-future-small"),
  "travel-future-small": () => renderTravelGallery(3, "future", "small", "handoff-3"),
  "handoff-3": () => renderHandoff(3, "friday-lock"),
  "friday-lock": () => renderDayLock("friday"),
  "saturday-intro": () => { app.innerHTML = page("Bonjour, samedi", `<p>Tu as bien dormi ? Moi, j’ai rêvé d’un camping-car.</p>${button("Prendre la route", "continue")}`); bindAction("continue", () => navigate("challenge-5", { advance: true })); },
  "challenge-5": () => { app.innerHTML = page("À toi de nous emmener à Stockholm", `<p>Il n’y a pas de bonne route vers le futur.</p><div id="roadTrip"></div>`); renderRoadTrip(app.querySelector("#roadTrip"), CONFIG.chapters[5].routeEvents, () => completeChallenge(5, "resolution-5")); },
  "resolution-5": () => renderGalleryResolution(5, "Voilà. On y est.", "L’arc-en-ciel prétend qu’il avait tout prévu.", "Continuer", "reveal-5"),
  "reveal-5": () => renderResolution("Une vie possible.", "", "Regarder", "gallery-5"),
  "gallery-5": () => renderGalleryInvitation("travel-future-small-5"),
  "travel-future-small-5": () => renderTravelGallery(5, "future", "small", "handoff-5"),
  "handoff-5": () => renderHandoff(5, "challenge-6"),
  "challenge-6": () => state.completedChallenges[6] ? navigate("resolution-6", { advance: true }) : renderChoiceSequence({ chapterId: 6, title: "Magie, histoire… ou les deux ?", items: CONFIG.chapters[6].questions.map((item) => ({ ...item, options: ["Magie", "Histoire", "Les deux"] })), revealCorrect: true, onDone: () => completeChallenge(6, "resolution-6") }),
  "resolution-6": () => renderGalleryResolution(6, "Finalement…", "Pourquoi choisir ?", "Continuer", "reveal-6"),
  "reveal-6": () => renderResolution("Une autre vie possible.", "", "Regarder", "gallery-6"),
  "gallery-6": () => renderGalleryInvitation("travel-future-medium-6"),
  "travel-future-medium-6": () => renderTravelGallery(6, "future", "medium", "handoff-6"),
  "handoff-6": () => renderHandoff(6, "challenge-7"),
  "challenge-7": () => { app.innerHTML = page("Une minute en famille", `<p>Les règles changeront sûrement encore.</p><div id="familyGame"></div>`); cleanupCurrentScreen = renderFamilyGame(app.querySelector("#familyGame"), () => completeChallenge(7, "resolution-7")); },
  "resolution-7": () => renderGalleryResolution(7, "Bon.", "Pour les règles, on verra plus tard.", "Continuer", "gallery-7"),
  "gallery-7": () => renderGalleryInvitation("travel-future-medium-7"),
  "travel-future-medium-7": () => renderTravelGallery(7, "future", "medium", "handoff-7"),
  "handoff-7": () => renderHandoff(7, "travel-past-large-return"),
  "travel-past-large-return": () => renderTravel("past", "large", "saturday-evening"),
  "saturday-evening": renderSaturdayEvening,
  majorca: renderMajorca,
  order: () => { app.innerHTML = page("Huit images, un seul fil", `<p>Tu as maintenant huit images entre les mains. Elles racontent la même histoire. Mais pas dans le bon ordre.</p><p><strong>Remets notre voyage dans le temps.</strong></p>${button("Je pense avoir trouvé l’ordre", "continue")}`, { guide: "Pas d’écran à déplacer. Cette fois, l’histoire se tient vraiment entre tes mains." }); bindAction("continue", () => { state.orderAnnounced = true; saveState(); navigate("letters-clue", { advance: true }); }); },
  "letters-clue": () => { app.innerHTML = page("Bien.", `<p>Maintenant, regarde-les encore une fois.</p><p>Elles ont quelque chose à te dire.</p>${button("Je les ai", "continue")}`); bindAction("continue", () => { state.lettersFound = true; saveState(); navigate("password", { advance: true }); }); },
  password: () => { app.innerHTML = page("Huit lettres", `<input id="password" class="text-input text-input--code" autocomplete="off" autocapitalize="characters" maxlength="16" aria-label="Huit lettres" />${button("Ouvrir la dernière page", "unlock")}<p class="feedback" role="status"></p>`); const submit = () => { if (normalize(app.querySelector("#password").value) === normalize(CONFIG.password)) { state.finalUnlocked = true; saveState(); navigate("final", { advance: true }); } else app.querySelector(".feedback").textContent = "Regarde-les encore une fois."; }; bindAction("unlock", submit, false); app.querySelector("#password").addEventListener("keydown", (event) => { if (event.key === "Enter") submit(); }); },
  final: () => { if (!state.finalUnlocked && !debugMode) return renderLocked(); app.innerHTML = page("La boîte", `<div class="box-placeholder"><span>PLACEHOLDER — IMAGE DE LA BOÎTE</span><b>DATE À REMPLACER</b></div>`, { kicker: "La dernière page", guide: "Tout ce chemin pour revenir à ce qui était là depuis le début." }); },
};

function renderLocked() {
  app.innerHTML = page("Cette page est encore fermée", `${button("Reprendre le voyage", "resume")}`, { guide: "Chaque page arrive à son heure." });
  bindAction("resume", () => navigate(state.currentStep));
}

function render(id) {
  if (rendering) return;
  rendering = true;
  try {
    cleanupCurrentScreen?.(); cleanupCurrentScreen = null;
    if (!debugMode && stepIndex(id) > currentStepIndex()) id = state.currentStep;
    updateChrome(id); scrollTo(0, 0);
    (renderers[id] || renderers[state.currentStep] || renderers.welcome)();
  } catch (error) {
    console.error(error);
    app.innerHTML = page("Le carnet a perdu sa page", `<p>Ta progression est toujours là.</p>${button("Retrouver ma page", "recover")}`);
    bindAction("recover", () => navigate(state.currentStep));
  } finally { rendering = false; }
}

function setupDebug() {
  if (!debugMode) return;
  debugPanel.hidden = false;
  debugPanel.querySelector("#debugVersion").textContent = `Version ${APP_VERSION}`;
  const details = debugPanel.querySelector("details");
  details.addEventListener("toggle", () => debugPanel.classList.toggle("debug-panel--open", details.open));
  const select = debugPanel.querySelector("#debugStep");
  select.innerHTML = STEPS.map((step) => `<option value="${step.id}">${step.id}</option>`).join("");
  debugPanel.querySelector("#debugGo").addEventListener("click", () => {
    stopActiveSoundtrack();
    state.currentStep = select.value;
    navigate(select.value);
  });
  debugPanel.querySelector("#debugUnlock").addEventListener("click", () => {
    stopActiveSoundtrack();
    CONFIG.routeOrder.forEach((id) => { state.completedChallenges[id] = true; state.galleryViewed[id] = true; state.illustrations[id] = true; });
    Object.assign(state, { started: true, geoRiddleSolved: true, geoValidated: true, orderAnnounced: true, lettersFound: true, finalUnlocked: true, majorcaMomentSeen: true, currentStep: "final" });
    navigate("final");
  });
  debugPanel.querySelector("#debugReset").addEventListener("click", () => { stopActiveSoundtrack(); localStorage.removeItem(CONFIG.storageKey); state = defaultState(); history.replaceState(null, "", `${location.pathname}?debug=1#welcome`); render("welcome"); });
}

window.addEventListener("hashchange", () => render(location.hash.slice(1) || state.currentStep));
setupDebug();
const initial = location.hash.slice(1);
navigate(initial && (debugMode || stepIndex(initial) <= currentStepIndex()) ? initial : state.currentStep, { replace: !initial });

if ("serviceWorker" in navigator) window.addEventListener("load", () => {
  let refreshing = false;
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (refreshing) return;
    refreshing = true;
    location.reload();
  });
  navigator.serviceWorker.register("./service-worker.js").then((registration) => registration.update()).catch((error) => console.warn("Cache offline indisponible", error));
});
