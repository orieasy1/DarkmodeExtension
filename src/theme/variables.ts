import type { Theme } from './theme';
import { getActiveTheme } from './theme';

const DARK_PREFIX = '--darkmode';

function wrapVar(name: string, type: 'bg' | 'text' | 'border') {
  return `${DARK_PREFIX}-${type}-${name}`;
}

export function generateThemeVariables(theme: Theme): string {
  const lines: string[] = [];

  lines.push(':root {');

  // 주요 속성 기반 변수 대입
  lines.push(`  ${wrapVar('background', 'bg')}: ${theme.backgroundColor};`);
  lines.push(`  ${wrapVar('text', 'text')}: ${theme.textColor};`);
  lines.push(`  ${wrapVar('border', 'border')}: ${theme.borderColor};`);
  lines.push(`  ${wrapVar('accent', 'text')}: ${theme.accentColor};`);

  lines.push('}');

  return lines.join('\n');
}

/**
 * 변수들을 스타일 태그로 DOM에 삽입
 */
export function applyThemeVariables(theme: Theme = getActiveTheme()) {
  let styleEl = document.getElementById('__darkmode-vars__') as HTMLStyleElement;

  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = '__darkmode-vars__';
    document.head.appendChild(styleEl);
  }

  styleEl.textContent = generateThemeVariables(theme);
}
