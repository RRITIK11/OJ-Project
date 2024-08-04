import Problem, { ProblemInterface } from "@/models/problem.model";
import Topic, { TopicInterface } from "@/models/topic.model";
import Company, { CompanyInterface } from "@/models/company.model";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/config/database";
import User, { UserInterface } from "@/models/user.model";
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
        delete Data.isVerified;
        delete Data._approvedBy;
        delete Data._createdBy;
        delete Data.createdAt;
        delete Data.updatedAt;
        delete Data.status;


        const existingProblem : ProblemInterface | null = await Problem.findOne({title : Data.title});

        if(existingProblem){
            return NextResponse.json({
                error : "Problem with this number or title already exists"
            },{status : 400});
        }
        
        const newProblem : ProblemInterface = new Problem({...Data, _createdBy : createdBy, number : uuidv4()});
        
        await Promise.all(
            (Data.topics || []).map(async (element: string) => {
                const topic = await Topic.findOne({ name: element });
                if (topic) {
                    topic._problemIds.push(newProblem._id);
                    await topic.save();
                } else {
                    const newTopic = new Topic({
                        name: element,
                        problemIds: [newProblem._id]
                    });
                    await newTopic.save();
                }
            })
        );
 
        await Promise.all(
            (Data.companies || []).map(async (element: string) => {
                const company = await Company.findOne({ name: element });
                if (company) {
                    company._problemIds.push(newProblem._id);
                    await company.save();
                } else {
                    const newCompany = new Company({
                        name: element,
                        problemIds: [newProblem._id]
                    });
                    await newCompany.save();
                }
            })
        );


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