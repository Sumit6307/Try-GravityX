import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function Profile() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await axios.get(`http://localhost:5000/api/profiles/${id}`);
      setProfile(res.data);
    };
    fetchProfile();
  }, [id]);

  if (!profile) return <div className="text-center">Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">{profile.name}</h1>
      <p>{profile.bio}</p>
      <p><strong>Skills:</strong> {profile.skills.join(', ')}</p>
      <div className="mt-4">
        <h2 className="text-2xl font-semibold">Projects</h2>
        {profile.projects.map((project, idx) => (
          <div key={idx} className="mt-2">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <pre className="bg-gray-200 dark:bg-gray-700 p-2 rounded">{project.codeSnippet}</pre>
          </div>
        ))}
      </div>
      <Link to={`/edit-profile/${id}`} className="mt-4 inline-block text-blue-600 hover:underline">
        Edit Profile
      </Link>
    </div>
  );
}

export default Profile;