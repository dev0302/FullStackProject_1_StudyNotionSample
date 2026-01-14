import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI";
import Spinner from "../../common/Spinner";
import EnrolledCourse from "./EnrolledCoursesPage/EnrolledCourse";
import toast from "react-hot-toast"

function EnrolledCourses() {

    const {token} = useSelector((state)=>state.auth);

    const [enrolledCourses, setEnrolledCourses] = useState(null);
    
    const getEnrolledCourses = async() => {

        try {

            const res = await getUserEnrolledCourses(token);
            console.log(res);
            
            setEnrolledCourses(res);
            
        } catch (error) {
            toast.error(error.message)
            console.log("ERROR MESSAGE - ", error.message)
        }
    }

    useEffect( ()=>{
        getEnrolledCourses();
    }, [] )

    console.log(enrolledCourses);

    // now see, we will do show loading till !enrolledCourses as if we dont so what will happen while this page render, simuntaneously data will be fetching as its "async funcn" and ui will also start rendering without any data receieved
    // oh, wait..but there's beter method to handle it too by using "enrolledCourses && .....", i forgot it. !

  return (
    <div className="flex min-h-[calc(100vh-5.5rem)] w-full justify-center bg-richblack-900">
        <div className="w-11/12 max-w-[1000px] py-8 flex flex-col gap-8">

            <h2 className="text-3xl font-medium text-richblack-5">
                Enrolled Courses
            </h2>

            <div className={`h-full rounded-lg overflow-hidden ${
                enrolledCourses && enrolledCourses.length > 0
                ? "border border-richblack-700 shadow-md"
                : ""
            }`}
            >

                {/* now the real mapping of coureses */}

                {
                    !enrolledCourses ? (
                        <div className="grid min-h-[200px] place-items-center">
                            <Spinner></Spinner>
                        </div>
                    )

                     : 
                     

                    (   
                        !enrolledCourses.length ? (
                            <p className="flex h-[20vh] w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-richblack-600 bg-richblack-800 text-center text-richblack-200">

                                <span className="text-lg font-medium">
                                    No courses enrolled yet
                                </span>
                                <span className="text-sm text-richblack-400">
                                    Start learning by enrolling in a course.
                                </span>
                            </p>

                        ) :
                        (
                            <div className="flex flex-col">

                                {/* headings div - Hidden on small mobile screens for better UX */}
                                <div className="hidden sm:flex items-center border border-richblack-700 bg-richblack-800 text-richblack-50">

                                    
                                    <div className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3" >
                                        <p className="font-semibold">Course Name</p>
                                    </div>

                                    {/* Duration */}
                                    <div className="w-1/4 px-2 py-3 font-semibold">
                                        <p>Total Duration</p>
                                    </div>

                                    {/* Progress */}
                                    <div className="flex w-1/5 flex-col gap-2 px-2 py-3 font-semibold">
                                        <p>Progress</p>
                                    </div>
                                </div>

                                {
                                    enrolledCourses.map( (course,index) => { 
                                        return (
                                            <EnrolledCourse
                                            course={course}
                                            key={index}
                                            isLast={index === enrolledCourses.length - 1}
                                            ></EnrolledCourse>
                                        )
                                    } )
                                }
                            
                            </div>

                        )
                    )
                }
            </div>

        </div>
    </div>
  )

}

export default EnrolledCourses;