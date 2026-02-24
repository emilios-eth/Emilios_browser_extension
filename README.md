# RCRD

**The memory layer for X.**

A Chrome extension that lets you keep private records on users and posts across X/Twitter.

## Features

- **Records** -- Add private notes to any account or post via the pencil icon on your timeline
- **User labels** -- Tag accounts as Engagement Farmer, Bot, Walking Billboard, Grifter, Content Thief, Niche Authority, Good Person, Insightful, or Opinion Leader
- **Post labels** -- Tag individual posts as Shill, Engagement Farming, Misinformation, Stolen Content, Undisclosed Ad, Scam, AI Slop, Alpha, Insightful, or Banger
- **Auto-derived labels** -- Account labels are automatically derived from post-level patterns (e.g. 5+ Shill posts = Walking Billboard)
- **Report undisclosed ads** -- One-click button to report undisclosed advertisements to X
- **Screenshot receipts** -- Paste screenshots from clipboard and attach them to records
- **Zen Mode** -- Hide vanity metrics (likes, retweets, followers) and focus on content
- **Dashboard** -- View, filter, search, and manage all your records in one place with an interactive activity chart

## Installation

1. **Download** -- Click the green "Code" button above, then "Download ZIP"
2. **Unzip** -- Extract the downloaded file
3. **Open browser extensions**
   - Chrome: Go to `chrome://extensions`
   - Brave: Go to `brave://extensions`
   - Edge: Go to `edge://extensions`
4. **Enable Developer Mode** -- Toggle it on (top right corner)
5. **Load the extension** -- Click "Load unpacked" and select the unzipped folder

## Usage

Click the extension icon to toggle features:
- **Records** -- Show/hide the pencil icon for adding records
- **User Labels** -- Show/hide account labels next to usernames on the timeline
- **Report Ad** -- Show/hide the undisclosed ad report button
- **Zen Mode** -- Hide vanity metrics for a distraction-free experience

On any X profile or timeline, click the pencil icon to add records about an account or post.

Open the **dashboard** (`Ctrl+Shift+E`) to see all saved records, filter by labels, and manage your data.

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+Shift+X` | Toggle Zen Mode on/off |
| `Ctrl+Shift+E` | Open Records dashboard |

On Mac, use `Cmd` instead of `Ctrl`.

## Backup & Restore

Your records are protected by three layers of automatic backup:

**1. Cloud sync (automatic)**
- Every data change is instantly mirrored to your browser's sync storage
- Tied to your browser account (Google/Brave) and syncs across devices
- Survives extension reinstalls, folder renames, and browser resets
- Auto-restores from sync when the extension detects empty local storage

**2. Local snapshots (automatic)**
- Saves a daily snapshot of your data inside the extension's own storage
- Rolling retention: keeps the last 7 daily snapshots
- Completely silent -- no download prompts, no files to manage

**3. Manual export**
1. Open the dashboard (`Ctrl+Shift+E`)
2. Click the export button -- saves to `Downloads/RCRD Backups/`

**To restore:**
Click the restore button (clock icon) in the dashboard to choose from:
- **From snapshot** -- Pick a recent daily snapshot
- **From browser sync** -- Pull from your browser account's synced backup
- **From file** -- Import a JSON backup file, then choose **Merge** or **Replace**

## Privacy

All your data stays in your browser. Nothing is sent to any server. Your records are completely private.

## Updates

To update, download the latest version and reload the extension in your browser.
