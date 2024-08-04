import dbConnect from "@/config/database";
import User, { UserInterface } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

import { checkIfUserIsAdmin } from "@/helpers/Authorization";
import { generateFilteredUserPipeline } from "@/helpers/generateFilteredUserPipeline";
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
        console.log(isAdmin)
        if(!isAdmin){
            return NextResponse.json({
                error : "Your don't have to required permission to access this route."
            },{status : 403})
        }
        const queryParams = request.nextUrl.searchParams;
        const filterPipeline : any = generateFilteredUserPipeline(queryParams);
        const allUser = await User.aggregate(filterPipeline);

        return NextResponse.json({
            success : true,
            allUser
        },{status : 200})
        
        
    } catch (error : any) {
        return NextResponse.json({
            error : error.message,
        },{
            status : 500
        })
    }
}