import type { NextConfig } from "next";
import type { Configuration as WebpackConfig } from "webpack";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["example.com", "i.pinimg.com", "res.cloudinary.com"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*", // 클라이언트가 요청하는 주소
        destination: `https://five-fav-photo-team2-be-1zgs.onrender.com/api/:path*`, // main 실제 백엔드 서버 주소
        // destination: `https://five-fav-photo-team2-be.onrender.com/api/:path*`, // dev 실제 백엔드 서버 주소
      },
    ];
  },
  // webpack 설정 단순화
  webpack: (config: WebpackConfig) => {
    return config;
  },
};

export default nextConfig;
