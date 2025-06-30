// styleApplier.ts

/**
 * Applies global dark mode styling using CSS filters.
 * This is a simple baseline; you can later expand to CSS parsing + transformation.
 */

const DARK_MODE_FILTER = `
  html, body {
    background-color: #121212 !important;
    color: #f0f0f0 !important;
  }

  * {
    background-color: transparent !important;
    color: #f0f0f0 !important;
    border-color: #555 !important;
  }

  a {
    color: #80b3ff !important;
  }

  input, textarea, select, button {
    background-color: #1e1e1e !important;
    color: #f0f0f0 !important;
    border-color: #666 !important;
  }

  img, video, iframe, canvas, svg, picture, object {
    filter: invert(100%) hue-rotate(180deg) !important;
  }

  .darkreader--revert {
    filter: none !important;
    background: initial !important;
    color: initial !important;
  }
`;


export function createDarkStyleElement(): HTMLStyleElement {
    const styleEl = document.createElement('style');
    styleEl.classList.add('darkreader');
    styleEl.classList.add('darkreader--global');
    styleEl.textContent = DARK_MODE_FILTER;
    return styleEl;
}

export function applyGlobalDarkStyle(): void {
    const existing = document.querySelector('.darkreader--global');
    if (existing) return;

    const styleEl = createDarkStyleElement();
    (document.head || document.documentElement).appendChild(styleEl);
}

export function removeGlobalDarkStyle(): void {
    const existing = document.querySelector('.darkreader--global');
    if (existing) {
        existing.remove();
    }
}
