import { convertToDarkCSS } from './modifyColors';
import { getActiveTheme } from '../theme/theme';

/**
 * <link rel="stylesheet"> 요소를 가져와 darkCSS로 변환 후 <style>로 교체
 */
export async function processLinkElement(link: HTMLLinkElement): Promise<HTMLStyleElement | null> {
    try {
        const href = link.href;
        const response = await fetch(href, { mode: 'cors' });
        if (!response.ok) throw new Error(`Fetch failed: ${response.status}`);

        const originalCSS = await response.text();
        const theme = getActiveTheme();
        const darkCSS = convertToDarkCSS(originalCSS, theme);

        const style = document.createElement('style');
        style.textContent = darkCSS;

        // 삽입 위치를 동일하게 유지
        link.parentNode?.insertBefore(style, link);
        link.remove();

        return style;
    } catch (error) {
        console.warn('[Darkmode] Failed to process <link>: ', error);
        return null;
    }
}



/**
 * 문서 내 모든 <link rel="stylesheet"> 처리
 */
export async function processAllLinkElements(root: ParentNode = document): Promise<void> {
    const links = Array.from(root.querySelectorAll('link[rel="stylesheet"]')) as HTMLLinkElement[];
    for (const link of links) {
        await processLinkElement(link);
    }
}