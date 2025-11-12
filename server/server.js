require('dotenv').config();
require('express-async-errors');

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Import routes
const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const app = express();

// ===== MIDDLEWARE SETUP =====

// ✅ Updated CORS configuration
const allowedOrigins = [
  'http://localhost:5173', // for local development
  'https://glittering-salamander-209639.netlify.app', // your live Netlify site
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

// Body parser middleware - Parse incoming JSON requests
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// ===== ROUTES =====
app.get('/', (req, res) => {
  res.send('Campus Marketplace backend is running ✅');
});

app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/reviews', reviewRoutes);

app.get('/api/health', (req, res) => {
  res.json({ message: 'Campus Market API is running!' });
});

// ===== ERROR HANDLING =====

// 404 Not Found middleware
app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found',
    path: req.originalUrl,
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Error:', error.message || error);
  res.status(error.status || 500).json({
    message: error.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? error : {},
  });
});

// ===== SERVER STARTUP =====
const PORT = process.env.PORT || 10000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;
