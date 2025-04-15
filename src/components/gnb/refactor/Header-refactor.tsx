"use client";

import useUserStore from "@/store/useUserStore";
import HeaderLayout from "./HeaderLayout";
import { usePathname, useRouter } from "next/navigation";
import { PATH_TITLE } from "../path-titile";
import { useRef, useState } from "react";
import Link from "next/link";
import HeaderGuest from "./HeaderGuest";
import HeaderUser from "./HeaderUser";
import Notification from "../notification/Notification";

const HeaderR = () => {
  const router = useRouter();
  const { userInfo, isAuthenticated } = useUserStore();
  const pathname = usePathname();
  const title = PATH_TITLE.find(([re]) => re.test(pathname))?.[1];

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setIsProfileOpen(false);
      setIsNotificationOpen(false);
    }
  };

  console.log(isProfileOpen);
  console.log(handleClickOutside);

  const handleBack = () => {
    router.back();
  };

  const handleProfileOpen = () => {
    setIsProfileOpen(prev => !prev);
    setIsNotificationOpen(false);
  };
  const handleNotificationOpen = () => {
    setIsNotificationOpen(prev => !prev);
    setIsProfileOpen(false);
  };

  const hasTitle = title !== undefined;

  return (
    <HeaderLayout {...{ title, handleBack, handleProfileOpen }}>
      {isAuthenticated ? (
        // 회원 헤더
        <HeaderUser>
          <HeaderUser.Point points={userInfo?.points || 0} />
          <Notification
            modalRef={modalRef as React.RefObject<HTMLDivElement>}
            userId={userInfo?.id || ""}
            isNotificationOpen={isNotificationOpen}
            handleNotificationOpen={handleNotificationOpen}
            hasTitle={hasTitle}
          />
        </HeaderUser>
      ) : (
        // 비회원 헤더
        <>
          <HeaderGuest {...{ hasTitle }}>
            <Link href={"/auth/login"}>로그인</Link>
            <Link href={"/auth/signup"}>회원가입</Link>
          </HeaderGuest>
        </>
      )}
    </HeaderLayout>
  );
};

export default HeaderR;
