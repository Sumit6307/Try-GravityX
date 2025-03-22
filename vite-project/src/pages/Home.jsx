import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProfileCard from '../components/ProfileCard';
import SearchBar from '../components/SearchBar';

function Home() {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      const res = await axios.get('http://localhost:5000/api/profiles');
      setProfiles(res.data);
    };
    fetchProfiles();
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 p-6 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-blue-500 mb-2">GravityX</h1>
        <p className="text-gray-400 text-center text-sm mb-6">
          The First Global Platform for Developers to Fulfill All Their Tech Needs.
        </p>
        <Link
          to="/add-profile"
          className="bg-blue-600 text-white p-2 rounded-full flex items-center space-x-2 hover:bg-blue-700"
        >
          <span className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center">+</span>
          <span>Add Your Profile</span>
        </Link>
      </div>
      {/* Main Content */}
      <div className="flex-1 p-6">
        <SearchBar setProfiles={setProfiles} />
        <div className="mt-6">
          {profiles.map((profile) => (
            <ProfileCard key={profile._id} profile={profile} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;