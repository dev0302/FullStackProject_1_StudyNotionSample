const express = require("express");
require("dotenv").config();

// import all routes
const courseRoutes = require("./routes/courseRoute");
// const paymentRoutes = require("./routes/paymentRoute");
const profileRoutes = require("./routes/profileRoute");
const userRoutes = require("./routes/userRoute");
const paymentRoutes = require("./routes/paymentRoute");


// other imports
const dbConnect = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const cloudinaryConnect = require("./config/cloudinary");
const fileUpload = require("express-fileupload"); 

// app
const app = express();

// PORT
const PORT = process.env.PORT;

// Database Connect
dbConnect();

// cloudinary Connect
cloudinaryConnect();

// middlewares
app.use(express.json()); //express
app.use(cookieParser()); //cookieParser
// app.use(
//     cors({
//         origin:"http://localhost:3000",
//         // credentials:true
//     })
// )
app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp"
    })
)



// this will allow frontend req to backend from diff servers too---------
const allowedOrigins = ["http://localhost:5173", "http://localhost:3000"];

app.use(
  cors({
    
    origin: function(origin, callback) {
      // allow requests with no origin like mobile apps or Postman
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);

      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // allow cookies/auth headers
  })
);

// ----------------------------------------------------


// routes
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/course",courseRoutes);
app.use("/api/v1/payment",paymentRoutes);
// app.use("/api/v1/payment",paymentRoutes);

// default route
app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"Your Server is up and running...."
    })
})



app.listen(PORT,()=>{
    console.log(`Server is running at port : ${PORT}` );
    
})



