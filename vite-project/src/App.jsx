import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import AddProfile from './pages/AddProfile';
import EditProfile from './pages/EditProfile';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-black">
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/add-profile" element={<AddProfile />} />
          <Route path="/edit-profile/:id" element={<EditProfile />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;