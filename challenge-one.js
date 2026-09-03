const svg = (content, label) => `<svg class="rule-sketch" viewBox="0 0 320 230" role="img" aria-label="${label}">${content}</svg>`;
const layer = (level, needed, content) => level >= needed ? `<g class="sketch-layer sketch-layer--${needed}">${content}</g>` : "";
const wash = (solved, content) => solved ? `<g class="sketch-watercolor" aria-hidden="true">${content}</g>` : "";

function ruleOne(level, solved) {
  return svg(`${wash(solved, '<ellipse cx="160" cy="120" rx="112" ry="76" fill="#f2c783"/><path d="M64 167 Q160 205 257 164" fill="none" stroke="#d98576" stroke-width="25"/>')}
    ${layer(level, 1, '<text x="160" y="128" text-anchor="middle" class="sketch-number">1</text><text x="160" y="164" text-anchor="middle" class="sketch-small">NUMÉRO</text>')}
    ${layer(level, 2, '<text x="160" y="38" text-anchor="middle" class="sketch-title">RÈGLE</text><circle cx="82" cy="114" r="25"/><path d="M58 107q24-39 50 0M60 142q22-23 44 0"/>')}
    ${layer(level, 3, '<path d="M128 62l14-25 18 18 19-22 16 29zM128 63h68"/>')}`, "Une règle numéro un, Marjolaine et une couronne");
}

function ruleTwo(level, solved) {
  return svg(`${wash(solved, '<circle cx="154" cy="120" r="72" fill="#d8836f"/><path d="M205 105q55 24 19 86" fill="none" stroke="#efc66f" stroke-width="18"/>')}
    ${layer(level, 1, '<path d="M160 62c-14-20-43-9-48 10-33-7-57 18-55 55 2 45 40 78 94 76 53 3 93-29 96-73 3-40-27-66-63-56-7-10-14-12-24-12zM160 62q2-25 20-34M170 42q18-13 34-4"/>')}
    ${layer(level, 2, '<path d="M211 87q32 22 9 49t17 51q15 14-2 28"/><path d="M222 96q23-7 31 8"/>')}
    ${layer(level, 3, '<path d="M116 112q15 13 39 4M156 116q22 14 43-1M155 117v72M106 178q49-18 98 0"/>')}`, "Une pomme progressivement épluchée et coupée");
}

function ruleThree(level, solved) {
  return svg(`${wash(solved, '<ellipse cx="152" cy="159" rx="104" ry="43" fill="#9db9be"/><rect x="87" y="83" width="123" height="83" rx="14" fill="#c79a71"/>')}
    ${layer(level, 1, '<path d="M93 91h114v66q0 23-23 23h-68q-23 0-23-23zM208 108q45-7 45 23t-45 25M77 185h149"/>')}
    ${layer(level, 2, '<path d="M104 107q47 15 91 0M119 66q-13-16 2-29M151 66q-13-16 2-29M183 66q-13-16 2-29"/>')}
    ${layer(level, 3, '<path d="M242 40q-15 47-45 91"/><rect x="204" y="31" width="54" height="36" rx="4" transform="rotate(20 231 49)"/><path d="M250 61q19 18 30 43"/>')}`, "Une tablette de chocolat trempée dans une tasse de café");
}

function ruleFour(level, solved) {
  return svg(`${wash(solved, '<ellipse cx="160" cy="139" rx="83" ry="73" fill="#d5ae7d"/><circle cx="74" cy="69" r="19" fill="#d9887b"/><circle cx="253" cy="65" r="15" fill="#d9887b"/>')}
    ${layer(level, 1, '<path d="M105 103l-8-48 42 25q21-8 43 0l42-25-7 51q18 23 5 61-14 43-65 43-54 0-67-43-10-36 15-64z"/>')}
    ${layer(level, 2, '<path d="M120 125l18-5M181 120l19 6M143 145q17 12 34 0M158 139v12M94 140l-42-8M95 152l-44 8M219 141l45-9M218 154l44 10"/><path d="M112 84l14 13M206 83l-15 14"/>')}
    ${layer(level, 3, '<path d="M118 207q-17 13-8 25M199 205q19 11 12 27M105 214q53 22 106 0"/><path d="M62 69c-19-20-38 8 2 34 38-27 18-53-2-34zM253 65c-15-17-31 6 1 28 31-21 15-45-1-28z"/>')}`, "Un chat ronchon entouré de petits cœurs");
}

function ruleFive(level, solved) {
  return svg(`${wash(solved, '<rect x="43" y="83" width="234" height="113" rx="18" fill="#9babb8"/><ellipse cx="160" cy="202" rx="117" ry="18" fill="#e7bd83"/>')}
    ${layer(level, 1, '<path d="M45 195V93q0-20 20-20h190q20 0 20 20v102M44 169h232M61 88h86v61H61zM173 88h86v61h-86z"/>')}
    ${layer(level, 2, '<circle cx="113" cy="111" r="16"/><path d="M110 128q-24 16-20 41M103 139q17 1 25 17"/><circle cx="207" cy="111" r="16"/><path d="M210 128q24 16 20 41M217 139q-17 1-25 17"/>')}
    ${layer(level, 3, '<path d="M126 157q25 21 36 4 11-17 32-3M142 163q19 24 37 0"/><path d="M155 198q5-11 11 0"/>')}`, "Deux personnes se réconcilient avant de dormir");
}

function ruleSix(level, solved) {
  return svg(`${wash(solved, '<ellipse cx="160" cy="180" rx="111" ry="35" fill="#99b9ad"/><path d="M77 173q32-34 72 4M171 177q38-38 73-4" fill="none" stroke="#d98e70" stroke-width="28"/>')}
    ${layer(level, 1, '<path d="M74 165q37-42 76 4v25H66q-12-12 8-29zM174 169q38-46 76-3 18 18 4 29h-88v-18"/>')}
    ${layer(level, 2, '<path d="M66 195q41 12 84 0M166 195q44 12 88 0M92 161q17 13 37 2M193 163q18 11 38-1"/>')}
    ${layer(level, 3, '<path d="M105 153q-9-53 7-86M128 157q12-47 5-88M204 155q-12-49-2-88M229 158q15-48 3-91"/><path d="M96 67h43M195 67h43"/>')}`, "Deux paires de pieds devant leurs chaussons");
}

const drawings = [ruleOne, ruleTwo, ruleThree, ruleFour, ruleFive, ruleSix];

function doorSketch(id, opened) {
  const tops = ["M22 78V38Q60 3 98 38V78", "M22 78V26H98V78", "M22 78V42Q60-3 98 42V78", "M18 78V31L60 11l42 20v47", "M22 78V23H98V78M22 35h76", "M22 78V43Q60 13 98 43V78M31 28q29-25 58 0"];
  const panels = ["M38 34h44v31H38z", "M35 38h50M35 55h50", "M60 25v43M35 46h50", "M35 41l25-14 25 14v25H35z", "M34 30h52v36H34zM34 48h52", "M39 37q21-18 42 0v30H39z"];
  return `<svg viewBox="0 0 120 88" aria-hidden="true"><path class="door-frame" d="${tops[id - 1]}"/><g class="door-leaf${opened ? " door-leaf--open" : ""}"><path d="M29 78V31H91V78z"/><path d="${panels[id - 1]}"/><circle cx="80" cy="56" r="2.5"/></g>${opened ? '<path class="door-wash" d="M31 73V35H86V74z"/>' : ""}</svg>`;
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
    root.innerHTML = `<section class="paper-card screen rules-intro"><p class="kicker">Premier défi</p><h1>Les règles de notre monde</h1><div class="rules-intro__doors" aria-hidden="true">${[1,2,3,4,5,6].map((id) => doorSketch(id, false)).join("")}</div><p class="rules-intro__copy">Avant de parcourir notre histoire…<br>voyons si tu connais encore<br>les règles de notre monde à nous.</p><button class="primary-button" data-rules-action="discover">Découvrir les règles</button></section>`;
  }

  function renderDoors() {
    const noneOpen = current.openedDoors.length === 0;
    const allOpen = current.openedDoors.length === 6;
    root.innerHTML = `<section class="paper-card screen rules-doors"><p class="kicker">Les règles de notre monde</p><h1>Choisis une porte</h1>${noneOpen ? '<p class="rules-note">On commence toujours par la règle numéro 1.</p>' : '<p class="rules-note">Chaque porte ouverte garde sa couleur.</p>'}<div class="door-grid">${options.rules.map((rule) => {
      const opened = current.openedDoors.includes(rule.id);
      const locked = opened || (noneOpen && rule.id !== 1);
      return `<button class="rule-door${opened ? " rule-door--open" : ""}" data-rule-id="${rule.id}" ${locked ? "disabled" : ""} aria-label="Règle numéro ${rule.id}${opened ? ", déjà découverte" : locked ? ", encore fermée" : ""}">${doorSketch(rule.id, opened)}<span>Règle n°${rule.id}</span></button>`;
    }).join("")}</div><div class="rules-final" hidden><div class="rules-rainbow" aria-hidden="true">⌒</div><p>Tu connais les règles de votre monde.<br>Alors maintenant… on peut entrer.</p><button class="primary-button" data-rules-action="enter">Entrer</button></div></section>`;
    if (allOpen) later(() => { const final = root.querySelector(".rules-final"); if (final) final.hidden = false; }, options.debug ? 80 : 700);
  }

  function renderRule() {
    const lastLevel = current.revealLevel === 3;
    root.innerHTML = `<section class="paper-card screen rule-page"><p class="kicker">Règle n°${current.selectedRule}</p><h1>Quelle règle se cache derrière ce dessin ?</h1><div class="rule-drawing">${drawings[current.selectedRule - 1](current.revealLevel, false)}</div>${current.hintVisible ? `<p class="rule-hint">${selected().hint}</p>` : ""}<div class="rule-actions"><button class="primary-button" data-rules-action="know">Je connais la règle</button><button class="secondary-button" data-rules-action="more">${lastLevel ? "Donne-moi un indice" : "Dessine-moi encore un peu"}</button></div></section>`;
  }

  function renderSpeak() {
    root.innerHTML = `<section class="paper-card screen rule-page rule-page--speak"><p class="kicker">Règle n°${current.selectedRule}</p><div class="rule-drawing">${drawings[current.selectedRule - 1](current.revealLevel, false)}</div><div class="rules-rainbow rules-rainbow--small" aria-hidden="true">⌒</div><h1>Alors dis-la à Vincent.</h1><button class="primary-button" data-rules-action="found">J’ai trouvé</button></section>`;
  }

  function renderReward() {
    root.innerHTML = `<section class="paper-card screen rule-page rule-page--reward"><p class="kicker">Règle n°${current.selectedRule}</p><div class="rule-drawing rule-drawing--solved">${drawings[current.selectedRule - 1](3, true)}</div><p class="rule-reveal">${selected().text}</p><button class="primary-button rule-reward-next" data-rules-action="continue" hidden>Continuer</button></section>`;
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
