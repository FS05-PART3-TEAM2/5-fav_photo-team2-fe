"use client";

import { CommonLayout } from "@/components/common/layout/CommonLayout";
import HeaderSection from "@/components/my-page/HeaderSection";
import MyPhotoCardGrades from "@/components/my-page/MyPhotoCardGrades";
import SaleCardFilter from "@/components/my-page/my-sale/SaleCardFilter";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useMySalesCards } from "@/hooks/my-page/useMySalesCards";

const MySales = () => {
  const router = useRouter();
  const [userNickname, setUserNickname] = useState<string>(""); // 사용자 닉네임 상태 추가

  // React Query 훅 사용 (초기 로딩용)
  const { cardCountByGrade, totalCards, isLoading } = useMySalesCards();

  // Zustand 스토어에서 사용자 정보 가져오기 (실제 구현 시 필요)
  useEffect(() => {
    // TODO: 실제로 Zustand 스토어에서 가져올 예정
    // 임시로 "유디" 닉네임 설정
    setUserNickname("유디");
  }, []);

  const handleCreateCardClick = () => {
    // 포토카드 판매 등록 페이지로 이동 또는 모달 표시 등의 로직
    console.log("포토카드 판매 등록 클릭");
  };

  const handleCardClick = (cardId: string) => {
    // 판매 중인 포토카드 상세 페이지로 이동
    router.push(`/market/${cardId}`);
  };

  return (
    <CommonLayout>
      <div className="relative min-h-screen pb-[80px] md:pb-0">
        <HeaderSection type="my-sales" onCreateClick={handleCreateCardClick} />

        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <div className="text-main">정보를 불러오는 중...</div>
          </div>
        ) : (
          <MyPhotoCardGrades
            nickname={userNickname}
            totalCards={totalCards}
            photoCard={cardCountByGrade}
          />
        )}

        <SaleCardFilter onCardClick={handleCardClick} />
      </div>
    </CommonLayout>
  );
};

export default MySales;
