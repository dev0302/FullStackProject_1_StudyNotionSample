// createSubSection 

const Course = require("../models/Course");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const { videoUpload } = require("../utils/imageUploader");

exports.createSubSection = async (req, res) => {
    console.log("insidecreate");
    
  try {
    // fetch details
    const { title, description, sectionId } = req.body;

    // validations
    if (!title || !description || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "Title, description, and sectionId are required",
      });
    }

    // validate video
    if (!req.files || !req.files.video) {
      return res.status(400).json({
        success: false,
        message: "Video file is required under 'video'",
      });
    }

    const video = req.files.video;

    // check section exists
    const section = await Section.findById(sectionId);
    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    // upload video
    const uploadDetails = await videoUpload(
      video,
      process.env.FOLDER_NAME
    );

    // create subsection
    const subSectionDetails = await SubSection.create({
        title,
        description,
        timeDuration: `${uploadDetails.duration}`,
        videoUrl: uploadDetails.secure_url,
        section: sectionId,
    });

    // attach subsection to section
    await Section.findByIdAndUpdate(
      sectionId,
      { $push: { subSection: subSectionDetails._id } }
    );

    // 🔥 IMPORTANT: fetch FULL updated course
    const updatedCourse = await Course.findOne({
      courseContent: sectionId,
    }).populate({
      path: "courseContent",
      populate: {
        path: "subSection",
      },
    });

    return res.status(201).json({
      success: true,
      message: "Sub-section created successfully",
      updatedCourse,
    });

  } catch (error) {
    console.error("CREATE SUBSECTION ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating sub-section",
      error: error.message,
    });
  }
};



// update subSection
exports.updateSubSection = async (req, res) => {
  try {
    const { sectionId, subSectionId, title, description } = req.body;

    if (!sectionId || !subSectionId) {
      return res.status(400).json({
        success: false,
        message: "sectionId and subSectionId are required",
      });
    }

    const subSection = await SubSection.findById(subSectionId);
    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "SubSection not found",
      });
    }

    // update fields
    if (title) subSection.title = title;
    if (description) subSection.description = description;

    // update video if provided
    if (req.files && req.files.video) {
      const uploadDetails = await videoUpload(
        req.files.video,
        process.env.FOLDER_NAME
      );
      subSection.videoUrl = uploadDetails.secure_url;
      subSection.timeDuration = `${uploadDetails.duration}`;
    }

    await subSection.save();

    // 🔥 Return full updated course
    const updatedCourse = await Course.findOne({
      courseContent: sectionId,
    }).populate({
      path: "courseContent",
      populate: {
        path: "subSection",
      },
    });

    return res.status(200).json({
      success: true,
      message: "Sub-section updated successfully",
      updatedCourse,
    });
  } catch (error) {
    console.error("UPDATE SUBSECTION ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while updating sub-section",
      error: error.message,
    });
  }
};




// delete subSection
exports.deleteSubSection = async (req, res) => {
  try {
    const { sectionId, subSectionId } = req.body;

    if (!sectionId || !subSectionId) {
      return res.status(400).json({
        success: false,
        message: "sectionId and subSectionId are required",
      });
    }

    const subSection = await SubSection.findById(subSectionId);
    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "SubSection not found",
      });
    }

    // remove subsection reference from section
    await Section.findByIdAndUpdate(sectionId, {
      $pull: { subSection: subSectionId },
    });

    // delete subsection
    await SubSection.findByIdAndDelete(subSectionId);

    // 🔥 Return full updated course
    const updatedCourse = await Course.findOne({
      courseContent: sectionId,
    }).populate({
      path: "courseContent",
      populate: {
        path: "subSection",
      },
    });

    return res.status(200).json({
      success: true,
      message: "Sub-section deleted successfully",
      updatedCourse,
    });
  } catch (error) {
    console.error("DELETE SUBSECTION ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while deleting sub-section",
      error: error.message,
    });
  }
};

