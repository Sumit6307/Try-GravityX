import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPalette, FaLaptopCode, FaMobileAlt, FaChartLine, FaLightbulb, FaExternalLinkAlt } from 'react-icons/fa';
import { IoMdSearch } from 'react-icons/io';
import { RiLayoutGridFill, RiLayoutMasonryFill, RiLayoutRowFill } from 'react-icons/ri';

const PortfolioIdeas = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [layout, setLayout] = useState('grid');
  const [expandedItem, setExpandedItem] = useState(null);

  const categories = [
    { id: 'all', label: 'All Ideas' },
    { id: 'minimal', label: 'Minimal' },
    { id: 'interactive', label: 'Interactive' },
    { id: 'creative', label: 'Creative' },
    { id: 'data-driven', label: 'Data-Driven' },
    { id: 'mobile-first', label: 'Mobile-First' },
  ];

  const portfolioItems = [
    {
      id: 1,
      title: 'Neon Cyberpunk',
      description: 'A futuristic portfolio with neon aesthetics and cyberpunk vibes',
      longDescription: 'This design features dark backgrounds with vibrant neon accents, glitch effects, and futuristic UI elements. Perfect for developers working with cutting-edge technologies or game developers.',
      tags: ['dark-theme', 'animation-heavy', 'modern'],
      category: 'creative',
      difficulty: 'Advanced',
      previewUrl: 'https://example.com/neon-cyberpunk',
      icon: <FaLightbulb className="text-yellow-400" />,
      featured: true,
    },
    {
      id: 2,
      title: 'Minimal Dev',
      description: 'Clean, typography-focused portfolio for developers',
      longDescription: 'A minimalist approach that puts your code and projects front and center. Features a monospace font, clean lines, and subtle animations. Great for backend developers or those who prefer simplicity.',
      tags: ['minimal', 'typography', 'light-theme'],
      category: 'minimal',
      difficulty: 'Beginner',
      previewUrl: 'https://example.com/minimal-dev',
      icon: <RiLayoutRowFill className="text-blue-400" />,
      featured: false,
    },
    {
      id: 3,
      title: 'Interactive Timeline',
      description: 'Portfolio structured as an interactive timeline of your career',
      longDescription: 'Visitors can scroll through your professional journey, with each stop on the timeline revealing projects, skills learned, and experiences. Includes smooth scroll animations and parallax effects.',
      tags: ['storytelling', 'interactive', 'animation'],
      category: 'interactive',
      difficulty: 'Intermediate',
      previewUrl: 'https://example.com/interactive-timeline',
      icon: <FaChartLine className="text-purple-400" />,
      featured: true,
    },
    {
      id: 4,
      title: 'Code Canvas',
      description: 'Your portfolio as an interactive coding environment',
      longDescription: 'Visitors can actually interact with code snippets that demonstrate your skills. Features a live code editor that shows your projects in action. Perfect for frontend developers and educators.',
      tags: ['interactive', 'educational', 'unique'],
      category: 'interactive',
      difficulty: 'Advanced',
      previewUrl: 'https://example.com/code-canvas',
      icon: <FaLaptopCode className="text-green-400" />,
      featured: true,
    },
    {
      id: 5,
      title: 'Mobile-First Showcase',
      description: 'Portfolio optimized for mobile with gesture controls',
      longDescription: 'Designed mobile-first with swipeable sections, touch-friendly navigation, and performance optimizations. Shows your understanding of mobile UX principles. Great for mobile developers.',
      tags: ['mobile', 'performance', 'touch-friendly'],
      category: 'mobile-first',
      difficulty: 'Intermediate',
      previewUrl: 'https://example.com/mobile-first',
      icon: <FaMobileAlt className="text-cyan-400" />,
      featured: false,
    },
    {
      id: 6,
      title: 'Data Visualization',
      description: 'Portfolio that visualizes your skills and experience',
      longDescription: 'Uses charts, graphs, and data visualization techniques to showcase your skills, project impact, and career growth. Integrates with GitHub API to pull real-time stats. Ideal for data scientists and analysts.',
      tags: ['data-driven', 'analytics', 'dynamic'],
      category: 'data-driven',
      difficulty: 'Advanced',
      previewUrl: 'https://example.com/data-visualization',
      icon: <FaChartLine className="text-pink-400" />,
      featured: false,
    },
  ];

  const filteredItems = portfolioItems.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 via-purple-900/10 to-cyan-900/10" />
      </div>

      <div className="container mx-auto px-6 py-24 relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Cosmic Portfolio Ideas
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Ignite your creativity with stellar portfolio designs from across the galaxy
          </motion.p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="relative max-w-2xl mx-auto mb-10">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              animate={{
                opacity: [0, 0.3, 0],
                transition: { duration: 3, repeat: Infinity }
              }}
            />
            <div className="relative flex items-center">
              <IoMdSearch className="absolute left-4 text-gray-400 text-xl" />
              <input
                type="text"
                placeholder="Search portfolio ideas by style or features..."
                className="w-full pl-12 pr-6 py-4 bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-700 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
            <div className="flex flex-wrap gap-4">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-6 py-3 rounded-full font-medium transition-all ${
                    activeCategory === category.id
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category.label}
                </motion.button>
              ))}
            </div>

            <div className="flex gap-2 bg-gray-800 rounded-full p-1">
              <motion.button
                onClick={() => setLayout('grid')}
                className={`p-3 rounded-full ${layout === 'grid' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <RiLayoutGridFill className="text-lg" />
              </motion.button>
              <motion.button
                onClick={() => setLayout('masonry')}
                className={`p-3 rounded-full ${layout === 'masonry' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <RiLayoutMasonryFill className="text-lg" />
              </motion.button>
              <motion.button
                onClick={() => setLayout('list')}
                className={`p-3 rounded-full ${layout === 'list' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <RiLayoutRowFill className="text-lg" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Portfolio Ideas Grid */}
        <motion.div
          layout
          className={`grid ${
            layout === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 
            layout === 'masonry' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 
            'grid-cols-1'
          } gap-8`}
        >
          <AnimatePresence>
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className={`bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 ${
                    item.featured ? 'ring-2 ring-purple-500/50' : ''
                  }`}
                >
                  <div className="p-6 h-full flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 flex items-center justify-center bg-gray-700 rounded-lg">
                        <span className="text-2xl">{item.icon}</span>
                      </div>
                      {item.featured && (
                        <motion.span
                          className="px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-xs font-semibold rounded-full"
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          whileHover={{ scale: 1.1 }}
                        >
                          Featured
                        </motion.span>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-300 mb-4">
                      {expandedItem === item.id ? item.longDescription : item.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.tags.map((tag, index) => (
                        <motion.span
                          key={index}
                          className="px-3 py-1 bg-gray-700 rounded-full text-xs"
                          whileHover={{ scale: 1.1 }}
                        >
                          #{tag}
                        </motion.span>
                      ))}
                    </div>
                    
                    <div className="mt-auto pt-4 border-t border-gray-700 flex justify-between items-center">
                      <span className="text-sm font-medium px-3 py-1 bg-gray-700 rounded-full">
                        {item.difficulty}
                      </span>
                      
                      <div className="flex gap-2">
                        <motion.button
                          onClick={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
                          className="text-sm text-cyan-400 hover:text-cyan-300"
                          whileHover={{ x: 5 }}
                        >
                          {expandedItem === item.id ? 'Show less' : 'Read more'}
                        </motion.button>
                        
                        <motion.a
                          href={item.previewUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm flex items-center gap-1 text-purple-400 hover:text-purple-300"
                          whileHover={{ x: 5 }}
                        >
                          Preview <FaExternalLinkAlt className="text-xs" />
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                className="col-span-full text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <h3 className="text-2xl font-bold text-gray-400 mb-4">
                  No portfolio ideas found matching your criteria
                </h3>
                <p className="text-gray-500 mb-6">
                  Try adjusting your search or filter to find what you're looking for
                </p>
                <motion.button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Reset Filters
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-32 bg-gradient-to-r from-cyan-900/30 via-purple-900/30 to-cyan-900/30 rounded-2xl p-8 md:p-12 border border-cyan-500/20 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
          <div className="relative z-10 text-center">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Need a custom portfolio design?
            </h3>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Our cosmic designers can create a unique portfolio tailored to your personal brand
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full font-semibold shadow-lg"
              >
                Request Design Service
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-transparent border border-cyan-400 rounded-full font-semibold"
              >
                View Portfolio Templates
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PortfolioIdeas;