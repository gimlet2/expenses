// Copy this file to config.js and fill in your actual values
// Then update index.html to use: <script src="config.js"></script>

const CONFIG = {
    // Your Google OAuth 2.0 Client ID
    // Get this from Google Cloud Console
    clientId: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com',
    
    // Your Google API Key
    // Get this from Google Cloud Console
    apiKey: 'YOUR_GOOGLE_API_KEY',
    
    // Your Google Spreadsheet ID
    // Get this from the spreadsheet URL: https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/edit
    spreadsheetId: 'YOUR_SPREADSHEET_ID',
    
    // These usually don't need to be changed
    discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    scopes: 'https://www.googleapis.com/auth/spreadsheets'
};
