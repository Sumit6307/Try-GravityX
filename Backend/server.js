const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const profileRoutes = require('./routes/profiles');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/profiles', profileRoutes);

mongoose.connect('mongodb://localhost/gravityx', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'));

app.listen(5000, () => console.log('Server running on port 5000'));