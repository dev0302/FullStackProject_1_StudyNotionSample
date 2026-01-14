import { useNavigate } from "react-router-dom"
import IconBtn from "../../../common/IconBtn"
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { updateProfile } from "../../../../services/operations/settingsAPI";

function ProfileInformation() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {user} = useSelector((state)=>state.profile);
    const { token } = useSelector((state) => state.auth)

    const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty },
    } = useForm();

    // submitProfileForm since it is passed in this funcn "<form onSubmit={handleSubmit(submitProfileForm)} >" , react-hook-form automatically understands that in paramter data will be receieved and can be of any variable name "data" or "formData" etc
    const submitProfileForm = async (data) => {
        if(!isDirty){ //!isDirty means no change being done.
          toast.error("No changes made");
          return;
        }
        try {
            dispatch(updateProfile(token, data))
        } catch (error) {
            toast.error(error.message)
            console.log("ERROR MESSAGE - ", error.message)
        }
    }

  const inputStyles = "w-full rounded-xl bg-richblack-700 p-3 text-richblack-5 border border-transparent focus:border-white/20 focus:outline-none transition-all duration-300";

  return (
    <form onSubmit={handleSubmit(submitProfileForm)}>
      {/* ✅ Responsive Padding: Adjusted for mobile screens */}
      <div className="flex flex-col gap-y-8 rounded-[28px] border border-white/5 bg-richblack-800/40 p-6 sm:p-8 sm:px-12 transition-all hover:border-white/10">
        <h2 className="text-xl font-bold text-white tracking-tight">
          Profile Information
        </h2>

        {/* ✅ Grid: 1 column on mobile, 2 columns on medium screens up */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {/* First Name */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-richblack-300 font-medium ml-1">First Name</label>
            <input
              type="text"
              {...register("firstName", { required: true })}
              defaultValue={user?.firstName}
              placeholder="Enter first name"
              className={inputStyles}
            />
            {errors.firstName && <span className="text-xs text-pink-200 mt-1 ml-1">First name is required</span>}
          </div>

          {/* Last Name */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-richblack-300 font-medium ml-1">Last Name</label>
            <input
              type="text"
              {...register("lastName", { required: true })}
              defaultValue={user?.lastName}
              placeholder="Enter last name"
              className={inputStyles}
            />
            {errors.lastName && <span className="text-xs text-pink-200 mt-1 ml-1">Last name is required</span>}
          </div>

          {/* Date of Birth */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-richblack-300 font-medium ml-1">Date of Birth</label>
            <input
              type="date"
              {...register("dob", { required: { value: true, message: "Please enter your Date of Birth." }, max: { value: new Date().toISOString().split("T")[0], message: "Date of Birth cannot be in the future." } })}
              defaultValue={user?.additionalDetails?.dob}
              className={inputStyles}
            />
            {errors.dob && <span className="text-xs text-pink-200 mt-1 ml-1">{errors.dob.message}</span>}
          </div>

          {/* Gender */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-richblack-300 font-medium ml-1">Gender</label>
            <select
              {...register("gender", { required: true })}
              defaultValue={user?.additionalDetails?.gender}
              className={inputStyles}
            >
              <option value="" disabled>Select Gender</option>
              {genders.map((ele, i) => (
                <option key={i} value={ele} className="bg-richblack-800">{ele}</option>
              ))}
            </select>
            {errors.gender && <span className="text-xs text-pink-200 mt-1 ml-1">Please select your gender</span>}
          </div>

          {/* Contact Number */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-richblack-300 font-medium ml-1">Contact Number</label>
            <input
              type="tel"
              {...register("phoneNumber", { 
                required: {value: true, message: "Please enter your Contact Number."},
                maxLength: {value: 12, message: "Invalid Contact Number"},
                minLength: {value: 10, message: "Invalid Contact Number"}
              })}
              defaultValue={user?.additionalDetails?.phoneNumber}
              placeholder="12345 67890"
              className={inputStyles}
            />
            {errors.phoneNumber && <span className="text-xs text-pink-200 mt-1 ml-1">{errors.phoneNumber.message}</span>}
          </div>

          {/* About */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-richblack-300 font-medium ml-1">About</label>
            <input
              type="text"
              {...register("about", { required: true })}
              defaultValue={user?.additionalDetails?.about}
              placeholder="Tell us about yourself"
              className={inputStyles}
            />
            {errors.about && <span className="text-xs text-pink-200 mt-1 ml-1">Please enter something about yourself</span>}
          </div>
        </div>
      </div>

      {/* Action Buttons: Responsive stacking on small mobile screens */}
      <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-x-4 mt-8 px-2 sm:mr-4">
        <button
          type="button"
          onClick={() => navigate("/dashboard/my-profile")}
          className="rounded-xl bg-richblack-800 py-2.5 px-8 font-bold text-richblack-100 hover:bg-richblack-700 transition-all active:scale-95 text-center"
        >
          Cancel
        </button>
        <IconBtn type="submit" text="Save Changes" customClasses="w-full sm:w-auto flex justify-center" />
      </div>
    </form>
  );
}

export default ProfileInformation