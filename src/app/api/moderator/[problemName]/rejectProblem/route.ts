import dbConnect from "@/config/database";
import {
  checkIfUserIsAdmin,
  checkIfUserIsModerator,
  getUsername,
} from "@/helpers/Authorization";
import { generateFilteredProblemPipeline } from "@/helpers/generateFilteredProblemPipepline";
import Problem, { ProblemInterface } from "@/models/problem.model";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { Verification } from "@/config/constants";

dbConnect();

export async function PATCH(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const problemNameSlug = url.pathname.split("/").filter(Boolean);

    const problemName = problemNameSlug[problemNameSlug.length-2]?.split("-").join(" ");
    const regex = new RegExp(`^${problemName}$`, "i");

    

    const token = await getDataFromToken(request);
    if (!token) {
      return NextResponse.json(
        {
          error: "Your must have to login for creating a question",
        },
        { status: 401 }
      );
    }

    const isModerator: boolean = token.roles.isModerator;

    if (!isModerator) {
      return NextResponse.json(
        {
          error: "Your don't have to required permission to access this route.",
        },
        { status: 403 }
      );
    }

    const username = token.username;
    if (!username) {
      return NextResponse.json(
        {
          error: "No user name found",
        },
        { status: 403 }
      );
    }

    const problems = await Problem.findOneAndUpdate(
      { title: regex, verification : Verification.Pending},
      {
        verification: Verification.Rejected,
        _rejectedBy: username,
      }
    ).exec();

    return NextResponse.json(
      {
        success: true,
        message: "Problem is rejected",
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
