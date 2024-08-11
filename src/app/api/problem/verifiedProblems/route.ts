import { Verification } from '@/config/constants';
import dbConnect from '@/config/database'
import Problem from '@/models/problem.model';
import { NextRequest, NextResponse } from 'next/server'


dbConnect();

export async function GET(request : NextRequest){
    try {
        const problem = await Problem.find({verification : Verification.Verified});
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