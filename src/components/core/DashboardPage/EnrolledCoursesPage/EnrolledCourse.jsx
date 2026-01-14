import ProgressBar from "@ramonak/react-progress-bar"
import { useNavigate } from "react-router-dom"

function EnrolledCourse({ course, isLast }) {
  const navigate = useNavigate()
console.log(course);

  const {
    _id,
    courseName,
    description,
    thumbnail,
    progressPercentage,
    totalDuration,
    instructor,
    courseContent,
  } = course

  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center border border-richblack-700 ${
        isLast ? "rounded-b-lg" : "rounded-none"
      }`}
    >
      {/* Course Info */}
      <div
        className="flex w-full sm:w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
        onClick={() =>
          navigate(
            `/view-course/${_id}/section/${courseContent?.[0]?._id}/sub-section/${courseContent?.[0]?.subSection?.[0]?._id}`
          )
        }
      >
        <img
          src={thumbnail}
          alt={courseName}
          className="h-14 w-14 rounded-lg object-cover"
        />

        <div className="flex max-w-xs flex-col gap-2">
          <p className="font-semibold text-richblack-5">{courseName}</p>
          <p className="text-xs text-richblack-300">
            {description.length > 50
              ? `${description.slice(0, 50)}...`
              : description}
          </p>
        </div>
      </div>

      {/* Duration */}
      <div className="w-full sm:w-1/4 px-5 sm:px-2 py-2 sm:py-3 text-richblack-50 text-sm">
        <span className="sm:hidden text-richblack-400 mr-2">Duration:</span>
        {totalDuration || "0s"}
      </div>

      {/* Progress */}
      <div className="flex w-full sm:w-1/5 flex-col gap-2 px-5 sm:px-2 py-4 sm:py-3">
        <p className="text-xs text-richblack-300">Progress: {progressPercentage || 0}%</p>
        <ProgressBar
          completed={progressPercentage || 0}
          height="8px"
          isLabelVisible={false}
          bgColor="#FFD60A"
          baseBgColor="#2C333F"
        />
      </div>
    </div>
  )
}

export default EnrolledCourse;