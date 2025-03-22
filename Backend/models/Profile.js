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
  location: String,
  imageUrl: String,
  projects: [{
    title: String,
    description: String,
    codeSnippet: String,
  }],
  editToken: { type: String, required: true, unique: true },
  views: { type: Number, default: 0 }, // New field for profile views
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Profile', profileSchema);