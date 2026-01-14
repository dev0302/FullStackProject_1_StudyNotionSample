import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { BiArrowBack } from "react-icons/bi"
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { resetPassword } from '../services/operations/authAPI';

function UpdatePassword() {

    const {loading} = useSelector((state)=>state.auth);

    const location = useLocation(); //for token
    const dispatch = useDispatch(); //for calling authAPI
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // formData to take data from form input i.e password, confirmpassword, email etc
    const [formData, setFormData] = useState({
        password : "",
        confirmPassword : "",
    });

    const {password, confirmPassword} = formData;

    // now to show and update ui on every new text input, ie rendering
    const handleOnChange = (event) => {
        setFormData( (prevData) => (
            {
                ...prevData,
                [event.target.name] : event.target.value,
                
            }
        ) )
    }

    // now the funcn to handle on submit
    const handleOnSubmit = (event) => {
        event.preventDefault();
        const token = location.pathname.split("/").at(-1);
        // now understanding this token, since the random url that will be sent will be containg the token, location() is used to get current path
        // https://localhost:5173/updatePassword 25cd5fe9-2be5-4538-af40-54e119caae68 --> this last part after '/' is the token which need to be sent during password reset

        dispatch(resetPassword(token, password, confirmPassword, navigate))
    }

  return (
    <div className='grid min-h-[calc(100vh-5.5rem)] place-items-center'>
        {
            loading ? (

                <div className='text-white'>Loading...</div>

            ) : (
                <div>

                    <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">Choose new password</h1>

                    <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">Almost done. Enter your new password and youre all set.</p>

                    <form onSubmit={handleOnSubmit}>
                        <label className="relative">
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            New Password <sup className="text-pink-200">*</sup>
                        </p>
                        <input
                            required
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={password}
                            onChange={handleOnChange}
                            placeholder="Enter Password"
                            className="form-style !pr-10 inputBox_style"
                        />
                        <span
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                        >
                            {showPassword ? (
                            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                            ) : (
                            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                            )}
                        </span>
                        </label>
                        <label className="relative mt-3 block">
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            Confirm New Password <sup className="text-pink-200">*</sup>
                        </p>
                        <input
                            required
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleOnChange}
                            placeholder="Confirm Password"
                            className="form-style !pr-10 inputBox_style"
                        />
                        <span
                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                            className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                        >
                            {showConfirmPassword ? (
                            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                            ) : (
                            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                            )}
                        </span>
                        </label>

                        <button
                        type="submit"
                        className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
                        >
                        Reset Password
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

export default UpdatePassword;