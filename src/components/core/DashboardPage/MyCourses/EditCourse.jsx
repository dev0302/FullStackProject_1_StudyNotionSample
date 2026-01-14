import { useDispatch, useSelector } from "react-redux"
import RenderSteps from "../AddCoursePage/RenderSteps"
import { useEffect, useState } from "react";
import Spinner from "../../../common/Spinner";
import { getFullDetailsOfCourse } from "../../../../services/operations/courseDetailAPI";
import { useParams } from "react-router-dom";
import { setCourse, setEditCourse } from "../../../../redux/slices/courseSlice";

function EditCourse() {
    const dispatch = useDispatch();
    const { courseId } = useParams();
    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const populateCourseDetails = async () => {
            setLoading(true); // 1. Set loading to true immediately
            
            // 2. Clear old course data so we don't see it while fetching
            dispatch(setCourse(null)); 

            const result = await getFullDetailsOfCourse(courseId, token);

            if (result?.courseDetails) {
                dispatch(setEditCourse(true));
                dispatch(setCourse(result?.courseDetails));
            }
            
            setLoading(false); // 3. Set loading to false after data is fetched
        }

        populateCourseDetails();

        // 4. CLEANUP: Reset Edit State when leaving this page
        return () => {
            dispatch(setEditCourse(false));
            dispatch(setCourse(null));
        }
        
    }, [courseId, token, dispatch]); // ✅ Added courseId as dependency

    if (loading) {
        return (
            <div className="grid h-[500px] place-items-center">
                <Spinner />
            </div>
        )
    }

    return (
        <div className='flex h-full w-full justify-center'>
            <div className="w-10/12 my-8 flex flex-col gap-8">
                <h2 className="mb-4 text-3xl font-medium text-richblack-5">Edit Course</h2>
                
                <div className="w-full">
                    {
                        course ? (
                            <RenderSteps />
                        ) : (
                            <p className="mt-14 text-center text-3xl font-semibold text-richblack-100">
                                Course not found
                            </p>
                        )
                    }
                </div>
                
                <div className="p-2"></div>
            </div>
        </div>
    )
}

export default EditCourse;