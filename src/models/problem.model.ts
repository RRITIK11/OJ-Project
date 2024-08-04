import dbConnect from "@/config/database";
import mongoose, { Schema, Document } from "mongoose";
import { ProblemSubmissionInterface } from "./problemSubmission.model";
dbConnect();

export enum Difficulty {
  Easy = "easy",
  Medium = "medium",
  Hard = "hard",
}

export enum Verification {
  Pending = "pending",
  Verified = "verified",
  Rejected = "rejected",
  Removed = "removed",
}

export interface TestCasesInterface extends Document {
  input: string;
  output: string;
  visible: boolean;
  explanation?: string;
}

export enum Language {
  Java = "java",
  Cpp = "c++",
  Python = "python",
  JavaScript = "javascript",
}

export interface SolutionInterface extends Document {
  language: Language;
  code: string;
}

export interface ProblemInterface extends Document {
  number?: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  topics?: string[];
  companies?: string[];
  hints?: string[];
  testCases?: TestCasesInterface[];
  inputFormat: string[];
  outputFormat: string[];
  constraints?: string[];
  followUp?: string;
  _createdBy: string; // need to update later on
  _approvedBy?: string; // need to update later on
  _rejectedBy?: string;
  _problemSubmissions: ProblemSubmissionInterface["_id"][];
  verification: Verification;
  reasonForContribution?: string;
  solution: SolutionInterface;
  createdAt: Date;
  updatedAt: Date;
}

const TestCaseSchema: Schema<TestCasesInterface> = new mongoose.Schema({
  input: {
    type: String,
    required: true,
  },
  output: {
    type: String,
  },
  visible: {
    type: Boolean,
    default: false,
  },
  explanation: String,
});

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
    _problemSubmissions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProblemSubmission",
      },
    ],
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
