// createCategory //showAllCategory //categoryPageDetails
 
const Category = require("../models/Category");
const Course = require("../models/Course");

exports.createCategory = async(req,res) => {
    try {
        // fetch
        const {name, description} = req.body;

        // validate
        // ✅ Validate input
        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: "Both name and description are required.",
            });
        }

        // check if already exist
        const existingCategory = await Category.findOne({name:name});

        if (existingCategory) {
            return res.status(400).json({
                success: false,
                message: "Category with this name already exists.",
            });
        }

        // if not then, create it
        const newCategory = await Category.create({
            name,
            description
        });

        return res.status(201).json({
            success: true,
            message: "Category created successfully.",
            data: newCategory,
        });


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error while creating category.",
        });
    }
}

exports.showAllCategory = async(req,res) => {
    try {
        // fetch all
        const allCategories = await Category.find({},{name:true, description:true});

        return res.status(200).json({
            success: true,
            message: "All categories fetched successfully.",
            data: allCategories,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error while fetching categories.",
        });
    }
}

// categoryPageDetails
exports.categoryPageDetails = async (req, res) => {
    try {
        const { categoryId } = req.body;

        // ✅ 1. VALIDATION CHECK: Ensure ID is provided
        if (!categoryId) {
            return res.status(400).json({
                success: false,
                message: "Category ID is required",
            });
        }

        // ✅ 2. FETCH SELECTED CATEGORY
        const selectedCategory = await Category.findById(categoryId)
            .populate({
                path: "courses",
                match: { status: "Published" },
                populate: [{ path: "instructor" }, { path: "ratingAndReviews" }],
            })
            .exec();

        // Specific handling for non-existent category
        if (!selectedCategory) {
            console.log("Category not found with ID:", categoryId);
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        // Specific handling for empty category (No courses published)
        if (!selectedCategory.courses || selectedCategory.courses.length === 0) {
            console.log("No courses found for the selected category.");
            // We return 200 with empty data instead of 404 to prevent UI crashes
        }

        // ✅ 3. FETCH DIFFERENT CATEGORIES (Recommendation logic)
        const categoriesExceptSelected = await Category.find({ _id: { $ne: categoryId } });
        let differentCategory = null;

        if (categoriesExceptSelected.length > 0) {
            const randomIndex = Math.floor(Math.random() * categoriesExceptSelected.length);
            differentCategory = await Category.findById(categoriesExceptSelected[randomIndex]._id)
                .populate({
                    path: "courses",
                    match: { status: "Published" },
                    populate: { path: "instructor" } // Added instructor for UI cards
                })
                .exec();
        }

        // ✅ 4. FETCH TOP SELLING COURSES (Efficiency logic)
        // Note: Using .sort({ "studentEnrolled.length": -1 }) only works if studentEnrolled is a number.
        // If it's an array of IDs, we usually sort by a 'sold' counter or enrollment count.
        const mostSellingCourses = await Course.find({ status: "Published" })
            .sort({ "studentsEnrolled.length": -1 }) 
            .limit(10)
            .populate("instructor")
            .populate("ratingAndReviews")
            .exec();

        // ✅ 5. SUCCESS RESPONSE
        return res.status(200).json({
            success: true,
            data: {
                selectedCategory,
                differentCategory,
                mostSellingCourses,
            },
        });

    } catch (error) {
        // ✅ 6. CENTRALIZED LOGGING & ERROR RESPONSE
        console.error("CATALOG_PAGE_API_ERROR:", error);

        // Handle specific Mongoose CastError (invalid ObjectId format)
        if (error.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Invalid Category ID format",
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error occurred while fetching category details",
            error: error.message,
        });
    }
};