import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "swiper/css/navigation"

// Import required modules
import { Autoplay, FreeMode, Pagination, Navigation } from "swiper/modules"
import CourseCard from "./CourseCard"

const CourseSlider = ({ Courses }) => {
  return (
    <>
      {Courses?.length ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={25}
          /* Only loop if data exceeds the desktop view count */
          loop={Courses?.length > 3}
          modules={[FreeMode, Pagination, Autoplay, Navigation]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          navigation={true}
          breakpoints={{
            // When window width is >= 1024px (desktop)
            1024: {
              slidesPerView: 3,
            },
          }}
          className="max-h-[30rem] pb-12 pt-4"
        >
          {Courses?.map((course, i) => (
            <SwiperSlide key={i}>
              <CourseCard course={course} Height={"h-[250px]"} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-xl text-richblack-300">No Courses Found</p>
      )}
    </>
  )
}

export default CourseSlider