"use client";

import { useFetchUserPoints } from "@/hooks/auth/useFetchUserPoints";
import useUserStore, { UserInfo } from "@/store/useUserStore";
import { ReactNode, useEffect } from "react";

type props = {
  userInfo: UserInfo | null;
  children: ReactNode;
};

export const AuthProvider = ({ userInfo, children }: props) => {
  const { setUser, logout } = useUserStore();
  const { userPoints } = useFetchUserPoints();

  useEffect(() => {
    const checkAuth = async () => {
      if (userInfo) {
        setUser({ ...userInfo, points: userPoints?.points || 0 });
      } else {
        logout();
      }
    };

    checkAuth();
  }, [userInfo, setUser, logout, userPoints]);
  return <>{children}</>;
};
