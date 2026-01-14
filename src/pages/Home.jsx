import React from 'react'
import { NavLink } from 'react-router-dom';
import { FaArrowRight, FaTerminal } from "react-icons/fa";
import HighLightText from '../components/core/HomePage/HighLightText';
import CTAButton from '../components/core/HomePage/CTAButton';
import banner from "../assets/Images/banner.mp4"
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import TimeLineSection from '../components/core/HomePage/TimeLineSection';
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection';
import Instructor from "../assets/Images/Instructor.png";
import ExploreMore from '../components/core/HomePage/ExploreMore';
import Footer from '../components/common/Footer';


function Home() {
  return (
    <div className='overflow-hidden'>

      {/* SECTION 1 - Hero & Code Sections */}
      <div className="flex flex-col relative mx-auto items-center text-white justify-between w-11/12 gap-8 sm:gap-10">

        {/* Become an Instructor Button */}
        <NavLink to="/signUp" >
          <div className="mt-16 p-1 mx-auto bg-richblack-800 text-richblack-200 font-bold rounded-full duration-200 transition-all hover:scale-95 w-fit group drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]">
            <div className="flex flex-row items-center gap-2 rounded-full duration-200 transition-all px-6 sm:px-10 py-[5px] group-hover:bg-richblack-900">
              <p className='text-sm sm:text-base'>Become an Instructor</p>
              <FaArrowRight size={14}/>
            </div>
          </div>
        </NavLink>

        {/* Hero Heading & Subheading */}
        <div className='max-w-[913px]'>
          <h1 className='text-center text-3xl sm:text-4xl lg:text-5xl font-semibold'>
            Empower Your Future with
            <HighLightText text={"Coding Skills"}></HighLightText>
          </h1>

          <p className='mt-4 sm:mt-6 text-center text-base sm:text-lg mx-auto font-bold text-richblack-300 w-[95%] sm:w-[90%]'>
            With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
          </p>
        </div>
        {/* --- PERSONAL TOUCH / DEVELOPER NOTE --- */}
        <div className="mt-10 w-full max-w-[913px] bg-richblack-800 border border-dashed border-yellow-50 p-4 sm:p-6 rounded-2xl flex flex-col sm:flex-row items-center gap-4 sm:gap-6 shadow-[0_0_20px_rgba(255,214,10,0.1)]">
           <div className="bg-richblack-100 p-4 rounded-full text-richblack-900 shrink-0">
              <FaTerminal size={14} />
           </div>
           <div className="text-center sm:text-left">
              <p className="text-blue-400/80 font-bold text-xl mb-1">Hey there! Welcome to my Dev Lab </p>
              <p className="text-richblack-300 text-sm sm:text-base leading-relaxed italic">
                 I'm currently building this as a major learning project. It’s a fully functional MERN stack platform. 
                 <b> Go ahead—Sign Up and Log In!</b> Use dummy data to test the dashboard, enroll in courses, or create 
                 your own as an instructor. It's all built for testing and exploration.
              </p>
           </div>
        </div>
        

        {/* CTA Buttons */}
        <div className='flex flex-row gap-4 mt-8 sm:mt-10'>
          <CTAButton active={true} linkto="/signUp">
              Learn More
          </CTAButton>
          <CTAButton active={false} linkto="/login">
              Book a Demo
          </CTAButton>
        </div>

        {/* Hero Video Section */}
        <div className='mx-2 sm:mx-8 mt-10 sm:mt-16 shadow-[10px_-5px_50px_-5px] shadow-blue-200 mb-16 sm:mb-24 relative'>
          <video muted loop autoPlay className='shadow-[10px_10px_rgba(255,255,255)] sm:shadow-[20px_20px_rgba(255,255,255)] rounded-lg'>
              <source src={banner} type="video/mp4"/>
          </video>
        </div>

        {/* Code Block 1 */}
        <div className='w-full'>
          <CodeBlocks
            position={"flex-col lg:flex-row"}
            heading={
              <div className="text-3xl sm:text-4xl font-semibold">
                Unlock your
                <HighLightText text={"coding potential"} /> with our online
                courses.
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btnText: "Try it Yourself",
              link: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              link: "/signup",
              active: false,
            }}
            codeColor={"text-yellow-25"}
            codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
            backgroundGradient={<div className="codeblock1 absolute"></div>}
          />
        </div>

        {/* Code Block 2 */}
        <div className='w-full mb-10 sm:mb-20'>
          <CodeBlocks
            position={"flex-col lg:flex-row-reverse"}
            heading={
              <div className="w-full text-3xl sm:text-4xl font-semibold lg:w-[50%]">
                Start
                <HighLightText text={"coding in seconds"} />
              </div>
            }
            subheading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctabtn1={{
              btnText: "Continue Lesson",
              link: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              link: "/signup",
              active: false,
            }}
            codeColor={"text-white"}
            codeblock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
            backgroundGradient={<div className="codeblock2 absolute"></div>}
          />
        </div>

        {/* Unlock Power Section (Explore More) */}
        <ExploreMore />
      </div>

      {/* SECTION 2 - White Background Section */}
      <div className='bg-pure-greys-5 text-richblack-700'>
        {/* Checkered Background with Buttons */}
        <div className='homepage_bg h-[280px] sm:h-[320px]'>
          <div className='mt-12 flex justify-center items-center gap-4 sm:gap-7 pt-32 sm:pt-48'>
            <CTAButton active={true} linkto={"/signUp"}>
                <div className='flex items-center gap-2'>
                    Explore Full Catalog
                    <FaArrowRight size={14}/>
                </div>
            </CTAButton>
            <CTAButton active={false} linkto={"/signUp"}>
                Learn More
            </CTAButton>
          </div>
        </div>

        {/* Skills & Timeline Container */}
        <div className='flex flex-col relative max-w-maxContent mx-auto w-11/12 gap-10 sm:gap-20 mt-12 sm:mt-24 pb-16 sm:pb-24 text-richblack-50'>
          
          {/* Section Heading & Subheading */}
          <div className='flex flex-col lg:flex-row gap-10 lg:gap-2 justify-between'>
            <div className='w-full lg:w-[45%]'>
              <h2 className='text-3xl sm:text-4xl font-semibold text-center lg:text-left'>
                Get the skills you need for a
                <HighLightText text={"job that is in demand."}></HighLightText>
              </h2>
            </div>

            <div className='w-full lg:w-[50%] flex flex-col items-center lg:items-start gap-8 sm:gap-10'>
              <p className='text-base sm:text-[17px] text-center lg:text-left font-medium text-richblack-200'>
                The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
              </p>
              <div className='w-fit'>
                <CTAButton active={true} linkto={"/signUp"}>Learn More</CTAButton>
              </div>
            </div>
          </div>

          <TimeLineSection />
          <LearningLanguageSection />
        </div>
      </div>

      {/* SECTION 3 - Instructor Section */}
      <div className='flex flex-col relative mx-auto items-center text-white justify-between w-11/12 gap-16 sm:gap-24 mt-16 sm:mt-32 mb-16 sm:mb-24'>
          
          {/* Instructor Visual & Text */}
          <div className='flex flex-col lg:flex-row justify-between items-center gap-12 lg:gap-20'>
            {/* Left Image Div */}
            <div className='w-full lg:w-[50%] flex justify-center'>
              <img 
                src={Instructor} 
                alt="Instructor" 
                className='shadow-white shadow-[-10px_-10px_0_0] sm:shadow-[-20px_-20px_0_0] object-contain w-full max-w-[500px] lg:max-w-none'
              />
            </div>

            {/* Right Content Div */}
            <div className='w-full lg:w-[50%] flex flex-col gap-8 sm:gap-10 items-center lg:items-start'>
                <h1 className='text-3xl sm:text-4xl lg:text-5xl font-semibold text-center lg:text-left lg:max-w-[70%]'>
                  Become an 
                  <HighLightText text={"instructor"}></HighLightText>
                </h1>
                <p className='font-medium tracking-tight text-sm sm:text-base lg:text-[18px] text-center lg:text-left text-richblack-300 lg:max-w-[90%]'>
                  Instructors from across the globe educate millions of learners on StudyNotion, using our tools and resources to share their expertise and passion.
                </p>
                <div className='w-fit'>
                  <CTAButton active={true} linkto={"/signUp"}>
                      <div className='flex items-center gap-2'>
                        Start Teaching Today
                        <FaArrowRight />
                      </div>
                  </CTAButton>
                </div>
            </div>
          </div>

          {/* Review Heading */}
          <div className='flex flex-col gap-4 items-center'>
             <h1 className='text-3xl sm:text-4xl font-semibold text-center'>
                Reviews from other learners
             </h1>
             {/* Reviews Slider would go here */}
          </div>
      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  )
}

export default Home;