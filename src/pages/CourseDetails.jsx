import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux" // Assuming you use Redux for user state
import { fetchCourseDetails } from "../services/operations/courseDetailAPI"
import RatingStars from "../components/common/RatingStars"
import GetAvgRating from "../utils/avgRating"
import Footer from "../components/common/Footer"
import { formatDate } from "../utils/formatDate"
import CourseAccordionBar from "../components/core/CourseDetails.jsx/CourseAccordionBar"

import { motion, AnimatePresence } from "framer-motion";

function CourseDetails() {
  const { courseId } = useParams()
  const navigate = useNavigate()
  
  // Get user details from Redux to check if they are the Instructor
  const { user } = useSelector((state) => state.profile) 
  
  const [courseData, setCourseData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [avgReviewCount, setAvgReviewCount] = useState(0)
  const [isActive, setIsActive] = useState([])

  const [showStudentList, setShowStudentList] = useState(false);

  useEffect(() => {
    const getCourseDetails = async () => {
      setLoading(true)
      try {
        const result = await fetchCourseDetails(courseId)
        if (result) {
          setCourseData(result)
          console.log(result);
          
        }
      } catch (error) {
        console.log("Could not fetch course details")
      }
      setLoading(false)
    }
    getCourseDetails()
  }, [courseId])

  useEffect(() => {
    if (courseData?.ratingAndReviews) {
      const count = GetAvgRating(courseData.ratingAndReviews)
      setAvgReviewCount(count)
    }
  }, [courseData])

  const handleActive = (id) => {
    setIsActive(
      !isActive.includes(id) ? isActive.concat(id) : isActive.filter((e) => e != id)
    )
  }

  if (loading) return <div className="spinner mt-20 mx-auto"></div>
  if (!courseData) return <div className="text-white text-center mt-20">Course Not Found</div>

  const {
    courseName,
    description,
    thumbnail,
    price,
    whatWillYouLearn,
    courseContent,
    instructor,
    ratingAndReviews,
    studentEnrolled,
    createdAt,
  } = courseData

  // ✅ CHECK: Is the current user the one who created this course?
  const isInstructor = instructor?._id === user?._id

  return (
    <div className="flex flex-col text-richblack-5 bg-richblack-900">
      {/* Hero Section */}
      <div className="relative bg-richblack-800 py-12 lg:py-24">
        <div className="mx-auto box-content max-w-maxContent px-4 lg:relative">
          <div className="flex flex-col justify-center gap-4 py-5 lg:w-[60%]">
            <p className="text-sm text-richblack-300">Home / Catalog / {courseName}</p>
            <h1 className="text-4xl font-bold sm:text-5xl">{courseName}</h1>
            <p className="text-lg text-richblack-200">{description}</p>
            <div className="flex flex-wrap items-center gap-2 text-md">
              <span className="text-yellow-50">{avgReviewCount}</span>
              <RatingStars Review_Count={avgReviewCount} Star_Size={20} />
              <span>{`(${ratingAndReviews.length} reviews)`}</span>
              <span>{`${studentEnrolled.length} students enrolled`}</span>
            </div>
            <p className="text-md">Created by {`${instructor.firstName} ${instructor.lastName}`}</p>
            <p className="text-md">Created at {formatDate(createdAt)}</p>
          </div>

          {/* Right Floating Card (Instructor vs Student View) */}
          {/* Floating Buy Card */}
            <div className="right-[1rem] top-[60px] mx-auto hidden min-h-[450px] w-full max-w-[410px] translate-y-24 flex-col gap-4 rounded-xl bg-richblack-700 p-6 lg:absolute lg:flex lg:translate-y-0 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-richblack-600">
            <img 
                src={thumbnail} 
                alt="thumbnail" 
                className="max-h-[300px] min-h-[180px] w-full rounded-xl object-cover shadow-inner" 
            />
            
            <div className="px-2 pt-2">
                {isInstructor ? (
                <div className="flex flex-col gap-4">
                    <div className="text-2xl font-bold text-yellow-50">Instructor Access</div>
                    <div className="flex flex-col gap-1 border-l-2 border-yellow-100 pl-4 py-1">
                    <p className="text-richblack-200 text-xs uppercase tracking-widest">Total Revenue</p>
                    <p className="text-3xl font-bold text-richblack-5">₹ {price * studentEnrolled.length}</p>
                    </div>
                    
                    {/* Modern Yellow Button Style */}
                    <button 
                    onClick={() => navigate(`/dashboard/edit-course/${courseId}`)}
                    className="cursor-pointer rounded-md bg-yellow-50 px-5 py-3 text-center text-[16px] font-bold text-richblack-900 transition-all duration-200 hover:scale-95 hover:shadow-none shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)]"
                    >
                    Edit Course Content
                    </button>
                    
                    {/* Modern Black/Dark Button Style */}
                    <button 
                      onClick={() => setShowStudentList(true)}
                      className="cursor-pointer rounded-md bg-richblack-800 px-5 py-3 text-center text-[16px] font-bold text-richblack-5 transition-all duration-200 hover:scale-95 border border-richblack-600 flex items-center justify-center gap-2"
                    >
                      <span>View Student List</span>
                      <span className="bg-richblack-700 text-yellow-50 text-xs px-2 py-0.5 rounded-full border border-richblack-600">
                        {studentEnrolled?.length || 0}
                      </span>
                    </button>
                </div>
                ) : (
                <div className="flex flex-col gap-3">
                    <div className="pb-4 text-4xl font-bold text-richblack-5">₹ {price}</div>
                    
                    <button 
                    className="cursor-pointer rounded-md bg-yellow-50 px-5 py-3 text-center text-[16px] font-bold text-richblack-900 transition-all duration-200 hover:scale-95 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)]"
                    onClick={() => navigate("/login")}
                    >
                    Buy Now
                    </button>
                    
                    <button className="cursor-pointer rounded-md bg-richblack-800 px-5 py-3 text-center text-[16px] font-bold text-richblack-5 transition-all duration-200 hover:scale-95 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] border-b border-richblack-600">
                    Add to Cart
                    </button>
                    
                    <p className="text-center text-xs text-richblack-400 mt-4">
                    Full Lifetime Access • Shareable Certificate
                    </p>
                </div>
                )}
            </div>
            </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mx-auto box-content max-w-maxContent px-4 lg:w-[1260px]">
        <div className="mx-auto max-w-maxContentTab lg:mx-0 lg:max-w-[810px]">
          <div className="my-8 border border-richblack-600 p-8 rounded-sm">
            <p className="text-3xl font-semibold">What you'll learn</p>
            <div className="mt-5 text-richblack-100">{whatWillYouLearn}</div>
          </div>

          <div className="max-w-[830px] mb-12">
            <div className="flex flex-col gap-3">
              <p className="text-[28px] font-semibold">Course Content</p>
              <div className="flex flex-wrap justify-between gap-2">
                <div className="flex gap-2">
                  <span>{courseContent.length} sections</span>
                  <span>• {courseContent.reduce((acc, curr) => acc + curr.subSection.length, 0)} lectures</span>
                </div>
                <button className="text-yellow-50 font-medium" onClick={() => setIsActive([])}>
                  Collapse all sections
                </button>
              </div>
            </div>

            <div className="py-4">
              {courseContent?.map((section, index) => (
                <CourseAccordionBar 
                  key={index} 
                  section={section} 
                  isActive={isActive} 
                  handleActive={handleActive} 
                  isInstructor={isInstructor} // Pass down to allow video viewing
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {/* ✅ ANIMATED STUDENT LIST MODAL */}
<AnimatePresence>
  {showStudentList && (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      
      {/* 1. Animated Backdrop (Fades in) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setShowStudentList(false)}
        className="fixed inset-0 bg-black/70"
      />

      {/* 2. Animated Modal Content (Springs up) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
        className="relative w-11/12 max-w-[550px] rounded-2xl border border-richblack-700 bg-richblack-800 p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6 border-b border-richblack-700 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-richblack-5">Enrolled Students</h2>
            <p className="text-sm text-yellow-50 font-medium">
              {studentEnrolled.length} Learners Enrolled
            </p>
          </div>
          <button 
            onClick={() => setShowStudentList(false)}
            className="p-2 hover:bg-richblack-700 rounded-full transition-colors text-richblack-200"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* List Body with Staggered Animations */}
        <div className="max-h-[400px] overflow-y-auto pr-2 custom-scrollbar flex flex-col gap-3">
          {studentEnrolled.length > 0 ? (
            studentEnrolled.map((student, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }} // Staggered delay for each row
                className="flex items-center gap-4 p-4 rounded-xl bg-richblack-900 border border-richblack-700 hover:border-richblack-500 transition-all group"
              >
                <img 
                  src={student.image} 
                  className="h-12 w-12 rounded-full object-cover border-2 border-richblack-600 group-hover:border-yellow-50 transition-all" 
                  alt="avatar" 
                />
                <div className="flex-1 min-w-0">
                  <p className="text-richblack-5 font-bold truncate">
                    {student.firstName} {student.lastName}
                  </p>
                  <p className="text-richblack-400 text-sm truncate">{student.email}</p>
                </div>
                <div className="h-2.5 w-2.5 rounded-full bg-caribbeangreen-300 shadow-[0_0_8px_rgba(5,190,140,0.6)]"></div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-16">
              <p className="text-richblack-400 text-lg italic">No students enrolled yet.</p>
            </div>
          )}
        </div>

        {/* Footer Close Button */}
        <button 
          onClick={() => setShowStudentList(false)}
          className="w-full mt-8 py-3 bg-yellow-50 hover:bg-yellow-100 text-richblack-900 font-bold rounded-lg transition-all shadow-[inset_0_-2px_0_rgba(0,0,0,0.2)]"
        >
          Close Student List
        </button>
      </motion.div>
    </div>
  )}
</AnimatePresence>
    </div>
  )
}

export default CourseDetails