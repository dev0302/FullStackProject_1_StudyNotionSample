import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import IconBtn from "../../../../common/IconBtn";
import { resetCourseState, setCourse, setStep } from "../../../../../redux/slices/courseSlice";
import { useNavigate } from "react-router-dom";
import { COURSE_STATUS } from "../../../../../utils/constants";
import { editCourseDetails } from "../../../../../services/operations/courseDetailAPI";
import toast from "react-hot-toast";


function PublishCourse() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {register, handleSubmit, setValue, getValues} = useForm();

    const {course} = useSelector((state)=>state.course);
    const {token} = useSelector((state)=>state.auth);
    console.log("status::::::", course.status);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (course?.status === COURSE_STATUS.PUBLISHED) {
        setValue("public", true)
        }
    }, [course, setValue])
    

    const goBack = () => {
        dispatch(setStep(2));
    }

    const handleCoursePublish = async() => {
        console.log("status::::::", course.status);
        
        if ( (course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true) || (course?.status === COURSE_STATUS.DRAFT &&  getValues("public") === false) ) {

            // form has not been updated
            // no need to make api call
            goToCourses();
            toast.error("No changes made")
            console.log("no change made");
            
            return;
        }

        // else changes made
        const formData = new FormData();
        formData.append("courseId", course._id); //ek courseId send krdi
        const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT; //status fetch kro
        // console.log("status issssssss", courseStatus);
        
        formData.append("status",courseStatus); //then also update status

        // now form data is ready, now give api call to update in backend
        setLoading(true);
        const result = await editCourseDetails(
            formData,token
        )

        if(result){
            goToCourses();
            dispatch(setCourse(result));
            console.log("updateddddd");
            // console.log(result);
            
            
        }

        setLoading(false);

    }

    const goToCourses = () => {
        dispatch(resetCourseState());
        navigate("/dashboard/my-courses");
    }


    const onSubmit = () => {
        handleCoursePublish();
    }

  return (

    <div className="rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-4 sm:p-6">
        <p className="text-2xl font-semibold text-richblack-5">Publish Course</p>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="my-6 mb-8">
                <label htmlFor="public" className="inline-flex items-center text-base sm:text-lg">
                    <input 
                        type="checkbox" 
                        id = "public"
                        {...register("public")}
                        className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
                    />
                    <span className="ml-2 text-richblack-400">
                        Mark this course as public
                    </span>
                </label>
            </div>

            <div className="ml-auto flex max-w-max items-center gap-x-3 sm:gap-x-4">

                {/* when we write onClick={goBack} since its not a funcn like we are not doing goBack(), we can directly write it in {} but if there were arguments then we have to write like this onClick={()=> goBack()} */}
                {/* here in this case both is correct
                1. onClick={goBack} and 2. onClick={() => goBack()}
                but this will be wrongs onClick={() => goBack */}

                <button disabled={loading} onClick={goBack}
                className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[15px] sm:px-[20px] font-semibold text-richblack-900 text-sm sm:text-base" >
                    Back
                </button>

                <IconBtn disabled={loading}
                    text="save changes"
                    customClasses="text-sm sm:text-base"
                >
                    
                </IconBtn>
            </div>
            
        </form>
    </div>
  )
}

export default PublishCourse;