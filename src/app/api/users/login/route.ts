import { connect } from "@/config/database";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    console.log(reqBody);

    const user = await User.findOne({ $or: [{ username }, { email }] });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exists" },
        { status: 400 }
      );
    }

    console.log("User Exists");

    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      console.log("password incorrect");
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

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
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
