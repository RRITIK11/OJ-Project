import Problem from "@/models/problem.model";
import Topic from "@/models/topic.model";
import Company from "@/models/company.model";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/config/database";

dbConnect();

export async function POST(request : NextRequest){
    try {
        const reqBody = await request.json();
        // console.log(reqBody);
        const {number,title, description, difficulty, topics, companies, hint, example, status,_authorId,_approvedBy}  = reqBody;

        const problem = await Problem.findOne({$or:[{number : number},{title : title}]});
        console.log("Problem : \n",problem);
        if(problem){
            return NextResponse.json({
                error : "Problem with this number or title already exists"
            },{status : 400});
        }

        
        const newProblem = new Problem({
            number,
            title,
            description,
            difficulty,
            hint,
            topics,
            companies,
            example,
            status,
            _authorId,
            _approvedBy
        })

        topics.forEach(async( element : string) => {
            const topic = await Topic.findOne({name : element});
            console.log(topic)
            if(topic){
                topic._problemIds.push(newProblem._id);
                await topic.save();
            }else{
                const newTopic = new Topic({
                    name : element,
                    problemIds : [newProblem._id]
                })
                await newTopic.save();
            }
        });

        companies.forEach(async( element : string) => {
            const company = await Company.findOne({name : element});
            console.log(company)
            if(company){
                company._problemIds.push(newProblem._id);
                await company.save();
                console.log(company)
            }else{
                const newCompany = new Company({
                    name : element,
                    problemIds : [newProblem._id]
                })
                await newCompany.save();
                console.log(newCompany)
            }
        });

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