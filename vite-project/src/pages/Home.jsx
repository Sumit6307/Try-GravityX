import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import ProfileCard from '../components/ProfileCard';
import SearchBar from '../components/SearchBar';
import { FaRocket } from 'react-icons/fa';

function Home() {
  const [profiles, setProfiles] = useState([]);
  const [trendingSkills, setTrendingSkills] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/profiles');
        setProfiles(res.data);
        const skillCount = {};
        res.data.forEach(p => p.skills.forEach(s => skillCount[s] = (skillCount[s] || 0) + 1));
        const topSkills = Object.entries(skillCount)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([skill]) => skill);
        setTrendingSkills(topSkills);
      } catch (err) {
        console.error('Fetch Profiles Error:', err);
        setError('Failed to load profiles. Is the backend server running on http://localhost:5000?');
      }
    };
    fetchProfiles();
  }, []);

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gradient-to-br from-gray-900 to-black">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16 bg-gradient-to-r from-neonBlue/20 to-neonPurple/20"
      >
        <h1 className="text-5xl sm:text-6xl neon-heading mb-4">GravityX</h1>
        <p className="text-lg sm:text-xl text-gray-300 mb-8 px-4">Connect with 2M+ Developers Worldwide</p>
        <Link to="/add-profile" className="shine-button text-white px-6 py-3 rounded-lg text-lg font-semibold inline-flex items-center">
          <FaRocket className="mr-2" /> Get Started
        </Link>
      </motion.div>

      {error && (
        <div className="container mx-auto py-4 px-4 text-center text-red-300 bg-red-500/20 rounded-lg">
          {error}
        </div>
      )}

      <div className="container mx-auto py-8 px-4">
        <SearchBar setProfiles={setProfiles} />
      </div>

      {trendingSkills.length > 0 && (
        <div className="container mx-auto py-12 px-4">
          <h2 className="text-3xl neon-heading mb-6 text-center">Trending Skills</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {trendingSkills.map((skill, idx) => (
              <motion.span
                key={idx}
                whileHover={{ scale: 1.1 }}
                className="bg-neonPurple/20 text-neonPurple px-4 py-2 rounded-full text-sm sm:text-base"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      )}

      <div className="container mx-auto py-12 px-4">
        <h2 className="text-3xl neon-heading mb-6 text-center">Explore Developers</h2>
        {profiles.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {profiles.map(profile => (
              <ProfileCard key={profile._id} profile={profile} />
            ))}
          </motion.div>
        ) : (
          <p className="text-center text-gray-400">No profiles available yet.</p>
        )}
      </div>
    </div>
  );
}

export default Home;