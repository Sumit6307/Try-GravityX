import React, { useState, useEffect } from 'react';
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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Discover Developers</h1>
      <SearchBar setProfiles={setProfiles} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {profiles.map((profile) => (
          <ProfileCard key={profile._id} profile={profile} />
        ))}
      </div>
    </div>
  );
}

export default Home;