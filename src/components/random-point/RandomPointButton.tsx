"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import RandomPointModal from "./RandomPointModal";
import { getRandomPointStatus } from "../../services/random-point/getRandomPoint";
import useUserStore from "@/store/useUserStore";

const RandomPointButton = () => {
  const { isAuthenticated } = useUserStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasNewChance, setHasNewChance] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      checkDrawStatus();

      // 5분마다 가능 상태 확인 (UI 업데이트 위함)
      const intervalId = setInterval(checkDrawStatus, 1000 * 60 * 5);

      return () => clearInterval(intervalId);
    }
  }, [isAuthenticated]);

  // 뽑기 가능 여부 확인
  const checkDrawStatus = async () => {
    try {
      const statusData = await getRandomPointStatus();
      //   console.log(statusData);

      setHasNewChance(statusData.canDraw);
    } catch (error) {
      console.error("상태 확인 오류:", error);
    }
  };

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    checkDrawStatus();
  };

  if (!isAuthenticated) return null;

  return (
    <>
      <button
        onClick={handleButtonClick}
        className={`fixed z-999 bottom-8 right-8 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all 
          ${
            hasNewChance
              ? "bg-yellow-500 hover:bg-yellow-600 animate-pulse"
              : "bg-gray-700 hover:bg-gray-600"
          }`}
      >
        <div className="relative w-8 h-8 cursor-pointer">
          <Image
            src="/assets/icons/gift_box.png"
            alt="선물 상자"
            layout="fill"
            objectFit="contain"
          />
        </div>
        {hasNewChance && (
          <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full"></span>
        )}
      </button>

      <RandomPointModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default RandomPointButton;
