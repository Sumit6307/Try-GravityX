import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';
import Home from './pages/Home';
import Profile from './pages/Profile';
import AddProfile from './pages/AddProfile';
import EditProfile from './pages/EditProfile';
import Paradise from './pages/Paradise';

function App() {
  const [theme, setTheme] = useState('dark');

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <Navbar />
      <ThemeToggle theme={theme} setTheme={setTheme} />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/add-profile" element={<AddProfile />} />
          <Route path="/edit-profile/:id" element={<EditProfile />} />
          <Route path="/paradise" element={<Paradise />} /> 
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;