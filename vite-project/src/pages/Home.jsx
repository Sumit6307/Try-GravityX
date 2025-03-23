import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import ProfileCard from '../components/ProfileCard';
import SearchBar from '../components/SearchBar';
import { FaRocket, FaRedo } from 'react-icons/fa';
import { LazyLoadComponent } from 'react-lazy-load-image-component'; // New import

// Animation variants
const heroVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const skillVariants = {
  animate: {
    x: ['0%', '-100%'],
    transition: {
      x: { repeat: Infinity, repeatType: 'loop', duration: 20, ease: 'linear' },
    },
  },
};

function Home() {
  const [profiles, setProfiles] = useState([]);
  const [trendingSkills, setTrendingSkills] = useState([]);
  const [error, setError] = useState('');

  const fetchProfiles = async () => {
    try {
      setError(''); // Clear previous errors
      const res = await axios.get('http://localhost:5000/api/profiles');
      setProfiles(res.data);
      const skillCount = {};
      res.data.forEach((p) =>
        p.skills.forEach((s) => (skillCount[s] = (skillCount[s] || 0) + 1))
      );
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

  useEffect(() => {
    fetchProfiles();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-20 pb-12 overflow-hidden">
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={heroVariants}
        className="relative text-center py-20 bg-gradient-to-r from-neonBlue/20 via-neonPurple/20 to-transparent"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50 -z-10" />
        <motion.h1
          className="text-6xl md:text-7xl neon-heading mb-6 tracking-wide"
          animate={{ textShadow: ['0 0 10px rgba(0,212,255,0.5)', '0 0 20px rgba(0,212,255,0.8)', '0 0 10px rgba(0,212,255,0.5)'] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          GravityX
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-gray-200 mb-10 px-4 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Connect with 2M+ Developers Worldwide in a Universe of Innovation
        </motion.p>
        <Link to="/add-profile">
          <motion.button
            className="shine-button text-white px-8 py-4 rounded-lg text-lg font-semibold inline-flex items-center"
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0, 212, 255, 0.7)' }}
            whileTap={{ scale: 0.95 }}
          >
            <FaRocket className="mr-2" /> Join the Cosmos
          </motion.button>
        </Link>
      </motion.section>

      {/* Error Section */}
      {error && (
        <div className="container mx-auto py-6 px-4 text-center text-red-300 bg-red-500/20 rounded-lg max-w-2xl">
          <p>{error}</p>
          <motion.button
            onClick={fetchProfiles}
            className="mt-2 text-neonBlue hover:text-neonPurple inline-flex items-center"
            whileHover={{ scale: 1.1 }}
          >
            <FaRedo className="mr-2" /> Retry
          </motion.button>
        </div>
      )}

      {/* Search Bar */}
      <div className="container mx-auto py-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SearchBar setProfiles={setProfiles} />
        </motion.div>
      </div>

      {/* Trending Skills */}
      {trendingSkills.length > 0 && (
        <section className="container mx-auto py-12 px-4">
          <h2 className="text-4xl neon-heading mb-8 text-center">Trending Skills</h2>
          <div className="relative overflow-hidden">
            <motion.div
              className="flex space-x-6 whitespace-nowrap"
              variants={skillVariants}
              animate="animate"
            >
              {trendingSkills.concat(trendingSkills).map((skill, idx) => (
                <motion.span
                  key={idx}
                  className="bg-neonPurple/20 text-neonPurple px-6 py-3 rounded-full text-base md:text-lg font-medium"
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(216, 27, 255, 0.3)' }}
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-gray-900 to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-gray-900 to-transparent pointer-events-none" />
          </div>
        </section>
      )}

      {/* Profiles Section */}
      <section className="container mx-auto py-12 px-4">
        <h2 className="text-4xl neon-heading mb-8 text-center">Explore Developers</h2>
        {profiles.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {profiles.map((profile) => (
              <LazyLoadComponent key={profile._id} threshold={100}>
                <ProfileCard profile={profile} />
              </LazyLoadComponent>
            ))}
          </motion.div>
        ) : (
          <p className="text-center text-gray-400 text-lg">No profiles available yet. Be the first!</p>
        )}
      </section>

      {/* Decorative Glow */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-neonBlue/50 via-neonPurple/50 to-transparent" />
    </div>
  );
}

export default Home;