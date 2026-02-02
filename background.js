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

// ===== AUTO BACKUP =====

// Set up daily backup alarm on install/update
chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create('dailyBackup', {
    delayInMinutes: 1, // First backup 1 min after install
    periodInMinutes: 1440 // Then every 24 hours
  });
});

// Also ensure alarm exists on startup
chrome.runtime.onStartup.addListener(() => {
  chrome.alarms.get('dailyBackup', (alarm) => {
    if (!alarm) {
      chrome.alarms.create('dailyBackup', {
        delayInMinutes: 60, // Backup in 1 hour
        periodInMinutes: 1440 // Then every 24 hours
      });
    }
  });
});

// Handle alarm
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'dailyBackup') {
    performAutoBackup();
  }
});

// Perform the backup
function performAutoBackup() {
  chrome.storage.sync.get(['autoBackup'], (settings) => {
    // Check if auto-backup is enabled (default: true)
    if (settings.autoBackup === false) return;

    chrome.storage.local.get(['userNotes', 'lastBackupDate'], (result) => {
      const notes = result.userNotes || {};

      // Skip if no notes
      if (Object.keys(notes).length === 0) return;

      // Check if already backed up today
      const today = new Date().toISOString().slice(0, 10);
      if (result.lastBackupDate === today) return;

      // Create backup
      const dataStr = JSON.stringify(notes, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);

      chrome.downloads.download({
        url: url,
        filename: `emilios-backup-${today}.json`,
        saveAs: false // Silent download to default folder
      }, () => {
        // Mark today as backed up
        chrome.storage.local.set({ lastBackupDate: today });
        URL.revokeObjectURL(url);
      });
    });
  });
}

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
