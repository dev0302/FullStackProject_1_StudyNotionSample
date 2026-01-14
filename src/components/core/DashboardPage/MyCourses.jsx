import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { IoIosAddCircleOutline } from "react-icons/io"
import IconBtn from "../../common/IconBtn"
import CourseTable from "./MyCourses/CourseTable"
import { fetchInstructorCourses } from "../../../services/operations/courseDetailAPI"

function MyCourses() {
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const [courses, setCourses] = useState(null)

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await fetchInstructorCourses(token)
      if (result) {
        setCourses(result)
      }
    }
    fetchCourses()
  }, [token]) // Added token as dependency for best practice

  return (
    <div className="min-h-screen w-full bg-[#000814] flex justify-center pb-10 sm:pb-20">
      <div className="w-11/12 max-w-[1100px] my-6 sm:my-10 flex flex-col gap-y-6 sm:gap-y-10">
        
        {/* HEADER SECTION: Spaced & Bold */}
        {/* ✅ Media Query: Column on mobile, Row on tablet+ */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-y-6">
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tighter text-white">
              My Courses
            </h1>
            <p className="text-richblack-300 text-sm sm:text-base">
              Manage your published and draft courses from one place.
            </p>
          </div>

          <IconBtn
            text="Add Course"
            onClick={() => navigate("/dashboard/add-course")}
            customClasses="w-full md:w-auto bg-white text-black px-6 py-2.5 rounded-xl font-bold hover:bg-gray-200 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg"
          >
            <IoIosAddCircleOutline size={20} />
          </IconBtn>
        </div>

        {/* TABLE SECTION: Wrapped in a themed container */}
        {/* ✅ Media Query: Adjusted rounding for mobile devices */}
        <div className="rounded-2xl sm:rounded-[28px] border border-white/5 bg-richblack-800/20 backdrop-blur-sm overflow-hidden transition-all hover:border-white/10">
          {courses ? (
            /* NOTE: Ensure your CourseTable component handles 
               horizontal scrolling (overflow-x-auto) for mobile 
            */
            <CourseTable courses={courses} setCourses={setCourses} />
          ) : (
            /* Loading State Shimmer/Spinner */
            <div className="flex h-[300px] items-center justify-center">
               <div className="w-10 h-10 border-4 border-richblack-700 border-t-white rounded-full animate-spin"></div>
            </div>
          )}
        </div>
        
      </div>
    </div>
  )
}

export default MyCourses