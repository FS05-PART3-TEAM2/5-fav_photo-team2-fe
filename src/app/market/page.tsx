"use client";
// 절차
// const { data, observerRef, isFetching } = useMarketCards(); 이렇게 훅만 호출
// PhotoCardList에 넘겨줌 → 내부에서 ref를 마지막 카드에 붙여서 무한스크롤 트리거함
import { useState } from "react";
import MarketplaceHeader from "@/components/market/list/MarketplaceHeader";
import PhotoCardList from "@/components/market/list/CardGrid";
import useInfiniteMarketCards from "@/hooks/market/list/useInfiniteMarketCards";

export default function MarketplacePage() {
  const { data: allPhotoCards = [], isFetching, observerRef } = useInfiniteMarketCards();
  const [filteredCards, setFilteredCards] = useState(allPhotoCards);

  return (
    <div>
      <MarketplaceHeader photoCards={allPhotoCards} setFilteredCards={setFilteredCards} />
      <PhotoCardList
        photoCards={Array.isArray(filteredCards) ? filteredCards : []}
        isFetching={isFetching}
        observerRef={observerRef}
      />
    </div>
  );
}

// import { useEffect, useState } from "react";
// import { axiosClient } from "@/services/axiosClient/axiosClient";
// import { MarketplacePhotoCardDto } from "@/types/photocard.types";
// import MarketplaceHeader from "@/components/market/list/MarketplaceHeader";
// import PhotoCardList from "@/components/market/list/CardGrid";

// export default function MarketplacePage() {
//   const [photoCards, setPhotoCards] = useState<MarketplacePhotoCardDto[]>([]);
//   const [filteredCards, setFilteredCards] = useState<MarketplacePhotoCardDto[]>([]);

//   useEffect(() => {
//     const fetchPhotoCards = async () => {
//       try {
//         const response = await axiosClient.get("/market");
//         const list = response.data.list;

//         console.log("📌 초기 데이터 확인용:", response.data);
//         if (Array.isArray(list)) {
//           setPhotoCards(list);
//           setFilteredCards(list);
//         }
//       } catch (error) {
//         console.error("🚨 API 요청 실패:", error);
//       }
//     };
//     fetchPhotoCards();
//   }, []);

//   return (
//     <div>
//       <MarketplaceHeader photoCards={photoCards} setFilteredCards={setFilteredCards} />
//       <PhotoCardList photoCards={filteredCards} />
//     </div>
//   );
// }
