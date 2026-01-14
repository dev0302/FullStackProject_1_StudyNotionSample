//updateProfile // deleteAccount //getMyProfile // getEnrolledCourses //updateDisplayPicture

const CourseProgress = require("../models/CourseProgress");
const Profile = require("../models/Profile");
const User = require("../models/User");
const { imageUpload } = require("../utils/imageUploader");
const { convertSecondsToDuration } = require("../utils/secToDuration");
const Course = require("../models/Course");

// updateProfile
exports.updateProfile = async(req,res) => {
    console.log("Backend called");
    console.log(req.body);
    
    
    try {
        // fetch details
        const { firstName, lastName, gender, dob, about, phoneNumber} = req.body;

        // validate details
        if (!gender || !dob || !about || !phoneNumber) {
            return res.status(400).json({
                success: false,
                message: "gender, dob, about, phoneNumber All are required feilds.",
            });
        }

        // now to find profile id, first fetch user id from req.user i.e payload
        const userId = req.user.id;

        // now with this find profile id from db
        const userDetails = await User.findById(userId);
        const profileId = userDetails.additionalDetails;

        // since in frontend we are giving option to change firstName and lastName which are not directly in profile instead they are in user
        if (firstName) userDetails.firstName = firstName;
        if (lastName) userDetails.lastName = lastName;
        await userDetails.save();

        // now update in db
        const profileUpdated = await Profile.findByIdAndUpdate(profileId,
            {
                $set:{
                    gender:gender,
                    dob:dob,
                    about:about,
                    phoneNumber:phoneNumber
                }
            }, {new:true}
        )

        // v imp to return whole object nhi to set user krte hue info hill jayegi puri
        const updatedUser = await User.findById(userId)
        .populate("additionalDetails")
        .exec();

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: updatedUser,
        });


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error while updating profile",
        });
        
    }
}

// deleteAccount
exports.deleteAccount = async(req,res) => {
    try {
        // fetch id
        const userId = req.user.id;

        // now we have to delete two things User and Profile that is additional details........
        // fetch profile id and delete it
        const userDetails = await User.findById(userId);
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        const profileId = userDetails.additionalDetails;

        const deletedProfile = await Profile.findByIdAndDelete(profileId);

        // now also delete from User
        const deletedAccount = await User.findByIdAndDelete(userId);

        // return response
        return res.status(200).json({
            success: true,
            message: "Account and profile deleted successfully",
        });


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error while deleting account",
        });
    }
}

// getMyProfile
exports.getMyProfile = async(req,res) => {
    try {
        // fetch id
        const userId = req.user.id;

        // fetch detials from db
        const userDetails = await User.findById(userId).populate("additionalDetails").select("-password").exec() // never send password

        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User Not Found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "User details fetched successfully",
            data: userDetails
        });


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error while fetching user details",
        });
    }
}


exports.getEnrolledCourses = async (req, res) => {

  // ===================== STEP 1: GET USER ID =====================
  let userId;
  try {
    // fetch id
    userId = req.user.id; // userId fetched from token via auth middleware
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized. User ID not found in request.",
      error: error.message,
    });
  }

  // ===================== STEP 2: FETCH USER =====================
  let userDetails;
  try {
    // search in user db
    userDetails = await User.findById(userId).populate({
      path: "courses",
      populate: [
        {
          path: "instructor",
          select: "firstName lastName email",
        },
        {
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        },
      ],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Database error while fetching user.",
      error: error.message,
    });
  }

  // ===================== STEP 3: VALIDATIONS =====================
  if (!userDetails) {
    return res.status(404).json({
      success: false,
      message: "User not found.",
    });
  }

  if (!userDetails.courses || userDetails.courses.length === 0) {
    return res.status(200).json({
      success: true,
      message: "No enrolled courses found.",
      enrolledCourses: [],
    });
  }

  // convert mongoose doc → plain JS object
  try {
    userDetails = userDetails.toObject();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error converting user document.",
      error: error.message,
    });
  }

  // ===================== STEP 4: COURSE LOGIC =====================
  try {
    for (let i = 0; i < userDetails.courses.length; i++) {
      const course = userDetails.courses[i];

      let totalDurationInSeconds = 0;
      let totalSubSections = 0;

      // safety guard
      if (!Array.isArray(course.courseContent)) {
        course.courseContent = [];
      }

      
      // loop through sections
      console.log(course.courseContent);
      
      for (let j = 0; j < course.courseContent.length; j++) {
        const section = course.courseContent[j];

        if (!Array.isArray(section.subSection)) {
          section.subSection = [];
        }
         

        // calculate duration
        totalDurationInSeconds += section.subSection.reduce(
          (acc, curr) => acc + parseInt(curr.timeDuration || 0),
          0
        ); 

        // count videos
        totalSubSections += section.subSection.length;
      }
      
      

      // attach total duration
      course.totalDuration =
        convertSecondsToDuration(totalDurationInSeconds);
         console.log(course.totalDuration);
         

      // ===================== STEP 5: COURSE PROGRESS =====================
      let courseProgress;
      try {
        courseProgress = await CourseProgress.findOne({
          courseId: course._id,
          userId: userId,
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: `Error fetching progress for course ${course._id}`,
          error: error.message,
        });
      } 
     
      const completedVideos =
        courseProgress?.completedVideos?.length || 0;

      // console.log("courseprogesss", courseProgress);
        
      // progress calculation
      if (totalSubSections === 0) {
        course.progressPercentage = 100;
      } else {
        const multiplier = Math.pow(10, 2);
        course.progressPercentage =
          Math.round(
            (completedVideos / totalSubSections) * 100 * multiplier
          ) / multiplier;
      }

      

      // normalize instructor (array → object)
      if (Array.isArray(course.instructor)) {
        course.instructor = course.instructor[0] || null;
      }
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while calculating course data.",
      error: error.message,
    });
  }

  // ===================== FINAL RESPONSE =====================
  return res.status(200).json({
    success: true,
    message: "Enrolled courses fetched successfully.",
    enrolledCourses: userDetails.courses,
  });
};




// updateDisplayPicture

exports.updateDisplayPicture = async (req, res) => {
    try {
        // fetch user id from payload
        const userId = req.user.id;

        // validate file
        if (!req.files || !req.files.displayPicture) {
            return res.status(400).json({
                success: false,
                message: "No display picture uploaded.",
            });
        }

        const displayPictureFile = req.files.displayPicture;

        // upload to cloud
        const uploadedImage = await imageUpload(displayPictureFile, process.env.FOLDER_NAME);

        // fetch user's profile id
        const userDetails = await User.findById(userId);
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        // const profileId = userDetails.additionalDetails;

        // update profile with new display picture
        const updatedProfile = await User.findByIdAndUpdate(
            userId,
            { $set: { image: uploadedImage.secure_url } },
            { new: true }
        ).populate("additionalDetails").exec();

        // v imp to return by populating, as when it will be returned to frontend whole data should be returned as while updating redux-state whole data should be there.

        if(!updatedProfile){
            return res.status(400).json({
                success: false,
                message: "Profile Image Cannot be updated.",
                profile: updatedProfile,
            });
        }

        return res.status(200).json({
            success: true,
            message: "Display picture updated successfully.",
            profile: updatedProfile,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error while updating display picture.",
            error: error.message,
        });
    }
};


// controllers/courseProgress.js or course.js

exports.instructorDashboard = async (req, res) => {

  console.log("insidie instructor dashboard");
  
  try {
    const instructorId = req.user.id;
    
    // Find all courses belonging to this instructor
    const courseData = await Course.find({ instructor: instructorId });

    const courseStats = courseData.map((course) => {
      const totalStudentsEnrolled = course.studentEnrolled.length;
      const totalAmountGenerated = totalStudentsEnrolled * course.price;

      // Create an object with the stats for each course
      const courseDataWithStats = {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.description,
        totalStudentsEnrolled,
        totalAmountGenerated,
      };

      return courseDataWithStats;
    });

    res.status(200).json({
      success: true,
      courses: courseStats,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
        success: false, 
        message: "Internal Server Error" 
    });
  }
};



// TODO'S : 
// 1. to count and constantly update total number of students enrolled
// 2. to add timer type in delete like after these days
// 3. crone job 