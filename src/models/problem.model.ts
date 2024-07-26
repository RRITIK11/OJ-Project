import mongoose, { Schema, Document , Types} from "mongoose";

export enum Difficulty {
  Easy = "easy",
  Medium = "medium",
  Hard = "hard"
}

export interface Description {
  text : string,
  images : string[]
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
  number : number,
  title : string,
  description : Description,
  difficulty : Difficulty,
  topics? : string[],
  companies? : string[],
  hint? : string[],
  example? : Example[],
  constraints? : string[],
  followUp? : string,
  status : Status,
  authorId? : Types.ObjectId ,  //need to update later on
  approvedBy? : Types.ObjectId,  //need to update later on
  createdAt : Date,
  updatedAt : Date
};

const ProblemSchema : Schema<ProblemInterface> = new mongoose.Schema(
  {
    number:{
      type : Number,
      required : true,
      unique : true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    description: {
      text: String,
      images: {
        type: [String],
        default: [],
      },
    },
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
            // required : true
        },
        output : {
            type : String,
            // required : true
        },
        explanation : {
            text : String,
            images : [String]
        }
    }],
    constraints : [String],
    followUp : String,
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
    authorId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        // required : true
    },
    approvedBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        // required : true
    } 
  },
  { timestamps: true }
);

const Problem =
  (mongoose.models.Problem as mongoose.Model<ProblemInterface>) || mongoose.model<ProblemInterface>("Problem", ProblemSchema);

export default Problem;
