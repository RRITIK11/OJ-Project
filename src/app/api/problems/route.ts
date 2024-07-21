import {connect} from '@/config/database'
import { NextRequest, NextResponse } from 'next/server'
import Problem from '@/models/problem.model'

connect()

export async function GET(reqest : NextRequest){
    try {
        const problem = await Problem.find({});
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