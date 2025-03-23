import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaInstagram, FaTwitter, FaLinkedin, FaMapMarkerAlt } from 'react-icons/fa';

function ProfileCard({ profile }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="glass-effect rounded-lg p-4 flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4 hover:border-neonBlue/50 transition-all duration-300"
    >
      <img
        src={profile.imageUrl || 'https://via.placeholder.com/150'}
        alt={profile.name}
        className="w-16 h-16 rounded-full object-cover border-2 border-gray-600"
      />
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row justify-between items-start">
          <div>
            <Link to={`/profile/${profile._id}`} className="text-lg font-semibold text-white hover:text-neonBlue">
              {profile.name}
            </Link>
            <p className="text-sm text-gray-400 flex items-center mt-1">
              <FaMapMarkerAlt className="mr-1" size={12} />
              {profile.location || 'Global Dev'}
            </p>
          </div>
          <button className="text-neonBlue text-sm hover:underline mt-2 sm:mt-0">
            Connect →
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {profile.skills.slice(0, 5).map((skill, idx) => (
            <span key={idx} className="bg-gray-700 text-white text-xs px-2 py-1 rounded">
              {skill}
            </span>
          ))}
          {profile.skills.length > 5 && <span className="text-xs text-gray-400">+{profile.skills.length - 5}</span>}
        </div>
        <p className="mt-2 text-gray-300 text-sm line-clamp-2">{profile.bio || 'No bio'}</p>
        <div className="flex space-x-3 mt-2">
          {profile.socialLinks.instagram && (
            <a href={profile.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-gray-400 hover:text-neonBlue" size={16} />
            </a>
          )}
          {profile.socialLinks.twitter && (
            <a href={profile.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-gray-400 hover:text-neonBlue" size={16} />
            </a>
          )}
          {profile.socialLinks.linkedin && (
            <a href={profile.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-gray-400 hover:text-neonBlue" size={16} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default ProfileCard;