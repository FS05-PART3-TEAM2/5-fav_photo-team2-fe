import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("token");

  // ✅ "/market"은 허용
  // 🔒 "/market/..." 는 로그인 필요
  const isProtectedMarketPath = pathname.startsWith("/market/") && pathname !== "/market";
  const isProtectedMySalePath = pathname.startsWith("/my-sales");
  const isProtectedMyPhotoPath = pathname.startsWith("/my-photos");

  const isProtected = isProtectedMarketPath || isProtectedMySalePath || isProtectedMyPhotoPath;

  if (isProtected && !accessToken) {
    const loginUrl = new URL("/auth/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next(); // 통과
}

export const config = {
  matcher: [
    "/market/:path*", // /market/123 등
    "/my-sales/:path*", // /my-sale/abc 등
    "/my-photos/:path*", // /my-photo/xyz 등
  ],
};
