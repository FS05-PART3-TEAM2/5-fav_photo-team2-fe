"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { CommonLayout } from "@/components/common/layout/CommonLayout";
import { AmountText, CardType } from "@/types/photocard.types";
import CardHeader from "@/components/common/card/CardHeader";
import CardDetail from "@/components/common/card/CardDetail";
import ThickBtn from "@/components/common/button/ThickBtn";
import {
  getMyPhotoCardDetail,
  MyPhotoCardDetailResponse,
} from "@/services/my-page/getMyPhotoCardDetail";

const MyPhotoDetailPage = () => {
  const params = useParams();
  const id = params.id as string;

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [photoCard, setPhotoCard] = useState<MyPhotoCardDetailResponse | null>(null);

  useEffect(() => {
    const fetchPhotoCardDetail = async () => {
      try {
        setIsLoading(true);
        const data = await getMyPhotoCardDetail(id);
        setPhotoCard(data);
        setError(null);
      } catch (err) {
        console.error("포토카드 정보를 불러오는데 실패했습니다.", err);
        setError("포토카드 정보를 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchPhotoCardDetail();
    }
  }, [id]);

  // 로딩 중 표시
  if (isLoading) {
    return (
      <CommonLayout>
        <div className="flex justify-center items-center py-10">
          <div className="text-main">포토카드 정보를 불러오는 중...</div>
        </div>
      </CommonLayout>
    );
  }

  // 에러 표시
  if (error || !photoCard) {
    return (
      <CommonLayout>
        <div className="flex justify-center items-center py-10">
          <div className="text-red-500">{error || "포토카드를 찾을 수 없습니다."}</div>
        </div>
      </CommonLayout>
    );
  }

  // CardHeader 및 CardDetail에 필요한 props 구성
  const cardHeaderProps = {
    grade: photoCard.grade,
    genre: photoCard.genre,
    creator: photoCard.creator,
    cardType: "details" as CardType,
  };

  const cardDetailProps = {
    description: photoCard.description,
    price: photoCard.price,
    availableAmount: photoCard.availableAmount,
    totalAmount: 10,
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
            {photoCard.name}
          </p>
        </div>

        <div className={cardDetailContainerSx}>
          {/* 포토카드 이미지 */}
          <div className="w-[100%] h-[100%] min-h-[260px] max-h-[500px] lg:max-h-[720px] aspect-square relative">
            <Image
              src={photoCard.imageUrl}
              alt={photoCard.name}
              fill
              sizes="100%"
              className="object-cover"
            />
          </div>

          {/* 포토카드 상세 정보 */}
          <div className={cardDetailWrapperSx}>
            <div className="w-[100%] flex flex-col gap-[30px]">
              <div className="w-[100%] flex flex-col">
                <CardHeader {...cardHeaderProps} />
                <CardDetail {...cardDetailProps} />
              </div>
            </div>

            {/* 포토카드 판매하기 버튼
             * @@TODO : 포토카드 판매 API 연동
             */}
            <div className="w-[100%]">
              <ThickBtn>포토카드 판매하기</ThickBtn>
            </div>
          </div>
        </div>
      </div>
    </CommonLayout>
  );
};

export default MyPhotoDetailPage;
