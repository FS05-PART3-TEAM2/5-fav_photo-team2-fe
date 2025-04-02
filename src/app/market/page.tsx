"use client";
import { useEffect, useState } from "react";
import { UpdateSaleCardResponseDto } from "@/types/photocard.types";
import MarketplaceHeader from "@/components/market/list/MarketplaceHeader";
import PhotoCardList from "@/components/market/list/CardGrid";

export default function MarketplacePage() {
  const [photoCards, setPhotoCards] = useState<UpdateSaleCardResponseDto[]>([]);
  const [filteredCards, setFilteredCards] = useState<UpdateSaleCardResponseDto[]>([]);

  useEffect(() => {
    fetch("/photoCardsData.json")
      .then(res => res.json())
      .then(data => {
        console.log("📌 불러온 데이터 확인용:", data);
        if (data?.list) {
          setPhotoCards(data.list); // 🟢 'list' 배열만 저장
        }
      })
      .catch(err => console.error("데이터 불러오기 실패:", err));
  }, []);

  return (
    <div>
      <MarketplaceHeader photoCards={photoCards} setFilteredCards={setFilteredCards} />
      <PhotoCardList photoCards={filteredCards} />
    </div>
  );
}
