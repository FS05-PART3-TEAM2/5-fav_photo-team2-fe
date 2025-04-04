"use client";
import { useEffect, useState } from "react";
import { axiosClient } from "@/services/axiosClient/axiosClient";
import { MarketplacePhotoCardDto } from "@/types/photocard.types";
import MarketplaceHeader from "@/components/market/list/MarketplaceHeader";
import PhotoCardList from "@/components/market/list/CardGrid";

export default function MarketplacePage() {
  const [photoCards, setPhotoCards] = useState<MarketplacePhotoCardDto[]>([]);
  const [filteredCards, setFilteredCards] = useState<MarketplacePhotoCardDto[]>([]);

  useEffect(() => {
    const fetchPhotoCards = async () => {
      try {
        const response = await axiosClient.get("/market");

        console.log("📌 불러온 데이터 확인용:", response.data);
        if (Array.isArray(response.data.list)) {
          setPhotoCards(response.data.list);
          setFilteredCards(response.data.list);
        } else {
          console.error("❌ 예상된 데이터 형식이 아님:", response.data);
        }
      } catch (error) {
        console.error("🚨 API 요청 실패:", error);
      }
    };
    fetchPhotoCards();
  }, []);

  return (
    <div>
      <MarketplaceHeader photoCards={photoCards} setFilteredCards={setFilteredCards} />
      <PhotoCardList photoCards={filteredCards} />
    </div>
  );
}
