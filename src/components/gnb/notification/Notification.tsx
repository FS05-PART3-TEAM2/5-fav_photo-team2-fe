import { useInView } from "react-intersection-observer";
import NotificationCard from "./NotificationCard";
import NotificationDrawer from "./NotificationDrawer";
import { useNotificationList } from "@/hooks/notification/useNotificationList";
import { useEffect, useMemo } from "react";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import NotificationDetail from "./NotificationDetail";
import Image from "next/image";

interface HeaderUserNotificationIconProps {
  modalRef: React.RefObject<HTMLDivElement>;
  userId: string;
  isNotificationOpen: boolean;
  handleNotificationOpen: () => void;
  hasTitle?: boolean;
}

const Notification: React.FC<HeaderUserNotificationIconProps> = ({
  modalRef,
  userId,
  isNotificationOpen,
  handleNotificationOpen,
}) => {
  const { ref: bottomRef, inView } = useInView({ threshold: 0 });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, markAsRead } =
    useNotificationList(userId);

  const notifications = data?.notifications ?? null;

  // 알림 중 읽지 않은 게 있는지 확인
  const hasUnread = useMemo(() => {
    return notifications?.some(item => !item.readAt) ?? false;
  }, [notifications]);

  // 시간 포맷 캐싱
  const formattedNotifications = useMemo(() => {
    return (
      notifications?.map(item => ({
        ...item,
        timeAgo: formatDistanceToNow(item.createdAt, {
          addSuffix: true,
          locale: ko,
        }),
      })) ?? []
    );
  }, [notifications]);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage(); // 스크롤이 바닥에 닿으면 다음 페이지 요청
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const notificationList = (
    <>
      {formattedNotifications.map(item => (
        <NotificationDetail
          key={item.id + item.readAt}
          content={item.message}
          time={item.timeAgo}
          isRead={!!item.readAt}
          onClick={() => !item.readAt && markAsRead(item.id)}
        />
      ))}
      {formattedNotifications.length === 0 && notifications !== null && (
        <p className="py-2 text-center text-xs text-gray-300">알림이 없습니다.</p>
      )}
      {isFetchingNextPage && <p className="py-2 text-center text-xs text-gray-400">불러오는 중…</p>}
      <div ref={bottomRef} />
    </>
  );

  return (
    <div className="cursor-pointer relative flex items-center">
      <button className="cursor-pointer relative" onClick={handleNotificationOpen}>
        <Image src="/assets/icons/notification.png" alt="알림 아이콘" width={16} height={16} />
        {hasUnread && (
          <div className="absolute top-[-2px] right-[-2px] w-[10px] h-[10px] bg-red rounded-full"></div>
        )}
      </button>

      {/* 데스크탑용 알림 카드 */}
      <div className="right-0 hidden md:block">
        {isNotificationOpen && (
          <div ref={modalRef} className="w-0 h-0">
            <NotificationCard count={formattedNotifications.length}>
              {notificationList}
            </NotificationCard>
          </div>
        )}
      </div>

      {/* 모바일용 드로어 알림 */}
      <div className="md:hidden absolute">
        {isNotificationOpen && (
          <NotificationDrawer onClose={handleNotificationOpen}>
            {notificationList}
          </NotificationDrawer>
        )}
      </div>
    </div>
  );
};

export default Notification;
