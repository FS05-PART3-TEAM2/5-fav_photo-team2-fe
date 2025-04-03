import React from "react";
import Image from "next/image";
import Filter from "@/components/common/filter/Filter";
import SearchBar from "@/components/my-page/SearchBar";
import { GradeFilter, GenreFilter, TradeStatusFilter } from "@/types/filter.types";
import { FILTER_CONFIG } from "@/components/common/filter/constants";

interface SaleFilterSectionProps {
  gradeFilter: GradeFilter;
  genreFilter: GenreFilter;
  tradeStatusFilter: TradeStatusFilter;
  onGradeFilterChange: (value: GradeFilter) => void;
  onGenreFilterChange: (value: GenreFilter) => void;
  onTradeStatusFilterChange: (value: TradeStatusFilter) => void;
  onSearch: (query: string) => void;
}

const SaleFilterSection: React.FC<SaleFilterSectionProps> = ({
  gradeFilter,
  genreFilter,
  tradeStatusFilter,
  onGradeFilterChange,
  onGenreFilterChange,
  onTradeStatusFilterChange,
  onSearch,
}) => {
  // 타입 변환을 위한 타입 정의
  type GenreOptionKey = keyof typeof FILTER_CONFIG.filter.genre.options;
  type TradeStatusOptionKey = keyof typeof FILTER_CONFIG.filter.tradeStatus.options;

  return (
    <div className="flex justify-start items-center gap-3 mb-4">
      {/* 모바일 필터
       * 모바일 화면에서 필터 버튼을 누르면 필터 모달이 나타나도록 구현 - 추후 모바일 필터 컴포넌트 완성시 구현 예정
       */}
      <button className="md:hidden flex items-center justify-center w-[45px] h-[45px] border border-gray-200 rounded-[2px] flex-shrink-0">
        <Image
          src="/assets/icons/filter.png"
          alt="filter"
          width={20}
          height={20}
          className="w-5 h-5 object-contain"
        />
      </button>

      <SearchBar onSearch={onSearch} />

      {/* 데스크탑 필터 */}
      <div className="hidden md:flex md:items-center md:justify-center md:ml-[30px] lg:ml-[60px] md:gap-[25px] lg:gap-[45px]">
        <Filter<"grade">
          name="grade"
          value={gradeFilter}
          onFilter={value => {
            if (typeof value === "string") {
              onGradeFilterChange(value as GradeFilter);
            }
          }}
        />
        <Filter<"genre">
          name="genre"
          value={genreFilter as GenreOptionKey}
          onFilter={value => {
            if (typeof value === "string") {
              onGenreFilterChange(value as GenreFilter);
            }
          }}
        />
        <Filter<"tradeStatus">
          name="tradeStatus"
          value={tradeStatusFilter as TradeStatusOptionKey}
          onFilter={value => {
            if (typeof value === "string") {
              onTradeStatusFilterChange(value as TradeStatusFilter);
            }
          }}
        />
      </div>
    </div>
  );
};

export default SaleFilterSection;
