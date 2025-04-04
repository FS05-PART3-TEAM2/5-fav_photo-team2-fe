import React, { useState, useEffect } from "react";
import { MyPhotoCardDto } from "@/types/photocard.types";
import { GradeFilter, GenreFilter, TradeStatusFilter } from "@/types/filter.types";
import MyPhotoCardGrid from "@/components/my-page/MyPhotoCardGrid";
import { FILTER_CONFIG } from "@/components/common/filter/constants";
import SaleFilterSection from "@/components/my-page/my-sale/SaleFilterSection";

interface SaleCardFilterProps {
  myPhotoCards?: MyPhotoCardDto[];
  onCardClick?: (cardId: string) => void;
}

const SaleCardFilter: React.FC<SaleCardFilterProps> = ({ myPhotoCards = [], onCardClick }) => {
  const [gradeFilter, setGradeFilter] = useState<GradeFilter>("default");
  const [genreFilter, setGenreFilter] = useState<GenreFilter>("default");
  const [tradeStatusFilter, setTradeStatusFilter] = useState<TradeStatusFilter>("default");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredCards, setFilteredCards] = useState<MyPhotoCardDto[]>(myPhotoCards);

  useEffect(() => {
    // 검색어와 필터를 적용하여 카드 필터링
    const filtered = myPhotoCards.filter(myPhotoCard => {
      // 등급 필터 적용
      if (gradeFilter !== "default") {
        if (myPhotoCard.grade !== gradeFilter) {
          return false;
        }
      }

      // 장르 필터 적용
      if (genreFilter !== "default") {
        const genreKey = genreFilter as keyof typeof FILTER_CONFIG.filter.genre.options;
        const genreValue = FILTER_CONFIG.filter.genre.options[genreKey];

        if (myPhotoCard.genre !== genreValue) {
          return false;
        }
      }

      // 거래 상태 필터 적용 (추후 API 연동 시 실제 필드와 매핑 필요)
      if (tradeStatusFilter !== "default") {
        // 임시 코드: tradeStatus 필드가 아직 없으므로 모든 카드가 ON_SALE 상태라고 가정
        if (tradeStatusFilter !== "ON_SALE") {
          return false;
        }
      }

      // 검색어 적용 (카드 이름 또는 제작자로 검색)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        return (
          myPhotoCard.name.toLowerCase().includes(query) ||
          myPhotoCard.creator.toLowerCase().includes(query)
        );
      }

      return true;
    });

    setFilteredCards(filtered);
  }, [gradeFilter, genreFilter, tradeStatusFilter, searchQuery, myPhotoCards]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <>
      <SaleFilterSection
        gradeFilter={gradeFilter}
        genreFilter={genreFilter}
        tradeStatusFilter={tradeStatusFilter}
        onGradeFilterChange={setGradeFilter}
        onGenreFilterChange={setGenreFilter}
        onTradeStatusFilterChange={setTradeStatusFilter}
        onSearch={handleSearch}
      />
      <MyPhotoCardGrid myPhotoCards={filteredCards || []} onCardClick={onCardClick} />
    </>
  );
};

export default SaleCardFilter;
