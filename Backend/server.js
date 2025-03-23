const express = require('express');
const connectDB = require('./config/db');
const profileRoutes = require('./routes/profiles');
const cors = require('cors'); // Add CORS
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({ origin: 'http://localhost:5173' })); // Allow requests from Vite’s default port
app.use(express.json());
app.use('/api/profiles', profileRoutes);

// Basic route for testing
app.get('/', (req, res) => res.send('Backend is running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));