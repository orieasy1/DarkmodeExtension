/**
 * Waits for the DOM to be fully loaded and ready.
 * Returns a Promise that resolves once DOMContentLoaded has fired or the document is already in readyState "interactive" or "complete".
 */
export function onDOMReady(): Promise<void> {
    return new Promise((resolve) => {
        if (document.readyState === 'interactive' || document.readyState === 'complete') {
            resolve();
        } else {
            document.addEventListener('DOMContentLoaded', () => resolve(), { once: true });
        }
    });
}

/**
 * Executes a callback once the DOM is ready (for imperative usage).
 */
export function runWhenDOMReady(callback: () => void): void {
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
        callback();
    } else {
        document.addEventListener('DOMContentLoaded', callback, { once: true });
    }
}