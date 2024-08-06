import dbConnect from "@/config/database";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { log } from "console";
import jwt from "jsonwebtoken";
import { CookieDataInterface } from "@/types/api";

dbConnect();

export async function POST(request: NextRequest) {
  try {
    const reqBody : {
      token : string
    } = await request.json();

    const { token } = reqBody;

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    },"username firstname lastname email isAdmin isModerator");

    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();

    const tokenData : CookieDataInterface = {
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      roles : user.roles
    };

    const tokenA = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json(
      {
        message: "Email verified successfully",
        success: true,
      },
      { status: 200 }
    );

    response.cookies.set("token", tokenA, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
