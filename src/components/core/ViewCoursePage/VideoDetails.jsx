import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { BigPlayButton, Player } from 'video-react'
import 'video-react/dist/video-react.css'
import { updateCompletedLectures } from '../../../redux/slices/viewCourseSlice'
import { markLectureAsComplete } from "../../../services/operations/courseDetailAPI"

export default function VideoDetails() {
  const { courseId, sectionId, subSectionId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const playerRef = useRef()
  
  const { token } = useSelector((state) => state.auth)
  const { courseSectionData, courseEntireData, completedLectures } = useSelector((state) => state.viewCourse)

  const [videoData, setVideoData] = useState([])
  const [videoEnd, setVideoEnd] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const setVideoSpecificDetails = async () => {
      if (!courseSectionData.length) return
      
      const section = courseSectionData.find((sec) => sec._id === sectionId)
      const video = section?.subSection.find((sub) => sub._id === subSectionId)
      
      setVideoData(video)
      setVideoEnd(false)
    }
    setVideoSpecificDetails()
  }, [courseSectionData, sectionId, subSectionId])

  const isFirstVideo = () => {
    return courseSectionData[0]?.subSection[0]?._id === subSectionId
  }

  const isLastVideo = () => {
    const lastSection = courseSectionData[courseSectionData.length - 1]
    const lastVideo = lastSection?.subSection[lastSection.subSection.length - 1]
    return lastVideo?._id === subSectionId
  }

  const goToNextVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex((sec) => sec._id === sectionId)
    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex((sub) => sub._id === subSectionId)

    if (currentSubSectionIndex !== courseSectionData[currentSectionIndex].subSection.length - 1) {
      const nextSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex + 1]._id
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`)
    } else {
      const nextSectionId = courseSectionData[currentSectionIndex + 1]._id
      const nextSubSectionId = courseSectionData[currentSectionIndex + 1].subSection[0]._id
      navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`)
    }
  }

  const goToPrevVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex((sec) => sec._id === sectionId)
    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex((sub) => sub._id === subSectionId)

    if (currentSubSectionIndex !== 0) {
      const prevSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex - 1]._id
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`)
    } else {
      const prevSectionId = courseSectionData[currentSectionIndex - 1]._id
      const prevSectionLength = courseSectionData[currentSectionIndex - 1].subSection.length
      const prevSubSectionId = courseSectionData[currentSectionIndex - 1].subSection[prevSectionLength - 1]._id
      navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`)
    }
  }

  const handleLectureCompletion = async () => {
    setLoading(true)
    const res = await markLectureAsComplete({ courseId, subSectionId }, token)
    if (res) {
      dispatch(updateCompletedLectures(subSectionId))
    }
    setLoading(false)
  }

  return (
    /* ✅ Optimized padding for mobile (px-2) vs desktop (px-4) */
    <div className="flex flex-col gap-4 sm:gap-6 text-white py-6 sm:py-12 px-2 sm:px-4 lg:px-8 max-w-[1000px] mx-auto min-h-screen selection:bg-yellow-100/30">
      
      {/* Breadcrumb Info: Hidden on tiny screens to save vertical space */}
      <div className="hidden xs:flex items-center justify-between text-[10px] sm:text-xs font-medium text-richblack-400 uppercase tracking-widest">
        <span className="truncate max-w-[80%]">{courseEntireData?.courseName} / {videoData?.title}</span>
      </div>

      {!videoData ? (
        <div className="aspect-video grid place-items-center bg-richblack-800 rounded-2xl border border-richblack-700">
           <p className="text-sm sm:text-xl text-richblack-200 animate-pulse">Select a lecture to start learning</p>
        </div>
      ) : (
        <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl border border-richblack-700 bg-black shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <Player
            ref={playerRef}
            aspectRatio="16:9"
            playsInline
            onEnded={() => setVideoEnd(true)}
            src={videoData?.videoUrl}
          >
            <BigPlayButton position="center" className="hover:scale-110 transition-transform" />

            {/* ✅ FULLY RESPONSIVE OVERLAY */}
            {videoEnd && (
              <div 
                style={{ backgroundImage: "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.3), rgb(0, 0, 0))" }}
                className="absolute inset-0 z-[100] flex flex-col items-center justify-center backdrop-blur-[4px] sm:backdrop-blur-[6px]"
              >
                <div className="flex flex-col items-center gap-y-3 sm:gap-y-6 px-4 w-full max-w-[90%] text-center animate-in fade-in zoom-in duration-300">
                  
                  {/* Mark as Completed */}
                  {!completedLectures.includes(subSectionId) && (
                    <button
                      disabled={loading}
                      onClick={() => handleLectureCompletion()}
                      className="w-full sm:w-auto bg-yellow-50 px-6 sm:px-10 py-2 sm:py-3 text-richblack-900 font-bold rounded-md hover:scale-95 transition-all disabled:bg-richblack-500 text-sm sm:text-base"
                    >
                      {loading ? "Processing..." : "Mark as Completed"}
                    </button>
                  )}

                  {/* Rewatch */}
                  <button
                    onClick={() => {
                      playerRef.current?.seek(0);
                      playerRef.current?.play();
                      setVideoEnd(false);
                    }}
                    className="text-richblack-5 underline underline-offset-4 sm:underline-offset-8 decoration-yellow-50/50 hover:text-yellow-50 transition-all font-medium text-xs sm:text-base"
                  >
                    Rewatch Video
                  </button>

                  {/* Nav Buttons: Stacks vertically on mobile, row on sm+ */}
                  <div className="mt-4 sm:mt-10 flex flex-col sm:flex-row items-center gap-3 sm:gap-x-6 w-full sm:w-auto">
                    {!isFirstVideo() && (
                      <button
                        onClick={goToPrevVideo}
                        className="w-full sm:w-auto px-6 py-2 rounded-full border border-richblack-600 bg-richblack-800/60 text-richblack-5 text-xs sm:text-sm font-semibold"
                      >
                        ← Previous
                      </button>
                    )}
                    {!isLastVideo() && (
                      <button
                        onClick={goToNextVideo}
                        className="w-full sm:w-auto px-8 py-2 rounded-full bg-richblack-5 text-richblack-900 font-bold text-xs sm:text-sm"
                      >
                        Next Lecture →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </Player>
        </div>
      )}

      {/* Video Content Information */}
      <div className="mt-2 sm:mt-4 space-y-2 sm:space-y-4">
        <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight text-richblack-5">
          {videoData?.title}
        </h1>
        <div className="h-[1px] w-full bg-richblack-800"></div>
        <div className="bg-richblack-800/40 p-4 sm:p-6 rounded-xl border border-richblack-700/50">
           <p className="text-sm sm:text-lg text-richblack-200 leading-relaxed">
             {videoData?.description}
           </p>
        </div>
      </div>
    </div>
  )
}