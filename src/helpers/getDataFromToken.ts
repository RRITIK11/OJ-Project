import { NextRequest } from "next/server";
import jwt from "jsonwebtoken"
import { CookieDataInterface } from "@/types/api";


export const getDataFromToken = async (request : NextRequest) => {
    try{
        const token = request.cookies.get("token")?.value || "";
        console.log("Token : ",token);
        if(!token){
            throw new Error("Login required!");
        }
        console.log("Hello")
        const decodedToken : any = jwt.verify(token, process.env.TOKEN_SECRET!);
        console.log(decodedToken)
        return decodedToken;
    }catch(error :any){
        throw new Error(error.message);
    }
}