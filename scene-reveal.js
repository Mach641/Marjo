// Shared, layout-independent reveal lifecycle for explicitly paired scenes.
export const hasScenePair = image => Boolean(image.decor && image.full);

export function sceneMarkup(image, alt, { sceneClass = '', decorClass = '', fullClass = '' } = {}) {
  if (!hasScenePair(image)) return `<img src="${image.src}" alt="${image.alt || alt}" />`;
  return `<div class="scene-reveal ${sceneClass}" data-reveal-scene><img class="${decorClass}" src="${image.decor}" alt="" /><img class="${fullClass}" data-reveal-full src="${image.full}" alt="${image.alt || alt}" style="opacity:0" /></div>`;
}

export function createSceneReveals(root, { images, revealedScenes = {}, sceneKeyPrefix = 'gallery', onRevealScene = () => {} }) {
  const slides = [...root.children];
  let active = -1;
  let timer = null;
  let generation = 0;
  let disposed = false;
  const showFull = index => {
    const full = slides[index]?.querySelector('[data-reveal-full]');
    if (full) { full.style.transition = 'none'; full.style.opacity = '1'; }
  };
  const cancel = () => { generation++; clearTimeout(timer); timer = null; };
  return {
    activate(index) {
      if (disposed || active === index) return;
      cancel();
      if (active >= 0) showFull(active);
      active = index;
      const image = images[index];
      if (!image || !hasScenePair(image)) return;
      const key = `${sceneKeyPrefix}:${image.id || index}`;
      const scene = slides[index]?.querySelector('[data-reveal-scene]');
      const full = scene?.querySelector('[data-reveal-full]');
      if (!full) return;
      if (revealedScenes[key]) { showFull(index); return; }
      // Visiting counts even when swiping away before decoding or fading finishes.
      revealedScenes[key] = true;
      onRevealScene(key);
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) { showFull(index); return; }
      const token = generation;
      Promise.all([...scene.querySelectorAll('img')].map(img => img.decode())).then(() => {
        if (disposed || token !== generation) return;
        timer = setTimeout(() => {
          if (disposed || token !== generation) return;
          full.style.transition = 'opacity 4000ms linear';
          full.style.opacity = '1';
        }, 1000);
      }).catch(() => { if (!disposed && token === generation) showFull(index); });
    },
    dispose() { disposed = true; cancel(); showFull(active); },
  };
}
