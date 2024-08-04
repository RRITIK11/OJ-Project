import dbConnect from "@/config/database";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import User from "@/models/user.model";
dbConnect()
export async function checkAuthMiddleware(request : NextRequest){
    console.log("Check Auth Middleware...");
    try {
        const token = request.cookies.get("token")?.value || "";
        console.log("Token : ",token)
        if(!token){
            // alert("You are not logged in")
            // return NextResponse.redirect('/login');
            return NextResponse.redirect(new URL('/login', request.url));
        }

        const decoded : any = await jwt.verify(token,process.env.TOKEN_SECRET!);
        console.log("decoded : ",decoded);
        if(!decoded){
            // alert("Unathorised Data")
            // return NextResponse.redirect('/login')
            return NextResponse.redirect(new URL('/login', request.url));
        }

        const userId = decoded._id || "";
        if(!userId) return NextResponse.next();
        // const user = await User.findById(userId,"isAdmin isModerator");
        // if(!user){
        //     // alert("User Not Found")
        //     // return NextResponse.redirect('/login')
        //     return NextResponse.redirect(new URL('/login', request.url));
        // }

        // //checking for role change
        // if(user.isAdmin != decoded.isAdmin || user.isModerator != decoded.isModerator){
        //     // alert("Your role has changed. Please log in again.")
        //     // return NextResponse.redirect('/login')
        //     return NextResponse.redirect(new URL('/login', request.url));
        // }

        return NextResponse.next();

    } catch (error : any) {
        // alert(error.message);
        // return NextResponse.redirect('/login')
        return NextResponse.redirect(new URL('/login', request.url));
    }
}