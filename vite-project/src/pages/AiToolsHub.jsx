import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaRobot, FaSearch, FaCode, FaPalette, FaBrain, FaChartLine } from 'react-icons/fa';
import { SiTensorflow, SiOpenai } from 'react-icons/si';

const AiToolsHub = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState(''); // State for search input

  const categories = [
    { id: 'all', name: 'All Tools' },
    { id: 'coding', name: 'Code Assistants' },
    { id: 'design', name: 'Design AI' },
    { id: 'productivity', name: 'Productivity' },
    { id: 'analytics', name: 'Data & Analytics' }
  ];

  const tools = [
    { id: 1, name: 'CodePilot', description: 'AI pair programmer that suggests code in real-time', category: 'coding', icon: <FaCode className="text-blue-400 text-3xl" />, popularity: 95 },
    { id: 2, name: 'DesignGenius', description: 'Automatically generates UI mockups from text prompts', category: 'design', icon: <FaPalette className="text-purple-400 text-3xl" />, popularity: 87 },
    { id: 3, name: 'DataSense', description: 'Predictive analytics and automated data visualization', category: 'analytics', icon: <FaChartLine className="text-green-400 text-3xl" />, popularity: 92 },
    { id: 4, name: 'TensorFlow Playground', description: 'Interactive neural network visualization tool', category: 'coding', icon: <SiTensorflow className="text-orange-400 text-3xl" />, popularity: 89 },
    { id: 5, name: 'GPT-4 Studio', description: 'Advanced playground for OpenAI\'s latest models', category: 'productivity', icon: <SiOpenai className="text-cyan-400 text-3xl" />, popularity: 98 },
    { id: 6, name: 'NeuroFlow', description: 'AI-powered workflow automation for developers', category: 'productivity', icon: <FaBrain className="text-pink-400 text-3xl" />, popularity: 85 }
  ];

  // Filter tools based on category & search query
  const filteredTools = tools.filter(tool => 
    (activeCategory === 'all' || tool.category === activeCategory) &&
    tool.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center py-16 relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.1)_0%,transparent_70%)] -z-10" />
          <motion.h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            AI Tools Hub
          </motion.h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Explore a constellation of AI-powered tools to innovate and accelerate your projects
          </p>

          {/* Search Bar */}
          <div className="mt-10 max-w-2xl mx-auto relative">
            <input 
              type="text" 
              placeholder="Search AI tools..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-800/50 border border-cyan-500/30 rounded-full py-4 px-6 pl-14 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 backdrop-blur-lg"
            />
            <FaSearch className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Categories */}
        <motion.div className="flex flex-wrap justify-center gap-3 my-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full transition-all ${activeCategory === category.id 
                ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white' 
                : 'bg-gray-800/50 hover:bg-gray-700/50 text-gray-300'}`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-12">
          {filteredTools.length > 0 ? (
            filteredTools.map(tool => (
              <motion.div key={tool.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} whileHover={{ y: -10, boxShadow: "0 10px 25px rgba(0, 212, 255, 0.3)" }} className="bg-gray-800/50 backdrop-blur-lg rounded-xl overflow-hidden border border-gray-700 hover:border-cyan-500/50 transition-all p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gray-900/50 rounded-lg">
                    {tool.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{tool.name}</h3>
                    <p className="text-gray-400 text-sm mt-1">{tool.description}</p>
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-xs text-cyan-400 uppercase tracking-wider">{tool.category}</span>
                  <div className="flex items-center">
                    <div className="w-24 bg-gray-700 rounded-full h-2 mr-2">
                      <div className="bg-gradient-to-r from-cyan-400 to-purple-500 h-2 rounded-full" style={{ width: `${tool.popularity}%` }}></div>
                    </div>
                    <span className="text-xs text-gray-400">{tool.popularity}%</span>
                  </div>
                </div>
                <button className="mt-6 w-full py-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 rounded-lg transition-all">
                  Explore Tool
                </button>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-400 text-lg col-span-full">No matching tools found.</p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AiToolsHub;
