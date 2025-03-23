// server/models/Profile.js
const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bio: String,
  skills: [String],
  socialLinks: {
    github: String,
    linkedin: String,
    twitter: String,
    instagram: String, // Added Instagram
  },
  location: String,
  imageUrl: String,
  projects: [{
    title: String,
    description: String,
    codeSnippet: String,
  }],
  editToken: { type: String, required: true, unique: true },
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Profile', profileSchema);