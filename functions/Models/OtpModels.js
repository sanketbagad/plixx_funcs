import mongoose from "mongoose";

const emailOtpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
},
{
    timestamps: true,
});

const mobileOtpSchema = new mongoose.Schema({
    mobileNumber: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
},
{
    timestamps: true,
});

const mobileUpdateOtpSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    mobileNumber: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
},
{
    timestamps: true,
});

const emailOtpModel = mongoose.model("EmailOtp", emailOtpSchema);
const mobileOtpModel = mongoose.model("MobileOtp", mobileOtpSchema);
const mobileUpdateOtpModel = mongoose.model("MobileUpdateOtp", mobileUpdateOtpSchema);

export { emailOtpModel, mobileOtpModel, mobileUpdateOtpModel };