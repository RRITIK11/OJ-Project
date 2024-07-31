import mongoose, {Schema, Document , Types} from "mongoose";
import { ProblemInterface } from "./problem.model";
import { UserInterface } from "./user.model";

export enum Success{
    Accepted = "accepted",
    Rejected = "rejected"
}

export interface StatusInteface {
    success : Success,
    message : string
}

export interface ProblemSubmissionInterface extends Document {
    _userId : UserInterface["_id"],
    _problemId : ProblemInterface["_id"],
    _solution : ProblemSubmissionInterface["_id"],
    status : StatusInteface,
    createdAt : Date,
    updatedAt : Date
}

const ProblemSubmissionSchema : Schema<ProblemSubmissionInterface>= new mongoose.Schema({
    _userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    _problemId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Problem"
    },
    _solution : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Solution"
    },
    status : {
        success : Object.values(Success),
        message : String
    }
}, { timestamps: true });

const ProblemSubmission = (mongoose.models.ProblemSubmission as mongoose.Model<ProblemSubmissionInterface>) || mongoose.model<ProblemSubmissionInterface>("ProblemSubmission",ProblemSubmissionSchema);

export default ProblemSubmission;
