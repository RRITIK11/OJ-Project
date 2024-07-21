import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name : {
        type : String,
        unique : true,
        lowercase : true
    },
    problemIds : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "problem",
    }]
})

const Company = mongoose.models.companies || mongoose.model("companies", companySchema);

export default Company