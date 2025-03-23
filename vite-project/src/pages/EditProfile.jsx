// client/src/pages/EditProfile.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function EditProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [editToken] = useState(localStorage.getItem(`editToken_${id}`) || '');

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await axios.get(`http://localhost:5000/api/profiles/${id}`);
      setFormData({
        name: res.data.name,
        bio: res.data.bio || '',
        skills: res.data.skills.join(', '),
        github: res.data.socialLinks.github || '',
        linkedin: res.data.socialLinks.linkedin || '',
        twitter: res.data.socialLinks.twitter || '',
        instagram: res.data.socialLinks.instagram || '', // Added Instagram
        location: res.data.location || '',
        image: null,
        projects: res.data.projects,
      });
    };
    fetchProfile();
  }, [id]);

  const handleFileChange = e => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleProjectChange = (idx, field, value) => {
    const newProjects = [...formData.projects];
    newProjects[idx][field] = value;
    setFormData({ ...formData, projects: newProjects });
  };

  const addProject = () => {
    setFormData({ ...formData, projects: [...formData.projects, { title: '', description: '', codeSnippet: '' }] });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const data = new FormData();
    data.append('editToken', editToken);
    data.append('name', formData.name);
    data.append('bio', formData.bio);
    data.append('skills', formData.skills);
    data.append('socialLinks', JSON.stringify({
      github: formData.github,
      linkedin: formData.linkedin,
      twitter: formData.twitter,
      instagram: formData.instagram, // Added Instagram
    }));
    data.append('location', formData.location);
    data.append('projects', JSON.stringify(formData.projects));
    if (formData.image) data.append('image', formData.image);

    try {
      await axios.put(`http://localhost:5000/api/profiles/edit/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Profile updated!');
      navigate(`/profile/${id}`);
    } catch (err) {
      console.error(err);
      alert('Failed to update profile. Check your edit token.');
    }
  };

  if (!formData) return <div className="text-center text-white pt-24">Loading...</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto p-6 pt-24"
    >
      <h1 className="text-4xl neon-heading mb-8 text-center">Edit Profile</h1>
      <form onSubmit={handleSubmit} className="glass-effect p-8 rounded-xl max-w-2xl mx-auto space-y-6">
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-neonBlue"
        />
        <input
          type="text"
          placeholder="Location"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-neonBlue"
        />
        <textarea
          placeholder="Bio"
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-neonBlue"
        />
        <input
          type="text"
          placeholder="Skills (comma-separated)"
          value={formData.skills}
          onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
          className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-neonBlue"
        />
        <input
          type="text"
          placeholder="GitHub URL"
          value={formData.github}
          onChange={(e) => setFormData({ ...formData, github: e.target.value })}
          className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-neonBlue"
        />
        <input
          type="text"
          placeholder="LinkedIn URL"
          value={formData.linkedin}
          onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
          className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-neonBlue"
        />
        <input
          type="text"
          placeholder="Twitter URL"
          value={formData.twitter}
          onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
          className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-neonBlue"
        />
        <input
          type="text"
          placeholder="Instagram URL"
          value={formData.instagram}
          onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
          className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-neonBlue"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-3 rounded bg-gray-800 text-white"
        />
        <h3 className="text-xl neon-heading">Projects</h3>
        {formData.projects.map((project, idx) => (
          <div key={idx} className="space-y-3">
            <input
              type="text"
              placeholder="Project Title"
              value={project.title}
              onChange={e => handleProjectChange(idx, 'title', e.target.value)}
              className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-neonBlue"
            />
            <textarea
              placeholder="Description"
              value={project.description}
              onChange={e => handleProjectChange(idx, 'description', e.target.value)}
              className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-neonBlue"
            />
            <textarea
              placeholder="Code Snippet"
              value={project.codeSnippet}
              onChange={e => handleProjectChange(idx, 'codeSnippet', e.target.value)}
              className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-neonBlue"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addProject}
          className="text-neonBlue hover:text-neonPurple"
        >
          + Add Another Project
        </button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full shine-button text-white p-3 rounded-lg"
        >
          Update Profile
        </motion.button>
      </form>
    </motion.div>
  );
}

export default EditProfile;