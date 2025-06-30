// domWatcher.ts

import { applyGlobalDarkStyle } from './darkmode/styleApplier';

let observer: MutationObserver | null = null;

/**
 * Initializes a MutationObserver to monitor changes in the document.
 * Automatically reapplies global dark styles when relevant changes occur.
 */
export function startWatchingDOM(): void {
    if (observer) return;

    observer = new MutationObserver((mutations) => {
        let needsUpdate = false;

        for (const mutation of mutations) {
            if (mutation.type === 'childList') {
                for (const node of Array.from(mutation.addedNodes)) {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        const el = node as HTMLElement;

                        // Check for <style> or <link rel="stylesheet">
                        if (
                            el.tagName === 'STYLE' ||
                            (el.tagName === 'LINK' &&
                                (el as HTMLLinkElement).rel === 'stylesheet')
                        ) {
                            needsUpdate = true;
                        }

                        // Optional: detect Shadow DOM
                        if ((el.shadowRoot && el.shadowRoot instanceof ShadowRoot)) {
                            needsUpdate = true;
                        }
                    }
                }
            }
        }

        if (needsUpdate) {
            applyGlobalDarkStyle(); // Re-apply dark mode in case it was stripped
        }
    });

    observer.observe(document.documentElement || document.body, {
        childList: true,
        subtree: true,
    });
}

/**
 * Stops observing DOM changes.
 */
export function stopWatchingDOM(): void {
    observer?.disconnect();
    observer = null;
}
