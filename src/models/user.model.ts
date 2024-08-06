import mongoose from "mongoose";
import { Schema, Document } from "mongoose";
import dbConnect from "@/config/database";
import { UserType } from "@/schemas/models/user";
dbConnect();


export interface UserInterface extends Document, UserType {
  createdAt : Date;
  updatedAt : Date
}

const UserSchema: Schema<UserInterface> = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide the username"],
      unique: true,
      trim: true,
      lowercase: true,
      index :true
    },
    firstname: {
      type: String,
      required: [true, "Please provide the first name"],
      trim: true,
    },
    lastname: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide the username"],
      unique: true,
      index : true,
      trim : true
    },
    password: {
      type: String,
      required: [true, "Please provide the username"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    roles : {
      isAdmin: {
        type: Boolean,
        default: false,
      },
      isModerator: {
        type: Boolean,
        default: false,
      },
    },
    _problemSubmission: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProblemSubmission",
    }],
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
  },{
    timestamps: true,
  }
);

const User = (mongoose.models.User as mongoose.Model<UserInterface>) || mongoose.model<UserInterface>("User", UserSchema);

export default User;
