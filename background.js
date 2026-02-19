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
// Layer 1: Sync backup (chrome.storage.sync) — survives reinstalls, syncs across devices
// Layer 2: Local rolling snapshots (chrome.storage.local) — 7 daily snapshots, silent
// Layer 3: Manual export (dashboard) — user-initiated file download

// --- Sync backup: mirror userNotes to chrome.storage.sync ---
// sync has 100KB total / 8KB per key, so we chunk the data

function syncBackup(notes) {
  const dataStr = JSON.stringify(notes);
  if (dataStr.length > 90000) {
    console.warn('[RCRD] Data too large for sync backup (' + dataStr.length + ' bytes), skipping sync');
    return;
  }
  const CHUNK_SIZE = 7000;
  const chunks = [];
  for (let i = 0; i < dataStr.length; i += CHUNK_SIZE) {
    chunks.push(dataStr.slice(i, i + CHUNK_SIZE));
  }
  const syncData = { _backupChunks: chunks.length };
  chunks.forEach((chunk, i) => { syncData[`_backup_${i}`] = chunk; });
  chrome.storage.sync.get(null, (existing) => {
    const keysToRemove = Object.keys(existing).filter(
      k => k.startsWith('_backup_') && parseInt(k.split('_')[2]) >= chunks.length
    );
    if (keysToRemove.length > 0) chrome.storage.sync.remove(keysToRemove);
    chrome.storage.sync.set(syncData, () => {
      if (chrome.runtime.lastError) {
        console.warn('[RCRD] Sync backup failed:', chrome.runtime.lastError.message);
      }
    });
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

// --- Local rolling snapshots: save daily snapshot in chrome.storage.local ---
// Keys: _snapshot_YYYY-MM-DD, keeps last 7

function saveLocalSnapshot(notes) {
  const today = new Date().toISOString().slice(0, 10);
  chrome.storage.local.get(['_lastSnapshotDate'], (result) => {
    if (result._lastSnapshotDate === today) return;
    const snapshotKey = '_snapshot_' + today;
    chrome.storage.local.set({
      [snapshotKey]: JSON.stringify(notes),
      _lastSnapshotDate: today
    }, () => {
      if (chrome.runtime.lastError) {
        console.warn('[RCRD] Snapshot save failed:', chrome.runtime.lastError.message);
        return;
      }
      cleanOldSnapshots();
    });
  });
}

function cleanOldSnapshots() {
  chrome.storage.local.get(null, (all) => {
    const snapshotKeys = Object.keys(all)
      .filter(k => k.startsWith('_snapshot_'))
      .sort()
      .reverse();
    if (snapshotKeys.length <= 7) return;
    const toRemove = snapshotKeys.slice(7);
    chrome.storage.local.remove(toRemove);
  });
}

// --- On every data change: sync + local snapshot ---

chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== 'local' || !changes.userNotes) return;
  const notes = changes.userNotes.newValue || {};
  if (Object.keys(notes).length === 0) return;
  syncBackup(notes);
  saveLocalSnapshot(notes);
});

// --- Daily alarm as fallback ---

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
      saveLocalSnapshot(notes);
    });
  }
});

// --- Auto-restore: if local storage is empty on startup, restore from sync ---

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install' || details.reason === 'update') {
    chrome.storage.local.get(['userNotes'], (result) => {
      const notes = result.userNotes || {};
      if (Object.keys(notes).length > 0) {
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
    return true;
  }
});
