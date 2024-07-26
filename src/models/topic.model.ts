import mongoose, { Document, Types } from "mongoose";

export interface TopicInterface extends Document{
    name : string,
    problemIds : Types.ObjectId[]
}

const TopicSchema = new mongoose.Schema({
    name : {
        type : String,
        unique : true,
        lowercase : true
    },
    problemIds : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "problem"
    }]
})

const Topic = (mongoose.models.Topic as mongoose.Model<TopicInterface>) || mongoose.model<TopicInterface>("Topic", TopicSchema);

export default Topic