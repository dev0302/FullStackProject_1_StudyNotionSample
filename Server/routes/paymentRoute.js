const express = require("express");
const { auth, isStudent } = require("../middlewares/AuthZ");
const { getPaymentHistory } = require("../controllers/Payments");
const router = express.Router();

// define route
router.get("/paymentHistory", auth, isStudent, getPaymentHistory)

module.exports = router;

// const { capturePayment, verifySignature } = require("../controllers/Payments");
// const router = express.Router();

// // fetch all controllers

// // define routes
// router.post("capturePayment",auth,isStudent,capturePayment);
// router.post("verifySignature",verifySignature);

// module.exports = router;