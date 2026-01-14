const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
    {
        courseName:{
            type:String,
            trim:true,
            required:true
        },
        description:{
            type:String,
            trim:true,
            required:true
        },
        instructor:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        whatWillYouLearn:{
            type:String
        },
        courseContent:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Section"
            }
        ],
        ratingAndReviews:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"RatingAndReview"
            }
        ],
        price:{
            type:Number,
        },
        thumbnail:{
            type:String
        },
        tags:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Tag"
        }],
        category: {
            type: mongoose.Schema.Types.ObjectId,
            // required: true,
            ref: "Category",
        },
        studentEnrolled:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
                required:true 
            }
        ],
        instructions: {
		    type: [String],
        },
        status: {
            type: String,
            enum: ["Draft", "Published"],
        },
        
    }, { timestamps: true }
);

module.exports = mongoose.model("Course",courseSchema);