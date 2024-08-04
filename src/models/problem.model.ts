import dbConnect from "@/config/database";
import mongoose, { Schema, Document , Types} from "mongoose";
dbConnect();

export enum Difficulty {
  Easy = "easy",
  Medium = "medium",
  Hard = "hard"
}

export interface Example {
  input : string,
  output : string,
  explanation? : string
}

export interface Status {
  accepted : number,
  submissions : number
}

export interface ProblemInterface extends Document{
  number? : string,
  title : string,
  description : string,
  difficulty : Difficulty,
  topics? : string[],
  companies? : string[],
  hint? : string[],
  example? : Example[],
  status : Status,
  constraints? : string[],
  followUp? : string,
  _createdBy? : string ,  //need to update later on
  _approvedBy? : string,  //need to update later on,
  isVerified : boolean,
  reasonForContribution? : string,
  createdAt : Date,
  updatedAt : Date
};

const ProblemSchema : Schema<ProblemInterface> = new mongoose.Schema(
  {
    number:{
      type : String,
      unique : true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    description: String,
    difficulty: {
      type: String,
      enum: Object.values(Difficulty), // Enum validator
      required: true,
    },
    topics: [{
      type : String,
      lowercase : true
    }],
    companies: [{
      type : String,
      lowercase : true
    }],
    hint : [String],
    example : [{
        input : {
            type : String,
            required : true
        },
        output : {
            type : String,
            required : true
        },
        explanation : String,
    }],
    status : {
        accepted : {
            type : Number,
            default : 0,
        },
        submissions : {
            type : Number,
            default : 0,
        }
    },
    constraints : [String],
    followUp : {
      String
    },
    isVerified : {
      type : Boolean,
      default : false
    },
    reasonForContribution :String,
    _createdBy : {
        type : String,
        required : true
    },
    _approvedBy : {
        type : String,
        // required : true
    } 
  },
  { timestamps: true }
);

const Problem =
  (mongoose.models.Problem as mongoose.Model<ProblemInterface>) || mongoose.model<ProblemInterface>("Problem", ProblemSchema);

export default Problem;
