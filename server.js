require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { google } = require('googleapis');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;

// Validate required environment variables
if (!process.env.SESSION_SECRET) {
  console.error('ERROR: SESSION_SECRET is not set in environment variables');
  process.exit(1);
}

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.error('ERROR: Google OAuth credentials are not set in environment variables');
  process.exit(1);
}

if (!process.env.SPREADSHEET_ID) {
  console.error('ERROR: SPREADSHEET_ID is not set in environment variables');
  process.exit(1);
}

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 auth attempts per windowMs
  message: 'Too many authentication attempts, please try again later.'
});

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(limiter);
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax'
  }
}));

app.use(passport.initialize());
app.use(passport.session());

// View engine setup
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Passport configuration
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3000/auth/google/callback'
  },
  (accessToken, refreshToken, profile, done) => {
    // Store tokens in user profile for Sheets API access
    profile.accessToken = accessToken;
    profile.refreshToken = refreshToken;
    return done(null, profile);
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Middleware to check if user is authenticated
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

// Google Sheets helper function
async function appendToSheet(auth, amount, item, user) {
  try {
    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.SPREADSHEET_ID;
    
    const timestamp = new Date().toISOString();
    const values = [[timestamp, user.displayName, user.emails[0].value, amount, item]];
    
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:E',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: values
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error appending to sheet:', error);
    throw error;
  }
}

// Routes
app.get('/', (req, res) => {
  res.render('index', { user: req.user });
});

app.get('/auth/google',
  authLimiter,
  passport.authenticate('google', { 
    scope: ['profile', 'email', 'https://www.googleapis.com/auth/spreadsheets'] 
  })
);

app.get('/auth/google/callback',
  authLimiter,
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/expenses');
  }
);

app.get('/expenses', ensureAuthenticated, (req, res) => {
  res.render('expenses', { user: req.user, message: null });
});

app.post('/expenses', ensureAuthenticated, async (req, res) => {
  const { amount, item } = req.body;
  
  if (!amount || !item) {
    return res.render('expenses', { 
      user: req.user, 
      message: { type: 'error', text: 'Both amount and item are required' }
    });
  }

  try {
    // Create OAuth2 client with user's tokens
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );
    
    oauth2Client.setCredentials({
      access_token: req.user.accessToken,
      refresh_token: req.user.refreshToken
    });

    await appendToSheet(oauth2Client, amount, item, req.user);
    
    res.render('expenses', { 
      user: req.user, 
      message: { type: 'success', text: 'Expense added successfully!' }
    });
  } catch (error) {
    console.error('Error saving expense:', error);
    res.render('expenses', { 
      user: req.user, 
      message: { type: 'error', text: 'Failed to save expense. Please try again.' }
    });
  }
});

app.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error('Logout error:', err);
    }
    res.redirect('/');
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
