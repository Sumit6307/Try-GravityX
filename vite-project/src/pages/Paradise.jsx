import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import ProfileModal from '../components/ProfileModal';
import { FaRocket, FaStar, FaUsers, FaCode, FaTrophy, FaComments, FaTasks, FaGlobe } from 'react-icons/fa';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

// Animation variants
const heroVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: 'easeOut' } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8, rotateX: 20 },
  visible: { opacity: 1, scale: 1, rotateX: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  hover: { scale: 1.1, rotateX: 5, boxShadow: '0 0 30px rgba(0, 212, 255, 0.8)', transition: { duration: 0.3 } },
};

const glowVariants = {
  animate: { boxShadow: ['0 0 20px rgba(0,212,255,0.5)', '0 0 40px rgba(0,212,255,0.8)', '0 0 20px rgba(0,212,255,0.5)'], transition: { duration: 2, repeat: Infinity } },
};

function Paradise() {
  const [profiles, setProfiles] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [feed, setFeed] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [selectedProfileId, setSelectedProfileId] = useState(null);

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const fetchData = async () => {
    try {
      // Fetch profiles
      const profilesRes = await axios.get('http://localhost:5000/api/profiles');
      setProfiles(profilesRes.data);

      // Fetch leaderboard (assuming an endpoint exists or mock for now)
      const leaderboardRes = await axios.get('http://localhost:5000/api/leaderboard');
      setLeaderboard(leaderboardRes.data.slice(0, 3));

      // Fetch live feed (assuming an endpoint exists or mock for now)
      const feedRes = await axios.get('http://localhost:5000/api/feed');
      setFeed(feedRes.data.slice(0, 5));

      // Fetch challenges (assuming an endpoint exists or mock for now)
      const challengesRes = await axios.get('http://localhost:5000/api/challenges');
      setChallenges(challengesRes.data.slice(0, 3));
    } catch (err) {
      console.error('Fetch Data Error:', err);
      // Fallback mock data if API fails
      setLeaderboard([
        { name: 'AstroCoder', points: 1500 },
        { name: 'NebulaDev', points: 1200 },
        { name: 'StarMaster', points: 1000 },
      ]);
      setFeed([
        { user: 'StarCoder', action: 'deployed a project', time: '5 mins ago' },
        { user: 'GalaxyGuru', action: 'shared a skill', time: '10 mins ago' },
        { user: 'NebulaNinja', action: 'joined GravityX', time: '15 mins ago' },
      ]);
      setChallenges([
        { title: 'Code the Cosmos', desc: 'Build a space app', reward: '500 Points' },
        { title: 'Nebula Hack', desc: 'Solve bugs', reward: '300 Points' },
        { title: 'Star Sprint', desc: 'Fastest API', reward: '400 Points' },
      ]);
    }
  };

  useEffect(() => {
    fetchData();
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

      {/* Particle Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: { value: 'transparent' } },
          fpsLimit: 120,
          particles: {
            number: { value: 150, density: { enable: true, value_area: 800 } },
            color: { value: ['#00D4FF', '#D81BFF'] },
            shape: { type: 'circle' },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            move: { enable: true, speed: 2, direction: 'none', random: true, out_mode: 'out' },
            links: { enable: true, distance: 150, color: '#00D4FF', opacity: 0.4, width: 1 },
          },
          interactivity: {
            events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' } },
            modes: { grab: { distance: 200 }, push: { quantity: 4 } },
          },
        }}
        className="absolute inset-0 -z-10"
      />

      {/* Cosmic Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.2)_0%,rgba(216,27,255,0.2)_50%,transparent_80%)] -z-5" />

      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={heroVariants}
        className="relative text-center py-20 bg-gradient-to-r from-neonBlue/20 via-neonPurple/20 to-transparent"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50 -z-10" />
        <motion.h1
          className="text-6xl md:text-8xl neon-heading mb-6 tracking-wide"
          animate={{ textShadow: ['0 0 10px rgba(0,212,255,0.5)', '0 0 20px rgba(0,212,255,0.8)', '0 0 10px rgba(0,212,255,0.5)'] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          GravityX Paradise
        </motion.h1>
        <motion.p
          className="text-xl md:text-3xl text-gray-200 mb-10 px-4 max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Unleash Your Cosmic Potential with 20 Lakh+ Developers
        </motion.p>
      </motion.section>

      {/* Cosmic Dashboard */}
      <div className="container mx-auto px-4 py-20">
        {/* Leaderboard */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-5xl neon-heading mb-12 text-center tracking-wider drop-shadow-[0_0_15px_rgba(0,212,255,0.6)]">
            Cosmic Leaderboard
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leaderboard.map((leader, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className="bg-gray-900/70 backdrop-blur-lg p-6 rounded-xl border border-neonBlue/40"
                style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
              >
                <motion.div variants={glowVariants} animate="animate" className="absolute inset-0 rounded-xl -z-10" />
                <div className="flex items-center mb-4">
                  <FaTrophy className="text-neonBlue mr-3" size={32} />
                  <h3 className="text-2xl text-white font-semibold">{leader.name}</h3>
                </div>
                <p className="text-gray-200 text-lg">{leader.points} Cosmic Points</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Live Cosmic Feed */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-5xl neon-heading mb-12 text-center tracking-wider drop-shadow-[0_0_15px_rgba(0,212,255,0.6)]">
            Live Cosmic Feed
          </h2>
          <div className="bg-gray-900/70 backdrop-blur-lg p-8 rounded-xl border border-neonBlue/40 shadow-[0_0_30px_rgba(0,212,255,0.3)]">
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }} className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neonBlue to-neonPurple" />
            {feed.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.2, duration: 0.5 }}
                className="flex items-center mb-6"
              >
                <FaComments className="text-neonBlue mr-3" size={28} />
                <p className="text-gray-200 text-lg">
                  <span className="font-semibold text-neonBlue">{item.user}</span> {item.action} -{' '}
                  <span className="text-gray-400">{item.time}</span>
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Galactic Challenges */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-5xl neon-heading mb-12 text-center tracking-wider drop-shadow-[0_0_15px_rgba(0,212,255,0.6)]">
            Galactic Challenges
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {challenges.map((challenge, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className="bg-gray-900/70 backdrop-blur-lg p-6 rounded-xl border border-neonBlue/40 relative overflow-hidden"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                  className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-r from-neonBlue to-neonPurple rounded-full opacity-20 -z-10"
                  style={{ filter: 'blur(20px)' }}
                />
                <div className="flex items-center mb-4">
                  <FaTasks className="text-neonBlue mr-3" size={32} />
                  <h3 className="text-2xl text-white font-semibold">{challenge.title}</h3>
                </div>
                <p className="text-gray-200 mb-4">{challenge.desc}</p>
                <p className="text-neonPurple font-semibold mb-4">Reward: {challenge.reward}</p>
                <Link to="/challenges">
                  <motion.button
                    className="shine-button text-white px-6 py-2 rounded-lg text-lg font-semibold inline-flex items-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Join Now
                  </motion.button>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Community Spotlight */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
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
                className="bg-gray-900/70 backdrop-blur-lg p-6 rounded-xl border border-neonBlue/40 relative"
              >
                <motion.div variants={glowVariants} animate="animate" className="absolute inset-0 rounded-xl -z-10" />
                <div className="flex items-center mb-4">
                  <FaStar className="text-neonBlue mr-3" size={32} />
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
        </motion.section>

        {/* Cosmic Navigation Hub */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
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
                  className="shine-button text-white px-8 py-4 rounded-lg text-lg font-semibold inline-flex items-center relative overflow-hidden"
                  whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0, 212, 255, 0.7)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -z-10"
                  />
                  <FaRocket className="mr-2" /> {nav.label}
                </motion.button>
              </Link>
            ))}
          </div>
        </motion.section>
      </div>

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