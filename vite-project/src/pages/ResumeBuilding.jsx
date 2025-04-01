import { motion } from 'framer-motion';
import { FaFileAlt, FaMagic, FaRobot, FaDownload, FaStar, FaPalette, FaCode, FaEye } from 'react-icons/fa';
import { SiGooglesheets, SiGithub } from 'react-icons/si';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const ResumeBuilding = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const templates = [
    { 
      id: 1, 
      name: 'Tech Stack Pro', 
      category: 'ATS Optimized', 
      premium: false,
      preview: '/templates/tech-stack-pro.png',
      features: ['Skills heatmap', 'Project timeline', 'Clean code blocks']
    },
    { 
      id: 2, 
      name: 'Code Artisan', 
      category: 'Developer Focused', 
      premium: true,
      preview: '/templates/code-artisan.png',
      features: ['GitHub integration', 'Animated skill bars', 'Portfolio links']
    },
    { 
      id: 3, 
      name: 'Senior Dev', 
      category: 'Leadership', 
      premium: false,
      preview: '/templates/senior-dev.png',
      features: ['Team metrics', 'Achievement badges', 'Timeline view']
    },
    { 
      id: 4, 
      name: 'Cyber Gradient', 
      category: 'Modern Tech', 
      premium: true,
      preview: '/templates/cyber-gradient.png',
      features: ['QR code linking', 'Dark mode', 'Tech icons']
    },
  ];

  const features = [
    { 
      icon: <FaRobot className="text-cyan-400" />, 
      title: "AI-Powered ATS Scan", 
      desc: "Real-time analysis with keyword optimization scores" 
    },
    { 
      icon: <FaMagic className="text-purple-400" />, 
      title: "Smart Content Generator", 
      desc: "AI-crafted bullet points based on your role and experience" 
    },
    { 
      icon: <SiGithub className="text-gray-400" />, 
      title: "GitHub Sync", 
      desc: "Auto-import your top projects and contributions" 
    },
    { 
      icon: <FaPalette className="text-yellow-400" />, 
      title: "Dynamic Customization", 
      desc: "Live preview with 75+ themes and layout options" 
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white px-6 py-12 overflow-hidden">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto relative"
      >
        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-cyan-400/30 rounded-full"
              initial={{ x: Math.random() * 100 + '%', y: Math.random() * 100 + '%' }}
              animate={{ 
                y: [0, -1000],
                opacity: [0.3, 0, 0.3]
              }}
              transition={{ 
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                delay: Math.random() * 5
              }}
            />
          ))}
        </div>

        {/* Hero Section */}
        <motion.div variants={itemVariants} className="text-center py-20 relative z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.15)_0%,transparent_70%)] -z-10" />
          <motion.h1 
            className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Next-Gen Resume Builder
          </motion.h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8">
            Build tech resumes that land interviews with cutting-edge AI tools and developer-centric templates
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link target='_blank'
              to="https://enhancv.com/" 
              className="inline-flex items-center px-8 py-4 rounded-full text-lg font-semibold bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 shadow-[0_0_20px_rgba(0,212,255,0.5)] transition-all"
            >
              Launch Builder <FaCode className="ml-2" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Template Gallery */}
        <motion.section variants={itemVariants} className="my-24 relative z-10">
          <h2 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
            <FaFileAlt className="inline mr-3" />
            Developer-Tailored Templates
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {templates.map((template) => (
              <motion.div 
                key={template.id}
                whileHover={{ y: -15, boxShadow: "0 15px 40px rgba(0, 212, 255, 0.4)" }}
                onHoverStart={() => setSelectedTemplate(template.id)}
                onHoverEnd={() => setSelectedTemplate(null)}
                className="bg-gray-800/70 backdrop-blur-xl rounded-2xl overflow-hidden border border-cyan-500/40 relative"
              >
                <div className="h-48 relative overflow-hidden">
                  <img 
                    src={template.preview} 
                    alt={template.name} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  {selectedTemplate === template.id && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 bg-black/70 flex items-center justify-center"
                    >
                      <ul className="text-sm text-gray-200">
                        {template.features.map((feat, i) => (
                          <li key={i} className="flex items-center mb-2">
                            <FaStar className="mr-2 text-cyan-400" /> {feat}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-bold text-cyan-300">{template.name}</h3>
                    {template.premium && (
                      <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs flex items-center">
                        <FaStar className="mr-1" /> Premium
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm">{template.category}</p>
                  <div className="mt-4 flex gap-3">
                    <button className="flex-1 py-2 bg-cyan-500/20 hover:bg-cyan-500/40 border border-cyan-500/50 rounded-lg transition-all flex items-center justify-center">
                      <FaEye className="mr-2" /> Preview
                    </button>
                    <button className="flex-1 py-2 bg-purple-500/20 hover:bg-purple-500/40 border border-purple-500/50 rounded-lg transition-all">
                      Select
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Features */}
        <motion.section 
          variants={itemVariants}
          className="my-24 bg-gradient-to-r from-gray-800/20 to-gray-900/20 rounded-3xl p-12 backdrop-blur-2xl border border-cyan-500/30 relative z-10"
        >
          <h2 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
            Advanced Resume Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, borderColor: "rgba(0, 212, 255, 0.7)" }}
                className="bg-gray-900/60 p-6 rounded-2xl border border-gray-700/50 transition-all"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-cyan-300 mb-2">{feature.title}</h3>
                <p className="text-gray-300 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.div 
          variants={itemVariants}
          className="text-center my-24 relative z-10"
        >
          <motion.div
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(0, 212, 255, 0.6)" }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <button className="px-12 py-5 rounded-full text-xl font-bold bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white shadow-[0_0_30px_rgba(0,212,255,0.5)] hover:shadow-[0_0_50px_rgba(0,212,255,0.7)] transition-all">
              <FaDownload className="inline mr-3" />
              Create & Download Now
            </button>
          </motion.div>
          <p className="mt-4 text-gray-400">Export as PDF, DOCX, or shareable link</p>
        </motion.div>
      </motion.div>

      {/* Custom CSS */}
      <style jsx>{`
        .bg-gradient-to-b {
          background: linear-gradient(to bottom, #111827, #0f172a, #000000);
        }
      `}</style>
    </div>
  );
};

export default ResumeBuilding;