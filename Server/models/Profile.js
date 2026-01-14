const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
    {
        gender:{
            type:String,
            // required:true
        },
        dob:{
            type:String,
        },
        about:{
            type:String,
            trim:true
        },
        phoneNumber:{
            type:Number,
            trim:true
        }        
        
    }, { timestamps: true }
);

module.exports = mongoose.model("Profile",profileSchema);