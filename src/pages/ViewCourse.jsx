import React, { useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import VideoDetailsSiderbar from '../components/core/ViewCoursePage/VideoDetailsSiderbar';
import { useDispatch, useSelector } from 'react-redux';
import { getFullDetailsOfCourse } from '../services/operations/courseDetailAPI';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../redux/slices/viewCourseSlice';
import CourseReviewModal from '../components/core/ViewCoursePage/CourseReviewModal';


function ViewCourse() {
    const dispatch = useDispatch();
    const { courseId } = useParams();
    const { token } = useSelector((state) => state.auth);
    const [reviewModal, setReviewModal] = useState(false);

    useEffect(() => {
        const setCourseSpecificData = async () => {
            const result = await getFullDetailsOfCourse(courseId, token);
            if (result) {
                dispatch(setEntireCourseData(result.courseDetails));
                dispatch(setCourseSectionData(result.courseDetails.courseContent));
                dispatch(setCompletedLectures(result.completedVideos));
                
                let total_lectures = 0;
                result?.courseDetails?.courseContent?.forEach((sec) => {
                    total_lectures += sec.subSection.length;
                });
                dispatch(setTotalNoOfLectures(total_lectures));
            }
        }
        setCourseSpecificData();
    }, [courseId, token, dispatch]); 

    return (
        <div className="relative flex flex-col md:flex-row min-h-screen bg-richblack-900">
            
            {/* 1. Sidebar - Set to order-1 on mobile so it appears ABOVE the video */}
            <div className="order-1 w-full md:w-[320px] md:h-[calc(100vh-3.5rem)] md:sticky md:top-[3.5rem] bg-richblack-800 border-b md:border-b-0 md:border-r border-richblack-700">
                <VideoDetailsSiderbar setReviewModal={setReviewModal} />
            </div>

            {/* 2. Video Player Area - Set to order-2 on mobile */}
            <div className="order-2 flex-1 w-full">
                <div className="mx-0 sm:mx-6">
                    <Outlet />
                </div>
            </div>

            {/* Modal Overlay */}
            {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
        </div>
    )
}

export default ViewCourse