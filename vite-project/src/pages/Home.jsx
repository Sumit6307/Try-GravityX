// client/src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import ProfileCard from '../components/ProfileCard';
import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Home() {
  const [profiles, setProfiles] = useState([]);
  const [trendingSkills, setTrendingSkills] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchProfiles = async () => {
      const res = await axios.get('http://localhost:5000/api/profiles');
      setProfiles(res.data);
      const skillCount = {};
      res.data.forEach(p => p.skills.forEach(s => skillCount[s] = (skillCount[s] || 0) + 1));
      const topSkills = Object.entries(skillCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([skill]) => skill);
      setTrendingSkills(topSkills);
    };
    fetchProfiles();
  }, []);

  const handleSearch = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/profiles/search?name=${searchQuery}`);
      setProfiles(res.data);
    } catch (err) {
      console.error('Error searching profiles:', err);
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center py-20 bg-gradient-to-r from-neonBlue/20 to-neonPurple/20"
      >
        <h1 className="text-5xl neon-heading mb-4">GravityX</h1>
        <p className="text-xl text-gray-300 mb-8">Join 2M+ Developers Worldwide</p>
        <Link to="/add-profile" className="shine-button text-white px-6 py-3 rounded-lg text-lg font-semibold">
          Create Profile
        </Link>
      </motion.div>

      {/* Search Bar */}
      <div className="container mx-auto py-6">
        <div className="relative max-w-md mx-auto">
          <div className="flex items-center bg-gray-800/80 border border-gray-700 rounded-lg">
            <label className="text-gray-400 text-sm px-3">Name</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search user by name"
              className="w-full p-3 bg-transparent text-white focus:outline-none"
            />
            <button onClick={handleSearch} className="p-3">
              <FaSearch className="text-gray-400 hover:text-neonBlue" />
            </button>
          </div>
        </div>
      </div>

      {/* Featured Developers */}
      <div className="container mx-auto py-12">
        <h2 className="text-3xl neon-heading mb-6 text-center">Featured Devs</h2>
        <Slider {...sliderSettings}>
          {profiles.slice(0, 5).map(profile => (
            <div key={profile._id} className="px-2">
              <ProfileCard profile={profile} />
            </div>
          ))}
        </Slider>
      </div>

      {/* Trending Skills */}
      <div className="container mx-auto py-12">
        <h2 className="text-3xl neon-heading mb-6 text-center">Top Skills</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {trendingSkills.map((skill, idx) => (
            <motion.span
              key={idx}
              whileHover={{ scale: 1.1 }}
              className="bg-neonPurple/20 text-neonPurple px-4 py-2 rounded-full"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>

      {/* All Profiles */}
      <div className="container mx-auto py-12">
        <h2 className="text-3xl neon-heading mb-6 text-center">All Profiles</h2>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {profiles.map(profile => (
            <ProfileCard key={profile._id} profile={profile} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default Home;