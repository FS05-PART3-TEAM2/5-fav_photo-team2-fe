// import { removeQueryKeys } from "@/utils/invalidateQueryKeys";
// import { QueryClient } from "@tanstack/react-query";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface UserInfo {
  id: string;
  nickname: string;
  email: string;
  point: number;
}

interface UserStore {
  userInfo: UserInfo | null;
  isAuthenticated: boolean; // 로그인 여부
  setUser: (user: UserInfo) => void;
  logout: () => void;
  // logout: (queryClient: QueryClient) => void;
}

const useUserStore = create<UserStore>()(
  persist(
    set => ({
      userInfo: null,
      isAuthenticated: false,

      setUser: (userInfo: UserInfo) => {
        set({ userInfo, isAuthenticated: true });
      },

      logout: () => {
        set({ userInfo: null, isAuthenticated: false });
      },
      // logout: queryClient => {
      //   set({ userInfo: null, isAuthenticated: false });
      //   removeQueryKeys(queryClient); // 로그아웃 시 관련 쿼리 캐시 초기화
      // },
    }),
    {
      name: "user-storage", // storage name
    }
  )
);

export default useUserStore;
