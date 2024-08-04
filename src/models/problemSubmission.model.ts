import mongoose, {Schema, Document , Types} from "mongoose";
import { Language, ProblemInterface, SolutionInterface } from "./problem.model";
import { UserInterface } from "./user.model";
import dbConnect from "@/config/database";
import { string } from "zod";
dbConnect();

export enum Success{
    Accepted = "accepted",
    Rejected = "rejected"
}

export interface StatusInteface extends Document{
    success : Success,
    message : string
}

export interface VerdictInterface extends Document{
    testcasePassed : number,
    totalTestcase : number,
    status : StatusInteface
}


export interface ProblemSubmissionInterface extends Document {
    solution : SolutionInterface,
    verdict : VerdictInterface,
    createdAt : Date,
    updatedAt : Date
}

const ProblemSubmissionSchema : Schema<ProblemSubmissionInterface>= new mongoose.Schema({
    solution: {
        language: {
          type: String,
          enum: Object.values(Language),
          required: true,
          default: Language.Cpp,
        },
        code: String,
      },
    verdict : {
        testcasePassed : Number,
        totalTestcase : Number,
        status : {
            success : Object.values(Success),
            message : String
        }
    }
}, { timestamps: true });

const ProblemSubmission = (mongoose.models.ProblemSubmission as mongoose.Model<ProblemSubmissionInterface>) || mongoose.model<ProblemSubmissionInterface>("ProblemSubmission",ProblemSubmissionSchema);

export default ProblemSubmission;
