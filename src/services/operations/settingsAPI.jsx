import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { settingsEndpoints } from "../api";
import { setUser } from "../../redux/slices/profileSlice";
import { logout } from "./authAPI";


const {UPDATE_PROFILE_API, UPDATE_DISPLAY_PICTURE_API, CHANGE_PASSWORD_API, DELETE_ACCOUNT_API} = settingsEndpoints;
 
export function updateDisplayPicture(token, formData) {

    return async (dispatch) => {

        const toastId = toast.loading("Uploading...")
        try {

            const response = await apiConnector(
                "PUT", UPDATE_DISPLAY_PICTURE_API, formData, {
                    Authorization: `Bearer ${token}`,
                }
            );

            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Display Picture Updated Successfully");
            console.log("setUser......", response.data.profile);
            

            dispatch(setUser(response.data.profile)); //why this?? v.imppppp //It updates the Redux store with the latest user data returned by the backend.

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.profile)
            ); //to handle on refresh

        } catch (error) {

            console.log("UPDATE_DISPLAY_PICTURE_API API ERROR.......", error)
            toast.error("Could Not Update Display Picture")
        }
        
        toast.dismiss(toastId)
    }
}


// update profile information
export function updateProfile(token, data){
    console.log(data);
    

    return async (dispatch) => {

        const toastId = toast.loading("Updating Details...")
        try {

            const response = await apiConnector(
                "PUT", UPDATE_PROFILE_API, data, {
                    Authorization: `Bearer ${token}`,
                }
            );

            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Profile Details Updated Successfully");
            console.log("setUser..", response.data.user);
            

            dispatch(setUser(response.data.user)); //why this?? v.imppppp //It updates the Redux store with the latest user data returned by the backend.

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            ); //to handle on refresh

        } catch (error) {

            console.log("UPDATE_PROFILE_API API ERROR....", error)
            toast.error("Could Not Update Profile")
        }
        
        toast.dismiss(toastId)
    }
}


// changePassword
export function changePassword(token, data){

    return async (dispatch) => {

        const toastId = toast.loading("Changing Password...")
        try {

            // -----------------------------
            const response = await apiConnector(
                "POST", CHANGE_PASSWORD_API, data, {
                    Authorization: `Bearer ${token}`,
                }
            );

            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Password Updated Successfully");

            // console.log("setUser..", response.data.user); //no need here in updating the password

            // dispatch(setUser(response.data.user)); //why this?? v.imppppp //It updates the Redux store with the latest user data returned by the backend.

            // localStorage.setItem(
            //     "user",
            //     JSON.stringify(response.data.user)
            // ); //to handle on refresh

        } catch (error) {
            console.log(error.response?.data?.message );
            console.log("CHANGE PASSWORD API ERROR....", error);
            toast.error(error.response?.data?.message );
        }
        
        toast.dismiss(toastId)
    }
}



// delete account
export function deleteAccount(token, navigate){

    // console.log(data);

    return async (dispatch) => {

        const toastId = toast.loading("Deleting Account...")

        try {

            const response = await apiConnector(
                "DELETE", DELETE_ACCOUNT_API, null ,{
                    Authorization: `Bearer ${token}`,
                }
            );

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success(response?.data?.message || "Account deleted successfully");

            console.log(response?.data?.message);
            console.log("setUser..", response.data.user);
        

            dispatch(logout(navigate))

        } catch (error) {

            console.log("DELETE_PROFILE_API API ERROR....", error)
            toast.error(error.response?.data?.message  || "Could not delete account");
        }
        
        toast.dismiss(toastId)
    }
}