require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const authRoutes = require('./src/routes/auth');

// Enhanced MongoDB connection with error handling
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,  // Recommended option
  serverSelectionTimeoutMS: 5000,  // Fail fast if can't connect
})
.then(() => console.log('MongoDB connected successfully ✅'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);  // Exit process if DB connection fails
});

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', dbState: mongoose.connection.readyState });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server only after DB connection is ready
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});