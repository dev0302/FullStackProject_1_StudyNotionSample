const mongoose = require("mongoose");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const CourseProgress = require("../models/CourseProgress");
const Course = require("../models/Course");

/**
 * Controller to mark a specific video (subsection) as completed for a user
 */
exports.updateCourseProgress = async (req, res) => {
  const { courseId, subSectionId } = req.body;
  const userId = req.user.id;

  try {
    // 1. Basic Validation
    if (!courseId || !subSectionId) {
      return res.status(400).json({ 
        success: false, 
        message: "Course ID and Subsection ID are required." 
      });
    }

    // 2. Verify if the subsection actually exists in the DB
    const subSection = await SubSection.findById(subSectionId);
    if (!subSection) {
      return res.status(404).json({ 
        success: false, 
        message: "Invalid Subsection: The video record does not exist." 
      });
    }

    // 3. Update Progress Atomically
    // We use $addToSet to add the ID to the array only if it isn't already there.
    // This replaces the need for .includes() checks in JS logic.
    const courseProgress = await CourseProgress.findOneAndUpdate(
      {
        courseId: courseId,
        userId: userId,
      },
      {
        $addToSet: { completedVideos: subSectionId },
      },
      { new: true } // Return the updated document
    );

    // 4. Handle case where user isn't actually enrolled (no progress doc found)
    if (!courseProgress) {
      return res.status(404).json({
        success: false,
        message: "Course progress not found. Ensure the user is enrolled.",
      });
    }

    // 5. Success Response
    return res.status(200).json({
      success: true,
      message: "Lecture marked as completed successfully.",
      data: courseProgress.completedVideos // Return updated list for frontend sync
    });

  } catch (error) {
    console.error("COURSE_PROGRESS_UPDATE_ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while updating progress.",
      error: error.message,
    });
  }
};