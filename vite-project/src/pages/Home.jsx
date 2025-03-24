import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import ProfileCard from '../components/ProfileCard';
import ProfileModal from '../components/ProfileModal';
import SearchBar from '../components/SearchBar';
import { FaRocket, FaRedo, FaCode, FaGlobe } from 'react-icons/fa';
import { LazyLoadComponent } from 'react-lazy-load-image-component';

// Animation variants
const heroVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const skillVariants = {
  animate: {
    x: ['0%', '-50%'],
    transition: {
      x: { repeat: Infinity, repeatType: 'loop', duration: 15, ease: 'linear' },
    },
  },
};

const skillBoxVariants = {
  hidden: { opacity: 0, scale: 0.9, rotateX: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    rotateX: 0, 
    transition: { duration: 0.8, ease: 'easeOut' } 
  },
  hover: { 
    scale: 1.02, 
    rotateX: 5, 
    boxShadow: '0 0 40px rgba(0, 212, 255, 0.6)' 
  },
};

const skillTagVariants = {
  hover: { 
    scale: 1.15, 
    y: -5, 
    boxShadow: '0 0 20px rgba(0, 212, 255, 0.8)', 
    rotate: 2,
    transition: { duration: 0.2 } 
  },
};

function Home() {
  const [profiles, setProfiles] = useState([]);
  const [trendingSkills, setTrendingSkills] = useState([]);
  const [error, setError] = useState('');
  const [selectedProfileId, setSelectedProfileId] = useState(null);

  const fetchProfiles = async () => {
    try {
      setError('');
      const res = await axios.get('http://localhost:5000/api/profiles');
      console.log('Fetched profiles:', res.data);
      setProfiles(res.data);

      const skillCount = {};
      res.data.forEach((profile) =>
        profile.skills.forEach((skill) => {
          const normalizedSkill = skill.toLowerCase();
          skillCount[normalizedSkill] = (skillCount[normalizedSkill] || 0) + 1;
        })
      );

      const topSkills = Object.entries(skillCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([skill]) => skill.toUpperCase());
      setTrendingSkills(topSkills);
    } catch (err) {
      console.error('Fetch Profiles Error:', err);
      setError('Failed to load profiles. Is the backend server running on http://localhost:5000?');
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const handleOpenProfile = (id) => {
    console.log('Opening profile with ID:', id);
    setSelectedProfileId(id);
  };

  const handleCloseProfile = () => {
    console.log('Closing profile modal');
    setSelectedProfileId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-20 pb-12 overflow-hidden relative">
      {/* Inline CSS */}
      <style>
        {`
          .neon-heading {
            color: #fff;
            text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
          }
          .shine-button {
            background: linear-gradient(90deg, #00D4FF, #D81BFF);
          }
          .neon-blue { color: #00D4FF; }
          .neon-purple { color: #D81BFF; }
        `}
      </style>

      {/* Cosmic Background Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.1)_0%,transparent_70%)] -z-10" />

      {/* GravityX Paradise Button (Top-Left) */}
      <Link to="/paradise">
        <motion.button
          className="shine-button mt-10 text-white px-6 py-3 rounded-full text-lg font-semibold inline-flex items-center absolute top-4 left-4 z-10"
          whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0, 212, 255, 0.7)' }}
          whileTap={{ scale: 0.95 }}
        >
          <FaGlobe className="mr-2" /> GravityX Paradise
        </motion.button>
      </Link>

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
        <section className="container mx-auto py-20 px-4">
          <h2 className="text-5xl neon-heading mb-12 text-center tracking-wider drop-shadow-[0_0_15px_rgba(0,212,255,0.6)]">
            Trending Skills
          </h2>
          <motion.div
            variants={skillBoxVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className="relative bg-gray-900/70 backdrop-blur-lg p-8 rounded-xl border border-neonBlue/40 shadow-[0_0_30px_rgba(0,212,255,0.3)] overflow-hidden perspective-1000 transform-style-3d"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-neonBlue/10 via-neonPurple/10 to-transparent opacity-50 animate-pulse -z-10" />
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neonBlue to-neonPurple" />
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-neonBlue to-neonPurple" />
            <div className="flex items-center justify-center mb-6">
              <FaCode className="text-neonBlue mr-3" size={28} />
              <span className="text-xl font-semibold text-neonBlue drop-shadow-[0_0_8px_rgba(0,212,255,0.4)]">
                Most Used Skills in the Cosmos
              </span>
            </div>
            <motion.div
              className="flex space-x-8 whitespace-nowrap justify-center"
              variants={skillVariants}
              animate="animate"
            >
              {trendingSkills.map((skill, idx) => (
                <motion.span
                  key={idx}
                  variants={skillTagVariants}
                  whileHover="hover"
                  className="inline-block bg-gradient-to-r from-neonBlue/50 to-neonPurple/50 text-white px-8 py-4 rounded-full text-lg font-bold border border-neonBlue/60 shadow-[0_0_15px_rgba(0,212,255,0.4)] transform-gpu"
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-gray-900/80 to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-gray-900/80 to-transparent pointer-events-none" />
          </motion.div>
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
                <ProfileCard profile={profile} onOpenProfile={handleOpenProfile} />
              </LazyLoadComponent>
            ))}
          </motion.div>
        ) : (
          <p className="text-center text-gray-400 text-lg">No profiles available yet. Be the first!</p>
        )}
      </section>

      {/* Profile Modal */}
      <AnimatePresence>
        {selectedProfileId && (
          <ProfileModal id={selectedProfileId} onClose={handleCloseProfile} />
        )}
      </AnimatePresence>

      {/* Decorative Glow */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-neonBlue/50 via-neonPurple/50 to-transparent" />
    </div>
  );
}

export default Home;