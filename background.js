// Background service worker for keyboard shortcut

chrome.commands.onCommand.addListener((command) => {
  if (command === 'toggle-extension') {
    // Toggle both settings
    chrome.storage.sync.get(['hideMetrics', 'showMutuals'], (result) => {
      const currentMetrics = result.hideMetrics !== false;
      const currentMutuals = result.showMutuals !== false;

      // If either is on, turn both off. If both are off, turn both on.
      const newState = !(currentMetrics || currentMutuals);

      chrome.storage.sync.set({
        hideMetrics: newState,
        showMutuals: newState
      });
    });
  }
});

// Handle screenshot capture requests from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'captureScreenshot') {
    chrome.tabs.captureVisibleTab(null, { format: 'png' }, (dataUrl) => {
      if (chrome.runtime.lastError) {
        sendResponse({ error: chrome.runtime.lastError.message });
      } else {
        sendResponse({ dataUrl: dataUrl });
      }
    });
    return true; // Keep message channel open for async response
  }
});
