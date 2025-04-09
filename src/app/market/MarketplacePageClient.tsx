// app/market/MarketplacePageClient.tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import { getMarketPhotoCardsApi } from "@/services/market/getMarketPhotoCards";
import { getMyInfoApi } from "@/services/market/getMyInfoApi";
import { photoCardKeys } from "@/utils/queryKeys";
import MarketplaceHeader from "@/components/market/list/MarketplaceHeader";
import CardGrid from "@/components/market/list/CardGrid";
import { SellerPage } from "@/components/market/list/seller/SellerPage";
import SellForm from "@/components/market/list/seller/SaleForm";
import { useState, useEffect } from "react";
import { SaleCardDto } from "@/types/photocard.types";
import ResponsiveForm from "@/components/common/responsiveLayout/responsiveForm/ResponsiveForm";

export default function MarketplacePageClient() {
  const { data: photoCards = [] } = useQuery({
    queryKey: photoCardKeys.marketList(),
    queryFn: () => getMarketPhotoCardsApi(),
  });

  // 👇 로그인 유저 정보 가져오기
  const { data: user } = useQuery({
    queryKey: ["me"],
    queryFn: () => getMyInfoApi(),
    retry: false, // 로그인 안 되어있을 때 무한 재시도 방지
  });

  const [filteredCards, setFilteredCards] = useState(photoCards);
  const [isSellerPageOpen, setIsSellerPageOpen] = useState(false);
  const [isSellFormOpen, setIsSellFormOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<SaleCardDto | null>(null);

  const handleOpenMyPhotoList = () => {
    if (!user) {
      alert("로그인이 필요한 기능입니다.");
      return;
    }
    setIsSellerPageOpen(true);
    setSelectedCard(null);
  };

  const handleCardSelect = (converted: SaleCardDto) => {
    console.log("✔ 카드 선택됨:", converted);
    setSelectedCard(converted);
    setIsSellerPageOpen(false);
    setIsSellFormOpen(true);
  };

  const handleSellFormClose = () => {
    setIsSellFormOpen(false);
    setSelectedCard(null);
  };

  useEffect(() => {
    console.log("📦 isSellFormOpen:", isSellFormOpen);
    console.log("📦 selectedCard:", selectedCard);
  }, [isSellFormOpen, selectedCard]);
  return (
    <>
      <MarketplaceHeader
        photoCards={photoCards}
        onClickSellButton={handleOpenMyPhotoList}
        onFilterChange={({ searchTerm, grade, genre, isSoldOut, orderBy }) => {
          const filtered = photoCards
            .filter(card => card.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .filter(card => grade === "default" || card.grade === grade)
            .filter(card => genre === "default" || card.genre === genre)
            .filter(card =>
              isSoldOut === "default"
                ? true
                : isSoldOut === "SOLD_OUT"
                  ? card.status === "SOLD_OUT"
                  : card.status !== "SOLD_OUT"
            )
            .sort((a, b) => {
              if (orderBy === "latest") {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
              } else if (orderBy === "oldest") {
                return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
              } else if (orderBy === "expensive") {
                return b.price - a.price;
              } else {
                return a.price - b.price;
              }
            });

          setFilteredCards(filtered);
        }}
      />
      <CardGrid photoCards={filteredCards} />

      {isSellerPageOpen && (
        <SellerPage
          isOpen={isSellerPageOpen}
          onClose={() => setIsSellerPageOpen(false)}
          setSelectedCard={handleCardSelect}
        />
      )}

      {isSellFormOpen && selectedCard && (
        <>
          {console.log("🟩 SellForm 열림 조건 충족", selectedCard)}
          <ResponsiveForm title="판매 등록" isOpen={isSellFormOpen} onClose={handleSellFormClose}>
            <SellForm
              data={selectedCard}
              onSubmit={handleSellFormClose} // 판매 성공 후 모달 닫기용
              onCancel={handleSellFormClose}
            />
          </ResponsiveForm>
        </>
      )}
    </>
  );
}
