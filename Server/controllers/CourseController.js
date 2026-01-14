// createCourse, getAllCourses
const { courseEnrollmentEmail } = require("../mail/templates/courseEnrollmentEmail");
const Course = require("../models/Course");
const Tags = require("../models/Tags");
const User = require("../models/User");
const Category = require("../models/Category");
const { imageUpload } = require("../utils/imageUploader");
require("dotenv").config();
const mailSender = require("../utils/mailSender");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const { convertSecondsToDuration } = require("../utils/secToDuration");
const CourseProgress = require("../models/CourseProgress");


// createCourse
exports.createCourse = async (req, res) => {
  console.log(req.body);

  try {
    const userId = req.user?.id
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized request",
      })
    }

    let {
      courseName,
      description,
      whatWillYouLearn,
      price,
      tag: tagString,
      category,
      status,
      instructions: instructionsString,
    } = req.body

    const thumbnail = req.files?.thumbnailImage

    // ✅ SAFE PARSING (works for FormData)
    let tag, instructions
    try {
      tag = typeof tagString === "string" ? JSON.parse(tagString) : tagString
      instructions =
        typeof instructionsString === "string"
          ? JSON.parse(instructionsString)
          : instructionsString
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Invalid format for tag or instructions",
      })
    }

    // ✅ VALIDATION
    if (
      !courseName ||
      !description ||
      !whatWillYouLearn ||
      !price ||
      !thumbnail ||
      !category ||
      !Array.isArray(tag) ||
      tag.length === 0 ||
      !Array.isArray(instructions) ||
      instructions.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Mandatory",
      })
    }

    if (!status) status = "Draft"

    // ✅ INSTRUCTOR CHECK (unchanged variables)
    const instructor = await User.findById(userId)
    if (!instructor) {
      return res.status(404).json({
        success: false,
        message: "Instructor not found",
      })
    }

    const categoryDetails = await Category.findById(category)
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      })
    }

    // ✅ TAG HANDLING (THIS WAS MISSING)
    const tagIds = []

    for (const tagName of tag) {
      let tagDoc = await Tags.findOne({ name: tagName.trim() })

      if (!tagDoc) {
        tagDoc = await Tags.create({ name: tagName.trim() })
      }

      tagIds.push(tagDoc._id)
    }

    // Upload thumbnail
    const thumbnailImage = await imageUpload(
      thumbnail,
      process.env.FOLDER_NAME
    )

    // ✅ CREATE COURSE (tagIds instead of tag strings)
    const newCourse = await Course.create({
      courseName,
      description,
      instructor: instructor._id,
      whatWillYouLearn,
      price,
      tags: tagIds,
      category: categoryDetails._id,
      thumbnail: thumbnailImage.secure_url,
      status,
      instructions,
    })

    await newCourse.populate("category");

    // Link course to instructor
    await User.findByIdAndUpdate(instructor._id, {
      $push: { courses: newCourse._id },
    })

    // Link course to category
    await Category.findByIdAndUpdate(categoryDetails._id, {
      $push: { courses: newCourse._id },
    })

    // Link course to tags
    await Tags.updateMany(
      { _id: { $in: tagIds } },
      { $addToSet: { courses: newCourse._id } }
    )

    return res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: newCourse,
    })
  } catch (error) {
    console.error("CreateCourse error:", error)
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
}






exports.getAllCourses = async(req,res) => {
    try {
        // to fetch all
        const allCourses = await Course.find({},
            {
                courseName:true,
                price:true,
                thumbnail:true,
                instructor:true,
                ratingAndReviews:true,
                studentEnrolled:true
            }
        ).populate("instructor").exec();

        return res.status(200).json({
            success:true,
            message:"All Courses Fetched Successfully",
            data:allCourses
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Cannot fetch courses data",
            error:error.message
        })
    }

}

// getCourseDetails
exports.getCourseDetails = async (req, res) => {
  // console.log("yeeeeeeee");
  
  try {
      console.log("Request Body:", req.body);
    // Extract courseId from request body
    const {courseId} = req.body;

    console.log("course details",courseId);

    // Validate: Check if courseId is provided
    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required.",
      });
    }

    // Search course in database (with population)
    const courseDetails = await Course.findById(courseId)
      .populate({
        path: "instructor",
        select: "firstName lastName email", // only specific fields from User
      })
      .populate("category")
      .populate({
        path: "studentEnrolled",
        select: "firstName lastName email image", 
      })
      
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
          select: "title description videoUrl", // nested population if subSections exist
        },
      })
      .populate("ratingAndReviews") // get all ratings and reviews
      .populate("tags") // populate tags
      .exec();

    // Validate: If course not found
    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Course not found.",
      });
    }

    // Send successful response
    return res.status(200).json({
      success: true,
      message: "Course details fetched successfully.",
      data: courseDetails,
    });

  } catch (error) {
    // Catch unexpected errors
    console.error("Error fetching course details:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching course details.",
      error: error.message,
    });
  }
};



// getFullCourseDetails
exports.getFullCourseDetails = async (req, res) => {
  try {
    console.log(req.body);
    
    const { courseId } = req.body
    const userId = req.user.id
    
    const courseDetails = await Course.findOne({ _id: courseId })
      .populate({
        path: "instructor",
        populate: { path: "additionalDetails" },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: { path: "subSection" }, // Ensure this matches your Section Schema
      })
      .exec()

    // Safety check: Find progress (Verify if your schema uses courseID or courseId)
    let courseProgressCount = await CourseProgress.findOne({
      courseId: courseId, 
      userId: userId,
    })

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      })
    }

    // Logic for calculating total duration
    let totalDurationInSeconds = 0
    courseDetails.courseContent.forEach((content) => {
      // Use optional chaining or || [] to prevent "not iterable" errors
      (content.subSection || []).forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration) || 0
        totalDurationInSeconds += timeDurationInSeconds
      })
    })

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
        completedVideos: courseProgressCount?.completedVideos || [],
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}



// enroll the student in the courses
// Import the model at the top of your controller file
const PaymentFake = require("../models/PaymentFake");

// enroll the student in the courses
exports.enrollStudents = async (req, res) => {
  try {
    const { courses, userId } = req.body

    // 1. Validation
    if (!Array.isArray(courses) || courses.length === 0 || !userId) {
      return res.status(400).json({
        success: false,
        message: "Please provide an array of course IDs and a user ID",
      })
    }

    let totalAmount = 0;

    // --- NEW: PURCHASE HISTORY LOGIC ---
    // Calculate total amount and verify courses exist
    for (const courseId of courses) {
        const course = await Course.findById(courseId);
        if(!course) {
            return res.status(404).json({ success: false, message: `Course not found: ${courseId}` });
        }
        totalAmount += course.price;
    }

    // Create the Purchase History record
    const paymentRecord = await PaymentFake.create({
        courses: courses,
        user: userId,
        amount: totalAmount,
    });
    // -----------------------------------

    for (const courseId of courses) {
      // 1.1 Enroll student in course
      const enrolledCourse = await Course.findByIdAndUpdate(
        courseId,
        { $addToSet: { studentEnrolled: userId } },
        { new: true }
      )

      if (!enrolledCourse) {
        return res.status(404).json({
          success: false,
          message: `Course not found: ${courseId}`,
        })
      }

      // 1.2 ✅ THE FIX FOR YOUR ERROR:
      // Ensure the model is registered. Using CourseProgress.create() 
      // is only possible if the model is correctly imported at the top.
      const courseProgress = await CourseProgress.create({
        courseId: courseId, // Ensure this matches your Schema (courseId vs courseID)
        userId: userId,
        completedVideos: [],
      })

      // 1.3 Update User's enrolled courses and progress list
      const enrolledStudent = await User.findByIdAndUpdate(
        userId,
        {
          $addToSet: {
            courses: courseId,
            courseProgress: courseProgress._id,
          },
        },
        { new: true }
      )

      if (!enrolledStudent) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        })
      }

      // 1.4 Send email
      try {
        await mailSender(
          enrolledStudent.email,
          `Successfully Enrolled into ${enrolledCourse.courseName}`,
          courseEnrollmentEmail(
            enrolledCourse.courseName,
            `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
          )
        )
      } catch (e) {
        console.error("Email failure:", e.message)
      }
    }

    // ✅ THE UI UPDATE FIX:
    // Fetch the updated user and populate everything so the frontend
    // gets the full details needed to change the button to "Enrolled"
    const updatedUser = await User.findById(userId)
      .populate("courses")
      .populate("courseProgress")
      .populate("additionalDetails")
      .exec()

    return res.status(200).json({
      success: true,
      message: "Student enrolled successfully and purchase history created",
      user: updatedUser, // 🔥 Send this back to sync Redux
      paymentId: paymentRecord._id, // Optional: send payment ref back
    })
  } catch (error) {
    console.error("Enrollment Error:", error)
    return res.status(500).json({
      success: false,
      message: "Internal server error during enrollment",
      error: error.message, // This helps you debug exactly what Mongoose is complaining about
    })
  }
}


// Edit Course Details
exports.editCourse = async (req, res) => {
  try {
    const { courseId } = req.body
    const userId = req.user.id

    // 1️⃣ Validate courseId
    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required",
      })
    }

    // 2️⃣ Find course
    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      })
    }

    // 3️⃣ Authorization check (VERY IMPORTANT)
    if (course.instructor.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to edit this course",
      })
    }

    // 4️⃣ Handle thumbnail update
    if (req.files?.thumbnailImage) {
      const thumbnail = req.files.thumbnailImage
      const uploadedImage = await imageUpload(
        thumbnail,
        process.env.FOLDER_NAME
      )
      course.thumbnail = uploadedImage.secure_url
    }

    // 5️⃣ Field mapping (frontend → backend schema)
    const fieldMap = {
      courseName: "courseName",
      description: "description",
      price: "price",
      whatWillYouLearn: "whatWillYouLearn",
      category: "category",
    }

    // 6️⃣ Update normal fields
    for (const key in fieldMap) {
      if (req.body[key] !== undefined) {
        course[fieldMap[key]] = req.body[key]
      }
    }

    // ✅ Handle status update (IMPORTANT for publish/unpublish)
    if (req.body.status) {
      course.status = req.body.status
    }

    // 7️⃣ Handle array / JSON fields
    // 7️⃣ Handle tags (same logic as createCourse)
    if (req.body.tags) {
      const tagNames = JSON.parse(req.body.tags)

      const tagIds = []

      for (const tagName of tagNames) {
        let tagDoc = await Tags.findOne({ name: tagName.trim() })

        if (!tagDoc) {
          tagDoc = await Tags.create({ name: tagName.trim() })
        }

        tagIds.push(tagDoc._id)
      }

      course.tags = tagIds
    }

    if (req.body.instructions) {
      course.instructions = JSON.parse(req.body.instructions)
    }

    // 8️⃣ Save updated course
    await course.save()

    // 9️⃣ Return fully populated course
    const updatedCourse = await Course.findById(courseId)
      .populate({
        path: "instructor",
        select: "firstName lastName email",
      })
      .populate("category")
      .populate("tags")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()

    return res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    })
  } catch (error) {
    console.error("Edit course error:", error)
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}



// Get a list of Course for a given Instructor
exports.getInstructorCourses = async (req, res) => {
  try {
    const instructorId = req.user.id;

    // Find all courses belonging to the instructor
    const instructorCourses = await Course.find({
      instructor: instructorId,
    })
      .sort({ createdAt: -1 })
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection", // This is the secret to getting 'timeDuration'
        },
      })
      .exec();

    res.status(200).json({
      success: true,
      data: instructorCourses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    });
  }
};


// deleteCourse
exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;

    // Find the course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    // Check if the instructor deleting is the owner
    if (course.instructor.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Unauthorized: You do not own this course" });
    }

    // Unenroll students from the course (Optional but recommended)
    const studentsEnrolled = course.studentEnrolled;
    for (const studentId of studentsEnrolled) {
      await User.findByIdAndUpdate(studentId, {
        $pull: { courses: courseId },
      });
    }

    // Delete sections and sub-sections
    const courseSections = course.courseContent;
    for (const sectionId of courseSections) {
      const section = await Section.findById(sectionId);
      if (section) {
        const subSections = section.subSection;
        for (const subSectionId of subSections) {
          await SubSection.findByIdAndDelete(subSectionId);
        }
      }
      await Section.findByIdAndDelete(sectionId);
    }

    // Remove course from Category
    await Category.findByIdAndUpdate(course.category, {
      $pull: { courses: courseId },
    });

    // Remove course from Instructor's list
    await User.findByIdAndUpdate(userId, {
      $pull: { courses: courseId },
    });

    // Remove course from Tags
    await Tags.updateMany(
      { _id: { $in: course.tags } },
      { $pull: { courses: courseId } }
    );

    // Finally, delete the course
    await Course.findByIdAndDelete(courseId);

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};