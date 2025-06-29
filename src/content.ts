import { loadSetting } from './ui/stateManager';

// dark-mode.css를 동적으로 삽입
function applyDarkMode(apply: boolean) {
  const id = 'ixlab-dark-style';
  const existingStyle = document.getElementById(id);

  if (apply && !existingStyle) {
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = chrome.runtime.getURL('dark-mode.css');
    document.head.appendChild(link);
  } else if (!apply && existingStyle) {
    existingStyle.remove();
  }
}

// 폰트 굵기 적용
function applyFontWeight(value: number) {
  document.documentElement.style.setProperty('font-weight', value.toString());
}

// 메시지 수신 핸들러
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'TOGGLE_DARK_MODE') {
    // 현재 상태를 불러와서 반대로 적용
    loadSetting<boolean>('darkMode').then((prev) => {
      const newState = !prev;
      applyDarkMode(newState);
    });
  }

  if (message.type === 'SET_FONT_WEIGHT') {
    applyFontWeight(message.value);
  }
});

// 페이지 로드시 저장된 설정 자동 적용
(async () => {
  const darkMode = await loadSetting<boolean>('darkMode');
  const fontWeight = await loadSetting<number>('fontWeight');

  if (darkMode) {
    applyDarkMode(true);
  }
  if (fontWeight) {
    applyFontWeight(fontWeight);
  }
})();
