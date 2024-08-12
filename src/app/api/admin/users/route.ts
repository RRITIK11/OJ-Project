import dbConnect from "@/config/database";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

dbConnect();

export async function GET(request: NextRequest) {
  try {
    const token = await getDataFromToken(request);
    console.log(token)

    // if (!token || !token.roles.isAdmin) {
    //   console.log("User is not an admin or token is missing");
    //   return NextResponse.json(
    //     { error: "You don't have the required permissions to access this route." },
    //     { status: 403 }
    //   );
    // }

    const allUser = await User.find({}).exec();
    console.log("Fetched Users:", allUser);

    return NextResponse.json(
      { success: true, allUser },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error in GET /api/admin/users:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
