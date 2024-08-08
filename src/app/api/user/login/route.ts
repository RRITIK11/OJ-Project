import dbConnect from "@/config/database";
import User, { UserInterface } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { loginSchema, LoginType } from "@/types/forms/loginSchema";
import { CookieDataSchema, CookieDataInterface  } from "@/types/Data/cookieData";

dbConnect();

export async function POST(request: NextRequest) {
  try {
    const reqBody : LoginType = await request.json();
    const { username, email, password } = loginSchema.parse(reqBody);
    
    const user : UserInterface | null = await User.findOne({ $or: [{ username }, { email }] });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exists" },
        { status: 400 }
      );
    }
    
    
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        { error: "Check your credentials" },
        { status: 400 }
      );
    }
    
    if(!user.isVerified){
      console.log("User not verified");
      return NextResponse.json({
            error : "User not verified"
        },{
          status : 400
        })
      }
      
      const tokenData : CookieDataInterface = {
        username: user.username,
        roles : user.roles
    };

    if(!CookieDataSchema.safeParse(tokenData).success){
      throw new Error("Unable to get data")
    }
    
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Logged in Success",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
