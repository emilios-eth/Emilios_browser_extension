// Background service worker for keyboard shortcut

chrome.commands.onCommand.addListener((command) => {
  if (command === 'toggle-extension') {
    // Toggle hide metrics
    chrome.storage.sync.get(['hideMetrics'], (result) => {
      const current = result.hideMetrics !== false;
      chrome.storage.sync.set({ hideMetrics: !current });
    });
  }

  if (command === 'open-dashboard') {
    // Open the My Notes dashboard
    chrome.tabs.create({ url: chrome.runtime.getURL('dashboard.html') });
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
