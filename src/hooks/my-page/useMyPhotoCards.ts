import { useInfiniteQuery } from "@tanstack/react-query";
import { Grade, Genre } from "@/types/photocard.types";
import { getMyPhotos } from "@/services/my-page/getMyPhotoCards";
import { photoCardKeys } from "@/utils/queryKeys";

interface UseMyPhotosParams {
  keyword?: string;
  grade?: Grade;
  genre?: Genre;
}

// 내 포토카드 목록 조회 (무한 스크롤)
export const useMyPhotoCards = ({ keyword = "", grade, genre }: UseMyPhotosParams = {}) => {
  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, isLoading, error } =
    useInfiniteQuery({
      queryKey: photoCardKeys.myPhotoList({
        keyword,
        grade: grade ?? ("ALL" as Grade),
        genre: genre ?? ("ALL" as Genre),
      }),
      queryFn: ({ pageParam }) =>
        getMyPhotos({
          cursor: pageParam,
          keyword,
          grade,
          genre,
        }),
      initialPageParam: null as string | null,
      getNextPageParam: lastPage => lastPage.nextCursor,
      staleTime: 1000 * 60 * 5, // 5분
    });

  // 무한 스크롤의 여러 페이지 리스트를 하나의 배열로 병합
  const myPhotos = data?.pages.flatMap(page => page.list) || [];

  // 사용자 닉네임 (첫 페이지의 정보 사용)
  const userNickname = data?.pages[0]?.userNickname || "";

  // 등급별 카드 개수 정보 객체
  const cardCountByGrade = {
    common: 0,
    rare: 0,
    superRare: 0,
    legendary: 0,
  };

  // 첫 페이지의 등급별 카드 개수 정보
  if (data?.pages[0]?.gradeCounts) {
    const gradeCounts = data.pages[0].gradeCounts;
    cardCountByGrade.common = gradeCounts.COMMON || 0;
    cardCountByGrade.rare = gradeCounts.RARE || 0;
    cardCountByGrade.superRare = gradeCounts.SUPER_RARE || 0;
    cardCountByGrade.legendary = gradeCounts.LEGENDARY || 0;
  }

  // 총 카드 수 계산 - API 응답에서 등급별 카드 개수 합산으로 계산
  const totalCards = Object.values(cardCountByGrade).reduce((sum, count) => sum + count, 0);

  return {
    myPhotos,
    userNickname,
    cardCountByGrade,
    totalCards,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isLoading,
    error,
  };
};
