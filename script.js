import { pauses, pauseAfter, createJourneyProgress, activePause, pauseStatus, currentChapter, visibleChapters, winChallenge, continueConclusion, revealMemory, finishReward, resumeChapter, journeyHome } from "./journey-state.js?v=1.4.58";
import { renderD1PortraitGallery } from "./d1-portrait-gallery.js?v=1.4.49";
import { gameplayHeader } from "./gameplay-header.js?v=1.4.23";
import { challengeIntro } from "./challenge-intro.js?v=1.4.19";
import { renderChallengeSix, CHALLENGE_SIX_PREVIEWS } from "./challenge-six.js?v=1.4.57";
import { APP_VERSION, CONFIG, STEPS } from "./config.js?v=1.4.58";
import { renderChallengeOne } from "./challenge-one.js?v=1.4.57";
import { renderFamilyGame } from "./family-game.js?v=1.4.23";
import { createGallerySoundtrack } from "./gallery-soundtrack.js?v=1.2.1";
import { renderRoadTrip, ROAD_PREVIEWS } from "./road-trip.js?v=1.4.57";
let roadPreviewAt = null;

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
const OPENING_ROUTES = new Set(["welcome", "prologue", "notebook-intro"]);
const SPECIAL_ROUTES = new Set(["install", "book-open"]);
const BROWSER_PREVIEW_KEY = "voyage-majorque-browser-preview";
let cleanupCurrentScreen = null;
let rendering = false;
let activeSoundtrack = null;

const defaultState = () => ({
  version: CONFIG.stateVersion,
  started: false,
  onboardingCompleted: false,
  openingStep: "welcome",
  currentStep: "welcome",
  ...createJourneyProgress(),
  challengeOne: {
    started: false,
    phase: "intro",
    openedDoors: [],
    selectedRule: 1,
    revealLevel: 1,
    hintVisible: false,
  },
  answers: {},
  finalStage: null,
  passwordDraft: "",
  passwordError: false,
  huntCompleted: false,
  debugTimeOffsetMs: 0,
});

function loadState() {
  try {
    const stored = JSON.parse(localStorage.getItem(stateStorageKey));
    if (stored?.version !== CONFIG.stateVersion) return defaultState();
    const migrated = { ...defaultState(), ...stored };
    migrated.revealedScenes = stored.revealedScenes && typeof stored.revealedScenes === "object" && !Array.isArray(stored.revealedScenes) ? stored.revealedScenes : {};
    migrated.challengeOne = { ...defaultState().challengeOne, ...(stored.challengeOne || {}) };
    migrated.challengeOne.openedDoors = [...new Set((migrated.challengeOne.openedDoors || []).map(Number).filter((id) => id >= 1 && id <= 6))];
    if (stored.huntCompleted) migrated.finalStage = "complete";
    else if (!["password", "box"].includes(migrated.finalStage)) migrated.finalStage = stored.finalUnlocked ? "box" : stored.illustrations?.[4] ? "password" : null;
    migrated.passwordDraft = String(stored.passwordDraft || "").toUpperCase().replace(/[^A-Z]/g, "").slice(0, 8);
    delete migrated.orderAnnounced;
    delete migrated.lettersFound;
    delete migrated.finalUnlocked;
    delete migrated.majorcaMomentSeen;
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
  id = canonicalRoute(id);
  if (advance && stepIndex(id) >= 0) { advanceStateTo(id); saveState(); }
  id = canonicalRoute(id);
  const hash = `#${id}`;
  if (replace) history.replaceState(null, "", hash);
  else if (location.hash !== hash) location.hash = id;
  else render(id);
  if (replace) render(id);
}

function updateChrome(id) {
  const index = Math.max(0, stepIndex(id));
  const opening = OPENING_ROUTES.has(id);
  document.body.classList.toggle("opening-active", opening);
  header.hidden = opening || ["install", "book-open", "challenge-1", "password", "final-handover", "final"].includes(id);
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

// Opening artwork comes exclusively from the supplied asset ZIP.
const OPENING_ASSETS = "assets/opening/v1-4-18";

function openingPage(id, title, copy, label, { notebook = false, decoration = "03_fleur_bas_gauche" } = {}) {
  state.openingStep = id;
  saveState();
  app.innerHTML = `<section class="opening-screen opening-screen--${id}" aria-labelledby="opening-title">
    <img class="opening-rainbow" src="${OPENING_ASSETS}/02_arc_en_ciel.png" width="1506" height="616" alt="" />
    <h1 id="opening-title" tabindex="-1">${title}</h1>
    <div class="opening-copy">${copy.map((line) => `<p>${line}</p>`).join("")}</div>
    ${notebook ? `<div class="opening-notebook"><button class="opening-notebook__tap" type="button" data-action="opening-next" aria-label="Ouvrir le carnet" aria-describedby="opening-notebook-hint"><img class="opening-notebook__book" src="${OPENING_ASSETS}/05_carnet_ferme.png" width="398" height="441" alt="Un petit carnet en papier brun, noué d’une ficelle et orné de fleurs séchées" /></button><p id="opening-notebook-hint" class="opening-notebook__hint">Tape sur le carnet pour l’ouvrir.</p><img class="opening-notebook__heart" src="${OPENING_ASSETS}/06_coeur.png" width="157" height="229" alt="" /></div>` : `<img class="opening-botanical" src="${OPENING_ASSETS}/${decoration}.png" alt="" /><img class="opening-trail" src="${OPENING_ASSETS}/07_chemin_pointille.png" width="731" height="115" alt="" />`}
    ${notebook ? "" : `<div class="opening-actions">${button(label, "opening-next", "opening-button")}</div>`}
  </section>`;
  app.querySelector("#opening-title").focus({ preventScroll: true });
}

function renderIntro() {
  state.started = true;
  openingPage("welcome", "Bonjour Marjolaine.", CONFIG.text.opening.welcome, "Commencer le voyage →");
  bindAction("opening-next", () => navigate("prologue", { advance: true }));
}

function renderPrologue() {
  openingPage("prologue", "Pendant quelques jours…", CONFIG.text.opening.prologue, "C’est parti ! →", { decoration: "04_branche_feuille" });
  bindAction("opening-next", () => navigate("notebook-intro"));
}

function renderNotebookIntro() {
  openingPage("notebook-intro", "Un petit carnet t’attend.", CONFIG.text.opening.notebook, "Ouvrir le carnet →", { notebook: true });
  bindAction("opening-next", () => {
    state.started = true;
    state.onboardingCompleted = true;
    advanceStateTo("challenge-1");
    saveState();
    navigate("book-open", { replace: true });
  });
}

const challengeEntry = id => `challenge-${id}`;
const souvenirRoute = id => `gallery-${id}`;
const journeyNow = () => Date.now() + (debugMode ? Number(state.debugTimeOffsetMs) || 0 : 0);
const finalRoute = () => !state.illustrations[4] ? null : state.huntCompleted || state.finalStage === "complete" ? "final" : state.finalStage === "box" ? "final-handover" : "password";
function canonicalRoute(id) {
  if (id === "install") return id;
  if (!state.onboardingCompleted) return OPENING_ROUTES.has(id) ? id : state.openingStep;
  const ending = finalRoute();
  if (ending) return ending;
  const home = journeyHome(state);
  if (home !== "book-open") return home;
  if (id === "book-open") return id;
  const match = /^(challenge|conclusion|gallery|handoff)-([1-8])$/.exec(id);
  if (match) {
    const chapterId = Number(match[2]);
    const kind = match[1];
    if (!routeExists(id)) return home;
    if (kind === "challenge") return currentChapter(state) === chapterId && !state.completedChallenges[chapterId] ? id : home;
    if (kind === "conclusion") return home;
    return state.revealedMemories[chapterId] ? id : home;
  }
  return home;
}
function showNotebook() {
  const route = journeyHome(state);
  if (rendering) {
    history.replaceState(null, "", `#${route}`);
    updateChrome(route);
    return route === "book-open" ? renderFirstNotebook() : renderers[route]();
  }
  navigate(route, { replace: true });
}
function renderOpenNotebook() { return renderFirstNotebook(); }
const NOTEBOOK_ASSETS = "assets/notebook/v1-4-21";
function notebookPolaroid(unlocked = false) {
  const image = { src: CONFIG.chapters[1].memoryThumbnail };
  const face = unlocked && image?.src;
  return `<img src="${NOTEBOOK_ASSETS}/polaroid-back.png" width="645" height="772" alt="" />${face ? `<img class="journey-polaroid__face" src="${image.src}" alt="" />` : '<span class="journey-polaroid__question" aria-hidden="true">?</span>'}`;
}
function scrapbookPolaroid({ chapterId, face, annotation = "", action, flip = false }) {
  // Only explicit decor thumbnails belong in the notebook, never gallery images.
  const decor = chapterId === 2 ? CONFIG.chapters[2].gallery[0].decor : CONFIG.chapters[chapterId]?.memoryThumbnail;
  return `<div class="scrapbook-memory"><button class="scrapbook-polaroid${flip ? " scrapbook-polaroid--reveal" : ""}" type="button" data-chapter="${chapterId}" data-scrapbook-action="${action}" aria-label="${face ? `Revoir le souvenir ${annotation}` : "Découvrir le prochain souvenir"}">
    ${face ? (decor ? `<img class="scrapbook-polaroid__image" src="${decor}" alt="" />` : '<span class="scrapbook-polaroid__image" aria-hidden="true"></span>') : '<span class="scrapbook-polaroid__back" aria-hidden="true">?</span>'}
    <span class="scrapbook-polaroid__caption">${face ? annotation : ""}</span>
    ${flip ? '<span class="scrapbook-polaroid__reverse" aria-hidden="true"><span class="scrapbook-polaroid__back">?</span></span>' : ""}
  </button></div>`;
}

function renderFirstNotebook(selectedId = null) {
  const unlocked = Boolean(state.revealedMemories[1]);
  const revealId = revealMemory(state);
  if (revealId) saveState();
  const selected = !unlocked && selectedId === 1 ? { challengeId: 1 } : null;
  app.innerHTML = `<section class="journey-notebook${selected ? " journey-notebook--context" : " journey-notebook--scrapbook"}" aria-labelledby="journey-title">
    <div class="journey-notebook__tabs" aria-hidden="true"><i>♧</i><i>✧</i><i>△</i></div>
    ${selected ? '<button class="journey-notebook__back" type="button" data-action="notebook-back">← Notre voyage</button>' : '<h1 id="journey-title" tabindex="-1">NOTRE VOYAGE</h1>'}
    ${selected ? `<div class="journey-polaroid journey-polaroid--large">${notebookPolaroid()}</div><h1 id="journey-title" tabindex="-1">Ce souvenir t’attend…</h1><p class="journey-notebook__copy">Pour le découvrir, il va falloir relever un défi.<br>C’est le premier d’une belle aventure.</p>${button("Commencer le défi 1", "notebook-start", "journey-notebook__cta")}` : `<div class="scrapbook-memories">${visibleChapters(state).map(chapterId => scrapbookPolaroid({ chapterId, face: Boolean(state.revealedMemories[chapterId]), annotation: chapterId === 1 ? "Etre un couple" : CONFIG.chapters[chapterId].title, flip: chapterId === revealId && !state.illustrations[chapterId], action: state.revealedMemories[chapterId] ? "gallery" : chapterId === 1 ? "first-challenge" : "continue" })).join("")}</div><p class="journey-notebook__soon">Il y a encore beaucoup<br>de pages à remplir…</p>`}
    ${selected ? `<img class="journey-notebook__flower" src="${OPENING_ASSETS}/03_fleur_bas_gauche.png" alt="" />` : ""}
  </section>`;
  app.querySelector("#journey-title").focus({ preventScroll: true });
  // Later rewards must remain visible when the existing two-column grid grows.
  const activeCard = app.querySelector(".scrapbook-polaroid--reveal") || app.querySelector('[data-scrapbook-action="continue"]');
  if (activeCard && activeCard.getBoundingClientRect().bottom > innerHeight - 76) {
    activeCard.scrollIntoView({ block: "center", behavior: "instant" });
  }
  app.querySelectorAll("[data-scrapbook-action]").forEach(polaroid => polaroid.addEventListener("click", () => {
    const action = polaroid.dataset.scrapbookAction;
    const chapterId = Number(polaroid.dataset.chapter);
    if (action === "gallery") navigate(souvenirRoute(chapterId), { advance: true });
    else if (action === "first-challenge") renderFirstNotebook(1);
    else {
      navigate(challengeEntry(chapterId), { advance: true });
    }
  }));
  bindAction("notebook-back", () => renderFirstNotebook());
  bindAction("notebook-start", () => navigate(`challenge-${selected.challengeId}`));
}

// Canonical completion state shared by D1, its debug entry and its handover.
function markFirstChallengeCompleted() {
  state.started = true;
  state.onboardingCompleted = true;
  state.challengeOne = { ...state.challengeOne, started: true, phase: "doors", openedDoors: CONFIG.challengeOne.rules.map(rule => rule.id), revealLevel: 3, hintVisible: false };
}

function completeFirstChallenge() { completeChallenge(1); }

// Gameplay completion, conclusion, flip and reward completion are distinct stages.
function completeChallenge(id) {
  state.started = true;
  state.onboardingCompleted = true;
  if (id === 1) markFirstChallengeCompleted();
  winChallenge(state, id);
  advanceStateTo(`conclusion-${id}`);
  saveState();
  showNotebook();
}
function finishSouvenir(id) {
  if (!finishReward(state, id)) return showNotebook();
  if (id === 4) {
    state.finalStage = "password";
    advanceStateTo("password");
    saveState();
    return navigate("password", { replace: true });
  }
  const next = currentChapter(state);
  advanceStateTo(activePause(state)?.id || (next ? challengeEntry(next) : "password"));
  saveState();
  showNotebook();
}

function renderConclusion(id) {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const colors = ["#c97865", "#dca575", "#e0c783", "#a6b08b", "#92b4c0", "#b6a1bf"];
  const copy = CONFIG.text.conclusions[id];
  app.innerHTML = `<section class="paper-card blind-test-finale" data-conclusion="${id}">
    <svg class="blind-test-finale__rainbow" viewBox="0 0 160 80" aria-hidden="true">
      ${colors.map((color, i) => `<path d="M ${14+i*7} 70 A ${66-i*7} ${59-i*7} 0 0 1 ${146-i*7} 70" fill="none" stroke="${color}" stroke-width="5" stroke-linecap="round" style="--rainbow-delay:${i*75}ms" />`).join("")}
    </svg>
    <div class="blind-test-finale__message" ${reduced ? "" : "hidden"}>
      <p>${copy[0]}</p><p><em>${copy[1]}</em></p>
      ${button("Continuer", "finish-conclusion", id === 8 ? "journey-notebook__cta" : "d1-handover__cta")}
    </div>
  </section>`;
  const timer = reduced ? null : setTimeout(() => { app.querySelector(".blind-test-finale__message").hidden = false; }, 1400);
  cleanupCurrentScreen = () => clearTimeout(timer);
  bindAction("finish-conclusion", () => {
    continueConclusion(state, id);
    advanceStateTo(souvenirRoute(id));
    saveState();
    showNotebook();
  });
}

function renderPause(pause) {
  let previousStatus;
  let countdown;
  const update = () => {
    const now = journeyNow();
    const status = pauseStatus(state, pause, now);
    if (status !== previousStatus) {
      previousStatus = status;
      const ready = status === "READY_TO_RESUME";
      app.innerHTML = `<section class="journey-pause" data-pause="${pause.id}" data-pause-status="${status}">
        <img class="journey-pause__rainbow" src="${OPENING_ASSETS}/02_arc_en_ciel.png" alt="" />
        <div class="journey-pause__copy">${(ready ? ["Le carnet est prêt à reprendre le voyage."] : pause.text).map(line => `<p>${line}</p>`).join("")}</div>
        ${ready ? `<img class="journey-pause__front" src="${OPENING_ASSETS}/05_carnet_ferme.png" alt="Le carnet fermé, face avant" />` : '<div class="journey-pause__back" role="img" aria-label="Le carnet fermé, vu de dos"><span></span></div>'}
        ${!ready && pause.extra ? `<p class="journey-pause__extra">${pause.extra}</p>` : ""}
        ${ready ? button("Reprendre le voyage", "resume-chapter", "d1-handover__cta") : `<p class="journey-pause__target">${pause.label}</p><output class="journey-pause__countdown" role="timer" aria-label="Temps avant la reprise"></output>`}
      </section>`;
      countdown = app.querySelector(".journey-pause__countdown");
      bindAction("resume-chapter", () => {
        if (!resumeChapter(state, pause, journeyNow())) return update();
        advanceStateTo(challengeEntry(pause.next));
        saveState();
        showNotebook();
      });
    }
    if (countdown) {
      const seconds = Math.max(0, Math.ceil((Date.parse(pause.target) - now) / 1000));
      const days = Math.floor(seconds / 86400);
      const h = String(Math.floor(seconds % 86400 / 3600)).padStart(2, "0");
      const m = String(Math.floor(seconds % 3600 / 60)).padStart(2, "0");
      const s = String(seconds % 60).padStart(2, "0");
      countdown.textContent = `${days ? `${days} j · ` : ""}${h} h ${m} min ${s} s`;
    }
  };
  update();
  const timer = setInterval(update, 1000);
  window.addEventListener("pageshow", update);
  document.addEventListener("visibilitychange", update);
  cleanupCurrentScreen = () => { clearInterval(timer); window.removeEventListener("pageshow", update); document.removeEventListener("visibilitychange", update); };
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
    state.answers["chapter-2"] = { phase: "intro", questionIndex: 0, activePlayer: "marjolaine", marjolaine: [], vincent: [] };
  }
  const progress = state.answers["chapter-2"];
  progress.questionIndex = Math.min(CONFIG.chapters[2].questions.length, Math.max(0, Number(progress.questionIndex) || 0));
  progress.activePlayer = progress.activePlayer === "vincent" ? "vincent" : "marjolaine";
  progress.marjolaine = Array.isArray(progress.marjolaine) ? progress.marjolaine : [];
  progress.vincent = Array.isArray(progress.vincent) ? progress.vincent : [];
  if (!["intro", "questions", "results", "complete"].includes(progress.phase)) {
    progress.phase = progress.questionIndex >= CONFIG.chapters[2].questions.length ? "results" : progress.questionIndex > 0 || progress.marjolaine.length || progress.vincent.length ? "questions" : "intro";
  }
  return progress;
}

function renderCoupleProfile() {
  const progress = coupleProfileProgress();
  if (progress.phase === "results") return renderCoupleProfileResults();
  if (progress.phase === "questions") return renderCoupleProfileChallenge();
  return renderCoupleProfileIntro();
}

function renderCoupleProfileIntro() {
  app.innerHTML = challengeIntro({ id: 2, title: "Notre profil de couple", subtitle: "Depuis que nous sommes devenus trois, pas mal de choses ont changé.", image: "assets/challenge-2/v1-4-12/couple-profile-notebook.png", alt: "Un petit carnet ouvert et son crayon", copy: "Les nuits. Les journées.<br>Les habitudes. Le temps à deux.<br><br>Mais notre couple, lui, est toujours quelque part au milieu.<br><br>Alors il est temps de faire un test très scientifique. Évidemment.<br><br>12 questions. Deux réponses à chaque fois.<br>D'abord Marjolaine. Puis Vincent.", label: "Commencer le test", action: 'data-action="start-couple-profile"', footer: "coast" });
  bindAction("start-couple-profile", () => {
    const progress = coupleProfileProgress();
    progress.phase = "questions";
    saveState();
    renderCoupleProfileChallenge();
  });
}

function renderCoupleProfileChallenge() {
  cleanupCurrentScreen?.();
  let feedbackTimer = null;
  let pending = false;
  let disposed = false;
  cleanupCurrentScreen = () => { disposed = true; clearTimeout(feedbackTimer); };
  const questions = CONFIG.chapters[2].questions;
  const progress = coupleProfileProgress();
  if (progress.questionIndex >= questions.length) {
    progress.phase = "results";
    saveState();
    return renderCoupleProfileResults();
  }
  const question = questions[progress.questionIndex];
  const playerName = progress.activePlayer === "marjolaine" ? "Marjolaine" : "Vincent";
  const questionProgress = questions.map((_, index) => `<span class="blind-test-progress__dot${index === progress.questionIndex ? " blind-test-progress__dot--active" : ""}"></span>`).join("");
  app.innerHTML = `<section class="paper-card screen">${gameplayHeader({ theme: "Notre profil de couple", title: question.prompt, description: `<span data-couple-player>Réponse de ${playerName}</span>` })}<div class="blind-test-progress couple-profile-progress" role="img" aria-label="Question ${progress.questionIndex + 1} sur ${questions.length}">${questionProgress}</div><div class="choice-list">${question.options.map((choice) => `<button class="choice couple-choice paper-choice" type="button" aria-pressed="false" data-profile="${choice.profile}"><span class="couple-choice__symbol" aria-hidden="true">${choice.symbol}</span><span class="paper-choice__text">${choice.text}</span><span class="paper-choice__circle" aria-hidden="true"></span></button>`).join("")}</div></section>`;
  app.querySelectorAll("[data-profile]").forEach((choice) => choice.addEventListener("click", () => {
    if (pending || disposed) return;
    pending = true;
    choice.setAttribute("aria-pressed", "true");
    app.querySelectorAll("[data-profile]").forEach(node => { node.disabled = true; });
    feedbackTimer = setTimeout(() => {
      if (disposed) return;
      const activePlayer = progress.activePlayer;
      progress[activePlayer][progress.questionIndex] = choice.dataset.profile;
      if (activePlayer === "marjolaine") {
        progress.activePlayer = "vincent";
        saveState();
        app.querySelectorAll("[data-profile]").forEach((node) => {
          node.classList.remove("choice--selected");
          node.setAttribute("aria-pressed", "false");
          node.disabled = false;
          node.blur();
        });
        app.querySelector("[data-couple-player]").textContent = "Réponse de Vincent";
        pending = false;
        return;
      }
      progress.questionIndex += 1;
      progress.activePlayer = "marjolaine";
      saveState();
      if (progress.questionIndex >= questions.length) {
        progress.phase = "results";
        saveState();
        renderCoupleProfileResults();
      }
      else renderCoupleProfileChallenge();
    }, 500);
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
  bindAction("continue", () => {
    progress.phase = "complete";
    saveState();
    completeChallenge(2);
  });
}

function renderChallengeThreeIntro() {
  app.innerHTML = challengeIntro({ id: 3, title: "Qui est qui ?", subtitle: "Il y a quelques années,<br>tu connaissais déjà ce petit visage par cœur.", image: "assets/challenge-3/v1-4-13/baby-polaroids.png", alt: "Deux portraits de bébés en polaroids", copy: "Puis un deuxième est arrivé.<br><br>Et bizarrement…<br>ils ont décidé de beaucoup se ressembler.<br><br>Alors voyons si une maman peut vraiment<br>reconnaître ses enfants les yeux fermés.", label: "Commencer le défi", action: 'data-action="start-challenge-three"', footer: "balloon" });
  bindAction("start-challenge-three", renderChallengeThreeQuestions);
}

function renderChallengeThreeQuestions() {
  const photos = CONFIG.chapters[3].babyPhotos;
  const answers = [...(state.answers["chapter-3"] || [])];
  let index = Math.min(answers.length, photos.length - 1);
  const draw = () => {
    const photo = photos[index];
    const photoMarkup = photo.src ? `<img class="baby-photo" src="${photo.src}" alt="${photo.alt}" />` : `<div class="baby-photo baby-photo--placeholder">${photo.alt}</div>`;
    app.innerHTML = `<section class="paper-card screen challenge-three-question">${gameplayHeader({ theme: "Qui est qui ?", title: "Lenny ou Milan ?", description: "À toi de reconnaître qui se cache derrière chaque petit visage." })}${photoMarkup}<div class="choice-list"><button class="choice challenge-three-choice paper-choice" type="button" aria-pressed="false" data-baby-choice="Lenny"><span class="paper-choice__text">Lenny</span><span class="paper-choice__circle" aria-hidden="true"></span></button><button class="choice challenge-three-choice paper-choice" type="button" aria-pressed="false" data-baby-choice="Milan"><span class="paper-choice__text">Milan</span><span class="paper-choice__circle" aria-hidden="true"></span></button></div><div class="challenge-three-feedback" role="status"></div></section>`;
    app.querySelectorAll("[data-baby-choice]").forEach((choice) => choice.addEventListener("click", () => {
      const selected = choice.dataset.babyChoice;
      const correct = selected === photo.answer;
      app.querySelectorAll("[data-baby-choice]").forEach((node) => { node.disabled = true; });
      choice.classList.add("challenge-three-choice--selected");
      choice.setAttribute("aria-pressed", "true");
      answers[index] = selected;
      state.answers["chapter-3"] = answers;
      saveState();
      app.querySelector(".challenge-three-feedback").innerHTML = `<p><strong>${correct ? "Bien vu !" : "Presque !"}</strong><br>C’était ${photo.answer}.</p>${button("Suivant →", "next-baby-photo")}`;
      bindAction("next-baby-photo", () => {
        index += 1;
        if (index >= photos.length) completeChallenge(3);
        else draw();
      });
    }, { once: true }));
  };
  draw();
}

function renderBlindTest({ chapterId, songs, onDone }) {
  const progressKey = `blind-test-${chapterId}`;
  let index = Math.min(Number(state.answers[progressKey]) || 0, songs.length - 1);
  let transitionTimer = null;
  let disposed = false;
  cleanupCurrentScreen = () => { disposed = true; clearTimeout(transitionTimer); };
  const later = (callback, delay) => {
    transitionTimer = setTimeout(() => { if (!disposed) callback(); }, delay);
  };
  const cta = (label, action) => button(label, action, "journey-notebook__cta");
  const drawFinale = () => {
    state.answers[progressKey] = songs.length;
    saveState();
    onDone();
  };
  const drawSong = () => {
    const progress = songs.map((_, songIndex) => `<span class="blind-test-progress__dot${songIndex === index ? " blind-test-progress__dot--active" : ""}"></span>`).join("");
    app.innerHTML = `<section class="paper-card screen blind-test-song">${gameplayHeader({ theme: "Le blind test", title: `Chanson ${index + 1}`, description: "À toi de jouer !<br>Vincent lance la musique sur la playlist<br>Deezer, écoute bien…" })}<div class="blind-test-progress" aria-hidden="true">${progress}</div><img class="blind-test-song__art" src="assets/challenge-8/v1-4-26/music-notes.png" alt="" aria-hidden="true" />${cta("J’ai trouvé !", "reveal-song")}</section>`;
    bindAction("reveal-song", () => {
      const song = songs[index];
      const last = index === songs.length - 1;
      app.innerHTML = `<section class="paper-card screen blind-test-reveal"><h1>${song.title}</h1><p>${song.artist}</p>${last ? "" : cta("Chanson suivante", "next-song")}</section>`;
      if (last) {
        later(() => {
          if (matchMedia("(prefers-reduced-motion: reduce)").matches) return drawFinale();
          app.querySelector(".blind-test-reveal").classList.add("blind-test-reveal--leaving");
          later(drawFinale, 250);
        }, 1000);
      } else bindAction("next-song", () => {
        index += 1;
        state.answers[progressKey] = index;
        saveState();
        drawSong();
      });
    });
  };
  app.innerHTML = challengeIntro({ id: 8, title: "Le blind test", subtitle: "Bien sûr qu'il y aura un blind test !", image: "assets/challenge-8/v1-4-10/guitar.png", alt: "Une guitare dessinée dans le carnet", copy: "Ces chansons, tu les connais par cœur.<br><br>Je sais que tu vas les trouver.<br>Mais ce soir, je voulais simplement te les faire entendre.<br><br>Alors prends le temps de les écouter.<br><br>Elles ont accompagné notre histoire.", label: "Commencer le blind test", action: 'data-action="start-blind-test"', footer: "coast" });
  app.querySelector(".challenge-landing__label").remove();
  bindAction("start-blind-test", drawSong);
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

function openChapterGallery(chapterId, nextStep) {
  const chapter = CONFIG.chapters[chapterId];
  const namedGallery = [1, 2, 4, 5].includes(chapterId);
  const accessibleLabel = namedGallery ? `Images — ${chapter.title}` : "Fenêtre sur votre histoire";
  cleanupCurrentScreen = renderD1PortraitGallery(app, {
    accessibleLabel,
    images: chapter.gallery,
    revealedScenes: state.revealedScenes,
    sceneKeyPrefix: String(chapterId),
    onRevealScene: () => saveState(),
    reveal: true,
    soundtrack: activeSoundtrack,
    placeholderLabel: [4, 6].includes(chapterId) ? chapter.gallery[0].label : namedGallery ? `PLACEHOLDER — ${chapter.title.toUpperCase()}` : "PLACEHOLDER — IMAGE À REMPLACER",
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
  const namedGallery = [1, 2, 4, 5].includes(chapterId);
  cleanupCurrentScreen = renderD1PortraitGallery(app, {
    accessibleLabel: `Souvenir — ${chapter.title}`,
    images: chapter.gallery,
    revealedScenes: state.revealedScenes,
    sceneKeyPrefix: String(chapterId),
    onRevealScene: () => saveState(),
    reveal: false,
    placeholderLabel: [4, 6].includes(chapterId) ? chapter.gallery[0].label : namedGallery ? `PLACEHOLDER — ${chapter.title.toUpperCase()}` : "PLACEHOLDER — IMAGE À REMPLACER",
    onClose: () => {
      cleanupCurrentScreen = null;
      stopActiveSoundtrack();
      navigate("book-open", { replace: true });
    },
  });
}

function renderHandoff(chapterId) {
  const lastImage = chapterId === 4;
  app.innerHTML = `<section class="d1-handover" aria-labelledby="d1-handover-title">
    <h1 id="d1-handover-title">${lastImage ? "Ce dernier souvenir n’est pas tout à fait terminé." : "Ce souvenir n’est pas tout à fait terminé."}</h1>
    <div class="d1-handover__divider" aria-hidden="true"><img src="assets/gameplay/v1-4-23/divider-terracotta.png" alt="" /></div>
    <p>${lastImage ? "Vincent a une dernière image physique pour toi.<br>Elle cache la dernière lettre du mot de passe." : "Vincent a encore quelque chose pour toi."}</p>
    <img class="d1-handover__illustration" src="assets/challenge-1/v1-4-38/d1-handover.png" alt="Une enveloppe contenant un souvenir passe des mains de Vincent à celles de Marjolaine." />
    <button class="d1-handover__cta" type="button" data-action="have-it">Je l’ai</button>
  </section>`;
  bindAction("have-it", () => finishSouvenir(chapterId));
}

function renderChallengeSevenPayoff() {
  app.innerHTML = page("Bien joué !", `<p>Pommes 10 / 10. Le serpent a bien grandi.</p>${button("Continuer", "continue")}`);
  bindAction("continue", () => {
    state.answers["chapter-7"] = { phase: "complete" };
    saveState();
    completeChallenge(7);
  });
}

function renderChallengeSeven() {
  if (state.completedChallenges[7]) return showNotebook();
  if (state.answers["chapter-7"]?.phase === "payoff") return renderChallengeSevenPayoff();
  app.innerHTML = challengeIntro({ id: 7, title: "Le serpent", subtitle: "On vient de parler du futur.", image: "assets/challenge-7/v1-4-16/apple-snake.png", alt: "Un serpent composé de rondelles de pomme", copy: "Alors pour changer…<br>petit retour dans le passé.<br><br>À une époque où un téléphone<br>servait encore parfois à jouer à ça.<br><br>Fais grandir le serpent.<br>Dix pommes, et on continue.", label: "Jouer", action: 'data-action="play-snake"', footer: "path" });
  bindAction("play-snake", () => {
    app.innerHTML = `<section class="paper-card screen"><div id="familyGame"></div></section>`;
    cleanupCurrentScreen = renderFamilyGame(app.querySelector("#familyGame"), () => {
      state.answers["chapter-7"] = { phase: "payoff" };
      saveState();
      renderChallengeSevenPayoff();
    });
  });
}

function renderChallengeFour() {
  if (state.completedChallenges[4]) return showNotebook();
  const progress = state.answers["chapter-4"] ||= { phase: "intro" };
  if (progress.phase === "intro") {
    saveState();
    app.innerHTML = challengeIntro({ id: 4, title: "Le dernier souvenir", subtitle: "Jusqu'ici, le carnet t'a emmenée<br>dans ce qui a été…", image: `${OPENING_ASSETS}/02_arc_en_ciel.png`, alt: "", copy: "puis dans ce qui pourrait être.<br><br>Pour le dernier défi,<br>il n'y a plus besoin d'imaginer quoi que ce soit.<br><br>Il suffit de regarder devant toi.", label: "Découvrir le défi", action: 'data-action="start-majorca"', footer: "coast" });
    bindAction("start-majorca", () => { progress.phase = "sunset"; saveState(); renderChallengeFour(); });
    return;
  }
  app.innerHTML = `<section class="paper-card screen majorca-challenge">
    ${gameplayHeader({ theme: "Samedi soir", title: "Va voir le coucher de soleil.", description: "Marche jusqu'au banc.<br><br>Quand le soleil commence à descendre sur Majorque,<br>prends simplement le temps de regarder." })}
    ${button("Le soleil se couche", "complete-majorca", "journey-notebook__cta")}
  </section>`;
  bindAction("complete-majorca", () => completeChallenge(4));
}

function renderPassword() {
  const letters = Array.from({ length: 8 }, (_, index) => state.passwordDraft[index] || "");
  app.innerHTML = `<section class="paper-card screen finale-password" aria-labelledby="password-title">
    <img class="finale-password__rainbow" src="${OPENING_ASSETS}/02_arc_en_ciel.png" alt="" />
    <h1 id="password-title">Le voyage touche à sa fin…</h1>
    <p>Tu as les huit images physiques entre tes mains.<br>Chacune cache une lettre.<br>Assemble-les et trouve le mot de passe<br>qui ouvrira la dernière surprise.</p>
    <div class="finale-password__paper">
      <p>Entre le mot de passe ici :</p>
      <div class="finale-password__boxes" role="group" aria-label="Mot de passe de huit lettres">${letters.map((letter, index) => `<input inputmode="text" autocomplete="off" autocapitalize="characters" maxlength="1" value="${letter}" aria-label="Lettre ${index + 1} sur 8" />`).join("")}</div>
    </div>
    ${button("Continuer le voyage", "unlock", "journey-notebook__cta")}
    <p class="feedback" role="status">${state.passwordError ? "Pas tout à fait… regarde encore les huit images." : ""}</p>
  </section>`;
  const inputs = [...app.querySelectorAll(".finale-password__boxes input")];
  const submit = app.querySelector('[data-action="unlock"]');
  const sync = () => {
    state.passwordDraft = inputs.map(input => input.value.toUpperCase().replace(/[^A-Z]/g, "").slice(-1)).join("");
    inputs.forEach((input, index) => { input.value = state.passwordDraft[index] || ""; });
    submit.disabled = state.passwordDraft.length !== 8;
    saveState();
  };
  inputs.forEach((input, index) => {
    input.addEventListener("input", () => { input.value = input.value.toUpperCase().replace(/[^A-Z]/g, "").slice(-1); state.passwordError = false; app.querySelector(".feedback").textContent = ""; sync(); if (input.value && index < 7) inputs[index + 1].focus(); });
    input.addEventListener("keydown", event => { if (event.key === "Backspace" && !input.value && index > 0) { inputs[index - 1].focus(); inputs[index - 1].value = ""; sync(); } });
    input.addEventListener("paste", event => {
      const pasted = event.clipboardData?.getData("text").toUpperCase().replace(/[^A-Z]/g, "").slice(0, 8 - index);
      if (!pasted) return;
      event.preventDefault();
      [...pasted].forEach((letter, offset) => { inputs[index + offset].value = letter; });
      sync(); inputs[Math.min(7, index + pasted.length)].focus();
    });
  });
  sync();
  bindAction("unlock", () => {
    if (state.passwordDraft === CONFIG.password.toUpperCase()) {
      state.finalStage = "box";
      state.passwordDraft = "";
      state.passwordError = false;
      advanceStateTo("final-handover");
      saveState();
      navigate("final-handover", { replace: true });
    } else {
      state.passwordError = true;
      saveState();
      app.querySelector(".feedback").textContent = "Pas tout à fait… regarde encore les huit images.";
    }
  }, false);
}

function renderFinalHandover(completed = false) {
  app.innerHTML = `<section class="final-box-handover" aria-labelledby="final-box-title">
    <h1 id="final-box-title">Vincent a encore<br>quelque chose à te remettre…</h1>
    <img class="final-box-handover__illustration" src="assets/finale/v1-4-49/colis.png" alt="Une boîte illustrée passe des mains de Vincent à celles de Marjolaine." />
    <p>Cette boîte est la dernière étape de notre voyage.<br>Elle t’attend dans la vraie vie.</p>
    ${completed ? '<p class="final-box-handover__complete">C’est fini.</p>' : button("C’est fini", "finish-hunt", "journey-notebook__cta")}
  </section>`;
  bindAction("finish-hunt", () => {
    state.huntCompleted = true;
    state.finalStage = "complete";
    advanceStateTo("final");
    saveState();
    navigate("final", { replace: true });
  });
}

const renderers = {
  ...Object.fromEntries(CONFIG.routeOrder.map(id => [`conclusion-${id}`, () => renderConclusion(id)])),
  ...Object.fromEntries(pauses.map(pause => [pause.id, () => renderPause(pause)])),
  install: renderInstallGuide,
  welcome: renderIntro,
  prologue: renderPrologue,
  "notebook-intro": renderNotebookIntro,
  "book-open": renderOpenNotebook,
  "challenge-1": () => {
    if (state.completedChallenges[1]) {
      history.replaceState(null, "", "#book-open");
      return renderFirstNotebook();
    }
    cleanupCurrentScreen = renderChallengeOne(app, {
      progress: state.challengeOne,
      rules: CONFIG.challengeOne.rules,
      debug: debugMode,
      onChange: (progress) => { state.challengeOne = progress; saveState(); },
      onComplete: completeFirstChallenge,
    });
  },
  "gallery-1": () => openChapterGallery(1, "handoff-1"),
  "handoff-1": () => renderHandoff(1),
  "challenge-8": () => state.completedChallenges[8] ? showNotebook() : renderBlindTest({ chapterId: 8, songs: CONFIG.chapters[8].songs, onDone: () => completeChallenge(8) }),
  "gallery-8": () => openChapterGallery(8, "handoff-8"),
  "handoff-8": () => renderHandoff(8),
  "challenge-2": () => state.completedChallenges[2] ? showNotebook() : renderCoupleProfile(),
  "gallery-2": () => openChapterGallery(2, "handoff-2"),
  "handoff-2": () => renderHandoff(2),
  "challenge-3": () => state.completedChallenges[3] ? showNotebook() : renderChallengeThreeIntro(),
  "gallery-3": () => openChapterGallery(3, "handoff-3"),
  "handoff-3": () => renderHandoff(3),
  "challenge-5": () => {
    if (state.completedChallenges[5]) return showNotebook();
    const trip = state.answers["chapter-5"] ||= { started: false, choices: [], phase: "choice" };
    cleanupCurrentScreen = renderRoadTrip(app, trip, saveState, () => completeChallenge(5), { previewAt: roadPreviewAt });
    roadPreviewAt = null;
  },
  "gallery-5": () => openChapterGallery(5, "handoff-5"),
  "handoff-5": () => renderHandoff(5),
  "challenge-6": () => {
    if (state.completedChallenges[6]) return showNotebook();
    if (!state.answers["chapter-6"] || Array.isArray(state.answers["chapter-6"])) state.answers["chapter-6"] = { phase: "intro", questionIndex: 0, notes: [], endAt: null, selectedScore: null };
    cleanupCurrentScreen = renderChallengeSix(app, state.answers["chapter-6"], saveState, () => completeChallenge(6));
  },
  "gallery-6": () => openChapterGallery(6, "handoff-6"),
  "handoff-6": () => renderHandoff(6),
  "challenge-7": renderChallengeSeven,
  "gallery-7": () => openChapterGallery(7, "handoff-7"),
  "handoff-7": () => renderHandoff(7),
  "challenge-4": renderChallengeFour,
  "gallery-4": () => openChapterGallery(4, "handoff-4"),
  "handoff-4": () => renderHandoff(4),
  password: renderPassword,
  "final-handover": () => renderFinalHandover(false),
  final: () => renderFinalHandover(true),
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
    id = canonicalRoute(id);
    if (location.hash !== `#${id}`) history.replaceState(null, "", `#${id}`);
    updateChrome(id); scrollTo(0, 0);
    (renderers[id] || renderers[state.currentStep] || renderers["book-open"])();
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
  const debugPresets = [
    ["welcome", "Prologue"],
    ["d2-last-question:2", "D2 — dernière question"],
    ["d2-profile:2", "D2 — profil de couple"],
    ["d3-last:3", "D3 — dernière photo"],
    ["d5-final:5", "D5 — route finale"],
    ["d7-payoff:7", "D7 — serpent terminé"],
    ["d8-last:8", "D8 — dernière chanson"],
    ...ROAD_PREVIEWS.map(([phase, label]) => [`road-${phase}:5`, `D5 — ${label}`]),
    ...CHALLENGE_SIX_PREVIEWS.map(([phase, label]) => [`${phase}:6`, label]),
    ...CONFIG.routeOrder.flatMap(id => [
      [`available:${id}`, `D${id} — disponible dans le carnet`],
      [`gameplay:${id}`, `D${id} — gameplay`],
      [`conclusion:${id}`, `D${id} — conclusion arc-en-ciel`],
      [`reveal:${id}`, `D${id} — révélation dans le carnet`],
      [`memory:${id}`, `D${id} — souvenir / récompense`],
      [`handoff:${id}`, `D${id} — remise`],
      [`finished:${id}`, `D${id} — souvenir terminé`],
      ...(pauseAfter(id) ? ["before", "ready", "resumed"].map(phase => [`${phase}:${id}`, `${pauseAfter(id).id} — ${phase === "before" ? "avant l’horaire" : phase === "ready" ? "reprise disponible" : "chapitre repris"}`]) : []),
    ]),
    ["d4-active:4", "D4 — coucher de soleil en cours"],
    ["d4-cta:4", "D4 — CTA coucher de soleil"],
    ["d4-gallery-decor:4", "D4 — galerie décor seul"],
    ["d4-gallery-fade:4", "D4 — galerie fade-in"],
    ["password-empty:4", "Final — mot de passe vide"],
    ["password-partial:4", "Final — mot de passe partiel"],
    ["password-incorrect:4", "Final — mot de passe incorrect"],
    ["password-correct:4", "Final — mot de passe correct"],
    ["final-box:4", "Final — handover de la boîte"],
    ["final-complete:4", "Final — app terminée"],
  ];
  select.innerHTML = debugPresets.map(([value, label]) => `<option value="${value}">${label}</option>`).join("");
  const applyPreset = value => {
    stopActiveSoundtrack();
    cleanupCurrentScreen?.(); cleanupCurrentScreen = null;
    state = defaultState();
    roadPreviewAt = null;
    if (value === "welcome") { saveState(); return navigate("welcome", { replace: true }); }
    state.started = state.onboardingCompleted = true;
    const [phase, rawId] = value.split(":");
    const id = Number(rawId);
    for (const previous of CONFIG.routeOrder.slice(0, CONFIG.routeOrder.indexOf(id))) {
      winChallenge(state, previous);
      continueConclusion(state, previous);
      revealMemory(state);
      finishReward(state, previous);
      const pause = pauseAfter(previous);
      if (pause) {
        const time = Math.max(journeyNow(), Date.parse(pause.target));
        state.debugTimeOffsetMs = time - Date.now();
        resumeChapter(state, pause, time);
      }
    }
    let route = "book-open";
    if (phase === "gameplay") route = challengeEntry(id);
    if (id === 2 && ["d2-last-question", "d2-profile"].includes(phase)) {
      const answered = phase === "d2-last-question" ? 11 : 12;
      state.answers["chapter-2"] = { phase: phase === "d2-last-question" ? "questions" : "results", questionIndex: answered, activePlayer: "marjolaine", marjolaine: Array(answered).fill("A"), vincent: Array(answered).fill("A") };
      route = "challenge-2";
    }
    if (id === 3 && phase === "d3-last") {
      state.answers["chapter-3"] = ["Lenny", "Milan"];
      route = "challenge-3";
    }
    if (id === 5 && phase === "d5-final") {
      state.answers["chapter-5"] = { started: true, choices: [0, 0, 0, 0, 0], phase: "final" };
      route = "challenge-5";
    }
    if (id === 7 && phase === "d7-payoff") {
      state.answers["chapter-7"] = { phase: "payoff" };
      route = "challenge-7";
    }
    if (id === 8 && phase === "d8-last") {
      state.answers["blind-test-8"] = CONFIG.chapters[8].songs.length - 1;
      route = "challenge-8";
    }
    if (id === 4 && ["d4-active", "d4-cta"].includes(phase)) {
      state.answers["chapter-4"] = { phase: "sunset" };
      route = "challenge-4";
    }
    const roadPreview = id === 5 && ROAD_PREVIEWS.find(([name]) => phase === `road-${name}`);
    if (roadPreview) {
      roadPreviewAt = roadPreview[2];
      state.answers["chapter-5"] = { started: true, choices: roadPreviewAt === null ? [] : [0], phase: roadPreviewAt === null ? "choice" : "reveal" };
      route = "challenge-5";
    }
    if (id === 6 && phase.startsWith("d6-")) {
      const notes = length => Array.from({ length }, (_, index) => ({ question: index + 1, score: 5, ratedBy: index % 2 ? "Marjolaine" : "Vincent" }));
      const presets = {
        "d6-intro": { phase: "intro", questionIndex: 0, notes: [], endAt: null, selectedScore: null },
        "d6-read-1": { phase: "read", questionIndex: 0, notes: [], endAt: null, selectedScore: null },
        "d6-read-2": { phase: "read", questionIndex: 2, notes: notes(2), endAt: null, selectedScore: null },
        "d6-timer": { phase: "timer", questionIndex: 0, notes: [], endAt: Date.now() + 45000, selectedScore: null },
        "d6-expiring": { phase: "timer", questionIndex: 0, notes: [], endAt: Date.now() + 2000, selectedScore: null },
        "d6-rating-vincent": { phase: "rating", questionIndex: 0, notes: [], endAt: null, selectedScore: null },
        "d6-rating-marjolaine": { phase: "rating", questionIndex: 1, notes: notes(1), endAt: null, selectedScore: null },
        "d6-last": { phase: "read", questionIndex: 13, notes: notes(13), endAt: null, selectedScore: null },
      };
      state.answers["chapter-6"] = presets[phase];
      route = "challenge-6";
    }
    if (["conclusion", "reveal", "memory", "handoff", "finished", "before", "ready", "resumed"].includes(phase)) {
      winChallenge(state, id);
      if (phase !== "conclusion") continueConclusion(state, id);
      if (!["conclusion", "reveal"].includes(phase)) revealMemory(state);
      if (phase === "memory") route = souvenirRoute(id);
      if (phase === "handoff") route = `handoff-${id}`;
      if (["finished", "before", "ready", "resumed"].includes(phase)) {
        finishReward(state, id);
        const pause = pauseAfter(id);
        if (pause && ["before", "ready", "resumed"].includes(phase)) {
          const time = Date.parse(pause.target) + (phase === "before" ? -60000 : 1000);
          state.debugTimeOffsetMs = time - Date.now();
          if (phase === "resumed") resumeChapter(state, pause, time);
        }
      }
    }
    if (id === 4 && ["d4-gallery-decor", "d4-gallery-fade"].includes(phase)) {
      winChallenge(state, 4); continueConclusion(state, 4); revealMemory(state);
      route = "gallery-4";
    }
    if (id === 4 && (phase.startsWith("password-") || phase === "final-box" || phase === "final-complete")) {
      winChallenge(state, 4); continueConclusion(state, 4); revealMemory(state); finishReward(state, 4);
      state.finalStage = phase === "final-complete" ? "complete" : phase === "password-correct" || phase === "final-box" ? "box" : "password";
      state.huntCompleted = phase === "final-complete";
      state.passwordDraft = phase === "password-partial" ? "MYMP" : phase === "password-incorrect" ? "AAAAAAAA" : "";
      state.passwordError = phase === "password-incorrect";
      route = state.huntCompleted ? "final" : state.finalStage === "box" ? "final-handover" : "password";
    }
    state.currentStep = route === "book-open" ? (currentChapter(state) ? challengeEntry(currentChapter(state)) : journeyHome(state)) : route;
    saveState();
    syncTime();
    navigate(route, { replace: true });
  };
  debugPanel.querySelector("#debugGo").addEventListener("click", () => applyPreset(select.value));
  debugPanel.querySelector("#debugUnlock").addEventListener("click", () => {
    applyPreset("final-complete:4");
  });
  debugPanel.querySelector("#debugOnboarding").addEventListener("click", () => applyPreset("welcome"));
  debugPanel.querySelector("#debugBook").addEventListener("click", () => showNotebook());
  const timeInput = debugPanel.querySelector("#debugNow");
  const syncTime = () => { timeInput.value = new Date(journeyNow()).toLocaleString("sv-SE", { timeZone: "Europe/Paris" }).replace(" ", "T"); };
  syncTime();
  debugPanel.querySelector("#debugApplyTime").addEventListener("click", () => {
    const value = Date.parse(`${timeInput.value}+02:00`);
    if (!Number.isFinite(value)) return;
    state.debugTimeOffsetMs = value - Date.now(); saveState(); showNotebook();
  });
  debugPanel.querySelector("#debugRealTime").addEventListener("click", () => { state.debugTimeOffsetMs = 0; saveState(); syncTime(); showNotebook(); });

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
    state = defaultState();
    state.challengeOne = { ...defaultState().challengeOne, started: stage !== "intro", selectedRule, ...presets[stage] };
    state.completedChallenges[1] = false;
    Object.assign(state, { started: true, onboardingCompleted: true, currentStep: "challenge-1" });
    saveState();
    navigate("challenge-1");
  });

  const displaySelect = debugPanel.querySelector("#debugDisplayMode");
  displaySelect.value = displayModeOverride === "pwa" ? "pwa" : displayModeOverride === "browser" ? "browser" : "auto";
  debugPanel.querySelector("#debugApplyDisplay").addEventListener("click", () => {
    const url = new URL(location.href);
    if (displaySelect.value === "auto") url.searchParams.delete("display");
    else url.searchParams.set("display", displaySelect.value);
    url.hash = displaySelect.value === "browser" ? "install" : "book-open";
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
else if (!state.onboardingCompleted) initialRoute = OPENING_ROUTES.has(state.openingStep) ? state.openingStep : "welcome";
else initialRoute = finalRoute() || journeyHome(state);
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
