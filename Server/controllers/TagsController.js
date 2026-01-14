// ONlY ALLOWED FOR ADMINS
// createTag, findAllTags

const Tags = require("../models/Tags");

exports.createTag = async(req,res) => {
    try {
        // fetch
        const {courseName, description} = req.body;

        // validate
        if (!courseName || !description) {
            return res.status(400).json({
                success: false,
                message: "Both courseName and description are required.",
            });
        }

        // Optional: Check for duplicates (if needed)
        const existingTag = await Tags.findOne({ courseName });
        if (existingTag) {
            return res.status(409).json({
                success: false,
                message: "A tag with this courseName already exists.",
            });
        }

        // Save in db (also to save in db there are two methods, one to  make object and then save, another is to direct save by creating)

        // const newtag = new Tags({courseName, description});
        // const savedTag = await newtag.save();

        const savedTag = await Tags.create({
            courseName,
            description
        });

        res.status(201).json({
            success: true,
            message: "Tag created successfully",
            data: savedTag,
        });
        
        
    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Failed to create tag",
            error: error.message,
        });
        
    }
}

// findAllTags
exports.findAllTag = async(req,res) => {
    try {
        // direct fetch all from db and return
        const getAllTags = await Tags.find({},{courseName:true, description:true});

        if (!getAllTags || getAllTags.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No tags found in the database.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "All tags fetched successfully.",
            totalTags: getAllTags.length,
            data: getAllTags,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error. Failed to fetch tags.",
            error: error.message,
        });
    }
}