"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { CommonLayout } from "@/components/common/layout/CommonLayout";
import { AmountText, CardType, SaleCardDto } from "@/types/photocard.types";
import CardHeader from "@/components/common/card/CardHeader";
import CardDetail from "@/components/common/card/CardDetail";
import ThickBtn from "@/components/common/button/ThickBtn";
import {
  getMyPhotoCardDetail,
  MyPhotoCardDetailResponse,
} from "@/services/my-page/getMyPhotoCardDetail";
import { SellerPage } from "@/components/market/list/seller/SellerPage";
import SellForm from "@/components/market/list/seller/SaleForm";
import { convertToSaleCardDto } from "@/utils/convertToSaleCardDto";
import ResponsiveForm from "@/components/common/responsiveLayout/responsiveForm/ResponsiveForm";

const MyPhotoDetailPage = () => {
  const params = useParams();
  const id = params.id as string;

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [photoCard, setPhotoCard] = useState<MyPhotoCardDetailResponse | null>(null);

  // 판매 모달 관련 상태
  const [isSellerModalOpen, setIsSellerModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<SaleCardDto | null>(null);
  const [isSellFormOpen, setIsSellFormOpen] = useState(false);

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

  // 판매하기 버튼 클릭 핸들러
  const handleSellClick = () => {
    if (photoCard) {
      // 현재 포토카드를 판매 가능한 형태로 변환
      const saleCardData = convertToSaleCardDto({
        id: id,
        name: photoCard.name,
        genre: photoCard.genre,
        grade: photoCard.grade,
        price: photoCard.price,
        imageUrl: photoCard.imageUrl,
        amount: photoCard.availableAmount,
        creatorNickname: photoCard.creator,
        createdAt: photoCard.createdAt,
      });

      // 확실하게 userPhotoCardId도 직접 설정
      // saleCardData.userPhotoCardId = id;

      setSelectedCard(saleCardData);
      setIsSellFormOpen(true);
    }
  };

  // 판매 폼 취소 핸들러
  const handleCancelSell = () => {
    setIsSellFormOpen(false);
    setSelectedCard(null);
  };

  // 판매 폼 제출 핸들러
  const handleSubmitSell = () => {
    setIsSellFormOpen(false);
    setSelectedCard(null);
  };

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
    totalAmount: photoCard.availableAmount,
    amountText: "보유량" as AmountText,
    cardType: "details" as CardType,
  };

  // 스타일 상수
  const cardDetailContainerSx =
    "w-[100%] h-full flex flex-col md:flex-row gap-[20px] lg:gap-[80px]";
  const cardDetailWrapperSx =
    "w-[100%] md:w-[342px] lg:w-[440px] h-full flex flex-shrink-0 flex-col gap-[40px] lg:gap-[50px]";

  return (
    <>
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

              {/* 포토카드 판매하기 버튼 */}
              <div className="w-[100%]">
                <ThickBtn onClick={handleSellClick}>포토카드 판매하기</ThickBtn>
              </div>
            </div>
          </div>
        </div>
      </CommonLayout>

      {/* SellerPage 모달 */}
      <SellerPage
        isOpen={isSellerModalOpen}
        onClose={() => setIsSellerModalOpen(false)}
        setSelectedCard={card => {
          setSelectedCard(card);
          setIsSellerModalOpen(false);
          setIsSellFormOpen(true);
        }}
      />

      {isSellFormOpen && selectedCard && (
        <ResponsiveForm
          isOpen={isSellFormOpen}
          onClose={handleCancelSell}
          title="포토카드 판매하기"
        >
          <SellForm data={selectedCard} onCancel={handleCancelSell} onSubmit={handleSubmitSell} />
        </ResponsiveForm>
      )}
    </>
  );
};

export default MyPhotoDetailPage;
