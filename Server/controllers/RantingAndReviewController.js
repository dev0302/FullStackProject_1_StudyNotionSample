// Rating and Review Controller
// createRating //getAverageRating //getAllRating

const Course = require("../models/Course");
const RatingandReview = require("../models/RatingandReview");

exports.createRating = async(req,res) => {
    console.log(req.body);
    
    try {
        // fetch data
        const userId = req.user.id //logged in user
        
        const {rating, review, courseId} = req.body

        console.log(rating);
        console.log(courseId);
        
        

        // validate that all are coming
        if (!rating || !courseId) {
            return res.status(400).json({
                success: false,
                message: "Rating and Course ID are required.",
            });
        }

        // check whether user is enrolled in the course or not
        const courseDetails = await Course.findOne({_id:courseId, studentEnrolled: { $elemMatch: { $eq: userId } } });

        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: "User is not enrolled in this course.",
            });
        }

        // validate if not doing again from same user
        const alreadyReviewed = await RatingandReview.findOne({user:userId, course:courseId});

        if (alreadyReviewed) {
            return res.status(400).json({
                success: false,
                message: "User has already reviewed this course.",
            });
        }

        // if not then create in db
        const newReview = await RatingandReview.create({
            user: userId,
            rating,
            review,
            course: courseId,
        })

        // update in Course
        await Course.findByIdAndUpdate(
            courseId,
            { $push: { ratingAndReviews: newReview._id } },
            { new: true }
        );

        return res.status(201).json({
            success: true,
            message: "Rating and review added successfully.",
            data: newReview,
        });


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error while adding review.",
            error: error.message,
        });
    }
}

// getAverageRating
exports.getAverageRating = async(req,res) => {
    try {
        // fetch course id
        const {courseId} = req.body;

        // use aggreagate funcn to fetch from db //It allows you to filter, group, sort, join, count, and transform data inside MongoDB — all in one powerful query.
        const result = await RatingandReview.aggregate([
            {
                $match: { 
                    course: new mongoose.Types.ObjectId(courseId) 
                }
            },
            { 
                $group: { 
                    _id: null, 
                    averageRating: { $avg: "$rating" } 
                } 
            },
        ]);

        if (result.length > 0) {
            return res.status(200).json({
                success: true,
                averageRating: result[0].averageRating,
            });
        }

        return res.status(200).json({
            success: true,
            message: "No ratings yet for this course.",
            averageRating: 0,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching average rating.",
        });
    }
}

// getAllRating
exports.getAllRating = async(req,res) => {
    try {
        // fetch all
        const reviews = await RatingandReview.find({})
        .sort({rating:"desc"})
        .populate({
            path:"user",
            select: "firstName lastName email image"
        })
        .populate({
                path: "course",
                select: "courseName"
        })
        .exec();

        return res.status(200).json({
            success: true,
            message: "All reviews fetched successfully.",
            data: reviews,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error while fetching reviews.",
        });
    }
}