"use client";
import { useEffect, useState } from "react";
import { CommonLayout } from "@/components/common/layout/CommonLayout";
import { PhotoCard } from "@/types/photocard.types";
import Search from "@/components/common/input/Search";
import MarketplaceHeader from "@/components/market/list/MarketplaceHeader";
import PhotoCardList from "@/components/market/list/CardGrid";

export default function MarketplacePage() {
  const [photoCards, setPhotoCards] = useState<PhotoCard[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

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

  // 검색어를 포함하는 카드만 필터링
  const filteredPhotoCards = photoCards.filter(card =>
    card.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <CommonLayout>
      <MarketplaceHeader />
      <div className="flex">
        {/* SEJEONG: 드롭다운 공통컴포넌트 추가 */}
        <Search onSearch={setSearchTerm} />
      </div>
      <PhotoCardList photoCards={filteredPhotoCards} />
    </CommonLayout>
  );
}
