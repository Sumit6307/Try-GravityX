import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white">GravityX</Link>
        <div>
          <Link to="/add-profile" className="text-white mr-4 hover:underline">Add Profile</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;