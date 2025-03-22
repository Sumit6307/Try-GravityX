import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    skills: '',
    github: '',
    linkedin: '',
    twitter: '',
    location: '',
    editToken: localStorage.getItem(`editToken_${id}`) || '',
  });

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
        location: res.data.location || '',
        editToken: localStorage.getItem(`editToken_${id}`) || '',
      });
    };
    fetchProfile();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/profiles/edit/${id}`, {
        ...formData,
        skills: formData.skills.split(',').map(s => s.trim()),
        socialLinks: { github: formData.github, linkedin: formData.linkedin, twitter: formData.twitter },
      });
      alert('Profile updated successfully!');
      navigate(`/profile/${id}`);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || 'Failed to update profile');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-white">Edit Your Profile</h1>
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
        <input
          type="text"
          placeholder="Enter your edit token"
          value={formData.editToken}
          onChange={(e) => setFormData({ ...formData, editToken: e.target.value })}
          className="w-full p-2 border rounded bg-gray-800 text-white focus:outline-none"
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 w-full">
          Update Profile
        </button>
      </form>
    </div>
  );
}

export default EditProfile;