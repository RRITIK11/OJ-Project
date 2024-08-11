import dbConnect from "@/config/database";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { getDataFromHeader } from "@/helpers/getDataFromHeader";
import Problem, { ProblemInterface } from "@/models/problem.model";
import { NextRequest, NextResponse } from "next/server";
import { Verification } from "@/config/constants";

dbConnect();

export async function PATCH(request: NextRequest) {
  console.log("first");

  try {
    const url = new URL(request.url);
    const problemNameSlug = url.pathname.split("/").filter(Boolean);

    const problemName = problemNameSlug[problemNameSlug.length - 2]?.split("-").join(" ");
    if (!problemName) {
      return NextResponse.json(
        { error: "Invalid problem name" },
        { status: 400 }
      );
    }

    const regex = new RegExp(`^${problemName}$`, "i");

    // Get and validate token
    const token = await getDataFromToken(request);
    if (!token) {
      return NextResponse.json(
        { error: "You must be logged in to create a question" },
        { status: 401 }
      );
    }

    const isModerator = token.roles.isModerator;
    if (!isModerator) {
      return NextResponse.json(
        { error: "You don't have the required permission to access this route." },
        { status: 403 }
      );
    }

    const username = token.username;
    if (!username) {
      return NextResponse.json(
        { error: "No username found" },
        { status: 403 }
      );
    }

    // Get data from request
    const { title, topics, companies, difficulty } = await getDataFromHeader(request);

    // Aggregate to get the count of problems and generate a unique number
    const pipeline = [
      { $match: { verification: { $in: ["verified", "deleted"] } } },
      { $group: { _id: null, maxNumber: { $max: { $toInt: "$number" } } } }
    ];

    const result = await Problem.aggregate(pipeline);
    const maxNumber = result[0]?.maxNumber ?? 0;
    const number = (maxNumber + 1).toString();

    console.log("Generated number:", number);

    // Update problem document
    const updatedProblem = await Problem.findOneAndUpdate(
      { title: regex, verification: Verification.Pending },
      {
        number,
        verification: Verification.Verified,
        _approvedBy: username,
        title,
        topics,
        companies,
        difficulty
      },
      {
        new: true,  // Return the updated document
        runValidators: true  // Run schema validation
      }
    ).exec();

    if (!updatedProblem) {
      return NextResponse.json(
        { error: "Problem not found or update failed" },
        { status: 404 }
      );
    }

    console.log(updatedProblem);

    return NextResponse.json(
      { success: true, message: "Problem is verified" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error in PATCH handler:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
