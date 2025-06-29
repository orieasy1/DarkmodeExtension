type SettingKey = 'darkMode' | 'fontWeight';

export function saveSetting(key: SettingKey, value: any): void {
  chrome.storage.local.set({ [key]: value });
}

export function loadSetting<T>(key: SettingKey): Promise<T | null> {
  return new Promise((resolve) => {
    chrome.storage.local.get(key, (result) => {
      resolve(result[key] ?? null);
    });
  });
}
