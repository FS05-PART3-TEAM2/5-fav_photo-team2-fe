"use client";

import { Grade, MyPhotoCardDto } from "@/types/photocard.types";
import { CommonLayout } from "@/components/common/layout/CommonLayout";
import HeaderSection from "@/components/my-page/HeaderSection";
import MyPhotoCardGrades from "@/components/my-page/MyPhotoCardGrades";
import MobileCreateButton from "@/components/my-page/MobileCreateButton";
import CardFilter from "@/components/my-page/CardFilter";
import { useRouter } from "next/navigation";

const MyPhotos = () => {
  const router = useRouter();

  /* 임시 카드 데이터
   * TODO : 포토카드 목록 데이터 API 연동 후 데이터 변경
   */
  const cards: MyPhotoCardDto[] = [
    {
      id: "2",
      grade: "COMMON" as Grade,
      genre: "풍경",
      name: "우리집 앞마당",
      price: 4,
      availableAmount: 1,
      totalAmount: 10,
      creator: "미쓰손",
      imageUrl: "/assets/images/mock1.png",
    },
    {
      id: "3",
      grade: "SUPER_RARE" as Grade,
      genre: "풍경",
      name: "How Far I'll Go",
      price: 4,
      availableAmount: 1,
      totalAmount: 10,
      creator: "랍스타",
      imageUrl: "/assets/images/mock1.png",
    },
    {
      id: "4",
      grade: "LEGENDARY" as Grade,
      genre: "인물",
      name: "웃는 모습",
      price: 8,
      availableAmount: 1,
      totalAmount: 10,
      creator: "프로여행러",
      imageUrl: "/assets/images/mock1.png",
    },
    {
      id: "5",
      grade: "COMMON" as Grade,
      genre: "동물",
      name: "귀여운 강아지",
      price: 3,
      availableAmount: 2,
      totalAmount: 10,
      creator: "미쓰손",
      imageUrl: "/assets/images/mock1.png",
    },
    {
      id: "6",
      grade: "RARE" as Grade,
      genre: "음식",
      name: "맛있는 파스타",
      price: 5,
      availableAmount: 1,
      totalAmount: 10,
      creator: "랍스타",
      imageUrl: "/assets/images/mock1.png",
    },
    {
      id: "7",
      grade: "SUPER_RARE" as Grade,
      genre: "풍경",
      name: "일몰",
      price: 7,
      availableAmount: 1,
      totalAmount: 10,
      creator: "프로여행러",
      imageUrl: "/assets/images/mock1.png",
    },
    {
      id: "8",
      grade: "COMMON" as Grade,
      genre: "인물",
      name: "친구들과 함께",
      price: 3,
      availableAmount: 3,
      totalAmount: 10,
      creator: "미쓰손",
      imageUrl: "/assets/images/mock1.png",
    },
    {
      id: "9",
      grade: "LEGENDARY" as Grade,
      genre: "풍경",
      name: "오로라",
      price: 10,
      availableAmount: 1,
      totalAmount: 10,
      creator: "랍스타",
      imageUrl: "/assets/images/mock1.png",
    },
    {
      id: "10",
      grade: "RARE" as Grade,
      genre: "동물",
      name: "잠자는 고양이",
      price: 5,
      availableAmount: 2,
      totalAmount: 10,
      creator: "프로여행러",
      imageUrl: "/assets/images/mock1.png",
    },
    {
      id: "11",
      grade: "SUPER_RARE" as Grade,
      genre: "음식",
      name: "홈메이드 케이크",
      price: 6,
      availableAmount: 1,
      totalAmount: 10,
      creator: "미쓰손",
      imageUrl: "/assets/images/mock1.png",
    },
    {
      id: "12",
      grade: "COMMON" as Grade,
      genre: "풍경",
      name: "도시야경",
      price: 4,
      availableAmount: 2,
      totalAmount: 10,
      creator: "랍스타",
      imageUrl: "/assets/images/mock1.png",
    },
    {
      id: "13",
      grade: "LEGENDARY" as Grade,
      genre: "인물",
      name: "공연현장",
      price: 9,
      availableAmount: 1,
      totalAmount: 10,
      creator: "프로여행러",
      imageUrl: "/assets/images/mock1.png",
    },
    {
      id: "14",
      grade: "RARE" as Grade,
      genre: "동물",
      name: "새들의 군무",
      price: 6,
      availableAmount: 1,
      totalAmount: 10,
      creator: "미쓰손",
      imageUrl: "/assets/images/mock1.png",
    },
    {
      id: "15",
      grade: "SUPER_RARE" as Grade,
      genre: "음식",
      name: "디저트 플레이팅",
      price: 7,
      availableAmount: 1,
      totalAmount: 10,
      creator: "랍스타",
      imageUrl: "/assets/images/mock1.png",
    },
    {
      id: "16",
      grade: "COMMON" as Grade,
      genre: "풍경",
      name: "산정상",
      price: 3,
      availableAmount: 2,
      totalAmount: 10,
      creator: "프로여행러",
      imageUrl: "/assets/images/mock1.png",
    },
    {
      id: "17",
      grade: "LEGENDARY" as Grade,
      genre: "인물",
      name: "졸업식",
      price: 8,
      availableAmount: 1,
      totalAmount: 10,
      creator: "미쓰손",
      imageUrl: "/assets/images/mock1.png",
    },
    {
      id: "18",
      grade: "RARE" as Grade,
      genre: "동물",
      name: "수족관",
      price: 5,
      availableAmount: 1,
      totalAmount: 10,
      creator: "랍스타",
      imageUrl: "/assets/images/mock1.png",
    },
  ];

  const nickname = "유디"; // 추후 Zustand 스토어에서 가져올 예정

  // 카드 등급별 개수 계산
  const cardCountByGrade = {
    common: cards.filter(card => card.grade === "COMMON").length,
    rare: cards.filter(card => card.grade === "RARE").length,
    superRare: cards.filter(card => card.grade === "SUPER_RARE").length,
    legendary: cards.filter(card => card.grade === "LEGENDARY").length,
  };

  // 총 카드 수 계산
  const totalCards = cards.length;

  const user = {
    nickname,
    photoCard: cardCountByGrade,
    total: totalCards,
  };

  const handleCreateCardClick = () => {
    // 포토카드 생성 페이지로 이동 또는 모달 표시 등의 로직
    console.log("포토카드 생성 클릭");
  };

  const handleCardClick = (cardId: string) => {
    router.push(`/my-photos/${cardId}`);
  };

  return (
    <CommonLayout>
      <div className="relative min-h-screen pb-[80px] md:pb-0">
        <HeaderSection onCreateClick={handleCreateCardClick} />

        <MyPhotoCardGrades
          nickname={user.nickname}
          totalCards={user.total}
          photoCard={user.photoCard}
        />

        <CardFilter myPhotoCards={cards} onCardClick={handleCardClick} />

        <MobileCreateButton onClick={handleCreateCardClick} />
      </div>
    </CommonLayout>
  );
};

export default MyPhotos;
