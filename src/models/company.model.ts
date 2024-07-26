import mongoose , {Document, Schema, Types} from "mongoose";

export interface CompanyInterface extends Document{
    name : string,
    problemIds : Types.ObjectId
}

const CompanySchema : Schema<CompanyInterface> = new mongoose.Schema({
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

const Company = (mongoose.models.Company as mongoose.Model<CompanyInterface>) || mongoose.model<CompanyInterface>("Company", CompanySchema);

export default Company