// X Vanity Metrics Hider - Content Script

// ===== NOTES SYSTEM =====
let userNotes = {};

// Available quick labels
const QUICK_LABELS = [
  { id: 'pond', text: 'POND', color: '#f59e0b', icon: '⏺️' },
  { id: 'bot', text: 'BOT', color: '#ef4444', icon: '🤖' },
  { id: 'billboard', text: 'BILLBOARD', color: '#8b5cf6', icon: '📱' },
  { id: 'grifter', text: 'GRIFTER', color: '#64748b', icon: '💀' }
];

// Load notes from storage
function loadNotes() {
  chrome.storage.local.get(['userNotes'], (result) => {
    userNotes = result.userNotes || {};
    applyNotesIndicators();
  });
}

// Save notes to storage
function saveNotes() {
  chrome.storage.local.set({ userNotes });
}

// Get notes for a user (returns object with entries, labels, and screenshots)
function getUserData(screenName) {
  const data = userNotes[screenName.toLowerCase()];
  if (!data) return null;

  // Handle old format - migrate to new structure
  if (Array.isArray(data)) {
    return { entries: data, labels: [], screenshots: [] };
  }
  if (typeof data === 'string') {
    return { entries: [{ text: data, date: null, handle: screenName }], labels: [], screenshots: [] };
  }
  if (data.text && !data.entries) {
    return { entries: [data], labels: [], screenshots: [] };
  }

  return { entries: data.entries || [], labels: data.labels || [], screenshots: data.screenshots || [] };
}

// Get notes for a user (returns array of log entries)
function getNotes(screenName) {
  const userData = getUserData(screenName);
  if (!userData) return null;
  return userData.entries.length > 0 ? userData.entries : null;
}

// Get labels for a user
function getLabels(screenName) {
  const userData = getUserData(screenName);
  if (!userData) return [];
  return userData.labels || [];
}

// Check if user has any screenshots (legacy or entry-level)
function hasScreenshots(screenName) {
  const userData = getUserData(screenName);
  if (!userData) return false;
  // Check legacy screenshots
  if (userData.screenshots && userData.screenshots.length > 0) return true;
  // Check entry-level screenshots
  if (userData.entries) {
    for (const entry of userData.entries) {
      if (entry.screenshot) return true;
    }
  }
  return false;
}

// Set labels for a user
function setLabels(screenName, labels) {
  const key = screenName.toLowerCase();
  let userData = getUserData(screenName) || { entries: [], labels: [] };
  userData.labels = labels;
  userNotes[key] = userData;
  saveNotes();
  applyNotesIndicators();
}

// Toggle a label for a user
function toggleLabel(screenName, labelId) {
  const key = screenName.toLowerCase();
  let userData = getUserData(screenName) || { entries: [], labels: [], screenshots: [] };

  const index = userData.labels.indexOf(labelId);
  if (index > -1) {
    userData.labels.splice(index, 1);
  } else {
    userData.labels.push(labelId);
  }

  userNotes[key] = userData;
  saveNotes();
  applyNotesIndicators();
}

// Add a screenshot for a user (legacy - stored at user level)
function addScreenshot(screenName, dataUrl, postUrl = null) {
  const key = screenName.toLowerCase();
  let userData = getUserData(screenName) || { entries: [], labels: [], screenshots: [] };

  userData.screenshots = userData.screenshots || [];
  userData.screenshots.push({
    data: dataUrl,
    date: new Date().toISOString(),
    postUrl: postUrl
  });

  userNotes[key] = userData;
  saveNotes();
}

// Attach screenshot to the last (most recent) note entry
function attachScreenshotToLastEntry(screenName, dataUrl) {
  const key = screenName.toLowerCase();
  let userData = getUserData(screenName);
  if (!userData || !userData.entries || userData.entries.length === 0) {
    console.error('No entries to attach screenshot to');
    return;
  }

  // Attach to the last entry
  const lastIndex = userData.entries.length - 1;
  userData.entries[lastIndex].screenshot = dataUrl;

  userNotes[key] = userData;
  saveNotes();
}

// Delete a legacy screenshot (stored at user level)
function deleteScreenshot(screenName, index) {
  const key = screenName.toLowerCase();
  let userData = getUserData(screenName);
  if (!userData || !userData.screenshots || index >= userData.screenshots.length) return;

  userData.screenshots.splice(index, 1);
  userNotes[key] = userData;
  saveNotes();
}

// Delete a screenshot attached to an entry
function deleteEntryScreenshot(screenName, entryIndex) {
  const key = screenName.toLowerCase();
  let userData = getUserData(screenName);
  if (!userData || !userData.entries || entryIndex >= userData.entries.length) return;

  delete userData.entries[entryIndex].screenshot;
  userNotes[key] = userData;
  saveNotes();
}

// Capture screenshot of a tweet
async function capturePostScreenshot(postUrl) {
  // Find the article element containing this post
  const articles = document.querySelectorAll('article');
  let targetArticle = null;

  for (const article of articles) {
    const timeLink = article.querySelector('a[href*="/status/"]');
    if (timeLink && postUrl.includes(timeLink.getAttribute('href'))) {
      targetArticle = article;
      break;
    }
  }

  if (!targetArticle) {
    alert('Could not find the post to screenshot. Make sure the post is visible on screen.');
    return null;
  }

  // Use html2canvas-like approach with canvas
  try {
    const canvas = document.createElement('canvas');
    const rect = targetArticle.getBoundingClientRect();

    canvas.width = rect.width * 2; // Higher resolution
    canvas.height = rect.height * 2;

    const ctx = canvas.getContext('2d');
    ctx.scale(2, 2);

    // Draw background
    ctx.fillStyle = '#15202b';
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Convert to image using SVG foreignObject
    const data = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${rect.width}" height="${rect.height}">
        <foreignObject width="100%" height="100%">
          <div xmlns="http://www.w3.org/1999/xhtml">
            ${targetArticle.outerHTML}
          </div>
        </foreignObject>
      </svg>
    `;

    const img = new Image();
    const svgBlob = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    return new Promise((resolve) => {
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        URL.revokeObjectURL(url);
        resolve(canvas.toDataURL('image/png'));
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        // Fallback: just save a placeholder
        resolve(null);
      };
      img.src = url;
    });
  } catch (e) {
    console.error('Screenshot failed:', e);
    return null;
  }
}

// Get latest note text for tooltip
function getLatestNoteText(screenName) {
  const notes = getNotes(screenName);
  if (!notes || notes.length === 0) return null;
  return notes[notes.length - 1].text;
}

// Format date as DD/MM/YYYY
function formatDate(date) {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

// Format notes as log entries for display (returns HTML)
function formatNotesLog(notes) {
  if (!notes || notes.length === 0) return '';
  return notes.map((entry, index) => {
    const dateStr = entry.date ? formatDate(entry.date) : '??/??/????';
    const handle = entry.handle || '???';
    const escapedText = entry.text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const hasScreenshot = entry.screenshot ? '<span class="x-honest-has-screenshot" title="Has screenshot attached">📷</span>' : '';
    return `<div class="x-honest-note-entry" data-index="${index}">
      <span class="x-honest-note-text">- ${escapedText} [${dateStr}, @${handle}] ${hasScreenshot}</span>
      <span class="x-honest-note-actions">
        <button class="x-honest-note-edit" title="Edit">✏️</button>
        <button class="x-honest-note-delete-entry" title="Delete">🗑️</button>
      </span>
    </div>`;
  }).join('');
}

// Edit a specific note entry
function editNoteEntry(screenName, index, newText) {
  const key = screenName.toLowerCase();
  let userData = getUserData(screenName);
  if (!userData || !userData.entries || index >= userData.entries.length) return;

  if (newText.trim()) {
    userData.entries[index].text = newText.trim();
    userData.entries[index].date = new Date().toISOString();
    userData.entries[index].handle = screenName;
    userNotes[key] = userData;
  } else {
    // Empty text means delete
    userData.entries.splice(index, 1);
    if (userData.entries.length === 0 && (!userData.labels || userData.labels.length === 0) && (!userData.screenshots || userData.screenshots.length === 0)) {
      delete userNotes[key];
    } else {
      userNotes[key] = userData;
    }
  }
  saveNotes();
  applyNotesIndicators();
}

// Delete a specific note entry
function deleteNoteEntry(screenName, index) {
  const key = screenName.toLowerCase();
  let userData = getUserData(screenName);
  if (!userData || !userData.entries || index >= userData.entries.length) return;

  userData.entries.splice(index, 1);
  if (userData.entries.length === 0 && (!userData.labels || userData.labels.length === 0) && (!userData.screenshots || userData.screenshots.length === 0)) {
    delete userNotes[key];
  } else {
    userNotes[key] = userData;
  }
  saveNotes();
  applyNotesIndicators();
}

// Add a new note entry (appends to log)
function addNote(screenName, noteText) {
  const key = screenName.toLowerCase();
  if (!noteText.trim()) return;

  let userData = getUserData(screenName) || { entries: [], labels: [] };
  userData.entries.push({
    text: noteText.trim(),
    date: new Date().toISOString(),
    handle: screenName
  });

  userNotes[key] = userData;
  saveNotes();
  applyNotesIndicators();
}

// Clear all notes for a user
function clearNotes(screenName) {
  const key = screenName.toLowerCase();
  delete userNotes[key];
  saveNotes();
  applyNotesIndicators();
}

// Export all notes as HTML with screenshots - LIVE updating version
function exportNotesCSV() {
  console.log('exportNotesCSV called');
  // Open the dashboard page as an extension page (has chrome.storage access)
  const dashboardUrl = chrome.runtime.getURL('dashboard.html');
  window.open(dashboardUrl, '_blank');
}
// Create notes modal
function createNotesModal() {
  let modal = document.getElementById('x-honest-notes-modal');

  if (modal) {
    // Modal exists, just make sure event listeners work by removing and recreating
    // This ensures fresh event binding
    return;
  }

  modal = document.createElement('div');
  modal.id = 'x-honest-notes-modal';
  modal.innerHTML = `
    <div class="x-honest-modal-backdrop"></div>
    <div class="x-honest-modal-content">
      <div class="x-honest-modal-header">
        <span class="x-honest-modal-title">Notes for @<span id="x-honest-note-username"></span></span>
        <button class="x-honest-modal-close">&times;</button>
      </div>
      <div class="x-honest-labels-row" id="x-honest-labels-row">
        <span class="x-honest-labels-title">Account labels:</span>
        <div class="x-honest-labels-buttons" id="x-honest-labels-buttons"></div>
      </div>
      <div id="x-honest-notes-log" class="x-honest-notes-log"></div>
      <div id="x-honest-screenshots" class="x-honest-screenshots"></div>
      <div class="x-honest-note-input-row">
        <input type="text" id="x-honest-note-input" placeholder="Add a new note..." />
        <button id="x-honest-btn-add" class="x-honest-btn x-honest-btn-add">Add</button>
      </div>
      <div class="x-honest-note-url-row" id="x-honest-note-url-row" style="display: none;">
        <label class="x-honest-checkbox-label">
          <input type="checkbox" id="x-honest-include-url" />
          <span>Include post URL</span>
        </label>
        <span id="x-honest-post-url" class="x-honest-post-url"></span>
        <button id="x-honest-btn-screenshot" class="x-honest-btn x-honest-btn-screenshot" title="Paste image from clipboard (take screenshot with Win+Shift+S first)">📷 Paste Image</button>
        <input type="file" id="x-honest-file-input" accept="image/*" style="display:none" />
      </div>
      <div class="x-honest-modal-footer">
        <button class="x-honest-btn x-honest-btn-delete">Clear All</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  // Event listeners
  modal.querySelector('.x-honest-modal-backdrop').addEventListener('click', closeNotesModal);
  modal.querySelector('.x-honest-modal-close').addEventListener('click', closeNotesModal);

  // Add button click handler
  const addBtn = modal.querySelector('#x-honest-btn-add');
  addBtn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log('Add button clicked');
    addCurrentNote();
  });

  modal.querySelector('.x-honest-btn-delete').addEventListener('click', deleteCurrentNotes);

  // Screenshot button handler - paste from clipboard and attach to LAST note entry
  modal.querySelector('#x-honest-btn-screenshot').addEventListener('click', async function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!currentNoteUser) {
      alert('No user selected');
      return;
    }

    // Check if user has any notes to attach screenshot to
    const notes = getNotes(currentNoteUser);
    if (!notes || notes.length === 0) {
      alert('Add a note first, then attach a screenshot to it.');
      return;
    }

    const btn = this;
    btn.textContent = '📷 Reading clipboard...';
    btn.disabled = true;

    try {
      const clipboardItems = await navigator.clipboard.read();
      let imageFound = false;

      for (const item of clipboardItems) {
        const imageType = item.types.find(type => type.startsWith('image/'));
        if (imageType) {
          const blob = await item.getType(imageType);
          const reader = new FileReader();
          reader.onload = function(evt) {
            const dataUrl = evt.target.result;
            // Attach screenshot to the LAST (most recent) note entry
            attachScreenshotToLastEntry(currentNoteUser, dataUrl);
            btn.textContent = '📷 Saved!';
            setTimeout(() => {
              btn.textContent = '📷 Paste Image';
              btn.disabled = false;
              openNotesModal(currentNoteUser, currentPostUrl);
            }, 1000);
          };
          reader.readAsDataURL(blob);
          imageFound = true;
          break;
        }
      }

      if (!imageFound) {
        alert('No image found in clipboard.\n\nTip: Use Win+Shift+S (Windows) or Cmd+Shift+4 (Mac) to capture a screenshot first, then click this button.');
        btn.textContent = '📷 Paste Image';
        btn.disabled = false;
      }
    } catch (err) {
      console.error('Clipboard read error:', err);
      alert('Could not read clipboard. You can also right-click the button to upload an image file.\n\nError: ' + err.message);
      btn.textContent = '📷 Paste Image';
      btn.disabled = false;
    }
  });

  // Right-click to upload file instead
  modal.querySelector('#x-honest-btn-screenshot').addEventListener('contextmenu', function(e) {
    e.preventDefault();
    const notes = getNotes(currentNoteUser);
    if (!notes || notes.length === 0) {
      alert('Add a note first, then attach a screenshot to it.');
      return;
    }
    modal.querySelector('#x-honest-file-input').click();
  });

  // File input handler
  modal.querySelector('#x-honest-file-input').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file || !currentNoteUser) return;

    const reader = new FileReader();
    reader.onload = function(evt) {
      const dataUrl = evt.target.result;
      attachScreenshotToLastEntry(currentNoteUser, dataUrl);
      openNotesModal(currentNoteUser, currentPostUrl);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  });

  // Enter key to add note
  modal.querySelector('#x-honest-note-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addCurrentNote();
    }
  });

  // ESC to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeNotesModal();
  });
}

let currentNoteUser = null;
let currentPostUrl = null;

function openNotesModal(screenName, postUrl = null) {
  createNotesModal();
  currentNoteUser = screenName;
  currentPostUrl = postUrl;
  const modal = document.getElementById('x-honest-notes-modal');
  document.getElementById('x-honest-note-username').textContent = screenName;

  console.log('Opening modal for:', screenName, 'with postUrl:', postUrl);

  // Show/hide URL checkbox
  const urlRow = document.getElementById('x-honest-note-url-row');
  const urlCheckbox = document.getElementById('x-honest-include-url');
  const urlDisplay = document.getElementById('x-honest-post-url');

  console.log('URL row element:', urlRow, 'Checkbox:', urlCheckbox, 'Display:', urlDisplay);

  if (urlRow && urlCheckbox && urlDisplay) {
    if (postUrl) {
      urlRow.style.display = 'flex';
      urlCheckbox.checked = false;
      urlDisplay.textContent = postUrl;
      console.log('URL row shown with:', postUrl);
    } else {
      urlRow.style.display = 'none';
      urlCheckbox.checked = false;
      console.log('URL row hidden - no postUrl');
    }
  } else {
    console.log('URL row elements not found!');
  }

  // Display existing notes log
  const notes = getNotes(screenName);
  const logEl = document.getElementById('x-honest-notes-log');
  if (notes && notes.length > 0) {
    logEl.innerHTML = formatNotesLog(notes);
    logEl.style.display = 'block';

    // Add event listeners for edit/delete buttons
    logEl.querySelectorAll('.x-honest-note-edit').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const entry = e.target.closest('.x-honest-note-entry');
        const index = parseInt(entry.dataset.index);
        const currentNotes = getNotes(currentNoteUser);
        const currentText = currentNotes[index].text;

        const newText = prompt('Edit note:', currentText);
        if (newText !== null && newText.trim() !== currentText) {
          // Confirm before saving changes
          if (confirm('Save changes to this note?')) {
            editNoteEntry(currentNoteUser, index, newText);
            openNotesModal(currentNoteUser, currentPostUrl);
          }
        }
      });
    });

    logEl.querySelectorAll('.x-honest-note-delete-entry').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const entry = e.target.closest('.x-honest-note-entry');
        const index = parseInt(entry.dataset.index);
        // Confirm before deleting
        if (confirm('Delete this note?')) {
          deleteNoteEntry(currentNoteUser, index);
          openNotesModal(currentNoteUser, currentPostUrl);
        }
      });
    });
  } else {
    logEl.innerHTML = '';
    logEl.style.display = 'none';
  }

  // Display screenshots - both legacy (user-level) and entry-level
  const userData = getUserData(screenName);
  const screenshotsEl = document.getElementById('x-honest-screenshots');

  // Collect all screenshots: legacy ones and entry-level ones
  let allScreenshots = [];

  // Legacy screenshots (stored at user level)
  if (userData && userData.screenshots && userData.screenshots.length > 0) {
    userData.screenshots.forEach((ss, idx) => {
      allScreenshots.push({
        data: ss.data,
        type: 'legacy',
        index: idx
      });
    });
  }

  // Entry-level screenshots
  if (userData && userData.entries) {
    userData.entries.forEach((entry, idx) => {
      if (entry.screenshot) {
        allScreenshots.push({
          data: entry.screenshot,
          type: 'entry',
          entryIndex: idx,
          noteText: entry.text.substring(0, 30) + (entry.text.length > 30 ? '...' : '')
        });
      }
    });
  }

  if (allScreenshots.length > 0) {
    screenshotsEl.innerHTML = `
      <div class="x-honest-screenshots-title">Screenshots (${allScreenshots.length}):</div>
      <div class="x-honest-screenshots-grid">
        ${allScreenshots.map((ss, idx) => `
          <div class="x-honest-screenshot-item" data-index="${ss.type === 'legacy' ? ss.index : -1}" data-entry-index="${ss.type === 'entry' ? ss.entryIndex : -1}" data-type="${ss.type}">
            <img src="${ss.data}" alt="Screenshot ${idx + 1}" class="x-honest-screenshot-thumb" title="${ss.type === 'entry' ? 'Attached to: ' + ss.noteText : 'Legacy screenshot'}" />
            <button class="x-honest-screenshot-delete" title="Delete">×</button>
          </div>
        `).join('')}
      </div>
    `;
    screenshotsEl.style.display = 'block';

    // Add delete handlers
    screenshotsEl.querySelectorAll('.x-honest-screenshot-delete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (confirm('Delete this screenshot?')) {
          const item = e.target.closest('.x-honest-screenshot-item');
          const type = item.dataset.type;

          if (type === 'legacy') {
            const idx = parseInt(item.dataset.index);
            deleteScreenshot(currentNoteUser, idx);
          } else if (type === 'entry') {
            const entryIdx = parseInt(item.dataset.entryIndex);
            deleteEntryScreenshot(currentNoteUser, entryIdx);
          }
          openNotesModal(currentNoteUser, currentPostUrl);
        }
      });
    });

    // Add click to enlarge
    screenshotsEl.querySelectorAll('.x-honest-screenshot-thumb').forEach(img => {
      img.addEventListener('click', () => {
        showScreenshotPreview(img.src);
      });
    });
  } else {
    screenshotsEl.innerHTML = '';
    screenshotsEl.style.display = 'none';
  }

  // Clear input
  document.getElementById('x-honest-note-input').value = '';

  // Populate quick labels
  const labelsContainer = document.getElementById('x-honest-labels-buttons');
  const currentLabels = getLabels(screenName);
  labelsContainer.innerHTML = QUICK_LABELS.map(label => {
    const isActive = currentLabels.includes(label.id);
    return `<button class="x-honest-label-btn ${isActive ? 'active' : ''}"
                    data-label-id="${label.id}"
                    style="--label-color: ${label.color}">
              ${label.icon} ${label.text}
            </button>`;
  }).join('');

  // Add click handlers for label buttons
  labelsContainer.querySelectorAll('.x-honest-label-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const labelId = btn.dataset.labelId;
      toggleLabel(currentNoteUser, labelId);
      btn.classList.toggle('active');
    });
  });

  modal.classList.add('visible');
  document.getElementById('x-honest-note-input').focus();
}

function closeNotesModal() {
  const modal = document.getElementById('x-honest-notes-modal');
  if (modal) {
    modal.classList.remove('visible');
  }
  currentNoteUser = null;
}

// Show full-size screenshot preview
function showScreenshotPreview(src) {
  let preview = document.getElementById('x-honest-screenshot-preview');
  if (!preview) {
    preview = document.createElement('div');
    preview.id = 'x-honest-screenshot-preview';
    preview.innerHTML = `
      <div class="x-honest-preview-backdrop"></div>
      <div class="x-honest-preview-content">
        <img src="" alt="Screenshot preview" />
        <button class="x-honest-preview-close">×</button>
      </div>
    `;
    document.body.appendChild(preview);

    preview.querySelector('.x-honest-preview-backdrop').addEventListener('click', () => {
      preview.classList.remove('visible');
    });
    preview.querySelector('.x-honest-preview-close').addEventListener('click', () => {
      preview.classList.remove('visible');
    });
  }

  preview.querySelector('img').src = src;
  preview.classList.add('visible');
}

function addCurrentNote() {
  console.log('addCurrentNote called, currentNoteUser:', currentNoteUser);
  if (!currentNoteUser) {
    console.log('No currentNoteUser set!');
    return;
  }

  const inputEl = document.getElementById('x-honest-note-input');
  if (!inputEl) {
    console.log('Input element not found!');
    return;
  }

  let noteText = inputEl.value;
  console.log('Note text:', noteText);

  if (noteText.trim()) {
    // Check if URL should be included
    const urlCheckbox = document.getElementById('x-honest-include-url');
    if (urlCheckbox && urlCheckbox.checked && currentPostUrl) {
      noteText = noteText.trim() + ' - ' + currentPostUrl;
    }
    addNote(currentNoteUser, noteText);
    // Refresh the log display (keep the post URL context)
    openNotesModal(currentNoteUser, currentPostUrl);
  }
}

function deleteCurrentNotes() {
  if (currentNoteUser) {
    clearNotes(currentNoteUser);
  }
  closeNotesModal();
}

// Create label badges HTML
function createLabelBadges(labels, hasScreenshots = false) {
  let html = '';
  // Manual labels (skip 'receipts' since it's now auto)
  if (labels && labels.length > 0) {
    html += labels.filter(lid => lid !== 'receipts').map(labelId => {
      const label = QUICK_LABELS.find(l => l.id === labelId);
      if (!label) return '';
      return `<span class="x-honest-label-badge" style="background-color: ${label.color}">${label.icon} ${label.text}</span>`;
    }).join('');
  }
  // Auto RECEIPTS badge if user has screenshots
  if (hasScreenshots) {
    html += `<span class="x-honest-label-badge" style="background-color: #10b981" title="Has screenshots">🧾 RECEIPTS</span>`;
  }
  return html;
}

// Apply note indicators to usernames
function applyNotesIndicators() {
  // Timeline and sidebar
  document.querySelectorAll('[data-testid="User-Name"], [data-testid="UserCell"]').forEach(container => {
    const screenName = getScreenName(container);
    if (!screenName) return;

    const notes = getNotes(screenName);
    const labels = getLabels(screenName);
    const userHasScreenshots = hasScreenshots(screenName);
    const latestNote = getLatestNoteText(screenName);
    let existingIndicator = container.querySelector('.x-honest-note-btn');
    let existingLabels = container.querySelector('.x-honest-label-badges');

    if (!existingIndicator) {
      // Create wrapper for pencil + labels
      const wrapper = document.createElement('span');
      wrapper.className = 'x-honest-note-wrapper';

      // Create the pencil button
      const btn = document.createElement('span');
      btn.className = 'x-honest-note-btn';
      btn.innerHTML = '✏️';
      btn.title = latestNote || 'Add note';
      btn.dataset.screenName = screenName;

      if (notes) {
        btn.classList.add('has-note');
      }

      // Create labels container
      const labelsSpan = document.createElement('span');
      labelsSpan.className = 'x-honest-label-badges';
      labelsSpan.innerHTML = createLabelBadges(labels, userHasScreenshots);

      wrapper.appendChild(btn);
      wrapper.appendChild(labelsSpan);

      // Find where to insert - after the timestamp
      const userNameContainer = container.querySelector('[data-testid="User-Name"]') || container;
      // Look for the timestamp link (contains /status/)
      let timeLink = userNameContainer.querySelector('a[href*="/status/"]');

      // Also try to find post URL from parent article if not found in username container
      let postUrl = null;

      // Try various methods to find the post URL
      if (timeLink) {
        postUrl = 'https://x.com' + timeLink.getAttribute('href');
      }

      if (!postUrl) {
        // Try to find from parent article - look for time element's parent link
        const article = container.closest('article');
        if (article) {
          // Method 1: time element inside a link with /status/
          const timeEl = article.querySelector('time');
          if (timeEl) {
            const parentLink = timeEl.closest('a[href*="/status/"]');
            if (parentLink) {
              postUrl = 'https://x.com' + parentLink.getAttribute('href');
            }
          }
          // Method 2: any link with /status/ in the article
          if (!postUrl) {
            const statusLink = article.querySelector('a[href*="/status/"]');
            if (statusLink) {
              postUrl = 'https://x.com' + statusLink.getAttribute('href');
            }
          }
        }
      }

      // Store the post URL in the button's dataset
      if (postUrl) {
        btn.dataset.postUrl = postUrl;
        console.log('Found postUrl for', screenName, ':', postUrl);
      } else {
        console.log('No postUrl found for', screenName);
      }

      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        openNotesModal(btn.dataset.screenName, btn.dataset.postUrl || null);
      });
      if (timeLink && timeLink.parentElement) {
        timeLink.parentElement.insertBefore(wrapper, timeLink.nextSibling);
      } else {
        // Fallback: append to the container's first div
        const firstDiv = userNameContainer.querySelector('div');
        if (firstDiv) {
          firstDiv.appendChild(wrapper);
        }
      }
    } else {
      // Update existing indicator
      existingIndicator.title = latestNote || 'Add note';
      existingIndicator.dataset.screenName = screenName;
      if (notes) {
        existingIndicator.classList.add('has-note');
      } else {
        existingIndicator.classList.remove('has-note');
      }

      // Update labels (including auto RECEIPTS based on screenshots)
      if (existingLabels) {
        existingLabels.innerHTML = createLabelBadges(labels, userHasScreenshots);
      }
    }
  });

  // Profile page
  const profileUserName = document.querySelector('[data-testid="UserName"]');
  if (profileUserName) {
    const pathMatch = window.location.pathname.match(/^\/([^\/]+)/);
    if (pathMatch) {
      const screenName = pathMatch[1];
      if (!['home', 'explore', 'notifications', 'messages', 'i', 'settings', 'search', 'compose'].includes(screenName)) {
        const notes = getNotes(screenName);
        const labels = getLabels(screenName);
        const profileHasScreenshots = hasScreenshots(screenName);
        const latestNote = getLatestNoteText(screenName);
        let existingIndicator = profileUserName.querySelector('.x-honest-note-btn');
        let existingLabels = profileUserName.querySelector('.x-honest-label-badges');

        if (!existingIndicator) {
          // Create wrapper for pencil + labels
          const wrapper = document.createElement('span');
          wrapper.className = 'x-honest-note-wrapper';

          const btn = document.createElement('span');
          btn.className = 'x-honest-note-btn';
          btn.innerHTML = '✏️';
          btn.title = latestNote || 'Add note';
          btn.dataset.screenName = screenName;

          if (notes) {
            btn.classList.add('has-note');
          }

          // Create labels container
          const labelsSpan = document.createElement('span');
          labelsSpan.className = 'x-honest-label-badges';
          labelsSpan.innerHTML = createLabelBadges(labels, profileHasScreenshots);

          wrapper.appendChild(btn);
          wrapper.appendChild(labelsSpan);

          btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openNotesModal(btn.dataset.screenName);
          });

          const nameContainer = profileUserName.querySelector('div > div > div');
          if (nameContainer) {
            nameContainer.appendChild(wrapper);
          }
        } else {
          existingIndicator.title = latestNote || 'Add note';
          if (notes) {
            existingIndicator.classList.add('has-note');
          } else {
            existingIndicator.classList.remove('has-note');
          }

          // Update labels (including auto RECEIPTS based on screenshots)
          if (existingLabels) {
            existingLabels.innerHTML = createLabelBadges(labels, profileHasScreenshots);
          }
        }
      }
    }
  }
}

// Context menu removed - using clickable pencil icon instead

// ===== END NOTES SYSTEM =====

// Apply states based on settings
function applyMetricsState(hide) {
  if (hide) {
    document.body.classList.add('hide-vanity-metrics');
  } else {
    document.body.classList.remove('hide-vanity-metrics');
  }
}

function applyMutualsState(show) {
  if (show) {
    document.body.classList.add('show-mutual-badges');
    applyMutualBadges();
  } else {
    document.body.classList.remove('show-mutual-badges');
    removeMutualBadges();
  }
}


// Extract screen name from a container element
function getScreenName(container) {
  const userLink = container.querySelector('a[href^="/"][role="link"]');
  if (userLink) {
    const href = userLink.getAttribute('href');
    const match = href.match(/^\/([^\/]+)/);
    if (match && !['home', 'explore', 'notifications', 'messages', 'i', 'settings', 'search', 'compose'].includes(match[1])) {
      return match[1];
    }
  }
  return null;
}

// Get the tweet author's screen name (not reposter)
function getTweetAuthorScreenName(article) {
  // Look for the User-Name container which has the actual tweet author
  const userNameContainer = article.querySelector('[data-testid="User-Name"]');
  if (!userNameContainer) return null;

  // Get the first link in the User-Name container (this is the author, not reposter)
  const authorLink = userNameContainer.querySelector('a[href^="/"][role="link"]');
  if (authorLink) {
    const href = authorLink.getAttribute('href');
    const match = href.match(/^\/([^\/]+)/);
    if (match && !['home', 'explore', 'notifications', 'messages', 'i', 'settings', 'search', 'compose'].includes(match[1])) {
      return match[1];
    }
  }
  return null;
}

// Apply mutual badges to all applicable elements
async function applyMutualBadges() {
  if (!window.xApiClient) {
    console.log('xApiClient not available');
    return;
  }

  await applyToTimeline();
  await applyToSidebar();
  await applyToProfile();
}

// Apply badges to timeline posts - position after timestamp
async function applyToTimeline() {
  const articles = document.querySelectorAll('article');
  const toProcess = [];

  articles.forEach(article => {
    // Skip if already has badge
    if (article.querySelector('.mutual-badge')) return;
    if (article.dataset.mutualProcessing) return;

    // Find the timestamp element (contains the time link)
    const timeLink = article.querySelector('a[href*="/status/"] time');
    if (!timeLink) return;

    // Get the actual tweet author (not reposter)
    const screenName = getTweetAuthorScreenName(article);
    if (!screenName) return;

    article.dataset.mutualProcessing = 'true';
    toProcess.push({ article, screenName });
  });

  if (toProcess.length === 0) return;

  const screenNames = toProcess.map(p => p.screenName);

  try {
    const relationships = await window.xApiClient.getRelationshipsBatch(screenNames);

    toProcess.forEach(({ article, screenName }) => {
      delete article.dataset.mutualProcessing;

      const rel = relationships.get(screenName);
      if (!rel) return;

      // Only show badge for mutuals
      if (rel.isMutual) {
        insertTimelineBadge(article, screenName);
      }
    });
  } catch (e) {
    console.error('Failed to fetch relationships:', e);
    toProcess.forEach(({ article }) => {
      delete article.dataset.mutualProcessing;
    });
  }
}

// Mark article as having a mutual (CSS handles the yellow color)
function insertTimelineBadge(article, screenName) {
  article.dataset.isMutual = 'true';
}

// Apply badges to sidebar UserCells
async function applyToSidebar() {
  const userCells = document.querySelectorAll('[data-testid="UserCell"]');
  const toProcess = [];

  userCells.forEach(cell => {
    if (cell.querySelector('.mutual-badge')) return;
    if (cell.dataset.mutualProcessing) return;

    const screenName = getScreenName(cell);
    if (!screenName) return;

    cell.dataset.mutualProcessing = 'true';
    toProcess.push({ cell, screenName });
  });

  if (toProcess.length === 0) return;

  const screenNames = toProcess.map(p => p.screenName);

  try {
    const relationships = await window.xApiClient.getRelationshipsBatch(screenNames);

    toProcess.forEach(({ cell, screenName }) => {
      delete cell.dataset.mutualProcessing;

      const rel = relationships.get(screenName);
      if (!rel) return;

      if (rel.isMutual) {
        insertSidebarBadge(cell, screenName);
      }
    });
  } catch (e) {
    console.error('Failed to fetch sidebar relationships:', e);
    toProcess.forEach(({ cell }) => {
      delete cell.dataset.mutualProcessing;
    });
  }
}

// Mark sidebar cell as mutual
function insertSidebarBadge(cell, screenName) {
  cell.dataset.isMutual = 'true';
}

// Apply badge on profile pages (where checkmark was)
async function applyToProfile() {
  const userNameDiv = document.querySelector('[data-testid="UserName"]');
  if (!userNameDiv || userNameDiv.querySelector('.mutual-badge')) return;
  if (userNameDiv.dataset.mutualProcessing) return;

  // Get screen name from URL
  const pathMatch = window.location.pathname.match(/^\/([^\/]+)/);
  if (!pathMatch) return;
  const screenName = pathMatch[1];

  if (['home', 'explore', 'notifications', 'messages', 'i', 'settings', 'search', 'compose'].includes(screenName)) {
    return;
  }

  userNameDiv.dataset.mutualProcessing = 'true';

  try {
    const rel = await window.xApiClient.getRelationship(screenName);
    delete userNameDiv.dataset.mutualProcessing;

    if (!rel) return;

    if (rel.isMutual) {
      insertProfileBadge(userNameDiv, screenName);
    }
  } catch (e) {
    console.error('Failed to fetch profile relationship:', e);
    delete userNameDiv.dataset.mutualProcessing;
  }
}

// Mark profile as mutual (CSS handles the yellow color)
function insertProfileBadge(userNameDiv, screenName) {
  userNameDiv.dataset.isMutual = 'true';
}

// Remove all mutual markers
function removeMutualBadges() {
  document.querySelectorAll('[data-is-mutual]').forEach(el => {
    delete el.dataset.isMutual;
  });
}

// Apply notes state
function applyNotesState(show) {
  if (show) {
    document.body.classList.add('show-personal-notes');
    applyNotesIndicators();
  } else {
    document.body.classList.remove('show-personal-notes');
    // Remove all note indicators
    document.querySelectorAll('.x-honest-note-wrapper').forEach(el => el.remove());
  }
}

// Initialize
function init() {
  chrome.storage.sync.get(['hideMetrics', 'showMutuals', 'showNotes'], function(result) {
    const hideMetrics = result.hideMetrics !== false;
    const showMutuals = result.showMutuals !== false;
    const showNotes = result.showNotes !== false;

    applyMetricsState(hideMetrics);
    applyMutualsState(showMutuals);
    applyNotesState(showNotes);
  });

  // Initialize notes system
  loadNotes();
}

// Run init
if (document.body) {
  init();
} else {
  document.addEventListener('DOMContentLoaded', init);
}

// Listen for setting changes
chrome.storage.onChanged.addListener(function(changes, namespace) {
  if (changes.hideMetrics) {
    applyMetricsState(changes.hideMetrics.newValue);
  }
  if (changes.showMutuals) {
    applyMutualsState(changes.showMutuals.newValue);
  }
  if (changes.showNotes) {
    applyNotesState(changes.showNotes.newValue);
  }
});

// Listen for messages from popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'exportCSV') {
    exportNotesCSV();
  }
});

// Watch for DOM changes
let debounceTimer = null;
const observer = new MutationObserver(function(mutations) {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    chrome.storage.sync.get(['showMutuals', 'showNotes'], function(result) {
      // Apply notes indicators if enabled
      if (result.showNotes !== false) {
        applyNotesIndicators();
      }

      // Apply mutual badges if enabled
      if (result.showMutuals !== false) {
        applyMutualBadges();
      }
    });
  }, 300);
});

if (document.body) {
  observer.observe(document.body, { childList: true, subtree: true });
} else {
  document.addEventListener('DOMContentLoaded', () => {
    observer.observe(document.body, { childList: true, subtree: true });
  });
}
