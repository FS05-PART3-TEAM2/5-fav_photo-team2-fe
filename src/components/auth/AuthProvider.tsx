"use client";

import useUserStore, { UserInfo } from "@/store/useUserStore";
import { ReactNode, useEffect } from "react";

type props = {
  userInfo: UserInfo;
  children: ReactNode;
};

export const AuthProvider = ({ userInfo, children }: props) => {
  const { setUser, logout } = useUserStore();

  useEffect(() => {
    const checkAuth = async () => {
      if (userInfo) {
        setUser(userInfo);
      } else {
        logout();
      }
    };

    checkAuth();
  }, [userInfo, setUser, logout]);
  return <>{children}</>;
};
