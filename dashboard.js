// Dashboard script - runs in extension context

var LABELS = [
  { id: 'pond', text: 'POND', color: '#f59e0b', icon: '⏺️' },
  { id: 'bot', text: 'BOT', color: '#ef4444', icon: '🤖' },
  { id: 'billboard', text: 'BILLBOARD', color: '#8b5cf6', icon: '📱' },
  { id: 'grifter', text: 'GRIFTER', color: '#64748b', icon: '💀' },
  { id: 'goon', text: 'GOON', color: '#be185d', icon: '🍆' }
  // RECEIPTS is automatic based on screenshot presence
];

var labelDescs = { pond: 'Engagement pod', bot: 'Bot/automated', billboard: 'Billboard account', grifter: 'Grifter', goon: 'Goon', receipts: 'Has receipts' };

// State
var allData = [];
var sortOrder = 'desc';
var filters = { handle: '', countMin: null, countMax: null, labels: [], notes: '' };
var undoStack = []; // Stack of previous states for undo

// Initialize
function init() {
  buildLegend();
  buildLabelFilterOptions();
  setupEventListeners();
  loadData();
}

function buildLegend() {
  var html = '';
  // Show POND and BOT labels
  LABELS.forEach(function(l) {
    html += '<div class="legend-item"><span class="legend-badge" style="background:' + l.color + '">' + l.icon + ' ' + l.text + '</span><span class="legend-desc">' + labelDescs[l.id] + '</span></div>';
  });
  // Add RECEIPTS to legend (auto-generated)
  html += '<div class="legend-item"><span class="legend-badge" style="background:#10b981">🧾 RECEIPTS</span><span class="legend-desc">Has receipts (auto)</span></div>';
  document.getElementById('legendItems').innerHTML = html;
}

function buildLabelFilterOptions() {
  var html = '';
  LABELS.forEach(function(l) {
    html += '<label><input type="checkbox" value="' + l.id + '"> <span class="legend-badge" style="background:' + l.color + '">' + l.icon + ' ' + l.text + '</span></label>';
  });
  // Add receipts filter option (auto label)
  html += '<label><input type="checkbox" value="receipts"> <span class="legend-badge" style="background:#10b981">🧾 RECEIPTS</span></label>';
  document.getElementById('labelFilterOptions').innerHTML = html;
}

function setupEventListeners() {
  // Refresh
  document.getElementById('refreshBtn').onclick = loadData;

  // Undo button
  document.getElementById('undoBtn').onclick = undoLastAction;

  // Reset all filters
  document.getElementById('resetFiltersBtn').onclick = resetAllFilters;

  // Handle search (instant)
  document.getElementById('handleSearch').addEventListener('input', function() {
    filters.handle = this.value.toLowerCase().replace('@', '');
    applyFilters();
  });

  // Filter popups - toggle on click
  document.getElementById('filterCount').onclick = function(e) {
    e.stopPropagation();
    togglePopup('filterCountPopup');
  };
  document.getElementById('filterLabels').onclick = function(e) {
    e.stopPropagation();
    togglePopup('filterLabelsPopup');
  };
  document.getElementById('filterNotes').onclick = function(e) {
    e.stopPropagation();
    togglePopup('filterNotesPopup');
  };

  // Filter Apply/Reset buttons - PROPER EVENT BINDING
  document.getElementById('applyCountBtn').onclick = applyCountFilter;
  document.getElementById('resetCountBtn').onclick = resetCountFilter;
  document.getElementById('applyLabelsBtn').onclick = applyLabelFilter;
  document.getElementById('resetLabelsBtn').onclick = resetLabelFilter;
  document.getElementById('applyNotesBtn').onclick = applyNotesFilter;
  document.getElementById('resetNotesBtn').onclick = resetNotesFilter;

  // Sort by date
  document.getElementById('sortDate').onclick = toggleSort;

  // Modal close
  document.getElementById('modalClose').onclick = closeModal;
  document.getElementById('imageModal').onclick = function(e) {
    if (e.target === this) closeModal();
  };

  // Close popups when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.filter-popup') && !e.target.classList.contains('filter-icon')) {
      closeAllPopups();
    }
    if (!e.target.closest('.label-picker') && !e.target.closest('.label')) {
      closeLabelPicker();
    }
  });

  // Export/Import buttons
  document.getElementById('exportBtn').onclick = exportBackup;
  document.getElementById('importBtn').onclick = function() {
    document.getElementById('importFile').click();
  };
  document.getElementById('importFile').onchange = importBackup;
}

// Export all notes to JSON file
function exportBackup() {
  chrome.storage.local.get(['userNotes'], function(result) {
    var notes = result.userNotes || {};
    var dataStr = JSON.stringify(notes, null, 2);
    var blob = new Blob([dataStr], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    var date = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = 'emilios-backup-' + date + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showStatus('Backup exported!');
  });
}

// Import notes from JSON file
function importBackup(e) {
  var file = e.target.files[0];
  if (!file) return;

  var reader = new FileReader();
  reader.onload = function(event) {
    try {
      var importedNotes = JSON.parse(event.target.result);

      // Validate structure
      if (typeof importedNotes !== 'object') {
        showStatus('Invalid backup file');
        return;
      }

      // Ask user how to handle import
      var choice = confirm('How do you want to import?\n\nOK = Merge with existing notes\nCancel = Replace all notes (WARNING: deletes current notes)');

      if (choice) {
        // Merge: combine imported with existing
        chrome.storage.local.get(['userNotes'], function(result) {
          var existing = result.userNotes || {};

          // Merge each user
          for (var handle in importedNotes) {
            if (existing[handle]) {
              // Merge entries
              var existingEntries = existing[handle].entries || [];
              var importedEntries = importedNotes[handle].entries || [];

              // Add imported entries that don't exist
              importedEntries.forEach(function(entry) {
                var exists = existingEntries.some(function(e) {
                  return e.text === entry.text && e.timestamp === entry.timestamp;
                });
                if (!exists) {
                  existingEntries.push(entry);
                }
              });

              existing[handle].entries = existingEntries;

              // Merge labels
              var existingLabels = existing[handle].labels || [];
              var importedLabels = importedNotes[handle].labels || [];
              importedLabels.forEach(function(label) {
                if (existingLabels.indexOf(label) === -1) {
                  existingLabels.push(label);
                }
              });
              existing[handle].labels = existingLabels;
            } else {
              // New user, add entirely
              existing[handle] = importedNotes[handle];
            }
          }

          chrome.storage.local.set({ userNotes: existing }, function() {
            showStatus('Backup merged!');
            loadData();
          });
        });
      } else {
        // Replace: overwrite everything
        saveStateForUndo(function() {
          chrome.storage.local.set({ userNotes: importedNotes }, function() {
            showStatus('Backup restored!');
            loadData();
          });
        });
      }
    } catch (err) {
      showStatus('Error reading file: ' + err.message);
    }
  };
  reader.readAsText(file);

  // Reset file input so same file can be selected again
  e.target.value = '';
}

function togglePopup(id) {
  closeAllPopups();
  document.getElementById(id).classList.toggle('show');
}

function closeAllPopups() {
  document.querySelectorAll('.filter-popup').forEach(function(p) { p.classList.remove('show'); });
}

function toggleSort() {
  sortOrder = sortOrder === 'desc' ? 'asc' : 'desc';
  document.getElementById('sortDate').textContent = sortOrder === 'desc' ? '▼' : '▲';
  renderTable();
}

// Filter functions
function applyCountFilter() {
  var min = document.getElementById('countMin').value;
  var max = document.getElementById('countMax').value;
  filters.countMin = min ? parseInt(min) : null;
  filters.countMax = max ? parseInt(max) : null;
  document.getElementById('filterCount').classList.toggle('active', filters.countMin !== null || filters.countMax !== null);
  closeAllPopups();
  applyFilters();
}

function resetCountFilter() {
  document.getElementById('countMin').value = '';
  document.getElementById('countMax').value = '';
  filters.countMin = null;
  filters.countMax = null;
  document.getElementById('filterCount').classList.remove('active');
  closeAllPopups();
  applyFilters();
}

function applyLabelFilter() {
  filters.labels = [];
  document.querySelectorAll('#labelFilterOptions input:checked').forEach(function(cb) {
    filters.labels.push(cb.value);
  });
  document.getElementById('filterLabels').classList.toggle('active', filters.labels.length > 0);
  closeAllPopups();
  applyFilters();
}

function resetLabelFilter() {
  document.querySelectorAll('#labelFilterOptions input').forEach(function(cb) { cb.checked = false; });
  filters.labels = [];
  document.getElementById('filterLabels').classList.remove('active');
  closeAllPopups();
  applyFilters();
}

function applyNotesFilter() {
  filters.notes = document.getElementById('notesFilter').value.toLowerCase();
  document.getElementById('filterNotes').classList.toggle('active', filters.notes.length > 0);
  closeAllPopups();
  applyFilters();
}

function resetNotesFilter() {
  document.getElementById('notesFilter').value = '';
  filters.notes = '';
  document.getElementById('filterNotes').classList.remove('active');
  closeAllPopups();
  applyFilters();
}

function resetAllFilters() {
  document.getElementById('handleSearch').value = '';
  document.getElementById('countMin').value = '';
  document.getElementById('countMax').value = '';
  document.getElementById('notesFilter').value = '';
  document.querySelectorAll('#labelFilterOptions input').forEach(function(cb) { cb.checked = false; });
  filters = { handle: '', countMin: null, countMax: null, labels: [], notes: '' };
  document.querySelectorAll('.filter-icon').forEach(function(i) { i.classList.remove('active'); });
  applyFilters();
  showStatus('Filters reset');
}

function applyFilters() {
  renderTable();
}

// Data functions
function loadData() {
  chrome.storage.local.get(['userNotes'], function(result) {
    var storedNotes = result.userNotes || {};
    allData = [];
    var totalUsers = 0;
    var totalNotes = 0;

    for (var handle in storedNotes) {
      totalUsers++;
      var data = storedNotes[handle];
      var entries = [], labels = [], legacyScreenshots = [];

      if (Array.isArray(data)) {
        entries = data;
      } else if (typeof data === 'string') {
        entries = [{ text: data, date: null }];
      } else if (data && typeof data === 'object') {
        entries = data.entries || (data.text ? [data] : []);
        labels = data.labels || [];
        legacyScreenshots = data.screenshots || [];
      }

      totalNotes += entries.length;

      // Check if user has any screenshots (for auto RECEIPTS label)
      var userHasScreenshots = legacyScreenshots.length > 0;

      for (var i = 0; i < entries.length; i++) {
        var e = entries[i];
        var url = extractUrl(e.text);
        var cleanText = removeUrl(e.text);
        var screenshot = e.screenshot || (legacyScreenshots[i] ? (legacyScreenshots[i].data || legacyScreenshots[i]) : null);

        if (screenshot) userHasScreenshots = true;

        allData.push({
          handle: handle,
          labels: labels,
          noteText: cleanText,
          noteDate: e.date,
          postUrl: url,
          screenshot: screenshot,
          noteCount: entries.length,
          entryIndex: i,
          legacyScreenshots: (i === 0) ? legacyScreenshots : [],
          hasScreenshots: userHasScreenshots
        });
      }

      if (entries.length === 0 && (labels.length > 0 || legacyScreenshots.length > 0)) {
        allData.push({
          handle: handle,
          labels: labels,
          noteText: '-',
          noteDate: null,
          postUrl: null,
          screenshot: legacyScreenshots[0] ? (legacyScreenshots[0].data || legacyScreenshots[0]) : null,
          noteCount: 0,
          entryIndex: -1,
          legacyScreenshots: legacyScreenshots,
          hasScreenshots: legacyScreenshots.length > 0
        });
      }
    }

    document.getElementById('userCount').textContent = totalUsers;
    document.getElementById('noteCount').textContent = totalNotes;
    renderTable();
    showStatus('Loaded');
  });
}

function renderTable() {
  var filtered = filterData(allData);
  var sorted = sortData(filtered);
  var grouped = groupByUser(sorted);

  var tb = document.getElementById('tb');
  var html = '';

  grouped.forEach(function(row, idx) {
    // Build labels HTML - show manual labels + auto RECEIPTS if has screenshots
    var labelsHtml = '';
    if (row.isFirstForUser) {
      labelsHtml = '<div class="labels-wrap">';
      // Manual labels (POND, BOT, BILLBOARD)
      row.labels.forEach(function(lid) {
        // Skip receipts from manual labels - it's now auto
        if (lid === 'receipts') return;
        var l = LABELS.find(function(x) { return x.id === lid; });
        if (l) {
          labelsHtml += '<span class="label" style="background:' + l.color + '" data-handle="' + row.handle + '" data-label="' + l.id + '">' + l.icon + ' ' + l.text + '</span>';
        }
      });
      // Auto RECEIPTS label if user has screenshots
      if (row.hasScreenshots) {
        labelsHtml += '<span class="label" style="background:#10b981" title="Has screenshots (auto)">🧾 RECEIPTS</span>';
      }
      // Add label button (larger white cross)
      labelsHtml += '<span class="label label-add" data-handle="' + row.handle + '" title="Add/remove labels">✚</span>';
      labelsHtml += '</div>';
    }

    // Note text with inline edit button
    var noteHtml = escapeHtml(row.noteText) || '-';
    var editBtnHtml = '';
    if (row.entryIndex >= 0) {
      editBtnHtml = '<button class="edit-btn" data-handle="' + row.handle + '" data-index="' + row.entryIndex + '" title="Edit">✏️</button>';
    }

    var refHtml = row.postUrl ? '<a href="' + row.postUrl + '" target="_blank" class="ref-link">View</a>' : '-';

    var receiptHtml = '-';
    if (row.screenshot) {
      receiptHtml = '<span class="show-link" data-screenshot="' + idx + '">Show</span>';
    } else if (row.isFirstForUser && row.legacyScreenshots && row.legacyScreenshots.length > 0) {
      receiptHtml = '<span class="show-link" data-screenshot="' + idx + '">Show (' + row.legacyScreenshots.length + ')</span>';
    }

    var dateHtml = formatDate(row.noteDate);
    var countHtml = row.isFirstForUser ? '<span class="count-text">' + row.noteCount + '</span>' : '';
    var handleHtml = row.isFirstForUser ? '<a href="https://x.com/' + row.handle + '" target="_blank" class="handle-link">@' + row.handle + '</a>' : '';

    // Delete button only in last column
    var deleteHtml = '';
    if (row.entryIndex >= 0) {
      deleteHtml = '<button class="delete-btn" data-handle="' + row.handle + '" data-index="' + row.entryIndex + '" title="Delete">🗑️</button>';
    } else if (row.isFirstForUser) {
      deleteHtml = '<button class="delete-btn" data-handle="' + row.handle + '" data-action="deleteUser" title="Delete user">🗑️</button>';
    }

    var rowClass = row.isFirstForUser ? 'user-first' : '';
    html += '<tr class="' + rowClass + '" data-row-idx="' + idx + '">' +
      '<td class="col-count">' + countHtml + '</td>' +
      '<td class="col-handle">' + handleHtml + '</td>' +
      '<td class="col-labels">' + labelsHtml + '</td>' +
      '<td class="col-notes"><div class="note-cell"><span class="note-text">' + noteHtml + '</span>' + editBtnHtml + '</div></td>' +
      '<td class="col-ref">' + refHtml + '</td>' +
      '<td class="col-receipts">' + receiptHtml + '</td>' +
      '<td class="col-date">' + dateHtml + '</td>' +
      '<td class="col-delete">' + deleteHtml + '</td>' +
      '</tr>';
  });

  tb.innerHTML = html || '<tr><td colspan="8" class="no-data">No notes yet</td></tr>';

  // Store grouped data for reference
  window.groupedData = grouped;

  // Bind events
  bindTableEvents();
}

function bindTableEvents() {
  // Show links (receipts)
  document.querySelectorAll('.show-link').forEach(function(el) {
    el.onclick = function() {
      var idx = parseInt(this.dataset.screenshot);
      var row = window.groupedData[idx];
      if (row) {
        var src = row.screenshot;
        if (!src && row.legacyScreenshots && row.legacyScreenshots.length > 0) {
          src = row.legacyScreenshots[0].data || row.legacyScreenshots[0];
        }
        if (src) showModal(src);
      }
    };
  });

  // Edit buttons (in notes column)
  document.querySelectorAll('.edit-btn').forEach(function(btn) {
    btn.onclick = function() {
      var handle = this.dataset.handle;
      var index = parseInt(this.dataset.index);
      editEntry(handle, index);
    };
  });

  // Delete buttons
  document.querySelectorAll('.delete-btn').forEach(function(btn) {
    btn.onclick = function() {
      var handle = this.dataset.handle;
      var action = this.dataset.action;
      if (action === 'deleteUser') {
        deleteUser(handle);
      } else {
        var index = parseInt(this.dataset.index);
        deleteEntry(handle, index);
      }
    };
  });

  // Label clicks - NO CONFIRMATION for removal
  document.querySelectorAll('.label').forEach(function(el) {
    el.onclick = function(e) {
      e.stopPropagation();
      var handle = this.dataset.handle;
      if (this.classList.contains('label-add')) {
        showLabelPicker(handle, this);
      } else if (this.dataset.label) {
        // Remove label directly - NO confirmation
        toggleUserLabel(handle, this.dataset.label);
      }
      // Auto RECEIPTS labels have no data-label, so clicking them does nothing
    };
  });
}

function filterData(data) {
  return data.filter(function(row) {
    if (filters.handle && row.handle.toLowerCase().indexOf(filters.handle) === -1) return false;
    if (filters.countMin !== null && row.noteCount < filters.countMin) return false;
    if (filters.countMax !== null && row.noteCount > filters.countMax) return false;
    if (filters.labels.length > 0) {
      var hasLabel = filters.labels.some(function(l) {
        // For receipts filter, check hasScreenshots
        if (l === 'receipts') return row.hasScreenshots;
        return row.labels.indexOf(l) >= 0;
      });
      if (!hasLabel) return false;
    }
    if (filters.notes && row.noteText.toLowerCase().indexOf(filters.notes) === -1) return false;
    return true;
  });
}

function sortData(data) {
  return data.slice().sort(function(a, b) {
    var dateA = a.noteDate ? new Date(a.noteDate).getTime() : 0;
    var dateB = b.noteDate ? new Date(b.noteDate).getTime() : 0;
    return sortOrder === 'desc' ? (dateB - dateA) : (dateA - dateB);
  });
}

function groupByUser(data) {
  var grouped = [];
  var userGroups = {};
  var processedUsers = {};

  data.forEach(function(row) {
    if (!userGroups[row.handle]) userGroups[row.handle] = [];
    userGroups[row.handle].push(row);
  });

  data.forEach(function(row) {
    if (!processedUsers[row.handle]) {
      processedUsers[row.handle] = true;
      var userRows = userGroups[row.handle];
      userRows.forEach(function(r, i) {
        r.isFirstForUser = (i === 0);
        grouped.push(r);
      });
    }
  });

  return grouped;
}

// Undo functionality
function saveStateForUndo(callback) {
  chrome.storage.local.get(['userNotes'], function(result) {
    var currentState = JSON.stringify(result.userNotes || {});
    undoStack.push(currentState);
    // Keep only last 10 states
    if (undoStack.length > 10) undoStack.shift();
    updateUndoButton();
    if (callback) callback();
  });
}

function undoLastAction() {
  if (undoStack.length === 0) {
    showStatus('Nothing to undo');
    return;
  }
  var previousState = undoStack.pop();
  var notes = JSON.parse(previousState);
  chrome.storage.local.set({ userNotes: notes }, function() {
    showStatus('Undone');
    updateUndoButton();
    loadData();
  });
}

function updateUndoButton() {
  var btn = document.getElementById('undoBtn');
  if (undoStack.length > 0) {
    btn.disabled = false;
    btn.title = undoStack.length + ' action(s) to undo';
  } else {
    btn.disabled = true;
    btn.title = 'Nothing to undo';
  }
}

// CRUD operations
function editEntry(handle, entryIndex) {
  chrome.storage.local.get(['userNotes'], function(result) {
    var notes = result.userNotes || {};
    var userData = notes[handle];
    if (!userData || !userData.entries || !userData.entries[entryIndex]) {
      alert('Entry not found');
      return;
    }

    var currentText = userData.entries[entryIndex].text;
    var newText = prompt('Edit note:', currentText);

    if (newText !== null && newText.trim() !== currentText) {
      // Save state for undo before making changes
      saveStateForUndo(function() {
        if (newText.trim() === '') {
          if (confirm('Delete this note?')) {
            userData.entries.splice(entryIndex, 1);
            if (userData.entries.length === 0 && (!userData.labels || userData.labels.length === 0)) {
              delete notes[handle];
            } else {
              notes[handle] = userData;
            }
            chrome.storage.local.set({ userNotes: notes }, function() {
              showStatus('Deleted');
              loadData();
            });
          }
        } else {
          // Save directly without confirmation
          userData.entries[entryIndex].text = newText.trim();
          userData.entries[entryIndex].date = new Date().toISOString();
          notes[handle] = userData;
          chrome.storage.local.set({ userNotes: notes }, function() {
            showStatus('Updated');
            loadData();
          });
        }
      });
    }
  });
}

function deleteEntry(handle, entryIndex) {
  if (!confirm('Delete this note?')) return;

  // Save state for undo before deleting
  saveStateForUndo(function() {
    chrome.storage.local.get(['userNotes'], function(result) {
      var notes = result.userNotes || {};
      var userData = notes[handle];
      if (!userData || !userData.entries) return;

      userData.entries.splice(entryIndex, 1);
      if (userData.entries.length === 0 && (!userData.labels || userData.labels.length === 0)) {
        delete notes[handle];
      } else {
        notes[handle] = userData;
      }

      chrome.storage.local.set({ userNotes: notes }, function() {
        showStatus('Deleted');
        loadData();
      });
    });
  });
}

function deleteUser(handle) {
  if (!confirm('Delete ALL data for @' + handle + '?')) return;

  // Save state for undo before deleting user
  saveStateForUndo(function() {
    chrome.storage.local.get(['userNotes'], function(result) {
      var notes = result.userNotes || {};
      delete notes[handle];
      chrome.storage.local.set({ userNotes: notes }, function() {
        showStatus('User deleted');
        loadData();
      });
    });
  });
}

// Label picker
function showLabelPicker(handle, anchorEl) {
  var picker = document.getElementById('labelPicker');
  var rect = anchorEl.getBoundingClientRect();

  chrome.storage.local.get(['userNotes'], function(result) {
    var notes = result.userNotes || {};
    var userData = notes[handle] || { entries: [], labels: [] };
    var currentLabels = userData.labels || [];

    var html = '';
    LABELS.forEach(function(l) {
      var isActive = currentLabels.indexOf(l.id) >= 0;
      html += '<div class="label-picker-item' + (isActive ? ' active' : '') + '" data-handle="' + handle + '" data-label="' + l.id + '">' +
        '<span class="check">' + (isActive ? '✓' : '') + '</span>' +
        '<span class="legend-badge" style="background:' + l.color + '">' + l.icon + ' ' + l.text + '</span>' +
        '</div>';
    });

    picker.innerHTML = html;
    picker.style.top = (rect.bottom + window.scrollY + 5) + 'px';
    picker.style.left = rect.left + 'px';
    picker.classList.add('show');

    picker.querySelectorAll('.label-picker-item').forEach(function(item) {
      item.onclick = function() {
        toggleUserLabel(this.dataset.handle, this.dataset.label);
        closeLabelPicker();
      };
    });
  });
}

function closeLabelPicker() {
  document.getElementById('labelPicker').classList.remove('show');
}

function toggleUserLabel(handle, labelId) {
  // Save state for undo before changing labels
  saveStateForUndo(function() {
    chrome.storage.local.get(['userNotes'], function(result) {
      var notes = result.userNotes || {};
      var userData = notes[handle] || { entries: [], labels: [] };
      if (!userData.labels) userData.labels = [];

      var idx = userData.labels.indexOf(labelId);
      if (idx >= 0) {
        userData.labels.splice(idx, 1);
      } else {
        userData.labels.push(labelId);
      }

      notes[handle] = userData;
      chrome.storage.local.set({ userNotes: notes }, function() {
        showStatus('Label updated');
        loadData();
      });
    });
  });
}

// Modal
function showModal(src) {
  document.getElementById('modalImage').src = src;
  document.getElementById('imageModal').classList.add('show');
}

function closeModal() {
  document.getElementById('imageModal').classList.remove('show');
}

// Helpers
function extractUrl(text) {
  var m = (text || '').match(/https?:\/\/[^\s]+/);
  return m ? m[0] : null;
}

function removeUrl(text) {
  return (text || '').replace(/https?:\/\/[^\s]+/g, '').replace(/\s*-\s*$/, '').trim();
}

function formatDate(d) {
  if (!d) return '-';
  var dt = new Date(d);
  return dt.getDate().toString().padStart(2, '0') + '/' + (dt.getMonth() + 1).toString().padStart(2, '0') + '/' + dt.getFullYear();
}

function escapeHtml(s) {
  return (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function showStatus(msg) {
  var el = document.getElementById('status');
  el.textContent = msg;
  setTimeout(function() { el.textContent = ''; }, 2000);
}

// Auto-refresh on storage changes
chrome.storage.onChanged.addListener(function(changes, namespace) {
  if (namespace === 'local' && changes.userNotes) {
    loadData();
  }
});

// Initialize
init();
