import dbConnect from '@/config/database'
import { NextRequest, NextResponse } from 'next/server'
import Problem from '@/models/problem.model'

dbConnect();

export async function GET(request : NextRequest){
    try {
        const problem = await Problem.find({isVerified : true});
        return NextResponse.json({
            success : true,
            problems : problem
        },{status : 200});
    } catch (error : any) {
        return NextResponse.json({
            error : error.message,
        },{status : 500})
    }
}