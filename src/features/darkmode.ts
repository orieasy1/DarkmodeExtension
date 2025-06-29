let enabled = false;

export function toggleDarkMode() {
  const stylesheetId = 'ixlab-darkmode-style';
  const existing = document.getElementById(stylesheetId);
  
  if (existing) {
    existing.remove();
    enabled = false;
  } else {
    const link = document.createElement('link');
    link.id = stylesheetId;
    link.rel = 'stylesheet';
    link.href = chrome.runtime.getURL('dark-mode.css');
    document.head.appendChild(link);
    enabled = true;
  }
}
