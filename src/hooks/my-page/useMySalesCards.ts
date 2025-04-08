import { useInfiniteQuery } from "@tanstack/react-query";
import { Grade, Genre, TradeStatus } from "@/types/photocard.types";
import { getMySalesCards } from "@/services/my-page/getMySalesCards";
import { photoCardKeys } from "@/utils/queryKeys";

interface UseMySalesCardsParams {
  keyword?: string;
  grade?: Grade;
  genre?: Genre;
  status?: TradeStatus;
}

// 나의 판매 포토카드 목록 조회 (무한 스크롤)
export const useMySalesCards = ({
  keyword = "",
  grade,
  genre,
  status,
}: UseMySalesCardsParams = {}) => {
  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, isLoading, error } =
    useInfiniteQuery({
      queryKey: photoCardKeys.mySaleList({
        keyword,
        grade: grade ?? ("ALL" as Grade),
        genre: genre ?? ("ALL" as Genre),
        status: status ?? ("ALL" as TradeStatus),
      }),
      queryFn: ({ pageParam }) =>
        getMySalesCards({
          cursor: pageParam,
          keyword,
          grade,
          genre,
          status,
        }),
      initialPageParam: null as string | null,
      getNextPageParam: lastPage => lastPage.nextCursor,
      staleTime: 1000 * 60 * 5, // 5분
    });

  // 무한 스크롤의 여러 페이지 리스트를 하나의 배열로 병합
  const mySalesCards = data?.pages.flatMap(page => page.list) || [];

  // 등급별 카드 개수 정보 (첫 페이지의 정보 사용)
  const gradeMapping = {
    COMMON: "common",
    RARE: "rare",
    SUPER_RARE: "superRare",
    LEGENDARY: "legendary",
  } as const;

  // 등급별 카드 개수 정보 객체
  const cardCountByGrade = {
    common: 0,
    rare: 0,
    superRare: 0,
    legendary: 0,
  };

  // 첫 페이지의 등급별 카드 개수 정보
  if (data?.pages[0]?.info.grade) {
    data.pages[0].info.grade.forEach(item => {
      const key = gradeMapping[item.name];
      if (key) {
        cardCountByGrade[key] = item.count;
      }
    });
  }

  // 총 카드 수 계산 - API 응답에서 info 객체 내 등급별 카드 개수 합산으로 계산
  const totalCards = Object.values(cardCountByGrade).reduce((sum, count) => sum + count, 0);

  return {
    mySalesCards,
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
