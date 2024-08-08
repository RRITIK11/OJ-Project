import dbConnect from "@/config/database";
import mongoose, { Schema, Document } from "mongoose";
import { Difficulty, Language, Verification } from "@/config/constants";
import { problemType, testCaseSchema } from "@/types/models/problem";
dbConnect();

export interface ProblemInterface extends Document,problemType {
  createdAt: Date;
  updatedAt: Date;
}

const TestCaseSchema: Schema = new Schema({
  input: { type: String, required: true },
  output: { type: String },
  visible: { type: Boolean, default: false },
  explanation: { type: String },
}, { timestamps: true });

export type TestCaseType = Document & {
  input: string;
  output?: string;
  visible: boolean;
  explanation?: string;
};

const ProblemSchema: Schema<ProblemInterface> = new mongoose.Schema(
  {
    number: {
      type: String,
      unique: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: String,
    difficulty: {
      type: String,
      enum: Object.values(Difficulty),
      required: true,
    },
    topics: [
      {
        type: String,
        lowercase: true,
      },
    ],
    companies: [
      {
        type: String,
        lowercase: true,
      },
    ],
    hints: [String],
    inputFormat: [String],
    outputFormat: [String],
    testCases: [TestCaseSchema],
    constraints: [String],
    solution: {
      language: {
        type: String,
        enum: Object.values(Language),
        required: true,
        default: Language.Cpp,
      },
      code: {
        type: String,
        required: true, // Ensure code is required if needed
      },
    },
    followUp: {
      type: String, // Fixed definition
    },
    verification: {
      type: String,
      enum: Object.values(Verification),
      default: Verification.Pending,
      required: true,
    },
    reasonForContribution: String,
    _createdBy: {
      type: String,
      required: true,
    },
    _approvedBy: {
      type: String,
    },
    _rejectedBy: {
      type: String,
    },
  },
  { timestamps: true }
);

const Problem =
  (mongoose.models.Problem as mongoose.Model<ProblemInterface>) ||
  mongoose.model<ProblemInterface>("Problem", ProblemSchema);

export default Problem;
