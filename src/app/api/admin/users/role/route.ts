import dbConnect from "@/config/database";
import User, { UserInterface } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

import { checkIfUserIsAdmin } from "@/helpers/Authorization";
import { generateFilteredUserPipeline } from "@/helpers/generateFilteredUserPipeline";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Problem from "@/models/problem.model";
import { Verification } from "@/config/constants";
import { getDataFromHeader } from "@/helpers/getDataFromHeader";
dbConnect()

export async function POST(request: NextRequest){
    try {

        const token = await getDataFromToken(request);
        
        const Admin = token.roles.isAdmin;
        if(!Admin){
            return NextResponse.json({
                error : "Your don't have to required permission to access this route."
            },{status : 403})
        }
        // const queryParams = request.nextUrl.searchParams;
        // const filterPipeline : any = generateFilteredUserPipeline(queryParams);
        // const allUser = await User.aggregate(filterPipeline);

        const {userId, isAdmin , isModerator} = await getDataFromHeader(request);

        const user = await User.findOneAndUpdate({_id: userId},{
            roles : {
                isAdmin : isAdmin,
                isModerator : isModerator
            }
        }).exec();

        return NextResponse.json({
            success : true,
            message : "Role changes successfully"
        },{status : 200})
        
        
    } catch (error : any) {
        return NextResponse.json({
            error : error.message,
        },{
            status : 500
        })
    }
}