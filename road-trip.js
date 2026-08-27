export function renderRoadTrip(container, events, onComplete) {
  let stage = 0;
  const draw = () => {
    const progress = (stage / events.length) * 100;
    const event = events[Math.min(stage, events.length - 1)];
    container.innerHTML = `
      <div class="road-trip">
        <div class="road-trip__labels"><span>Annecy</span><span>Stockholm</span></div>
        <div class="road-trip__line"><span class="road-trip__done" style="width:${progress}%"></span><span class="road-trip__van" style="left:${progress}%" aria-hidden="true">▰</span></div>
        <p>${stage === events.length ? "Voilà. On y est." : event.text}</p>
        <button class="primary-button" type="button">${stage === events.length ? "Regarder autour de nous" : event.action}</button>
      </div>`;
    container.querySelector("button").addEventListener("click", () => {
      if (stage === events.length) return onComplete();
      stage += 1;
      draw();
    }, { once: true });
  };
  draw();
}
