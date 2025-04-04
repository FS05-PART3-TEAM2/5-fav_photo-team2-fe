"use client";

import { axiosClient } from "@/services/axiosClient/axiosClient";
import useUserStore from "@/store/useUserStore";
import { ReactNode, useEffect } from "react";

type props = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: props) => {
  const { setUser } = useUserStore();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axiosClient.get("/auth/me");

        if (response.status === 200) {
          const userInfo = response.data;
          setUser(userInfo);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
        // 필요시 사용자 알림 등 추가
      }
    };

    checkAuth();
  }, [setUser]);
  return <>{children}</>;
};
