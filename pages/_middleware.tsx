import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req: any) {
  const secret = process.env.JWT_SECRET || "";
  const secureCookie = process.env.NEXTAUTH_URL?.startsWith("https://")??!!process.env.NEXTAUTH_URL;
  const token = await getToken({ req, secret, secureCookie});

  const { pathname } = req.nextUrl;

  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }

  if (!token && pathname !== "/login") {
    return NextResponse.redirect("/login");
  }
}
