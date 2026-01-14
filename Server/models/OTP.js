const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const otpTemplate = require("../mail/templates/emailVerificationTemplate");

const OTPSchema = new mongoose.Schema(
    {
        email:{
            type:String,
            trim:true,
            required:true
        },
        otp:{
            type:String,
            required:true
        },
        createdAt:{
            type:Date,
            default:Date.now, //not Date.now()
            expires:5*60 //5min
        }
          
    }
);

// since we are creating pre middleware so after schema and before export
// a function to send email->
async function sendVerificationEmail(email,otp) {
    try {
        const mailRespone = await mailSender(email, "Verification Email", otpTemplate(otp));
        console.log("Email sent successfully",mailRespone.response);
        
    } catch (error) {
        console.log("Error occured while sending mails: ",error);
        throw error;   
        
    }
}

// pre middleware
OTPSchema.pre("save", async function (next) {
	console.log("New document saved to database");

	// Only send an email when a new document is created
	if (this.isNew) {
		await sendVerificationEmail(this.email, this.otp);
	}
	next();
});

module.exports = mongoose.model("OTP",OTPSchema);