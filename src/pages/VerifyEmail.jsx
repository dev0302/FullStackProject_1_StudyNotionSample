import { useEffect, useState } from 'react';
import { OTPInput } from "input-otp";
import { useDispatch, useSelector } from 'react-redux';
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { NavLink, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { sendOtp, signUp } from '../services/operations/authAPI';


function VerifyEmail() {

    const {loading} = useSelector((state)=>state.auth);
    const {signupData} = useSelector((state)=>state.auth);

    const [otp, setOtp] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes = 300 seconds
        const formatTime = (seconds) => {
            const m = Math.floor(seconds / 60);
            const s = seconds % 60;
            return `${m}:${s < 10 ? "0" : ""}${s}`;
        };

    


// -------------------------------------------------------------

    // in last to handle that case if no data got from signupData
    useEffect(() => {
        // Only allow access of this route when user has filled the signup form
        if (!signupData) {
            navigate("/signup");
            toast.error("SignUp First..Direct otp kha se ayega!!!!")
        }
        
    }, []);

    useEffect(() => {
        if (timeLeft === 0) return;

        const interval = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timeLeft]);


    // issey hoga ye ki jaise hi ye page open hoga so for very first render [], useEffect work krega jo ye chk krega bs ek br ki signupData empty to nhi, if empty hoga to apne aap hi vapis signup pe redirect krdega, for eg if will write http://localhost:5173/verify-email, to automatically vapis http://localhost:5173/signup pe lejayega

// -------------------------------------------------------------

    // handle on submit/
    const handleVerifyAndSignup = (event) => {

        event.preventDefault();

        // first get all data from auth signup.., remeber? as we saved a data in redux slice of authSlice, so now fetch from there.
        const {accountType, firstName,lastName,email,password,confirmPassword} = signupData; //do not indlucde navigate

        dispatch(signUp( accountType, firstName,lastName,email,password,confirmPassword,otp,navigate));
    }

  return (
        <div className='min-h-[calc(100vh-5.5rem)] grid place-items-center'>
            {
                loading ? (
                    <div className='text-white'>Loading...</div>
                ) :
                (
                    <div className="max-w-[500px] p-4 lg:p-8">
                        <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">Verify Email</h1>
                        
                        <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100">
                            A verification code has been sent to you. Enter the code below
                        </p>

                        <form onSubmit={handleVerifyAndSignup}>
                            <OTPInput
                                value={otp}
                                onChange={setOtp}
                                maxLength={6}
                                containerClassName="flex justify-between gap-[6px]"
                                render={({ slots }) => (
                                    <>
                                    {slots.map((slot, index) => (
                                        <div key={index} className="relative">
                                            <input
                                                {...slot}
                                                className={`w-[48px] lg:w-[60px] aspect-square border-0 bg-richblack-800 rounded-[0.5rem] text-transparent caret-yellow-50 text-center focus:outline-none ${slot.isActive ? "outline outline-2 outline-yellow-50" : ""}`}
                                            />
                                            <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-white text-lg font-semibold">
                                                {slot.char || "-"}
                                            </div>
                                        </div>
                                    ))}
                                    </>
                                )}
                            />

                            {/* ✅ ADDED: Hint for users to check All Mail/Spam */}
                            <p className="mt-4 text-richblack-50 text-base">
                                Can't find the email? Check your 
                                
                                <span className="text-yellow-50 font-medium text-base"> All Mail</span> folders.
                            </p>

                            <button
                                type="submit"
                                className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900"
                            >
                                Verify Email
                            </button>
                        </form>

                        <div className="mt-6 flex items-center justify-between">
                            <NavLink to="/signup">
                                <p className="text-richblack-5 flex items-center gap-x-2">
                                    <BiArrowBack /> Back To Signup
                                </p>
                            </NavLink>

                            <button
                                className={`flex items-center gap-x-2 ${
                                    timeLeft > 0 ? "text-richblack-400 cursor-not-allowed" : "text-blue-100"
                                }`}
                                onClick={() => {
                                    if(timeLeft === 0) {
                                        dispatch(sendOtp(signupData.email, navigate));
                                        setTimeLeft(300);
                                    }
                                }}
                            >
                                <RxCountdownTimer />
                                {timeLeft > 0 ? `Resend in ${formatTime(timeLeft)}` : "Resend OTP"}
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default VerifyEmail;