import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

function ProfileCard({ profile }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: 1 }}
      className="glass-effect p-6 rounded-xl shadow-lg hover:shadow-neonBlue/50 transition-all duration-300"
    >
      <div className="flex items-center space-x-4">
        <img
          src={profile.imageUrl || 'https://via.placeholder.com/150'}
          alt={profile.name}
          className="w-16 h-16 rounded-full object-cover border-2 border-neonPurple"
        />
        <div>
          <Link to={`/profile/${profile._id}`} className="text-xl font-semibold text-neonBlue hover:underline">
            {profile.name}
          </Link>
          <p className="text-gray-400">{profile.location || 'Earth'}</p>
        </div>
      </div>
      <p className="mt-3 text-gray-300 line-clamp-2">{profile.bio || 'No bio yet'}</p>
      <div className="flex flex-wrap gap-2 mt-3">
        {profile.skills.slice(0, 3).map((skill, idx) => (
          <span key={idx} className="bg-neonPurple/20 text-neonPurple text-sm px-2 py-1 rounded">
            {skill}
          </span>
        ))}
      </div>
      <div className="flex space-x-3 mt-4">
        {profile.socialLinks.github && (
          <a href={profile.socialLinks.github} target="_blank" rel="noopener noreferrer">
            <FaGithub className="text-white hover:text-neonBlue" size={20} />
          </a>
        )}
        {profile.socialLinks.linkedin && (
          <a href={profile.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-white hover:text-neonBlue" size={20} />
          </a>
        )}
        {profile.socialLinks.twitter && (
          <a href={profile.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
            <FaTwitter className="text-white hover:text-neonBlue" size={20} />
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default ProfileCard;