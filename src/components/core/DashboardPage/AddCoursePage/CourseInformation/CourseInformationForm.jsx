import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import { MdNavigateNext } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import { setCourse, setStep } from "../../../../../redux/slices/courseSlice"
import ChipInput from "./ChipInput"
import RequirementsField from "./RequirementField"
import IconBtn from "../../../../common/IconBtn"
import Upload from "./Upload"
import { COURSE_STATUS } from "../../../../../utils/constants"
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from "../../../../../services/operations/courseDetailAPI"


export default function CourseInformationForm() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm()

  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { course, editCourse } = useSelector((state) => state.course)
  const [loading, setLoading] = useState(false)
  const [courseCategories, setCourseCategories] = useState([])

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true)
      const categories = await fetchCourseCategories()
      if (categories.length > 0) {
        // console.log("categories", categories)
        setCourseCategories(categories)
      }
      setLoading(false)
    }
    // if form is in edit mode
    if (editCourse && course) {
    console.log("data populated", course)

    setValue("courseName", course.courseName)
    setValue("description", course.description)
    setValue("price", course.price)

    setValue("tag", course.tag)
    setValue("whatWillYouLearn", course.whatWillYouLearn)

    // category ID
    //console.log("category.id?", course.category?._id); //wrong
    
    setValue("category", course.category._id)

    setValue("instructions", course.instructions)
    setValue("thumbnailImage", course.thumbnail)
}


    getCategories()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isFormUpdated = () => {
    const currentValues = getValues()
    // console.log("changes after editing form values:", currentValues)
    if (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory._id !== course.category._id ||
      currentValues.courseRequirements.toString() !==
        course.instructions.toString() ||
      currentValues.courseImage !== course.thumbnail
    ) {
      return true
    }
    return false
  }

  //   handle next button click
  const onSubmit = async (data) => {
  console.log("FORM DATA:", data)

  const formData = new FormData()

  // =========================
  // COMMON FIELDS
  // =========================
  formData.append("courseName", data.courseName)
  formData.append("description", data.description)
  formData.append("price", data.price)
  formData.append("tag", JSON.stringify(Array.isArray(data.tag) ? data.tag : [data.tag]))
  formData.append("whatWillYouLearn", data.whatWillYouLearn)
  formData.append("category", data.category)
  formData.append(
    "instructions",
    JSON.stringify(data.instructions || [])
  )
  formData.append("thumbnailImage", data.thumbnailImage)
  formData.append("status", COURSE_STATUS.DRAFT)

  setLoading(true)

  try {
    let result

    if (editCourse) {
      formData.append("courseId", course._id)
      result = await editCourseDetails(formData, token)
      
    } else {
      result = await addCourseDetails(formData, token)
    }

    if (result) {
      dispatch(setStep(2))
      dispatch(setCourse(result))
    }
  } catch (error) {
    toast.error("Failed to save course details")
    console.error(error)
  } finally {
    setLoading(false)
  }
}


  const onError = (errors) => {
    const firstErrorKey = Object.keys(errors)[0]

    if (!firstErrorKey) return

    const errorMessages = {
      courseTitle: "Course title is required",
      courseShortDesc: "Course description is required",
      coursePrice: "Course price is required",
      courseCategory: "Course category is required",
      courseTags: "Please add at least one tag",
      courseImage: "Course thumbnail is required",
      courseBenefits: "Course benefits are required",
      courseRequirements: "Please add course requirements",
    }

    toast.error(errorMessages[firstErrorKey] || "Please fix form errors")
  }


  return (
  <form
    onSubmit={handleSubmit(onSubmit, onError)}
    className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6"
  >
    {/* Course Name */}
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-5" htmlFor="courseName">
        Course Title <sup className="text-pink-200">*</sup>
      </label>
      <input
        id="courseName"
        placeholder="Enter Course Title"
        {...register("courseName", { required: true })}
        className="form-style inputBox_style2 w-full"
      />
      {errors.courseName && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          Course title is required
        </span>
      )}
    </div>

    {/* Description */}
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-5" htmlFor="description">
        Course Description <sup className="text-pink-200">*</sup>
      </label>
      <textarea
        id="description"
        placeholder="Enter Description"
        {...register("description", { required: true })}
        className="form-style inputBox_style2 resize-x-none min-h-[130px] w-full"
      />
      {errors.description && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          Course description is required
        </span>
      )}
    </div>

    {/* Price */}
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-5" htmlFor="price">
        Course Price <sup className="text-pink-200">*</sup>
      </label>
      <div className="relative">
        <input
          id="price"
          placeholder="Enter Course Price"
          {...register("price", {
            required: true,
            valueAsNumber: true,
          })}
          className="form-style inputBox_style2 w-full !pl-12"
        />
        <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-2xl text-richblack-400" />
      </div>
      {errors.price && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          Course price is required
        </span>
      )}
    </div>

    {/* Category */}
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-5" htmlFor="category">
        Course Category <sup className="text-pink-200">*</sup>
      </label>
      <select
        {...register("category", { required: true })}
        defaultValue=""
        id="category"
        className="form-style inputBox_style2 w-full"
      >
        <option value="" disabled>
          Choose a Category
        </option>
        {!loading &&
          courseCategories?.map((category, indx) => (
            <option key={indx} value={category._id}>
              {category.name}
            </option>
          ))}
      </select>
      {errors.category && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          Course category is required
        </span>
      )}
    </div>

    {/* Tag (SINGLE tag ID) */}
    <ChipInput
      label="Tag"
      name="tag"
      placeholder="Enter one tag"
      register={register}
      errors={errors}
      setValue={setValue}
      getValues={getValues}
      single
    />

    {/* Thumbnail */}
    <Upload
      name="thumbnailImage"
      label="Course Thumbnail"
      register={register}
      setValue={setValue}
      errors={errors}
      editData={editCourse ? course?.thumbnail : null}
    />

    {/* What will you learn */}
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-5" htmlFor="whatWillYouLearn">
        What will students learn <sup className="text-pink-200">*</sup>
      </label>
      <textarea
        id="whatWillYouLearn"
        placeholder="Enter learning outcomes"
        {...register("whatWillYouLearn", { required: true })}
        className="form-style inputBox_style2 resize-x-none min-h-[130px] w-full"
      />
      {errors.whatWillYouLearn && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          This field is required
        </span>
      )}
    </div>

    {/* Instructions */}
    <RequirementsField
      name="instructions"
      label="Requirements / Instructions"
      register={register}
      setValue={setValue}
      errors={errors}
      getValues={getValues}
    />

    {/* Buttons */}
    <div className="flex justify-end gap-x-2">
      {editCourse && (
        <button
          type="button"
          onClick={() => dispatch(setStep(2))}
          disabled={loading}
          className="flex items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
        >
          Continue Without Saving
        </button>
      )}
      <IconBtn disabled={loading} text={!editCourse ? "Next" : "Save Changes"}>
        <MdNavigateNext />
      </IconBtn>
    </div>
  </form>
)

}