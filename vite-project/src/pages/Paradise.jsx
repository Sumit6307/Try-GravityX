// src/pages/Paradise.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { FaRocket, FaGlobe, FaLightbulb, FaTools, FaProjectDiagram, FaFileAlt, FaBrain, FaNewspaper, FaUserPlus, FaComments, FaPalette, FaLaptopCode, FaTrophy, FaHandshake, FaHistory, FaShoppingCart, FaStar, FaFire, FaCog } from 'react-icons/fa';

// Animation Variants
const earthVariants = {
  animate: { rotate: 360, transition: { duration: 20, repeat: Infinity, ease: 'linear' } },
};
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};
const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  hover: { scale: 1.05, boxShadow: '0 0 20px rgba(0, 212, 255, 0.6)', transition: { duration: 0.3 } },
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
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 23;
          days--;
        }
        if (days < 0) {
          clearInterval(interval);
          return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-hidden relative">
      <Navbar />
      <div className="pt-20 pb-12">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.1)_0%,transparent_70%)] -z-10" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500/50 to-purple-500/50" />

        {/* Earth Animation Startup */}
        <motion.div
          variants={earthVariants}
          animate="animate"
          className="absolute top-10 left-1/2 transform -translate-x-1/2 w-40 h-40 md:w-64 md:h-64"
        >
          <FaGlobe className="text-cyan-400 w-full h-full opacity-20" />
          <div className="absolute inset-0 flex items-center justify-center text-2xl md:text-4xl font-bold text-cyan-300 drop-shadow-[0_0_10px_rgba(0,212,255,0.8)]">
            GravityX
          </div>
        </motion.div>

        {/* Hero Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="text-center py-32 relative"
        >
          <motion.h1
            variants={textVariants}
            className="text-5xl md:text-7xl font-extrabold text-cyan-400 mb-6 tracking-wider drop-shadow-[0_0_15px_rgba(0,212,255,0.6)]"
          >
            One Platform for Global Developers
          </motion.h1>
          <motion.p
            variants={textVariants}
            className="text-xl md:text-3xl text-gray-200 mb-8 max-w-3xl mx-auto"
          >
            Fulfill All Your Tech Needs!
          </motion.p>
          <motion.div
            variants={textVariants}
            className="text-2xl md:text-4xl font-semibold text-cyan-300 flex justify-center gap-4 md:gap-8"
          >
            <span>Connect</span> ▸ <span>Collab</span> ▸ <span>Code</span> ▸ <span>Create</span> ▸ <span>Conquer</span>
          </motion.div>
          <motion.div
            variants={countdownVariants}
            animate="animate"
            className="mt-12 text-xl md:text-2xl text-purple-400"
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
          <h2 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-12 text-center drop-shadow-[0_0_10px_rgba(0,212,255,0.5)]">
            Dive into DevDisplay
          </h2>
          <p className="text-lg md:text-xl text-gray-300 text-center mb-16 max-w-2xl mx-auto">
            Whatever you need as a developer, DevDisplay has it all.
          </p>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Opportunities', icon: <FaRocket />, desc: 'Explore various career and learning opportunities in the tech industry.' },
              { title: 'Resources', icon: <FaTools />, desc: 'Access a wide range of learning resources, tools, and libraries to boost your skills.' },
              { title: 'Project Showcase', icon: <FaProjectDiagram />, desc: 'Showcase your projects, get feedback, and inspire others to collaborate.' },
              { title: 'Portfolio Ideas', icon: <FaLightbulb />, desc: 'Get inspired with creative ideas to enhance your portfolio and make an impact.' },
              { title: 'Resume Building', icon: <FaFileAlt />, desc: 'Create a professional resume with tips and templates tailored to the tech industry.' },
              { title: 'AI Tools Hub', icon: <FaBrain />, desc: 'The ultimate hub for powerful and innovative AI tools, all in one place.' },
              { title: 'Industry Trends', icon: <FaNewspaper />, desc: 'Share regular articles and videos on industry trends, expert insights, and career advice.' },
              { title: 'AI Career Guide', icon: <FaBrain />, desc: 'Get AI-powered career recommendations tailored to your skills, interests, and goals.' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className="bg-gray-800/80 p-6 rounded-lg border border-cyan-500/20 shadow-[0_0_15px_rgba(0,212,255,0.1)]"
              >
                <div className="flex items-center mb-4">
                  {item.icon}
                  <h3 className="text-2xl font-semibold text-cyan-300 ml-3">{item.title}</h3>
                </div>
                <p className="text-gray-300 mb-4">{item.desc}</p>
                <Link to="#" className="text-cyan-400 hover:text-purple-400 inline-flex items-center">
                  Explore Now <FaRocket className="ml-2" />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Coming Soon Features */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="container mx-auto py-20 px-4 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-12 text-center drop-shadow-[0_0_10px_rgba(0,212,255,0.5)]">
            Features Coming Soon on DevDisplay!
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              'Portfolio Builder', 'Idea Submission', 'Journey Showcase', 'DesignDisplay', 'Dev Discussions',
              'DevDisplay UI Library', 'DevDisplay Compiler', 'DevDisplay Competitions', 'DevDisplay IT Services',
              'DevDisplay Legacy', 'DevDisplay Marketplace', 'DevDisplay Ecommerce',
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className="bg-gray-900/70 p-4 rounded-lg text-center text-cyan-300 font-semibold border border-purple-500/20"
              >
                {feature}
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
          <h2 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-8 drop-shadow-[0_0_10px_rgba(0,212,255,0.5)]">
            We Believe Innovation is Limitless...✦
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            Suggest new features you'd love to see on DevDisplay! As a tech enthusiast and developer, you're encouraged to think beyond—think outside the box. Suggest and add new, innovative features that could revolutionize the tech world and make a difference in the tech ecosystem. If you spot a gap in the tech industry, DevDisplay can be the solution. You can also give us brutal and honest feedback—Roast Us! It helps us improve and make DevDisplay even better. Here, your ideas matter, your feedback matters, your code matters—you matter.
          </p>
          <div className="flex justify-center gap-6">
            <Link to="#" className="bg-cyan-500 text-white py-3 px-6 rounded-lg flex items-center gap-2 font-semibold hover:bg-cyan-400">
              <FaStar /> Suggest New Idea!
            </Link>
            <Link to="#" className="bg-red-500 text-white py-3 px-6 rounded-lg flex items-center gap-2 font-semibold hover:bg-red-400">
              <FaFire /> Roast DevDisplay!
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
          <h2 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-12 text-center drop-shadow-[0_0_10px_rgba(0,212,255,0.5)]">
            Contributor Badges
          </h2>
          <p className="text-lg md:text-xl text-gray-300 text-center mb-16 max-w-2xl mx-auto">
            These badges recognize the dedication and contributions of developers within the DevDisplay community.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Dev Pioneer', icon: <FaUserPlus />, desc: 'Earn this badge by adding your profile to the DevDisplay platform.' },
              { title: 'Dev Enhancer', icon: <FaCog />, desc: 'Enhance existing features by refining and improving functionalities.' },
              { title: 'Dev Innovator', icon: <FaLightbulb />, desc: 'Bring innovation to the forefront by adding creative and unique features.' },
            ].map((badge, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className="bg-gray-800/80 p-6 rounded-lg border border-cyan-500/20 shadow-[0_0_15px_rgba(0,212,255,0.1)]"
              >
                <div className="flex items-center mb-4">
                  {badge.icon}
                  <h3 className="text-2xl font-semibold text-cyan-300 ml-3">{badge.title}</h3>
                </div>
                <p className="text-gray-300">{badge.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Supported By */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="container mx-auto py-20 px-4 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-xl"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-12 text-center drop-shadow-[0_0_10px_rgba(0,212,255,0.5)]">
            Supported By
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            {Array.from({ length: 10 }, (_, i) => (
              <motion.div
                key={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className="bg-gray-900/70 p-4 rounded-lg text-cyan-300 font-semibold border border-cyan-500/20"
              >
                Supporter {i + 1}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Footer Effect */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500/50 to-purple-500/50" />
      </div>
    </div>
  );
}

export default Paradise;