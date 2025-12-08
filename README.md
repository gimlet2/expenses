# Expense Tracker

A simple static web application for tracking expenses with Google OAuth authentication and Google Sheets integration. No server required!

## Features

- 🔐 Google OAuth authentication (client-side)
- 💰 Simple expense entry form (amount and item)
- 📊 Automatic data storage in Google Sheets
- 🎨 Clean, responsive UI
- 🚀 Static webpage - no server needed
- 📱 Works on any static hosting (GitHub Pages, Netlify, etc.)

## Prerequisites

Before you begin, ensure you have:

- A Google Cloud Console account
- A Google account
- A web browser
- (Optional) A static hosting service or local web server

## Setup Instructions

### 1. Clone or download the repository

```bash
git clone <repository-url>
cd expenses
```

### 2. Set up Google Cloud Project

#### Create OAuth 2.0 Client ID

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Google Sheets API**:
   - Go to "APIs & Services" → "Enable APIs and Services"
   - Search for "Google Sheets API" and enable it
4. Create OAuth 2.0 Client ID:
   - Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
   - Configure the OAuth consent screen if prompted (External, add test users if needed)
   - Choose "Web application" as the application type
   - Add authorized JavaScript origins:
     - `http://localhost:8000` (for local testing)
     - `https://yourdomain.com` (for production)
   - **Note:** You don't need redirect URIs for this client-side implementation
   - Save and note down your **Client ID**

#### Create API Key

1. In Google Cloud Console, go to "Credentials" → "Create Credentials" → "API Key"
2. (Optional) Restrict the API key to only Google Sheets API for security
3. Note down your **API Key**

### 3. Set up Google Sheets

1. Create a new Google Spreadsheet
2. Note the Spreadsheet ID from the URL:
   - URL format: `https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/edit`
3. Make sure the Google account you'll use to log in has **edit access** to this spreadsheet
4. The first sheet should be named "Sheet1" (or update the code in index.html)
5. (Optional) Add headers in the first row: `Timestamp | Name | Email | Amount | Item`

### 4. Configure the application

Open `index.html` in a text editor and update the `CONFIG` object with your values:

```javascript
const CONFIG = {
    clientId: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com',
    apiKey: 'YOUR_GOOGLE_API_KEY',
    spreadsheetId: 'YOUR_SPREADSHEET_ID',
    discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    scopes: 'https://www.googleapis.com/auth/spreadsheets'
};
```

Alternatively, you can use the external config file:
1. Copy `config.example.js` to `config.js`
2. Fill in your values in `config.js`
3. Update `index.html` to include: `<script src="config.js"></script>` before the closing `</body>` tag

### 5. Run the application

You need to serve the HTML file through a web server (not just open the file directly).

**Option A: Using Python (recommended for local testing)**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Option B: Using Node.js http-server**
```bash
npx http-server -p 8000
```

**Option C: Using VS Code Live Server extension**
- Install the "Live Server" extension
- Right-click on `index.html` and select "Open with Live Server"

**Option D: Deploy to static hosting**
- GitHub Pages
- Netlify
- Vercel
- Firebase Hosting
- Any static web hosting service

Then open your browser and navigate to `http://localhost:8000`

## Usage

1. Open the application in your web browser
2. Click "Sign in with Google"
3. Select your Google account and authorize the application to:
   - View basic profile information
   - Access your Google Sheets
4. Once logged in, you'll see the expense entry form
5. Enter an amount and item description
6. Click "Add Expense"
7. Your expense will be saved to the Google Spreadsheet with timestamp, your name, email, amount, and item

## Data Format

Expenses are stored in Google Sheets with the following columns:
- **Timestamp**: When the expense was added (ISO format)
- **Name**: User's display name
- **Email**: User's email address
- **Amount**: Expense amount
- **Item**: Item/description of the expense

## Security Notes

- Never commit your `config.js` file with actual credentials to version control
- The API key and Client ID are safe to expose in client-side code, but:
  - Restrict the API key to only Google Sheets API in Google Cloud Console
  - Add domain restrictions to your OAuth Client ID
  - Add only authorized domains to your OAuth consent screen
- For production deployment, always use HTTPS
- Users must have edit access to the spreadsheet to add expenses
- Authentication is handled entirely by Google OAuth (client-side)

## Troubleshooting

### "Error: Not a valid origin for the client" or CORS errors
- Make sure you've added your domain/localhost to "Authorized JavaScript origins" in Google Cloud Console
- If testing locally, ensure you're using a web server (not opening the file directly)
- Check that you're using the correct port (e.g., `http://localhost:8000`)

### "Access denied" when writing to spreadsheet
- Verify the Google account you're logged in with has **edit access** to the spreadsheet
- Check that the Spreadsheet ID in the CONFIG is correct
- Ensure the Google Sheets API is enabled in your Google Cloud project

### "Invalid client" or OAuth errors
- Double-check your Client ID is correct in the CONFIG object
- Verify your API key is correct and not restricted incorrectly
- Make sure your OAuth consent screen is configured properly

### Button doesn't work or nothing happens
- Open browser console (F12) to check for errors
- Verify all Google API scripts are loading properly
- Check that you're serving the file through a web server

### "idpiframe_initialization_failed" error
- Make sure you're not opening the HTML file directly (file://)
- Serve it through a web server instead

## License

MIT