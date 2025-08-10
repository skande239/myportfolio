import React, { useEffect, useRef, useState } from 'react'
import FloatingParticles from '../components/FloatingParticles'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'

// Enhanced tilt hook with better performance
function useTilt() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return

    let animationId
    function handleMove(e) {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      const rotateX = (y - 0.5) * 15
      const rotateY = (x - 0.5) * -15

      cancelAnimationFrame(animationId)
      animationId = requestAnimationFrame(() => {
        el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`
        el.style.transition = 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1)'
      })
    }

    function handleLeave() {
      cancelAnimationFrame(animationId)
      el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'
      el.style.transition = 'transform 600ms cubic-bezier(0.23, 1, 0.32, 1)'
    }

    el.addEventListener('mousemove', handleMove)
    el.addEventListener('mouseleave', handleLeave)
    return () => {
      el.removeEventListener('mousemove', handleMove)
      el.removeEventListener('mouseleave', handleLeave)
      cancelAnimationFrame(animationId)
    }
  }, [])
  return ref
}

// Your actual GitHub repositories
const actualRepos = [
  {
    id: 1,
    name: 'Crypto_asset',
    description: 'A cryptocurrency asset tracking application built with TypeScript. Features real-time price monitoring, portfolio management, and market analysis tools.',
    html_url: 'https://github.com/skande239/Crypto_asset',
    language: 'TypeScript',
    stargazers_count: 8,
    updated_at: '2024-01-15',
    image: 'https://images.unsplash.com/photo-1605792657660-596af9009e82?w=500&h=300&fit=crop&crop=center',
    tech_stack: ['TypeScript', 'React', 'Node.js', 'API Integration'],
    category: 'Web Application'
  },
  {
    id: 2,
    name: 'e-learningplatform',
    description: 'Comprehensive e-learning platform with course management, user authentication, progress tracking, and interactive learning modules.',
    html_url: 'https://github.com/skande239/e-learningplatform',
    language: 'JavaScript',
    stargazers_count: 15,
    updated_at: '2024-02-20',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&h=300&fit=crop&crop=center',
    tech_stack: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Express'],
    category: 'Full-Stack Application'
  },
  {
    id: 3,
    name: 'Hit-the-mole-game',
    description: 'Interactive whack-a-mole game with responsive design, score tracking, and smooth animations using pure CSS and JavaScript.',
    html_url: 'https://github.com/skande239/Hit-the-mole-game',
    language: 'CSS',
    stargazers_count: 5,
    updated_at: '2023-11-10',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&h=300&fit=crop&crop=center',
    tech_stack: ['HTML5', 'CSS3', 'JavaScript', 'Canvas API'],
    category: 'Game Development'
  },
  {
    id: 4,
    name: 'movie-recommender',
    description: 'Machine learning-based movie recommendation system using collaborative filtering and content-based algorithms to suggest personalized movies.',
    html_url: 'https://github.com/skande239/movie-recommender',
    language: 'Blade',
    stargazers_count: 12,
    updated_at: '2024-03-15',
    image: '/movie.png',
    tech_stack: ['Python', 'Pandas', 'Scikit-learn', 'Flask', 'Blade Templates'],
    category: 'Machine Learning'
  },
  {
    id: 5,
    name: 'ping_pong',
    description: 'Classic Ping Pong game implementation with smooth gameplay mechanics, AI opponent, and score tracking system built with Python.',
    html_url: 'https://github.com/skande239/ping_pong',
    language: 'Python',
    stargazers_count: 6,
    updated_at: '2024-04-10',
    image: 'https://images.unsplash.com/photo-1534158914592-062992fbe900?w=500&h=300&fit=crop&crop=center',
    tech_stack: ['Python', 'Pygame', 'Object-Oriented Programming'],
    category: 'Game Development'
  },
  {
    id: 6,
    name: 'shiny-disco',
    description: 'Python-based data visualization and analysis tool with interactive charts, real-time data processing, and modern UI components.',
    html_url: 'https://github.com/skande239/shiny-disco',
    language: 'Python',
    stargazers_count: 9,
    updated_at: '2023-12-05',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop&crop=center',
    tech_stack: ['Python', 'Data Analysis', 'Visualization', 'Streamlit'],
    category: 'Data Science'
  }
]

// Enhanced project card with image and modal
function ProjectCard({ repo, index, onProjectClick }) {
  const tiltRef = useTilt()
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring",
        damping: 20
      }}
      className="group cursor-pointer"
      onClick={() => onProjectClick(repo)}
    >
      <div ref={tiltRef} className="relative h-full">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden h-full shadow-2xl group-hover:shadow-blue-500/10 transition-all duration-300">
          {/* Project Image */}
          <div className="relative h-48 overflow-hidden">
            <img 
              src={repo.image} 
              alt={`${repo.name} preview`}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
            
            {/* Category Badge */}
            <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-sm border border-white/10 rounded-full text-xs font-medium text-white">
              {repo.category}
            </div>
            
            {/* Stars */}
            <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 bg-black/50 backdrop-blur-sm border border-white/10 rounded-full text-yellow-400">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-xs font-medium">{repo.stargazers_count}</span>
            </div>
          </div>
          
          {/* Project Content */}
          <div className="p-6">
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
              {repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </h3>
            
            <p className="text-slate-300 text-sm leading-relaxed mb-4 line-clamp-3">
              {repo.description}
            </p>
            
            {/* Tech Stack Preview */}
            <div className="flex flex-wrap gap-2 mb-4">
              {repo.tech_stack.slice(0, 3).map((tech, i) => (
                <span key={i} className="px-2 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs rounded-md">
                  {tech}
                </span>
              ))}
              {repo.tech_stack.length > 3 && (
                <span className="px-2 py-1 bg-slate-700/50 text-slate-400 text-xs rounded-md">
                  +{repo.tech_stack.length - 3}
                </span>
              )}
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-xs text-slate-400">{repo.language}</span>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-lg shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              >
                View Details
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Enhanced skill card with animated progress
function SkillCard({ skill, index }) {
  const [isVisible, setIsVisible] = useState(false)
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      onViewportEnter={() => setIsVisible(true)}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        type: "spring"
      }}
      className="group"
    >
      <div className="relative bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
            {skill.name}
          </h3>
          <span className="text-blue-400 font-bold text-lg">
            {skill.level}%
          </span>
        </div>
        
        <div className="relative h-3 bg-slate-700/50 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: isVisible ? `${skill.level}%` : 0 }}
            transition={{ 
              duration: 1.5, 
              delay: index * 0.1,
              type: "spring",
              damping: 20
            }}
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
        </div>
        
        <div className="mt-2 text-xs text-slate-400">
          {skill.category}
        </div>
      </div>
    </motion.div>
  )
}

// Project Modal Component
function ProjectModal({ project, isOpen, onClose }) {
  if (!isOpen || !project) return null
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", damping: 20 }}
          className="bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          onClick={e => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 w-10 h-10 bg-slate-700/80 hover:bg-slate-600/80 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Project Image */}
          <div className="relative h-80 overflow-hidden rounded-t-3xl">
            <img 
              src={project.image} 
              alt={`${project.name} preview`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
            
            {/* Project Title Overlay */}
            <div className="absolute bottom-6 left-6 right-16">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-blue-600/80 backdrop-blur-sm rounded-full text-sm font-medium text-white">
                  {project.category}
                </span>
                <div className="flex items-center gap-1 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-yellow-400">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-sm font-medium">{project.stargazers_count}</span>
                </div>
              </div>
              <h2 className="text-4xl font-black text-white mb-2">
                {project.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </h2>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-slate-300 font-medium">{project.language}</span>
              </div>
            </div>
          </div>
          
          {/* Project Content */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Description */}
              <div className="lg:col-span-2">
                <h3 className="text-2xl font-bold text-white mb-4">About This Project</h3>
                <p className="text-slate-300 leading-relaxed mb-6 text-lg">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-4 mb-8">
                  <motion.a
                    href={project.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300 flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                    View on GitHub
                  </motion.a>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 border-2 border-blue-500/50 text-blue-400 font-bold rounded-xl hover:bg-blue-500/10 transition-all duration-300"
                  >
                    Live Demo
                  </motion.button>
                </div>
              </div>
              
              {/* Tech Stack & Info */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tech_stack.map((tech, i) => (
                      <span key={i} className="px-3 py-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-medium rounded-lg">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Project Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg">
                      <span className="text-slate-400">Primary Language</span>
                      <span className="text-white font-medium">{project.language}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg">
                      <span className="text-slate-400">GitHub Stars</span>
                      <span className="text-yellow-400 font-medium flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {project.stargazers_count}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg">
                      <span className="text-slate-400">Category</span>
                      <span className="text-purple-400 font-medium">{project.category}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg">
                      <span className="text-slate-400">Last Updated</span>
                      <span className="text-white font-medium">{new Date(project.updated_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
  
// Updated resume data from CV
const resumeData = {
    education: [
      {
        id: 1,
        date: '2022 - 2024',
        title: 'Higher National Diploma IT Management',
        org: 'Institut of New Technology',
        details: 'Comprehensive program covering system administration, network management, and IT support fundamentals.'
      }
    ],
    experience: [
      {
        id: 1,
        date: 'May 2022 - March 2025',
        title: 'Technical Support',
        org: 'Concentrix',
        details: 'Collaborated with cross-functional IT teams, maintained user systems, documented support interactions using ticketing systems, and controlled network security threats.'
      },
      {
        id: 2,
        date: 'July 2024',
        title: 'Technical Support Intern',
        org: 'Tunisie Telecom',
        details: 'Provided technical support for customers, diagnosed network connectivity problems, and assisted in maintaining IT infrastructure.'
      },
      {
        id: 3,
        date: 'July - August 2023',
        title: 'Stock Management Intern',
        org: 'World Trade Textile',
        details: 'Used inventory management software, learned data entry and digital record-keeping, assisted in troubleshooting IT systems.'
      }
    ]
  }
  
// Updated skills from CV
const skills = [
    { name: 'System Administration', level: 90, category: 'Infrastructure' },
    { name: 'Windows & Linux', level: 85, category: 'Operating Systems' },
    { name: 'Network Troubleshooting', level: 88, category: 'Networking' },
    { name: 'Customer Support', level: 95, category: 'Soft Skills' },
    { name: 'Python', level: 75, category: 'Programming' },
    { name: 'Docker', level: 70, category: 'DevOps' },
    { name: 'IT Security', level: 80, category: 'Security' },
    { name: 'React & Next.js', level: 78, category: 'Frontend' }
  ]

export default function HomePage() {
  const { scrollY } = useScroll()
  const yBackground = useTransform(scrollY, [0, 600], [0, -150])
  const yHero = useTransform(scrollY, [0, 400], [0, -80])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [contactState, setContactState] = useState('idle')

  function handleProjectClick(project) {
    setSelectedProject(project)
    setIsModalOpen(true)
  }
  function closeModal() {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 antialiased overflow-hidden">
      <motion.div 
        style={{ y: yBackground }}
        className="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-900/20 to-purple-900/20"
      />

      <FloatingParticles />

      <div className="fixed inset-0 bg-[linear-gradient(rgba(148,163,184,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <main className="relative max-w-7xl mx-auto px-6 py-12">
        <motion.section 
          style={{ y: yHero }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32 min-h-[80vh]"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring', damping: 20 }}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
              <div className="relative w-80 h-80 bg-gradient-to-br from-slate-800 to-slate-700 rounded-3xl overflow-hidden border border-slate-600/50 shadow-2xl">
                <div className="absolute inset-4 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl flex items-center justify-center">
                  <div className="text-8xl font-bold text-white/80">SD</div>
                </div>
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.02, 1] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent"
                />
              </div>
            </div>
          </motion.div>

          <div className="text-center lg:text-left">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
              <h1 className="text-6xl lg:text-7xl font-black tracking-tight mb-4">
                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">Skander</span>
                <br />
                <span className="text-white">Deli</span>
              </h1>
              <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-2xl lg:text-3xl text-blue-400 font-semibold mb-6">
                IT Technical Support Specialist
              </motion.h2>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="text-xl text-slate-300 leading-relaxed max-w-2xl mb-8">
                Dedicated IT Support Technician with hands-on experience in troubleshooting hardware, software, and network issues. Strong knowledge of system administration, Windows & Linux environments.
              </motion.p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <motion.a href="#projects" whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-2xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300">
                View My Work
              </motion.a>
              <motion.a href="#contact" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-8 py-4 border-2 border-blue-500/50 text-blue-400 font-bold rounded-2xl hover:bg-blue-500/10 transition-all duration-300">
                Get In Touch
              </motion.a>
            </motion.div>
          </div>
        </motion.section>

        <section id="projects" className="mb-32">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-5xl font-black text-white mb-4">Featured <span className="text-blue-400">Projects</span></h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">Some of the projects I've worked on, showcasing my technical skills and problem-solving abilities.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {actualRepos.map((repo, index) => (
              <ProjectCard key={repo.id} repo={repo} index={index} onProjectClick={handleProjectClick} />
            ))}
          </div>
        </section>

        <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={closeModal} />

        <section id="experience" className="mb-32">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-5xl font-black text-white mb-4">Professional <span className="text-blue-400">Journey</span></h2>
          </motion.div>
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-blue-400 mb-8">Experience</h3>
            <div className="space-y-8">
              {resumeData.experience.map((item, index) => (
                <motion.div key={item.id} initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.2 }} className="relative pl-8 border-l-2 border-blue-500/30">
                  <div className="absolute -left-3 top-0 w-6 h-6 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50" />
                  <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300">
                    <div className="text-blue-400 font-semibold mb-2">{item.date}</div>
                    <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                    <div className="text-purple-400 font-medium mb-3">{item.org}</div>
                    <p className="text-slate-300 leading-relaxed">{item.details}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <h3 className="text-2xl font-bold text-blue-400 mb-8 mt-16">Education</h3>
            <div className="space-y-8">
              {resumeData.education.map((item, index) => (
                <motion.div key={item.id} initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.2 }} className="relative pl-8 border-l-2 border-purple-500/30">
                  <div className="absolute -left-3 top-0 w-6 h-6 bg-purple-500 rounded-full shadow-lg shadow-purple-500/50" />
                  <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300">
                    <div className="text-purple-400 font-semibold mb-2">{item.date}</div>
                    <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                    <div className="text-blue-400 font-medium mb-3">{item.org}</div>
                    <p className="text-slate-300 leading-relaxed">{item.details}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="mb-32">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-5xl font-black text-white mb-4">Technical <span className="text-blue-400">Expertise</span></h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">A comprehensive overview of my technical skills and proficiency levels.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <SkillCard key={skill.name} skill={skill} index={index} />
            ))}
          </div>
        </section>

        <section id="contact" className="mb-20">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-5xl font-black text-white mb-4">Let's <span className="text-blue-400">Connect</span></h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">Ready to collaborate or discuss IT solutions? Get in touch!</p>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
              {[
                { icon: '📧', label: 'Email', value: 'skanderdeli@gmail.com', href: 'mailto:skanderdeli@gmail.com' },
                { icon: '📱', label: 'Phone', value: '+216 20 282 652', href: 'tel:+21620282652' },
                { icon: '🐙', label: 'GitHub', value: 'github.com/skande239', href: 'https://github.com/skande239' },
                { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/deli-skander', href: 'https://linkedin.com/in/deli-skander' },
              ].map((contact, index) => (
                <motion.div key={contact.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="group">
                  <div className="flex items-center gap-4 p-4 bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-xl shadow-lg">{contact.icon}</div>
                    <div className="flex-1">
                      <div className="text-sm text-slate-400 font-medium">{contact.label}</div>
                      {contact.href ? (
                        <a href={contact.href} target="_blank" rel="noopener noreferrer" className="text-white font-semibold hover:text-blue-400 transition-colors duration-300">{contact.value}</a>
                      ) : (
                        <div className="text-white font-semibold">{contact.value}</div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 hover:border-blue-500/30 transition-all duration-300">
              <ContactForm state={contactState} setState={setContactState} />
            </motion.div>
          </div>
        </section>

        <footer className="text-center py-12 border-t border-slate-700/50">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-slate-400">
            <p className="text-lg mb-4">Built with passion and precision</p>
            <p>&copy; {new Date().getFullYear()} Skander Deli - IT Technical Support Specialist</p>
            <div className="mt-4 flex justify-center gap-6">
              <span className="text-sm">React</span>
              <span className="text-slate-600">•</span>
              <span className="text-sm">Framer Motion</span>
              <span className="text-slate-600">•</span>
              <span className="text-sm">Tailwind CSS</span>
            </div>
          </motion.div>
        </footer>
      </main>
    </div>
  )
}

// Enhanced Contact Form Component
function ContactForm({ state, setState }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  
  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }
  
  async function handleSubmit(e) {
    e.preventDefault()
    setState('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Request failed')
      setState('success')
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setState('idle'), 3000)
    } catch (err) {
      console.error('Failed to send message', err)
      setState('idle')
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            disabled={state === 'sending'}
            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
            placeholder="Your name"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            disabled={state === 'sending'}
            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
            placeholder="your@email.com"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            disabled={state === 'sending'}
            rows={5}
            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 resize-none"
            placeholder="Tell me about your project or how I can help..."
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <motion.button
          type="submit"
          disabled={state === 'sending'}
          whileHover={state !== 'sending' ? { scale: 1.02 } : {}}
          whileTap={state !== 'sending' ? { scale: 0.98 } : {}}
          className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-blue-500/25 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        >
          {state === 'sending' ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Sending...
            </div>
          ) : (
            'Send Message'
          )}
        </motion.button>
        
        <AnimatePresence>
          {state === 'success' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-green-400 font-medium flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Message sent!
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </form>
  )
}