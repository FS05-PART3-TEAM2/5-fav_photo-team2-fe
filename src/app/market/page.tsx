"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { MarketplacePhotoCardDto } from "@/types/photocard.types";
import MarketplaceHeader from "@/components/market/list/MarketplaceHeader";
import PhotoCardList from "@/components/market/list/CardGrid";

export default function MarketplacePage() {
  const [photoCards, setPhotoCards] = useState<MarketplacePhotoCardDto[]>([]);
  const [filteredCards, setFilteredCards] = useState<MarketplacePhotoCardDto[]>([]);

  useEffect(() => {
    const fetchPhotoCards = async () => {
      try {
        const response = await axios.get(
          "https://five-fav-photo-team2-be.onrender.com/api/market",
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true, // 필요한 경우 유지
          }
        );

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
