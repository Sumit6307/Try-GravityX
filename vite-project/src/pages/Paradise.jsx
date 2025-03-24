import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import ProfileCard from '../components/ProfileCard';
import ProfileModal from '../components/ProfileModal';
import { FaRocket, FaStar, FaUsers, FaProjectDiagram, FaCalendarAlt, FaCode } from 'react-icons/fa';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

// Animation variants
const heroVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const statVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

function Paradise() {
  const [profiles, setProfiles] = useState([]);
  const [featuredProfiles, setFeaturedProfiles] = useState([]);
  const [selectedProfileId, setSelectedProfileId] = useState(null);

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/profiles');
      setProfiles(res.data);
      const featured = res.data
        .sort((a, b) => (b.views || 0) - (a.views || 0))
        .slice(0, 3);
      setFeaturedProfiles(featured);
    } catch (err) {
      console.error('Fetch Error:', err);
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
      {/* Particle Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: { value: 'transparent' } },
          fpsLimit: 60,
          particles: {
            number: { value: 100, density: { enable: true, value_area: 800 } },
            color: { value: '#00D4FF' },
            shape: { type: 'circle' },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            move: { enable: true, speed: 1, direction: 'none', random: true, out_mode: 'out' },
          },
          interactivity: {
            events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' } },
            modes: { repulse: { distance: 100 }, push: { quantity: 4 } },
          },
        }}
        className="absolute inset-0 -z-10"
      />

      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={heroVariants}
        className="relative text-center py-20 bg-gradient-to-r from-neonBlue/20 via-neonPurple/20 to-transparent"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50 -z-10" />
        <motion.h1
          className="text-6xl md:text-7xl text-white mb-6 tracking-wide"
          style={{ textShadow: '0 0 10px rgba(0,212,255,0.5)' }}
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
          Explore the Cosmic Hub of Innovation and Collaboration
        </motion.p>
      </motion.section>

      {/* Featured Developers Spotlight */}
      {featuredProfiles.length > 0 && (
        <section className="container mx-auto py-20 px-4">
          <h2 className="text-5xl text-white mb-12 text-center tracking-wider drop-shadow-[0_0_15px_rgba(0,212,255,0.6)]">
            Cosmic Stars
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProfiles.map((profile) => (
              <motion.div
                key={profile._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="p-6 rounded-xl bg-gray-900/70 border border-neonBlue/40 shadow-[0_0_20px_rgba(0,212,255,0.3)]"
              >
                <div className="flex items-center mb-4">
                  <FaStar className="text-neonBlue mr-2" size={24} />
                  <h3 className="text-2xl text-white font-semibold">{profile.name}</h3>
                </div>
                <p className="text-gray-300">{profile.bio?.slice(0, 100)}...</p>
                <button
                  onClick={() => handleOpenProfile(profile._id)}
                  className="mt-4 text-neonBlue hover:text-neonPurple text-sm font-semibold"
                >
                  View Profile
                </button>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Community Stats */}
      <section className="container mx-auto py-20 px-4 text-center">
        <h2 className="text-5xl text-white mb-12 tracking-wider drop-shadow-[0_0_15px_rgba(0,212,255,0.6)]">
          The GravityX Universe
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div variants={statVariants} initial="hidden" animate="visible">
            <FaUsers className="text-neonBlue mx-auto mb-4" size={48} />
            <p className="text-4xl text-white font-bold">2M+</p>
            <p className="text-gray-300">Developers</p>
          </motion.div>
          <motion.div variants={statVariants} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
            <FaCode className="text-neonBlue mx-auto mb-4" size={48} />
            <p className="text-4xl text-white font-bold">10K+</p>
            <p className="text-gray-300">Skills Listed</p>
          </motion.div>
          <motion.div variants={statVariants} initial="hidden" animate="visible" transition={{ delay: 0.4 }}>
            <FaProjectDiagram className="text-neonBlue mx-auto mb-4" size={48} />
            <p className="text-4xl text-white font-bold">5K+</p>
            <p className="text-gray-300">Projects Shared</p>
          </motion.div>
        </div>
      </section>

      {/* Top Projects Showcase */}
      <section className="container mx-auto py-20 px-4">
        <h2 className="text-5xl text-white mb-12 text-center tracking-wider drop-shadow-[0_0_15px_rgba(0,212,255,0.6)]">
          Stellar Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Starship OS', desc: 'A futuristic operating system', creator: 'User 1' },
            { title: 'Nebula Chat', desc: 'Real-time cosmic messaging', creator: 'User 2' },
            { title: 'Galaxy AI', desc: 'AI for the universe', creator: 'User 3' },
          ].map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="p-6 rounded-xl bg-gray-900/70 border border-neonBlue/40 shadow-[0_0_20px_rgba(0,212,255,0.3)]"
            >
              <h3 className="text-2xl text-white font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-300 mb-4">{project.desc}</p>
              <p className="text-sm text-gray-400">By {project.creator}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Collaboration Call-to-Action */}
      <section className="container mx-auto py-20 px-4 text-center">
        <h2 className="text-5xl text-white mb-6 tracking-wider drop-shadow-[0_0_15px_rgba(0,212,255,0.6)]">
          Build the Future Together
        </h2>
        <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
          Join forces with developers across the galaxy to create groundbreaking projects.
        </p>
        <Link to="/collaborate">
          <motion.button
            className="bg-gradient-to-r from-neonBlue to-neonPurple text-white px-8 py-4 rounded-lg text-lg font-semibold inline-flex items-center"
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0, 212, 255, 0.7)' }}
            whileTap={{ scale: 0.95 }}
          >
            <FaRocket className="mr-2" /> Start Collaborating
          </motion.button>
        </Link>
      </section>

      {/* Cosmic Events Banner */}
      <section className="container mx-auto py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="p-8 rounded-xl text-center bg-gradient-to-br from-neonBlue/30 to-neonPurple/30 border border-neonBlue/40 shadow-[0_0_30px_rgba(0,212,255,0.3)]"
        >
          <div className="flex items-center justify-center mb-4">
            <FaCalendarAlt className="text-neonBlue mr-3" size={28} />
            <h2 className="text-3xl text-white" style={{ textShadow: '0 0 10px rgba(0,212,255,0.5)' }}>
              Cosmic Events
            </h2>
          </div>
          <p className="text-gray-200 text-lg mb-6">
            Join our next hackathon: <strong>Galactic Code Jam</strong> - April 10, 2025
          </p>
          <Link to="/events">
            <button className="text-neonBlue hover:text-neonPurple text-lg font-semibold">Learn More</button>
          </Link>
        </motion.div>
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