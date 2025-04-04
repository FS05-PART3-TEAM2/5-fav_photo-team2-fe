"use client";

import { Genre, Grade, MyPhotoCardDto } from "@/types/photocard.types";
import { CommonLayout } from "@/components/common/layout/CommonLayout";
import HeaderSection from "@/components/my-page/HeaderSection";
import MyPhotoCardGrades from "@/components/my-page/MyPhotoCardGrades";
import SaleCardFilter from "@/components/my-page/my-sale/SaleCardFilter";
import { useRouter } from "next/navigation";

// 거래 현황 타입 추가
type TradeStatus = "ON_SALE" | "SOLD_OUT" | "PENDING";

// MyPhotoCardDto 타입 확장
type SalePhotoCardDto = MyPhotoCardDto & {
  status: TradeStatus;
};

const MySales = () => {
  const router = useRouter();

  /* 임시 카드 데이터
   * TODO : 판매 포토카드 목록 데이터 API 연동 후 데이터 변경
   */
  const cards: SalePhotoCardDto[] = [
    {
      id: "2",
      grade: "COMMON" as Grade,
      genre: "LANDSCAPE" as Genre,
      name: "우리집 앞마당",
      price: 4,
      availableAmount: 1,
      totalAmount: 10,
      creator: "미쓰손",
      imageUrl: "/assets/images/mock1.png",
      status: "ON_SALE", // 판매 중 상태 추가
    },
    {
      id: "3",
      grade: "SUPER_RARE" as Grade,
      genre: "LANDSCAPE" as Genre,
      name: "How Far I'll Go",
      price: 4,
      availableAmount: 1,
      totalAmount: 10,
      creator: "랍스타",
      imageUrl: "/assets/images/mock1.png",
      status: "SOLD_OUT", // 판매 완료 상태 추가
    },
    {
      id: "4",
      grade: "LEGENDARY" as Grade,
      genre: "PORTRAIT" as Genre,
      name: "웃는 모습",
      price: 8,
      availableAmount: 1,
      totalAmount: 10,
      creator: "프로여행러",
      imageUrl: "/assets/images/mock1.png",
      status: "PENDING", // 교환 제시 대기중 상태 추가
    },
    {
      id: "5",
      grade: "COMMON" as Grade,
      genre: "OBJECT" as Genre,
      name: "귀여운 강아지",
      price: 3,
      availableAmount: 2,
      totalAmount: 10,
      creator: "미쓰손",
      imageUrl: "/assets/images/mock1.png",
      status: "ON_SALE",
    },
    {
      id: "6",
      grade: "RARE" as Grade,
      genre: "OBJECT" as Genre,
      name: "맛있는 파스타",
      price: 5,
      availableAmount: 1,
      totalAmount: 10,
      creator: "랍스타",
      imageUrl: "/assets/images/mock1.png",
      status: "ON_SALE",
    },
    {
      id: "7",
      grade: "SUPER_RARE" as Grade,
      genre: "LANDSCAPE" as Genre,
      name: "일몰",
      price: 7,
      availableAmount: 1,
      totalAmount: 10,
      creator: "프로여행러",
      imageUrl: "/assets/images/mock1.png",
      status: "ON_SALE",
    },
    {
      id: "8",
      grade: "COMMON" as Grade,
      genre: "PORTRAIT" as Genre,
      name: "친구들과 함께",
      price: 3,
      availableAmount: 3,
      totalAmount: 10,
      creator: "미쓰손",
      imageUrl: "/assets/images/mock1.png",
      status: "ON_SALE",
    },
    {
      id: "9",
      grade: "LEGENDARY" as Grade,
      genre: "LANDSCAPE" as Genre,
      name: "오로라",
      price: 10,
      availableAmount: 1,
      totalAmount: 10,
      creator: "랍스타",
      imageUrl: "/assets/images/mock1.png",
      status: "ON_SALE",
    },
    {
      id: "10",
      grade: "RARE" as Grade,
      genre: "OBJECT" as Genre,
      name: "잠자는 고양이",
      price: 5,
      availableAmount: 2,
      totalAmount: 10,
      creator: "프로여행러",
      imageUrl: "/assets/images/mock1.png",
      status: "ON_SALE",
    },
    {
      id: "11",
      grade: "SUPER_RARE" as Grade,
      genre: "OBJECT" as Genre,
      name: "홈메이드 케이크",
      price: 6,
      availableAmount: 1,
      totalAmount: 10,
      creator: "미쓰손",
      imageUrl: "/assets/images/mock1.png",
      status: "ON_SALE",
    },
    {
      id: "12",
      grade: "COMMON" as Grade,
      genre: "LANDSCAPE" as Genre,
      name: "도시야경",
      price: 4,
      availableAmount: 2,
      totalAmount: 10,
      creator: "랍스타",
      imageUrl: "/assets/images/mock1.png",
      status: "ON_SALE",
    },
    {
      id: "13",
      grade: "LEGENDARY" as Grade,
      genre: "PORTRAIT" as Genre,
      name: "공연현장",
      price: 9,
      availableAmount: 1,
      totalAmount: 10,
      creator: "프로여행러",
      imageUrl: "/assets/images/mock1.png",
      status: "ON_SALE",
    },
    {
      id: "14",
      grade: "RARE" as Grade,
      genre: "OBJECT" as Genre,
      name: "새들의 군무",
      price: 6,
      availableAmount: 1,
      totalAmount: 10,
      creator: "미쓰손",
      imageUrl: "/assets/images/mock1.png",
      status: "ON_SALE",
    },
    {
      id: "15",
      grade: "SUPER_RARE" as Grade,
      genre: "OBJECT" as Genre,
      name: "디저트 플레이팅",
      price: 7,
      availableAmount: 1,
      totalAmount: 10,
      creator: "랍스타",
      imageUrl: "/assets/images/mock1.png",
      status: "ON_SALE",
    },
    {
      id: "16",
      grade: "COMMON" as Grade,
      genre: "LANDSCAPE" as Genre,
      name: "산정상",
      price: 3,
      availableAmount: 2,
      totalAmount: 10,
      creator: "프로여행러",
      imageUrl: "/assets/images/mock1.png",
      status: "ON_SALE",
    },
    {
      id: "17",
      grade: "LEGENDARY" as Grade,
      genre: "PORTRAIT" as Genre,
      name: "졸업식",
      price: 8,
      availableAmount: 1,
      totalAmount: 10,
      creator: "미쓰손",
      imageUrl: "/assets/images/mock1.png",
      status: "ON_SALE",
    },
    {
      id: "18",
      grade: "RARE" as Grade,
      genre: "OBJECT" as Genre,
      name: "수족관",
      price: 5,
      availableAmount: 1,
      totalAmount: 10,
      creator: "랍스타",
      imageUrl: "/assets/images/mock1.png",
      status: "ON_SALE",
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

        <MyPhotoCardGrades
          nickname={user.nickname}
          totalCards={user.total}
          photoCard={user.photoCard}
        />

        <SaleCardFilter myPhotoCards={cards} onCardClick={handleCardClick} />
      </div>
    </CommonLayout>
  );
};

export default MySales;
