import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import jwt from 'jsonwebtoken';
const JWT_SECRET = 'super-secret-key';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(cors()); // Enable Request from other origins
app.use(bodyParser.json());

// Routes setup
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // DUMMY AUTHENTICATION
  if (username === 'sylvain' && password === '1234') {
    const token = jwt.sign({ id: 1, username: 'sylvain' }, JWT_SECRET, { expiresIn: '1h' });

    return res.json({
      token,
      user: {
        id: 1,
        username: 'sylvain',
      },
    });
  }
  res.status(401).json({ message: 'Invalid credentials' });
});

app.get('/profile', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ message: 'Protected data', user: decoded });
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
