// src/pages/Paradise.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Globe from 'react-globe.gl';
import Navbar from '../components/Navbar';
import { FaRocket, FaStar, FaFire, FaCode, FaGlobe,FaFileAlt,FaBrain } from 'react-icons/fa';

// Animation Variants
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};
const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  hover: { scale: 1.05, boxShadow: '0 0 30px rgba(0, 212, 255, 0.8)', transition: { duration: 0.3 } },
};
const textVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};
const countdownVariants = {
  animate: { scale: [1, 1.1, 1], transition: { duration: 1, repeat: Infinity } },
};

function Paradise() {
  const [countdown, setCountdown] = useState({ days: 20, hours: 20, minutes: 39, seconds: 49 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        let { days, hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 23; days--; }
        if (days < 0) { clearInterval(interval); return { days: 0, hours: 0, minutes: 0, seconds: 0 }; }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // GravityX Integration Points Worldwide
  const pointsData = [
    { lat: 40.7128, lng: -74.0060, label: 'New York' }, // USA
    { lat: 51.5074, lng: -0.1278, label: 'London' }, // UK
    { lat: 35.6762, lng: 139.6503, label: 'Tokyo' }, // Japan
    { lat: -33.8688, lng: 151.2093, label: 'Sydney' }, // Australia
    { lat: 28.6139, lng: 77.2090, label: 'New Delhi' }, // India
    { lat: -23.5505, lng: -46.6333, label: 'São Paulo' }, // Brazil
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white overflow-hidden relative">
      <Navbar />
      <div className="pt-20 pb-12">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.2)_0%,transparent_70%)] -z-10" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-purple-500" />

        {/* Real Earth with GravityX Points */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 2 } }}
          className="relative flex justify-center py-10"
        >
          <Globe
            width={600}
            height={600}
            backgroundColor="rgba(0,0,0,0)"
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
            pointsData={pointsData}
            pointLat="lat"
            pointLng="lng"
            pointColor={() => '#00d4ff'}
            pointRadius={0.7}
            pointsMerge={true}
            pointLabel="label"
            labelColor={() => '#ffffff'}
            labelSize={0.5}
            labelDotRadius={0.3}
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-cyan-300 drop-shadow-[0_0_20px_rgba(0,212,255,1)]">
            GravityX
          </div>
        </motion.div>

        {/* Hero Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="text-center py-20"
        >
          <motion.h1
            variants={textVariants}
            className="text-6xl md:text-8xl font-extrabold text-cyan-400 mb-6 tracking-wider drop-shadow-[0_0_20px_rgba(0,212,255,0.8)]"
          >
            One Platform for Global Developers
          </motion.h1>
          <motion.p
            variants={textVariants}
            className="text-2xl md:text-4xl text-gray-200 mb-8 max-w-3xl mx-auto"
          >
            Fulfill All Your Tech Needs!
          </motion.p>
          <motion.div
            variants={textVariants}
            className="text-3xl md:text-5xl font-semibold text-cyan-300 flex justify-center gap-6 md:gap-10"
          >
            <span>Connect</span> ▸ <span>Collab</span> ▸ <span>Code</span> ▸ <span>Create</span> ▸ <span>Conquer</span>
          </motion.div>
          <motion.div
            variants={countdownVariants}
            animate="animate"
            className="mt-12 text-2xl md:text-3xl text-purple-400"
          >
            <p>v2.0 Dropping Soon <span className="text-yellow-400">High Voltage</span></p>
            <p>{countdown.days}d {countdown.hours}h {countdown.minutes}m {countdown.seconds}s</p>
          </motion.div>
        </motion.section>

        {/* Main Content Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="container mx-auto py-20 px-4"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-cyan-400 mb-12 text-center drop-shadow-[0_0_15px_rgba(0,212,255,0.7)]">
            Dive into GravityX
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 text-center mb-16 max-w-2xl mx-auto">
            Whatever you need as a developer, GravityX has it all.
          </p>

          {/* Advanced Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { title: 'Opportunities', icon: <FaRocket />, desc: 'Unlock career and learning paths worldwide.' },
              { title: 'Resources', icon: <FaCode />, desc: 'Access cutting-edge tools and libraries.' },
              { title: 'Project Showcase', icon: <FaGlobe />, desc: 'Display your work, inspire collaboration.' },
              { title: 'Portfolio Ideas', icon: <FaStar />, desc: 'Spark creativity for standout portfolios.' },
              { title: 'Resume Building', icon: <FaFileAlt />, desc: 'Craft tech-focused resumes with ease.' },
              { title: 'AI Tools Hub', icon: <FaBrain />, desc: 'Explore powerful AI innovations.' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className="relative bg-gray-900/90 p-8 rounded-xl border border-cyan-500/30 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 animate-pulse" />
                <div className="relative z-10 flex items-center mb-4">
                  <div className="text-3xl text-cyan-400">{item.icon}</div>
                  <h3 className="text-2xl font-bold text-cyan-300 ml-4">{item.title}</h3>
                </div>
                <p className="text-gray-200 mb-6 z-10 relative">{item.desc}</p>
                <Link to="#" className="relative z-10 text-cyan-400 hover:text-purple-400 font-semibold inline-flex items-center">
                  Explore Now <FaRocket className="ml-2" />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Features Coming Soon */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="container mx-auto py-20 px-4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-cyan-400 mb-12 text-center drop-shadow-[0_0_15px_rgba(0,212,255,0.7)]">
            Features Coming Soon on GravityX!
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[
              'Portfolio Builder', 'Idea Submission', 'Journey Showcase', 'Design Studio',
              'Dev Forums', 'GravityX UI Kit', 'Code Compiler', 'Global Challenges',
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className="relative bg-black/80 p-6 rounded-lg border border-purple-500/40 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent animate-[pulse_3s_infinite]" />
                <h3 className="text-xl font-semibold text-cyan-300 z-10 relative">{feature}</h3>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Innovation Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="container mx-auto py-20 px-4 text-center"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-cyan-400 mb-8 drop-shadow-[0_0_15px_rgba(0,212,255,0.7)]">
            Innovation is Limitless...✦
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12">
            Shape the future of GravityX with your ideas! Suggest groundbreaking features, roast us with honest feedback, and help us revolutionize the tech ecosystem. Your voice drives GravityX forward.
          </p>
          <div className="flex justify-center gap-8">
            <Link to="#" className="bg-cyan-500 text-black py-4 px-8 rounded-full flex items-center gap-3 font-bold hover:bg-cyan-400 shadow-[0_0_20px_rgba(0,212,255,0.8)]">
              <FaStar /> Suggest Idea
            </Link>
            <Link to="#" className="bg-red-500 text-white py-4 px-8 rounded-full flex items-center gap-3 font-bold hover:bg-red-400 shadow-[0_0_20px_rgba(255,0,0,0.8)]">
              <FaFire /> Roast Us
            </Link>
          </div>
        </motion.section>

        {/* Contributor Badges */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="container mx-auto py-20 px-4"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-cyan-400 mb-12 text-center drop-shadow-[0_0_15px_rgba(0,212,255,0.7)]">
            Contributor Badges
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: 'Pioneer', desc: 'Join the GravityX revolution.', icon: <FaRocket /> },
              { title: 'Enhancer', desc: 'Refine and elevate features.', icon: <FaCode /> },
              { title: 'Innovator', desc: 'Push the boundaries of tech.', icon: <FaStar /> },
            ].map((badge, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className="relative bg-gray-900/90 p-8 rounded-full border border-cyan-500/50 flex flex-col items-center overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 animate-[spin_5s_linear_infinite]" />
                <div className="text-4xl text-cyan-400 z-10">{badge.icon}</div>
                <h3 className="text-2xl font-bold text-cyan-300 mt-4 z-10">{badge.title}</h3>
                <p className="text-gray-300 mt-2 z-10">{badge.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Supported By */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="container mx-auto py-20 px-4 bg-black"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-cyan-400 mb-12 text-center drop-shadow-[0_0_15px_rgba(0,212,255,0.7)]">
            Supported By
          </h2>
          <div className="overflow-hidden relative">
            <motion.div
              animate={{ x: ['100%', '-100%'] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="flex gap-12 items-center"
            >
              {[
                'https://logos-world.net/wp-content/uploads/2020/12/Microsoft-Logo.png',
                'https://www.cloudflare.com/static/77a2e6c8bc155da49133e2379e8f4d9b/cloudflare-logo.png',
                'https://assets.vercel.com/image/upload/v1663738468/front/nextjs/Vercel-logotype-dark.png',
                'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/ISO_Logo_%282016%29.svg/1200px-ISO_Logo_%282016%29.svg.png',
                'https://i.imgur.com/abc123.png', // Placeholder for Memes (replace with real URL if available)
              ].map((src, idx) => (
                <img key={idx} src={src} alt="Supporter" className="h-16 md:h-20 object-contain invert" />
              ))}
              {/* Duplicate for seamless scroll */}
              {[
                'https://logos-world.net/wp-content/uploads/2020/12/Microsoft-Logo.png',
                'https://www.cloudflare.com/static/77a2e6c8bc155da49133e2379e8f4d9b/cloudflare-logo.png',
                'https://assets.vercel.com/image/upload/v1663738468/front/nextjs/Vercel-logotype-dark.png',
                'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/ISO_Logo_%282016%29.svg/1200px-ISO_Logo_%282016%29.svg.png',
                'https://i.imgur.com/abc123.png',
              ].map((src, idx) => (
                <img key={idx + 5} src={src} alt="Supporter" className="h-16 md:h-20 object-contain invert" />
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Footer Effect */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-purple-500" />
      </div>
    </div>
  );
}

export default Paradise;