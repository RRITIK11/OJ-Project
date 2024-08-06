import { NextResponse, NextRequest } from "next/server";
// import { checkAuthMiddleware } from "./middleware/checkAuthMiddleware";
import jwt from "jsonwebtoken";
import { verifyToken } from "./lib/auth";

export async function middleware(request: NextRequest) {
  // console.log(request);
  // const path = request.nextUrl.pathname;

  // Check Authentication for specific protected routes
  // if (
  //   path.startsWith("/api/admin") ||
  //   path.startsWith("/api/moderator") ||
  //   path.startsWith("/api/user") ||
  //   path.startsWith("/api/problems")
  // ) {
  //   const authResponse = await checkAuthMiddleware(request);
  //   console.log(authResponse);
  //   if (authResponse) return authResponse;
  // }

  // const token = request.cookies.get("token")?.value || "";
  try {
    // await verifyToken(token);
    // const isPublicPath =
    //   path === "/login" || path === "/signup" || path === "/verifyemail";

    // const isLoginPath =
    //   path === "/contribute" || path === "/admin" || path === "/moderator";

    // if (isLoginPath && !token) {
    //   return NextResponse.redirect(new URL("/", request.url));
    // }

    // if (isPublicPath && token) {
    //   return NextResponse.redirect(new URL("/", request.url));
    // }
    // if (!isPublicPath && !token) {
    //   return NextResponse.redirect(new URL("/login", request.url));
    // }

    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    // "/api/admin/:path*",
    // "/api/moderator/:path*",
    // "/api/problems/:path*",
    // "/api/user/:path*",
    "/login",
    "/signup",
    // "/profile",
    // "/verifyemail",
    // "/contribute",
    // "/admin",
    // "/moderator",
  ],
};

