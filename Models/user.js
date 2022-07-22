const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    key: {
        type: String,
        required: true,
    },
    encrypted: {
        type: Boolean,
        required: true,
    },
    otp: {
        type: Number,
    },
    otpExpire: {
        type: Date,
    },
});

module.exports = mongoose.model("User", userSchema);
