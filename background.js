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
    // Open the My Records dashboard
    chrome.tabs.create({ url: chrome.runtime.getURL('dashboard.html') });
  }
});

// ===== AUTO BACKUP =====

// --- Sync backup: mirror userNotes to chrome.storage.sync (survives reinstalls) ---
// sync has 100KB total / 8KB per key, so we chunk the data

function syncBackup(notes) {
  const dataStr = JSON.stringify(notes);
  const CHUNK_SIZE = 7000; // leave room under 8KB per-key limit
  const chunks = [];
  for (let i = 0; i < dataStr.length; i += CHUNK_SIZE) {
    chunks.push(dataStr.slice(i, i + CHUNK_SIZE));
  }
  const syncData = { _backupChunks: chunks.length };
  chunks.forEach((chunk, i) => { syncData[`_backup_${i}`] = chunk; });
  // Clear old chunks that may exceed new count
  chrome.storage.sync.get(null, (existing) => {
    const keysToRemove = Object.keys(existing).filter(
      k => k.startsWith('_backup_') && parseInt(k.split('_')[2]) >= chunks.length
    );
    if (keysToRemove.length > 0) chrome.storage.sync.remove(keysToRemove);
    chrome.storage.sync.set(syncData);
  });
}

function restoreFromSync(callback) {
  chrome.storage.sync.get(null, (syncData) => {
    const count = syncData._backupChunks;
    if (!count || count === 0) return callback(null);
    let dataStr = '';
    for (let i = 0; i < count; i++) {
      const chunk = syncData[`_backup_${i}`];
      if (!chunk) return callback(null);
      dataStr += chunk;
    }
    try {
      const notes = JSON.parse(dataStr);
      if (typeof notes === 'object' && Object.keys(notes).length > 0) {
        return callback(notes);
      }
    } catch (e) { /* corrupted */ }
    callback(null);
  });
}

// --- On every data change: sync + daily file backup ---

chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== 'local' || !changes.userNotes) return;
  const notes = changes.userNotes.newValue || {};
  if (Object.keys(notes).length === 0) return;
  // Always mirror to sync storage
  syncBackup(notes);
  // File backup: max once per day
  fileBackupIfNeeded(notes);
});

function fileBackupIfNeeded(notes) {
  chrome.storage.sync.get(['autoBackup'], (settings) => {
    if (settings.autoBackup === false) return;
    chrome.storage.local.get(['lastBackupDate'], (result) => {
      const today = new Date().toISOString().slice(0, 10);
      if (result.lastBackupDate === today) return;
      downloadBackupFile(notes, today);
    });
  });
}

function downloadBackupFile(notes, today) {
  const dataStr = JSON.stringify(notes, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  chrome.downloads.download({
    url: url,
    filename: `RCRD/rcrd-backup-${today}.json`,
    saveAs: false
  }, () => {
    chrome.storage.local.set({ lastBackupDate: today });
    URL.revokeObjectURL(url);
    cleanOldBackups();
  });
}

// --- Rolling backups: keep last 7 days, delete older ---

function cleanOldBackups() {
  chrome.downloads.search({ filenameRegex: 'RCRD[/\\\\]rcrd-backup-.*\\.json$' }, (items) => {
    if (!items || items.length <= 7) return;
    const sorted = items.sort((a, b) => b.filename.localeCompare(a.filename));
    const toDelete = sorted.slice(7);
    toDelete.forEach((item) => {
      chrome.downloads.removeFile(item.id);
      chrome.downloads.erase({ id: item.id });
    });
  });
}

// --- Daily alarm as fallback (in case onChanged doesn't fire) ---

chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create('dailyBackup', {
    delayInMinutes: 1,
    periodInMinutes: 1440
  });
});

chrome.runtime.onStartup.addListener(() => {
  chrome.alarms.get('dailyBackup', (alarm) => {
    if (!alarm) {
      chrome.alarms.create('dailyBackup', {
        delayInMinutes: 60,
        periodInMinutes: 1440
      });
    }
  });
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'dailyBackup') {
    chrome.storage.local.get(['userNotes'], (result) => {
      const notes = result.userNotes || {};
      if (Object.keys(notes).length === 0) return;
      syncBackup(notes);
      fileBackupIfNeeded(notes);
    });
  }
});

// --- Auto-restore: if local storage is empty on startup, restore from sync ---

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install' || details.reason === 'update') {
    chrome.storage.local.get(['userNotes'], (result) => {
      const notes = result.userNotes || {};
      if (Object.keys(notes).length > 0) {
        // Data exists, just make sure sync is up to date
        syncBackup(notes);
        return;
      }
      // No local data — try to restore from sync
      restoreFromSync((restored) => {
        if (restored) {
          chrome.storage.local.set({ userNotes: restored });
          console.log('[RCRD] Restored', Object.keys(restored).length, 'records from sync backup');
        }
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
