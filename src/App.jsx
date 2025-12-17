import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, ChevronRight, Github, Linkedin, Instagram, Facebook, Youtube, Mail, Phone, MapPin,
  Award, Rocket, Users, Calendar, Zap, Target, Trophy, ExternalLink, Play, Circle, CircleDot, Archive
} from 'lucide-react';

// ==================== DATA FILES ====================
import organizationData from './data/organizationData.json';
import teamMembersData from './data/teamMembersData.json';

// ==================== UTILITY ====================
const colorClasses = {
  cyan: {
    text: 'text-cyan-400',
    border: 'border-cyan-400',
    bg: 'bg-cyan-400/20',
    icon: 'text-cyan-400',
    hover: 'hover:border-cyan-400/60',
    borderClass: 'border-cyan-400/30'
  },
  purple: {
    text: 'text-purple-400',
    border: 'border-purple-400',
    bg: 'bg-purple-400/20',
    icon: 'text-purple-400',
    hover: 'hover:border-purple-400/60',
    borderClass: 'border-purple-400/30'
  },
  orange: {
    text: 'text-orange-400',
    border: 'border-orange-400',
    bg: 'bg-orange-400/20',
    icon: 'text-orange-400',
    hover: 'hover:border-orange-400/60',
    borderClass: 'border-orange-400/30'
  },
  emerald: {
    text: 'text-emerald-400',
    border: 'border-emerald-400',
    bg: 'bg-emerald-400/20',
    icon: 'text-emerald-400',
    hover: 'hover:border-emerald-400/60',
    borderClass: 'border-emerald-400/30'
  }
};

const ParticleGrid = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
    <div className="absolute inset-0" style={{
      backgroundImage: `radial-gradient(circle at 2px 2px, #00f0ff 1px, transparent 0)`,
      backgroundSize: '50px 50px'
    }} />
  </div>
);

const GlassCard = ({ children, className = '', accent = 'cyan' }) => {
  const colors = colorClasses[accent] || colorClasses.cyan;
  return (
    <div className={`bg-slate-900/40 backdrop-blur-md border ${colors.borderClass} ${colors.hover} rounded-lg p-6 transition-all duration-300 ${className}`}>
      {children}
    </div>
  );
};

// ==================== NAVBAR ====================
const Navbar = ({ currentPage, setCurrentPage }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'fleet', label: 'Hangar' },
    { id: 'subsystems', label: 'Subsystems' },
    { id: 'competitions', label: 'Mission Log' },
    { id: 'team', label: 'Command Deck' },
    { id: 'contact', label: 'Comms Array' }
  ];

  return (
    <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/80 backdrop-blur-lg shadow-lg shadow-cyan-500/10' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentPage('home')}>
            <img 
              src="images/logo.png" 
              alt="Rakshak Logo" 
              className="h-10 w-auto object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }} 
            />
            <div className="h-10 w-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg items-center justify-center hidden">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-white">TEAM RAKSHAK</h1>
              <p className="text-xs text-cyan-400">IIT BOMBAY</p>
            </div>
          </div>

          <div className="hidden md:flex space-x-1">
            {navLinks.map((link) => (
              <button key={link.id} onClick={() => setCurrentPage(link.id)} className={`px-4 py-2 rounded-lg transition-all duration-200 ${currentPage === link.id ? 'bg-cyan-400/20 text-cyan-400 border border-cyan-400/30' : 'text-slate-300 hover:bg-slate-800/50 hover:text-cyan-400'}`}>
                {link.label}
              </button>
            ))}
          </div>

          <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden text-white p-2">
            {mobileMenu ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenu && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-slate-900/95 backdrop-blur-lg border-t border-cyan-400/20">
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <button key={link.id} onClick={() => { setCurrentPage(link.id); setMobileMenu(false); }} className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${currentPage === link.id ? 'bg-cyan-400/20 text-cyan-400 border border-cyan-400/30' : 'text-slate-300 hover:bg-slate-800/50'}`}>
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

// ==================== HOME PAGE ====================
const MissionTicker = () => {
  const taglines = organizationData.organization_profile.taglines;
  const duplicatedTaglines = [...taglines, ...taglines, ...taglines];
  return (
    <div className="w-full overflow-hidden bg-gradient-to-r from-cyan-900/20 via-blue-900/30 to-cyan-900/20 border-y border-cyan-400/20 py-3">
      <motion.div animate={{ x: [0, -1920] }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }} className="flex space-x-12 whitespace-nowrap">
        {duplicatedTaglines.map((tagline, idx) => (
          <div key={idx} className="flex items-center space-x-3">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400 font-mono text-sm">{tagline}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const FeaturedStats = () => {
  const stats = [
    { label: 'Established', value: '2015', icon: Calendar, color: 'cyan' },
    { label: 'Team Members', value: '50+', icon: Users, color: 'purple' },
    { label: 'Aircraft Built', value: '6+', icon: Rocket, color: 'orange' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        const classes = colorClasses[stat.color];
        return (
          <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
            <GlassCard accent={stat.color} className="text-center">
              <Icon className={`w-12 h-12 mx-auto mb-4 ${classes.icon}`} />
              <div className={`text-4xl font-bold ${classes.text} mb-2`}>{stat.value}</div>
              <div className="text-slate-400 text-sm uppercase tracking-wider">{stat.label}</div>
            </GlassCard>
          </motion.div>
        );
      })}
    </div>
  );
};

const AboutSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mb-12"
    >
      <GlassCard accent="cyan" className="overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* TEXT */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 flex items-center">
              <Users className="w-7 h-7 text-cyan-400 mr-3" />
              Who We Are
            </h2>

            <p className="text-slate-300 leading-relaxed mb-4">
              Team Rakshak is a student-led UAV development team at IIT Bombay,
              composed of members from aerospace, electronics, and software
              engineering, working together to build autonomous aerial systems
              with real-world impact.
            </p>

            <p className="text-slate-300 leading-relaxed mb-4">
              We design, simulate, fabricate, and flight-test UAV platforms
              capable of operating in demanding environments, with a strong
              emphasis on reliability, autonomy, and rapid deployment.
            </p>

            <p className="text-slate-400 leading-relaxed text-sm">
              Our members are selected through a rigorous process and operate in
              tightly integrated sub-teams, contributing across the complete
              engineering lifecycle — from early research to final flight
              validation.
            </p>
          </div>

          {/* IMAGE */}
          <div className="relative">
            <div className="relative h-64 md:h-72 rounded-lg overflow-hidden border border-slate-700/50">
              <img
                src="images/team_24-25.jpg"
                alt="Team Rakshak"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = `
                    <div class="w-full h-full flex items-center justify-center bg-slate-800/50">
                      <span class="text-slate-500 text-sm">Team Image</span>
                    </div>`;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/20 to-transparent" />
            </div>

            {/* Accent glow consistent with rest of site */}
            <div className="absolute -inset-3 bg-cyan-400/10 blur-xl rounded-2xl -z-10" />
          </div>

        </div>
      </GlassCard>
    </motion.div>
  );
};

const EngineeringSection = ({ setCurrentPage }) => {
  const profile = organizationData.organization_profile;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mb-12"
    >
      <GlassCard accent="purple">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 flex items-center">
          <Rocket className="w-7 h-7 text-purple-400 mr-3" />
          Built From the Ground Up
        </h2>

        <p className="text-slate-300 leading-relaxed mb-8">
          {profile.engineering_overview}
        </p>

        <div className="mt-6 pt-6 border-t border-slate-700/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-sm max-w-xl">
            Every subsystem, airframe, and line of code at Rakshak is engineered as part of a unified system —
            designed, tested, and refined through real-world flight experience.
          </p>

          <div className="flex gap-3">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-5 py-2 bg-slate-800/70 border border-slate-700 text-slate-300 rounded-lg hover:bg-slate-800 transition-all"
            >
              Back to Top
            </button>

            <button
              onClick={() => setCurrentPage('subsystems')}
              className="px-5 py-2 bg-purple-400/20 border border-purple-400/40 text-purple-300 rounded-lg font-semibold hover:scale-105 transition-transform"
            >
              Explore Subsystems
            </button>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};

const HomePage = ({ setCurrentPage }) => {
  const profile = organizationData.organization_profile;
  const [isLogoLoaded, setIsLogoLoaded] = useState(false);

  return (
    <div className="min-h-screen">
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <ParticleGrid />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-slate-950" />
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            transition={{ duration: 0.8 }} 
            className="mb-6"
          >
            <div className="relative inline-block">
              <motion.img 
                src={profile.logo} 
                alt="Team Rakshak Logo" 
                className="w-auto max-w-4xl mx-auto mb-6"
                style={{
                  filter: 'drop-shadow(0 0 40px rgba(0, 240, 255, 0.3)) drop-shadow(0 0 80px rgba(0, 240, 255, 0.2))'
                }}
                onLoad={() => setIsLogoLoaded(true)}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }} 
              />
              {/* Animated glow effect that follows logo contours */}
              {isLogoLoaded && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-purple-500/5 blur-xl opacity-50 animate-pulse" style={{ animationDuration: '3s' }} />
                  <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/10 via-transparent to-purple-500/10 blur-2xl opacity-30" />
                </>
              )}
            </div>
            <div className="w-48 h-48 mx-auto bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full items-center justify-center mb-6 shadow-2xl shadow-cyan-500/50 hidden">
              <Rocket className="w-20 h-20 text-white" />
            </div>
          </motion.div>

          <motion.h1 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="text-5xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            TEAM RAKSHAK
          </motion.h1>

          <motion.p initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="text-xl md:text-2xl text-cyan-400 mb-6">
            {profile.institution}
          </motion.p>

          <motion.p initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.7 }} className="text-slate-300 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            {profile.mission_statement}
          </motion.p>
        </div>
      </div>

      <MissionTicker />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <FeaturedStats />

        <AboutSection />

        <EngineeringSection setCurrentPage={setCurrentPage} />
      </div>
    </div>
  );
};

// ==================== FLEET PAGE (COMPLETED WITH FIXES) ====================
const FleetPage = () => {
  const [hoveredPlane, setHoveredPlane] = useState(null);
  const [activePlane, setActivePlane] = useState(null);
  const fleet = organizationData.fleet_specifications.sort((a, b) => parseInt(b.year) - parseInt(a.year));
  
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const timelineRef = useRef(null);
  const activeCardRef = useRef(null);
  const [fillHeight, setFillHeight] = useState(0);
  const [markerPosition, setMarkerPosition] = useState(0);

  // Calculate positions for fill and marker
  useEffect(() => {
    if (!containerRef.current || !timelineRef.current) return;
    
    const updatePositions = () => {
      const targetPlane = activePlane || hoveredPlane;
      const hoveredIndex = fleet.findIndex(p => p.name === targetPlane);
      
      if (hoveredIndex === -1) {
        setFillHeight(0);
        setMarkerPosition(0);
        return;
      }

      const cardElement = cardRefs.current[hoveredIndex];
      if (!cardElement) return;

      const timelineRect = timelineRef.current.getBoundingClientRect();
      const cardRect = cardElement.getBoundingClientRect();
      const cardCenter = cardRect.top + (cardRect.height / 2);
      
      // Calculate fill height
      const relativePosition = cardCenter - timelineRect.top;
      const timelineHeight = timelineRef.current.offsetHeight;
      const percentage = (relativePosition / timelineHeight) * 100;
      setFillHeight(Math.min(100, Math.max(0, percentage)));
      
      // Calculate marker position
      const markerPercent = percentage;
      setMarkerPosition(markerPercent);
    };

    updatePositions();
    
    const resizeObserver = new ResizeObserver(updatePositions);
    cardRefs.current.forEach(ref => {
      if (ref) resizeObserver.observe(ref);
    });

    window.addEventListener('resize', updatePositions);
    
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updatePositions);
    };
  }, [hoveredPlane, activePlane, fleet]);

  const handlePlaneHover = (planeName) => {
    if (!activePlane) {
      setHoveredPlane(planeName);
    }
  };

  const handlePlaneClick = (planeName, e) => {
    e.stopPropagation();
    // Close all other cards smoothly
    if (activePlane === planeName) {
      setActivePlane(null);
      setHoveredPlane(null);
    } else {
      setActivePlane(planeName);
      setHoveredPlane(planeName);
    }
  };

  const handlePlaneLeave = () => {
    if (!activePlane) {
      setHoveredPlane(null);
    }
  };

  const handleCloseActive = (e) => {
    if (
      activePlane &&
      activeCardRef.current &&
      !activeCardRef.current.contains(e.target)
    ) {
      setActivePlane(null);
      setHoveredPlane(null);
    }
  };

  // Listen for clicks outside cards to close
  useEffect(() => {
    const handler = (e) => {
      if (
        activePlane &&
        activeCardRef.current &&
        !activeCardRef.current.contains(e.target)
      ) {
        setActivePlane(null);
        setHoveredPlane(null);
      }
    };

    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [activePlane]);

  return (
    <div className="min-h-screen pt-24 pb-16 relative">
      <ParticleGrid />
      <div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" 
        ref={containerRef}
      >
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">THE HANGAR</h1>
          <p className="text-lg md:text-xl text-cyan-400">Our Fleet Evolution Timeline</p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Main Timeline Line (Desktop) */}
          <div 
            ref={timelineRef}
            className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 top-0"
            style={{ zIndex: 0 }}
          >
            {/* Background Track */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-700/40 via-slate-600/30 to-slate-700/40 rounded-full" />
            
            {/* Animated Fill */}
            <motion.div 
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-600 rounded-full shadow-lg shadow-cyan-500/50"
              animate={{ height: `${fillHeight}%` }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            />
          </div>

          {/* Mobile Timeline */}
          <div className="md:hidden mb-8">
            <div className="flex justify-between mb-3 px-2">
              {fleet.map((plane, idx) => (
                <button
                  key={idx}
                  onClick={(e) => handlePlaneClick(plane.name, e)}
                  className={`text-xs font-mono transition-all duration-300 ${
                    activePlane === plane.name 
                      ? 'text-cyan-400 font-bold scale-125' 
                      : hoveredPlane === plane.name
                      ? 'text-cyan-300 scale-110'
                      : 'text-slate-500'
                  }`}
                >
                  {plane.year}
                </button>
              ))}
            </div>
            <div className="h-2 w-full bg-slate-800/50 rounded-full overflow-hidden border border-slate-700/50">
              <motion.div 
                className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full"
                animate={{ width: `${fillHeight}%` }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              />
            </div>
          </div>

          {/* Cards */}
          <div className="space-y-12 md:space-y-20">
            {fleet.map((plane, idx) => {
              const isExpanded = activePlane === plane.name;
              const isHovered = hoveredPlane === plane.name && !activePlane;
              const isActive = isExpanded || isHovered;
              
              return (
                <motion.div
                  key={plane.name}
                  id={`plane-${idx}`}
                  ref={el => cardRefs.current[idx] = el}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className={`relative flex flex-col md:flex-row items-center card-container ${
                    idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Marker (Desktop) - Only for non-active/hover states */}
                  <div
                    className="hidden md:flex absolute left-1/2 top-1/2 items-center justify-center"
                    style={{
                      transform: 'translate(-50%, -50%)',
                      zIndex: isActive ? 30 : 20
                    }}
                  >
                    <motion.div
                      className="relative rounded-full flex items-center justify-center"
                      animate={{
                        width: isActive ? 56 : 40,
                        height: isActive ? 56 : 40,
                        boxShadow: isActive
                          ? '0 0 30px rgba(34,211,238,0.6)'
                          : '0 0 0 rgba(0,0,0,0)',
                        scale: isActive ? 1.1 : 1
                      }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      style={{
                        background: isActive
                          ? `
                              linear-gradient(
                                135deg,
                                rgba(6,182,212,0.25),
                                rgba(168,85,247,0.25)
                              ),
                              rgba(15,23,42,1)
                            `
                          : 'rgba(15,23,42,1)',

                        border: isActive
                          ? '3px solid rgb(34,211,238)'
                          : '2px solid rgb(51,65,85)'
                      }}
                    >
                      <span
                        className={`font-mono font-bold ${
                          isActive ? 'text-cyan-400 text-sm' : 'text-slate-400 text-xs'
                        }`}
                      >
                        {plane.year}
                      </span>
                    </motion.div>
                  </div>

                  {/* Content Card */}
                  <motion.div 
                    className={`w-full md:w-5/12 ${idx % 2 === 0 ? 'md:mr-auto md:pr-16' : 'md:ml-auto md:pl-16'} relative`}
                    layout
                    transition={{ 
                      type: "spring",
                      stiffness: 300,
                      damping: 30
                    }}
                    onMouseEnter={() => handlePlaneHover(plane.name)}
                    onMouseLeave={handlePlaneLeave}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      console.log("Clicked:", plane.name);

                      setActivePlane(prev =>
                        prev == plane.name ? null : plane.name
                      );
                      setHoveredPlane(plane.name);
                    }}
                  >
                    <GlassCard 
                      accent="cyan" 
                      className="cursor-pointer overflow-hidden card-container"
                    >
                      <AnimatePresence mode="wait">
                        {isExpanded ? (
                          // EXPANDED STATE - Full Details
                          <motion.div
                            key="expanded"
                            ref={activeCardRef}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="card-container"
                          >
                            {/* Image at Top */}
                            <div className="w-full h-64 md:h-80 bg-slate-800/50 rounded-lg overflow-hidden mb-6 relative group">
                              <motion.img 
                                src={plane.media?.image} 
                                alt={plane.name} 
                                className="w-full h-full object-cover"
                                initial={{ scale: 1.1 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.5 }}
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.parentElement.innerHTML = `
                                    <div class="w-full h-full flex items-center justify-center bg-slate-800/50">
                                      <div class="text-center">
                                        <div class="text-slate-600 mb-4 text-7xl">✈️</div>
                                        <p class="text-slate-400 font-semibold">${plane.name}</p>
                                      </div>
                                    </div>`;
                                }} 
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
                              <div className="absolute top-4 right-4">
                                <motion.div
                                  animate={{ rotate: 90 }}
                                  transition={{ duration: 0.3 }}
                                  className="w-10 h-10 rounded-full bg-cyan-400/20 backdrop-blur-sm flex items-center justify-center border border-cyan-400/50"
                                >
                                  <ChevronRight className="w-5 h-5 text-cyan-400" />
                                </motion.div>
                              </div>
                            </div>

                            {/* Details Below */}
                            <div>
                              <div className="mb-6">
                                <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">{plane.name}</h3>
                                <div className="flex items-center space-x-4">
                                  <span className="text-cyan-400 font-mono font-bold text-lg">{plane.year}</span>
                                  <span className="text-slate-500">•</span>
                                  <span className="text-purple-400 font-semibold text-lg">{plane.role}</span>
                                </div>
                              </div>
                              
                              <p className="text-slate-300 mb-8 leading-relaxed text-lg">{plane.description}</p>
                              
                              {plane.specs && (
                                <div className="mb-8">
                                  <h4 className="text-xl font-bold text-white mb-4 flex items-center">
                                    <span className="w-1.5 h-6 bg-gradient-to-b from-cyan-400 to-blue-500 mr-3 rounded-full" />
                                    Technical Specifications
                                  </h4>
                                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {Object.entries(plane.specs).map(([key, value]) => (
                                      <motion.div 
                                        key={key} 
                                        className="bg-gradient-to-br from-slate-800/80 to-slate-800/40 rounded-xl p-4 border border-slate-700/50 hover:border-cyan-400/50 transition-all duration-300 group"
                                        whileHover={{ y: -4, scale: 1.02 }}
                                        transition={{ duration: 0.2 }}
                                      >
                                        <div className="text-slate-400 text-xs uppercase tracking-wider mb-2 group-hover:text-cyan-400 transition-colors">
                                          {key.replace(/_/g, ' ')}
                                        </div>
                                        <div className="text-white font-mono font-bold text-lg">{value}</div>
                                      </motion.div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {plane.features && (
                                <div>
                                  <h4 className="text-xl font-bold text-white mb-4 flex items-center">
                                    <span className="w-1.5 h-6 bg-gradient-to-b from-purple-400 to-pink-500 mr-3 rounded-full" />
                                    Key Features
                                  </h4>
                                  <div className="flex flex-wrap gap-3">
                                    {plane.features.map((feature, i) => (
                                      <motion.span 
                                        key={i} 
                                        className="px-4 py-2 bg-gradient-to-r from-cyan-400/10 to-purple-400/10 border border-cyan-400/40 rounded-full text-cyan-300 text-sm font-medium hover:bg-cyan-400/20 hover:border-cyan-400/60 transition-all duration-300"
                                        whileHover={{ scale: 1.08, y: -2 }}
                                        transition={{ duration: 0.2 }}
                                      >
                                        {feature}
                                      </motion.span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        ) : isHovered ? (
                          // HOVER STATE - Image Preview Only
                          <motion.div
                            key="hovered"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="card-container"
                          >
                            <div className="w-full h-56 bg-slate-800/50 rounded-lg overflow-hidden mb-4 relative group">
                              <motion.img 
                                src={plane.media?.image} 
                                alt={plane.name} 
                                className="w-full h-full object-cover"
                                initial={{ scale: 1 }}
                                animate={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.parentElement.innerHTML = `
                                    <div class="w-full h-full flex items-center justify-center bg-slate-800/50">
                                      <div class="text-center">
                                        <div class="text-slate-600 mb-2 text-6xl">✈️</div>
                                      </div>
                                    </div>`;
                                }} 
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />
                              <div className="absolute bottom-4 left-4 right-4">
                                <h3 className="text-2xl font-bold text-white mb-1">{plane.name}</h3>
                                <p className="text-cyan-400 font-mono text-sm">{plane.year} • {plane.role}</p>
                              </div>
                            </div>
                            <div className="text-center">
                              <motion.span 
                                className="text-cyan-400 text-sm font-medium inline-flex items-center"
                                animate={{ y: [0, -3, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              >
                                Click to view details
                                <ChevronRight className="w-4 h-4 ml-1" />
                              </motion.span>
                            </div>
                          </motion.div>
                        ) : (
                          // COLLAPSED STATE - Minimal
                          <motion.div
                            key="collapsed"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex justify-between items-center py-2 card-container"
                          >
                            <div className="flex-1">
                              <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{plane.name}</h3>
                              <div className="flex items-center space-x-3">
                                <span className="md:hidden text-cyan-400 font-mono font-semibold">{plane.year}</span>
                                <span className="text-purple-400 font-medium">{plane.role}</span>
                              </div>
                            </div>
                            <motion.div
                              whileHover={{ x: 5 }}
                              transition={{ duration: 0.2 }}
                              className="flex items-center space-x-2"
                            >
                              <span className="text-slate-500 text-sm hidden md:inline">Hover or click</span>
                              <ChevronRight className="w-6 h-6 text-slate-500" />
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </GlassCard>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== SUBSYSTEMS PAGE ====================
const SubsystemsPage = ({ setCurrentPage, setActiveTeamSubsystem }) => {
  const [activeTab, setActiveTab] = useState(null);
  const [expandedSection, setExpandedSection] = useState(null);
  const subsystems = organizationData.subsystems_detailed;

  const tabColors = {
    software: 'cyan',
    aerodynamics: 'purple',
    avionics: 'orange',
    business: 'emerald'
  };

  const active = activeTab ? subsystems[activeTab] : null;

  const handleViewTeam = (subsystemId) => {
    setActiveTeamSubsystem(subsystemId);
    setCurrentPage('team');
  };

  return (
    <div className="min-h-screen pt-24 pb-16 relative">
      <ParticleGrid />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">SUBSYSTEMS</h1>
          <p className="text-lg md:text-xl text-cyan-400">Technical Divisions & Specializations</p>
        </motion.div>

        {!activeTab ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.keys(subsystems).map((key, idx) => {
              const system = subsystems[key];
              const accent = tabColors[key];
              const colors = colorClasses[accent];
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => setActiveTab(key)}
                  className="cursor-pointer group"
                >
                  <GlassCard accent={accent} className="h-full hover:scale-105 transition-transform">
                    <div className="text-center p-6">
                      <div className={`w-20 h-20 mx-auto mb-4 ${colors.bg} rounded-full flex items-center justify-center`}>
                        {key === 'software' && <Zap className={`w-10 h-10 ${colors.icon}`} />}
                        {key === 'aerodynamics' && <Rocket className={`w-10 h-10 ${colors.icon}`} />}
                        {key === 'avionics' && <Target className={`w-10 h-10 ${colors.icon}`} />}
                        {key === 'business' && <Trophy className={`w-10 h-10 ${colors.icon}`} />}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3">{system.title}</h3>
                      {system.tagline && <p className={`${colors.text} mb-4`}>{system.tagline}</p>}
                      <p className="text-slate-300 text-sm">{system.description}</p>
                      <div className="mt-6">
                        <span className={`inline-flex items-center px-4 py-2 ${colors.bg} border ${colors.border} ${colors.text} rounded-lg font-semibold group-hover:scale-110 transition-transform`}>
                          Explore <ChevronRight className="w-4 h-4 ml-2" />
                        </span>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div>
            <div className="flex flex-wrap gap-2 mb-8">
              <button
                onClick={() => setActiveTab(null)}
                className="px-4 py-2 bg-slate-800/50 text-slate-400 hover:bg-slate-800 rounded-lg transition-all flex items-center"
              >
                <ChevronRight className="w-4 h-4 mr-1 rotate-180" />
                Back
              </button>
              {Object.keys(subsystems).map((key) => {
                const accent = tabColors[key];
                const colors = colorClasses[accent];
                return (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`px-6 py-3 rounded-lg font-semibold capitalize transition-all ${
                      activeTab === key
                        ? `${colors.bg} ${colors.text} border ${colors.border}`
                        : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    {subsystems[key].title}
                  </button>
                );
              })}
            </div>

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <GlassCard accent={tabColors[activeTab]} className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{active.title}</h2>
                {active.tagline && <p className={`${colorClasses[tabColors[activeTab]].text} text-xl mb-4`}>{active.tagline}</p>}
                <p className="text-slate-300 leading-relaxed mb-4">{active.description}</p>
                {active.focus && (
                  <div className={`${colorClasses[tabColors[activeTab]].bg} border ${colorClasses[tabColors[activeTab]].border} rounded-lg p-4`}>
                    <p className="text-white"><strong>Focus:</strong> {active.focus}</p>
                  </div>
                )}
              </GlassCard>

              {/* Software Content */}
              {activeTab === 'software' && active.repositories && (
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6">GitHub Repositories</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {active.repositories.map((repo, idx) => (
                      <motion.a
                        key={idx}
                        href={repo.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <GlassCard accent="cyan" className="h-full hover:scale-105 transition-transform">
                          <div className="flex items-start justify-between mb-3">
                            <Github className="w-8 h-8 text-cyan-400" />
                            <ExternalLink className="w-4 h-4 text-slate-400" />
                          </div>
                          <h4 className="text-lg font-bold text-white mb-2">{repo.name}</h4>
                          <p className="text-slate-300 text-sm mb-4">{repo.desc}</p>
                          <div className="flex flex-wrap gap-2">
                            {repo.tags.map((tag, i) => (
                              <span key={i} className="px-2 py-1 bg-cyan-400/10 border border-cyan-400/30 rounded text-cyan-400 text-xs">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </GlassCard>
                      </motion.a>
                    ))}
                  </div>

                  {active.workstreams && (
                    <GlassCard accent="cyan">
                      <h3 className="text-xl font-bold text-white mb-4">Current Workstreams</h3>
                      <div className="space-y-2">
                        {active.workstreams.map((stream, idx) => (
                          <div key={idx} className="flex items-start">
                            <ChevronRight className="w-5 h-5 text-cyan-400 mr-2 mt=0.5 flex-shrink-0" />
                            <span className="text-slate-300">{stream}</span>
                          </div>
                        ))}
                      </div>
                    </GlassCard>
                  )}
                </div>
              )}

              {/* Aerodynamics Content */}
              {activeTab === 'aerodynamics' && active.technical_sections && (
                <div className="space-y-4 mb-8">
                  <h3 className="text-2xl font-bold text-white mb-6">Technical Research</h3>
                  {active.technical_sections.map((section, idx) => (
                    <GlassCard
                      key={idx}
                      accent="purple"
                      className="cursor-pointer"
                      onClick={() => setExpandedSection(expandedSection === idx ? null : idx)}
                    >
                      <div className="flex justify-between items-center">
                        <h4 className="text-lg font-bold text-white">{section.title}</h4>
                        <motion.div
                          animate={{ rotate: expandedSection === idx ? 90 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronRight className="w-6 h-6 text-purple-400" />
                        </motion.div>
                      </div>
                      <AnimatePresence>
                        {expandedSection === idx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="mt-4 pt-4 border-t border-purple-400/20"
                          >
                            <p className="text-slate-300">{section.content}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </GlassCard>
                  ))}
                  {active.documentation_link && (
                    <a href={active.documentation_link} target="_blank" rel="noopener noreferrer" className="block">
                      <GlassCard accent="purple" className="hover:scale-105 transition-transform">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-lg font-bold text-white mb-1">Full Documentation</h4>
                            <p className="text-slate-400 text-sm">Access complete technical documentation</p>
                          </div>
                          <ExternalLink className="w-6 h-6 text-purple-400" />
                        </div>
                      </GlassCard>
                    </a>
                  )}
                </div>
              )}

              {/* Avionics Content */}
              {activeTab === 'avionics' && active.work_areas && (
                <div className="space-y-6 mb-8">
                  <h3 className="text-2xl font-bold text-white mb-6">Core Work Areas</h3>

                  {active.work_areas.map((area, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.08 }}
                    >
                      <GlassCard accent="orange">
                        <div className="flex items-start space-x-4">
                          <Target className="w-8 h-8 text-orange-400 flex-shrink-0" />
                          <div>
                            <h4 className="text-xl font-bold text-white mb-2">
                              {area.title}
                            </h4>
                            <p className="text-slate-300 leading-relaxed">
                              {area.desc}
                            </p>
                          </div>
                        </div>
                      </GlassCard>
                    </motion.div>
                  ))}

                  {active.notion_link && (
                    <a
                      href={active.notion_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <GlassCard accent="orange" className="hover:scale-105 transition-transform">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-lg font-bold text-white mb-1">
                              Avionics Documentation
                            </h4>
                            <p className="text-slate-400 text-sm">
                              Detailed system architecture, testing logs, and design notes
                            </p>
                          </div>
                          <ExternalLink className="w-6 h-6 text-orange-400" />
                        </div>
                      </GlassCard>
                    </a>
                  )}
                </div>
              )}

              {/* Business Content */}
              {activeTab === 'business' && active.key_focus && (
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6">Key Focus Areas</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {active.key_focus.map((focus, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <GlassCard accent="emerald" className="h-full">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-emerald-400/20 rounded-lg flex items-center justify-center flex-shrink-0">
                              <span className="text-emerald-400 font-bold">{idx + 1}</span>
                            </div>
                            <h4 className="text-lg font-bold text-white">{focus}</h4>
                          </div>
                        </GlassCard>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              <GlassCard accent={tabColors[activeTab]} className="text-center">
                <h3 className="text-xl font-bold text-white mb-4">Meet the {active.title} Team</h3>
                <p className="text-slate-300 mb-6">Discover the talented individuals driving innovation in this division</p>
                <button
                  onClick={() => handleViewTeam(activeTab)}
                  className={`px-6 py-3 ${colorClasses[tabColors[activeTab]].bg} border ${colorClasses[tabColors[activeTab]].border} ${colorClasses[tabColors[activeTab]].text} rounded-lg font-semibold hover:scale-105 transition-transform`}
                >
                  View Team Members
                </button>
              </GlassCard>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

// ==================== COMPETITIONS PAGE ====================
const CompetitionsPage = () => {
  const competitions = organizationData.competitions_and_projects;

  const statusStyles = {
    'Active': { bg: 'bg-green-400/20', border: 'border-green-400', text: 'text-green-400', icon: CircleDot },
    'Targeted': { bg: 'bg-blue-400/20', border: 'border-blue-400', text: 'text-blue-400', icon: Circle },
    'Past': { bg: 'bg-slate-600/20', border: 'border-slate-600', text: 'text-slate-400', icon: Archive }
  };

  const getStatusBadge = (status) => {
    const style = statusStyles[status] || statusStyles['Targeted'];
    const Icon = style.icon;
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${style.bg} ${style.border} ${style.text} border`}>
        <Icon className="w-3 h-3 mr-1" />
        {status || 'Targeted'}
      </span>
    );
  };

  const isProject = (item) => !item.status;

  return (
    <div className="min-h-screen pt-24 pb-16 relative">
      <ParticleGrid />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">MISSION LOG</h1>
          <p className="text-lg md:text-xl text-cyan-400">Competitions & Research Projects</p>
        </motion.div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <div className="flex items-center space-x-2">
            <CircleDot className="w-5 h-5 text-green-400" />
            <span className="text-slate-300 text-sm">Active - Currently participating</span>
          </div>
          <div className="flex items-center space-x-2">
            <Circle className="w-5 h-5 text-blue-400" />
            <span className="text-slate-300 text-sm">Targeted - Future competitions</span>
          </div>
          <div className="flex items-center space-x-2">
            <Archive className="w-5 h-5 text-slate-400" />
            <span className="text-slate-300 text-sm">Past - Completed events</span>
          </div>
          <div className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-purple-400" />
            <span className="text-slate-300 text-sm">Research Projects</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {competitions.map((item, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
              <GlassCard accent={isProject(item) ? 'purple' : 'cyan'} className={`h-full ${isProject(item) ? 'border-dashed' : ''}`}>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white pr-2">{item.title}</h3>
                  {item.status ? getStatusBadge(item.status) : <Target className="w-6 h-6 text-purple-400 flex-shrink-0" />}
                </div>

                <p className="text-slate-300 text-sm leading-relaxed mb-4">{item.description}</p>

                {item.highlights && (
                  <div className="space-y-2 pt-4 border-t border-slate-700">
                    {item.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-start">
                        <ChevronRight className="w-4 h-4 text-purple-400 mr-2 mt=0.5 flex-shrink-0" />
                        <span className="text-slate-400 text-sm">{highlight}</span>
                      </div>
                    ))}
                  </div>
                )}
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ==================== TEAM PAGE ====================
const MemberCard = ({ member, accent = 'cyan' }) => {
  return (
    <GlassCard accent={accent} className="text-center h-full">
      <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full overflow-hidden">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center"><svg class="w-10 h-10 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg></div>`;
          }}
        />
      </div>
      <h4 className="text-base font-bold text-white mb-1">{member.name}</h4>
      <p className="text-slate-400 text-xs mb-1">{member.department}</p>
      <p className="text-slate-500 text-xs mb-3">{member.year}</p>
      <div className="flex justify-center space-x-3">
        {member.github && (
          <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition">
            <Github className="w-4 h-4" />
          </a>
        )}
        {member.linkedin && (
          <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition">
            <Linkedin className="w-4 h-4" />
          </a>
        )}
        {member.instagram && (
          <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition">
            <Instagram className="w-4 h-4" />
          </a>
        )}
      </div>
    </GlassCard>
  );
};

const TeamPage = ({ activeTeamSubsystem }) => {
  const [activeSubsystem, setActiveSubsystem] = useState(activeTeamSubsystem);
  const subsystemTeamsRef = useRef(null);
  
  const faculty = organizationData.team_structure.faculty_advisors;
  const teamLeads = teamMembersData.team_leads;
  const subsystemTeams = teamMembersData.subsystem_teams;

  const subsystemColors = {
    software: 'cyan',
    aerodynamics: 'purple',
    avionics: 'orange',
    business: 'emerald'
  };

  useEffect(() => {
    if (activeTeamSubsystem) {
      setActiveSubsystem(activeTeamSubsystem);
      // Scroll to subsystem teams section after a small delay
      setTimeout(() => {
        if (subsystemTeamsRef.current) {
          subsystemTeamsRef.current.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    }
  }, [activeTeamSubsystem]);

  return (
    <div className="min-h-screen pt-24 pb-16 relative">
      <ParticleGrid />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">COMMAND DECK</h1>
          <p className="text-lg md:text-xl text-cyan-400">Meet Our Team</p>
        </motion.div>

        {/* Faculty Advisors */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 flex items-center">
            <Award className="w-8 h-8 text-yellow-400 mr-3" />
            Faculty Advisors
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faculty.map((advisor, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <GlassCard className="border-yellow-400/30 h-full">
                  <div className="flex items-start space-x-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src={advisor.image}
                        alt={advisor.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center"><svg class="w-10 h-10 text-yellow-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg></div>`;
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg md:text-xl font-bold text-white mb-1">{advisor.name}</h3>
                      <p className="text-yellow-400 text-sm mb-3">{advisor.role}</p>
                      <p className="text-slate-300 text-sm mb-4">{advisor.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {advisor.expertise.map((exp, i) => (
                          <span key={i} className="px-2 py-1 bg-yellow-400/10 border border-yellow-400/30 rounded text-yellow-400 text-xs">
                            {exp}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team Leads */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 flex items-center">
            <Trophy className="w-8 h-8 text-cyan-400 mr-3" />
            Team Leadership
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teamLeads.map((lead, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <GlassCard accent="cyan">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-cyan-600 to-blue-700 rounded-full overflow-hidden">
                      <img
                        src={lead.image}
                        alt={lead.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center"><svg class="w-16 h-16 text-cyan-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg></div>`;
                        }}
                      />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{lead.name}</h3>
                    <p className="text-cyan-400 font-semibold mb-2">{lead.role}</p>
                    <p className="text-slate-400 text-sm mb-2">{lead.department}</p>
                    <p className="text-slate-500 text-xs mb-4">{lead.year}</p>
                    <div className="flex justify-center space-x-4">
                      <a href={lead.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition">
                        <Github className="w-5 h-5" />
                      </a>
                      <a href={lead.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition">
                        <Linkedin className="w-5 h-5" />
                      </a>
                      <a href={lead.instagram} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition">
                        <Instagram className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Subsystem Teams */}
        <div ref={subsystemTeamsRef}>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 flex items-center">
            <Rocket className="w-8 h-8 text-purple-400 mr-3" />
            Subsystem Teams
          </h2>

          {!activeSubsystem ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.keys(subsystemTeams).map((key, idx) => {
                const accent = subsystemColors[key];
                const colors = colorClasses[accent];
                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => setActiveSubsystem(key)}
                    className="cursor-pointer group"
                  >
                    <GlassCard accent={accent} className="h-full hover:scale-105 transition-transform text-center">
                      <div className={`w-16 h-16 mx-auto mb-4 ${colors.bg} rounded-full flex items-center justify-center`}>
                        {key === 'software' && <Zap className={`w-8 h-8 ${colors.icon}`} />}
                        {key === 'aerodynamics' && <Rocket className={`w-8 h-8 ${colors.icon}`} />}
                        {key === 'avionics' && <Target className={`w-8 h-8 ${colors.icon}`} />}
                        {key === 'business' && <Trophy className={`w-8 h-8 ${colors.icon}`} />}
                      </div>
                      <h3 className="text-xl font-bold text-white capitalize mb-2">{key}</h3>
                      <p className="text-slate-400 text-sm mb-4">
                        {subsystemTeams[key].senior_members.length + subsystemTeams[key].junior_members.length + 1} members
                      </p>
                      <span className={`inline-flex items-center px-4 py-2 ${colors.bg} border ${colors.border} ${colors.text} rounded-lg text-sm font-semibold group-hover:scale-110 transition-transform`}>
                        View Team <ChevronRight className="w-4 h-4 ml-1" />
                      </span>
                    </GlassCard>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div>
              <div className="flex flex-wrap gap-2 mb-8">
                <button
                  onClick={() => setActiveSubsystem(null)}
                  className="px-4 py-2 bg-slate-800/50 text-slate-400 hover:bg-slate-800 rounded-lg transition-all flex items-center"
                >
                  <ChevronRight className="w-4 h-4 mr-1 rotate-180" />
                  Back to All Teams
                </button>
                {Object.keys(subsystemTeams).map((key) => {
                  const accent = subsystemColors[key];
                  const colors = colorClasses[accent];
                  return (
                    <button
                      key={key}
                      onClick={() => setActiveSubsystem(key)}
                      className={`px-6 py-3 rounded-lg font-semibold capitalize transition-all ${
                        activeSubsystem === key
                          ? `${colors.bg} ${colors.text} border ${colors.border}`
                          : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800'
                      }`}
                    >
                      {key}
                    </button>
                  );
                })}
              </div>

              <motion.div
                key={activeSubsystem}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-4">Subsystem Lead</h3>
                  <div className="max-w-xs">
                    <MemberCard member={subsystemTeams[activeSubsystem].lead} accent={subsystemColors[activeSubsystem]} />
                  </div>
                </div>

                {subsystemTeams[activeSubsystem].senior_members.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-white mb-4">Senior Members</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                      {subsystemTeams[activeSubsystem].senior_members.map((member, idx) => (
                        <MemberCard key={idx} member={member} accent={subsystemColors[activeSubsystem]} />
                      ))}
                    </div>
                  </div>
                )}

                {subsystemTeams[activeSubsystem].junior_members.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Junior Members</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                      {subsystemTeams[activeSubsystem].junior_members.map((member, idx) => (
                        <MemberCard key={idx} member={member} accent={subsystemColors[activeSubsystem]} />
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ==================== CONTACT PAGE ====================
const ContactPage = () => {
  const contact = organizationData.organization_profile.contact;
  const socials = organizationData.organization_profile.social_links;
  const profile = organizationData.organization_profile;

  const socialIcons = {
    instagram: Instagram,
    facebook: Facebook,
    linkedin: Linkedin,
    youtube: Youtube,
    github_main: Github,
    github_software: Github
  };

  return (
    <div className="min-h-screen pt-24 pb-16 relative">
      <ParticleGrid />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">COMMS ARRAY</h1>
          <p className="text-lg md:text-xl text-cyan-400">Get In Touch</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Contact Details */}
          <GlassCard accent="cyan">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Mail className="w-6 h-6 text-cyan-400 mr-3" />
              Direct Contact
            </h3>
            <div className="space-y-6">
              <div>
                <div className="flex items-center text-cyan-400 mb-2">
                  <Mail className="w-5 h-5 mr-2" />
                  <span className="font-semibold">Email</span>
                </div>
                {contact.emails.map((email, idx) => (
                  <a
                    key={idx}
                    href={`mailto:${email}`}
                    className="text-slate-300 hover:text-cyan-400 transition block text-sm md:text-base"
                  >
                    {email}
                  </a>
                ))}
              </div>

              <div>
                <div className="flex items-center text-cyan-400 mb-2">
                  <Phone className="w-5 h-5 mr-2" />
                  <span className="font-semibold">Phone</span>
                </div>
                <a href={`tel:${contact.phone}`} className="text-slate-300 hover:text-cyan-400 transition text-sm md:text-base">
                  {contact.phone}
                </a>
              </div>

              <div>
                <div className="flex items-center text-cyan-400 mb-2">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span className="font-semibold">Location</span>
                </div>
                <p className="text-slate-300 text-sm md:text-base">{contact.location}</p>
                <p className="text-slate-400 text-xs md:text-sm mt-1">{organizationData.organization_profile.address}</p>
              </div>
            </div>
          </GlassCard>

          {/* Social Links */}
          <GlassCard accent="purple">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Zap className="w-6 h-6 text-purple-400 mr-3" />
              Connect With Us
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(socials).map(([key, url]) => {
                const Icon = socialIcons[key];
                const label = key.replace(/_/g, ' ').replace(/^./, (str) => str.toUpperCase());
                return (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-4 bg-slate-800/50 rounded-lg hover:bg-purple-400/10 border border-transparent hover:border-purple-400/30 transition group"
                  >
                    <Icon className="w-6 h-6 text-slate-400 group-hover:text-purple-400 transition flex-shrink-0" />
                    <span className="text-slate-300 text-sm group-hover:text-purple-400 transition capitalize truncate">
                      {label}
                    </span>
                  </a>
                );
              })}
            </div>

            <div className="mt-8 p-6 bg-slate-800/50 rounded-lg border border-emerald-400/20">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-2">IIT Bombay Campus</h4>
                <p className="text-slate-400 text-sm">Powai, Mumbai, Maharashtra</p>
                <p className="text-slate-500 text-xs mt-1">India - 400076</p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

// ==================== FOOTER (FIXED LAYOUT) ====================
const Footer = ({ setCurrentPage }) => {
  const profile = organizationData.organization_profile;
  const socials = profile.social_links;

  const sitemap = [
    { id: 'home', label: 'Home' },
    { id: 'fleet', label: 'Hangar' },
    { id: 'subsystems', label: 'Subsystems' },
    { id: 'competitions', label: 'Mission Log' },
    { id: 'team', label: 'Command Deck' },
    { id: 'contact', label: 'Comms Array' }
  ];

  const socialIcons = {
    instagram: Instagram,
    facebook: Facebook,
    linkedin: Linkedin,
    youtube: Youtube,
    github_main: Github,
    github_software: Github
  };

  return (
    <footer className="bg-slate-950 border-t border-cyan-400/20 mt-16 relative">
      <ParticleGrid />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-4 cursor-pointer" onClick={() => setCurrentPage('home')}>
              <img 
                src="images/logo.png" 
                alt="Rakshak" 
                className="h-10 w-auto object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }} 
              />
              <div className="h-10 w-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg items-center justify-center hidden">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">TEAM RAKSHAK</h3>
                <p className="text-xs text-cyan-400">IIT BOMBAY</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Engineering the future of autonomous aerial systems for disaster relief and aerospace innovation.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 flex items-center">
              <ChevronRight className="w-4 h-4 text-cyan-400 mr-1" />
              Navigation
            </h4>
            <ul className="space-y-2">
              {sitemap.map((link) => (
                <li key={link.id}>
                  <button onClick={() => setCurrentPage(link.id)} className="text-slate-400 hover:text-cyan-400 transition text-sm">
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 flex items-center">
              <ChevronRight className="w-4 h-4 text-cyan-400 mr-1" />
              Contact
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <Mail className="w-4 h-4 text-cyan-400 mr-2 mt=0.5 flex-shrink-0" />
                <a href={`mailto:${profile.contact.emails[0]}`} className="text-slate-400 hover:text-cyan-400 transition break-all">
                  {profile.contact.emails[0]}
                </a>
              </li>
              <li className="flex items-start">
                <Phone className="w-4 h-4 text-cyan-400 mr-2 mt=0.5 flex-shrink-0" />
                <a href={`tel:${profile.contact.phone}`} className="text-slate-400 hover:text-cyan-400 transition">
                  {profile.contact.phone}
                </a>
              </li>
              <li className="flex items-start">
                <MapPin className="w-4 h-4 text-cyan-400 mr-2 mt=0.5 flex-shrink-0" />
                <span className="text-slate-400">{profile.department}, IIT Bombay</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 flex items-center">
              <ChevronRight className="w-4 h-4 text-cyan-400 mr-1" />
              Connect
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {Object.entries(socials).map(([key, url]) => {
                const Icon = socialIcons[key];
                return (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full aspect-square bg-slate-800/50 rounded-lg flex items-center justify-center hover:bg-cyan-400/20 border border-transparent hover:border-cyan-400/30 transition group"
                    title={key.replace(/_/g, ' ')}
                  >
                    <Icon className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Team Rakshak, IIT Bombay. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 md:space-x-6 text-sm flex-wrap justify-center">
            <span className="text-slate-500">Established {profile.established}</span>
            <span className="text-cyan-400">•</span>
            <span className="text-slate-500">{profile.institution}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// ==================== MAIN APP ====================
export default function RakshakWebsite() {
  const [currentPage, setCurrentPage] = useState('home');
  const [activeTeamSubsystem, setActiveTeamSubsystem] = useState(null);

  useEffect(() => {
    // Only scroll to top if we're not coming from a subsystem redirect
    if (!activeTeamSubsystem || currentPage !== 'team') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentPage, activeTeamSubsystem]);

  useEffect(() => {
    // Clear active team subsystem when leaving team page
    if (currentPage !== 'team') {
      setActiveTeamSubsystem(null);
    }
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />;
      case 'fleet':
        return <FleetPage />;
      case 'subsystems':
        return <SubsystemsPage setCurrentPage={setCurrentPage} setActiveTeamSubsystem={setActiveTeamSubsystem} />;
      case 'competitions':
        return <CompetitionsPage />;
      case 'team':
        return <TeamPage activeTeamSubsystem={activeTeamSubsystem} />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Orbitron:wght@400;500;600;700;800;900&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Inter', sans-serif;
          overflow-x: hidden;
        }
        
        h1, h2, h3, h4, h5, h6 {
          font-family: 'Orbitron', monospace;
        }
        
        ::-webkit-scrollbar {
          width: 10px;
        }
        
        ::-webkit-scrollbar-track {
          background: #0f172a;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #00f0ff, #a855f7);
          border-radius: 5px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #00d4ff, #9333ea);
        }
      `}</style>

      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <main>
        {renderPage()}
      </main>
      
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}