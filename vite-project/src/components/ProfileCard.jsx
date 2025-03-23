import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaInstagram, FaTwitter, FaLinkedin, FaMapMarkerAlt, FaCode } from 'react-icons/fa';

// Animation variants for skills
const skillVariants = {
  animate: {
    x: ['100%', '-100%'], // Moves skills from right to left
    transition: {
      x: {
        repeat: Infinity,
        repeatType: 'loop',
        duration: 12, // Slightly slower for a smoother effect
        ease: 'linear',
      },
    },
  },
};

// Card hover animation
const cardVariants = {
  hover: {
    scale: 1.03,
    boxShadow: '0 0 25px rgba(0, 212, 255, 0.5)',
    transition: { duration: 0.3 },
  },
};

function ProfileCard({ profile }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative bg-gradient-to-br from-gray-900 to-black border border-cyan-500/20 rounded-xl p-6 w-full max-w-md mx-auto overflow-hidden shadow-[0_0_15px_rgba(0,212,255,0.1)] transition-all duration-300"
    >
      {/* Profile Header */}
      <div className="flex items-start space-x-5">
        <div className="relative">
          <img
            src={profile.imageUrl || 'https://via.placeholder.com/150'}
            alt={profile.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-cyan-400 shadow-[0_0_15px_rgba(0,212,255,0.5)]"
          />
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-lg -z-10 animate-pulse" />
        </div>
        <div className="flex-1">
          <Link
            to={`/profile/${profile._id}`}
            className="text-3xl font-extrabold text-white hover:text-cyan-400 transition-colors duration-200 drop-shadow-[0_0_8px_rgba(0,212,255,0.4)]"
          >
            {profile.name}
          </Link>
          <p className="text-sm text-gray-300 flex items-center mt-2">
            <FaMapMarkerAlt className="mr-2 text-cyan-400" size={16} />
            {profile.location || 'Global Dev'}
          </p>
          <p className="text-sm text-gray-400 mt-2 italic line-clamp-2 leading-relaxed">
            {profile.bio || 'No bio provided'}
          </p>
        </div>
      </div>

      {/* Animated Skills Box */}
      <div className="mt-6 relative">
        <h3 className="text-xl font-semibold text-cyan-400 mb-3 flex items-center drop-shadow-[0_0_6px_rgba(0,212,255,0.3)]">
          <FaCode className="mr-2" /> Skills
        </h3>
        <div className="relative bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-cyan-500/30 shadow-[0_0_20px_rgba(0,212,255,0.2)] overflow-hidden">
          <motion.div
            className="flex space-x-4 whitespace-nowrap"
            variants={skillVariants}
            animate="animate"
          >
            {profile.skills.length > 0 ? (
              <>
                {profile.skills.map((skill, idx) => (
                  <motion.span
                    key={idx}
                    whileHover={{ scale: 1.1, y: -2, boxShadow: '0 0 10px rgba(0, 212, 255, 0.5)' }}
                    className="inline-block bg-cyan-500/20 text-cyan-300 px-4 py-2 rounded-full text-sm font-medium border border-cyan-400/30"
                  >
                    {skill}
                  </motion.span>
                ))}
                {/* Duplicate for seamless looping */}
                {profile.skills.map((skill, idx) => (
                  <motion.span
                    key={`duplicate-${idx}`}
                    whileHover={{ scale: 1.1, y: -2, boxShadow: '0 0 10px rgba(0, 212, 255, 0.5)' }}
                    className="inline-block bg-cyan-500/20 text-cyan-300 px-4 py-2 rounded-full text-sm font-medium border border-cyan-400/30"
                  >
                    {skill}
                  </motion.span>
                ))}
              </>
            ) : (
              <span className="text-gray-400 text-sm">No skills listed</span>
            )}
          </motion.div>
          {/* Gradient overlays for fade effect */}
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-gray-800/80 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-gray-800/80 to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Social Links */}
      <div className="mt-6 flex justify-center space-x-6">
        {profile.socialLinks.github && (
          <motion.a
            href={profile.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, color: '#00D4FF' }}
          >
            <svg className="w-7 h-7 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.043-1.416-4.043-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02-.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
          </motion.a>
        )}
        {profile.socialLinks.linkedin && (
          <motion.a
            href={profile.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, color: '#00D4FF' }}
          >
            <FaLinkedin className="w-7 h-7 text-gray-400" />
          </motion.a>
        )}
        {profile.socialLinks.twitter && (
          <motion.a
            href={profile.socialLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, color: '#00D4FF' }}
          >
            <FaTwitter className="w-7 h-7 text-gray-400" />
          </motion.a>
        )}
        {profile.socialLinks.instagram && (
          <motion.a
            href={profile.socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, color: '#00D4FF' }}
          >
            <FaInstagram className="w-7 h-7 text-gray-400" />
          </motion.a>
        )}
      </div>

      {/* Connect Button */}
      <motion.button
        whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0, 212, 255, 0.5)' }}
        whileTap={{ scale: 0.95 }}
        className="mt-6 w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-3 rounded-lg font-semibold text-lg"
      >
        Connect
      </motion.button>

      {/* Views Badge */}
      <div className="absolute top-4 right-4 bg-cyan-500/20 text-cyan-300 text-xs px-3 py-1 rounded-full border border-cyan-400/30">
        {profile.views} Views
      </div>
    </motion.div>
  );
}

export default ProfileCard;