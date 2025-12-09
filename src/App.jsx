import React, { useState, useEffect } from 'react';
import {
  Github,
  FileText,
  Book,
  Award,
  Cpu,
  Plane,
  Zap,
  ChevronRight,
  Activity,
  Layers,
  Code2,
  ExternalLink
} from 'lucide-react';

const RakshakWebsite = () => {
  const [activeTab, setActiveTab] = useState('software');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const subsystems = {
    software: {
      icon: <Code2 className="w-6 h-6" aria-hidden="true" />,
      gradient: 'from-cyan-500 via-blue-600 to-indigo-700',
      accentColor: 'cyan',
      externalLink: {
        label: 'Software @ GitHub',
        href: 'https://github.com/rakshaksoftware',
      },
      hero: {
        title: 'Software Subsystem',
        tagline: 'AI-Powered Autonomous Navigation',
        description:
          'Building cutting-edge UAV systems using real-time vision, edge computing, and artificial intelligence.',
        focus:
          'Vision-based autonomous navigation for GPS-denied environments with edge-AI optimization for low-latency onboard inference. Also implementing advanced autonomy via reinforcement learning controllers and Jetson-based real-time detection (Autonomous Intelligence Systems).',
        workstreams: [
          'Optical-flow navigation (Python, OpenCV, ROS2)',
          'Model optimization for Jetson hardware (C++/CUDA/TensorRT)',
          'Sub-15ms inference targets for real-time UAV operations',
          'Reinforcement learning-based control and object detection on Jetson',
        ],
      },
      repositories: [
        {
          name: 'NIDAR 2025',
          href: 'https://github.com/rakshaksoftware/NIDAR-2025',
          desc:
            'Project repository containing prototype code, experimental pipelines, and demonstration artifacts with comprehensive documentation of goals, methodologies, and reproducible results.',
          icon: <Award className="w-5 h-5" aria-hidden="true" />,
          tags: ['Project', 'Demo', 'Pipeline'],
        },
        {
          name: 'Research & Development',
          href: 'https://github.com/rakshaksoftware/Research-and-Development',
          desc:
            'Primary R&D hub documenting ongoing research in drone-to-drone communication strategies and advanced imaging modalities, with design documentation, proofs-of-concept, and experimental prototypes.',
          icon: <Activity className="w-5 h-5" aria-hidden="true" />,
          tags: ['Research', 'Prototypes', 'Innovation'],
        },
        {
          name: 'CUASC 2025 Code',
          href: 'https://github.com/rakshaksoftware/CUASC-2025-Code',
          desc:
            'Competition-ready codebase featuring autonomy controllers, mission planning algorithms, and comprehensive evaluation scripts for both simulation environments and hardware deployment.',
          icon: <Github className="w-5 h-5" aria-hidden="true" />,
          tags: ['Competition', 'Autonomy', 'Control'],
        },
        {
          name: 'Lufthansa 2024 R&D',
          href: 'https://github.com/rakshaksoftware/Lufthansa-2024-RnD',
          desc:
            'Collaborative research partnership materials including academic papers, LaTeX sources, presentation slides, and Jupyter notebooks documenting joint research outcomes and technical contributions.',
          icon: <Layers className="w-5 h-5" aria-hidden="true" />,
          tags: ['Collaboration', 'Research', 'Publications'],
        },
        {
          name: 'CUASC 2025 Logging',
          href: 'https://github.com/rakshaksoftware/CUASC-2025-Logging',
          desc:
            'Telemetry recording infrastructure with logging utilities, data schemas, and analysis tools for comprehensive post-flight diagnostics, replay capabilities, and performance evaluation.',
          icon: <FileText className="w-5 h-5" aria-hidden="true" />,
          tags: ['Telemetry', 'Analytics', 'Debug'],
        },
        {
          name: 'Object Detection',
          href: 'https://github.com/rakshaksoftware/Object-Detection',
          desc:
            'Complete object detection pipeline with model training notebooks, evaluation scripts, sample datasets, and visual demonstrations showcasing detection capabilities optimized for edge deployment.',
          icon: <Zap className="w-5 h-5" aria-hidden="true" />,
          tags: ['Detection', 'Training', 'Inference'],
        },
        {
          name: 'Jetson Nano',
          href: 'https://github.com/rakshaksoftware/jetson_nano',
          desc:
            'Comprehensive deployment guides for NVIDIA Jetson platforms including hardware setup, optimization techniques, benchmark results, and performance targets achieving sub-15ms inference.',
          icon: <Cpu className="w-5 h-5" aria-hidden="true" />,
          tags: ['Edge AI', 'Deployment', 'Hardware'],
        },
        {
          name: 'Assignments 2025',
          href: 'https://github.com/rakshaksoftware/Assignments_2025',
          desc:
            'Collection of instructional materials and lab assignments featuring Jupyter notebooks with experiments, tutorials, and worked examples for teaching computer vision and edge-AI fundamentals.',
          icon: <Book className="w-5 h-5" aria-hidden="true" />,
          tags: ['Education', 'Tutorials', 'CV Basics'],
        },
      ],
    },

    aerodynamics: {
      icon: <Plane className="w-6 h-6" aria-hidden="true" />,
      gradient: 'from-violet-500 via-purple-600 to-fuchsia-700',
      accentColor: 'purple',
      externalLink: {
        label: 'Aerodynamics Doc',
        href:
          'https://docs.google.com/document/d/1ea3b8s76pqRg-qTsHp_CMFMldWKa0Wm9cOb4ZzirdIw/edit?usp=sharing',
      },
      hero: {
        title: 'Aerodynamics Subsystem',
        tagline: 'Precision Engineering & Material Science',
        description:
          'Advanced research in airfoil optimization, composite manufacturing, and structural analysis for high-performance UAV platforms.',
        focus:
          'Comprehensive aerodynamic analysis using XFLR5, advanced composite material integration, and stability optimization through iterative design',
        workstreams: [
          'Airfoil selection and computational fluid dynamics',
          'Carbon fiber composite manufacturing techniques',
          'Stability derivatives and control surface optimization',
        ],
      },
      sections: [
        {
          title: 'Airfoil Selection & Analysis',
          content:
            'Extensive computational analysis of multiple airfoil profiles including NACA 4415, NACA 4412, S1221, S9000, E222, and E854. Selected NACA 4412 for wing application due to superior aerodynamic efficiency at low angles of attack, optimal lift-to-drag ratio, and favorable pitching moment characteristics. NACA 0012 chosen for tail surfaces for symmetric flow properties.',
          highlight: 'NACA 4412 (Wing) • NACA 0012 (Tail)',
          icon: <Activity className="w-5 h-5" aria-hidden="true" />,
          stats: ['6+ airfoils analyzed', 'XFLR5 simulation', 'Optimized Cl/Cd'],
        },
        {
          title: 'Advanced Material Research',
          content:
            'Comprehensive study of aerospace-grade materials from Air Cargo Challenge technical reports. Focus on carbon fiber prepreg composites (TENAX UMS, Carboweave CW29), structural foam cores (ROHACELL IG-F series, PMI foam), aluminum alloy frameworks, and hybrid 3D-printed components (PLA for rigid structures, TPU for high-fatigue applications). Emphasis on strength-to-weight optimization.',
          highlight: 'Carbon Fiber • ROHACELL Foam • Precision Alloys',
          icon: <Layers className="w-5 h-5" aria-hidden="true" />,
          stats: ['5+ team reports', 'Composite focus', 'Weight optimized'],
        },
        {
          title: 'Manufacturing Excellence',
          content:
            'Advanced composite molding using prepreg carbon fiber with autoclave curing (120°C, 4 bar, 1 hour). Semi-monocoque fuselage construction with precision laser-cut aluminum ribs. Sandwich structure integration with PMI foam cores. Two-component epoxy bonding systems to prevent galvanic corrosion. Standardized M3 fastener integration for modular assembly.',
          highlight: 'Autoclave Curing • Semi-Monocoque Design',
          icon: <Cpu className="w-5 h-5" aria-hidden="true" />,
          stats: ['Autoclave cured', 'Laser precision', '<15% weight fraction'],
        },
        {
          title: 'Stability & Control Analysis',
          content:
            'Determination of aerodynamic centers through XFLR5 moment coefficient analysis. Static margin calculation and optimization for stable flight envelope. Downwash angle characterization across angle-of-attack range. Wing-tail interaction modeling and center of gravity manipulation for optimal longitudinal stability. Iterative configuration refinement using plane analysis modules.',
          highlight: 'Static Margin Optimized • CG Balanced',
          icon: <Zap className="w-5 h-5" aria-hidden="true" />,
          stats: ['XFLR5 analysis', 'Stability derivatives', 'CG optimization'],
        },
      ],
    },

    avionics: {
      icon: <Zap className="w-6 h-6" aria-hidden="true" />,
      gradient: 'from-orange-500 via-red-600 to-rose-700',
      accentColor: 'orange',
      externalLink: {
        label: 'Avionics Notion',
        href: 'https://www.notion.so/invite/8c9ab16462b58a086b13b19a566e5d032c926936',
      },
      hero: {
        title: 'Avionics Subsystem',
        tagline: 'Custom Electronics & Autonomous Flight',
        description:
          'Ground-up UAV development featuring custom airframes, electronics integration, and intelligent autonomous navigation systems.',
        focus:
          'Complete vertical integration from airframe design to autonomous control systems, with emphasis on GPS-denied navigation and heavy-lift capabilities',
        workstreams: [
          'Custom quadcopter and fixed-wing airframe development',
          'Jetson-powered computer vision integration for onboard tasks',
          'Precision PID tuning and robust power distribution',
        ],
      },
      achievements: [
        {
          title: 'CUASC Championship Victory',
          desc:
            'Secured first place at CUASC with a fully custom quadcopter platform. Complete proprietary design including airframe architecture, electronics suite, power distribution, and precision PID tuning achieving superior flight characteristics and mission performance.',
          icon: <Award className="w-5 h-5" aria-hidden="true" />,
          tags: ['1st Place', 'Custom Build', 'Competition'],
        },
        {
          title: 'Fixed-Wing Platform Evolution',
          desc:
            'Continuous iterative development of fixed-wing platforms with each generation incorporating lessons learned. Progressive improvements in aerodynamic efficiency, composite material application, structural optimization, and novel configuration exploration pushing performance boundaries.',
          icon: <Plane className="w-5 h-5" aria-hidden="true" />,
          tags: ['Evolution', 'Optimization', 'Innovation'],
        },
        {
          title: 'Heavy-Lift Quadcopter Platform',
          desc:
            'Large-scale custom quadcopter specifically engineered for substantial payload capacity. Purpose-built for carrying equipment and sensors beyond the capabilities of commercial platforms, featuring custom motor selection, power system design, and structural reinforcement.',
          icon: <Layers className="w-5 h-5" aria-hidden="true" />,
          tags: ['Heavy-Lift', 'Custom', 'Payload'],
        },
        // Removed "Autonomous Intelligence Systems" from Avionics and referenced it in Software.
      ],
    },
  };

  const current = subsystems[activeTab];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-black"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div
            className="absolute top-1/3 right-1/4 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
            style={{ animationDelay: '2s' }}
          ></div>
          <div
            className="absolute bottom-1/4 left-1/3 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
            style={{ animationDelay: '4s' }}
          ></div>
        </div>
      </div>

      {/* Header */}
      <header
        className={`border-b border-white/10 sticky top-0 z-50 transition-all duration-300 ${
          scrollY > 50 ? 'bg-black/80 backdrop-blur-xl' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl blur-lg opacity-50"></div>
                <div className="relative bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 p-2 sm:p-3 rounded-xl">
                  <Plane className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
                </div>
              </div>
              <div className="min-w-0">
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Team Rakshak IITB
                </h1>
                <p className="text-xs sm:text-sm text-slate-400">2025 Progress & Development</p>
              </div>
            </div>

            <a
              href="https://github.com/rakshaksoftware"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-2 sm:p-3 rounded-xl border border-white/10 hover:border-cyan-500/50 transition-all hover:shadow-lg hover:shadow-cyan-500/20"
              aria-label="Open subsystem software GitHub organization"
            >
              <Github className="w-4 h-4 sm:w-5 sm:h-5 group-hover:text-cyan-400 transition-colors" aria-hidden="true" />
            </a>
          </div>
        </div>
      </header>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block mb-4 sm:mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-orange-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
                <div className="relative px-4 sm:px-6 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm">
                  <span className="text-xs sm:text-sm font-medium bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    Academic Year 2025
                  </span>
                </div>
              </div>
            </div>

            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black mb-4 sm:mb-6 leading-tight">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                Advancing UAV
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                Technology
              </span>
            </h2>

            <p className="text-base sm:text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed font-light px-2">
              Comprehensive progress across Software, Aerodynamics, and Avionics subsystems—developing
              <span className="text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text font-medium"> autonomous navigation</span>,
              <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text font-medium"> precision engineering</span>, and
              <span className="text-transparent bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text font-medium"> intelligent flight systems</span>.
            </p>
          </div>

          {/* Subsystem Tabs */}
          <div className="flex gap-3 sm:gap-4 mb-8 sm:mb-12 justify-center flex-wrap">
            {Object.entries(subsystems).map(([key, sub]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`group relative flex items-center gap-2 sm:gap-3 px-5 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold transition-all duration-300 ${
                  activeTab === key
                    ? 'scale-105 shadow-2xl'
                    : 'hover:scale-105 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20'
                }`}
                aria-pressed={activeTab === key}
                aria-label={`Show ${key} subsystem`}
              >
                {activeTab === key && (
                  <>
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${sub.gradient} rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity`}
                      aria-hidden="true"
                    ></div>
                    <div className={`absolute inset-0 bg-gradient-to-r ${sub.gradient} rounded-2xl`} aria-hidden="true"></div>
                  </>
                )}
                <div className="relative flex items-center gap-2 sm:gap-3">
                  {sub.icon}
                  <span className="capitalize text-base sm:text-lg">{key}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Subsystem external link */}
          {current?.externalLink?.href && (
            <div className="flex justify-center mb-8">
              <a
                href={current.externalLink.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-4 sm:px-6 py-2 rounded-xl bg-gradient-to-r ${current.gradient} font-semibold transition-all hover:shadow-lg hover:scale-105`}
              >
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
                <span className="text-sm sm:text-base">{current.externalLink.label}</span>
              </a>
            </div>
          )}
        </section>

        {/* Content Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-12 sm:pb-20">
          {/* Hero Card */}
          <div className="relative mb-8 sm:mb-12 group">
            <div
              className={`absolute inset-0 bg-gradient-to-r ${current.gradient} rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity`}
              aria-hidden="true"
            ></div>
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-start gap-4 sm:gap-6">
                <div className={`p-3 sm:p-4 rounded-2xl bg-gradient-to-br ${current.gradient} shadow-2xl`}>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">{current.icon}</div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="mb-2 sm:mb-3">
                    <h3
                      className={`text-3xl sm:text-4xl md:text-5xl font-black mb-2 bg-gradient-to-r ${current.gradient} bg-clip-text text-transparent`}
                    >
                      {current.hero.title}
                    </h3>
                    <p className="text-base sm:text-lg text-slate-300 font-light italic">{current.hero.tagline}</p>
                  </div>
                  <p className="text-sm sm:text-lg text-slate-200 mb-4 sm:mb-6 leading-relaxed">{current.hero.description}</p>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className={`mt-1 p-1.5 rounded-lg bg-gradient-to-br ${current.gradient}`}>
                        <ChevronRight className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-semibold text-slate-300 mb-1">Primary Focus</p>
                        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{current.hero.focus}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className={`mt-1 p-1.5 rounded-lg bg-gradient-to-br ${current.gradient}`}>
                        <Activity className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-semibold text-slate-300 mb-2">Active Workstreams</p>
                        <ul className="space-y-1">
                          {current.hero.workstreams.map((stream, idx) => (
                            <li key={idx} className="text-slate-400 text-xs sm:text-sm flex items-start gap-2">
                              <span className={`text-${current.accentColor}-400 mt-1`}>•</span>
                              <span>{stream}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Software Repositories */}
          {activeTab === 'software' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {current.repositories.map((repo, idx) => (
                <div key={idx} className="group relative">
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${current.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity`}
                    aria-hidden="true"
                  ></div>
                  <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 group-hover:border-cyan-500/50 rounded-2xl p-5 sm:p-6 transition-all hover:transform hover:scale-[1.02]">
                    <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                      <div className={`p-2 sm:p-3 bg-gradient-to-br ${current.gradient} rounded-xl shadow-lg`}>{repo.icon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-lg sm:text-xl font-bold text-cyan-400">{repo.name}</h4>
                          {repo.href && (
                            <a
                              href={repo.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-cyan-300 hover:text-cyan-200 text-xs sm:text-sm"
                              aria-label={`Open ${repo.name} repository`}
                            >
                              <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
                              Repo
                            </a>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-2 mb-2 sm:mb-3">
                          {repo.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 text-[10px] sm:text-xs font-medium bg-cyan-500/10 text-cyan-400 rounded-lg border border-cyan-500/20"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{repo.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Aerodynamics Sections */}
          {activeTab === 'aerodynamics' && (
            <div className="grid grid-cols-1 gap-4 sm:gap-6">
              {current.sections.map((section, idx) => (
                <div key={idx} className="group relative">
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${current.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity`}
                    aria-hidden="true"
                  ></div>
                  <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 group-hover:border-purple-500/50 rounded-2xl p-6 transition-all">
                    <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                      <div className={`p-2 sm:p-3 bg-gradient-to-br ${current.gradient} rounded-xl shadow-lg`}>{section.icon}</div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xl font-bold text-purple-400 mb-2 sm:mb-3">{section.title}</h4>
                        <p className="text-slate-300 text-sm leading-relaxed mb-3 sm:mb-4">{section.content}</p>

                        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                          <div
                            className={`inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r ${current.gradient} rounded-xl font-semibold text-xs sm:text-sm shadow-lg`}
                          >
                            <Zap className="w-4 h-4" aria-hidden="true" />
                            {section.highlight}
                          </div>
                          <div className="flex gap-2 sm:gap-3 flex-wrap">
                            {section.stats.map((stat, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 text-[10px] sm:text-xs font-medium bg-purple-500/10 text-purple-400 rounded-lg border border-purple-500/20"
                              >
                                {stat}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Avionics Achievements */}
          {activeTab === 'avionics' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {current.achievements.map((achievement, idx) => (
                <div key={idx} className="group relative">
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${current.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity`}
                    aria-hidden="true"
                  ></div>
                  <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 group-hover:border-orange-500/50 rounded-2xl p-5 sm:p-6 transition-all hover:transform hover:scale-[1.02]">
                    <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                      <div className={`p-2 sm:p-3 bg-gradient-to-br ${current.gradient} rounded-xl shadow-lg`}>{achievement.icon}</div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-lg sm:text-xl font-bold text-orange-400 mb-2">{achievement.title}</h4>
                        <div className="flex flex-wrap gap-2 mb-2 sm:mb-3">
                          {achievement.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 text-[10px] sm:text-xs font-medium bg-orange-500/10 text-orange-400 rounded-lg border border-orange-500/20"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{achievement.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 mt-12 sm:mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
            <div className="text-center md:text-left">
              <p className="text-slate-300 font-medium mb-1">Team Rakshak IITB</p>
              <p className="text-sm text-slate-500">UAV Development Team • IIT Bombay</p>
            </div>
            <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center">
              <a
                href="https://docs.google.com/document/d/1ea3b8s76pqRg-qTsHp_CMFMldWKa0Wm9cOb4ZzirdIw/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 sm:px-6 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-fuchsia-600 hover:from-purple-400 hover:to-fuchsia-500 font-semibold transition-all hover:shadow-lg hover:shadow-fuchsia-500/50 inline-flex items-center gap-2 text-sm"
              >
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
                Aerodynamics Doc
              </a>
              <a
                href="https://github.com/rakshaksoftware"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 sm:px-6 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 font-semibold transition-all hover:shadow-lg hover:shadow-cyan-500/50 inline-flex items-center gap-2 text-sm"
              >
                <Github className="w-4 h-4" aria-hidden="true" />
                Software @ GitHub
              </a>
              <a
                href="https://www.notion.so/invite/8c9ab16462b58a086b13b19a566e5d032c926936"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 sm:px-6 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 font-semibold transition-all hover:shadow-lg hover:shadow-orange-500/50 inline-flex items-center gap-2 text-sm"
              >
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
                Avionics Notion
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RakshakWebsite;