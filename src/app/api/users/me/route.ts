import { connect } from "@/config/database";
import User from '@/models/user.model'
import {NextRequest, NextResponse} from 'next/server'
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect()

export async function POST(request : NextRequest){
    //extract data from token
    const userId = await getDataFromToken(request);
    const user = await User.findOne({_id : userId}).select("-password");
    //check if there is no user
    return NextResponse.json({
        message : "User found",
        data:user
    })
}