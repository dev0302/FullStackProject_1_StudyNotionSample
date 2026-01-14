import { useForm } from "react-hook-form"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import IconBtn from "../../../common/IconBtn"
import { useState } from "react"
import toast from "react-hot-toast"
import { changePassword } from "../../../../services/operations/settingsAPI"

function UpdatePassword() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const submitPasswordForm = async (data) => {
    try {
      dispatch(changePassword(token, data))
    } catch (error) {
      toast.error(error.response?.data?.message || "Password update failed")
    }
  }

  // Unified theme styles
  const inputStyles = "w-full rounded-xl bg-richblack-700 p-3 pr-12 text-richblack-5 border border-transparent focus:border-white/20 focus:outline-none transition-all duration-300 placeholder:text-richblack-400"
  const labelStyles = "text-sm text-richblack-300 font-medium ml-1"

  return (
    <form onSubmit={handleSubmit(submitPasswordForm)}>
      {/* ✅ Responsive Padding: Adjusted for better mobile spacing */}
      <div className="flex flex-col gap-y-8 rounded-[28px] border border-white/5 bg-richblack-800/40 p-6 sm:p-8 sm:px-12 transition-all hover:border-white/10">
        <h2 className="text-xl font-bold text-white tracking-tight">Security Settings</h2>
        
        {/* ✅ Grid: 1 column on mobile, 2 columns on medium screens up */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {/* Current Password */}
          <div className="relative flex flex-col gap-2">
            <label htmlFor="oldPassword" className={labelStyles}>
              Current Password
            </label>
            <div className="relative">
              <input
                type={showOldPassword ? "text" : "password"}
                name="oldPassword"
                id="oldPassword"
                placeholder="Enter Current Password"
                className={inputStyles}
                {...register("oldPassword", { required: true })}
              />
              <span
                onClick={() => setShowOldPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer text-richblack-200 hover:text-white transition-colors"
              >
                {showOldPassword ? <AiOutlineEyeInvisible fontSize={22} /> : <AiOutlineEye fontSize={22} />}
              </span>
            </div>
            {errors.oldPassword && (
              <span className="text-xs text-pink-200 mt-1 ml-1">
                Please enter your current password.
              </span>
            )}
          </div>

          {/* New Password */}
          <div className="relative flex flex-col gap-2">
            <label htmlFor="newPassword" className={labelStyles}>
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                placeholder="Enter New Password"
                className={inputStyles}
                {...register("newPassword", { required: true })}
              />
              <span
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer text-richblack-200 hover:text-white transition-colors"
              >
                {showNewPassword ? <AiOutlineEyeInvisible fontSize={22} /> : <AiOutlineEye fontSize={22} />}
              </span>
            </div>
            {errors.newPassword && (
              <span className="text-xs text-pink-200 mt-1 ml-1">
                New password is required.
              </span>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative flex flex-col gap-2">
            <label htmlFor="confirmPassword" className={labelStyles}>
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm New Password"
                className={inputStyles}
                {...register("confirmPassword", { required: true })}
              />
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer text-richblack-200 hover:text-white transition-colors"
              >
                {showConfirmPassword ? <AiOutlineEyeInvisible fontSize={22} /> : <AiOutlineEye fontSize={22} />}
              </span>
            </div>
            {errors.confirmPassword && (
              <span className="text-xs text-pink-200 mt-1 ml-1">
                Please confirm your password.
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ✅ Action Buttons: Column-reverse on mobile (Save on top), Row on desktop */}
      <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-x-4 mt-8 px-2 sm:mr-4">
        <button
          type="button"
          onClick={() => navigate("/dashboard/my-profile")}
          className="rounded-xl bg-richblack-800 py-2.5 px-8 font-bold text-richblack-100 hover:bg-richblack-700 transition-all active:scale-95 text-center"
        >
          Cancel
        </button>
        <IconBtn type="submit" text="Update Password" customClasses="w-full sm:w-auto flex justify-center" />
      </div>
    </form>
  )
}

export default UpdatePassword