const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();
connectDB();

// Explicitly allow localhost:5174
app.use(cors({ origin: 'http://localhost:5174' }));
app.use(express.json());

app.use('/api/profiles', require('./routes/profiles'));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));