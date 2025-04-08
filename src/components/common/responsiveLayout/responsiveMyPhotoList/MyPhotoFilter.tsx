import React, { useState } from "react";
import { GradeFilter, GenreFilter } from "@/types/filter.types";
import PhotoFilterSection from "@/components/my-page/my-photo/PhotoFilterSection";
import { useMyPhotoCards } from "@/hooks/my-page/useMyPhotoCards";
import { Grade, Genre } from "@/types/photocard.types";
import { CircularProgress } from "../../loading/CircularProgress";
import PhotoCardList from "@/components/my-page/my-photo/PhotoCardList";

interface MyPhotoFilterProps {
  onCardClick?: (cardId: string) => void;
}

const MyPhotoFilter: React.FC<MyPhotoFilterProps> = ({ onCardClick }) => {
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

  const responsiveMyPhotoListGrid = "grid grid-cols-2 gap-[5px] md:gap-5 lg:gap-10";

  return (
    <div className="w-[100%] flex flex-col gap-[4px] md:gap-[20px] h-[calc(100vh-340px)]">
      {/* 필터 영역 */}
      <div className="flex-shrink-0">
        <PhotoFilterSection
          gradeFilter={gradeFilter}
          genreFilter={genreFilter}
          onGradeFilterChange={setGradeFilter}
          onGenreFilterChange={setGenreFilter}
          onSearch={handleSearch}
        />
      </div>

      {/* 리스트 - 스크롤 영역 */}
      <div className={contentScrollWrapperSx}>
        {isLoading ? (
          <CircularProgress />
        ) : myPhotos.length > 0 ? (
          // 데이터 있는 경우
          <PhotoCardList
            className={responsiveMyPhotoListGrid}
            photoCards={myPhotos}
            onCardClick={onCardClick}
            onLoadMore={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        ) : (
          // 데이터 없는 경우
          <div className="flex justify-center items-center py-20">
            <div className="text-white text-lg">포토카드가 없습니다.</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPhotoFilter;

const contentScrollWrapperSx =
  "w-[100%] h-full overflow-y-auto lg:pr-[40px] [&::-webkit-scrollbar]:w-[0px] lg:[&::-webkit-scrollbar]:w-[8px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-thumb]:rounded-full";
