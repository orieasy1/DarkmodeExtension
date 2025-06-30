import { getStyleElements, isManageableStyle, StyleElement } from './styleCollector';

export interface StyleManager {
    element: StyleElement;
    originalCSS: string;
    darkCSS: string;
    apply(): void;
    destroy(): void;
}

/**
 * 다크 모드에 맞춰 CSS를 수정하는 간단한 매니저 생성
 */
export function manageStyle(element: StyleElement): StyleManager {
    const originalCSS = element instanceof HTMLStyleElement
        ? element.textContent || ''
        : '';

    // TODO: 추후 link 태그에서 CSS 가져오는 로직 추가 필요

    const darkCSS = convertToDarkCSS(originalCSS);

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
 * 예시 변환: 단순히 색상만 반전하는 더미 구현
 */
function convertToDarkCSS(css: string): string {
    // 색상 관련 키워드 변환
    return css
        // 텍스트 색상
        .replace(/color:\s*(black|#000|rgb\(0,\s*0,\s*0\));?/gi, 'color: #eeeeee;')
        .replace(/color:\s*#222;?/gi, 'color: #dddddd;')

        // 배경색
        .replace(/background(?:-color)?:\s*(white|#fff|#ffffff|rgb\(255,\s*255,\s*255\));?/gi, 'background-color: #1e1e1e;')

        // 테두리 색상 (흰색→회색)
        .replace(/border-color:\s*(white|#fff|#ffffff);?/gi, 'border-color: #888;')

        // 강조 텍스트 색
        .replace(/color:\s*(red|blue|green);?/gi, 'color: #ffa726;');
}


/**
 * 문서 내의 모든 관리 가능한 스타일 요소 수집 및 매니저 생성
 */
export function getManageableStyles(root: ParentNode = document): StyleManager[] {
    const styles = getStyleElements(root).filter(isManageableStyle);
    return styles.map(manageStyle);
}
