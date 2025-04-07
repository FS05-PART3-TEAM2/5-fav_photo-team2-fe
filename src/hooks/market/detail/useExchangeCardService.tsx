import { useQuery } from "@tanstack/react-query";
import { photoCardKeys } from "../../../utils/queryKeys";
import { getSaleCardExchangeListApi } from "@/services/market/getSaleCardExchangeList";

/**
 * 판매 포토카드 교환 목록 조회 리액트 쿼리
 * @param saleId 판매 포토카드 ID
 * @returns 판매 포토카드 교환 목록
 */
export const useExchangeCardList = (saleId: string) => {
  const { data, isLoading } = useQuery({
    queryKey: photoCardKeys.exchangeCardList(saleId),
    queryFn: () => getSaleCardExchangeListApi(saleId),
    enabled: !!saleId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  return {
    data: data ?? null,
    isLoading,
  };
};
