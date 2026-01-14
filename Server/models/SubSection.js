const mongoose = require("mongoose");

const subSectionSchema = new mongoose.Schema(
    {
        title:{
            type:String,
        },
        timeDuration:{
            type:String,
        },
        description:{
            type:String,
        },
        videoUrl:{
            type:String
        },
        section: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Section",
            required: true,
        }, // ye isliye add kra taaki jb section delete kre to uske subections bhi delete hopaye
        //also add that section id refrence   
        
    }
);

module.exports = mongoose.model("SubSection",subSectionSchema);