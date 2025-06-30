// utils/modifyColor.ts

import type { Theme } from '../theme/theme';

/**
 * 다크모드에 맞춰 배경색을 변형
 */
export function modifyBackgroundColor(original: string, theme: Theme): string {
  if (isLightColor(original)) {
    return theme.backgroundColor;
  }
  return original;
}

/**
 * 텍스트 색상 변형
 */
export function modifyTextColor(original: string, theme: Theme): string {
  if (isDarkColor(original)) {
    return theme.textColor;
  }
  return original;
}

/**
 * 테두리 색상 변형
 */
export function modifyBorderColor(original: string, theme: Theme): string {
  if (isLightColor(original)) {
    return theme.borderColor;
  }
  return original;
}

/**
 * 강조 색상 변형 (빨강, 파랑, 초록 등)
 */
export function modifyAccentColor(original: string, theme: Theme): string {
  if (isAccentColor(original)) {
    return theme.accentColor;
  }
  return original;
}

/**
 * 색상 문자열을 간단히 판단 (백색 계열)
 */
function isLightColor(color: string): boolean {
  return /white|#fff|#ffffff|rgb\(255,\s*255,\s*255\)/i.test(color);
}

/**
 * 색상 문자열을 간단히 판단 (흑색 계열)
 */
function isDarkColor(color: string): boolean {
  return /black|#000|#222|rgb\(0,\s*0,\s*0\)/i.test(color);
}

/**
 * 강조 계열 판단
 */
function isAccentColor(color: string): boolean {
  return /red|blue|green/i.test(color);
}

/**
 * CSS 전체 문자열을 받아 변환된 CSS 반환
 */
export function convertToDarkCSS(css: string, theme: Theme): string {
  return css
    .replace(/color:\s*([^;]+);?/gi, (_, c) => `color: ${modifyTextColor(c.trim(), theme)};`)
    .replace(/background(?:-color)?:\s*([^;]+);?/gi, (_, c) => `background-color: ${modifyBackgroundColor(c.trim(), theme)};`)
    .replace(/border-color:\s*([^;]+);?/gi, (_, c) => `border-color: ${modifyBorderColor(c.trim(), theme)};`);
}
