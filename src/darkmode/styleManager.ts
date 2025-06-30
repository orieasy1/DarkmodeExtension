// styleManager.ts

import { getStyleElements, isManageableStyle, StyleElement } from './styleCollector';
import { getActiveTheme, type Theme } from '../theme/theme';
import {
    modifyTextColor,
    modifyBackgroundColor,
    modifyBorderColor,
    modifyAccentColor
} from '../utils/modifyColors';
export interface StyleManager {
    element: StyleElement;
    originalCSS: string;
    darkCSS: string;
    apply(): void;
    destroy(): void;
}

/**
 * 단일 스타일 요소를 변환 가능한 매니저로 변환
 */
export function manageStyle(element: StyleElement, theme: Theme): StyleManager {
    const originalCSS = element instanceof HTMLStyleElement
        ? element.textContent || ''
        : '';

    // TODO: <link> 태그에 대한 fetch 처리 등은 이후 확장 가능

    const darkCSS = convertToDarkCSS(originalCSS, theme);

    return {
        element,
        originalCSS,
        darkCSS,

        apply() {
            if (element instanceof HTMLStyleElement) {
                element.textContent = darkCSS;
            }
        },

        destroy() {
            if (element instanceof HTMLStyleElement) {
                element.textContent = originalCSS;
            }
        },
    };
}

/**
 * 기본적인 색상 텍스트 기반의 치환 로직
 * 추후 CSS 파서 기반 처리로 확장 가능
 */
function convertToDarkCSS(css: string, theme: Theme): string {
    return css
        // 텍스트 색상
        .replace(/color:\s*([^;]+);?/gi, (_, c) => {
            const color = c.trim();
            const accented = modifyAccentColor(color, theme);
            const textColor = modifyTextColor(accented, theme);
            return `color: ${textColor};`;
        })
        // 배경색
        .replace(/background(?:-color)?:\s*([^;]+);?/gi, (_, c) => {
            const bgColor = modifyBackgroundColor(c.trim(), theme);
            return `background-color: ${bgColor};`;
        })
        // 테두리색
        .replace(/border-color:\s*([^;]+);?/gi, (_, c) => {
            const borderColor = modifyBorderColor(c.trim(), theme);
            return `border-color: ${borderColor};`;
        });
}

/**
 * 문서 내 모든 관리 가능한 스타일 요소를 수집하여 다크 스타일로 변환
 */
export function getManageableStyles(root: ParentNode = document): StyleManager[] {
    const theme = getActiveTheme();  // 기본적으로 dark 기준
    const styles = getStyleElements(root).filter(isManageableStyle);
    return styles.map((el) => manageStyle(el, theme));
}
