import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [editToken, setEditToken] = useState(localStorage.getItem(`editToken_${id}`) || '');

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await axios.get(`http://localhost:5000/api/profiles/${id}`);
      setProfile(res.data);
    };
    fetchProfile();
  }, [id]);

  const handleEdit = () => {
    if (!editToken) {
      const token = prompt('Please enter your edit token:');
      if (token) {
        setEditToken(token);
        localStorage.setItem(`editToken_${id}`, token);
        navigate(`/edit-profile/${id}`);
      }
    } else {
      navigate(`/edit-profile/${id}`);
    }
  };

  if (!profile) return <div className="text-center text-white">Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="flex items-start space-x-4">
          <div className="w-24 h-24 bg-gray-600 rounded-full flex items-center justify-center text-white text-3xl">
            {profile.name[0]}
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white">{profile.name}</h1>
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
            {editToken && (
              <button
                onClick={handleEdit}
                className="mt-4 bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-white">Projects</h2>
          {profile.projects.map((project, idx) => (
            <div key={idx} className="mt-2">
              <h3 className="text-lg font-semibold text-white">{project.title}</h3>
              <p className="text-gray-300">{project.description}</p>
              <pre className="bg-gray-700 text-gray-200 p-2 rounded mt-1">{project.codeSnippet}</pre>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;