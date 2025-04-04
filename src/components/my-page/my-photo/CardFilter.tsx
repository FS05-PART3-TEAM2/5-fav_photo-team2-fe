import React, { useState, useEffect } from "react";
import { MyPhotoCardDto } from "@/types/photocard.types";
import { GradeFilter, GenreFilter } from "@/types/filter.types";
import FilterSection from "@/components/my-page/my-photo/FilterSection";
import MyPhotoCardGrid from "@/components/my-page/MyPhotoCardGrid";
import { FILTER_CONFIG } from "@/components/common/filter/constants";

interface CardFilterProps {
  myPhotoCards?: MyPhotoCardDto[];
  onCardClick?: (cardId: string) => void;
}

const CardFilter: React.FC<CardFilterProps> = ({ myPhotoCards = [], onCardClick }) => {
  const [gradeFilter, setGradeFilter] = useState<GradeFilter>("default");
  const [genreFilter, setGenreFilter] = useState<GenreFilter>("default");
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
  }, [gradeFilter, genreFilter, searchQuery, myPhotoCards]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <>
      <FilterSection
        gradeFilter={gradeFilter}
        genreFilter={genreFilter}
        onGradeFilterChange={setGradeFilter}
        onGenreFilterChange={setGenreFilter}
        onSearch={handleSearch}
      />
      <MyPhotoCardGrid myPhotoCards={filteredCards || []} onCardClick={onCardClick} />
    </>
  );
};

export default CardFilter;
