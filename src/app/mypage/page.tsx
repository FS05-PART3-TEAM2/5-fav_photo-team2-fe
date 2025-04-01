"use client";

import Image from "next/image";
import { Grade } from "@/types/photocard.types";
import ThinBtn from "@/components/common/button/ThinBtn";
import CardHeader from "@/components/common/card/CardHeader";
import CardDetail from "@/components/common/card/CardDetail";
import { CommonLayout } from "@/components/common/layout/CommonLayout";
import { useRouter } from "next/navigation";
import Filter from "@/components/common/filter/Filter";
import { useState } from "react";

const MyPage = () => {
  const router = useRouter();
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

  return (
    <CommonLayout>
      <div className="relative min-h-screen pb-[80px] md:pb-0">
        {/* 헤더 섹션 */}
        <div className="relative flex flex-row justify-between items-center mb-10 md:border-b-[2px] md:border-color-gray-100 md:pb-5">
          {/* 모바일 뒤로가기 버튼 */}
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 md:hidden"
            onClick={() => router.back()}
          >
            <Image
              src="/assets/icons/back.png"
              alt="back"
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </button>

          {/* 제목 */}
          <h1 className="font-BR-B text-[20px] md:text-[48px] lg:text-[62px] text-white my-5 w-full md:w-auto text-center md:text-left">
            마이갤러리
          </h1>

          {/* 데스크탑 버튼 */}
          <ThinBtn buttonType="Primary" className="hidden md:block w-[342px] lg:w-[440px]">
            포토카드 생성하기
          </ThinBtn>
        </div>

        {/* 갤러리 정보 */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-5">
            <h2 className="text-white text-[24px] font-bold">
              {user.nickname}님이 보유한 포토카드
            </h2>
            <span className="text-gray-300 text-[24px] ">({user.total}장)</span>
          </div>

          {/* 라벨 탭 */}
          <div className="flex mb-5 pb-10 border-b border-gray-400">
            <div className="flex gap-5">
              <button className="px-5 py-2 text-main border border-main">
                COMMON <span className="text-main">{user.photoCard.common}장</span>
              </button>
              <button className="px-5 py-2 text-blue border border-blue">
                RARE <span className="text-blue">{user.photoCard.rare}장</span>
              </button>
              <button className="px-5 py-2 text-purple border border-purple">
                SUPER RARE <span className="text-purple">{user.photoCard.superRare}장</span>
              </button>
              <button className="px-5 py-2 text-red border border-red">
                LEGENDARY <span className="text-red">{user.photoCard.legendary}장</span>
              </button>
            </div>
          </div>

          {/* 검색 및 정렬 */}
          <div className="flex justify-start items-center gap-3 mb-4">
            {/* 모바일 필터 버튼 */}
            <button className="md:hidden flex items-center justify-center w-[45px] h-[45px] border border-gray-200 rounded-[2px] flex-shrink-0">
              <Image
                src="/assets/icons/filter.png"
                alt="filter"
                width={20}
                height={20}
                className="w-5 h-5 object-contain"
              />
            </button>
            <div className="relative flex-1 md:w-[200px] lg:w-[320px] md:flex-none">
              <input
                type="text"
                placeholder="검색"
                className="w-full h-[45px] px-5 bg-dark text-gray-200 border border-gray-200 rounded-[2px] text-[14px]"
              />
              <button className="absolute right-5 top-1/2 transform -translate-y-1/2">
                <Image
                  src="/assets/icons/search.png"
                  alt="search"
                  width={20}
                  height={20}
                  className="w-5 h-5 object-contain"
                />
              </button>
            </div>
            {/* 데스크탑 필터 */}
            <div className="hidden md:flex md:items-center md:justify-center md:ml-[60px]">
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
        </div>

        {/* 카드 그리드 */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7 lg:gap-10 ">
          {cards.map(card => (
            <div
              key={card.id}
              className="bg-dark border border-white/10 rounded-md overflow-hidden cursor-pointer shadow-lg w-full p-2 md:p-4 lg:p-8"
            >
              <div className="p-3 md:p-4 lg:p-5">
                <div className="relative aspect-[360/270] overflow-hidden mb-[10px] md:mb-[25px]">
                  <Image
                    src="/assets/images/mock1.png"
                    alt={card.name}
                    fill
                    sizes="(max-width: 768px) 100%, (max-width: 1024px) 50%, 33%"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-white font-bold text-[14px] md:text-[22px] mb-[10px]">
                    {card.name}
                  </h3>
                  <div className="pb-[10px] md:pb-[20px]">
                    <CardHeader
                      grade={card.grade}
                      genre={card.genre}
                      creator={card.creator}
                      cardType="list"
                    />
                  </div>
                  <CardDetail
                    price={card.price}
                    availableAmount={card.availableAmount}
                    totalAmount={card.totalAmount}
                    amountText="수량"
                    cardType="list"
                  />
                  <div className="hidden md:block md:mt-[30px] lg:mt-[40px] text-center">
                    <span className="font-BR-B text-white text-[18px]">
                      최애<span className="text-main">의</span>
                      <span className="text-white">포토</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 모바일 포토카드 생성 버튼 */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
          <div className="mx-5 mb-8">
            <ThinBtn buttonType="Primary" className="w-full bg-main shadow-lg">
              포토카드 생성하기
            </ThinBtn>
          </div>
        </div>
      </div>
    </CommonLayout>
  );
};

export default MyPage;
