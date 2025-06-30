// index.ts
import { onDOMReady } from '../domReady';
import { applyGlobalDarkStyle } from './styleApplier';
import { startWatchingDOM } from '../domWatcher';

/**
 * Initializes and applies dark mode styles.
 * Waits for DOM readiness, applies initial styles, and starts mutation observation.
 */
export async function initDarkMode(): Promise<void> {
    await onDOMReady();

    applyGlobalDarkStyle();
    startWatchingDOM();
}
