import { NextRequest, NextResponse } from "next/server";
export async function GET(request : NextRequest){
    return NextResponse.json({
        message : "Everythings work perfect"
    },{status:200})   
}