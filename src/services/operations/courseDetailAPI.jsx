import toast from "react-hot-toast";
import { courseEndpoints, endpoints } from "../api";
import { apiConnector } from "../apiconnector";

const {GET_ALL_COURSE_API} = courseEndpoints;
const {COURSE_CATEGORIES_API} = courseEndpoints;
const {EDIT_COURSE_API} = courseEndpoints;
const {CREATE_COURSE_API} = courseEndpoints;
const {UPDATE_SECTION_API} = courseEndpoints;
const {CREATE_SECTION_API} = courseEndpoints;
const {DELETE_SECTION_API} = courseEndpoints;
const {DELETE_SUBSECTION_API} = courseEndpoints;
const {UPDATE_SUBSECTION_API} = courseEndpoints;
const {CREATE_SUBSECTION_API} = courseEndpoints;
const {GET_ALL_INSTRUCTOR_COURSES_API} = courseEndpoints;
const {DELETE_COURSE_API} = courseEndpoints;
const {GET_FULL_COURSE_DETAILS_AUTHENTICATED} = courseEndpoints;
const {COURSE_DETAILS_API} = courseEndpoints;
const {LECTURE_COMPLETION_API} = courseEndpoints;
const {CREATE_RATING_API} = courseEndpoints;

export const getAllCourses = async () => {

    const toastId = toast.loading("Loading Courses...")
    let result = []
    
    try {

        const response = await apiConnector("GET", GET_ALL_COURSE_API);
        // console.log(response);

        if (!response.data.success) {
            throw new Error("Could Not Fetch Course Categories")
        }

        result = response?.data?.data;
        // console.log(result);
        

    } catch (error) {

        console.log("GET_ALL_COURSE_API API ERROR....", error)
        toast.error(error.message)
    }

    toast.dismiss(toastId)
    return result
}


export const addCourseDetails = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")

  try {
    if (!token) {
      throw new Error("Authentication required")
    }

    const response = await apiConnector(
      "POST",
      CREATE_COURSE_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    )

    console.log("CREATE COURSE API RESPONSE:", response)

    if (!response?.data?.success) {
      throw new Error(response?.data?.message)
    }

    toast.success("Course Details Added Successfully")
    result = response.data.data
  } catch (error) {
    console.error("CREATE COURSE API ERROR:", error)
    toast.error(
      error?.response?.data?.message || error.message || "Could not add course"
    )
  } finally {
    toast.dismiss(toastId)
  }

  return result
}


// edit the course details
export const editCourseDetails = async (data, token) => {
  let result = null
  const toastId = toast.loading("Saving...")

  try {
    if (!token) {
      throw new Error("Authentication required")
    }

    const response = await apiConnector(
      "PUT",
      EDIT_COURSE_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    )

    console.log("EDIT COURSE API RESPONSE:", response)

    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could not update course")
    }

    toast.success("Course Details Updated Successfully")
    console.log(response.data.data);
    
    result = response.data.data
  } catch (error) {
    console.error("EDIT COURSE API ERROR:", error)

    toast.error(
      error?.response?.data?.message ||
      error.message ||
      "Could not update course details"
    )
  } finally {
    toast.dismiss(toastId)
  }

  return result
}


export const fetchCourseDetails = async (courseId) => {
  const toastId = toast.loading("Loading...")
  let result = null

  try {
    if (!courseId) {
      throw new Error("Course ID is required")
    }

    const response = await apiConnector(
      "POST",
      COURSE_DETAILS_API,
      { courseId }
    )

    console.log("COURSE_DETAILS_API RESPONSE:", response)

    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could not fetch course details")
    }

    result = response.data.data
  } catch (error) {
    console.error("COURSE_DETAILS_API ERROR:", error)

    toast.error(
      error?.response?.data?.message ||
      error.message ||
      "Failed to fetch course details"
    )

    result = null
  } finally {
    toast.dismiss(toastId)
  }

  return result
}



// get full details of a course
// here using POST instead of GET as if i use GET request the body will not be sent and in backend error will come that body is undefined
// option - 1 : use POST instead of GET
// option - 2: sent body null and sent data in query and also in backend controller receieve it from query
export const getFullDetailsOfCourse = async (courseId, token) => {
  
  const toastId = toast.loading("Loading...")
  let result = null
  try {
    const response = await apiConnector(
      "POST",
      GET_FULL_COURSE_DETAILS_AUTHENTICATED,
      { courseId },
      { Authorization: `Bearer ${token}` }
    )

    console.log("COURSE_FULL_DETAILS_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    
    // Result contains: { courseDetails, totalDuration, completedVideos }
    result = response?.data?.data
    
  } catch (error) {
    console.log("COURSE_FULL_DETAILS_API API ERROR............", error)
    // ✅ Better error handling: Don't let result be the error object
    // Only return the error message if specifically needed, 
    // otherwise keep result as null/empty to avoid UI crashes.
    const errorMessage = error.response?.data?.message || error.message;
    toast.error(errorMessage);
  }
  
  toast.dismiss(toastId)
  return result
}




// fetching the available course categories
export const fetchCourseCategories = async () => {
  let result = []
  // const toastId = toast.loading("Loading categories...")

  try {
    const response = await apiConnector("GET", COURSE_CATEGORIES_API)

    console.log("COURSE_CATEGORIES_API RESPONSE:", response)

    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could not fetch categories")
    }

    result = response.data.data
  } catch (error) {
    console.error("COURSE_CATEGORY_API ERROR:", error)

    toast.error(
      error?.response?.data?.message ||
      error.message ||
      "Failed to load categories"
    )
  } finally {
    // toast.dismiss(toastId)
  }

  return result
}



// update Section
export const updateSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Updating Section...")

  try {
    if (!token) {
      throw new Error("Authentication required")
    }

    const response = await apiConnector(
      "PUT",
      UPDATE_SECTION_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    )

    console.log("UPDATE SECTION API RESPONSE:", response)

    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could not update section")
    }

    toast.success("Section Updated Successfully")
    result = response.data.data
  } catch (error) {
    console.error("UPDATE SECTION API ERROR:", error)

    toast.error(
      error?.response?.data?.message ||
      error.message ||
      "Could not update section details"
    )
  } finally {
    toast.dismiss(toastId);
  }
  return result;
}



// create Section
export const createSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Creating Section...")

  try {
    if (!token) {
      throw new Error("Authentication required")
    }

    const response = await apiConnector(
      "POST",
      CREATE_SECTION_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    )

    console.log("CREATE SECTION API RESPONSE:", response)

    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could not create section")
    }

    toast.success("Section Created Successfully")
    result = response.data.updatedCourse
    
  } catch (error) {
    console.error("CREATE-SECTION-API-ERROR:", error)

    toast.error(
      error?.response?.data?.message ||
      "Could not create section"
    )
  } finally {
    toast.dismiss(toastId);
  }
  return result;
}


// delete Section // sometimeshere using POST is better instead of DELETE but why??
export const deleteSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Deleting Section...")

  try {
    if (!token) {
      throw new Error("Authentication required")
    }

    const response = await apiConnector(
      "DELETE",
      DELETE_SECTION_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    )

    console.log("DELETE SECTION API RESPONSE:", response)

    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could not delete section")
    }

    toast.success("Section Deleted Successfully")
    result = response.data.data //here data: deletedSection, will be returned
    
  } catch (error) {
    console.error("DELETE-SECTION-API-ERROR:", error)

    toast.error(
      error?.response?.data?.message ||
      "Could not delete section"
    )
  } finally {
    toast.dismiss(toastId);
  }
  return result;
}



// create subSection
export const createSubSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Creating SubSection...")

  try {
    if (!token) {
      throw new Error("Authentication required")
    }

    const response = await apiConnector(
      "POST",
      CREATE_SUBSECTION_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    )

    console.log("CREATE SUBSECTION API RESPONSE:", response)

    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could not create sub-section")
    }

    toast.success("SubSection Created Successfully")
    result = response.data.updatedCourse
    
  } catch (error) {
    console.error("CREATE-SUB-SECTION-API-ERROR:", error)

    toast.error(
      error?.response?.data?.message ||
      "Could not create sub-section"
    )
  } finally {
    toast.dismiss(toastId);
  }
  return result;
}



// Delete subSection
export const deleteSubSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Deleting Sub Section...")

  try {
    if (!token) {
      throw new Error("Authentication required")
    }

    const response = await apiConnector(
      "DELETE",
      DELETE_SUBSECTION_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    )

    console.log("DELETE SUB SECTION API RESPONSE:", response)

    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could not delete sub-section")
    }

    toast.success("SubSection Deleted Successfully")
    result = response.data.updatedCourse //here data: deletedSubSection, will be returned
    console.log("delete-subsection-resultt", result);
    
    
  } catch (error) {
    console.error("DELETE-SUB-SECTION-API-ERROR:", error)

    toast.error(
      error?.response?.data?.message ||
      "Could not delete sub-section"
    )
  } finally {
    toast.dismiss(toastId);
  }
  return result;
}



// // update subSection
export const updateSubSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Updating SubSection...")

  try {
    if (!token) {
      throw new Error("Authentication required")
    }

    const response = await apiConnector(
      "PUT",
      UPDATE_SUBSECTION_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    )

    console.log("UPDATE SUBSECTION API RESPONSE:", response)

    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could not update sub-section")
    }

    toast.success("SubSection Updated Successfully")
    result = response.data.updatedCourse;
    console.log("updatesSubsection result", result);
    
  } catch (error) {
    console.error("UPDATE SUBSECTION API ERROR:", error)

    toast.error(
      error?.response?.data?.message ||
      error.message ||
      "Could not update sub-section details"
    )
  } finally {
    toast.dismiss(toastId);
  }
  return result;
}



// fetching all courses under a specific instructor
export const fetchInstructorCourses = async (token) => {
  let result = []
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector(
      "GET",
      GET_ALL_INSTRUCTOR_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )
    console.log("INSTRUCTOR COURSES API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Instructor Courses")
    }
    result = response?.data?.data
  } catch (error) {
    console.log("INSTRUCTOR COURSES API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}



// delete a course
export const deleteCourse = async (data, token) => {
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("DELETE", DELETE_COURSE_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("DELETE COURSE API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Course")
    }
    toast.success("Course Deleted")
  } catch (error) {
    console.log("DELETE COURSE API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
}



// // mark a lecture as complete
export const markLectureAsComplete = async (data, token) => {
  let result = null
  console.log("mark complete data", data)
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", LECTURE_COMPLETION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log(
      "MARK_LECTURE_AS_COMPLETE_API API RESPONSE............",
      response
    )

    if (!response.data.success) {
      throw new Error(response.data.message || "Could not mark as complete")
    }

    toast.success("Lecture Completed")
    result = true

  } catch (error) {
    console.log("MARK_LECTURE_AS_COMPLETE_API API ERROR............", error)
    toast.error(error.response?.data?.message || "Failed to update progress")
    result = false
  }
  toast.dismiss(toastId)
  return result

}


// create a rating for course
export const createRating = async (data, token) => {
  const toastId = toast.loading("Loading...")
  let success = false
  try {
    const response = await apiConnector("POST", CREATE_RATING_API, data, {
      Authorization: `Bearer ${token}`,
    })

    console.log("CREATE RATING API RESPONSE............", response)

    if (!response?.data?.success) {
      throw new Error(response.data.message || "Could Not Create Rating")
    }

    toast.success("Rating Created Successfully")
    success = true
  } catch (error) {
    success = false
    console.log("CREATE RATING API ERROR............", error)
    
    // ✅ Extract the specific error message from the backend response
    const errorMessage = 
        error.response?.data?.message || 
        error.message || 
        "Could not create rating";
        
    toast.error(errorMessage)
  }
  toast.dismiss(toastId)
  return success
}