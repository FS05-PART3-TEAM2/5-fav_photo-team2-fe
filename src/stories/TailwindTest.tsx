"use client";

import React from "react";

export const TailwindTest = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-blue mb-4">테일윈드 테스트</h1>
      <p className="text-gray-400 mb-2">테일윈드 스타일 테스트</p>
      <button className="bg-main text-dark font-bold py-2 px-4 rounded hover:bg-purple hover:text-white transition-colors">
        메인컬러 버튼
      </button>
      <div className="mt-4 p-4 bg-gray-100 rounded-lg">
        <p className="text-red font-bold">빨간색 텍스트</p>
        <p className="text-blue">파란색 텍스트</p>
        <p className="text-purple">보라색 텍스트</p>
      </div>
    </div>
  );
};
