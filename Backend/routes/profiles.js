const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');
const { v4: uuidv4 } = require('uuid');

// Add a profile
router.post('/add', async (req, res) => {
  const { name, bio, skills, socialLinks, projects } = req.body;
  try {
    const editToken = uuidv4(); // Generate unique token
    const profile = new Profile({ name, bio, skills, socialLinks, projects, editToken });
    await profile.save();
    res.json({ profile, editToken }); // Return profile and token
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all profiles
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single profile by ID
router.get('/:id', async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).json({ msg: 'Profile not found' });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Search profiles
router.get('/search', async (req, res) => {
  const { query } = req.query;
  try {
    const profiles = await Profile.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { skills: { $regex: query, $options: 'i' } },
      ],
    });
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Edit a profile (using editToken)
router.put('/edit/:id', async (req, res) => {
  const { editToken, name, bio, skills, socialLinks, projects } = req.body;
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).json({ msg: 'Profile not found' });
    if (profile.editToken !== editToken) return res.status(403).json({ msg: 'Invalid edit token' });

    profile.name = name || profile.name;
    profile.bio = bio || profile.bio;
    profile.skills = skills || profile.skills;
    profile.socialLinks = socialLinks || profile.socialLinks;
    profile.projects = projects || profile.projects;
    await profile.save();

    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;