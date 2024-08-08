import dbConnect from "@/config/database";
import { getDataFromHeader } from "@/helpers/getDataFromHeader";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User, { UserInterface } from "@/models/user.model";
import { updateRoleSchema, updateRoleType } from "@/types/Data/UpdateRoleData";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"

dbConnect();

export async function PATCH(request : NextRequest){
    try {
        const token = request.cookies.get("token")?.value || "";
        if(!token){
            return NextResponse.json({
                error : "Login Required"
            },{
                status : 401
            })
        }
        const decoded = await getDataFromToken(request);
        if(!decoded.roles.isAdmin){
            return NextResponse.json({
                error : "Forbidden Access"
            },{
                status : 403
            })
        }

        const data : updateRoleType = await getDataFromHeader(request);
        if(!updateRoleSchema.safeParse(data).success){
            throw new Error("Data required")
        }
        
        
        
        const userToBeUpdated : UserInterface | null = await User.findOneAndUpdate({username : data.username},{
            roles : data.roles
        },{new : true});

        console.log(userToBeUpdated);
        
        if(!userToBeUpdated){
            return NextResponse.json({
                error : "No User with this username exists"
            },{
                status : 402
            })
        }
     

        const response = NextResponse.json({
            success : true,
            message : `User with this username : ${data.username} roles \n Roles after updation : isAdmin : ${data.roles.isAdmin} and isModerator : ${data.roles.isModerator}.`
        },{status : 200})
                
        return response;
    } catch (error : any) {
        return NextResponse.json({
            error : error.message
        },{status : 500})
    }
}