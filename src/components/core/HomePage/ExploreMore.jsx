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
    <div className="mt-20 flex flex-col gap-6 w-full mx-auto">
        {/* text div */}
        <div className="flex flex-col gap-2 text-center">
            <h1 className="text-4xl text-white font-semibold">
                Unlock the
                <HighLightText text={"Power of Code"}></HighLightText>
            </h1>

            <p className="text-[20px] text-richblack-300 font-semibold">Learn to Build Anything You Can Imagine</p>
        </div>

        {/* tabs div */}
        <div className="rounded-full flex flex-row gap-6 bg-richblack-800  text-richblack-200 font-semibold drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] p-1 mx-auto">

            {
                HomePageExplore.map((course,index)=>{
                    return(
                        <button className={`hover:text-white hover:bg-richblack-900 py-[7px] px-8 rounded-full transition-all duration-200 ${currentTab == course.tag ? "bg-richblack-900 text-white " : ""}`} 

                        onClick={()=>{setMyCards(course.tag)}}
                        
                        key={index}>

                            {course.tag}

                        </button>
                    )
                })
            }

        </div>

        {/* cards div */}

        <div className=" translate-y-[50%] w-full flex gap-10 -mt-32">
            {
                courses.map((course,index)=>{
                    return(
                        <div className={`bg-richblack-800 px-6 py-8 w-[360px] lg:w-[30%] min-h-[320px] cursor-pointer flex flex-col justify-between ${course.heading == currentCard  ? "shadow-[12px_12px_0_0] shadow-yellow-50 bg-white text-black" : "text-richblack-5"} transition-all duration-200`}

                        key={index}
                        
                        onClick={() => setCurrentCard(course.heading)}
                        >
                            {/* text div */}
                            <div className="flex flex-col gap-2">
                                <h1 className="text-2xl font-semibold">{course.heading}</h1>
                                <p className="font-normal text-[16px] text-richblack-300">{course.description}</p>
                            </div>

                            {/* dotted line */}
                            <div className="border border-b-[2px] border-richblack-400 border-dashed bottom-10">

                            </div>

                            {/* card footer */}
                            <div className={`flex justify-between text-richblack-300 ${course.heading == currentCard ? "" : ""}`}>
                                <div className="flex gap-2 justify-center items-center">
                                    <HiUsers></HiUsers>
                                    <p>{course.level}</p>
                                </div>
                                <div className="flex gap-2 justify-center items-center">
                                    <ImTree></ImTree>
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