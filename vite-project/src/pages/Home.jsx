import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import ProfileCard from '../components/ProfileCard';
import { motion } from 'framer-motion';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Home() {
  const [profiles, setProfiles] = useState([]);
  const [trendingSkills, setTrendingSkills] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      const res = await axios.get('http://localhost:5000/api/profiles');
      setProfiles(res.data);
      // Calculate trending skills
      const skillCount = {};
      res.data.forEach(p => p.skills.forEach(s => skillCount[s] = (skillCount[s] || 0) + 1));
      const topSkills = Object.entries(skillCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([skill]) => skill);
      setTrendingSkills(topSkills);
    };
    fetchProfiles();
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center py-20 bg-gradient-to-r from-neonBlue/20 to-neonPurple/20"
      >
        <h1 className="text-6xl font-extrabold text-white mb-4">
          <span className="text-neonBlue">GravityX</span> - Unleash Your Developer Identity
        </h1>
        <p className="text-xl text-gray-300 mb-8">Join 2M+ developers worldwide. Showcase your skills, connect, and shine.</p>
        <Link to="/add-profile" className="shine-button text-white px-6 py-3 rounded-lg text-lg font-semibold">
          Create Your Profile
        </Link>
      </motion.div>

      {/* Featured Developers Carousel */}
      <div className="container mx-auto py-12">
        <h2 className="text-3xl font-bold text-neonBlue mb-6 text-center">Featured Developers</h2>
        <Slider {...sliderSettings}>
          {profiles.slice(0, 5).map(profile => (
            <div key={profile._id} className="px-2">
              <ProfileCard profile={profile} />
            </div>
          ))}
        </Slider>
      </div>

      {/* Trending Skills */}
      <div className="container mx-auto py-12">
        <h2 className="text-3xl font-bold text-neonPurple mb-6 text-center">Trending Skills</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {trendingSkills.map((skill, idx) => (
            <motion.span
              key={idx}
              whileHover={{ scale: 1.1 }}
              className="bg-neonPurple/20 text-neonPurple px-4 py-2 rounded-full"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>

      {/* All Profiles */}
      <div className="container mx-auto py-12">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Explore All Profiles</h2>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {profiles.map(profile => (
            <ProfileCard key={profile._id} profile={profile} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default Home;