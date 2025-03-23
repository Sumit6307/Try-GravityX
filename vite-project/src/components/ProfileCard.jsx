import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaInstagram, FaTwitter, FaLinkedin, FaMapMarkerAlt, FaCode } from 'react-icons/fa';

import { useState, useEffect } from 'react';


// Animation variants for skills
const skillVariants = {
  animate: {
    x: ['100%', '-100%'], // Moves skills from right to left
    transition: {
      x: {
        repeat: Infinity,
        repeatType: 'loop',
        duration: 10, // Adjust speed of movement
        ease: 'linear',
      },
    },
  },
};

function ProfileCard({ profile }) {
  return (
    
    <motion.div
      whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative bg-gradient-to-br from-gray-900 to-black border border-neonBlue/20 rounded-xl p-6 w-full max-w-md mx-auto overflow-hidden shadow-lg hover:border-neonBlue/50 transition-all duration-300"
    >
      {/* Profile Header */}
      <div className="flex items-start space-x-4">
        <div className="relative">
          <img
            src={profile.imageUrl || 'https://via.placeholder.com/150'}
            alt={profile.name}
            className="w-20 h-20 rounded-full object-cover border-4 border-neonPurple/50"
          />
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neonBlue/20 to-neonPurple/20 blur-md -z-10" />
        </div>
        <div className="flex-1">
          <Link
            to={`/profile/${profile._id}`}
            className="text-2xl font-bold text-white hover:text-neonBlue transition-colors duration-200"
          >
            {profile.name}
          </Link>
          <p className="text-sm text-gray-300 flex items-center mt-1">
            <FaMapMarkerAlt className="mr-2 text-neonBlue" size={14} />
            {profile.location || 'Global Dev'}
          </p>
          <p className="text-sm text-gray-400 mt-1 italic line-clamp-2">{profile.bio || 'No bio provided'}</p>
        </div>
      </div>

      {/* Animated Skills Marquee */}
      <div className="mt-4 relative overflow-hidden">
        <h3 className="text-lg font-semibold text-neonPurple mb-2 flex items-center">
          <FaCode className="mr-2" /> Skills
        </h3>
        <motion.div
          className="flex space-x-3 whitespace-nowrap"
          variants={skillVariants}
          animate="animate"
        >
          {profile.skills.length > 0 ? (
            profile.skills.map((skill, idx) => (
              <span
                key={idx}
                className="inline-block bg-neonBlue/20 text-neonBlue px-3 py-1 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))
          ) : (
            <span className="text-gray-400 text-sm">No skills listed</span>
          )}
          {/* Duplicate skills for seamless looping */}
          {profile.skills.map((skill, idx) => (
            <span
              key={`duplicate-${idx}`}
              className="inline-block bg-neonBlue/20 text-neonBlue px-3 py-1 rounded-full text-sm font-medium"
            >
              {skill}
            </span>
          ))}
        </motion.div>
        {/* Gradient overlay to fade edges */}
        <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-gray-900 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-gray-900 to-transparent pointer-events-none" />
      </div>

      {/* Social Links */}
      <div className="mt-4 flex space-x-4">
        {profile.socialLinks.github && (
          <a href={profile.socialLinks.github} target="_blank" rel="noopener noreferrer">
            <svg className="w-6 h-6 text-gray-400 hover:text-neonBlue transition-colors duration-200" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.043-1.416-4.043-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02-.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
        )}
        {profile.socialLinks.linkedin && (
          <a href={profile.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="w-6 h-6 text-gray-400 hover:text-neonBlue transition-colors duration-200" />
          </a>
        )}
        {profile.socialLinks.twitter && (
          <a href={profile.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
            <FaTwitter className="w-6 h-6 text-gray-400 hover:text-neonBlue transition-colors duration-200" />
          </a>
        )}
        {profile.socialLinks.instagram && (
          <a href={profile.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
            <FaInstagram className="w-6 h-6 text-gray-400 hover:text-neonBlue transition-colors duration-200" />
          </a>
        )}
      </div>

      {/* Connect Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-4 w-full shine-button text-white py-2 rounded-lg font-semibold"
      >
        Connect
      </motion.button>

      {/* Views Badge */}
      <div className="absolute top-4 right-4 bg-neonPurple/20 text-neonPurple text-xs px-2 py-1 rounded-full">
        {profile.views} Views
      </div>
    </motion.div>
  );
}

export default ProfileCard;