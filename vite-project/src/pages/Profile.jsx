// client/src/pages/Profile.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [editToken, setEditToken] = useState(localStorage.getItem(`editToken_${id}`) || '');

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await axios.get(`http://localhost:5000/api/profiles/${id}`);
      setProfile(res.data);
    };
    fetchProfile();
  }, [id]);

  const handleEdit = () => {
    if (!editToken) {
      const token = prompt('Enter your edit token:');
      if (token) {
        setEditToken(token);
        localStorage.setItem(`editToken_${id}`, token);
        navigate(`/edit-profile/${id}`);
      }
    } else {
      navigate(`/edit-profile/${id}`);
    }
  };

  if (!profile) return <div className="text-center text-white pt-24">Loading...</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto p-6 pt-24"
    >
      <div className="glass-effect p-8 rounded-xl">
        <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-8">
          <img
            src={profile.imageUrl || 'https://via.placeholder.com/150'}
            alt={profile.name}
            className="w-32 h-32 rounded-full object-cover border-4 border-neonBlue"
          />
          <div className="flex-1">
            <h1 className="text-4xl neon-heading">{profile.name}</h1>
            <p className="text-gray-400 mt-2">{profile.location || 'No location'}</p>
            <p className="text-gray-300 mt-4">{profile.bio || 'No bio available'}</p>
            <div className="flex space-x-4 mt-4">
              {profile.socialLinks.github && (
                <a href={profile.socialLinks.github} target="_blank" rel="noopener noreferrer">
                  <FaGithub className="text-white hover:text-neonBlue" size={24} />
                </a>
              )}
              {profile.socialLinks.linkedin && (
                <a href={profile.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                  <FaLinkedin className="text-white hover:text-neonBlue" size={24} />
                </a>
              )}
              {profile.socialLinks.twitter && (
                <a href={profile.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                  <FaTwitter className="text-white hover:text-neonBlue" size={24} />
                </a>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-2">Profile Views: {profile.views}</p>
            {editToken && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEdit}
                className="mt-6 shine-button text-white p-3 rounded-lg"
              >
                Edit Profile
              </motion.button>
            )}
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl neon-heading mb-4">Projects</h2>
          {profile.projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="mb-6 glass-effect p-4 rounded-lg"
            >
              <h3 className="text-xl font-semibold text-white">{project.title}</h3>
              <p className="text-gray-300 mt-2">{project.description}</p>
              <pre className="bg-gray-800 text-gray-200 p-4 rounded mt-2 overflow-x-auto">{project.codeSnippet}</pre>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default Profile;