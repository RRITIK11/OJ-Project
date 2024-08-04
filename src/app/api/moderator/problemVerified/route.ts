import dbConnect from "@/config/database";
import { checkIfUserIsAdmin, checkIfUserIsModerator, getUsername } from "@/helpers/Authorization";
import { generateFilteredProblemPipeline } from "@/helpers/generateFilteredProblemPipepline";
import Problem from "@/models/problem.model";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

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

        const username = await getUsername(token) || "";
        if(!username){
            return NextResponse.json({
                error : "No user name found"
            },{status : 403})
        }


        const problems = await Problem.find({_approvedBy: username},"number title difficulty _createdBy status ");

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