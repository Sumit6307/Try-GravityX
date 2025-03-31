import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRocket, FaBriefcase, FaGraduationCap, FaLaptopCode, FaHandshake, FaGlobeAmericas } from 'react-icons/fa';
import { SiHackaday } from 'react-icons/si';
import { IoMdSchool } from 'react-icons/io';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

const Opportunities = () => {
  const [activeTab, setActiveTab] = useState('jobs');
  const [hoveredCard, setHoveredCard] = useState(null);

  const tabs = [
    { id: 'jobs', label: 'Job Board', icon: <FaBriefcase /> },
    { id: 'internships', label: 'Internships', icon: <IoMdSchool /> },
    { id: 'bootcamps', label: 'Bootcamps', icon: <FaLaptopCode /> },
    { id: 'hackathons', label: 'Hackathons', icon: <SiHackaday /> },
    { id: 'mentorship', label: 'Mentorship', icon: <FaHandshake /> },
    { id: 'remote', label: 'Remote Work', icon: <FaGlobeAmericas /> },
  ];

  const opportunitiesData = {
    jobs: [
      {
        id: 1,
        title: 'Senior React Developer',
        company: 'TechNova',
        location: 'San Francisco, Remote',
        salary: '$120k - $150k',
        description: 'Build cutting-edge web applications using React and Next.js',
        tags: ['React', 'TypeScript', 'Node.js'],
      },
      {
        id: 2,
        title: 'Frontend Engineer',
        company: 'DataSphere',
        location: 'New York, Hybrid',
        salary: '$110k - $140k',
        description: 'Create beautiful user interfaces with modern JavaScript',
        tags: ['JavaScript', 'CSS', 'Vue'],
      },
      {
        id: 3,
        title: 'Full Stack Developer',
        company: 'CloudForge',
        location: 'Remote',
        salary: '$130k - $160k',
        description: 'Develop end-to-end solutions with modern tech stack',
        tags: ['React', 'Node.js', 'MongoDB'],
      },
    ],
    internships: [
      {
        id: 1,
        title: 'Frontend Intern',
        company: 'WebCraft',
        location: 'Austin, TX',
        duration: '3 months',
        description: 'Learn React and build real-world applications',
        tags: ['React', 'JavaScript', 'CSS'],
      },
      {
        id: 2,
        title: 'Backend Intern',
        company: 'ServerSide',
        location: 'Remote',
        duration: '6 months',
        description: 'Work with Node.js and cloud infrastructure',
        tags: ['Node.js', 'AWS', 'Python'],
      },
    ],
    bootcamps: [
      {
        id: 1,
        title: 'Advanced JavaScript',
        provider: 'CodeMastery',
        duration: '8 weeks',
        cost: '$1,200',
        description: 'Master modern JavaScript patterns and frameworks',
        tags: ['ES6+', 'React', 'Performance'],
      },
      {
        id: 2,
        title: 'Full Stack Intensive',
        provider: 'DevLaunch',
        duration: '12 weeks',
        cost: '$2,500',
        description: 'Become job-ready full stack developer',
        tags: ['MERN', 'GraphQL', 'Docker'],
      },
    ],
    hackathons: [
      {
        id: 1,
        title: 'Global Hack Week',
        organizer: 'DevNetwork',
        date: 'Oct 15-17, 2023',
        prize: '$50,000',
        description: '48-hour coding marathon with global participants',
        tags: ['Any Stack', 'Team Event', 'Remote'],
      },
      {
        id: 2,
        title: 'AI Innovation Challenge',
        organizer: 'TechFuture',
        date: 'Nov 5-7, 2023',
        prize: '$30,000',
        description: 'Build AI solutions for social impact',
        tags: ['Machine Learning', 'Python', 'Cloud'],
      },
    ],
    mentorship: [
      {
        id: 1,
        title: 'Career Growth Program',
        mentor: 'Sarah Johnson',
        expertise: 'Ex-Google, 10+ years experience',
        duration: '3 months',
        description: 'Personalized career guidance and technical coaching',
        tags: ['Interview Prep', 'Resume Review', 'Networking'],
      },
      {
        id: 2,
        title: 'Startup Mentorship',
        mentor: 'Michael Chen',
        expertise: '3-time founder, Angel Investor',
        duration: '6 sessions',
        description: 'Guidance for tech startup founders',
        tags: ['Pitching', 'Product Development', 'Funding'],
      },
    ],
    remote: [
      {
        id: 1,
        title: 'Remote React Developer',
        company: 'DigitalNomads Inc',
        location: 'Fully Remote',
        salary: '$100k - $130k',
        description: 'Build React applications for global clients',
        tags: ['React', 'TypeScript', 'Remote Work'],
      },
      {
        id: 2,
        title: 'DevOps Engineer',
        company: 'CloudFirst',
        location: 'Remote (Global)',
        salary: '$140k - $170k',
        description: 'Implement CI/CD pipelines and cloud infrastructure',
        tags: ['AWS', 'Terraform', 'Kubernetes'],
      },
    ],
  };

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden relative">
      {/* Animated Particles Background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            particles: {
              number: {
                value: 80,
                density: {
                  enable: true,
                  value_area: 800,
                },
              },
              color: {
                value: "#00d4ff",
              },
              shape: {
                type: "circle",
              },
              opacity: {
                value: 0.5,
                random: true,
                anim: {
                  enable: true,
                  speed: 1,
                  opacity_min: 0.1,
                  sync: false,
                },
              },
              size: {
                value: 3,
                random: true,
                anim: {
                  enable: true,
                  speed: 2,
                  size_min: 0.1,
                  sync: false,
                },
              },
              line_linked: {
                enable: true,
                distance: 150,
                color: "#9333ea",
                opacity: 0.4,
                width: 1,
              },
              move: {
                enable: true,
                speed: 1,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                  enable: false,
                  rotateX: 600,
                  rotateY: 1200,
                },
              },
            },
            interactivity: {
              detect_on: "canvas",
              events: {
                onhover: {
                  enable: true,
                  mode: "grab",
                },
                onclick: {
                  enable: true,
                  mode: "push",
                },
                resize: true,
              },
              modes: {
                grab: {
                  distance: 140,
                  line_linked: {
                    opacity: 1,
                  },
                },
                push: {
                  particles_nb: 4,
                },
              },
            },
            retina_detect: true,
          }}
        />
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
            Cosmic Career Portal
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Launch your developer career with stellar opportunities from across the galaxy
          </motion.p>
          <motion.div
            className="mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Link
              to="/post-opportunity"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <FaRocket className="mr-2" /> Post an Opportunity
            </Link>
          </motion.div>
        </motion.div>

        {/* Tabs Navigation */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-full font-medium flex items-center gap-2 transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-lg">{tab.icon}</span>
              {tab.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Opportunities Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="wait">
            {opportunitiesData[activeTab].map((opportunity) => (
              <motion.div
                key={opportunity.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className={`bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border ${
                  hoveredCard === opportunity.id
                    ? 'border-cyan-400 shadow-xl shadow-cyan-500/20'
                    : 'border-gray-700'
                }`}
                onMouseEnter={() => setHoveredCard(opportunity.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white">{opportunity.title}</h3>
                    {hoveredCard === opportunity.id && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="inline-block px-2 py-1 bg-cyan-500 text-xs font-semibold rounded-full"
                      >
                        NEW
                      </motion.span>
                    )}
                  </div>
                  <p className="text-gray-300 mb-2">
                    {opportunity.company || opportunity.provider || opportunity.mentor || opportunity.organizer}
                  </p>
                  <p className="text-gray-400 text-sm mb-4">
                    {opportunity.location || opportunity.duration || opportunity.date}
                  </p>
                  <p className="text-gray-300 mb-4">{opportunity.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {opportunity.tags.map((tag, index) => (
                      <motion.span
                        key={index}
                        className="px-3 py-1 bg-gray-700 rounded-full text-xs"
                        whileHover={{ scale: 1.1 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                  {opportunity.salary || opportunity.prize || opportunity.cost ? (
                    <p className="text-lg font-semibold text-cyan-400 mb-6">
                      {opportunity.salary || opportunity.prize || opportunity.cost}
                    </p>
                  ) : null}
                  <div className="flex justify-between items-center">
                    <Link
                      to={`/opportunity/${activeTab}/${opportunity.id}`}
                      className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center"
                    >
                      View Details
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </Link>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-purple-600 rounded-lg text-sm font-medium"
                    >
                      Apply Now
                    </motion.button>
                  </div>
                </div>
                {hoveredCard === opportunity.id && (
                  <motion.div
                    className="absolute inset-0 -z-10 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Featured Companies */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-24"
        >
          <h3 className="text-2xl font-bold text-center mb-10 text-gray-300">
            Trusted by cosmic companies across the universe
          </h3>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center opacity-80">
            {['SpaceX', 'NASA', 'Tesla', 'Google', 'Microsoft', 'Amazon', 'Netflix', 'Apple'].map((company, index) => (
              <motion.div
                key={index}
                className="text-2xl font-bold text-gray-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                {company}
              </motion.div>
            ))}
          </div>
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
              Ready to launch your career into orbit?
            </h3>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Join thousands of developers who found their dream jobs through GravityX
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full font-semibold shadow-lg"
              >
                Create Your Profile
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-transparent border border-cyan-400 rounded-full font-semibold"
              >
                Browse All Opportunities
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Opportunities;