const svg = (content, label) => `<svg class="rule-sketch" viewBox="0 0 320 230" role="img" aria-label="${label}">${content}</svg>`;
const layer = (level, needed, content) => level >= needed ? `<g class="sketch-layer sketch-layer--${needed}">${content}</g>` : "";
const wash = (solved, content) => solved ? `<g class="sketch-watercolor" aria-hidden="true">${content}</g>` : "";

function ruleOne(level, solved) {
  const src = solved
    ? "assets/challenge-1/v1-4-5/rule-1-level-3.png"
    : `assets/challenge-1/v1-4-6/rule-1-level-${level}.png`;
  const alt = solved
    ? "Le croquis de Marjolaine avec sa couronne"
    : ["Numéro 1 écrit à la main", "Règle numéro 1 et un croquis de Marjolaine", "Règle numéro 1, Marjolaine et une couronne"][level - 1];
  return `<img class="rule-sketch rule-sketch--asset${solved ? " rule-sketch--solved" : ""}" src="${src}" alt="${alt}" />`;
}

function ruleTwo(level, solved) {
  const stage = solved ? 4 : level;
  const alt = [
    "Une pomme entière",
    "Une pomme en cours d’épluchage",
    "Des mains coupent une pomme épluchée",
    "Des pommes préparées avec un bol, un couteau et des épluchures",
  ][stage - 1];
  return `<img class="rule-sketch rule-sketch--asset rule-sketch--rule-2${solved ? " rule-sketch--solved" : ""}" src="assets/challenge-1/v1-4-7/rule-2-level-${stage}.png" alt="${alt}" />`;
}

function assetRule(ruleId, level, solved, alts) {
  const stage = solved ? 4 : level;
  return `<img class="rule-sketch rule-sketch--asset rule-sketch--rule-${ruleId}${solved ? " rule-sketch--solved" : ""}" src="assets/challenge-1/v1-4-8/rule-${ruleId}-level-${stage}.png" alt="${alts[stage - 1]}" />`;
}

function ruleThree(level, solved) {
  return assetRule(3, level, solved, [
    "Le début d’une tasse et sa vapeur",
    "Une tasse de café fumante",
    "Une main trempe du chocolat dans une tasse de café",
    "Une main trempe du chocolat dans une tasse de café en aquarelle",
  ]);
}

function ruleFour(level, solved) {
  return assetRule(4, level, solved, [
    "Le début du visage et les oreilles d’un chat",
    "Un chat au regard légèrement ronchon",
    "Un chat au regard légèrement ronchon entouré de cœurs",
    "Un chat entouré de cœurs en aquarelle",
  ]);
}

function ruleFive(level, solved) {
  return assetRule(5, level, solved, [
    "Un lit vu de face",
    "Vincent et Marjolaine couchés dos à dos",
    "Vincent et Marjolaine se tiennent la main entre leurs lits",
    "Vincent et Marjolaine se tiennent la main en aquarelle",
  ]);
}

function ruleSix(level, solved) {
  return assetRule(6, level, solved, [
    "Les contours très légers d’une paire de chaussons",
    "Une paire de chaussons",
    "Des pieds en chaussettes derrière une paire de chaussons",
    "Des pieds dans des chaussons en aquarelle",
  ]);
}

const drawings = [ruleOne, ruleTwo, ruleThree, ruleFour, ruleFive, ruleSix];

function doorSketch(id, opened) {
  const state = opened ? "open" : "closed";
  return `<img src="assets/challenge-1/v1-4-5/${state}-door-${id}.png" alt="" aria-hidden="true" />`;
}

const normalize = (progress = {}) => ({
  started: Boolean(progress.started),
  phase: ["intro", "doors", "rule", "speak", "reward"].includes(progress.phase) ? progress.phase : "intro",
  openedDoors: [...new Set((progress.openedDoors || []).map(Number).filter((id) => id >= 1 && id <= 6))],
  selectedRule: Math.min(6, Math.max(1, Number(progress.selectedRule) || 1)),
  revealLevel: Math.min(3, Math.max(1, Number(progress.revealLevel) || 1)),
  hintVisible: Boolean(progress.hintVisible),
});

export function renderChallengeOne(root, options) {
  let current = normalize(options.progress);
  const timers = new Set();
  const later = (fn, delay) => { const timer = setTimeout(() => { timers.delete(timer); fn(); }, delay); timers.add(timer); };
  const persist = (next) => { current = normalize({ ...current, ...next }); options.onChange(current); render(); };
  const selected = () => options.rules.find((rule) => rule.id === current.selectedRule);

  function renderIntro() {
    root.innerHTML = `<section class="paper-card screen rules-intro"><p class="kicker">Premier défi</p><h1>Les règles de notre monde</h1><img class="rules-intro__door" src="assets/challenge-1/v1-4-6/intro-door.png" alt="" aria-hidden="true" /><p class="rules-intro__copy">Avant de parcourir notre histoire…<br>voyons si tu connais encore<br>les règles de notre monde à nous.</p><button class="primary-button" data-rules-action="discover">Découvrir les règles</button></section>`;
  }

  function renderDoors() {
    const noneOpen = current.openedDoors.length === 0;
    const allOpen = current.openedDoors.length === 6;
    root.innerHTML = `<section class="paper-card screen rules-doors"><p class="kicker">Les règles de notre monde</p><h1>Choisis une porte</h1>${noneOpen ? '<p class="rules-note">On commence toujours par la règle numéro 1.</p>' : '<p class="rules-note">Chaque porte ouverte garde sa couleur.</p>'}<div class="door-grid">${options.rules.map((rule) => {
      const opened = current.openedDoors.includes(rule.id);
      const locked = opened || (noneOpen && rule.id !== 1);
      const visualState = opened ? "open" : locked ? "locked" : "available";
      return `<button class="rule-door rule-door--${visualState}" data-rule-id="${rule.id}" ${locked ? "disabled" : ""} aria-label="Règle numéro ${rule.id}${opened ? ", déjà découverte" : locked ? ", encore fermée" : ""}">${doorSketch(rule.id, opened)}<span>Règle n°${rule.id}</span></button>`;
    }).join("")}</div><div class="rules-final" hidden><div class="rules-rainbow" aria-hidden="true">⌒</div><p>Tu connais les règles de votre monde.<br>Alors maintenant… on peut entrer.</p><button class="primary-button" data-rules-action="enter">Entrer</button></div></section>`;
    if (allOpen) later(() => { const final = root.querySelector(".rules-final"); if (final) final.hidden = false; }, options.debug ? 80 : 700);
  }

  function renderRule() {
    const lastLevel = current.revealLevel === 3;
    root.innerHTML = `<section class="paper-card screen rule-page"><p class="kicker">Règle n°${current.selectedRule}</p><h1>Quelle règle se cache derrière ce dessin ?</h1><div class="rule-drawing rule-drawing--transparent">${drawings[current.selectedRule - 1](current.revealLevel, false)}</div>${current.hintVisible ? `<p class="rule-hint">${selected().hint}</p>` : ""}<div class="rule-actions"><button class="primary-button" data-rules-action="know">Je connais la règle</button><button class="secondary-button" data-rules-action="more">${lastLevel ? "Donne-moi un indice" : "Dessine-moi encore un peu"}</button></div></section>`;
  }

  function renderSpeak() {
    root.innerHTML = `<section class="paper-card screen rule-page rule-page--speak"><p class="kicker">Règle n°${current.selectedRule}</p><div class="rule-drawing rule-drawing--transparent">${drawings[current.selectedRule - 1](current.revealLevel, false)}</div><div class="rules-rainbow rules-rainbow--small" aria-hidden="true">⌒</div><h1>Alors dis-la à Vincent.</h1><button class="primary-button" data-rules-action="found">J’ai trouvé</button></section>`;
  }

  function renderReward() {
    root.innerHTML = `<section class="paper-card screen rule-page rule-page--reward"><p class="kicker">Règle n°${current.selectedRule}</p><div class="rule-drawing rule-drawing--solved${current.selectedRule >= 2 ? " rule-drawing--transparent" : ""}">${drawings[current.selectedRule - 1](3, true)}</div><p class="rule-reveal">${selected().text}</p><button class="primary-button rule-reward-next" data-rules-action="continue" hidden>Continuer</button></section>`;
    later(() => { const button = root.querySelector('[data-rules-action="continue"]'); if (button) button.hidden = false; }, options.debug ? 120 : 950);
  }

  function render() {
    if (current.phase === "intro") renderIntro();
    else if (current.phase === "doors") renderDoors();
    else if (current.phase === "rule") renderRule();
    else if (current.phase === "speak") renderSpeak();
    else renderReward();

    root.querySelector('[data-rules-action="discover"]')?.addEventListener("click", () => persist({ started: true, phase: "doors" }));
    root.querySelectorAll("[data-rule-id]").forEach((button) => button.addEventListener("click", () => persist({ phase: "rule", selectedRule: Number(button.dataset.ruleId), revealLevel: 1, hintVisible: false })));
    root.querySelector('[data-rules-action="more"]')?.addEventListener("click", () => current.revealLevel < 3 ? persist({ revealLevel: current.revealLevel + 1 }) : persist({ hintVisible: true }));
    root.querySelector('[data-rules-action="know"]')?.addEventListener("click", () => persist({ phase: "speak" }));
    root.querySelector('[data-rules-action="found"]')?.addEventListener("click", () => persist({ phase: "reward", revealLevel: 3, hintVisible: false, openedDoors: [...current.openedDoors, current.selectedRule] }));
    root.querySelector('[data-rules-action="continue"]')?.addEventListener("click", () => persist({ phase: "doors" }));
    root.querySelector('[data-rules-action="enter"]')?.addEventListener("click", options.onComplete);
  }

  render();
  return () => timers.forEach(clearTimeout);
}
