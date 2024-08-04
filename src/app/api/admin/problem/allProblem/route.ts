import dbConnect from "@/config/database";
import { NextRequest, NextResponse } from "next/server";
import Problem from "@/models/problem.model";
import { checkIfUserIsAdmin } from "@/helpers/Authorization";
dbConnect()

export async function GET(request: NextRequest){
    try {
        const token = request.cookies.get('token')?.value || "";
        if(!token){
            return NextResponse.json({
                error : "Your must have to login for creating a question"
            },{status : 401});
        }
        
        const isAdmin = await checkIfUserIsAdmin(token);
        if(!isAdmin){
            return NextResponse.json({
                error : "Your don't have to required permission to access this route."
            },{status : 403})
        }
        

        const allProblem = await Problem.find({},"title _createdBy _approvedBy status");

        return NextResponse.json({
            success : true,
            allProblem
        },{status : 200})
        
        
    } catch (error : any) {
        return NextResponse.json({
            error : error.message,
        },{
            status : 500
        })
    }
}