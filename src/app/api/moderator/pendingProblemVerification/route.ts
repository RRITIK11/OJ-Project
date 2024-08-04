import dbConnect from "@/config/database";
import { checkIfUserIsAdmin, checkIfUserIsModerator } from "@/helpers/Authorization";
import { generateFilteredProblemPipeline } from "@/helpers/generateFilteredProblemPipepline";
import Problem from "@/models/problem.model";
import { NextRequest, NextResponse } from "next/server";

dbConnect();

export async function GET(request : NextRequest) {
    try {
        const token = request.cookies.get("token")?.value || "";
        if(!token){
            return NextResponse.json({
                error : "Your must have to login for creating a question"
            },{status : 401});
        }

        const isAdmin : boolean = await checkIfUserIsAdmin(token);
        const isModerator : boolean = await checkIfUserIsModerator(token);

        if(!isAdmin && !isModerator){
            return NextResponse.json({
                error : "Your don't have to required permission to access this route."
            },{status : 403})
        }

        const queryParams = request.nextUrl.searchParams;
        const filterPipeline = generateFilteredProblemPipeline(queryParams, ["_id","title","topics","companies","difficulty", "_createdBy","isVerified"],false);

        const problems = await Problem.aggregate(filterPipeline);

        return NextResponse.json({
            success : true,
            problems
        },{status : 200})

    } catch (error : any) {
        return NextResponse.json({
            error : error.message
        },{status : 500})
    }
}