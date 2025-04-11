"use client";

import { CommonLayout } from "@/components/common/layout/CommonLayout";
import HeaderSection from "@/components/my-page/HeaderSection";
import MyPhotoCardGrades from "@/components/my-page/MyPhotoCardGrades";
import SaleCardFilter from "@/components/my-page/my-sale/SaleCardFilter";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useMySalesCards } from "@/hooks/my-page/useMySalesCards";
import useUserStore from "@/store/useUserStore";
const MySales = () => {
  const router = useRouter();
  const [userNickname, setUserNickname] = useState<string>(""); // 사용자 닉네임 상태 추가

  // React Query 훅 사용 (초기 로딩용)
  const { cardCountByGrade, totalCards, isLoading } = useMySalesCards();

  // Zustand 스토어에서 사용자 정보 가져오기
  useEffect(() => {
    const { userInfo } = useUserStore.getState();
    setUserNickname(userInfo?.nickname || "");
  }, []);

  const handleCardClick = (saleCardId: string) => {
    // 판매 중인 포토카드 상세 페이지로 이동
    router.push(`/market/${saleCardId}`);
  };

  return (
    <CommonLayout>
      <div className="relative min-h-screen pb-[80px] md:pb-0 px-[15px] md:px-[20px]">
        <HeaderSection type="my-sales" />

        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <div className="text-main">정보를 불러오는 중...</div>
          </div>
        ) : (
          <MyPhotoCardGrades
            nickname={userNickname}
            totalCards={totalCards}
            photoCard={cardCountByGrade}
            pageType="my-sales"
          />
        )}

        <SaleCardFilter
          onCardClick={handleCardClick}
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 md:mt-15 md:gap-7 lg:gap-10"
        />
      </div>
    </CommonLayout>
  );
};

export default MySales;
