// npm install react-hook-form

import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import CountryCode from "../../../data/countrycode.json"
import { apiConnector } from "../../../services/apiconnector"
import { contactusEndpoint } from "../../../services/api"
import toast from "react-hot-toast"
import Spinner from "../../common/Spinner"


// Since it is  react-hook-foorm.
// here data is {...register("firstname", { required: true })}, ie "firstname" is variable.
// remeber variable name sending from here, and receiving in backend api should be same.
// check by printing them ("log");

function ContactUsForm() {

  const {CONTACT_US_API} = contactusEndpoint;

  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm(
    {
      defaultValues: {
        countrycode: "+91",
      },
    }
  )

  const submitContactForm = async (data) => {
      try {
        setLoading(true)

        const res = await apiConnector("POST", CONTACT_US_API, data)

        if (!res.data.success) {
          throw new Error(res.data.message)
        }

        toast.success("Message sent successfully!")

      } catch (error) {

        toast.error("Submit Unsuccessful!")

        throw error // 👈 keeps isSubmitSuccessful = false

      } finally {
        setLoading(false)
      }
  }


  useEffect(() => {
    if (isSubmitSuccessful) {
      // console.log(isSubmitSuccessful);
      
      reset({
        email: "",
        firstName: "",
        lastName: "",
        message: "",
        phoneNumber: "",
      })
    }
  }, [reset, isSubmitSuccessful])

  return (
    <form
      className="flex flex-col gap-7"
      onSubmit={handleSubmit(submitContactForm)}
    >
      <div className="flex flex-col gap-5 lg:flex-row">
        {/* First Name */}
        {/* ✅ Responsive: Full width on mobile, 48% on desktop */}
        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="firstName" className="text-sm text-richblack-5">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="Enter first name"
            className="bg-richblack-800 text-richblack-5 w-full rounded-[0.5rem] p-[12px]  border-richblack-700 focus:border-yellow-50 focus:outline-none focus:border-opacity-60 border"
            {...register("firstName", { required: true })}
          />
          {/* ✅ Fixed typo: firstName matches register key */}
          {errors.firstName && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              Please enter your name.
            </span>
          )}
        </div>

        {/* Last Name */}
        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="lastName" className="text-sm text-richblack-5">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Enter last name"
            className="bg-richblack-800 text-richblack-5 w-full rounded-[0.5rem] p-[12px]  border-richblack-700 focus:border-yellow-50 focus:outline-none focus:border-opacity-60 border"
            {...register("lastName")}
          />
        </div>
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm text-richblack-5">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter email address"
          className="bg-richblack-800 text-richblack-5 w-full rounded-[0.5rem] p-[12px]  border-richblack-700 focus:border-yellow-50 focus:outline-none focus:border-opacity-60 border"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            Please enter your Email address.
          </span>
        )}
      </div>

      {/* Phone Number */}
      <div className="flex flex-col gap-2">
        <label htmlFor="phoneNumber" className="text-sm text-richblack-5">
          Phone Number
        </label>

        {/* ✅ Responsive Flex Gap: Smaller gap on mobile to prevent overflow */}
        <div className="flex gap-3 sm:gap-5">
          {/* Country Code Selection */}
          <div className="flex w-[70px] sm:w-[81px] flex-col gap-2">
            <select
              name="countrycode"
              id="countrycode"
              className="bg-richblack-800 text-richblack-5 w-full rounded-[0.5rem] p-[12px]  border-richblack-700 focus:border-yellow-50 focus:outline-none focus:border-opacity-60 border cursor-pointer text-xs sm:text-base"
              {...register("countrycode", { required: true })}
            >
              {CountryCode.map((ele, i) => {
                return (
                  <option key={i} value={ele.code} className="bg-richblack-800">
                    {ele.code} - {ele.country}
                  </option>
                )
              })}
            </select>
          </div>

          {/* Phone Input */}
          {/* ✅ Responsive: Dynamic width calculation based on country code selector */}
          <div className="flex w-[calc(100%-80px)] sm:w-[calc(100%-100px)] flex-col gap-2">
            <input
              type="number"
              name="phoneNumber"
              id="phoneNumber"
              placeholder="12345 67890"
              className="bg-richblack-800 text-richblack-5 w-full rounded-[0.5rem] p-[12px]  border-richblack-700 focus:border-yellow-50 focus:outline-none focus:border-opacity-60 border"
              {...register("phoneNumber", {
                required: {
                  value: true,
                  message: "Please enter your Phone Number.",
                },
                maxLength: { value: 12, message: "Invalid Phone Number" },
                minLength: { value: 10, message: "Invalid Phone Number" },
              })}
            />
          </div>
        </div>
        {errors.phoneNumber && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            {errors.phoneNumber.message}
          </span>
        )}
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm text-richblack-5">
          Message
        </label>
        <textarea
          name="message"
          id="message"
          cols="30"
          rows="7"
          placeholder="Enter your message here"
          className="bg-richblack-800 text-richblack-5 w-full rounded-[0.5rem] p-[12px]  border-richblack-700 focus:border-yellow-50 focus:outline-none focus:border-opacity-60 border"
          {...register("message", { required: true })}
        />
        {errors.message && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            Please enter your Message.
          </span>
        )}
      </div>

      {/* Submit Button */}
      <button
        disabled={loading}
        type="submit"
        className={`flex items-center justify-center gap-2 rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] sm:text-[16px] transition-all duration-200 hover:scale-95 disabled:bg-richblack-500 disabled:cursor-not-allowed`}
      >
        {loading ? (
          <div className="flex items-center gap-2">
            {/* Small adjustment to ensure spinner fits inside button */}
            <div className="scale-75">
              <Spinner />
            </div>
            <span>Sending...</span>
          </div>
        ) : (
          <span>Send Message</span>
        )}
      </button>

    </form>
  )
}

export default ContactUsForm