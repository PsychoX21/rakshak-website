import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, ChevronRight, Github, Linkedin, Instagram, Facebook, Youtube, Mail, Phone, MapPin,
  Award, Rocket, Users, Calendar, Zap, Target, Trophy, ExternalLink, Play
} from 'lucide-react';

// ==================== DATA FILES ====================
// (unchanged organization and teamMembers data)
const organizationData = {
  "organization_profile": {
    "name": "Team Rakshak",
    "logo": "/images/rakshak_logo.gif",
    "image": "/images/team_24-25.jpg",
    "institution": "IIT Bombay",
    "department": "Department of Aerospace Engineering",
    "address": "Main Gate Rd, IIT Area, Powai, Mumbai, Maharashtra 400076, India",
    "established": "2015",
    "contact": {
      "emails": ["rakshak.uavs@gmail.com"],
      "phone": "+91 9175944952",
      "location": "Aerospace Engineering Department, Main Building, IIT Bombay"
    },
    "social_links": {
      "instagram": "https://www.instagram.com/rakshakiitb/",
      "facebook": "https://www.facebook.com/TeamRakshak",
      "linkedin": "https://www.linkedin.com/company/rakshak-iit-bombay/",
      "youtube": "https://www.youtube.com/channel/UCASKCQSdHLXSwWB79vuLJ-A/featured",
      "github_main": "https://github.com/rakshakiitb",
      "github_software": "https://github.com/rakshaksoftware"
    },
    "mission_statement": "Team Rakshak is a student UAV team at IIT Bombay dedicated to engineering drones for disaster relief and aerospace innovation. We develop robust Unmanned Aerial Vehicles (UAVs) to support Search and Rescue Operations (SRO) in disaster-stricken areas, surveys, mapping, and wildlife conservation.",
    "taglines": [
      "Engineering the future, one UAV at a time",
      "Masters of the Skies",
      "Next Beyond Limits Together",
      "Innovating for a Safer Tomorrow"
    ]
  },
  "team_structure": {
    "faculty_advisors": [
      {
        "name": "Prof. Rohit Vishwajit Nanavati",
        "role": "Faculty Advisor",
        "image": "/images/facad/facad-rohit-nanavat.jpg",
        "description": "Guiding the team with expertise and experience in aerospace engineering.",
        "expertise": ["Aerospace Engineering", "Research Guidance", "Technical Mentorship"]
      },
      {
        "name": "Prof. Dwaipayan Mukherjee",
        "role": "Technical Advisor",
        "image": "/images/facad/facad-dwaipayan-mukherjee.png",
        "description": "Providing technical guidance and industry insights.",
        "expertise": ["Control Systems", "Flight Mechanics", "System Integration"]
      }
    ]
  },
  "fleet_specifications": [
    {
      "name": "Ares",
      "year": "2024",
      "role": "Flagship Autonomous UAV",
      "competition": "UAS Challenge 2024",
      "description": "High-performance UAV built for the UAS Challenge 2024. Features carbon fiber body, EPP wings for water resistance, and modular tool-free assembly in under 2 minutes.",
      "specs": {
        "wingspan": "2.2 m",
        "weight": "5 kg",
        "max_payload": "8 kg",
        "cruise_speed": "14 m/s",
        "endurance": "35 minutes",
        "takeoff_dist": "< 10 meters"
      },
      "features": ["Autonomous takeoff/landing", "Waypoint navigation", "Payload drop", "Water-resistant EPP wings"],
      "media": { "image": "/images/planes/ares.jpg", "promo_video": "/images/Ares UAV Promo.mp4" }
    },
    {
      "name": "Skywalker",
      "year": "2017",
      "role": "Long-range Surveillance",
      "competition": "AUVSI-SUAS",
      "description": "Designed for AUVSI-SUAS. Fully autonomous operation including object detection, classification, interoperability, and waypoint navigation.",
      "specs": { "gross_weight": "7.5 kg", "cruise_speed": "12 m/s", "endurance": "30-40 minutes", "range": "15 km" },
      "media": { "image": "/images/planes/skywalker.jpg" }
    },
    {
      "name": "Sandy 2.0",
      "year": "2021",
      "role": "Twin-Motor Test Bed",
      "description": "Twin-motor variant of Sandy. Highly stable with vertical loop capabilities. Used for testing image capture features.",
      "specs": { "gross_weight": "2.25 kg", "cruise_speed": "12 m/s" },
      "media": { "image": "/images/planes/sandy2.0.jpg" }
    },
    {
      "name": "Sandy",
      "year": "2020",
      "role": "Component Test Bed",
      "description": "Small plane for component testing. First test dummy for autonomous flying algorithms.",
      "media": { "image": "/images/planes/sandy.jpg" }
    },
    {
      "name": "Smokey",
      "year": "2015",
      "role": "Competition Plane",
      "description": "First plane in the team's history to feature ingrained autonomous systems.",
      "specs": { "gross_weight": "5 kg", "cruise_speed": "12 m/s" },
      "media": { "image": "/images/planes/smokey.jpg" }
    },
    {
      "name": "SAE Plane",
      "year": "2015",
      "role": "Heavy Lift",
      "description": "Represented the team in SAE-2015. 7th place in Design.",
      "specs": { "empty_weight": "4.5 kg", "payload_capacity": "2 kg" },
      "media": { "image": "/images/planes/sae-plane.jpg" }
    }
  ],
  "competitions_and_projects": [
    {
      "title": "Air Cargo Challenge",
      "description": "Inspired by the North American DBF competition. A design, build, and fly challenge for university students, organized biennially.",
      "status": "Targeted"
    },
    {
      "title": "AUVSI SUAS",
      "description": "Requires students to design a UAS capable of autonomous flight, navigation, and remote sensing via onboard payload sensors.",
      "status": "Targeted"
    },
    {
      "title": "Smart India Hackathon",
      "description": "A nationwide initiative providing students a platform to solve pressing problems, inculcating a culture of product innovation.",
      "status": "Targeted"
    },
    {
      "title": "UAS Challenge (IMechE)",
      "description": "Full design and build cycle of a 10kg UAS for specific autonomous mission objectives, culminating in a final fly-off event.",
      "status": "Targeted"
    },
    {
      "title": "Youth Conclave (INAE)",
      "description": "Engineering students prepare a complete report on a problem statement and arrive at a detailed case study and strategy.",
      "status": "Targeted"
    },
    {
      "title": "SAE Aero Design",
      "description": "Designing aircraft to lift maximum payload under strict constraints.",
      "highlights": ["Payload optimization", "Advanced aerodynamic design", "Precision manufacturing"]
    },
    {
      "title": "Aerospace Innovation",
      "description": "Pushing boundaries of conventional design through cutting-edge research.",
      "highlights": ["Sustainable aviation tech", "Advanced materials", "Next-gen propulsion"]
    }
  ],
  "subsystems_detailed": {
    "software": {
      "id": "software",
      "title": "Software & Intelligence",
      "tagline": "AI-Powered Autonomous Navigation",
      "description": "Building cutting-edge UAV systems using real-time vision, edge computing, and artificial intelligence.",
      "focus": "Vision-based autonomous navigation for GPS-denied environments with edge-AI optimization.",
      "workstreams": [
        "Optical-flow navigation (Python, OpenCV, ROS2)",
        "Model optimization for Jetson hardware (C++/CUDA/TensorRT)",
        "Sub-15ms inference targets",
        "Reinforcement learning-based control"
      ],
      "repositories": [
        {
          "name": "NIDAR 2025",
          "link": "https://github.com/rakshaksoftware/NIDAR-2025",
          "desc": "Project repository containing prototype code, experimental pipelines, and demonstration artifacts.",
          "tags": ["Project", "Demo", "Pipeline"]
        },
        {
          "name": "Research & Development",
          "link": "https://github.com/rakshaksoftware/Research-and-Development",
          "desc": "Primary R&D hub for drone-to-drone communication and advanced imaging.",
          "tags": ["Research", "Prototypes", "Innovation"]
        },
        {
          "name": "CUASC 2025 Code",
          "link": "https://github.com/rakshaksoftware/CUASC-2025-Code",
          "desc": "Competition-ready codebase featuring autonomy controllers and mission planning algorithms.",
          "tags": ["Competition", "Autonomy", "Control"]
        },
        {
          "name": "Lufthansa 2024 R&D",
          "link": "https://github.com/rakshaksoftware/Lufthansa-2024-RnD",
          "desc": "Collaborative research partnership materials including academic papers and notebooks.",
          "tags": ["Collaboration", "Research", "Publications"]
        },
        {
          "name": "Object Detection",
          "link": "https://github.com/rakshaksoftware/Object-Detection",
          "desc": "Complete pipeline with model training notebooks and visual demos optimized for edge deployment.",
          "tags": ["Detection", "Training", "Inference"]
        },
        {
          "name": "Jetson Nano",
          "link": "https://github.com/rakshaksoftware/jetson_nano",
          "desc": "Deployment guides for NVIDIA Jetson platforms achieving sub-15ms inference.",
          "tags": ["Edge AI", "Deployment", "Hardware"]
        }
      ]
    },
    "aerodynamics": {
      "id": "aerodynamics",
      "title": "Aerodynamics & Manufacturing",
      "tagline": "Precision Engineering & Material Science",
      "description": "Advanced research in airfoil optimization, composite manufacturing, and structural analysis.",
      "focus": "Comprehensive aerodynamic analysis using XFLR5, advanced composite material integration, and stability optimization.",
      "documentation_link": "https://docs.google.com/document/d/1ea3b8s76pqRg-qTsHp_CMFMldWKa0Wm9cOb4ZzirdIw/edit?usp=sharing",
      "technical_sections": [
        {
          "title": "Airfoil Selection",
          "content": "Selected NACA 4412 for wing (superior efficiency at low AoA) and NACA 0012 for tail (symmetric flow). Analyzed 6+ profiles including S1221 and E222 using XFLR5."
        },
        {
          "title": "Advanced Materials",
          "content": "Usage of Carbon Fiber prepreg (TENAX UMS), Structural foam cores (ROHACELL IG-F), and Hybrid 3D printed components (PLA/TPU). Focused on strength-to-weight optimization."
        },
        {
          "title": "Manufacturing",
          "content": "Autoclave curing at 120°C/4bar. Semi-monocoque fuselage with laser-cut aluminum ribs. Two-component epoxy bonding."
        },
        {
          "title": "Stability Analysis",
          "content": "Static margin calculation, downwash angle characterization, and CG optimization for stable flight envelopes."
        }
      ]
    },
    "avionics": {
      "id": "avionics",
      "title": "Avionics & Control",
      "tagline": "Custom Electronics & Autonomous Flight",
      "description": "Ground-up UAV development featuring custom airframes, electronics integration, and intelligent autonomous navigation.",
      "focus": "Vertical integration from airframe design to autonomous control systems, GPS-denied navigation, and heavy-lift capabilities.",
      "notion_link": "https://www.notion.so/invite/8c9ab16462b58a086b13b19a566e5d032c926936",
      "achievements": [
        {
          "title": "CUASC Championship Victory",
          "desc": "Secured 1st place with a fully custom quadcopter platform including proprietary power distribution and PID tuning."
        },
        {
          "title": "Fixed-Wing Evolution",
          "desc": "Iterative development improving aerodynamic efficiency and structural optimization."
        },
        {
          "title": "Heavy-Lift Platform",
          "desc": "Large-scale custom quadcopter engineered for substantial payload capacity beyond commercial standards."
        }
      ]
    },
    "business": {
      "id": "business",
      "title": "Business & Marketing",
      "description": "Handles non-technical work: sponsorships, publicity, accounts, logistics, social media, design & graphics.",
      "key_focus": [
        "Monetary association with sponsors",
        "Technical association with leading industries",
        "Design & Graphics",
        "Publicity & Social Media",
        "Accounts & Logistics"
      ]
    }
  }
};

const teamMembersData = {
  "team_leads": [
    {
      "name": "Arjun Sharma",
      "role": "Team Captain",
      "department": "Aerospace Engineering",
      "year": "Final Year",
      "image": "/images/team/placeholder-lead-1.jpg",
      "github": "https://github.com/arjunsharma",
      "linkedin": "https://linkedin.com/in/arjunsharma",
      "instagram": "https://instagram.com/arjunsharma"
    },
    {
      "name": "Priya Patel",
      "role": "Vice Captain",
      "department": "Mechanical Engineering",
      "year": "Final Year",
      "image": "/images/team/placeholder-lead-2.jpg",
      "github": "https://github.com/priyapatel",
      "linkedin": "https://linkedin.com/in/priyapatel",
      "instagram": "https://instagram.com/priyapatel"
    }
  ],
  "subsystem_teams": {
    "software": {
      "lead": {
        "name": "Rahul Verma",
        "department": "Computer Science",
        "year": "Third Year",
        "image": "/images/team/placeholder-soft-lead.jpg",
        "github": "https://github.com/rahulverma",
        "linkedin": "https://linkedin.com/in/rahulverma",
        "instagram": "https://instagram.com/rahulverma"
      },
      "senior_members": [
        {
          "name": "Sneha Iyer",
          "department": "Electrical Engineering",
          "year": "Third Year",
          "image": "/images/team/placeholder-soft-senior-1.jpg",
          "github": "https://github.com/snehaiyer",
          "linkedin": "https://linkedin.com/in/snehaiyer",
          "instagram": "https://instagram.com/snehaiyer"
        },
        {
          "name": "Vikram Singh",
          "department": "Computer Science",
          "year": "Third Year",
          "image": "/images/team/placeholder-soft-senior-2.jpg",
          "github": "https://github.com/vikramsingh",
          "linkedin": "https://linkedin.com/in/vikramsingh",
          "instagram": "https://instagram.com/vikramsingh"
        }
      ],
      "junior_members": [
        {
          "name": "Ananya Reddy",
          "department": "Computer Science",
          "year": "Second Year",
          "image": "/images/team/placeholder-soft-junior-1.jpg",
          "github": "https://github.com/ananyareddy",
          "linkedin": "https://linkedin.com/in/ananyareddy",
          "instagram": "https://instagram.com/ananyareddy"
        },
        {
          "name": "Karthik Menon",
          "department": "Electrical Engineering",
          "year": "Second Year",
          "image": "/images/team/placeholder-soft-junior-2.jpg",
          "github": "https://github.com/karthikmenon",
          "linkedin": "https://linkedin.com/in/karthikmenon",
          "instagram": "https://instagram.com/karthikmenon"
        },
        {
          "name": "Divya Nair",
          "department": "Computer Science",
          "year": "Second Year",
          "image": "/images/team/placeholder-soft-junior-3.jpg",
          "github": "https://github.com/divyanair",
          "linkedin": "https://linkedin.com/in/divyanair",
          "instagram": "https://instagram.com/divyanair"
        }
      ]
    },
    "aerodynamics": {
      "lead": {
        "name": "Aditya Kumar",
        "department": "Aerospace Engineering",
        "year": "Third Year",
        "image": "/images/team/placeholder-aero-lead.jpg",
        "github": "https://github.com/adityakumar",
        "linkedin": "https://linkedin.com/in/adityakumar",
        "instagram": "https://instagram.com/adityakumar"
      },
      "senior_members": [
        {
          "name": "Meera Desai",
          "department": "Mechanical Engineering",
          "year": "Third Year",
          "image": "/images/team/placeholder-aero-senior-1.jpg",
          "github": "https://github.com/meeradesai",
          "linkedin": "https://linkedin.com/in/meeradesai",
          "instagram": "https://instagram.com/meeradesai"
        }
      ],
      "junior_members": [
        {
          "name": "Rohan Joshi",
          "department": "Aerospace Engineering",
          "year": "Second Year",
          "image": "/images/team/placeholder-aero-junior-1.jpg",
          "github": "https://github.com/rohanjoshi",
          "linkedin": "https://linkedin.com/in/rohanjoshi",
          "instagram": "https://instagram.com/rohanjoshi"
        },
        {
          "name": "Ishita Banerjee",
          "department": "Mechanical Engineering",
          "year": "Second Year",
          "image": "/images/team/placeholder-aero-junior-2.jpg",
          "github": "https://github.com/ishitabanerjee",
          "linkedin": "https://linkedin.com/in/ishitabanerjee",
          "instagram": "https://instagram.com/ishitabanerjee"
        }
      ]
    },
    "avionics": {
      "lead": {
        "name": "Sanjay Gupta",
        "department": "Electrical Engineering",
        "year": "Third Year",
        "image": "/images/team/placeholder-avio-lead.jpg",
        "github": "https://github.com/sanjaygupta",
        "linkedin": "https://linkedin.com/in/sanjaygupta",
        "instagram": "https://instagram.com/sanjaygupta"
      },
      "senior_members": [
        {
          "name": "Kavya Murthy",
          "department": "Electronics Engineering",
          "year": "Third Year",
          "image": "/images/team/placeholder-avio-senior-1.jpg",
          "github": "https://github.com/kavyamurthy",
          "linkedin": "https://linkedin.com/in/kavyamurthy",
          "instagram": "https://instagram.com/kavyamurthy"
        }
      ],
      "junior_members": [
        {
          "name": "Akash Rao",
          "department": "Electrical Engineering",
          "year": "Second Year",
          "image": "/images/team/placeholder-avio-junior-1.jpg",
          "github": "https://github.com/akashrao",
          "linkedin": "https://linkedin.com/in/akashrao",
          "instagram": "https://instagram.com/akashrao"
        },
        {
          "name": "Pooja Shetty",
          "department": "Electronics Engineering",
          "year": "Second Year",
          "image": "/images/team/placeholder-avio-junior-2.jpg",
          "github": "https://github.com/poojashetty",
          "linkedin": "https://linkedin.com/in/poojashetty",
          "instagram": "https://instagram.com/poojashetty"
        }
      ]
    },
    "business": {
      "lead": {
        "name": "Neha Kapoor",
        "department": "Management Studies",
        "year": "Third Year",
        "image": "/images/team/placeholder-biz-lead.jpg",
        "github": "https://github.com/nehakapoor",
        "linkedin": "https://linkedin.com/in/nehakapoor",
        "instagram": "https://instagram.com/nehakapoor"
      },
      "senior_members": [],
      "junior_members": [
        {
          "name": "Amit Shah",
          "department": "Industrial Design",
          "year": "Second Year",
          "image": "/images/team/placeholder-biz-junior-1.jpg",
          "github": "https://github.com/amitshah",
          "linkedin": "https://linkedin.com/in/amitshah",
          "instagram": "https://instagram.com/amitshah"
        },
        {
          "name": "Tanvi Kulkarni",
          "department": "Management Studies",
          "year": "Second Year",
          "image": "/images/team/placeholder-biz-junior-2.jpg",
          "github": "https://github.com/tanvikulkarni",
          "linkedin": "https://linkedin.com/in/tanvikulkarni",
          "instagram": "https://instagram.com/tanvikulkarni"
        }
      ]
    }
  }
};

// ==================== UTILITY: color class map ====================
const colorClasses = {
  cyan: {
    text: 'text-cyan-400',
    border: 'border-cyan-400',
    bg: 'bg-cyan-400/20',
    icon: 'text-cyan-400',
  },
  purple: {
    text: 'text-purple-400',
    border: 'border-purple-400',
    bg: 'bg-purple-400/20',
    icon: 'text-purple-400',
  },
  orange: {
    text: 'text-orange-400',
    border: 'border-orange-400',
    bg: 'bg-orange-400/20',
    icon: 'text-orange-400',
  },
  emerald: {
    text: 'text-emerald-400',
    border: 'border-emerald-400',
    bg: 'bg-emerald-400/20',
    icon: 'text-emerald-400',
  }
};

// ==================== FOOTER ====================
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
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white" style={{ fontFamily: 'Orbitron, monospace' }}>
                  TEAM RAKSHAK
                </h3>
                <p className="text-xs text-cyan-400">IIT BOMBAY</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Engineering the future of autonomous aerial systems for disaster relief and aerospace innovation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4 flex items-center">
              <ChevronRight className="w-4 h-4 text-cyan-400 mr-1" />
              Navigation
            </h4>
            <ul className="space-y-2">
              {sitemap.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => setCurrentPage(link.id)}
                    className="text-slate-400 hover:text-cyan-400 transition text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-4 flex items-center">
              <ChevronRight className="w-4 h-4 text-cyan-400 mr-1" />
              Contact
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <Mail className="w-4 h-4 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                <a href={`mailto:${profile.contact.emails[0]}`} className="text-slate-400 hover:text-cyan-400 transition">
                  {profile.contact.emails[0]}
                </a>
              </li>
              <li className="flex items-start">
                <Phone className="w-4 h-4 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                <a href={`tel:${profile.contact.phone}`} className="text-slate-400 hover:text-cyan-400 transition">
                  {profile.contact.phone}
                </a>
              </li>
              <li className="flex items-start">
                <MapPin className="w-4 h-4 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-slate-400">
                  {profile.department}, IIT Bombay
                </span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-white font-bold mb-4 flex items-center">
              <ChevronRight className="w-4 h-4 text-cyan-400 mr-1" />
              Connect
            </h4>
            <div className="flex flex-wrap gap-3">
              {Object.entries(socials).map(([key, url]) => {
                const Icon = socialIcons[key];
                return (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-slate-800/50 rounded-lg flex items-center justify-center hover:bg-cyan-400/20 border border-transparent hover:border-cyan-400/30 transition group"
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
          <div className="flex items-center space-x-6 text-sm">
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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'fleet':
        return <FleetPage />;
      case 'subsystems':
        return <SubsystemsPage />;
      case 'competitions':
        return <CompetitionsPage />;
      case 'team':
        return <TeamPage />;
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
        * { margin:0; padding:0; box-sizing:border-box; }
        body { font-family: 'Inter', sans-serif; overflow-x: hidden; }
        h1,h2,h3,h4,h5,h6 { font-family: 'Orbitron', monospace; }
        ::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-track { background: #0f172a; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(to bottom, #00f0ff, #a855f7); border-radius: 5px; }
        ::-webkit-scrollbar-thumb:hover { background: linear-gradient(to bottom, #00d4ff, #9333ea); }
      `}</style>

      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      <main>
        {renderPage()}
      </main>

      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}

// ==================== CONTACT PAGE ====================
const ContactPage = () => {
  const [terminalState, setTerminalState] = useState('idle');
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const contact = organizationData.organization_profile.contact;
  const socials = organizationData.organization_profile.social_links;

  const handleSubmit = (e) => {
    e.preventDefault();
    setTerminalState('transmitting');
    // Simulate async send
    setTimeout(() => {
      setTerminalState('success');
      setTimeout(() => {
        setTerminalState('idle');
        setName('');
        setSubject('');
        setMessage('');
      }, 3000);
    }, 1200);
  };

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
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            COMMS ARRAY
          </h1>
          <p className="text-xl text-cyan-400">Establish Communication Protocol</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Terminal */}
          <div className="lg:col-span-2">
            <GlassCard accent="cyan">
              <div className="bg-slate-950 rounded-lg p-6 font-mono text-sm">
                <div className="flex items-center space-x-2 mb-4 pb-3 border-b border-cyan-400/20">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                  </div>
                  <span className="text-cyan-400 ml-4">rakshak@mission-control:~$</span>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name Input */}
                  <div>
                    <label className="text-cyan-400 block mb-2">user@rakshak:~$ enter_name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-900 border border-cyan-400/30 rounded px-4 py-2 text-white focus:outline-none focus:border-cyan-400 transition"
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="text-cyan-400 block mb-2">user@rakshak:~$ enter_email</label>
                    <input
                      type="email"
                      className="w-full bg-slate-900 border border-cyan-400/30 rounded px-4 py-2 text-white focus:outline-none focus:border-cyan-400 transition"
                      placeholder="john@example.com"
                      required
                    />
                  </div>

                  {/* Subject Input */}
                  <div>
                    <label className="text-cyan-400 block mb-2">user@rakshak:~$ enter_subject</label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-slate-900 border border-cyan-400/30 rounded px-4 py-2 text-white focus:outline-none focus:border-cyan-400 transition"
                      placeholder="Collaboration Inquiry"
                      required
                    />
                  </div>

                  {/* Message Input */}
                  <div>
                    <label className="text-cyan-400 block mb-2">user@rakshak:~$ enter_message</label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows="4"
                      className="w-full bg-slate-900 border border-cyan-400/30 rounded px-4 py-2 text-white focus:outline-none focus:border-cyan-400 transition resize-none"
                      placeholder="Type your message here..."
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={terminalState !== 'idle'}
                    className="w-full bg-cyan-400/20 border border-cyan-400 text-cyan-400 rounded py-3 font-bold hover:bg-cyan-400/30 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {terminalState === 'idle' && '[ EXECUTE_TRANSMISSION ]'}
                    {terminalState === 'transmitting' && '[ TRANSMITTING... ]'}
                    {terminalState === 'success' && '[ TRANSMISSION_SUCCESSFUL ]'}
                  </button>
                </form>

                {terminalState === 'success' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-3 bg-green-400/10 border border-green-400/30 rounded text-green-400">
                    ✓ Message transmitted successfully.
                  </motion.div>
                )}
              </div>
            </GlassCard>
          </div>

          {/* Contact Info & Socials */}
          <div className="space-y-6">
            <GlassCard accent="purple">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <Zap className="w-5 h-5 text-purple-400 mr-2" />
                Direct Channels
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center text-purple-400 mb-2">
                    <Mail className="w-4 h-4 mr-2" />
                    <span className="text-sm font-semibold">Email</span>
                  </div>
                  {contact.emails.map((email, idx) => (
                    <a key={idx} href={`mailto:${email}`} className="text-slate-300 text-sm hover:text-cyan-400 transition block">
                      {email}
                    </a>
                  ))}
                </div>

                <div>
                  <div className="flex items-center text-purple-400 mb-2">
                    <Phone className="w-4 h-4 mr-2" />
                    <span className="text-sm font-semibold">Phone</span>
                  </div>
                  <a href={`tel:${contact.phone}`} className="text-slate-300 text-sm hover:text-cyan-400 transition">
                    {contact.phone}
                  </a>
                </div>

                <div>
                  <div className="flex items-center text-purple-400 mb-2">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm font-semibold">Location</span>
                  </div>
                  <p className="text-slate-300 text-sm">{contact.location}</p>
                </div>
              </div>
            </GlassCard>

            <GlassCard accent="orange">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <Zap className="w-5 h-5 text-orange-400 mr-2" />
                Encrypted Frequencies
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(socials).map(([key, url]) => {
                  const Icon = socialIcons[key];
                  const label = key.replace(/_/g, ' ').replace(/^./, (str) => str.toUpperCase());
                  return (
                    <a key={key} href={url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 p-3 bg-slate-800/50 rounded-lg hover:bg-orange-400/10 border border-transparent hover:border-orange-400/30 transition group">
                      <Icon className="w-5 h-5 text-slate-400 group-hover:text-orange-400 transition" />
                      <span className="text-slate-300 text-sm group-hover:text-orange-400 transition capitalize">
                        {label.length > 10 ? label.substring(0, 10) + '...' : label}
                      </span>
                    </a>
                  );
                })}
              </div>
            </GlassCard>

            <GlassCard accent="emerald">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <MapPin className="w-5 h-5 text-emerald-400 mr-2" />
                Coordinates
              </h3>
              <div className="bg-slate-800/50 rounded-lg h-48 flex items-center justify-center border border-emerald-400/20">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-emerald-400 mx-auto mb-2" />
                  <p className="text-slate-400 text-sm">IIT Bombay Campus</p>
                  <p className="text-slate-500 text-xs">Mumbai, India</p>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== COMPETITIONS PAGE ====================
const CompetitionsPage = () => {
  const competitions = organizationData.competitions_and_projects;

  const statusStyles = {
    'Active': { bg: 'bg-green-400/20', border: 'border-green-400', text: 'text-green-400', dot: true },
    'Targeted': { bg: 'bg-blue-400/20', border: 'border-blue-400', text: 'text-blue-400', dot: false },
    'Past': { bg: 'bg-slate-600/20', border: 'border-slate-600', text: 'text-slate-400', dot: false }
  };

  const getStatusBadge = (status) => {
    const style = statusStyles[status] || statusStyles['Targeted'];
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${style.bg} ${style.border} ${style.text} border`}>
        {style.dot && <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />}
        {status || 'Targeted'}
      </span>
    );
  };

  const isProject = (item) => !item.status;

  return (
    <div className="min-h-screen pt-24 pb-16 relative">
      <ParticleGrid />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">MISSION LOG</h1>
          <p className="text-xl text-cyan-400">Competitions & Research Projects</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {competitions.map((item, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
              <GlassCard accent={isProject(item) ? 'purple' : 'cyan'} className={`h-full ${isProject(item) ? 'border-dashed' : ''}`}>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  {item.status ? getStatusBadge(item.status) : <Target className="w-6 h-6 text-purple-400" />}
                </div>

                <p className="text-slate-300 text-sm leading-relaxed mb-4">{item.description}</p>

                {item.highlights && (
                  <div className="space-y-2 pt-4 border-t border-slate-700">
                    {item.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-start">
                        <ChevronRight className="w-4 h-4 text-purple-400 mr-2 mt-0.5 flex-shrink-0" />
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
    <GlassCard accent={accent} className="text-center">
      <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full flex items-center justify-center">
        <Users className="w-12 h-12 text-slate-600" />
      </div>
      <h4 className="text-lg font-bold text-white mb-1">{member.name}</h4>
      <p className="text-slate-400 text-sm mb-2">{member.department}</p>
      <p className="text-slate-500 text-xs mb-4">{member.year}</p>
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

const TeamPage = () => {
  const [activeSubsystem, setActiveSubsystem] = useState('software');
  const faculty = organizationData.team_structure.faculty_advisors;
  const teamLeads = teamMembersData.team_leads;
  const subsystemTeams = teamMembersData.subsystem_teams;

  const subsystemColors = {
    software: 'cyan',
    aerodynamics: 'purple',
    avionics: 'orange',
    business: 'emerald'
  };

  return (
    <div className="min-h-screen pt-24 pb-16 relative">
      <ParticleGrid />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">COMMAND DECK</h1>
          <p className="text-xl text-cyan-400">Meet Our Team</p>
        </motion.div>

        {/* Faculty Advisors */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
            <Award className="w-8 h-8 text-yellow-400 mr-3" /> Faculty Advisors
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faculty.map((advisor, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
                <GlassCard className="border-yellow-400/30">
                  <div className="flex items-start space-x-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="w-10 h-10 text-yellow-200" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-1">{advisor.name}</h3>
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
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
            <Trophy className="w-8 h-8 text-cyan-400 mr-3" /> Team Leadership
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teamLeads.map((lead, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
                <GlassCard accent="cyan">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-cyan-600 to-blue-700 rounded-full flex items-center justify-center">
                      <Users className="w-16 h-16 text-cyan-200" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{lead.name}</h3>
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
        <div>
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
            <Rocket className="w-8 h-8 text-purple-400 mr-3" /> Subsystem Teams
          </h2>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {Object.keys(subsystemTeams).map((key) => {
              const accent = subsystemColors[key];
              const classesActive = `${colorClasses[accent].bg} ${colorClasses[accent].text} border ${colorClasses[accent].border}`;
              return (
                <button key={key} onClick={() => setActiveSubsystem(key)} className={`px-6 py-3 rounded-lg font-semibold capitalize transition-all ${activeSubsystem === key ? classesActive : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800'}`}>
                  {key}
                </button>
              );
            })}
          </div>

          <motion.div key={activeSubsystem} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4">Subsystem Lead</h3>
              <div className="max-w-sm">
                <MemberCard member={subsystemTeams[activeSubsystem].lead} accent={subsystemColors[activeSubsystem]} />
              </div>
            </div>

            {subsystemTeams[activeSubsystem].senior_members.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4">Senior Members</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {subsystemTeams[activeSubsystem].senior_members.map((member, idx) => (
                    <MemberCard key={idx} member={member} accent={subsystemColors[activeSubsystem]} />
                  ))}
                </div>
              </div>
            )}

            {subsystemTeams[activeSubsystem].junior_members.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Junior Members</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {subsystemTeams[activeSubsystem].junior_members.map((member, idx) => (
                    <MemberCard key={idx} member={member} accent={subsystemColors[activeSubsystem]} />
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// ==================== SUBSYSTEMS PAGE ====================
const SubsystemsPage = () => {
  const [activeTab, setActiveTab] = useState('software');
  const [expandedSection, setExpandedSection] = useState(null);
  const subsystems = organizationData.subsystems_detailed;
  const active = subsystems[activeTab];

  const tabColors = {
    software: 'cyan',
    aerodynamics: 'purple',
    avionics: 'orange',
    business: 'emerald'
  };

  return (
    <div className="min-h-screen pt-24 pb-16 relative">
      <ParticleGrid />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">SUBSYSTEMS</h1>
          <p className="text-xl text-cyan-400">Technical Divisions & Specializations</p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="sticky top-20 z-40 bg-slate-900/90 backdrop-blur-lg border-b border-slate-700 mb-8 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex overflow-x-auto space-x-2 py-4">
              {Object.keys(subsystems).map((key) => {
                const accent = tabColors[key];
                const colors = colorClasses[accent];
                const activeClasses = `${colors.bg} ${colors.text} border ${colors.border}`;
                return (
                  <button key={key} onClick={() => setActiveTab(key)} className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${activeTab === key ? activeClasses : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800'}`}>
                    {subsystems[key].title}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <GlassCard accent={tabColors[activeTab]} className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">{active.title}</h2>
            {active.tagline && <p className={`${colorClasses[tabColors[activeTab]].text} text-xl mb-4`}>{active.tagline}</p>}
            <p className="text-slate-300 leading-relaxed mb-4">{active.description}</p>
            {active.focus && <div className={`${colorClasses[tabColors[activeTab]].bg} border ${colorClasses[tabColors[activeTab]].border} rounded-lg p-4`}><p className="text-white"><strong>Focus:</strong> {active.focus}</p></div>}
          </GlassCard>

          {/* Software - Repository Grid */}
          {activeTab === 'software' && active.repositories && (
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">GitHub Repositories</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {active.repositories.map((repo, idx) => (
                  <motion.a key={idx} href={repo.link} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
                    <GlassCard accent="cyan" className="h-full hover:scale-105 transition-transform">
                      <div className="flex items-start justify-between mb-3">
                        <Github className="w-8 h-8 text-cyan-400" />
                        <ExternalLink className="w-4 h-4 text-slate-400" />
                      </div>
                      <h4 className="text-lg font-bold text-white mb-2">{repo.name}</h4>
                      <p className="text-slate-300 text-sm mb-4">{repo.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {repo.tags.map((tag, i) => (
                          <span key={i} className="px-2 py-1 bg-cyan-400/10 border border-cyan-400/30 rounded text-cyan-400 text-xs">{tag}</span>
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
                        <ChevronRight className="w-5 h-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-300">{stream}</span>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              )}
            </div>
          )}

          {/* Aerodynamics - Research Accordion */}
          {activeTab === 'aerodynamics' && active.technical_sections && (
            <div className="space-y-4 mb-8">
              <h3 className="text-2xl font-bold text-white mb-6">Technical Research</h3>
              {active.technical_sections.map((section, idx) => (
                <GlassCard key={idx} accent="purple" className="cursor-pointer" onClick={() => setExpandedSection(expandedSection === idx ? null : idx)}>
                  <div className="flex justify-between items-center">
                    <h4 className="text-lg font-bold text-white">{section.title}</h4>
                    <motion.div animate={{ rotate: expandedSection === idx ? 90 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronRight className="w-6 h-6 text-purple-400" />
                    </motion.div>
                  </div>
                  <AnimatePresence>
                    {expandedSection === idx && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mt-4 pt-4 border-t border-purple-400/20">
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

          {/* Avionics - Achievements */}
          {activeTab === 'avionics' && active.achievements && (
            <div className="space-y-6 mb-8">
              <h3 className="text-2xl font-bold text-white mb-6">Major Achievements</h3>
              {active.achievements.map((achievement, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }}>
                  <GlassCard accent="orange">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <Trophy className="w-8 h-8 text-orange-400" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white mb-2">{achievement.title}</h4>
                        <p className="text-slate-300">{achievement.desc}</p>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
              {active.notion_link && (
                <a href={active.notion_link} target="_blank" rel="noopener noreferrer" className="block">
                  <GlassCard accent="orange" className="hover:scale-105 transition-transform">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-bold text-white mb-1">Notion Workspace</h4>
                        <p className="text-slate-400 text-sm">Access our complete project documentation</p>
                      </div>
                      <ExternalLink className="w-6 h-6 text-orange-400" />
                    </div>
                  </GlassCard>
                </a>
              )}
            </div>
          )}

          {/* Business - Focus Areas */}
          {activeTab === 'business' && active.key_focus && (
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Key Focus Areas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {active.key_focus.map((focus, idx) => (
                  <motion.div key={idx} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.1 }}>
                    <GlassCard accent="emerald" className="h-full">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-emerald-400/20 rounded-lg flex items-center justify-center">
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
            <button className={`px-6 py-3 ${colorClasses[tabColors[activeTab]].bg} border ${colorClasses[tabColors[activeTab]].border} ${colorClasses[tabColors[activeTab]].text} rounded-lg font-semibold hover:scale-105 transition-transform`}>
              View Team Members
            </button>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
};

// ==================== FLEET PAGE (placeholder/stub) ====================
const FleetPage = () => {
  const fleet = organizationData.fleet_specifications || [];
  return (
    <div className="min-h-screen pt-24 pb-16 relative">
      <ParticleGrid />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">HANGAR</h1>
          <p className="text-xl text-cyan-400">Fleet Specifications</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fleet.map((plane, idx) => (
            <GlassCard key={idx} accent="orange" className="h-full">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">{plane.name}</h4>
                  <p className="text-slate-300 text-sm">{plane.role} • {plane.year}</p>
                </div>
                <div className="flex-shrink-0">
                  {plane.media && plane.media.image ? (
                    <img src={plane.media.image} alt={plane.name} className="w-24 h-16 object-cover rounded" />
                  ) : (
                    <div className="w-24 h-16 bg-slate-800 rounded flex items-center justify-center text-slate-500">No Image</div>
                  )}
                </div>
              </div>
              <p className="text-slate-300 text-sm mb-3">{plane.description}</p>
              {plane.specs && (
                <div className="text-slate-400 text-xs space-y-1">
                  {Object.entries(plane.specs).map(([k, v]) => (<div key={k}><strong className="text-slate-200">{k.replace(/_/g, ' ')}:</strong> {v}</div>))}
                </div>
              )}
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
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
        const classes = colorClasses[stat.color] || colorClasses.cyan;
        return (
          <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
            <GlassCard accent={stat.color} className="text-center">
              <Icon className={`w-12 h-12 mx-auto mb-4 ${classes.icon}`} />
              <div className={`text-4xl font-bold ${classes.text} mb-2`} style={{ fontFamily: 'Orbitron, monospace' }}>{stat.value}</div>
              <div className="text-slate-400 text-sm uppercase tracking-wider">{stat.label}</div>
            </GlassCard>
          </motion.div>
        );
      })}
    </div>
  );
};

const HomePage = () => {
  const profile = organizationData.organization_profile;

  return (
    <div className="min-h-screen">
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <ParticleGrid />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-slate-950" />
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }} className="mb-6">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center mb-6 shadow-2xl shadow-cyan-500/50">
              <Rocket className="w-16 h-16 text-white" />
            </div>
          </motion.div>

          <motion.h1 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            TEAM RAKSHAK
          </motion.h1>

          <motion.p initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="text-xl md:text-2xl text-cyan-400 mb-6">
            {profile.institution} • {profile.department}
          </motion.p>

          <motion.p initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.7 }} className="text-slate-300 text-lg max-w-3xl mx-auto leading-relaxed">
            {profile.mission_statement}
          </motion.p>
        </div>
      </div>

      <MissionTicker />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <FeaturedStats />

        <GlassCard accent="cyan" className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Target className="w-8 h-8 text-cyan-400 mr-3" />
            Mission Overview
          </h2>
          <p className="text-slate-300 leading-relaxed mb-6">{profile.mission_statement}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold text-cyan-400 mb-3">Our Focus Areas</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <ChevronRight className="w-5 h-5 text-cyan-400 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-slate-300">Search and Rescue Operations (SRO) in disaster-stricken areas</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-5 h-5 text-cyan-400 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-slate-300">Advanced surveying and mapping technologies</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-5 h-5 text-cyan-400 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-slate-300">Wildlife conservation through aerial monitoring</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-5 h-5 text-cyan-400 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-slate-300">Autonomous UAV systems development</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-cyan-400 mb-3">Established Legacy</h3>
              <p className="text-slate-300 mb-4">Since {profile.established}, Team Rakshak has been at the forefront of UAV innovation at IIT Bombay, consistently pushing the boundaries of what's possible in autonomous aerial systems.</p>
              <div className="flex items-center space-x-4 text-sm text-slate-400">
                <div className="flex items-center"><Award className="w-4 h-4 text-orange-400 mr-1" /> <span>Multiple Competition Wins</span></div>
                <div className="flex items-center"><Rocket className="w-4 h-4 text-purple-400 mr-1" /> <span>6+ UAVs Designed</span></div>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

// ==================== UTILITY COMPONENTS ====================
const ParticleGrid = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, #00f0ff 1px, transparent 0)`,
        backgroundSize: '50px 50px'
      }} />
    </div>
  );
};

const GlassCard = ({ children, className = '', accent = 'cyan' }) => {
  const accentColors = {
    cyan: 'border-cyan-400/30 hover:border-cyan-400/60',
    purple: 'border-purple-400/30 hover:border-purple-400/60',
    orange: 'border-orange-400/30 hover:border-orange-400/60',
    emerald: 'border-emerald-400/30 hover:border-emerald-400/60'
  };
  const accentClass = accentColors[accent] || accentColors.cyan;
  return (
    <div className={`bg-slate-900/40 backdrop-blur-md border ${accentClass} rounded-lg p-6 transition-all duration-300 ${className}`}>
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
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <div>
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
