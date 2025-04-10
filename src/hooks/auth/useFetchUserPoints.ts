import { getUserPointApi } from "@/services/auth/getUserPointApi";
import { userPointKeys } from "@/utils/queryKeys";
import { useQuery } from "@tanstack/react-query";

export const useFetchUserPoints = () => {
  const { data: userPoints, isLoading: isUserPointsLoading } = useQuery({
    queryKey: userPointKeys.me(),
    queryFn: () => getUserPointApi(),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  return {
    userPoints,
    isUserPointsLoading,
  };
};
