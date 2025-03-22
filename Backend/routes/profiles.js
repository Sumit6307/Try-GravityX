const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'di6ixfdbe',
  api_key: '461286952853283', 
  api_secret: 'WGQjNFHu4Ty-MOb4VGymCJ9Pros',
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/add', upload.single('image'), async (req, res) => {
  const { name, bio, skills, socialLinks, location, projects } = req.body;
  try {
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
      bio,
      skills: skills.split(',').map(s => s.trim()),
      socialLinks: JSON.parse(socialLinks),
      location,
      imageUrl,
      projects: JSON.parse(projects),
      editToken,
    });
    await profile.save();
    res.json({ profile, editToken });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/edit/:id', upload.single('image'), async (req, res) => {
  const { editToken, name, bio, skills, socialLinks, location, projects } = req.body;
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).json({ msg: 'Profile not found' });
    if (profile.editToken !== editToken) return res.status(403).json({ msg: 'Invalid edit token' });

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
          if (error) reject(error);
          resolve(result);
        }).end(req.file.buffer);
      });
      profile.imageUrl = result.secure_url;
    }

    profile.name = name || profile.name;
    profile.bio = bio || profile.bio;
    profile.skills = skills ? skills.split(',').map(s => s.trim()) : profile.skills;
    profile.socialLinks = socialLinks ? JSON.parse(socialLinks) : profile.socialLinks;
    profile.location = location || profile.location;
    profile.projects = projects ? JSON.parse(projects) : profile.projects;
    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  const profiles = await Profile.find();
  res.json(profiles);
});

router.get('/:id', async (req, res) => {
  const profile = await Profile.findById(req.params.id);
  if (!profile) return res.status(404).json({ msg: 'Profile not found' });
  profile.views += 1; // Increment views
  await profile.save();
  res.json(profile);
});

module.exports = router;