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
  webpack: (config: WebpackConfig) => {
    // config.module이 없으면 빈 객체로 초기화
    config.module = config.module || {};
    // rules가 없으면 빈 배열로 초기화
    config.module.rules = config.module.rules || [];

    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: {
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "static/fonts/",
          publicPath: "/_next/static/fonts/",
        },
      },
    });
    return config;
  },
};

export default nextConfig;
