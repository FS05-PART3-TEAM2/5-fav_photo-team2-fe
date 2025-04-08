import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("token");

  // ✅ "/market"은 허용
  // 🔒 "/market/..." 는 로그인 필요
  const isProtectedMarketPath = pathname.startsWith("/market/") && pathname !== "/market";

  if (isProtectedMarketPath && !accessToken) {
    const loginUrl = new URL("/auth/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next(); // 통과
}

export const config = {
  matcher: "/market/:path*",
};
