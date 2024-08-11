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
    
    const problem : ProblemInterface | null = await Problem.findOne({title : regex}).exec();

    return NextResponse.json(
      {
        success: true,
        problemName,
        problem
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
