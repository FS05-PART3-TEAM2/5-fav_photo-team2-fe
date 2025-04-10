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
import { SaleCardDto, Grade, Genre, SaleCardStatus, Sort } from "@/types/photocard.types";
import ResponsiveForm from "@/components/common/responsiveLayout/responsiveForm/ResponsiveForm";
import { useSnackbarStore } from "@/store/useSnackbarStore";

export default function MarketplacePageClient() {
  const defaultFilter = {
    keyword: "",
    grade: "default",
    genre: "default",
    status: "default",
    sort: "latest",
  } as unknown as {
    keyword: string;
    grade: Grade;
    genre: Genre;
    status: SaleCardStatus;
    sort: Sort;
  };

  const { data: photoCards = [] } = useQuery({
    queryKey: photoCardKeys.saleList(defaultFilter),
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

  const { openSnackbar } = useSnackbarStore();

  const handleOpenMyPhotoList = () => {
    if (!user) {
      openSnackbar("ERROR", "로그인이 필요합니다.");
      return;
    }
    setIsSellerPageOpen(true);
    setSelectedCard(null);
  };

  const handleCardSelect = (converted: SaleCardDto) => {
    setSelectedCard(converted);
    setIsSellerPageOpen(false);
    setIsSellFormOpen(true);
  };

  const handleSellFormClose = () => {
    setIsSellFormOpen(false);
    setSelectedCard(null);
  };

  useEffect(() => {
    setFilteredCards(photoCards);
  }, [photoCards]);

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
