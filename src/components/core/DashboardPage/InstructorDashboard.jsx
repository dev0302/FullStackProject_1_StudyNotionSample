import { useEffect, useState } from "react"
import { getInstructorData } from "../../../services/operations/profileAPI"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import InstructorChart from "./InstructorDashboardPage/InstructorChart"


function InstructorDashboard() {
    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)
    const [loading, setLoading] = useState(false)
    const [instructorData, setInstructorData] = useState([])

    useEffect(() => {
        const getCourseDataWithStats = async () => {
            setLoading(true)
            const result = await getInstructorData(token)
            if (result.length) {
                setInstructorData(result)
            }
            setLoading(false)
        }
        getCourseDataWithStats()
    }, [token])

    const totalAmount = instructorData?.reduce((acc, curr) => acc + curr.totalAmountGenerated, 0)
    const totalStudents = instructorData?.reduce((acc, curr) => acc + curr.totalStudentsEnrolled, 0)

    return (
        <div className="min-h-screen bg-richblack-900 pb-12">
            <div className="mx-auto w-11/12 max-w-[1000px] py-10">
                
                {/* Header Section */}
                <div className="mb-8 flex flex-col gap-2">
                    <h1 className="text-3xl font-bold text-richblack-5">
                        Hi {user?.firstName} 👋
                    </h1>
                    <p className="font-medium text-richblack-400">
                        Let's start something new today
                    </p>
                </div>

                {loading ? (
                    <div className="grid h-[50vh] place-items-center">
                        <div className="w-12 h-12 border-4 border-richblack-700 border-t-yellow-50 rounded-full animate-spin"></div>
                    </div>
                ) : instructorData.length > 0 ? (
                    <div className="flex flex-col gap-y-6">
                        
                        {/* Top Stats Section: Chart + Summary */}
                        <div className="flex flex-col lg:flex-row gap-6 min-h-[450px]">
                            {/* Chart Component */}
                            <div className="flex-1 rounded-2xl border border-richblack-700 bg-richblack-800 p-6 shadow-lg">
                                <InstructorChart courses={instructorData} />
                            </div>

                            {/* Statistics Summary Card */}
                            <div className="flex min-w-[250px] flex-col rounded-2xl border border-richblack-700 bg-richblack-800 p-6 shadow-lg">
                                <p className="text-xl font-bold text-richblack-5">Statistics</p>
                                <div className="mt-8 flex flex-col gap-6">
                                    <div>
                                        <p className="text-lg text-richblack-400">Total Courses</p>
                                        <p className="text-3xl font-semibold text-richblack-50">{instructorData.length}</p>
                                    </div>
                                    <div>
                                        <p className="text-lg text-richblack-400">Total Students</p>
                                        <p className="text-3xl font-semibold text-richblack-50">{totalStudents}</p>
                                    </div>
                                    <div>
                                        <p className="text-lg text-richblack-400">Total Income</p>
                                        <p className="text-3xl font-semibold text-yellow-50">₹ {totalAmount}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Section: Course Management Preview */}
                        <div className="rounded-2xl border border-richblack-700 bg-richblack-800 p-6 shadow-lg">
                            <div className="flex items-center justify-between px-2 pb-6">
                                <p className="text-xl font-bold text-richblack-5">Your Courses</p>
                                <Link to="/dashboard/my-courses">
                                    <p className="text-xs font-semibold text-yellow-50 hover:underline">View All</p>
                                </Link>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {instructorData.slice(0, 3).map((course) => (
                                    <div key={course._id} className="group rounded-xl border border-richblack-700 bg-richblack-900 p-4 transition-all hover:bg-richblack-800">
                                        <h3 className="text-lg font-medium text-richblack-5 line-clamp-1">{course.courseName}</h3>
                                        <div className="mt-4 flex items-center justify-between text-sm font-medium text-richblack-400">
                                            <p>{course.totalStudentsEnrolled} Students</p>
                                            <p className="text-richblack-700">|</p>
                                            <p>₹ {course.totalAmountGenerated}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="mt-20 rounded-2xl bg-richblack-800 p-10 text-center border border-richblack-700">
                        <p className="text-2xl font-bold text-richblack-5">You have not created any courses yet</p>
                        <Link to="/dashboard/add-course">
                            <p className="mt-4 text-lg font-semibold text-yellow-50 hover:underline">Create your first course</p>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default InstructorDashboard