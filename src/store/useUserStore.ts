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
  logout: () => Promise<void>;
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
        try {
          // 먼저 상태 초기화
          set({ userInfo: null, isAuthenticated: false });

          // 서버 로그아웃 실행
          await logoutAction();
        } catch (error) {
          console.error("로그아웃 중 오류 발생:", error);
          // 오류 발생 시에도 상태는 초기화
          // set({ userInfo: null, isAuthenticated: false });
        }
      },
    }),
    {
      name: "user-storage", // storage name
      skipHydration: true, // 서버 사이드 렌더링 시 하이드레이션 스킵
    }
  )
);

export default useUserStore;
