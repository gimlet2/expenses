# Expense Tracker

A simple web application for tracking expenses with Google OAuth authentication and Google Sheets integration.

## Features

- 🔐 Google OAuth authentication
- 💰 Simple expense entry form (amount and item)
- 📊 Automatic data storage in Google Sheets
- 🎨 Clean, responsive UI

## Prerequisites

Before you begin, ensure you have the following:

- Node.js (v14 or higher)
- A Google Cloud Console account
- A Google account

## Setup Instructions

### 1. Clone the repository

```bash
git clone <repository-url>
cd expenses
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - Google+ API
   - Google Sheets API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Configure the OAuth consent screen if prompted
6. Choose "Web application" as the application type
7. Add authorized redirect URIs:
   - `http://localhost:3000/auth/google/callback`
8. Save and note down your Client ID and Client Secret

### 4. Set up Google Sheets

1. Create a new Google Spreadsheet
2. Note the Spreadsheet ID from the URL:
   - URL format: `https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/edit`
3. Make sure the Google account you'll use to log in has access to this spreadsheet
4. The first sheet should be named "Sheet1" (or update the code accordingly)
5. Optionally, add headers in the first row: `Timestamp | Name | Email | Amount | Item`

### 5. Configure environment variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and fill in your values:

```env
PORT=3000
SESSION_SECRET=your-random-session-secret-here
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
SPREADSHEET_ID=your-google-spreadsheet-id-here
```

### 6. Run the application

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Click "Sign in with Google"
3. Authorize the application to access your Google account and Google Sheets
4. Once logged in, you'll be redirected to the expense entry form
5. Enter an amount and item description
6. Click "Add Expense"
7. Your expense will be saved to the Google Spreadsheet

## Data Format

Expenses are stored in Google Sheets with the following columns:
- **Timestamp**: When the expense was added (ISO format)
- **Name**: User's display name
- **Email**: User's email address
- **Amount**: Expense amount
- **Item**: Item/description of the expense

## Security Notes

- Never commit your `.env` file to version control
- Keep your Google OAuth credentials secure
- The session secret should be a random, secure string
- For production deployment, use HTTPS and update the callback URL accordingly

## Troubleshooting

### "Redirect URI mismatch" error
- Ensure the callback URL in your `.env` matches exactly with the authorized redirect URI in Google Cloud Console

### "Access denied" when writing to spreadsheet
- Make sure the Google account you're logged in with has edit access to the spreadsheet
- Verify that the Spreadsheet ID in `.env` is correct
- Check that the Google Sheets API is enabled in your Google Cloud project

### Session issues
- Clear your browser cookies
- Ensure SESSION_SECRET is set in `.env`

## License

MIT