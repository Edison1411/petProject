require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import routes
const petRoutes = require('./routes/petRoutes');
const storeRoutes = require('./routes/storeRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Static folder for pet images local uploads
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api', petRoutes);
app.use('/api', storeRoutes);
app.use('/api', userRoutes);

// Basic route check
app.get('/', (req, res) => {
  res.send('Welcome to Pet Store Backend');
});

// Error handling (basic example)
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
