const PAGE_COUNTS = { small: 3, medium: 6, large: 11 };
const DURATIONS = { small: 2000, medium: 3000, large: 4500 };

export function playTimeTravel(container, options, onComplete) {
  const { direction, intensity = "medium", visualDirections } = options;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const visualDirection = visualDirections[direction];
  const pageCount = PAGE_COUNTS[intensity] || PAGE_COUNTS.medium;
  const duration = reduced ? 500 : DURATIONS[intensity];

  container.innerHTML = `
    <section class="time-travel time-travel--${visualDirection} time-travel--${intensity}" aria-label="Voyage dans le temps">
      <div class="time-travel__book" aria-hidden="true">
        ${Array.from({ length: pageCount }, (_, index) => `<i style="--page:${index};--pages:${pageCount}"></i>`).join("")}
      </div>
      <p>Les pages cherchent leur chemin…</p>
    </section>`;

  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    onComplete();
  };
  const timer = setTimeout(finish, duration);
  container.querySelector(".time-travel").addEventListener("click", finish, { once: true });
  return () => clearTimeout(timer);
}
