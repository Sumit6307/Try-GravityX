const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bio: String,
  skills: [String],
  socialLinks: {
    github: String,
    linkedin: String,
    twitter: String,
  },
  location: String, // Added location field
  projects: [{
    title: String,
    description: String,
    codeSnippet: String,
  }],
  editToken: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Profile', profileSchema);