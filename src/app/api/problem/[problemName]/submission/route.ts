import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/config/database";
import Problem, {ProblemInterface} from "@/models/problem.model";
import ProblemSubmission, { ProblemSubmissionInterface } from "@/models/problemSubmission.model";
import { WholeWord } from "lucide-react";
import { getDataFromToken } from "@/helpers/getDataFromToken";

dbConnect();

export async function GET(request: NextRequest) {
  try {

    const decoded = await getDataFromToken(request);

    const url = new URL(request.url);
    const pathSegments = url.pathname.split('/').filter(Boolean);
    const secondLastSegment = pathSegments.length > 1 ? pathSegments[pathSegments.length - 2] : undefined;
    const problemName = secondLastSegment?.split('-').join(' '); 
    const regex = new RegExp(`^${problemName}$`, 'i');

    const submissions : ProblemSubmissionInterface[] = await ProblemSubmission.find({problemTitle : regex , whoSolved : decoded.username},{
        solution : 1,
        verdict : 1,
        createdAt : 1
    }).exec()    

    return NextResponse.json(
      {
        success: true,
        submissions
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
