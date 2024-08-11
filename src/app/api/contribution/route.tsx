import dbConnect from '@/config/database'
import Problem from '@/models/problem.model';
import { NextRequest, NextResponse } from 'next/server'
import { getDataFromToken } from '@/helpers/getDataFromToken';


dbConnect();

export async function GET(request : NextRequest){

    try {
        const decoded = await getDataFromToken(request);
        const problem = await Problem.find({_createdBy : decoded.username},"title difficulty verification number _approvedBy _rejectedBy createdAt");
        return NextResponse.json({
            success : true,
            contributions : problem
        },{status : 200});
    } catch (error : any) {
        return NextResponse.json({
            error : error.message,
        },{status : 500})
    }
}