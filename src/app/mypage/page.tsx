"use client";

import { useState } from "react";
import Image from "next/image";
import { Grade } from "@/types/photocard.types";
import { CommonLayout } from "@/components/common/layout/CommonLayout";
import HeaderSection from "@/components/mypage/HeaderSection";
import PhotoCardGrades from "@/components/mypage/PhotoCardGrades";
import PhotoCardGrid from "@/components/mypage/PhotoCardGrid";
import MobileCreateButton from "@/components/mypage/MobileCreateButton";
import Filter from "@/components/common/filter/Filter";
import SearchBar from "@/components/mypage/SearchBar";

const MyPage = () => {
  const [gradeFilter, setGradeFilter] = useState<
    "default" | "COMMON" | "RARE" | "SUPER_RARE" | "LEGENDARY"
  >("default");
  const [genreFilter, setGenreFilter] = useState<"default" | "landscape" | "portrait" | "travel">(
    "default"
  );

  // 임시 사용자 데이터
  const user = {
    nickname: "유디",
    photoCard: {
      common: 20,
      rare: 8,
      superRare: 3,
      legendary: 5,
    },
    total: 36,
  };

  // 임시 카드 데이터
  const cards = [
    {
      id: 1,
      grade: "RARE" as Grade,
      genre: "풍경",
      name: "스페인 여행",
      price: 4,
      availableAmount: 1,
      totalAmount: 10,
      creator: "프로여행러",
    },
    {
      id: 2,
      grade: "COMMON" as Grade,
      genre: "풍경",
      name: "우리집 앞마당",
      price: 4,
      availableAmount: 1,
      totalAmount: 10,
      creator: "미쓰손",
    },
    {
      id: 3,
      grade: "SUPER RARE" as Grade,
      genre: "풍경",
      name: "How Far I'll Go",
      price: 4,
      availableAmount: 1,
      totalAmount: 10,
      creator: "랍스타",
    },
    {
      id: 4,
      grade: "LEGENDARY" as Grade,
      genre: "인물",
      name: "웃는 모습",
      price: 8,
      availableAmount: 1,
      totalAmount: 10,
      creator: "프로여행러",
    },
    {
      id: 5,
      grade: "COMMON" as Grade,
      genre: "동물",
      name: "귀여운 강아지",
      price: 3,
      availableAmount: 2,
      totalAmount: 10,
      creator: "미쓰손",
    },
    {
      id: 6,
      grade: "RARE" as Grade,
      genre: "음식",
      name: "맛있는 파스타",
      price: 5,
      availableAmount: 1,
      totalAmount: 10,
      creator: "랍스타",
    },
    {
      id: 7,
      grade: "SUPER RARE" as Grade,
      genre: "풍경",
      name: "일몰",
      price: 7,
      availableAmount: 1,
      totalAmount: 10,
      creator: "프로여행러",
    },
    {
      id: 8,
      grade: "COMMON" as Grade,
      genre: "인물",
      name: "친구들과 함께",
      price: 3,
      availableAmount: 3,
      totalAmount: 10,
      creator: "미쓰손",
    },
    {
      id: 9,
      grade: "LEGENDARY" as Grade,
      genre: "풍경",
      name: "오로라",
      price: 10,
      availableAmount: 1,
      totalAmount: 10,
      creator: "랍스타",
    },
    {
      id: 10,
      grade: "RARE" as Grade,
      genre: "동물",
      name: "잠자는 고양이",
      price: 5,
      availableAmount: 2,
      totalAmount: 10,
      creator: "프로여행러",
    },
    {
      id: 11,
      grade: "SUPER RARE" as Grade,
      genre: "음식",
      name: "홈메이드 케이크",
      price: 6,
      availableAmount: 1,
      totalAmount: 10,
      creator: "미쓰손",
    },
    {
      id: 12,
      grade: "COMMON" as Grade,
      genre: "풍경",
      name: "도시야경",
      price: 4,
      availableAmount: 2,
      totalAmount: 10,
      creator: "랍스타",
    },
    {
      id: 13,
      grade: "LEGENDARY" as Grade,
      genre: "인물",
      name: "공연현장",
      price: 9,
      availableAmount: 1,
      totalAmount: 10,
      creator: "프로여행러",
    },
    {
      id: 14,
      grade: "RARE" as Grade,
      genre: "동물",
      name: "새들의 군무",
      price: 6,
      availableAmount: 1,
      totalAmount: 10,
      creator: "미쓰손",
    },
    {
      id: 15,
      grade: "SUPER RARE" as Grade,
      genre: "음식",
      name: "디저트 플레이팅",
      price: 7,
      availableAmount: 1,
      totalAmount: 10,
      creator: "랍스타",
    },
    {
      id: 16,
      grade: "COMMON" as Grade,
      genre: "풍경",
      name: "산정상",
      price: 3,
      availableAmount: 2,
      totalAmount: 10,
      creator: "프로여행러",
    },
    {
      id: 17,
      grade: "LEGENDARY" as Grade,
      genre: "인물",
      name: "졸업식",
      price: 8,
      availableAmount: 1,
      totalAmount: 10,
      creator: "미쓰손",
    },
    {
      id: 18,
      grade: "RARE" as Grade,
      genre: "동물",
      name: "수족관",
      price: 5,
      availableAmount: 1,
      totalAmount: 10,
      creator: "랍스타",
    },
  ];

  const handleCreateCardClick = () => {
    // 포토카드 생성 페이지로 이동 또는 모달 표시 등의 로직
    console.log("포토카드 생성 클릭");
  };

  const handleSearch = (query: string) => {
    console.log("검색어:", query);
    // 검색 로직 구현
  };

  return (
    <CommonLayout>
      <div className="relative min-h-screen pb-[80px] md:pb-0">
        <HeaderSection onCreateClick={handleCreateCardClick} />

        <PhotoCardGrades
          nickname={user.nickname}
          totalCards={user.total}
          photoCard={user.photoCard}
        />

        {/* 검색 및 필터 */}
        <div className="flex justify-start items-center gap-3 mb-4">
          {/* 모바일 필터
           * 모바일 화면에서 필터 버튼을 누르면 필터 모달이 나타나도록 구현 - 추후 모바일 필터 컴포넌트 완성시 구현 예정
           */}
          <button className="md:hidden flex items-center justify-center w-[45px] h-[45px] border border-gray-200 rounded-[2px] flex-shrink-0">
            <Image
              src="/assets/icons/filter.png"
              alt="filter"
              width={20}
              height={20}
              className="w-5 h-5 object-contain"
            />
          </button>

          <SearchBar onSearch={handleSearch} />

          {/* 데스크탑 필터 */}
          <div className="hidden md:flex md:items-center md:justify-center md:ml-[30px] lg:ml-[60px] md:gap-[25px] lg:gap-[45px]">
            <Filter<"grade">
              name="grade"
              value={gradeFilter}
              onFilter={value => {
                if (typeof value === "string") {
                  setGradeFilter(value as typeof gradeFilter);
                }
              }}
            />
            <Filter<"genre">
              name="genre"
              value={genreFilter}
              onFilter={value => {
                if (typeof value === "string") {
                  setGenreFilter(value as typeof genreFilter);
                }
              }}
            />
          </div>
        </div>

        <PhotoCardGrid cards={cards} />

        <MobileCreateButton onClick={handleCreateCardClick} />
      </div>
    </CommonLayout>
  );
};

export default MyPage;
