export function openGalleryViewer({ accessibleLabel = "Fenêtre sur votre histoire", images, onClose, placeholderLabel = "PLACEHOLDER — IMAGE À REMPLACER", reveal = false, soundtrack = null }) {
  const viewer = document.createElement("div");
  viewer.className = `landscape-viewer${reveal ? " landscape-viewer--reveal" : ""}`;
  viewer.setAttribute("role", "dialog");
  viewer.setAttribute("aria-label", accessibleLabel);
  viewer.innerHTML = `
    <div class="landscape-viewer__orientation" aria-hidden="true">↻ Tourne-moi</div>
    <div class="landscape-viewer__track">
      ${images.map((image, index) => image.src
        ? `<figure class="landscape-viewer__slide"><img src="${image.src}" alt="${image.alt || accessibleLabel}" /><figcaption>${index + 1} / ${images.length}</figcaption></figure>`
        : `<figure class="landscape-viewer__slide landscape-viewer__placeholder"><span>${placeholderLabel}</span><figcaption>${index + 1} / ${images.length}</figcaption></figure>`).join("")}
    </div>
    ${soundtrack ? '<button class="landscape-viewer__mute" type="button" aria-label="Couper le son">Son activé</button>' : ""}
    <button class="landscape-viewer__close" type="button">Revenir au carnet</button>`;

  document.body.append(viewer);
  document.body.classList.add("viewer-open");
  const track = viewer.querySelector(".landscape-viewer__track");
  const close = viewer.querySelector(".landscape-viewer__close");
  const mute = viewer.querySelector(".landscape-viewer__mute");
  let current = 0;
  let finished = false;
  let closeTimer = null;

  const hideClose = () => {
    clearTimeout(closeTimer);
    closeTimer = null;
    close.classList.remove("landscape-viewer__close--visible");
    close.hidden = true;
  };

  const scheduleClose = () => {
    hideClose();
    closeTimer = setTimeout(() => {
      close.hidden = false;
      requestAnimationFrame(() => close.classList.add("landscape-viewer__close--visible"));
    }, 3000);
  };

  const update = () => {
    current = Math.round(track.scrollLeft / Math.max(1, track.clientWidth));
    if (current === images.length - 1) scheduleClose();
    else hideClose();
  };
  track.addEventListener("scroll", update, { passive: true });
  close.hidden = true;

  const finish = () => {
    if (finished) return;
    finished = true;
    clearTimeout(closeTimer);
    viewer.remove();
    document.body.classList.remove("viewer-open");
    document.exitFullscreen?.().catch?.(() => {});
    onClose();
  };
  mute?.addEventListener("click", () => {
    const muted = soundtrack.toggleMuted();
    mute.textContent = muted ? "Son coupé" : "Son activé";
    mute.setAttribute("aria-label", muted ? "Activer le son" : "Couper le son");
  });
  close.addEventListener("click", finish, { once: true });
  viewer.addEventListener("keydown", (event) => { if (event.key === "Escape") finish(); });
  viewer.tabIndex = -1;
  viewer.focus();
  update();
  return finish;
}
