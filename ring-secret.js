export const RINGS = [
  {
    id: "ring-1",
    label: "Bague 1",
    brand: "CARTIER",
    model: "Destinée",
    details: "",
    images: [
      "assets/secret-ring/v1/ring-1-view-1.png",
      "assets/secret-ring/v1/ring-1-view-2.png",
      "assets/secret-ring/v1/ring-1-view-3.png",
    ],
  },
  {
    id: "ring-2",
    label: "Bague 2",
    brand: "TIFFANY & CO.",
    model: "Soleste",
    details: "",
    images: [
      "assets/secret-ring/v1/ring-2-view-1.png",
      "assets/secret-ring/v1/ring-2-view-2.png",
      "assets/secret-ring/v1/ring-2-view-3.png",
    ],
  },
  {
    id: "ring-3",
    label: "Bague 3",
    brand: "VALQUERE",
    model: "Halo",
    details: "",
    images: [
      "assets/secret-ring/v1/ring-3-view-1.png",
      "assets/secret-ring/v1/ring-3-view-2.png",
      "assets/secret-ring/v1/ring-3-view-3.png",
    ],
  },
];

export const RING_TONIGHT_WATERCOLOR = "assets/secret-ring/ring-tonight-watercolor.png";

const root = document.querySelector("#ringExperience");
let mode = null;
let ringIndex = 0;

const rainbow = () => '<img class="secret-rainbow" src="assets/opening/v1-4-18/02_arc_en_ciel.png" alt="" aria-hidden="true" />';
const button = (label, action, variant = "primary", note = "") => `<button class="secret-button secret-button--${variant}" type="button" data-action="${action}"><span>${label}</span>${note ? `<small>${note}</small>` : ""}</button>`;
const isPlaceholder = (src) => !src || src.startsWith("PLACEHOLDER_");
const imageSlot = (src, alt, className = "") => isPlaceholder(src)
  ? `<div class="image-placeholder ${className}" role="img" aria-label="${alt}"><span>Photo à venir</span></div>`
  : `<img class="${className}" src="${src}" alt="${alt}" />`;

function bind(action, handler) {
  root.querySelector(`[data-action="${action}"]`)?.addEventListener("click", handler);
}

function renderIntro() {
  mode = null;
  root.innerHTML = `<section class="secret-page secret-intro">
    ${rainbow()}
    <h1>Un petit détail de plus…</h1>
    <div class="secret-copy">
      <p>Tu te doutes bien que celle-ci n’est pas la vraie bague.</p>
      <p>Mais je n’ai pas oublié de chercher.</p>
      <p>On peut le dire je crois... Tes goûts sont affirmés !</p>
      <p>J'ai longtemps hésite à me lancer et t'en choisir une... avec le risque de me tromper. J'ai pesé le pour et le contre, j'ai meme fait appel à une amie pour te sonder ;)</p>
      <p>Finalement, je préfère te montrer mes 3 bagues préférées.<br>Et j'aimerais que ce soit toi qui choisisse la bague que tu porteras toute ta vie.</p>
      <p>Pour les découvrir, je te laisse le choix.</p>
      <p>Tu peux voir les bagues avec leur marque…</p>
      <p>…ou ne rien savoir du tout et choisir uniquement avec tes yeux.</p>
    </div>
    <div class="secret-actions">
      ${button("Voir les bagues et les marques", "branded", "primary", "Je veux tout savoir")}
      ${button("Choisir à l’aveugle", "blind", "secondary", "Juste les bagues. Pas les marques.")}
    </div>
  </section>`;
  bind("branded", () => start("branded"));
  bind("blind", () => start("blind"));
  scrollTo({ top: 0, behavior: "instant" });
}

function start(selectedMode) {
  mode = selectedMode;
  ringIndex = 0;
  renderRing();
}

function renderRing() {
  const ring = RINGS[ringIndex];
  const slides = ring.images.map((src, index) => `<div class="ring-slide" data-slide="${index}">${imageSlot(src, `${ring.label}, angle ${index + 1}`, "ring-view")}</div>`).join("");
  root.innerHTML = `<section class="secret-page secret-ring-page">
    <button class="secret-back" type="button" data-action="intro">← Changer de mode</button>
    <p class="secret-kicker">${ringIndex + 1} / ${RINGS.length}</p>
    <h1>${ring.label}</h1>
    <div class="ring-carousel-wrap">
      <button class="carousel-arrow carousel-arrow--previous" type="button" data-action="previous-angle" aria-label="Angle précédent">‹</button>
      <div class="ring-carousel" data-carousel>${slides}</div>
      <button class="carousel-arrow carousel-arrow--next" type="button" data-action="next-angle" aria-label="Angle suivant">›</button>
    </div>
    <div class="carousel-dots" aria-label="Angle affiché">${ring.images.map((_, index) => `<span class="carousel-dot${index === 0 ? " is-active" : ""}" data-dot="${index}"></span>`).join("")}</div>
    ${ringIndex === 0 ? '<p class="swipe-hint">Fais glisser pour la voir sous tous les angles.</p>' : ""}
    ${mode === "branded" ? `<div class="ring-information"><p class="ring-brand">${ring.brand}</p><p class="ring-model">${ring.model}</p>${ring.details ? `<p class="ring-details">${ring.details}</p>` : ""}</div>` : ""}
    <div class="secret-actions">${button(ringIndex === RINGS.length - 1 ? "Continuer" : "Bague suivante", "next-ring")}</div>
  </section>`;

  const carousel = root.querySelector("[data-carousel]");
  let activeSlide = 0;
  const showSlide = (index) => {
    activeSlide = Math.max(0, Math.min(ring.images.length - 1, index));
    carousel.children[activeSlide].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
  };
  const updateDots = () => {
    const index = Math.round(carousel.scrollLeft / carousel.clientWidth);
    activeSlide = Math.max(0, Math.min(ring.images.length - 1, index));
    root.querySelectorAll("[data-dot]").forEach((dot, dotIndex) => dot.classList.toggle("is-active", dotIndex === activeSlide));
  };
  carousel.addEventListener("scroll", updateDots, { passive: true });
  bind("previous-angle", () => showSlide(activeSlide - 1));
  bind("next-angle", () => showSlide(activeSlide + 1));
  bind("intro", renderIntro);
  bind("next-ring", () => {
    if (ringIndex < RINGS.length - 1) {
      ringIndex += 1;
      renderRing();
    } else renderFinal();
  });
  scrollTo({ top: 0, behavior: "instant" });
}

function renderFinal() {
  root.innerHTML = `<section class="secret-page secret-final">
    ${rainbow()}
    <h1>Ou peut-être une autre…</h1>
    <div class="final-ring-art">
      <img src="${RING_TONIGHT_WATERCOLOR}" alt="La bague fleur de ce soir, peinte à l’aquarelle" data-final-ring-image />
      <div class="final-ring-placeholder" role="img" aria-label="Illustration aquarelle de la bague de ce soir à venir"><span>Illustration aquarelle à venir</span><small>ring-tonight-watercolor</small></div>
    </div>
    <p class="final-caption">Celle de ce soir.</p>
    <div class="final-copy">
      <p>Peut-être qu’aucune de ces trois<br>ne sera vraiment la tienne.</p>
      <p>Et ce n’est pas grave.</p>
      <p class="final-emphasis">La plus belle sera celle<br>que tu auras choisie.</p>
      <p>On la cherchera ensemble.</p>
    </div>
  </section>`;
  const finalImage = root.querySelector("[data-final-ring-image]");
  finalImage.addEventListener("load", () => finalImage.parentElement.classList.add("has-image"), { once: true });
  scrollTo({ top: 0, behavior: "smooth" });
}

renderIntro();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./service-worker.js").then((registration) => registration.update()).catch(() => {});
}
