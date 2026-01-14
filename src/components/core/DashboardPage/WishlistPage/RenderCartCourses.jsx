import { FaStar } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../../../redux/slices/cartSlice";


function RenderCartCourses() {
  // Get cart data from Redux store
  const { cart } = useSelector((state) => state.cart);

  // Redux dispatcher
  const dispatch = useDispatch();

  return (
    <div className="flex flex-1 flex-col">
      {/* Render all courses present in cart */}
      {cart.map((course, index) => (
        <div
          key={course._id}
          className={`flex w-full flex-wrap items-start justify-between gap-6
            ${index !== cart.length - 1 ? "border-b border-b-richblack-400 pb-6" : ""}
            ${index !== 0 ? "mt-6" : ""}
          `}
        >
          {/* Left section: Course image & details */}
          {/* ✅ Responsive: Stack vertically on mobile, row on XL screens */}
          <div className="flex flex-1 flex-col gap-4 xl:flex-row">
            <img
              src={course?.thumbnail}
              alt={course?.courseName}
              className="h-[148px] w-full xl:w-[220px] rounded-lg object-cover"
            />

            <div className="flex flex-col space-y-1">
              {/* Course title */}
              <p className="text-lg font-medium text-richblack-5">
                {course?.courseName}
              </p>

              {/* Course category */}
              <p className="text-sm text-richblack-300">
                {course?.category?.name}
              </p>

              {/* Ratings */}
              <div className="flex items-center gap-2">
                <span className="text-yellow-5">4.5</span>

                <ReactStars
                  count={5}
                  value={course?.ratingAndReviews?.length}
                  size={20}
                  edit={false}
                  activeColor="#ffd700"
                  emptyIcon={<FaStar />}
                  fullIcon={<FaStar />}
                />

                <span className="text-richblack-400">
                  {course?.ratingAndReviews?.length} Ratings
                </span>
              </div>
            </div>
          </div>

          {/* Right section: Remove button & price */}
          {/* ✅ Responsive: Align items start on mobile, end on larger screens */}
          <div className="flex flex-col items-start xl:items-end space-y-2">
            <button
              onClick={() => dispatch(removeFromCart(course._id))}
              className="flex items-center gap-x-1 rounded-md border border-richblack-600 bg-richblack-700 px-3 py-3 text-pink-200 transition-all duration-200 hover:scale-95"
            >
              <RiDeleteBin6Line />
              <span>Remove</span>
            </button>

            <p className="mb-6 text-3xl font-medium text-yellow-100">
              ₹ {course?.price}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RenderCartCourses;