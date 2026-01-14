import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import RatingStars from '../../common/RatingStars'
import GetAvgRating from '../../../utils/avgRating'

const CourseCard = ({ course, Height }) => {
  const [avgReviewCount, setAvgReviewCount] = useState(0)

  useEffect(() => {
    const count = GetAvgRating(course.ratingAndReviews)
    setAvgReviewCount(count)
  }, [course])

  return (
    <Link to={`/courses/${course._id}`} className="w-full">
      {/* 1. Removed fixed widths 
          2. Added max-w-full to prevent overflow 
          3. Adjusted padding (p-3 sm:p-4)
      */}
      <div className="flex flex-col gap-2 rounded-xl bg-richblack-800 p-3 transition-all duration-200 hover:scale-[1.02] border border-richblack-700 w-full max-w-full overflow-hidden">
        
        {/* Thumbnail: Added h-auto on mobile to allow the card to breathe */}
        <div className="relative w-full">
           <img 
            src={course?.thumbnail} 
            alt="course thumbnail" 
            className={`${Height} w-full rounded-lg object-cover`} 
          />
        </div>
        
        <div className="flex flex-col gap-2 py-1">
          {/* Title optimization: 
              - line-clamp-2 prevents the text from growing too tall 
              - text-base on mobile ensures it fits the container
          */}
          <p className="text-base sm:text-xl font-medium text-richblack-5 line-clamp-2 leading-snug">
            {course?.courseName}
          </p>
          
          <p className="text-xs sm:text-sm text-richblack-300 truncate">
            {course?.instructor?.firstName} {course?.instructor?.lastName}
          </p>
          
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-yellow-5 font-bold text-sm">{avgReviewCount || 0}</span>
            <div className="scale-90 origin-left">
               <RatingStars Review_Count={avgReviewCount} />
            </div>
            <span className="hidden xs:block text-xs text-richblack-400">
              ({course?.ratingAndReviews?.length})
            </span>
          </div>
          
          <p className="text-lg sm:text-xl font-bold text-richblack-5">
            ₹ {course?.price}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default CourseCard