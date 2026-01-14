import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiPencil, HiOutlineEye } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegClock } from "react-icons/fa";
import { FiClock, FiDollarSign } from "react-icons/fi";
import { IoTimeOutline } from "react-icons/io5";
import ConfirmationModal from '../../../common/ConfirmationModal';
import { deleteCourse, fetchInstructorCourses } from '../../../../services/operations/courseDetailAPI';
import { useSelector } from 'react-redux';


const CourseTable = ({ courses, setCourses }) => {
    const navigate = useNavigate();
    const TRUNCATE_LENGTH = 40;
    const { token } = useSelector((state) => state.auth);

    const [confirmationModal, setConfirmationModal] = useState(false);
    const [loading, setLoading] = useState(false);

    // ✅ HELPER: Calculate Total Duration of Course
    const getCourseDuration = (course) => {
        let totalSeconds = 0;
        course.courseContent?.forEach((section) => {
            section.subSection?.forEach((subSection) => {
                totalSeconds += parseFloat(subSection?.timeDuration) || 0;
            });
        });

        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = Math.floor(totalSeconds % 60);

        if (hours > 0) return `${hours}h ${minutes}m`;
        if (minutes > 0) return `${minutes}m ${seconds}s`;
        return `${seconds}s`;
    };

    const handleDeleteCourse = async (courseId) => {
        setLoading(true);
        await deleteCourse({ courseId: courseId }, token);
        const result = await fetchInstructorCourses(token);
        if (result) {
            setCourses(result);
        }
        setConfirmationModal(null);
        setLoading(false);
    };

    return (
        <div className="rounded-2xl border border-white/20 bg-richblack-800 shadow-2xl overflow-hidden">
            
            {/* SECTION: TABLE HEADER (Hidden on Mobile) */}
            <div className="hidden md:block px-6 py-4 bg-richblack-800 border-b border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                <div className="flex items-center justify-between">
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-white tracking-tight">Your Course Library</h3>
                    </div>
                    <div className="grid grid-cols-3 gap-8 w-[35%] lg:w-[30%]">
                        <div className="text-center text-richblack-100 flex items-center justify-center gap-2">
                            <IoTimeOutline className="text-blue-200" />
                            <span className="text-xs font-bold uppercase tracking-widest">Duration</span>
                        </div>
                        <div className="text-center text-richblack-100 flex items-center justify-center gap-2">
                            <FiDollarSign className="text-caribbeangreen-200" />
                            <span className="text-xs font-bold uppercase tracking-widest">Price</span>
                        </div>
                        <div className="text-center text-xs font-bold uppercase tracking-widest text-richblack-100">
                            Actions
                        </div>
                    </div>
                </div>
            </div>

            {/* SECTION: TABLE BODY */}
            <div className="flex flex-col gap-y-8 p-4 bg-richblack-900 sm:gap-y-4">
                {courses?.length === 0 ? (
                    <div className="py-20 text-center px-4 bg-richblack-900">
                        <div className="inline-flex flex-col items-center justify-center space-y-6">
                            <div className="w-20 h-20 rounded-full bg-richblack-800 flex items-center justify-center border border-white/10 shadow-xl">
                                <svg className="w-10 h-10 text-richblack-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <p className="text-2xl font-bold text-white">No courses created yet.</p>
                            <button onClick={() => navigate("/dashboard/add-course")} className="px-8 py-3 bg-yellow-50 text-richblack-900 rounded-xl font-bold hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,214,10,0.3)]">
                                Create Your First Course
                            </button>
                        </div>
                    </div>
                ) : (
                    courses?.map((course) => (
                        <div key={course._id} className="group px-4 py-6 sm:px-6 bg-richblack-800 rounded-xl border border-white/10 hover:border-white/30 transition-all duration-300 relative">
                            {/* Hover light highlight */}
                            <div className="absolute inset-y-0 left-0 w-1 bg-yellow-50 opacity-0 group-hover:opacity-100 transition-all"></div>
                            
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                
                                {/* LEFT: COURSE DETAILS */}
                                <div className="flex-1 flex flex-col sm:flex-row gap-5">
                                    <div onClick={()=>navigate(`/courses/${course._id}`)} className="relative shrink-0 cursor-pointer group/img" >
                                        <img src={course?.thumbnail} alt={course?.courseName} className="h-[160px] w-full sm:h-32 sm:w-52 rounded-2xl object-cover border border-white/10 group-hover/img:border-white/40 transition-all duration-300" />
                                        <div className="absolute inset-0 bg-black/50 rounded-2xl opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                                            <div className="p-3 bg-white/20 rounded-full border border-white/30">
                                                <HiOutlineEye className="text-white text-2xl" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col justify-center">
                                        <div className="space-y-3">
                                            <div className="flex flex-wrap items-center gap-3">
                                                <h3 className="text-xl font-bold text-white group-hover:text-yellow-50 transition-colors leading-tight">{course.courseName}</h3>
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${course.status === "Draft" ? "bg-pink-900/40 text-pink-200 border border-pink-500/30" : "bg-caribbeangreen-900/40 text-caribbeangreen-200 border border-caribbeangreen-500/30"}`}>
                                                    {course.status === "Draft" ? <><FaRegClock /> Draft</> : <><div className="w-1.5 h-1.5 rounded-full bg-caribbeangreen-200 animate-pulse" /> Published</>}
                                                </span>
                                            </div>
                                            <p className="text-sm text-richblack-200 leading-relaxed line-clamp-2 max-w-2xl">
                                                {course.description}
                                            </p>
                                            <div className="flex items-center gap-4 text-[11px] font-bold text-richblack-400 uppercase tracking-wider">
                                                <span className="flex items-center gap-1"><FiClock className="text-blue-200" /> {new Date(course.createdAt).toLocaleDateString()}</span>
                                                <span className="w-1 h-1 rounded-full bg-richblack-600"></span>
                                                <span className="flex items-center gap-1 text-richblack-200">{course?.studentEnrolled?.length || 0} Students Enrolled</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* RIGHT: STATS & ACTIONS */}
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 md:w-[35%] lg:w-[30%] items-center border-t border-white/5 pt-6 md:border-none md:pt-0">
                                    {/* Duration */}
                                    <div className="flex flex-col md:items-center gap-1">
                                        <span className="text-[10px] md:hidden uppercase font-black text-richblack-500 tracking-tighter">Duration</span>
                                        <div className="flex items-center gap-2 bg-richblack-800 md:bg-transparent p-2 md:p-0 rounded-lg border border-white/5 md:border-none">
                                            <span className="text-sm font-black text-white">{getCourseDuration(course)}</span>
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <div className="flex flex-col md:items-center gap-1">
                                        <span className="text-[10px] md:hidden uppercase font-black text-richblack-500 tracking-tighter">Investment</span>
                                        <div className="flex items-center gap-1 bg-richblack-800 md:bg-transparent p-2 md:p-0 rounded-lg border border-white/5 md:border-none">
                                            <span className="text-sm font-black text-yellow-50">₹{course.price}</span>
                                        </div>
                                    </div>

                                    {/* Buttons */}
                                    <div className="flex items-center md:justify-center gap-3 col-span-2 md:col-span-1 mt-2 md:mt-0">
                                        <button onClick={() => navigate(`/dashboard/edit-course/${course._id}`)} className="flex-1 md:flex-none w-11 h-11 rounded-xl bg-richblack-800 flex items-center justify-center hover:bg-blue-600 hover:text-white border border-white/10 transition-all text-blue-200 shadow-lg" title="Edit">
                                            <HiPencil className="text-xl" />
                                        </button>
                                        <button disabled={loading} onClick={() => setConfirmationModal({ text1: "Delete this Course?", text2: "All the data in this course will be deleted", btn1Text: "Delete", btn2Text: "Cancel", btn1Handler: () => handleDeleteCourse(course._id), btn2Handler: () => setConfirmationModal(null) })} className="flex-1 md:flex-none w-11 h-11 rounded-xl bg-richblack-800 flex items-center justify-center hover:bg-pink-600 hover:text-white border border-white/10 transition-all text-pink-200 shadow-lg" title="Delete">
                                            <RiDeleteBin6Line className="text-xl" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* SECTION: TABLE FOOTER */}
            {courses?.length > 0 && (
                <div className="px-6 py-4 bg-richblack-800 border-t border-white/10 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-caribbeangreen-200 shadow-[0_0_8px_rgba(5,255,180,0.8)] animate-pulse"></div>
                        <span className="text-xs font-bold text-richblack-100 uppercase tracking-widest">{courses?.length} course{courses?.length !== 1 ? 's' : ''} available</span>
                    </div>
                </div>
            )}

            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </div>
    );
};

export default CourseTable;