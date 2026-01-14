import { TiStarFullOutline, TiStarHalfOutline, TiStarOutline } from "react-icons/ti"

function RatingStars({ Review_Count = 0, Star_Size = 20 }) {
  // Logic: Create an array of 5 and decide icon based on index
  return (
    <div className="flex gap-1 text-yellow-50">
      {[...Array(5)].map((_, i) => {
        const starValue = i + 1;
        
        return (
          <span key={i} className="transition-transform duration-200 hover:scale-110">
            {Review_Count >= starValue ? (
              <TiStarFullOutline size={Star_Size} />
            ) : Review_Count >= starValue - 0.5 ? (
              <TiStarHalfOutline size={Star_Size} />
            ) : (
              <TiStarOutline size={Star_Size} className="text-richblack-600" />
            )}
          </span>
        )
      })}
    </div>
  )
}

export default RatingStars;