# Expense Tracker

A simple, offline-first static web application for tracking expenses. All data is stored locally in your browser using IndexedDB — no account or server required.

## Features

- 💰 Simple expense entry form (amount, item, category, date)
- 💾 Local storage using IndexedDB — works completely offline
- 📤 CSV and JSON export of all expenses
- 📥 JSON import to restore or merge expense data
- 📊 Analytics tab with monthly spending bar chart and category donut chart
- 📅 Monthly summary: current month, previous month, and all-time running total
- 💵 Monthly budget with progress bar and over-budget alert
- 🗑️ Delete individual expenses
- ✏️ Edit existing expenses
- 🏖️ Vacation expense tagging and filtering
- 📍 Optional location capture
- 🎨 Clean, responsive UI
- 🚀 No backend, no login, no external services

## Usage

1. Open `index.html` in any modern web browser.
2. Enter an amount and item description.
3. Click **Add Expense** — the expense is saved immediately in your browser's IndexedDB.
4. Click **Export ▾** to download expenses as CSV (current month, previous month, all, or custom range) or as JSON.
5. Click **Import JSON** to load expenses from a previously exported JSON file.
6. Click the **Analytics** tab to view monthly spending charts and a category breakdown.
7. Open **⚙️ Settings** to set a monthly budget, manage categories, or change currency.
8. Click **✕** on any expense row to delete it.

## Running locally

Because the app uses IndexedDB (and `URL.createObjectURL` for CSV export), it needs to be served over HTTP rather than opened directly as a `file://` URL in some browsers.

```bash
# Python 3
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

Alternatively, deploy the single `index.html` file to any static hosting service (GitHub Pages, Netlify, Vercel, etc.).

## Data formats

### CSV export

| Date | Item | Category | Amount (<currency code>) | Vacation | Latitude | Longitude |
|------|------|----------|--------------------------|----------|----------|-----------|
| Locale timestamp | Description | Category label | Decimal number; header includes the selected currency code (for example, `Amount (USD)`) | Yes/No | Optional | Optional |

### JSON export / import

Expenses are exported as a JSON array. Each object contains:
```json
{
  "id": 1,
  "amount": 4.50,
  "item": "Coffee",
  "category": "coffee",
  "timestamp": 1712000000000,
  "vacation": false,
  "latitude": 48.8566,
  "longitude": 2.3522,
  "accuracy": 10
}
```
Required fields for import: `amount` (positive number), `item` (non-empty string), `timestamp` (Unix ms integer).
Optional fields: `category`, `vacation`, `latitude`, `longitude`, `accuracy`.

## Browser support

Any modern browser that supports IndexedDB (all evergreen browsers).

## License

MIT
