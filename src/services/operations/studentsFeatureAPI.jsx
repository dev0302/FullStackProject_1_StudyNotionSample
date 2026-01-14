import toast from "react-hot-toast"
import { apiConnector } from "../apiconnector"
import { setUser } from "../../redux/slices/profileSlice"
import { courseEndpoints } from "../api";
import { resetCart } from "../../redux/slices/cartSlice";
const { BUY_FAKE_COURSE_API } = courseEndpoints;

// enroll student into courses
export function enrollCourse(token, courses, userId, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Processing Enrollment...")
    try {
      const response = await apiConnector(
        "POST",
        BUY_FAKE_COURSE_API,
        { courses, userId },
        { Authorization: `Bearer ${token}` }
      )

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Enrolled Successfully! 🎉")

      // ✅ 1. Clear the Cart immediately
      dispatch(resetCart())

      // ✅ 2. Update Redux & LocalStorage with the fresh user data from backend
      if (response.data.user) {
        dispatch(setUser(response.data.user))
        localStorage.setItem("user", JSON.stringify(response.data.user))
      }

      // ✅ 3. Redirect to dashboard
      navigate("/dashboard/enrolled-courses")
      
    } catch (error) {
      console.log("ENROLL COURSE ERROR:", error)
      toast.error(error.response?.data?.message || "Enrollment Failed")
    }
    toast.dismiss(toastId)
  }
}