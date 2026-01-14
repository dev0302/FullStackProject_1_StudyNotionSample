// Authentication : who you are
// Send OTP
// SignUp
// Login
// ChangePassword

const OTP = require("../models/OTP");
const { findOne } = require("../models/RatingandReview");
const User = require("../models/User");
const Profile = require("../models/Profile");
const otpGenerator = require("otp-generator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mailSender = require("../utils/mailSender");
const { passwordUpdated } = require("../mail/templates/passwordUpdate");


// send OTP
exports.sendOTP = async (req,res) => {
    // mail will be sending from pre middleware on save, defined in OTP Schema
    try {
        // fetch data from req body
        const { email } = req.body;

        // check if user already exists
        const checkUserPresent = await User.findOne({ email });

        // if user already exists, return
        if (checkUserPresent) {
            return res.status(401).json({
                success: false,
                message: "User Already Registered"
            });
        }

        // ✅ Ensure unique index on otp field (do this once globally, not on every request)
        await OTP.collection.createIndex({ otp: 1 }, { unique: true });

        let otp;
        let otpBody;

        // Generate + insert until unique (MongoDB enforces uniqueness)
        while (true) {
            try {
                otp = otpGenerator.generate(6, {
                    upperCaseAlphabets: false,
                    lowerCaseAlphabets: false,
                    specialChars: false
                });

                console.log("OTP Generated:", otp);

                otpBody = await OTP.create({ email, otp }); // insert directly
                break; // ✅ success → exit loop
                
            } catch (err) {
                if (err.code === 11000) {
                    // Duplicate OTP → retry
                    console.log("Duplicate OTP, regenerating...");
                    continue;
                }
                throw err; // any other error → stop
            }
        }

        console.log("OTP Saved:", otpBody);

        // return response successfull
        res.status(200).json({
            success: true,
            message: "OTP Sent Successfully",
            otp
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }

}

// SignUp
exports.signup = async (req,res) =>{
    
    try {
        
        // fetch data
        const {firstName, lastName, email, password, confirmPassword, contact, accountType,otp} = req.body;
        console.log(firstName);
            console.log(email);
            console.log(password);
            console.log(confirmPassword);
            console.log(otp);
            console.log(lastName);

        // validate
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){       
            
            // return
            return res.status(403).json({              
                success : false,
                message : "ALL Fields are required."
            });
        }

        // check for password == confirm password or not
        if (password != confirmPassword) {
            return res.status(400).json({
                success : false,
                message : "Passwords do not match."
            });
        }

        // check if user already exists
        const existingUser = await User.findOne({email});
        if (existingUser) {
            // return (end here)
            return res.status(401).json({
                success : false,
                message : "User already exists."
            });
        }
        // if not then -> find more recent otp -> verify -> hash password -> create DB Entry

        // to find most recent otp
        const recentOTP = await OTP.find({email}).sort({createdAt:-1}).limit(1);
        console.log("recent otp", recentOTP);
        

        // .sort() orders the results of the query.
        // { createdAt: -1 } means sort by the createdAt field in descending order.
        // Descending (-1) puts the most recent OTPs first, because newer entries have a later createdAt timestamp.
        // .limit(1) restricts the results to only one document
        // Combined with the sort, this effectively gives you the most recently created OTP for that email.

        // check otp verifies or not, if not verify:
        if (!recentOTP.length || recentOTP[0].otp.toString() !== otp.toString()) {
            return res.status(401).json({
                success : false,
                message : "Invalid OTP."
            });
        }


        // if verified:
        // Hash Password
        let hashPassword;
        try {
            hashPassword = await bcrypt.hash(password,10)
        } catch (error) {
            return res.status(400).json({
                success : false,
                message : "Error in hashing password."
            });
        }
        
        // create entry in DB

        // profile details //dummy object
        const profileDetails = await Profile.create({
            gender:null,
            dob:null,
            about:null,
            phoneNumber:null
        })

        
        const response = await User.create({firstName,
            lastName,
            email,
            password:hashPassword,
            contact,
            accountType,
            additionalDetails:profileDetails._id,
            image:`https://api.dicebear.com/9.x/initials/svg?seed=${firstName}%20${lastName}`
        })
        
        // return res
        return res.status(201).json({
            success:true,
            message:"User is Registered Successfuly",
            data:response
        })

    } catch (error) {
        // return res
        return res.status(400).json({
            success:false,
            message:"Error while creating the entry in DataBase"
        })
    }
}

// Login
exports.login = async (req,res) =>{

    try {
        // fetch email and pass from req body
        const {email, password} = req.body;

        // validate it
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Username or Password cannot be empty."
            })
        }
        
        // then check that whether user exist or not
        let user = await User.findOne({email}).populate("additionalDetails"); //must be in {}

        // if not
        if (!user) {
            return res.status(401).json({
                success:false,
                message:"User not registered."   
            });
        }

        

        // if yes then verify it
        if(await bcrypt.compare(password, user.password)){
            // if password match
            // ab bc cookies bnao baithke
            // creating jwt token

            const payload = {
                email:user.email,
                id:user._id,
                accountType:user.accountType
            }

            let token = jwt.sign(payload, process.env.JWT_SECRET,{expiresIn:"1y"});

            user = user.toObject();  // Convert to plain JS object
            user.token = token;
            user.password = undefined;

            // 2. creating cookies
            const options = {
                expires : new Date (Date.now() + 3 * 24 * 60 * 60 * 1000), //in ms

                httpOnly:true, //This makes the cookie inaccessible to JavaScript on the client (e.g., document.cookie).

                secure: false
            }
            // cookie = (cookie ka naam, cookie ka data, options);
            res.cookie("Token", token, options).status(200).json({
                success:true,
                token,
                user,
                message:"USer logged in successfully."   
            })

        } else {
            // password do not match
            return res.status(403).json({
                success:false,
                message:"Password Incorrect.",
            });
        }


    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"cannot loginn",
            error:error.message
        })
    }

};

exports.changePassword = async (req,res) => {
    try {
        const { oldPassword, newPassword, confirmPassword } = req.body;
        const userId = req.user.id; // from JWT
        console.log(req.body);
        

        // validate
        if (!oldPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "New password and confirm password do not match."
            });
        }

        // fetch user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        // verify old password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Old password is incorrect."
            });
        }

        // hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // update in db
        user.password = hashedPassword;
        await user.save();

        // now send mail that password is updated
        await mailSender(user.email, "Password Changed", passwordUpdated(user.email,user.firstName));

        return res.status(200).json({
            success: true,
            message: "Password updated successfully."
        });

        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error while updating password.",
            error: error.message
        });
    }
}