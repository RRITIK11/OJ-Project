import dbConnect from "@/config/database";
import User, { UserInterface } from '@/models/user.model'
import {NextRequest, NextResponse} from 'next/server'
import { getDataFromToken } from "@/helpers/getDataFromToken";

dbConnect()

export async function GET(request : NextRequest){
   try {
     //extract data from token
     const decoded = await getDataFromToken(request);
     delete decoded.iat
     delete decoded.exp
     //check if there is no user
     return NextResponse.json({
        message : "User found",
        data: decoded
     })
   } catch (error) {
    return NextResponse.json({
        message : "User not found",
        data: null
     })
   }
}