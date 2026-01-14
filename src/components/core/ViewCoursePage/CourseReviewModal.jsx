import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { RxCross2 } from "react-icons/rx"
import { FaStar } from "react-icons/fa"
import IconBtn from '../../common/IconBtn'
import { createRating } from '../../../services/operations/courseDetailAPI'
import toast from 'react-hot-toast'

export default function CourseReviewModal({ setReviewModal }) {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const { courseEntireData } = useSelector((state) => state.viewCourse)

  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    setValue("courseExperience", "")
    setValue("courseRating", 0)
  }, [setValue])

  const handleRatingClick = (num) => {
    setRating(num)
    setValue("courseRating", num)
  }

  const onSubmit = async (data) => {
    if (data.courseRating === 0) {
      toast.error("Please provide a rating")
      return
    }

    const success = await createRating(
      {
        courseId: courseEntireData._id,
        rating: data.courseRating,
        review: data.courseExperience,
      },
      token
    )

    if (success) {
      setReviewModal(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm transition-all duration-300">
      {/* Modal Container: Responsive width */}
      <div className="my-10 w-11/12 max-w-[600px] rounded-2xl border border-richblack-700 bg-richblack-800 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between bg-richblack-700 p-5 px-6">
          <p className="text-xl font-bold text-richblack-5 tracking-tight">Add Course Review</p>
          <button onClick={() => setReviewModal(false)}>
            <RxCross2 className="text-2xl text-richblack-100 hover:text-pink-200 transition-colors" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 pt-8">
          {/* User Info Section */}
          <div className="flex items-center justify-center gap-x-4">
            <img
              src={user?.image}
              alt="user"
              className="aspect-square w-[55px] rounded-full object-cover border-2 border-yellow-50 shadow-lg"
            />
            <div className="flex flex-col">
              <p className="text-lg font-semibold text-richblack-5 leading-tight">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-sm text-richblack-400 font-medium">Posting Publicly</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 flex flex-col items-center">
            
            {/* Interactive Star Rating */}
            <div className="flex gap-x-3 mb-8">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => handleRatingClick(num)}
                  onMouseEnter={() => setHover(num)}
                  onMouseLeave={() => setHover(0)}
                  className={`text-4xl sm:text-5xl transition-all duration-200 transform hover:scale-125 focus:outline-none ${
                    num <= (hover || rating) 
                    ? "text-yellow-50 drop-shadow-[0_0_8px_rgba(255,214,10,0.5)]" 
                    : "text-richblack-600"
                  }`}
                >
                  <FaStar />
                </button>
              ))}
            </div>

            {/* Experience Textarea */}
            <div className="flex w-full flex-col space-y-3 px-2 sm:px-6">
              <label className="text-sm font-medium text-richblack-5 ml-1" htmlFor="courseExperience">
                Share your experience <sup className="text-pink-200">*</sup>
              </label>
              <textarea
                id="courseExperience"
                placeholder="How was the instructor? What did you like about the content?"
                {...register("courseExperience", { required: true })}
                className="min-h-[140px] w-full bg-richblack-700 p-4 text-richblack-5 rounded-xl border border-richblack-600 focus:border-yellow-50 focus:ring-1 focus:ring-yellow-50 outline-none transition-all placeholder:text-richblack-400"
              />
              {errors.courseExperience && (
                <span className="text-xs text-pink-200 font-medium ml-1">
                  Please share your thoughts about the course
                </span>
              )}
            </div>

            {/* Modal Footer / Buttons */}
            <div className="mt-10 flex w-full justify-end gap-x-4 px-2 sm:px-6 pb-2">
              <button
                type="button"
                onClick={() => setReviewModal(false)}
                className="rounded-md bg-richblack-700 py-2.5 px-6 font-bold text-richblack-5 hover:bg-richblack-600 transition-all border border-richblack-600 active:scale-95"
              >
                Cancel
              </button>
              <IconBtn 
                text="Submit Review" 
                type="submit"
                customClasses="font-bold py-2.5 px-6 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)]"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}