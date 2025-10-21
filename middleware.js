import { NextResponse } from "next/server";

export function middleware(req) {
  const cookieHeader = req.headers.get("cookie") || "";
  const isLoggedIn = cookieHeader.includes("isLoggedIn=true");

  const protectedRoutes = ["/dashboard", "/students", "/attendance"];

  if (protectedRoutes.some(path => req.nextUrl.pathname.startsWith(path)) && !isLoggedIn) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}
