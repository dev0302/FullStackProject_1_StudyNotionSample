import { toast } from "react-hot-toast"
import { apiConnector } from "../apiconnector"
import { catalogDataEndpoints } from "../api";

const {CATALOGPAGEDATA_API} = catalogDataEndpoints;

export const getCatalogPageData = async (categoryId) => {
  const toastId = toast.loading("Loading...")
  let result = []
  
  try {
    const response = await apiConnector(
      "POST",
      CATALOGPAGEDATA_API,
      { categoryId: categoryId }
    )

    console.log("CATALOG PAGE DATA API RESPONSE............", response)

    if (!response?.data?.success) {
      throw new Error("Could not fetch Category page data")
    }

    // This returns the object containing selectedCategory, differentCategory, and mostSellingCourses
    result = response?.data?.data
    
  } catch (error) {
    console.log("CATALOG PAGE DATA API ERROR............", error)
    toast.error(error.response?.data?.error)
    result = error.response?.data?.data
  }
  
  toast.dismiss(toastId)
  return result
}