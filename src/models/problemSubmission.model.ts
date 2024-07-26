import mongoose, {Schema, Document , Types} from "mongoose";

export enum Success{
    Accepted = "accepted",
    Rejected = "rejected"
}

export interface StatusInteface {
    success : Success,
    message : string
}

export interface ProblemSubmissionInterface extends Document {
    userId : Types.ObjectId,
    problemId : Types.ObjectId,
    solution : Types.ObjectId,
    status : StatusInteface,
    createdAt : Date,
    updatedAt : Date
}

const ProblemSubmissionSchema : Schema<ProblemSubmissionInterface>= new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true
    },
    problemId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "problem"
    },
    solution : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "solution"
    },
    status : {
        success : Object.values(Success),
        message : String
    }
}, { timestamps: true });

const ProblemSubmission = (mongoose.models.ProblemSubmission as mongoose.Model<ProblemSubmissionInterface>) || mongoose.model<ProblemSubmissionInterface>("ProblemSubmission",ProblemSubmissionSchema);

export default ProblemSubmission;
