import toast from "react-hot-toast";
import { profileEndpoints } from "../api";
import { apiConnector } from "../apiconnector";

const {GET_USER_ENROLLED_COURSES_API} = profileEndpoints;
const {GET_INSTRUCTOR_DATA_API} = profileEndpoints;
const {GET_USER_PAYMENT_HISTORY_API} = profileEndpoints;

export async function getUserEnrolledCourses(token) {

    const toastId = toast.loading("Fetching...")

    let result = [];

    try {

        const response = await apiConnector(
            "GET", GET_USER_ENROLLED_COURSES_API, null, {
                Authorization: `Bearer ${token}`,
            }
        );

        // console.log(response.data);
        // console.log(response.data.enrolledCourses);
        

        if (!response.data.success) {
            throw new Error(response.data.message)
        }

        result =response.data.enrolledCourses
        console.log("succssfully fetched courses");
        // return result; //dont return here.... nhi to directly yhi return hojayega and toast.dismiss bhi run nhi krega

        // console.log(result);
        
        

    } catch (error) {

        console.error("GET_USER_ENROLLED_COURSES_API API ERROR......", error)
        toast.error(error.response?.data?.message ||"Could Not Get Enrolled Courses")
    }
    
    toast.dismiss(toastId)
    return result;

}



export async function getInstructorData(token) {
  const toastId = toast.loading("Loading Dashboard...")
  let result = []
  try {
    const response = await apiConnector("GET", GET_INSTRUCTOR_DATA_API, null, {
      Authorization: `Bearer ${token}`,
    })

    console.log("GET_INSTRUCTOR_DATA_API RESPONSE: ", response)
    
    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    
    result = response.data.courses
  } catch (error) {
    console.log("GET_INSTRUCTOR_DATA_API ERROR: ", error)
    toast.error("Could not fetch Instructor Data")
  }
  toast.dismiss(toastId)
  return result
}


// fake payment history
export async function getUserPurchaseHistory(token) {
  let result = [];
  try {
    const response = await apiConnector(
      "GET", 
      GET_USER_PAYMENT_HISTORY_API, 
      null, 
      { Authorization: `Bearer ${token}` }
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data.data;
  } catch (error) {
    console.log("PAYMENT_HISTORY_API ERROR...", error);
  }
  return result;
}