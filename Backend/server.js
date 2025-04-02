// server.js
const express = require('express');
const connectDB = require('./config/db');
const profileRoutes = require('./routes/profiles');
const cors = require('cors');
const { getJson } = require('serpapi');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({ origin: 'http://localhost:5173' })); // Adjust if frontend port differs
app.use(express.json());
app.use('/api/profiles', profileRoutes);

// Proxy route for SerpAPI Google Jobs Search
app.get('/api/google-jobs', (req, res) => {
  console.log('Request to /api/google-jobs with params:', req.query);

  getJson(
    {
      api_key: process.env.SERPAPI_KEY || 'd049e6f87e0094750304808808cf65e2c423c75389faf1328bec809a3df95a51',
      engine: 'google',
      q: req.query.q || 'jobs',
      location: req.query.location || 'India',
      google_domain: 'google.co.in',
      gl: 'in',
      hl: 'hi',
    },
    (json) => {
      if (!json || json.error) {
        console.error('SerpAPI error:', json ? json.error : 'Invalid response');
        return res.status(500).json({ error: 'Failed to fetch jobs from SerpAPI', details: json ? json.error : 'Invalid response' });
      }

     
      
      // Ensure jobs_results or organic_results is an array
      const jobResults = Array.isArray(json.jobs_results) ? json.jobs_results :
                         Array.isArray(json.organic_results) ? json.organic_results : [];
      
      const jobs = jobResults.slice(0, 10).map((result, index) => ({
        id: result.job_id || `${index}-${Date.now()}`,
        title: result.title || 'Untitled Job',
        company: result.via || result.source || 'Unknown Company',
        location: result.location || 'India',
        description: result.snippet || result.description || 'No description available',
        link: result.link || 'https://www.google.co.in',
      }));

      res.json(jobs);
    }
  );
});

// Basic route for testing
app.get('/', (req, res) => res.send('Backend is running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
