"use client";

import Title from "./Title";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import useUserStore from "@/store/useUserStore";
import { useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { useSnackbarStore } from "@/store/useSnackbarStore";
import { removeQueryKeys } from "@/utils/invalidateQueryKeys";
import ProfileCard from "./profile/ProfileCard";
import ProfileDetail from "./profile/ProfileDetail";
import ProfileDrawer from "./profile/ProfileDrawer";
import NotificationCard from "./notification/NotificationCard";
import NotificationDetail from "./notification/NotificationDetail";
import NotificationDrawer from "./notification/NotificationDrawer";

const notificationList = [
  {
    id: 1,
    content: "판매자가 포토카드를 등록했습니다.",
    time: "2025-04-07T05:11:53.909Z",
    isRead: false,
  },
  {
    id: 2,
    content: "새로운 알림이 도착했습니다.",
    time: "2025-04-04T05:11:53.909Z",
    isRead: true,
  },
];

const Header = () => {
  const queryClient = useQueryClient();
  const { userInfo, logout } = useUserStore();
  const isLogin = !!userInfo;

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const { openSnackbar } = useSnackbarStore(); // Snackbar 상태 업데이트 함수 가져오기

  const unRead = true;

  const handleProfileOpen = () => setIsProfileOpen(prev => !prev);
  const handleNotificationOpen = () => setIsNotificationOpen(prev => !prev);
  const handleLogout = () => {
    logout();
    removeQueryKeys(queryClient);
    openSnackbar("SUCCESS", "로그아웃 완료되었습니다."); // Snackbar를 통해 에러 메시지 표시
  };

  const timeAgo = (time: string) => {
    return formatDistanceToNow(time, {
      addSuffix: true,
      locale: ko,
    });
  };

  return (
    <div className="flex justify-between max-w-[1520px] w-full items-center h-[60px] md:h-[70px] lg:h-[80px] px-[15px] md:px-[20px] z-10">
      <button className="md:hidden lg:hidden cursor-pointer" onClick={handleProfileOpen}>
        <Image src={"/assets/icons/menu.png"} alt="menu" width={16} height={16} />
      </button>
      <Link href={"/"}>
        <Title>
          최애<span className="text-main">의</span>포토
        </Title>
      </Link>
      <button
        className="md:hidden lg:hidden cursor-pointer relative"
        onClick={handleNotificationOpen}
      >
        <Image src={"/assets/icons/notification.png"} alt="search" width={16} height={16} />
        {unRead && (
          <div className="absolute top-[-2px] right-[-2px] w-[10px] h-[10px] bg-red rounded-full"></div>
        )}
      </button>
      {isNotificationOpen && (
        <div className="md:hidden absolute">
          <NotificationDrawer onClose={handleNotificationOpen}>
            {notificationList?.map(item => (
              <NotificationDetail
                key={item.id}
                content={item.content}
                time={timeAgo(item.time)}
                isRead={item.isRead}
                onClick={() => console.log("알림 클릭")}
              />
            ))}
          </NotificationDrawer>
        </div>
      )}
      {isProfileOpen && (
        <ProfileDrawer onClose={handleProfileOpen}>
          {isLogin ? (
            <ProfileDetail
              nickname={userInfo.nickname}
              point={userInfo.points}
              onLogout={handleLogout}
            >
              <ProfileDetail.TextLink text="마이갤러리" href="/my-photos" />
              <ProfileDetail.TextLink text="나의 판매 포토카드" href="/my-sales" />
            </ProfileDetail>
          ) : (
            <ProfileDetail.TextLink text="로그인" href="/auth/login" />
          )}
        </ProfileDrawer>
      )}

      <div className="hidden md:flex md:gap-[20px] lg:gap-[30px] items-center">
        {isLogin && (
          <>
            <div className="text-[14px] font-bold">{userInfo.points.toLocaleString()}&nbsp;P</div>
            <div className="flex md:gap-[10px] lg:gap-[16px] items-center">
              <button className="cursor-pointer relative" onClick={handleNotificationOpen}>
                <Image
                  src={"/assets/icons/notification.png"}
                  alt="notification"
                  width={16}
                  height={16}
                />
                {unRead && (
                  <div className="absolute top-[-2px] right-[-2px] w-[10px] h-[10px] bg-red rounded-full"></div>
                )}
              </button>
              <div className="relative">
                {isNotificationOpen && (
                  <NotificationCard>
                    {notificationList?.map(item => (
                      <NotificationDetail
                        key={item.id}
                        content={item.content}
                        time={timeAgo(item.time)}
                        isRead={item.isRead}
                        onClick={() => console.log("알림 클릭")}
                      />
                    ))}
                  </NotificationCard>
                )}
              </div>

              <button className="cursor-pointer">
                <Image src={"/assets/icons/gift.png"} alt="gift" width={16} height={16} />
              </button>
            </div>
            <div className="relative">
              <button
                className="font-BR-B text-[18px] font-normal cursor-pointer"
                onClick={handleProfileOpen}
              >
                {userInfo.nickname}
              </button>
              {isProfileOpen && (
                <ProfileCard>
                  <ProfileDetail nickname={userInfo.nickname} point={userInfo.points}>
                    <ProfileDetail.TextLink text="마이갤러리" href="/my-photos" />
                    <ProfileDetail.TextLink text="나의 판매 포토카드" href="/my-sales" />
                  </ProfileDetail>
                </ProfileCard>
              )}
            </div>
            <div className="w-0.5 bg-gray-400 h-[14px] self-center"></div>
            <button
              className="text-[14px] font-normal text-gray-400 cursor-pointer"
              onClick={handleLogout}
            >
              로그아웃
            </button>
          </>
        )}
        {!isLogin && (
          <>
            <Link href={"/auth/login"}>로그인</Link>
            <Link href={"/auth/signup"}>회원가입</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
