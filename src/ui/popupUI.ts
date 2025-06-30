import { saveSetting, loadSetting } from './stateManager';

document.addEventListener('DOMContentLoaded', async () => {
  const darkModeBtn = document.getElementById('darkModeToggle');
  const fontWeightSlider = document.getElementById('fontWeightSlider') as HTMLInputElement | null;

  // 기존 설정 불러오기
  const savedFontWeight = await loadSetting<number>('fontWeight');
  if (savedFontWeight && fontWeightSlider) {
    fontWeightSlider.value = String(savedFontWeight);
  }

  darkModeBtn?.addEventListener('click', async () => {
    sendMessage({ type: 'TOGGLE_DARK_MODE' });

    // 상태 저장
    const prev = await loadSetting<boolean>('darkMode');
    saveSetting('darkMode', !prev);
  });

  fontWeightSlider?.addEventListener('input', () => {
    const value = Number(fontWeightSlider.value);
    sendMessage({ type: 'SET_FONT_WEIGHT', value });
    saveSetting('fontWeight', value);
  });
});

function sendMessage(message: any) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]?.id != null) {
      chrome.tabs.sendMessage(tabs[0].id, message);
    }
  });
}
