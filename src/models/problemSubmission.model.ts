import mongoose, {Schema, Document} from "mongoose";
import dbConnect from "@/config/database";
import { string } from "zod";
import { Language, Success } from "@/config/constants";
import { problemSubmissionType } from "@/types/models/problemSubmission";
dbConnect();

export interface ProblemSubmissionInterface extends Document,problemSubmissionType {
    createdAt : Date,
    updatedAt : Date
}

const ProblemSubmissionSchema : Schema<ProblemSubmissionInterface>= new mongoose.Schema({
    whoSolved : {
        type : String,
        required : true
    },
    problemTitle : {
        type : String,
        required : true
    },
    solution : {
        language : {
            type : String,
            required : true,
            enum : Object.values(Language),
            default : Language.Cpp
        },
        code : String
    },
    verdict : {
        testcasePassed : {
            type : Number,
            required : true,
            default : 0
        },
        totalTestcase : {
            type : Number,
            required : true,
            default : 0
        },
        status : {
            success : {
                type : String,
                required : true,
                enum : Object.values(Success),
            },
            message : String
        }

    }
}, { timestamps: true });

const ProblemSubmission = (mongoose.models.ProblemSubmission as mongoose.Model<ProblemSubmissionInterface>) || mongoose.model<ProblemSubmissionInterface>("ProblemSubmission",ProblemSubmissionSchema);

export default ProblemSubmission;