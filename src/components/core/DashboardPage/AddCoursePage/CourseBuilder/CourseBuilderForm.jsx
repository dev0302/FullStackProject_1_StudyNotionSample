import { useForm } from "react-hook-form"
import IconBtn from "../../../../common/IconBtn";
import { useState } from "react";
import { MdAddCircleOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setCourse, setEditCourse, setStep } from "../../../../../redux/slices/courseSlice";
import toast from "react-hot-toast";
import { createSection } from "../../../../../services/operations/courseDetailAPI";
import NestedView from "./NestedView";

function CourseBuilderForm() {

    const dispatch = useDispatch();

    const {register, handleSubmit, setValue, formState:{errors}} = useForm();
    const [editSectionId, setEditSectionId] = useState(null);
    const {course} = useSelector((state)=>state.course);
    const {token} = useSelector((state)=>state.auth);

    console.log(course);

    const[loading, setLoading] = useState(false);
    
    const cancelEdit = () => {
        setEditSectionId(null);
        setValue("sectionName", "");
    }

    const goBack = () => {
        dispatch(setStep(1)); // to get previous page
        dispatch(setEditCourse(true)); // so that edit api we call then 
    }

    const goToNext = () => {

        // next jane se pehle atleast ek course to created hona chaiye
        if(course.courseContent.length === 0){
            toast.error("Please add atleast one section.");
            return;
        }

        // use course ke har section mei atleast ek subSection hona chaiye.

        if(course.courseContent.some((section) => section.subSection.length === 0)) {
            toast.error("Please add atleast one lecture in each section.");
            return;
        }

        // else if everything fine
        dispatch(setStep(3));

        //  some :-
        // .some() internally loops one section at a time, from index 0 to n - 1
        // as soon as it finds condition "true", it return back true else in end false
        // here in our case condition applied on .some() is that check that is there any subSection of section jiski length 0 ho..jaise hi kisi ki bhi length 0 millegi, hence true will be returned and hence if condition will run and hence toast error will be shown.
    }

    const onSubmit = async(data) => {
        setLoading(true);
        let result;

        if(editSectionId){
            // we are here editing(updating) the section name (not creating)
            result = await updateSection( 
                {
                    sectionName : data.sectionName,
                    sectionId : editSectionId,
                    courseId : course._id
                }, token
            )
        }

        else {
            result = await createSection( 
                {
                    sectionName : data.sectionName,
                    courseId : course._id
                }, token
            )
        }


        // update values in slice
        if(result){
            // console.log("Resultttt : ",result);
            
            dispatch(setCourse(result));
            setEditSectionId(null);
            setValue("sectionName", ""); //It clears the “Section Name” input box.
        }

        setLoading(false);
    }

    const handleChangeEditSectionName = (sectionId, sectionName) => {
        // is same clicked
        if(editSectionId === sectionId){
            cancelEdit();
            return;
        }

        // if different clicked
        setEditSectionId(sectionId);
        setValue("sectionName", sectionName);
    }


  return (
    <div className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-3 sm:p-6">
        <p className="text-2xl font-semibold text-richblack-5">Course Builder</p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            <div className="flex flex-col space-y-2">

                <label className="text-sm text-richblack-5" htmlFor="sectionName">Section Name <sup className="text-pink-200">*</sup></label> 
                {/* htmlFor connects a label to its input — making the label clickable, improving accessibility, and giving a better user experience. */}

                <input
                    id = "sectionName"
                    placeholder="Add section name"
                    {...register("sectionName", {"required":true})}
                    className="inputBox_style2 w-full"
                />
                {errors.sectionName && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">
                        Section name is required
                    </span>
                )}

            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-x-4 gap-y-2">
                <IconBtn
                    type="submit"
                    text={editSectionId ? "Edit Section Name" : "Create Section"}
                    outline={true}
                    customClasses={"text-white"}
                    children={<MdAddCircleOutline className="text-yellow-400"></MdAddCircleOutline>}
                ></IconBtn>

                {/* if editSectionName is true then show this cancel option */}
                {editSectionId && (
                    <button
                        type="button"
                        onClick={cancelEdit}
                        className="text-sm text-richblack-300 underline ml-1 sm:ml-0"
                    > Cancel Edit
                    </button>
                )}
            </div>

        </form>

        {
            course.courseContent.length > 0 && (
                <NestedView handleChangeEditSectionName={handleChangeEditSectionName}></NestedView>
            )
        }

        <div className="flex justify-end gap-x-3">
            <button onClick={goBack} className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[15px] sm:px-[20px] font-semibold text-richblack-900`} >
                Back
            </button>
            
            <IconBtn
                text="Next"
                onClick={goToNext}
                disabled={loading}
            ></IconBtn>
        </div>

    </div>
  )
}

export default CourseBuilderForm;