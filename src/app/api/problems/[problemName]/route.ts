import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/config/database";
import Problem, {ProblemInterface} from "@/models/problem.model";

dbConnect();

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const problemNameSlug = url.pathname.split("/").pop();
    const problemName = problemNameSlug?.split('-').join(' '); 
    const regex = new RegExp(`^${problemName}$`, 'i');

    const pipeline = [
  // Match the specific problem
  { $match: { title : regex } },
  
  // Unwind the _problemSubmissions array
  { $unwind: "$_problemSubmissions" },
  
  // Lookup the ProblemSubmission collection to get submission details
  {
    $lookup: {
      from: "problemSubmissions", // Collection name
      localField: "_problemSubmissions",
      foreignField: "_id",
      as: "submissionDetails"
    }
  },
  
  // Unwind the submissionDetails array
  { $unwind: "$submissionDetails" },
  
  // Group by problem and calculate the counts
  {
    $group: {
      _id: "$_id",
      accepted: {
        $sum: {
          $cond: [{ $eq: ["$submissionDetails.verdict.status.success", "accepted"] }, 1, 0]
        }
      },
      submissions: {
        $sum: 1
      }
    }
  }
]
    
    const problemDetails: ProblemInterface | null = await Problem.findOne(
      { title: regex },
      {
        _id: 1,
        number:1,
        title: 1,
        description: 1,
        difficulty: 1,
        topics: 1,
        companies: 1,
        hints: 1,
        inputFormat: 1,
        outputFormat: 1,
        constraints: 1,
        followUp: 1,
        _createdBy: 1,
        _approvedBy: 1,
        _rejectedBy: 1,
        verification: 1,
        testCases: { $elemMatch: { visible: true } },
      }
    ).exec();

    const aggregatedData = await Problem.aggregate(pipeline).exec();

    const combinedResult = {
      ...(problemDetails ? problemDetails.toObject() : {}), // Spread problem details
      submissionStats: aggregatedData.length > 0 ? aggregatedData[0] : {accepted : 0 , submissions : 0} // Spread submission stats
    };
    

    return NextResponse.json(
      {
        success: true,
        problemName,
        problem : combinedResult
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
