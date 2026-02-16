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


// ===== Custom tooltips =====
(function() {
  const tip = document.getElementById('tooltip');
  if (!tip) return;
  let hideTimeout;

  document.querySelectorAll('[data-tooltip]').forEach(function(el) {
    el.addEventListener('mouseenter', function() {
      clearTimeout(hideTimeout);
      tip.textContent = el.dataset.tooltip;
      tip.style.display = 'block';

      const rect = el.getBoundingClientRect();
      const tipRect = tip.getBoundingClientRect();

      let left = rect.left + (rect.width / 2) - (tipRect.width / 2);
      let top = rect.top - tipRect.height - 6;

      if (left < 4) left = 4;
      if (left + tipRect.width > document.documentElement.clientWidth - 4) {
        left = document.documentElement.clientWidth - tipRect.width - 4;
      }
      if (top < 4) {
        top = rect.bottom + 6;
      }

      tip.style.left = left + 'px';
      tip.style.top = top + 'px';

      requestAnimationFrame(function() { tip.classList.add('visible'); });
    });

    el.addEventListener('mouseleave', function() {
      tip.classList.remove('visible');
      hideTimeout = setTimeout(function() { tip.style.display = 'none'; }, 150);
    });
  });
})();
