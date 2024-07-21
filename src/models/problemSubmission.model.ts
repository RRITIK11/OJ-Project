import mongoose from "mongoose";

const problemSubmissionSchema = new mongoose.Schema({
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
        success : ["accepted" , "rejected"],
        message : String
    }
}, { timestamps: true });

const ProblemSubmission = mongoose.models.problemSubmissions || mongoose.model("problemSubmissions",problemSubmissionSchema);

export default ProblemSubmission;
