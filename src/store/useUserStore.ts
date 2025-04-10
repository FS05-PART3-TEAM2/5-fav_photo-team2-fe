// import { removeQueryKeys } from "@/utils/invalidateQueryKeys";
// import { QueryClient } from "@tanstack/react-query";
import logoutAction from "@/lib/actions/logout.action";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface UserInfo {
  id: string;
  nickname: string;
  email: string;
  points: number | 0;
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

      logout: async () => {
        set({ userInfo: null, isAuthenticated: false });
        await logoutAction();
      },
    }),
    {
      name: "user-storage", // storage name
    }
  )
);

export default useUserStore;
