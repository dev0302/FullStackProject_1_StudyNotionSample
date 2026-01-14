import ContactFormSection from "../components/core/AboutPage/ContactFormSection"

function Contact() {
  return (
    <div className="min-h-screen bg-[#000814] py-10 sm:py-20 selection:bg-white/20">
      {/* ✅ Responsive Width: 11/12 on mobile, 9/12 on tablet, max content for desktop */}
      <div className="mx-auto flex w-10/12 md:w-9/12 lg:w-7/12 max-w-[900px] flex-col justify-between gap-10 text-white"> 
        
        {/* Themed Wrapper Card */}
        {/* ✅ Adjusted padding for mobile: p-6 vs desktop: p-14 */}
        <div className="relative rounded-[32px] border border-richblack-800 bg-richblack-900/50 p-6 sm:p-8 md:p-14 transition-all duration-500 hover:border-richblack-700 shadow-2xl">
          
          {/* Subtle Glow Accent (High Performance) */}
          <div className="absolute -top-[1px] -left-[1px] h-20 w-20 rounded-tl-[32px] border-t border-l border-white/10 pointer-events-none"></div>

          <div className="relative z-10 text-center">
            {/* ✅ Responsive Header Font size */}
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tighter mb-2">
              Got an Idea? We’ve got the skills.
            </h1>
            <p className="text-richblack-300 mb-8 sm:mb-10 text-base sm:text-lg">
              Tell us more about yourself and what you’re got in mind.
            </p>
            
            <ContactFormSection />
          </div>

          {/* Bottom Accent */}
          <div className="absolute -bottom-[1px] -right-[1px] h-20 w-20 rounded-br-[32px] border-b border-r border-white/5 pointer-events-none"></div>
        </div>
        
      </div>
    </div>
  )
}

export default Contact