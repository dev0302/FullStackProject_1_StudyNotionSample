import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Footer from "../components/common/Footer"
import CourseCard from "../components/core/CatalogPage/CourseCard"
import CourseSlider from "../components/core/CatalogPage/CourseSlider"
import { getCatalogPageData } from "../services/operations/catalogDetailsAPI"
import { fetchCourseCategories } from "../services/operations/courseDetailAPI"

function Catalog() {
  const { catalogName } = useParams()
  const [active, setActive] = useState(1)
  const [catalogPageData, setCatalogPageData] = useState(null)
  const [categoryId, setCategoryId] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true)
      const categories = await fetchCourseCategories()
      const category_details = categories?.find(
        (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
      )
      if (category_details) {
        setCategoryId(category_details._id)
      }
    }
    if (catalogName) getCategories()
  }, [catalogName])

  useEffect(() => {
    const getCategoryDetails = async () => {
      try {
        const res = await getCatalogPageData(categoryId)
        if (res) {
          setCatalogPageData(res)
        }
      } catch (error) {
        console.error("CATALOG_PAGE_API_ERROR", error)
      }
      setLoading(false)
    }
    if (categoryId) getCategoryDetails()
  }, [categoryId])

  if (loading) {
    return (
      <div className="grid min-h-[calc(100vh-5.5rem)] place-items-center bg-richblack-900">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="bg-richblack-900 min-h-screen font-inter mx-auto w-11/12 sm:w-full">
      {/* Hero Section - Optimized for Mobile & Laptop */}
      <div className="relative bg-gradient-to-b from-richblack-800 to-richblack-900 border-b border-richblack-700">
        <div className="mx-auto flex min-h-[200px] sm:min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 px-4 py-8 lg:max-w-maxContent w-11/12">
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-richblack-300">
            <span className="hover:text-richblack-50 cursor-pointer transition-all">Home</span>
            <span>/</span>
            <span>Catalog</span>
            <span>/</span>
            <span className="text-yellow-50 font-medium truncate max-w-[150px] sm:max-w-none">
              {catalogPageData?.selectedCategory?.name}
            </span>
          </nav>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-richblack-5 tracking-tight">
            {catalogPageData?.selectedCategory?.name}
          </h1>
          <p className="max-w-[800px] text-sm sm:text-lg text-richblack-200 leading-relaxed">
            {catalogPageData?.selectedCategory?.description}
          </p>
        </div>
      </div>

      {/* Content Sections */}
      <div className="mx-auto box-content w-11/12 max-w-maxContentTab px-4 py-8 sm:py-16 lg:max-w-maxContent">
        
        {/* Section 1: Main Category Sliders */}
        <section className="mb-12 sm:mb-20">
          <h2 className="text-xl sm:text-3xl font-bold text-richblack-5 mb-4 sm:mb-8">
            Courses to get you started
          </h2>
          
          {/* Horizontal scrollable tabs on small mobile to prevent wrapping */}
          <div className="mb-6 sm:mb-8 flex border-b border-richblack-700 text-xs sm:text-sm font-medium overflow-x-auto whitespace-nowrap scrollbar-hide">
            <button
              className={`px-4 sm:px-6 py-3 transition-all duration-300 ${
                active === 1 
                ? "border-b-2 border-yellow-50 text-yellow-50" 
                : "text-richblack-400 hover:text-richblack-100"
              }`}
              onClick={() => setActive(1)}
            >
              Most Popular
            </button>
            <button
              className={`px-4 sm:px-6 py-3 transition-all duration-300 ${
                active === 2 
                ? "border-b-2 border-yellow-50 text-yellow-50" 
                : "text-richblack-400 hover:text-richblack-100"
              }`}
              onClick={() => setActive(2)}
            >
              New
            </button>
          </div>
          
          <div className="py-2">
            <CourseSlider 
                Courses={catalogPageData?.selectedCategory?.courses} 
                active={active} 
            />
          </div>
        </section>

        {/* Section 2: Different Category Recommendations */}
        <section className="mb-12 sm:mb-20">
          <h2 className="text-xl sm:text-3xl font-bold text-richblack-5 mb-4 sm:mb-8">
            Top courses in <span className="text-blue-200 italic">"{catalogPageData?.differentCategory?.name}"</span>
          </h2>
          <div className="py-2">
            <CourseSlider Courses={catalogPageData?.differentCategory?.courses} />
          </div>
        </section>

        {/* Section 3: Frequently Bought Grid */}
        <section className="pb-12 sm:pb-20">
          <div className="flex flex-col gap-2 mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-3xl font-bold text-richblack-5">Frequently Bought</h2>
            <div className="h-[2px] w-12 sm:w-20 bg-yellow-100"></div>
          </div>
          
          {/* Responsive Grid Logic: 1 column on mobile, 2 on tablet, 2 on laptop/desktop */}
          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-2">
            {catalogPageData?.mostSellingCourses?.slice(0, 4).map((course, i) => (
              <div key={i} className="hover:transform hover:scale-[1.01] transition-all duration-300">
                {/* Responsive Height for Course Card - keeps cards uniform on small screens */}
                <CourseCard course={course} Height={"h-[250px] sm:h-[350px] lg:h-[380px]"} />
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}

export default Catalog