/**
 *
 */
export interface NotificationDto {
  id: string;
  userId: string;
  message: string;
  createdAt: string;
  readAt: string | null;
}

/**
 * 알림 조회 API 응답 타입
 */
export interface NotificationListDto {
  notifications: NotificationDto[];
  nextCursor: string | null;
}
