// client/src/components/ProfileCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaInstagram, FaTwitter, FaLinkedin, FaMapMarkerAlt } from 'react-icons/fa';

function ProfileCard({ profile }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 flex items-start space-x-4 border border-gray-700/50 hover:border-neonBlue/50 transition-all duration-300"
    >
      {/* Avatar */}
      <img
        src={profile.imageUrl || 'https://via.placeholder.com/150'}
        alt={profile.name}
        className="w-12 h-12 rounded-full object-cover border-2 border-gray-600"
      />

      {/* Profile Info */}
      <div className="flex-1">
        {/* Name and Location */}
        <div className="flex justify-between items-start">
          <div>
            <Link to={`/profile/${profile._id}`} className="text-lg font-semibold text-white hover:text-neonBlue transition-colors">
              {profile.name}
            </Link>
            <p className="text-sm text-gray-400 flex items-center mt-1">
              <FaMapMarkerAlt className="mr-1" size={12} />
              {profile.location || 'Global Developer'}
            </p>
          </div>
          {/* Connect Button */}
          <button className="text-neonBlue text-sm flex items-center hover:underline">
            Connect <span className="ml-1">→</span>
          </button>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mt-2">
          {profile.skills.slice(0, 5).map((skill, idx) => (
            <span
              key={idx}
              className="bg-gray-700 text-white text-xs font-medium px-2 py-1 rounded"
            >
              {skill}
            </span>
          ))}
          {profile.skills.length > 5 && (
            <span className="text-xs text-gray-400">+{profile.skills.length - 5}</span>
          )}
        </div>

        {/* Bio */}
        <p className="mt-2 text-gray-300 text-sm line-clamp-2">{profile.bio || 'No bio yet'}</p>

        {/* Social Links */}
        <div className="flex space-x-3 mt-2">
          {profile.socialLinks.instagram && (
            <a href={profile.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-gray-400 hover:text-neonBlue transition-colors" size={16} />
            </a>
          )}
          {profile.socialLinks.twitter && (
            <a href={profile.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-gray-400 hover:text-neonBlue transition-colors" size={16} />
            </a>
          )}
          {profile.socialLinks.linkedin && (
            <a href={profile.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-gray-400 hover:text-neonBlue transition-colors" size={16} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default ProfileCard;