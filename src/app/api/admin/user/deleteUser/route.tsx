import dbConnect from "@/config/database";
import { checkIfUserIsAdmin } from "@/helpers/Authorization";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
dbConnect();
export async function DELETE(request : NextRequest){
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
        if(!isAdmin){
            return NextResponse.json({
                error : "Forbidden Access"
            },{
                status : 403
            })
        }

        const queryParams = request.nextUrl.searchParams;
        const username = queryParams.get("user");
        if(!username){
            return NextResponse.json({
                error : "username required"
            },{
                status : 402
            })
        }


        const userToBeRemoved : any = await User.findOne({username},"_id isAdmin");
        console.log(userToBeRemoved);

        if(!userToBeRemoved){
            return NextResponse.json({
                error : "No User with this username exists"
            },{
                status : 402
            })
        }

        if(userToBeRemoved.isAdmin){
            return NextResponse.json({
                error : "You can't remove User with admin Role."
            },{
                status : 403
            })
        }

        await User.findByIdAndDelete({_id : userToBeRemoved._id});

        return NextResponse.json({
            success : true,
            message : `User with this username : ${username} is removed.`
        },{status : 200})

    } catch (error : any) {
        return NextResponse.json({
            error : error.message
        },{status : 500})
    }
}