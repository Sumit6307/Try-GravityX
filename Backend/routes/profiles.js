// routes/profiles.js
const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Added bcrypt

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per IP
});

// Add Profile
router.post('/add', limiter, upload.single('image'), async (req, res) => {
  const { name, password, bio, skills, socialLinks, location, projects } = req.body;
  try {
    if (!password) return res.status(400).json({ error: 'Password is required' });

    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    let imageUrl = '';
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
          if (error) reject(error);
          resolve(result);
        }).end(req.file.buffer);
      });
      imageUrl = result.secure_url;
    }
    const editToken = uuidv4();
    const profile = new Profile({
      name,
      password: hashedPassword, // Store hashed password
      bio,
      skills: skills.split(',').map(s => s.trim()),
      socialLinks: JSON.parse(socialLinks),
      location,
      imageUrl: imageUrl || 'https://via.placeholder.com/150', // Default image if none uploaded
      projects: JSON.parse(projects),
      editToken,
    });
    await profile.save();
    res.json({ profile, editToken });
  } catch (err) {
    console.error('Add Profile Error:', err.message);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { name, password } = req.body;
  try {
    if (!name || !password) return res.status(400).json({ error: 'Name and password are required' });

    const profile = await Profile.findOne({ name });
    if (!profile) return res.status(401).json({ error: 'Invalid name or password' });

    const isMatch = await bcrypt.compare(password, profile.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid name or password' });

    res.json({ profile, editToken: profile.editToken });
  } catch (err) {
    console.error('Login Error:', err.message);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// Get All Profiles
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().select('-password').sort({ views: -1 }).limit(50); // Exclude password
    res.json(profiles);
  } catch (err) {
    console.error('Get Profiles Error:', err.message);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// Search Profiles
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ error: 'Search query is required' });

    const profiles = await Profile.find({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { skills: { $regex: q, $options: 'i' } },
        { location: { $regex: q, $options: 'i' } },
      ],
    }).select('-password').limit(50); // Exclude password

    res.json(profiles);
  } catch (err) {
    console.error('Search Profiles Error:', err.message);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// Edit Profile
router.put('/edit/:id', limiter, upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { editToken, name, bio, skills, socialLinks, location, projects } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid profile ID' });
    }

    const profile = await Profile.findById(id);
    if (!profile) return res.status(404).json({ error: 'Profile not found' });
    if (profile.editToken !== editToken) return res.status(403).json({ error: 'Invalid edit token' });

    let imageUrl = profile.imageUrl;
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
          if (error) reject(error);
          resolve(result);
        }).end(req.file.buffer);
      });
      imageUrl = result.secure_url;
    }

    profile.name = name;
    profile.bio = bio;
    profile.skills = skills.split(',').map(s => s.trim());
    profile.socialLinks = JSON.parse(socialLinks);
    profile.location = location;
    profile.imageUrl = imageUrl;
    profile.projects = JSON.parse(projects);
    profile.updatedAt = Date.now();

    await profile.save();
    res.json({ message: 'Profile updated successfully' });
  } catch (err) {
    console.error('Edit Profile Error:', err.message);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// Get Single Profile
router.get('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid profile ID' });
    }

    const profile = await Profile.findById(req.params.id).select('-password'); // Exclude password
    if (!profile) return res.status(404).json({ error: 'Profile not found' });

    profile.views += 1;
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error('Get Profile Error:', err.message);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

module.exports = router;