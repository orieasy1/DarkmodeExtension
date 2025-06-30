/**
 * 스타일 요소를 대표하는 타입
 */
export type StyleElement = HTMLStyleElement | HTMLLinkElement;

/**
 * 수집 대상: <style>, <link rel="stylesheet">
 * - 조건: <link>는 href가 있어야 함
 */
export function getStyleElements(root: ParentNode = document): StyleElement[] {
    const styles: StyleElement[] = Array.from(root.querySelectorAll('style, link[rel="stylesheet"]'))
        .filter((el): el is StyleElement => {
            if (el instanceof HTMLStyleElement) return true;
            if (el instanceof HTMLLinkElement && el.href) return true;
            return false;
        });

    return styles;
}

/**
 * 특정 요소가 다크모드 처리 대상인지 판단
 */
export function isManageableStyle(el: Node): el is StyleElement {
    return (
        el instanceof HTMLStyleElement ||
        (el instanceof HTMLLinkElement && el.rel === 'stylesheet' && !!el.href)
    );
}
