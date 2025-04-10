"use client";

import Title from "./Title";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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
import { useNotificationList } from "@/hooks/notification/useNotificationList";
import { useInView } from "react-intersection-observer";
import { usePathname, useRouter } from "next/navigation";
import { PATH_TITLE } from "./path-titile";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const { userInfo, logout } = useUserStore();
  const isLogin = !!userInfo;

  const title = PATH_TITLE.find(([re]) => re.test(pathname))?.[1];
  const hasTitle = title !== undefined;

  const modalRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  const {
    data, // ← 여기!
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    markAsRead,
  } = useNotificationList();

  const notifications = data?.notifications ?? null; // ← 이렇게 추출

  /* -------- sentinel(바닥) 관찰자 설정 -------- */
  const { ref: bottomRef, inView } = useInView({ threshold: 0 });

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const handleAllModalClose = () => {
    setIsProfileOpen(false);
    setIsNotificationOpen(false);
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setIsProfileOpen(false);
      setIsNotificationOpen(false);
    }
  };

  const { openSnackbar } = useSnackbarStore(); // Snackbar 상태 업데이트 함수 가져오기

  const unRead = notifications?.some(item => !item.readAt); // 읽지 않은 알림이 있는지 확인

  const handleProfileOpen = () => setIsProfileOpen(prev => !prev);
  const handleNotificationOpen = () => setIsNotificationOpen(prev => !prev);
  const handleLogout = () => {
    logout();
    removeQueryKeys(queryClient);
    openSnackbar("SUCCESS", "로그아웃 완료되었습니다."); // Snackbar를 통해 에러 메시지 표시
  };
  const handleBack = () => {
    router.back();
  };

  const timeAgo = (time: string) => {
    return formatDistanceToNow(time, {
      addSuffix: true,
      locale: ko,
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage(); // 스크롤이 바닥에 닿으면 다음 페이지 요청
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    if (isProfileOpen || isNotificationOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isProfileOpen, isNotificationOpen]);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-60 ${scrolled ? "bg-black/75" : "bg-transparent"}`}
    >
      <div className="flex justify-between mx-auto max-w-[1520px] w-full items-center h-[60px] md:h-[70px] px-[15px] md:px-[20px] lg:h-[80px]">
        <button
          className="md:hidden lg:hidden cursor-pointer"
          onClick={hasTitle ? handleBack : handleProfileOpen}
        >
          {hasTitle ? (
            <Image src={"/assets/icons/back.png"} alt="menu" width={20} height={20} />
          ) : (
            <Image src={"/assets/icons/menu.png"} alt="menu" width={16} height={16} />
          )}
        </button>
        <Link href={"/"}>
          <Title>
            {hasTitle ? (
              <>
                <div className="md:hidden">{title}</div>
                <div className="hidden md:block">
                  최애<span className="text-main">의</span>포토
                </div>
              </>
            ) : (
              <>
                최애<span className="text-main">의</span>포토
              </>
            )}
          </Title>
        </Link>
        <div className="w-[16px]">
          {isLogin && !hasTitle && (
            <button
              className="md:hidden lg:hidden cursor-pointer relative"
              onClick={handleNotificationOpen}
            >
              <Image src={"/assets/icons/notification.png"} alt="search" width={16} height={16} />
              {unRead && (
                <div className="absolute top-[-2px] right-[-2px] w-[10px] h-[10px] bg-red rounded-full"></div>
              )}
            </button>
          )}
        </div>
        {isNotificationOpen && (
          <div className="md:hidden absolute">
            <NotificationDrawer onClose={handleNotificationOpen}>
              {notifications?.map(item => (
                <NotificationDetail
                  key={item.id + item.readAt}
                  content={item.message}
                  time={timeAgo(item.createdAt)}
                  isRead={item.readAt ? true : false}
                  onClick={() => !item.readAt && markAsRead(item.id)}
                />
              ))}
              {/* sentinel & 로딩 상태 */}
              {isFetchingNextPage && (
                <p className="py-2 text-center text-xs text-gray-400">불러오는 중…</p>
              )}
              <div ref={bottomRef} />
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
                <ProfileDetail.TextLink
                  text="마이갤러리"
                  href="/my-photos"
                  onClick={() => handleAllModalClose()}
                />
                <ProfileDetail.TextLink
                  text="나의 판매 포토카드"
                  href="/my-sales"
                  onClick={() => handleAllModalClose()}
                />
              </ProfileDetail>
            ) : (
              <ProfileDetail.TextLink
                text="로그인"
                href="/auth/login"
                onClick={() => handleAllModalClose()}
              />
            )}
          </ProfileDrawer>
        )}

        <div className="hidden md:flex md:gap-[20px] lg:gap-[30px] items-center">
          {isLogin && (
            <>
              <div className="text-[14px] font-bold">{userInfo.points.toLocaleString()}&nbsp;P</div>
              <div className="flex items-center relative ">
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
                {isNotificationOpen && (
                  <div ref={modalRef} className="w-0 h-0">
                    <NotificationCard>
                      {notifications?.map(item => (
                        <NotificationDetail
                          key={item.id}
                          content={item.message}
                          time={timeAgo(item.createdAt)}
                          isRead={item.readAt ? true : false}
                          onClick={() => !item.readAt && markAsRead(item.id)}
                        />
                      ))}
                      {/* sentinel & 로딩 상태 */}
                      {isFetchingNextPage && (
                        <p className="py-2 text-center text-xs text-gray-400">불러오는 중…</p>
                      )}
                      <div ref={bottomRef} />
                    </NotificationCard>
                  </div>
                )}
              </div>
              <div className="relative">
                <button
                  className="font-BR-B text-[18px] font-normal cursor-pointer"
                  onClick={handleProfileOpen}
                >
                  {userInfo.nickname}
                </button>
                {isProfileOpen && (
                  <div ref={modalRef}>
                    <ProfileCard>
                      <ProfileDetail nickname={userInfo.nickname} point={userInfo.points}>
                        <ProfileDetail.TextLink
                          text="마이갤러리"
                          href="/my-photos"
                          onClick={() => handleAllModalClose()}
                        />
                        <ProfileDetail.TextLink
                          text="나의 판매 포토카드"
                          href="/my-sales"
                          onClick={() => handleAllModalClose()}
                        />
                      </ProfileDetail>
                    </ProfileCard>
                  </div>
                )}
              </div>
              <div className="w-0.5 bg-gray-400 h-[14px] self-center"></div>
              <button
                className={`text-[14px] font-normal cursor-pointer ${
                  scrolled ? "text-gray-300" : "text-gray-400"
                }`}
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
    </div>
  );
};

export default Header;
