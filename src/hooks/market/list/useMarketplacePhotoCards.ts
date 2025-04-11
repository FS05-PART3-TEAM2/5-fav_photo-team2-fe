import { useInfiniteQuery } from "@tanstack/react-query";
import { getMarketPhotoCardsApi } from "@/services/market/getMarketPhotoCards";
import { Grade, Genre, SaleCardStatus, Sort } from "@/types/photocard.types";
import { photoCardKeys } from "@/utils/queryKeys";

type FilterValue<T> = T | "default";

interface UseMarketplacePhotoCardsParams {
  keyword?: string;
  grade?: FilterValue<Grade>;
  genre?: FilterValue<Genre>;
  status?: FilterValue<SaleCardStatus>;
  sort?: Sort;
}

type Cursor = { id: string; createdAt: string } | null;
type ApiParams = {
  keyword: string;
  grade?: Grade;
  genre?: Genre;
  status?: SaleCardStatus;
  sort: Sort;
};

// "default" → undefined로 바꿔주는 유틸 함수
const getActualFilterValue = <T>(value: FilterValue<T>): T | undefined =>
  value === "default" ? undefined : value;

export const useMarketplacePhotoCards = ({
  keyword = "",
  grade = "default",
  genre = "default",
  status = "default",
  sort = "recent",
}: UseMarketplacePhotoCardsParams = {}) => {
  const apiParams: ApiParams = {
    keyword,
    grade: getActualFilterValue(grade),
    genre: getActualFilterValue(genre),
    status: getActualFilterValue(status),
    sort,
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } =
    useInfiniteQuery({
      queryKey: photoCardKeys.saleList(apiParams),
      queryFn: ({ pageParam }: { pageParam: Cursor }) =>
        getMarketPhotoCardsApi({ cursor: pageParam, ...apiParams }),
      initialPageParam: null as Cursor,
      getNextPageParam: lastPage => {
        return lastPage?.hasMore ? lastPage.nextCursor : undefined;
      },
      staleTime: 1000 * 60 * 5,
    });

  // console.log("🧪 [2] useMarketplacePhotoCards data:", data);
  const photoCards = data?.pages.flatMap(page => page.list) || [];
  // console.log("🧪 [3] useMarketplacePhotoCards photoCards:", photoCards);

  // console.log("📡 [useMarketplacePhotoCards] data:", data);
  // console.log("📡 [useMarketplacePhotoCards] photoCards:", photoCards);
  // console.log("📡 [useMarketplacePhotoCards] hasNextPage:", hasNextPage);
  // console.log("📡 [useMarketplacePhotoCards] isFetchingNextPage:", isFetchingNextPage);
  // console.log("📡 [useMarketplacePhotoCards] isLoading:", isLoading);
  // console.log("📡 [useMarketplacePhotoCards] error:", error);

  return {
    data,
    photoCards,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  };
};
