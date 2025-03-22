import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import AddProfile from './pages/AddProfile';
import EditProfile from './pages/EditProfile';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/add-profile" element={<AddProfile />} />
        <Route path="/edit-profile/:id" element={<EditProfile />} />
      </Routes>
    </div>
  );
}

export default App;