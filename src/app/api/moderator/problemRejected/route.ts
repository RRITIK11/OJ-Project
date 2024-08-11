import dbConnect from "@/config/database";
import { checkIfUserIsAdmin, checkIfUserIsModerator, getUsername } from "@/helpers/Authorization";
import { generateFilteredProblemPipeline } from "@/helpers/generateFilteredProblemPipepline";
import Problem from "@/models/problem.model";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getDataFromToken } from "@/helpers/getDataFromToken";

dbConnect();

export async function GET(request : NextRequest) {
    try {
        const token = await getDataFromToken(request);
        if(!token){
            return NextResponse.json({
                error : "Your must have to login for creating a question"
            },{status : 401});
        }

        const isAdmin : boolean = token.roles.isAdmin;
        const isModerator : boolean = token.roles.isModerator;

        if(!isModerator){
            return NextResponse.json({
                error : "Your don't have to required permission to access this route."
            },{status : 403})
        }

        const username = token.username;
        if(!username){
            return NextResponse.json({
                error : "No user name found"
            },{status : 403})
        }


        const problems = await Problem.find({_rejectedBy: username},"number title difficulty _createdBy _rejectedBy");

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