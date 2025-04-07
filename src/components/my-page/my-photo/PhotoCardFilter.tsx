import React, { useState } from "react";
import { GradeFilter, GenreFilter } from "@/types/filter.types";
import PhotoFilterSection from "@/components/my-page/my-photo/PhotoFilterSection";
import PhotoCardList from "./PhotoCardList";
import { useMyPhotoCards } from "@/hooks/my-page/useMyPhotoCards";
import { Grade, Genre } from "@/types/photocard.types";

interface PhotoCardFilterProps {
  onCardClick?: (cardId: string) => void;
}

const PhotoCardFilter: React.FC<PhotoCardFilterProps> = ({ onCardClick }) => {
  const [gradeFilter, setGradeFilter] = useState<GradeFilter>("default");
  const [genreFilter, setGenreFilter] = useState<GenreFilter>("default");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // 필터 값을 실제 API 파라미터에 맞게 변환 - default를 undefined로 변환
  const getFilterParam = <T extends Grade | Genre>(filter: string): T | undefined => {
    return filter === "default" ? undefined : (filter as T);
  };

  // React Query 훅 사용
  const { myPhotos, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useMyPhotoCards({
    keyword: searchQuery,
    grade: getFilterParam<Grade>(gradeFilter),
    genre: getFilterParam<Genre>(genreFilter),
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <>
      <PhotoFilterSection
        gradeFilter={gradeFilter}
        genreFilter={genreFilter}
        onGradeFilterChange={setGradeFilter}
        onGenreFilterChange={setGenreFilter}
        onSearch={handleSearch}
      />

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="text-main text-lg">데이터를 불러오는 중...</div>
        </div>
      ) : myPhotos.length > 0 ? (
        <PhotoCardList
          photoCards={myPhotos}
          onCardClick={onCardClick}
          onLoadMore={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      ) : (
        <div className="flex justify-center items-center py-20">
          <div className="text-white text-lg">포토카드가 없습니다.</div>
        </div>
      )}
    </>
  );
};

export default PhotoCardFilter;
