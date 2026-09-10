import { hasScenePair, sceneMarkup, createSceneReveals } from "./scene-reveal.js?v=1.4.35";
// Reversible D1-only experiment; shared landscape galleries remain untouched.
export function renderD1PortraitGallery(root, { images, accessibleLabel, placeholderLabel, onClose, ...revealOptions }) {
  const uniformSceneLayout = images.some(image => image.immersive);
  let disposed = false;
  let closeTimer = null;
  let current = -1;
  root.innerHTML = `<section class="d1-portrait-gallery${uniformSceneLayout ? " d1-portrait-gallery--immersive" : ""}" aria-label="${accessibleLabel}">
    <div class="d1-portrait-gallery__track" tabindex="0" aria-label="${accessibleLabel}">
      ${images.map((image, index) => `<figure class="d1-portrait-gallery__slide${uniformSceneLayout && hasScenePair(image) ? " d1-portrait-gallery__slide--immersive" : ""}">${hasScenePair(image) ? sceneMarkup(image, accessibleLabel, { sceneClass: 'd1-portrait-gallery__scene', decorClass: 'd1-portrait-gallery__decor', fullClass: 'd1-portrait-gallery__memory' }) : image.src ? `<div class="d1-portrait-gallery__scene"><img src="${image.src}" alt="${image.alt || accessibleLabel}" /></div>` : `<p>${placeholderLabel}</p>`}${index === 0 && image.immersive ? "" : `<figcaption>${index + 1} / ${images.length}</figcaption>`}</figure>`).join("")}
    </div>
    <div class="d1-portrait-gallery__actions"><button class="d1-portrait-gallery__close" type="button" hidden>Revenir au carnet</button></div>
  </section>`;
  const track = root.querySelector('.d1-portrait-gallery__track');
  const close = root.querySelector('.d1-portrait-gallery__close');
  const reveals = createSceneReveals(track, { images, ...revealOptions });
  const update = () => {
    const next = Math.round(track.scrollLeft / Math.max(1, track.clientWidth));
    if (next === current) return;
    current = next;
    reveals.activate(current);
    clearTimeout(closeTimer);
    close.hidden = true;
    if (current === images.length - 1) closeTimer = setTimeout(() => { if (!disposed) close.hidden = false; }, 3000);
  };
  track.addEventListener('scroll', update, { passive: true });
  track.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    track.scrollTo({ left: Math.max(0, Math.min(images.length - 1, current + (event.key === 'ArrowRight' ? 1 : -1))) * track.clientWidth, behavior: 'auto' });
  });
  close.addEventListener('click', () => { if (!disposed) { disposed = true; clearTimeout(closeTimer); reveals.dispose(); onClose(); } }, { once: true });
  update();
  if (!images[0]?.immersive) track.focus({ preventScroll: true });
  return () => { disposed = true; clearTimeout(closeTimer); reveals.dispose(); };
}
