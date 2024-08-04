import dbConnect from "@/config/database";
import mongoose , {Schema, Document}from "mongoose";
dbConnect();

export enum Language {
    Java = "java",
    Cpp = "c++",
    Python = "python"
}

export interface SolutionInterface extends Document {
    language : Language,
    code : string
}

const SolutionSchema : Schema<SolutionInterface> = new mongoose.Schema({
    language : {
        type : String,
        enum : Object.values(Language),
        required : true,
        default : Language.Cpp
    },
    code : String
})

const Solution = (mongoose.models.Solution as mongoose.Model<SolutionInterface>) || mongoose.model<SolutionInterface>("Solution", SolutionSchema);

export default Solution