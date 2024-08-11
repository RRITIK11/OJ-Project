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

    
    const problemDetails: ProblemInterface | null = await Problem.findOne(
      { title: regex , verification : Verification.Pending }
    ).exec();
    

    return NextResponse.json(
      {
        success: true,
        problemName,
        problem : problemDetails
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
