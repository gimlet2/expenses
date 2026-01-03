// OPTION 1 (Recommended): Edit index.html directly
// Open index.html, find the CONFIG object, and replace the placeholder values

// OPTION 2: Use this external config file
// 1. Copy this file: cp config.example.js config.js
// 2. Fill in your actual values below
// 3. In index.html, remove or comment out the CONFIG object
// 4. Add this line before the closing </body> tag: <script src="config.js"></script>

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
    scopes: 'https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email'
};
