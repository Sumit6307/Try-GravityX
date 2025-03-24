import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import ProfileModal from '../components/ProfileModal';
import { FaRocket, FaStar, FaUsers, FaCode, FaTrophy, FaComments, FaTasks, FaGlobe } from 'react-icons/fa';

// Animation variants
const heroVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  hover: { scale: 1.05, boxShadow: '0 0 20px rgba(0, 212, 255, 0.7)' },
};

function Paradise() {
  const [profiles, setProfiles] = useState([]);
  const [selectedProfileId, setSelectedProfileId] = useState(null);

  const fetchProfiles = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/profiles');
      setProfiles(res.data);
    } catch (err) {
      console.error('Fetch Profiles Error:', err);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const handleOpenProfile = (id) => {
    setSelectedProfileId(id);
  };

  const handleCloseProfile = () => {
    setSelectedProfileId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-20 pb-12 overflow-hidden relative">
      {/* Inline CSS matching Home.jsx */}
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
          GravityX Paradise
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-gray-200 mb-10 px-4 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Your Cosmic Hub for Innovation, Collaboration, and Galactic Greatness
        </motion.p>
      </motion.section>

      {/* Cosmic Leaderboard */}
      <section className="container mx-auto py-20 px-4">
        <h2 className="text-5xl neon-heading mb-12 text-center tracking-wider drop-shadow-[0_0_15px_rgba(0,212,255,0.6)]">
          Cosmic Leaderboard
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: 'AstroCoder', points: 1500 },
            { name: 'NebulaDev', points: 1200 },
            { name: 'StarMaster', points: 1000 },
          ].map((leader, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="bg-gray-900/70 backdrop-blur-lg p-6 rounded-xl border border-neonBlue/40 shadow-[0_0_20px_rgba(0,212,255,0.3)]"
            >
              <div className="flex items-center mb-4">
                <FaTrophy className="text-neonBlue mr-3" size={28} />
                <h3 className="text-2xl text-white font-semibold">{leader.name}</h3>
              </div>
              <p className="text-gray-200 text-lg">{leader.points} Cosmic Points</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Live Cosmic Feed */}
      <section className="container mx-auto py-20 px-4">
        <h2 className="text-5xl neon-heading mb-12 text-center tracking-wider drop-shadow-[0_0_15px_rgba(0,212,255,0.6)]">
          Live Cosmic Feed
        </h2>
        <div className="bg-gray-900/70 backdrop-blur-lg p-8 rounded-xl border border-neonBlue/40 shadow-[0_0_30px_rgba(0,212,255,0.3)]">
          {[
            { user: 'StarCoder', action: 'just deployed a new project!', time: '5 mins ago' },
            { user: 'GalaxyGuru', action: 'shared a skill: Quantum JS', time: '10 mins ago' },
            { user: 'NebulaNinja', action: 'joined GravityX!', time: '15 mins ago' },
          ].map((feed, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2, duration: 0.5 }}
              className="flex items-center mb-4"
            >
              <FaComments className="text-neonBlue mr-3" size={24} />
              <p className="text-gray-200">
                <span className="font-semibold text-neonBlue">{feed.user}</span> {feed.action} -{' '}
                <span className="text-gray-400">{feed.time}</span>
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Galactic Challenges */}
      <section className="container mx-auto py-20 px-4">
        <h2 className="text-5xl neon-heading mb-12 text-center tracking-wider drop-shadow-[0_0_15px_rgba(0,212,255,0.6)]">
          Galactic Challenges
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { title: 'Code the Cosmos', desc: 'Build a space-themed app', reward: '500 Points' },
            { title: 'Nebula Hack', desc: 'Solve real-time bugs', reward: '300 Points' },
          ].map((challenge, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="bg-gray-900/70 backdrop-blur-lg p-6 rounded-xl border border-neonBlue/40 shadow-[0_0_20px_rgba(0,212,255,0.3)]"
            >
              <div className="flex items-center mb-4">
                <FaTasks className="text-neonBlue mr-3" size={28} />
                <h3 className="text-2xl text-white font-semibold">{challenge.title}</h3>
              </div>
              <p className="text-gray-200 mb-4">{challenge.desc}</p>
              <p className="text-neonPurple font-semibold">Reward: {challenge.reward}</p>
              <Link to="/challenges">
                <motion.button
                  className="shine-button text-white px-6 py-2 mt-4 rounded-lg text-lg font-semibold inline-flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Join Challenge
                </motion.button>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Community Spotlight */}
      <section className="container mx-auto py-20 px-4">
        <h2 className="text-5xl neon-heading mb-12 text-center tracking-wider drop-shadow-[0_0_15px_rgba(0,212,255,0.6)]">
          Community Spotlight
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {profiles.slice(0, 3).map((profile, idx) => (
            <motion.div
              key={profile._id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="bg-gray-900/70 backdrop-blur-lg p-6 rounded-xl border border-neonBlue/40 shadow-[0_0_20px_rgba(0,212,255,0.3)]"
            >
              <div className="flex items-center mb-4">
                <FaStar className="text-neonBlue mr-3" size={28} />
                <h3 className="text-2xl text-white font-semibold">{profile.name}</h3>
              </div>
              <p className="text-gray-200 mb-4">{profile.bio?.slice(0, 100)}...</p>
              <button
                onClick={() => handleOpenProfile(profile._id)}
                className="text-neonBlue hover:text-neonPurple text-lg font-semibold"
              >
                View Profile
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Cosmic Navigation Hub */}
      <section className="container mx-auto py-20 px-4 text-center">
        <h2 className="text-5xl neon-heading mb-12 tracking-wider drop-shadow-[0_0_15px_rgba(0,212,255,0.6)]">
          Cosmic Navigation Hub
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          {[
            { label: 'Explore Projects', path: '/projects' },
            { label: 'Join Events', path: '/events' },
            { label: 'Collaborate Now', path: '/collaborate' },
            { label: 'Skill Up', path: '/skills' },
          ].map((nav, idx) => (
            <Link key={idx} to={nav.path}>
              <motion.button
                className="shine-button text-white px-8 py-4 rounded-lg text-lg font-semibold inline-flex items-center"
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0, 212, 255, 0.7)' }}
                whileTap={{ scale: 0.95 }}
              >
                <FaRocket className="mr-2" /> {nav.label}
              </motion.button>
            </Link>
          ))}
        </div>
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

export default Paradise;