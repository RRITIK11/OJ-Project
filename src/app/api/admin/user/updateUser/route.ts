import dbConnect from "@/config/database";
import { checkIfUserIsAdmin } from "@/helpers/Authorization";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
dbConnect();
export async function PUT(request : NextRequest){
    try {
        const token = request.cookies.get("token")?.value || "";
        if(!token){
            return NextResponse.json({
                error : "Login Required"
            },{
                status : 401
            })
        }
        const isAdmin = await checkIfUserIsAdmin(token);
        console.log(isAdmin)
        if(!isAdmin){
            return NextResponse.json({
                error : "Forbidden Access"
            },{
                status : 403
            })
        }

        const queryParams = request.nextUrl.searchParams;
        const username = queryParams.get("user");
        const roles = queryParams.get("roles");
        if(!username){
            return NextResponse.json({
                error : "username required"
            },{
                status : 402
            })
        }

        if(!roles){
            return NextResponse.json({
                error : "No changes query parameter provided"
            },{
                status : 402
            })
        }

        const Role = roles.split(',');

        const userToBeUpdated : any = await User.findOne({username},"_id isAdmin isModerator");
        console.log(userToBeUpdated);

        if(!userToBeUpdated){
            return NextResponse.json({
                error : "No User with this username exists"
            },{
                status : 402
            })
        }

        let updateField : any = {};
        updateField.isAdmin = Role.includes('admin'); 
        updateField.isModerator = Role.includes('moderator'); 
        console.log(updateField)

        const updatedUser = await User.findByIdAndUpdate(userToBeUpdated._id,updateField);

        return NextResponse.json({
            success : true,
            updatedUser,
            message : `User with this username : ${username} is removed.`
        },{status : 200})

    } catch (error : any) {
        return NextResponse.json({
            error : error.message
        },{status : 500})
    }
}