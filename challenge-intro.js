// Presentation only: each challenge retains its own button handler and progression.
export function challengeIntro({ id, title, subtitle, image, alt = "", copy, label, action, footer = "coast" }) {
  return `<section class="challenge-landing challenge-landing--${id} screen" aria-labelledby="challenge-landing-title">
    <div class="challenge-landing__content">
      <p class="challenge-landing__label">DÉFI ${id}</p>
      <h1 id="challenge-landing-title">${title}</h1>
      <p class="challenge-landing__subtitle">${subtitle}</p>
      <img class="challenge-landing__art" src="${image}" alt="${alt}" />
      <p class="challenge-landing__copy">${copy}</p>
      <button class="challenge-landing__button" type="button" ${action}>${label}</button>
    </div>
    <img class="challenge-landing__footer" src="assets/challenge-intros/v1-4-19/footer-${footer}.png" width="2172" height="724" alt="" aria-hidden="true" />
  </section>`;
}
