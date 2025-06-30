import { initDarkMode } from './darkmode/index';
import { applyGlobalDarkStyle, removeGlobalDarkStyle } from './darkmode/styleApplier';
import { loadSetting, saveSetting } from './ui/stateManager';

let darkModeEnabled = false;

// 메시지 수신
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'TOGGLE_DARK_MODE') {
        darkModeEnabled = !darkModeEnabled;

        if (darkModeEnabled) {
            applyGlobalDarkStyle();
        } else {
            removeGlobalDarkStyle();
        }

        // 설정 저장
        saveSetting('darkMode', darkModeEnabled);
    }
});

// 초기 로딩 시 다크모드 적용
(async () => {
    const saved = await loadSetting<boolean>('darkMode');
    if (saved) {
        darkModeEnabled = true;
        await initDarkMode();  // DOMReady 후 global style 적용 및 mutation observer 등록
    }
})();
