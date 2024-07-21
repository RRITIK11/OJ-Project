import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
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

const Topic = mongoose.models.topics || mongoose.model("topics", topicSchema);

export default Topic