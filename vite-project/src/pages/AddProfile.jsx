import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddProfile() {
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    skills: '',
    github: '',
    linkedin: '',
    twitter: '',
    location: '', // Added location field
    projects: [{ title: '', description: '', codeSnippet: '' }],
  });
  const [editToken, setEditToken] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/profiles/add', {
        ...formData,
        skills: formData.skills.split(',').map(s => s.trim()),
        socialLinks: { github: formData.github, linkedin: formData.linkedin, twitter: formData.twitter },
      }, {
        headers: { 'Content-Type': 'application/json' }
      });
      setEditToken(res.data.editToken);
      // Store edit token in localStorage with profile ID
      localStorage.setItem(`editToken_${res.data.profile._id}`, res.data.editToken);
      alert(`Profile added! Save this token to edit later: ${res.data.editToken}`);
      navigate(`/profile/${res.data.profile._id}`);
    } catch (err) {
      console.error('Full error:', err);
      console.log('Request failed to:', 'http://localhost:5000/api/profiles/add');
      alert('Failed to add profile: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-white">Add Your Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full p-2 border rounded bg-gray-800 text-white focus:outline-none"
        />
        <input
          type="text"
          placeholder="Location"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          className="w-full p-2 border rounded bg-gray-800 text-white focus:outline-none"
        />
        <textarea
          placeholder="Bio"
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          className="w-full p-2 border rounded bg-gray-800 text-white focus:outline-none"
        />
        <input
          type="text"
          placeholder="Skills (comma-separated)"
          value={formData.skills}
          onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
          className="w-full p-2 border rounded bg-gray-800 text-white focus:outline-none"
        />
        <input
          type="text"
          placeholder="GitHub URL"
          value={formData.github}
          onChange={(e) => setFormData({ ...formData, github: e.target.value })}
          className="w-full p-2 border rounded bg-gray-800 text-white focus:outline-none"
        />
        <input
          type="text"
          placeholder="LinkedIn URL"
          value={formData.linkedin}
          onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
          className="w-full p-2 border rounded bg-gray-800 text-white focus:outline-none"
        />
        <input
          type="text"
          placeholder="Twitter URL"
          value={formData.twitter}
          onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
          className="w-full p-2 border rounded bg-gray-800 text-white focus:outline-none"
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 w-full">
          Submit
        </button>
      </form>
      {editToken && (
        <div className="mt-4 p-4 bg-green-100 dark:bg-green-900 rounded">
          <p>Profile added! Use this token to edit: <strong>{editToken}</strong></p>
          <p className="text-sm">Save it somewhere safe!</p>
        </div>
      )}
    </div>
  );
}

export default AddProfile;