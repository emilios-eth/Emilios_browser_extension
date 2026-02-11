const toggleNotes = document.getElementById('toggleNotes');
const toggleLabels = document.getElementById('toggleLabels');
const toggleReportAd = document.getElementById('toggleReportAd');
const toggleMetrics = document.getElementById('toggleMetrics');
const exportBtn = document.getElementById('exportBtn');

// Load current state
chrome.storage.sync.get(['showNotes', 'showLabels', 'showReportAd', 'hideMetrics'], function(result) {
  toggleNotes.checked = result.showNotes !== false;
  toggleLabels.checked = result.showLabels !== false;
  toggleReportAd.checked = result.showReportAd !== false;
  toggleMetrics.checked = result.hideMetrics !== false;
});

// Handle Records toggle
toggleNotes.addEventListener('change', function() {
  chrome.storage.sync.set({ showNotes: toggleNotes.checked });
});

// Handle User Labels toggle
toggleLabels.addEventListener('change', function() {
  chrome.storage.sync.set({ showLabels: toggleLabels.checked });
});

// Handle Report Ad toggle
toggleReportAd.addEventListener('change', function() {
  chrome.storage.sync.set({ showReportAd: toggleReportAd.checked });
});

// Handle Zen Mode toggle
toggleMetrics.addEventListener('change', function() {
  chrome.storage.sync.set({ hideMetrics: toggleMetrics.checked });
});

// Handle My Records button - open dashboard directly
exportBtn.addEventListener('click', function() {
  chrome.tabs.create({ url: chrome.runtime.getURL('dashboard.html') });
});
