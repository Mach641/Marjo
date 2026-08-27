export function openGalleryViewer({ accessibleLabel = "Fenêtre sur votre histoire", images, onClose, placeholderLabel = "PLACEHOLDER — IMAGE À REMPLACER" }) {
  const viewer = document.createElement("div");
  viewer.className = "landscape-viewer";
  viewer.setAttribute("role", "dialog");
  viewer.setAttribute("aria-label", accessibleLabel);
  viewer.innerHTML = `
    <div class="landscape-viewer__orientation" aria-hidden="true">↻ Tourne-moi</div>
    <div class="landscape-viewer__track">
      ${images.map((image, index) => image.src
        ? `<figure class="landscape-viewer__slide"><img src="${image.src}" alt="${image.alt || accessibleLabel}" /><figcaption>${index + 1} / ${images.length}</figcaption></figure>`
        : `<figure class="landscape-viewer__slide landscape-viewer__placeholder"><span>${placeholderLabel}</span><figcaption>${index + 1} / ${images.length}</figcaption></figure>`).join("")}
    </div>
    <button class="landscape-viewer__close" type="button">Revenir au carnet</button>`;

  document.body.append(viewer);
  document.body.classList.add("viewer-open");
  const track = viewer.querySelector(".landscape-viewer__track");
  const close = viewer.querySelector(".landscape-viewer__close");
  let current = 0;

  const update = () => {
    current = Math.round(track.scrollLeft / Math.max(1, track.clientWidth));
    close.hidden = current < images.length - 1;
  };
  track.addEventListener("scroll", update, { passive: true });
  close.hidden = images.length > 1;

  const finish = () => {
    viewer.remove();
    document.body.classList.remove("viewer-open");
    document.exitFullscreen?.().catch?.(() => {});
    onClose();
  };
  close.addEventListener("click", finish, { once: true });
  viewer.addEventListener("keydown", (event) => { if (event.key === "Escape") finish(); });
  viewer.tabIndex = -1;
  viewer.focus();
  update();
  return finish;
}
