const express = require("express");
const { createCourse, getAllCourses, getCourseDetails, enrollStudents, editCourse, getInstructorCourses, deleteCourse, getFullCourseDetails } = require("../controllers/CourseController");
const { auth, isInstructor, isAdmin } = require("../middlewares/AuthZ");
const { createSection, updateSection, deleteSection } = require("../controllers/SectionController");
const { createSubSection, updateSubSection, deleteSubSection } = require("../controllers/subSectionController");
const { createCategory, showAllCategory, categoryPageDetails } = require("../controllers/CategoryController");
const { createRating, getAverageRating, getAllRating } = require("../controllers/RantingAndReviewController");
const { createTag, findAllTag } = require("../controllers/TagsController");
const { updateCourseProgress } = require("../controllers/CourseProgress");
const router = express.Router();

// fetch all controllers

// define routes 

// -------------Section-----------

// create course
router.post("/createCourse",auth, isInstructor , createCourse); //only instructor

// get all courses
router.get("/getAllCourses", getAllCourses);

// get specific course details
router.post("/getCourseDetails", getCourseDetails);

// edit course
router.put("/editCourseDetails", auth, editCourse); //only instructor

router.get("/getInstructorCourses", auth, getInstructorCourses); //only instructor

router.delete("/deleteCourse", auth, deleteCourse); //only instructor

router.post("/getFullCourseDetails", auth, getFullCourseDetails); //only instructor

router.post("/updateCourseProgress", auth, updateCourseProgress); //only instructor



// -------------Section-----------

// createSection
router.post("/createSection", auth, isInstructor, createSection);

// updateSection
router.put("/updateSection", auth, isInstructor, updateSection);

// deleteSection
router.delete("/deleteSection",auth,isInstructor,deleteSection);


// -------------subSection-----------

// create subSection
router.post("/createSubSection",auth,isInstructor,createSubSection);
router.put("/updateSubSection",auth,isInstructor,updateSubSection);
router.delete("/deleteSubSection",auth,isInstructor,deleteSubSection);


// -------------Category-----------

// create category
router.post("/createCategory", auth, isInstructor, createCategory);

// show all categories
router.get("/showAllCategories", showAllCategory);

// get category page detials
router.post("/getCategoryPageDetails", categoryPageDetails);

// -------------Rating and Reviews-----------

// create rating
router.post("/createRating", auth, createRating);

// getAverageRating
router.get("/getAverageRating", getAverageRating);

// getAllRating
router.get("/getAllRating", getAllRating);

// -------------Tags-----------------------

router.post("/createTag",auth,isInstructor,createTag);

router.get("/findAllTags",findAllTag);


// -------------Buy Course(fake)-----------------------
router.post("/buyFakeCourse",enrollStudents);

module.exports = router;
