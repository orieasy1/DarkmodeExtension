import { Theme, getActiveTheme } from '../theme/theme';
import { applyThemeVariables } from '../theme/variables';

/**
 * 테마에 맞는 전역 스타일을 생성
 */
function generateGlobalCSS(theme: Theme): string {
  return `
    html, body {
      background-color: var(--darkmode-bg-background) !important;
      color: var(--darkmode-text-text) !important;
    }

    * {
      background-color: transparent !important;
      color: var(--darkmode-text-text) !important;
      border-color: var(--darkmode-border-border) !important;
    }

    a {
      color: var(--darkmode-text-accent) !important;
    }

    input, textarea, select, button {
      background-color: var(--darkmode-bg-background) !important;
      color: var(--darkmode-text-text) !important;
      border-color: var(--darkmode-border-border) !important;
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
}

/**
 * 전역 다크 스타일 엘리먼트 생성
 */
function createStyleElement(css: string): HTMLStyleElement {
  const styleEl = document.createElement('style');
  styleEl.classList.add('darkreader--global');
  styleEl.textContent = css;
  return styleEl;
}

/**
 * 전역 다크모드 스타일을 적용
 */
export function applyGlobalDarkStyle(): void {
  if (document.querySelector('.darkreader--global')) return;

  const theme = getActiveTheme();
  applyThemeVariables(theme); // 변수 정의 먼저 적용

  const styleEl = createStyleElement(generateGlobalCSS(theme));
  (document.head || document.documentElement).appendChild(styleEl);
}

/**
 * 전역 다크모드 스타일 제거
 */
export function removeGlobalDarkStyle(): void {
  const existing = document.querySelector('.darkreader--global');
  if (existing) {
    existing.remove();
  }

  const varStyle = document.getElementById('__darkmode-vars__');
  if (varStyle) {
    varStyle.remove();
  }
}
