import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';

// TS CONF
declare module 'express-session' {
  interface SessionData {
    user?: { id: number; username?: string };
  }
}

// DUMMY USERS DB
const USERS: Record<string, string> = {
  alice: 'password123',
  bob: '1234'
};

const app = express();
const PORT = process.env.PORT || 3000;

// EJS setup
app.set('view engine', 'ejs');
app.set('views', "./src/views");
app.set('layout', './src/layouts/full-width')

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'mon_secret_super_secure', // .ENV
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 5, // 5 minutes
    httpOnly: true, // prevent xss attacks: no access via JS
    secure: false   // https only in production
  }
}));

// Routes setup
app.get('/', (req, res) => {
    res.render('index', {user: req.session.user});
});

app.get('/login', (req, res) => {
  res.render('login', { error: null });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (USERS[username] && USERS[username] === password) {
    req.session.user = {
        id: 1,
        username: username
    };

    return res.redirect('/secret');
  }

  res.render('login', { error: 'Identifiants invalides' });
});

app.get('/secret', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }

  res.render('secret', { user: req.session.user });
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.redirect('/');
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});