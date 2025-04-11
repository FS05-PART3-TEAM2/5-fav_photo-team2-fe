import React, { useState } from "react";
import { GradeFilter, GenreFilter, TradeStatusFilter } from "@/types/filter.types";
import SaleFilterSection from "@/components/my-page/my-sale/SaleFilterSection";
import SaleCardList from "@/components/my-page/my-sale/SaleCardList";
import { useMySalesCards } from "@/hooks/my-page/useMySalesCards";
import { Grade, Genre, TradeStatus } from "@/types/photocard.types";

interface SaleCardFilterProps {
  onCardClick?: (cardId: string) => void;
  className?: string;
}

const SaleCardFilter: React.FC<SaleCardFilterProps> = ({ onCardClick, className }) => {
  const [gradeFilter, setGradeFilter] = useState<GradeFilter>("default");
  const [genreFilter, setGenreFilter] = useState<GenreFilter>("default");
  const [tradeStatusFilter, setTradeStatusFilter] = useState<TradeStatusFilter>("default");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // 필터 값을 실제 API 파라미터에 맞게 변환 - default를 undefined로 변환
  const getFilterParam = <T extends Grade | Genre | TradeStatus>(filter: string): T | undefined => {
    return filter === "default" ? undefined : (filter as T);
  };

  // React Query 훅 사용
  const { mySalesCards, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useMySalesCards({
      keyword: searchQuery,
      grade: getFilterParam<Grade>(gradeFilter),
      genre: getFilterParam<Genre>(genreFilter),
      status: getFilterParam<TradeStatus>(tradeStatusFilter),
    });

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

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="text-main text-lg">데이터를 불러오는 중...</div>
        </div>
      ) : mySalesCards.length > 0 ? (
        <SaleCardList
          className={className}
          salesCards={mySalesCards}
          onCardClick={onCardClick}
          onLoadMore={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      ) : (
        <div className="flex justify-center items-center py-20">
          <div className="text-white text-lg">판매 중인 포토카드가 없습니다.</div>
        </div>
      )}
    </>
  );
};

export default SaleCardFilter;
