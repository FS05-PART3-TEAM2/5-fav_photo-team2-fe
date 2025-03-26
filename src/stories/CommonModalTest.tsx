"use client";

import { useState } from "react";
import { CommonModal } from "@/components/common/modal/CommonModal";

export const CommonModalTest = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const btnClick = () => {
    console.log("버튼 클릭");
  };

  return (
    <>
      <button
        className="bg-purple text-white px-4 py-2 rounded-md"
        onClick={() => setIsModalOpen(true)}
      >
        <p>모달 테스트</p>
      </button>
      <CommonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="모달 타이틀"
        desc="모달 설명"
        btnText="확인"
        btnClick={btnClick}
      />
    </>
  );
};
