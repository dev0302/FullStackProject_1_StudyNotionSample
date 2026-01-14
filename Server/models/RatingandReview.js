const mongoose = require("mongoose");

const ratingAndReviewsSchema = new mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"User"
        },
        rating:{
            type:Number,
            trim:true,
            required:true
        },
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true,
            index: true // create an index to speed up lookups by course
        },
        review:{
            type:String,
            trim:true
        }
    },{ timestamps: true } // automatically stores createdAt, updatedAt
);

module.exports = mongoose.model("RatingAndReview",ratingAndReviewsSchema);