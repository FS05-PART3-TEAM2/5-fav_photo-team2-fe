"use client";

import Title from "./Title";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Profile from "./Profile";
import useUserStore from "@/store/useUserStore";
// import { useQueryClient } from "@tanstack/react-query";
import Notification from "./Notification";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

/**
 * 최애의포토 : 마켓 플레이스 공통,
 * 제목 : 마켓플레이스 페이지(구매자), 판매 포토카드 상세
 */

const Header = () => {
  // const queryClient = useQueryClient();
  const { userInfo, logout } = useUserStore();
  const isLogin = !!userInfo;

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const unRead = true;

  const handleProfileOpen = () => {
    setIsProfileOpen(!isProfileOpen);
  };
  const handleNotificationOpen = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };
  const handleLogout = () => {
    // logout(queryClient);
    logout();
  };

  if (userInfo) {
    userInfo.point = userInfo.point || 1000; // 포인트가 없을 경우 0으로 설정
  }

  const timeAgo = (time: string) => {
    return formatDistanceToNow(time, {
      addSuffix: true,
      locale: ko,
    });
  };

  return (
    <div className="flex justify-between max-w-[1520px] w-full items-center h-[60px] md:h-[70px] lg:h-[80px] px-[15px] md:px-[20px] z-10">
      <button className="md:hidden lg:hidden cursor-pointer" onClick={handleProfileOpen}>
        <Image src={"/assets/icons/menu.png"} alt="menu" width={24} height={24} />
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
          <Notification isOpen={isNotificationOpen}>
            <Notification.Item
              content="판매자가 포토카드를 등록했습니다."
              time={timeAgo("2025-04-07T05:11:53.909Z")}
            />
            <Notification.Item
              content="새로운 알림이 도착했습니다."
              time={timeAgo("2025-04-04T05:11:53.909Z")}
              isRead={true}
            />
            <Notification.Item
              content="판매자가 포토카드를 등록했습니다."
              time={timeAgo("2025-04-07T05:11:53.909Z")}
            />
            <Notification.Item
              content="새로운 알림이 도착했습니다."
              time={timeAgo("2025-04-04T05:11:53.909Z")}
              isRead={true}
            />
          </Notification>
        </div>
      )}
      {isProfileOpen && isLogin && (
        <div className="md:hidden absolute">
          <Profile
            isOpen={isProfileOpen}
            onClose={handleProfileOpen}
            nickname={userInfo.nickname}
            point={userInfo.point}
            logout={handleLogout}
          >
            <Profile.TextLink text="마이갤러리" href="/mypage" />
            <Profile.TextLink text="나의 판매 포토카드" href="/mypage" />
          </Profile>
        </div>
      )}

      <div className="hidden md:flex md:gap-[20px] lg:gap-[30px] items-center">
        {isLogin && (
          <>
            <div className="text-[14px] font-bold">{userInfo.point.toLocaleString()}&nbsp;P</div>
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
                <Notification isOpen={isNotificationOpen}>
                  <Notification.Item
                    content="판매자가 포토카드를 등록했습니다."
                    time={timeAgo("2025-04-07T05:11:53.909Z")}
                  />
                  <Notification.Item
                    content="새로운 알림이 도착했습니다."
                    time={timeAgo("2025-04-04T05:11:53.909Z")}
                    isRead={true}
                  />
                  <Notification.Item
                    content="판매자가 포토카드를 등록했습니다."
                    time={timeAgo("2025-04-07T05:11:53.909Z")}
                  />
                  <Notification.Item
                    content="새로운 알림이 도착했습니다."
                    time={timeAgo("2025-04-04T05:11:53.909Z")}
                    isRead={true}
                  />
                  <Notification.Item
                    content="판매자가 포토카드를 등록했습니다."
                    time={timeAgo("2025-04-07T05:11:53.909Z")}
                  />
                  <Notification.Item
                    content="새로운 알림이 도착했습니다."
                    time={timeAgo("2025-04-04T05:11:53.909Z")}
                    isRead={true}
                  />
                  <Notification.Item
                    content="판매자가 포토카드를 등록했습니다."
                    time={timeAgo("2025-04-07T05:11:53.909Z")}
                  />
                  <Notification.Item
                    content="새로운 알림이 도착했습니다."
                    time={timeAgo("2025-04-04T05:11:53.909Z")}
                    isRead={true}
                  />
                </Notification>
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
              <Profile
                isOpen={isProfileOpen}
                onClose={handleProfileOpen}
                nickname={userInfo.nickname}
                point={userInfo.point}
              >
                <Profile.TextLink text="마이갤러리" href="/my-photos" />
                <Profile.TextLink text="나의 판매 포토카드" href="/my-sales" />
              </Profile>
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
