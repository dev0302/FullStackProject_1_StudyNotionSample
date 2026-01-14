const express = require("express");
const { signup, sendOTP, login, changePassword } = require("../controllers/AuthN");
const { auth, isAdmin } = require("../middlewares/AuthZ");
const { resetPassword, resetPasswordToken } = require("../controllers/ResetPassword");

const { createContact, getAllContacts } = require("../controllers/ContactUsContoller");

const router = express.Router();
 

// fetch all controllers

// define routes

// signup
router.post("/signUp",signup);

// sendOTP
router.post("/sendOTP",sendOTP);

// login
router.post("/login",login);

// changePassword
router.post("/changePassword",auth,changePassword);

// reset password token
router.post("/resetPasswordToken",resetPasswordToken);

// reset password
router.post("/resetPassword",resetPassword);

// contact us
router.post("/contactUs",createContact);

// get all contacts
router.get("/getAllContacts",auth,isAdmin,getAllContacts);

module.exports = router;