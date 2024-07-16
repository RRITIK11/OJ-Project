import { connect } from "@/config/database";
import User from '@/models/user.model'
import {NextRequest, NextResponse} from 'next/server'
import { log } from "console";

connect()

export async function POST(request : NextRequest){
    try{
        const reqBody = await request.json()
        const {token} = reqBody
        log(token);

        const user = await User.findOne({verifyToken: token, verifyTokenExpiry : {$gt: Date.now()}})
        if(!user){
            return NextResponse.json({error : "Invalid token"},{status: 400});
        }
        log(user);
        user.isVerified = true,
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined

        await user.save();

        return NextResponse.json({
            message : "Email verified successfully",
            success : true
        },{status : 200});
    }catch(error : any){
        return NextResponse.json({error: error.message},{status : 500});
    }
}