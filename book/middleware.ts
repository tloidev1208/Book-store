import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.AUTH_SECRET });


  if (!token && request.nextUrl.pathname !== "/sign-in") {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin"], // Chỉ áp dụng middleware cho các route cần bảo vệ
};
