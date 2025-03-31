import { motion } from 'framer-motion';
import { FaFileAlt, FaMagic, FaRobot, FaDownload, FaStar, FaPalette } from 'react-icons/fa';
import { SiGooglesheets } from 'react-icons/si';

const ResumeBuilding = () => {
  const templates = [
    { id: 1, name: 'Tech Minimalist', category: 'ATS Friendly', premium: false },
    { id: 2, name: 'Creative Dev', category: 'Design Focused', premium: true },
    { id: 3, name: 'Executive', category: 'Senior Level', premium: false },
    { id: 4, name: 'Gradient', category: 'Modern', premium: true },
  ];

  const features = [
    { icon: <FaRobot className="text-cyan-400" />, title: "ATS Optimization", desc: "Beat applicant tracking systems with our smart formatting" },
    { icon: <FaMagic className="text-purple-400" />, title: "AI Suggestions", desc: "Get real-time improvements for your bullet points" },
    { icon: <SiGooglesheets className="text-green-400" />, title: "Import from LinkedIn", desc: "One-click import of your work history" },
    { icon: <FaPalette className="text-yellow-400" />, title: "Custom Themes", desc: "50+ color schemes and typography options" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto"
      >
        {/* Hero Section */}
        <div className="text-center py-16 relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.1)_0%,transparent_70%)] -z-10" />
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Resume Builder
          </motion.h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Craft stellar resumes with expert tips and templates designed for tech careers
          </p>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-10 inline-block"
          >
            <button className="shine-button px-8 py-4 rounded-lg text-lg font-semibold bg-gradient-to-r from-cyan-500 to-purple-600 hover:shadow-lg transition-all">
              Start Building Now →
            </button>
          </motion.div>
        </div>

        {/* Template Gallery */}
        <section className="my-20">
          <h2 className="text-3xl font-bold mb-10 text-center neon-text">
            <FaFileAlt className="inline mr-3" />
            Professional Templates
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {templates.map((template) => (
              <motion.div 
                key={template.id}
                whileHover={{ y: -10, boxShadow: "0 10px 25px rgba(0, 212, 255, 0.3)" }}
                className="bg-gray-800/50 backdrop-blur-lg rounded-xl overflow-hidden border border-cyan-500/30"
              >
                <div className="h-48 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                  <FaFileAlt className="text-6xl opacity-30" />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold">{template.name}</h3>
                    {template.premium && (
                      <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-xs flex items-center">
                        <FaStar className="mr-1" /> PREMIUM
                      </span>
                    )}
                  </div>
                  <p className="text-cyan-400 text-sm mt-1">{template.category}</p>
                  <button className="mt-4 w-full py-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 rounded-lg transition-all">
                    Preview
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="my-20 bg-gray-800/30 rounded-2xl p-10 backdrop-blur-lg border border-cyan-500/20">
          <h2 className="text-3xl font-bold mb-12 text-center neon-text">
            Smart Resume Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-900/50 p-6 rounded-xl border border-gray-700 hover:border-cyan-500/50 transition-all"
              >
                <div className="text-3xl mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="text-center my-20">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0, 212, 255, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="premium-button px-10 py-5 rounded-full text-xl font-bold"
          >
            <FaDownload className="inline mr-3" />
            Download Your Professional Resume
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default ResumeBuilding;