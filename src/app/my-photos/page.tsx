"use client";

import { CommonLayout } from "@/components/common/layout/CommonLayout";
import HeaderSection from "@/components/my-page/HeaderSection";
import MyPhotoCardGrades from "@/components/my-page/MyPhotoCardGrades";
import MobileCreateButton from "@/components/my-page/my-photo/MobileCreateButton";
import CardFilter from "@/components/my-page/my-photo/PhotoCardFilter";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useMyPhotoCards } from "@/hooks/my-page/useMyPhotoCards";
import useUserStore from "@/store/useUserStore";

const MyPhotos = () => {
  const router = useRouter();
  const [userNickname, setUserNickname] = useState<string>("");

  // React Query 훅 사용 (초기 로딩용)
  const { cardCountByGrade, totalCards, isLoading } = useMyPhotoCards();

  // Zustand 스토어에서 사용자 정보 가져오기
  useEffect(() => {
    const { userInfo } = useUserStore.getState();
    setUserNickname(userInfo?.nickname || "");
  }, []);

  const handleCreateCardClick = () => {
    router.push("/my-photos/create");
  };

  const handleCardClick = (cardId: string) => {
    router.push(`/my-photos/${cardId}`);
  };

  return (
    <CommonLayout>
      <div className="relative min-h-screen pb-[80px] md:pb-0">
        <HeaderSection type="my-photos" onCreateClick={handleCreateCardClick} />

        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <div className="text-main">정보를 불러오는 중...</div>
          </div>
        ) : (
          <MyPhotoCardGrades
            nickname={userNickname}
            totalCards={totalCards}
            photoCard={cardCountByGrade}
            pageType="my-photos"
          />
        )}

        <CardFilter
          onCardClick={handleCardClick}
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 md:mt-15 md:gap-7 lg:gap-10"
        />

        <MobileCreateButton onClick={handleCreateCardClick} />
      </div>
    </CommonLayout>
  );
};

export default MyPhotos;
