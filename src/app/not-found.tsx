import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <h1 className="text-4xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-dark mb-2">페이지를 찾을 수 없습니다</h2>
      <p className="text-gray-600 mb-6">요청하신 페이지가 존재하지 않거나 이동되었습니다.</p>
      <Link
        href="/"
        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-90 transition-all"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
