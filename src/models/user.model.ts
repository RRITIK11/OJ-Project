import mongoose from "mongoose";
import { Schema, Document } from "mongoose";
import { ProblemSubmissionInterface } from "./problemSubmission.model";

export interface UserInterface extends Document {
  username: string;
  firstname: string;
  lastname?: string | null;
  email: string;
  password: string;
  isVerified: boolean;
  isAdmin: boolean;
  isModerator: boolean;
  forgotPasswordToken?: string;
  forgotPasswordTokenExpiry?: Date;
  problemSubmission: ProblemSubmissionInterface[];
  verifyToken?: string;
  verifyTokenExpiry?: Date;
  createdAt: Date;
  updateAt: Date;
}

const UserSchema: Schema<UserInterface> = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide the username"],
      unique: true,
      trim: true,
      lowercase: true,
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
    },
    password: {
      type: String,
      required: [true, "Please provide the username"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isModerator: {
      type: Boolean,
      default: false,
    },
    problemSubmission: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "problem",
    }],
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
  },
  {
    timestamps: true,
  }
);

const User = (mongoose.models.User as mongoose.Model<UserInterface>) || mongoose.model<UserInterface>("User", UserSchema);

export default User;
