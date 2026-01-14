const mongoose = require("mongoose");

const paymentFakeSchema = new mongoose.Schema({
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    amount: { type: Number, required: true },

    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("PaymentFake",paymentFakeSchema);