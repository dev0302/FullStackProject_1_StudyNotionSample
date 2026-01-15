// landed to a page
// takes email, validates users and email
// create token, save it to db
// create link and send mail

const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const clientUrl = process.env.CLIENT_URL || "https://full-stack-project-1-study-notion-s-nine.vercel.app";


exports.resetPasswordToken = async (req,res) => {
    // console.log("hiiiii");
    
    try {
        // fetch email
        const {email} = req.body;
        // validates email
        if(!email){
            return res.json({
                success:false,
                message:"No email found in the req body"
            })
        }

        // check whether user exist or not
        const userExists = await User.findOne({email : email});

        if(!userExists){
            return res.json({
                success:false,
                message:"User doesnt exist with this email id."
            })
        }

        // generate random crypto token
        const token = crypto.randomUUID();

        // now update this token in user database with expiry time
        const updateDetails = await User.findOneAndUpdate({email:email}, 
            {
                token:token,
                resetPasswordExpires: Date.now() + 5*60*1000
            },
            {new:true}
        )
        
        if (!updateDetails) {
            return res.status(500).json({
                success: false,
                message: "Failed to update reset token. Please try again.",
            });
        }
        

        // distinct url
        // const url = `https://localhost:5173/update-password/${token}`;
        const url = `${clientUrl}/update-password/${token}`;
        
        try {
            // now send mail
            await mailSender(
                email, 
                "Password Reset Link", 
                `You requested a password reset. Please click the link below to set a new password: \n\n ${url} \n\n This link is valid for 5 minutes.`
            );

        } catch (error) {
            console.error("Error sending email:", error);
                return res.status(500).json({
                    success: false,
                    message: "Failed to send password reset email. Please try again later.",
                });
        }

        // Success
        return res.status(200).json({
            success: true,
            message: "Password reset link sent successfully to your email.",
        });

        
    } catch (error) {
       console.error("Error in resetPasswordToken:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
            error: error.message,
        });
    }
}



// another function to reset password.....
// takes token, password, confirm password
// validation, get user details from db using token
// if no entry - invalid token
// if yes, check expiry
// if all okay, then hash password
// and then finally update in db

exports.resetPassword = async (req,res) => {
    console.log("Inside reset pasworddddddd.....");
    
    try {
        // fetch
        const {token, password, confirmPassword} = req.body;

        // validate password and confirm password
        if (!password || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and confirm password are required."
            });
        }

        // match password and confirm password
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match.",
            });
        }

        // check token validation
        const userDetails = await User.findOne({token:token});

        if(!userDetails){
          return res.status(400).json({
              success: false,
              message: "Invalid or expired token. Please request a new password reset."
          });
        }

        // if found, then check token expiry
        if (userDetails.resetPasswordExpires < Date.now()) {
             return res.status(400).json({
                success: false,
                message: "Token has expired. Please request a new password reset.",
            });
        }

        // if not expired, hash and update
        const hashPassword = await bcrypt.hash(password,10);

        await User.findOneAndUpdate({token:token}, {password:hashPassword}, {new:true})
        
        return res.status(200).json({
            success: true,
            message: "Password has been reset successfully.",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }

}