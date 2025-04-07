"use client";

import React from "react";
import Image from "next/image";
import { CommonLayout } from "@/components/common/layout/CommonLayout";
import { AmountText, CardType, Grade, Genre } from "@/types/photocard.types";
import CardHeader from "@/components/common/card/CardHeader";
import CardDetail from "@/components/common/card/CardDetail";
import ThickBtn from "@/components/common/button/ThickBtn";

const MyPhotoDetailPage = () => {
  /* 우리집 앞마당 포토카드 데이터
   * TODO : 포토카드 상세 데이터 API 연동 후 데이터 변경
   */
  const data = {
    grade: "COMMON" as Grade,
    genre: "LANDSCAPE" as Genre,
    name: "우리집 앞마당",
    price: 4,
    availableAmount: 5,
    totalAmount: 5,
    creator: "미쓰손",
    description:
      "우리집 앞마당 포토카드입니다. 오랜만에 보니 너무 좋아요. 우리집 앞마당 포토카드입니다. 오랜만에 보니 너무 좋아요.",
    imageUrl: "/assets/images/mock1.png",
  };

  // CardHeader 및 CardDetail에 필요한 props 구성
  const cardHeaderProps = {
    grade: data.grade,
    genre: data.genre,
    creator: data.creator,
    cardType: "details" as CardType,
  };

  const cardDetailProps = {
    description: data.description,
    price: data.price,
    availableAmount: data.availableAmount,
    totalAmount: data.totalAmount,
    amountText: "보유량" as AmountText,
    cardType: "details" as CardType,
  };

  // 스타일 상수
  const cardDetailContainerSx =
    "w-[100%] h-full flex flex-col md:flex-row gap-[20px] lg:gap-[80px]";
  const cardDetailWrapperSx =
    "w-[100%] md:w-[342px] lg:w-[440px] h-full flex flex-shrink-0 flex-col gap-[40px] lg:gap-[50px]";

  return (
    <CommonLayout>
      <div className="w-[100%] flex flex-col gap-[20px] md:gap-[40px] lg:gap-[60px]">
        {/* 포토카드 제목 */}
        <div className="w-[100%] flex items-center justify-between pb-[10px] md:pb-[20px] border-b-[2px] border-gray-100">
          <p className="text-white text-[20px] md:text-[28px] lg:text-[32px] font-BR-B">
            {data.name}
          </p>
        </div>

        <div className={cardDetailContainerSx}>
          {/* 포토카드 이미지 */}
          <div className="w-[100%] h-[100%] min-h-[260px] max-h-[500px] lg:max-h-[720px] aspect-square relative">
            <Image src={data.imageUrl} alt={data.name} fill sizes="100%" className="object-cover" />
          </div>

          {/* 포토카드 상세 정보 */}
          <div className={cardDetailWrapperSx}>
            <div className="w-[100%] flex flex-col gap-[30px]">
              <div className="w-[100%] flex flex-col">
                <CardHeader {...cardHeaderProps} />
                <CardDetail {...cardDetailProps} />
              </div>
            </div>

            {/* 포토카드 구매하기 버튼
             * @@TODO : 포토카드 구매 API 연동
             */}
            <div className="w-[100%]">
              <ThickBtn>포토카드 구매하기</ThickBtn>
            </div>
          </div>
        </div>
      </div>
    </CommonLayout>
  );
};

export default MyPhotoDetailPage;
