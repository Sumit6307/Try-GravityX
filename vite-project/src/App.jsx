import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import AddProfile from './pages/AddProfile';
import EditProfile from './pages/EditProfile'; // New
import ThemeToggle from './components/ThemeToggle';

function App() {
  const [theme, setTheme] = useState('light');

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
        <Navbar />
        <ThemeToggle theme={theme} setTheme={setTheme} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/add-profile" element={<AddProfile />} />
          <Route path="/edit-profile/:id" element={<EditProfile />} /> {/* New */}
        </Routes>
      </div>
    </div>
  );
}

export default App;