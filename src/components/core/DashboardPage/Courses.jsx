import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllCourses } from "../../../services/operations/courseDetailAPI"
import { addToCart } from "../../../redux/slices/cartSlice"
import toast from "react-hot-toast"

function Courses() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.profile)
  //console.log(user?.courses); //all courses id, mtlb jo user ne buy krrkhi hai
  
  const { cart } = useSelector((state) => state.cart)

  useEffect(() => {
    const fetchCourses = async () => {
      const data = await getAllCourses()
      setCourses(data)
      setLoading(false)
    }
    fetchCourses()
  }, [])

  const handleAddToCart = (course) => {
    if (!user) {
      toast.error("Please login to add course to cart")
      return
    }

    // ✅ Let reducer handle duplicate logic
    dispatch(addToCart(course))
  }
  console.log(courses);
  

  return (
    <div className="min-h-screen w-full bg-richblack-900 px-4 py-8 sm:px-6 lg:px-10">

      {/* PAGE TITLE */}
      <h2 className="mb-8 text-3xl font-semibold text-richblack-5">
        All Courses
      </h2>

      {/* LOADING */}
      {loading && (
        <p className="text-richblack-300">Loading courses...</p>
      )}

      {/* EMPTY */}
      {!loading && courses.length === 0 && (
        <p className="text-richblack-300">No courses available</p>
      )}

      {/* FULL WIDTH COURSE LIST */}
      {!loading && courses.length > 0 && (
        <div className="flex flex-col gap-6">
          {courses.map((course) => {

            const isEnrolled = user?.courses?.some((c) => (c._id === course._id || c === course._id));

            // console.log(typeof user?.courses[0]._id);
            // console.log(typeof user?.courses[1]._id);
            // console.log("----------");
            // console.log(typeof course._id);
            
            
            
            const isInCart = cart.some(
              (item) => item._id === course._id
            )

            return (
              <div
                key={course._id}
                /* ✅ Responsive Layout: Stack on mobile, Row on Tablet/Desktop */
                className="flex flex-col md:flex-row w-full gap-6 rounded-xl bg-richblack-800 p-4 sm:p-6 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,214,10,0.1)] border border-richblack-700 hover:border-richblack-600"
              >
                {/* THUMBNAIL */}
                <img
                  src={course.thumbnail}
                  alt={course.courseName}
                  /* ✅ Responsive Image: Full width on mobile, Fixed size on desktop */
                  className="h-48 md:h-40 w-full md:w-64 rounded-lg object-cover shadow-lg"
                />

                {/* COURSE DETAILS */}
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-richblack-5">
                      {course.courseName}
                    </h3>

                    <p className="mt-1 text-sm text-richblack-300">
                      Instructor:{" "}
                      {course.instructor?.firstName}{" "}
                      {course.instructor?.lastName}
                    </p>

                    <p className="mt-2 text-sm text-richblack-400">
                      {course.studentEnrolled?.length || 0} students enrolled
                    </p>
                  </div>

                  {/* ACTION ROW */}
                  <div className="mt-6 md:mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <p className="text-2xl font-semibold text-yellow-50">
                      ₹{course.price}
                    </p>

                    <button
                      disabled={isEnrolled || isInCart}
                      onClick={() => handleAddToCart(course)}
                      /* ✅ Mobile friendly button width */
                      className={`w-full sm:w-auto rounded-md px-6 py-2.5 font-bold transition-all duration-200 active:scale-95
                        ${isEnrolled 
                          ? "bg-richblack-700 text-richblack-300 cursor-not-allowed border border-richblack-600" 
                          : isInCart 
                          ? "bg-richblack-600 text-richblack-100 cursor-not-allowed" 
                          : "bg-yellow-50 text-richblack-900 hover:bg-yellow-100 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)]"
                        }`}
                    >
                      {isEnrolled ? (
                        "Already Enrolled"
                      ) : isInCart ? (
                        "Added to Cart"
                      ) : (
                        <div className="flex flex-col items-center">
                          <span>Add to Cart</span>
                          <span className="text-[12px] font-medium lowercase italic">
                            (currently free for testing)
                          </span>
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Courses