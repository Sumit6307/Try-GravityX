import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserPlus, FaHome } from 'react-icons/fa';

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass-effect p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold text-neonBlue">
          GravityX
        </Link>
        <div className="flex space-x-6 items-center">
          <Link to="/" className="text-gray-300 hover:text-neonBlue flex items-center">
            <FaHome className="mr-1" /> Home
          </Link>
          <Link to="/add-profile" className="text-gray-300 hover:text-neonBlue flex items-center">
            <FaUserPlus className="mr-1" /> Add Profile
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;