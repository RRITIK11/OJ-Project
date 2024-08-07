import dbConnect from "@/config/database";
import User, { UserInterface } from '@/models/user.model'
import {NextRequest, NextResponse} from 'next/server'
import { getDataFromToken } from "@/helpers/getDataFromToken";

dbConnect()

export async function GET(request : NextRequest){
   try {
     //extract data from token
     const decoded = await getDataFromToken(request);
     const user : Partial<UserInterface> | null = await User.findOne({username : decoded.username}).select("-password");
     //check if there is no user
     return NextResponse.json({
        message : "User found",
        data: user
     })
   } catch (error) {
    return NextResponse.json({
        message : "User not found",
        data: null
     })
   }
}