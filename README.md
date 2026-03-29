# Expense Tracker

A simple, offline-first static web application for tracking expenses. All data is stored locally in your browser using IndexedDB — no account or server required.

## Features

- 💰 Simple expense entry form (amount and item)
- 💾 Local storage using IndexedDB — works completely offline
- 📤 CSV export of all expenses
- 🗑️ Delete individual expenses
- 🎨 Clean, responsive UI
- 🚀 No backend, no login, no external services

## Usage

1. Open `index.html` in any modern web browser.
2. Enter an amount and item description.
3. Click **Add Expense** — the expense is saved immediately in your browser's IndexedDB.
4. Click **Export CSV** to download all expenses as a CSV file.
5. Click **✕** on any expense row to delete it.

## Running locally

Because the app uses IndexedDB (and `URL.createObjectURL` for CSV export), it needs to be served over HTTP rather than opened directly as a `file://` URL in some browsers.

```bash
# Python 3
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

Alternatively, deploy the single `index.html` file to any static hosting service (GitHub Pages, Netlify, Vercel, etc.).

## Data format (CSV export)

| Date | Item | Amount |
|------|------|--------|
| Locale timestamp | Description | Decimal number |

## Browser support

Any modern browser that supports IndexedDB (all evergreen browsers).

## License

MIT
