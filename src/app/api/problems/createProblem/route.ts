import Problem, { ProblemInterface } from "@/models/problem.model";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/config/database";
import { v4 as uuidv4 } from 'uuid';
import jwt from "jsonwebtoken";

dbConnect();
export async function POST(request : NextRequest){
    try {
        const cookies = request.cookies;
        const token = cookies.get('token')?.value || "";
        console.log(token)
        if(!token){
            return NextResponse.json({
                error : "Your must have to login for creating a question"
            },{status : 401});
        }
        let createdBy;
        await jwt.verify(token,process.env.TOKEN_SECRET!,(error, decoded : any)=>{
            if(error){
                return NextResponse.json({
                    error : "Token verification failed"
                },{status : 403})
            }
            console.log(decoded)
            createdBy = decoded["username"]; 
            console.log(createdBy)
        });
        
        const Data : Partial<ProblemInterface> = await request.json();
        delete Data.number;
        delete Data.verification;
        delete Data._approvedBy;
        delete Data._createdBy;
        delete Data._rejectedBy;
        delete Data.createdAt;
        delete Data.updatedAt;
        delete Data._problemSubmissions;

        
        const existingProblem : ProblemInterface | null = await Problem.findOne({title : Data.title});
        
        if(existingProblem){
            return NextResponse.json({
                error : "Problem with this title already exists"
            },{status : 400});
        }

        const newProblem : ProblemInterface = new Problem({...Data, _createdBy : createdBy, number : uuidv4()});
        
        
        const savedProblem = await newProblem.save();
        
        return NextResponse.json({
            message : "Problem added successfully",
            success : true,
            savedProblem
        })

        
    } catch (error : any) {
        return NextResponse.json({error : error.message}, {status : 500})
    }
}