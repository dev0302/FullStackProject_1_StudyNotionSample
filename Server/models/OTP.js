const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const otpTemplate = require("../mail/templates/emailVerificationTemplate");

const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 5 * 60 // OTP expires in 5 minutes
    }
});

// Function to send verification email
async function sendVerificationEmail(email, otp) {
    try {
        const mailResponse = await mailSender(email, "Verification Email", otpTemplate(otp));
        
        // Flexible check: If we got any response back, it likely worked
        if (mailResponse) {
            console.log("OTP Email process completed.");
        } else {
            console.log("Email service returned nothing. Check Brevo logs.");
        }
    } catch (error) {
        console.log("Error in OTP Model: ", error);
    }
}

// Pre-save middleware to trigger email before saving OTP to DB
OTPSchema.pre("save", async function (next) {
    console.log("New OTP document saving to database...");

    // Only send an email when a new document is created
    if (this.isNew) {
        await sendVerificationEmail(this.email, this.otp);
    }
    next();
});

module.exports = mongoose.model("OTP", OTPSchema);