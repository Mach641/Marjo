// Presentation only: callers supply existing screen text and opt in per active phase.
export function gameplayHeader({ theme, title, description = "", compact = false }) {
  return `<header class="gameplay-header${compact ? " gameplay-header--compact" : ""}">
    <p class="gameplay-header__theme">${theme}</p>
    <h1>${title}</h1>
    ${description ? `<div class="gameplay-header__description">${description}</div>` : ""}
    <div class="gameplay-header__divider" aria-hidden="true"><img src="assets/gameplay/v1-4-23/divider-terracotta.png" width="2172" height="724" alt="" /></div>
  </header>`;
}
