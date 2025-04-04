import { useQuery } from "@tanstack/react-query";
import { photoCardKeys } from "../../../utils/queryKeys";
import { getSaleCardExchangeList } from "@/services/market/getSaleCardExchangeList";

export const useExchangeCardService = (saleId: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: photoCardKeys.exchangeCardList(saleId),
    queryFn: () => getSaleCardExchangeList(saleId),
  });

  return {
    data,
    isLoading,
    error,
  };
};
