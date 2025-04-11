import React, { useState } from "react";
import Image from "next/image";
import Filter from "@/components/common/filter/Filter";
import SearchBar from "@/components/my-page/SearchBar";
import { GradeFilter, GenreFilter } from "@/types/filter.types";
import { FILTER_CONFIG } from "@/components/common/filter/constants";
import FilterModal from "@/components/common/filter/FilterModal";

interface FilterSectionProps {
  gradeFilter: GradeFilter;
  genreFilter: GenreFilter;
  onGradeFilterChange: (value: GradeFilter) => void;
  onGenreFilterChange: (value: GenreFilter) => void;
  onSearch: (query: string) => void;
}

const PhotoFilterSection: React.FC<FilterSectionProps> = ({
  gradeFilter,
  genreFilter,
  onGradeFilterChange,
  onGenreFilterChange,
  onSearch,
}) => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // GenreFilter 타입을 Filter 컴포넌트에서 필요한 타입으로 안전하게 변환
  type GenreOptionKey = keyof typeof FILTER_CONFIG.filter.genre.options;

  const handleFilterChange = (
    filterName: "grade" | "genre" | "tradeStatus" | "isSoldOut",
    value: string
  ) => {
    switch (filterName) {
      case "grade":
        onGradeFilterChange(value as GradeFilter);
        break;
      case "genre":
        onGenreFilterChange(value as GenreFilter);
        break;
    }
  };

  const buildCountUrl = (filterParams: { grade?: string; genre?: string }) => {
    const params = new URLSearchParams();
    if (filterParams.grade) params.append("grade", filterParams.grade);
    if (filterParams.genre) params.append("genre", filterParams.genre);
    return `/market/me/count${params.toString() ? `?${params.toString()}` : ""}`;
  };

  const handleCloseModal = () => {
    setIsFilterModalOpen(false);
  };

  return (
    <div className="flex justify-start items-center gap-3 mb-4">
      {/* 모바일 필터 */}
      <button
        className="md:hidden flex items-center justify-center w-[45px] h-[45px] border border-gray-200 rounded-[2px] flex-shrink-0"
        onClick={() => setIsFilterModalOpen(true)}
      >
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
      </div>

      {/* 모바일 필터 모달 */}
      {isFilterModalOpen && (
        <FilterModal
          isOpen={isFilterModalOpen}
          onClose={handleCloseModal}
          selectedFilters={{
            grade: gradeFilter,
            genre: genreFilter,
          }}
          onFilterChange={handleFilterChange}
          availableFilters={["grade", "genre"]}
          buildCountUrl={buildCountUrl}
        />
      )}
    </div>
  );
};

export default PhotoFilterSection;
