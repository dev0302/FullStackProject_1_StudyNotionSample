import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    enrolledCourses: [],
    loading :false,
    user : localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
};

const profileSlice = createSlice({
    name:"profile",
    initialState:initialState,
    reducers:{
        setUser:(state,value)=>{
            state.user = value.payload;
        },

        setLoading:(state,value)=>{
            state.loading = value.payload;
        },
        setEnrolledCourses(state, action) {
        state.enrolledCourses = action.payload
        },
    }
});

export const {setUser, setLoading, setEnrolledCourses} = profileSlice.actions;
export default profileSlice.reducer;