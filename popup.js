const toggleMetrics = document.getElementById('toggleMetrics');
const toggleMutuals = document.getElementById('toggleMutuals');
const toggleNotes = document.getElementById('toggleNotes');
const exportBtn = document.getElementById('exportBtn');

// Load current state
chrome.storage.sync.get(['hideMetrics', 'showMutuals', 'showNotes'], function(result) {
  toggleMetrics.checked = result.hideMetrics !== false;
  toggleMutuals.checked = result.showMutuals !== false;
  toggleNotes.checked = result.showNotes !== false;
});

// Handle metrics toggle
toggleMetrics.addEventListener('change', function() {
  chrome.storage.sync.set({ hideMetrics: toggleMetrics.checked });
});

// Handle mutuals toggle
toggleMutuals.addEventListener('change', function() {
  chrome.storage.sync.set({ showMutuals: toggleMutuals.checked });
});

// Handle notes toggle
toggleNotes.addEventListener('change', function() {
  chrome.storage.sync.set({ showNotes: toggleNotes.checked });
});

// Handle My Notes button - open dashboard directly
exportBtn.addEventListener('click', function() {
  // Open dashboard directly from popup - no need for active X tab
  chrome.tabs.create({ url: chrome.runtime.getURL('dashboard.html') });
});
