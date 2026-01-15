import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import IconBtn from "../../../common/IconBtn"
import { enrollCourse } from "../../../../services/operations/studentsFeatureAPI"

function RenderTotalAmount() {

    const { total, cart } = useSelector((state) => state.cart)
    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleBuyCourse = () => {
      console.log("buyinggggg");
      
        const courses = cart.map((course) => course._id) //this line means, It extracts only the course IDs from the cart.
        // [
        //     {
        //         _id: "c1",
        //         courseName: "React Basics",
        //         price: 499,
        //         thumbnail: "...",
        //     },
        //     {
        //         _id: "c2",
        //         courseName: "Node.js",
        //         price: 699,
        //     }
        // ]
        // After mapping: courses = ["c1", "c2"];
        // Why mapping is better than sending full cart, ❌ Bad practice: buyCourse(token, cart, user);
        // Problems: Large payload, Security requestIdleCallback, Backend already has course data
        // ✅ Best practice: ["courseId1", "courseId2"] Lightweight, secure, efficient.

        const userId = user?._id

        dispatch(enrollCourse(token, courses, userId, navigate));

    }

  return (
    /* ✅ Added responsive width and alignment classes */
    <div className="w-full min-w-[280px] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 shadow-lg lg:w-auto">
      <p className="mb-1 text-sm font-medium text-richblack-300">Total:</p>
      <div className="mb-6 flex items-baseline gap-2">
  {/* Strikethrough Price */}
  <p className="text-xl font-medium text-richblack-300 line-through">
    ₹{total}
  </p>
  
  {/* New Free Text */}
  <p className="text-3xl font-bold text-yellow-100">
    Free
  </p>
</div>
      
      {/* IconBtn is already styled to be full width via customClasses */}
      <IconBtn
        text="Buy Now"
        onClick={(handleBuyCourse)}
        customClasses="w-full justify-center py-3 font-bold text-lg transition-all duration-200 hover:scale-95 active:scale-90"
      />
      
      {/* Visual helper for security/trust on checkout */}
      <p className="mt-4 text-xs text-center text-richblack-400">
        Secure Checkout • Instant Enrollment
      </p>
    </div>
  )
}

export default RenderTotalAmount