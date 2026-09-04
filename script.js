import { APP_VERSION, CONFIG, STEPS } from "./config.js?v=1.4.11";
import { renderChallengeOne } from "./challenge-one.js?v=1.4.8";
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
const searchParams = new URLSearchParams(location.search);
const debugMode = searchParams.get("debug") === "1";
const displayModeOverride = debugMode ? searchParams.get("display") : null;
const stateStorageKey = debugMode ? `${CONFIG.storageKey}-debug` : CONFIG.storageKey;
const SPECIAL_ROUTES = new Set(["install", "book-closed", "book-open"]);
const BROWSER_PREVIEW_KEY = "voyage-majorque-browser-preview";
let cleanupCurrentScreen = null;
let rendering = false;
let activeSoundtrack = null;

const defaultState = () => ({
  version: CONFIG.stateVersion,
  started: false,
  onboardingCompleted: false,
  currentStep: "welcome",
  completedChallenges: {},
  challengeOne: {
    started: false,
    phase: "intro",
    openedDoors: [],
    selectedRule: 1,
    revealLevel: 1,
    hintVisible: false,
  },
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
  newMemoryChapterId: null,
  debugDateLocked: false,
});

function loadState() {
  try {
    const stored = JSON.parse(localStorage.getItem(stateStorageKey));
    if (stored?.version !== CONFIG.stateVersion) return defaultState();
    const migrated = { ...defaultState(), ...stored };
    migrated.challengeOne = { ...defaultState().challengeOne, ...(stored.challengeOne || {}) };
    migrated.challengeOne.openedDoors = [...new Set((migrated.challengeOne.openedDoors || []).map(Number).filter((id) => id >= 1 && id <= 6))];
    // Les personnes ayant déjà commencé en V1.3 ne doivent pas revoir l'onboarding.
    if (typeof stored.onboardingCompleted !== "boolean") {
      migrated.onboardingCompleted = Boolean(stored.started || stored.currentStep !== "welcome");
      if (migrated.onboardingCompleted && ["welcome", "prologue"].includes(migrated.currentStep)) migrated.currentStep = "challenge-1";
    }
    return migrated;
  } catch { return defaultState(); }
}

let state = loadState();
// Le debug persiste dans une clé dédiée et ne lit ni n'écrit jamais la progression normale.
const saveState = () => localStorage.setItem(stateStorageKey, JSON.stringify(state));
const stepIndex = (id) => STEPS.findIndex((step) => step.id === id);
const currentStepIndex = () => Math.max(0, stepIndex(state.currentStep));
const routeExists = (id) => stepIndex(id) >= 0 || SPECIAL_ROUTES.has(id);

export function isStandaloneApp() {
  if (displayModeOverride === "pwa") return true;
  if (displayModeOverride === "browser") return false;
  return matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
}

function browserPreviewAllowed() {
  try { return sessionStorage.getItem(BROWSER_PREVIEW_KEY) === "1"; }
  catch { return false; }
}

function allowBrowserPreview() {
  try { sessionStorage.setItem(BROWSER_PREVIEW_KEY, "1"); }
  catch {}
}

function advanceStateTo(id) {
  if (stepIndex(id) > currentStepIndex()) state.currentStep = id;
}

function navigate(id, { advance = false, replace = false } = {}) {
  if (!routeExists(id)) id = state.currentStep;
  if (advance && stepIndex(id) >= 0) { advanceStateTo(id); saveState(); }
  if (!debugMode && stepIndex(id) >= 0 && stepIndex(id) > currentStepIndex()) id = state.currentStep;
  const hash = `#${id}`;
  if (replace) history.replaceState(null, "", hash);
  else if (location.hash !== hash) location.hash = id;
  else render(id);
  if (replace) render(id);
}

function updateChrome(id) {
  const index = Math.max(0, stepIndex(id));
  header.hidden = ["install", "welcome", "prologue", "book-closed", "book-open", "challenge-1"].includes(id);
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

function renderInstallGuide() {
  app.innerHTML = `<section class="install-screen screen">
    <img class="install-screen__icon" src="assets/icons/apple-touch-icon-v1.png" alt="" />
    <p class="kicker">Avant d’ouvrir le carnet</p>
    <h1>Installe-le sur ton iPhone</h1>
    <p>Cette histoire est faite pour être vécue comme une vraie webapp, depuis ton écran d’accueil.</p>
    <ol class="install-steps">
      <li><span aria-hidden="true">1</span><p>Dans Safari, touche les <strong>…</strong> en bas à droite.</p></li>
      <li><span aria-hidden="true">2</span><p>Choisis <strong>Partager</strong>.</p></li>
      <li><span aria-hidden="true">3</span><p>Choisis <strong>Sur l’écran d’accueil</strong>.</p></li>
      <li><span aria-hidden="true">4</span><p>Touche <strong>Ajouter</strong>, puis ouvre le carnet depuis sa nouvelle icône.</p></li>
    </ol>
    ${button("Continuer quand même dans Safari", "browser-preview", "install-screen__fallback")}
  </section>`;
  bindAction("browser-preview", () => { allowBrowserPreview(); navigate("welcome", { replace: true }); });
}

function renderIntro() {
  state.started = true;
  saveState();
  document.body.classList.add("intro-weather--active");
  app.innerHTML = `<section class="intro-stage screen" aria-label="Le carnet se réveille"><div class="intro-stage__rainbow" aria-hidden="true"><i></i><i></i><i></i><i></i></div></section>`;
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const timer = setTimeout(() => navigate("prologue", { advance: true, replace: true }), reducedMotion ? 50 : 2600);
  cleanupCurrentScreen = () => { clearTimeout(timer); document.body.classList.remove("intro-weather--active"); };
}

function renderPrologue() {
  app.innerHTML = page("L’esprit du carnet", `${CONFIG.text.prologue.map((line) => `<p>${line}</p>`).join("")}${button("Commencer le voyage", "start-journey")}`, { guide: "Bonjour Marjolaine." });
  bindAction("start-journey", () => {
    state.started = true;
    state.onboardingCompleted = true;
    state.currentStep = "challenge-1";
    saveState();
    navigate("book-closed", { replace: true });
  });
}

const unlockedMemoryIds = () => CONFIG.routeOrder.filter((id) => Boolean(state.galleryViewed[id] && CONFIG.chapters[id]?.gallery));

function hubCopy() {
  const firstChallenge = state.currentStep === "challenge-1" && !state.completedChallenges[1];
  if (firstChallenge) return { message: "Bon… maintenant que les présentations sont faites. Tu es prête pour ton premier défi ?", cta: "Je suis prête" };
  if (state.currentStep === "thursday-lock" && !dayIsOpen(CONFIG.schedule.fridayUnlockDate)) {
    return { message: "C’est tout pour aujourd’hui. Garde le carnet près de toi, une nouvelle page s’ouvrira demain matin.", cta: null };
  }
  if (state.currentStep === "friday-lock" && !dayIsOpen(CONFIG.schedule.saturdayUnlockDate)) {
    return { message: "Le carnet a encore quelque chose à te raconter, mais pas aujourd’hui. Profite du vrai voyage ; on reprend demain.", cta: null };
  }
  if (state.finalUnlocked || state.currentStep === "final") return { message: "La dernière page est ouverte.", cta: "La relire" };
  if (state.awaitingFlightReopen && state.currentStep === "departure") return { message: "Je t’avais dit que le carnet t’attendrait là-haut.", cta: "Rouvrir le carnet" };
  return { message: "Une nouvelle page t’attend quand tu seras prête.", cta: "Continuer le voyage" };
}

function notebookDecorations(count) {
  const tabs = Array.from({ length: Math.min(4, count) }, (_, index) => `<i class="closed-notebook__tab closed-notebook__tab--${index + 1}"></i>`).join("");
  const papers = Array.from({ length: Math.min(3, Math.max(0, count - 1)) }, (_, index) => `<i class="closed-notebook__paper closed-notebook__paper--${index + 1}"></i>`).join("");
  return `${tabs}${papers}${count ? '<span class="closed-notebook__photo" aria-hidden="true"></span>' : ""}${count >= 4 ? '<span class="closed-notebook__flower" aria-hidden="true">✿</span>' : ""}`;
}

function renderClosedNotebook() {
  const memories = unlockedMemoryIds();
  const status = hubCopy();
  const enriched = Boolean(state.newMemoryChapterId);
  const book = `<span class="closed-notebook closed-notebook--level-${Math.min(4, memories.length)}${enriched ? " closed-notebook--new-memory" : ""}">
    ${notebookDecorations(memories.length)}
    <span class="closed-notebook__pages"></span>
    <span class="closed-notebook__cover"><span class="closed-notebook__rainbow" aria-hidden="true">⌒</span><strong>Notre carnet</strong><small>Marjo &amp; Vincent</small><span class="closed-notebook__strap"></span></span>
  </span>`;
  app.innerHTML = `<section class="notebook-hub screen">
    <div class="notebook-hub__guide">${rainbowGuide(status.message)}</div>
    ${memories.length ? `<button class="notebook-touch" type="button" data-action="open-notebook" aria-label="Ouvrir le carnet et revoir mes souvenirs">${book}<span>Toucher le carnet pour le feuilleter</span></button>` : `<div class="notebook-touch notebook-touch--still">${book}</div>`}
    ${status.cta ? button(status.cta, "continue-journey") : '<p class="notebook-hub__waiting">Le carnet se souviendra de l’endroit où vous vous êtes arrêtés.</p>'}
  </section>`;
  bindAction("open-notebook", () => navigate("book-open"));
  bindAction("continue-journey", () => navigate(state.currentStep));
  if (enriched) { state.newMemoryChapterId = null; saveState(); }
}

function renderMemoryCard(chapterId) {
  const chapter = CONFIG.chapters[chapterId];
  const image = chapter.gallery.find((item) => item.src);
  const visual = image ? `<img src="${image.src}" alt="" />` : '<span class="memory-card__landscape" aria-hidden="true"><i></i></span>';
  return `<button class="memory-card" type="button" data-memory="${chapterId}" aria-label="Revoir le souvenir ${chapter.title}">${visual}<strong>${chapter.title}</strong><small>Toucher pour se souvenir</small></button>`;
}

function renderOpenNotebook() {
  const memories = unlockedMemoryIds();
  const spreads = [];
  for (let index = 0; index < memories.length; index += 2) spreads.push(memories.slice(index, index + 2));
  const pages = spreads.map((spread) => `<section class="open-notebook__spread"><div class="open-notebook__page">${renderMemoryCard(spread[0])}<span class="paper-doodle" aria-hidden="true">⌒</span></div><div class="open-notebook__page">${spread[1] ? renderMemoryCard(spread[1]) : '<p class="notebook-soon">D’autres souvenirs arriveront bientôt…</p>'}</div></section>`).join("");
  app.innerHTML = `<section class="open-notebook screen">
    <header class="open-notebook__header"><div><p class="kicker">Carnet ouvert</p><h1>Mes souvenirs</h1></div><button class="open-notebook__close" type="button" data-action="close-notebook" aria-label="Refermer le carnet">Fermer <span aria-hidden="true">×</span></button></header>
    ${memories.length ? `<div class="open-notebook__track">${pages}</div><p class="open-notebook__hint">Fais glisser pour feuilleter les pages.</p>` : '<div class="open-notebook__empty"><p>Les premières pages attendent encore leur histoire.</p></div>'}
  </section>`;
  bindAction("close-notebook", () => navigate("book-closed"));
  app.querySelectorAll("[data-memory]").forEach((memory) => memory.addEventListener("click", () => openChapterGalleryReview(Number(memory.dataset.memory))));
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

function coupleProfileProgress() {
  const stored = state.answers["chapter-2"];
  if (!stored || Array.isArray(stored)) {
    state.answers["chapter-2"] = { questionIndex: 0, activePlayer: "marjolaine", marjolaine: [], vincent: [] };
  }
  const progress = state.answers["chapter-2"];
  progress.questionIndex = Math.min(CONFIG.chapters[2].questions.length, Math.max(0, Number(progress.questionIndex) || 0));
  progress.activePlayer = progress.activePlayer === "vincent" ? "vincent" : "marjolaine";
  progress.marjolaine = Array.isArray(progress.marjolaine) ? progress.marjolaine : [];
  progress.vincent = Array.isArray(progress.vincent) ? progress.vincent : [];
  return progress;
}

function renderCoupleProfileChallenge() {
  const questions = CONFIG.chapters[2].questions;
  const progress = coupleProfileProgress();
  if (progress.questionIndex >= questions.length) return completeChallenge(2, "analysis-2");
  const question = questions[progress.questionIndex];
  const playerName = progress.activePlayer === "marjolaine" ? "Marjolaine" : "Vincent";
  app.innerHTML = page("Notre profil de couple", `<div class="question-meta">${progress.questionIndex + 1} / ${questions.length}</div><p class="couple-player" data-couple-player>Réponse de ${playerName}</p><h2>${question.prompt}</h2><div class="choice-list">${question.options.map((choice) => `<button class="choice couple-choice" type="button" data-profile="${choice.profile}"><span class="couple-choice__symbol" aria-hidden="true">${choice.symbol}</span><span>${choice.text}</span></button>`).join("")}</div>`);
  app.querySelectorAll("[data-profile]").forEach((choice) => choice.addEventListener("click", () => {
    const activePlayer = progress.activePlayer;
    progress[activePlayer][progress.questionIndex] = choice.dataset.profile;
    if (activePlayer === "marjolaine") {
      progress.activePlayer = "vincent";
      saveState();
      app.querySelector("[data-couple-player]").textContent = "Réponse de Vincent";
      return;
    }
    progress.questionIndex += 1;
    progress.activePlayer = "marjolaine";
    saveState();
    if (progress.questionIndex >= questions.length) completeChallenge(2, "analysis-2");
    else renderCoupleProfileChallenge();
  }));
}

function dominantCoupleProfile(answers) {
  const scores = { A: 0, B: 0, C: 0, D: 0 };
  answers.forEach((profile) => { if (profile in scores) scores[profile] += 1; });
  const highest = Math.max(...Object.values(scores));
  for (let index = answers.length - 1; index >= 0; index -= 1) {
    if (scores[answers[index]] === highest) return answers[index];
  }
  return "A";
}

function renderCoupleProfileResults() {
  const progress = coupleProfileProgress();
  const profiles = CONFIG.chapters[2].profiles;
  const marjolaineKey = dominantCoupleProfile(progress.marjolaine);
  const vincentKey = dominantCoupleProfile(progress.vincent);
  const result = (name, key) => `<article class="couple-result"><h2>${name}</h2><div class="couple-result__symbol" aria-hidden="true">${profiles[key].symbol}</div><h3>${profiles[key].name}</h3><p>${profiles[key].description}</p></article>`;
  const crossedComment = marjolaineKey === vincentKey ? "Même profil.<br>Ça explique probablement beaucoup de choses." : "Pas tout à fait le même profil…<br>mais visiblement la même équipe.";
  app.innerHTML = page("Votre profil de couple", `<div class="couple-results">${result("Marjolaine", marjolaineKey)}${result("Vincent", vincentKey)}</div><p class="couple-results__comment">${crossedComment}</p><p class="couple-results__diagnostic">${CONFIG.text.diagnostic}</p>${button("Continuer", "continue")}`);
  bindAction("continue", () => navigate("gallery-2", { advance: true }));
}

function renderBlindTest({ chapterId, songs, onDone }) {
  const progressKey = `blind-test-${chapterId}`;
  let index = Math.min(Number(state.answers[progressKey]) || 0, songs.length - 1);
  const drawSong = () => {
    const progress = songs.map((_, songIndex) => `<span class="blind-test-progress__dot${songIndex === index ? " blind-test-progress__dot--active" : ""}"></span>`).join("");
    app.innerHTML = `<section class="paper-card screen blind-test-song"><p class="kicker">Défi 8</p><div class="blind-test-progress" aria-hidden="true">${progress}</div><h1>Chanson ${index + 1}</h1><h2>À toi de jouer !</h2><img class="blind-test-song__art" src="assets/challenge-8/v1-4-10/music-note.png" alt="" aria-hidden="true" /><p class="blind-test-song__copy">Vincent lance la musique sur la playlist<br>Deezer, écoute bien…</p>${button("J’ai trouvé !", "reveal-song")}</section>`;
    bindAction("reveal-song", () => {
      const song = songs[index];
      app.innerHTML = page("Révélation", `<div class="notice"><p><strong>Titre</strong><br>${song.title}</p><p><strong>Artiste</strong><br>${song.artist}</p></div>${button("Chanson suivante", "next-song")}`);
      bindAction("next-song", () => {
        index += 1;
        state.answers[progressKey] = index;
        saveState();
        if (index >= songs.length) onDone();
        else drawSong();
      });
    });
  };
  app.innerHTML = page("Le blind test", `<p class="blind-test-intro__subtitle">Des chansons qui ont accompagné<br>notre histoire.</p><img class="blind-test-intro__art" src="assets/challenge-8/v1-4-10/guitar.png" alt="" aria-hidden="true" /><p class="blind-test-intro__copy">Écoute bien, fais confiance<br>à ta mémoire… et à ton cœur.</p>${button("Commencer le blind test", "start-blind-test")}`, { kicker: "Défi 8", className: "blind-test-intro" });
  bindAction("start-blind-test", drawSong);
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

function openChapterGalleryReview(chapterId) {
  const chapter = CONFIG.chapters[chapterId];
  if (!state.galleryViewed[chapterId] || !chapter?.gallery) return navigate("book-open", { replace: true });
  const namedGallery = chapterId === 1 || chapterId === 5;
  cleanupCurrentScreen = openGalleryViewer({
    accessibleLabel: `Souvenir — ${chapter.title}`,
    images: chapter.gallery,
    reveal: false,
    placeholderLabel: namedGallery ? `PLACEHOLDER — ${chapter.title.toUpperCase()}` : "PLACEHOLDER — IMAGE À REMPLACER",
    onClose: () => {
      cleanupCurrentScreen = null;
      stopActiveSoundtrack();
      navigate("book-open", { replace: true });
    },
  });
}

function renderHandoff(chapterId, nextStep, message = "Vincent a quelque chose à te remettre.") {
  app.innerHTML = `<section class="paper-card screen">${rainbowGuide("Il en reste une.")}<p>${message}</p>${button("Je l’ai", "have-it")}</section>`;
  bindAction("have-it", () => {
    state.illustrations[chapterId] = true;
    advanceStateTo(nextStep);
    state.newMemoryChapterId = chapterId;
    saveState();
    navigate("book-closed", { replace: true });
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
const dayIsOpen = (date) => (debugMode ? !state.debugDateLocked : todayKey() >= date);

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
  install: renderInstallGuide,
  welcome: renderIntro,
  prologue: renderPrologue,
  "book-closed": renderClosedNotebook,
  "book-open": renderOpenNotebook,
  "challenge-1": () => {
    if (state.completedChallenges[1]) return navigate("gallery-1", { advance: true });
    cleanupCurrentScreen = renderChallengeOne(app, {
      progress: state.challengeOne,
      rules: CONFIG.challengeOne.rules,
      debug: debugMode,
      onChange: (progress) => { state.challengeOne = progress; saveState(); },
      onComplete: () => {
        state.completedChallenges[1] = true;
        state.currentStep = "gallery-1";
        saveState();
        navigate("gallery-1", { advance: true });
      },
    });
  },
  "resolution-1": () => renderGalleryResolution(1, "Tu t’en souviens.", "Alors laisse-moi te montrer ce que tu n’avais jamais vu.", "Découvrir le souvenir", "gallery-1"),
  "gallery-1": () => renderGalleryInvitation("travel-past-medium-1"),
  "travel-past-medium-1": () => renderTravelGallery(1, "past", "medium", "handoff-1"),
  "handoff-1": () => renderHandoff(1, "challenge-8"),
  "challenge-8": () => state.completedChallenges[8] ? navigate("resolution-8", { advance: true }) : renderBlindTest({ chapterId: 8, songs: CONFIG.chapters[8].songs, onDone: () => completeChallenge(8, "resolution-8") }),
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
  "challenge-2": () => state.completedChallenges[2] ? navigate("analysis-2", { advance: true }) : renderCoupleProfileChallenge(),
  "analysis-2": renderAnalysis,
  "resolution-2": renderCoupleProfileResults,
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
    document.body.classList.remove("intro-weather--active");
    if (!debugMode && stepIndex(id) >= 0 && stepIndex(id) > currentStepIndex()) id = state.currentStep;
    updateChrome(id); scrollTo(0, 0);
    (renderers[id] || renderers[state.currentStep] || renderers["book-closed"])();
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
  const debugRoutes = ["install", "book-closed", "book-open", ...STEPS.map((step) => step.id)];
  select.innerHTML = [...new Set(debugRoutes)].map((id) => `<option value="${id}">${id}</option>`).join("");
  debugPanel.querySelector("#debugGo").addEventListener("click", () => {
    stopActiveSoundtrack();
    state.debugDateLocked = false;
    if (stepIndex(select.value) >= 0) state.currentStep = select.value;
    saveState();
    navigate(select.value);
  });
  debugPanel.querySelector("#debugUnlock").addEventListener("click", () => {
    stopActiveSoundtrack();
    CONFIG.routeOrder.forEach((id) => {
      state.completedChallenges[id] = true;
      state.illustrations[id] = true;
      if (CONFIG.chapters[id]?.gallery) state.galleryViewed[id] = true;
    });
    Object.assign(state, { started: true, onboardingCompleted: true, geoRiddleSolved: true, geoValidated: true, orderAnnounced: true, lettersFound: true, finalUnlocked: true, majorcaMomentSeen: true, currentStep: "final", debugDateLocked: false });
    saveState();
    navigate("final");
  });
  debugPanel.querySelector("#debugOnboarding").addEventListener("click", () => {
    stopActiveSoundtrack();
    Object.assign(state, { started: false, onboardingCompleted: false, currentStep: "welcome" });
    saveState();
    navigate("welcome", { replace: true });
  });
  debugPanel.querySelector("#debugBook").addEventListener("click", () => navigate("book-closed"));
  debugPanel.querySelector("#debugWait").addEventListener("click", () => {
    state.debugDateLocked = true;
    state.onboardingCompleted = true;
    state.currentStep = ["thursday-lock", "friday-lock"].includes(select.value) ? select.value : "thursday-lock";
    saveState();
    navigate("book-closed", { replace: true });
  });

  const ruleSelect = debugPanel.querySelector("#debugChallengeOneRule");
  const stageSelect = debugPanel.querySelector("#debugChallengeOneStage");
  debugPanel.querySelector("#debugChallengeOneApply").addEventListener("click", () => {
    stopActiveSoundtrack();
    const selectedRule = Number(ruleSelect.value);
    const stage = stageSelect.value;
    const prerequisites = selectedRule === 1 ? [] : [1];
    const presets = {
      intro: { phase: "intro", openedDoors: [], revealLevel: 1, hintVisible: false },
      doors: { phase: "doors", openedDoors: [], revealLevel: 1, hintVisible: false },
      level1: { phase: "rule", openedDoors: prerequisites, revealLevel: 1, hintVisible: false },
      level2: { phase: "rule", openedDoors: prerequisites, revealLevel: 2, hintVisible: false },
      level3: { phase: "rule", openedDoors: prerequisites, revealLevel: 3, hintVisible: false },
      hint: { phase: "rule", openedDoors: prerequisites, revealLevel: 3, hintVisible: true },
      speak: { phase: "speak", openedDoors: prerequisites, revealLevel: 3, hintVisible: false },
      reward: { phase: "reward", openedDoors: [...prerequisites, selectedRule], revealLevel: 3, hintVisible: false },
      one: { phase: "doors", openedDoors: [1], revealLevel: 1, hintVisible: false },
      five: { phase: "doors", openedDoors: [1, 2, 3, 4, 5], revealLevel: 1, hintVisible: false },
      six: { phase: "doors", openedDoors: [1, 2, 3, 4, 5, 6], revealLevel: 1, hintVisible: false },
    };
    state.challengeOne = { ...defaultState().challengeOne, started: stage !== "intro", selectedRule, ...presets[stage] };
    state.completedChallenges[1] = false;
    Object.assign(state, { started: true, onboardingCompleted: true, currentStep: "challenge-1", debugDateLocked: false });
    saveState();
    navigate("challenge-1");
  });

  const memoriesSelect = debugPanel.querySelector("#debugMemories");
  const memoryIds = CONFIG.routeOrder.filter((id) => CONFIG.chapters[id]?.gallery);
  memoriesSelect.innerHTML = Array.from({ length: memoryIds.length + 1 }, (_, count) => `<option value="${count}">${count}</option>`).join("");
  memoriesSelect.value = String(unlockedMemoryIds().length);
  debugPanel.querySelector("#debugApplyMemories").addEventListener("click", () => {
    stopActiveSoundtrack();
    const count = Number(memoriesSelect.value);
    state.completedChallenges = {};
    state.galleryViewed = {};
    state.illustrations = {};
    memoryIds.slice(0, count).forEach((id) => {
      state.completedChallenges[id] = true;
      state.galleryViewed[id] = true;
      state.illustrations[id] = true;
    });
    const nextSteps = ["challenge-1", "challenge-8", "thursday-lock", "challenge-3", "friday-lock", "challenge-6", "challenge-7", "travel-past-large-return"];
    Object.assign(state, { started: true, onboardingCompleted: true, currentStep: nextSteps[count], newMemoryChapterId: count ? memoryIds[count - 1] : null, debugDateLocked: false });
    saveState();
    navigate("book-closed", { replace: true });
  });

  const displaySelect = debugPanel.querySelector("#debugDisplayMode");
  displaySelect.value = displayModeOverride === "pwa" ? "pwa" : displayModeOverride === "browser" ? "browser" : "auto";
  debugPanel.querySelector("#debugApplyDisplay").addEventListener("click", () => {
    const url = new URL(location.href);
    if (displaySelect.value === "auto") url.searchParams.delete("display");
    else url.searchParams.set("display", displaySelect.value);
    url.hash = displaySelect.value === "browser" ? "install" : "book-closed";
    location.replace(url);
  });
  debugPanel.querySelector("#debugRefresh").addEventListener("click", async (event) => {
    stopActiveSoundtrack();
    event.currentTarget.disabled = true;
    event.currentTarget.textContent = "Actualisation…";
    try {
      const registration = await navigator.serviceWorker?.getRegistration();
      await registration?.update();
    } catch {}
    const refreshUrl = new URL(location.href);
    refreshUrl.searchParams.set("refresh", Date.now().toString());
    location.replace(refreshUrl);
  });
  debugPanel.querySelector("#debugReset").addEventListener("click", () => {
    stopActiveSoundtrack();
    localStorage.removeItem(stateStorageKey);
    try { sessionStorage.removeItem(BROWSER_PREVIEW_KEY); } catch {}
    state = defaultState();
    history.replaceState(null, "", `${location.pathname}?debug=1&display=pwa#welcome`);
    render("welcome");
  });
}

window.addEventListener("hashchange", () => render(location.hash.slice(1) || state.currentStep));
setupDebug();
const initial = location.hash.slice(1);
let initialRoute;
if (!isStandaloneApp() && !browserPreviewAllowed()) initialRoute = "install";
else if (debugMode && initial && routeExists(initial)) initialRoute = initial;
else if (!state.onboardingCompleted) initialRoute = "welcome";
else initialRoute = "book-closed";
navigate(initialRoute, { replace: true });

if ("serviceWorker" in navigator) window.addEventListener("load", () => {
  let refreshing = false;
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (refreshing) return;
    refreshing = true;
    location.reload();
  });
  navigator.serviceWorker.register("./service-worker.js").then((registration) => registration.update()).catch((error) => console.warn("Cache offline indisponible", error));
});
