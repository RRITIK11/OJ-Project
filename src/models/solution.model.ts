import mongoose from "mongoose";

const solutionSchema = new mongoose.Schema({
    language : ['c++',"java","python"],
    code : String
})

const Solution = mongoose.models.solutions || mongoose.model("Solutions", solutionSchema);

export default Solution