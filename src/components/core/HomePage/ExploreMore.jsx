import { useState } from "react"
import HighLightText from "./HighLightText"
import { HomePageExplore } from "../../../data/homepage-explore"
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";

function ExploreMore() {

    const [currentTab, setCurrentTab] = useState(HomePageExplore[0].tag);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading)

    function setMyCards(value){
        setCurrentTab(value);
        const selectedTab = HomePageExplore.find((course) => course.tag === value);
        setCourses(selectedTab.courses);
        setCurrentCard(selectedTab.courses[0].heading);
    }
    

  return (
    <div className="mt-10 lg:mt-20 flex flex-col gap-6 w-full mx-auto relative items-center">
        {/* text div */}
        <div className="flex flex-col gap-2 text-center px-4">
            <h1 className="text-3xl lg:text-4xl text-white font-semibold">
                Unlock the
                <HighLightText text={"Power of Code"}></HighLightText>
            </h1>

            <p className="text-richblack-300 text-sm lg:text-[20px] font-semibold mt-1">
                Learn to Build Anything You Can Imagine
            </p>
        </div>

        {/* tabs div - Added horizontal scroll for mobile and wrap-prevention */}
        <div className="hidden lg:flex flex-row rounded-full bg-richblack-800 text-richblack-200 font-semibold drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] p-1 mx-auto transition-all duration-200">
            {
                HomePageExplore.map((course,index)=>{
                    return(
                        <button className={`hover:text-white hover:bg-richblack-900 py-[7px] px-8 rounded-full transition-all duration-200 cursor-pointer ${currentTab === course.tag ? "bg-richblack-900 text-white " : ""}`} 
                        onClick={()=>{setMyCards(course.tag)}}
                        key={index}>
                            {course.tag}
                        </button>
                    )
                })
            }
        </div>

        {/* Mobile Tabs Version - Scrollable */}
        <div className="flex lg:hidden flex-row gap-2 bg-richblack-800 p-2 rounded-full overflow-x-auto max-w-[95%] no-scrollbar">
            {
                HomePageExplore.map((course,index)=>{
                    return(
                        <button className={`whitespace-nowrap py-2 px-6 rounded-full text-xs transition-all duration-200 ${currentTab === course.tag ? "bg-richblack-900 text-white" : "text-richblack-200"}`} 
                        onClick={()=>{setMyCards(course.tag)}}
                        key={index}>
                            {course.tag}
                        </button>
                    )
                })
            }
        </div>

        {/* Height spacer for absolute positioning behavior */}
        <div className="hidden lg:block lg:h-[150px]"></div>

        {/* cards div - Changed to flex-col on mobile, flex-row on desktop */}
        <div className="lg:absolute lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] w-full flex flex-col lg:flex-row items-center lg:justify-between gap-10 px-4 lg:px-0 z-10">
            {
                courses.map((course,index)=>{
                    return(
                        <div className={`px-6 py-8 w-[100%] max-w-[400px] lg:max-w-[360px] min-h-[300px] cursor-pointer flex flex-col justify-between transition-all duration-200
                        ${course.heading === currentCard 
                            ? "shadow-[12px_12px_0_0] shadow-yellow-50 bg-white text-black" 
                            : "bg-richblack-800 text-richblack-5"}`}
                        key={index}
                        onClick={() => setCurrentCard(course.heading)}
                        >
                            {/* text div */}
                            <div className="flex flex-col gap-3">
                                <h1 className={`text-xl font-semibold ${course.heading === currentCard ? "text-richblack-800" : "text-richblack-5"}`}>
                                    {course.heading}
                                </h1>
                                <p className="font-normal text-[16px] text-richblack-400">
                                    {course.description}
                                </p>
                            </div>

                            {/* dotted line */}
                            <div className={`border-b-[2px] border-dashed mt-8 mb-4 ${course.heading === currentCard ? "border-richblack-50" : "border-richblack-600"}`}></div>

                            {/* card footer */}
                            <div className={`flex justify-between font-medium ${course.heading === currentCard ? "text-blue-300" : "text-richblack-300"}`}>
                                <div className="flex gap-2 items-center">
                                    <HiUsers />
                                    <p>{course.level}</p>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <ImTree />
                                    <p>{course.lessionNumber} Lession</p>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
        
    </div>
  )
}

export default ExploreMore