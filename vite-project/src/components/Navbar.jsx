import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaUserPlus, FaHome, FaBars, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Animation variants for the logo
const logoVariants = {
  hover: {
    scale: 1.1,
    textShadow: '0 0 15px rgba(0, 212, 255, 0.8)',
    transition: { duration: 0.3 },
  },
};

// Animation variants for nav items
const navItemVariants = {
  hover: {
    scale: 1.05,
    color: '#00D4FF',
    transition: { duration: 0.2 },
  },
};

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-gray-900 via-black to-gray-900 p-6 shadow-[0_0_20px_rgba(0,212,255,0.2)]"
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <motion.div whileHover="hover" variants={logoVariants}>
          <Link to="/" className="text-4xl font-extrabold text-neonBlue tracking-wide relative">
            GravityX
            <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-neonBlue to-neonPurple rounded-full opacity-75 blur-sm" />
          </Link>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center text-lg font-semibold ${isActive ? 'text-neonBlue' : 'text-gray-300'}`
            }
          >
            <motion.div variants={navItemVariants} whileHover="hover" className="flex items-center">
              <FaHome className="mr-2" /> Home
            </motion.div>
          </NavLink>
          <NavLink
            to="/add-profile"
            className={({ isActive }) =>
              `flex items-center text-lg font-semibold ${isActive ? 'text-neonBlue' : 'text-gray-300'}`
            }
          >
            <motion.div variants={navItemVariants} whileHover="hover" className="flex items-center">
              <FaUserPlus className="mr-2" /> Add Profile
            </motion.div>
          </NavLink>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-gray-300 hover:text-neonBlue focus:outline-none" onClick={toggleMenu}>
          {isOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-gray-900/95 backdrop-blur-md mt-4 p-4 rounded-b-xl shadow-lg"
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block py-3 px-4 text-lg font-semibold ${isActive ? 'text-neonBlue' : 'text-gray-300'} hover:bg-neonBlue/10 rounded-lg transition-colors duration-200`
            }
            onClick={toggleMenu}
          >
            <FaHome className="inline mr-2" /> Home
          </NavLink>
          <NavLink
            to="/add-profile"
            className={({ isActive }) =>
              `block py-3 px-4 text-lg font-semibold ${isActive ? 'text-neonBlue' : 'text-gray-300'} hover:bg-neonBlue/10 rounded-lg transition-colors duration-200`
            }
            onClick={toggleMenu}
          >
            <FaUserPlus className="inline mr-2" /> Add Profile
          </NavLink>
        </motion.div>
      )}

      {/* Decorative Glow Line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neonBlue/50 to-transparent opacity-50" />
    </motion.nav>
  );
}

export default Navbar;