export function createGallerySoundtrack(config) {
  let audio = null;
  let disposed = false;

  const start = async () => {
    if (disposed || !config?.enabled || !config.src) return false;
    try {
      if (!audio) {
        audio = new Audio(config.src);
        audio.preload = "auto";
        audio.loop = config.loop === true;
        audio.volume = Math.min(1, Math.max(0, config.volume ?? 0.8));
      }
      await audio.play();
      return true;
    } catch {
      return false;
    }
  };

  const toggleMuted = () => {
    if (!audio || disposed) return true;
    try {
      audio.muted = !audio.muted;
      return audio.muted;
    } catch {
      return true;
    }
  };

  const stop = () => {
    if (!audio || disposed) return;
    disposed = true;
    const current = audio;
    audio = null;
    try { current.pause(); } catch {}
    try { current.currentTime = 0; } catch {}
    try {
      current.removeAttribute("src");
      current.load();
    } catch {}
  };

  return { start, stop, toggleMuted };
}
