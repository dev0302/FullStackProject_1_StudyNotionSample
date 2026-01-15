import toast from "react-hot-toast";
import { setLoading, setToken } from "../../redux/slices/authSlice"
import { endpoints } from "../api"
import { apiConnector } from "../apiconnector"
import { setUser } from "../../redux/slices/profileSlice";
import { resetCart } from "../../redux/slices/cartSlice";


// only here dispatch works without useDispatch()
// This is Redux Thunk.
// signUp() does NOT run immediately
// It returns a function
// Redux calls that function and injects dispatch automatically


const {LOGIN_API} = endpoints;
const {SENDOTP_API} = endpoints;
const {RESETPASSTOKEN_API} = endpoints;
const {RESETPASSWORD_API} = endpoints;
const {SIGNUP_API} = endpoints;


// login
export function login(email, password, navigate) {
    

    // This exports a thunk: a function that returns another function which receives dispatch. When you call dispatch(login(...)), Redux Thunk middleware runs this inner async function.

    // return function that Redux will execute later
    return async (dispatch) => {

        // 2️⃣ Show Loader & Set Loading State
        const toastId = toast.loading("Loading...");  
        dispatch(setLoading(true));

        try {

            // 3️⃣ Call Login API
            const response = await apiConnector("POST", LOGIN_API, {email, password});

            // 4️⃣ Validate API Response
            if (!response.data.success) {
                toast.error(response.data.message);
                return;
            }

            // 5️⃣ Login Success Feedback
            toast.success("Login Successful");

            // 6️⃣ Store Token in Redux
            dispatch(setToken(response.data.token))

            console.log("token :: ", response.data.token);
            
            
            // 7️⃣ Prepare User Profile Image
            // If user has profile image → use it
            // Else → generate avatar using initials
            const userImage = response.data?.user?.image ? response.data.user.image: `https://api.dicebear.com/5.x/initials/svg?...`;

            // 8️⃣ Store User in Redux
            dispatch(setUser({ ...response.data.user, image: userImage }));

            // 9️⃣ Persist Data in Local Storage
            // Keeps user logged in after page refresh
            // Redux alone would reset on refresh
            localStorage.setItem("token", JSON.stringify(response.data.token));localStorage.setItem("user", JSON.stringify(response.data.user));

            // 🔟 Redirect to Dashboard
            navigate("/dashboard/my-profile")

        } catch (error) {
            // 1️⃣ Handle Errors (Catch Block)
            toast.error(error.response?.data?.message || "Login Failed");
            console.log(error);
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
};


// logout
export function logout(navigate) {
    // jhase call hoga vo navigate bhejega
  return (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    dispatch(resetCart())
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    navigate("/")
  }
}


// sendOtp
export function sendOtp(email, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const toastId = toast.loading("Sending OTP...");

    try {
      const response = await apiConnector(
        "POST",
        SENDOTP_API,
        { email, checkUserPresent: true }
      );

      console.log("SENDOTP API RESPONSE:", response);

      // ✅ CASE 1: User already exists
      if (response.data?.success === false) {
        toast.error(response.data.message || "User already exists");
        dispatch(setLoading(false));
        toast.dismiss(toastId);
        return; // ⛔ STOP here
      }

      // ✅ CASE 2: OTP sent successfully
      toast.success("OTP Sent Successfully");
      navigate("/verify-email");

    } catch (error) {
      console.log("SENDOTP API ERROR:", error);

      // ✅ NETWORK / SERVER ERROR
      toast.error(
        error.response?.data?.message ||
        "Something went wrong. Please try again."
      );
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}




// getPasswordResetToken
// here we are taking 'setEmailSent', to mark it true to change ui
export function getPasswordResetToken(email, setEmailSent) {
    return async(dispatch) => {
        dispatch(setLoading(true));
        try {
            
            const response = await apiConnector("POST", RESETPASSTOKEN_API, {email});
            
            console.log("RESET PASSWORD TOKEN RESPONSE....", response);

            if(!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Reset Email Sent");
            setEmailSent(true)
            
        } catch (error) {
            console.log(error.response?.data?.message || "RESET PASSWORD TOKEN Error", error);
            toast.error("Failed to send email for resetting password");
        }

        dispatch(setLoading(false));
    }
}


// updatePassword
export function resetPassword(token, password, confirmPassword) {
    return async(dispatch) => {
        dispatch(setLoading(true));
        try{
          const response = await apiConnector("POST", RESETPASSWORD_API, {password, confirmPassword, token});

          console.log("RESET Password RESPONSE ... ", response);


          if(!response.data.success) {
              throw new Error(response.data.message);
          }

          toast.success("Password has been reset successfully");
          navigate("/dashboard/login");
        }
        catch(error) {
        console.log(error.response?.data?.message || "RESET PASSWORD TOKEN Error", error);
        toast.error("Unable to reset password");
        }
        dispatch(setLoading(false));
    }
}


// signUp
export function signUp(
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))

    
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      })


      console.log("SIGNUP API RESPONSE.....", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Signup Successful")
      navigate("/login")
    } catch (error) {
        console.log("SIGNUP API ERROR.......", error)
        toast.error(error.response?.data?.message || "Signup Failed");
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}