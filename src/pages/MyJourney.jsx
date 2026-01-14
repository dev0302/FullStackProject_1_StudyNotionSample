import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaCode,
  FaPalette,
  FaServer,
  FaDatabase,
  FaShieldAlt,
  FaCogs,
  FaLightbulb,
  FaArrowRight,
  FaClock,
  FaFolderOpen,
  FaCube,
  FaPuzzlePiece,
  FaExchangeAlt,
  FaUserCheck,
  FaLock,
  FaRoute,
} from "react-icons/fa";
import {
  HiOutlineLightningBolt,
  HiOutlineTemplate,
  HiOutlineCollection,
  HiOutlineCog,
  HiOutlineRefresh,
} from "react-icons/hi";

import HighLightText from "../components/core/HomePage/HighLightText";
import Footer from "../components/common/Footer";

const MyJourney = () => {
  const [activePhase, setActivePhase] = useState(0);

  const phases = [
    {
      title: "Foundation Setup",
      icon: <FaCode className="text-blue-500" />,
      date: "Phase 1",
      color: "from-blue-500 to-cyan-500",
      steps: [
        "Initialized React project with Vite for faster builds",
        "Installed React Router DOM for navigation management",
        "Structured application routing in main.jsx with BrowserRouter",
        "Created organized folder structure with clear separation of concerns",
      ],
    },
    {
      title: "Homepage Architecture",
      icon: <FaPalette className="text-purple-500" />,
      date: "Phase 2",
      color: "from-purple-500 to-pink-500",
      steps: [
        "Designed homepage with 4 logical sections for better UX",
        "Created reusable components: HighLightText & CTAButton",
        "Implemented ExploreMore component with dynamic tab switching",
        "Built responsive layouts using Tailwind CSS utility classes",
      ],
    },
    {
      title: "Navigation & State",
      icon: <FaServer className="text-green-500" />,
      date: "Phase 3",
      color: "from-green-500 to-emerald-500",
      steps: [
        "Implemented Redux Toolkit for global state management",
        "Created authSlice, profileSlice, and cartSlice",
        "Built responsive Navbar with dynamic catalog from backend",
        "Added localStorage persistence for user authentication",
      ],
    },
    {
      title: "Backend Integration",
      icon: <FaDatabase className="text-orange-500" />,
      date: "Phase 4",
      color: "from-orange-500 to-red-500",
      steps: [
        "Created centralized API connector using Axios",
        "Implemented environment-based configuration",
        "Connected frontend to backend endpoints seamlessly",
        "Handled async operations with proper error handling",
      ],
    },
    {
      title: "Authentication Flow",
      icon: <FaShieldAlt className="text-yellow-500" />,
      date: "Phase 5",
      color: "from-yellow-500 to-amber-500",
      steps: [
        "Built complete auth system: Login, Signup, Password Reset",
        "Implemented OTP verification for email confirmation",
        "Created protected routes with role-based access",
        "Added form validation using react-hook-form",
      ],
    },
    {
      title: "Dashboard & Settings",
      icon: <FaCogs className="text-indigo-500" />,
      date: "Phase 6",
      color: "from-indigo-500 to-violet-500",
      steps: [
        "Designed modular Dashboard with Sidebar navigation",
        "Implemented Settings page with profile management",
        "Created reusable ConfirmationModal and IconBtn components",
        "Built MyProfile component for user data display",
      ],
    },
  ];

  const keyInsights = [
    {
      icon: <FaLightbulb className="text-yellow-400" />,
      title: "Component Reusability",
      description:
        "Created atomic components like CTAButton and HighLightText that reduced code duplication by 60% across the application.",
    },
    {
      icon: <HiOutlineLightningBolt className="text-blue-400" />,
      title: "State Management Strategy",
      description:
        "Used Redux Toolkit for global state while maintaining local state for component-specific data, ensuring optimal performance.",
    },
    {
      icon: <HiOutlineTemplate className="text-green-400" />,
      title: "Folder Architecture",
      description:
        "Organized codebase into logical directories (core, common, operations) making navigation and maintenance intuitive.",
    },
    {
      icon: <HiOutlineCollection className="text-purple-400" />,
      title: "API Layer Abstraction",
      description:
        "Centralized all API calls through apiconnector.jsx, making backend integrations clean and maintainable.",
    },
  ];

  const challenges = [
    {
      problem: "Dynamic Catalog Loading",
      solution:
        "Implemented useEffect with async API calls in Navbar, caching responses for better performance.",
      icon: <FaFolderOpen className="text-blue-400" />,
    },
    {
      problem: "Authentication State Persistence",
      solution:
        "Combined Redux with localStorage to maintain login state across page refreshes.",
      icon: <FaLock className="text-green-400" />,
    },
    {
      problem: "Form Validation Complexity",
      solution:
        "Used react-hook-form for form management with custom validation rules and error handling.",
      icon: <FaUserCheck className="text-purple-400" />,
    },
    {
      problem: "Route Protection",
      solution:
        "Created PrivateRoute wrapper component to guard authenticated routes based on user role.",
      icon: <FaRoute className="text-orange-400" />,
    },
  ];

  return (
    <div className="bg-richblack-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-richblack-800 via-richblack-900 to-richblack-950 py-20">
        {/* ✅ FIXED SVG BACKGROUND */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7z' fill='%239C92AC' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }}
        ></div>

        <div className="relative mx-auto w-11/12 max-w-maxContent">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-richblack-800/50 border border-richblack-600">
              <FaClock className="text-richblack-200" />
              <span className="text-richblack-200 text-sm font-medium">
                Development Timeline
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              My Development Journey
            </h1>

            <p className="text-xl text-richblack-300 max-w-3xl mx-auto mb-10 leading-relaxed">
              A comprehensive walkthrough of building{" "}
              <HighLightText text="StudyNotion" /> — from initial setup to complex
              features.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 text-richblack-200">
                <FaCube className="text-blue-400" />
                <span>24+ Reusable Components</span>
              </div>
              <div className="flex items-center gap-2 text-richblack-200">
                <FaPuzzlePiece className="text-green-400" />
                <span>6 Development Phases</span>
              </div>
              <div className="flex items-center gap-2 text-richblack-200">
                <FaExchangeAlt className="text-purple-400" />
                <span>12+ API Endpoints</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

            {/* Development Phases */}
      <section className="py-20">
        <div className="mx-auto w-11/12 max-w-maxContent">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Development{" "}
              <span className="text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">
                Phases
              </span>
            </h2>
            <p className="text-richblack-300 max-w-2xl mx-auto">
              Each phase represents a milestone in the development process.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {phases.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => setActivePhase(index)}
                className={`relative p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                  activePhase === index
                    ? "bg-gradient-to-br from-richblack-800 to-richblack-900 border-2 border-richblack-600 shadow-xl"
                    : "bg-richblack-800/50 hover:bg-richblack-800/80"
                }`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className={`p-3 rounded-lg bg-gradient-to-br ${phase.color} bg-opacity-20`}
                  >
                    {phase.icon}
                  </div>
                  <div>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-richblack-700 text-white">
                      {phase.date}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-2">
                      {phase.title}
                    </h3>
                  </div>
                </div>

                <ul className="space-y-3">
                  {phase.steps.map((step, stepIndex) => (
                    <li
                      key={stepIndex}
                      className="flex items-start gap-3 text-richblack-200"
                    >
                      <FaArrowRight className="mt-1 text-richblack-400" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Active Phase Details */}
          <motion.div
            key={activePhase}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gradient-to-r from-richblack-800 to-richblack-900 rounded-2xl p-8 border border-richblack-700"
          >
            <div className="flex items-center gap-4 mb-6">
              <div
                className={`p-4 rounded-xl bg-gradient-to-br ${phases[activePhase].color} bg-opacity-20`}
              >
                {phases[activePhase].icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">
                  {phases[activePhase].title}
                </h3>
                <p className="text-richblack-300">
                  {phases[activePhase].date}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {phases[activePhase].steps.map((step, index) => (
                <div
                  key={index}
                  className="bg-richblack-700/50 rounded-lg p-4"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`w-8 h-8 rounded-full bg-gradient-to-r ${phases[activePhase].color} flex items-center justify-center`}
                    >
                      <span className="font-bold text-white">
                        {index + 1}
                      </span>
                    </div>
                    <h4 className="font-semibold text-white">
                      Step {index + 1}
                    </h4>
                  </div>
                  <p className="text-richblack-200 pl-11">{step}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Insights */}
      <section className="py-20 bg-richblack-950/50">
        <div className="mx-auto w-11/12 max-w-maxContent">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Key{" "}
              <span className="text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text">
                Insights
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {keyInsights.map((insight, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-richblack-800 to-richblack-900 rounded-2xl p-6 border border-richblack-700"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-richblack-700">
                    {insight.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {insight.title}
                  </h3>
                </div>
                <p className="text-richblack-300">{insight.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenges & Solutions */}
      <section className="py-20">
        <div className="mx-auto w-11/12 max-w-maxContent">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {challenges.map((challenge, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-richblack-800 to-richblack-900 rounded-2xl p-6 border border-richblack-700"
              >
                <div className="flex gap-4">
                  <div className="p-3 rounded-xl bg-richblack-700">
                    {challenge.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      {challenge.problem}
                    </h3>
                    <p className="text-richblack-300">
                      {challenge.solution}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Conclusion */}
      <section className="py-20">
        <div className="mx-auto w-11/12 max-w-maxContent text-center">
          <HiOutlineCog className="text-6xl text-richblack-400 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-white mb-6">
            Final{" "}
            <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
              Reflections
            </span>
          </h2>

          <div className="bg-gradient-to-br from-richblack-800 to-richblack-900 rounded-2xl p-8 border border-richblack-700">
            <p className="text-lg text-richblack-200 mb-6">
              Building StudyNotion was more than just coding—it was a journey in
              architecting scalable solutions and intuitive user experiences.
            </p>
            <p className="text-lg text-richblack-200">
              Each challenge and feature strengthened my understanding of
              modern full-stack development.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MyJourney;

