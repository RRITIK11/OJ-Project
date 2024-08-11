import { Verification } from "@/config/constants";
import dbConnect from "@/config/database";
import { checkIfUserIsAdmin, checkIfUserIsModerator } from "@/helpers/Authorization";
import { generateFilteredProblemPipeline } from "@/helpers/generateFilteredProblemPipepline";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Problem from "@/models/problem.model";
import { NextRequest, NextResponse } from "next/server";

dbConnect();

export async function GET(request : NextRequest) {
    try {
        const token = await getDataFromToken(request);
        console.log(token)
        if(!token){
            return NextResponse.json({
                error : "Your must have to login for creating a question"
            },{status : 401});
        }

        const isAdmin : boolean = token.roles.isAdmin;
        const isModerator : boolean = token.roles.isModerator;
        console.log(isAdmin , isModerator)

        if(!isModerator){
            return NextResponse.json({
                error : "Your don't have to required permission to access this route."
            },{status : 403})
        }

        const queryParams = request.nextUrl.searchParams;
        const filterPipeline = generateFilteredProblemPipeline(queryParams, ["_id","title","topics","companies","difficulty", "_createdBy","isVerified"],false);

        const problems = await Problem.find({verification : Verification.Pending},"title difficulty _createdBy");

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