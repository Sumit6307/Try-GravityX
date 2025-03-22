import React from 'react';
import { Link } from 'react-router-dom';

function ProfileCard({ profile }) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-4 flex items-start space-x-4">
      {/* Profile Image */}
      <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center text-white text-2xl">
        {profile.name[0]} {/* First letter of name as placeholder */}
      </div>
      {/* Profile Details */}
      <div className="flex-1">
        <Link to={`/profile/${profile._id}`} className="text-xl font-semibold text-white hover:underline">
          {profile.name}
        </Link>
        <p className="text-gray-400">{profile.location || 'No location'}</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {profile.skills.map((skill, idx) => (
            <span key={idx} className="bg-gray-700 text-gray-200 text-sm px-2 py-1 rounded">
              {skill}
            </span>
          ))}
        </div>
        <p className="mt-2 text-gray-300">{profile.bio || 'No bio available'}</p>
        <div className="flex space-x-2 mt-2">
          {profile.socialLinks.github && (
            <a href={profile.socialLinks.github} target="_blank" rel="noopener noreferrer">
              <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub" className="w-5 h-5" />
            </a>
          )}
          {profile.socialLinks.linkedin && (
            <a href={profile.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
              <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" className="w-5 h-5" />
            </a>
          )}
          {profile.socialLinks.twitter && (
            <a href={profile.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
              <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter" className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;