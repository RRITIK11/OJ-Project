import mongoose from "mongoose";

const problemSchema = new mongoose.Schema(
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
      unique: true,
    },
    description: {
      text: {
        type: String,
        required: true,
      },
      images: {
        type: [String],
        default: [],
      },
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"], // Enum validator
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
  mongoose.models.problems || mongoose.model("problems", problemSchema);

export default Problem;
