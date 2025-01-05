const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Initialize Express app
const app = express();

// Middlewares
app.use(express.json()); // Parse JSON bodies
app.use(cors());  // Enable cross-origin requests

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB!'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

// Routes
const promptRoutes = require('./routes/promptRoutes');
app.use('/api/prompts', promptRoutes);


app.get('/', (req, res) => {
    res.status(200).json({ status: 'Server is healthy!' });
  });
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
