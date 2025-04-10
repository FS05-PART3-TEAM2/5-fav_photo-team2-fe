import { axiosClient } from "@/services/axiosClient/axiosClient";
import { NotificationDto, NotificationListDto } from "@/types/notification.types";
import { userKeys } from "@/utils/queryKeys";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * 알림 목록 조회 API
 * @param param0
 * @returns
 */
export const fetchNotificationList = async ({
  limit = 20,
  cursor,
}: {
  limit?: number;
  cursor?: string;
}): Promise<NotificationListDto> => {
  const params = new URLSearchParams();
  params.append("limit", limit.toString());
  if (cursor) {
    params.append("cursor", cursor);
  }

  const res = await axiosClient.get<NotificationListDto>("/notifications", {
    params,
  });

  return res.data;
};

/**
 * 알림 열람 처리 API
 * @param notificationId
 */
const markNotificationAsRead = async (notificationId: string) => {
  const res = await fetch(`/api/notifications/${notificationId}/read`, {
    method: "PATCH",
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "읽음 처리 실패");
  }
};

/**
 *
 * @returns
 */
export const useNotificationList = (userId: string) => {
  const queryClient = useQueryClient();

  const notificationQuery = useInfiniteQuery<
    NotificationListDto,
    Error,
    { notifications: NotificationDto[]; pageParams: unknown[] }
  >({
    queryKey: userKeys.notificationList(userId),
    queryFn: ({ pageParam }) => fetchNotificationList({ cursor: pageParam as string }),
    initialPageParam: undefined,
    getNextPageParam: lastPage => lastPage.nextCursor ?? undefined,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    enabled: !!userId && userId !== "",
    retry: false,
    select: data => {
      const flattened = data.pages.flatMap(page => page.notifications);
      return {
        notifications: flattened,
        pageParams: data.pageParams,
      };
    },
  });

  const markAsReadMutation = useMutation({
    mutationFn: markNotificationAsRead,
    onSuccess: (_, notificationId) => {
      queryClient.setQueryData<{ notifications: NotificationDto[]; pageParams: unknown[] }>(
        ["notificationList"],
        oldData => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            notifications: oldData.notifications.map(n =>
              n.id === notificationId ? { ...n, readAt: new Date().toISOString() } : n
            ),
          };
        }
      );
    },
    /* ③ 성공·실패와 무관하게 서버와 동기화 */
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["notificationList"] });
    },
  });

  return {
    ...notificationQuery,
    markAsRead: markAsReadMutation.mutate,
    markAsReadAsync: markAsReadMutation.mutateAsync,
    isMarkingRead: markAsReadMutation.isPending,
  };
};
