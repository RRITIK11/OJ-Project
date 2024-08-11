import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/config/database";
import Problem, {ProblemInterface} from "@/models/problem.model";
import ProblemSubmission from "@/models/problemSubmission.model";
import { Verification } from "@/config/constants";

dbConnect();

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const problemNameSlug = url.pathname.split("/").filter(Boolean).pop();
    const problemName = problemNameSlug?.split('-').join(' '); 
    const regex = new RegExp(`^${problemName}$`, 'i');

    const pipeline = [
      { $match: { problemTitle: regex } },
      // Group by problem title to calculate submission statistics
      {
        $group: {
          _id: "$problemTitle",
          accepted: {
            $sum: {
              $cond: [{ $eq: ["$verdict.status.success", "accepted"] }, 1, 0]
            }
          },
          submissions: {
            $sum: 1
          }
        }
      },
      
      // Optionally, sort or project if needed
      {
        $project: {
          _id: 0,
          problemTitle: "$_id",
          accepted: 1,
          submissions: 1
        }
      }
    ];
    
    // Fetch submission statistics
    const aggregatedData = await ProblemSubmission.aggregate(pipeline).exec();
    
    // Fetch problem details
    const problemDetails: ProblemInterface | null = await Problem.findOne(
      { title: regex, verification : Verification.Verified },
      {
        _id: 1,
        number: 1,
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
        testCases: { $elemMatch: { visible: true } }
      }
    ).exec();
    
    // Combine results
    const combinedResult = {
      ...(problemDetails ? problemDetails.toObject() : {}), // Spread problem details
      submissionStats: aggregatedData.length > 0 ? aggregatedData[0] : { accepted: 0, submissions: 0 } // Spread submission stats
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
