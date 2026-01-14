import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/slices/authSlice"
import profileReducer from "../redux/slices/profileSlice"
import cartReducer from "../redux/slices/cartSlice"
import courseReducer from "../redux/slices/courseSlice"
import viewCourseReducer from "../redux/slices/viewCourseSlice"

export const store = configureStore({
    reducer:{
        auth : authReducer,
        profile : profileReducer,
        cart : cartReducer,
        course : courseReducer,
        viewCourse : viewCourseReducer
    }
})