import React from 'react';
import { Link } from 'react-router-dom';

function ProfileCard({ profile }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300">
      <h3 className="text-xl font-semibold">{profile.name}</h3>
      <p className="text-gray-600 dark:text-gray-300">{profile.bio}</p>
      <p className="mt-2"><strong>Skills:</strong> {profile.skills.join(', ')}</p>
      <Link to={`/profile/${profile._id}`} className="text-blue-600 hover:underline mt-2 block">View Profile</Link>
    </div>
  );
}

export default ProfileCard;