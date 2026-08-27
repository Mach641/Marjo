// Placeholder V1 volontairement isolé : remplaçable sans toucher au moteur global.
export function renderFamilyGame(container, onComplete) {
  const objects = [
    { icon: "⚄", label: "Lancer le dé" },
    { icon: "♟", label: "Avancer le pion" },
    { icon: "▣", label: "Retourner une carte" },
    { icon: "🍎", label: "Prendre la pomme" },
  ];
  let index = 0;

  const draw = () => {
    const object = objects[index];
    container.innerHTML = `
      <div class="table-game">
        <p>PLACEHOLDER — une petite partie autour de la table.</p>
        <button class="table-game__object" type="button" aria-label="${object.label}">${object.icon}</button>
        <p>${object.label}</p>
      </div>`;
    container.querySelector("button").addEventListener("click", () => {
      index += 1;
      if (index >= objects.length) onComplete();
      else draw();
    }, { once: true });
  };
  draw();
  return () => {};
}
