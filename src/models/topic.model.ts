import mongoose, { Document, Types } from "mongoose";
import { ProblemInterface } from "./problem.model";
import dbConnect from "@/config/database";
dbConnect();

export interface TopicInterface extends Document{
    name : string,
    _problemIds : ProblemInterface["_id"][]
}

const TopicSchema = new mongoose.Schema({
    name : {
        type : String,
        unique : true,
        lowercase : true
    },
    _problemIds : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "problem"
    }]
})

const Topic = (mongoose.models.Topic as mongoose.Model<TopicInterface>) || mongoose.model<TopicInterface>("Topic", TopicSchema);

export default Topic