// controllers/Payments.js
const PaymentFake = require("../models/PaymentFake");

exports.getPaymentHistory = async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from the auth middleware

    const history = await PaymentFake.find({ user: userId })
      .populate("courses") // Get full course details
      .sort({ createdAt: -1 }) // Show latest purchases first
      .exec();

    return res.status(200).json({
      success: true,
      data: history,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Could not fetch payment history",
    });
  }
};


// // npm i razorpay
// const { Mongoose, mongo, default: mongoose } = require("mongoose");
// const {instance} = require("../config/razorpay");
// const Course = require("../models/Course");
// const {mailSender} = require("../utils/mailSender");
// const User = require("../models/User");

// exports.capturePayment = async(req,res) => {
//     try {
//         // fetch courseId and UserID
//         const {course_id} = req.body;
//         const userId = req.user.id; //string type
//         // In your database (MongoDB), each document automatically has an _id field of type ObjectId.
//         // In your JWT (or when you send data via frontend/backend), the user.id inside req.user.id is stored as a string (e.g. "652d81a5aefb4b9d2ca812e3"). 
//         // This still works fine because Mongoose automatically converts string IDs to ObjectId internally.
//         // Safe solution : Always convert explicitly when needed.

//         // validations
//         if(!course_id || !userId){
//             return res.status(400).json({
//                 success: false,
//                 message: "Missing required fields: course_id or userId.",
//             });
//         }

//         let course //agar try ke andar define krta to access by try block ke andar tk hi rhta....

//         try {
//             // now find that whether this course id exist in db or not
//             course = await Course.findById(course_id);

//             // if not exist
//             if(!course){
//                 return res.status(400).json({
//                     success: false,
//                     message: "Course not found.",
//                 });
//             }

//             // if exist
//             // check whether user has already buyed this course or not

//             // now for that here since we have to check in the arrays of studentsEnrolled in the Course schemas which contains object id's of all the users enrolled in this course but since our userId is of string types and arrays contains object type so need to explicty convert the userId from String to Object type.

//             const uid = new mongoose.Types.ObjectId(userId);

//             if(course.studentEnrolled.includes(uid)){
//                 return res.status(400).json({
//                     success: false,
//                     message: "User already enrolled in this course.",
//                 });
//             }

        
//         } catch (error) {
//              return res.status(500).json({
//                 success: false,
//                 message: "Database error while fetching course.",
//             });
//         }

//         // ------------------------------
//         // create razorpay order
//         const amount = course.price; //course schama mei hai price
//         const currency = "INR";

//         const options = {
//             amount:amount*100, //Razorpay needs amount in paisa, so multiply by 100
//             currency,
//             receipt: Math.random(Date.now()).toString(),
//             notes: { courseId: course_id, userId }
//         }

//         try {
//             // initialize the payment using razorpay
//             const paymentResponse = await instance.orders.create(options); //instance from config
//             console.log(paymentResponse);
            
//             if (!paymentResponse) {
//                 return res.status(500).json({
//                     success: false,
//                     message: "Failed to create payment order with Razorpay.",
//                 });
//             }

//             // Send response to frontend
//             return res.status(200).json({
//                 success: true,
//                  message: "Payment order created successfully.",
//                 orderId: paymentResponse.id,
//                 amount: paymentResponse.amount,
//                 currency: paymentResponse.currency,
//                 courseName: course.courseName,
//                 description: course.description,
//                 thumbnail: course.thumbnail,
//             });

            
//         } catch (error) {
//             return res.status(500).json({
//                 success: false,
//                 message: "Error while creating Razorpay order.",
//             });
//         }
//     } catch (error) {
//         return res.status(500).json({
//                 success: false,
//                 message: "Server error while processing payment.",
//             });
//     }
// }

// // verify signature of razopay and server
// exports.verifySignature = async(req,res) => {
//     try {
//         // When a payment, refund, or subscription event happens on Razorpay (like “Payment Successful”), Razorpay can automatically notify your backend server about it — this is called a Webhook.
//         const webhookSecret = "123456"; //should be stored in .env
//         const signature = req.headers["x-razorpay-signature"];
//         const expectedSignature = crypto
//         .createHmac("sha256", webhookSecret)
//         .update(JSON.stringify(req.body))
//         .digest("hex");

//         if (signature === expectedSignature) {
//             console.log("Payment is Authorised"); // Safe to trust this payment data

//             // now since it is verified

//             // need to update db, for that courseId and userId is required, but since now the api interaction is with razorpay....
//             const {courseId, userId} = req.body.payload.payment.entity.notes;

//             try {
//                 // fulfill the action
//                 // find course and enroll student in it
//                 const enrolledCourse = await Course.findByIdAndUpdate(courseId, 
//                     {
//                         $push:{studentEnrolled:userId}
//                     }, {new:true}
//                 );

//                 if(!enrolledCourse){
//                     return res.status(500).json({
//                         success:false,
//                         message:"Course not found"
//                     })
//                 }

//                 console.log(enrolledCourse);

//                 // now also update in user

//                 const enrolledStudent = await User.findByIdAndUpdate(userId,
//                     {$push:{courses:courseId}} , {new:true}
//                 );

//                 console.log(enrolledStudent);

//                 // now send mail to give them confirmation
//                 const emailResponse = await mailSender(enrolledStudent.email,"Congratulations from CodeHelp", "Congratulations! you are onboard into new CodeHelp Course");

//                 return res.status(200).json({
//                     success: true,
//                     message: "Payment verified and course enrollment updated successfully."
//                 });
                
                
//             } catch (error) {
//                 return res.status(500).json({
//                     success: false,
//                     message: "Error updating course or user after payment verification."
//                 });
//             }

//         } else {
//              return res.status(400).json({
//                 success: false,
//                 message: "Webhook signature verification failed."
//             });
//         }
        

//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: "Internal server error in webhook verification."
//         });
//     }
// } 