import FoundingStory from "../assets/Images/FoundingStory.png"
import BannerImage1 from "../assets/Images/aboutus1.webp"
import BannerImage2 from "../assets/Images/aboutus2.webp"
import BannerImage3 from "../assets/Images/aboutus3.webp"
import Footer from "../components/common/Footer"
import ContactFormSection from "../components/core/AboutPage/ContactFormSection"
import LearningGrid from "../components/core/AboutPage/LearningGrid"
import Quote from "../components/core/AboutPage/Quote"
import StatsComponenet from "../components/core/AboutPage/Stats"
import HighLightText from "../components/core/HomePage/HighLightText"

function About() {
  return (
    <div className="bg-[#000814] selection:bg-yellow-50/20 scroll-smooth">
      
      {/* SECTION 1: Hero Section */}
      <section className="bg-richblack-900 relative border-b border-white/5 overflow-visible">
        {/* Abstract Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>

        <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-center text-white pb-[100px] lg:pb-[250px]">
          
          <header className="mx-auto py-16 lg:py-24 text-4xl lg:text-6xl font-bold tracking-tighter lg:w-[80%] z-10">
            Building Skills, Confidence & Careers for a <br className="hidden sm:block"/>
            <HighLightText text={"Better Tomorrow"} />
            
            <p className="mx-auto mt-6 text-center text-base lg:text-lg font-medium text-richblack-300 lg:w-[85%] leading-relaxed">
              This platform is more than just courses — it’s a space created to
              help curious minds grow, experiment, and turn learning into real-world
              impact. Every feature here is built with learners in mind.
            </p>
          </header>

          {/* Banner Images: Responsive Grid */}
          <div className="absolute bottom-0 left-[50%] grid w-full translate-x-[-50%] translate-y-[30%] lg:translate-y-[50%] grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-10 px-4 max-w-maxContent">
            {[BannerImage1, BannerImage2, BannerImage3].map((img, index) => (
              <div key={index} className={`rounded-[24px] border border-white/10 bg-richblack-800/20 p-2 backdrop-blur-md shadow-2xl transition-all hover:scale-105 duration-500 ${index === 0 ? "block" : "hidden sm:block"}`}>
                <img 
                  src={img} 
                  alt={`Banner ${index}`} 
                  className="w-full aspect-[4/3] rounded-[18px] object-cover bg-richblack-900/50 shadow-inner" 
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spacing for Absolute Banners - Adjusted for Mobile */}
      <div className="h-[150px] lg:h-[200px] bg-[#000814]"></div>

      {/* SECTION 2: Quote Section */}
      <section className="bg-[#000814] py-10 lg:py-20">
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-center text-center">
          <Quote />
        </div>
      </section>

      {/* SECTION 3: Founding Story */}
      <section className="bg-[#000814] py-20">
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col gap-24">
          
          <div className="flex flex-col-reverse items-center gap-10 lg:gap-16 lg:flex-row justify-between bg-richblack-800/20 border border-white/5 p-6 lg:p-16 rounded-[30px] lg:rounded-[40px] hover:border-white/10 transition-colors">
            <div className="flex lg:w-[50%] flex-col gap-8">
              <h2 className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-3xl lg:text-4xl font-bold text-transparent tracking-tight">
                How It All Started
              </h2>
              <div className="space-y-6">
                <p className="text-base lg:text-lg font-medium text-richblack-300 leading-relaxed">
                  This journey started with a simple realization — learning online
                  shouldn’t feel confusing or disconnected. I wanted to create something 
                  I personally would love using.
                </p>
                <p className="text-base lg:text-lg font-medium text-richblack-300 leading-relaxed">
                  After spending countless hours on different platforms, this idea took 
                  shape — a platform focusing on clarity, consistency, and real progress.
                </p>
              </div>
            </div>

            {/* Illustration */}
            <div className="lg:w-[45%] flex justify-center">
              <div className="relative p-2 lg:p-4 rounded-[32px] bg-gradient-to-br from-white/5 to-transparent border border-white/10 shadow-2xl">
                <img
                  src={FoundingStory}
                  alt="Founding Story"
                  className="max-h-[250px] lg:max-h-[300px] w-auto object-contain drop-shadow-[0_0_20px_rgba(252,103,103,0.3)]"
                />
              </div>
            </div>
          </div>

          {/* Vision & Mission Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="flex flex-col gap-6 p-8 lg:p-10 rounded-[32px] border border-white/5 bg-richblack-800/30 hover:bg-richblack-800/40 transition-all">
              <h3 className="bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-2xl lg:text-3xl font-bold text-transparent tracking-tight">
                My Vision
              </h3>
              <p className="text-base lg:text-lg text-richblack-300 leading-relaxed">
                Make quality learning accessible, practical, and genuinely helpful. 
                No fluff, just focused learning paths that move you forward.
              </p>
            </div>

            <div className="flex flex-col gap-6 p-8 lg:p-10 rounded-[32px] border border-white/5 bg-richblack-800/30 hover:bg-richblack-800/40 transition-all">
              <h3 className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] bg-clip-text text-2xl lg:text-3xl font-bold text-transparent tracking-tight">
                My Mission
              </h3>
              <p className="text-base lg:text-lg text-richblack-300 leading-relaxed">
                Build a community where people practice, ask questions, and gain 
                confidence. Learning should feel empowering, not intimidating.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Stats Component */}
      <div className="bg-richblack-800/50 border-y border-white/5 py-16 lg:py-20">
        <StatsComponenet />
      </div>

      {/* SECTION 5: Learning Grid & Contact */}
      <section className="mx-auto py-24 flex w-11/12 max-w-maxContent flex-col gap-20 lg:gap-32 text-white">
        <LearningGrid />
        
        <div className="bg-richblack-800/20 border border-white/5 rounded-[30px] lg:rounded-[40px] p-6 lg:p-20 transition-all hover:border-white/10 shadow-inner">
           <ContactFormSection />
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default About