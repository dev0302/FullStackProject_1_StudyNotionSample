// createSection //updateSection //deleteSection

const Course = require("../models/Course");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");

exports.createSection = async(req,res) => {

    try {
        // fetch sectionName, //courseId will be object id
        const {sectionName, courseId} = req.body;

        // validations
        if (!sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields: sectionName or courseId",
            });
        }
    

        // Check if course exists
        const courseExists = await Course.findById(courseId);
        if (!courseExists) {
            return res.status(404).json({
                success: false,
                message: "Course not found. Please provide a valid courseId.",
            });
        }

        // store in db
        const newSection = await Section.create({sectionName});

        // update in Course
        const updatedCourse = await Course.findByIdAndUpdate( courseId,
            {
                $push:{courseContent:newSection._id}
            } , {new:true}
        ).populate("courseContent").exec();

        // return response
        return res.status(200).json({
            success: true,
            message: "Section created and added to course successfully.",
            section: newSection,
            updatedCourse,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while creating section.",
            error: error.message, // send only message, not full error object (safe)
        });
    }
}



// updateSection (to update section name)
exports.updateSection = async (req,res) => {
    try {
        // name to update and its id......
        const {sectionName, sectionId} = req.body;

        // validations
        if (!sectionName || !sectionId) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields: sectionName or sectionId",
            });
        }

        // The update object — only updates the sectionName field. Equivalent to { $set: { sectionName: sectionName } }.
        const updatedSection = await Section.findByIdAndUpdate(sectionId ,
            {sectionName}, {new:true}
            
        );

        return res.status(200).json({
            success: true,
            message: "Section name updated successfully.",
            updatedSection,
        });


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while updating section.",
            error: error.message,
        });
    }
}


// deleteSection
exports.deleteSection = async(req,res) => {
    
    try {
        const {sectionId, courseId} = req.body;

         // Check if sectionId is provided
        if (!sectionId || !courseId) {
            return res.status(400).json({
                success: false,
                message: "Both sectionId and courseId are required.",
            });
        }

        const deletedSection = await Section.findByIdAndDelete(sectionId);

         // If section not found
        if (!deletedSection) {
            return res.status(404).json({
                success: false,
                message: "Section not found",
            });
        }

        // also delete subSections
        await SubSection.deleteMany({section: sectionId}); // ye isliye hoparha koynki subsection ke schema mei section ki id daali hai and also jb subsection create krrhe to usko store krrarhe

        // populating is v much needed
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            { $pull: { courseContent: sectionId } },
            { new: true }
            ).populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        });

        return res.status(200).json({
            success: true,
            message: "Section deleted successfully",
            data : updatedCourse,
        });



    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error deleting section",
            error: error.message,
        });
    }
}