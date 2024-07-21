import mongoose from "mongoose";

export interface UserInterface {
    username : string,
    firstname : string,
    lastname? : string | null,
    email : string,
    password : string,
    isVerified : boolean,
    isAdmin : boolean,
    forgotPasswordToken? : string,
    forgotPasswordTokenExpiry?: Date,
    verifyToken? : string,
    verifyTokenExpiry? : Date
}


const userSchema  = new mongoose.Schema({
    username : {
        type : String,
        required : [true, "Please provide the username"],
        unique: true,
        trim : true,
        lowercase : true
    },
    firstname : {
        type : String,
        required : [true, "Please provide the first name"],
        trim : true,
    },
    lastname : {
        type : String,
        trim : true,
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
    isModerator : {
        type : Boolean,
        default : false
    },
    forgotPasswordToken : String,
    forgotPasswordTokenExpiry: Date,
    verifyToken : String,
    verifyTokenExpiry : Date,
}, {
    timestamps : true
})

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User