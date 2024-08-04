import mongoose , {Document, Schema, Types} from "mongoose";
import { ProblemInterface } from "./problem.model";
import dbConnect from "@/config/database";
dbConnect();

export interface CompanyInterface extends Document{
    name : string,
    _problemIds : ProblemInterface["_id"][]
}

const CompanySchema : Schema<CompanyInterface> = new mongoose.Schema({
    name : {
        type : String,
        unique : true,
        lowercase : true
    },
    _problemIds : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Problem",
    }]
})

const Company = (mongoose.models.Company as mongoose.Model<CompanyInterface>) || mongoose.model<CompanyInterface>("Company", CompanySchema);

export default Company