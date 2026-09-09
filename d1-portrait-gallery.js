// Reversible D1-only experiment; shared landscape galleries remain untouched.
export function renderD1PortraitGallery(root, { images, accessibleLabel, placeholderLabel, onClose }) {
  let disposed = false;
  let closeTimer = null;
  let revealTimer = null;
  let current = -1;
  root.innerHTML = `<section class="d1-portrait-gallery" aria-label="${accessibleLabel}">
    <div class="d1-portrait-gallery__track" tabindex="0" aria-label="${accessibleLabel}">
      ${images.map((image, index) => `<figure class="d1-portrait-gallery__slide">${image.src ? `<div class="d1-portrait-gallery__scene">${index === 0 && image.introSrc ? `<img class="d1-portrait-gallery__decor" src="${image.introSrc}" alt="" />` : ""}<img class="${index === 0 && image.introSrc ? "d1-portrait-gallery__memory" : ""}" src="${image.src}" alt="${image.alt || accessibleLabel}" /></div>` : `<p>${placeholderLabel}</p>`}<figcaption>${index + 1} / ${images.length}</figcaption></figure>`).join("")}
    </div>
    <div class="d1-portrait-gallery__actions"><button class="d1-portrait-gallery__close" type="button" hidden>Revenir au carnet</button></div>
  </section>`;
  const track = root.querySelector('.d1-portrait-gallery__track');
  const close = root.querySelector('.d1-portrait-gallery__close');
  const memory = root.querySelector('.d1-portrait-gallery__memory');
  if (memory) {
    Promise.all(Array.from(root.querySelectorAll('.d1-portrait-gallery__scene img')).map(image => image.decode())).then(() => {
      if (!disposed) revealTimer = setTimeout(() => { if (!disposed) memory.classList.add('is-revealed'); }, 600);
    }).catch(() => { if (!disposed) memory.classList.add('is-revealed'); });
  }
  const update = () => {
    const next = Math.round(track.scrollLeft / Math.max(1, track.clientWidth));
    if (next === current) return;
    current = next;
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
  close.addEventListener('click', () => { if (!disposed) { disposed = true; clearTimeout(closeTimer); clearTimeout(revealTimer); onClose(); } }, { once: true });
  update();
  track.focus({ preventScroll: true });
  return () => { disposed = true; clearTimeout(closeTimer); clearTimeout(revealTimer); };
}
