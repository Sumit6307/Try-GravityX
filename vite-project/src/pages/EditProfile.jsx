// src/pages/EditProfile.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { FaUser, FaMapMarkerAlt, FaCode, FaLink, FaPlus, FaTrash, FaRocket } from 'react-icons/fa';

const inputVariants = { focus: { scale: 1.02, borderColor: '#00D4FF', transition: { duration: 0.2 } } };
const buttonVariants = { hover: { scale: 1.05, boxShadow: '0 0 15px rgba(0, 212, 255, 0.5)' }, tap: { scale: 0.95 } };

function EditProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [bioLength, setBioLength] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state

  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    const fetchProfileAndUser = async () => {
      try {
        if (!authToken) {
          setError('Please log in to edit your profile.');
          setLoading(false);
          return;
        }

        console.log('Fetching profile for ID:', id);
        const profileRes = await axios.get(`http://localhost:5000/api/profiles/${id}`);
        const profile = profileRes.data;
        console.log('Profile data:', profile);

        console.log('Fetching current user with token:', authToken);
        const userRes = await axios.get('http://localhost:5000/api/profiles/me', {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        const currentUserId = userRes.data.userId;
        console.log('Current user ID:', currentUserId);

        setUserId(currentUserId);
        const ownerCheck = currentUserId === profile._id.toString(); // Ensure string comparison
        setIsOwner(ownerCheck);
        console.log('Is owner?', ownerCheck);

        if (ownerCheck) {
          setFormData({
            name: profile.name,
            bio: profile.bio || '',
            skills: profile.skills.join(', '),
            github: profile.socialLinks.github || '',
            linkedin: profile.socialLinks.linkedin || '',
            twitter: profile.socialLinks.twitter || '',
            instagram: profile.socialLinks.instagram || '',
            location: profile.location || '',
            image: null,
            projects: profile.projects || [{ title: '', description: '', codeSnippet: '', url: '' }],
          });
          setBioLength(profile.bio?.length || 0);
        } else {
          setError('You are not authorized to edit this profile.');
        }
      } catch (err) {
        console.error('Fetch Error:', err.response || err.message);
        if (err.response?.status === 401) {
          setError('Session expired. Redirecting to login...');
          localStorage.removeItem('authToken');
          setTimeout(() => navigate('/login'), 2000);
        } else {
          setError('Failed to load profile data. Check console for details.');
        }
      } finally {
        setLoading(false); // Mark loading complete
      }
    };

    fetchProfileAndUser();
  }, [id, authToken, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'bio') setBioLength(value.length);
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => setFormData({ ...formData, image: e.target.files[0] });
  const handleProjectChange = (idx, field, value) => {
    const newProjects = [...formData.projects];
    newProjects[idx][field] = value;
    setFormData({ ...formData, projects: newProjects });
  };
  const addProject = () => setFormData({ ...formData, projects: [...formData.projects, { title: '', description: '', codeSnippet: '', url: '' }] });
  const removeProject = (idx) => {
    if (formData.projects.length > 1) setFormData({ ...formData, projects: formData.projects.filter((_, i) => i !== idx) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isOwner) {
      setError('You cannot edit this profile.');
      return;
    }

    const data = new FormData();
    data.append('name', formData.name);
    data.append('bio', formData.bio);
    data.append('skills', formData.skills);
    data.append('socialLinks', JSON.stringify({
      github: formData.github,
      linkedin: formData.linkedin,
      twitter: formData.twitter,
      instagram: formData.instagram,
    }));
    data.append('location', formData.location);
    data.append('projects', JSON.stringify(formData.projects));
    if (formData.image) data.append('image', formData.image);

    try {
      console.log('Submitting update with token:', authToken);
      await axios.put(`http://localhost:5000/api/profiles/edit/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${authToken}`,
        },
      });
      setSuccess(true);
      setTimeout(() => navigate(`/profile/${id}`), 2000);
    } catch (err) {
      console.error('Update Profile Error:', err.response || err.message);
      setError('Failed to update profile. Please try again.');
    }
  };

  // Render loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <Navbar />
        <div className="pt-24 pb-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-neonBlue text-2xl"
          >
            Loading profile data...
          </motion.div>
        </div>
      </div>
    );
  }

  // Render no auth or session expired
  if (!authToken || error.includes('Please log in') || error.includes('Session expired')) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <Navbar />
        <div className="pt-24 pb-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-neonBlue text-2xl"
          >
            {error || 'Please log in to edit your profile.'}
          </motion.div>
        </div>
      </div>
    );
  }

  // Render not authorized
  if (!isOwner) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <Navbar />
        <div className="pt-24 pb-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-red-300 text-2xl bg-red-500/20 p-6 rounded-xl border border-red-500/30"
          >
            {error || 'You are not authorized to edit this profile.'}
            <motion.button
              onClick={() => navigate(`/profile/${id}`)}
              className="mt-4 text-neonBlue hover:text-neonPurple underline"
              whileHover={{ scale: 1.1 }}
            >
              View Profile Instead
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  // Render form only if formData is set
  if (!formData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <Navbar />
        <div className="pt-24 pb-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-red-300 text-2xl bg-red-500/20 p-6 rounded-xl border border-red-500/30"
          >
            Error: Profile data not loaded. Please try again.
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black overflow-hidden relative">
      <Navbar />
      <div className="pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto p-6"
        >
          <h1 className="text-5xl neon-heading mb-10 text-center tracking-wide">Edit Your GravityX Profile</h1>
          <form
            onSubmit={handleSubmit}
            className="bg-gray-900/80 backdrop-blur-md p-8 rounded-xl max-w-3xl mx-auto border border-neonBlue/20 shadow-[0_0_20px_rgba(0,212,255,0.1)] space-y-8"
          >
            <div className="space-y-6">
              <h2 className="text-2xl text-neonPurple font-semibold flex items-center">
                <FaUser className="mr-2" /> Personal Info
              </h2>
              <motion.input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-4 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none"
                whileFocus="focus"
                variants={inputVariants}
                required
              />
              <div className="relative">
                <motion.textarea
                  name="bio"
                  placeholder="Bio (max 500 characters)"
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full p-4 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none resize-none"
                  maxLength={500}
                  rows={4}
                  whileFocus="focus"
                  variants={inputVariants}
                />
                <span className="absolute bottom-2 right-4 text-sm text-gray-400">{bioLength}/500</span>
              </div>
              <motion.input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
                className="w-full p-4 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none"
                whileFocus="focus"
                variants={inputVariants}
              />
              <motion.input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-4 rounded-lg bg-gray-800 text-white border border-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:bg-neonBlue/20 file:text-neonBlue file:border-0 hover:file:bg-neonBlue/40"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-2xl text-neonPurple font-semibold flex items-center">
                <FaCode className="mr-2" /> Skills
              </h2>
              <motion.input
                type="text"
                name="skills"
                placeholder="Skills (comma-separated, e.g., JavaScript, React)"
                value={formData.skills}
                onChange={handleChange}
                className="w-full p-4 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none"
                whileFocus="focus"
                variants={inputVariants}
                required
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-2xl text-neonPurple font-semibold flex items-center">
                <FaLink className="mr-2" /> Social Links
              </h2>
              <motion.input
                type="url"
                name="github"
                placeholder="GitHub URL"
                value={formData.github}
                onChange={handleChange}
                className="w-full p-4 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none"
                whileFocus="focus"
                variants={inputVariants}
              />
              <motion.input
                type="url"
                name="linkedin"
                placeholder="LinkedIn URL"
                value={formData.linkedin}
                onChange={handleChange}
                className="w-full p-4 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none"
                whileFocus="focus"
                variants={inputVariants}
              />
              <motion.input
                type="url"
                name="twitter"
                placeholder="Twitter URL"
                value={formData.twitter}
                onChange={handleChange}
                className="w-full p-4 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none"
                whileFocus="focus"
                variants={inputVariants}
              />
              <motion.input
                type="url"
                name="instagram"
                placeholder="Instagram URL"
                value={formData.instagram}
                onChange={handleChange}
                className="w-full p-4 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none"
                whileFocus="focus"
                variants={inputVariants}
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-2xl text-neonPurple font-semibold flex items-center">
                <FaCode className="mr-2" /> Projects
              </h2>
              {formData.projects.map((project, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 space-y-4"
                >
                  <motion.input
                    type="text"
                    placeholder="Project Title"
                    value={project.title}
                    onChange={(e) => handleProjectChange(idx, 'title', e.target.value)}
                    className="w-full p-4 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none"
                    whileFocus="focus"
                    variants={inputVariants}
                    required
                  />
                  <motion.textarea
                    placeholder="Description"
                    value={project.description}
                    onChange={(e) => handleProjectChange(idx, 'description', e.target.value)}
                    className="w-full p-4 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none resize-none"
                    rows={3}
                    whileFocus="focus"
                    variants={inputVariants}
                  />
                  <motion.textarea
                    placeholder="Code Snippet (e.g., function example() {...})"
                    value={project.codeSnippet}
                    onChange={(e) => handleProjectChange(idx, 'codeSnippet', e.target.value)}
                    className="w-full p-4 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none resize-none font-mono text-sm"
                    rows={4}
                    whileFocus="focus"
                    variants={inputVariants}
                  />
                  <motion.input
                    type="url"
                    placeholder="Project URL (optional)"
                    value={project.url}
                    onChange={(e) => handleProjectChange(idx, 'url', e.target.value)}
                    className="w-full p-4 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none"
                    whileFocus="focus"
                    variants={inputVariants}
                  />
                  {formData.projects.length > 1 && (
                    <motion.button
                      type="button"
                      onClick={() => removeProject(idx)}
                      className="text-red-400 hover:text-red-300 flex items-center"
                      whileHover={{ scale: 1.05 }}
                    >
                      <FaTrash className="mr-1" /> Remove Project
                    </motion.button>
                  )}
                </motion.div>
              ))}
              <motion.button
                type="button"
                onClick={addProject}
                className="text-neonBlue hover:text-neonPurple flex items-center"
                whileHover={{ scale: 1.05 }}
              >
                <FaPlus className="mr-2" /> Add Another Project
              </motion.button>
            </div>
            <motion.button
              type="submit"
              className="w-full shine-button text-white p-4 rounded-lg flex items-center justify-center text-lg font-semibold"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <FaRocket className="mr-2" /> Update Profile
            </motion.button>
          </form>
          {success && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mt-8 p-6 bg-gradient-to-r from-neonBlue/20 to-neonPurple/20 rounded-xl text-center border border-neonBlue/30"
            >
              <h3 className="text-2xl text-neonBlue font-semibold mb-2">Profile Updated!</h3>
              <p className="text-gray-300">Your changes have been saved successfully.</p>
              <p className="text-sm text-gray-400 mt-2">Redirecting to your profile in a moment...</p>
            </motion.div>
          )}
          {error && !success && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 p-6 bg-red-500/20 rounded-xl text-center border border-red-500/30"
            >
              <p className="text-red-300">{error}</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default EditProfile;