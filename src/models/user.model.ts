import mongoose from "mongoose";


const userSchema  = new mongoose.Schema({
    username : {
        type : String,
        required : [true, "Please provide the username"],
        unique: true
    },
    firstName : {
        type : String,
        required : [true, "Please provide the name"],
    },
    lastName : {
        type : String,
    },
    email : {
        type : String,
        required : [true, "Please provide the username"],
        unique: true
    },
    password : {
        type : String,
        required : [true, "Please provide the username"]
    },
    isVerified : {
        type : Boolean,
        default: false
    },
    isAdmin : {
        type : Boolean,
        default : false
    },
    forgotPasswordToken : String,
    forgotPasswordTokenExpiry: Date,
    verifyToken : String,
    verifyTokenExpiry : Date
})

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User