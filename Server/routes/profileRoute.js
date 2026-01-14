const express = require("express");
const { updateProfile, deleteAccount, getMyProfile, getEnrolledCourses, updateDisplayPicture, instructorDashboard } = require("../controllers/ProfileController");
const { auth, isInstructor } = require("../middlewares/AuthZ");
const router = express.Router();

// fetch all controllers

// define routes
router.put("/updateProfile", auth , updateProfile);
router.delete("/deleteAccount", auth, deleteAccount);
router.get("/getMyProfile",auth, getMyProfile);

router.get("/getEnrolledCourses",auth,getEnrolledCourses);
router.put("/updateDisplayPicture",auth,updateDisplayPicture);

// INSTRCUTOR DASHBOARD ROUTE
router.get("/instructorDashboard", auth, isInstructor, instructorDashboard)

module.exports = router;