document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("toggle-darkmode");

  if (!button) return;

  button.addEventListener("click", async () => {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["content.js"]
      });
    } catch (e) {
      // 예외는 내부 처리 없이 무시 (선택적으로 로그 유지 가능)
    }
  });
});
