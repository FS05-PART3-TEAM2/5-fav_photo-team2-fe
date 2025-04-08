"use client";
// 절차 PhotoCardList에 넘겨줌 → 내부에서 ref를 마지막 카드에 붙여서 무한스크롤 트리거함
import { useState, useEffect } from "react";
import MarketplaceHeader from "@/components/market/list/MarketplaceHeader";
import PhotoCardList from "@/components/market/list/CardGrid";
import useInfiniteMarketCards from "@/hooks/market/list/useInfiniteMarketCards";
import { MarketplacePhotoCardDto } from "@/types/photocard.types";

export default function MarketplacePage() {
  const { data: allPhotoCards = [], isFetching, lastCardRef } = useInfiniteMarketCards();
  const [filteredCards, setFilteredCards] = useState<MarketplacePhotoCardDto[]>([]);

  useEffect(() => {
    setFilteredCards(allPhotoCards); // 무한스크롤 데이터가 들어올 때마다 업데이트
  }, [allPhotoCards]);
  // console.log("불러온데이터 확인용", allPhotoCards);
  return (
    <div>
      <MarketplaceHeader photoCards={allPhotoCards} setFilteredCards={setFilteredCards} />
      <PhotoCardList
        photoCards={Array.isArray(filteredCards) ? filteredCards : []}
        isFetching={isFetching}
        observerRef={lastCardRef}
      />
    </div>
  );
}
