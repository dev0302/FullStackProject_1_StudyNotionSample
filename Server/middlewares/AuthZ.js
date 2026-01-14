// Autherization--> "what are you allowed to.
// auth, isStudent, isAdmin
require("dotenv").config();
const jwt = require("jsonwebtoken");


// 1. for autherization
exports.auth = async(req,res,next) => {

    console.log("Auth middleware hit");

    // here next is 3rd parameter in defining the middleware, it is used for calling the next middleware function after this one (they are called in order).
    try {
        // extract jwt token (many differ methods)
        // const token = req.body.token; // Method-->1
        const token = req.cookies.Token || req.headers.authorization?.split(" ")[1]; // Method-->2
        // const token = req.header("Authorization").replace("Bearer ","");  //Method-3
        
        
        

        // if no token found
        if (!token) {
            console.log("NO TOKEN FOUND");
            return res.status(400).json({
                success:false,
                message:"Missing token."
            });
        }
        console.log("Token found successfully");
        

        // if token found, then
        // verify the token
        try {
            // jwt.verify(token, secret) --> verifies the token signature, checks expiration, return decoded data only if token is valid and trusted
            const decode = jwt.verify(token, process.env.JWT_SECRET);

            // console.log(decode); //to see decode data

            req.user = decode; //is attaching the decoded token data to the req object, which will be available to the next middleware or route handler.
            // it will create new 'user' key in req object.

        } catch (err) {
            return res.status(401).json({
                success:false,
                message:"Invalid token.",
                error:err.message
            });
        }

        next(); //shifting to next middleware
        
        
    } catch (err) {
        return res.status(500).json({
                success:false,
                message:"Something went wrong while verifying the token.",
                error:err.message
            });
    }

}

// 2. for isStudent
exports.isStudent = async(req,res,next) => {
    try {
        // if not student
        if (req.user.accountType != "Student") {
            return res.status(401).json({
                success:false,
                message:"This is a protected route for students.",
            });   
        };
        next();

    } catch (err) {
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified",
            error:err.message
        });
    }
}

// 2. for isAdmin
exports.isAdmin = async(req,res,next) => {
    try {
        // if not admin
        if (req.user.accountType != "Admin") {
            return res.status(401).json({
                success:false,
                message:"This is a protected route for admins.",
            });
        };
        next();


    } catch (err) {
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified",
            error:err.message
        });
    }
}

// 3. for isInstructor
exports.isInstructor = async(req,res,next) => {
    try {
        // if not Instructor
        if (req.user.accountType != "Instructor") {
            return res.status(401).json({
                success:false,
                message:"This is a protected route for Instructor.",
            });
        };
        next();


    } catch (err) {
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified",
            error:err.message
        });
    }
}