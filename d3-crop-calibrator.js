const ASSET_ROOT = "assets/challenge-3/crop-calibrator";
const STORAGE_KEY = "voyage-majorque-d3-crop-calibrator-v1";
const MIN_SIZE = 2;

const photo = (id, filename, answer) => ({ id, filename, src: `${ASSET_ROOT}/${filename}`, answer });

export const D3_CROP_PHOTOS = [
  photo("lenny-01", "Lenny_Full_2.jpeg", "lenny"),
  photo("lenny-02", "Lenny_Full_4.jpeg", "lenny"),
  photo("lenny-03", "Lenny_Full_5.jpeg", "lenny"),
  photo("lenny-04", "Lenny_Full_6.jpeg", "lenny"),
  photo("lenny-05", "Lenny_Full_7.jpeg", "lenny"),
  photo("lenny-06", "Lenny_Full_9.jpeg", "lenny"),
  photo("lenny-07", "Lenny_Full_10.jpeg", "lenny"),
  photo("lenny-08", "Lenny_Full_11.jpeg", "lenny"),
  photo("lenny-09", "Lenny_Full_14.jpeg", "lenny"),
  photo("lenny-10", "Lenny_Full_16.jpeg", "lenny"),
  photo("milan-01", "Milan_Full_1.JPG", "milan"),
  photo("milan-02", "Milan_Full_3.JPG", "milan"),
  photo("milan-03", "Milan_Full_4.JPG", "milan"),
  photo("milan-04", "Milan_Full_5.JPG", "milan"),
  photo("milan-05", "Milan_Full_7.JPG", "milan"),
  photo("milan-06", "Milan_Full_9.JPG", "milan"),
  photo("milan-07", "Milan_Full_10.jpeg", "milan"),
  photo("milan-08", "Milan_Full_14.JPG", "milan"),
  photo("milan-09", "Milan_Full_15.JPG", "milan"),
  photo("milan-10", "IMG_3281.JPG", "milan"),
];

const defaultSetting = () => ({
  difficulty: "medium",
  crop: { x: 15, y: 15, width: 70, height: 70 },
});

const round = value => Math.round(value * 10) / 10;
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

function normalizedCrop(value = {}) {
  const width = round(clamp(Number(value.width) || 70, MIN_SIZE, 100));
  const height = round(clamp(Number(value.height) || 70, MIN_SIZE, 100));
  return {
    x: round(clamp(Number(value.x) || 0, 0, 100 - width)),
    y: round(clamp(Number(value.y) || 0, 0, 100 - height)),
    width,
    height,
  };
}

function loadSettings() {
  let stored = {};
  try { stored = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch {}
  return Object.fromEntries(D3_CROP_PHOTOS.map(item => {
    const saved = stored[item.id] || defaultSetting();
    const difficulty = ["easy", "medium", "hard", "very-hard"].includes(saved.difficulty) ? saved.difficulty : "medium";
    return [item.id, { difficulty, crop: normalizedCrop(saved.crop) }];
  }));
}

const settings = loadSettings();
let currentIndex = 0;
let previewOnly = false;
let naturalSize = { width: 1, height: 1 };
let drag = null;

const root = document.querySelector("#cropCalibrator");
root.className = "crop-calibrator";
root.innerHTML = `
  <header class="crop-calibrator__topbar">
    <div>
      <h1>D3 — CROP CALIBRATOR</h1>
      <p>Réglages locaux isolés du parcours de production.</p>
    </div>
    <div class="crop-calibrator__topbar-actions">
      <button class="crop-calibrator__button" type="button" data-preview-only>Preview seule</button>
      <button class="crop-calibrator__button" type="button" data-exit>Retour au test</button>
    </div>
  </header>
  <nav class="crop-calibrator__navigation" aria-label="Navigation entre les photos">
    <button class="crop-calibrator__button" type="button" data-previous>← Photo précédente</button>
    <select data-photo-select aria-label="Choisir une photo">
      ${D3_CROP_PHOTOS.map((item, index) => `<option value="${index}">${item.answer === "lenny" ? "Lenny" : "Milan"} ${String(index % 10 + 1).padStart(2, "0")}/10 — ${item.filename}</option>`).join("")}
    </select>
    <button class="crop-calibrator__button" type="button" data-next>Photo suivante →</button>
  </nav>
  <div class="crop-calibrator__workspace">
    <section class="crop-calibrator__editor" aria-label="Photo originale et rectangle de crop">
      <p class="crop-calibrator__file" data-filename></p>
      <div class="crop-calibrator__source-stage">
        <div class="crop-calibrator__source-frame" data-source-frame>
          <img class="crop-calibrator__source-image" data-source-image alt="" draggable="false" />
          <div class="crop-calibrator__selection" data-selection>
            ${["nw", "n", "ne", "e", "se", "s", "sw", "w"].map(handle => `<span class="crop-calibrator__handle" data-handle="${handle}" aria-hidden="true"></span>`).join("")}
          </div>
        </div>
      </div>
      <div class="crop-calibrator__controls">
        ${["x", "y", "width", "height"].map(name => `<div class="crop-calibrator__field"><label for="crop-${name}">${name.toUpperCase()} (%)</label><input id="crop-${name}" type="number" inputmode="decimal" min="0" max="100" step="0.1" data-coordinate="${name}" /></div>`).join("")}
        <div class="crop-calibrator__field">
          <label for="crop-difficulty">DIFFICULTÉ</label>
          <select id="crop-difficulty" data-difficulty>
            <option value="easy">EASY</option>
            <option value="medium">MEDIUM</option>
            <option value="hard">HARD</option>
            <option value="very-hard">VERY HARD</option>
          </select>
        </div>
      </div>
    </section>
    <aside class="crop-calibrator__preview-panel" aria-label="Aperçu iPhone de D3">
      <p class="crop-calibrator__preview-title">APERÇU IPHONE — D3</p>
      <div class="crop-calibrator__phone">
        <p class="crop-calibrator__phone-kicker">QUI EST QUI ?</p>
        <h2>Lenny ou Milan ?</h2>
        <p class="crop-calibrator__phone-copy">À toi de reconnaître qui se cache derrière ce petit visage.</p>
        <div class="crop-calibrator__viewport" data-preview-viewport>
          <img class="crop-calibrator__preview-image" data-preview-image alt="Aperçu du crop" draggable="false" />
        </div>
        <p class="crop-calibrator__question">Qui est qui ?</p>
        <div class="crop-calibrator__choices" aria-hidden="true">
          <button class="crop-calibrator__choice" type="button" tabindex="-1">Lenny</button>
          <button class="crop-calibrator__choice" type="button" tabindex="-1">Milan</button>
        </div>
        <p class="crop-calibrator__meta" data-preview-meta></p>
      </div>
    </aside>
  </div>
  <section class="crop-calibrator__export" aria-label="Export de la configuration">
    <div class="crop-calibrator__export-actions">
      <button class="crop-calibrator__button crop-calibrator__button--primary" type="button" data-copy>COPIER LA CONFIG D3</button>
      <span class="crop-calibrator__status" data-copy-status role="status"></span>
    </div>
    <textarea class="crop-calibrator__output" data-output readonly spellcheck="false" aria-label="Configuration D3 exportée"></textarea>
  </section>
`;

const sourceImage = root.querySelector("[data-source-image]");
const previewImage = root.querySelector("[data-preview-image]");
const sourceFrame = root.querySelector("[data-source-frame]");
const selection = root.querySelector("[data-selection]");
const previewViewport = root.querySelector("[data-preview-viewport]");
const filename = root.querySelector("[data-filename]");
const photoSelect = root.querySelector("[data-photo-select]");
const difficulty = root.querySelector("[data-difficulty]");
const coordinateInputs = Object.fromEntries([...root.querySelectorAll("[data-coordinate]")].map(input => [input.dataset.coordinate, input]));
const output = root.querySelector("[data-output]");
const copyStatus = root.querySelector("[data-copy-status]");
const previewMeta = root.querySelector("[data-preview-meta]");
const previewButton = root.querySelector("[data-preview-only]");

function currentPhoto() { return D3_CROP_PHOTOS[currentIndex]; }
function currentSetting() { return settings[currentPhoto().id]; }

function saveSettings() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(settings)); } catch {}
}

function applyCrop(next) {
  const crop = normalizedCrop(next);
  settings[currentPhoto().id].crop = crop;
  saveSettings();
  updateCropDisplay();
}

function updateCropDisplay() {
  const { crop, difficulty: level } = currentSetting();
  selection.style.left = `${crop.x}%`;
  selection.style.top = `${crop.y}%`;
  selection.style.width = `${crop.width}%`;
  selection.style.height = `${crop.height}%`;
  for (const name of ["x", "y", "width", "height"]) coordinateInputs[name].value = crop[name].toFixed(1);
  difficulty.value = level;

  const ratio = (naturalSize.width * crop.width) / (naturalSize.height * crop.height);
  previewViewport.style.aspectRatio = `${ratio}`;
  previewViewport.style.setProperty("--crop-viewport-width", `${Math.min(290, 350 * ratio)}px`);
  previewImage.style.left = `${-crop.x / crop.width * 100}%`;
  previewImage.style.top = `${-crop.y / crop.height * 100}%`;
  previewImage.style.width = `${10000 / crop.width}%`;
  previewImage.style.height = `${10000 / crop.height}%`;
  previewMeta.textContent = `${currentPhoto().filename} · ${crop.width.toFixed(1)} × ${crop.height.toFixed(1)} %`;
}

function showPhoto(index) {
  currentIndex = (index + D3_CROP_PHOTOS.length) % D3_CROP_PHOTOS.length;
  const item = currentPhoto();
  const personIndex = currentIndex % 10 + 1;
  photoSelect.value = String(currentIndex);
  filename.textContent = `${item.answer.toUpperCase()} ${personIndex}/10 — ${item.filename}`;
  sourceImage.alt = `Photo originale ${item.filename}`;
  sourceImage.src = item.src;
  previewImage.src = item.src;
  copyStatus.textContent = "";
  if (sourceImage.complete && sourceImage.naturalWidth) {
    naturalSize = { width: sourceImage.naturalWidth, height: sourceImage.naturalHeight };
    updateCropDisplay();
  } else {
    sourceImage.addEventListener("load", () => {
      naturalSize = { width: sourceImage.naturalWidth, height: sourceImage.naturalHeight };
      updateCropDisplay();
    }, { once: true });
  }
  updateCropDisplay();
}

function exportConfiguration() {
  const rows = D3_CROP_PHOTOS.map(item => {
    const setting = settings[item.id];
    return {
      id: item.id,
      src: item.src,
      answer: item.answer,
      difficulty: setting.difficulty,
      crop: Object.fromEntries(Object.entries(setting.crop).map(([key, value]) => [key, round(value)])),
    };
  });
  return JSON.stringify(rows, null, 2);
}

for (const [name, input] of Object.entries(coordinateInputs)) {
  input.addEventListener("input", () => {
    const value = Number(input.value);
    if (!Number.isFinite(value)) return;
    applyCrop({ ...currentSetting().crop, [name]: value });
  });
}

difficulty.addEventListener("change", () => {
  currentSetting().difficulty = difficulty.value;
  saveSettings();
  output.value = exportConfiguration();
});

photoSelect.addEventListener("change", () => showPhoto(Number(photoSelect.value)));
root.querySelector("[data-previous]").addEventListener("click", () => showPhoto(currentIndex - 1));
root.querySelector("[data-next]").addEventListener("click", () => showPhoto(currentIndex + 1));

selection.addEventListener("pointerdown", event => {
  event.preventDefault();
  selection.setPointerCapture(event.pointerId);
  drag = {
    pointerId: event.pointerId,
    handle: event.target.dataset.handle || "move",
    clientX: event.clientX,
    clientY: event.clientY,
    crop: { ...currentSetting().crop },
  };
});

selection.addEventListener("pointermove", event => {
  if (!drag || drag.pointerId !== event.pointerId) return;
  const bounds = sourceFrame.getBoundingClientRect();
  if (!bounds.width || !bounds.height) return;
  const dx = (event.clientX - drag.clientX) / bounds.width * 100;
  const dy = (event.clientY - drag.clientY) / bounds.height * 100;
  const start = drag.crop;
  const next = { ...start };
  if (drag.handle === "move") {
    next.x = clamp(start.x + dx, 0, 100 - start.width);
    next.y = clamp(start.y + dy, 0, 100 - start.height);
  } else {
    if (drag.handle.includes("e")) next.width = clamp(start.width + dx, MIN_SIZE, 100 - start.x);
    if (drag.handle.includes("s")) next.height = clamp(start.height + dy, MIN_SIZE, 100 - start.y);
    if (drag.handle.includes("w")) {
      next.x = clamp(start.x + dx, 0, start.x + start.width - MIN_SIZE);
      next.width = start.x + start.width - next.x;
    }
    if (drag.handle.includes("n")) {
      next.y = clamp(start.y + dy, 0, start.y + start.height - MIN_SIZE);
      next.height = start.y + start.height - next.y;
    }
  }
  applyCrop(next);
});

const endDrag = event => {
  if (!drag || drag.pointerId !== event.pointerId) return;
  drag = null;
};
selection.addEventListener("pointerup", endDrag);
selection.addEventListener("pointercancel", endDrag);

previewButton.addEventListener("click", () => {
  previewOnly = !previewOnly;
  root.classList.toggle("crop-calibrator--preview-only", previewOnly);
  previewButton.textContent = previewOnly ? "Revenir au calibrateur" : "Preview seule";
});

root.querySelector("[data-copy]").addEventListener("click", async () => {
  const config = exportConfiguration();
  output.value = config;
  try {
    await navigator.clipboard.writeText(config);
    copyStatus.textContent = "Configuration des 20 photos copiée.";
  } catch {
    output.hidden = false;
    output.focus();
    output.select();
    copyStatus.textContent = "Copie automatique indisponible : texte sélectionné ci-dessous.";
  }
});

root.querySelector("[data-exit]").addEventListener("click", () => { location.href = "./?debug=1&display=pwa#book-open"; });

output.value = exportConfiguration();
showPhoto(0);
