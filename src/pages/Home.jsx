import React from 'react'
import { NavLink } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
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

      {/* section-1 */}

      <div  className="flex flex-col relative mx-auto items-center text-white justify-between w-11/12 gap-6">

        <NavLink to="/signUp" >

          <div className="mt-16 p-1 mx-auto bg-richblack-800 text-richblack-200 font-bold rounded-full duration-200 transition-all hover:scale-95 w-fit group drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]">

            <div className="flex flex-row items-center gap-2 rounded-full duration-200 transition-all px-10 py-[5px] group-hover:bg-richblack-900">

              <p>Become an Instructor</p>
              <FaArrowRight size={14}/>

            </div>

          </div>
        </NavLink>

        {/* text div */}
        <div className=''>

          <h1 className='text-center text-4xl font-semibold'>
            Empower Your Future with
            <HighLightText text={"Coding Skills"}></HighLightText>
          </h1>

          <p className='mt-6 text-center text-lg mx-auto font-bold text-richblack-300 w-[90%]'>With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.</p>

        </div>

        {/* buttons */}
        <div className='flex gap-4 mt-10'>

          <CTAButton active={true} linkto="/signUp">
              Learn More
          </CTAButton>

          <CTAButton active={false} linkto="/login">
              Book a Demo
          </CTAButton>

        </div>

        {/* video */}
        <div className='HOMEPAGE_VIDEO mx-8 mt-12 shadow-[10px_-5px_50px_-5px] shadow-blue-200 mb-20'>
          <video muted loop autoPlay className='shadow-[20px_20px_rgba(255,255,255)]'>
              <source src={banner} type="video/mp4"/>
          </video>
        </div>

        {/* ----code section-1---- */}
        {/* Code Section 1  */}
          <div>
            <CodeBlocks
              position={"lg:flex-row"}
              heading={
                <div className="text-4xl font-semibold">
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

          {/* Code Section 2 */}
          <div>
            <CodeBlocks
              position={"lg:flex-row-reverse"}
              heading={
                <div className="w-[100%] text-4xl font-semibold lg:w-[50%]">
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

          {/* Unlock the Power of Code */}
          <ExploreMore></ExploreMore>


      </div>



      {/* setion-2 */}
      <div className='bg-pure-greys-5 text-richblack-700'>

        {/* stylish bg a nd btns (section-1) */}
        <div className='homepage_bg h-[300px]'>

          {/* btns */}
          <div className='flex justify-center items-center gap-6 pt-52'>
            <CTAButton active={true} linkto={"/signUp"}>
              Explore Full Catalog</CTAButton>

            <CTAButton active={false} linkto={"/signUp"}>
              Learn More</CTAButton>
          </div>

        </div>

        {/* get the skills.... */}
        <div className='flex flex-col relative max-w-maxContent mx-auto w-11/12 gap-6 mt-20'>

          {/* text section */}
          <div className='flex gap-2 flex-row '>
            
            {/* left sectinion starts-------- */}
            <div className='w-[50%]'>
              <h2 className='text-4xl font-semibold lg:w-[80%]'>
                Get the skills you need for a
                <HighLightText text={"job that is in demand."}></HighLightText>
              </h2>
            </div>

            {/* left sectinion ends-------- */}

            {/* right sectinion starts-------- */}
            <div className='w-[50%] '>
              <div className='mx-auto lg:w-[80%] flex flex-col gap-10'>
                <p className='text-[17px] '>The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>

                <CTAButton active={true} linkto={"/signUp"}>Learn More</CTAButton>
              </div>
            </div>

            {/* right sectinion ends-------- */}
          </div>

          {/* timeline section (section-2) */}
          <TimeLineSection></TimeLineSection>

          {/* LearningLanguageSection (section-3) */}
          <LearningLanguageSection></LearningLanguageSection>

        </div>

      </div>

      

      {/* section-3 */}

      <div className='flex flex-col relative mx-auto items-center text-white justify-between w-11/12 gap-6 mt-20 mb-20 '>

             {/* (inner section-1) */}
             <div className='flex justify-between flex-row items-center gap-20'>

                 {/* left div */}
                <div className='w-[50%]'>
                  <img src={Instructor} alt="nf" className='shadow-white shadow-[-20px_-20px_0_0]'/>
                </div>

                {/* right div */}
                <div className='w-[50%]'>
                  <div className='mx-auto flex flex-col gap-10'>
                      <h1 className='text-4xl font-semibold max-w-[60%]'>
                        Become an 
                        <HighLightText text={"instructor"}></HighLightText>
                      </h1>
                      <p className='font-medium tracking-tight text-[18px] text-justify text-richblack-300 max-w-[90%]'>Instructors from across the globe educate millions of learners on StudyNotion, using our tools and resources to share their expertise and passion.</p>
                      <CTAButton active={true} linkto={"/signUp"}>Start Teaching Today</CTAButton>
                    </div>
                  </div>

             </div>


             {/* inner section-2 (Reviews from other learners) */}

             <h1 className='text-4xl font-semibold mt-8'>Reviews from other learners</h1>

              
          
      </div>



      {/* setion-4 (Footer) */}
      <Footer></Footer>

    </div>
  )
}

export default Home;