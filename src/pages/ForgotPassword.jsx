import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BiArrowBack } from "react-icons/bi"
import { NavLink } from 'react-router-dom';
import { getPasswordResetToken } from '../services/operations/authAPI';
import Spinner from '../components/common/Spinner';

function ForgotPassword() {

    // to use dispatch()
    const dispatch = useDispatch();

    // step-1, fetch loading state from read-redux
    const {loading} = useSelector((state)=>state.auth);

    // step-2, also set emailSent false ie to handle both cases that if email sent then email Send page should be shown if not sent then reset password page should be shown
    const [emailSent, setEmailSent] = useState(false);

    const [email, setEmail] = useState("");

    // SEMI FINAL THING
    // create logic of dispatch in authAPI.jsx

    // FINAL THING
    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(getPasswordResetToken(email, setEmailSent))
    }

  return (
    <div className='grid min-h-[calc(100vh-5.5rem)] place-items-center'>

        {/* step-3 create UI */}
        {
            loading ? (
                <div className='text-white'><Spinner></Spinner></div>
            ) : (
                <div className="max-w-[500px] p-4 lg:p-8">
                    
                    <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
                        {
                            !emailSent ? "Reset Your Password" : "Check Your Email"
                        }
                    </h1>

                    <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
                        {
                            !emailSent ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery" : `We have sent the reset email to ${email}`
                        }
                    </p>

                    <form onSubmit={handleOnSubmit}>

                        {
                        !emailSent && (
                        <label className="w-full">
                            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            Email Address <sup className="text-pink-200">*</sup>
                            </p>
                            <input
                            required
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email address"
                            className=" form-style bg-richblack-800 text-richblack-5 w-full rounded-[0.5rem] p-[12px]  border-richblack-700 focus:border-yellow-50 focus:outline-none focus:border-opacity-60 border"
                            />
                        </label>
                        )
                        }

                        <button
                            type="submit"
                            className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
                            >
                            {!emailSent ? "Sumbit" : "Resend Email"}
                        </button>

                    </form>

                    <div className="mt-6 flex items-center justify-between">
                        <NavLink to="/login">
                        <p className="flex items-center gap-x-2 text-richblack-5">
                            <BiArrowBack /> Back To Login
                        </p>
                        </NavLink>
                    </div>

                </div>
            )
                
        }

    </div>
  )
}

export default ForgotPassword;