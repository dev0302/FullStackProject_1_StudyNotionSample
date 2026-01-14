import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { IoIosArrowBack, IoMdCheckmarkCircle } from "react-icons/io"
import { BsChevronDown } from "react-icons/bs"
import IconBtn from '../../common/IconBtn'

export default function VideoDetailsSiderbar({ setReviewModal }) {
  const [activeStatus, setActiveStatus] = useState("")
  const [videoBarActive, setVideoBarActive] = useState("")
  const navigate = useNavigate()
  const location = useLocation()
  const { sectionId, subSectionId } = useParams()
  
  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse)

  useEffect(() => {
    if (!courseSectionData.length) return;
    const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId)
    const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex((data) => data._id === subSectionId)
    const activeSubSectionId = courseSectionData?.[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id
    
    setActiveStatus(courseSectionData?.[currentSectionIndex]?._id)
    setVideoBarActive(activeSubSectionId)
  }, [courseSectionData, location.pathname])

  return (
    // ✅ Responsive Logic: 
    // Mobile: Full width (11/12), automatic height, scrollable content.
    // Desktop: Fixed width (320px), Full height (calc).
    <div className="flex h-auto md:h-[calc(100vh-3.5rem)] w-full md:w-[320px] flex-col border-b md:border-b-0 md:border-r border-richblack-700 bg-richblack-800 transition-all duration-300">
      
      {/* HEADER SECTION */}
      <div className="mx-4 md:mx-5 flex flex-col border-b border-richblack-700 py-4 md:py-6 gap-y-4">
        <div className="flex w-full items-center justify-between">
          <button 
            onClick={() => navigate("/dashboard/enrolled-courses")}
            className="flex h-8 w-8 md:h-9 md:w-9 items-center justify-center rounded-full bg-richblack-700 text-richblack-100"
            title="Back"
          >
            <IoIosArrowBack size={20} />
          </button>
          <IconBtn 
            text="Add Review" 
            customClasses="!py-1 !px-3 md:!py-2 md:!px-4 text-xs md:text-sm" 
            onClick={() => setReviewModal(true)} 
          />
        </div>
        
        <div className="space-y-2">
          <h1 className='text-sm md:text-lg font-bold text-richblack-5'>{courseEntireData?.courseName}</h1>
          <div className="flex flex-col gap-1">
            <div className='flex justify-between text-[10px] md:text-xs font-semibold text-richblack-400'>
              <span>Course Progress</span>
              <span className='text-yellow-50'>{Math.round((completedLectures?.length / totalNoOfLectures) * 100) || 0}%</span>
            </div>
            <div className='h-1.5 w-full bg-richblack-700 rounded-full overflow-hidden'>
               <div 
                 className='h-full bg-yellow-50 transition-all duration-1000' 
                 style={{ width: `${(completedLectures?.length / totalNoOfLectures) * 100}%` }}
               ></div>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT LIST */}
      <div className="flex-1 overflow-y-auto custom-scrollbar max-h-[400px] md:max-h-full">
        {courseSectionData.map((section, index) => (
          <div key={index} className="flex flex-col border-b border-richblack-700/50 md:border-none">
            
            <div 
              className={`flex cursor-pointer items-center justify-between px-4 md:px-5 py-4 transition-all ${activeStatus === section?._id ? "bg-richblack-700/50" : "hover:bg-richblack-700/30"}`}
              onClick={() => setActiveStatus(activeStatus === section._id ? "" : section._id)}
            >
              <span className="text-xs md:text-sm font-bold text-richblack-5">{section?.sectionName}</span>
              <BsChevronDown className={`text-richblack-400 transition-all ${activeStatus === section?._id ? "rotate-180" : "rotate-0"}`} />
            </div>

            <div className={`overflow-hidden transition-all duration-300 ${activeStatus === section?._id ? "max-h-[1000px] pb-2" : "max-h-0"}`}>
              {section.subSection.map((topic, i) => {
                const isCompleted = completedLectures.includes(topic?._id);
                const isActive = videoBarActive === topic._id;
                
                return (
                  <div
                    key={i}
                    className={`relative flex items-center gap-3 px-6 md:px-8 py-3 cursor-pointer transition-all
                      ${isActive ? "bg-yellow-900/20 text-yellow-50 border-r-4 border-yellow-50" : "text-richblack-200 hover:bg-richblack-700/40"}`}
                    onClick={() => {
                      navigate(`/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic?._id}`)
                      setVideoBarActive(topic._id)
                    }}
                  >
                    {isCompleted ? (
                      <IoMdCheckmarkCircle className="text-caribbeangreen-200 text-lg shrink-0" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border-2 border-richblack-500 shrink-0" />
                    )}
                    <span className={`text-xs ${isActive ? "font-bold" : "font-medium"}`}>
                      {topic.title}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}