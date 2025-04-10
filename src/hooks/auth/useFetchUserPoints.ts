import { getUserPointApi } from "@/services/auth/getUserPointApi";
import { userKeys } from "@/utils/queryKeys";
import { useQuery } from "@tanstack/react-query";

export const useFetchUserPoints = (userId: string) => {
  const { data: userPoints, isLoading: isUserPointsLoading } = useQuery({
    queryKey: userKeys.points(userId),
    queryFn: () => getUserPointApi(),
    enabled: !!userId || userId !== "", // 로그인 상태에서만 포인트 조회하도록
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  return {
    userPoints,
    isUserPointsLoading,
  };
};
