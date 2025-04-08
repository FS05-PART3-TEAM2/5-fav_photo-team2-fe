import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["example.com", "i.pinimg.com"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*", // 클라이언트가 요청하는 주소
        destination: `https://five-fav-photo-team2-be.onrender.com/api/:path*`, // 실제 백엔드 서버 주소
      },
    ];
  },
};

export default nextConfig;
