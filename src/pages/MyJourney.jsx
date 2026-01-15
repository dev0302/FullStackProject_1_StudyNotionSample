import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaCode,
  FaFolder,
  FaProjectDiagram,
  FaArrowRight,
  FaClock,
  FaLayerGroup,
  FaNetworkWired,
  FaCogs,
  FaUserCheck,
  FaShieldAlt
} from "react-icons/fa";
import { HiOutlineLightningBolt, HiOutlineCog } from "react-icons/hi";
import HighLightText from "../components/core/HomePage/HighLightText";
import Footer from "../components/common/Footer";


const MyJourney = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="bg-richblack-900 min-h-screen font-inter">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-richblack-800 to-richblack-900 py-16">
        <div className="mx-auto w-11/12 max-w-maxContent text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
            <div className="flex items-center gap-2 mb-4 px-4 py-1 rounded-full bg-richblack-800 border border-richblack-700 text-yellow-50">
              <FaClock /> <span>Frontend Implementation Guide</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              MAJOR MERN STUDYNOTION : <HighLightText text="FRONTEND" />
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto w-11/12 max-w-maxContent py-12 space-y-12">
        
        {/* Step 1 & 2: Initial Setup */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <div className="bg-richblack-800 p-5 md:p-8 rounded-2xl border border-richblack-700 shadow-lg">
            <h2 className="text-xl md:text-2xl font-bold text-blue-100 mb-4 md:mb-6 flex items-center gap-3">
              <span className="bg-blue-500 text-white w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs md:text-sm shrink-0">1</span>
              Initial Setup (main.jsx)
            </h2>
            <p className="text-richblack-300 mb-4 text-sm md:text-base">Go to main.jsx, npm I react-router-dom</p>
            <div className="bg-richblack-900 p-3 md:p-4 rounded-lg font-mono text-[11px] sm:text-xs md:text-sm text-blue-200 border border-richblack-600 overflow-x-auto">
              createRoot(document.getElementById('root')).render(<br/>
              &nbsp;&nbsp;&lt;BrowserRouter&gt;<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&lt;App /&gt;<br/>
              &nbsp;&nbsp;&lt;/BrowserRouter&gt;<br/>
              )
            </div>
          </div>

          <div className="bg-richblack-800 p-5 md:p-8 rounded-2xl border border-richblack-700 shadow-lg">
            <h2 className="text-xl md:text-2xl font-bold text-pink-100 mb-4 md:mb-6 flex items-center gap-3">
              <span className="bg-pink-500 text-white w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs md:text-sm shrink-0">2</span>
              Defining Routes (App.jsx)
            </h2>
            <p className="text-richblack-300 mb-4 text-sm md:text-base">Import Route, Routes and define the homepage path.</p>
            <div className="bg-richblack-900 p-3 md:p-4 rounded-lg font-mono text-[11px] sm:text-xs md:text-sm text-pink-200 border border-richblack-600 overflow-x-auto">
              import &#123; Route, Routes &#125; from 'react-router-dom'<br/>
              import Home from './pages/Home'<br/><br/>
              function App() &#123;<br/>
              &nbsp;&nbsp;return (<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&lt;Routes&gt;<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;Route path='/' element=&#123;&lt;Home/&gt;&#125; /&gt;<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&lt;/Routes&gt;<br/>
              &nbsp;&nbsp;)<br/>
              &#125;
            </div>
          </div>
        </section>

        {/* Step 3, 4, 5: Architecture */}
        <section className="bg-richblack-800 p-5 md:p-8 rounded-2xl border border-richblack-700">
          <h2 className="text-xl md:text-2xl font-bold text-yellow-50 mb-6 md:mb-8 flex items-center gap-3">
            <FaFolder className="text-yellow-200 shrink-0" />
            3, 4 & 5. Folder Architecture & Homepage Design
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="order-2 md:order-1">
              <p className="text-richblack-200 mb-4 font-semibold text-sm md:text-base text-center md:text-left">Folder Structure Strategy:</p>
              <div className="bg-richblack-900 p-4 md:p-6 rounded-xl font-mono text-[11px] sm:text-xs md:text-sm text-green-200 border border-richblack-700 overflow-x-auto">
                src<br/>
                &nbsp;|_ assets (images, logos etc)<br/>
                &nbsp;|_ components<br/>
                &nbsp;&nbsp;&nbsp;|_ core/Homepage (atomic components)<br/>
                &nbsp;&nbsp;&nbsp;|_ common (shared: Navbar, Footer)<br/>
                &nbsp;|_ data (pre req data/links)<br/>
                &nbsp;|_ pages (Home.jsx)<br/>
                &nbsp;|_ App.jsx | main.jsx
              </div>
            </div>

            <div className="space-y-4 order-1 md:order-2">
              <p className="text-richblack-200 font-semibold text-sm md:text-base text-center md:text-left">Homepage Section-1 Observation:</p>
              <ul className="space-y-3 text-richblack-300 text-xs sm:text-sm md:text-base">
                <li className="flex gap-2">
                    <FaArrowRight className="mt-1 text-yellow-100 shrink-0" /> 
                    <span>Breaking text into <code className="text-yellow-100 px-1 rounded">HighLightText.jsx</code> reusable component.</span>
                </li>
                <li className="flex gap-2">
                    <FaArrowRight className="mt-1 text-yellow-100 shrink-0" /> 
                    <span>Creating <code className="text-yellow-100 px-1 rounded">CTAButton.jsx</code> with active flag props.</span>
                </li>
                <li className="flex gap-2">
                    <FaArrowRight className="mt-1 text-yellow-100 shrink-0" /> 
                    <span>Dividing UI into 4 logical parts: Sections 1, 2, 3 and Footer.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Step 5.1: Detailed Component Map */}
        <section className="bg-richblack-800 p-5 md:p-8 rounded-2xl border border-richblack-700">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-6 text-center md:text-left">Homepage Component mapping</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 font-mono text-[10px] sm:text-xs">
              {[
                "CodeBlocks.jsx", "CTAButton.jsx", "ExploreMore.jsx", 
                "HighLightText.jsx", "LearningLanguageSection.jsx", 
                "ProfileDropDown.jsx", "TimeLineSection.jsx"
              ].map((item) => (
                <div key={item} className="p-3 bg-richblack-900 rounded border border-richblack-700 text-blue-100 hover:bg-richblack-700 transition-all duration-200 truncate text-center md:text-left">
                  components/core/HomePage/{item}
                </div>
              ))}
          </div>
        </section>

        {/* Explore More Logic */}
        <section className="bg-gradient-to-r from-richblack-800 to-richblack-700 p-5 md:p-8 rounded-2xl shadow-2xl border border-richblack-600">
          <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
            <div className="lg:w-1/3 text-center lg:text-left">
              <h3 className="text-xl md:text-2xl font-bold text-yellow-50 mb-3 md:mb-4 flex items-center justify-center lg:justify-start gap-2">
                <HiOutlineLightningBolt className="text-yellow-200 shrink-0" />
                ExploreMore Logic
              </h3>
              <p className="text-richblack-200 text-xs md:text-sm">Detailed logic for tab switching and dynamic course selection.</p>
            </div>
            <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              {[
                {h: "1. Initialize State", p: "currentTab, courses (from selected tab), and currentCard."},
                {h: "2. Tab Change (setMyCards)", p: "Match tab data, load courses, auto-select first card."},
                {h: "3. UI Rendering", p: "Dynamic map of tabs and courses via HighLightText."},
                {h: "4. Card Selection", p: "Update currentCard and apply highlight active styles."}
              ].map((item, index) => (
                <div key={index} className="bg-richblack-900/50 p-4 rounded-lg border border-richblack-600 hover:border-yellow-200 transition-all duration-300">
                    <h4 className="text-white font-bold mb-1 text-sm md:text-base">{item.h}</h4>
                    <p className="text-richblack-300 text-xs md:text-sm">{item.p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Navbar Section */}
        <section className="bg-richblack-800 p-5 md:p-8 rounded-2xl border border-richblack-700">
          <h2 className="text-xl md:text-2xl font-bold text-blue-100 mb-6 flex items-center gap-3 justify-center md:justify-start">
            <FaNetworkWired className="text-blue-300 shrink-0" />
            6. Creating "NAVBAR"
          </h2>
          <div className="space-y-6">
            <div className="bg-richblack-900 p-3 md:p-4 rounded-lg border-l-4 border-blue-500 text-richblack-200 text-xs md:text-sm text-center md:text-left">
              <p>Path: <span className="text-white font-mono">src/components/common/Navbar.jsx</span></p>
            </div>
            <ul className="space-y-4 text-richblack-200 text-xs sm:text-sm md:text-base">
              <li className="flex gap-3">
                <div className="bg-richblack-700 p-2 rounded-full h-fit shrink-0"><FaArrowRight className="text-blue-200 text-xs" /></div>
                <span>Uses <code className="text-blue-100 font-mono">data/navbar-links.js</code> for dynamic link rendering.</span>
              </li>
              <li className="flex gap-3">
                <div className="bg-richblack-700 p-2 rounded-full h-fit shrink-0"><FaArrowRight className="text-blue-200 text-xs" /></div>
                <span><strong className="text-white">Catalog Logic:</strong> Fetches categories from backend API; requires <code>useState</code> to manage data.</span>
              </li>
              <li className="flex gap-3">
                <div className="bg-richblack-700 p-2 rounded-full h-fit shrink-0"><FaArrowRight className="text-blue-200 text-xs" /></div>
                <span><strong className="text-white">Auth Behaviour:</strong> Conditional rendering for Login/Signup or Profile account based on state.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* --- REDUX TOOLKIT SECTION START --- */}
        <section className="py-16 space-y-12 border-t border-richblack-800">
          <div className="mx-auto w-11/12 max-w-maxContent">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                6.1 NOW HERE COMES IN PICTURE : <HighLightText text="REDUX TOOLKIT" />
              </h2>
              <p className="text-richblack-300">Centralized State Management for a Scalable Frontend</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Redux Installation & Setup */}
              <div className="bg-richblack-800 p-8 rounded-2xl border border-richblack-700">
                <h3 className="text-xl font-bold text-blue-100 mb-6 flex items-center gap-3">
                  <FaProjectDiagram className="text-blue-400" />
                  Redux Toolkit Setup
                </h3>
                <div className="space-y-4 text-sm font-mono">
                  <p className="text-richblack-200">1. Go to official document and run:</p>
                  <div className="bg-richblack-900 p-3 rounded text-yellow-100 border border-richblack-600">
                    npm install @reduxjs/toolkit react-redux
                  </div>
                  
                  <p className="text-richblack-200 pt-4">2. Wrap Provider in main.jsx:</p>
                  <div className="bg-richblack-900 p-3 rounded text-blue-200 border border-richblack-600">
                    import &#123; Provider &#125; from 'react-redux'<br/>
                    &lt;Provider store=&#123;store&#125;&gt;<br/>
                    &nbsp;&nbsp;&lt;BrowserRouter&gt;<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;App /&gt;<br/>
                    &nbsp;&nbsp;&lt;/BrowserRouter&gt;<br/>
                    &lt;/Provider&gt;
                  </div>
                </div>
              </div>

              {/* Store Configuration */}
              <div className="bg-richblack-800 p-8 rounded-2xl border border-richblack-700">
                <h3 className="text-xl font-bold text-purple-100 mb-6 flex items-center gap-3">
                  <FaCogs className="text-purple-400" />
                  3 & 4. store.jsx Configuration
                </h3>
                <div className="bg-richblack-900 p-6 rounded-xl font-mono text-sm text-purple-200 border border-richblack-700 mb-4">
                  src/redux/store.jsx<br/><br/>
                  import &#123; configureStore &#125; from "@reduxjs/toolkit";<br/>
                  export const store = configureStore(&#123;<br/>
                  &nbsp;&nbsp;reducer:&#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;auth : authReducer,<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;profile : profileReducer,<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;cart : cartReducer<br/>
                  &nbsp;&nbsp;&#125;<br/>
                  &#125;)
                </div>
              </div>
            </div>

            {/* Folder Structure Update */}
            <div className="mt-8 bg-richblack-800 p-6 rounded-2xl border border-richblack-700">
              <h3 className="text-lg font-bold text-white mb-4">5. Updated Redux Folder Structure</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-richblack-900 p-4 rounded text-green-200 font-mono text-xs">
                  src<br/>
                  ├── pages/Home.jsx<br/>
                  ├── redux <span className="text-white font-bold">&lt;-- NEW</span><br/>
                  │&nbsp;&nbsp;&nbsp;├── slices<br/>
                  │&nbsp;&nbsp;&nbsp;└── store.jsx<br/>
                  ├── App.jsx | main.jsx
                </div>
                <p className="text-richblack-300 text-sm flex items-center">
                  Go to the slices folder to create required slices for authentication, user profiles, and shopping cart management.
                </p>
              </div>
            </div>

            {/* Slice Breakdown */}
            <div className="mt-12 space-y-8">
              {/* Slice 1: Auth */}
              <div className="bg-gradient-to-r from-richblack-800 to-richblack-900 p-8 rounded-2xl border border-richblack-700">
                <h3 className="text-2xl font-bold text-yellow-50 mb-4">6.2 SLICE - 1 : authSlice.jsx</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-richblack-200 text-sm">
                  <li className="flex gap-2"><FaArrowRight className="text-yellow-400 mt-1"/> Single source of truth for auth state across the app.</li>
                  <li className="flex gap-2"><FaArrowRight className="text-yellow-400 mt-1"/> Centralizes data to be accessed by any component.</li>
                  <li className="flex gap-2"><FaArrowRight className="text-yellow-400 mt-1"/> Token persisted using localStorage for persistence after refresh.</li>
                  <li className="flex gap-2"><FaArrowRight className="text-yellow-400 mt-1"/> setToken: Updates login/logout | setLoading: Controls async loaders.</li>
                </ul>
              </div>

              {/* Slice 2: Cart */}
              <div className="bg-gradient-to-r from-richblack-800 to-richblack-900 p-8 rounded-2xl border border-richblack-700">
                <h3 className="text-2xl font-bold text-blue-50 mb-4">6.3 SLICE - 2 : cartSlice.jsx</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                  {[
                    { t: "1. Initialize State", d: "totalItems from localStorage or 0" },
                    { t: "2. Set Cart Count", d: "Update totalItems & sync to storage" },
                    { t: "3. Add to Cart", d: "Increment totalItems & update storage" },
                    { t: "4. Remove from Cart", d: "Decrement totalItems (min 0) & update" },
                    { t: "5. Reset Cart", d: "Set to 0 & clear localStorage" }
                  ].map((item, i) => (
                    <div key={i} className="bg-richblack-900 p-4 rounded-xl border border-blue-500/30">
                      <h4 className="text-blue-100 font-bold text-xs mb-2 uppercase">{item.t}</h4>
                      <p className="text-richblack-400 text-xs">{item.d}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Slice 3: Profile */}
              <div className="bg-gradient-to-r from-richblack-800 to-richblack-900 p-8 rounded-2xl border border-richblack-700">
                <h3 className="text-2xl font-bold text-green-50 mb-4">6.4 SLICE - 3 : profileSlice.jsx</h3>
                <div className="space-y-4 text-richblack-200">
                  <p className="flex items-center gap-2"><FaUserCheck className="text-green-400"/> Allows components (Navbar, Dashboard) to access user data directly.</p>
                  <p className="flex items-center gap-2"><FaShieldAlt className="text-green-400"/> Avoids prop drilling through deep component trees.</p>
                  <div className="bg-richblack-900 p-4 rounded-lg border border-green-900/50">
                    <span className="text-white font-bold">setUser</span> is used to: Save data after login, Update profile details, or Clear data on logout.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* --- REDUX TOOLKIT SECTION END --- */}

        {/* --- BACKEND - FRONTEND CONNECTION SECTION START --- */}
<section className="py-16 space-y-12 border-t border-richblack-800">
  <div className="mx-auto w-11/12 max-w-maxContent">
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold text-white mb-4">
        6.5 BACKEND - <HighLightText text="FRONTEND CONNECTION" />
      </h2>
      <p className="text-richblack-300">Fetching Dynamic Categories for the Navbar Catalog</p>
    </div>

    {/* Setup Explanation */}
    <div className="bg-richblack-800 p-8 rounded-2xl border border-richblack-700 mb-8">
      <p className="text-richblack-200 mb-6">
        Since the backend <code className="text-yellow-100">server/controllers/Category.jsx</code> has the <code className="text-yellow-100">showAllCategories</code> API, we must establish a connection to call it.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-blue-100 flex items-center gap-2">
            <FaFolder className="text-blue-400"/> SETUP: src/services
          </h3>
          <p className="text-richblack-300 text-sm">
            Created a <strong>services</strong> folder for all API connections, endpoints, and centralized API calls.
          </p>
          <ul className="space-y-2 text-sm text-richblack-200">
            <li><strong>1. apiconnector.jsx:</strong> Centralized Axios handler to avoid repeating setup.</li>
            <li><strong>2. api.jsx:</strong> Contains the Base URL (env-based) and all endpoints.</li>
          </ul>
        </div>
        
        <div className="bg-richblack-900 p-4 rounded-xl border border-richblack-600 font-mono text-[10px] sm:text-xs text-green-200">
          <p className="text-white mb-2 underline italic">COMPLETE FOLDER STRUCTURE</p>
          src<br/>
          ├── assets<br/>
          ├── components<br/>
          │&nbsp;&nbsp;&nbsp;├── common (Navbar.jsx, Footer.jsx)<br/>
          │&nbsp;&nbsp;&nbsp;└── core/HomePage (CodeBlocks, CTAButton, etc.)<br/>
          ├── data<br/>
          ├── pages (Home.jsx)<br/>
          ├── redux<br/>
          │&nbsp;&nbsp;&nbsp;├── slices (authSlice, cartSlice, profileSlice)<br/>
          │&nbsp;&nbsp;&nbsp;└── store.jsx<br/>
          ├── services <span className="text-white font-bold">&lt;-- NEW</span><br/>
          │&nbsp;&nbsp;&nbsp;├── apiconnector.jsx<br/>
          │&nbsp;&nbsp;&nbsp;└── api.jsx<br/>
          ├── App.jsx | index.jsx | main.jsx
        </div>
      </div>
    </div>

    {/* Code Implementation */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* api.jsx */}
      <div className="bg-richblack-800 p-6 rounded-2xl border border-richblack-700">
        <h4 className="text-sm font-bold text-richblack-400 mb-3 font-mono">// src/services/api.jsx</h4>
        <div className="bg-richblack-900 p-4 rounded-lg font-mono text-xs text-blue-200 border border-richblack-600">
          const BASE_URL = import.meta.env.VITE_BASE_URL;<br/>
          console.log("BASE URL:", BASE_URL);<br/><br/>
          <span className="text-pink-300">// CATEGORIES API</span><br/>
          export const categories = &#123;<br/>
          &nbsp;&nbsp;CATEGORIES_API: `$&#123;BASE_URL&#125;/course/showAllCategories`,<br/>
          &#125;;
        </div>
      </div>

      {/* apiconnector.jsx */}
      <div className="bg-richblack-800 p-6 rounded-2xl border border-richblack-700">
        <h4 className="text-sm font-bold text-richblack-400 mb-3 font-mono">// src/services/apiconnector.jsx</h4>
        <div className="bg-richblack-900 p-4 rounded-lg font-mono text-xs text-green-200 border border-richblack-600">
          import axios from "axios";<br/>
          export const axiosInstance = axios.create(&#123;&#125;);<br/>
          export const apiConnector = (method, url, bodyData, headers, params) =&gt; &#123;<br/>
          &nbsp;&nbsp;return axiosInstance(&#123;<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;method: `$&#123;method&#125;`,<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;url: `$&#123;url&#125;`,<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;data: bodyData ? bodyData : null,<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;headers: headers ? headers : null,<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;params: params ? params : null,<br/>
          &nbsp;&nbsp;&#125;);<br/>
          &#125;;
        </div>
      </div>
    </div>

    {/* Integration in Navbar */}
    <div className="mt-12 bg-richblack-800 p-8 rounded-2xl border border-richblack-700">
      <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <FaArrowRight className="text-yellow-100" /> AGAIN GO BACK INSIDE NAVBAR.jsx
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-richblack-900 p-5 rounded-xl border border-richblack-600 font-mono text-xs text-blue-100">
          const [subLinks, setSubLinks] = useState([]);<br/><br/>
          useEffect(() =&gt; &#123;<br/>
          &nbsp;&nbsp;const fetchCategorySublinks = async () =&gt; &#123;<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;try &#123;<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const result = await apiConnector(<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"GET", categories.CATEGORIES_API<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;);<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;console.log(result.data.data);<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;setSubLinks(result.data.data);<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&#125; catch (error) &#123;<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;console.log("Could not fetch Categories.", error);<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&#125;<br/>
          &nbsp;&nbsp;&#125;;<br/>
          &nbsp;&nbsp;fetchCategorySublinks();<br/>
          &#125;, []);
        </div>

        <div className="space-y-4">
          <div className="bg-richblack-700/50 p-4 rounded-lg border-l-4 border-green-500">
            <p className="text-richblack-100 font-bold mb-2">SUCCESSFUL API RESPONSE:</p>
            <div className="font-mono text-[10px] text-green-300">
              Array(2)<br/>
              [<br/>
              &nbsp;&nbsp;&#123;<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;description: "Courses that teach frontend, backend, and full-stack...",<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;name: "Web Development",<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;_id: "68f7be011282b3fb05478a87"<br/>
              &nbsp;&nbsp;&#125;,<br/>
              &nbsp;&nbsp;&#123;<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;description: "Yeeeeeeeeeee.",<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;name: "Pythonnn",<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;_id: "68f7bef156dca3dc9da41dac"<br/>
              &nbsp;&nbsp;&#125;<br/>
              ]
            </div>
          </div>
          <p className="text-richblack-300 text-sm italic">
            Now the 'subLinks' variable holds the backend data, allowing the Navbar catalog to render categories dynamically.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
{/* --- BACKEND - FRONTEND CONNECTION SECTION END --- */}

{/* --- AUTHENTICATION FLOW SECTION START --- */}
<section className="py-16 space-y-12 border-t border-richblack-800">
  <div className="mx-auto w-11/12 max-w-maxContent">
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold text-white mb-4">
        7. AUTHENTICATION FLOW : <HighLightText text="LOGIN & SIGNUP" />
      </h2>
      <p className="text-richblack-300">Building the Secure Gateway for Students & Instructors</p>
    </div>

    {/* Login & Signup Pages */}
    <div className="bg-richblack-800 p-8 rounded-2xl border border-richblack-700 mb-8">
      <h3 className="text-2xl font-bold text-blue-100 mb-6">
        Creating Login.jsx & SignUp.jsx
      </h3>
      <p className="text-richblack-200 mb-6">
        These pages utilize <code className="text-yellow-100">Template.jsx</code> to maintain a consistent UI, housing the 
        <code className="text-yellow-100">LoginForm.jsx</code> and <code className="text-yellow-100">SignupForm.jsx</code> components.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-richblack-900 p-6 rounded-xl border border-richblack-600">
          <h4 className="text-pink-200 font-bold mb-4 font-mono">// LoginForm.jsx - Dispatch Logic</h4>
          <div className="bg-richblack-800 p-4 rounded-lg font-mono text-xs text-blue-100">
            const handleOnSubmit = (e) =&gt; &#123;<br/>
            &nbsp;&nbsp;e.preventDefault()<br/>
            &nbsp;&nbsp;dispatch(login(email, password, navigate))<br/>
            &#125;<br/><br/>
            <span className="text-richblack-400">// This dispatches the login function imported from services/operations/authAPI.jsx</span>
          </div>
        </div>

        <div className="flex flex-col justify-center space-y-4">
          <div className="bg-richblack-700/50 p-4 rounded-lg border-l-4 border-yellow-500">
            <h4 className="text-white font-bold mb-2 flex items-center gap-2">
               <FaArrowRight className="text-yellow-100"/> Account Type Selection (Tab)
            </h4>
            <p className="text-richblack-200 text-sm">
              The <strong>Tab</strong> component is used to select account type (Student or Instructor) for a better UI/UX compared to dropdowns or radio buttons.
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Signup Flow */}
    
    <div className="bg-gradient-to-br from-richblack-800 to-richblack-900 p-8 rounded-2xl border border-richblack-700">
      <h3 className="text-2xl font-bold text-green-100 mb-6">The Signup Flow Strategy</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { step: "1", text: "User fills signup form" },
          { step: "2", text: "User selects Student / Instructor (Tab)" },
          { step: "3", text: "User submits form" },
          { step: "4", text: "OTP is sent to email" },
          { step: "5", text: "User enters OTP" },
          { step: "6", text: "Signup completes using stored data" }
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-4 bg-richblack-800 p-4 rounded-lg border border-richblack-700">
            <span className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold">{item.step}</span>
            <p className="text-richblack-200 text-sm">{item.text}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Updated Folder Structure */}
    <div className="mt-12 bg-richblack-800 p-8 rounded-2xl border border-richblack-700">
      <h3 className="text-xl font-bold text-white mb-6">Final Comprehensive Folder Structure</h3>
      <div className="bg-richblack-900 p-6 rounded-xl font-mono text-[11px] sm:text-xs text-blue-200 overflow-x-auto">
        src<br/>
        ├── assets<br/>
        ├── components<br/>
        │&nbsp;&nbsp;&nbsp;├── common<br/>
        │&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;├── Navbar.jsx | Footer.jsx<br/>
        │&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;└── Tab.jsx <span className="text-white font-bold">&lt;-- REUSABLE TAB COMPONENT</span><br/>
        │&nbsp;&nbsp;&nbsp;└── core<br/>
        │&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── HomePage (CodeBlocks, CTAButton, etc.)<br/>
        │&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── auth <span className="text-white font-bold">&lt;-- AUTH COMPONENTS</span><br/>
        │&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── LoginForm.jsx | SignupForm.jsx | Template.jsx<br/>
        ├── data<br/>
        ├── pages<br/>
        │&nbsp;&nbsp;&nbsp;├── Home.jsx | Login.jsx | SignUp.jsx<br/>
        ├── redux<br/>
        │&nbsp;&nbsp;&nbsp;├── slices (authSlice, cartSlice, profileSlice)<br/>
        │&nbsp;&nbsp;&nbsp;└── store.jsx<br/>
        ├── services<br/>
        │&nbsp;&nbsp;&nbsp;├── apiconnector.jsx | api.jsx<br/>
        │&nbsp;&nbsp;&nbsp;└── operations <span className="text-white font-bold">&lt;-- AUTH LOGIC (authAPI.jsx)</span><br/>
        │&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── authAPI.jsx (login, signup, logout, reset-password)<br/>
        ├── utils<br/>
        │&nbsp;&nbsp;&nbsp;└── constants.jsx <span className="text-white font-bold">&lt;-- APP-WIDE CONSTANTS</span><br/>
        ├── App.jsx | index.jsx | main.jsx
      </div>
    </div>
  </div>
</section>
{/* --- AUTHENTICATION FLOW SECTION END --- */}

{/* --- ERROR PAGE & RESET FLOW START --- */}
<section className="py-16 space-y-12 border-t border-richblack-800">
  <div className="mx-auto w-11/12 max-w-maxContent">
    
    {/* 7. Error Page */}
    <div className="bg-richblack-800 p-8 rounded-2xl border border-richblack-700 mb-12">
      <h2 className="text-3xl font-bold text-white mb-6">7. Pages/Error.jsx</h2>
      <div className="bg-richblack-900 p-6 rounded-xl border border-pink-500/50">
        <p className="text-pink-200 font-mono text-sm mb-4">// Added to App.jsx for undefined routes</p>
        <div className="font-mono text-xs text-blue-100">
          &lt;Route path="*" element=&#123;&lt;Error /&gt;&#125; /&gt;
        </div>
        <div className="mt-4 p-4 bg-richblack-800 rounded border border-richblack-700 text-center text-2xl text-white italic">
           Error - 404 Not Found
        </div>
      </div>
    </div>

    {/* 8 & 9. Password Reset Logic */}
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold text-white mb-4">
        8 & 9. <HighLightText text="SIGN-IN & SIGNUP PROCESS" />
      </h2>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Login Flow */}
      <div className="bg-richblack-800 p-8 rounded-2xl border border-richblack-700">
        <h3 className="text-2xl font-bold text-blue-100 mb-4 flex items-center gap-2"><FaArrowRight/> LOGIN PROCESS</h3>
        <ul className="space-y-4 text-richblack-300 text-sm">
          <li>• <strong className="text-white">Route:</strong> /login renders Template &lt;-- LoginForm</li>
          <li>• <strong className="text-white">Action:</strong> Submit calls <code>dispatch(login(email, password, navigate))</code></li>
          <li>• <strong className="text-white">Logic:</strong> Connected to <code>authAPI.jsx</code> which hits Backend API.</li>
          <li>• <strong className="text-white">Slices:</strong> Updates Redux via <code>dispatch(setUser(...))</code> and navigates to Dashboard.</li>
        </ul>
      </div>

      {/* Forgot Password Flow */}
      <div className="bg-richblack-800 p-8 rounded-2xl border border-richblack-700">
        <h3 className="text-2xl font-bold text-yellow-100 mb-4 flex items-center gap-2"><FaArrowRight/> FORGOT PASSWORD</h3>
        <ul className="space-y-4 text-richblack-300 text-sm">
          <li>• <strong className="text-white">Route:</strong> /forgot-password. Calls <code>dispatch(getPasswordResetToken(email, setEmailSent))</code>.</li>
          <li>• <strong className="text-white">setEmailSent:</strong> If true, UI updates to "Check Email" with "Resend" option.</li>
          <li>• <strong className="text-white">Link:</strong> Received in email (e.g., localhost:5173/update-password/:id).</li>
          <li>• <strong className="text-white">Update:</strong> Submit calls <code>dispatch(resetPassword(token, password, confirmPassword, navigate))</code>.</li>
        </ul>
      </div>
    </div>

    {/* SignUp Process Detailed */}
    <div className="mt-12 bg-gradient-to-br from-richblack-800 to-richblack-900 p-8 rounded-2xl border border-richblack-700">
      <h3 className="text-2xl font-bold text-green-100 mb-6 flex items-center gap-2"><FaArrowRight/> SIGN-UP PROCESS</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <p className="text-richblack-200">Main Logic in <strong>Signup Form</strong> uses two functions:</p>
          <div className="bg-richblack-900 p-4 rounded-lg font-mono text-xs text-blue-200 space-y-2">
            <p>1. dispatch(setSignupData(signupData)) <span className="text-richblack-400">// Updates authSlice</span></p>
            <p>2. dispatch(sendOtp(formData.email, navigate)) <span className="text-richblack-400">// authAPI funcn sends OTP</span></p>
          </div>
          <p className="text-richblack-300 text-sm italic">Navigate successfully lands user on "/verify-email".</p>
        </div>
        <div className="bg-richblack-800 p-5 rounded-xl border border-richblack-700">
          <h4 className="text-white font-bold mb-2">VERIFY-EMAIL:</h4>
          <p className="text-richblack-300 text-xs mb-4">useEffect checks if signup data exists; if not, redirects to /signUp.</p>
          <div className="bg-richblack-900 p-3 rounded font-mono text-[10px] text-green-200">
            dispatch(signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate));
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* --- ABOUT-US & CONTACT PAGE START --- */}
<section className="py-16 space-y-12">
  <div className="mx-auto w-11/12 max-w-maxContent">
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold text-white mb-4">
        10. CREATING <HighLightText text="ABOUT-US PAGE" />
      </h2>
    </div>

    

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="bg-richblack-800 p-8 rounded-2xl border border-richblack-700">
        <h3 className="text-xl font-bold text-white mb-6">Components of About Page</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-richblack-200 text-sm">
          <div className="p-3 bg-richblack-900 rounded border border-richblack-600">1. Stats.jsx</div>
          <div className="p-3 bg-richblack-900 rounded border border-richblack-600">2. Quote.jsx</div>
          <div className="p-3 bg-richblack-900 rounded border border-richblack-600">3. LearningGrid.jsx</div>
          <div className="p-3 bg-richblack-900 rounded border border-richblack-600">4. ContactFormSection.jsx</div>
        </div>
      </div>

      <div className="bg-richblack-800 p-8 rounded-2xl border border-richblack-700">
        <h3 className="text-xl font-bold text-purple-100 mb-6 flex items-center gap-2">
           <FaArrowRight className="text-purple-400"/> REACT-HOOK-FORM (ContactPage)
        </h3>
        <p className="text-richblack-300 text-sm mb-4 font-mono">npm install react-hook-form 🟣🟣🟣🟣✅✅</p>
        <div className="bg-richblack-900 p-4 rounded-lg font-mono text-xs text-purple-200 border border-richblack-600">
          import &#123; useForm &#125; from "react-hook-form";<br/><br/>
          <span className="text-white">// isDirty flag:</span> tells you if the input has been changed from its default value.
        </div>
      </div>
    </div>

    {/* FULL FOLDER STRUCTURE */}
    <div className="mt-12 bg-richblack-800 p-8 rounded-2xl border border-richblack-700 overflow-x-auto">
      <h3 className="text-xl font-bold text-white mb-6">Complete Folder Structure Update</h3>
      <div className="font-mono text-xs text-blue-200 whitespace-pre">
src
│
├── assets
│
├── components
│   ├── common (Navbar.jsx, Footer.jsx, Tab.jsx)
│   │
│   └── cors
│       ├── HomePage (CodeBlocks.jsx, ...)
│       ├── <span className="text-white font-bold">AboutPage (Stats.jsx, Quote.jsx, LearningGrid.jsx)</span>
│       ├── <span className="text-white font-bold">ContactPage (ContactUsForm.jsx)</span>
│       └── auth (LoginForm.jsx, SignupForm.jsx, Template.jsx)
│
├── data
│
├── pages
│   ├── Home.jsx | Login.jsx | SignUp.jsx | <span className="text-white font-bold">Error.jsx</span>
│   └── <span className="text-white font-bold">About.jsx</span>
│
├── redux (slices, store.jsx)
│
├── services
│   ├── apiconnector.jsx | api.jsx
│   └── operations (authAPI.jsx)
│
├── utils (constants.jsx)
│
├── App.jsx | index.jsx | main.jsx
      </div>
    </div>
  </div>
</section>
{/* --- ABOUT-US & CONTACT PAGE END --- */}

{/* --- DASHBOARD & PROFILE MANAGEMENT START --- */}
<section className="py-16 space-y-12 border-t border-richblack-800">
  <div className="mx-auto w-11/12 max-w-maxContent">
    
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold text-white mb-4">
        11. THE <HighLightText text="DASHBOARD PAGE" />
      </h2>
      <p className="text-richblack-300">Centralized User Management & Instructor Controls</p>
    </div>

    {/* Sidebar & Layout */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-richblack-800 p-8 rounded-2xl border border-richblack-700">
        <h3 className="text-2xl font-bold text-blue-100 mb-6 flex items-center gap-3">
          <FaLayerGroup className="text-blue-400" /> 11.1 SIDEBAR ARCHITECTURE
        </h3>
        <ul className="space-y-4 text-richblack-300 text-sm">
          <li className="flex gap-2"><FaArrowRight className="mt-1 text-blue-200"/> <strong className="text-white">Layout:</strong> Uses <code>&lt;Sidebar/&gt;</code> and <code>&lt;Outlet/&gt;</code> for nested route rendering.</li>
          <li className="flex gap-2"><FaArrowRight className="mt-1 text-blue-200"/> <strong className="text-white">Mapping:</strong> Iterates over <code>data/dashboard-links.js</code> to generate <code>SidebarLink.jsx</code>.</li>
          <li className="flex gap-2"><FaArrowRight className="mt-1 text-blue-200"/> <strong className="text-white">Logout Logic:</strong> Sidebar contains a logout button that triggers a <code>ConfirmationModal.jsx</code>.</li>
          <li className="flex gap-2"><FaArrowRight className="mt-1 text-blue-200"/> <strong className="text-white">Icons:</strong> Utilizing VSC prefix icons for a consistent developer-tool aesthetic.</li>
        </ul>
      </div>

      <div className="bg-richblack-800 p-8 rounded-2xl border border-richblack-700">
        <h3 className="text-2xl font-bold text-yellow-100 mb-6 flex items-center gap-3">
          <FaCogs className="text-yellow-400" /> 11.2 MY-PROFILE & SETTINGS
        </h3>
        <p className="text-richblack-200 text-sm mb-4">
          Rendered at <code>dashboard/my-profile</code>, this section allows users to view and manage their identity.
        </p>
        <div className="bg-richblack-900 p-4 rounded-lg border border-richblack-600">
          <h4 className="text-white font-bold mb-2">SettingsPage Components:</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-yellow-200 font-mono">
            <div>• ChangeProfilePicture.jsx</div>
            <div>• DeleteAccount.jsx</div>
            <div>• ProfileInformation.jsx</div>
            <div>• UpdatePassword.jsx</div>
          </div>
        </div>
      </div>
    </div>

    {/* Profile Slice & Logic */}
    <div className="mt-12 bg-richblack-800 p-8 rounded-2xl border border-richblack-700">
      <h3 className="text-2xl font-bold text-green-100 mb-6">Updating Profile Slice (Redux)</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-richblack-900 p-5 rounded-xl font-mono text-xs text-blue-100 border border-richblack-600">
          const profileSlice = createSlice(&#123;<br/>
          &nbsp;&nbsp;name:"profile",<br/>
          &nbsp;&nbsp;initialState: &#123;<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;user: localStorage.getItem("user") ? JSON.parse(...) : null,<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;enrolledCourses: [],<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;loading: false<br/>
          &nbsp;&nbsp;&#125;,<br/>
          &nbsp;&nbsp;reducers: &#123;<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;setUser: (state, value) =&gt; &#123; state.user = value.payload; &#125;,<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;setLoading: (state, value) =&gt; &#123; state.loading = value.payload; &#125;,<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;setEnrolledCourses: (state, action) =&gt; &#123; state.enrolledCourses = action.payload; &#125;<br/>
          &nbsp;&nbsp;&#125;<br/>
          &#125;);
        </div>
        <div className="space-y-4">
          <div className="bg-richblack-700/50 p-4 rounded-lg border-l-4 border-yellow-500">
            <h4 className="text-white font-bold mb-1 uppercase text-xs">Technical Note: Enrolled Courses</h4>
            <p className="text-richblack-200 text-xs">
              Unlike User/Token which are stored in slices upon login, <strong>Enrolled Courses</strong> are fetched via a normal function call to the backend. This avoids making the login payload excessively heavy and illogical.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-richblack-900 border border-richblack-600 rounded-full text-[10px] text-pink-200 font-mono">react-rating-stars-component</span>
            <span className="px-3 py-1 bg-richblack-900 border border-richblack-600 rounded-full text-[10px] text-blue-200 font-mono">react-dropzone</span>
            <span className="px-3 py-1 bg-richblack-900 border border-richblack-600 rounded-full text-[10px] text-green-200 font-mono">video-react</span>
          </div>
        </div>
      </div>
    </div>

    {/* COMPLETE VERTICAL FOLDER STRUCTURE - NO HORIZONTAL SCROLL */}
    <div className="mt-12 bg-richblack-800 p-8 rounded-2xl border border-richblack-700">
      <h3 className="text-xl font-bold text-white mb-6">Complete Vertical Folder Structure</h3>
      <div className="bg-richblack-900 p-6 rounded-xl font-mono text-[11px] sm:text-xs text-blue-200 whitespace-pre-wrap break-all leading-relaxed">
src
│
├── assets
│   ├── Logo
│   ├── Images
│   └── TimeLineIcons
│
├── components
│   ├── common
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Tab.jsx
│   │   ├── <span className="text-white font-bold">ConfirmationModal.jsx</span>
│   │   └── <span className="text-white font-bold">IconBtn.jsx</span>
│   │
│   └── cors
│       ├── HomePage
│       │   ├── CodeBlocks.jsx
│       │   ├── CTAButton.jsx
│       │   ├── ExploreMore.jsx
│       │   ├── HighLightText.jsx
│       │   ├── LearningLanguageSection.jsx
│       │   ├── ProfileDropDown.jsx
│       │   └── TimeLineSection.jsx
│       │
│       ├── AboutPage
│       │   ├── Stats.jsx
│       │   ├── Quote.jsx
│       │   ├── LearningGrid.jsx
│       │   └── ContactFormSection.jsx
│       │
│       ├── ContactPage
│       │   └── ContactUsForm.jsx
│       │
│       └── auth
│           ├── LoginForm.jsx
│           ├── SignupForm.jsx
│           └── Template.jsx
│
├── data
│   ├── dashboard-links.js
│   ├── footer-links.js
│   ├── homepage-explore.js
│   └── navbar-links.js
│
├── pages
│   ├── About.jsx
│   ├── Error.jsx
│   ├── ForgotPassword.jsx
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── SignUp.jsx
│   ├── UpdatePassword.jsx
│   ├── VerifyEmail.jsx
│   │
│   └── <span className="text-white font-bold">DashboardPage</span>
│       ├── Dashboard.jsx (Layout with Outlet)
│       ├── Sidebar.jsx
│       ├── SidebarLink.jsx
│       ├── MyProfile.jsx
│       ├── Settings.jsx
│       │
│       └── SettingsPage
│           ├── ChangeProfilePicture.jsx
│           ├── DeleteAccount.jsx
│           ├── ProfileInformation.jsx
│           └── UpdatePassword.jsx
│
├── redux
│   ├── slices
│   │   ├── authSlice.jsx
│   │   ├── cartSlice.jsx
│   │   ├── profileSlice.jsx
│   │   └── <span className="text-white font-bold">courseSlice.jsx</span>
│   │
│   └── store.jsx
│
├── services
│   ├── api.jsx
│   ├── apiconnector.jsx
│   │
│   └── operations
│       ├── authAPI.jsx
│       ├── <span className="text-white font-bold">settingsAPI.jsx</span>
│       └── profileAPI.jsx
│
├── utils
│   ├── avgRating.js
│   ├── constants.jsx
│   └── formatDate.js
│
├── App.jsx
├── index.css
├── index.js
└── main.jsx
      </div>
    </div>
  </div>
</section>
{/* --- DASHBOARD & PROFILE MANAGEMENT END --- */}


{/* --- ADVANCED ROUTING & TECHNICAL INSIGHTS START --- */}
<section className="py-16 space-y-12 border-t border-richblack-800">
  <div className="mx-auto w-11/12 max-w-maxContent">
    
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold text-white mb-4">
        12. ADVANCED <HighLightText text="ROUTING & TECHNICAL FIXES" />
      </h2>
      <p className="text-richblack-300">Handling Guarded Routes, Dynamic Icons, and OTP Logic</p>
    </div>

    {/* Route Guarding & Navigation */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-richblack-800 p-8 rounded-2xl border border-richblack-700">
        <h3 className="text-2xl font-bold text-purple-100 mb-6 flex items-center gap-3">
          <FaShieldAlt className="text-purple-400" /> OpenRoutes vs PrivateRoutes 🟣
        </h3>
        <p className="text-richblack-300 text-sm mb-4">
          Guarding routes ensures that only logged-in users access the Dashboard, while logged-out users can only access Login/Signup.
        </p>
        <div className="bg-richblack-900 p-4 rounded-lg border border-richblack-600 font-mono text-xs text-blue-200">
          {/* For all Invalid Routes */}
          &lt;Route path='*' element=&#123;&lt;Error /&gt;&#125; /&gt;
        </div>
      </div>

      <div className="bg-richblack-800 p-8 rounded-2xl border border-richblack-700">
        <h3 className="text-2xl font-bold text-blue-100 mb-6 flex items-center gap-3">
          <FaCogs className="text-blue-400" /> Dynamic Icon Rendering 🟣
        </h3>
        <div className="bg-richblack-900 p-4 rounded-lg border border-richblack-600 font-mono text-xs text-green-200">
          import * as Icons from "react-icons/vsc" <br/><br/>
          function SiderbarLink(&#123;link&#125;) &#123;<br/>
          &nbsp;&nbsp;const Icon = Icons[link.icon]<br/>
          &nbsp;&nbsp;return &lt;Icon /&gt;<br/>
          &#125;
        </div>
      </div>
    </div>

    {/* Bug Report & Navigation Logic */}
    <div className="bg-richblack-800 p-8 rounded-2xl border border-richblack-700">
      <h3 className="text-2xl font-bold text-pink-100 mb-6">Critical Debugging & Logic 🟣</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="bg-pink-900/20 p-4 rounded-lg border-l-4 border-pink-500">
            <h4 className="text-white font-bold text-sm">Backend Bug Alert: Population</h4>
            <p className="text-richblack-300 text-xs">
              If <code>console.log(user?.additionalDetails)</code> prints an ID instead of actual data, the backend controller is missing the <code>.populate()</code> call.
            </p>
          </div>
          <div className="bg-yellow-900/20 p-4 rounded-lg border-l-4 border-yellow-500">
            <h4 className="text-white font-bold text-sm">Navigation Trap: Missing "/"</h4>
            <p className="text-richblack-300 text-xs">
              <code>onClick=&#123;()=&gt; navigate("dashboard/edit")&#125;</code> appends to current URL. <br/>
              Always use <code>"/dashboard/edit"</code> for absolute paths.
            </p>
          </div>
        </div>

        <div className="bg-richblack-900 p-5 rounded-xl border border-richblack-600 font-mono text-xs text-blue-100">
          <p className="text-white font-bold mb-2">useParams() Logic:</p>
          const &#123;courseId&#125; = useParams();<br/>
          // Path: "/dashboard/edit-course/:courseId"<br/>
          // URL: .../edit-course/12345<br/>
          // courseId = 12345
        </div>
      </div>
    </div>

    {/* OTP Implementation */}
    <div className="mt-12 bg-richblack-800 p-8 rounded-2xl border border-richblack-700">
      <h3 className="text-2xl font-bold text-green-100 mb-6">Modern OTP Input 🟣</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <p className="text-richblack-300 text-sm">
            Transitioning from the old <code>react-otp-input</code> to the modern, performant <code>input-otp</code> library.
          </p>
          <div className="bg-richblack-900 p-4 rounded-lg border border-richblack-600 font-mono text-xs text-green-200">
            npm install input-otp <br/>
            import &#123; InputOTP, InputOTPSlot &#125; from "input-otp";
          </div>
        </div>
        <div className="bg-richblack-700/30 p-4 rounded-lg border border-richblack-600">
           <h4 className="text-white font-bold mb-2 text-sm">Schema Expiry Logic:</h4>
           <div className="font-mono text-xs text-yellow-100">
              createdAt: &#123;<br/>
              &nbsp;&nbsp;type: Date,<br/>
              &nbsp;&nbsp;default: Date.now, // NOT Date.now()<br/>
              &nbsp;&nbsp;expires: 5*60 // 5 minutes<br/>
              &#125;
           </div>
        </div>
      </div>
    </div>

    {/* Crucial React Lesson */}
    <div className="mt-8 bg-blue-900/10 p-6 rounded-xl border border-blue-500/50 text-center">
      <h3 className="text-xl font-bold text-white mb-2">JSX &#123; &#125; ≠ Delayed Execution 🟣</h3>
      <p className="text-richblack-200 text-sm">
        Brackets in JSX mean <strong className="text-white">"evaluate this now"</strong>, not "run later". This is why we use arrow functions for event handlers to prevent immediate execution on render.
      </p>
    </div>
  </div>
</section>
{/* --- ADVANCED ROUTING & TECHNICAL INSIGHTS END --- */}

        {/* Closing Reflecton */}
        <section className="py-12 text-center border-t border-richblack-800">
          <HiOutlineCog className="text-5xl text-richblack-500 mx-auto mb-4 animate-spin-slow" />
          <h3 className="text-2xl font-bold text-white mb-4">Implementation Complete</h3>
          <p className="text-richblack-400 max-w-2xl mx-auto">
            This frontend architecture ensures a scalable, reusable, and logic-driven UI for the StudyNotion platform.
          </p>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default MyJourney;